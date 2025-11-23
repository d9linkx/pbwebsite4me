/**
 * Dashboard Home Page
 *
 * Main dashboard landing page showing role-specific stats and quick actions.
 * Uses Zustand for state management instead of props drilling.
 */

'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { DashboardScreen } from '@/components/dashboard/DashboardScreen'
import { useAppStore } from '@/stores/appStore'
import type { DeliveryJob, Screen } from '@/types/index'

export default function DashboardPage() {
  const router = useRouter()

  // Get state from global store
  const {
    user,
    activeRole,
    deliveryJobs,
    proxyItems,
    notifications,
    setSelectedJob,
    setActiveRole,
  } = useAppStore()

  // Local state for route selection (used by proxy dashboard)
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null)

  // Navigation handler - maps old Screen types to new routes
  const handleNavigate = (screen: Screen) => {
    const screenToRouteMap: Partial<Record<Screen, string>> = {
      // Jobs
      'post-delivery': '/jobs/post',
      'available-jobs': '/jobs',
      'my-deliveries': '/jobs/my-deliveries',
      'sent-deliveries-history': '/jobs/sent',
      'received-deliveries': '/jobs/received',
      'receiver-dashboard': '/jobs/received',
      'accepted-bids': '/jobs/accepted-bids',
      'bids': '/jobs/bids',
      'tracking': '/jobs/tracking',

      // Wallet
      'wallet': '/wallet',
      'wallet-add-funds': '/wallet/add-funds',
      'wallet-withdraw': '/wallet/withdraw',

      // Settings
      'settings': '/settings',
      'profile-information': '/settings/profile',

      // Other
      'referral': '/referrals',
      'proxy-dashboard': '/proxy',
      'tape-distributor': '/tape-distributor',
      'notifications': '/notifications',
      'chat': '/chat',
    }

    const route = screenToRouteMap[screen]
    if (route) {
      router.push(route)
    } else {
      console.warn('No route mapping for screen:', screen)
      // Fallback to dashboard
      router.push('/dashboard')
    }
  }

  // Job selection handler
  const handleJobSelect = (job: DeliveryJob) => {
    setSelectedJob(job)
    // Navigate to job detail page
    router.push(`/jobs/${job.id}`)
  }

  // Call handler (opens phone dialer or WhatsApp)
  const handleCall = (phone: string) => {
    // Remove any non-numeric characters
    const cleanPhone = phone.replace(/\D/g, '')

    // Try WhatsApp first, fallback to phone
    if (typeof window !== 'undefined') {
      // Format for WhatsApp (international format)
      const whatsappUrl = `https://wa.me/${cleanPhone}`
      window.open(whatsappUrl, '_blank')
    }
  }

  // Action click handler (for dashboard buttons)
  const handleActionClick = (action: string) => {
    console.log('Dashboard action clicked:', action)

    // Map actions to routes
    const actionRoutes: Record<string, string> = {
      'post-delivery': '/jobs/post',
      'available-jobs': '/jobs',
      'accepted-bids': '/jobs/accepted-bids',
      'accepted-bids-completed': '/jobs/my-deliveries?filter=completed',
      'my-deliveries': '/jobs/my-deliveries',
      'wallet': '/wallet',
      'wallet-add-funds': '/wallet/add-funds',
      'settings': '/settings',
      'referral': '/referrals',
      'tape-distributor': '/tape-distributor',
      'proxy-dashboard': '/proxy',
    }

    const route = actionRoutes[action]
    if (route) {
      router.push(route)
    } else {
      // Fallback to screen navigation
      handleNavigate(action as Screen)
    }
  }

  // Get user-specific jobs based on active role
  // Filter packages by user's relationship to the package
  const userJobs = user
    ? deliveryJobs.filter((job) => {
        switch (activeRole) {
          case 'sender':
            return job.senderId === user.id
          case 'pal':
            return job.selectedPalId === user.id
          case 'receiver':
            return job.receiverId === user.id
          case 'proxy':
            return job.proxyId === user.id
          default:
            // If no role selected, show all related jobs
            return (
              job.senderId === user.id ||
              job.selectedPalId === user.id ||
              job.receiverId === user.id ||
              job.proxyId === user.id
            )
        }
      })
    : []

  return (
    <div className="container mx-auto">
      <DashboardScreen
        user={user}
        activeRole={activeRole}
        onJobSelect={handleJobSelect}
        onRoleChange={setActiveRole}
        onNavigate={handleNavigate}
        userJobs={userJobs}
        allJobs={deliveryJobs}
        proxyItems={proxyItems}
        selectedRoute={selectedRoute}
        onRouteSelect={setSelectedRoute}
        onBack={() => router.back()}
        handleCall={handleCall}
        notifications={notifications}
        onActionClick={handleActionClick}
      />
    </div>
  )
}
