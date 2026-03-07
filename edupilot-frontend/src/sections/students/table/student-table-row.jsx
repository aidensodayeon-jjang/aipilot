import PropTypes from 'prop-types';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export default function StudentTableRow({
  id,
  name,
  memo,
  phone_parent,
  grade,
  school,
  status,
  current_course, // 백엔드에서 새로 추가된 필드
  onStatusChange,
}) {
  return (
    <TableRow hover>
      <TableCell sx={{ fontWeight: 700, minWidth: 100 }}>{name}</TableCell>
      
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
          <MenuItem value="종료">종료</MenuItem>
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
  name: PropTypes.string,
  grade: PropTypes.string,
  school: PropTypes.string,
  memo: PropTypes.string,
  phone_parent: PropTypes.string,
  status: PropTypes.string,
  current_course: PropTypes.object,
};
