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
import { fetchWithToken } from '../../../utils/auth/fetch-with-token';
import UserRecommendRegister from '../UserRecommendRegister';

export default function UserRecommendCertAward({ selected }) {
  const [historyData, setHistoryData] = useState([]);
  const [openFilter, setOpenFilter] = useState(false);

  const navigate = useNavigate();

  const fetchHistoryData = useCallback(() => {
    if (selected?.id) {
      fetchWithToken(
        `/api/recommend-items/?student_id=${selected.id}`,
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
              추천 자격증 / 대회
              <UserRecommendRegister
                openFilter={openFilter}
                setOpenFilter={setOpenFilter}
                selected={selected}
                fetchHistoryData={fetchHistoryData}
              />
            </div>
          }
          subheader={
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {` 총 ${historyData.length} 건 `}
            </div>
          }
        />
        <Scrollbar sx={{ maxHeight: 390 }}>
          <TableContainer sx={{ maxHeight: 600, overflow: 'unset' }}>
            <Table sx={{ maxHeight: 600, minWidth: 300 }} size="small">
              <TableHead>
                <TableRow>
                  <TableCell align="center">학기</TableCell>
                  <TableCell align="left">제목</TableCell>
                  <TableCell align="left">내용</TableCell>
                  <TableCell align="left">구분</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {historyData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">{row.term}</TableCell>
                    <TableCell align="left">{row.title}</TableCell>
                    <TableCell align="left">{row.description}</TableCell>
                    <TableCell align="left">{row.kind}</TableCell>
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

UserRecommendCertAward.propTypes = {
  selected: PropTypes.object.isRequired,
};
