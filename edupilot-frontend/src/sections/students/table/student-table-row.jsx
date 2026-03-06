import PropTypes from 'prop-types';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

export default function StudentTableRow({
  regdate,
  name,
  memo,
  phone_parent,
  grade,
  school,
  gender,
  birth,
  status,
  handleClick,
}) {
  return (
    <TableRow hover onClick={handleClick}>
      <TableCell sx={{ minWidth: '80px' }}>{regdate}</TableCell>
      <TableCell>{name}</TableCell>
      <TableCell sx={{ minWidth: '80px' }}>{status}</TableCell>
      <TableCell>{phone_parent}</TableCell>
      <TableCell>{grade}</TableCell>
      <TableCell>{school}</TableCell>
      <TableCell>{gender}</TableCell>
      <TableCell>{birth}</TableCell>
      <TableCell sx={{ maxWidth: 200, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
        {memo}
      </TableCell>
    </TableRow>
  );
}

StudentTableRow.propTypes = {
  handleClick: PropTypes.func,
  regdate: PropTypes.string,
  name: PropTypes.string,
  grade: PropTypes.string,
  school: PropTypes.string,
  memo: PropTypes.string,
  phone_parent: PropTypes.string,
  gender: PropTypes.string,
  birth: PropTypes.string,
  status: PropTypes.string,
};
