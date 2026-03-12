'use client';

import { CheckCircle, X } from 'lucide-react';
import { useEffect } from 'react';

interface SuccessScreenProps {
    studentName: string;
    classNameStr: string;
    classroom: string;
    time: string;
    onComplete: () => void;
}

export default function SuccessScreen({ studentName, classNameStr, classroom, time, onComplete }: SuccessScreenProps) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onComplete();
        }, 2500);
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50 text-slate-900 animate-in fade-in duration-300">
            {/* 상단 우측 닫기 버튼 */}
            <button 
                onClick={onComplete}
                className="absolute top-8 right-8 p-3 bg-slate-100 hover:bg-slate-200 rounded-full transition-all flex items-center gap-2 active:scale-90"
            >
                <span className="font-bold text-slate-600">닫기</span>
                <X size={32} className="text-slate-600" />
            </button>

            <div className="bg-green-50 p-8 rounded-full mb-6">
                <CheckCircle size={80} className="text-green-500" />
            </div>
            
            <h1 className="text-6xl font-black mb-4 tracking-tight">출석 완료!</h1>
            <p className="text-3xl mb-8 text-slate-500 font-medium">{studentName} 학생, 환영합니다!</p>

            {/* 강의실 강조 표시 */}
            <div className="flex flex-col items-center mb-10">
                <div className="text-slate-400 text-xl font-bold mb-2">지정 강의실</div>
                <div className="bg-dlab-orange text-white text-9xl font-black px-12 py-6 rounded-[3rem] shadow-2xl shadow-orange-200 animate-bounce">
                    {classroom}
                </div>
                <div className="text-dlab-orange text-2xl font-bold mt-4">번 강의실로 입장하세요</div>
            </div>

            <div className="bg-slate-50 rounded-3xl p-8 w-full max-w-lg border border-slate-100 mb-10 shadow-sm">
                <div className="flex justify-between mb-4 text-xl">
                    <span className="text-slate-400 font-bold">수업명</span>
                    <span className="font-black text-slate-800">{classNameStr}</span>
                </div>
                <div className="flex justify-between text-xl">
                    <span className="text-slate-400 font-bold">출석 시각</span>
                    <span className="font-black text-slate-800">{time}</span>
                </div>
            </div>

            <button 
                onClick={onComplete}
                className="px-20 py-6 bg-slate-900 text-white rounded-[2rem] font-bold text-3xl shadow-xl shadow-slate-200 hover:bg-black transition-all active:scale-95"
            >
                확인
            </button>
        </div>
    );
}
