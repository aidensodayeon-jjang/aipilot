'use client';

import { useState, useEffect, useMemo } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { ko } from 'date-fns/locale';
import { Users, UserCheck, UserX, Clock, Calendar } from 'lucide-react';
import { format, isSameDay, startOfDay, endOfDay } from 'date-fns';
import { supabase } from '@/lib/supabase';

// Updated type to include the new status column
interface AttendanceLog {
  check_in_time: string;
  status: string; // Re-added status
  students: { name: string } | null;
  classes: { subject_name: string } | null;
}

export default function AdminDashboard() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [logs, setLogs] = useState<AttendanceLog[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAttendanceLogs = async () => {
            setLoading(true);
            setError(null);
            
            const from = startOfDay(selectedDate).toISOString();
            const to = endOfDay(selectedDate).toISOString();

            const { data, error: dbError } = await supabase
                .from('attendance_logs')
                .select(`
                    check_in_time,
                    status,
                    students ( name ),
                    classes ( subject_name )
                `)
                .gte('check_in_time', from)
                .lte('check_in_time', to)
                .order('check_in_time', { ascending: false });

            if (dbError) {
                console.error("Error fetching attendance logs:", JSON.stringify(dbError, null, 2));
                setError("출결 기록을 불러오는 데 실패했습니다.");
                setLogs([]);
            } else {
                setLogs(data as AttendanceLog[]);
            }
            setLoading(false);
        };

        fetchAttendanceLogs();
    }, [selectedDate]);

    // Derived Stats from real logs using the new status field
    const arrivedCount = logs.filter(log => log.status === 'present').length;
    const absentCount = logs.filter(log => log.status === 'absent').length;
    const totalStudentsToday = useMemo(() => {
        const studentNames = new Set(logs.map(l => l.students?.name).filter(Boolean));
        return studentNames.size;
    }, [logs]);



    const renderQuickDateButtons = () => {
        const buttons = [];
        const today = new Date();
        const dayToKoreanShort = (dayIndex: number) => ['일', '월', '화', '수', '목', '금', '토'][dayIndex];
        
        for (let i = 6; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            const dayInitial = dayToKoreanShort(date.getDay());
            
            const isToday = i === 0;
            const label = isToday ? `오늘 (${dayInitial})` : `${date.getMonth() + 1}/${date.getDate()} (${dayInitial})`;

            buttons.push(
                <button
                    key={i}
                    onClick={() => setSelectedDate(date)}
                    className={`px-3 py-1.5 text-sm font-semibold rounded-md transition-colors ${isSameDay(selectedDate, date) ? 'bg-dlab-blue text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                    {label}
                </button>
            );
        }
        return buttons;
    };

    return (
        <div className="space-y-8">
            {/* Header and Date Picker */}
             <div className="flex flex-wrap justify-between items-center gap-4">
                <h1 className="text-3xl font-bold text-gray-800">대시보드</h1>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg p-2 shadow-sm">
                        {renderQuickDateButtons()}
                    </div>
                     <div className="relative">
                        <DatePicker
                            selected={selectedDate}
                            onChange={(date: Date) => setSelectedDate(date)}
                            locale={ko}
                            dateFormat="yyyy년 MM월 dd일"
                            className="w-48 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 shadow-sm cursor-pointer"
                        />
                        <Calendar size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
                        <Users size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">선택일 총원</p>
                        <p className="text-2xl font-bold text-gray-900">{totalStudentsToday}</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-green-100 text-green-600">
                        <UserCheck size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">등원 완료</p>
                        <p className="text-2xl font-bold text-gray-900">{arrivedCount}</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-red-100 text-red-600">
                        <UserX size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">결석</p>
                        <p className="text-2xl font-bold text-gray-900">{absentCount}</p>
                    </div>
                </div>
            </div>

            {/* Daily Attendance Log */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h3 className="font-bold text-gray-800">{format(selectedDate, 'MM월 dd일')} 등원 현황</h3>
                </div>
                <div className="divide-y divide-gray-100 max-h-[400px] overflow-y-auto">
                    {loading ? (
                        <div className="p-8 text-center text-gray-500">로딩 중...</div>
                    ) : error ? (
                        <div className="p-8 text-center text-red-500">{error}</div>
                    ) : logs.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">선택한 날짜의 등원 기록이 없습니다.</div>
                    ) : (
                        logs.map((log, index) => (
                            <div key={index} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${log.status === 'present' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                        {log.status === 'present' ? <UserCheck size={18} /> : <UserX size={18} />}
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">{log.students?.name || '알 수 없음'}</p>
                                        <p className="text-sm text-gray-500">{log.classes?.subject_name || '과목 정보 없음'}</p>
                                    </div>
                                </div>
                                <span className={`px-3 py-1 text-xs font-medium rounded-full ${log.status === 'present' ? 'text-green-700 bg-green-50' : 'text-red-700 bg-red-50'}`}>
                                    {log.status === 'present' ? `${format(new Date(log.check_in_time), 'HH:mm')} 등원` : '결석'}
                                </span>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
