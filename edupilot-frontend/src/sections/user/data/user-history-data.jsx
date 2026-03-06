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
import UserHistory from '../user-history';
import { fetchWithToken } from '../../../utils/auth/fetch-with-token';

export default function UserHistoryData({ selected, historyData, setHistoryData }) {
  const [openFilter, setOpenFilter] = useState(false);

  const navigate = useNavigate();

  const fetchHistoryData = useCallback(() => {
    if (selected.id) {
      fetchWithToken(
        `/api/history/?id=${selected.id}`,
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
          setHistoryData(result);
        });
    }
  }, [navigate, selected, setHistoryData]);

  useEffect(() => {
    fetchHistoryData();
  }, [selected, setHistoryData, fetchHistoryData]);

  return (
    <Grid item xs={4}>
      <Card>
        <CardHeader
          title={
            <div>
              상담 기록
              <UserHistory
                openFilter={openFilter}
                setOpenFilter={setOpenFilter}
                selected={selected}
                fetchHistoryData={fetchHistoryData}
              />
            </div>
          }
          subheader={
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {` 총 ${historyData.length} 회 `}
            </div>
          }
        />
        <Scrollbar sx={{ maxHeight: 390 }}>
          <TableContainer sx={{ maxHeight: 600, overflow: 'unset' }}>
            <Table sx={{ maxHeight: 600, minWidth: 300 }} size="small">
              <TableHead>
                <TableRow>
                  <TableCell align="center">날짜</TableCell>
                  <TableCell align="right">내용&nbsp;</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {historyData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">{row.reg_date}</TableCell>
                    <TableCell align="right">{row.memo}</TableCell>
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

UserHistoryData.propTypes = {
  selected: PropTypes.object,
  historyData: PropTypes.array,
  setHistoryData: PropTypes.func,
};
