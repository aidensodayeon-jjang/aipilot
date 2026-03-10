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
import UserTableHead from '../table/user-table-head';
import AttendTableRow from '../table/attend-table-row';
import TableNoData from '../table/table-no-data';

export default function AttendData({ userData, setUserData }) {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');

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

  const fetchData = React.useCallback(() => {
    // 캐시 방지를 위해 타임스탬프 추가
    fetch(`/api/attend/?group_by=reserve&_=${new Date().getTime()}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then((result) => {
        if (Array.isArray(result)) {
          setUserData(result);
        } else {
          setUserData([]);
        }
      })
      .catch((error) => {
        console.error('Fetch error:', error);
        setUserData([]);
      });
  }, [setUserData]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await fetch('/api/attend/', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (response.ok) fetchData();
    } catch (error) {
      console.error('Status update error:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!id) {
      alert('ID 정보가 없어 삭제할 수 없습니다.');
      return;
    }
    if (!window.confirm('정말로 이 출결 정보를 삭제하시겠습니까?')) return;

    try {
      const response = await fetch(`/api/attend/?id=${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        alert('삭제되었습니다.');
        fetchData();
      } else {
        const errorData = await response.json().catch(() => ({}));
        alert(`삭제 실패: ${errorData.error || '알 수 없는 오류'}`);
      }
    } catch (error) {
      alert('서버 통신 오류가 발생했습니다.');
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Grid item xs={12}>
      <Card sx={{ maxHeight: 600 }}>
        <UserTableToolbar
          filterName={filterName}
          onFilterName={(event) => setFilterName(event.target.value)}
        />

        <Scrollbar sx={{ maxHeight: 500 }}>
          <TableContainer sx={{ maxHeight: 500, overflow: 'unset' }}>
            <Table sx={{ maxHeight: 600, minWidth: 250 }} size="small">
              <UserTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleSort}
                headLabel={[
                  { id: 'term', label: '학기' },
                  { id: 'name', label: '이름' },
                  { id: 'userid', label: '연락처' },
                  { id: 'subject', label: '과목' },
                  { id: 'round', label: '회차' },
                  { id: 'res_date', label: '예약일시' },
                  { id: 'status', label: '보강 상태' },
                  { id: 'memo', label: '메모' },
                  { id: 'action', label: '', align: 'right' },
                ]}
              />

              <TableBody>
                {userDataFiltered.slice(0, 200).map((row) => (
                  <AttendTableRow
                    key={row.id || row.pk}
                    id={row.id || row.pk}
                    userid={row.phone_parent}
                    name={row.name}
                    term={row.term}
                    subject={row.subject}
                    round={row.round}
                    res_date={row.res_date}
                    status={row.status}
                    memo={row.memo}
                    onStatusChange={handleStatusChange}
                    onDelete={handleDelete}
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
