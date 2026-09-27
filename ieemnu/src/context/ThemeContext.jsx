/**
 * Theme Context
 * Dark mode only — always applies 'dark' class to the document root.
 * Stored in localStorage so it's explicit and never overridden.
 */

import { createContext, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  useEffect(() => {
    // Always enforce dark mode
    const root = window.document.documentElement;
    root.classList.remove('light');
    root.classList.add('dark');
    localStorage.setItem('ieee-theme', 'dark');
  }, []);

  const value = {
    theme: 'dark',
    isDark: true,
    toggleTheme: () => {}, // No-op — dark mode is permanent
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
