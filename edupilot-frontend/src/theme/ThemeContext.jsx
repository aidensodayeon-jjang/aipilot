import PropTypes from 'prop-types';
import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';

// ----------------------------------------------------------------------

const ThemeModeContext = createContext();

export const useThemeMode = () => {
  const context = useContext(ThemeModeContext);
  if (!context) {
    throw new Error('useThemeMode must be used within a ThemeModeProvider');
  }
  return context;
};

export function ThemeModeProvider({ children }) {
  const [mode, setMode] = useState('light');

  useEffect(() => {
    const savedMode = localStorage.getItem('theme-mode');
    if (savedMode) {
      setMode(savedMode);
    }
  }, []);

  const toggleMode = useCallback(() => {
    setMode((prev) => {
      const nextMode = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme-mode', nextMode);
      return nextMode;
    });
  }, []);

  const setManualMode = useCallback((newMode) => {
    setMode(newMode);
    localStorage.setItem('theme-mode', newMode);
  }, []);

  const memoizedValue = useMemo(
    () => ({
      mode,
      toggleMode,
      setMode: setManualMode,
    }),
    [mode, toggleMode, setManualMode]
  );

  return (
    <ThemeModeContext.Provider value={memoizedValue}>
      {children}
    </ThemeModeContext.Provider>
  );
}

ThemeModeProvider.propTypes = {
  children: PropTypes.node,
};
