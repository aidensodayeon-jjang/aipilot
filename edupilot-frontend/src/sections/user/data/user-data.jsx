import * as React from 'react';
import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { fetchWithToken } from '../../../utils/auth/fetch-with-token';
import UserTableToolbar from '../table/user-table-toolbar';
import UserTableHead from '../table/user-table-head';
import UserTableRow from '../table/user-table-row';
import TableNoData from '../table/table-no-data';
import { applyFilter, getComparator } from '../utils';

export default function UserData({ setSelected, userData, setUserData }) {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [page, setPage] = useState(0);
  const rowsPerPage = 3;

  const navigate = useNavigate();

  const userDataFiltered = useMemo(() => applyFilter({
    inputData: userData,
    comparator: getComparator(order, orderBy),
    filterName,
  }), [userData, order, orderBy, filterName]);

  const notFound = !userDataFiltered.length && !!filterName;

  const handleSort = (id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await fetchWithToken(
        `/api/student/update/${id}/`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: newStatus }),
        },
        navigate
      );

      if (response.ok) {
        setUserData((prev) => prev.map((u) => (u.id === id ? { ...u, status: newStatus } : u)));
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  return (
    <Grid item xs={12} md={4.5}>
      <Card sx={{ height: 280, display: 'flex', flexDirection: 'column', border: '1px solid #f1f5f9', boxShadow: 'none' }}>
        <Box sx={{ px: 2, pt: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>학생 검색</Typography>
          <UserTableToolbar
            filterName={filterName}
            onFilterName={(event) => {
              setFilterName(event.target.value);
              setPage(0);
            }}
            sx={{ p: 0, minHeight: 'auto', '& .MuiOutlinedInput-root': { height: 32, fontSize: '0.75rem' } }}
          />
        </Box>

        <TableContainer sx={{ flexGrow: 1, overflow: 'hidden', px: 1 }}>
          <Table size="small">
            <UserTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleSort}
              headLabel={[
                { id: 'name', label: '이름' },
                { id: 'phone', label: '연락처' },
                { id: 'status', label: '상태' },
              ]}
              sx={{ '& th': { py: 0.5, fontSize: '0.7rem', bgcolor: 'transparent' } }}
            />

            <TableBody>
              {userDataFiltered
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <UserTableRow
                    key={row.id}
                    id={row.id}
                    name={row.name}
                    status={row.status}
                    phone_parent={row.phone_parent}
                    onStatusChange={handleStatusChange}
                    handleClick={() => setSelected(row)}
                  />
                ))}
              {notFound && <TableNoData query={filterName} />}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[]}
          component="div"
          count={userDataFiltered.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(e, p) => setPage(p)}
          sx={{ borderTop: 'none', '& .MuiTablePagination-toolbar': { minHeight: 32 } }}
        />
      </Card>
    </Grid>
  );
}

UserData.propTypes = {
  setSelected: PropTypes.func,
  userData: PropTypes.array,
  setUserData: PropTypes.func,
};
