'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { format, startOfDay, endOfDay } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Filter, Calendar, UserCheck, UserX, Undo, MessageSquare } from 'lucide-react';
import { TimetableData, TimeSlot, StudentInfo, ClassInfo } from '@/lib/timetable';
import { useTimetableStore } from '@/store/timetableStore';
import { supabase } from '@/lib/supabase';

type AttendanceStatus = '등원' | '미등원' | '결석';

// New type for modal state
interface ModalState {
    isOpen: boolean;
    student?: StudentInfo;
    classInfo?: ClassInfo;
    selectedDate?: Date;
}

const getStatusColor = (status: AttendanceStatus): string => {
    switch (status) {
        case '등원': return 'text-blue-700';
        case '미등원': return 'text-gray-800';
        case '결석': return 'text-red-700';
        default: return 'text-gray-500';
    }
};

const dayToAppDay = (date: Date): string => {
    const jsDayToAppDay = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    return jsDayToAppDay[date.getDay()];
};

const dayToKorean = (dayIndex: number, type: 'full' | 'short' = 'full'): string => {
    const fullDays = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
    const shortDays = ['일', '월', '화', '수', '목', '금', '토'];
    return type === 'full' ? fullDays[dayIndex] : shortDays[dayIndex];
}

interface ScheduleClientPageProps {
    initialData: TimetableData;
}

const ROOM_IDS = ['1', '2', '3', '4', '5', '6', '7', 'MS'];

