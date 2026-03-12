'use client';

import { Student } from '@/types';

import { getStudentClassesForToday } from '@/lib/mockData';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

interface SelectionModalProps {
    students: Student[];
    onSelect: (student: Student) => void;
    onCancel: () => void;
}

export default function SelectionModal({ students, onSelect, onCancel }: SelectionModalProps) {
    const today = format(new Date(), 'EEEE', { locale: ko });

    return (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl border border-slate-100">
                <h2 className="text-2xl font-bold text-slate-900 mb-2 text-center tracking-tight">학생 선택</h2>
                <p className="text-slate-500 text-center mb-8 font-medium">동일한 번호의 학생 중 한 명을 선택해 주세요.</p>

                <div className="space-y-3">
                    {students.map((student) => {
                        const classes = getStudentClassesForToday(student.id, today);
                        const classInfo = classes.length > 0 ? classes[0].subject_name : '오늘 수업 없음';

                        return (
                            <button
                                key={student.id}
                                onClick={() => onSelect(student)}
                                className="w-full p-5 bg-slate-50 hover:bg-slate-900 border border-slate-100 rounded-2xl flex justify-between items-center transition-all group active:scale-[0.98]"
                            >
                                <div className="text-left">
                                    <div className="text-xl font-bold text-slate-800 group-hover:text-white transition-colors">
                                        {student.name} <span className="text-sm font-medium text-slate-400 group-hover:text-slate-400">({student.school} {student.grade})</span>
                                    </div>
                                    <div className="text-sm font-semibold text-dlab-orange mt-1 group-hover:text-orange-300 transition-colors">{classInfo}</div>
                                </div>
                                <div className="bg-white px-4 py-2 rounded-xl text-slate-900 font-bold text-sm shadow-sm group-hover:bg-slate-800 group-hover:text-white transition-all">선택</div>
                            </button>
                        );
                    })}
                </div>

                <button
                    onClick={onCancel}
                    className="w-full mt-8 py-4 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-2xl transition-all active:scale-95"
                >
                    취소
                </button>
            </div>
        </div>
    );
}
