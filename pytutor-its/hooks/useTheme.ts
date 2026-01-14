'use client';

import { useEffect, useState } from 'react';

export function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check localStorage or system preference
    const stored = localStorage.getItem('pytutor-theme') as 'light' | 'dark' | null;
    if (stored) {
      setTheme(stored);
      document.documentElement.classList.toggle('dark', stored === 'dark');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
      document.documentElement.classList.toggle('dark', prefersDark);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('pytutor-theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const setThemeMode = (mode: 'light' | 'dark') => {
    setTheme(mode);
    localStorage.setItem('pytutor-theme', mode);
    document.documentElement.classList.toggle('dark', mode === 'dark');
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return { theme: 'dark', toggleTheme: () => {}, setTheme: () => {} };
  }

  return { theme, toggleTheme, setTheme: setThemeMode };
}
