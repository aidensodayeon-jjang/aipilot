import * as React from 'react';
import { useState } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Iconify from 'src/components/iconify';

import UserRegisterPopover from '../user-register-popover';
import UserInformation from '../user-information';
import UserCourseData from '../data/user-course-data';
import UserAttendedData from '../data/user-attend-data';
import UserHistoryData from '../data/user-history-data';
import UserSlackData from '../data/user-slack-data';
import UserData from '../data/user-data';
import UserRecommendCertAward from '../data/user-recommend-cert-award';

export default function UserPage() {
  const [selected, setSelected] = useState({});
  const [courseData, setCourseData] = useState([]);
  const [attendData, setAttendData] = useState([]);
  const [historyData, setHistoryData] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  
  // 신규 등록 성공 시 데이터 새로고침을 위한 트리거
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handlePopClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleRegisterSuccess = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <Container maxWidth="xl">
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={4}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800 }}>원생 상세 관리</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>학생 정보를 검색하고 상세 학적 및 이력을 관리합니다.</Typography>
        </Box>

        <Button
          variant="contained"
          color="inherit"
          onClick={handlePopClick}
          startIcon={<Iconify icon="eva:plus-fill" />}
          sx={{ bgcolor: '#1e293b', color: 'white', borderRadius: 1.5 }}
        >
          원생 신규 등록
        </Button>

        <UserRegisterPopover
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
          onRegisterSuccess={handleRegisterSuccess}
        />
      </Stack>

      <Grid container spacing={3}>
        {/* Top Section: List + Basic Info */}
        <UserData 
          setSelected={setSelected} 
          refreshTrigger={refreshTrigger}
        />

        <UserInformation selected={selected} courseData={courseData} />

        <Grid item xs={12}><Divider sx={{ borderStyle: 'dashed', my: 1 }} /></Grid>

        {/* Middle Section: Course + Attendance + History */}
        <UserCourseData selected={selected} courseData={courseData} setCourseData={setCourseData} />

        <UserAttendedData
          selected={selected}
          attendData={attendData}
          setAttendData={setAttendData}
        />

        <UserHistoryData
          selected={selected}
          historyData={historyData}
          setHistoryData={setHistoryData}
        />

        {/* Bottom Section: Slack + Awards */}
        <UserSlackData selected={selected} />
        <UserRecommendCertAward selected={selected} />
      </Grid>
    </Container>
  );
}
