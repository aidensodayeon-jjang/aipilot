import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Delete } from 'lucide-react';

interface RightPanelProps {
  pin: string;
  onPinChange: (pin: string) => void;
  disabled: boolean;
  onSubmit: () => void;
}

export const RightPanel: React.FC<RightPanelProps> = ({ pin, onPinChange, disabled, onSubmit }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleNumberClick = (num: number) => {
    if (disabled || pin.length >= 4) return;
    onPinChange(pin + num.toString());
  };

  const handleDelete = () => {
    if (disabled || pin.length === 0) return;
    onPinChange(pin.slice(0, -1));
  };

  const renderPinDisplay = () => {
    const boxes = [];
    for (let i = 0; i < 4; i++) {
      const digit = pin[i] || '';
      boxes.push(
        <div 
          key={i} 
          className={`w-12 h-14 sm:w-14 sm:h-16 lg:w-16 lg:h-20 rounded-xl flex items-center justify-center text-2xl sm:text-3xl lg:text-4xl font-bold transition-all duration-200 border-2 ${
            digit ? 'border-dlab-blue text-dlab-blue bg-blue-50' : 'border-gray-200 bg-gray-50 text-transparent'
          }`}
        >
          {digit}
        </div>
      );
    }
    return boxes;
  };

  return (
    <div className="w-2/5 h-full bg-white flex flex-col items-center justify-center gap-4 sm:gap-6 lg:gap-8 py-6 px-4 sm:py-8 sm:px-6 z-10 overflow-y-auto border-l border-gray-100">
      
      {/* Header / Time */}
      <div className="text-center w-full shrink-0">
        <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-dlab-dark tracking-tight mb-1">
          {format(time, 'HH:mm')}
        </div>
        <div className="text-gray-500 font-medium text-sm sm:text-base lg:text-lg">
          {format(time, 'yyyy년 MM월 dd일')}
        </div>
      </div>

      {/* Guide & PIN Display */}
      <div className="w-full flex flex-col items-center shrink-0">
        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-dlab-dark mb-3 sm:mb-4 lg:mb-6 text-center leading-tight">
          학부모님 번호 뒷자리 <span className="text-dlab-blue">4자리</span>를<br/>입력해주세요
        </h3>
        <div className="flex gap-2 sm:gap-3 lg:gap-4">
          {renderPinDisplay()}
        </div>
      </div>

      {/* Keypad */}
      <div className="w-full max-w-sm grid grid-cols-3 gap-2 sm:gap-3 lg:gap-4 shrink-0">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <button
            key={num}
            onClick={() => handleNumberClick(num)}
            disabled={disabled}
            className="h-12 sm:h-14 lg:h-16 rounded-2xl bg-gray-50 hover:bg-blue-50 active:bg-blue-100 text-xl sm:text-2xl lg:text-3xl font-bold text-dlab-dark transition-colors flex items-center justify-center shadow-sm border border-gray-100 disabled:opacity-50"
          >
            {num}
          </button>
        ))}
        <button
          onClick={handleDelete}
          disabled={disabled}
          className="h-12 sm:h-14 lg:h-16 rounded-2xl bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-600 transition-colors flex items-center justify-center shadow-sm border border-gray-200 disabled:opacity-50"
        >
          <Delete className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8" />
        </button>
        <button
          onClick={() => handleNumberClick(0)}
          disabled={disabled}
          className="h-12 sm:h-14 lg:h-16 rounded-2xl bg-gray-50 hover:bg-blue-50 active:bg-blue-100 text-xl sm:text-2xl lg:text-3xl font-bold text-dlab-dark transition-colors flex items-center justify-center shadow-sm border border-gray-100 disabled:opacity-50"
        >
          0
        </button>
        <button
          onClick={onSubmit}
          disabled={disabled || pin.length !== 4}
          className="h-12 sm:h-14 lg:h-16 rounded-2xl bg-dlab-blue hover:bg-blue-700 active:bg-blue-800 text-white text-lg sm:text-xl lg:text-2xl font-bold transition-colors flex items-center justify-center shadow-md disabled:opacity-50 disabled:bg-gray-300 disabled:text-gray-500"
        >
          확인
        </button>
      </div>

    </div>
  );
};
