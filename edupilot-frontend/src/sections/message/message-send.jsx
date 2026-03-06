import * as React from 'react';
import { useState } from 'react';
import Card from '@mui/material/Card';

import Icon from '@mui/material/Icon';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Popover from '@mui/material/Popover';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import SendIcon from '@mui/icons-material/Send';
import PeopleIcon from '@mui/icons-material/People';
import HailIcon from '@mui/icons-material/Hail';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AddchartIcon from '@mui/icons-material/Addchart';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import Grid from '@mui/material/Unstable_Grid2';
import { useNavigate } from 'react-router-dom';
import { fetchWithToken } from '../../utils/auth/fetch-with-token';

export default function MsgSend() {
  const { handleSubmit, reset, register } = useForm();
  const [errors, setErrors] = useState({});

  const [contentVal, setContentVal] = useState('');
  const [phoneNums, setPhoneNums] = useState([]);
  const [input, setInput] = useState('');

  const [anchorEl, setAnchorEl] = React.useState(null);

  const navigate = useNavigate();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const onSubmit = async (formValues) => {
    const payload = {
      ...formValues,
      phoneNums,
    };

    fetchWithToken(
      '/api/message/',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      },
      navigate
    )
      .then((response) => response.json().then((data) => ({ response, data })))
      .then(({ response, status, data }) => {
        if (response.ok) {
          setPhoneNums([]);
          setContentVal('');
          reset();
        } else {
          setErrors((prev) => ({ ...prev, server: data }));
        }
      });
  };

  // TextField의 입력 값을 변경할 때 호출될 함수
  const handleInputChange = (event) => {
    setInputListValue(event.target.value);
  };

  // TextField의 입력 값을 변경할 때 호출될 함수
  const handleInputContentChange = (event) => {
    setContentVal(event.target.value);
  };

  const handleAddClick = () => {
    if (input) {
      setPhoneNums([...phoneNums, input]);
      setInput('');
    }
  };

  const [inputListValue, setInputListValue] = useState(''); // TextField의 입력 값을 저장할 상태

  const handleAddListClick = () => {
    // 개행 문자를 기준으로 문자열을 분리하여 배열로 변환
    const numbers = inputListValue.split('\n');
    // 기존 목록에 새로운 번호들을 추가
    setPhoneNums([...phoneNums, ...numbers]);
    // 입력 필드 초기화
    setInputListValue('');
    handleClose();
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleResetClick = () => {
    setPhoneNums([]);
    setContentVal('');
  };

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid md={4}>
          <Box
            height="350px"
            bgcolor="white"
            display="flex"
            flexDirection="column"
            alignItems="center"
            noValidate
            autoComplete="off"
            sx={{ p: 2, border: '1px dashed grey' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <TextField
                id="standard-basic"
                value={input}
                onChange={handleChange}
                label="수신번호"
                variant="standard"
              />
              <Button
                disabled={!input.trim()}
                variant="outlined"
                endIcon={<PersonAddIcon />}
                onClick={handleAddClick}
              >
                추가
              </Button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
              <Button variant="outlined" endIcon={<HailIcon />}>
                재원생
              </Button>
              <div>
                <Button
                  variant="outlined"
                  aria-describedby={id}
                  onClick={handleClick}
                  endIcon={<AddchartIcon />}
                >
                  텍스트
                </Button>
                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
                    <Typography sx={{ p: 2 }}>연락처 입력</Typography>
                    <TextField
                      label="수신자목록에 추가"
                      multiline
                      rows={6}
                      value={inputListValue}
                      onChange={handleInputChange}
                      sx={{ mb: 2, mx: 2 }}
                    />
                    <Button
                      variant="outlined"
                      sx={{ width: 150, mb: 2, mx: 2 }}
                      endIcon={<PersonAddIcon />}
                      onClick={handleAddListClick}
                    >
                      수신 목록 추가
                    </Button>
                  </div>
                </Popover>
              </div>
              <Button
                variant="outlined"
                color="error"
                endIcon={<DeleteIcon />}
                onClick={handleResetClick}
              >
                초기화
              </Button>
            </div>

            <div
              style={{
                display: 'flex',
                width: 300,
                alignItems: 'left',
                gap: '1px',
                marginTop: '0px',
              }}
            >
              <Icon sx={{ mt: 3, mr: 1 }}>
                <PeopleIcon color="action" />
              </Icon>
              <Typography sx={{ mt: 3, mb: 2 }} variant="h9">
                수신 번호 총 {phoneNums.length}명
              </Typography>
            </div>

            <List
              sx={{
                maxHeight: 350,
                width: 300,
                overflow: 'auto', // 스크롤 가능하게 만들기
                border: '1px dashed grey',
                '& .MuiListItem-root': {
                  // 모든 리스트 아이템에 적용
                  py: 0.1, // 상하 패딩을 줄임 (기본값보다 작게)
                },
              }}
            >
              {phoneNums.map((number, index) => (
                <ListItem key={index}>
                  <ListItemText primary={number} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Grid>

        <Grid xs={12} sm={36} md={8}>
          <Card sx={{ height: 350, justifyContent: 'center', border: '1px dashed grey' }}>
            <Box height="20px" />

            <TextField
              {...register('content')}
              helperText={errors.content}
              label="문자 메시지 내용"
              value={contentVal}
              onChange={handleInputContentChange}
              multiline
              rows={12}
              sx={{ width: 550, height: 350, mb: 2, mx: 2 }}
            />

            <Button
              type="submit"
              disabled={phoneNums.length === 0 || !contentVal}
              variant="contained"
              sx={{ height: 300, width: 110, mb: 2, mx: 2 }}
              endIcon={<SendIcon />}
            >
              발송
            </Button>
          </Card>
        </Grid>
      </Grid>
    </form>
  );
}
