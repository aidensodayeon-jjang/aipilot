import { Helmet } from 'react-helmet-async';

import { UserView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

export default function UserPage() {
  return (
    <>
      <Helmet>
        <title> 원생 관리 | edupilot </title>
      </Helmet>

      <UserView />
    </>
  );
}
