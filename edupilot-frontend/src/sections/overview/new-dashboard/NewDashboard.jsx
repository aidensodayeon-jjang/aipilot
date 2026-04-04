import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

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

export default function NewDashboard({ data, apiStats, onTabChange }) {
  const navigate = useNavigate();

  const stats = useMemo(() => {
    const totalStudents = data.length;
    const totalRevenue = data.reduce((acc, curr) => acc + curr.paymentAmount, 0);
    const unpaidAmount = data
      .filter((d) => d.paymentStatus === '미결제')
      .reduce((acc, curr) => acc + curr.paymentAmount, 0);
    const newStudents = data.filter((d) => d.isNew).length;

    return {
      totalStudents: apiStats.userCount || totalStudents,
      totalRevenue: apiStats.totalRevenue !== undefined ? apiStats.totalRevenue : totalRevenue,
      unpaidAmount: apiStats.unpaidAmount !== undefined ? apiStats.unpaidAmount : unpaidAmount,
      newStudents: apiStats.newCount || newStudents,
    };
  }, [data, apiStats]);

  const newGradeStats = useMemo(() => {
    if (apiStats.dbStats?.new_grade_data && Array.isArray(apiStats.dbStats.new_grade_data)) {
      const colors = ['primary', 'info', 'success', 'warning'];
      return apiStats.dbStats.new_grade_data.map((item, index) => ({
        ...item,
        color: colors[index % colors.length]
      }));
    }
    return [];
  }, [apiStats]);

  const recentTasks = useMemo(() => {
    if (apiStats.recent_tasks && apiStats.recent_tasks.length > 0) {
      return apiStats.recent_tasks;
    }
    if (!apiStats.tasks) return [];
    
    const allTasks = [
      ...(apiStats.tasks.short || []),
      ...(apiStats.tasks.mid || []),
      ...(apiStats.tasks.feedback || []),
    ];
    return allTasks
      .filter((t) => !t.completed)
      .slice(0, 6);
  }, [apiStats]);

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
  }, [data, apiStats]);

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
  }, [data, apiStats]);

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
  }, [data, apiStats]);

  return (
    <Box sx={{ bgcolor: '#f8fafc', p: 1, borderRadius: 2 }}>
      <Grid container spacing={3}>
        {/* Row 1: Summary Cards - Optimized for all screens */}
        <Grid xs={6} sm={4} md={4} lg={2}>
          <SummaryCard 
            title="신규 등록" 
            total={`${apiStats.newCount || 0}명`}
            icon="solar:user-plus-bold-duotone" 
            color="#6366f1" 
            onClick={() => navigate('/students/재원생')}
          />
        </Grid>
        <Grid xs={6} sm={4} md={4} lg={2}>
          <SummaryCard 
            title="총 재원생" 
            total={`${apiStats.userCount}명`} 
            icon="solar:users-group-two-rounded-bold-duotone" 
            color="#3b82f6" 
            onClick={() => navigate('/students/재원생')}
          />
        </Grid>
        <Grid xs={6} sm={4} md={4} lg={2}>
          <SummaryCard 
            title="신규 상담" 
            total={`${apiStats.consultingCount}건`} 
            icon="solar:chat-round-dots-bold-duotone" 
            color="#C684FF" 
            onClick={() => navigate('/students/상담중')}
          />
        </Grid>
        <Grid xs={6} sm={4} md={4} lg={2}>
          <SummaryCard 
            title="총 매출액" 
            total={`₩${(apiStats.totalRevenue || stats.totalRevenue).toLocaleString()}`} 
            icon="solar:wad-of-money-bold-duotone" 
            color="#10b981" 
          />
        </Grid>
        <Grid xs={6} sm={4} md={4} lg={2}>
          <SummaryCard 
            title="미결제액" 
            total={`₩${(apiStats.unpaidAmount || stats.unpaidAmount).toLocaleString()}`} 
            icon="solar:bill-list-bold-duotone" 
            color="#f43f5e" 
            onClick={() => navigate('/students/재원생')}
          />
        </Grid>
        <Grid xs={6} sm={4} md={4} lg={2}>
          <SummaryCard 
            title="보강 필요" 
            total={`${apiStats.reservationCount}명`} 
            icon="eva:people-fill" 
            color="#FF5630" 
            onClick={() => navigate('/attend')}
          />
        </Grid>

        {/* Main Content Layout (Left 8, Right 4) */}
        <Grid xs={12} lg={8}>
          <Grid container spacing={3}>
            {/* Chart Row */}
            <Grid xs={12} md={6}>
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
            <Grid xs={12} md={6}>
              <BarChartCard
                title="학교별 재원생 Top 8"
                chart={{
                  labels: schoolData.labels,
                  series: [{ data: schoolData.series }],
                }}
              />
            </Grid>
            
            {/* Table Row */}
            <Grid xs={12}>
              <UnpaidStatus 
                data={data} 
                dbList={apiStats.dbStats?.unpaid_list}
              />
            </Grid>
          </Grid>
        </Grid>

        {/* Sidebar Layout (Right 4) */}
        <Grid xs={12} lg={4}>
          <Stack spacing={3}>
            <RecentTasksCard 
              tasks={recentTasks} 
              onManage={() => onTabChange && onTabChange('old')} 
            />
            <GradeAnalysisCard 
              title="신규 등록 학년 분포"
              stats={newGradeStats} 
              isNew
            />
            <GradeAnalysisCard 
              title="전체 학년별 구성비"
              stats={gradeStats} 
            />
            <InsightsPanel />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

NewDashboard.propTypes = {
  data: PropTypes.array,
  onTabChange: PropTypes.func,
  apiStats: PropTypes.shape({
    consultingCount: PropTypes.number,
    reservationCount: PropTypes.number,
    userCount: PropTypes.number,
    leaveCount: PropTypes.number,
    unregCount: PropTypes.number,
    paidCount: PropTypes.number,
    unpaidCount: PropTypes.number,
    newCount: PropTypes.number,
    totalRevenue: PropTypes.number,
    unpaidAmount: PropTypes.number,
    tasks: PropTypes.object,
    recent_tasks: PropTypes.array,
    dbStats: PropTypes.shape({
      payment_data: PropTypes.object,
      school_data: PropTypes.object,
      grade_data: PropTypes.array,
      new_grade_data: PropTypes.object,
      unpaid_list: PropTypes.array,
    }),
  }),
};

// ----------------------------------------------------------------------

function SummaryCard({ title, total, icon, color, onClick }) {
  return (
    <Card 
      onClick={onClick}
      sx={{ 
        p: 2, 
        height: '100%',
        borderRadius: '16px', 
        border: '1px solid #f1f5f9', 
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.2s',
        '&:hover': onClick ? {
          bgcolor: alpha(color, 0.02),
          transform: 'translateY(-2px)',
          boxShadow: '0 8px 16px -4px rgba(0, 0, 0, 0.1)',
          borderColor: alpha(color, 0.2),
        } : {},
      }}
    >
      <Stack spacing={1.5} alignItems="center" textAlign="center">
        <Box
          sx={{
            width: 40,
            height: 40,
            display: 'flex',
            borderRadius: '10px',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: alpha(color, 0.1),
            color,
          }}
        >
          <Iconify icon={icon} width={24} />
        </Box>
        <Box>
          <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, display: 'block' }}>
            {title}
          </Typography>
          <Typography variant="subtitle1" sx={{ mt: 0.5, fontWeight: 800, color: '#1e293b', whiteSpace: 'nowrap' }}>
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
  onClick: PropTypes.func,
};

