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
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Scrollbar from '../../../components/scrollbar/scrollbar';
import UserAttend from '../user-attend';
import { fetchWithToken } from '../../../utils/auth/fetch-with-token';

export default function UserAttendedData({ selected, attendData, setAttendData }) {
  const [openFilter, setOpenFilter] = useState(false);

  const navigate = useNavigate();

  const fetchAttendData = useCallback(() => {
    if (selected.id) {
      fetchWithToken(
        `/api/attend/?id=${selected.id}`,
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
          setAttendData(result);
        });
    }
  }, [navigate, selected.id, setAttendData]);

  useEffect(() => {
    fetchAttendData();
  }, [selected, setAttendData, fetchAttendData]);

  return (
    <Grid item xs={4}>
      <Card>
        <CardHeader
          title={
            <div>
              결석 & 보강
              <UserAttend
                openFilter={openFilter}
                setOpenFilter={setOpenFilter}
                selected={selected}
                fetchAttendData={fetchAttendData}
              />
            </div>
          }
          subheader={
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {` 총 ${attendData.length} 회 결석`}
            </div>
          }
        />
        <Scrollbar sx={{ maxHeight: 390 }}>
          <TableContainer sx={{ maxHeight: 600, overflow: 'unset' }}>
            <Table sx={{ maxHeight: 600, minWidth: 300 }} size="small">
              <TableHead>
                <TableRow>
                  <TableCell align="center">학기</TableCell>
                  <TableCell align="right">수강 과목&nbsp;</TableCell>
                  <TableCell align="right">회차&nbsp;</TableCell>
                  <TableCell align="right">상태&nbsp;</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {attendData.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell align="center">{row.term}</TableCell>
                    <TableCell align="right">{row.subject}</TableCell>
                    <TableCell align="right">{row.round}</TableCell>
                    <TableCell align="right">{row.status}</TableCell>
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

UserAttendedData.propTypes = {
  selected: PropTypes.object,
  attendData: PropTypes.array,
  setAttendData: PropTypes.func,
};
