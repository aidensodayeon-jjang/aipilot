import * as React from 'react';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Stack from '@mui/material/Stack';

import Iconify from 'src/components/iconify';
import UserRegisterPopover from './user-register-popover';
import { UserClassLabel, UserStatusLabel } from './user-label';

export default function UserInformation({ selected, courseData }) {
  const [avatarUrl, setAvatarUrl] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    if (selected.gender && selected.gender.indexOf('남') !== -1) {
      setAvatarUrl('/assets/images/avatars/avatar_13.jpg');
    } else {
      setAvatarUrl('/assets/images/avatars/avatar_16.jpg');
    }
  }, [selected, courseData]);

  const handlePopClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const isButtonDisabled = !selected || !selected.id;

  return (
    <Grid item xs={12} md={7.5}>
      <Card sx={{ height: 280, display: 'flex', border: '1px solid #f1f5f9', boxShadow: 'none' }}>
        {selected.id ? (
          <Box sx={{ p: 2.5, width: 1 }}>
            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
              <Avatar sx={{ width: 64, height: 64 }} src={avatarUrl} />
              
              <Box sx={{ flexGrow: 1 }}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography variant="h5" sx={{ fontWeight: 800 }}>{selected.name}</Typography>
                  <UserStatusLabel status={selected.status} />
                  <Tooltip title="정보 수정">
                    <IconButton size="small" onClick={handlePopClick} disabled={isButtonDisabled} color="primary">
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Stack>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {selected.school} / {selected.grade} <UserClassLabel courseData={courseData} />
                </Typography>
              </Box>

              <UserRegisterPopover anchorEl={anchorEl} setAnchorEl={setAnchorEl} selected={selected} />
            </Stack>

            <Divider sx={{ mb: 2, borderStyle: 'dashed' }} />

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <InfoItem icon="solar:phone-bold-duotone" label="학부모" value={selected.phone_parent} />
              </Grid>
              <Grid item xs={6}>
                <InfoItem icon="solar:smartphone-bold-duotone" label="학생" value={selected.phone_user || '미등록'} />
              </Grid>
              <Grid item xs={6}>
                <InfoItem icon="solar:calendar-bold-duotone" label="등록일" value={selected.regdate} />
              </Grid>
              <Grid item xs={6}>
                <InfoItem icon="solar:letter-bold-duotone" label="메모" value={selected.memo || '내용 없음'} isMemo />
              </Grid>
            </Grid>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 1, color: 'text.disabled', bgcolor: '#f8fafc' }}>
            <Stack alignItems="center" spacing={1}>
              <Iconify icon="solar:user-broken" width={48} />
              <Typography variant="body2">학생을 선택하여 상세 정보를 확인하세요.</Typography>
            </Stack>
          </Box>
        )}
      </Card>
    </Grid>
  );
}

function InfoItem({ icon, label, value, isMemo = false }) {
  return (
    <Stack direction="row" spacing={1.5} alignItems="center">
      <Box sx={{ p: 0.8, bgcolor: 'background.neutral', borderRadius: 1, display: 'flex', color: 'text.secondary' }}>
        <Iconify icon={icon} width={18} />
      </Box>
      <Box sx={{ overflow: 'hidden' }}>
        <Typography variant="caption" sx={{ color: 'text.disabled', display: 'block', lineHeight: 1 }}>{label}</Typography>
        <Typography 
          variant="body2" 
          sx={{ 
            fontWeight: 600, 
            whiteSpace: 'nowrap', 
            overflow: 'hidden', 
            textOverflow: 'ellipsis',
            maxWidth: isMemo ? 200 : 'none'
          }}
        >
          {value}
        </Typography>
      </Box>
    </Stack>
  );
}

InfoItem.propTypes = {
  icon: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  isMemo: PropTypes.bool,
};

UserInformation.propTypes = {
  selected: PropTypes.object,
  courseData: PropTypes.array,
};
