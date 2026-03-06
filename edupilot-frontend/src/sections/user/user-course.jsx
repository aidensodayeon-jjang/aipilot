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
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { fetchWithToken } from '../../utils/auth/fetch-with-token';

export default function UserCourse({ openFilter, setOpenFilter, selected, fetchCourseData }) {
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
      '/api/student/course/',
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
        fetchCourseData();
      }
    });
  };

  const handleOpen = () => {
    if (selected.id) setOpenFilter(true);
  };

  useEffect(() => {
    setValue('userid', selected.id);
  }, [selected.id, setValue]);

  const renderTerm = (
    <Stack spacing={1}>
      <Typography variant="subtitle2">기본 정보</Typography>

      <UserCourseTextField
        register={register}
        errors={errors}
        name="term"
        label="학기(6자리)"
        required
      />
    </Stack>
  );

  const renderCategory = (
    <Stack spacing={1}>
      <FormControl>
        <InputLabel id="course-select-label">과정 구분</InputLabel>
        <Select
          {...register('course')}
          id="course-select"
          name="course"
          label="과정 구분"
          labelId="course-select-label"
          defaultValue="정규"
        >
          <MenuItem value="정규">정규</MenuItem>
          <MenuItem value="캠프">캠프</MenuItem>
          <MenuItem value="개별">개별</MenuItem>
          <MenuItem value="기타">기타</MenuItem>
        </Select>
      </FormControl>
    </Stack>
  );

  const renderSubject = (
    <Stack spacing={2}>
      <UserCourseTextField
        register={register}
        errors={errors}
        name="subject"
        label="수강 과목"
        required
      />

      <UserCourseTextField register={register} errors={errors} name="time" label="수업 시간" />

      <Typography variant="subtitle2">추가 정보</Typography>

      <UserCourseTextField register={register} errors={errors} name="openlab" label="Open Lab" />

      <UserCourseTextField register={register} errors={errors} name="pay" label="결제 정보" />

      <UserCourseTextField
        register={register}
        errors={errors}
        name="memo"
        label="메모"
        multiline
        rows={4}
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
            {selected.name} 수강 정보 등록
          </Typography>

          <IconButton onClick={() => setOpenFilter(false)}>
            <Iconify icon="eva:close-fill" />
          </IconButton>
        </Stack>

        <Divider />

        <form onSubmit={handleSubmit(onSubmit)}>
          <Scrollbar>
            <Stack spacing={2} sx={{ p: 3 }}>
              {renderTerm}
              {renderCategory}
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
              수강 정보 등록
            </Button>
          </Box>
        </form>
      </Drawer>
    </>
  );
}

const UserCourseTextField = ({ register, errors, name, label, ...props }) => (
  <TextField
    {...register(name)}
    {...props}
    helperText={errors[name]}
    error={errors[name] && true}
    label={label}
    variant="outlined"
  />
);

UserCourse.propTypes = {
  openFilter: PropTypes.bool,
  setOpenFilter: PropTypes.func,
  selected: PropTypes.object,
  fetchCourseData: PropTypes.func,
};

UserCourseTextField.propTypes = {
  register: PropTypes.func,
  errors: PropTypes.object,
  name: PropTypes.string,
  label: PropTypes.string,
};
