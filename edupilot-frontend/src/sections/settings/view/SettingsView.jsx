import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function SettingsView() {
  const [sheetId, setSheetId] = useState('');
  const [fileName, setFileName] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);

  useEffect(() => {
    const savedId = localStorage.getItem('GOOGLE_SHEET_ID') || '';
    const savedFileName = localStorage.getItem('UPLOADED_FILE_NAME') || '';
    setSheetId(savedId);
    setFileName(savedFileName);
  }, []);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
        setUploadStatus({ type: 'error', message: 'CSV 파일만 업로드 가능합니다.' });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        localStorage.setItem('UPLOADED_CSV_DATA', content);
        localStorage.setItem('UPLOADED_FILE_NAME', file.name);
        setFileName(file.name);
        setUploadStatus({ type: 'success', message: `${file.name} 파일이 성공적으로 로드되었습니다!` });
        
        // 구글 시트 ID 설정은 초기화 (충돌 방지)
        localStorage.removeItem('GOOGLE_SHEET_ID');
        setSheetId('');
      };
      reader.readAsText(file);
    }
  };

  const handleSave = () => {
    let finalId = sheetId;
    let finalGid = '0';

    if (sheetId.includes('docs.google.com/spreadsheets/d/')) {
      const matchId = sheetId.match(/\/d\/([^/]+)/);
      if (matchId) finalId = matchId[1];
      const matchGid = sheetId.match(/[#&?]gid=([0-9]+)/);
      if (matchGid) finalGid = matchGid[1];
    }

    localStorage.setItem('GOOGLE_SHEET_ID', finalId);
    localStorage.setItem('GOOGLE_SHEET_GID', finalGid);
    // 파일 데이터는 삭제 (충돌 방지)
    localStorage.removeItem('UPLOADED_CSV_DATA');
    localStorage.removeItem('UPLOADED_FILE_NAME');
    setFileName('');
    
    setSheetId(finalId);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const clearData = () => {
    localStorage.removeItem('GOOGLE_SHEET_ID');
    localStorage.removeItem('GOOGLE_SHEET_GID');
    localStorage.removeItem('UPLOADED_CSV_DATA');
    localStorage.removeItem('UPLOADED_FILE_NAME');
    setSheetId('');
    setFileName('');
    setUploadStatus({ type: 'info', message: '모든 연동 데이터가 초기화되었습니다. 기본 샘플 데이터를 사용합니다.' });
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 5, display: 'flex', alignItems: 'center', gap: 2.5 }}>
        <Box
          sx={{
            p: 2,
            display: 'flex',
            borderRadius: 2,
            bgcolor: '#1e293b',
            color: 'white',
            boxShadow: '0 8px 16px 0 rgba(30, 41, 59, 0.24)',
          }}
        >
          <Iconify icon="solar:settings-bold-duotone" width={32} />
        </Box>
        <Box>
          <Typography variant="h3" sx={{ fontWeight: 800, color: '#1e293b' }}>
            시스템 설정
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            데이터 소스 관리 및 보안 분석 환경 설정
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* 방법 1: 로컬 파일 업로드 (보안 추천) */}
        <Grid xs={12} md={6}>
          <Card sx={{ p: 4, height: '100%', borderRadius: '16px', border: '1px solid #f1f5f9' }}>
            <Stack spacing={3}>
              <Box>
                <Typography variant="h6" sx={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Iconify icon="solar:upload-bold-duotone" /> 방법 1: 로컬 CSV 업로드 (보안형)
                </Typography>
                <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                  구글 시트에서 [파일] &gt; [다운로드] &gt; [CSV]로 받은 파일을 선택하세요. 
                  데이터는 외부로 전송되지 않고 브라우저에만 머뭅니다.
                </Typography>
              </Box>

              <Box
                sx={{
                  p: 4,
                  border: '2px dashed #cbd5e1',
                  borderRadius: 2,
                  bgcolor: '#f8fafc',
                  textAlign: 'center',
                  cursor: 'pointer',
                  '&:hover': { bgcolor: '#f1f5f9' },
                }}
                component="label"
              >
                <input type="file" accept=".csv" hidden onChange={handleFileUpload} />
                <Iconify icon="solar:document-add-bold-duotone" width={48} sx={{ color: '#94a3b8', mb: 2 }} />
                <Typography variant="subtitle1" sx={{ color: '#475569', fontWeight: 700 }}>
                  {fileName ? `선택됨: ${fileName}` : '클릭하여 CSV 파일 선택'}
                </Typography>
                <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block', mt: 1 }}>
                  파일을 서버에 저장하지 않으므로 안심하고 업로드하세요.
                </Typography>
              </Box>

              {uploadStatus && (
                <Alert severity={uploadStatus.type} sx={{ borderRadius: 1.5 }}>
                  {uploadStatus.message}
                </Alert>
              )}
            </Stack>
          </Card>
        </Grid>

        {/* 방법 2: 구글 시트 실시간 연동 */}
        <Grid xs={12} md={6}>
          <Card sx={{ p: 4, height: '100%', borderRadius: '16px', border: '1px solid #f1f5f9' }}>
            <Stack spacing={3}>
              <Box>
                <Typography variant="h6" sx={{ color: '#3b82f6', display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Iconify icon="logos:google-sheets" width={20} /> 방법 2: 구글 시트 연동 (편의성)
                </Typography>
                <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                  시트가 &quot;웹에 게시(CSV)&quot; 상태일 때 실시간 동기화가 가능합니다. 
                  <b>학원 외부 공유가 가능한 데이터인 경우에만 추천합니다.</b>
                </Typography>
              </Box>

              <TextField
                fullWidth
                label="Google Sheet URL or ID"
                placeholder="링크를 그대로 붙여넣으세요"
                value={sheetId}
                onChange={(e) => setSheetId(e.target.value)}
                helperText="URL을 넣으면 ID와 GID를 자동으로 추출합니다."
              />

              <Button
                variant="contained"
                size="large"
                color="primary"
                onClick={handleSave}
                disabled={!sheetId}
                sx={{ borderRadius: 1.5, py: 1.5, fontWeight: 700 }}
              >
                구글 시트 연동 저장
              </Button>

              {isSaved && (
                <Alert severity="success" sx={{ borderRadius: 1.5 }}>
                  연동 설정이 완료되었습니다. 대시보드를 확인하세요!
                </Alert>
              )}
            </Stack>
          </Card>
        </Grid>

        <Grid xs={12}>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="text"
              color="error"
              onClick={clearData}
              startIcon={<Iconify icon="solar:trash-bin-trash-bold-duotone" />}
              sx={{ fontWeight: 600 }}
            >
              연동 데이터 초기화 및 기본 샘플 사용하기
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
