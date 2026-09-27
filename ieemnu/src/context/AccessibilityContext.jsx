import { createContext, useContext, useState, useEffect } from 'react';

const AccessibilityContext = createContext(null);

const DEFAULT_PREFS = {
  highContrast: false,
  largeText: false,
  highlightLinks: false,
  stopAnimations: false,
};

const CLASS_MAP = {
  highContrast: 'a11y-high-contrast',
  largeText: 'a11y-large-text',
  highlightLinks: 'a11y-highlight-links',
  stopAnimations: 'a11y-stop-animations',
};

const STORAGE_KEY = 'ieee_a11y_prefs';

function loadPreferences() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const defaults = { ...DEFAULT_PREFS, stopAnimations: prefersReducedMotion };
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...defaults, ...parsed };
    }
  } catch (e) {
    console.error('Failed to parse accessibility preferences:', e);
  }
  return defaults;
}

export const AccessibilityProvider = ({ children }) => {
  const [preferences, setPreferences] = useState(loadPreferences);

  useEffect(() => {
    Object.entries(CLASS_MAP).forEach(([key, cls]) => {
      document.body.classList.toggle(cls, !!preferences[key]);
    });
  }, [preferences]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
  }, [preferences]);

  const togglePreference = (key) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const resetPreferences = () => {
    setPreferences({ ...DEFAULT_PREFS });
  };

  return (
    <AccessibilityContext.Provider value={{ preferences, togglePreference, resetPreferences }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
}
