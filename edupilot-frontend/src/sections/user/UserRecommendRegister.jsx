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
import MenuItem from '@mui/material/MenuItem';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { fetchWithToken } from '../../utils/auth/fetch-with-token';

export default function UserRecommendRegister({
  openFilter,
  setOpenFilter,
  selected,
  fetchHistoryData,
}) {
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
      '/api/recommend-items/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      },
      navigate
    ).then(async (response) => {
      const result = await response.json();
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
    setValue('student', selected.id); // ✅ student ID 세팅
    const currentTerm = `${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(
      2,
      '0'
    )}`;
    setValue('term', currentTerm); // 기본 term 설정
  }, [selected.id, setValue]);

  const renderForm = (
    <Stack spacing={2}>
      {/* 학기 */}
      <UserTextField
        register={register}
        errors={errors}
        name="term"
        label="학기 (예: 202509)"
        fullWidth
      />

      {/* 종류 선택 */}
      <TextField
        select
        label="구분"
        fullWidth
        defaultValue="자격증"
        {...register('kind')}
        error={!!errors.kind}
        helperText={errors.kind}
      >
        <MenuItem value="자격증">자격증</MenuItem>
        <MenuItem value="대회">대회</MenuItem>
      </TextField>

      {/* 제목 */}
      <UserTextField register={register} errors={errors} name="title" label="제목" fullWidth />

      {/* 내용 */}
      <UserTextField
        register={register}
        errors={errors}
        name="description"
        label="내용"
        multiline
        rows={4}
      />
    </Stack>
  );

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message="추천 항목이 등록되었습니다."
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
        PaperProps={{ sx: { width: 400, border: 'none', overflow: 'hidden' } }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ px: 1, py: 2 }}
        >
          <Typography variant="h6" sx={{ ml: 1 }}>
            {selected.name} 추천 등록
          </Typography>

          <IconButton onClick={() => setOpenFilter(false)}>
            <Iconify icon="eva:close-fill" />
          </IconButton>
        </Stack>

        <Divider />

        <form onSubmit={handleSubmit(onSubmit)}>
          <Scrollbar>
            <Stack spacing={2} sx={{ p: 3 }}>
              {renderForm}
            </Stack>
          </Scrollbar>

          <Box sx={{ pl: 3, pb: 3 }}>
            <Button
              size="large"
              type="submit"
              color="inherit"
              variant="outlined"
              startIcon={<Iconify icon="ic:round-add-task" />}
            >
              추천 등록
            </Button>
          </Box>
        </form>
      </Drawer>
    </>
  );
}

const UserTextField = ({ register, errors, name, label, ...props }) => (
  <TextField
    {...register(name)}
    {...props}
    helperText={errors[name]}
    error={!!errors[name]}
    label={label}
    variant="outlined"
  />
);

UserRecommendRegister.propTypes = {
  openFilter: PropTypes.bool,
  setOpenFilter: PropTypes.func,
  selected: PropTypes.object,
  fetchHistoryData: PropTypes.func,
};

UserTextField.propTypes = {
  register: PropTypes.func,
  errors: PropTypes.object,
  name: PropTypes.string,
  label: PropTypes.string,
};
