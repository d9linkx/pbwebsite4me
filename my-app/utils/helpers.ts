import { User, UserRole, DeliveryJob, Notification } from '../types';

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatPhoneNumber = (phoneNumber: string): string => {
  return phoneNumber.startsWith('+234') ? phoneNumber : `+234${phoneNumber.substring(1)}`;
};

export const getUserJobs = (userId: string, userRole: UserRole, deliveryJobs: DeliveryJob[]): DeliveryJob[] => {
  switch (userRole) {
    case 'sender':
      return deliveryJobs.filter(job => job.senderId === userId);
    case 'pal':
      return deliveryJobs.filter(job => job.selectedPalId === userId);
    case 'receiver':
      return deliveryJobs.filter(job => job.receiverId === userId);
    case 'proxy':
      return deliveryJobs.filter(job => job.proxyId === userId);
    default:
      return [];
  }
};

export const enhanceUserWithDefaults = (userData: User): User => {
  return {
    ...userData,
    walletBalance: userData.walletBalance ?? 25000,
    totalDeliveries: userData.totalDeliveries ?? 12,
    rating: userData.rating ?? 4.8,
    isVerified: userData.isVerified ?? true,
    vehicleType: userData.vehicleType || (userData.role === 'pal' ? 'car' : undefined),
    // address: userData.address || 'Lagos, Nigeria',
    preferences: userData.preferences || {
      notifications: {
        push: true,
        email: true,
        sms: false
      },
      privacy: {
        shareLocation: false,
        shareProfile: false
      },
      delivery: {
        autoAcceptRadius: 5,
        preferredVehicles: ['car']
      },
      emailUpdate: true,
      smsUpdate: false
    }
  };
};

// 🔥 NOTIFICATION TYPE TO ROLE MAPPING
const notificationTypeToRoles: Record<Notification['type'], UserRole[]> = {
  // Sender-specific notifications
  'package-created': ['sender'],
  'package-update': ['sender'],
  'item-edit-request': ['sender'],
  'bid-placed': ['sender'],
  'bid_accepted': ['sender'], // Add bid_accepted for sender (matches server schema)
  'bid-rejected': ['sender'],
  'dispute-flagged': ['sender'],

  // Pal-specific notifications
  'delivery-assigned': ['pal'],
  'rating-received': ['pal'],
  'item-verified': ['pal'],

  // Receiver-specific notifications
  'delivery-update': ['receiver', 'pal'],
  'delivery-picked-up': ['receiver', 'sender'],

  // Shared notifications
  'delivery-completed': ['sender', 'receiver', 'pal'],
  'payment-received': ['sender', 'pal', 'receiver', 'proxy'],
  'wallet-topup': ['sender', 'pal', 'receiver', 'proxy'],

  // Additional notification types
  'delivery-posted': ['sender', 'pal', 'receiver'], // When a new delivery is posted
  'payment-processed': ['sender', 'pal', 'receiver', 'proxy'], // When payment is processed
  'tip-payment': ['pal'], // When a tip is received

  // Universal notifications
  'system-message': ['sender', 'pal', 'receiver', 'proxy'],
  'promo-offer': ['sender', 'pal', 'receiver', 'proxy']
};

// Helper function to filter notifications by active role
export const filterNotificationsByRole = (notifications: Notification[], activeRole: UserRole): Notification[] => {
  return notifications.filter(notification => {
    const allowedRoles = notificationTypeToRoles[notification.type];
    return allowedRoles?.includes(activeRole) || false;
  });
};

// Helper function to get unread notification count for a specific role
export const getUnreadNotificationCountForRole = (notifications: Notification[], activeRole: UserRole): number => {
  const roleNotifications = filterNotificationsByRole(notifications, activeRole);
  return roleNotifications.filter(n => !n.read).length;
};