import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CountUp from 'react-countup';
import confetti from 'canvas-confetti';
import { Trophy, Sparkles } from 'lucide-react';
import { Student } from '../types';
import { MOCK_STUDENTS } from '../data';

interface LeftPanelProps {
  status: 'idle' | 'success' | 'error';
  student: Student | null;
}

const PROMOTIONS = [
  {
    id: 1,
    title: "⌨️ 코인 이벤트: 디랩 타자 대회!",
    subtitle: "최고의 타자왕에 도전하고 코인 듬뿍 받아가세요",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "⛏️ 마인크래프트 디랩 학원 만들기",
    subtitle: "내가 상상하는 우리 학원을 마인크래프트로 직접 구현해보자!",
    image: "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "🚀 2026 여름방학 특강 사전등록",
    subtitle: "파이썬부터 AI까지, 한 달 만에 마스터하는 특별한 기회",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1000&auto=format&fit=crop"
  }
];

const getTier = (points: number) => {
  if (points >= 5000) return { name: '챌린저', color: 'from-red-500 via-yellow-500 to-blue-500', text: 'text-red-400' };
  if (points >= 4000) return { name: '다이아몬드', color: 'from-blue-400 to-cyan-300', text: 'text-blue-300' };
  if (points >= 3000) return { name: '플래티넘', color: 'from-teal-400 to-emerald-300', text: 'text-teal-300' };
  if (points >= 2000) return { name: '골드', color: 'from-yellow-400 to-amber-500', text: 'text-yellow-400' };
  if (points >= 1000) return { name: '실버', color: 'from-gray-300 to-slate-400', text: 'text-gray-300' };
  if (points >= 500) return { name: '브론즈', color: 'from-amber-700 to-orange-900', text: 'text-amber-600' };
  return { name: '아이언', color: 'from-gray-500 to-gray-700', text: 'text-gray-400' };
};