function ChartCard({ title, chart }) {
  const chartOptions = useChart({
    labels: chart.labels,
    ...chart.options,
  });

  return (
    <Card sx={{ p: 3, height: '100%', borderRadius: '16px', border: '1px solid #f1f5f9' }}>
      <Typography variant="subtitle1" sx={{ mb: 3, fontWeight: 700, color: '#1e293b' }}>
        {title}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Chart type="donut" series={chart.series} options={chartOptions} height={260} width="100%" />
      </Box>
    </Card>
  );
}

ChartCard.propTypes = {
  title: PropTypes.string,
  chart: PropTypes.object,
};

function BarChartCard({ title, chart }) {
  const chartOptions = useChart({
    chart: { stacked: false, toolbar: { show: false } },
    plotOptions: { 
      bar: { 
        horizontal: true, 
        barHeight: '25%', 
        borderRadius: 4 
      } 
    },
    xaxis: { categories: chart.labels },
    grid: { show: true, strokeDashArray: 3, xaxis: { lines: { show: false } } },
    colors: ['#3b82f6'],
    tooltip: { y: { formatter: (val) => `${val}명` } },
  });

  return (
    <Card sx={{ p: 3, height: '100%', borderRadius: '16px', border: '1px solid #f1f5f9' }}>
      <Typography variant="subtitle1" sx={{ mb: 3, fontWeight: 700, color: '#1e293b' }}>
        {title}
      </Typography>
      <Chart type="bar" series={chart.series} options={chartOptions} height={260} />
    </Card>
  );
}

