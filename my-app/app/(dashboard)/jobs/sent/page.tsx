/**
 * Sent Deliveries Page
 *
 * Shows all deliveries that the user has sent (as sender role)
 */

'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { SentDeliveriesHistoryScreen } from '@/components/SentDeliveriesHistoryScreen'
import { useAppStore } from '@/stores/appStore'
import type { DeliveryJob, Bid, Screen } from '@/types/index'
import { apiService } from '@/utils/apiService'
import { toast } from 'sonner'

export default function SentDeliveriesPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [userJobs, setUserJobs] = useState<DeliveryJob[]>([])

  const { user, deliveryJobs, setSelectedJob, setSelectedBid, setDeliveryJobs } = useAppStore()

  // Fetch sent packages from backend on component mount
  useEffect(() => {
    const fetchSentPackages = async () => {
      if (!user) {
        router.push('/auth')
        return
      }

      try {
        setIsLoading(true)
        console.log('📦 Fetching sent packages from backend...')

        const response = await apiService.getSentPackages()

        if (response.success && response.data) {
          console.log('✅ Packages fetched from backend:', response.data)

          // Map backend packages to frontend DeliveryJob format
          const allMappedJobs: DeliveryJob[] = response.data.map((pkg: any) => ({
            id: pkg._id || pkg.id,
            title: pkg.title,
            description: pkg.description || '',
            pickupLocation: pkg.sender?.formattedAddress || '',
            dropoffLocation: pkg.receiver?.formattedAddress || '',
            pickupCoordinates: pkg.sender?.pickupAddress?.coordinates,
            dropoffCoordinates: pkg.receiver?.deliveryAddress?.coordinates,
            itemSize: pkg.items?.[0]?.size || 'Medium',
            category: pkg.items?.[0]?.category || '',
            weight: pkg.items?.[0]?.weight?.toString() || '',
            value: pkg.price || pkg.items?.[0]?.value || 0,
            receiverName: pkg.receiver?.name || '',
            receiverPhone: pkg.receiver?.phone || '',
            senderId: pkg.sender?.senderId?._id || pkg.sender?.senderId || user.id,
            senderName: pkg.sender?.name || user.name,
            senderPhone: pkg.sender?.phone || user.phone,
            status: pkg.status || 'pending',
            pickupDate: pkg.pickupDate || new Date().toISOString(),
            notes: pkg.notes || '',
            images: pkg.items?.[0]?.images?.map((img: any) => img.url) || [],
            bids: pkg.bids || [],
            isLive: true,
            createdAt: pkg.createdAt || new Date().toISOString(),
            orderNumber: pkg.orderNumber,
          }))

          // Filter packages where user is the sender
          // Backend returns ALL packages where user is involved, so we need to filter
          const sentJobs = allMappedJobs.filter(job => {
            const jobSenderId = job.senderId?.toString()
            const currentUserId = user.id?.toString()
            console.log('Comparing senderId:', jobSenderId, 'with userId:', currentUserId)
            return jobSenderId === currentUserId
          })

          console.log('📦 Filtered sent packages:', sentJobs.length, 'out of', allMappedJobs.length, 'total')
          setUserJobs(sentJobs)

          // Update Zustand store with ALL fetched jobs (not just sent)
          setDeliveryJobs(allMappedJobs)
        } else {
          console.warn('⚠️ No sent packages found or request failed')
          setUserJobs([])
        }
      } catch (error: any) {
        console.error('❌ Error fetching sent packages:', error)
        toast.error('Failed to load sent deliveries. Please try again.')
        setUserJobs([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchSentPackages()
  }, [user, router, setDeliveryJobs])

  const handleBack = () => {
    router.push('/')
  }

  const handleNavigate = (screen: Screen) => {
    const screenToRouteMap: Partial<Record<Screen, string>> = {
      'dashboard': '/',
      'post-delivery': '/jobs/post',
      'tracking': '/jobs/tracking',
      'chat': '/chat',
      'bids': '/jobs/bids',
    }

    const route = screenToRouteMap[screen] || '/'
    router.push(route)
  }

  const handleJobSelect = (job: DeliveryJob) => {
    setSelectedJob(job)
    router.push(`/jobs/${job.id}`)
  }

  const handleOpenChat = (job: DeliveryJob) => {
    setSelectedJob(job)
    // In a real app, you'd create/find the chat thread for this job
    router.push('/chat')
  }

  const handleBidSelect = (bid: Bid, job: DeliveryJob) => {
    setSelectedBid(bid)
    setSelectedJob(job)
    router.push(`/jobs/${job.id}/bids`)
  }

  const formatAmount = (amount: number): string => {
    return `₦${amount.toLocaleString('en-NG')}`
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="container mx-auto">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 border-4 border-[#f44708] border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-gray-600">Loading sent deliveries...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto">
      <SentDeliveriesHistoryScreen
        user={user}
        onBack={handleBack}
        onNavigate={handleNavigate}
        userJobs={userJobs}
        onJobSelect={handleJobSelect}
        onOpenChat={handleOpenChat}
        formatAmount={formatAmount}
        onBidSelect={handleBidSelect}
      />
    </div>
  )
}
