import { DeliveryJob, ChatMessage, User } from '../types';

// 🔥 GENERATE REALISTIC CONVERSATION MESSAGES
export const generateConversationMessages = (job: DeliveryJob, user?: User | null): ChatMessage[] => {
  const now = new Date();
  const senderFirstName = job.senderName?.split(' ')[0] || 'Alex';
  const palFirstName = job.selectedPalName?.split(' ')[0] || 'Mike';
  const receiverFirstName = user?.firstName?.split(' ')[0] || 'Sarah';
  
  return [
    // Initial system message
    {
      id: `system-start-${Date.now()}`,
      threadId: `thread-${job.id || 'default'}`,
      senderId: 'system',
      senderName: 'System',
      senderRole: 'sender',
      message: `${senderFirstName} and ${palFirstName} are in this chat`,
      timestamp: new Date(now.getTime() - 45 * 60 * 1000).toISOString(), // 45 mins ago
      type: 'system',
      read: true
    },
    
    // Initial coordination between Sender and Pal
    {
      id: `msg-1-${Date.now()}`,
      threadId: `thread-${job.id || 'default'}`,
      senderId: job.senderId,
      senderName: senderFirstName,
      senderRole: 'sender',
      message: `Hi ${palFirstName}! Thanks for accepting the delivery. The package is a ${job.title.toLowerCase()}. I'll be available until 6 PM for pickup.`,
      timestamp: new Date(now.getTime() - 42 * 60 * 1000).toISOString(), // 42 mins ago
      type: 'text',
      read: true
    },
    
    {
      id: `msg-2-${Date.now()}`,
      threadId: `thread-${job.id || 'default'}`,
      senderId: job.selectedPalId || '',
      senderName: palFirstName,
      senderRole: 'pal',
      message: `Perfect ${senderFirstName}! I'm heading to ${job.pickupLocation} now. Should be there in about 15 minutes. Is the package ready?`,
      timestamp: new Date(now.getTime() - 40 * 60 * 1000).toISOString(), // 40 mins ago
      type: 'text',
      read: true
    },
    
    {
      id: `msg-3-${Date.now()}`,
      threadId: `thread-${job.id || 'default'}`,
      senderId: job.senderId,
      senderName: senderFirstName,
      senderRole: 'sender',
      message: `Yes, it's all packed and ready. It's in a brown box, fairly light. Please handle with care - it's quite valuable!`,
      timestamp: new Date(now.getTime() - 38 * 60 * 1000).toISOString(), // 38 mins ago
      type: 'text',
      read: true
    },
    
    // Pickup confirmation
    {
      id: `msg-4-${Date.now()}`,
      threadId: `thread-${job.id || 'default'}`,
      senderId: job.selectedPalId || '',
      senderName: palFirstName,
      senderRole: 'pal',
      message: `Just arrived at pickup location! I can see the building.`,
      timestamp: new Date(now.getTime() - 35 * 60 * 1000).toISOString(), // 35 mins ago
      type: 'text',
      read: true
    },
    
    {
      id: `msg-5-${Date.now()}`,
      threadId: `thread-${job.id || 'default'}`,
      senderId: job.selectedPalId || '',
      senderName: palFirstName,
      senderRole: 'pal',
      message: `Package collected successfully! ✅ Confirmed it matches the description. Now heading to ${job.dropoffLocation}`,
      timestamp: new Date(now.getTime() - 30 * 60 * 1000).toISOString(), // 30 mins ago
      type: 'text',
      read: true
    },
    
    {
      id: `msg-6-${Date.now()}`,
      threadId: `thread-${job.id || 'default'}`,
      senderId: job.senderId,
      senderName: senderFirstName,
      senderRole: 'sender',
      message: `Excellent! Thank you ${palFirstName}. Safe travels!`,
      timestamp: new Date(now.getTime() - 28 * 60 * 1000).toISOString(), // 28 mins ago
      type: 'text',
      read: true
    },
    
    // Transit updates
    {
      id: `msg-7-${Date.now()}`,
      threadId: `thread-${job.id || 'default'}`,
      senderId: job.selectedPalId || '',
      senderName: palFirstName,
      senderRole: 'pal',
      message: `Quick update: I'm about halfway there. Traffic is light so should arrive a bit earlier than expected! 🚗`,
      timestamp: new Date(now.getTime() - 20 * 60 * 1000).toISOString(), // 20 mins ago
      type: 'text',
      read: true
    },
    
    {
      id: `msg-8-${Date.now()}`,
      threadId: `thread-${job.id || 'default'}`,
      senderId: job.selectedPalId || '',
      senderName: palFirstName,
      senderRole: 'pal',
      message: `Hi ${receiverFirstName}! I'm ${palFirstName}, your delivery Pal. I'm currently en route with your package from ${senderFirstName}. ETA is about 10-15 minutes.`,
      timestamp: new Date(now.getTime() - 15 * 60 * 1000).toISOString(), // 15 mins ago
      type: 'text',
      read: true
    },
    
    // Receiver joins notification
    {
      id: `join-receiver-${Date.now()}`,
      threadId: `thread-${job.id || 'default'}`,
      senderId: 'system',
      senderName: 'System',
      senderRole: 'sender',
      message: `${receiverFirstName} has joined the chat`,
      timestamp: new Date(now.getTime() - 12 * 60 * 1000).toISOString(), // 12 mins ago
      type: 'system',
      read: true
    },
    
    // Recent conversation as Receiver joins
    {
      id: `msg-9-${Date.now()}`,
      threadId: `thread-${job.id || 'default'}`,
      senderId: user?._id || '',
      senderName: receiverFirstName,
      senderRole: 'receiver',
      message: `Hi everyone! Just saw the updates. ${palFirstName}, I'm at home and ready to receive the package. Should I wait downstairs or will you call when you arrive?`,
      timestamp: new Date(now.getTime() - 10 * 60 * 1000).toISOString(), // 10 mins ago
      type: 'text',
      read: true
    },
    
    {
      id: `msg-10-${Date.now()}`,
      threadId: `thread-${job.id || 'default'}`,
      senderId: job.selectedPalId || '',
      senderName: palFirstName,
      senderRole: 'pal',
      message: `Hi ${receiverFirstName}! Great to connect with you. I'll call you when I'm about 2 minutes away so you can come down. Just to confirm - ${job.dropoffLocation}, right?`,
      timestamp: new Date(now.getTime() - 8 * 60 * 1000).toISOString(), // 8 mins ago
      type: 'text',
      read: true
    },
    
    {
      id: `msg-11-${Date.now()}`,
      threadId: `thread-${job.id || 'default'}`,
      senderId: user?._id || '',
      senderName: receiverFirstName,
      senderRole: 'receiver',
      message: `Yes, that's correct! I'll be ready. Also, ${senderFirstName}, thank you so much for arranging this delivery! 😊`,
      timestamp: new Date(now.getTime() - 6 * 60 * 1000).toISOString(), // 6 mins ago
      type: 'text',
      read: true
    },
    
    {
      id: `msg-12-${Date.now()}`,
      threadId: `thread-${job.id || 'default'}`,
      senderId: job.senderId,
      senderName: senderFirstName,
      senderRole: 'sender',
      message: `You're very welcome ${receiverFirstName}! Hope you love it. ${palFirstName} is doing an amazing job with the delivery! 👍`,
      timestamp: new Date(now.getTime() - 4 * 60 * 1000).toISOString(), // 4 mins ago
      type: 'text',
      read: true
    },
    
    // Current delivery status
    {
      id: `msg-13-${Date.now()}`,
      threadId: `thread-${job.id || 'default'}`,
      senderId: job.selectedPalId || '',
      senderName: palFirstName,
      senderRole: 'pal',
      message: `Perfect! I'm just 5 minutes away now. The package is secure and in perfect condition. See you soon ${receiverFirstName}! 📦`,
      timestamp: new Date(now.getTime() - 2 * 60 * 1000).toISOString(), // 2 mins ago
      type: 'text',
      read: true
    }
  ];
};