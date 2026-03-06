import { Helmet } from 'react-helmet-async';

import { MessageView } from 'src/sections/message/view';

// ----------------------------------------------------------------------

export default function MessagePage() {
  return (
    <>
      <Helmet>
        <title> 메시지 관리 | edupilot </title>
      </Helmet>

      <MessageView />
    </>
  );
}
