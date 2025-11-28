import React from 'react';
import { WebsiteHeader } from './WebsiteHeader';
import { WebsiteFooter } from './WebsiteFooter';

interface WebsiteLayoutProps {
  children: React.ReactNode;
  onNavigate?: (screen: string) => void;
}

export function WebsiteLayout({ children, onNavigate }: WebsiteLayoutProps) {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden flex flex-col overscroll-none">
      <WebsiteHeader onNavigate={onNavigate} />
      <main className="min-h-screen w-full flex-1 overscroll-none">
        {children}
      </main>
      <WebsiteFooter onNavigate={onNavigate} />
    </div>
  );
}
