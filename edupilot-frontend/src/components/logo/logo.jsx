import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

import { RouterLink } from 'src/routes/components';

// ----------------------------------------------------------------------

const Logo = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {
  const logo = (
    <Box
      ref={ref}
      component="img"
      src="/assets/images/edu.jpeg"
      sx={{
        width: 140,
        height: 'auto',
        display: 'inline-flex',
        cursor: 'pointer',
        borderRadius: 1.5, // 둥근 테두리로 부드럽게
        boxShadow: (theme) => theme.customShadows.z1, // 은은한 그림자
        p: 0.5, // 이미지와 테두리 사이 여백
        bgcolor: 'background.paper', // 배경색을 테마 배경색으로
        ...sx,
      }}
      {...other}
    />
  );

  if (disabledLink) {
    return logo;
  }

  return (
    <Link component={RouterLink} href="/" sx={{ display: 'contents' }}>
      {logo}
    </Link>
  );
});

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default Logo;
