/**
 * Mobile Menu Component
 *
 * Slide-out mobile menu with navigation options
 * Shows user profile, main nav buttons, and role-specific quick actions
 */

'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Home, Wallet, Settings, Heart, Users, Store, Plus, Zap, Mail, Building } from 'lucide-react'
import { User, UserRole } from '@/types'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  user: User | null
  activeRole: UserRole
  currentPath: string
}

export function MobileMenu({ isOpen, onClose, user, activeRole, currentPath }: MobileMenuProps) {
  const router = useRouter()

  const handleNavigation = (path: string) => {
    onClose()
    router.push(path)
  }

  const isActive = (path: string) => currentPath === path || currentPath.startsWith(path)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Slide-out Menu */}
          <motion.div
            className="fixed inset-y-0 right-0 w-full sm:w-96 bg-gradient-to-b from-[#1a1a1a] to-[#0f0f0f] shadow-2xl z-50 flex flex-col"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            {/* Header */}
            <motion.div
              className="bg-gradient-to-r from-[#f44708] to-[#d63d07] p-6 shadow-lg"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img src='/P-logo.png' alt="Prawnbox" className="w-10 h-10 rounded-lg" />
                  <div>
                    <h2 className="text-lg font-bold text-white">
                      Prawnbox
                    </h2>
                    <p className="text-sm text-gray-200 capitalize">
                      {user ? `${activeRole} Account` : 'Welcome'}
                    </p>
                  </div>
                </div>
                <motion.button
                  onClick={onClose}
                  className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X size={20} className="text-white" />
                </motion.button>
              </div>
            </motion.div>

            {/* User Profile Section */}
            {user && (
              <motion.div
                className="p-6 border-b border-white/10"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 }}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#f44708] to-[#d63d07] flex items-center justify-center shadow-lg">
                    {user.profileImage ? (
                      <img
                        src={user.profileImage}
                        alt={user.fullName || 'User'}
                        className="w-full h-full rounded-2xl object-cover"
                      />
                    ) : (
                      <span className="text-2xl font-bold text-white">
                        {user.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'U'}
                      </span>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-bold text-lg">{user.name || 'User'}</h3>
                    <p className="text-gray-400 text-sm">{user.email}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <div className="flex items-center text-yellow-400">
                        <span className="text-lg">⭐</span>
                        <span className="ml-1 font-medium text-sm">
                          {typeof user.rating === 'number' && user.rating > 0 ? user.rating.toFixed(1) : '5.0'}
                        </span>
                      </div>
                      <span className="text-gray-500">•</span>
                      <span className="text-gray-400 text-sm">
                        {user.totalDeliveries || 0} deliveries
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Navigation Menu */}
            <div className="flex-1 overflow-y-auto p-6 space-y-3">
              {/* Dashboard Button */}
              <motion.button
                onClick={() => handleNavigation('/')}
                className={`w-full flex items-center space-x-4 p-4 rounded-xl transition-all duration-200 ${
                  isActive('/') && currentPath === '/'
                    ? 'bg-[#f44708]/20 border border-[#f44708]/40'
                    : 'bg-white/10 hover:bg-white/15 border border-white/20'
                }`}
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="w-10 h-10 rounded-xl bg-[#f44708]/20 flex items-center justify-center">
                  <Home size={20} className="text-[#f44708]" />
                </div>
                <span className="font-medium text-white flex-1 text-left">Dashboard</span>
                {isActive('/') && currentPath === '/' && (
                  <motion.div
                    className="w-2 h-2 rounded-full bg-[#f44708]"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500 }}
                  />
                )}
              </motion.button>

              {/* Wallet Button */}
              <motion.button
                onClick={() => handleNavigation('/wallet')}
                className={`w-full flex items-center space-x-4 p-4 rounded-xl transition-all duration-200 ${
                  isActive('/wallet')
                    ? 'bg-[#f44708]/20 border border-[#f44708]/40'
                    : 'bg-white/10 hover:bg-white/15 border border-white/20'
                }`}
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 }}
              >
                <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                  <Wallet size={20} className="text-green-400" />
                </div>
                <span className="font-medium text-white flex-1 text-left">Wallet</span>
                {isActive('/wallet') && (
                  <motion.div
                    className="w-2 h-2 rounded-full bg-[#f44708]"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500 }}
                  />
                )}
              </motion.button>

              {/* Settings Button */}
              <motion.button
                onClick={() => handleNavigation('/settings')}
                className={`w-full flex items-center space-x-4 p-4 rounded-xl transition-all duration-200 ${
                  isActive('/settings')
                    ? 'bg-[#f44708]/20 border border-[#f44708]/40'
                    : 'bg-white/10 hover:bg-white/15 border border-white/20'
                }`}
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                  <Settings size={20} className="text-blue-400" />
                </div>
                <span className="font-medium text-white flex-1 text-left">Settings</span>
                {isActive('/settings') && (
                  <motion.div
                    className="w-2 h-2 rounded-full bg-[#f44708]"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500 }}
                  />
                )}
              </motion.button>

              {/* Sponsor a User Button */}
              <motion.button
                onClick={() => handleNavigation('/sponsorship')}
                className={`w-full flex items-center space-x-4 p-4 rounded-xl transition-all duration-200 ${
                  isActive('/sponsorship')
                    ? 'bg-[#f44708]/20 border border-[#f44708]/40'
                    : 'bg-white/10 hover:bg-white/15 border border-white/20'
                }`}
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.45 }}
              >
                <div className="w-10 h-10 rounded-xl bg-pink-500/20 flex items-center justify-center">
                  <Heart size={20} className="text-pink-400" />
                </div>
                <span className="font-medium text-white flex-1 text-left">Sponsor a User</span>
                {isActive('/sponsorship') && (
                  <motion.div
                    className="w-2 h-2 rounded-full bg-[#f44708]"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500 }}
                  />
                )}
              </motion.button>

              {/* Refer Button */}
              <motion.button
                onClick={() => handleNavigation('/referrals')}
                className={`w-full flex items-center space-x-4 p-4 rounded-xl transition-all duration-200 ${
                  isActive('/referrals')
                    ? 'bg-[#f44708]/20 border border-[#f44708]/40'
                    : 'bg-white/10 hover:bg-white/15 border border-white/20'
                }`}
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                  <Users size={20} className="text-purple-400" />
                </div>
                <span className="font-medium text-white flex-1 text-left">Refer & Earn</span>
                {isActive('/referrals') && (
                  <motion.div
                    className="w-2 h-2 rounded-full bg-[#f44708]"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500 }}
                  />
                )}
              </motion.button>

              {/* Divider */}
              <div className="border-t border-white/10 my-4"></div>

              {/* Role-Specific Quick Actions */}
              {activeRole === 'sender' && (
                <motion.button
                  onClick={() => handleNavigation('/jobs/post')}
                  className="w-full flex items-center space-x-4 p-4 rounded-xl bg-gradient-to-r from-[#f44708] to-[#d63d07] hover:from-[#ff5722] hover:to-[#f44708] border border-[#f44708]/40 shadow-lg"
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                    <Plus size={20} className="text-white" />
                  </div>
                  <span className="font-medium text-white flex-1 text-left">
                    Post New Delivery
                  </span>
                </motion.button>
              )}

              {activeRole === 'pal' && (
                <motion.button
                  onClick={() => handleNavigation('/jobs')}
                  className="w-full flex items-center space-x-4 p-4 rounded-xl bg-gradient-to-r from-[#f44708] to-[#d63d07] hover:from-[#ff5722] hover:to-[#f44708] border border-[#f44708]/40 shadow-lg"
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                    <Zap size={20} className="text-white" />
                  </div>
                  <span className="font-medium text-white flex-1 text-left">
                    Find Jobs
                  </span>
                </motion.button>
              )}

              {activeRole === 'receiver' && (
                <motion.button
                  onClick={() => handleNavigation('/jobs/received')}
                  className="w-full flex items-center space-x-4 p-4 rounded-xl bg-gradient-to-r from-[#f44708] to-[#d63d07] hover:from-[#ff5722] hover:to-[#f44708] border border-[#f44708]/40 shadow-lg"
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                    <Mail size={20} className="text-white" />
                  </div>
                  <span className="font-medium text-white flex-1 text-left">
                    Incoming Deliveries
                  </span>
                </motion.button>
              )}

              {activeRole === 'proxy' && (
                <motion.button
                  onClick={() => handleNavigation('/proxy')}
                  className="w-full flex items-center space-x-4 p-4 rounded-xl bg-gradient-to-r from-[#f44708] to-[#d63d07] hover:from-[#ff5722] hover:to-[#f44708] border border-[#f44708]/40 shadow-lg"
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                    <Store size={20} className="text-white" />
                  </div>
                  <span className="font-medium text-white flex-1 text-left">
                    Storage Dashboard
                  </span>
                </motion.button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
