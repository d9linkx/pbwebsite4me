// Navigation configuration and utilities
import { Screen, UserRole } from '../types';

// Screen definitions with metadata
export interface ScreenConfig {
  id: Screen;
  title: string;
  description?: string;
  roles?: UserRole[];
  requiresAuth?: boolean;
  requiresJob?: boolean;
  category?: 'main' | 'auth' | 'payment' | 'profile' | 'support' | 'proxy' | 'pal' | 'sender' | 'receiver';
}

// Centralized screen configuration
export const SCREEN_CONFIGS: Record<Screen, ScreenConfig> = {
  // Main screens
  'dashboard': {
    id: 'dashboard',
    title: 'Dashboard',
    category: 'main',
    requiresAuth: true
  },

  'splash': {
    id: 'splash',
    title: 'Splash',
    category: 'auth',
    requiresAuth: false
  },

  'sponsor-search': {
    id: 'sponsor-search',
    title: 'Sponsor Search',
    category: 'main',
    requiresAuth: true
  },

  'sponsorship-details': {
    id: 'sponsorship-details',
    title: 'Sponsorship Details',
    category: 'main',
    requiresAuth: true
  },

  // Authentication screens
  'auth': {
    id: 'auth',
    title: 'Authentication',
    category: 'auth',
    requiresAuth: false
  },

  // Delivery management screens
  'my-deliveries': {
    id: 'my-deliveries',
    title: 'My Deliveries',
    category: 'sender',
    requiresAuth: true,
    roles: ['sender']
  },

  'available-jobs': {
    id: 'available-jobs',
    title: 'Available Jobs',
    category: 'pal',
    requiresAuth: true,
    roles: ['pal']
  },

  'accepted-bids': {
    id: 'accepted-bids',
    title: 'Accepted Bids',
    category: 'pal',
    requiresAuth: true,
    roles: ['pal']
  },

  // Payment screens
  'wallet': {
    id: 'wallet',
    title: 'Wallet',
    category: 'payment',
    requiresAuth: true
  },

  'wallet-add-funds': {
    id: 'wallet-add-funds',
    title: 'Add Funds',
    category: 'payment',
    requiresAuth: true
  },

  'wallet-withdraw': {
    id: 'wallet-withdraw',
    title: 'Withdraw Funds',
    category: 'payment',
    requiresAuth: true
  },

  // Profile and settings
  'settings': {
    id: 'settings',
    title: 'Settings',
    category: 'profile',
    requiresAuth: true
  },

  'profile-information': {
    id: 'profile-information',
    title: 'Profile Information',
    category: 'profile',
    requiresAuth: true
  },

  'verification': {
    id: 'verification',
    title: 'Verification',
    category: 'profile',
    requiresAuth: true
  },

  // Support screens
  'contact-support': {
    id: 'contact-support',
    title: 'Contact Support',
    category: 'support',
    requiresAuth: true
  },

  'help-center': {
    id: 'help-center',
    title: 'Help Center',
    category: 'support',
    requiresAuth: true
  },

  // Proxy screens
  'proxy-dashboard': {
    id: 'proxy-dashboard',
    title: 'Proxy Dashboard',
    category: 'proxy',
    requiresAuth: true,
    roles: ['proxy']
  },

  'proxy-selection': {
    id: 'proxy-selection',
    title: 'Select Proxy',
    category: 'proxy',
    requiresAuth: true
  },

  // Receiver screens
  'receiver-dashboard': {
    id: 'receiver-dashboard',
    title: 'Receiver Dashboard',
    category: 'receiver',
    requiresAuth: true,
    roles: ['receiver']
  },

  // Pal screens
  'pal-profile': {
    id: 'pal-profile',
    title: 'Pal Profile',
    category: 'pal',
    requiresAuth: true,
    roles: ['pal']
  },

  // Chat and communication
  'chat': {
    id: 'chat',
    title: 'Chat',
    category: 'main',
    requiresAuth: true,
    requiresJob: true
  },

  // Tracking and delivery
  'tracking': {
    id: 'tracking',
    title: 'Track Delivery',
    category: 'main',
    requiresAuth: true,
    requiresJob: true
  },

  // Payment processing screens
  'payment-methods': {
    id: 'payment-methods',
    title: 'Payment Methods',
    category: 'payment',
    requiresAuth: true
  },

  'bank-transfer': {
    id: 'bank-transfer',
    title: 'Bank Transfer',
    category: 'payment',
    requiresAuth: true
  },

  'card-payment': {
    id: 'card-payment',
    title: 'Card Payment',
    category: 'payment',
    requiresAuth: true
  },

  'payment-status': {
    id: 'payment-status',
    title: 'Payment Status',
    category: 'payment',
    requiresAuth: true
  },

  'payment-confirmation': {
    id: 'payment-confirmation',
    title: 'Payment Confirmation',
    category: 'payment',
    requiresAuth: true
  },

  // Location and mapping
  'location-selection': {
    id: 'location-selection',
    title: 'Select Location',
    category: 'main',
    requiresAuth: true
  },

  // Notifications
  'notifications': {
    id: 'notifications',
    title: 'Notifications',
    category: 'main',
    requiresAuth: true
  },

  // Business features
  'referral': {
    id: 'referral',
    title: 'Referral Program',
    category: 'main',
    requiresAuth: true
  },

  'sponsorship': {
    id: 'sponsorship',
    title: 'Sponsorship',
    category: 'main',
    requiresAuth: true
  },

  'sponsor-user-search': {
    id: 'sponsor-user-search',
    title: 'Sponsor User Search',
    category: 'main',
    requiresAuth: true
  },

  'sponsor-user-confirmation': {
    id: 'sponsor-user-confirmation',
    title: 'Sponsor Confirmation',
    category: 'main',
    requiresAuth: true
  },

  'sponsorship-success': {
    id: 'sponsorship-success',
    title: 'Sponsorship Success',
    category: 'main',
    requiresAuth: true
  },

  'sponsorship-management': {
    id: 'sponsorship-management',
    title: 'Sponsorship Management',
    category: 'main',
    requiresAuth: true
  },

  'tape-distributor': {
    id: 'tape-distributor',
    title: 'Tape Distributor',
    category: 'main',
    requiresAuth: true
  },

  'route-ads-management': {
    id: 'route-ads-management',
    title: 'Route Ads Management',
    category: 'main',
    requiresAuth: true
  },

  // Onboarding screens
  'become-pal': {
    id: 'become-pal',
    title: 'Become a Pal',
    category: 'main',
    requiresAuth: false
  },

  'become-sender': {
    id: 'become-sender',
    title: 'Become a Sender',
    category: 'main',
    requiresAuth: false
  },

  'become-receiver': {
    id: 'become-receiver',
    title: 'Become a Receiver',
    category: 'main',
    requiresAuth: false
  },

  'become-proxy': {
    id: 'become-proxy',
    title: 'Become a Proxy',
    category: 'main',
    requiresAuth: false
  },

  // QR and scanning
  'qr-scanner': {
    id: 'qr-scanner',
    title: 'QR Scanner',
    category: 'main',
    requiresAuth: true,
    requiresJob: true
  },

  // Delivery flow screens
  'pickup-confirmation': {
    id: 'pickup-confirmation',
    title: 'Pickup Confirmation',
    category: 'pal',
    requiresAuth: true,
    requiresJob: true,
    roles: ['pal']
  },

  'pickup-verification': {
    id: 'pickup-verification',
    title: 'Pickup Verification',
    category: 'pal',
    requiresAuth: true,
    requiresJob: true,
    roles: ['pal']
  },

  'delivery-progress': {
    id: 'delivery-progress',
    title: 'Delivery Progress',
    category: 'pal',
    requiresAuth: true,
    requiresJob: true,
    roles: ['pal']
  },

  'delivery-confirmation': {
    id: 'delivery-confirmation',
    title: 'Delivery Confirmation',
    category: 'pal',
    requiresAuth: true,
    requiresJob: true,
    roles: ['pal']
  },

  'arrival-confirmation': {
    id: 'arrival-confirmation',
    title: 'Arrival Confirmation',
    category: 'pal',
    requiresAuth: true,
    requiresJob: true,
    roles: ['pal']
  },

  'handover-qr': {
    id: 'handover-qr',
    title: 'Handover QR',
    category: 'pal',
    requiresAuth: true,
    requiresJob: true,
    roles: ['pal']
  },

  'receiver-confirmation': {
    id: 'receiver-confirmation',
    title: 'Receiver Confirmation',
    category: 'receiver',
    requiresAuth: true,
    requiresJob: true,
    roles: ['receiver']
  },

  'delivery-completed': {
    id: 'delivery-completed',
    title: 'Delivery Completed',
    category: 'receiver',
    requiresAuth: true,
    requiresJob: true,
    roles: ['receiver']
  },

  'proxy-completed': {
    id: 'proxy-completed',
    title: 'Proxy Completed',
    category: 'proxy',
    requiresAuth: true,
    roles: ['proxy']
  },

  // Dispute and support screens
  'item-mismatch-notification': {
    id: 'item-mismatch-notification',
    title: 'Item Mismatch',
    category: 'support',
    requiresAuth: true,
    requiresJob: true
  },

  'sender-resolution': {
    id: 'sender-resolution',
    title: 'Sender Resolution',
    category: 'support',
    requiresAuth: true,
    requiresJob: true,
    roles: ['sender']
  },

  'support-resolution': {
    id: 'support-resolution',
    title: 'Support Resolution',
    category: 'support',
    requiresAuth: true,
    requiresJob: true
  },

  'evidence-collection': {
    id: 'evidence-collection',
    title: 'Evidence Collection',
    category: 'support',
    requiresAuth: true,
    requiresJob: true
  },

  'cancellation-confirmation': {
    id: 'cancellation-confirmation',
    title: 'Cancellation Confirmation',
    category: 'support',
    requiresAuth: true,
    requiresJob: true
  },

  'pal-waiting': {
    id: 'pal-waiting',
    title: 'Pal Waiting',
    category: 'support',
    requiresAuth: true,
    requiresJob: true,
    roles: ['pal']
  },

  // Item management
  'item-edit': {
    id: 'item-edit',
    title: 'Edit Item',
    category: 'main',
    requiresAuth: true,
    requiresJob: true
  },

  'post-delivery-edit': {
    id: 'post-delivery-edit',
    title: 'Post Delivery Edit',
    category: 'main',
    requiresAuth: true,
    requiresJob: true
  },

  // Proxy specific screens
  'proxy-to-receiver-handover': {
    id: 'proxy-to-receiver-handover',
    title: 'Proxy to Receiver Handover',
    category: 'proxy',
    requiresAuth: true,
    roles: ['proxy']
  },

  'proxy-item-scan': {
    id: 'proxy-item-scan',
    title: 'Proxy Item Scan',
    category: 'proxy',
    requiresAuth: true,
    roles: ['proxy']
  },

  // Favorite pal screens
  'favorite-pal-input': {
    id: 'favorite-pal-input',
    title: 'Favorite Pal Input',
    category: 'main',
    requiresAuth: true
  },

  'favorite-pal-confirmation': {
    id: 'favorite-pal-confirmation',
    title: 'Favorite Pal Confirmation',
    category: 'main',
    requiresAuth: true
  },

  'pal-acceptance-notification': {
    id: 'pal-acceptance-notification',
    title: 'Pal Acceptance Notification',
    category: 'main',
    requiresAuth: true
  },

  // History screens
  'sent-deliveries-history': {
    id: 'sent-deliveries-history',
    title: 'Sent Deliveries History',
    category: 'main',
    requiresAuth: true,
    roles: ['sender']
  },

  'received-deliveries': {
    id: 'received-deliveries',
    title: 'Received Deliveries',
    category: 'main',
    requiresAuth: true,
    roles: ['receiver']
  },

  'proxy-deliveries': {
    id: 'proxy-deliveries',
    title: 'Proxy Deliveries',
    category: 'main',
    requiresAuth: true,
    roles: ['proxy']
  },

  // Ratings
  'ratings': {
    id: 'ratings',
    title: 'Ratings',
    category: 'main',
    requiresAuth: true,
    requiresJob: true
  },

  // Website screens (for landing page)
  'website-home': {
    id: 'website-home',
    title: 'Website Home',
    category: 'main',
    requiresAuth: false
  },

  // Legacy screens (for backward compatibility)
  'bids': {
    id: 'bids',
    title: 'Bids (Legacy)',
    category: 'main',
    requiresAuth: true
  },

  // Website screens
//   'website-home': {
//     id: 'website-home',
//     title: 'Prawnbox - Home',
//     category: 'main',
//     requiresAuth: false
//   },

  'website-about': {
    id: 'website-about',
    title: 'About Us',
    category: 'main',
    requiresAuth: false
  },

  'website-how-it-works': {
    id: 'website-how-it-works',
    title: 'How It Works',
    category: 'main',
    requiresAuth: false
  },

  'website-pricing': {
    id: 'website-pricing',
    title: 'Pricing',
    category: 'main',
    requiresAuth: false
  },

  'website-safety': {
    id: 'website-safety',
    title: 'Safety & Security',
    category: 'main',
    requiresAuth: false
  },

  'website-faqs': {
    id: 'website-faqs',
    title: 'FAQs',
    category: 'main',
    requiresAuth: false
  },

  'website-contact': {
    id: 'website-contact',
    title: 'Contact Us',
    category: 'main',
    requiresAuth: false
  },

  'website-terms': {
    id: 'website-terms',
    title: 'Terms of Service',
    category: 'main',
    requiresAuth: false
  },

  'website-privacy': {
    id: 'website-privacy',
    title: 'Privacy Policy',
    category: 'main',
    requiresAuth: false
  },

  'website-become-pal': {
    id: 'website-become-pal',
    title: 'Become a Pal',
    category: 'main',
    requiresAuth: false
  },

  'website-become-proxy': {
    id: 'website-become-proxy',
    title: 'Become a Proxy',
    category: 'main',
    requiresAuth: false
  },

  'website-send-items': {
    id: 'website-send-items',
    title: 'Send Items',
    category: 'main',
    requiresAuth: false
  },

  // Legacy screens
//   'bids': {
//     id: 'bids',
//     title: 'Bids (Legacy)',
//     category: 'main',
//     requiresAuth: true
//   },

  'post-delivery': {
    id: 'post-delivery',
    title: 'Post Delivery (Legacy)',
    category: 'main',
    requiresAuth: true
  },

  'onboarding': {
    id: 'onboarding',
    title: 'Onboarding',
    category: 'auth',
    requiresAuth: false
  },

  'escrow-payment': {
    id: 'escrow-payment',
    title: 'Escrow Payment',
    category: 'payment',
    requiresAuth: true
  },

  'bid-edit': {
    id: 'bid-edit',
    title: 'Edit Bid',
    category: 'pal',
    requiresAuth: true,
    roles: ['pal']
  },

  'delivery-completion': {
    id: 'delivery-completion',
    title: 'Delivery Completion',
    category: 'pal',
    requiresAuth: true,
    roles: ['pal']
  },

  'proxy-confirmation': {
    id: 'proxy-confirmation',
    title: 'Proxy Confirmation',
    category: 'proxy',
    requiresAuth: true,
    roles: ['proxy']
  },

  'proxy-acceptance-code': {
    id: 'proxy-acceptance-code',
    title: 'Proxy Acceptance Code',
    category: 'proxy',
    requiresAuth: true,
    roles: ['proxy']
  },

  'proxy-handover-directions': {
    id: 'proxy-handover-directions',
    title: 'Proxy Handover Directions',
    category: 'proxy',
    requiresAuth: true,
    roles: ['proxy']
  },
};

