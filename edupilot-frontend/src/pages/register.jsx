import { Helmet } from 'react-helmet-async';

import { RegisterView } from 'src/sections/register';

// ----------------------------------------------------------------------

export default function RegisterPage() {
  return (
    <>
      <Helmet>
        <title> 회원가입 | edupilot </title>
      </Helmet>

      <RegisterView />
    </>
  );
}
