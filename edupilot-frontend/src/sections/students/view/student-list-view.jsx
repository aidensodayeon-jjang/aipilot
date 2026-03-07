import * as React from 'react';
import { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Box from '@mui/material/Box';

import UserTableToolbar from 'src/sections/user/table/user-table-toolbar';
import Scrollbar from 'src/components/scrollbar/scrollbar';
import { applyFilter, getComparator } from 'src/sections/user/utils';
import { fFetchResponse } from 'src/utils/format-array';
import StudentTableRow from 'src/sections/students/table/student-table-row';
import StudentTableHead from 'src/sections/students/table/student-table-head';
import TableNoData from 'src/sections/students/table/table-no-data';
import { fetchWithToken } from 'src/utils/auth/fetch-with-token';

export default function StudentListView() {
  const [userData, setUserData] = useState([]);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(30); // 30개씩 보기 설정

  const navigate = useNavigate();
  const { status } = useParams();

  const fetchStudents = React.useCallback(() => {
    if (status) {
      fetchWithToken(
        `/api/students/?status=${status}`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        },
        navigate
      )
        .then(async (response) => response.json())
        .then((result) => {
          const row = fFetchResponse(result);
          setUserData(row);
        })
        .catch(error => console.error(`Failed to fetch students:`, error));
    }
  }, [navigate, status]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const userDataFiltered = useMemo(() => applyFilter({
    inputData: userData,
    comparator: getComparator(order, orderBy),
    filterName,
  }), [userData, order, orderBy, filterName]);

  const notFound = !userDataFiltered.length && !!filterName;

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
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
        // 로컬 데이터 즉시 업데이트 및 목록 유지
        setUserData((prev) => prev.map((u) => (u.id === id ? { ...u, status: newStatus } : u)));
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const displayStatus = status === 'unprocessed' ? '미처리' : status;

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4">
          학생 현황: {displayStatus}
        </Typography>
        <Typography variant="subtitle1" sx={{ color: 'text.secondary', fontWeight: 700 }}>
          총 {userDataFiltered.length}명
        </Typography>
      </Box>

      <Card>
        <UserTableToolbar
          filterName={filterName}
          onFilterName={(event) => {
            setFilterName(event.target.value);
            setPage(0);
          }}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <StudentTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleSort}
                headLabel={[
                  { id: 'name', label: '학생 이름' },
                  { id: 'status', label: '상태' },
                  { id: 'course', label: '수강과목' },
                  { id: 'time', label: '수강시간' },
                  { id: 'instructor', label: '담당' },
                  { id: 'school', label: '학교' },
                  { id: 'grade', label: '학년' },
                  { id: 'phone', label: '학부모 연락처' },
                  { id: 'memo', label: '비고' },
                ]}
              />

              <TableBody>
                {userDataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <StudentTableRow
                      key={row.id}
                      id={row.id}
                      name={row.name}
                      status={row.status}
                      grade={row.grade}
                      school={row.school}
                      phone_parent={row.phone_parent}
                      memo={row.memo}
                      current_course={row.current_course}
                      onStatusChange={handleStatusChange}
                    />
                  ))}
                {notFound && <TableNoData query={filterName} />}
              </TableBody>

            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          rowsPerPageOptions={[30, 50, 100]}
          component="div"
          count={userDataFiltered.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
