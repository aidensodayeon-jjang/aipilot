import PropTypes from 'prop-types';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { UserStatusLabel } from '../user-label';

export default function AttendTableRow({
  term,
  name,
  userid,
  res_date,
  memo,
  subject,
  round,
  status,
  handleClick,
}) {
  return (
    <TableRow hover onClick={handleClick}>
      <TableCell>{term}</TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>{userid}</TableCell>
      <TableCell>{subject}</TableCell>
      <TableCell>{round}</TableCell>
      <TableCell>{res_date}</TableCell>

      <TableCell>
        <UserStatusLabel status={status} />
      </TableCell>
      <TableCell>{memo}</TableCell>
    </TableRow>
  );
}

AttendTableRow.propTypes = {
  handleClick: PropTypes.func,
  term: PropTypes.string,
  name: PropTypes.string,
  subject: PropTypes.string,
  res_date: PropTypes.string,
  round: PropTypes.string,
  status: PropTypes.string,
  memo: PropTypes.string,
  userid: PropTypes.string,
};
