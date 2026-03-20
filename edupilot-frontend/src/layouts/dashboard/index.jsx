import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';

import Nav from './nav';
import Main from './main';
import Header from './header';

// ----------------------------------------------------------------------

export default function DashboardLayout({ children }) {
  const [openNav, setOpenNav] = useState(false);
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // sessionStorage에 토큰이 없으면 로그인 페이지로 이동
    const access = sessionStorage.getItem('access');
    const username = sessionStorage.getItem('username');

    if (!access || !username) {
      // localStorage에 혹시 남아있을 수 있는 정보도 모두 제거 (엄격한 세션 관리)
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
      localStorage.removeItem('username');
      localStorage.removeItem('payload');
      
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  const onToggleCollapse = () => {
    setIsNavCollapsed(!isNavCollapsed);
  };

  return (
    <>
      <Header 
        onOpenNav={() => setOpenNav(true)} 
        isNavCollapsed={isNavCollapsed}
        onToggleCollapse={onToggleCollapse}
      />

      <Box
        sx={{
          minHeight: 1,
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
        <Nav 
          openNav={openNav} 
          onCloseNav={() => setOpenNav(false)} 
          isNavCollapsed={isNavCollapsed}
          onToggleCollapse={onToggleCollapse}
        />

        <Main isNavCollapsed={isNavCollapsed}>{children}</Main>
      </Box>
    </>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node,
};
