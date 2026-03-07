import { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { alpha } from '@mui/material/styles';

import Iconify from 'src/components/iconify';
import { fetchWithToken } from '../../../utils/auth/fetch-with-token';

// ----------------------------------------------------------------------

const DAY_MAP = {
  SUN: '일요일',
  MON: '월요일',
  TUE: '화요일',
  WED: '수요일',
  THU: '목요일',
  FRI: '금요일',
  SAT: '토요일',
};

const ROOM_IDS = ['1', '2', '3', '4', '5'];

export default function ScheduleView() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [timetableData, setTimetableData] = useState({});
  const [dailyLogs, setDailyLogs] = useState([]);
  const [modalState, setModalState] = useState({ isOpen: false, student: null, classInfo: null });

  const navigate = useNavigate();

  const getStatusColor = useCallback((status) => {
    if (status === 'present') return '#10b981';
    if (status === 'absent') return '#f43f5e';
    return '#64748b';
  }, []);

  const selectedAppDay = useMemo(() => {
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    return days[selectedDate.getDay()];
  }, [selectedDate]);

  const fetchScheduleData = useCallback(async () => {
    try {
      // 1. 전체 시간표 구조 가져오기 (API 구현 필요)
      const scheduleRes = await fetchWithToken('/api/schedule/structure/', {}, navigate);
      const schedule = await scheduleRes.json();
      setTimetableData(schedule);

      // 2. 해당 날짜 출결 로그 가져오기
      const dateStr = selectedDate.toISOString().split('T')[0];
      const logsRes = await fetchWithToken(`/api/schedule/logs/?date=${dateStr}`, {}, navigate);
      const logs = await logsRes.json();
      setDailyLogs(logs);
    } catch (error) {
      console.error('Failed to fetch schedule data:', error);
    }
  }, [selectedDate, navigate]);

  useEffect(() => {
    fetchScheduleData();
  }, [fetchScheduleData]);

  const currentDaySlots = useMemo(() => timetableData[selectedAppDay] || [], [timetableData, selectedAppDay]);

  const handleStudentClick = (student, classInfo) => {
    setModalState({ isOpen: true, student, classInfo });
  };

  const handleModalAction = async (action) => {
    // API 연동 로직 (출석/결석/취소 처리)
    console.log(`Action: ${action} for student ${modalState.student.name}`);
    setModalState({ ...modalState, isOpen: false });
    fetchScheduleData(); // 데이터 새로고침
  };

  const getSubjectColor = (className) => {
    if (className?.startsWith('DM-PY')) return '#e0f2fe';
    if (className?.startsWith('DC-C')) return '#fff7ed';
    if (className?.startsWith('DC-RX')) return '#f0fdf4';
    return '#f8fafc';
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 5, display: 'flex', alignItems: 'center', gap: 2.5 }}>
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
          <Iconify icon="solar:calendar-bold-duotone" width={32} />
        </Box>
        <Box>
          <Typography variant="h3" sx={{ fontWeight: 800, color: '#1e293b' }}>
            시간표 및 출결 관리
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            {DAY_MAP[selectedAppDay]} 수업 현황을 확인하고 출결을 관리합니다.
          </Typography>
        </Box>
      </Box>

      <Card sx={{ p: 2, mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Stack direction="row" spacing={1}>
          {[0, 1, 2, 3, 4, 5, 6].map((i) => {
            const d = new Date();
            d.setDate(d.getDate() - (6 - i));
            const isSelected = d.toDateString() === selectedDate.toDateString();
            return (
              <Button
                key={i}
                variant={isSelected ? 'contained' : 'outlined'}
                color={isSelected ? 'primary' : 'inherit'}
                onClick={() => setSelectedDate(d)}
                sx={{ borderRadius: 1.5, minWidth: 100 }}
              >
                {i === 6 ? '오늘' : `${d.getMonth() + 1}/${d.getDate()}`}
              </Button>
            );
          })}
        </Stack>
        <TextField
          type="date"
          value={selectedDate.toISOString().split('T')[0]}
          onChange={(e) => setSelectedDate(new Date(e.target.value))}
          size="small"
          sx={{ width: 200 }}
        />
      </Card>

      <TableContainer component={Paper} sx={{ borderRadius: 2, border: '1px solid #f1f5f9', boxShadow: 'none', maxHeight: 700 }}>
        <Table stickyHeader sx={{ minWidth: 1200 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ bgcolor: '#f8fafc', fontWeight: 700, textAlign: 'center', width: 100 }}>시간</TableCell>
              {ROOM_IDS.map((room) => (
                <TableCell key={room} sx={{ bgcolor: '#f8fafc', fontWeight: 700, textAlign: 'center', minWidth: 200 }}>
                  {room} 강의실
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {currentDaySlots.length > 0 ? (
              currentDaySlots.map((slot) => (
                <TableRow key={slot.time}>
                  <TableCell sx={{ fontWeight: 800, textAlign: 'center', borderRight: '1px solid #f1f5f9', bgcolor: '#f8fafc' }}>
                    {slot.time}
                  </TableCell>
                  {ROOM_IDS.map((room) => {
                    const classInfo = slot.rooms[room];
                    return (
                      <TableCell key={room} sx={{ p: 0.8, minHeight: 160, verticalAlign: 'top', borderRight: '1px solid #f1f5f9' }}>
                        {classInfo && (
                          <Box
                            sx={{
                              p: 1.2,
                              height: '100%',
                              minHeight: 140,
                              borderRadius: 1.5,
                              bgcolor: getSubjectColor(classInfo.className),
                              borderLeft: '4px solid #6366f1',
                              boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                              display: 'flex',
                              flexDirection: 'column'
                            }}
                          >
                            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1e293b', fontSize: '0.85rem', lineHeight: 1.2, mb: 0.5 }}>
                              {classInfo.className}
                            </Typography>
                            <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 1, fontSize: '0.7rem' }}>
                              {classInfo.instructor} 선생님
                            </Typography>
                            
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.3 }}>
                              {classInfo.students.slice(0, 8).map((student) => {
                                const log = dailyLogs.find(l => l.student_id === student.id && l.class_id === classInfo.classId);
                                const status = log?.status || 'none';
                                
                                return (
                                  <Box
                                    key={student.id}
                                    onClick={() => handleStudentClick(student, classInfo)}
                                    sx={{
                                      px: 0.6,
                                      py: 0.2,
                                      borderRadius: 0.5,
                                      fontSize: '0.72rem',
                                      fontWeight: 600,
                                      cursor: 'pointer',
                                      bgcolor: status === 'present' ? alpha('#10b981', 0.1) : alpha('#f1f5f9', 0.5),
                                      color: getStatusColor(status),
                                      border: '1px solid',
                                      borderColor: status === 'present' ? alpha('#10b981', 0.2) : 'transparent',
                                      '&:hover': { bgcolor: alpha('#6366f1', 0.05) }
                                    }}
                                  >
                                    {student.name}
                                  </Box>
                                );
                              })}
                              {classInfo.students.length > 8 && (
                                <Box sx={{ px: 0.5, py: 0.2, fontSize: '0.7rem', color: 'text.disabled', fontWeight: 700 }}>
                                  +{classInfo.students.length - 8}
                                </Box>
                              )}
                            </Box>
                          </Box>
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={ROOM_IDS.length + 1} sx={{ py: 10, textAlign: 'center', color: 'text.disabled' }}>
                  예정된 수업이 없습니다.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* 출결 처리 모달 */}
      <Modal open={modalState.isOpen} onClose={() => setModalState({ ...modalState, isOpen: false })}>
        <Box sx={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: 320, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 24, p: 4, textAlign: 'center'
        }}>
          <Typography variant="h5" sx={{ mb: 1, fontWeight: 800 }}>{modalState.student?.name}</Typography>
          <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>{modalState.classInfo?.className}</Typography>
          
          <Grid container spacing={2}>
            <Grid xs={6}>
              <Button fullWidth variant="soft" color="info" onClick={() => handleModalAction('present')} sx={{ height: 80, flexDirection: 'column' }}>
                <Iconify icon="solar:user-check-bold" width={32} sx={{ mb: 0.5 }} /> 출석
              </Button>
            </Grid>
            <Grid xs={6}>
              <Button fullWidth variant="soft" color="error" onClick={() => handleModalAction('absent')} sx={{ height: 80, flexDirection: 'column' }}>
                <Iconify icon="solar:user-cross-bold" width={32} sx={{ mb: 0.5 }} /> 결석
              </Button>
            </Grid>
            <Grid xs={6}>
              <Button fullWidth variant="soft" color="inherit" onClick={() => handleModalAction('reset')} sx={{ height: 80, flexDirection: 'column' }}>
                <Iconify icon="solar:undo-left-bold" width={32} sx={{ mb: 0.5 }} /> 취소
              </Button>
            </Grid>
            <Grid xs={6}>
              <Button fullWidth variant="soft" color="success" onClick={() => handleModalAction('sms')} sx={{ height: 80, flexDirection: 'column' }}>
                <Iconify icon="solar:letter-bold" width={32} sx={{ mb: 0.5 }} /> 문자
              </Button>
            </Grid>
          </Grid>
          
          <Button fullWidth onClick={() => setModalState({ ...modalState, isOpen: false })} sx={{ mt: 3 }}>닫기</Button>
        </Box>
      </Modal>
    </Container>
  );
}
