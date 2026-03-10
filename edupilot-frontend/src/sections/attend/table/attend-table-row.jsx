import PropTypes from 'prop-types';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import Iconify from 'src/components/iconify';

export default function AttendTableRow({
  id,
  term,
  name,
  userid,
  res_date,
  memo,
  subject,
  round,
  status,
  onStatusChange,
  onDelete,
}) {
  return (
    <TableRow hover>
      <TableCell>{term}</TableCell>
      <TableCell sx={{ fontWeight: 700 }}>{name}</TableCell>
      <TableCell>{userid}</TableCell>
      <TableCell>{subject}</TableCell>
      <TableCell align="center">{round}</TableCell>
      <TableCell>
        {res_date ? res_date.replace('T', ' ').slice(0, 16) : '-'}
      </TableCell>

      <TableCell>
        <FormControl size="small" fullWidth sx={{ minWidth: 120 }}>
          <Select
            value={status}
            onChange={(e) => onStatusChange(id, e.target.value)}
            sx={{ 
              height: 32, 
              fontSize: '0.875rem',
              bgcolor: status === '보강완료' ? '#e8f5e9' : 'inherit',
              color: status === '보강완료' ? '#2e7d32' : 'inherit',
            }}
          >
            <MenuItem value="예약필요">예약 필요</MenuItem>
            <MenuItem value="예약완료">예약 완료</MenuItem>
            <MenuItem value="보강완료">보강 완료</MenuItem>
            <MenuItem value="보강결석">보강 결석</MenuItem>
            <MenuItem value="보강패스">보강 패스</MenuItem>
          </Select>
        </FormControl>
      </TableCell>
      
      <TableCell>{memo}</TableCell>

      <TableCell align="right">
        <IconButton color="error" onClick={() => onDelete(id)}>
          <Iconify icon="solar:trash-bin-trash-bold" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}

AttendTableRow.propTypes = {
  id: PropTypes.number,
  term: PropTypes.string,
  name: PropTypes.string,
  subject: PropTypes.string,
  res_date: PropTypes.string,
  round: PropTypes.string,
  status: PropTypes.string,
  memo: PropTypes.string,
  userid: PropTypes.string,
  onStatusChange: PropTypes.func,
  onDelete: PropTypes.func,
};
