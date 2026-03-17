import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';

import { RouterLink } from 'src/routes/components';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

const Logo = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {
  const logo = (
    <Box
      ref={ref}
      component="div"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 1.5,
        cursor: 'pointer',
        ...sx,
      }}
      {...other}
    >
      <Box
        sx={{
          width: 36,
          height: 36,
          display: 'flex',
          borderRadius: 1,
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: '#6366f1',
          color: 'white',
          boxShadow: (theme) => `0 4px 12px 0 ${alpha('#6366f1', 0.24)}`,
        }}
      >
        <Iconify icon="solar:chart-square-bold-duotone" width={24} />
      </Box>

      <Typography
        variant="h6"
        sx={{
          fontWeight: 800,
          display: 'flex',
          letterSpacing: 0.5,
          fontFamily: (theme) => theme.typography.fontFamily,
        }}
      >
        <Box component="span" sx={{ color: '#6366f1' }}>
          EDUPILOT
        </Box>
      </Typography>
    </Box>
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
