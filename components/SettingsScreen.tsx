"use client";
import React from "react";
import {
  ArrowLeft,
  User,
  Bell,
  Shield,
  CreditCard,
  HelpCircle,
  LogOut,
  ChevronRight,
  CheckCircle,
  TrendingUp,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";
import { Switch } from "./ui/switch";
import { Badge } from "./ui/badge";
import { User as UserType, Screen } from "../types";

interface SettingsItem {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  hasChevron?: boolean;
  hasSwitch?: boolean;
  switchValue?: boolean;
  badge?: string;
  badgeColor?: string;
  action?: () => void;
}

interface SettingsSection {
  title: string;
  items: SettingsItem[];
}

interface SettingsScreenProps {
  user: UserType | null;
  onBack: () => void;
  onNavigate: (screen: Screen) => void;
  onLogout: () => void;
}

export function SettingsScreen({
  user,
  onBack,
  onNavigate,
  onLogout,
}: SettingsScreenProps) {
  if (!user) return null;

  // Debug log to see user verification status
  console.log("SettingsScreen - user.isVerified:", user.isVerified);
  console.log("SettingsScreen - full user:", user);

  const settingsSections: SettingsSection[] = [
    {
      title: "Account",
      items: [
        {
          icon: User,
          label: "Profile Information",
          hasChevron: true,
          badge: undefined,
          badgeColor: undefined,
          action: () => onNavigate("profile-information"),
        },
        {
          icon: Shield,
          label: "Verification",
          hasChevron: true,
          badge: user.isVerified ? "Verified" : "Not Verified",
          badgeColor: user.isVerified
            ? "bg-green-100 text-green-700"
            : "bg-yellow-100 text-yellow-700",
          action: () => onNavigate("verification"),
        },
        {
          icon: CreditCard,
          label: "Payment Methods",
          hasChevron: true,
          badge: undefined,
          badgeColor: undefined,
          action: () => onNavigate("payment-methods"),
        },
      ],
    },
    {
      title: "Investment & Earnings",
      items: [
        {
          icon: TrendingUp,
          label: "Sponsorship Portfolio",
          hasChevron: true,
          badge: user.activeEscrows?.length
            ? `${user.activeEscrows.length} Active`
            : "New",
          badgeColor: user.activeEscrows?.length
            ? "bg-green-100 text-green-700"
            : "bg-blue-100 text-blue-700",
          //   action: () => onNavigate('sponsorship-portfolio')
        },
        {
          icon: Users,
          label: "Referral Program",
          hasChevron: true,
          badge: undefined,
          badgeColor: undefined,
          action: () => onNavigate("referral"),
        },
      ],
    },
    {
      title: "Preferences",
      items: [
        {
          icon: Bell,
          label: "Push Notifications",
          hasSwitch: true,
          switchValue: user.preferences?.notifications?.push || false,
        },
        {
          icon: Bell,
          label: "Email Notifications",
          hasSwitch: true,
          switchValue: user.preferences?.emailUpdate || false,
        },
      ],
    },
    {
      title: "Support",
      items: [
        {
          icon: HelpCircle,
          label: "Help Center",
          hasChevron: true,
          action: () => onNavigate("help-center"),
        },
        {
          icon: HelpCircle,
          label: "Contact Support",
          hasChevron: true,
          action: () => onNavigate("contact-support"),
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <motion.div
        className="bg-gray-300 border-b border-gray-200 sticky top-0 z-10 shadow-sm"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center p-6">
          <motion.button
            onClick={onBack}
            className="mr-4 p-2 hover:bg-gray-100 rounded-xl transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft size={24} className="text-gray-700" />
          </motion.button>
          <h1 className="text-xl text-gray-900">Settings</h1>
        </div>
      </motion.div>

      <div className="relative z-10">
        {/* Profile Header */}
        <div className="p-6">
          <motion.div
            className="bg-gray-50 border border-gray-200 rounded-2xl p-5 cursor-pointer hover:bg-gray-300 transition-all duration-300"
            onClick={() => onNavigate("profile-information")}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center shadow-sm">
                <span className="text-gray-300 text-xl font-bold">
                  {user.firstName
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("") || "U"}
                </span>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h3 className="text-gray-900 text-lg font-semibold">
                    {user.firstName || "User"}
                  </h3>
                  {user.isVerified && (
                    <CheckCircle size={16} className="text-green-600" />
                  )}
                </div>
                <p className="text-gray-600 text-sm">
                  {user.email || "No email"}
                </p>
                <div className="flex items-center mt-1">
                  <span className="text-sm text-gray-600">Rating: </span>
                  <span className="text-sm text-primary ml-1 font-medium">
                    ⭐{" "}
                    {typeof user.rating === "number" && user.rating > 0
                      ? user.rating.toFixed(1)
                      : "5.0"}
                  </span>
                </div>
              </div>
              <ChevronRight size={20} className="text-gray-500" />
            </div>
          </motion.div>
        </div>

        {/* Settings Sections */}
        <div className="px-6 pb-6 space-y-6">
          {settingsSections.map((section, sectionIndex) => (
            <motion.div
              key={sectionIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + sectionIndex * 0.1 }}
            >
              <h3 className="mb-3 font-semibold text-sm uppercase tracking-wider">
                {section.title}
              </h3>
              <div className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden">
                {section.items.map((item, itemIndex) => {
                  const IconComponent = item.icon;
                  return (
                    <motion.div
                      key={itemIndex}
                      className={`flex items-center justify-between p-4 ${
                        itemIndex < section.items.length - 1
                          ? "border-b border-gray-200"
                          : ""
                      } ${item.action ? "cursor-pointer hover:bg-gray-300 transition-colors" : ""}`}
                      onClick={item.action}
                      whileHover={item.action ? { x: 4 } : {}}
                      whileTap={item.action ? { scale: 0.98 } : {}}
                    >
                      <div className="flex items-center space-x-3 flex-1">
                        <div className="w-10 h-10 rounded-xl bg-gray-300 flex items-center justify-center">
                          <IconComponent size={20} className="text-gray-700" />
                        </div>
                        <span className="text-gray-900 font-medium">
                          {item.label}
                        </span>
                        {item.badge && (
                          <Badge
                            className={`text-xs px-2 py-1 rounded-full border-0 ${
                              item.badgeColor || "bg-green-100 text-green-700"
                            }`}
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center">
                        {item.hasSwitch && (
                          <Switch
                            defaultChecked={item.switchValue}
                            onCheckedChange={(checked) => {
                              console.log(
                                `Settings switch toggled: ${item.label} = ${checked}`,
                              );
                            }}
                          />
                        )}
                        {item.hasChevron && (
                          <ChevronRight size={20} className="text-gray-500" />
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Logout Button */}
        <div className="p-6 pt-0">
          <motion.button
            onClick={onLogout}
            className="w-full bg-red-50 border-2 border-red-200 text-red-600 hover:bg-red-100 hover:border-red-300 rounded-xl py-3 font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <LogOut size={20} />
            <span>Sign Out</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
