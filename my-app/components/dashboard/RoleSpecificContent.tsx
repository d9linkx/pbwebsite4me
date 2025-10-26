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
  console.log('🎯 RoleSpecificContent rendering:', { activeRole, hasUser: !!user, allJobsCount: allJobs.length });

  return (
    <div className="w-full min-h-screen bg-white" style={{
      position: 'relative',
      isolation: 'isolate',
      zIndex: 1
    }}>
      {/* Debug indicator - Remove this after confirming it works */}
      <div style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        backgroundColor: '#10b981',
        color: 'white',
        padding: '8px 16px',
        borderRadius: '8px',
        fontSize: '12px',
        zIndex: 9999,
        fontWeight: 'bold',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}>
        ✅ RoleSpecificContent Active ({activeRole})
      </div>

      {/* Quick Actions Card */}
      <div className="w-full mb-6">
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

      {/* Stats Grid */}
      <div className="w-full">
        <StatsGrid
          activeRole={activeRole}
          stats={stats}
        />
      </div>
    </div>
  );
}