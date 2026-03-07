import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import Card from '@mui/material/Card';
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import { alpha } from '@mui/material/styles';
import Divider from '@mui/material/Divider';

import Iconify from 'src/components/iconify';
import { fetchWithToken } from '../../../utils/auth/fetch-with-token';

// ----------------------------------------------------------------------

export default function SettingsView() {
  const [loading, setLoading] = useState({ students: false, timetable: false, semester: false });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [semesterInfo, setSemesterInfo] = useState({
    name: '2026년 3월 봄학기',
    start_date: '',
    end_date: '',
    vacation_start: '',
    vacation_end: '',
  });
  const [callId, setCallId] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const loadSemester = async () => {
      try {
        const response = await fetchWithToken('/api/semester/', {}, navigate);
        const data = await response.json();
        if (data.name) {
          setSemesterInfo(data);
        }
      } catch (error) {
        console.error('Failed to load semester info');
      }
    };
    loadSemester();
    
    // 발신번호 로드
    const savedCallId = localStorage.getItem('SOLAPI_CALL_ID') || '';
    setCallId(savedCallId);
  }, [navigate]);

  const handleFileUpload = async (event, type) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading({ ...loading, [type]: true });
    setStatus({ type: '', message: '' });

    if (!file.name.endsWith('.csv')) {
      setStatus({ type: 'error', message: 'CSV 파일만 가능합니다.' });
      setLoading({ ...loading, [type]: false });
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    const endpoint = type === 'students' ? '/api/import/students/' : '/api/import/timetable/';
    
    try {
      const response = await fetchWithToken(endpoint, {
        method: 'POST',
        body: formData,
      }, navigate);

      const result = await response.json();
      if (response.ok) {
        setStatus({ type: 'success', message: result.message });
      } else {
        setStatus({ type: 'error', message: result.error || '업로드 실패' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: '서버 통신 오류가 발생했습니다.' });
    } finally {
      setLoading({ ...loading, [type]: false });
    }
  };

  const handleSaveSemester = async () => {
    setLoading({ ...loading, semester: true });
    try {
      // 발신번호 저장
      localStorage.setItem('SOLAPI_CALL_ID', callId);

      const response = await fetchWithToken('/api/semester/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(semesterInfo),
      }, navigate);

      if (response.ok) {
        setStatus({ type: 'success', message: '학기 일정 및 발신번호가 저장되었습니다.' });
      } else {
        setStatus({ type: 'error', message: '저장 실패' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: '오류 발생' });
    } finally {
      setLoading({ ...loading, semester: false });
    }
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 5, display: 'flex', alignItems: 'center', gap: 2.5 }}>
        <Box sx={{ p: 2, borderRadius: 2, bgcolor: '#1e293b', color: 'white', boxShadow: '0 8px 16px 0 rgba(30, 41, 59, 0.24)' }}>
          <Iconify icon="solar:settings-bold-duotone" width={32} />
        </Box>
        <Box>
          <Typography variant="h3" sx={{ fontWeight: 800, color: '#1e293b' }}>시스템 설정</Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>데이터베이스 및 학기 일정 관리</Typography>
        </Box>
      </Box>

      {status.message && (
        <Alert severity={status.type} sx={{ mb: 3, borderRadius: 1.5 }}>
          {status.message}
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* 학기 일정 관리 */}
        <Grid xs={12} md={12}>
          <Card sx={{ p: 4, borderRadius: '16px', border: '1px solid #f1f5f9' }}>
            <Typography variant="h6" sx={{ mb: 3, color: '#1e293b' }}>📅 운영 설정 (학기 및 문자 발송)</Typography>
            <Grid container spacing={3}>
              <Grid xs={12} md={4}>
                <TextField
                  fullWidth
                  label="학기 명칭"
                  value={semesterInfo.name}
                  onChange={(e) => setSemesterInfo({ ...semesterInfo, name: e.target.value })}
                />
              </Grid>
              <Grid xs={12} md={4}>
                <TextField
                  fullWidth
                  label="개강일"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={semesterInfo.start_date}
                  onChange={(e) => setSemesterInfo({ ...semesterInfo, start_date: e.target.value })}
                />
              </Grid>
              <Grid xs={12} md={4}>
                <TextField
                  fullWidth
                  label="종강일"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={semesterInfo.end_date}
                  onChange={(e) => setSemesterInfo({ ...semesterInfo, end_date: e.target.value })}
                />
              </Grid>
              <Grid xs={12} md={4}>
                <TextField
                  fullWidth
                  label="방학 시작일"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={semesterInfo.vacation_start}
                  onChange={(e) => setSemesterInfo({ ...semesterInfo, vacation_start: e.target.value })}
                />
              </Grid>
              <Grid xs={12} md={4}>
                <TextField
                  fullWidth
                  label="방학 종료일"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={semesterInfo.vacation_end}
                  onChange={(e) => setSemesterInfo({ ...semesterInfo, vacation_end: e.target.value })}
                />
              </Grid>
              <Grid xs={12} md={4}>
                <TextField
                  fullWidth
                  label="문자 발신번호 (Call ID)"
                  placeholder="01012345678"
                  value={callId}
                  onChange={(e) => setCallId(e.target.value)}
                  helperText="솔라피에 등록된 발신번호를 입력하세요."
                />
              </Grid>
              <Grid xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleSaveSemester}
                  disabled={loading.semester}
                  sx={{ bgcolor: '#1e293b', color: 'white', px: 6, py: 1.5, borderRadius: 1.5, fontWeight: 700 }}
                >
                  {loading.semester ? <CircularProgress size={24} color="inherit" /> : '설정 저장하기'}
                </Button>
              </Grid>
            </Grid>
          </Card>
        </Grid>

        <Grid xs={12}><Divider sx={{ my: 2 }} /></Grid>

        {/* 파일 업로드 섹션 */}
        <Grid xs={12} md={4}>
          <UploadCard
            title="학생 정보 임포트"
            description="학생 마스터 정보와 수강 현황을 DB에 일괄 저장합니다."
            icon="solar:users-group-rounded-bold-duotone"
            color="#6366f1"
            loading={loading.students}
            onUpload={(e) => handleFileUpload(e, 'students')}
          />
        </Grid>

        <Grid xs={12} md={4}>
          <UploadCard
            title="시간표 업데이트"
            description="강의실별 수업 배치 및 강사 정보를 업데이트합니다."
            icon="solar:calendar-date-bold-duotone"
            color="#10b981"
            loading={loading.timetable}
            onUpload={(e) => handleFileUpload(e, 'timetable')}
          />
        </Grid>

        <Grid xs={12} md={4}>
          <UploadCard
            title="기타 운영 데이터"
            description="추가적인 학원 운영 데이터를 통합 분석에 활용합니다."
            icon="solar:document-text-bold-duotone"
            color="#f43f5e"
            loading={loading.other}
            onUpload={(e) => handleFileUpload(e, 'other')}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

function UploadCard({ title, description, icon, color, loading, onUpload }) {
  return (
    <Card sx={{ p: 4, height: '100%', borderRadius: '16px', border: '1px solid #f1f5f9', textAlign: 'center', transition: '0.3s', '&:hover': { boxShadow: '0 12px 24px rgba(0,0,0,0.05)' } }}>
      <Box sx={{ width: 64, height: 64, borderRadius: '50%', bgcolor: alpha(color, 0.1), color, display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 3 }}>
        <Iconify icon={icon} width={32} />
      </Box>
      <Typography variant="h6" sx={{ color: '#1e293b', mb: 1 }}>{title}</Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 4, minHeight: 40 }}>{description}</Typography>
      
      <Button
        variant="contained"
        component="label"
        disabled={loading}
        sx={{ bgcolor: color, color: 'white', px: 4, py: 1.5, borderRadius: 1.5, fontWeight: 700, '&:hover': { bgcolor: alpha(color, 0.8) } }}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : '파일 선택'}
        <input type="file" accept=".csv" hidden onChange={onUpload} />
      </Button>
    </Card>
  );
}

UploadCard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  icon: PropTypes.string,
  color: PropTypes.string,
  loading: PropTypes.bool,
  onUpload: PropTypes.func,
};
