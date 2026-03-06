import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';

// ----------------------------------------------------------------------

export default function AppTrafficBySite({ title, subheader, list, ...other }) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Box
        display="grid"
        gridTemplateColumns="repeat(2, 1fr)"
        gap={1}
        p={2}
      >
        {list.map((site) => (
          <Link
            key={site.name}
            href={site.link}
            target="_blank"
            rel="noopener"
            underline="none"
          >
            <Paper
              variant="outlined"
              sx={{
                py: 1.5,
                textAlign: 'center',
                borderStyle: 'solid',
                borderWidth: 0,
                bgcolor: 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                px: 1,
              }}
            >
              <Box display="flex" alignItems="center">
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 1.5,
                    bgcolor: 'background.paper',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    mr: 2,
                    boxShadow: (theme) => theme.customShadows.z1,
                  }}
                >
                  {site.icon}
                </Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  {site.name}
                </Typography>
              </Box>

              <Button
                variant="outlined"
                color="inherit"
                size="small"
                sx={{
                  minWidth: 64,
                  borderColor: 'divider',
                  color: 'text.secondary',
                  '&:hover': { bgcolor: 'action.hover', borderColor: 'text.primary' },
                }}
              >
                {site.action || '이동'}
              </Button>
            </Paper>
          </Link>
        ))}
      </Box>
    </Card>
  );
}

AppTrafficBySite.propTypes = {
  list: PropTypes.array,
  subheader: PropTypes.string,
  title: PropTypes.string,
};
