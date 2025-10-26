import React from 'react';
import { useDarkMode } from '../../hooks/useDarkMode';
import './DarkModeToggle.module.css';

/**
 * Dark Mode Toggle Component
 * Provides a toggle switch for switching between light and dark themes
 */
const DarkModeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const handleToggle = () => {
    toggleDarkMode();
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleDarkMode();
    }
  };

  // Inline SVG icons to ensure they always work
  const SunIcon = () => (
    <svg
      className="toggle-icon"
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
    </svg>
  );

  const MoonIcon = () => (
    <svg
      className="toggle-icon"
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        fillRule="evenodd"
        d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
        clipRule="evenodd"
      />
    </svg>
  );

  return (
    <div className="dark-mode-toggle-container">
      <button
        type="button"
        className={`dark-mode-toggle ${isDarkMode ? 'dark' : 'light'}`}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        aria-label="Toggle dark mode"
        aria-pressed={isDarkMode}
        role="switch"
        tabIndex={0}
        title="Toggle Dark Mode"
      >
        <div className="toggle-track">
          <div className={`toggle-thumb ${isDarkMode ? 'dark' : 'light'}`}>
            {isDarkMode ? <MoonIcon /> : <SunIcon />}
          </div>
        </div>
        <span className="sr-only">
          {isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        </span>
      </button>
    </div>
  );
};

export default DarkModeToggle;