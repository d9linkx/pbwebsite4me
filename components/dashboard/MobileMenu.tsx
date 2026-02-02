"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Home,
  Wallet,
  Settings,
  Heart,
  Users,
  Plus,
  Zap,
  Mail,
  Store,
} from "lucide-react";
import { ROUTES } from "@/lib/routes";
import Image from "next/image";
import { User, UserMode } from "@/types/user";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  activeMode: UserMode;
  currentPath: string;
}

export function MobileMenu({
  isOpen,
  onClose,
  user,
  activeMode,
  currentPath,
}: MobileMenuProps) {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    onClose();
    router.push(path);
  };

  const isActive = (path: string) =>
    currentPath === path || currentPath.startsWith(path);

  const navItems = [
    {
      label: "Dashboard",
      icon: Home,
      path: ROUTES.DASHBOARD,
      color: "#f44708",
    },
    { label: "Wallet", icon: Wallet, path: ROUTES.WALLET, color: "green" },
    { label: "Settings", icon: Settings, path: ROUTES.SETTINGS, color: "blue" },
    {
      label: "Sponsor a User",
      icon: Heart,
      path: ROUTES.SPONSORSHIP,
      color: "pink",
    },
    {
      label: "Refer & Earn",
      icon: Users,
      path: ROUTES.REFERRAL,
      color: "purple",
    },
  ];

  const modeQuickActions = {
    sender: {
      label: "Post New Delivery",
      icon: Plus,
      path: ROUTES.POST_DELIVERY,
    },
    pal: { label: "Find Jobs", icon: Zap, path: ROUTES.AVAILABLE_JOBS },
    receiver: {
      label: "Incoming Deliveries",
      icon: Mail,
      path: ROUTES.RECEIVED_DELIVERIES,
    },
    proxy: {
      label: "Storage Dashboard",
      icon: Store,
      path: ROUTES.PROXY_DASHBOARD,
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-darkest/70 backdrop-blur-sm z-40"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Menu */}
          <motion.div
            className="fixed inset-y-0 right-0 w-full sm:w-96 bg-gradient-to-b from-darker to-[#0f0f0f] shadow-2xl z-50 flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-[#d63d07] p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Image
                    src="/P-logo.png"
                    alt="Prawnbox"
                    width={100}
                    height={100}
                    className="w-10 h-10 rounded-lg"
                  />
                  <div>
                    <h2 className="text-lg font-bold text-white">Prawnbox</h2>
                    <p className="text-sm text-gray-200 capitalize">
                      {activeMode} Account
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center"
                >
                  <X size={20} className="text-white" />
                </button>
              </div>
            </div>

            {/* User Profile */}
            {user && (
              <div className="p-6 border-b border-white/10">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-[#d63d07] flex items-center justify-center shadow-lg">
                    {user.profileImage ? (
                      <Image
                        src={user.profileImage}
                        alt={`${user.firstName} ${user.lastName}` || "User"}
                        width={100}
                        height={100}
                        className="w-full h-full rounded-2xl object-cover"
                      />
                    ) : (
                      <span className="text-2xl font-bold text-white">
                        {user.firstName
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()
                          .slice(0, 2) || "U"}
                      </span>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-bold text-lg">
                      {user.firstName || "User"}
                    </h3>
                    <p className="text-gray-400 text-sm">{user.email}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto p-6 space-y-3">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.path}
                    onClick={() => handleNavigation(item.path)}
                    className={`w-full flex items-center space-x-4 p-4 rounded-xl transition-all ${
                      isActive(item.path)
                        ? "bg-primary-light border border-primary/40"
                        : "bg-white/10 hover:bg-white/15 border border-white/20"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl bg-${item.color}-500/20 flex items-center justify-center`}
                    >
                      <Icon size={20} className={`text-${item.color}-400`} />
                    </div>
                    <span className="font-medium text-white flex-1 text-left">
                      {item.label}
                    </span>
                  </button>
                );
              })}

              {/* Divider */}
              <div className="border-t border-white/10 my-4"></div>

              {/* Role Quick Action */}
              {(() => {
                const action = modeQuickActions[activeMode];
                const Icon = action.icon;
                return (
                  <button
                    onClick={() => handleNavigation(action.path)}
                    className="w-full flex items-center space-x-4 p-4 rounded-xl bg-gradient-to-r from-primary to-[#d63d07] hover:from-primary-hover hover:to-primary border border-primary/40 shadow-lg"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                      <Icon size={20} className="text-white" />
                    </div>
                    <span className="font-medium text-white flex-1 text-left">
                      {action.label}
                    </span>
                  </button>
                );
              })()}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
