import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import { alpha } from '@mui/material/styles';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import Collapse from '@mui/material/Collapse';
import ListItemText from '@mui/material/ListItemText';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

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


export default function Nav({ openNav, onCloseNav }) {
  const pathname = usePathname();
  const upLg = useResponsive('up', 'lg');
  const [navConfig, setNavConfig] = useState(navConfigData);

  useEffect(() => {
    const studentStatusSubMenu = [
        { title: '✅ 재원생', path: '/students/재원생' },
        { title: '💤 휴원생', path: '/students/휴원생' },
        { title: '📝 상담중', path: '/students/상담중' },
        { title: '⚪ 미등록', path: '/students/미등록' },
        { title: '⚠️ 미처리', path: '/students/unprocessed' },
    ];

    // 기존 메뉴에서 상담 관리만 제거 (원생 관리는 유지)
    const newNavConfig = navConfigData.filter(item => item.title !== '상담 관리');
    
    const studentStatusMenu = {
        title: '학생 현황',
        path: '/students',
        icon: icon('ic_analytics'),
        children: studentStatusSubMenu,
    };

    // '학생 현황'을 대시보드(0) 바로 다음인 인덱스 1에 삽입
    // 기존 '원생 관리'는 그 뒤로 밀려나거나 유지됨
    newNavConfig.splice(1, 0, studentStatusMenu);
    setNavConfig(newNavConfig);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
        <Logo sx={{ width: 140 }} />
      </Box>

      <Stack component="nav" spacing={0.5} sx={{ px: 2 }}>
        {navConfig.map((item) => (
          <NavItem key={item.title} item={item} depth={0} />
        ))}
      </Stack>

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.WIDTH },
      }}
    >
      {upLg ? (
        <Box
          sx={{
            height: 1,
            position: 'fixed',
            width: NAV.WIDTH,
            borderRight: '1px solid #f1f5f9',
            boxShadow: '4px 0 24px 0 rgba(0, 0, 0, 0.02)',
          }}
        >
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
};

// ----------------------------------------------------------------------

function NavItem({ item, depth }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // 현재 경로가 자식 경로 중 하나인 경우 메뉴를 열어둠
  const active = item.path === pathname || (item.children && item.children.some(child => child.path === pathname));
  const hasChildren = item.children && item.children.length > 0;

  const handleClick = () => {
    if (hasChildren) {
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

  if (hasChildren) {
    return (
      <>
        <ListItemButton
          onClick={handleClick}
          sx={{
            minHeight: 52, // 높이 증가
            borderRadius: 1.5,
            color: active ? '#1e293b' : '#64748b',
            fontWeight: active ? 700 : 500,
            mb: 0.8,
            transition: 'all 0.2s',
            pl: 2.5, // 패딩 증가
            ...(active && { bgcolor: alpha('#6366f1', 0.04) }),
            '&:hover': {
              bgcolor: '#f8fafc',
              color: '#1e293b',
            },
          }}
        >
          <Box component="span" sx={{ width: 24, height: 24, mr: 2, color: active ? '#6366f1' : 'inherit' }}>
            {item.icon}
          </Box>
          <ListItemText 
            primary={item.title} 
            primaryTypographyProps={{ 
              variant: 'body1', // 글자 크기 증가
              fontWeight: 'inherit',
              fontSize: 15.5 
            }} 
          />
          {open ? <ExpandLess sx={{ width: 20 }} /> : <ExpandMore sx={{ width: 20 }} />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ mb: 1 }}>
            {item.children.map((child) => (
              <NavItem key={child.title} item={child} depth={depth + 1} />
            ))}
          </List>
        </Collapse>
      </>
    );
  }

  const isSubItem = depth > 0;
  const currentActive = pathname === item.path;

  return (
    <ListItemButton
      component={RouterLink}
      to={item.path}
      sx={{
        minHeight: isSubItem ? 48 : 52, // 서브메뉴와 메인메뉴 높이 최적화
        borderRadius: 1.5,
        color: currentActive ? '#6366f1' : '#64748b',
        fontWeight: currentActive ? 700 : 500,
        mb: 0.8,
        transition: 'all 0.2s',
        position: 'relative',
        pl: isSubItem ? 6.5 : 2.5,
        ...(currentActive && activeStyle),
        ...(!currentActive && {
          '&:hover': {
            bgcolor: '#f8fafc',
            color: '#1e293b',
          },
        }),
      }}
    >
      {!isSubItem && (
        <Box component="span" sx={{ width: 24, height: 24, mr: 2, color: currentActive ? '#6366f1' : 'inherit' }}>
          {item.icon}
        </Box>
      )}

      <ListItemText 
        primary={item.title} 
        primaryTypographyProps={{ 
          variant: 'body1',
          fontWeight: 'inherit',
          fontSize: isSubItem ? 14 : 15.5 // 글자 크기 확대
        }} 
      />
    </ListItemButton>
  );
}

NavItem.propTypes = {
  item: PropTypes.object,
  depth: PropTypes.number,
};