BarChartCard.propTypes = {
  title: PropTypes.string,
  chart: PropTypes.object,
};

function RecentTasksCard({ tasks, onManage }) {
  return (
    <Card sx={{ p: 2.5, borderRadius: '16px', border: '1px solid #f1f5f9' }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1e293b' }}>
          주요 업무 현황
        </Typography>
        <Box 
          onClick={onManage}
          sx={{ 
            typography: 'caption', 
            color: '#6366f1', 
            fontWeight: 700, 
            cursor: 'pointer',
            bgcolor: alpha('#6366f1', 0.08),
            px: 1,
            py: 0.5,
            borderRadius: 1,
            '&:hover': { bgcolor: alpha('#6366f1', 0.15) }
          }}
        >
          관리
        </Box>
      </Stack>
      <Stack spacing={1.5}>
        {tasks && tasks.length > 0 ? (
          tasks.map((task) => {
            const typeLabel = {
              short: { text: '단기', color: '#94a3b8' },
              mid: { text: '중기', color: '#3b82f6' },
              feedback: { text: '피드백', color: '#C684FF' }
            }[task.type] || { text: '기타', color: '#94a3b8' };

            return (
              <Stack key={task.id} direction="row" spacing={1.5} alignItems="flex-start">
                <Box sx={{ mt: 0.3 }}>
                  <Iconify 
                    icon={task.type === 'feedback' ? "solar:chat-round-dots-bold-duotone" : "solar:check-circle-bold-duotone"} 
                    width={16} 
                    color={typeLabel.color} 
                  />
                </Box>
                <Box>
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.2 }}>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        px: 0.6, 
                        py: 0.1, 
                        borderRadius: 0.5, 
                        bgcolor: alpha(typeLabel.color, 0.1), 
                        color: typeLabel.color,
                        fontWeight: 800,
                        fontSize: '0.65rem'
                      }}
                    >
                      {typeLabel.text}
                    </Typography>
                  </Stack>
                  <Typography variant="body2" sx={{ color: '#475569', fontWeight: 500, lineHeight: 1.4 }}>
                    {task.name}
                  </Typography>
                </Box>
              </Stack>
            );
          })
        ) : (
          <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center', py: 2 }}>
            진행 중인 업무가 없습니다.
          </Typography>
        )}
      </Stack>
    </Card>
  );
}

RecentTasksCard.propTypes = {
  tasks: PropTypes.array,
  onManage: PropTypes.func,
};

function GradeAnalysisCard({ title, stats, isNew }) {
  const analysisText = useMemo(() => {
    if (!stats || stats.length === 0) return "데이터 분석 중입니다...";
    
    const topGrade = [...stats].sort((a, b) => b.count - a.count)[0];
    
    if (isNew) {
      if (topGrade.label.includes('초')) {
        return `${topGrade.label} 비중이 높습니다. 기초 과정 분반을 추천합니다.`;
      }
      return `중등부 유입이 활발합니다. 진로 포트폴리오 상담을 강화하세요.`;
    }
    
    return "초등 고학년 비중이 높습니다. 중등 심화 과정을 연계하세요.";
  }, [stats, isNew]);

  return (
    <Card sx={{ p: 2.5, borderRadius: '16px', border: '1px solid #f1f5f9' }}>
      <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 700, color: '#1e293b' }}>
        {title}
      </Typography>
      <Stack spacing={2}>
        {stats.length > 0 ? (
          stats.map((item) => (
            <Box key={item.label}>
              <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569' }}>
                  {item.label}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                  {item.count}명 ({item.percent.toFixed(1)}%)
                </Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                value={item.percent}
                color={item.color}
                sx={{ height: 6, borderRadius: 3, bgcolor: '#f1f5f9' }}
              />
            </Box>
          ))
        ) : (
          <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>데이터 없음</Typography>
        )}
      </Stack>
      <Box sx={{ mt: 2, p: 1.5, bgcolor: '#f8fafc', borderRadius: 1, borderLeft: '3px solid #6366f1' }}>
        <Typography variant="caption" sx={{ color: '#475569', fontWeight: 500, fontSize: '0.75rem' }}>
          💡 {analysisText}
        </Typography>
      </Box>
    </Card>
  );
}

