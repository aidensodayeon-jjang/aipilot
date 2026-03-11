import { Student, ClassSession, Enrollment } from '@/types';

export const MOCK_STUDENTS: Student[] = [
    { id: 's1', name: '김루미', parent_phone: '010-8939-3531', grade: '중2', school: '연희중', status: 'Active' },
    { id: 's2', name: '황시우', parent_phone: '010-8940-4453', grade: '초4', school: '영도초', status: 'Active' },
    { id: 's3', name: '김시언', parent_phone: '010-4594-3356', grade: '중1', school: '신서중', status: 'Active' },
    { id: 's4', name: '최민호', parent_phone: '010-4744-0751', grade: '초6', school: '서강초', status: 'Active' },
];

export const MOCK_CLASSES: ClassSession[] = [
    { id: 'c1', class_code: 'DM103-3', subject_name: '파이썬-2', day_of_week: '토요일', start_time: '16:00', classroom: 'DM103-3', teacher_name: '에디' },
    { id: 'c2', class_code: 'DM103-1', subject_name: '파이썬-1', day_of_week: '토요일', start_time: '11:00', classroom: 'DM103-1', teacher_name: '에디' },
    { id: 'c3', class_code: 'DC_RX_02', subject_name: '로블록스코딩-2', day_of_week: '토요일', start_time: '14:00', classroom: 'DC_RX_02', teacher_name: '에디' },
    { id: 'c4', class_code: 'DM104', subject_name: 'C++ 기초', day_of_week: '토요일', start_time: '14:00', classroom: 'DM104', teacher_name: '로엘' },
    { id: 'c5', class_code: 'DS101', subject_name: '자바스크립트', day_of_week: '토요일', start_time: '11:00', classroom: 'DS101', teacher_name: '지나' },
];

export const MOCK_ENROLLMENTS: Enrollment[] = [
    { student_id: 's1', class_id: 'c1' },
    { student_id: 's2', class_id: 'c2' },
    { student_id: 's3', class_id: 'c2' },
    { student_id: 's4', class_id: 'c3' },
];

// Helper to find students by last 4 digits
export const findStudentsByPhone = (last4: string) => {
    return MOCK_STUDENTS.filter(s => s.parent_phone.endsWith(last4));
};

// Helper to get today's classes for a student
export const getStudentClassesForToday = (studentId: string, dayOfWeek: string) => {
    const enrollment = MOCK_ENROLLMENTS.find(e => e.student_id === studentId);
    if (!enrollment) return [];

    const classSession = MOCK_CLASSES.find(c => c.id === enrollment.class_id && c.day_of_week === dayOfWeek);
    return classSession ? [classSession] : [];
};
