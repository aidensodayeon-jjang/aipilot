import * as React from 'react';
import { useState } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
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
  const [userData, setUserData] = useState([]);

  const [courseData, setCourseData] = useState([]);
  const [attendData, setAttendData] = useState([]);
  const [historyData, setHistoryData] = useState([]);

  const [selected, setSelected] = useState({});

  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleRegisterSuccess = (userId) => {
    setSelected(userId);
  };

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">원생 관리</Typography>

        <Button
          variant="contained"
          color="inherit"
          onClick={handlePopClick}
          startIcon={<Iconify icon="eva:plus-fill" />}
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
        <UserData setSelected={setSelected} userData={userData} setUserData={setUserData} />

        <UserInformation selected={selected} courseData={courseData} />
      </Grid>

      <Box height={10} />

      <Grid container spacing={3}>
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
      </Grid>

      <Box height={10} />
      <Grid container spacing={3}>
        <UserSlackData selected={selected} />
        <UserRecommendCertAward selected={selected} />
      </Grid>
    </Container>
  );
}
