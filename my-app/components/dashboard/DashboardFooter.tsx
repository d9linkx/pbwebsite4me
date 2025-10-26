"use client";

import React from 'react';
import { UserRole } from '../../types';

interface DashboardFooterProps {
  activeRole: UserRole;
  onActionClick: (action: string) => void;
}

export function DashboardFooter({ activeRole, onActionClick }: DashboardFooterProps) {
  const getLearnMoreConfig = () => {
    switch (activeRole) {
      case 'sender':
        return {
          action: 'become-sender',
          text: 'Learn more about sending items'
        };
      case 'pal':
        return {
          action: 'become-pal',
          text: 'Learn more about delivering items'
        };
      case 'receiver':
        return {
          action: 'become-receiver',
          text: 'Learn more about receiving items'
        };
      case 'proxy':
        return {
          action: 'become-proxy',
          text: 'Learn more about being a proxy'
        };
      default:
        return {
          action: 'dashboard',
          text: 'Learn more'
        };
    }
  };

  const config = getLearnMoreConfig();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#2f2f2f] border-t border-white/10 p-4 z-50">
      <div className="max-w-md mx-auto text-center">
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log(`🎓 Learn more link clicked: ${config.action}`);
            onActionClick(config.action);
          }}
          className="text-sm underline transition-all duration-200 cursor-pointer text-[#f44708] hover:text-[#ff5722]"
          style={{
            pointerEvents: 'auto',
            userSelect: 'none',
            WebkitUserSelect: 'none',
            WebkitTapHighlightColor: 'transparent'
          }}
        >
          {config.text}
        </button>
      </div>
    </div>
  );
}