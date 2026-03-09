import * as React from 'react';
import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

import UserTableToolbar from 'src/sections/user/table/user-table-toolbar';
import Scrollbar from 'src/components/scrollbar/scrollbar';
import StudentTableRow from 'src/sections/students/table/student-table-row';
import StudentTableHead from 'src/sections/students/table/student-table-head';
import TableNoData from 'src/sections/students/table/table-no-data';
import { fetchWithToken } from 'src/utils/auth/fetch-with-token';

export default function StudentListView() {
  const [userData, setUserData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [alert, setAlert] = useState({ show: false, message: '', type: 'success' });

  const navigate = useNavigate();
  const { status } = useParams();

  const fetchStudents = useCallback(async () => {
    if (!status) return;
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({ status, search: filterName, page: page + 1, page_size: rowsPerPage });
      const response = await fetchWithToken(`/api/students/?${queryParams.toString()}`, { method: 'GET' }, navigate);
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
  }, [status, filterName, page, rowsPerPage, navigate]);

  useEffect(() => { fetchStudents(); }, [fetchStudents]);

  const handleMerge = async (oldId, name) => {
    if (!window.confirm(`${name} 학생의 기존 이력을 현재의 신규 정보와 통합하시겠습니까? (기존 출결/수강 이력이 모두 보존됩니다.)`)) return;

    try {
      const searchRes = await fetchWithToken(`/api/students/?status=재원생&search=${name}`, { method: 'GET' }, navigate);
      const searchData = await searchRes.json();
      const newStudent = searchData.results?.find(s => s.name === name);

      if (!newStudent) {
        setAlert({ show: true, message: '통합할 대상(신규 등록된 재원생)을 찾을 수 없습니다.', type: 'error' });
        return;
      }

      const mergeRes = await fetchWithToken('/api/student/merge/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ old_id: oldId, new_id: newStudent.id }),
      }, navigate);

      if (mergeRes.ok) {
        setAlert({ show: true, message: `${name} 학생의 이력 통합이 완료되었습니다.`, type: 'success' });
        fetchStudents();
      } else {
        const error = await mergeRes.json();
        setAlert({ show: true, message: `통합 실패: ${error.error}`, type: 'error' });
      }
    } catch (error) {
      setAlert({ show: true, message: '통합 도중 서버 오류가 발생했습니다.', type: 'error' });
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await fetchWithToken(`/api/student/update/${id}/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      }, navigate);
      if (response.ok) { fetchStudents(); }
    } catch (error) { console.error('Failed to update status:', error); }
  };

  const displayStatus = status === 'unprocessed' ? '미처리' : status;

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="h4">학생 현황: {displayStatus}</Typography>
          {loading && <CircularProgress size={24} />}
        </Box>
        <Typography variant="subtitle1" sx={{ color: 'text.secondary', fontWeight: 700 }}>총 {totalCount}명</Typography>
      </Box>

      {alert.show && (
        <Alert severity={alert.type} sx={{ mb: 3 }} onClose={() => setAlert({ ...alert, show: false })}>
          {alert.message}
        </Alert>
      )}

      <Card>
        <UserTableToolbar filterName={filterName} onFilterName={(e) => { setFilterName(e.target.value); setPage(0); }} />
        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <StudentTableHead 
                order={order} orderBy={orderBy} onRequestSort={(e, id) => { setOrder(orderBy === id && order === 'asc' ? 'desc' : 'asc'); setOrderBy(id); }}
                headLabel={[
                  { id: 'name', label: '학생 이름' }, { id: 'status', label: '상태' }, { id: 'course', label: '수강과목' },
                  { id: 'time', label: '수강시간' }, { id: 'instructor', label: '담당' }, { id: 'school', label: '학교' },
                  { id: 'grade', label: '학년' }, { id: 'phone', label: '학부모 연락처' }, { id: 'memo', label: '비고' },
                ]} 
              />
              <TableBody>
                {userData.map((row) => (
                  <StudentTableRow
                    key={row.id} id={row.id} name={row.name} status={row.status} grade={row.grade} school={row.school}
                    phone_parent={row.phone_parent} memo={row.memo} current_course={row.current_course}
                    onStatusChange={handleStatusChange} onMerge={handleMerge}
                  />
                ))}
                {!userData.length && !loading && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
        <TablePagination 
          rowsPerPageOptions={[50, 100]} component="div" count={totalCount} 
          rowsPerPage={rowsPerPage} page={page} onPageChange={(e, p) => setPage(p)} 
          onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }} 
        />
      </Card>
    </Container>
  );
}
