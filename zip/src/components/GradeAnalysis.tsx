import React, { useMemo } from 'react';
import { StudentData } from '../utils/dataProcessor';
import { motion } from 'motion/react';

export const GradeAnalysis: React.FC<{ data: StudentData[] }> = ({ data }) => {
  const stats = useMemo(() => {
    let elementaryHigh = 0; // 초5, 초6
    let middle = 0; // 중1~3
    let others = 0;

    data.forEach(s => {
      const g = s.grade;
      if (g.includes('초5') || g.includes('초6')) elementaryHigh++;
      else if (g.includes('중')) middle++;
      else others++;
    });

    const total = data.length;
    return {
      elementaryHigh: { count: elementaryHigh, percent: (elementaryHigh / total) * 100 },
      middle: { count: middle, percent: (middle / total) * 100 },
      others: { count: others, percent: (others / total) * 100 },
    };
  }, [data]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white p-6 rounded-xl shadow-sm border border-slate-100"
    >
      <h3 className="text-lg font-semibold text-slate-800 mb-4">학년별 구성비</h3>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium text-slate-700">초등 고학년 (5-6학년)</span>
            <span className="text-slate-500">{stats.elementaryHigh.count}명 ({stats.elementaryHigh.percent.toFixed(1)}%)</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2.5">
            <div className="bg-emerald-500 h-2.5 rounded-full" style={{ width: `${stats.elementaryHigh.percent}%` }}></div>
          </div>
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium text-slate-700">중등부 (1-3학년)</span>
            <span className="text-slate-500">{stats.middle.count}명 ({stats.middle.percent.toFixed(1)}%)</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2.5">
            <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${stats.middle.percent}%` }}></div>
          </div>
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium text-slate-700">기타</span>
            <span className="text-slate-500">{stats.others.count}명 ({stats.others.percent.toFixed(1)}%)</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2.5">
            <div className="bg-slate-300 h-2.5 rounded-full" style={{ width: `${stats.others.percent}%` }}></div>
          </div>
        </div>
      </div>
      <div className="mt-6 p-4 bg-slate-50 rounded-lg text-sm text-slate-600">
        <p className="font-semibold mb-1">💡 커리큘럼 제안:</p>
        {stats.elementaryHigh.count > stats.middle.count ? (
          <p>초등 고학년 비중이 높습니다. 중등 연계 심화 과정(파이썬, C언어 기초)을 강화하여 장기 재원을 유도하세요.</p>
        ) : (
          <p>중등부 비중이 높습니다. 내신 대비 및 특목고 입시 관련 포트폴리오 반을 개설하면 효과적입니다.</p>
        )}
      </div>
    </motion.div>
  );
};
