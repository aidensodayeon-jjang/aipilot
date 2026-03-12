import { useState } from 'react';
import PropTypes from 'prop-types';

import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import TableContainer from '@mui/material/TableContainer';
import Tooltip from '@mui/material/Tooltip';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

// ----------------------------------------------------------------------

export default function AppLectureStatus({ title, subheader, list: initialList, ...other }) {
  const [list, setList] = useState(initialList);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  const handleAdd = () => {
    const newId = String(Date.now());
    setList([...list, { id: newId, name: '', shortUrl: '', response: '', link: '', editLink: '', isEditing: true }]);
  };

  const handleUpdate = (id, newData) => {
    setList(list.map(item => (item.id === id ? { ...item, ...newData, isEditing: false } : item)));
  };

  const handleDelete = (id) => {
    setList(list.filter(item => item.id !== id));
  };

  const toggleEdit = (id) => {
    setList(list.map(item => (item.id === id ? { ...item, isEditing: !item.isEditing } : item)));
  };

  const handleCopy = (text) => {
    if (!text) return;
    const fullUrl = text.startsWith('http') ? text : `https://${text}`;
    navigator.clipboard.writeText(fullUrl);
    setSnackbar({ open: true, message: 'URL이 클립보드에 복사되었습니다.' });
  };

  return (
    <>
      <Card {...other}>
        <CardHeader 
          title={title} 
          subheader={subheader} 
          action={
            <Button 
              size="small" 
              color="inherit" 
              startIcon={<Iconify icon="eva:plus-fill" />}
              onClick={handleAdd}
            >
              추가
            </Button>
          } 
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 850, tableLayout: 'fixed' }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ width: 120, px: 1.5 }}>제목</TableCell>
                  <TableCell sx={{ width: 150, px: 1 }}>신청단축URL</TableCell>
                  <TableCell sx={{ width: 150, px: 1 }}>응답보기</TableCell>
                  <TableCell sx={{ width: 180, px: 1 }}>신청 링크</TableCell>
                  <TableCell sx={{ width: 180, px: 1 }}>편집 링크</TableCell>
                  <TableCell align="right" sx={{ width: 80, pr: 2 }}>편집</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {list.map((row) => (
                  <LectureRow 
                    key={row.id} 
                    row={row} 
                    onUpdate={(newData) => handleUpdate(row.id, newData)}
                    onDelete={() => handleDelete(row.id)}
                    onEdit={() => toggleEdit(row.id)}
                    onCopy={handleCopy}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
      </Card>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={2000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ width: '100%' }} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}

AppLectureStatus.propTypes = {
  list: PropTypes.array,
  subheader: PropTypes.string,
  title: PropTypes.string,
};

// ----------------------------------------------------------------------

function LectureRow({ row, onUpdate, onDelete, onEdit, onCopy }) {
  const { name, shortUrl, response, link, editLink, isEditing } = row;
  const [editData, setEditData] = useState({ name, shortUrl, response, link, editLink });

  const handleChange = (e) => {
    const { name: field, value } = e.target;
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  const renderUrlLink = (url) => {
    if (!url) return <Box sx={{ color: 'text.disabled', fontStyle: 'italic', fontSize: '0.65rem', px: 1 }}>정보 없음</Box>;
    
    const fullUrl = url.startsWith('http') ? url : `https://${url}`;

    return (
      <Stack direction="row" alignItems="flex-start" spacing={0.2} sx={{ width: '100%', px: 0.5 }}>
        <Tooltip title="클릭 이동">
          <Box 
            component="span" 
            onClick={() => window.open(fullUrl, '_blank')}
            sx={{ 
              p: 0.5, px: 1, bgcolor: 'background.neutral', borderRadius: 0.5, 
              fontSize: '0.68rem', color: 'primary.dark', fontFamily: 'monospace',
              cursor: 'pointer', lineHeight: 1.3, wordBreak: 'break-all', display: 'inline-block',
              transition: '0.2s', flexGrow: 1,
              '&:hover': { bgcolor: 'primary.lighter', color: 'primary.main' }
            }}
          >
            {url}
          </Box>
        </Tooltip>
        
        <Stack direction="column" spacing={-0.5}>
          <IconButton size="small" onClick={() => onCopy(url)} sx={{ p: 0.25 }}>
            <Iconify icon="solar:copy-bold-duotone" width={12} color="text.disabled" />
          </IconButton>
          <IconButton size="small" onClick={() => window.open(fullUrl, '_blank')} sx={{ p: 0.25 }}>
            <Iconify icon="eva:external-link-fill" width={12} color="text.disabled" />
          </IconButton>
        </Stack>
      </Stack>
    );
  };

  if (isEditing) {
    return (
      <TableRow>
        <TableCell sx={{ px: 1 }}>
          <TextField name="name" size="small" variant="standard" value={editData.name} onChange={handleChange} placeholder="제목" fullWidth inputProps={{ style: { fontSize: '0.75rem' } }} />
        </TableCell>
        <TableCell sx={{ px: 0.5 }}>
          <TextField name="shortUrl" size="small" variant="standard" multiline value={editData.shortUrl} onChange={handleChange} placeholder="단축" fullWidth inputProps={{ style: { fontSize: '0.7rem' } }} />
        </TableCell>
        <TableCell sx={{ px: 0.5 }}>
          <TextField name="response" size="small" variant="standard" multiline value={editData.response} onChange={handleChange} placeholder="응답" fullWidth inputProps={{ style: { fontSize: '0.7rem' } }} />
        </TableCell>
        <TableCell sx={{ px: 0.5 }}>
          <TextField name="link" size="small" variant="standard" multiline value={editData.link} onChange={handleChange} placeholder="신청" fullWidth inputProps={{ style: { fontSize: '0.7rem' } }} />
        </TableCell>
        <TableCell sx={{ px: 0.5 }}>
          <TextField name="editLink" size="small" variant="standard" multiline value={editData.editLink} onChange={handleChange} placeholder="편집" fullWidth inputProps={{ style: { fontSize: '0.7rem' } }} />
        </TableCell>
        <TableCell align="right" sx={{ pr: 1.5 }}>
          <Stack direction="row" justifyContent="flex-end" spacing={0}>
            <IconButton size="small" color="success" onClick={() => onUpdate(editData)}>
              <Iconify icon="eva:checkmark-fill" width={18} />
            </IconButton>
            <IconButton size="small" color="inherit" onClick={onEdit}>
              <Iconify icon="eva:close-fill" width={18} />
            </IconButton>
          </Stack>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <TableRow sx={{ '&:hover': { bgcolor: 'action.hover' } }}>
      <TableCell sx={{ fontWeight: 700, color: 'text.primary', fontSize: '0.75rem', px: 1.5 }}>{name || '(제목 없음)'}</TableCell>
      <TableCell sx={{ px: 0.5 }}>{renderUrlLink(shortUrl)}</TableCell>
      <TableCell sx={{ px: 0.5 }}>{renderUrlLink(response)}</TableCell>
      <TableCell sx={{ px: 0.5 }}>{renderUrlLink(link)}</TableCell>
      <TableCell sx={{ px: 0.5 }}>{renderUrlLink(editLink)}</TableCell>
      <TableCell align="right" sx={{ pr: 1.5 }}>
        <Stack direction="row" justifyContent="flex-end" spacing={0.5}>
          <IconButton size="small" color="primary" onClick={onEdit} sx={{ p: 0.5 }}>
            <Iconify icon="solar:pen-bold-duotone" width={16} />
          </IconButton>
          <IconButton size="small" color="error" onClick={onDelete} sx={{ p: 0.5 }}>
            <Iconify icon="solar:trash-bin-trash-bold-duotone" width={16} />
          </IconButton>
        </Stack>
      </TableCell>
    </TableRow>
  );
}

LectureRow.propTypes = {
  row: PropTypes.object,
  onUpdate: PropTypes.func,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  onCopy: PropTypes.func,
};
