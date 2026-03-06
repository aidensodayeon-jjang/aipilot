import * as React from 'react';
import { useState } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Iconify from 'src/components/iconify';
import Grid from '@mui/material/Grid';
import AttendData from '../data/attend-data';

export default function AttendView() {
  const [courseData, setCourseData] = useState([]);

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">출결 관리</Typography>

        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
          출결/보강 등록
        </Button>
      </Stack>

      <Grid container spacing={3}>
        <AttendData userData={courseData} setUserData={setCourseData} />
      </Grid>

      <Box height={10} />
    </Container>
  );
}
