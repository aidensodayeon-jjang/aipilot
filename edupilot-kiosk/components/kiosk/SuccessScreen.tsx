'use client';

import { CheckCircle, X } from 'lucide-react';
import { useEffect } from 'react';

interface SuccessScreenProps {
    studentName: string;
    classNameStr: string; // "ClassName" is a reserved word
    time: string;
    onComplete: () => void;
}

export default function SuccessScreen({ studentName, classNameStr, time, onComplete }: SuccessScreenProps) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onComplete();
        }, 2500); // 5초에서 2.5초로 대기 시간 단축
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div className="fixed inset-0 bg-dlab-blue flex flex-col items-center justify-center z-50 text-white animate-in fade-in duration-300">
            {/* 상단 우측 닫기 버튼 */}
            <button 
                onClick={onComplete}
                className="absolute top-8 right-8 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors flex items-center gap-2"
            >
                <span className="font-bold">닫기</span>
                <X size={32} />
            </button>

            <div className="bg-white/10 p-8 rounded-full mb-8">
                <CheckCircle size={80} className="text-green-400" />
            </div>
            
            <h1 className="text-5xl font-bold mb-6">출석 완료!</h1>
            <p className="text-3xl mb-10 text-gray-200">{studentName} 학생, 환영합니다!</p>

            <div className="bg-white/10 rounded-2xl p-8 w-full max-w-lg backdrop-blur-sm border border-white/20 mb-12 shadow-2xl">
                <div className="flex justify-between mb-4 text-xl">
                    <span className="text-gray-300">강의실/수업</span>
                    <span className="font-bold text-white">{classNameStr}</span>
                </div>
                <div className="flex justify-between text-xl">
                    <span className="text-gray-300">시간</span>
                    <span className="font-bold text-white">{time}</span>
                </div>
            </div>

            <button 
                onClick={onComplete}
                className="px-16 py-6 bg-white text-dlab-blue rounded-2xl font-black text-2xl shadow-xl hover:bg-gray-100 transition-all active:scale-95"
            >
                확인 (닫기)
            </button>
        </div>
    );
}
