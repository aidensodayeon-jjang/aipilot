import { useState, useEffect, useCallback } from 'react';
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
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { alpha } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';

import Iconify from 'src/components/iconify';
import { fetchWithToken } from '../../utils/auth/fetch-with-token';

// ----------------------------------------------------------------------

export default function MsgSend() {
  const [content, setContent] = useState('');
  const [recipients, setPhoneNums] = useState([]);
  const [students, setStudents] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  
  const [inputValue, setInputValue] = useState(''); // 검색창 입력값 제어
  const [bulkInput, setBulkInput] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  
  // 템플릿 관리 관련 상태
  const [templateDialogOpen, setTemplateDialogOpen] = useState(false);
  const [newTemplate, setNewTemplate] = useState({ title: '', content: '' });

  const navigate = useNavigate();

  const loadTemplates = useCallback(async () => {
    try {
      const response = await fetchWithToken('/api/message/templates/', {}, navigate);
      if (response.ok) {
        const data = await response.json();
        setTemplates(data);
      }
    } catch (error) {
      console.error('Failed to load templates:', error);
    }
  }, [navigate]);

  useEffect(() => {
    const loadStudents = async () => {
      setLoading(true);
      try {
        const response = await fetchWithToken('/api/students/', {}, navigate);
        const data = await response.json();
        setStudents(Array.isArray(data) ? data : data.results || []);
      } catch (error) {
        console.error('Failed to load students:', error);
        setStudents([]);
      } finally {
        setLoading(false);
      }
    };
    loadStudents();
    loadTemplates();
  }, [navigate, loadTemplates]);

  const addRecipient = (name, phone) => {
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length >= 10) {
      setPhoneNums((prev) => {
        if (prev.some((r) => r.phone === cleanPhone)) return prev;
        return [...prev, { name, phone: cleanPhone }];
      });
      return true;
    }
    return false;
  };

  const handleAddRecipient = (event, value) => {
    if (typeof value === 'string' && value.trim()) {
      if (addRecipient('직접입력', value)) {
        setInputValue('');
      }
    } else if (value && value.phone_parent) {
      addRecipient(value.name, value.phone_parent);
      setInputValue('');
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
      sender,
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

  const handleSaveTemplate = async () => {
    if (!newTemplate.title || !newTemplate.content) return;
    try {
      const response = await fetchWithToken('/api/message/templates/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTemplate),
      }, navigate);
      if (response.ok) {
        setTemplateDialogOpen(false);
        setNewTemplate({ title: '', content: '' });
        loadTemplates();
      }
    } catch (error) {
      console.error('Failed to save template:', error);
    }
  };

  const handleDeleteTemplate = async (id) => {
    try {
      const response = await fetchWithToken(`/api/message/templates/?id=${id}`, {
        method: 'DELETE',
      }, navigate);
      if (response.ok) {
        loadTemplates();
      }
    } catch (error) {
      console.error('Failed to delete template:', error);
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
          <Card sx={{ p: 3, height: 600, display: 'flex', flexDirection: 'column', border: '1px solid #f1f5f9', boxShadow: 'none' }}>
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
              getOptionLabel={(option) => {
                if (typeof option === 'string') return option;
                return option?.name ? `${option.name} (${option.phone_parent})` : '';
              }}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
              onChange={handleAddRecipient}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="학생 검색 또는 번호 직접 입력"
                  placeholder="이름 또는 010... 입력 후 Enter"
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <>
                        <Box sx={{ ml: 1, display: 'flex', color: 'text.disabled' }}>
                          <Iconify icon="solar:magnifer-bold-duotone" width={20} />
                        </Box>
                        {params.InputProps.startAdornment}
                      </>
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
          <Card sx={{ p: 3, height: 600, display: 'flex', flexDirection: 'column', border: '1px solid #f1f5f9', boxShadow: 'none' }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
              <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Iconify icon="solar:pen-new-square-bold-duotone" width={24} color="#6366f1" />
                메시지 작성
              </Typography>
              
              <Stack direction="row" spacing={1}>
                <Autocomplete
                  size="small"
                  options={templates}
                  getOptionLabel={(option) => option.title}
                  sx={{ width: 200 }}
                  onChange={(e, value) => {
                    if (value) setContent(value.content);
                  }}
                  renderInput={(params) => <TextField {...params} label="템플릿 선택" />}
                />
                <Button 
                  variant="soft" 
                  size="small" 
                  startIcon={<Iconify icon="solar:settings-bold-duotone" />}
                  onClick={() => setTemplateDialogOpen(true)}
                >
                  관리
                </Button>
              </Stack>
            </Stack>

            <TextField
              fullWidth
              multiline
              rows={15}
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

      {/* 대량 추가 팝업 */}
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

      {/* 템플릿 관리 다이얼로그 */}
      <Dialog open={templateDialogOpen} onClose={() => setTemplateDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>메시지 템플릿 관리</DialogTitle>
        <DialogContent dividers>
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" gutterBottom>새 템플릿 추가</Typography>
            <TextField
              fullWidth
              label="템플릿 제목"
              size="small"
              value={newTemplate.title}
              onChange={(e) => setNewTemplate({ ...newTemplate, title: e.target.value })}
              sx={{ mb: 1 }}
            />
            <TextField
              fullWidth
              multiline
              rows={3}
              label="내용"
              value={newTemplate.content}
              onChange={(e) => setNewTemplate({ ...newTemplate, content: e.target.value })}
              sx={{ mb: 1 }}
            />
            <Button variant="contained" fullWidth onClick={handleSaveTemplate} disabled={!newTemplate.title || !newTemplate.content}>
              저장하기
            </Button>
          </Box>
          
          <Typography variant="subtitle2" gutterBottom>기존 템플릿 목록</Typography>
          <Stack spacing={1}>
            {templates.map((t) => (
              <Card key={t.id} variant="outlined" sx={{ p: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="subtitle2">{t.title}</Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }} noWrap>{t.content}</Typography>
                </Box>
                <IconButton color="error" size="small" onClick={() => handleDeleteTemplate(t.id)}>
                  <Iconify icon="solar:trash-bin-trash-bold-duotone" />
                </IconButton>
              </Card>
            ))}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setTemplateDialogOpen(false)}>닫기</Button>
        </DialogActions>
      </Dialog>

      <Box sx={{ mt: 3, p: 2, bgcolor: alpha('#6366f1', 0.05), borderRadius: 1.5 }}>
        <Typography variant="caption" sx={{ color: '#6366f1', fontWeight: 700, display: 'block', mb: 0.5 }}>💡 안내</Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          • 이름으로 학생을 찾거나, 직접 번호를 입력한 후 Enter를 눌러 수신자를 추가할 수 있습니다.<br />
          • 템플릿 기능을 통해 자주 사용하는 메시지 내용을 저장하고 불러올 수 있습니다.
        </Typography>
      </Box>
    </Box>
  );
}
