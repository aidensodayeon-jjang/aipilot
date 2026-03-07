import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Iconify from 'src/components/iconify';
import { fetchWithToken } from 'src/utils/auth/fetch-with-token';
import { fFetchResponse } from 'src/utils/format-array';

import UserRegisterPopover from '../user-register-popover';
import UserInformation from '../user-information';
import UserCourseData from '../data/user-course-data';
import UserAttendedData from '../data/user-attend-data';
import UserHistoryData from '../data/user-history-data';
import UserSlackData from '../data/user-slack-data';
import UserData from '../data/user-data';
import UserRecommendCertAward from '../data/user-recommend-cert-award';

export default function UserPage() {
  const [userData, setUserData] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const [attendData, setAttendData] = useState([]);
  const [historyData, setHistoryData] = useState([]);
  const [selected, setSelected] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);

  const navigate = useNavigate();

  const loadUserData = useCallback(async () => {
    try {
      const response = await fetchWithToken('/api/students/', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }, navigate);
      const result = await response.json();
      const row = fFetchResponse(result);
      setUserData(row);
    } catch (error) {
      console.error('Failed to fetch students:', error);
    }
  }, [navigate]);

  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  const handlePopClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleRegisterSuccess = () => {
    loadUserData();
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
          userData={userData} 
          setUserData={setUserData} 
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
