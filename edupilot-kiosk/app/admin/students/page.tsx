'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { User, Search, AlertTriangle, RefreshCw, CheckCircle, XCircle, Phone } from 'lucide-react';

interface Student {
    id: string;
    name: string;
    parent_phone: string;
    student_phone?: string;
    school?: string;
    grade?: string;
    status: 'Active' | 'Paused';
}

export default function StudentManagementPage() {
    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    
    const [isSyncing, setIsSyncing] = useState(false);
    const [syncError, setSyncError] = useState<string | null>(null);
    const [syncSuccess, setSyncSuccess] = useState<string | null>(null);

    const fetchStudents = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const { data, error: supabaseError } = await supabase.from('students').select('*').order('name', { ascending: true });
            if (supabaseError) throw new Error(supabaseError.message);
            setStudents(data as Student[]);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
            setError(errorMessage);
            console.error('Error fetching students:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchStudents();
    }, [fetchStudents]);

    const handleSync = async () => {
        if (!confirm('정말로 Google Sheet의 데이터로 Supabase 학생 목록을 덮어쓰시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
            return;
        }

        setIsSyncing(true);
        setSyncError(null);
        setSyncSuccess(null);

        try {
            const response = await fetch('/api/sync', { method: 'POST' });
            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(result.error || 'Sync failed.');
            }
            setSyncSuccess(result.message);
            await fetchStudents(); // Refresh the student list
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
            setSyncError(errorMessage);
            console.error('Sync error:', err);
        } finally {
            setIsSyncing(false);
        }
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredStudents = students.filter((student: Student) =>
        (student.name || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800">수강생 관리</h1>
                <button
                    onClick={handleSync}
                    disabled={isSyncing}
                    className="flex items-center gap-2 px-4 py-2 bg-dlab-blue text-white rounded-lg shadow-sm hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                    <RefreshCw className={`h-4 w-4 ${isSyncing ? 'animate-spin' : ''}`} />
                    {isSyncing ? '동기화 중...' : 'Google Sheet와 동기화'}
                </button>
            </div>
            
            {syncError && (
                <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-800 flex items-center gap-3">
                    <XCircle />
                    <div><p className="font-bold">동기화 실패:</p><p className="text-sm">{syncError}</p></div>
                </div>
            )}
            {syncSuccess && (
                 <div className="p-4 rounded-lg bg-green-50 border border-green-200 text-green-800 flex items-center gap-3">
                    <CheckCircle />
                    <div><p className="font-bold">동기화 성공:</p><p className="text-sm">{syncSuccess}</p></div>
                </div>
            )}
            {error && !syncError && (
                <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-800 flex items-center gap-3">
                    <AlertTriangle />
                    <div><p className="font-bold">데이터 로딩 실패:</p><p className="text-sm">{error}</p></div>
                </div>
            )}

            <div className="bg-white rounded-xl border border-gray-200 shadow-lg">
                 <div className="p-4 flex justify-between items-center border-b border-gray-200">
                    <h3 className="font-bold text-gray-800">전체 수강생 목록 ({filteredStudents.length})</h3>
                    <div className="relative">
                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="학생 이름으로 검색..."
                            value={searchTerm}
                            onChange={handleSearch}
                            className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dlab-blue focus:outline-none"
                        />
                    </div>
                </div>
                
                <div className="overflow-x-auto">
                    {loading ? (
                        <div className="p-8 text-center text-gray-500">데이터를 불러오는 중입니다...</div>
                    ) : filteredStudents.length === 0 ? (
                         <div className="p-8 text-center text-gray-500">표시할 데이터가 없습니다.</div>
                    ) : (
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 text-gray-500 text-xs">
                                <tr>
                                    <th className="px-4 py-2">학생 정보</th>
                                    <th className="px-4 py-2">연락처</th>
                                    <th className="px-4 py-2">상태</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredStudents.map((student: Student) => (
                                    <tr key={student.id} className="even:bg-gray-50 hover:bg-blue-50">
                                        <td className="px-4 py-3">
                                            <p className="font-bold text-gray-900">{student.name}</p>
                                            <p className="text-xs text-gray-600">{student.school || '학교 정보 없음'} ({student.grade || '학년 정보 없음'})</p>
                                        </td>
                                        <td className="px-4 py-3">
                                            <a href={`tel:${student.parent_phone}`} className="flex items-center gap-1.5 text-gray-600 hover:text-dlab-blue">
                                                <Phone size={14} />
                                                <span className="font-medium">{student.parent_phone}</span>
                                                <span className="text-xs">(부)</span>
                                            </a>
                                            {student.student_phone && (
                                                 <a href={`tel:${student.student_phone}`} className="flex items-center gap-1.5 text-gray-500 hover:text-dlab-blue mt-1">
                                                    <Phone size={14} />
                                                    <span>{student.student_phone}</span>
                                                    <span className="text-xs">(학생)</span>
                                                </a>
                                            )}
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                                                student.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                                {student.status === 'Active' ? '재원' : '휴원'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}
