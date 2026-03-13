'use client';

import { Delete } from 'lucide-react';

interface KeypadProps {
    onKeyPress: (key: string) => void;
    onDelete: () => void;
    onSubmit: () => void;
    disabled?: boolean;
}

export default function Keypad({ onKeyPress, onDelete, onSubmit, disabled }: KeypadProps) {
    const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'del'];

    return (
        <div className="grid grid-cols-3 gap-4 w-full max-lg mx-auto">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((key) => (
                <button
                    key={key}
                    onClick={() => onKeyPress(key)}
                    disabled={disabled}
                    className="h-24 sm:h-28 bg-white hover:bg-slate-100 active:bg-slate-200 border border-slate-200 rounded-[2rem] text-4xl sm:text-5xl font-black text-slate-800 transition-all shadow-md active:scale-95 disabled:opacity-50"
                >
                    {key}
                </button>
            ))}
            <div />
            <button
                key="0"
                onClick={() => onKeyPress('0')}
                disabled={disabled}
                className="h-24 sm:h-28 bg-white hover:bg-slate-100 active:bg-slate-200 border border-slate-200 rounded-[2rem] text-4xl sm:text-5xl font-black text-slate-800 transition-all shadow-md active:scale-95 disabled:opacity-50"
            >
                0
            </button>
            <button
                key="del"
                onClick={onDelete}
                disabled={disabled}
                className="h-24 sm:h-28 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 rounded-[2rem] flex items-center justify-center transition-all text-slate-600 active:scale-95 disabled:opacity-50"
            >
                <Delete size={40} />
            </button>
            
            <button
                onClick={onSubmit}
                disabled={disabled}
                className="col-span-3 h-28 sm:h-32 bg-dlab-orange hover:bg-orange-600 active:scale-[0.98] rounded-[2.5rem] text-3xl sm:text-4xl font-black text-white mt-4 transition-all shadow-xl shadow-orange-100"
            >
                출석체크
            </button>
        </div>
    );
}
