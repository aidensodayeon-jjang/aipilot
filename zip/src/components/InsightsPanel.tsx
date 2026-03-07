import React, { useMemo } from 'react';
import { StudentData } from '../utils/dataProcessor';
import { motion } from 'motion/react';
import { Lightbulb } from 'lucide-react';

export const InsightsPanel: React.FC<{ data: StudentData[] }> = ({ data }) => {
  const insights = useMemo(() => {
    let earlyBirdCount = 0;
    let siblingDiscountCount = 0;
    let unpaidCount = 0;
    let unpaidAmount = 0;

    data.forEach(s => {
      if (s.remarks.includes('얼리버드')) earlyBirdCount++;
      if (s.remarks.includes('형제') || s.remarks.includes('가족')) siblingDiscountCount++;
      if (s.paymentStatus === '미결제') {
        unpaidCount++;
        unpaidAmount += s.paymentAmount;
      }
    });

    return [
      {
        title: "얼리버드 혜택 의존도",
        content: `전체 수강생 중 ${earlyBirdCount}명이 얼리버드 혜택을 이용 중입니다. 등록 기간을 놓치지 않도록 사전 알림 시스템을 강화하세요.`,
        priority: "High"
      },
      {
        title: "미수금 관리 필요",
        content: `현재 미결제 인원은 ${unpaidCount}명이며, 총 미수금액은 ₩${unpaidAmount.toLocaleString()}입니다. '결제선생' 알림톡 발송 확인이 필요합니다.`,
        priority: "Critical"
      },
      {
        title: "형제/지인 소개 마케팅",
        content: `형제 할인 및 지인 소개 등록 건이 ${siblingDiscountCount}건 이상 확인됩니다. 소개 이벤트를 공식화하여 신규 유입을 늘리세요.`,
        priority: "Medium"
      }
    ];
  }, [data]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-gradient-to-br from-indigo-50 to-white p-6 rounded-xl shadow-sm border border-indigo-100"
    >
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="w-5 h-5 text-indigo-600" />
        <h3 className="text-lg font-semibold text-indigo-900">AI 운영 인사이트</h3>
      </div>
      <div className="space-y-4">
        {insights.map((insight, idx) => (
          <div key={idx} className="bg-white p-4 rounded-lg border border-indigo-50 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-semibold text-slate-800">{insight.title}</h4>
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                insight.priority === 'Critical' ? 'bg-rose-100 text-rose-700' :
                insight.priority === 'High' ? 'bg-amber-100 text-amber-700' :
                'bg-blue-100 text-blue-700'
              }`}>
                {insight.priority}
              </span>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              {insight.content}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
