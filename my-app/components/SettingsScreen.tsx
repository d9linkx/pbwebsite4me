'use client'
import React from 'react';
import { ArrowLeft, User, Bell, Shield, CreditCard, HelpCircle, LogOut, ChevronRight, CheckCircle, TrendingUp, Users, Package } from 'lucide-react';
import { motion } from 'framer-motion'
import { Switch } from './ui/switch';
import { Badge } from './ui/badge';
import { User as UserType, Screen } from '../types';

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

export function SettingsScreen({ user, onBack, onNavigate, onLogout }: SettingsScreenProps) {
  if (!user) return null;

  const settingsSections: SettingsSection[] = [
    {
      title: 'Account',
      items: [
        { 
          icon: User, 
          label: 'Profile Information', 
          hasChevron: true,
          badge: undefined,
          badgeColor: undefined,
          action: () => onNavigate('profile-information')
        },
        { 
          icon: Shield, 
          label: 'Verification', 
          hasChevron: true, 
          badge: user.isVerified ? 'Verified' : 'Verify Now',
          badgeColor: user.isVerified ? 'bg-green-500/20 text-green-400' : 'bg-orange-500/20 text-orange-400',
          action: () => onNavigate('verification')
        },
        { 
          icon: CreditCard, 
          label: 'Payment Methods', 
          hasChevron: true,
          badge: undefined,
          badgeColor: undefined,
          action: () => onNavigate('payment-methods')
        }
      ]
    },
    {
      title: 'Investment & Earnings',
      items: [
        { 
          icon: TrendingUp, 
          label: 'Sponsorship Portfolio', 
          hasChevron: true,
          badge: user.activeEscrows?.length ? `${user.activeEscrows.length} Active` : 'New',
          badgeColor: user.activeEscrows?.length ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400',
        //   action: () => onNavigate('sponsorship-portfolio')
        },
        { 
          icon: Users, 
          label: 'Referral Program', 
          hasChevron: true,
          badge: undefined,
          badgeColor: undefined,
          action: () => onNavigate('referral')
        }
      ]
    },
    {
      title: 'Preferences',
      items: [
        { 
          icon: Bell, 
          label: 'Push Notifications', 
          hasSwitch: true, 
          switchValue: user.preferences?.notifications?.push || false
        },
        { 
          icon: Bell, 
          label: 'Email Notifications', 
          hasSwitch: true, 
          switchValue: user.preferences?.emailUpdate || false
        }
      ]
    },
    {
      title: 'Support',
      items: [
        { 
          icon: HelpCircle, 
          label: 'Help Center', 
          hasChevron: true,
          action: () => onNavigate('help-center')
        },
        { 
          icon: HelpCircle, 
          label: 'Contact Support', 
          hasChevron: true,
          action: () => onNavigate('contact-support')
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2f2f2f] via-[#1a1a1a] to-[#2f2f2f]">
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
        <div className="flex items-center p-6">
          <motion.button 
            onClick={onBack}
            className="mr-4 p-2 hover:bg-white/10 rounded-xl transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft size={24} className="text-white" />
          </motion.button>
          <h1 className="text-xl text-white">Settings</h1>
        </div>
      </motion.div>

      <div className="relative z-10">
        {/* Profile Header */}
        <div className="p-6">
          <motion.div 
            className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 cursor-pointer hover:bg-white/15 transition-all duration-300"
            onClick={() => onNavigate('profile-information')}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#f44708] to-[#ff5722] flex items-center justify-center shadow-lg">
                <span className="text-white text-xl font-bold">
                  {user.name?.split(' ').map(n => n[0]).join('') || 'U'}
                </span>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h3 className="text-white text-lg font-semibold">{user.name || 'User'}</h3>
                  {user.isVerified && (
                    <CheckCircle size={16} className="text-green-400" />
                  )}
                </div>
                <p className="text-gray-400 text-sm">{user.email || 'No email'}</p>
                <div className="flex items-center mt-1">
                  <span className="text-sm text-gray-400">Rating: </span>
                  <span className="text-sm text-[#f44708] ml-1 font-medium">⭐ {typeof user.rating === 'number' ? user.rating.toFixed(1) : '0.0'}</span>
                </div>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
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
              <h3 className="text-white mb-3 font-semibold text-sm uppercase tracking-wider">{section.title}</h3>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden">
                {section.items.map((item, itemIndex) => {
                  const IconComponent = item.icon;
                  return (
                    <motion.div
                      key={itemIndex}
                      className={`flex items-center justify-between p-4 ${
                        itemIndex < section.items.length - 1 ? 'border-b border-white/10' : ''
                      } ${item.action ? 'cursor-pointer hover:bg-white/5 transition-colors' : ''}`}
                      onClick={item.action}
                      whileHover={item.action ? { x: 4 } : {}}
                      whileTap={item.action ? { scale: 0.98 } : {}}
                    >
                      <div className="flex items-center space-x-3 flex-1">
                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                          <IconComponent size={20} className="text-gray-300" />
                        </div>
                        <span className="text-white font-medium">{item.label}</span>
                        {item.badge && (
                          <Badge className={`text-xs px-2 py-1 rounded-full border-0 ${
                            item.badgeColor || 'bg-green-500/20 text-green-400'
                          }`}>
                            {item.badge}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center">
                        {item.hasSwitch && (
                          <Switch 
                            defaultChecked={item.switchValue}
                            onCheckedChange={(checked) => {
                              console.log(`Settings switch toggled: ${item.label} = ${checked}`);
                            }}
                          />
                        )}
                        {item.hasChevron && (
                          <ChevronRight size={20} className="text-gray-400" />
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* App Info */}
        <div className="px-6 py-4 border-t border-white/10">
          <p className="text-xs text-gray-500 text-center">
            Prawnbox v1.0.0 • Made with ❤️ for better deliveries
          </p>
        </div>

        {/* Logout Button */}
        <div className="p-6 pt-0">
          <motion.button
            onClick={onLogout}
            className="w-full bg-red-500/20 border-2 border-red-500/40 text-red-400 hover:bg-red-500/30 hover:border-red-500/60 rounded-xl py-3 font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
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
