import React from 'react';
import { useDarkMode } from '../../hooks/useDarkMode';
import { SunIcon, MoonIcon } from '../Icons';
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
            {isDarkMode ? (
              <MoonIcon className="toggle-icon" />
            ) : (
              <SunIcon className="toggle-icon" />
            )}
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