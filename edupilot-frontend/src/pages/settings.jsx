import { Helmet } from 'react-helmet-async';
import SettingsView from 'src/sections/settings/view/SettingsView';

// ----------------------------------------------------------------------

export default function SettingsPage() {
  return (
    <>
      <Helmet>
        <title> 시스템 설정 | EduPilot </title>
      </Helmet>

      <SettingsView />
    </>
  );
}
