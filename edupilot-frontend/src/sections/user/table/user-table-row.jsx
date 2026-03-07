import PropTypes from 'prop-types';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export default function UserTableRow({ id, name, phone_parent, status, onStatusChange, handleClick }) {
  return (
    <TableRow hover sx={{ height: 40 }}>
      <TableCell 
        onClick={handleClick} 
        sx={{ py: 0.5, fontWeight: 700, cursor: 'pointer', fontSize: '0.8125rem' }}
      >
        {name}
      </TableCell>

      <TableCell 
        onClick={handleClick} 
        sx={{ py: 0.5, cursor: 'pointer', fontSize: '0.8125rem' }}
      >
        {phone_parent}
      </TableCell>

      <TableCell sx={{ py: 0.5 }}>
        <Select
          value={status || '미등록'}
          onChange={(e) => onStatusChange(id, e.target.value)}
          size="small"
          variant="standard"
          disableUnderline
          sx={{
            height: 24,
            fontSize: '0.75rem',
            fontWeight: 600,
            color: (status === '재원생' ? 'primary.main' : 'text.secondary'),
            '& .MuiSelect-select': { py: 0 },
          }}
        >
          <MenuItem value="재원생">재원생</MenuItem>
          <MenuItem value="휴원생">휴원생</MenuItem>
          <MenuItem value="상담중">상담중</MenuItem>
          <MenuItem value="미등록">미등록</MenuItem>
        </Select>
      </TableCell>
    </TableRow>
  );
}

UserTableRow.propTypes = {
  id: PropTypes.any,
  onStatusChange: PropTypes.func,
  handleClick: PropTypes.func,
  name: PropTypes.string,
  status: PropTypes.string,
  phone_parent: PropTypes.string,
};
