import * as React from 'react';
import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Iconify from 'src/components/iconify';
import Popover from '@mui/material/Popover';
import PropTypes from 'prop-types';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import UploadIcon from '@mui/icons-material/Upload';
import { fetchWithToken } from '../../utils/auth/fetch-with-token';

export default function UserRegisterPopover({
  anchorEl,
  setAnchorEl,
  selected,
  onRegisterSuccess,
}) {
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const navigate = useNavigate();

  const { control, handleSubmit, register, setValue, watch, reset } = useForm();
  const [errors, setErrors] = useState({});
  const buttonLabel = selected?.id ? '수정' : '등록';
  const phoneParent = watch('phone_parent');

  const [selectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [imgUrl, setImgUrl] = useState('');

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const masterId = watch('master_id'); // ID 값을 가져옴

    if (!masterId) {
      alert('사진을 업로드하려면 먼저 ID를 입력해주세요.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('master_id', masterId); // ID 값을 파일 이름으로 지정

    const res = await fetch('/api/student/upload_photo/', {
      method: 'POST',
      body: formData,
    });

    // const data = await res.json();
    // setImgUrl(data.url);
    // setPreviewUrl(URL.createObjectURL(file));

    const data = await res.json();
    const relativePath = data.url.replace('/media/', '');
    setImgUrl(relativePath); // 서버에는 이걸 넘겨야 함
    setPreviewUrl(URL.createObjectURL(file));
  };

  // 선택된 유저의 데이터로 폼 필드를 초기화
  useEffect(() => {
    if (selected) {
      Object.keys(selected).forEach((key) => {
        setValue(key, selected[key]);
      });
    } else {
      reset(); // 선택된 유저가 없다면 폼을 리셋
    }
  }, [selected, setValue, reset]);

  const handleIdClick = () => {
    if (phoneParent) {
      setValue('id', phoneParent, { shouldValidate: true }); // phone_parent의 값으로 id 필드를 설정합니다.
    }
  };

  const onSubmit = async (formValues) => {
    const payload = {
      ...formValues,
      imgfile: imgUrl, // ✅ 여기 추가!
    };
    console.log('payload 확인:', payload); // ✅ 이 줄 추가!
    const apiUrl = selected?.id ? `/api/student/update/${selected.id}/` : '/api/student/register/';
    const methodType = selected?.id ? 'PUT' : 'POST'; // 업데이트는 PUT, 새로운 등록은 POST

    fetchWithToken(apiUrl, {
      method: methodType,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      navigate,
    })
      .then((response) => response.json().then((data) => ({ response, data })))
      .then(({ response, data }) => {
        if (response.ok) {
          handleClose(); // 성공적으로 처리되면 창 닫기
          onRegisterSuccess(data); // 등록 성공 콜백 호출, ID 전달
        } else {
          console.log('bad');
          setErrors(data);
        }
      });
  };

  const handleClose = () => {
    reset();
    setAnchorEl(null);
  };

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      sx={{ maxWidth: 1400 }} // Popover 최대 너비 설정
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          spacing={3}
          sx={{ width: 600, p: 2 }}
        >
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ textAlign: 'left' }}>
              원생 등록/수정
            </Typography>
          </Grid>

          <RegisterPopoverTextField
            register={register}
            errors={errors}
            name="name"
            label="학생 이름"
            required
          />

          <RegisterPopoverTextField
            register={register}
            errors={errors}
            name="phone_parent"
            label="학부모 전화번호"
            required
          />

          <RegisterPopoverTextField
            register={register}
            errors={errors}
            name="phone_user"
            label="학생 전화번호"
          />

          <Grid item xs={6}>
            <Controller
              name="master_id"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="ID"
                  required
                  error={!!errors.id}
                  helperText={errors.id ? 'This field is required' : ''}
                  onClick={handleIdClick} // 사용자가 필드를 클릭할 때 handleIdClick 함수를 호출합니다.
                  fullWidth
                />
              )}
            />
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <FormLabel id="demo-row-radio-buttons-group-label">성별</FormLabel>
              <RadioGroup
                aria-labelledby="demo-row-radio-buttons-group-label"
                defaultValue="남"
                row
              >
                <FormControlLabel
                  value="여"
                  control={<Radio {...register('gender')} />}
                  label="여자"
                />
                <FormControlLabel
                  value="남"
                  control={<Radio {...register('gender')} />}
                  label="남자"
                />
              </RadioGroup>
            </FormControl>
          </Grid>

          <RegisterPopoverTextField
            register={register}
            errors={errors}
            name="birth"
            label="생년(4자리)"
          />

          <RegisterPopoverTextField register={register} errors={errors} name="grade" label="학년" />

          <RegisterPopoverTextField
            register={register}
            errors={errors}
            name="school"
            label="학교"
          />

          <Grid item xs={6}>
            <Box sx={{ maxWidth: 150 }}>
              <FormControl fullWidth>
                <InputLabel id="status-select-label">등록 구분</InputLabel>
                <Select
                  {...register('status')}
                  id="status-select"
                  name="status"
                  label="등록 구분"
                  labelId="status-select-label"
                  defaultValue="재원생"
                >
                  <MenuItem value="상담중">상담중</MenuItem>
                  <MenuItem value="미등록">미등록</MenuItem>
                  <MenuItem value="재원생">재원생</MenuItem>
                  <MenuItem value="휴원생">휴원생</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>

          <Grid item xs={6}>
            <Box sx={{ maxWidth: 150 }}>
              <FormControl fullWidth>
                <InputLabel id="counsel-select-label">상담 상태</InputLabel>
                <Select
                  {...register('counsel')}
                  id="counsel-select"
                  name="counsel"
                  label="상담 상태"
                  labelId="counsel-select-label"
                  defaultValue="확인필요"
                >
                  <MenuItem value="확인필요">확인 필요</MenuItem>
                  <MenuItem value="예약완료">예약 완료</MenuItem>
                  <MenuItem value="체험완료">체험 완료</MenuItem>
                  <MenuItem value="등록대기">등록 대기</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>

          <Grid item xs={6}>
            <Box sx={{ maxWidth: 150 }}>
              <FormControl fullWidth>
                <InputLabel id="input_path-select-label">유입 경로</InputLabel>
                <Select
                  {...register('input_path')}
                  id="input_path-select"
                  name="input_path"
                  label="유입경로"
                  labelId="input_path-select-label"
                  defaultValue="지인소개"
                >
                  <MenuItem value="지인소개">지인 소개</MenuItem>
                  <MenuItem value="검색">검색</MenuItem>
                  <MenuItem value="MI">MI</MenuItem>
                  <MenuItem value="기타">기타</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>

          <Grid item xs={6}>
            <Box sx={{ maxWidth: 150 }}>
              <TextField
                {...register('regdate')}
                label="등록일"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                defaultValue={new Date().toISOString().slice(0, 10)}
                fullWidth
              />
            </Box>
          </Grid>

          <Grid item xs={12}>
            <TextField {...register('memo')} label="상담비고" fullWidth multiline maxRows={4} />
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              flexWrap: 'wrap', // 너무 좁을 때 줄바꿈
              mt: 1,
            }}
          >
            <Button variant="outlined" component="label" startIcon={<UploadIcon />}>
              학생사진 파일 선택
              <input type="file" accept="image/*" hidden onChange={handleFileChange} />
            </Button>

            {selectedFile?.name && <Typography variant="body2">{selectedFile.name}</Typography>}

            {previewUrl && (
              <Box
                component="img"
                src={previewUrl}
                alt="미리보기"
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: 1,
                  border: '1px solid #ccc',
                }}
              />
            )}
          </Box>
        </Grid>

        <Grid item xs={12}>
          <div
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}
          >
            <Button
              type="submit"
              variant="contained"
              endIcon={<Iconify icon="eva:person-add-fill" />}
            >
              {buttonLabel}
            </Button>
            <Button variant="outlined" onClick={handleClose}>
              취소
            </Button>
          </div>
        </Grid>
        <div style={{ height: '15px' }} />
      </form>
    </Popover>
  );
}

const RegisterPopoverTextField = ({ register, errors, name, label, ...props }) => (
  <Grid item xs={6}>
    <TextField
      {...register(name)}
      {...props}
      helperText={errors[name]}
      error={errors[name] && true}
      label={label}
      variant="outlined"
      fullWidth
    />
  </Grid>
);

UserRegisterPopover.propTypes = {
  anchorEl: PropTypes.object,
  setAnchorEl: PropTypes.func,
  onRegisterSuccess: PropTypes.func,
  selected: PropTypes.object, // 추가된 prop
};

RegisterPopoverTextField.propTypes = {
  register: PropTypes.func,
  errors: PropTypes.object,
  name: PropTypes.string,
  label: PropTypes.string,
};
