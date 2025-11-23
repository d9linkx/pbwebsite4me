/**
 * Accepted Bids Page
 *
 * Shows deliveries where the user (as a pal) has had their bid accepted.
 * Displays active deliveries that the pal is responsible for.
 */

'use client'

import React, { useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { AcceptedBidsScreen } from '@/components/AcceptedBidsScreen'
import { useAppStore } from '@/stores/appStore'
import type { DeliveryJob } from '@/types/index'
import { apiService } from '@/utils/apiService'
import { toast } from 'sonner'

export default function AcceptedBidsPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  const {
    user,
    deliveryJobs,
    setDeliveryJobs,
    setSelectedJob,
  } = useAppStore()

  // Fetch accepted bids from backend
  useEffect(() => {
    const fetchAcceptedBids = async () => {
      if (!user) {
        router.push('/auth')
        return
      }

      try {
        setIsLoading(true)
        const response = await apiService.getAllPackages()

        if (response.success && response.data) {
          // Map backend packages to frontend DeliveryJob format
          const jobs = response.data.map((pkg: any): DeliveryJob => ({
            id: pkg._id || pkg.id || '',
            title: pkg.title,
            description: pkg.description || '',
            pickupLocation: pkg.sender?.formattedAddress || pkg.pickupLocation || '',
            dropoffLocation: pkg.receiver?.formattedAddress || pkg.dropoffLocation || '',
            itemSize: pkg.items?.[0]?.size || 'Medium',
            category: pkg.items?.[0]?.category || 'general',
            weight: pkg.items?.[0]?.weight?.toString() || '1kg',
            value: pkg.price || pkg.value || 0,
            receiverName: pkg.receiver?.name || '',
            receiverPhone: pkg.receiver?.phone || '',
            receiverId: pkg.receiver?.receiverId || '',
            senderId: typeof pkg.sender?.senderId === 'object'
              ? pkg.sender.senderId._id
              : (pkg.sender?.senderId || ''),
            senderName: pkg.sender?.name || '',
            senderPhone: pkg.sender?.phone || '',
            selectedPalId: pkg.pal?.palId,
            selectedPalName: pkg.pal?.name,
            selectedPalPhone: pkg.pal?.phone,
            status: pkg.status || 'pending',
            pickupDate: pkg.pickupDate || new Date().toISOString(),
            pickupTime: pkg.pickupTime || '',
            notes: pkg.notes || '',
            images: pkg.items?.[0]?.images?.map((img: { url: string }) => img.url) || [],
            escrowAmount: pkg.escrowAmount || 0,
            bids: pkg.bids?.map((bid: any) => ({
              ...bid,
              vehicleType: bid.vehicleType || 'car',
              canEdit: bid.canEdit || false,
              isAccepted: bid.isAccepted || false,
              placedAt: bid.placedAt || new Date().toISOString(),
              createdAt: bid.createdAt || new Date().toISOString()
            })) || [],
            distance: 0,
            createdAt: pkg.createdAt || new Date().toISOString(),
            orderNumber: pkg.orderNumber || `ORD-${(pkg._id || '').slice(0, 8).toUpperCase()}`,
            // Add acceptedBidAmount for this specific page
            acceptedBidAmount: pkg.bids?.find((b: any) =>
              b.palId === user.id && (b.isAccepted || pkg.pal?.palId === user.id)
            )?.amount || 0,
          }))

          setDeliveryJobs(jobs)
        }
      } catch (error) {
        console.error('Error fetching accepted bids:', error)
        toast.error('Failed to load accepted bids. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchAcceptedBids()
  }, [user, router, setDeliveryJobs])

  // Filter for jobs where user is the accepted pal
  const acceptedJobs = useMemo(() => {
    if (!user) return []

    return deliveryJobs
      .filter((job) => {
        // Job must be assigned to this pal
        return job.selectedPalId === user.id &&
               (job.status === 'assigned' ||
                job.status === 'picked-up' ||
                job.status === 'in-transit' ||
                job.status === 'delivered')
      })
      .sort((a, b) => {
        // Sort by status priority (active jobs first)
        const statusOrder: Record<string, number> = {
          'in-transit': 1,
          'picked-up': 2,
          'assigned': 3,
          'delivered': 4,
        }
        return (statusOrder[a.status] || 99) - (statusOrder[b.status] || 99)
      })
  }, [user, deliveryJobs])

  const handleBack = () => {
    router.push('/dashboard')
  }

  const handleViewDetails = (job: DeliveryJob) => {
    setSelectedJob(job)
    router.push(`/jobs/${job.id}`)
  }

  const handleOpenChat = (job: DeliveryJob) => {
    setSelectedJob(job)
    router.push('/chat')
  }

  const handleCall = (phoneNumber: string) => {
    // Remove any non-numeric characters
    const cleanPhone = phoneNumber.replace(/\D/g, '')

    // Try WhatsApp first, fallback to phone
    if (typeof window !== 'undefined') {
      const whatsappUrl = `https://wa.me/${cleanPhone}`
      window.open(whatsappUrl, '_blank')
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#f44708] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading accepted bids...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto">
      <AcceptedBidsScreen
        onBack={handleBack}
        acceptedJobs={acceptedJobs}
        onViewDetails={handleViewDetails}
        onOpenChat={handleOpenChat}
        onCall={handleCall}
        user={user}
      />
    </div>
  )
}
