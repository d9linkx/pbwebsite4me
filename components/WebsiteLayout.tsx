import React from "react";
import { WebsiteHeader } from "./WebsiteHeader";
import { WebsiteFooter } from "./WebsiteFooter";

interface WebsiteLayoutProps {
  children: React.ReactNode;
}

export function WebsiteLayout({ children }: WebsiteLayoutProps) {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden flex flex-col">
      <WebsiteHeader />
      <main className="flex-1 w-full">{children}</main>
      <WebsiteFooter />
    </div>
  );
}
