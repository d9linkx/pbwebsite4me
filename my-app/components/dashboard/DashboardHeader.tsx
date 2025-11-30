import React from 'react';
import { Bell, Menu, X, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { UserRole, Screen, User, Notification } from '../../types';
import { ROLE_PRIORITIES } from '../../constants/dashboard';

interface DashboardHeaderProps {
  activeRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  onNotificationsClick: () => void;
  onMenuToggle: () => void;
  onProfileClick: () => void;
  onNavigate: (screen: Screen) => void;
  isMenuOpen: boolean;
  notifications?: Notification[];
  user?: User;
  currentScreen?: Screen;
  onAlertsClick?: () => void;
}

export function DashboardHeader({
  activeRole,
  onRoleChange,
  onNotificationsClick,
  onMenuToggle,
  onProfileClick,
  onNavigate,
  isMenuOpen,
  notifications = [],
  user,
  currentScreen,
  onAlertsClick
}: DashboardHeaderProps) {
  const handleRoleButtonClick = (role: UserRole) => {
    return (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      onRoleChange(role);
    };
  };

  const getRoleDisplayLabel = (role: UserRole): string => {
    const roleLabels: Record<UserRole, string> = {
      'sender': 'Send',
      'pal': 'Deliver',
      'receiver': 'Receive',
      'proxy': 'Proxy'
    };
    return roleLabels[role];
  };

  const getUrgentNotificationsCount = () => {
    return notifications.filter(n =>
      !n.read &&
      (n.category === 'alert' ||
        n.priority === 'urgent' ||
        n.actionRequired ||
        n.type === 'bid-placed' ||
        n.type === 'delivery-assigned' ||
        n.type === 'item-edit-request' ||
        n.type === 'dispute-flagged' ||
        n.type === 'delivery-update')
    ).length;
  };

  const getNormalNotificationsCount = () => {
    return notifications.filter(n =>
      !n.read &&
      (n.category === 'general' ||
        ((!n.category && !n.priority) || n.priority === 'low') &&
        !n.actionRequired) &&
      (n.type === 'promo-offer' ||
        n.type === 'system-message' ||
        n.type === 'rating-received' ||
        n.type === 'payment-received' ||
        n.type === 'delivery-completed')
    ).length;
  };

  const shouldShowRoleSwitcher = currentScreen === 'dashboard' || currentScreen === 'notifications';

  return (
    <motion.div
      className="bg-[#2f2f2f] shadow-lg border-b border-white/10 p-4 lg:p-6 sticky top-0 z-40 w-full"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between w-full gap-4">
        {/* Logo and Brand */}
        <button
          onClick={() => onNavigate('dashboard')}
          className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200 flex-shrink-0"
        >
          <img src='/P-logo.png' alt="Prawnbox" className="w-10 h-10 object-contain" />
          <div>
            <h1 className="font-bold text-white text-lg">Prawnbox</h1>
          </div>
        </button>

        {/* Desktop Role Switcher - Only visible on desktop when on dashboard/notifications */}
        {shouldShowRoleSwitcher && (
          <div className="hidden xl:flex flex-1 max-w-md mx-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-1 w-full border border-white/20">
              <div className="grid grid-cols-4 gap-1">
                {ROLE_PRIORITIES.map((role, index) => (
                  <motion.button
                    key={role}
                    onClick={handleRoleButtonClick(role)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 capitalize text-center ${activeRole === role
                        ? 'bg-[#f44708] text-white shadow-lg'
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                      }`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {getRoleDisplayLabel(role)}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Header Action Buttons */}
        <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
          {/* User Profile Button */}
          

          {/* Time-Sensitive Alerts Button */}
          {onAlertsClick && getUrgentNotificationsCount() > 0 && (
            <motion.button
              onClick={onAlertsClick}
              className="relative w-10 h-10 sm:w-12 sm:h-12 bg-red-500/20 hover:bg-red-500/30 rounded-xl border border-red-500/40 flex items-center justify-center transition-all duration-200 animate-pulse"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Zap size={18} className="text-red-400 sm:w-5 sm:h-5" />
              <div className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-red-500 rounded-full flex items-center justify-center shadow-lg border-2 border-[#2f2f2f]">
                <span className="text-white font-bold text-xs">
                  {getUrgentNotificationsCount() > 9 ? '9+' : getUrgentNotificationsCount()}
                </span>
              </div>
            </motion.button>
          )}

          {/* General Notifications Button */}
          <motion.button
            onClick={onNotificationsClick}
            className="relative w-10 h-10 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-xl border border-white/20 flex items-center justify-center transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Bell size={18} className="text-white sm:w-5 sm:h-5" />
            {(() => {
              const normalCount = getNormalNotificationsCount();
              return normalCount > 0 ? (
                <div className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-[#f44708] rounded-full flex items-center justify-center shadow-lg border-2 border-[#2f2f2f]">
                  <span className="text-white font-bold text-xs">
                    {normalCount > 9 ? '9+' : normalCount}
                  </span>
                </div>
              ) : null;
            })()}
          </motion.button>

          <motion.button
            onClick={onProfileClick}
            className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-xl border border-white/20 flex items-center justify-center transition-all duration-200 overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {user?.profileImage ? (
              <img
                src={user.profileImage}
                alt={user.fullName || 'Profile'}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-7 h-7 rounded-full bg-[#f44708] text-white flex items-center justify-center">
                <span className="text-xs font-bold">
                  {user?.name ? user.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2) : 'U'}
                </span>
              </div>
            )}
          </motion.button>

          {/* Hamburger Menu Button - Hidden on desktop (xl and above) */}
          <motion.button
            onClick={onMenuToggle}
            className="xl:hidden w-10 h-10 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-xl border border-white/20 flex items-center justify-center transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isMenuOpen ? (
              <X size={18} className="text-white sm:w-5 sm:h-5" />
            ) : (
              <Menu size={18} className="text-white sm:w-5 sm:h-5" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Role Switcher - Below header on mobile/tablet only */}
      {shouldShowRoleSwitcher && (
        <motion.div
          className="xl:hidden mt-4 pt-4 border-t border-white/10"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-1 w-full border border-white/20">
            <div className="grid grid-cols-4 gap-1">
              {ROLE_PRIORITIES.map((role, index) => (
                <motion.button
                  key={role}
                  onClick={handleRoleButtonClick(role)}
                  className={`px-3 py-3 sm:py-4 rounded-lg text-sm sm:text-base font-medium transition-all duration-200 capitalize text-center ${activeRole === role
                      ? 'bg-[#f44708] text-white shadow-lg'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {getRoleDisplayLabel(role)}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}