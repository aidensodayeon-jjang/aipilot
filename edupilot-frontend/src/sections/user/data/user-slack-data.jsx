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

export default function UserSlackData({ selected }) {
  const [historyData, setHistoryData] = useState([]);
  const [openFilter, setOpenFilter] = useState(false);

  const navigate = useNavigate();

  const fetchHistoryData = useCallback(() => {
    if (selected?.name) {
      fetchWithToken(
        `/api/slacklog/?q=${selected.name}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
        navigate
      )
        .then((response) => response.json())
        .then((result) => {
          setHistoryData(result);
        });
    }
  }, [navigate, selected]);

  useEffect(() => {
    fetchHistoryData();
  }, [selected, fetchHistoryData]);

  return (
    <Grid item xs={6}>
      <Card>
        <CardHeader
          title={
            <div>
              슬랙 로그
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
                  <TableCell align="left">메시지</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {historyData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">
                      {new Date(row?.posted_dt).toLocaleDateString('ko-KR', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                      })}
                    </TableCell>
                    <TableCell align="left" sx={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>
                      {row.message}
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

UserSlackData.propTypes = {
  selected: PropTypes.object.isRequired,
};
