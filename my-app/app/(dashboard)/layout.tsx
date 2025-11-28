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
import { ProcessingMinimizedBar } from '@/components/dashboard/ProcessingMinimizedBar'
import { useAppStore } from '@/stores/appStore'
import { useAuth } from '@/utils/apiHooks'
import { socketService } from '@/utils/socket'
import { useConnectionStatus, useSocketEvent } from '@/utils/useSocket'
import { useOfflineBanner } from '@/utils/useOffline'
import type { UserRole, Screen, Notification as NotificationType, Bid, DeliveryStatus } from '@/types/index'
import { toast } from 'sonner'

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
    setNotifications,
    initializeNotifications,
    cleanupNotifications,
    deliveryJobs,
    updateDeliveryJob,
    isMobileMenuOpen,
    setMobileMenuOpen,
    processingJob,
    isProcessingMinimized,
  } = useAppStore()

  // Connection status
  const { showStatus, statusMessage, statusColor } = useConnectionStatus()

  // Offline detection
  const { showBanner: showOfflineBanner, isOffline } = useOfflineBanner()

  // Sync auth user with global state
  useEffect(() => {
    if (authUser) {
      setUser(authUser)
    }
  }, [authUser, setUser])

  // Initialize WebSocket connection and notifications when user is authenticated
  useEffect(() => {
    if (authUser) {
      const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null

      socketService.connect(token || undefined)
        .then(() => {
          toast.success('Connected to server', { duration: 2000 })
          
          // Initialize real-time notifications
          initializeNotifications(authUser)
        })
        .catch((error) => {
          console.error('❌ Failed to connect WebSocket:', error)
          toast.error('Failed to connect to server')
        })

      // Cleanup on unmount or user logout
      return () => {
        socketService.disconnect()
        cleanupNotifications()
      }
    }
  }, [authUser, initializeNotifications, cleanupNotifications])

  // Listen for real-time notifications
  useSocketEvent('notification:new', (notification: NotificationType) => {
    // Add notification to store
    setNotifications([notification, ...notifications])

    // Show toast notification
    toast.info(notification.message, {
      duration: 5000,
      action: notification.actionUrl ? {
        label: 'View',
        onClick: () => router.push(notification.actionUrl!)
      } : undefined
    })
  })

  // Listen for job status updates
  useSocketEvent('job:status-update', (data: { jobId: string; status: string; updatedAt: string }) => {
    console.log('📦 Job status update:', data)

    // Update job in store
    updateDeliveryJob(data.jobId, {
      status: data.status as DeliveryStatus,
      updatedAt: data.updatedAt
    })

    // Show toast notification
    const job = deliveryJobs.find(j => j.id === data.jobId)
    if (job) {
      toast.info(`Job "${job.title}" status updated to ${data.status}`, {
        duration: 4000,
        action: {
          label: 'View',
          onClick: () => router.push(`/jobs/${data.jobId}`)
        }
      })
    }
  })

  // Listen for new bids
  useSocketEvent('job:new-bid', (data: { jobId: string; bid: Bid }) => {
    console.log('💰 New bid received:', data)

    // Update processing bid count if this is the processing job
    const { processingJob, processingBidCount, setProcessingBidCount } = useAppStore.getState()
    if (processingJob && processingJob.id === data.jobId) {
      setProcessingBidCount(processingBidCount + 1)
    }

    // Show toast notification to sender
    const job = deliveryJobs.find(j => j.id === data.jobId)
    if (job && job.senderId === user?.id) {
      toast.success('New bid received on your delivery', {
        duration: 4000,
        action: {
          label: 'View Bids',
          onClick: () => router.push(`/jobs/${data.jobId}/bids`)
        }
      })
    }
  })

  // Listen for bid acceptance
  useSocketEvent('job:bid-accepted', (data: { jobId: string; bidId: string }) => {
    console.log('✅ Bid accepted:', data)

    // Clear processing job if this was the one being processed
    const { processingJob, clearProcessingJob } = useAppStore.getState()
    if (processingJob && processingJob.id === data.jobId) {
      clearProcessingJob()
    }

    // Show toast notification
    toast.success('Your bid was accepted!', {
      duration: 5000,
      action: {
        label: 'View Job',
        onClick: () => router.push(`/jobs/${data.jobId}`)
      }
    })
  })

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

  // Determine if header should be hidden for full-screen pages
  const shouldHideHeader = () => {
    const hideHeaderRoutes = ['/notifications', '/settings/profile']
    return hideHeaderRoutes.some(route => pathname.startsWith(route))
  }

  // Calculate if processing bar is visible
  const isProcessingBarVisible = !!(processingJob && isProcessingMinimized && !isMobileMenuOpen && !shouldHideHeader())
  const processingBarHeight = isProcessingBarVisible ? 60 : 0

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Global Processing Minimized Bar - TOPMOST position - Hidden for full-screen pages or when mobile menu is open */}
      {!shouldHideHeader() && !isMobileMenuOpen && <ProcessingMinimizedBar />}

      {/* Full-Width Dashboard Header - Spans entire width - Hidden for full-screen pages */}
      {!shouldHideHeader() && (
      <div className="fixed top-0 left-0 right-0 z-40 bg-white transition-all duration-300" style={{ top: `${processingBarHeight}px` }}>
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
      )}

      {/* Connection Status Indicator - Below header */}
      {showStatus && (
        <div className={`sticky top-0 left-0 right-0 z-30 ${statusColor} text-white py-2 px-4 text-center text-sm font-medium transition-all duration-300 shadow-md`}>
          <div className="flex items-center justify-center gap-2">
            <div className={`w-2 h-2 rounded-full ${statusColor === 'bg-yellow-500' || statusColor === 'bg-red-500' ? 'animate-pulse' : ''} bg-white`}></div>
            {statusMessage}
          </div>
        </div>
      )}

      {/* Offline Banner - Below connection status */}
      {showOfflineBanner && (
        <div className={`sticky top-0 left-0 right-0 z-30 ${isOffline ? 'bg-gray-800' : 'bg-green-600'} text-white py-2 px-4 text-center text-sm font-medium transition-all duration-300 shadow-md`}>
          <div className="flex items-center justify-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isOffline ? 'bg-gray-400' : 'bg-white'}`}></div>
            {isOffline ? 'You are offline. Some features may be unavailable.' : 'Back online!'}
          </div>
        </div>
      )}

      {/* Main Content Area with Sidebar - Below Header */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar - Only visible on xl screens and above */}
        <div className="hidden xl:block w-72 flex-shrink-0">
          <DesktopSidebar
            currentPath={pathname}
          />
        </div>

        {/* Main Content - Takes remaining space */}
        <div className="flex-1 overflow-hidden bg-white flex flex-col overflow-x-hidden">

          {/* Mobile Menu - Only for screens below xl */}
          {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 xl:hidden">
            <MobileMenu
              isOpen={isMobileMenuOpen}
              onClose={() => setMobileMenuOpen(false)}
              user={user}
              activeRole={activeRole}
              currentPath={pathname}
            />
          </div>
          )}

          {/* Breadcrumb Navigation */}
          {!shouldHideHeader() && (
          <div className="xl:max-w-[896px] xl:mx-auto">
            <Breadcrumbs />
          </div>
          )}

          {/* Page Content - Centered on desktop with tablet max-width */}
          <main className={`flex-1 overflow-y-auto overflow-x-hidden ${shouldHideHeader() ? "pb-6" : "pb-24 xl:pb-6"}`} style={{ paddingTop: shouldHideHeader() ? '0px' : `${processingBarHeight + 80}px` }}>
            <div className="xl:max-w-[896px] xl:mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>

      {/* Dashboard Footer - Only visible on mobile - Hidden for full-screen pages */}
      {!shouldHideHeader() && (
      <div className=" fixed bottom-0 left-0 right-0 z-40">
        <DashboardFooter
          activeRole={activeRole}
          onActionClick={handleActionClick}
        />
      </div>
      )}
    </div>
  )
}