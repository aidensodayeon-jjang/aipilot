import * as React from 'react';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';

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

  const navigate = useNavigate();
  const { status } = useParams();

  useEffect(() => {
    if (status) {
      console.log('Fetching data for status:', status); // Debug log for status
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
          console.log('API response result:', result); // Debug log for API result
          const row = fFetchResponse(result);
          setUserData(row);
        })
        .catch(error => console.error(`Failed to fetch students for status ${status}:`, error));
    }
  }, [navigate, status]);

  const userDataFiltered = applyFilter({
    inputData: userData,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !userDataFiltered.length && !!filterName;

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleClick = (row) => {};

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        학생 현황: {status}
      </Typography>

      <Grid item xs={12}>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          총 {userDataFiltered.length}명
        </Typography>
        <Card>
          <UserTableToolbar
            filterName={filterName}
            onFilterName={(event) => setFilterName(event.target.value)}
          />

          <Scrollbar>
            <TableContainer sx={{ overflow: 'unset' }}>
              <Table sx={{ minWidth: 800 }}>
                <StudentTableHead
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleSort}
                  headLabel={[
                    { id: 'regdate', label: '등록일' },
                    { id: 'name', label: '학생 이름' },
                    { id: 'status', label: '상태' },
                    { id: 'phone', label: '학부모 연락처' },
                    { id: 'grade', label: '학년' },
                    { id: 'school', label: '학교' },
                    { id: 'gender', label: '성별' },
                    { id: 'birth', label: '생년월일' },
                    { id: 'memo', label: '메모' },
                  ]}
                />
                <TableBody>
                  {userDataFiltered.map((row) => (
                    <StudentTableRow
                      regdate={row.regdate}
                      key={row.id}
                      name={row.name}
                      status={row.status}
                      grade={row.grade}
                      school={row.school}
                      phone_parent={row.phone_parent}
                      memo={row.memo}
                      gender={row.gender}
                      birth={row.birth}
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
    </Container>
  );
}
