// Dashboard constants and configurations
import { DeliveryStatus, ProxyStatus } from "../types";

export const DASHBOARD_CONFIG = {
  DISPUTE_TIMEOUT: 600, // 10 minutes in seconds
  PROXY_STORAGE_FEE: 500, // ₦500 per completed proxy transaction
  GREETING_UPDATE_INTERVAL: 100, // milliseconds for greeting update
} as const;

export const GREETING_HOURS = {
  MORNING_END: 12,
  AFTERNOON_END: 17,
} as const;

export const GREETINGS = {
  MORNING: 'Good morning',
  AFTERNOON: 'Good afternoon',
  EVENING: 'Good evening',
} as const;

export const JOB_STATUS_GROUPS = {
  PENDING: ['pending', 'bidding'] as DeliveryStatus[], 
  ACTIVE: ['assigned', 'picked-up', 'in-transit'] as DeliveryStatus[],
  COMPLETED: ['delivered', 'completed'] as DeliveryStatus[],
} as const;

export const PROXY_STATUS_GROUPS = {
  PENDING: ['waiting-pickup'] as unknown as ProxyStatus[],
  ACTIVE: ['ready-pickup'] as unknown as ProxyStatus[], 
  COMPLETED: ['collected'] as unknown as ProxyStatus[],
} as const;

export const ROLE_PRIORITIES = ['sender', 'pal', 'receiver', 'proxy'] as const;

export const ACTION_BUTTON_CONFIGS = {
  SENDER: {
    PRIMARY: {
      action: 'post-delivery',
      title: 'Send an Item',
      subtitle: 'Start new delivery',
      className: 'col-span-2 sm:col-span-2 md:col-span-1 lg:col-span-2',
    },
    SECONDARY: [
      { action: 'my-deliveries', title: 'Items I\'ve sent', icon: 'Package' },
      { action: 'wallet', title: 'Wallet', icon: 'Wallet', showBalance: true },
      { action: 'referral', title: 'Refer & Earn', icon: 'Gift', theme: 'green' },
      { action: 'tape-distributor', title: 'Tape Distributor', icon: 'Package2', theme: 'blue' },
      { action: 'sponsorship', title: 'Sponsor', icon: 'Star', theme: 'yellow' },
      { action: 'settings', title: 'Settings', icon: 'Settings' },
    ],
  },
  PAL: {
    PRIMARY: {
      action: 'accepted-bids',
      title: 'Deliver an Item',
      subtitle: 'active deliveries',
      className: 'col-span-2 sm:col-span-2 md:col-span-1 lg:col-span-2',
      showStats: true,
    },
    SECONDARY: [
      { action: 'available-jobs', title: 'Available Jobs', icon: 'TrendingUp', showCount: true },
      { action: 'wallet', title: 'Wallet', icon: 'Wallet', showBalance: true },
      { action: 'referral', title: 'Refer & Earn', icon: 'Gift', theme: 'green' },
      { action: 'tape-distributor', title: 'Tape Distributor', icon: 'Package2', theme: 'blue' },
      { action: 'sponsorship', title: 'Sponsor', icon: 'Star', theme: 'yellow' },
      { action: 'settings', title: 'Settings', icon: 'Settings' },
    ],
  },
  RECEIVER: {
    PRIMARY: {
      action: 'dashboard',
      title: 'Receive items',
      subtitle: 'items coming to you',
      className: 'col-span-2 sm:col-span-2 md:col-span-1 lg:col-span-2',
      showStats: true,
    },
    SECONDARY: [
      { action: 'my-deliveries', title: 'My Items', icon: 'Package' },
      { action: 'wallet', title: 'Wallet', icon: 'Wallet', showBalance: true },
      { action: 'referral', title: 'Refer & Earn', icon: 'Gift', theme: 'green' },
      { action: 'tape-distributor', title: 'Tape Distributor', icon: 'Package2', theme: 'blue' },
      { action: 'sponsorship', title: 'Sponsor', icon: 'Star', theme: 'yellow' },
      { action: 'settings', title: 'Settings', icon: 'Settings' },
    ],
  },
  PROXY: {
    PRIMARY: {
      action: 'proxy-dashboard',
      title: 'Manage Storage',
      subtitle: 'items in storage',
      className: 'col-span-2 sm:col-span-2 md:col-span-1 lg:col-span-2',
      showStats: true,
    },
    SECONDARY: [
      { action: 'my-deliveries', title: 'Storage History', icon: 'Package' },
      { action: 'wallet', title: 'Wallet', icon: 'Wallet', showBalance: true },
      { action: 'referral', title: 'Refer & Earn', icon: 'Gift', theme: 'green' },
      { action: 'tape-distributor', title: 'Tape Distributor', icon: 'Package2', theme: 'blue' },
      { action: 'sponsorship', title: 'Sponsor', icon: 'Star', theme: 'yellow' },
      { action: 'settings', title: 'Settings', icon: 'Settings' },
    ],
  },
} as const;

