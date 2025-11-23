import React from 'react';
import { User, DeliveryJob, UserRole, ProxyItem, Notification, Screen } from '../../types';
import { filterNotificationsByRole } from '../../utils/helpers';
import { RoleSpecificContent } from '../dashboard/RoleSpecificContent';
import { 
  calculateDashboardStats,
  createButtonClickHandler,
  createRoleButtonHandler,
  createNotificationsHandler,
  createSpecialButtonHandler
} from '../../utils/dashboard';

interface DashboardScreenProps {
  user: User | null;
  activeRole: UserRole;
  onJobSelect: (job: DeliveryJob) => void;
  onRoleChange: (role: UserRole) => void;
  onNavigate: (screen: Screen) => void;
  userJobs: DeliveryJob[];
  allJobs: DeliveryJob[];
  proxyItems: ProxyItem[];
  selectedRoute: string | null;
  onRouteSelect: (route: string) => void;
  onBack: () => void;
  handleCall: (phone: string) => void;
  notifications?: Notification[];
  onActionClick?: (action: string) => void;
}

export function DashboardScreen({
  user,
  activeRole,
  onJobSelect,
  onRoleChange,
  onNavigate,
  userJobs,
  allJobs,
  proxyItems,
  selectedRoute,
  onRouteSelect,
  onBack,
  handleCall,
  notifications = [],
  onActionClick
}: DashboardScreenProps) {
  // Calculate stats for current role
  const stats = calculateDashboardStats(activeRole, allJobs, proxyItems, user);
  
  // 🔥 FILTER NOTIFICATIONS BY ACTIVE ROLE
  const roleBasedNotifications = filterNotificationsByRole(notifications, activeRole);

  // Enhanced action handler - use App.tsx action handler with filtering logic or fallback to direct navigation
  const handleEnhancedActionClick = (action: string) => {
    console.log('🚀 Enhanced action button clicked:', action);
    
    // Always try to use the onActionClick handler from App.tsx first (contains filtering logic)
    if (onActionClick) {
      console.log('🎯 Using App.tsx action handler with filtering logic for:', action);
      onActionClick(action);
      return;
    }
    
    // Fallback to direct navigation mapping if no onActionClick handler provided
    console.log('🔄 Fallback: Using direct navigation for:', action);
    const navigationMap: Record<string, Screen> = {
      'post-delivery': 'post-delivery',
      'available-jobs': 'available-jobs',
      'accepted-bids': 'accepted-bids',
      'accepted-bids-completed': 'accepted-bids',
      'my-deliveries': 'my-deliveries',
      'wallet': 'wallet',
      'settings': 'settings',
      'wallet-add-funds': 'wallet-add-funds',
      'referral': 'referral',
      'tape-distributor': 'tape-distributor',
    } as const;

    const targetScreen = navigationMap[action];
    if (targetScreen) {
      onNavigate(targetScreen);
    } else {
      console.warn('Unknown action:', action);
    }
  };

  const handleEnhancedSpecialActionClick = (action: string) => {
    console.log('🔥 Enhanced special action button clicked:', action);
    
    if (action === 'accepted-bids') {
      console.log('🔥 ENHANCED ACCEPTED BIDS BUTTON CLICKED - Perfect Functionality!');
      console.log('📊 Enhanced count calculation stats:', stats);
      console.log('📍 Enhanced navigation: Going to accepted-bids screen');
      console.log('🎯 Button copy: Shows active deliveries for clarity');
      onNavigate('accepted-bids');
    } else if (action === 'proxy-dashboard') {
      console.log('🏪 ENHANCED PROXY DASHBOARD BUTTON CLICKED!');
      console.log('📊 Proxy stats:', stats);
      onNavigate('proxy-dashboard');
    } else {
      console.warn('Unknown special action:', action);
    }
  };

  // Handle sponsorship navigation directly
  const handleNavigateToSponsorship = () => {
    console.log('🎯 Sponsorship button clicked');
    onNavigate('sponsorship');
  };



  return (
    <div className="w-full bg-white">
      {/* Main Content - Responsive container */}
      <div className="w-full">
        <RoleSpecificContent
          activeRole={activeRole}
          stats={stats}
          user={user}
          allJobs={allJobs}
          onActionClick={onActionClick || handleEnhancedActionClick}
          onSpecialActionClick={handleEnhancedSpecialActionClick}
          onNavigateToSponsorship={handleNavigateToSponsorship}
          onJobSelect={onJobSelect}
        />
      </div>
    </div>
  );
}