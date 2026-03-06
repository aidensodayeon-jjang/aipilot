import PropTypes from 'prop-types';

import Box from '@mui/material/Box';

import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

export default function AppWidgetSummary({
  title,
  subTitle,
  total,
  icon,
  link,
  color = 'primary',
  sx,
  trend,
  ...other
}) {
  const content = (
    <Card
      component={Stack}
      spacing={3}
      direction="column"
      sx={{
        p: 3,
        borderRadius: 2,
        height: '100%',
        bgcolor: 'background.paper',
        ...sx,
      }}
      {...other}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Typography variant="subtitle2" sx={{ color: 'text.secondary', fontWeight: 'bold' }}>
          {title}
        </Typography>
        {icon && <Box sx={{ width: 40, height: 40, bgcolor: 'background.neutral', borderRadius: 1.5, p: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icon}</Box>}
      </Box>

      <Stack spacing={0.5} sx={{ mt: 2 }}>
        <Typography variant="h3">
          {total}
          <Typography component="span" variant="h6" sx={{ color: 'text.secondary', ml: 1, fontWeight: 'normal' }}>
            {subTitle}
          </Typography>
        </Typography>

        {trend && (
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1 }}>
            <Box sx={{ bgcolor: trend.color === 'error' ? 'rgba(255, 86, 48, 0.16)' : 'rgba(34, 197, 94, 0.16)', color: trend.color === 'error' ? 'error.main' : 'success.main', px: 0.75, py: 0.25, borderRadius: 0.75, fontSize: '0.75rem', fontWeight: 'bold' }}>
              {trend.value}
            </Box>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              {trend.label}
            </Typography>
          </Stack>
        )}
      </Stack>
    </Card>
  );

  if (link) {
    return (
      <Link component={RouterLink} to={link} sx={{ textDecoration: 'none' }}>
        {content}
      </Link>
    );
  }

  return content;
}
AppWidgetSummary.propTypes = {
  color: PropTypes.string,
  link: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  sx: PropTypes.object,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  total: PropTypes.string,
  trend: PropTypes.shape({
    color: PropTypes.string,
    value: PropTypes.string,
    label: PropTypes.string,
  }),
};
