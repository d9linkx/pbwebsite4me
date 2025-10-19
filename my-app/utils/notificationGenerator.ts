import { UserRole, Notification } from '../types';

// 🔥 GENERATE MOCK NOTIFICATIONS FOR ALL USER ROLES
export const generateMockNotifications = (role: UserRole, userId: string): Notification[] => {
  const now = new Date();
  const notifications: Notification[] = [];

  // Common notifications for all roles
  notifications.push(
    {
      id: 'notif-welcome-1',
      userId,
      type: 'system-message',
      title: 'Welcome to Prawnbox! 🎉',
      message: 'Your account has been successfully created. Start by exploring the dashboard or creating your first delivery.',
      timestamp: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      read: false,
      actionRequired: false,
      category: 'general',
      priority: 'low'
    },
    {
      id: 'notif-promo-1',
      userId,
      type: 'promo-offer',
      title: 'Special Promo: 20% Off Your Next 5 Deliveries! 🎁',
      message: 'Use code PRAWN20 for your next deliveries and save big. Valid until the end of this month!',
      timestamp: new Date(now.getTime() - 3 * 60 * 60 * 1000).toISOString(),
      read: false,
      actionRequired: false,
      category: 'general',
      priority: 'low',
      metadata: { promoCode: 'PRAWN20', discountPercent: 20 }
    }
  );

  // Role-specific notifications
  if (role === 'sender') {
    notifications.push(
      // CRITICAL: Item edit request notification - ALERT
      {
        id: 'notif-edit-request-1',
        userId,
        type: 'item-edit-request',
        title: 'Pal Needs Item Description Update 📝',
        message: 'Your Pal Mike Johnson has requested that you update the item description for your Wedding Dress Package delivery to help with verification.',
        timestamp: new Date(now.getTime() - 30 * 60 * 1000).toISOString(),
        read: false,
        actionRequired: true,
        category: 'alert',
        priority: 'urgent',
        jobId: '2',
        metadata: { 
          palName: 'Mike Johnson', 
          editReason: 'Item description needs more specific details for verification',
          jobTitle: 'Wedding Dress Package'
        }
      },
      {
        id: 'notif-bid-placed-1',
        userId,
        type: 'bid-placed',
        title: 'New Bid Received! 💰',
        message: 'Sarah Williams placed a bid of ₦8,500 for your Electronics Package delivery. Review and accept now.',
        timestamp: new Date(now.getTime() - 1 * 60 * 60 * 1000).toISOString(),
        read: false,
        actionRequired: true,
        category: 'alert',
        priority: 'urgent',
        jobId: '7',
        metadata: { amount: 8500, bidderName: 'Sarah Williams' }
      },
      {
        id: 'notif-delivery-completed-1',
        userId,
        type: 'delivery-completed',
        title: 'Delivery Completed Successfully! ✅',
        message: 'Your Anniversary Gift Box has been delivered to Jane Smith. Please rate your Pal experience.',
        timestamp: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(),
        read: true,
        actionRequired: false,
        category: 'general',
        priority: 'normal',
        jobId: '4'
      },
      {
        id: 'notif-payment-1',
        userId,
        type: 'payment-received',
        title: 'Escrow Released 💳',
        message: 'Payment of ₦25,000 has been released from escrow for your completed delivery.',
        timestamp: new Date(now.getTime() - 6 * 60 * 60 * 1000).toISOString(),
        read: true,
        actionRequired: false,
        category: 'general',
        priority: 'normal',
        metadata: { amount: 25000 }
      },
      {
        id: 'notif-badge-sender-1',
        userId,
        type: 'system-message',
        title: 'You\'ve Earned a New Badge: Trusted Sender 🏅',
        message: 'Congratulations! You\'ve completed 10 successful deliveries with excellent ratings. Keep up the great work!',
        timestamp: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        read: true,
        actionRequired: false,
        category: 'general',
        priority: 'low'
      },
      {
        id: 'notif-partners-1',
        userId,
        type: 'system-message',
        title: 'New Delivery Partners Available! 🚗',
        message: 'Great news! New delivery partners are now available in your area with faster delivery times.',
        timestamp: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        read: true,
        actionRequired: false,
        category: 'general',
        priority: 'low'
      }
    );
  } else if (role === 'pal') {
    notifications.push(
      {
        id: 'notif-job-assigned-1',
        userId,
        type: 'delivery-assigned',
        title: 'Sender Accepted Your Bid! 📦',
        message: 'You\'ve been assigned to deliver an Electronics Package. Click to proceed to pickup from Victoria Island by 2 PM today.',
        timestamp: new Date(now.getTime() - 45 * 60 * 1000).toISOString(),
        read: false,
        actionRequired: true,
        category: 'alert',
        priority: 'urgent',
        jobId: '7',
        metadata: { pickupLocation: 'Victoria Island, Lagos' }
      },
      {
        id: 'notif-payment-2',
        userId,
        type: 'payment-received',
        title: 'Payment Received! 💰',
        message: 'You earned ₦12,000 for completing the Anniversary Gift Box delivery. Funds added to your wallet.',
        timestamp: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(),
        read: false,
        actionRequired: false,
        category: 'general',
        priority: 'normal',
        metadata: { amount: 12000 }
      },
      {
        id: 'notif-rating-1',
        userId,
        type: 'rating-received',
        title: 'You Received a 5-Star Rating! ⭐',
        message: 'John Adamu rated your delivery service 5 stars with the comment: "Excellent service, very professional!"',
        timestamp: new Date(now.getTime() - 4 * 60 * 60 * 1000).toISOString(),
        read: true,
        actionRequired: false,
        category: 'general',
        priority: 'normal',
        jobId: '3'
      },
      {
        id: 'notif-bonus-1',
        userId,
        type: 'payment-received',
        title: 'Weekly Performance Bonus! 🏆',
        message: 'Congratulations! You earned ₦5,000 bonus for completing 10+ deliveries this week with 4.8+ rating.',
        timestamp: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        read: true,
        actionRequired: false,
        category: 'general',
        priority: 'low',
        metadata: { amount: 5000, bonusType: 'performance' }
      },
      {
        id: 'notif-maintenance-1',
        userId,
        type: 'system-message',
        title: 'System Maintenance Scheduled 🔧',
        message: 'System maintenance scheduled for tonight from 2 AM - 4 AM. Service may be temporarily unavailable.',
        timestamp: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        read: true,
        actionRequired: false,
        category: 'general',
        priority: 'normal'
      }
    );
  } else if (role === 'receiver') {
    notifications.push(
      {
        id: 'notif-delivery-coming-1',
        userId,
        type: 'delivery-update',
        title: 'Your Delivery is En Route! 🚗',
        message: 'Mike Johnson is 5 minutes away with your package. Estimated arrival: 20 mins. He\'ll call when he arrives at your location.',
        timestamp: new Date(now.getTime() - 10 * 60 * 1000).toISOString(),
        read: false,
        actionRequired: false,
        category: 'alert',
        priority: 'urgent',
        jobId: '8',
        metadata: { palName: 'Mike Johnson', eta: '5 minutes' }
      },
      {
        id: 'notif-delivery-completed-2',
        userId,
        type: 'delivery-completed',
        title: 'Package Delivered! 📦',
        message: 'Your Medical Documents have been successfully delivered. Thank you for using Prawnbox!',
        timestamp: new Date(now.getTime() - 3 * 60 * 60 * 1000).toISOString(),
        read: true,
        actionRequired: false,
        category: 'general',
        priority: 'normal',
        jobId: '3'
      },
      {
        id: 'notif-tip-reminder-1',
        userId,
        type: 'system-message',
        title: 'Consider Tipping Your Pal 💝',
        message: 'Your delivery was completed perfectly! Consider leaving a tip for Mike Johnson to show your appreciation.',
        timestamp: new Date(now.getTime() - 5 * 60 * 60 * 1000).toISOString(),
        read: true,
        actionRequired: false,
        category: 'general',
        priority: 'low',
        jobId: '8'
      }
    );
  } else if (role === 'proxy') {
    notifications.push(
      {
        id: 'notif-item-stored-1',
        userId,
        type: 'delivery-update',
        title: 'Receiver Unavailable - Item Stored 📥',
        message: 'A Jewelry Package has been dropped off at your location. Receiver unavailable. Please confirm holding address.',
        timestamp: new Date(now.getTime() - 1 * 60 * 60 * 1000).toISOString(),
        read: false,
        actionRequired: true,
        category: 'alert',
        priority: 'urgent',
        metadata: { itemType: 'Jewelry Package', storageTime: '24 hours' }
      },
      {
        id: 'notif-storage-fee-1',
        userId,
        type: 'payment-received',
        title: 'Storage Fee Earned! 💰',
        message: 'You earned ₦2,000 for 4 days of storage service for a Jewelry Package. Great job!',
        timestamp: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(),
        read: true,
        actionRequired: false,
        category: 'general',
        priority: 'normal',
        metadata: { amount: 2000, storageDays: 4 }
      },
      {
        id: 'notif-pickup-reminder-1',
        userId,
        type: 'system-message',
        title: 'Pickup Reminder 📅',
        message: 'The Electronics package stored 2 days ago is scheduled for pickup today between 2-4 PM.',
        timestamp: new Date(now.getTime() - 4 * 60 * 60 * 1000).toISOString(),
        read: true,
        actionRequired: false,
        category: 'general',
        priority: 'normal'
      }
    );
  }

  return notifications.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};