import React, { useMemo } from 'react';
import { processData, StudentData } from '../utils/dataProcessor';
import { 
  Users, 
  CreditCard, 
  AlertCircle, 
  UserPlus, 
  TrendingUp,
  DollarSign
} from 'lucide-react';
import { motion } from 'motion/react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  trend?: string;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, trend, color }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white rounded-xl p-6 shadow-sm border border-slate-100"
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <h3 className="text-2xl font-bold text-slate-900 mt-2">{value}</h3>
        {trend && <p className="text-xs text-emerald-600 mt-1">{trend}</p>}
      </div>
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </motion.div>
);

export const SummaryCards: React.FC<{ data: StudentData[] }> = ({ data }) => {
  const stats = useMemo(() => {
    const totalStudents = data.length;
    const totalRevenue = data.reduce((acc, curr) => acc + curr.paymentAmount, 0);
    const unpaidAmount = data
      .filter(d => d.paymentStatus === '미결제')
      .reduce((acc, curr) => acc + curr.paymentAmount, 0);
    const newStudents = data.filter(d => d.isNew).length;

    return {
      totalStudents,
      totalRevenue,
      unpaidAmount,
      newStudents
    };
  }, [data]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard 
        title="총 재원생" 
        value={`${stats.totalStudents}명`} 
        icon={Users} 
        color="bg-blue-500"
      />
      <StatCard 
        title="총 매출액" 
        value={`₩${stats.totalRevenue.toLocaleString()}`} 
        icon={DollarSign} 
        color="bg-emerald-500"
      />
      <StatCard 
        title="미결제 총액" 
        value={`₩${stats.unpaidAmount.toLocaleString()}`} 
        icon={AlertCircle} 
        color="bg-rose-500"
      />
      <StatCard 
        title="신규 등록 (이번 달)" 
        value={`${stats.newStudents}건`} 
        icon={UserPlus} 
        color="bg-indigo-500"
      />
    </div>
  );
};
