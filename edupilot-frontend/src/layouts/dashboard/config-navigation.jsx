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
    title: '수납 관리',
    path: '/payment',
    icon: icon('ic_pay'),
  },
  {
    title: '프러덕트',
    path: '/products',
    icon: icon('ic_disabled'),
  },
  {
    title: '블로그',
    path: '/blog',
    icon: icon('ic_blog'),
  },
  {
    title: '업무 관리',
    path: '/login',
    icon: icon('ic_lock'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic_disabled'),
  },
];

export default navConfig;
