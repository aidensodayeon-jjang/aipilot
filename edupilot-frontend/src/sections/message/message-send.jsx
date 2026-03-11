import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import Alert from '@mui/material/Alert';
import Popover from '@mui/material/Popover';
import { alpha } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';

import Iconify from 'src/components/iconify';
import { fetchWithToken } from '../../utils/auth/fetch-with-token';

// ----------------------------------------------------------------------

export default function MsgSend() {
  const [content, setContent] = useState('');
  const [recipients, setPhoneNums] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  
  const [inputValue, setInputValue] = useState(''); // 검색창 입력값 제어
  const [bulkInput, setBulkInput] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const loadStudents = async () => {
      setLoading(true);
      try {
        const response = await fetchWithToken('/api/students/', {}, navigate);
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error('Failed to load students:', error);
      } finally {
        setLoading(false);
      }
    };
    loadStudents();
  }, [navigate]);

  const addRecipient = (name, phone) => {
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length >= 10 && !recipients.some(r => r.phone === cleanPhone)) {
      setPhoneNums(prev => [...prev, { name, phone: cleanPhone }]);
      return true;
    }
    return false;
  };

  const handleAddRecipient = (event, value) => {
    if (typeof value === 'string' && value.trim()) {
      if (addRecipient('직접입력', value)) {
        setInputValue(''); // 입력창 초기화
      }
    } else if (value && value.phone_parent) {
      addRecipient(value.name, value.phone_parent);
      setInputValue(''); // 입력창 초기화
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && inputValue.trim()) {
      // 숫자인 경우 직접 추가 로직 트리거
      const cleanInput = inputValue.replace(/[^0-9]/g, '');
      if (cleanInput.length >= 10) {
        addRecipient('직접입력', inputValue);
        setInputValue('');
        event.preventDefault();
      }
    }
  };

  const handleBulkAdd = () => {
    const numbers = bulkInput.split(/[\n,]/).map(n => n.trim()).filter(n => n !== '');
    numbers.forEach(num => addRecipient('직접입력', num));
    setBulkInput('');
    setAnchorEl(null);
  };

  const handleRemoveRecipient = (phone) => {
    setPhoneNums(recipients.filter(r => r.phone !== phone));
  };

  const handleSend = async () => {
    const sender = localStorage.getItem('SOLAPI_CALL_ID') || '';
    
    setSending(true);
    setStatus({ type: '', message: '' });

    const payload = {
      content,
      phoneNums: recipients.map(r => r.phone),
      sender, // 비어있으면 백엔드 config.ini의 call_id 사용
    };

    try {
      const response = await fetchWithToken('/api/message/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }, navigate);

      if (response.ok) {
        setStatus({ type: 'success', message: '메시지 발송에 성공했습니다!' });
        setPhoneNums([]);
        setContent('');
      } else {
        setStatus({ type: 'error', message: '발송 실패: 잔액 부족 혹은 번호 오류' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: '서버 통신 오류가 발생했습니다.' });
    } finally {
      setSending(false);
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      {status.message && (
        <Alert severity={status.type} sx={{ mb: 3, borderRadius: 1.5 }}>
          {status.message}
        </Alert>
      )}

      <Grid container spacing={3}>
        <Grid xs={12} md={5}>
          <Card sx={{ p: 3, height: 550, display: 'flex', flexDirection: 'column', border: '1px solid #f1f5f9', boxShadow: 'none' }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
              <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Iconify icon="solar:users-group-two-rounded-bold-duotone" width={24} color="#6366f1" />
                수신자 관리
              </Typography>
              <Button 
                variant="soft" 
                size="small" 
                startIcon={<Iconify icon="solar:clipboard-list-bold-duotone" />}
                onClick={(e) => setAnchorEl(e.currentTarget)}
              >
                대량 추가
              </Button>
            </Stack>

            <Autocomplete
              fullWidth
              freeSolo
              loading={loading}
              options={students}
              getOptionLabel={(option) => typeof option === 'string' ? option : `${option.name} (${option.phone_parent})`}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
              onChange={handleAddRecipient}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="학생 검색 또는 번호 직접 입력"
                  placeholder="이름 또는 010... 입력 후 Enter"
                  onKeyDown={handleKeyDown}
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <Box sx={{ ml: 1, display: 'flex', color: 'text.disabled' }}>
                        <Iconify icon="solar:magnifer-bold-duotone" width={20} />
                      </Box>
                    ),
                  }}
                />
              )}
              sx={{ mb: 2 }}
            />

            <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 1.5, bgcolor: '#f8fafc', borderRadius: 1.5, border: '1px solid #f1f5f9' }}>
              <Stack direction="row" flexWrap="wrap" gap={1}>
                {recipients.length === 0 ? (
                  <Typography variant="body2" sx={{ color: 'text.disabled', m: 'auto', textAlign: 'center', mt: 10 }}>
                    수신자를 추가해주세요.<br />(직접 입력 또는 대량 추가 가능)
                  </Typography>
                ) : (
                  recipients.map((r) => (
                    <Chip
                      key={r.phone}
                      label={`${r.name}: ${r.phone}`}
                      onDelete={() => handleRemoveRecipient(r.phone)}
                      sx={{ bgcolor: 'white', border: '1px solid #e2e8f0', fontWeight: 600 }}
                    />
                  ))
                )}
              </Stack>
            </Box>

            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 700 }}>
                총 {recipients.length}명 선택됨
              </Typography>
              <Button size="small" color="error" onClick={() => setPhoneNums([])} disabled={recipients.length === 0}>
                전체 삭제
              </Button>
            </Stack>
          </Card>
        </Grid>

        <Grid xs={12} md={7}>
          <Card sx={{ p: 3, height: 550, display: 'flex', flexDirection: 'column', border: '1px solid #f1f5f9', boxShadow: 'none' }}>
            <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Iconify icon="solar:pen-new-square-bold-duotone" width={24} color="#6366f1" />
              메시지 작성
            </Typography>

            <TextField
              fullWidth
              multiline
              rows={14}
              placeholder="보낼 내용을 입력하세요..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              sx={{ flexGrow: 1, '& .MuiOutlinedInput-root': { bgcolor: '#f8fafc' } }}
            />

            <Box sx={{ mt: 2 }}>
              <Button
                fullWidth
                size="large"
                variant="contained"
                disabled={sending || recipients.length === 0 || !content}
                onClick={handleSend}
                startIcon={sending ? <CircularProgress size={20} color="inherit" /> : <Iconify icon="solar:plain-bold" />}
                sx={{ bgcolor: '#1e293b', color: 'white', py: 1.5, borderRadius: 1.5, fontWeight: 800, '&:hover': { bgcolor: '#334155' } }}
              >
                {sending ? '발송 중...' : '메시지 발송하기'}
              </Button>
            </Box>
          </Card>
        </Grid>
      </Grid>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{ sx: { p: 2, width: 320 } }}
      >
        <Typography variant="subtitle2" sx={{ mb: 1.5 }}>전화번호 대량 추가</Typography>
        <TextField
          fullWidth
          multiline
          rows={6}
          placeholder="01012345678, 01098765432... (줄바꿈 또는 콤마로 구분)"
          value={bulkInput}
          onChange={(e) => setBulkInput(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button fullWidth variant="contained" onClick={handleBulkAdd} sx={{ bgcolor: '#6366f1', color: 'white' }}>
          목록에 추가하기
        </Button>
      </Popover>

      <Box sx={{ mt: 3, p: 2, bgcolor: alpha('#6366f1', 0.05), borderRadius: 1.5 }}>
        <Typography variant="caption" sx={{ color: '#6366f1', fontWeight: 700, display: 'block', mb: 0.5 }}>💡 안내</Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          • 이름으로 학생을 찾거나, 직접 번호를 입력한 후 Enter를 눌러 수신자를 추가할 수 있습니다.<br />
          • [대량 추가] 버튼을 눌러 여러 개의 번호를 한꺼번에 복사하여 넣을 수 있습니다.
        </Typography>
      </Box>
    </Box>
  );
}
