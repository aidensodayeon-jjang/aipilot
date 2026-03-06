import PropTypes from 'prop-types';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { UserStatusLabel } from '../user-label';

export default function UserTableRow({ name, phone_parent, status, handleClick }) {
  return (
    <TableRow hover onClick={handleClick}>
      <TableCell>{name}</TableCell>

      <TableCell>{phone_parent}</TableCell>

      <TableCell>
        <UserStatusLabel status={status} />
      </TableCell>
    </TableRow>
  );
}

UserTableRow.propTypes = {
  handleClick: PropTypes.func,
  name: PropTypes.string,
  status: PropTypes.string,
  phone_parent: PropTypes.string,
};
