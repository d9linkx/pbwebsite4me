/**
 * WhatsApp Notification Fallback System
 * Sends critical alert notifications via WhatsApp when users are offline on the app
 */

import { Notification } from '../types';

// WhatsApp API Configuration (Using Twilio WhatsApp API)
const WHATSAPP_CONFIG = { // eslint-disable-line @typescript-eslint/no-unused-vars
  // In production, these would come from environment variables
  accountSid: 'YOUR_TWILIO_ACCOUNT_SID',
  authToken: 'YOUR_TWILIO_AUTH_TOKEN',
  fromNumber: 'whatsapp:+14155238886', // Twilio WhatsApp Sandbox number
  apiUrl: 'https://api.twilio.com/2010-04-01/Accounts'
};

/**
 * Format Nigerian phone number for WhatsApp
 * Converts various formats to international format: +234XXXXXXXXXX
 */
export const formatWhatsAppNumber = (phoneNumber: string): string => {
  // Remove all non-numeric characters
  let cleaned = phoneNumber.replace(/\D/g, '');
  
  // Handle different Nigerian number formats
  if (cleaned.startsWith('0')) {
    // Convert 0803... to 234803...
    cleaned = '234' + cleaned.substring(1);
  } else if (cleaned.startsWith('234')) {
    // Already in correct format
    cleaned = cleaned;
  } else if (cleaned.length === 10) {
    // Assume it's a local number without country code
    cleaned = '234' + cleaned;
  }
  
  return `whatsapp:+${cleaned}`;
};

/**
 * Format notification message for WhatsApp
 * Creates a clean, readable message format
 */
export const formatWhatsAppMessage = (notification: Notification): string => {
  const emoji = getNotificationEmoji(notification.type);
  const priority = notification.priority === 'urgent' ? '🚨 URGENT' : '⚠️ ALERT';
  
  let message = `${priority} ${emoji}\n\n`;
  message += `*${notification.title}*\n\n`;
  message += `${notification.message}\n\n`;
  
  // Add metadata if available
  if (notification.metadata) {
    if (notification.metadata.amount) {
      message += `💰 Amount: ₦${notification.metadata.amount.toLocaleString()}\n`;
    }
    if (notification.metadata.palName) {
      message += `👤 Pal: ${notification.metadata.palName}\n`;
    }
    if (notification.metadata.jobTitle) {
      message += `📦 Delivery: ${notification.metadata.jobTitle}\n`;
    }
  }
  
  message += `\n⏰ ${new Date(notification.timestamp).toLocaleString('en-NG', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })}`;
  
  message += `\n\n📱 Open Prawnbox app to take action`;
  
  return message;
};

/**
 * Get appropriate emoji for notification type
 */
const getNotificationEmoji = (type: string): string => {
  const emojiMap: { [key: string]: string } = {
    'bid-placed': '💰',
    'delivery-assigned': '📦',
    'delivery-update': '🚚',
    'item-edit-request': '📝',
    'dispute-flagged': '⚠️',
    'payment-received': '💳',
    'delivery-completed': '✅',
    'rating-received': '⭐',
    'system-message': '📢'
  };
  
  return emojiMap[type] || '🔔';
};

/**
 * Send WhatsApp notification using Twilio API
 * This is a mock implementation - in production, this would call the actual Twilio API
 */
export const sendWhatsAppNotification = async (
  phoneNumber: string,
  notification: Notification
): Promise<boolean> => {
  try {
    console.log('📱 WhatsApp Fallback: Sending notification via WhatsApp');
    console.log('📞 To:', phoneNumber);
    console.log('📝 Message:', notification.title);
    
    const formattedNumber = formatWhatsAppNumber(phoneNumber);
    const message = formatWhatsAppMessage(notification);
    
    // MOCK IMPLEMENTATION - Replace with actual Twilio API call in production
    console.log('═══════════════════════════════════════════');
    console.log('📱 WHATSAPP MESSAGE (MOCK)');
    console.log('═══════════════════════════════════════════');
    console.log('To:', formattedNumber);
    console.log('─────────────���─────────────────────────────');
    console.log(message);
    console.log('═══════════════════════════════════════════');
    
    // In production, uncomment and configure:
    /*
    const response = await fetch(
      `${WHATSAPP_CONFIG.apiUrl}/${WHATSAPP_CONFIG.accountSid}/Messages.json`,
      {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + btoa(`${WHATSAPP_CONFIG.accountSid}:${WHATSAPP_CONFIG.authToken}`),
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          From: WHATSAPP_CONFIG.fromNumber,
          To: formattedNumber,
          Body: message
        })
      }
    );
    
    if (!response.ok) {
      throw new Error(`WhatsApp API error: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('✅ WhatsApp notification sent successfully:', data.sid);
    */
    
    // Mock success
    await new Promise(resolve => setTimeout(resolve, 100));
    console.log('✅ WhatsApp notification sent successfully (MOCK)');
    
    return true;
  } catch (error) {
    console.error('❌ WhatsApp notification failed:', error);
    // Don't throw - we don't want WhatsApp failures to break the app
    return false;
  }
};

/**
 * Determine if notification should be sent via WhatsApp
 * Only send alerts (actionRequired or high priority)
 */
export const shouldSendWhatsApp = (notification: Notification): boolean => {
  // Only send alerts, not general notifications
  const isAlert = notification.actionRequired || 
                  notification.priority === 'urgent' || 
                  notification.priority === 'high';
  
  // Don't send for system messages or promo offers
  const shouldSkip = notification.type === 'system-message' || 
                     notification.type === 'promo-offer';
  
  return isAlert && !shouldSkip;
};

/**
 * Send notification with WhatsApp fallback
 * Main function to be called when creating notifications
 */
export const sendNotificationWithWhatsAppFallback = async (
  notification: Notification,
  userPhone: string | undefined
): Promise<void> => {
  // Check if WhatsApp should be sent
  if (!shouldSendWhatsApp(notification)) {
    console.log('📱 WhatsApp Fallback: Skipping (not an alert notification)');
    return;
  }
  
  // Check if user has a phone number
  if (!userPhone) {
    console.warn('📱 WhatsApp Fallback: No phone number available for user');
    return;
  }
  
  // Send WhatsApp notification asynchronously (don't block)
  setTimeout(async () => {
    try {
      await sendWhatsAppNotification(userPhone, notification);
    } catch (error) {
      console.error('📱 WhatsApp Fallback: Failed to send', error);
    }
  }, 0);
};

/**
 * Batch send WhatsApp notifications
 * For sending multiple notifications at once
 */
export const sendBatchWhatsAppNotifications = async (
  notifications: Array<{ notification: Notification; userPhone: string }>
): Promise<void> => {
  console.log(`📱 WhatsApp Fallback: Sending ${notifications.length} notifications`);
  
  for (const { notification, userPhone } of notifications) {
    await sendNotificationWithWhatsAppFallback(notification, userPhone);
    // Add small delay between messages to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 200));
  }
};
