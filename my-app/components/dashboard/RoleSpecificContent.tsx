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
  onJobSelect?: (job: DeliveryJob) => void;
}

export function RoleSpecificContent({
  activeRole,
  stats,
  user,
  allJobs,
  onActionClick,
  onSpecialActionClick,
  onNavigateToSponsorship,
  onJobSelect
}: RoleSpecificContentProps) {
  return (
    <div className="w-full overflow-x-hidden">
      {/* Quick Actions Card */}
      <div className="w-full overflow-x-hidden">
        <QuickActionsCard
          activeRole={activeRole}
          stats={stats}
          user={user}
          allJobs={allJobs}
          onActionClick={onActionClick}
          onSpecialActionClick={onSpecialActionClick}
          onNavigateToSponsorship={onNavigateToSponsorship}
          onJobSelect={onJobSelect}
        />
      </div>
    </div>
  );
}