export const BUTTON_THEMES = {
  default: {
    border: 'border-gray-200',
    hover: 'hover:border-prawnbox-accent',
    bg: 'bg-white',
  },
  green: {
    border: 'border-green-200',
    hover: 'hover:border-green-400',
    bg: 'bg-gradient-to-br from-green-50 to-emerald-50',
    hoverBg: 'hover:from-green-100 hover:to-emerald-100',
    text: 'text-green-700',
    icon: 'text-green-600',
  },
  blue: {
    border: 'border-blue-200',
    hover: 'hover:border-blue-400',
    bg: 'bg-gradient-to-br from-blue-50 to-cyan-50',
    hoverBg: 'hover:from-blue-100 hover:to-cyan-100',
    text: 'text-blue-700',
    icon: 'text-blue-600',
  },
  yellow: {
    border: 'border-yellow-200',
    hover: 'hover:border-yellow-400',
    bg: 'bg-gradient-to-br from-yellow-50 to-amber-50',
    hoverBg: 'hover:from-yellow-100 hover:to-amber-100',
    text: 'text-yellow-700',
    icon: 'text-yellow-600',
  },
} as const;

export const STATS_CONFIG = {
  SENDER: [
    { key: 'pending', label: 'Pending', icon: 'Clock', color: 'text-prawnbox-accent', isAmount: false },
    { key: 'active', label: 'Active', icon: 'Truck', color: 'text-prawnbox-accent', isAmount: false },
    { key: 'completed', label: 'Completed', icon: 'CheckCircle', color: 'text-prawnbox-accent', isAmount: false },
  ],
  PAL: [
    { key: 'pending', label: 'Available', icon: 'TrendingUp', color: 'text-prawnbox-accent', isAmount: false },
    { key: 'active', label: 'Active', icon: 'Package', color: 'text-prawnbox-accent', isAmount: false },
    { key: 'completed', label: 'Completed', icon: 'CheckCircle', color: 'text-prawnbox-accent', isAmount: false },
    { key: 'earnings', label: 'Earnings', icon: 'DollarSign', color: 'text-prawnbox-accent', isAmount: true },
  ],
  RECEIVER: [
    { key: 'pending', label: 'Coming', icon: 'Clock', color: 'text-prawnbox-accent', isAmount: false },
    { key: 'active', label: 'In Transit', icon: 'Truck', color: 'text-prawnbox-accent', isAmount: false },
    { key: 'completed', label: 'Received', icon: 'CheckCircle', color: 'text-prawnbox-accent', isAmount: false },
  ],
  PROXY: [
    { key: 'pending', label: 'Waiting', icon: 'Clock', color: 'text-prawnbox-accent', isAmount: false },
    { key: 'active', label: 'Ready', icon: 'Package', color: 'text-prawnbox-accent', isAmount: false },
    { key: 'completed', label: 'Collected', icon: 'CheckCircle', color: 'text-prawnbox-accent', isAmount: false },
    { key: 'earnings', label: 'Earnings', icon: 'DollarSign', color: 'text-prawnbox-accent', isAmount: true },
  ],
} as const;

export const MOBILE_GRID_CONFIG = {
  // Wider mobile layout with better space utilization
  BASE_CLASSES: 'grid grid-cols-2 sm:grid-cols-3 md:hidden gap-3 sm:gap-4',
  // Full-width desktop layout for maximum screen utilization
  DESKTOP_CLASSES: 'hidden md:block',
  DESKTOP_ROWS: {
    // Single row with responsive column counts for different screen sizes
    FULL: 'grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-7 gap-4 lg:gap-6',
  },
} as const;

export const COMMON_BUTTON_STYLES = {
  BASE: 'w-full h-auto rounded-xl flex flex-col items-center justify-center transition-all duration-200 min-h-[44px] touch-manipulation hover:scale-105 active:scale-95',
  PRIMARY: 'p-4 sm:p-6 lg:p-8 bg-prawnbox-primary hover:bg-gray-800 text-white space-y-2 sm:space-y-3 min-h-[100px] sm:min-h-[120px] lg:min-h-[140px] shadow-lg hover:shadow-xl',
  SECONDARY: 'p-3 sm:p-4 lg:p-5 border-2 space-y-1 sm:space-y-2 min-h-[80px] sm:min-h-[100px] lg:min-h-[120px]',
  INTERACTION: {
    pointerEvents: 'auto',
    userSelect: 'none',
    WebkitUserSelect: 'none',
    WebkitTapHighlightColor: 'transparent'
  }
} as const;