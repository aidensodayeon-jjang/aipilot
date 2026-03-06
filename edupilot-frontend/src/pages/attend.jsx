import { Helmet } from 'react-helmet-async';

import { AttendView } from 'src/sections/attend/view';

// ----------------------------------------------------------------------

export default function AttendPage() {
  return (
    <>
      <Helmet>
        <title> 출결 관리 | edupilot </title>
      </Helmet>

      <AttendView />
    </>
  );
}
