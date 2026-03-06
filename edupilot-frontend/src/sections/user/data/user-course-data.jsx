import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { getComparator } from '../utils';
import UserCourse from '../user-course';
import Scrollbar from '../../../components/scrollbar/scrollbar';
import { fetchWithToken } from '../../../utils/auth/fetch-with-token';

export default function UserCourseData({ selected, courseData, setCourseData }) {
  const [openFilter, setOpenFilter] = useState(false);

  const navigate = useNavigate();

  const handleDelete = async (id) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;

    try {
      await fetchWithToken(
        `/api/course/${id}/`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        },
        navigate
      );
      fetchCourseData(); // 삭제 후 리스트 다시 가져오기
    } catch (error) {
      console.error('삭제 실패:', error);
    }
  };

  const fetchCourseData = useCallback(() => {
    if (selected.id) {
      fetchWithToken(
        `/api/course/?id=${selected.id}`,
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
          setCourseData(result);
        });
    }
  }, [navigate, selected, setCourseData]);

  useEffect(() => {
    fetchCourseData();
  }, [selected, setCourseData, fetchCourseData]);

  return (
    <Grid item xs={4}>
      <Card>
        <CardHeader
          title={
            <div>
              수강 기록
              <UserCourse
                openFilter={openFilter}
                setOpenFilter={setOpenFilter}
                selected={selected}
                fetchCourseData={fetchCourseData}
              />
            </div>
          }
          subheader={
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {` 총 ${courseData.length} 과정 수료`}
            </div>
          }
        />

        <Scrollbar sx={{ maxHeight: 390 }}>
          <TableContainer sx={{ maxHeight: 600, overflow: 'unset' }}>
            <Table sx={{ maxHeight: 600, minWidth: 250 }} size="small" padding="none">
              <TableHead>
                <TableRow>
                  <TableCell align="center">학기</TableCell>
                  <TableCell align="left">수강 과목&nbsp;</TableCell>
                  <TableCell align="left">과정&nbsp;</TableCell>
                  <TableCell align="left">시간&nbsp;</TableCell>
                  <TableCell align="right">삭제</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {courseData
                  .slice()
                  .sort(getComparator('desc', 'term'))
                  .map((row) => (
                    <TableRow key={row.id}>
                      <TableCell align="center">{row.term?.slice(2)}</TableCell>
                      <TableCell align="left">{row.subject}</TableCell>
                      <TableCell align="left">{row.course}</TableCell>
                      <TableCell align="left">{row.time}</TableCell>
                      <TableCell align="right">
                        <IconButton
                          size="small"
                          onClick={() => handleDelete(row.id)}
                          aria-label="delete"
                        >
                          <DeleteIcon fontSize="small" sx={{ color: '#e53935' }} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
      </Card>
    </Grid>
  );
}

UserCourseData.propTypes = {
  selected: PropTypes.object,
  courseData: PropTypes.array,
  setCourseData: PropTypes.func,
};
