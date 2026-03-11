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
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 w-full max-w-lg">
                <h2 className="text-2xl font-bold text-white mb-4 text-center">학생 선택</h2>
                <p className="text-gray-400 text-center mb-6">같은 번호로 등록된 학생이 여러 명입니다.</p>

                <div className="space-y-3">
                    {students.map((student) => {
                        const classes = getStudentClassesForToday(student.id, today);
                        const classInfo = classes.length > 0 ? classes[0].subject_name : '수업 없음';

                        return (
                            <button
                                key={student.id}
                                onClick={() => onSelect(student)}
                                className="w-full p-4 bg-gray-800 hover:bg-dlab-blue border border-gray-700 rounded-xl flex justify-between items-center transition-all group"
                            >
                                <div className="text-left">
                                    <div className="text-xl font-bold text-white group-hover:text-white">
                                        {student.name} <span className="text-sm font-normal text-gray-400">({student.school} {student.grade})</span>
                                    </div>
                                    <div className="text-sm text-dlab-orange mt-1">{classInfo}</div>
                                </div>
                                <div className="text-dlab-orange font-medium group-hover:text-white">선택</div>
                            </button>
                        );
                    })}
                </div>

                <button
                    onClick={onCancel}
                    className="w-full mt-6 py-3 text-gray-400 hover:text-white transition-colors"
                >
                    취소
                </button>
            </div>
        </div>
    );
}
