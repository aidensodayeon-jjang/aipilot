
import { google } from 'googleapis';
import { NextRequest, NextResponse } from 'next/server';
import { processTimetableData, normalizeClassName, normalizeTime } from '@/lib/timetable';
import { supabase } from '@/lib/supabase';

// Helper to convert Korean day string to short code like 'SAT'
const dayToShortCode: { [key: string]: string } = {
    '월': 'MON', '화': 'TUE', '수': 'WED', '목': 'THU', '금': 'FRI', '토': 'SAT', '일': 'SUN'
};

export async function GET(req: NextRequest) {
    try {
        // 1. Fetch data from Google Sheets
        const privateKey = process.env.GOOGLE_API_PRIVATE_KEY?.replace(/\\n/g, '\n');
        const clientEmail = process.env.GOOGLE_API_CLIENT_EMAIL;
        const sheetId = process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID;

        const serverTabName = process.env.GOOGLE_SHEET_TAB_SERVER || '서버데이터';
        const scheduleTabName = process.env.GOOGLE_SHEET_TAB_SCHEDULE || '시간표';

        if (!privateKey || !clientEmail || !sheetId) {
            throw new Error("Google API credentials or Sheet ID are not set in environment variables.");
        }

        const auth = new google.auth.GoogleAuth({
            credentials: { client_email: clientEmail, private_key: privateKey },
            scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
        });

        const sheets = google.sheets({ version: 'v4', auth });

        const [serverDataResponse, scheduleDataResponse] = await Promise.all([
            sheets.spreadsheets.values.get({ spreadsheetId: sheetId, range: `${serverTabName}!A:U` }),
            sheets.spreadsheets.values.get({ spreadsheetId: sheetId, range: `${scheduleTabName}!A:Z` }),
        ]);

        const studentData = serverDataResponse.data.values;
        const timetableSheetData = scheduleDataResponse.data.values;

        if (!studentData || !timetableSheetData) {
            throw new Error("No data found in one or both of the sheets.");
        }

        // 2. Fetch mapping data from Supabase DB
        const [studentsResponse, classesResponse] = await Promise.all([
            supabase.from('students').select('id, name'),
            supabase.from('classes').select('id, class_code, day_of_week, start_time')
        ]);

        if (studentsResponse.error) throw new Error(`Failed to fetch students from DB: ${studentsResponse.error.message}`);
        if (classesResponse.error) throw new Error(`Failed to fetch classes from DB: ${classesResponse.error.message}`);

        // 3. Create ID maps
        const nameToIdMap = new Map(studentsResponse.data.map(s => [s.name, s.id]));

        const classKeyToIdMap = new Map<string, string>();
        let logCount = 0;
        console.log("--- Generating Class Keys from DB Data ---");
        classesResponse.data.forEach(c => {
            const normalizedName = normalizeClassName(c.class_code);
            const normalizedTime = normalizeTime(c.start_time);
            const key = `${normalizedName}#${c.day_of_week}#${normalizedTime}`;
            classKeyToIdMap.set(key, c.id);

            if (logCount < 5) {
                console.log(`DB Key generated: "${key}"`);
                logCount++;
            }
        });
        console.log("--- Finished Generating DB Keys ---");

        // 4. Process sheet data, enriching it with IDs
        const processedData = processTimetableData(timetableSheetData, studentData, nameToIdMap, classKeyToIdMap);

        return NextResponse.json({
            success: true,
            data: processedData,
        });

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        console.error("[API/sheets] Error:", errorMessage);
        return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
    }
}
