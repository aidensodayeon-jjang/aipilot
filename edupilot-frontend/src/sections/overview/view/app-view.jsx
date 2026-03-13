import { faker } from '@faker-js/faker';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import LinearProgress from '@mui/material/LinearProgress';
import { alpha } from '@mui/material/styles';

import Iconify from 'src/components/iconify';

import AppTasks from '../app-tasks';
import AppScheduleTimeline from '../app-order-timeline';
import AppWidgetSummary from '../app-widget-summary';
import AppTrafficBySite from '../app-traffic-by-site';
import AppLectureStatus from '../app-lecture-status';
import { processData } from '../../../utils/dataProcessor';
import NewDashboard from '../new-dashboard/NewDashboard';

// ----------------------------------------------------------------------

export default function AppView() {
  const [currentTab, setCurrentTab] = useState('new');
  const [studentData, setStudentData] = useState([]);
  const [totalConsultingCount, setTotalConsultingCount] = useState(0);
  const [totalReservationCount, setTotalReservationCount] = useState(0);
  const [TotalUserCount, setTotalUserCount] = useState(0);
  const [totalLeaveCount, setTotalLeaveCount] = useState(0);
  const [totalUnregCount, setTotalUnregCount] = useState(0);
  const [totalPaidCount, setTotalPaidCount] = useState(0);
  const [totalUnpaidCount, setTotalUnpaidCount] = useState(0);
  const [totalNewCount, setTotalNewCount] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [dbStats, setDbStats] = useState({
    payment_data: null,
    school_data: null,
    grade_data: null,
  });
  const [weekInfo, setWeekInfo] = useState('');
  const [dayInfo, setDayInfo] = useState('');
  const [progressPercent, setProgressPercent] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    // 새 대시보드용 데이터 로드 (비동기 처리)
    const loadDashboardData = async () => {
      const data = await processData();
      setStudentData(data);
    };

    loadDashboardData();

    // 기존 대시보드용 데이터 로드
    fetch(
      `/api/dashboard/`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then((response) => response.json())
      .then((result) => {
        setTotalConsultingCount(result.total_consulting_count || 0);
        setTotalReservationCount(result.total_reservation_count || 0);
        setTotalUserCount(result.total_user_count || 0);
        setTotalLeaveCount(result.total_leave_count || 0);
        setTotalUnregCount(result.total_unreg_count || 0);
        setTotalPaidCount(result.total_paid_count || 0);
        setTotalUnpaidCount(result.total_unpaid_count || 0);
        setTotalNewCount(result.new_student_count || 0);
        setTotalRevenue(result.total_revenue || 0);
        setDbStats({
          payment_data: result.payment_data,
          school_data: result.school_data,
          grade_data: result.grade_data,
        });
        setWeekInfo(result.week_info || '');
        setDayInfo(result.day_info || '');
        setProgressPercent(result.progress_percent || 0);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [navigate]);

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 5, display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Dashboard Header Style */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
          <Box
            sx={{
              p: 2,
              display: 'flex',
              borderRadius: 2,
              bgcolor: '#6366f1',
              color: 'white',
              boxShadow: '0 8px 16px 0 rgba(99, 102, 241, 0.24)',
            }}
          >
            <Iconify icon="solar:chart-square-bold-duotone" width={32} />
          </Box>
          <Box>
            <Typography variant="h3" sx={{ fontWeight: 800, color: '#1e293b', letterSpacing: '-0.02em' }}>
              목동 디랩 코딩학원 운영 대시보드
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 500 }}>
              실시간 데이터 기반 학원 운영 현황 분석 및 인사이트
            </Typography>
          </Box>
        </Box>

        {/* Tab Selection Section */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Tabs value={currentTab} onChange={handleChangeTab} sx={{ px: 1 }}>
            <Tab 
              label="학원 운영 분석" 
              value="new" 
              sx={{ typography: 'subtitle1', fontWeight: 700, px: 3, py: 2 }} 
            />
            <Tab 
              label="업무 현황" 
              value="old" 
              sx={{ typography: 'subtitle1', fontWeight: 700, px: 3, py: 2 }} 
            />
          </Tabs>
          <Box sx={{ pr: 2, textAlign: 'right', minWidth: 200 }}>
             <Typography variant="subtitle2" sx={{ color: '#6366f1', fontWeight: 800 }}>
               {weekInfo} ({dayInfo})
             </Typography>
             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, my: 0.5 }}>
               <LinearProgress 
                 variant="determinate" 
                 value={progressPercent} 
                 sx={{ 
                   flexGrow: 1, 
                   height: 6, 
                   borderRadius: 3,
                   bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
                   '& .MuiLinearProgress-bar': {
                     bgcolor: '#6366f1',
                     borderRadius: 3,
                   }
                 }} 
               />
               <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 700 }}>
                 {progressPercent}%
               </Typography>
             </Box>
             <Typography variant="caption" sx={{ color: 'text.disabled', fontWeight: 600, textTransform: 'uppercase' }}>
               Last Updated: {new Date().toLocaleDateString()}
             </Typography>
          </Box>
        </Box>
      </Box>

      {currentTab === 'new' ? (
        <NewDashboard
          data={studentData}
          apiStats={{
            consultingCount: totalConsultingCount,
            reservationCount: totalReservationCount,
            userCount: TotalUserCount,
            leaveCount: totalLeaveCount,
            unregCount: totalUnregCount,
            paidCount: totalPaidCount,
            unpaidCount: totalUnpaidCount,
            newCount: totalNewCount,
            totalRevenue,
            dbStats, // ✅ 추가
          }}
        />
      ) : (
        <Grid container spacing={3}>
          <Grid xs={12} md={8}>
            <AppTasks
              title="업무 및 피드백 관리"
              initialTasks={{
                short: [
                  { id: '1', name: '오늘 학부모 상담 전화 3건', completed: false },
                  { id: '2', name: '보강 일정 확정 및 안내', completed: true },
                ],
                mid: [
                  { id: '3', name: '3월 학기 시간표 초안 작성', completed: false },
                  { id: '4', name: '신규 교재 선정 및 발주', completed: false },
                ],
                feedback: [
                  { id: '5', name: '김민준: 파이썬 조건문 이해도 낮음, 추가 과제 필요', completed: false },
                  { id: '6', name: '이서연: 알고리즘 문제 풀이 속도 향상됨', completed: false },
                ]
              }}
            />
          </Grid>

          <Grid xs={12} md={4}>
            <AppTrafficBySite
              title="마케팅채널 바로가기"
              list={[
                {
                  name: '블로그',
                  value: 0,
                  icon: <Iconify icon="solar:laptop-bold-duotone" color="#C684FF" width={32} />,
                  action: '이동',
                  link: 'https://blog.naver.com/dlabmokdong/',
                },
                {
                  name: '홈페이지',
                  value: 0,
                  icon: <Iconify icon="solar:home-angle-bold-duotone" color="#FFD666" width={32} />,
                  action: '이동',
                  link: 'http://www.sodayeon.co.kr/',
                },
                {
                  name: '인스타그램',
                  value: 0,
                  icon: <Iconify icon="solar:camera-bold-duotone" color="#C684FF" width={32} />,
                  action: <Iconify icon="solar:arrow-right-up-bold" width={24} />,
                  link: 'https://www.instagram.com/',
                },
                {
                  name: '구글',
                  value: 0,
                  icon: <Iconify icon="devicon:google" width={28} />,
                  action: '검색',
                },
                {
                  name: '노션',
                  value: 0,
                  icon: <Iconify icon="solar:document-text-bold-duotone" width={28} />,
                  action: '이동',
                },
              ]}
            />
          </Grid>

          <Grid xs={12} md={8}>
            <AppLectureStatus title="신청 관리" />
          </Grid>

          <Grid xs={12} md={4}>
            <AppScheduleTimeline
              title="오늘의 일정"
              list={[
                {
                  id: faker.string.uuid(),
                  title: '학부모 상담 (김민준 학생)',
                  type: 'event4',
                  time: '14:00 - 15:30',
                },
                {
                  id: faker.string.uuid(),
                  title: '파이썬 기초반 수업',
                  type: 'event2',
                  time: '16:00 - 18:00',
                },
                {
                  id: faker.string.uuid(),
                  title: '강사단 전체 회의',
                  label: '온라인 Zoom 회의',
                  type: 'event1',
                  time: '19:00',
                },
              ]}
            />
          </Grid>
        </Grid>
      )}
    </Container>
  );
}
