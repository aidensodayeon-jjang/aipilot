import * as React from 'react';
import { useEffect, useState } from 'react';

import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import Scrollbar from 'src/components/scrollbar';
import PropTypes from 'prop-types';
import UserRegisterPopover from './user-register-popover';
import { UserClassLabel, UserStatusLabel } from './user-label';

export default function UserInformation({ selected, courseData }) {
  const [avatarUrl, setAvatarUrl] = useState('');

  useEffect(() => {
    if (selected.gender && selected.gender.indexOf('남') !== -1) {
      setAvatarUrl('/assets/images/avatars/avatar_13.jpg');
    } else {
      setAvatarUrl('/assets/images/avatars/avatar_16.jpg');
    }
  }, [selected, courseData]);

  const isButtonDisabled = !selected || !selected.phone_parent;
  const [anchorEl, setAnchorEl] = useState(null);
  const handlePopClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <Grid item xs={8}>
      <Card>
        <CardContent>
          <Grid alignItems="center" container spacing={3}>
            <Grid item xs={1}>
              <Avatar sx={{ width: 56, height: 56 }} src={avatarUrl} alt="photoURL" />
            </Grid>

            <Grid item xs={10}>
              <Typography variant="h5" component="div">
                {selected.name}
              </Typography>
              <UserStatusLabel status={selected.status} />{' '}
              <UserClassLabel courseData={courseData} />
              <Tooltip title="Edit">
                <IconButton
                  disabled={isButtonDisabled}
                  onClick={handlePopClick}
                  color="primary"
                  aria-label="delete"
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <UserRegisterPopover
                anchorEl={anchorEl}
                setAnchorEl={setAnchorEl}
                selected={selected}
              />
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                등록일 : {selected.regdate}
              </Typography>
            </Grid>
          </Grid>

          <Scrollbar sx={{ maxHeight: 390 }}>
            <TableContainer sx={{ maxHeight: 600, overflow: 'unset' }}>
              <Table sx={{ maxHeight: 600, minWidth: 250 }} size="small">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">학부모 전화번호</TableCell>
                    <TableCell align="center">학생 전화번호</TableCell>
                    <TableCell align="left">생년월일</TableCell>
                    <TableCell align="left">학교</TableCell>
                    <TableCell align="left">학년</TableCell>
                    <TableCell align="left">수신 거부</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  <TableRow key={selected.id}>
                    <TableCell align="center">{selected.phone_parent}</TableCell>
                    <TableCell align="left">{selected.phone_user}</TableCell>
                    <TableCell align="left">{selected.birth}</TableCell>
                    <TableCell align="left">{selected.school}</TableCell>
                    <TableCell align="left">{selected.grade}</TableCell>
                    <TableCell align="left">{selected.opt_out}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <TableContainer sx={{ maxHeight: 600, overflow: 'unset' }}>
              <Table sx={{ maxHeight: 600, minWidth: 250 }} size="small">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">유입 경로</TableCell>
                    <TableCell align="center">상담 상태</TableCell>
                    <TableCell align="left">메모</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  <TableRow key={selected.id}>
                    <TableCell align="center">{selected.input_path}</TableCell>
                    <TableCell align="left">{selected.counsel}</TableCell>
                    <TableCell align="left">{selected.memo}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
        </CardContent>
      </Card>
    </Grid>
  );
}

UserInformation.propTypes = {
  selected: PropTypes.object,
  courseData: PropTypes.array,
};
