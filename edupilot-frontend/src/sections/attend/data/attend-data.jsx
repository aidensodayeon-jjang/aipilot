import * as React from 'react';
import { useEffect, useState } from 'react';

import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import PropTypes from 'prop-types';
import UserTableToolbar from 'src/sections/user/table/user-table-toolbar';
import Scrollbar from 'src/components/scrollbar/scrollbar';
import { applyFilter, getComparator } from 'src/sections/user/utils';
import { fFetchResponse } from 'src/utils/format-array';
import { useNavigate } from 'react-router-dom';
import UserTableHead from '../table/user-table-head';
import AttendTableRow from '../table/attend-table-row';
import TableNoData from '../table/table-no-data';
import { fetchWithToken } from '../../../utils/auth/fetch-with-token';

export default function AttendData({ userData, setUserData }) {
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

  const handleClick = (row) => {};

  useEffect(() => {
    fetchWithToken(
      '/api/attend/?group_by=reserve',
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
    <Grid item xs={12}>
      <Card sx={{ maxHeight: 450 }}>
        <UserTableToolbar
          filterName={filterName}
          onFilterName={(event) => setFilterName(event.target.value)}
        />

        <Scrollbar sx={{ maxHeight: 350 }}>
          <TableContainer sx={{ maxHeight: 350, overflow: 'unset' }}>
            <Table sx={{ maxHeight: 600, minWidth: 250 }} size="small">
              <UserTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleSort}
                headLabel={[
                  { id: 'term', label: '학기' },
                  { id: 'name', label: '이름' },
                  { id: 'userid', label: '학부모 연락처' },
                  { id: 'subject', label: '과목' },
                  { id: 'round', label: '회차' },
                  { id: 'res_date', label: '예약일' },
                  { id: 'status', label: '보강 상태' },
                  { id: 'memo', label: '메모' },
                ]}
              />

              <TableBody>
                {userDataFiltered.slice(0, 200).map((row) => (
                  <AttendTableRow
                    userid={row.phone_parent}
                    key={row.id}
                    name={row.name}
                    term={row.term}
                    subject={row.subject}
                    round={row.round}
                    res_date={row.res_date}
                    status={row.status}
                    memo={row.memo}
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

AttendData.propTypes = {
  userData: PropTypes.array,
  setUserData: PropTypes.func,
};
