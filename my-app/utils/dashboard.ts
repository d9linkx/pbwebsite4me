import { User, DeliveryJob, UserRole, ProxyItem, DeliveryStatus } from '../types';
import { 
  GREETINGS, 
  GREETING_HOURS, 
  JOB_STATUS_GROUPS, 
  PROXY_STATUS_GROUPS,
  DASHBOARD_CONFIG 
} from '../constants/dashboard';

export interface DashboardStats {
  pending: number;
  active: number;
  completed: number;
  earnings: number;
}

export const getTimeBasedGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour < GREETING_HOURS.MORNING_END) return GREETINGS.MORNING;
  if (hour < GREETING_HOURS.AFTERNOON_END) return GREETINGS.AFTERNOON;
  return GREETINGS.EVENING;
};

export const formatAmount = (amount: number): string => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const calculateSenderStats = (
  allJobs: DeliveryJob[], 
  userId: string
): DashboardStats => {
  const senderJobs = allJobs.filter(job => job.senderId === userId);
  
  return {
    pending: senderJobs.filter(job => 
      JOB_STATUS_GROUPS.PENDING.includes(job.status)
    ).length,
    active: senderJobs.filter(job => 
      JOB_STATUS_GROUPS.ACTIVE.includes(job.status)
    ).length,
    completed: senderJobs.filter(job => 
      JOB_STATUS_GROUPS.COMPLETED.includes(job.status)
    ).length,
    earnings: 0
  };
};

export const calculatePalStats = (
  allJobs: DeliveryJob[], 
  userId: string
): DashboardStats => {
  const palAcceptedJobs = allJobs.filter(job => 
    job.selectedPalId === userId && 
    JOB_STATUS_GROUPS.ACTIVE.includes(job.status)
  );
  
  const palCompletedJobs = allJobs.filter(job => 
    job.selectedPalId === userId && 
    JOB_STATUS_GROUPS.COMPLETED.includes(job.status)
  );
  
  const palEarnings = palCompletedJobs.reduce(
    (sum, job) => sum + (job.acceptedBidAmount || 0), 0
  );
  
  // Enhanced logging for pal stats
  console.log('🔥 ENHANCED DASHBOARD STATS CALCULATION - Perfect Pal Flow:');
  console.log('- Pal ID:', userId);
  console.log('- Total jobs assigned to pal:', allJobs.filter(job => job.selectedPalId === userId).length);
  console.log('- Active jobs (assigned, picked-up, in-transit):', palAcceptedJobs.length);
  console.log('- Active job details:', palAcceptedJobs.map(j => `${j.title} (${j.status}) - ₦${j.acceptedBidAmount || j.value}`));
  console.log('- Completed jobs:', palCompletedJobs.length);
  console.log('- Total earnings:', palEarnings);
  
  return {
    pending: 0,
    active: palAcceptedJobs.length, // Real-time Updates: Shows active deliveries for Pal
    completed: palCompletedJobs.length,
    earnings: palEarnings
  };
};

export const calculateReceiverStats = (
  allJobs: DeliveryJob[], 
  userId: string
): DashboardStats => {
  const receiverJobs = allJobs.filter(job => job.receiverId === userId);
  
  return {
    pending: receiverJobs.filter(job => 
      JOB_STATUS_GROUPS.PENDING.includes(job.status)
    ).length,
    active: receiverJobs.filter(job => 
      JOB_STATUS_GROUPS.ACTIVE.includes(job.status)
    ).length,
    completed: receiverJobs.filter(job => 
      JOB_STATUS_GROUPS.COMPLETED.includes(job.status)
    ).length,
    earnings: 0
  };
};

export const calculateProxyStats = (proxyItems: ProxyItem[]): DashboardStats => {
  return {
    pending: proxyItems.filter(item => 
      PROXY_STATUS_GROUPS.PENDING.includes(item.status)
    ).length,
    active: proxyItems.filter(item => 
      PROXY_STATUS_GROUPS.ACTIVE.includes(item.status)
    ).length,
    completed: proxyItems.filter(item => 
      PROXY_STATUS_GROUPS.COMPLETED.includes(item.status)
    ).length,
    earnings: proxyItems.filter(item => 
      PROXY_STATUS_GROUPS.COMPLETED.includes(item.status)
    ).length * DASHBOARD_CONFIG.PROXY_STORAGE_FEE
  };
};

export const calculateDashboardStats = (
  activeRole: UserRole,
  allJobs: DeliveryJob[],
  proxyItems: ProxyItem[],
  user: User | null
): DashboardStats => {
  const baseStats: DashboardStats = {
    pending: 0,
    active: 0,
    completed: 0,
    earnings: 0
  };

  if (!user?.id) return baseStats;

  switch (activeRole) {
    case 'sender':
      return calculateSenderStats(allJobs, user.id);
    
    case 'pal':
      return calculatePalStats(allJobs, user.id);
    
    case 'receiver':
      return calculateReceiverStats(allJobs, user.id);
    
    case 'proxy':
      return calculateProxyStats(proxyItems);
    
    default:
      return baseStats;
  }
};

export const getAvailableJobsCount = (
  allJobs: DeliveryJob[], 
  userId: string
): number => {
  return allJobs.filter(job => 
    job.status === 'pending' && job.senderId !== userId
  ).length;
};

export const createButtonClickHandler = (
  action: string,
  onNavigate: (screen: string) => void
) => {
  return (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('🚀 Enhanced action button clicked:', action);
    
    const navigationMap: Record<string, string> = {
      'post-delivery': 'post-delivery',
      'available-jobs': 'available-jobs',

      'wallet': 'wallet',
      'settings': 'settings',
      'wallet-add-funds': 'wallet-add-funds',
      'referral': 'referral',
      'tape-distributor': 'tape-distributor',
      'sponsorship': 'sponsorship',
      'accepted-bids': 'accepted-bids',
      'proxy-dashboard': 'proxy-dashboard',
    };

    const targetScreen = navigationMap[action];
    if (targetScreen) {
      onNavigate(targetScreen);
    } else {
      console.warn('Unknown action:', action);
    }
  };
};

export const createRoleButtonHandler = (
  role: UserRole,
  onRoleChange: (role: UserRole) => void
) => {
  return (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('🎭 Enhanced role change requested:', role);
    onRoleChange(role);
  };
};

export const createNotificationsHandler = (
  onNavigate: (screen: string) => void
) => {
  return (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('🔔 Notifications button clicked');
    onNavigate('notifications');
  };
};

export const createSpecialButtonHandler = (
  action: string,
  stats: DashboardStats,
  onNavigate: (screen: string) => void
) => {
  return (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (action === 'accepted-bids') {
    //   console.log('🔥 ENHANCED ACCEPTED BIDS BUTTON CLICKED - Perfect Functionality!');
    //   console.log('📊 Enhanced count calculation stats:', stats);
    //   console.log('📍 Enhanced navigation: Going to accepted-bids screen');
    //   console.log('🎯 Button copy: Shows active deliveries for clarity');
      onNavigate('accepted-bids');
    } else if (action === 'proxy-dashboard') {
    //   console.log('🏪 ENHANCED PROXY DASHBOARD BUTTON CLICKED!');
    //   console.log('📊 Proxy stats:', stats);
      onNavigate('proxy-dashboard');
    }
  };
};