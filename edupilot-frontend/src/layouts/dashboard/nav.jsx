import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import { alpha, useTheme } from '@mui/material/styles';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import Collapse from '@mui/material/Collapse';
import ListItemText from '@mui/material/ListItemText';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Tooltip from '@mui/material/Tooltip';

import { usePathname } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useResponsive } from 'src/hooks/use-responsive';

import Logo from 'src/components/logo';
import Scrollbar from 'src/components/scrollbar';
import SvgColor from 'src/components/svg-color';


import { NAV } from './config-layout';
import navConfigData from './config-navigation';

const icon = (name) => (
    <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);


export default function Nav({ openNav, onCloseNav, isNavCollapsed, onToggleCollapse }) {
  const theme = useTheme();
  const pathname = usePathname();
  const upLg = useResponsive('up', 'lg');
  const [navConfig, setNavConfig] = useState(navConfigData);

  const navWidth = isNavCollapsed ? NAV.COLLAPSED_WIDTH : NAV.WIDTH;

  useEffect(() => {
    const studentStatusSubMenu = [
        { title: '✅ 재원생', path: '/students/재원생' },
        { title: '💤 휴원생', path: '/students/휴원생' },
        { title: '📝 상담중', path: '/students/상담중' },
        { title: '⚪ 미등록', path: '/students/미등록' },
        { title: '⚠️ 미처리', path: '/students/unprocessed' },
    ];

    const filteredNavConfig = navConfigData.filter(item => item.title !== '상담 관리');
    const userMenu = filteredNavConfig.find(item => item.title === '원생 관리');
    const restNavConfig = filteredNavConfig.filter(item => item.title !== '원생 관리');

    const studentStatusMenu = {
        title: '학생 현황',
        path: '/students',
        icon: icon('ic_analytics'),
        children: studentStatusSubMenu,
    };

    const finalNavConfig = [...restNavConfig];
    if (userMenu) {
        finalNavConfig.splice(1, 0, userMenu);
    }
    finalNavConfig.splice(2, 0, studentStatusMenu);
    
    setNavConfig(finalNavConfig);
  }, []);


  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        bgcolor: '#ffffff',
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Box sx={{ px: 2.5, py: 3, display: 'flex', alignItems: 'center', justifyContent: isNavCollapsed ? 'center' : 'flex-start' }}>
        <Logo sx={{ width: isNavCollapsed ? 40 : 130, transition: 'all 0.2s' }} />
      </Box>

      <Stack component="nav" spacing={0.5} sx={{ px: isNavCollapsed ? 1.5 : 2 }}>
        {navConfig.map((item) => (
          <NavItem key={item.title} item={item} depth={0} isNavCollapsed={isNavCollapsed} />
        ))}
      </Stack>

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: navWidth },
        transition: (theme) =>
          theme.transitions.create('width', {
            duration: theme.transitions.duration.shorter,
          }),
      }}
    >
      {upLg ? (
        <Box
          sx={{
            height: 1,
            position: 'fixed',
            width: navWidth,
            borderRight: '1px solid #f1f5f9',
            boxShadow: '4px 0 24px 0 rgba(0, 0, 0, 0.02)',
            transition: (theme) =>
              theme.transitions.create('width', {
                duration: theme.transitions.duration.shorter,
              }),
          }}
        >
          {/* 플로팅 토글 버튼 */}
          <IconButton
            onClick={onToggleCollapse}
            size="small"
            sx={{
              p: 0.5,
              top: 32,
              position: 'absolute',
              right: -12,
              zIndex: 1101, // AppBar보다 높거나 비슷하게
              bgcolor: 'white',
              border: '1px solid #f1f5f9',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              '&:hover': { bgcolor: '#f8fafc' },
            }}
          >
            {isNavCollapsed ? (
              <ChevronRightIcon sx={{ width: 16, height: 16, color: '#6366f1' }} />
            ) : (
              <ChevronLeftIcon sx={{ width: 16, height: 16, color: '#6366f1' }} />
            )}
          </IconButton>

          {renderContent}
        </Box>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: {
              width: NAV.WIDTH,
              border: 'none',
              bgcolor: '#ffffff',
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
  isNavCollapsed: PropTypes.bool,
  onToggleCollapse: PropTypes.func,
};

// ----------------------------------------------------------------------

function NavItem({ item, depth, isNavCollapsed }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const active = item.path === pathname || (item.children && item.children.some(child => child.path === pathname));
  const hasChildren = item.children && item.children.length > 0;

  const handleClick = () => {
    if (hasChildren && !isNavCollapsed) {
      setOpen(!open);
    }
  };

  const activeStyle = {
    color: '#6366f1',
    fontWeight: 700,
    bgcolor: alpha('#6366f1', 0.08),
    '&:before': {
      content: '""',
      position: 'absolute',
      left: 0,
      width: 4,
      height: 24,
      bgcolor: '#6366f1',
      borderRadius: '0 4px 4px 0',
    },
    '&:hover': {
      bgcolor: alpha('#6366f1', 0.12),
    },
  };

  const renderItem = (
    <ListItemButton
      component={item.path && !hasChildren ? RouterLink : 'div'}
      to={item.path && !hasChildren ? item.path : undefined}
      onClick={handleClick}
      sx={{
        minHeight: depth > 0 ? 48 : 52,
        borderRadius: 1.5,
        color: active ? (depth > 0 && !hasChildren ? '#6366f1' : '#1e293b') : '#64748b',
        fontWeight: active ? 700 : 500,
        mb: 0.8,
        transition: 'all 0.2s',
        position: 'relative',
        pl: isNavCollapsed ? 0 : (depth > 0 ? 6.5 : 2.5),
        justifyContent: isNavCollapsed ? 'center' : 'flex-start',
        ...(active && !hasChildren && activeStyle),
        ...(active && hasChildren && { bgcolor: alpha('#6366f1', 0.04) }),
        '&:hover': {
          bgcolor: '#f8fafc',
          color: '#1e293b',
        },
      }}
    >
      <Box component="span" sx={{ 
        width: 24, 
        height: 24, 
        mr: isNavCollapsed ? 0 : 2, 
        color: active ? '#6366f1' : 'inherit',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {item.icon}
      </Box>

      {!isNavCollapsed && (
        <ListItemText 
          primary={item.title} 
          primaryTypographyProps={{ 
            variant: 'body1',
            fontWeight: 'inherit',
            fontSize: depth > 0 ? 14 : 15.5 
          }} 
        />
      )}

      {!isNavCollapsed && hasChildren && (
        open ? <ExpandLess sx={{ width: 20 }} /> : <ExpandMore sx={{ width: 20 }} />
      )}
    </ListItemButton>
  );

  const content = isNavCollapsed && depth === 0 ? (
    <Tooltip title={item.title} placement="right" arrow>
      {renderItem}
    </Tooltip>
  ) : renderItem;

  if (hasChildren && !isNavCollapsed) {
    return (
      <>
        {content}
        <Collapse in={open} timeout="auto" unmountOfExit>
          <List component="div" disablePadding sx={{ mb: 1 }}>
            {item.children.map((child) => (
              <NavItem key={child.title} item={child} depth={depth + 1} isNavCollapsed={isNavCollapsed} />
            ))}
          </List>
        </Collapse>
      </>
    );
  }

  return content;
}

NavItem.propTypes = {
  item: PropTypes.object,
  depth: PropTypes.number,
  isNavCollapsed: PropTypes.bool,
};
