import React from "react";
import { WebsiteHeader } from "./WebsiteHeader";
import { WebsiteFooter } from "./WebsiteFooter";

interface WebsiteLayoutProps {
  children: React.ReactNode;
}

export function WebsiteLayout({ children }: WebsiteLayoutProps) {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden flex flex-col overscroll-none">
      <WebsiteHeader />
      <main className="min-h-screen w-full flex-1 overscroll-none">
        {children}
      </main>
      <WebsiteFooter />
    </div>
  );
}
