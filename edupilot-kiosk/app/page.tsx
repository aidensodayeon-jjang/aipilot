'use client';

import { useState } from 'react';
import { useKioskStore } from '@/store/kioskStore';
import Keypad from '@/components/kiosk/Keypad';
import SelectionModal from '@/components/kiosk/SelectionModal';
import SuccessScreen from '@/components/kiosk/SuccessScreen';
import { Student, ClassSession } from '@/types';
import { format } from 'date-fns';

const API_BASE_URL = typeof window !== 'undefined' 
  ? (process.env.NEXT_PUBLIC_API_URL || 
      (window.location.hostname.includes('sodayeon.co.kr') 
        ? `https://${window.location.hostname}/api` 
        : `http://${window.location.hostname}:8000/api`))
  : (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api');

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

      // 2. Show Success
      setSuccessData({ 
        student, 
        classSession: { 
          subject_name: resData.class_name,
          classroom: resData.classroom
        } as any 
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

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-dlab-blue/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-dlab-orange/5 rounded-full blur-[100px]" />
      </div>

      <div className="z-10 w-full flex flex-col items-center justify-center gap-y-10 md:gap-y-16">
        {/* Logo Area - Concentrated (Expanded for Mobile) */}
        <div className="text-center relative w-[95vw] sm:w-[80vw] md:w-[60vw] max-w-4xl mx-auto">
          <h1 
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-slate-900 mb-4 tracking-tighter cursor-pointer select-none active:scale-95 transition-all duration-300 leading-[1.1]"
            onClick={toggleFullscreen}
            title="전체화면 전환"
          >
            <span className="text-dlab-orange">D</span>-LAB <span className="text-slate-900 font-extralight">스마트 출결</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 font-bold tracking-tight">학부모 전화번호 뒷 4자리를 입력해주세요</p>
        </div>

        {/* Pad Area - Focused Unit */}
        <div className="w-full max-w-md flex flex-col items-center">
          {/* Input Display */}
          <div className="w-full mb-6">
            <div className={`
              h-32 bg-white border-4 rounded-[2.5rem] flex items-center justify-center text-6xl font-mono tracking-[1.5rem] shadow-2xl shadow-slate-200/60 transition-all
              ${status === 'error' ? 'border-red-500 text-red-500' : 'border-slate-100 text-slate-900'}
            `}>
              {input.padEnd(4, '•').split('').map((char, i) => (
                <span key={i} className={i < input.length ? 'text-slate-900' : 'text-slate-200'}>
                  {i < input.length ? char : '•'}
                </span>
              ))}
            </div>
            {message && (
              <div className={`mt-4 text-center text-xl font-bold ${status === 'error' ? 'text-red-500' : 'text-dlab-orange'} animate-pulse`}>
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
          classroom={successData.classSession?.classroom || '1'}
          time={format(new Date(), 'HH:mm')}
          onComplete={handleSuccessComplete}
        />
      )}
    </main>
  );
}
