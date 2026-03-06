import * as React from 'react';
import { useEffect, useState } from 'react';

import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import UserTableToolbar from '../table/user-table-toolbar';
import Scrollbar from '../../../components/scrollbar/scrollbar';
import UserTableHead from '../table/user-table-head';
import UserTableRow from '../table/user-table-row';
import TableNoData from '../table/table-no-data';
import { applyFilter, getComparator } from '../utils';
import { fFetchResponse } from '../../../utils/format-array';
import { fetchWithToken } from '../../../utils/auth/fetch-with-token';

export default function UserData({ setSelected, userData, setUserData }) {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const navigate = useNavigate();

  const userDataFiltered = applyFilter({
    inputData: userData,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !userDataFiltered.length && !!filterName;

  const handleSort = (id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleClick = (row) => {
    setSelected(row);
  };

  useEffect(() => {
    fetchWithToken(
      '/api/students/',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
      navigate
    )
      .then(async (response) => response.json())
      .then((result) => {
        const row = fFetchResponse(result);
        setUserData(row);
      });
  }, [navigate, setUserData]);

  return (
    <Grid item xs={4}>
      <Card sx={{ maxWidth: 400, maxHeight: 450 }}>
        <UserTableToolbar
          filterName={filterName}
          onFilterName={(event) => setFilterName(event.target.value)}
        />

        <Scrollbar sx={{ maxHeight: 155 }}>
          <TableContainer sx={{ maxHeight: 180, overflow: 'unset' }}>
            <Table sx={{ maxHeight: 600, minWidth: 250 }} size="small">
              <UserTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleSort}
                headLabel={[
                  { id: 'name', label: 'Name' },
                  { id: 'phone', label: 'Phone' },
                  { id: 'status', label: 'Status' },
                ]}
              />

              <TableBody>
                {userDataFiltered.slice(0, 5).map((row) => (
                  <UserTableRow
                    key={row.id}
                    name={row.name}
                    status={row.status}
                    phone_parent={row.phone_parent}
                    handleClick={() => handleClick(row)}
                  />
                ))}
                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
      </Card>
    </Grid>
  );
}

UserData.propTypes = {
  setSelected: PropTypes.func,
  userData: PropTypes.array,
  setUserData: PropTypes.func,
};
