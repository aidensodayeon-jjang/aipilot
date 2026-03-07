import React, { useMemo } from 'react';
import { StudentData } from '../utils/dataProcessor';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { motion } from 'motion/react';

export const InstructorPerformance: React.FC<{ data: StudentData[] }> = ({ data }) => {
  const chartData = useMemo(() => {
    // Group by Instructor and Course
    const instructorMap = new Map<string, Record<string, number>>();
    const allCourses = new Set<string>();

    data.forEach(student => {
      const instructor = student.instructor || 'Unassigned';
      const course = student.course || 'Unknown';
      
      if (instructor === 'Unassigned') return;

      if (!instructorMap.has(instructor)) {
        instructorMap.set(instructor, {});
      }
      
      const courses = instructorMap.get(instructor)!;
      courses[course] = (courses[course] || 0) + 1;
      allCourses.add(course);
    });

    return Array.from(instructorMap.entries()).map(([name, courses]) => ({
      name,
      ...courses
    }));
  }, [data]);

  // Generate colors for courses dynamically or use a palette
  const PALETTE = [
    '#3b82f6', '#8b5cf6', '#ec4899', '#f97316', '#eab308', 
    '#22c55e', '#06b6d4', '#6366f1', '#d946ef', '#f43f5e'
  ];

  const courses = useMemo(() => {
    const s = new Set<string>();
    chartData.forEach(d => Object.keys(d).forEach(k => {
      if (k !== 'name') s.add(k);
    }));
    return Array.from(s);
  }, [chartData]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 col-span-1 lg:col-span-2"
    >
      <h3 className="text-lg font-semibold text-slate-800 mb-4">강사별 담당 과목 분포</h3>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            {courses.map((course, index) => (
              <Bar 
                key={course} 
                dataKey={course} 
                stackId="a" 
                fill={PALETTE[index % PALETTE.length]} 
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};
