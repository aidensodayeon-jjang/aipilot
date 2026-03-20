import * as React from 'react';
import { useState } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
import { useForm } from 'react-hook-form';
import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';
import { Link as BaseLink, useNavigate } from 'react-router-dom';
import { decodePayload } from '../../utils/auth/decode-payload';

// ----------------------------------------------------------------------

export default function LoginView() {
  const theme = useTheme();

  const [showPassword, setShowPassword] = useState(false);

  const { handleSubmit, register } = useForm();
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const onSubmit = async (formValues) => {
    fetch('/api/user/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formValues),
    })
      .then((response) => response.json().then((data) => ({ response, data })))
      .then(({ response, data }) => {
        if (response.ok) {
          sessionStorage.setItem('access', data.token.access);
          sessionStorage.setItem('refresh', data.token.refresh);
          sessionStorage.setItem('username', data.username);
          sessionStorage.setItem('payload', decodePayload(data));
          navigate('/');
        } else if (response.status === 401) {
          setErrors({
            username: '아이디나 비밀번호가 맞지 않습니다.',
          });
        } else {
          setErrors(data);
        }
      });
  };

  const renderForm = (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <LoginTextField register={register} errors={errors} name="username" label="아이디" />

        <LoginTextField
          register={register}
          errors={errors}
          name="password"
          label="비밀번호"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        <Link variant="subtitle2" underline="hover">
          비밀번호를 잊어버리셨나요?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" color="inherit">
        로그인
      </LoadingButton>
    </form>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">Edupilot에 로그인하기</Typography>

          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            Edupilot이 처음이신가요?
            <Link variant="subtitle2" sx={{ ml: 0.5 }} component={BaseLink} to="/register">
              회원가입하기
            </Link>
          </Typography>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}

const LoginTextField = ({ register, errors, name, label, ...props }) => (
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

LoginTextField.propTypes = {
  register: PropTypes.func,
  errors: PropTypes.object,
  name: PropTypes.string,
  label: PropTypes.string,
};
