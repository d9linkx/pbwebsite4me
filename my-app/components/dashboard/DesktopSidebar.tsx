/**
 * Desktop Sidebar Component
 *
 * Fixed sidebar for desktop screens (xl and above)
 * Contains all navigation options from the mobile menu
 */

'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Home, Wallet, Settings, Heart, Users, Plus, Zap, Mail, Store } from 'lucide-react'
import { User, UserRole } from '@/types'

interface DesktopSidebarProps {
  user: User | null
  activeRole: UserRole
  currentPath: string
}

export function DesktopSidebar({ user, activeRole, currentPath }: DesktopSidebarProps) {
  const router = useRouter()

  const handleNavigation = (path: string) => {
    router.push(path)
  }

  const isActive = (path: string) => {
    if (path === '/') {
      return currentPath === '/'
    }
    return currentPath.startsWith(path)
  }

  return (
    <div className="w-72 h-full bg-[#2f2f2f] border-r border-gray-800 flex flex-col overflow-y-auto">
      {/* Logo Header */}
      {/* <div className="bg-gradient-to-r from-[#f44708] to-[#d63d07] p-6">
        <div className="flex items-center space-x-3">
          <img src='/P-logo.png' alt="Prawnbox" className="w-10 h-10 rounded-lg" />
          <div>
            <h2 className="text-lg font-bold text-white">Prawnbox</h2>
            <p className="text-sm text-gray-200 capitalize">
              {user ? `${activeRole} Account` : 'Dashboard'}
            </p>
          </div>
        </div>
      </div> */}

      {/* User Profile Section */}
      {/* {user && (
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#f44708] to-[#d63d07] flex items-center justify-center shadow-lg flex-shrink-0">
              {user.profileImage ? (
                <img
                  src={user.profileImage}
                  alt={user.fullName || 'User'}
                  className="w-full h-full rounded-xl object-cover"
                />
              ) : (
                <span className="text-lg font-bold text-white">
                  {user.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'U'}
                </span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-semibold text-sm truncate">{user.name || 'User'}</h3>
              <div className="flex items-center space-x-2 mt-1">
                <div className="flex items-center text-yellow-400">
                  <span className="text-sm">⭐</span>
                  <span className="ml-1 text-xs font-medium">
                    {typeof user.rating === 'number' ? user.rating.toFixed(1) : '0.0'}
                  </span>
                </div>
                <span className="text-gray-500 text-xs">•</span>
                <span className="text-gray-400 text-xs">
                  {user.totalDeliveries || 0} deliveries
                </span>
              </div>
            </div>
          </div>
        </div>
      )} */}

      {/* Navigation Menu */}
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
        {/* Dashboard Button */}
        <button
          onClick={() => handleNavigation('/')}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
            isActive('/') && currentPath === '/'
              ? 'bg-[#f44708] text-white shadow-lg'
              : 'text-gray-300 hover:text-white hover:bg-white/10'
          }`}
        >
          <Home size={20} />
          <span className="font-medium text-sm">Dashboard</span>
        </button>

        {/* Wallet Button */}
        <button
          onClick={() => handleNavigation('/wallet')}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
            isActive('/wallet')
              ? 'bg-[#f44708] text-white shadow-lg'
              : 'text-gray-300 hover:text-white hover:bg-white/10'
          }`}
        >
          <Wallet size={20} />
          <span className="font-medium text-sm">Wallet</span>
        </button>

        {/* Settings Button */}
        <button
          onClick={() => handleNavigation('/settings')}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
            isActive('/settings')
              ? 'bg-[#f44708] text-white shadow-lg'
              : 'text-gray-300 hover:text-white hover:bg-white/10'
          }`}
        >
          <Settings size={20} />
          <span className="font-medium text-sm">Settings</span>
        </button>

        {/* Divider */}
        <div className="border-t border-white/10 my-4"></div>

        {/* Sponsor a User Button */}
        <button
          onClick={() => handleNavigation('/sponsorship')}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
            isActive('/sponsorship')
              ? 'bg-[#f44708] text-white shadow-lg'
              : 'text-gray-300 hover:text-white hover:bg-white/10'
          }`}
        >
          <Heart size={20} />
          <span className="font-medium text-sm">Sponsor a User</span>
        </button>

        {/* Refer Button */}
        <button
          onClick={() => handleNavigation('/referrals')}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
            isActive('/referrals')
              ? 'bg-[#f44708] text-white shadow-lg'
              : 'text-gray-300 hover:text-white hover:bg-white/10'
          }`}
        >
          <Users size={20} />
          <span className="font-medium text-sm">Refer & Earn</span>
        </button>

        {/* Divider */}
        {/* <div className="border-t border-white/10 my-4"></div> */}

        {/* Role-Specific Quick Actions */}
        {/* {activeRole === 'sender' && (
          <button
            onClick={() => handleNavigation('/jobs/post')}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl bg-gradient-to-r from-[#f44708] to-[#d63d07] hover:from-[#ff5722] hover:to-[#f44708] text-white shadow-lg transition-all duration-200"
          >
            <Plus size={20} />
            <span className="font-medium text-sm">Post New Delivery</span>
          </button>
        )} */}
{/* 
        {activeRole === 'pal' && (
          <button
            onClick={() => handleNavigation('/jobs')}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl bg-gradient-to-r from-[#f44708] to-[#d63d07] hover:from-[#ff5722] hover:to-[#f44708] text-white shadow-lg transition-all duration-200"
          >
            <Zap size={20} />
            <span className="font-medium text-sm">Find Jobs</span>
          </button>
        )} */}
{/* 
        {activeRole === 'receiver' && (
          <button
            onClick={() => handleNavigation('/jobs/received')}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl bg-gradient-to-r from-[#f44708] to-[#d63d07] hover:from-[#ff5722] hover:to-[#f44708] text-white shadow-lg transition-all duration-200"
          >
            <Mail size={20} />
            <span className="font-medium text-sm">Incoming Deliveries</span>
          </button>
        )} */}

        {/* {activeRole === 'proxy' && (
          <button
            onClick={() => handleNavigation('/proxy')}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl bg-gradient-to-r from-[#f44708] to-[#d63d07] hover:from-[#ff5722] hover:to-[#f44708] text-white shadow-lg transition-all duration-200"
          >
            <Store size={20} />
            <span className="font-medium text-sm">Storage Dashboard</span>
          </button>
        )} */}
      </div>

      {/* Footer */}
      {/* <div className="p-6 border-t border-white/10">
        <div className="text-center">
          <p className="text-xs text-gray-400">Prawnbox v1.0</p>
          <p className="text-xs text-gray-500 mt-1">Peer-to-peer delivery</p>
        </div>
      </div> */}
    </div>
  )
}
