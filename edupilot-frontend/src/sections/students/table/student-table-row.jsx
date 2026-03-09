import PropTypes from 'prop-types';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function StudentTableRow({
  id,
  name,
  memo,
  phone_parent,
  grade,
  school,
  status,
  current_course,
  onStatusChange,
  onMerge,
}) {
  const isPending = status === '확인필요';

  return (
    <TableRow hover sx={{ bgcolor: isPending ? 'rgba(255, 171, 0, 0.08)' : 'inherit' }}>
      <TableCell sx={{ fontWeight: 700, minWidth: 100 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {name}
          {isPending && (
            <Button
              size="small"
              variant="contained"
              color="warning"
              onClick={() => onMerge(id, name)}
              sx={{ height: 20, fontSize: '0.625rem', px: 1 }}
            >
              이력 통합
            </Button>
          )}
        </Box>
      </TableCell>
      <TableCell sx={{ minWidth: 120 }}>
        <Select
          value={status || '재원생'}
          onChange={(e) => onStatusChange(id, e.target.value)}
          size="small"
          sx={{ height: 32, '& .MuiSelect-select': { py: 0, fontSize: '0.8125rem' } }}
        >
          <MenuItem value="재원생">재원생</MenuItem>
          <MenuItem value="휴원생">휴원생</MenuItem>
          <MenuItem value="상담중">상담중</MenuItem>
          <MenuItem value="미등록">미등록</MenuItem>
          <MenuItem value="확인필요">확인필요</MenuItem>
          <MenuItem value="미처리">미처리</MenuItem>
        </Select>
      </TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{current_course?.course || '-'}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{current_course?.time || '-'}</TableCell>
      <TableCell>{current_course?.teacher || '-'}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{school}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{grade}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{phone_parent}</TableCell>
      <TableCell sx={{ maxWidth: 250, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
        {memo || current_course?.memo}
      </TableCell>
    </TableRow>
  );
}

StudentTableRow.propTypes = {
  id: PropTypes.any,
  onStatusChange: PropTypes.func,
  onMerge: PropTypes.func,
  name: PropTypes.string,
  grade: PropTypes.string,
  school: PropTypes.string,
  memo: PropTypes.string,
  phone_parent: PropTypes.string,
  status: PropTypes.string,
  current_course: PropTypes.object,
};
