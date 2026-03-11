
// lib/mockAttendance.ts
import { format } from 'date-fns';

export type MockAttendanceLog = {
  student_name: string;
  subject_name: string;
  check_in_time: string; // ISO format string
  status: '등원' | '결석';
};

const generateMockData = (): MockAttendanceLog[] => {
    const data: MockAttendanceLog[] = [];
    const today = new Date();
    
    // Some students for today
    data.push({
        student_name: '김루미',
        subject_name: 'DM103-3',
        check_in_time: new Date(today.setHours(9, 5)).toISOString(),
        status: '등원',
    });
    data.push({
        student_name: '황시우',
        subject_name: 'DM103-1',
        check_in_time: new Date(today.setHours(11, 2)).toISOString(),
        status: '등원',
    });
     data.push({
        student_name: '김시언',
        subject_name: 'DM103-1',
        check_in_time: new Date(today.setHours(11, 3)).toISOString(),
        status: '등원',
    });
    data.push({
        student_name: '최민호',
        subject_name: 'DC-RX-02',
        check_in_time: new Date(today.setHours(14, 0)).toISOString(),
        status: '등원',
    });


    // Some students for yesterday
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    
    data.push({
        student_name: '정제현',
        subject_name: 'DC-RX-02',
        check_in_time: new Date(yesterday.setHours(14, 10)).toISOString(),
        status: '등원',
    });
     data.push({
        student_name: '임서진',
        subject_name: 'DM-AICE-2',
        check_in_time: new Date(yesterday.setHours(9, 1)).toISOString(),
        status: '등원',
    });
    data.push({
        student_name: '윤호현',
        subject_name: 'DM-AICE-2',
        check_in_time: 'N/A',
        status: '결석',
    });

    // Some students for two days ago
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(today.getDate() - 2);

    data.push({
        student_name: '안지엘',
        subject_name: 'DM-AICE-2',
        check_in_time: new Date(twoDaysAgo.setHours(9, 3)).toISOString(),
        status: '등원',
    });

    return data;
};

export const MOCK_ATTENDANCE_LOGS: MockAttendanceLog[] = generateMockData();