// Navigation utility functions
export const navigationUtils = {
  // Get screens available for a specific role
  getScreensForRole: (role: UserRole): Screen[] => {
    return Object.values(SCREEN_CONFIGS)
      .filter(config => !config.roles || config.roles.includes(role))
      .map(config => config.id);
  },

  // Check if screen requires authentication
  requiresAuth: (screen: Screen): boolean => {
    return SCREEN_CONFIGS[screen]?.requiresAuth || false;
  },

  // Check if screen requires a job context
  requiresJob: (screen: Screen): boolean => {
    return SCREEN_CONFIGS[screen]?.requiresJob || false;
  },

  // Get screen category
  getScreenCategory: (screen: Screen): string => {
    return SCREEN_CONFIGS[screen]?.category || 'main';
  },

  // Get all screens in a category
  getScreensInCategory: (category: ScreenConfig['category']): Screen[] => {
    return Object.values(SCREEN_CONFIGS)
      .filter(config => config.category === category)
      .map(config => config.id);
  },

  // Validate screen exists
  isValidScreen: (screen: string): screen is Screen => {
    return screen in SCREEN_CONFIGS;
  },

  // Get screen title
  getScreenTitle: (screen: Screen): string => {
    return SCREEN_CONFIGS[screen]?.title || screen;
  }
};

export default SCREEN_CONFIGS;
