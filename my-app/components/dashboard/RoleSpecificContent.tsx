import React from 'react';
import { UserRole, User, DeliveryJob } from '../../types';
import { DashboardStats } from '../../utils/dashboard';
import { QuickActionsCard } from './QuickActionsCard';

interface RoleSpecificContentProps {
  activeRole: UserRole;
  stats: DashboardStats;
  user: User | null;
  allJobs: DeliveryJob[];
  onActionClick: (action: string) => void;
  onSpecialActionClick: (action: string) => void;
  onNavigateToSponsorship: () => void;
}

export function RoleSpecificContent({
  activeRole,
  stats,
  user,
  allJobs,
  onActionClick,
  onSpecialActionClick,
  onNavigateToSponsorship
}: RoleSpecificContentProps) {
  return (
    <div className="w-full">
      {/* Quick Actions Card */}
      <div className="w-full">
        <QuickActionsCard
          activeRole={activeRole}
          stats={stats}
          user={user}
          allJobs={allJobs}
          onActionClick={onActionClick}
          onSpecialActionClick={onSpecialActionClick}
          onNavigateToSponsorship={onNavigateToSponsorship}
        />
      </div>
    </div>
  );
}