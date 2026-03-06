import { faker } from '@faker-js/faker';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import Iconify from 'src/components/iconify';

import AppTasks from '../app-tasks';
import AppScheduleTimeline from '../app-order-timeline';
import AppWidgetSummary from '../app-widget-summary';
import AppTrafficBySite from '../app-traffic-by-site';
import AppLectureStatus from '../app-lecture-status';
import { fetchWithToken } from '../../../utils/auth/fetch-with-token';

// ----------------------------------------------------------------------

export default function AppView() {
  const [totalConsultingCount, setTotalConsultingCount] = useState(0);
  const [totalReservationCount, setTotalReservationCount] = useState(0);
  const [TotalUserCount, setTotalUserCount] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    fetchWithToken(
      `/api/dashboard/`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
      navigate
    )
      .then((response) => response.json())
      .then((result) => {
        // 객체에서 각 카운트 값을 추출하여 상태 업데이트
        setTotalConsultingCount(result.total_consulting_count || 0);
        setTotalReservationCount(result.total_reservation_count || 0);
        setTotalUserCount(result.total_user_count || 0);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        // 에러 처리, 필요에 따라 상태 업데이트를 할 수 있습니다.
      });
  }, [navigate]);

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" sx={{ mb: 1 }}>
            Welcome back, Aiden
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            12월학기 3주차 목요일입니다.
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {/* Optional top right actions if needed */}
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="신규 상담 요청"
            subTitle="ongoing"
            total={`${totalConsultingCount}`}
            icon={<Iconify icon="solar:history-bold-duotone" width={24} color="text.secondary" />}
            trend={{ value: '2%', label: 'vs last month', color: 'error' }}
            link="/students/%EC%83%81%EB%8B%B4%EC%A4%91"
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="보강 필요 학생"
            subTitle="students"
            total={`${totalReservationCount}`}
            icon={
              <Iconify
                icon="eva:people-fill"
                width={24}
                color="text.secondary"
              />
            }
            trend={{ value: '1', label: 'vs yesterday', color: 'success' }}
            link="/attend"
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="총 재원생"
            subTitle="active"
            total={`${TotalUserCount}`}
            icon={
              <Iconify
                icon="solar:users-group-two-rounded-bold-duotone"
                width={24}
                color="text.secondary"
              />
            }
            trend={{ value: '5%', label: 'vs last month', color: 'success' }}
            link="/students/%EC%9E%AC%EC%9B%90%EC%83%9D"
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="이번 달 신규 등록"
            subTitle="this term"
            total="19"
            icon={<Iconify icon="solar:user-plus-bold-duotone" width={24} color="text.secondary" />}
            trend={{ value: '12%', label: 'target achievement', color: 'success' }}
            link="/students/new"
          />
        </Grid>

        <Grid xs={12} md={8}>
          <AppTasks
            title="Tasks"
            list={[
              { id: '1', name: 'Git 저장소 정리 계획 수립' },
              { id: '2', name: '노션(Notion)에 학기 일정 업데이트' },
              { id: '3', name: '시간표 개발 진행 상황 체크' },
              { id: '4', name: '네이버 광고 키워드 리서치' },
            ]}
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
          <AppLectureStatus
            title="겨울방학 특강 신청 현황"
            list={[
              {
                id: '1',
                name: '파이썬 기초 트랙',
                applicants: '24 / 30',
                link: 'forms.gle/...',
                status: '접수중',
              },
              {
                id: '2',
                name: 'AI 포트폴리오 반',
                applicants: '4 / 10',
                link: 'forms.gle/...',
                status: '마감임박',
              },
              {
                id: '3',
                name: 'C++ 알고리즘',
                applicants: '12 / 20',
                link: 'forms.gle/...',
                status: '접수중',
              },
            ]}
          />
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
    </Container>
  );
}
