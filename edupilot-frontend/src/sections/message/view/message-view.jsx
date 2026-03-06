import * as React from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TabContext from '@mui/lab/TabContext';
import Tab from '@mui/material/Tab';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import PhoneIcon from '@mui/icons-material/Textsms';
import MsgSend from '../message-send';

export default function MessageView() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">메시지 관리</Typography>
      </Stack>

      <Box height={10} />

      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab iconPosition="start" label="문자메시지" icon={<PhoneIcon />} value="1" />
              <Tab
                iconPosition="start"
                icon={
                  <img
                    src="/assets/icons/mui/icon_kakao.png"
                    alt="Kakao"
                    style={{ width: 35, height: 35 }}
                  />
                }
                label="카카오채널메시지"
                value="2"
              />
              <Tab
                iconPosition="start"
                icon={
                  <img
                    src="/assets/icons/mui/chatgpt.png"
                    alt="AI"
                    style={{ width: 35, height: 35 }}
                  />
                }
                label="AI 메시지"
                value="3"
              />
            </TabList>
          </Box>

          <TabPanel value="1">
            <MsgSend />
          </TabPanel>

          <TabPanel value="2">서비스 준비 중</TabPanel>

          <TabPanel value="3">서비스 준비 중</TabPanel>
        </TabContext>
      </Box>
    </Container>
  );
}
