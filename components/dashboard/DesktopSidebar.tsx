"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Home, Wallet, Settings, Heart, Users } from "lucide-react";
import { ROUTES } from "@/lib/routes";

interface DesktopSidebarProps {
  currentPath: string;
}

export function DesktopSidebar({ currentPath }: DesktopSidebarProps) {
  const router = useRouter();

  const isActive = (path: string) => {
    if (path === ROUTES.DASHBOARD) {
      return currentPath === ROUTES.DASHBOARD;
    }
    return currentPath.startsWith(path);
  };

  const navItems = [
    { label: "Dashboard", icon: Home, path: ROUTES.DASHBOARD },
    { label: "Wallet", icon: Wallet, path: ROUTES.WALLET },
    { label: "Settings", icon: Settings, path: ROUTES.SETTINGS },
    { label: "Sponsor a User", icon: Heart, path: ROUTES.SPONSORSHIP },
    { label: "Refer & Earn", icon: Users, path: ROUTES.REFERRAL },
  ];

  return (
    <div className="w-72 h-full bg-dark flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.path}
              onClick={() => router.push(item.path)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive(item.path)
                  ? "bg-primary shadow-lg"
                  : "hover:text-primary hover:bg-gray-100"
              }`}
            >
              <Icon size={20} />
              <span className="font-medium text-sm">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
