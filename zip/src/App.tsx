import React, { useEffect, useState } from 'react';
import { processData, StudentData } from './utils/dataProcessor';
import { SummaryCards } from './components/SummaryCards';
import { PaymentStatusChart, SchoolRankingChart } from './components/Charts';
import { InstructorPerformance } from './components/InstructorPerformance';
import { GradeAnalysis } from './components/GradeAnalysis';
import { InsightsPanel } from './components/InsightsPanel';
import { TimeTableHeatmap } from './components/TimeTableHeatmap';
import { LayoutDashboard } from 'lucide-react';

export default function App() {
  const [data, setData] = useState<StudentData[]>([]);

  useEffect(() => {
    const loadedData = processData();
    setData(loadedData);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans">
      <header className="max-w-7xl mx-auto mb-8 flex items-center gap-3">
        <div className="p-3 bg-indigo-600 rounded-lg shadow-lg shadow-indigo-200">
          <LayoutDashboard className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">목동 코딩학원 운영 대시보드</h1>
          <p className="text-slate-500 text-sm">실시간 데이터 기반 학원 운영 현황 분석</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto space-y-6">
        {/* Top Summary Cards */}
        <SummaryCards data={data} />

        {/* Main Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <PaymentStatusChart data={data} />
              <SchoolRankingChart data={data} />
            </div>
            <InstructorPerformance data={data} />
            <TimeTableHeatmap data={data} />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <GradeAnalysis data={data} />
            <InsightsPanel data={data} />
          </div>
        </div>
      </main>
    </div>
  );
}
