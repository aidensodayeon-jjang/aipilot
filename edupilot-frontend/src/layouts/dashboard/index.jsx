import { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';

import Nav from './nav';
import Main from './main';
import Header from './header';

// ----------------------------------------------------------------------

export default function DashboardLayout({ children }) {
  const [openNav, setOpenNav] = useState(false);
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);

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
