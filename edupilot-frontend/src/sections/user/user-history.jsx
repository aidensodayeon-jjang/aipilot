import * as React from 'react';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { fetchWithToken } from '../../utils/auth/fetch-with-token';

export default function UserHistory({ openFilter, setOpenFilter, selected, fetchHistoryData }) {
  const { handleSubmit, setValue, register } = useForm();
  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  const onSubmit = async (formValues) => {
    fetchWithToken(
      '/api/history/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      },
      navigate
    ).then((response) => {
      const result = response.json();
      if (response.status !== 201) {
        setErrors(result);
      } else {
        setOpenFilter(false);
        setOpen(true);
        fetchHistoryData();
      }
    });
  };

  const handleOpen = () => {
    if (selected.id) setOpenFilter(true);
  };

  useEffect(() => {
    setValue('userid', selected.id);
  }, [selected.id, setValue]);

  const renderSubject = (
    <Stack spacing={2}>
      <UserHistoryTextField
        register={register}
        errors={errors}
        name="reg_date"
        label="등록일"
        type="date"
        InputLabelProps={{
          shrink: true,
        }}
        defaultValue={new Date().toISOString().slice(0, 10)}
        fullWidth
      />

      <UserHistoryTextField
        register={register}
        errors={errors}
        name="memo"
        label="메모"
        multiline
        rows={6}
      />
    </Stack>
  );

  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message="자료가 등록되었습니다."
      />

      <IconButton
        disableRipple
        color="inherit"
        onClick={handleOpen}
        style={{ verticalAlign: 'sub' }}
      >
        <Iconify icon="eva:plus-circle-outline" />
      </IconButton>

      <Drawer
        anchor="right"
        open={openFilter}
        onClose={() => setOpenFilter(false)}
        PaperProps={{
          sx: { width: 350, border: 'none', overflow: 'hidden' },
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ px: 1, py: 2 }}
        >
          <Typography variant="h6" sx={{ ml: 1 }}>
            {selected.name} 상담 기록
          </Typography>

          <IconButton onClick={() => setOpenFilter(false)}>
            <Iconify icon="eva:close-fill" />
          </IconButton>
        </Stack>

        <Divider />

        <form onSubmit={handleSubmit(onSubmit)}>
          <Scrollbar>
            <Stack spacing={2} sx={{ p: 3 }}>
              {renderSubject}
            </Stack>
          </Scrollbar>

          <Box sx={{ pl: 3 }}>
            <Button
              size="large"
              type="submit"
              color="inherit"
              variant="outlined"
              startIcon={<Iconify icon="ic:round-clear-all" />}
            >
              상담 & 메모 등록
            </Button>
          </Box>
        </form>
      </Drawer>
    </>
  );
}

const UserHistoryTextField = ({ register, errors, name, label, ...props }) => (
  <TextField
    {...register(name)}
    {...props}
    helperText={errors[name]}
    error={errors[name] && true}
    label={label}
    variant="outlined"
  />
);

UserHistory.propTypes = {
  openFilter: PropTypes.bool,
  setOpenFilter: PropTypes.func,
  selected: PropTypes.object,
  fetchHistoryData: PropTypes.func,
};

UserHistoryTextField.propTypes = {
  register: PropTypes.func,
  errors: PropTypes.object,
  name: PropTypes.string,
  label: PropTypes.string,
};