export default function ScheduleClientPage({ initialData }: ScheduleClientPageProps) {
    const { timetableData, initialize } = useTimetableStore();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [dailyLogs, setDailyLogs] = useState<any[]>([]); // This will hold logs with student names
    const [modalState, setModalState] = useState<ModalState>({ isOpen: false });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [modalFeedback, setModalFeedback] = useState({ type: '', message: '' });

    // Refactored fetchAttendance to get logs for the day with student info
    const fetchAttendance = useCallback(async (date: Date) => {
        const start = startOfDay(date);
        const end = endOfDay(date);

        const { data: logs, error } = await supabase
            .from('attendance_logs')
            .select(`
                    class_id,
                    status,
                    students ( id, name )
                `)
            .gte('check_in_time', start.toISOString())
            .lte('check_in_time', end.toISOString());

        if (error) {
            console.error("Error fetching daily attendance logs:", error);
            setDailyLogs([]);
            return;
        }

        console.log("Fetched daily logs:", logs)
        setDailyLogs(logs || []);
    }, [supabase]);

    useEffect(() => {
        initialize(initialData);
    }, [initialData, initialize]);

    const selectedAppDay = useMemo(() => dayToAppDay(selectedDate), [selectedDate]);
    const selectedKoreanDay = useMemo(() => dayToKorean(selectedDate.getDay()), [selectedDate]);

    const currentDayTimetable = useMemo(() => timetableData[selectedAppDay] || [], [timetableData, selectedAppDay]);

    useEffect(() => {
        fetchAttendance(selectedDate);
    }, [selectedDate, fetchAttendance]);


    const handleStudentClick = (student: StudentInfo, classInfo: ClassInfo) => {
        setModalFeedback({ type: '', message: '' }); // Reset feedback on open
        setModalState({ isOpen: true, student, classInfo, selectedDate });
    };

    const handleModalAction = async (action: 'present' | 'absent' | 'reset' | 'sms') => {
        if (!modalState.student || !modalState.classInfo || !modalState.selectedDate) return;

        setIsSubmitting(true);
        setModalFeedback({ type: '', message: '' });

        if (!modalState.student.id || !modalState.classInfo.classId) {
            setModalFeedback({ type: 'error', message: '학생 또는 수업 ID가 없어 처리할 수 없습니다. 데이터 동기화를 확인하세요.' });
            setIsSubmitting(false);
            return;
        }

        const { student, classInfo, selectedDate } = modalState;
        let isSuccess = false;

        try {
            if (action === 'present' || action === 'absent') {
                const { data: existingLog } = await supabase
                    .from('attendance_logs')
                    .select('id')
                    .eq('student_id', student.id)
                    .eq('class_id', classInfo.classId)
                    .gte('check_in_time', startOfDay(selectedDate).toISOString())
                    .lte('check_in_time', endOfDay(selectedDate).toISOString())
                    .maybeSingle();

                const { error } = await supabase.from('attendance_logs').upsert({
                    id: existingLog?.id,
                    student_id: student.id,
                    class_id: classInfo.classId,
                    status: action,
                    check_in_time: selectedDate.toISOString(), // FIX: Use selectedDate directly
                    method: 'Manual',
                });

                if (error) throw error;
                setModalFeedback({ type: 'success', message: `'${action === 'present' ? '출석' : '결석'}' 처리 완료.` });
                isSuccess = true;

            } else if (action === 'reset') {
                const { error } = await supabase
                    .from('attendance_logs')
                    .delete()
                    .eq('student_id', student.id)
                    .eq('class_id', classInfo.classId)
                    .gte('check_in_time', startOfDay(selectedDate).toISOString())
                    .lte('check_in_time', endOfDay(selectedDate).toISOString());

                if (error) throw error;
                setModalFeedback({ type: 'success', message: '출결 상태를 초기화했습니다.' });
                isSuccess = true;

            } else if (action === 'sms') {
                const { data: studentData } = await supabase
                    .from('students')
                    .select('parent_phone')
                    .eq('id', student.id)
                    .single();

                if (!studentData?.parent_phone) throw new Error('학부모 연락처가 없어 문자를 보낼 수 없습니다.');

                const response = await fetch('/api/send-message', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        studentName: student.name,
                        parentPhone: studentData.parent_phone,
                        time: format(new Date(), 'HH:mm'),
                        className: classInfo.className,
                    }),
                });

                if (!response.ok) throw new Error('문자 발송 API 호출에 실패했습니다.');
                setModalFeedback({ type: 'success', message: '출석 문자를 발송했습니다.' });
                isSuccess = true;
            }

            if (isSuccess) {
                await fetchAttendance(selectedDate);
            }

        } catch (err: any) {
            console.error('Modal action error:', err);
            setModalFeedback({ type: 'error', message: err.message || '작업에 실패했습니다.' });
        } finally {
            setIsSubmitting(false);
            if (isSuccess) {
                setTimeout(() => setModalState({ isOpen: false }), 1500);
            }
        }
    };

    // Extract unique rooms from currentDayTimetable
    const classrooms = useMemo(() => {
        const rooms = new Set<string>();
        currentDayTimetable.forEach(slot => {
            Object.keys(slot.rooms).forEach(room => rooms.add(room));
        });
        return Array.from(rooms).sort((a, b) => {
            const numA = parseInt(a, 10);
            const numB = parseInt(b, 10);
            if (!isNaN(numA) && !isNaN(numB)) return numA - numB;
            return a.localeCompare(b);
        });
    }, [currentDayTimetable]);


    const renderQuickDateButtons = () => {
        const buttons = [];
        const today = new Date();
        for (let i = 6; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            const dayInitial = dayToKorean(date.getDay(), 'short');

            const isToday = i === 0;
            const label = isToday ? `오늘 (${dayInitial})` : `${date.getMonth() + 1}/${date.getDate()} (${dayInitial})`;

            buttons.push(
                <button
                    key={i}
                    onClick={() => setSelectedDate(date)}
                    className={`px-3 py-1.5 text-sm font-semibold rounded-md transition-colors ${selectedDate.toDateString() === date.toDateString() ? 'bg-dlab-blue text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                    {label}
                </button>
            );
        }
        return buttons;
    };

    const getSubjectColor = (className: string) => {
        if (className.startsWith('DM-PY')) return 'bg-blue-50 border-blue-300';
        if (className.startsWith('DM-ST')) return 'bg-blue-50 border-blue-300';
        if (className.startsWith('DC-C')) return 'bg-orange-50 border-orange-300';
        if (className.startsWith('DC-RX')) return 'bg-green-50 border-green-300';
        if (className.startsWith('DM-AICE')) return 'bg-purple-50 border-purple-300';
        if (className.startsWith('DS')) return 'bg-yellow-50 border-yellow-300';
        if (className.startsWith('DM1')) return 'bg-sky-50 border-sky-300';
        if (className.startsWith('DR')) return 'bg-pink-50 border-pink-300';
        return 'bg-gray-50 border-gray-200';
    };

    return (
        <div className="space-y-6 h-full flex flex-col p-6 bg-gray-50">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800">시간표 - {selectedKoreanDay}</h1>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg p-2 shadow-sm">
                        {renderQuickDateButtons()}
                    </div>
                    <div className="relative">
                        <DatePicker
                            selected={selectedDate}
                            onChange={(date: Date | null) => date && setSelectedDate(date)}
                            locale={ko}
                            dateFormat="yyyy년 MM월 dd일"
                            className="w-48 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 shadow-sm cursor-pointer"
                        />
                        <Calendar size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>
                </div>
            </div>

            <div className="flex-1 bg-white rounded-xl border border-gray-200 shadow-lg overflow-auto">
                <table className="w-full min-w-[1200px] border-collapse">
                    <thead>
                        <tr>
                            <th className="p-4 border-b-2 border-r border-gray-200 bg-gray-100 w-28 sticky top-0 left-0 z-20 font-semibold text-gray-600">시간</th>
                            {classrooms.map(room => (
                                <th key={room} className="p-4 border-b-2 border-r border-gray-200 bg-gray-100 min-w-[220px] sticky top-0 z-10 font-semibold text-gray-600">
                                    {room}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {currentDayTimetable.length > 0 ? currentDayTimetable.map((slot: TimeSlot) => (
                            <tr key={slot.time}>
                                <td className="p-2 border-b border-r border-gray-200 bg-gray-50 text-base font-bold text-gray-700 sticky left-0 z-10 text-center">
                                    {slot.time}
                                </td>
                                {classrooms.map(room => {
                                    const classInfo = slot.rooms[room];
                                    return (
                                        <td key={`${slot.time}-${room}`} className="p-1.5 border-b border-r border-gray-100 h-40 relative align-top">
                                            {classInfo && (
                                                <div className={`
                                                    absolute top-1.5 left-1.5 right-1.5 bottom-1.5 rounded-lg p-2 border-l-4 shadow-md flex flex-col
                                                    transition-all duration-200 ease-in-out hover:shadow-xl hover:border-blue-500
                                                    ${getSubjectColor(classInfo.className)}
                                                `}>
                                                    {/* Changed: Compact header, reduced to 2 lines */}
                                                    <div className="flex-shrink-0 mb-1.5">
                                                        <p className="font-bold text-sm truncate text-gray-900">{classInfo.className}</p>
                                                        <p className="text-xs truncate text-gray-600">{classInfo.instructor} 선생님 / {slot.time}</p>
                                                    </div>

                                                    {/* Changed: Student list */}
                                                    <div className="flex-grow overflow-y-auto text-xs">

                                                        {(() => {
                                                            const studentsInClass = dailyLogs.filter(log => log.class_id === classInfo.classId && log.students);

                                                            if (studentsInClass.length > 0) {
                                                                return (
                                                                    <div className="flex flex-wrap -mx-0.5">
                                                                        {studentsInClass.map(log => {
                                                                            const student = log.students as StudentInfo; // Type assertion
                                                                            let status: AttendanceStatus;
                                                                            if (log.status === 'present') {
                                                                                status = '등원';
                                                                            } else if (log.status === 'absent') {
                                                                                status = '결석';
                                                                            } else {
                                                                                status = '미등원';
                                                                            }

                                                                            return (
                                                                                <div
                                                                                    key={student.id}
                                                                                    className={`w-1/3 px-0.5 py-0.5 truncate ${getStatusColor(status)} font-semibold cursor-pointer hover:opacity-75`}
                                                                                    onClick={() => handleStudentClick(student, classInfo)}
                                                                                >
                                                                                    {student.name}
                                                                                </div>
                                                                            );
                                                                        })}
                                                                    </div>
                                                                );
                                                            } else {
                                                                // If no logs, check current roster as a fallback for ANY day
                                                                if (classInfo.students.length > 0) {
                                                                    return (
                                                                        <div className="flex flex-wrap -mx-0.5">
                                                                            {classInfo.students.map(student => (
                                                                                <div
                                                                                    key={student.id || student.name}
                                                                                    className={`w-1/3 px-0.5 py-0.5 truncate text-gray-800 font-semibold cursor-pointer hover:opacity-75`}
                                                                                    onClick={() => handleStudentClick(student, classInfo)}
                                                                                >
                                                                                    {student.name}
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    );
                                                                }
                                                                return <p className="text-gray-400 text-center pt-4 text-xs">배정 학생 없음</p>;
                                                            }
                                                        })()}
                                                    </div>
                                                </div>
                                            )}
                                        </td>
                                    );
                                })}
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={ROOM_IDS.length + 1} className="text-center py-16 text-gray-500">
                                    선택한 날짜에 예정된 수업이 없습니다.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Student Action Modal */}
            {modalState.isOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-xs transform transition-all">
                        <div className="text-center mb-6">
                            <h3 className="text-xl font-bold text-gray-900">
                                {modalState.student?.name}
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">{modalState.classInfo?.className}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <button onClick={() => handleModalAction('present')} disabled={isSubmitting} className="flex flex-col items-center justify-center p-4 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 disabled:opacity-50">
                                <UserCheck className="w-6 h-6 mb-1" />
                                <span className="text-sm font-semibold">출석</span>
                            </button>
                            <button onClick={() => handleModalAction('absent')} disabled={isSubmitting} className="flex flex-col items-center justify-center p-4 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 disabled:opacity-50">
                                <UserX className="w-6 h-6 mb-1" />
                                <span className="text-sm font-semibold">결석</span>
                            </button>
                            <button onClick={() => handleModalAction('reset')} disabled={isSubmitting} className="flex flex-col items-center justify-center p-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50">
                                <Undo className="w-6 h-6 mb-1" />
                                <span className="text-sm font-semibold">미출석</span>
                            </button>
                            <button onClick={() => handleModalAction('sms')} disabled={isSubmitting} className="flex flex-col items-center justify-center p-4 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 disabled:opacity-50">
                                <MessageSquare className="w-6 h-6 mb-1" />
                                <span className="text-sm font-semibold">문자 발송</span>
                            </button>
                        </div>

                        {/* Feedback Area */}
                        <div className="h-8 mt-4 text-center">
                            {isSubmitting ? (
                                <p className="text-sm text-gray-500 animate-pulse">처리 중...</p>
                            ) : modalFeedback.message && (
                                <p className={`text-sm font-medium ${modalFeedback.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                                    {modalFeedback.message}
                                </p>
                            )}
                        </div>

                        <button
                            onClick={() => setModalState({ isOpen: false })}
                            disabled={isSubmitting}
                            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                        >
                            닫기
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
