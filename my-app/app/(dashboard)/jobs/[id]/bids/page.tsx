/**
 * Job Bids Page
 *
 * Shows all bids for a specific job.
 * Dynamic route: /jobs/[id]/bids
 */

'use client'

import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { BidsScreen } from '@/components/BidsScreen'
import { useAppStore } from '@/stores/appStore'
import { apiService } from '@/utils/apiService'
import type { Bid, DeliveryJob, DeliveryStatus, ItemSize } from '@/types/index'
import { toast } from 'sonner'

export default function JobBidsPage() {
  const params = useParams()
  const router = useRouter()
  const jobId = params.id as string
  const [isLoading, setIsLoading] = useState(true)
  const [isAcceptingBid, setIsAcceptingBid] = useState(false)

  const {
    user,
    deliveryJobs,
    setDeliveryJobs,
    setSelectedJob,
    setSelectedBid,
  } = useAppStore()

  const [job, setJob] = useState<DeliveryJob | null>(
    deliveryJobs.find((j) => j.id === jobId) || null
  )

  // Fetch job details with bids from backend
  useEffect(() => {
    const fetchJobWithBids = async () => {
      const currentUser = user
      if (!currentUser) {
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)
        const response = await apiService.getPackageById(jobId)

        if (response.success && response.data) {
          const pkg = response.data as {
            _id?: string;
            id?: string;
            title: string;
            description?: string;
            sender?: {
              senderId?: string | { _id: string };
              name?: string;
              phone?: string;
              formattedAddress?: string;
            };
            receiver?: {
              receiverId?: string | { _id: string };
              name?: string;
              phone?: string;
              formattedAddress?: string;
            };
            pal?: {
              palId?: string;
              name?: string;
              phone?: string;
            };
            items?: Array<{
              size?: ItemSize;
              category?: string;
              weight?: string | number;
              images?: Array<{ url: string }>;
            }>;
            price?: number;
            value?: number;
            status?: string;
            pickupDate?: string;
            pickupTime?: string;
            notes?: string;
            escrowAmount?: number;
            bids?: Bid[];
            orderNumber?: string;
            createdAt?: string;
          };

          // Map backend package to frontend DeliveryJob format
          const fetchedJob: DeliveryJob = {
            id: pkg._id || pkg.id || '',
            title: pkg.title,
            description: pkg.description || '',
            pickupLocation: pkg.sender?.formattedAddress || 'Not specified',
            dropoffLocation: pkg.receiver?.formattedAddress || 'Not specified',
            itemSize: (pkg.items?.[0]?.size || 'Medium') as ItemSize,
            category: pkg.items?.[0]?.category || 'general',
            weight: pkg.items?.[0]?.weight?.toString() || '1kg',
            itemColor: '',
            value: pkg.price || pkg.value || 0,
            receiverName: pkg.receiver?.name || '',
            receiverPhone: pkg.receiver?.phone || '',
            receiverId: typeof pkg.receiver?.receiverId === 'object' ? pkg.receiver.receiverId._id : pkg.receiver?.receiverId || '',
            senderId: typeof pkg.sender?.senderId === 'object' ? pkg.sender.senderId._id : pkg.sender?.senderId || '',
            senderName: pkg.sender?.name || '',
            senderPhone: pkg.sender?.phone || '',
            selectedPalId: pkg.pal?.palId,
            selectedPalName: pkg.pal?.name,
            selectedPalPhone: pkg.pal?.phone,
            status: (pkg.status || 'pending') as DeliveryStatus,
            pickupDate: pkg.pickupDate || new Date().toISOString(),
            pickupTime: pkg.pickupTime || '',
            notes: pkg.notes || '',
            images: pkg.items?.[0]?.images?.map((img: { url: string }) => img.url) || [],
            escrowAmount: pkg.escrowAmount || 0,
            bids: (pkg.bids || []).map(bid => ({
              ...bid,
              vehicleType: bid.vehicleType || 'car',
              canEdit: bid.canEdit || false,
              isAccepted: bid.isAccepted || false,
              placedAt: bid.placedAt || new Date().toISOString(),
              createdAt: bid.createdAt || new Date().toISOString()
            })),
            isLive: true,
            createdAt: pkg.createdAt || new Date().toISOString(),
            orderNumber: pkg.orderNumber || `ORD-${(pkg._id || pkg.id || '').slice(0, 8).toUpperCase()}`,
          }

          setJob(fetchedJob)
          setSelectedJob(fetchedJob)

          // Update in store
          const currentJobs = deliveryJobs
          const jobExists = currentJobs.some(j => j.id === jobId)
          if (jobExists) {
            setDeliveryJobs(currentJobs.map(j => j.id === jobId ? fetchedJob : j))
          } else {
            setDeliveryJobs([...currentJobs, fetchedJob])
          }
        }
      } catch (error) {
        console.error('Error fetching job bids:', error)
        toast.error('Failed to load job bids. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchJobWithBids()
  }, [jobId, user, deliveryJobs, setDeliveryJobs, setSelectedJob])

  const handleBidSelect = (bid: Bid, job: DeliveryJob) => {
    setSelectedBid(bid)
    // Could navigate to bid detail or accept flow
  }

  const handleBack = () => {
    router.back()
  }

  const handleAcceptBid = async (bid: Bid) => {
    if (!user || !job) {
      toast.error('Unable to accept bid')
      return
    }

    // Check if user is the sender
    if (job.senderId !== user.id) {
      toast.error('Only the sender can accept bids')
      return
    }

    if (isAcceptingBid) return

    setIsAcceptingBid(true)

    try {
      console.log('Accepting bid:', { jobId: job.id, bidId: bid.id })

      const response = await apiService.acceptBid(job.id, bid.id)

      if (response.success && response.data) {
        toast.success('Bid accepted successfully!')

        // Refresh job data
        const updatedJobResponse = await apiService.getPackageById(job.id)
        if (updatedJobResponse.success && updatedJobResponse.data) {
          const updatedPkg = updatedJobResponse.data
          const updatedJob: DeliveryJob = {
            ...job,
            status: (updatedPkg.status || 'assigned') as DeliveryStatus,
            selectedPalId: updatedPkg.pal?.palId,
            selectedPalName: updatedPkg.pal?.name,
            selectedPalPhone: updatedPkg.pal?.phone,
            bids: updatedPkg.bids || [],
          }

          setJob(updatedJob)
          setSelectedJob(updatedJob)
          setDeliveryJobs(deliveryJobs.map(j => j.id === job.id ? updatedJob : j))
        }

        // Navigate to job details
        router.push(`/jobs/${job.id}`)
      } else {
        throw new Error(response.message || 'Failed to accept bid')
      }
    } catch (error: unknown) {
      console.error('Error accepting bid:', error)
      const errorMessage = error instanceof Error ? error.message : 'Failed to accept bid. Please try again.'
      toast.error(errorMessage)
    } finally {
      setIsAcceptingBid(false)
    }
  }

  const handleViewProfile = (bid: Bid) => {
    // Navigate to user profile
    console.log('View profile for bid:', bid.id)
    // TODO: Implement profile viewing
    toast.info('Profile viewing coming soon!')
  }

  const handleOpenChat = (job: DeliveryJob) => {
    // Open chat with the job poster
    console.log('Open chat for job:', job.id)
    router.push(`/chat?jobId=${job.id}`)
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#f44708] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading bids...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!job) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">Job not found</p>
          <button
            onClick={() => router.push('/jobs')}
            className="bg-[#f44708] text-white px-6 py-2 rounded-lg hover:bg-[#d63a00] transition-colors"
          >
            Browse Jobs
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <BidsScreen
        job={job}
        onBidSelect={handleBidSelect}
        onBack={handleBack}
        onAcceptBid={handleAcceptBid}
        onViewProfile={handleViewProfile}
        onOpenChat={handleOpenChat}
      />
    </div>
  )
}
