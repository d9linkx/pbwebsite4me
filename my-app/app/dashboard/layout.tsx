/**
 * Dashboard Layout - Modern layout with full-width header
 *
 * Provides:
 * - Full-width dashboard header at the top
 * - Sidebar below header on desktop
 * - Responsive mobile menu
 * - Global state management via Zustand
 * - Authentication checks
 */

'use client'

import React, { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { DashboardHeader } from '@/components/dashboard/DashboardHeader'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import { Breadcrumbs } from '@/components/dashboard/Breadcrumbs'
import { MobileMenu } from '@/components/dashboard/MobileMenu'
import { DesktopSidebar } from '@/components/dashboard/DesktopSidebar'
import { useAppStore } from '@/stores/appStore'
import { useAuth } from '@/utils/apiHooks'
import type { UserRole, Screen } from '@/types/index'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()

  // Auth state
  const { user: authUser, loading: authLoading } = useAuth()

  // Global state
  const {
    user,
    activeRole,
    setUser,
    setActiveRole,
    notifications,
    isMobileMenuOpen,
    setMobileMenuOpen,
  } = useAppStore()

  // Sync auth user with global state
  useEffect(() => {
    if (authUser) {
      setUser(authUser)
    }
  }, [authUser, setUser])

  // Auth guard - redirect to auth if not logged in
  useEffect(() => {
    if (!authLoading && !authUser && pathname !== '/auth') {
      console.log('🔐 No user found, redirecting to auth')
      router.push('/auth')
    }
  }, [authLoading, authUser, pathname, router])

  // Show loading state while checking auth
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-[#f44708] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Don't render dashboard if no user
  if (!authUser) {
    return null
  }

  // Handle role change
  const handleRoleChange = (role: UserRole) => {
    setActiveRole(role)
    console.log('🔄 Role switched to:', role)
  }

  // Handle navigation (convert old screen-based nav to new route-based nav)
  const handleNavigate = (screen: Screen) => {
    const screenToRouteMap: Record<Screen, string> = {
      // Core routes
      'dashboard': '/dashboard',
      'auth': '/auth',
      'email-verification': '/email-verification',

      // Jobs
      'available-jobs': '/jobs',
      'post-delivery': '/jobs/post',
      'my-deliveries': '/jobs/my-deliveries',
      'sent-deliveries-history': '/jobs/sent',
      'received-deliveries': '/jobs/received',
      'receiver-dashboard': '/jobs/received',
      'bids': '/jobs/bids',
      'tracking': '/jobs/tracking',

      // Wallet
      'wallet': '/wallet',
      'wallet-add-funds': '/wallet/add-funds',
      'wallet-withdraw': '/wallet/withdraw',

      // Settings
      'settings': '/settings',
      'profile-information': '/settings/profile',
      'verification': '/settings/verification',
      'payment-methods': '/settings/payment-methods',

      // Chat
      'chat': '/chat',

      // Notifications
      'notifications': '/notifications',

      // Help
      'help-center': '/help',
      'contact-support': '/help/contact',

      // Proxy
      'proxy-dashboard': '/proxy',

      // Sponsorship
      'sponsorship': '/sponsorship',
      'sponsor-search': '/sponsorship/search',
      'sponsor-user-search': '/sponsorship/search',
      'sponsor-user-confirmation': '/sponsorship/confirm',
      'sponsorship-success': '/sponsorship/success',
      'sponsorship-management': '/sponsorship/manage',

      // Referrals
      'referral': '/referrals',

      // Ratings
      'ratings': '/ratings',
    } as Record<Screen, string>

    const route = screenToRouteMap[screen] || '/dashboard'
    router.push(route)
  }

  const handleNotificationsClick = () => {
    router.push('/notifications')
  }

  const handleProfileClick = () => {
    router.push('/settings/profile')
  }

  const handleAlertsClick = () => {
    router.push('/notifications?tab=alerts')
  }

  const handleActionClick = (action: string) => {
    console.log('Footer action clicked:', action)
    const actionRoutes: Record<string, string> = {
      'become-sender': '/help/become-sender',
      'become-pal': '/help/become-pal',
      'become-receiver': '/help/become-receiver',
      'become-proxy': '/help/become-proxy',
    }
    const route = actionRoutes[action] || '/dashboard'
    router.push(route)
  }

  // Determine current screen from pathname for header
  const pathnameToScreen = (): Screen => {
    if (pathname === '/dashboard') return 'dashboard'
    if (pathname.startsWith('/notifications')) return 'notifications'
    if (pathname.startsWith('/wallet')) return 'wallet'
    if (pathname.startsWith('/settings')) return 'settings'
    if (pathname.startsWith('/jobs')) return 'available-jobs'
    if (pathname.startsWith('/chat')) return 'chat'
    if (pathname.startsWith('/help')) return 'help-center'
    return 'dashboard'
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Full-Width Dashboard Header - Fixed at top */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white">
        <DashboardHeader
          activeRole={activeRole}
          onRoleChange={handleRoleChange}
          onNotificationsClick={handleNotificationsClick}
          onMenuToggle={() => setMobileMenuOpen(!isMobileMenuOpen)}
          onProfileClick={handleProfileClick}
          onNavigate={handleNavigate}
          isMenuOpen={isMobileMenuOpen}
          notifications={notifications}
          user={user || undefined}
          currentScreen={pathnameToScreen()}
          onAlertsClick={handleAlertsClick}
        />
      </div>

      {/* Main Content Area with Sidebar - Below Header with padding for fixed header */}
      <div className="flex-1 flex overflow-hidden pt-32 md:pt-28">
        {/* Desktop Sidebar - Fixed position, only visible on xl screens and above */}
        <div className="hidden xl:block xl:fixed xl:left-0 xl:top-24 xl:bottom-0 xl:w-64 xl:overflow-y-auto xl:border-r xl:border-gray-200 xl:bg-white">
          <DesktopSidebar
            user={user}
            activeRole={activeRole}
            currentPath={pathname}
          />
        </div>

        {/* Main Content - Takes remaining space, with left margin for sidebar on xl screens */}
        <div className="flex-1 xl:ml-64 overflow-y-auto overflow-x-hidden bg-white">
          {/* Mobile Menu - Only for screens below xl */}
          <MobileMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setMobileMenuOpen(false)}
            user={user}
            activeRole={activeRole}
            currentPath={pathname}
          />

          {/* Breadcrumb Navigation */}
          <div className="xl:max-w-[896px] xl:mx-auto px-4">
            <Breadcrumbs />
          </div>

          {/* Page Content - Centered on desktop with tablet max-width */}
          <main className="pb-24 xl:pb-8 pt-4">
            <div className="xl:max-w-[896px] xl:mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>

      {/* Dashboard Footer - Fixed at bottom, only visible on mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-40">
        <DashboardFooter
          activeRole={activeRole}
          onActionClick={handleActionClick}
        />
      </div>
    </div>
  )
}
