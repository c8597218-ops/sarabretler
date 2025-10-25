import React from 'react';
import DarkModeToggle from './components/DarkModeToggle/DarkModeToggle';
import './styles/themes.css';

function App() {
  return (
    <div className="App">
      {/* Header with dark mode toggle */}
      <header className="header">
        <div className="container">
          <nav style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center' 
          }}>
            <h1 style={{ margin: 0 }}>Dark Mode Demo</h1>
            <DarkModeToggle />
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="container" style={{ padding: '2rem 1rem' }}>
        <div className="card">
          <h2>Welcome to the Dark Mode Toggle Demo</h2>
          <p>
            This application demonstrates a fully accessible dark mode toggle feature.
            Click the toggle in the top-right corner to switch between light and dark themes.
          </p>
          
          <h3>Features:</h3>
          <ul>
            <li>Smooth transitions between themes</li>
            <li>Persistent theme preference (saved to localStorage)</li>
            <li>Keyboard accessible (try tabbing to the toggle)</li>
            <li>Screen reader friendly</li>
            <li>High contrast mode support</li>
            <li>Respects reduced motion preferences</li>
          </ul>

          <h3>Accessibility Features:</h3>
          <ul>
            <li>WCAG 2.1 AA compliant contrast ratios</li>
            <li>Keyboard navigation support</li>
            <li>Screen reader labels and announcements</li>
            <li>Focus indicators</li>
            <li>Support for system preferences</li>
          </ul>

          <div style={{ marginTop: '2rem' }}>
            <button>Sample Button</button>
            <a href="#" style={{ marginLeft: '1rem' }}>Sample Link</a>
          </div>
        </div>

        <div className="card" style={{ marginTop: '2rem' }}>
          <h3>Theme Variables Demo</h3>
          <p>All colors automatically adapt to the selected theme using CSS custom properties.</p>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '1rem',
            marginTop: '1rem'
          }}>
            <div style={{ 
              padding: '1rem', 
              backgroundColor: 'var(--secondary-bg)', 
              border: '1px solid var(--border-color)',
              borderRadius: '0.375rem'
            }}>
              <strong>Secondary Background</strong>
            </div>
            <div style={{ 
              padding: '1rem', 
              backgroundColor: 'var(--tertiary-bg)', 
              border: '1px solid var(--border-color)',
              borderRadius: '0.375rem'
            }}>
              <strong>Tertiary Background</strong>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;