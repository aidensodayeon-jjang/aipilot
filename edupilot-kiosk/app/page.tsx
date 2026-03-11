'use client';

import { useState } from 'react';
import { useKioskStore } from '@/store/kioskStore';
import Keypad from '@/components/kiosk/Keypad';
import SelectionModal from '@/components/kiosk/SelectionModal';
import SuccessScreen from '@/components/kiosk/SuccessScreen';
import { Student, ClassSession } from '@/types';
import { format } from 'date-fns';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export default function KioskPage() {
  const {
    input,
    appendInput,
    deleteInput,
    resetInput,
    matchedStudents,
    setMatchedStudents,
    status,
    setStatus,
    message,
    setMessage
  } = useKioskStore();

  const [successData, setSuccessData] = useState<{ student: Student; classSession?: ClassSession } | null>(null);

  // Handle Keypad Input
  const handleKeyPress = (key: string) => {
    appendInput(key);
    setMessage('');
  };

  const handleDelete = () => {
    deleteInput();
    setMessage('');
  };

  const handleCheckIn = async (student: Student) => {
    try {
      // 1. Django Backend Check-In API call (이 안에서 SMS도 같이 처리됨)
      const response = await fetch(`${API_BASE_URL}/kiosk/check-in/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ student_id: student.id })
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.error || '출석 체크 실패');
      }

      // 2. Show Success (SMS 발송은 백엔드에서 이미 완료됨)
      setSuccessData({ 
        student, 
        classSession: { subject_name: resData.class_name } as any 
      });
      setStatus('success');
    } catch (err: any) {
      console.error('Check-in error:', err);
      setStatus('error');
      setMessage(err.message || '시스템 오류: 관리자에게 문의하세요.');
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
        resetInput();
      }, 3000);
    }
  };

  const handleSubmit = async () => {
    if (input.length < 4) {
      setMessage('4자리를 입력해주세요.');
      return;
    }

    setStatus('searching');

    try {
      // Django Backend Lookup API call
      const response = await fetch(`${API_BASE_URL}/kiosk/lookup/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input })
      });

      const found = await response.json();

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('학생을 찾을 수 없습니다.');
        }
        throw new Error('서버 오류가 발생했습니다.');
      }

      if (!found || found.length === 0) {
        throw new Error('학생을 찾을 수 없습니다.');
      } else if (found.length === 1) {
        handleCheckIn(found[0]);
      } else {
        setMatchedStudents(found);
        setStatus('selection');
      }
    } catch (err: any) {
      console.error('Search error:', err);
      setStatus('error');
      setMessage(err.message || '시스템 오류가 발생했습니다.');
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
        resetInput();
      }, 2000);
    }
  };

  const handleSelection = (student: Student) => {
    handleCheckIn(student);
  };

  const handleSuccessComplete = () => {
    setSuccessData(null);
    setStatus('idle');
    resetInput();
    setMessage('');
  };

  return (
    <main className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-dlab-blue/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-dlab-orange/10 rounded-full blur-[100px]" />
      </div>

      <div className="z-10 w-full max-w-md flex flex-col items-center">
        {/* Logo Area */}
        <div className="mb-12 text-center relative">
          <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
            <span className="text-dlab-orange">D</span>-LAB <span className="text-gray-400 font-light">스마트 출결</span>
          </h1>
          <p className="text-gray-500">학부모 전화번호 뒷 4자리를 입력해주세요</p>
        </div>

        {/* Input Display */}
        <div className="w-full mb-8">
          <div className={`
            h-24 bg-gray-900/50 border-2 rounded-2xl flex items-center justify-center text-5xl font-mono text-white tracking-[1rem] shadow-inner backdrop-blur-sm transition-colors
            ${status === 'error' ? 'border-red-500 text-red-500' : 'border-dlab-blue/30 focus-within:border-dlab-orange'}
          `}>
            {input.padEnd(4, '•').split('').map((char, i) => (
              <span key={i} className={i < input.length ? 'text-white' : 'text-gray-700'}>
                {i < input.length ? char : '•'}
              </span>
            ))}
          </div>
          {message && (
            <div className={`mt-4 text-center font-medium ${status === 'error' ? 'text-red-500' : 'text-dlab-orange'} animate-pulse`}>
              {message}
            </div>
          )}
        </div>

        {/* Keypad */}
        <Keypad
          onKeyPress={handleKeyPress}
          onDelete={handleDelete}
          onSubmit={handleSubmit}
          disabled={status === 'searching' || status === 'success'}
        />
      </div>

      {/* Modals */}
      {status === 'selection' && (
        <SelectionModal
          students={matchedStudents}
          onSelect={handleSelection}
          onCancel={() => {
            setStatus('idle');
            setMatchedStudents([]);
          }}
        />
      )}

      {status === 'success' && successData && (
        <SuccessScreen
          studentName={successData.student.name}
          classNameStr={successData.classSession?.subject_name || '자습/방문'}
          time={format(new Date(), 'HH:mm')}
          onComplete={handleSuccessComplete}
        />
      )}
    </main>
  );
}
