import { useMemo } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import LinearProgress from '@mui/material/LinearProgress';

import Iconify from 'src/components/iconify';
import Chart, { useChart } from 'src/components/chart';

// ----------------------------------------------------------------------

export default function NewDashboard({ data, apiStats }) {
  const stats = useMemo(() => {
    const totalStudents = data.length;
    const totalRevenue = data.reduce((acc, curr) => acc + curr.paymentAmount, 0);
    const unpaidAmount = data
      .filter((d) => d.paymentStatus === '미결제')
      .reduce((acc, curr) => acc + curr.paymentAmount, 0);
    const newStudents = data.filter((d) => d.isNew).length;

    return { totalStudents, totalRevenue, unpaidAmount, newStudents };
  }, [data]);

  const paymentStatusData = useMemo(() => {
    if (apiStats.dbStats?.payment_data) {
      return apiStats.dbStats.payment_data;
    }
    const statusCounts = data.reduce((acc, curr) => {
      const status = curr.paymentStatus || 'Unknown';
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});
    return {
      labels: ['결제완료', '미결제', 'PASS'],
      series: [statusCounts['결제완료'] || 0, statusCounts['미결제'] || 0, statusCounts.PASS || 0],
    };
  }, [data]);

  const schoolData = useMemo(() => {
    if (apiStats.dbStats?.school_data) {
      return apiStats.dbStats.school_data;
    }
    const counts = data.reduce((acc, curr) => {
      const school = curr.school || 'Unknown';
      if (school === 'Unknown' || school === '') return acc;
      acc[school] = (acc[school] || 0) + 1;
      return acc;
    }, {});
    const sorted = Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8);
    return {
      labels: sorted.map((s) => s[0]),
      series: sorted.map((s) => s[1]),
    };
  }, [data]);

  const gradeStats = useMemo(() => {
    if (apiStats.dbStats?.grade_data) {
      return apiStats.dbStats.grade_data;
    }
    let elementaryHigh = 0;
    let middle = 0;
    let others = 0;
    data.forEach((s) => {
      const g = s.grade || '';
      if (g.includes('초5') || g.includes('초6')) {
        elementaryHigh += 1;
      } else if (g.includes('중')) {
        middle += 1;
      } else {
        others += 1;
      }
    });
    const total = data.length || 1;
    return [
      { label: '초등 고학년 (5-6학년)', count: elementaryHigh, percent: (elementaryHigh / total) * 100, color: 'success' },
      { label: '중등부 (1-3학년)', count: middle, percent: (middle / total) * 100, color: 'info' },
      { label: '기타', count: others, percent: (others / total) * 100, color: 'warning' },
    ];
  }, [data]);

  return (
    <Box sx={{ bgcolor: '#f8fafc', p: 1, borderRadius: 2 }}>
      <Grid container spacing={3}>
        {/* Row 1: Core Growth & Operations */}
        <Grid xs={12} sm={6} md={4}>
          <SummaryCard 
            title="이번 달 신규 등록" 
            total={`${apiStats.newCount || 0}명`} // ✅ 백엔드 실시간 데이터 사용
            icon="solar:user-plus-bold-duotone" 
            color="#6366f1" 
          />
        </Grid>
        <Grid xs={12} sm={6} md={4}>
          <SummaryCard title="총 재원생" total={`${apiStats.userCount}명`} icon="solar:users-group-two-rounded-bold-duotone" color="#3b82f6" />
        </Grid>
        <Grid xs={12} sm={6} md={4}>
          <SummaryCard title="신규 상담중" total={`${apiStats.consultingCount}건`} icon="solar:chat-round-dots-bold-duotone" color="#C684FF" />
        </Grid>

        {/* Row 2: Financials & Operational Stats */}
        <Grid xs={12} sm={6} md={4}>
          <SummaryCard 
            title="총 매출액" 
            total={`₩${(apiStats.totalRevenue || stats.totalRevenue).toLocaleString()}`} 
            icon="solar:wad-of-money-bold-duotone" 
            color="#10b981" 
          />
        </Grid>
        <Grid xs={12} sm={6} md={4}>
          <SummaryCard title="미결제 총액" total={`₩${stats.unpaidAmount.toLocaleString()}`} icon="solar:bill-list-bold-duotone" color="#f43f5e" />
        </Grid>
        <Grid xs={12} sm={6} md={4}>
          <SummaryCard title="보강 필요 학생" total={`${apiStats.reservationCount}명`} icon="eva:people-fill" color="#FF5630" />
        </Grid>

        {/* Main Content Layout */}
        <Grid xs={12} md={8}>
          <Grid container spacing={3}>
            <Grid xs={12} sm={6}>
              <ChartCard
                title="결제 상태 비중"
                chart={{
                  labels: paymentStatusData.labels,
                  series: paymentStatusData.series,
                  options: {
                    colors: ['#10b981', '#f43f5e', '#94a3b8'],
                    stroke: { show: false },
                    legend: { position: 'bottom', horizontalAlign: 'center' },
                    plotOptions: { pie: { donut: { size: '75%' } } },
                  },
                }}
              />
            </Grid>
            <Grid xs={12} sm={6}>
              <BarChartCard
                title="학교별 재원생 Top 8"
                chart={{
                  labels: schoolData.labels,
                  series: [{ data: schoolData.series }],
                }}
              />
            </Grid>
            <Grid xs={12}>
              <UnpaidStatus data={data} />
            </Grid>
          </Grid>
        </Grid>

        {/* Right Sidebar */}
        <Grid xs={12} md={4}>
          <Stack spacing={3}>
            <GradeAnalysisCard stats={gradeStats} />
            <InsightsPanel />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

NewDashboard.propTypes = {
  data: PropTypes.array,
  apiStats: PropTypes.shape({
    consultingCount: PropTypes.number,
    reservationCount: PropTypes.number,
    userCount: PropTypes.number,
    leaveCount: PropTypes.number,
    unregCount: PropTypes.number,
    paidCount: PropTypes.number,
    unpaidCount: PropTypes.number,
    newCount: PropTypes.number,
    totalRevenue: PropTypes.number, // ✅ 추가
  }),
};

// ----------------------------------------------------------------------

function SummaryCard({ title, total, icon, color }) {
  return (
    <Card sx={{ p: 3, borderRadius: '16px', border: '1px solid #f1f5f9', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' }}>
      <Stack direction="row" alignItems="center" spacing={2.5}>
        <Box
          sx={{
            width: 48,
            height: 48,
            display: 'flex',
            borderRadius: '12px',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: alpha(color, 0.1),
            color,
          }}
        >
          <Iconify icon={icon} width={28} />
        </Box>
        <Box>
          <Typography variant="subtitle2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
            {title}
          </Typography>
          <Typography variant="h4" sx={{ mt: 0.5, fontWeight: 700, color: '#1e293b' }}>
            {total}
          </Typography>
        </Box>
      </Stack>
    </Card>
  );
}

SummaryCard.propTypes = {
  title: PropTypes.string,
  total: PropTypes.string,
  icon: PropTypes.string,
  color: PropTypes.string,
};

function ChartCard({ title, chart }) {
  const chartOptions = useChart({
    labels: chart.labels,
    ...chart.options,
  });

  return (
    <Card sx={{ p: 3, borderRadius: '16px', border: '1px solid #f1f5f9' }}>
      <Typography variant="h6" sx={{ mb: 3, color: '#1e293b' }}>
        {title}
      </Typography>
      <Chart type="donut" series={chart.series} options={chartOptions} height={280} />
    </Card>
  );
}

ChartCard.propTypes = {
  title: PropTypes.string,
  chart: PropTypes.object,
};

function BarChartCard({ title, chart }) {
  const chartOptions = useChart({
    chart: { stacked: false },
    plotOptions: { bar: { horizontal: true, barHeight: '30%', borderRadius: 4 } },
    xaxis: { categories: chart.labels },
    grid: { show: true, strokeDashArray: 3, xaxis: { lines: { show: false } } },
    colors: ['#3b82f6'],
    tooltip: { y: { formatter: (val) => `${val}명` } },
  });

  return (
    <Card sx={{ p: 3, borderRadius: '16px', border: '1px solid #f1f5f9' }}>
      <Typography variant="h6" sx={{ mb: 3, color: '#1e293b' }}>
        {title}
      </Typography>
      <Chart type="bar" series={chart.series} options={chartOptions} height={280} />
    </Card>
  );
}

BarChartCard.propTypes = {
  title: PropTypes.string,
  chart: PropTypes.object,
};

function GradeAnalysisCard({ stats }) {
  return (
    <Card sx={{ p: 3, borderRadius: '16px', border: '1px solid #f1f5f9' }}>
      <Typography variant="h6" sx={{ mb: 3, color: '#1e293b' }}>
        학년별 구성비
      </Typography>
      <Stack spacing={3}>
        {stats.map((item) => (
          <Box key={item.label}>
            <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569' }}>
                {item.label}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {item.count}명 ({item.percent.toFixed(1)}%)
              </Typography>
            </Stack>
            <LinearProgress
              variant="determinate"
              value={item.percent}
              color={item.color}
              sx={{ height: 8, borderRadius: 5, bgcolor: '#f1f5f9' }}
            />
          </Box>
        ))}
      </Stack>
      <Box sx={{ mt: 3, p: 2, bgcolor: '#f8fafc', borderRadius: 1.5 }}>
        <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600, display: 'block', mb: 0.5 }}>
          💡 커리큘럼 제안
        </Typography>
        <Typography variant="caption" sx={{ color: '#475569' }}>
          초등 고학년 비중이 높습니다. 중등 연계 심화 과정(파이썬, C언어 기초)을 강화하여 장기 재원을 유도하세요.
        </Typography>
      </Box>
    </Card>
  );
}

GradeAnalysisCard.propTypes = {
  stats: PropTypes.array,
};

function UnpaidStatus({ data }) {
  const unpaidStudents = data.filter((student) => student.paymentStatus === '미결제');
  const totalUnpaidCount = unpaidStudents.length;

  return (
    <Card sx={{ p: 3, borderRadius: '16px', border: '1px solid #f1f5f9' }}>
      <Typography variant="h6" sx={{ mb: 2, color: '#1e293b' }}>
        미결제 현황 (총 {totalUnpaidCount}명)
      </Typography>
      <Stack spacing={2}>
        {unpaidStudents.length > 0 ? (
          unpaidStudents.slice(0, 10).map((student, index) => (
            <Stack 
              key={index} 
              direction="row" 
              alignItems="center" 
              justifyContent="space-between" 
              sx={{ pb: 1, borderBottom: index !== Math.min(unpaidStudents.length, 10) - 1 ? '1px solid #f1f5f9' : 'none' }}
            >
              <Box>
                <Typography variant="subtitle2" sx={{ color: '#1e293b' }}>{student.studentName}</Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>{student.school} / {student.grade}</Typography>
              </Box>
              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="subtitle2" sx={{ color: '#f43f5e', fontWeight: 700 }}>
                  ₩{student.paymentAmount?.toLocaleString()}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>{student.course}</Typography>
              </Box>
            </Stack>
          ))
        ) : (
          <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center', py: 2 }}>
            미결제 학생이 없습니다.
          </Typography>
        )}
      </Stack>
    </Card>
  );
}

UnpaidStatus.propTypes = {
  data: PropTypes.array,
};

function InsightsPanel() {
  return (
    <Card sx={{ p: 3, borderRadius: '16px', border: '1px solid #f1f5f9', bgcolor: '#6366f1', color: 'white' }}>
      <Stack spacing={2}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Iconify icon="solar:lightbulb-bold" width={24} />
          <Typography variant="h6">AI Insights</Typography>
        </Stack>
        <Typography variant="body2" sx={{ opacity: 0.9 }}>
          이번 달 결제율이 지난달 대비 12% 상승했습니다. 미결제 인원 5명에 대한 자동 알림 발송을 추천합니다.
        </Typography>
        <Box sx={{ pt: 1 }}>
          <Box sx={{ px: 2, py: 1, bgcolor: 'rgba(255,255,255,0.2)', borderRadius: 1, cursor: 'pointer', textAlign: 'center', transition: '0.3s', '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' } }}>
            <Typography variant="subtitle2">알림 발송하기</Typography>
          </Box>
        </Box>
      </Stack>
    </Card>
  );
}
