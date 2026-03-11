
import { google } from 'googleapis';
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { normalizeClassName } from '@/lib/timetable';

const ROOM_IDS = ['1', '2', '3', '4', '5', '6', '7', 'MS'];

// Helper function to fetch data from both relevant Google Sheets tabs
async function getSheetData() {
    const privateKey = process.env.GOOGLE_API_PRIVATE_KEY?.replace(/\\n/g, '\n');
    const clientEmail = process.env.GOOGLE_API_CLIENT_EMAIL;
    const sheetId = process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID;
    const studentTab = process.env.GOOGLE_SHEET_TAB_SERVER || '서버데이터';
    const scheduleTab = process.env.GOOGLE_SHEET_TAB_SCHEDULE || '시간표';

    if (!privateKey || !clientEmail || !sheetId) {
        throw new Error("Google API credentials or Sheet ID are not set in environment variables.");
    }

    const auth = new google.auth.GoogleAuth({
        credentials: { client_email: clientEmail, private_key: privateKey },
        scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    
    const [studentResponse, scheduleResponse] = await Promise.all([
        sheets.spreadsheets.values.get({ spreadsheetId: sheetId, range: `${studentTab}!A:U` }),
        sheets.spreadsheets.values.get({ spreadsheetId: sheetId, range: `${scheduleTab}!A:Z` }),
    ]);

    return {
        studentData: studentResponse.data.values,
        scheduleData: scheduleResponse.data.values
    };
}

// POST function to handle the sync request
export async function POST(req: NextRequest) {
    try {
        console.log("Full Sync started...");

        // 1. Fetch data from Google Sheets
        const { studentData, scheduleData } = await getSheetData();

        if (!studentData || studentData.length < 2) {
            throw new Error("No student data found in Google Sheet or sheet is empty.");
        }
        if (!scheduleData || scheduleData.length < 2) {
            throw new Error("No schedule data found in Google Sheet or sheet is empty.");
        }

        // --- Sync Students (Existing Logic) ---
        const studentsToInsert = studentData.slice(1).map(row => {
            const name = row[9];
            if (!name) return null;
            return {
                name: name.trim(),
                parent_phone: row[7]?.trim() || null,
                student_phone: row[6]?.trim() || null,
                school: row[12]?.trim() || null,
                grade: row[13]?.trim() || null,
                status: 'Active',
            };
        }).filter(Boolean);

        if (studentsToInsert.length > 0) {
            console.log("Deleting existing students...");
            await supabase.from('students').delete().neq('id', '00000000-0000-0000-0000-000000000000');
            
            console.log(`Inserting ${studentsToInsert.length} students...`);
            const { error: studentInsertError } = await supabase.from('students').insert(studentsToInsert as any);
            if (studentInsertError) throw new Error(`Failed to insert students: ${studentInsertError.message}`);
        }
        console.log("--- Student Sync Complete ---");


        // --- Sync Classes (New Logic) ---
        const classesToInsert: any[] = [];
        const seenClasses = new Set<string>();
        let currentDay = '';

        for (let i = 0; i < scheduleData.length; i++) {
            const row = scheduleData[i];
            const firstCell = row[0]?.trim();

            if (['SAT', 'TUE', 'WED', 'THU', 'FRI', 'MON', 'SUN'].includes(firstCell)) {
                currentDay = firstCell;
                continue;
            }

            if (!currentDay || !firstCell || !firstCell.includes(':')) continue;

            const timeSlot = firstCell;
            const [startTime, endTime] = timeSlot.split('~').map(t => t.trim());

            for (let r = 0; r < ROOM_IDS.length; r++) {
                const classroom = ROOM_IDS[r];
                const classCode = row[r + 1]?.trim();

                if (classCode) {
                    const normalizedClassCode = normalizeClassName(classCode);
                    const uniqueKey = `${normalizedClassCode}#${currentDay}#${startTime}`;

                    if (!seenClasses.has(uniqueKey)) {
                         const teacherRow = scheduleData[i + 2]; // Teacher is 2 rows below class
                         const teacherName = teacherRow ? teacherRow[r + 1]?.trim() : null;

                        classesToInsert.push({
                            class_code: classCode,
                            subject_name: classCode, // Assuming class_code and subject_name are the same for now
                            day_of_week: currentDay,
                            start_time: startTime,
                            end_time: endTime || null,
                            classroom: classroom,
                            teacher_name: teacherName || null,
                        });
                        seenClasses.add(uniqueKey);
                    }
                }
            }
        }
        
        if (classesToInsert.length > 0) {
            console.log("Deleting existing classes...");
            await supabase.from('classes').delete().neq('id', '00000000-0000-0000-0000-000000000000');

            console.log(`Inserting ${classesToInsert.length} classes...`);
            const { error: classInsertError } = await supabase.from('classes').insert(classesToInsert);
            if (classInsertError) throw new Error(`Failed to insert classes: ${classInsertError.message}`);
        }
        console.log("--- Class Sync Complete ---");


        console.log("Full Sync completed successfully.");
        return NextResponse.json({ success: true, message: `Synced ${studentsToInsert.length} students and ${classesToInsert.length} classes.` });

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        console.error("Sync process failed:", errorMessage);
        return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
    }
}
