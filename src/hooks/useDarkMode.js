import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for managing dark mode state and persistence
 */
export const useDarkMode = () => {
  // Initialize state from localStorage or default to false (light mode)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window === 'undefined') return false;
    
    try {
      const stored = localStorage.getItem('darkModePreference');
      return stored ? JSON.parse(stored) : false;
    } catch (error) {
      console.warn('Failed to parse dark mode preference from localStorage:', error);
      return false;
    }
  });

  // Apply theme to document root
  useEffect(() => {
    const root = document.documentElement;
    
    if (isDarkMode) {
      root.setAttribute('data-theme', 'dark');
      root.classList.add('dark-theme');
      root.classList.remove('light-theme');
    } else {
      root.setAttribute('data-theme', 'light');
      root.classList.add('light-theme');
      root.classList.remove('dark-theme');
    }
  }, [isDarkMode]);

  // Save preference to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('darkModePreference', JSON.stringify(isDarkMode));
      
      // Track analytics event
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', isDarkMode ? 'dark_mode_enabled' : 'dark_mode_disabled', {
          event_category: 'user_preference',
          event_label: 'theme_toggle'
        });
      }
    } catch (error) {
      console.warn('Failed to save dark mode preference to localStorage:', error);
    }
  }, [isDarkMode]);

  // Toggle function
  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(prev => !prev);
  }, []);

  // Function to set specific mode
  const setDarkMode = useCallback((enabled) => {
    setIsDarkMode(Boolean(enabled));
  }, []);

  // Listen for system theme changes (optional enhancement)
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleSystemThemeChange = (e) => {
      // Only apply system preference if user hasn't set a preference
      const hasUserPreference = localStorage.getItem('darkModePreference') !== null;
      if (!hasUserPreference) {
        setIsDarkMode(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);
    
    // Check initial system preference if no user preference exists
    const hasUserPreference = localStorage.getItem('darkModePreference') !== null;
    if (!hasUserPreference) {
      setIsDarkMode(mediaQuery.matches);
    }

    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, []);

  return {
    isDarkMode,
    toggleDarkMode,
    setDarkMode
  };
};