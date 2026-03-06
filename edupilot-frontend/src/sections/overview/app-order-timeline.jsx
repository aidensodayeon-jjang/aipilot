import PropTypes from 'prop-types';

import Card from '@mui/material/Card';
import Timeline from '@mui/lab/Timeline';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';

// ----------------------------------------------------------------------

export default function AppScheduleTimeline({ title, subheader, ...other }) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />
      <Timeline
        sx={{
          m: 0,
          p: 3,
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            padding: 0,
          },
        }}
      >
        <TimelineItem>
          <Typography variant="body2" sx={{ color: 'text.secondary', p: 1 }}>
            일정이 없습니다.
          </Typography>
        </TimelineItem>
      </Timeline>
    </Card>
  );
}

AppScheduleTimeline.propTypes = {
  subheader: PropTypes.string,
  title: PropTypes.string,
};
