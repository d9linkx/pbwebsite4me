'use client'
import React, { useState } from 'react';
import { ArrowLeft, Bell, Package, DollarSign, MessageCircle, Star, Gift, AlertCircle, CheckCircle, Edit3, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { User, Notification, UserRole, Screen } from '../types';
import { filterNotificationsByRole } from '../utils/helpers';

interface NotificationsScreenProps {
  user: User | null;
  notifications: Notification[];
  activeRole: UserRole;
  onBack: () => void;
  onNavigate: (screen: Screen) => void;
  onMarkAsRead: (notificationId: string) => void;
  onMarkAllAsRead: () => void;
  onNotificationAction: (notification: Notification) => void;
  initialTab?: 'alerts' | 'general';
}

type TabType = 'alerts' | 'general';

export function NotificationsScreen({ 
  user, 
  notifications, 
  activeRole,
  onBack, 
  onNavigate,
  onMarkAsRead,
  onMarkAllAsRead,
  onNotificationAction,
  initialTab = 'alerts'
}: NotificationsScreenProps) {
  const [activeTab, setActiveTab] = useState<TabType>(initialTab);

  const filteredNotifications = filterNotificationsByRole(notifications, activeRole);

  const alertNotifications = filteredNotifications.filter(n => 
    n.category === 'alert' ||
    n.priority === 'urgent' ||
    n.actionRequired ||
    ['bid-placed', 'delivery-assigned', 'item-edit-request', 'dispute-flagged', 'delivery-update'].includes(n.type)
  );

  const generalNotifications = filteredNotifications.filter(n => 
    n.category === 'general' ||
    ((!n.category && !n.priority) || n.priority === 'low' || n.priority === 'normal') &&
    !n.actionRequired &&
    ['promo-offer', 'system-message', 'rating-received', 'payment-received', 'delivery-completed', 'payment-processed', 'wallet-topup', 'delivery-posted'].includes(n.type)
  );

  const currentNotifications = activeTab === 'alerts' ? alertNotifications : generalNotifications;
  const totalUnreadAlerts = alertNotifications.filter(n => !n.read).length;
  const totalUnreadGeneral = generalNotifications.filter(n => !n.read).length;

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    if (diffInMinutes < 10080) return `${Math.floor(diffInMinutes / 1440)}d ago`;
    return date.toLocaleDateString();
  };

  const getNotificationIcon = (type: string, actionRequired?: boolean) => {
    const iconProps = { 
      size: 20, 
      className: actionRequired ? 'text-[#f44708]' : 'text-white'
    };

    switch (type) {
      case 'delivery-update':
      case 'delivery-assigned':
      case 'delivery-completed':
        return <Package {...iconProps} />;
      case 'payment-received':
      case 'wallet-topup':
      case 'payment-processed':
        return <DollarSign {...iconProps} />;
      case 'bid-placed':
        return <MessageCircle {...iconProps} />;
      case 'dispute-flagged':
        return <AlertCircle {...iconProps} />;
      case 'item-edit-request':
        return <Edit3 {...iconProps} />;
      case 'item-verified':
        return <CheckCircle {...iconProps} />;
      case 'rating-received':
        return <Star {...iconProps} />;
      case 'promo-offer':
        return <Gift {...iconProps} />;
      default:
        return <Bell {...iconProps} />;
    }
  };

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.read) {
      onMarkAsRead(notification.id);
    }
    onNotificationAction(notification);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#2f2f2f] via-[#1a1a1a] to-[#2f2f2f] pt-safe-top pb-safe-bottom">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#f44708] rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#f44708] rounded-full opacity-10 blur-3xl"></div>
      </div>

      {/* Header */}
      <motion.div 
        className="bg-[#2f2f2f] border-b border-white/10 sticky top-0 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <motion.button
              onClick={onBack}
              className="p-2 hover:bg-white/10 rounded-xl transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft size={20} className="text-white" />
            </motion.button>
            <div>
              <h1 className="text-xl text-white">Notifications</h1>
              <p className="text-sm text-gray-400">Stay updated</p>
            </div>
          </div>

          {currentNotifications.filter(n => !n.read).length > 0 && (
            <motion.button
              onClick={onMarkAllAsRead}
              className="text-sm text-[#f44708] hover:text-[#ff5722] transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Mark all read
            </motion.button>
          )}
        </div>

        {/* Tabs */}
        <div className="flex px-4 pb-2">
          <motion.button
            onClick={() => setActiveTab('alerts')}
            className={`flex-1 py-3 rounded-xl font-medium transition-all duration-300 relative flex items-center justify-center ${
              activeTab === 'alerts' 
                ? 'bg-[#f44708] text-white' 
                : 'bg-white/10 text-gray-400 hover:bg-white/15'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Alerts</span>
            {totalUnreadAlerts > 0 && (
              <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs font-bold bg-white text-[#f44708] rounded-full">
                {totalUnreadAlerts}
              </span>
            )}
          </motion.button>
          <div className="w-2"></div>
          <motion.button
            onClick={() => setActiveTab('general')}
            className={`flex-1 py-3 rounded-xl font-medium transition-all duration-300 relative flex items-center justify-center ${
              activeTab === 'general' 
                ? 'bg-[#f44708] text-white' 
                : 'bg-white/10 text-gray-400 hover:bg-white/15'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>General</span>
            {totalUnreadGeneral > 0 && (
              <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs font-bold bg-white text-[#f44708] rounded-full">
                {totalUnreadGeneral}
              </span>
            )}
          </motion.button>
        </div>
      </motion.div>

      {/* Notifications List */}
      <div className="w-full px-4 py-4 space-y-3 relative z-10">
        {currentNotifications.length === 0 ? (
          <motion.div 
            className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-12 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Bell size={48} className="text-gray-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">No {activeTab} notifications</h3>
            <p className="text-gray-400">You&apos;re all caught up!</p>
          </motion.div>
        ) : (
          currentNotifications.map((notification, index) => (
            <motion.div
              key={notification.id}
              className={`bg-white/10 backdrop-blur-sm border ${
                !notification.read 
                  ? 'border-[#f44708]/40 bg-[#f44708]/10' 
                  : 'border-white/20'
              } rounded-xl p-4 cursor-pointer hover:bg-white/15 transition-all duration-300`}
              onClick={() => handleNotificationClick(notification)}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex space-x-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  notification.actionRequired 
                    ? 'bg-[#f44708]/20' 
                    : 'bg-white/10'
                }`}>
                  {getNotificationIcon(notification.type, notification.actionRequired)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-semibold text-white">{notification.title}</h3>
                    <span className="text-xs text-gray-400 whitespace-nowrap ml-2">
                      {formatTimestamp(notification.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-300 mb-2">{notification.message}</p>
                  {notification.actionRequired && (
                    <div className="inline-flex items-center space-x-2 bg-[#f44708]/20 px-3 py-1 rounded-full">
                      <Zap size={14} className="text-[#f44708]" />
                      <span className="text-xs font-medium text-[#f44708]">Action Required</span>
                    </div>
                  )}
                </div>
              </div>
              {!notification.read && (
                <div className="absolute top-4 right-4 w-2 h-2 bg-[#f44708] rounded-full"></div>
              )}
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