GradeAnalysisCard.propTypes = {
  title: PropTypes.string,
  stats: PropTypes.array,
  isNew: PropTypes.bool,
};

function UnpaidStatus({ data, dbList }) {
  const unpaidStudents = dbList || data.filter((student) => student.paymentStatus === '미결제');
  const totalUnpaidCount = unpaidStudents.length;

  return (
    <Card sx={{ p: 3, borderRadius: '16px', border: '1px solid #f1f5f9' }}>
      <Typography variant="subtitle1" sx={{ mb: 2.5, fontWeight: 700, color: '#1e293b' }}>
        미결제 현황 <span style={{ color: '#f43f5e', marginLeft: '4px' }}>({totalUnpaidCount})</span>
      </Typography>
      <Stack spacing={1.5}>
        {unpaidStudents.length > 0 ? (
          unpaidStudents.slice(0, 8).map((student, index) => (
            <Stack 
              key={index} 
              direction="row" 
              alignItems="center" 
              justifyContent="space-between" 
              sx={{ 
                pb: 1.5, 
                borderBottom: index !== Math.min(unpaidStudents.length, 8) - 1 ? '1px solid #f8fafc' : 'none' 
              }}
            >
              <Box sx={{ minWidth: 0, flex: 1, mr: 2 }}>
                <Typography variant="subtitle2" sx={{ color: '#1e293b', fontWeight: 700, truncate: true }}>
                  {student.studentName}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
                  {student.school} / {student.grade}
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'right', flexShrink: 0 }}>
                <Typography variant="caption" sx={{ color: '#64748b', display: 'block', mb: 0.5 }}>
                  {student.course}
                </Typography>
                <Label color="error" variant="soft" sx={{ fontSize: '0.65rem', height: 20 }}>
                  미결제
                </Label>
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
  dbList: PropTypes.array,
};

function InsightsPanel() {
  return (
    <Card sx={{ p: 2.5, borderRadius: '16px', bgcolor: '#1e293b', color: 'white' }}>
      <Stack spacing={2}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Iconify icon="solar:lightbulb-bold" width={20} color="#FFD666" />
          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>AI 운영 인사이트</Typography>
        </Stack>
        <Typography variant="caption" sx={{ opacity: 0.8, lineHeight: 1.5 }}>
          이번 학기 결제 주기가 지난 학기 대비 3일 단축되었습니다. 장기 미결제자에 대한 집중 관리가 필요합니다.
        </Typography>
        <Box 
          sx={{ 
            mt: 1,
            py: 1, 
            bgcolor: 'rgba(255,255,255,0.1)', 
            borderRadius: 1, 
            textAlign: 'center',
            cursor: 'pointer',
            '&:hover': { bgcolor: 'rgba(255,255,255,0.15)' }
          }}
        >
          <Typography variant="caption" sx={{ fontWeight: 700 }}>상세 리포트 보기</Typography>
        </Box>
      </Stack>
    </Card>
  );
}

// ----------------------------------------------------------------------

function Label({ children, color = 'default', variant = 'soft', sx }) {
  const themeColor = {
    error: {
      soft: { bgcolor: alpha('#f43f5e', 0.16), color: '#f43f5e' }
    },
    default: {
      soft: { bgcolor: alpha('#94a3b8', 0.16), color: '#475569' }
    }
  };

  return (
    <Box
      component="span"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 1,
        borderRadius: 0.75,
        fontWeight: 700,
        ...themeColor[color][variant],
        ...sx
      }}
    >
      {children}
    </Box>
  );
}
