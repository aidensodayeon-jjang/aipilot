// New interface for students to include their ID
export interface StudentInfo {
    id: string | null;
    name: string;
}

export interface ClassInfo {
    classId: string | null; // New: Add classId
    className: string;
    students: StudentInfo[]; // Changed: from string[] to StudentInfo[]
    instructor: string;
}

export interface TimeSlot {
    time: string;
    rooms: { [roomId: string]: ClassInfo | null };
}

export interface TimetableData {
    [day: string]: TimeSlot[];
}

const ROOM_IDS = ['1', '2', '3', '4', '5', '6', '7', 'MS'];

// Now exported
export function normalizeClassName(name: string): string {
    if (!name) return '';
    return name.toUpperCase().trim().replace(/_/g, '-').replace(/-0+(\d)/g, '-$1');
}

// Now exported
export function normalizeTime(timeStr: string): string {
    const parts = timeStr.split(':');
    if (parts.length >= 2) { // Changed from == 2 to >= 2 to handle HH:MM:SS
        const hour = parts[0].padStart(2, '0');
        const minute = parts[1].padStart(2, '0');
        return `${hour}:${minute}`;
    }
    return timeStr; // Return as is if format is unexpected
}

export function processTimetableData(
    scheduleData: (string | null)[][],
    studentData: (string | null)[][],
    nameToIdMap: Map<string, string>, // New parameter
    classKeyToIdMap: Map<string, string> // New parameter
): TimetableData {
    const dayToShortCode: { [key: string]: string } = {
        '월요일': 'MON', '화요일': 'TUE', '수요일': 'WED', '목요일': 'THU', '금요일': 'FRI', '토요일': 'SAT', '일요일': 'SUN'
    };
    const periodMap: { [key: string]: string } = {
        '1교시': '09:00', '2교시': '11:00', '3교시': '14:00', '4교시': '16:00', '5교시': '18:00'
    };

    const studentHeader = studentData[0] || [];
    const studentNameIndex = studentHeader.indexOf('학생이름');
    const classCodeIndex = studentHeader.indexOf('수강과목');
    const classTimeIndex = studentHeader.indexOf('수강시간');

    // Changed: Value is now StudentInfo[]
    const classToStudents: { [uniqueKey: string]: StudentInfo[] } = {};

    if (studentNameIndex === -1 || classCodeIndex === -1 || classTimeIndex === -1) {
        console.error("[processTimetableData] Student data headers '학생이름', '수강과목', or '수강시간' not found.");
        return {};
    }

    for (let i = 1; i < studentData.length; i++) {
        const record = studentData[i];
        const studentName = record[studentNameIndex]?.trim();
        const classCode = record[classCodeIndex]?.trim();
        const classTimeRaw = record[classTimeIndex]?.trim();

        if (studentName && classCode && classTimeRaw) {
            let classTime = classTimeRaw;
            for (const period in periodMap) {
                if (classTimeRaw.includes(period)) {
                    classTime = classTimeRaw.replace(period, periodMap[period]);
                    break;
                }
            }

            const normalizedClassCode = normalizeClassName(classCode);
            const timeParts = classTime.split(' ');
            
            if (timeParts.length === 2) {
                const dayCode = dayToShortCode[timeParts[0]];
                const rawTime = timeParts[1];
                const normalizedTime = normalizeTime(rawTime);
                if (dayCode && normalizedTime) {
                    const uniqueKey = `${normalizedClassCode}#${dayCode}#${normalizedTime}`;
                    
                    if (!classToStudents[uniqueKey]) {
                        classToStudents[uniqueKey] = [];
                    }
                    
                    // Changed: Push StudentInfo object instead of just name
                    const studentId = nameToIdMap.get(studentName) || null;
                    if (!classToStudents[uniqueKey].some(s => s.name === studentName)) {
                        classToStudents[uniqueKey].push({ id: studentId, name: studentName });
                    }
                }
            }
        }
    }

    const records = scheduleData;
    const timetableData: TimetableData = {};
    let currentDay = '';
    let currentTimeSlots: TimeSlot[] = [];
    let logCount = 0;
    console.log("--- Generating Lookup Keys from Sheet Data ---");

    for (let i = 0; i < records.length; i++) {
        const row = records[i];
        const firstCell = row[0]?.trim();

        if (['SAT', 'TUE', 'WED', 'THU', 'FRI', 'MON', 'SUN'].includes(firstCell)) {
            if (currentDay) timetableData[currentDay] = currentTimeSlots;
            currentDay = firstCell;
            currentTimeSlots = [];
            continue;
        }

        if (!currentDay || !firstCell || firstCell.includes('강의실')) continue;

        if (firstCell.includes('~') || firstCell.includes(':')) {
            const time = firstCell;
            const startTimeRaw = time.split('~')[0].trim();
            const normalizedStartTime = normalizeTime(startTimeRaw);
            const rooms: { [roomId: string]: ClassInfo | null } = {};

            for (let r = 0; r < ROOM_IDS.length; r++) {
                const roomId = ROOM_IDS[r];
                const colIndex = r + 1;
                const rawClassName = row[colIndex]?.trim();

                if (rawClassName) {
                    const instructorRow = records[i + 2];
                    const instructor = instructorRow ? instructorRow[colIndex]?.trim() : '';
                    const normalizedCode = normalizeClassName(rawClassName);
                    const lookupKey = `${normalizedCode}#${currentDay}#${normalizedStartTime}`;
                    
                    if (logCount < 5) {
                        console.log(`Sheet Lookup Key generated: "${lookupKey}"`);
                        logCount++;
                    }

                    const students = classToStudents[lookupKey] || [];
                    const classId = classKeyToIdMap.get(lookupKey) || null; // New: Get classId

                    rooms[roomId] = { classId, className: rawClassName, students, instructor };
                } else {
                    rooms[roomId] = null;
                }
            }
            currentTimeSlots.push({ time, rooms });
        }
    }
    console.log("--- Finished Generating Sheet Lookup Keys ---");

    if (currentDay) timetableData[currentDay] = currentTimeSlots;

    return timetableData;
}
