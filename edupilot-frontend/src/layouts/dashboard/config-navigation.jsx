import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: '대시보드',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: '원생 관리',
    path: '/user',
    icon: icon('ic_user'),
  },
  {
    title: '상담 관리',
    path: '/counsel',
    icon: icon('ic_feed'),
  },
  {
    title: '출결/보강 관리',
    path: '/attend',
    icon: icon('ic_check'),
  },
  {
    title: '메시지 관리',
    path: '/message',
    icon: icon('ic_messge'),
  },
  {
    title: '수업 관리',
    path: '/schedule',
    icon: icon('ic_class'),
  },
  {
    title: '업무 관리',
    path: '/login',
    icon: icon('ic_lock'),
  },
  {
    title: '시스템 설정',
    path: '/settings',
    icon: icon('ic_setting'),
  },
  ];


export default navConfig;
