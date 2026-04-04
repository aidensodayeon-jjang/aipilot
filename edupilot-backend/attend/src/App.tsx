/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { LeftPanel } from './components/LeftPanel';
import { RightPanel } from './components/RightPanel';
import { Student } from './types';

export default function App() {
  const [pin, setPin] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null);

  const handlePinSubmit = async () => {
    if (pin.length !== 4) return;
    
    try {
      // 1단계: 학생 검색 및 티어 정보 조회
      // Vite 프록시가 /api를 http://localhost:8000으로 전달하므로 
      // 백엔드 주소는 /api/attend/search-v2/ 가 됩니다.
      const searchRes = await fetch('/api/attend/search-v2/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin, semester: '202509' }),
      });

      if (!searchRes.ok) throw new Error('Search failed');
      const students: Student[] = await searchRes.json();
      
      console.log('Matched Students:', students);

      if (students.length > 0) {
        const student = students[0]; // 첫 번째 매칭 학생 선택
        setCurrentStudent({
          ...student,
          points: student.points || 0 // 초기 포인트 설정
        });
        setStatus('success');

        // 2단계: 출석 체크 실행 (기존 기능 연동)
        const checkInRes = await fetch('/api/attend/check-in/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ student_id: student.id, semester: '202509' }),
        });

        if (checkInRes.ok) {
          const result = await checkInRes.json();
          // 백엔드에서 업데이트된 최신 정보를 반영 (포인트 적립 후)
          setCurrentStudent(prev => prev ? {
            ...prev,
            points: result.points,
            tier: result.tier,
            classroom: result.classroom
          } : null);
        }
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    }

    // Reset after delay
    setTimeout(() => {
      setStatus('idle');
      setPin('');
      setCurrentStudent(null);
    }, status === 'error' ? 2000 : 5000);
  };

  return (
    <div className="h-screen w-full bg-white flex items-center justify-center overflow-hidden">
      <div className="w-full h-full bg-white flex relative">
        <LeftPanel status={status} student={currentStudent} />
        <RightPanel pin={pin} onPinChange={setPin} disabled={status !== 'idle'} onSubmit={handlePinSubmit} />
      </div>
    </div>
  );
}