export const LeftPanel: React.FC<LeftPanelProps> = ({ status, student }) => {
  const [bgIndex, setBgIndex] = useState(0);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  useEffect(() => {
    if (status === 'idle') {
      const interval = setInterval(() => {
        setBgIndex((prev) => (prev + 1) % PROMOTIONS.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [status]);

  useEffect(() => {
    if (status === 'success') {
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
      }, 250);

      return () => clearInterval(interval);
    }
  }, [status]);

  const topStudents = [...MOCK_STUDENTS].sort((a, b) => b.points - a.points).slice(0, 3);

  return (
    <div className="relative w-3/5 h-full overflow-hidden bg-dlab-dark flex flex-col">
      {/* Logo - Always visible */}
      <div 
        onClick={toggleFullScreen}
        className="absolute top-6 left-6 z-30 cursor-pointer hover:scale-105 transition-transform origin-top-left scale-[0.6]"
      >
        {/* 사용자가 제공한 원본 로고 이미지를 사용하기 위해 img 태그로 변경했습니다. 
            public 폴더에 로고 이미지를 업로드하고 파일명을 맞춰주세요. (예: /logo.png) */}
        <img 
          src="/logo.png" 
          alt="디랩 코딩학원" 
          className="h-20 w-auto object-contain drop-shadow-lg"
          onError={(e) => {
            // 이미지가 없을 경우를 대비한 임시 폴백 UI
            e.currentTarget.style.display = 'none';
            e.currentTarget.nextElementSibling?.classList.remove('hidden');
          }}
        />
        <div className="hidden bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl border border-white/20">
          <div className="text-[11px] font-black text-black tracking-[0.3em] text-right mb-1">디 랩 코 딩 학 원</div>
          <div className="border-[3px] border-black px-3 py-1 flex items-center bg-white">
            <span className="text-2xl font-black tracking-tighter text-black">D<span className="text-lg relative -top-1 mx-0.5">.</span>LAB</span>
            <span className="mx-2 text-xl font-black text-black">|</span>
            <span className="text-xl font-black tracking-widest text-black">CODING</span>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {status === 'idle' ? (
          <motion.div
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 flex flex-col"
          >
            {/* Promotion Slider (Clear Background) */}
            <div className="relative flex-1 overflow-hidden bg-black">
              <AnimatePresence mode="wait">
                <motion.div
                  key={bgIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  className="absolute inset-0"
                >
                  <img 
                    src={PROMOTIONS[bgIndex].image} 
                    alt={PROMOTIONS[bgIndex].title}
                    className="absolute inset-0 w-full h-full object-cover opacity-90" 
                  />
                  {/* Gradient only at the bottom for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 p-10 w-full">
                    <motion.span 
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="inline-block px-4 py-1.5 bg-dlab-blue text-white text-sm font-bold rounded-full mb-4 shadow-lg"
                    >
                      DLab Event
                    </motion.span>
                    <motion.h2 
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="text-4xl sm:text-5xl font-extrabold text-white mb-3 leading-tight drop-shadow-lg"
                    >
                      {PROMOTIONS[bgIndex].title}
                    </motion.h2>
                    <motion.p 
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="text-xl sm:text-2xl text-gray-200 font-medium drop-shadow-md"
                    >
                      {PROMOTIONS[bgIndex].subtitle}
                    </motion.p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Compact Ranking Section at the bottom */}
            <div className="h-24 bg-dlab-dark border-t border-white/10 flex items-center px-6 shrink-0 z-10">
              <div className="flex items-center gap-2 mr-6 shrink-0">
                <Trophy className="w-6 h-6 text-yellow-400" />
                <span className="text-white font-bold text-base">리그오브디랩 랭킹</span>
              </div>
              <div className="flex gap-4 overflow-hidden w-full">
                {topStudents.map((s, idx) => {
                  const tier = getTier(s.points);
                  return (
                  <div key={s.id} className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-2 flex-1 min-w-0 border border-white/5 relative overflow-hidden">
                    <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${tier.color}`} />
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 shadow-inner ${
                      idx === 0 ? 'bg-gradient-to-br from-yellow-300 to-yellow-500 text-black' :
                      idx === 1 ? 'bg-gradient-to-br from-gray-200 to-gray-400 text-black' :
                      'bg-gradient-to-br from-amber-500 to-amber-700 text-white'
                    }`}>
                      {idx + 1}
                    </div>
                    <div className="truncate flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <div className="text-white font-bold text-sm truncate">{s.name}</div>
                        <div className={`text-[10px] font-black px-1.5 py-0.5 rounded bg-white/10 ${tier.text}`}>{tier.name}</div>
                      </div>
                      <div className="text-dlab-orange font-extrabold text-sm">{s.points.toLocaleString()} LOP</div>
                    </div>
                  </div>
                )})}
              </div>
            </div>
          </motion.div>
        ) : status === 'success' && student ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="absolute inset-0 bg-gradient-to-br from-dlab-blue to-indigo-900 flex flex-col items-center justify-center p-12 text-center"
          >
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="bg-white/20 backdrop-blur-lg rounded-full px-8 py-3 mb-8 border border-white/30 flex items-center gap-3"
            >
              <Sparkles className="text-yellow-300 w-6 h-6" />
              <span className="text-white text-xl font-bold tracking-wider">출석 완료</span>
              <Sparkles className="text-yellow-300 w-6 h-6" />
            </motion.div>

            <motion.h2 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-6xl font-extrabold text-white mb-6"
            >
              반가워요, <span className="text-yellow-300">{student.name}</span> 학생!
            </motion.h2>

            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-3xl text-blue-100 font-medium mb-12 flex flex-col items-center gap-4"
            >
              <div>오늘의 강의실은 <span className="text-white font-bold bg-white/20 px-4 py-1 rounded-lg ml-2">{student.classroom || '자습실'}</span> 입니다.</div>
              <div className="flex items-center gap-3 bg-black/30 px-6 py-2.5 rounded-full border border-white/10">
                <span className="text-lg text-gray-300">현재 티어:</span>
                <span className={`text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r ${getTier(student.points || 0).color}`}>
                  {student.tier || getTier(student.points || 0).name}
                </span>
              </div>
            </motion.div>

            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.7, type: 'spring', bounce: 0.5 }}
              className="bg-white rounded-3xl p-10 shadow-2xl w-full max-w-md relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-dlab-orange to-yellow-400" />
              <p className="text-gray-500 font-bold text-lg mb-2 uppercase tracking-widest">Total Points</p>
              <div className="text-7xl font-black text-dlab-blue flex items-baseline justify-center gap-2">
                <CountUp 
                  start={(student.points || 100) - 100} 
                  end={student.points || 0} 
                  duration={2.5} 
                  separator="," 
                  useEasing={true}
                />
                <span className="text-3xl text-dlab-orange ml-1">LOP</span>
              </div>
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2 }}
                className="mt-4 text-green-500 font-bold text-xl flex items-center justify-center gap-1"
              >
                <span>+100 LOP</span>
                <span className="text-sm text-gray-400 font-medium ml-2">(출석 보상)</span>
              </motion.div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-red-600 flex flex-col items-center justify-center p-12 text-center"
          >
            <h2 className="text-5xl font-bold text-white mb-4">일치하는 정보가 없습니다.</h2>
            <p className="text-2xl text-red-200">번호를 다시 확인해주세요.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
