import IconButton from '@mui/material/IconButton';
import { useThemeMode } from 'src/theme/ThemeContext';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function ThemeToggle() {
  const { mode, toggleMode } = useThemeMode();

  return (
    <IconButton onClick={toggleMode} sx={{ width: 40, height: 40 }}>
      <Iconify icon={mode === 'light' ? 'solar:sun-bold-duotone' : 'solar:moon-bold-duotone'} />
    </IconButton>
  );
}
