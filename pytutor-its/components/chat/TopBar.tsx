'use client';

import React from 'react';
import { Moon, Sun, Menu, Code, User, BookOpen } from 'lucide-react';
import { Button } from '../ui/button';
import { useTheme } from '@/hooks/useTheme';
import Link from 'next/link';

interface TopBarProps {
  onToggleSidebar: () => void;
}

export function TopBar({ onToggleSidebar }: TopBarProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-30 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-4">
        {/* Left: Hamburger (mobile) */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          className="lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Center: Logo (mobile) */}
        <Link href="/" className="lg:hidden font-bold text-lg">
          PyTutor AI
        </Link>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 ml-auto">
          {/* Challenges Button */}
          <Link href="/challenges">
            <Button variant="ghost" size="sm">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Challenges</span>
            </Button>
          </Link>

          {/* Build in IDE Button */}
          <Button variant="outline" size="sm" className="hidden md:flex">
            <Code className="h-4 w-4" />
            Build in IDE
          </Button>

          {/* Theme Toggle */}
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          {/* Profile */}
          <Link href="/profile">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
