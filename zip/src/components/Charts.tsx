import React, { useMemo } from 'react';
import { StudentData } from '../utils/dataProcessor';
import { 
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';
import { motion } from 'motion/react';

const COLORS = ['#10b981', '#f43f5e', '#94a3b8']; // Emerald, Rose, Slate

export const PaymentStatusChart: React.FC<{ data: StudentData[] }> = ({ data }) => {
  const chartData = useMemo(() => {
    const statusCounts = data.reduce((acc, curr) => {
      const status = curr.paymentStatus || 'Unknown';
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return [
      { name: '결제완료', value: statusCounts['결제완료'] || 0 },
      { name: '미결제', value: statusCounts['미결제'] || 0 },
      { name: 'PASS', value: statusCounts['PASS'] || 0 },
    ].filter(d => d.value > 0);
  }, [data]);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white p-6 rounded-xl shadow-sm border border-slate-100"
    >
      <h3 className="text-lg font-semibold text-slate-800 mb-4">결제 상태 비중</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export const SchoolRankingChart: React.FC<{ data: StudentData[] }> = ({ data }) => {
  const chartData = useMemo(() => {
    const schoolCounts = data.reduce((acc, curr) => {
      const school = curr.school || 'Unknown';
      if (school === 'Unknown' || school === '') return acc;
      acc[school] = (acc[school] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(schoolCounts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => (b.value as number) - (a.value as number))
      .slice(0, 10);
  }, [data]);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.1 }}
      className="bg-white p-6 rounded-xl shadow-sm border border-slate-100"
    >
      <h3 className="text-lg font-semibold text-slate-800 mb-4">학교별 재원생 Top 10</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} layout="vertical" margin={{ left: 40 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
            <XAxis type="number" hide />
            <YAxis dataKey="name" type="category" width={80} tick={{ fontSize: 12 }} />
            <Tooltip cursor={{ fill: '#f1f5f9' }} />
            <Bar dataKey="value" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};
