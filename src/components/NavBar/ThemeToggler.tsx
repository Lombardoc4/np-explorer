'use client';

import { useEffect, useState } from 'react';
import { MoonIcon, SunIcon } from 'lucide-react';

export const ThemeSwitcher = () => {
  const [darkMode, setDarkMode] = useState<boolean | null>(null); // Start with `null` to prevent mismatch

  useEffect(() => {
    // Ensure correct theme from localStorage or system preference
    const storedDarkMode = localStorage.getItem('darkMode');
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;

    setDarkMode(storedDarkMode ? storedDarkMode === 'true' : prefersDark);
  }, []);

  useEffect(() => {
    if (darkMode === null) return; // Prevent applying styles before state is set

    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <button
      onClick={toggleDarkMode}
      className='rounded-md bg-gray-800 px-4 py-2 text-white dark:bg-white dark:text-black'
    >
      {darkMode ? <SunIcon /> : <MoonIcon />}
    </button>
  );
};
