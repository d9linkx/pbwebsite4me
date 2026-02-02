import React from "react";
import { Bell, Menu, X, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { UserRole, Notification } from "@/types";
import { ROLE_PRIORITIES } from "@/constants/dashboard";
import { ROUTES } from "@/lib/routes";
import Image from "next/image";
import { User, UserMode } from "@/types/user";

interface DashboardHeaderProps {
  activeMode: UserMode;
  onModeChange: (mode: UserMode) => void;
  onNotificationsClick: () => void;
  onMenuToggle: () => void;
  onProfileClick: () => void;
  onNavigate: (route: string) => void;
  isMenuOpen: boolean;
  notifications?: Notification[];
  user?: User;
  currentPath: string;
  onAlertsClick?: () => void;
}

export function DashboardHeader({
  activeMode,
  onModeChange,
  onNotificationsClick,
  onMenuToggle,
  onProfileClick,
  onNavigate,
  isMenuOpen,
  notifications = [],
  user,
  currentPath,
  onAlertsClick,
}: DashboardHeaderProps) {
  const getModeDisplayLabel = (mode: UserMode): string => {
    const modeLabels: Record<UserMode, string> = {
      receiver: "Receive",
      sender: "Send",
      pal: "Deliver",
      proxy: "Proxy",
    };
    return modeLabels[mode];
  };

  const getUrgentNotificationsCount = () => {
    return notifications.filter(
      (n) =>
        !n.read &&
        (n.category === "alert" ||
          n.priority === "urgent" ||
          n.actionRequired ||
          n.type === "bid-placed" ||
          n.type === "delivery-assigned" ||
          n.type === "item-edit-request" ||
          n.type === "dispute-flagged" ||
          n.type === "delivery-update"),
    ).length;
  };

  const getNormalNotificationsCount = () => {
    return notifications.filter(
      (n) =>
        !n.read &&
        (n.category === "general" ||
          (((!n.category && !n.priority) || n.priority === "low") &&
            !n.actionRequired)) &&
        (n.type === "promo-offer" ||
          n.type === "system-message" ||
          n.type === "rating-received" ||
          n.type === "payment-received" ||
          n.type === "delivery-completed"),
    ).length;
  };

  const shouldShowRoleSwitcher =
    currentPath === ROUTES.DASHBOARD ||
    currentPath === ROUTES.NOTIFICATIONS ||
    currentPath === "/";

  return (
    <motion.div
      className="bg-dark shadow-lg border-b border-white/10 p-4 lg:p-6 sticky top-0 z-40 w-full"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between w-full gap-4">
        {/* Logo and Brand */}
        <button
          onClick={() => onNavigate(ROUTES.DASHBOARD)}
          className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200 flex-shrink-0"
        >
          <Image
            src="/P-logo.png"
            alt="Prawnbox"
            width={100}
            height={100}
            className="w-10 h-10 object-contain"
          />
          <div>
            <h1 className="font-bold text-white text-lg">Prawnbox</h1>
          </div>
        </button>

        {/* Desktop Role Switcher */}
        {shouldShowRoleSwitcher && (
          <div className="hidden xl:flex flex-1 max-w-md mx-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-1 w-full border border-white/20">
              <div className="grid grid-cols-4 gap-1">
                {ROLE_PRIORITIES.map((mode, index) => (
                  <motion.button
                    key={mode}
                    onClick={() => onModeChange(mode)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 capitalize text-center ${
                      activeMode === mode
                        ? "bg-primary text-white shadow-lg"
                        : "text-gray-300 hover:text-white hover:bg-white/10"
                    }`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {getModeDisplayLabel(mode)}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Header Action Buttons */}
        <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
          {/* Time-Sensitive Alerts */}
          {onAlertsClick && getUrgentNotificationsCount() > 0 && (
            <motion.button
              onClick={onAlertsClick}
              className="relative w-10 h-10 sm:w-12 sm:h-12 bg-red-500/20 hover:bg-red-500/30 rounded-xl border border-red-500/40 flex items-center justify-center transition-all duration-200 animate-pulse"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Zap size={18} className="text-red-400 sm:w-5 sm:h-5" />
              <div className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-red-500 rounded-full flex items-center justify-center shadow-lg border-2 border-dark">
                <span className="text-white font-bold text-xs">
                  {getUrgentNotificationsCount() > 9
                    ? "9+"
                    : getUrgentNotificationsCount()}
                </span>
              </div>
            </motion.button>
          )}

          {/* Notifications */}
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
                <div className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-primary rounded-full flex items-center justify-center shadow-lg border-2 border-dark">
                  <span className="text-white font-bold text-xs">
                    {normalCount > 9 ? "9+" : normalCount}
                  </span>
                </div>
              ) : null;
            })()}
          </motion.button>

          {/* Profile */}
          <motion.button
            onClick={onProfileClick}
            className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-xl border border-white/20 flex items-center justify-center transition-all duration-200 overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {user?.profileImage ? (
              <Image
                src={user.profileImage}
                alt={`${user.firstName} ${user.lastName}` || "Profile"}
                width={100}
                height={100}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center">
                <span className="text-xs font-bold">
                  {user?.firstName
                    ? user.firstName
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")
                        .toUpperCase()
                        .slice(0, 2)
                    : "U"}
                </span>
              </div>
            )}
          </motion.button>

          {/* Hamburger Menu */}
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

      {/* Mobile Mode Switcher */}
      {shouldShowRoleSwitcher && (
        <motion.div
          className="xl:hidden mt-4 pt-4 border-t border-white/10"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-1 w-full border border-white/20">
            <div className="grid grid-cols-4 gap-1">
              {ROLE_PRIORITIES.map((mode, index) => (
                <motion.button
                  key={mode}
                  onClick={() => onModeChange(mode)}
                  className={`px-3 py-3 sm:py-4 rounded-lg text-sm sm:text-base font-medium transition-all duration-200 capitalize text-center ${
                    activeMode === mode
                      ? "bg-primary text-white shadow-lg"
                      : "text-gray-300 hover:text-white hover:bg-white/10"
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {getModeDisplayLabel(mode)}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
