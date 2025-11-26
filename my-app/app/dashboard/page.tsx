/**
 * Dashboard Home Page
 *
 * Main dashboard landing page showing role-specific stats and quick actions.
 * Uses Zustand for state management instead of props drilling.
 */

'use client'

import React, { useState, useMemo, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { DashboardScreen } from '@/components/dashboard/DashboardScreen'
import { useAppStore } from '@/stores/appStore'
import type { DeliveryJob, Screen, ItemSize, DeliveryStatus } from '@/types/index'
import { getUserPackages } from '@/utils/packageFilters'
import { apiService } from '@/utils/apiService'
import { toast } from 'sonner'

// Backend package response type
interface BackendPackage {
  _id?: string
  id?: string
  orderNumber?: string
  title: string
  description?: string
  status?: string
  pickupDate?: string
  pickupTime?: string
  pickupLocation?: string
  dropoffLocation?: string
  notes?: string
  price?: number
  value?: number
  category?: string
  weight?: string
  createdAt?: string
  sender?: {
    senderId?: string | { _id: string }
    name?: string
    phone?: string
    formattedAddress?: string
    address?: string
  }
  receiver?: {
    receiverId?: string
    name?: string
    phone?: string
    formattedAddress?: string
    address?: string
  }
  items?: Array<{
    size?: string
    category?: string
    weight?: string | number
    images?: Array<{ url: string }>
  }>
  pal?: {
    palId?: string
    name?: string
    phone?: string
  }
  proxy?: {
    proxyId?: string
    name?: string
    phone?: string
  }
  bids?: Array<{
    _id?: string
    id?: string
    palId?: string
    palName?: string
    palRating?: number
    amount?: number
    vehicleType?: string
    estimatedTime?: string
    message?: string
    canEdit?: boolean
    isAccepted?: boolean
    placedAt?: string
    createdAt?: string
    [key: string]: unknown
  }>
}

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
    setDeliveryJobs,
  } = useAppStore()

  // Local state for route selection (used by proxy dashboard)
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null)

  // Fetch packages from backend on mount
  useEffect(() => {
    const fetchPackages = async () => {
      if (!user) {
        router.push('/auth')
        return
      }

      try {
        console.log('📦 Fetching all packages for dashboard...')
        const response = await apiService.getAllPackages()

        if (response.success && response.data) {
          console.log('✅ Packages fetched:', response.data.length)
          console.log('📋 Raw package data:', response.data)
          console.log('👤 Current user ID:', user.id)

          // Map backend packages to frontend DeliveryJob format
          const mappedJobs: DeliveryJob[] = response.data.map((pkg: BackendPackage) => {
            const senderId = pkg.sender?.senderId
              ? (typeof pkg.sender.senderId === 'object' ? pkg.sender.senderId._id : pkg.sender.senderId)
              : user?.id || ''

            return {
              id: pkg._id || pkg.id || '',
              orderNumber: pkg.orderNumber || `ORD-${(pkg._id || '').slice(0, 8).toUpperCase()}`,
              senderId,
              senderName: pkg.sender?.name || user?.name || '',
              senderPhone: pkg.sender?.phone || user?.phone || '',
              title: pkg.title,
              description: pkg.description || '',
              pickupLocation: pkg.sender?.formattedAddress || pkg.sender?.address || pkg.pickupLocation || 'Pickup address not specified',
              dropoffLocation: pkg.receiver?.formattedAddress || pkg.receiver?.address || pkg.dropoffLocation || 'Delivery address not specified',
              itemSize: (pkg.items?.[0]?.size as ItemSize) || 'Medium',
              category: pkg.items?.[0]?.category || pkg.category || '',
              weight: pkg.items?.[0]?.weight?.toString() || pkg.weight || '',
              value: pkg.price || pkg.value || 0,
              receiverId: pkg.receiver?.receiverId,
              receiverName: pkg.receiver?.name || '',
              receiverPhone: pkg.receiver?.phone || '',
              selectedPalId: pkg.pal?.palId,
              selectedPalName: pkg.pal?.name,
              selectedPalPhone: pkg.pal?.phone,
              proxyId: pkg.proxy?.proxyId,
              proxyName: pkg.proxy?.name,
              status: (pkg.status as DeliveryStatus) || 'pending',
              pickupDate: pkg.pickupDate || new Date().toISOString(),
              pickupTime: pkg.pickupTime || '12:00',
              notes: pkg.notes || '',
              images: pkg.items?.[0]?.images?.map((img) => img.url) || [],
              bids: pkg.bids?.map((bid) => ({
                id: bid._id || bid.id || '',
                palId: bid.palId || '',
                palName: bid.palName || '',
                palRating: bid.palRating || 0,
                vehicleType: (bid.vehicleType as 'car' | 'bike' | 'van' | 'truck') || 'car',
                estimatedTime: bid.estimatedTime || '',
                amount: bid.amount || 0,
                message: bid.message || '',
                placedAt: bid.placedAt || new Date().toISOString(),
                canEdit: bid.canEdit || false,
                isAccepted: bid.isAccepted || false,
                createdAt: bid.createdAt || new Date().toISOString()
              })) || [],
              isLive: true,
              createdAt: pkg.createdAt || new Date().toISOString(),
              distance: 0,
            } as DeliveryJob
          })

          console.log('📦 Mapped jobs:', mappedJobs)
          console.log('📊 Mapped jobs count:', mappedJobs.length)
          console.log('🔍 Sender IDs in mapped jobs:', mappedJobs.map(j => ({ id: j.id, senderId: j.senderId })))

          setDeliveryJobs(mappedJobs)
          console.log('✅ Delivery jobs set in store:', mappedJobs.length)
        }
      } catch (error) {
        console.error('❌ Error fetching packages:', error)
        toast.error('Failed to load packages')
      }
    }

    fetchPackages()
  }, [user, router, setDeliveryJobs])

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
      'proxy-dashboard': '/jobs/proxy',
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
      'proxy-dashboard': '/jobs/proxy',
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
  const userJobs = useMemo(() => {
    return getUserPackages(deliveryJobs, user, activeRole)
  }, [deliveryJobs, user, activeRole])

  return (
    <div className="container mx-auto overflow-x-hidden">
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
