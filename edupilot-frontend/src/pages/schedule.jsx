import { Helmet } from 'react-helmet-async';
import ScheduleView from 'src/sections/schedule/view/ScheduleView';

// ----------------------------------------------------------------------

export default function SchedulePage() {
  return (
    <>
      <Helmet>
        <title> 시간표 관리 | EduPilot </title>
      </Helmet>

      <ScheduleView />
    </>
  );
}
