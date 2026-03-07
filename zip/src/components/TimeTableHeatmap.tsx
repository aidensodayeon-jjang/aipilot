import React, { useMemo } from 'react';
import { StudentData } from '../utils/dataProcessor';
import { motion } from 'motion/react';

export const TimeTableHeatmap: React.FC<{ data: StudentData[] }> = ({ data }) => {
  const timeSlots = useMemo(() => {
    // Extract Day and Time
    // Format: "토요일 14:00", "목요일 14:30"
    const slots: Record<string, Record<string, number>> = {};
    const days = ['월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일'];
    const times = new Set<string>();

    data.forEach(s => {
      if (!s.time) return;
      const parts = s.time.split(' ');
      if (parts.length < 2) return;
      
      const day = parts[0];
      const time = parts[1];
      
      if (!days.includes(day)) return;

      if (!slots[day]) slots[day] = {};
      slots[day][time] = (slots[day][time] || 0) + 1;
      times.add(time);
    });

    const sortedTimes = Array.from(times).sort();
    return { slots, days, sortedTimes };
  }, [data]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 overflow-x-auto"
    >
      <h3 className="text-lg font-semibold text-slate-800 mb-4">요일/시간대별 수업 밀집도</h3>
      <div className="min-w-[600px]">
        <table className="w-full text-sm text-center">
          <thead>
            <tr>
              <th className="p-2 bg-slate-50 text-slate-500 font-medium rounded-tl-lg">시간 / 요일</th>
              {timeSlots.days.map(day => (
                <th key={day} className="p-2 bg-slate-50 text-slate-700 font-medium">{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeSlots.sortedTimes.map(time => (
              <tr key={time} className="border-t border-slate-100">
                <td className="p-2 font-medium text-slate-500 bg-slate-50">{time}</td>
                {timeSlots.days.map(day => {
                  const count = timeSlots.slots[day]?.[time] || 0;
                  return (
                    <td key={`${day}-${time}`} className="p-2">
                      {count > 0 ? (
                        <div 
                          className={`mx-auto rounded-md py-1 px-2 text-xs font-bold text-white transition-all hover:scale-110 cursor-default ${
                            count >= 5 ? 'bg-indigo-600' :
                            count >= 3 ? 'bg-indigo-400' :
                            'bg-indigo-200'
                          }`}
                        >
                          {count}명
                        </div>
                      ) : (
                        <span className="text-slate-300">-</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};
