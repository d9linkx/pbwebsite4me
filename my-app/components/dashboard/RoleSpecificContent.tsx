import React from 'react';
import { UserRole, User, DeliveryJob } from '../../types';
import { DashboardStats } from '../../utils/dashboard';
import { QuickActionsCard } from './QuickActionsCard';
import { StatsGrid } from './StatsGrid';

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
    <div className="space-y-6">
      {/* Quick Actions Card */}
      <QuickActionsCard
        activeRole={activeRole}
        stats={stats}
        user={user}
        allJobs={allJobs}
        onActionClick={onActionClick}
        onSpecialActionClick={onSpecialActionClick}
        onNavigateToSponsorship={onNavigateToSponsorship}
      />

      {/* Stats Grid */}
      <StatsGrid 
        activeRole={activeRole} 
        stats={stats} 
      />
    </div>
  );
}