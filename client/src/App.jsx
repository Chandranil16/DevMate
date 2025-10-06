import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import Home from './pages/Home';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage first, then system preference
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) return JSON.parse(saved);
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Save preference
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode 
        ? 'bg-gray-900 text-white' 
        : 'bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 text-gray-900'
    }`}>
      {/* Global Dark Mode Toggle - Responsive */}
      <button
        onClick={toggleDarkMode}
        className={`fixed z-50 rounded-full shadow-lg transition-all duration-300 hover:scale-110 backdrop-blur-sm active:scale-95
          ${isMobile 
            ? 'top-2 right-2 p-2 text-sm' 
            : 'top-4 right-4 p-3'
          }
          ${darkMode
            ? 'bg-gray-800/90 text-yellow-400 hover:bg-gray-700 border border-gray-700'
            : 'bg-white/90 text-gray-700 hover:bg-white border border-gray-200 shadow-xl'
          }`}
        title={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
        aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
      >
        {darkMode ? (
          <Sun size={isMobile ? 16 : 20} className="transition-transform duration-200" />
        ) : (
          <Moon size={isMobile ? 16 : 20} className="transition-transform duration-200" />
        )}
      </button>

      <Home darkMode={darkMode} />
    </div>
  );
}

export default App;