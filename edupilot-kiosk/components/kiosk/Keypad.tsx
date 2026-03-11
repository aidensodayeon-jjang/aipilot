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
        <div className="grid grid-cols-3 gap-4 w-full max-w-md mx-auto">
            {keys.map((key) => {
                if (key === '') return <div key="empty" />;
                if (key === 'del') {
                    return (
                        <button
                            key="del"
                            onClick={onDelete}
                            disabled={disabled}
                            className="h-20 bg-gray-700 hover:bg-gray-600 active:bg-gray-500 rounded-xl flex items-center justify-center transition-colors text-white"
                        >
                            <Delete size={32} />
                        </button>
                    );
                }
                return (
                    <button
                        key={key}
                        onClick={() => onKeyPress(key)}
                        disabled={disabled}
                        className="h-20 bg-gray-800 hover:bg-gray-700 active:bg-gray-600 rounded-xl text-3xl font-bold text-white transition-colors"
                    >
                        {key}
                    </button>
                );
            })}
            <button
                onClick={onSubmit}
                disabled={disabled}
                className="col-span-3 h-20 bg-dlab-orange hover:bg-orange-600 active:bg-orange-700 rounded-xl text-2xl font-bold text-white mt-4 transition-colors"
            >
                출석체크
            </button>
        </div>
    );
}
