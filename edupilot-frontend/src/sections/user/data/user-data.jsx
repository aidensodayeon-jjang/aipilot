import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
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
import CircularProgress from '@mui/material/CircularProgress';

import { fetchWithToken } from '../../../utils/auth/fetch-with-token';
import UserTableToolbar from '../table/user-table-toolbar';
import UserTableHead from '../table/user-table-head';
import UserTableRow from '../table/user-table-row';
import TableNoData from '../table/table-no-data';

export default function UserData({ setSelected, refreshTrigger }) {
  const [userData, setUserData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(10); // 10명씩 표시

  const navigate = useNavigate();

  const fetchStudents = useCallback(async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        search: filterName,
        page: page + 1,
        page_size: rowsPerPage,
      });

      const response = await fetchWithToken(`/api/students/?${queryParams.toString()}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }, navigate);

      const result = await response.json();
      
      if (response.ok) {
        setUserData(result.results || []);
        setTotalCount(result.count || 0);
      }
    } catch (error) {
      console.error('Failed to fetch students:', error);
    } finally {
      setLoading(false);
    }
  }, [filterName, page, rowsPerPage, navigate]);

  // 검색어 변경 시 페이지 초기화
  useEffect(() => {
    setPage(0);
  }, [filterName]);

  // 데이터 가져오기 (검색어, 페이지, 새로고침 트리거 변경 시)
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchStudents();
    }, 300); // 0.3초 디바운스

    return () => clearTimeout(timer);
  }, [fetchStudents, refreshTrigger]);

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

  const notFound = !userData.length && !!filterName;

  return (
    <Grid item xs={12} md={4.5}>
      <Card sx={{ height: 520, display: 'flex', flexDirection: 'column', border: '1px solid #f1f5f9', boxShadow: 'none' }}>
        <Box sx={{ px: 2, pt: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>학생 목록 (전체)</Typography>
            {loading && <CircularProgress size={16} color="inherit" />}
          </Box>
          <UserTableToolbar
            filterName={filterName}
            onFilterName={(event) => setFilterName(event.target.value)}
            sx={{ p: 0, minHeight: 'auto', '& .MuiOutlinedInput-root': { height: 32, fontSize: '0.75rem' } }}
          />
        </Box>

        <TableContainer sx={{ flexGrow: 1, overflow: 'auto', px: 1 }}>
          <Table size="small" stickyHeader>
            <UserTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleSort}
              headLabel={[
                { id: 'name', label: '이름' },
                { id: 'phone', label: '연락처' },
                { id: 'status', label: '상태' },
              ]}
              sx={{ '& th': { py: 0.5, fontSize: '0.7rem', bgcolor: 'white' } }}
            />

            <TableBody>
              {userData.map((row) => (
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
          count={totalCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(e, p) => setPage(p)}
          sx={{ borderTop: '1px solid #f1f5f9', '& .MuiTablePagination-toolbar': { minHeight: 32 } }}
        />
      </Card>
    </Grid>
  );
}

UserData.propTypes = {
  setSelected: PropTypes.func,
  refreshTrigger: PropTypes.number,
};
