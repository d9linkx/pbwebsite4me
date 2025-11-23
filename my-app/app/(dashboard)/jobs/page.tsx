/**
 * Available Jobs Page
 *
 * Shows available delivery jobs for pals to bid on.
 * Replaces the 'available-jobs' screen from the monolith.
 */

'use client'

import React, { Suspense, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { AvailableJobsScreen } from '@/components/AvailableJobScreen'
import { PageLoader } from '@/components/LoadingStates'
import { useAppStore } from '@/stores/appStore'
import { apiService } from '@/utils/apiService'
import type { DeliveryJob, DeliveryStatus, ItemSize } from '@/types/index'

// Types for API response
interface PackageImage {
  url: string;
}

interface PackageItem {
  size?: string;
  category?: string;
  weight?: string | number;
  value?: number;
  images?: PackageImage[];
}

interface SenderInfo {
  _id?: string;
  senderId?: string | { _id: string };
  name?: string;
  phone?: string;
  formattedAddress?: string;
  address?: string;
  pickupAddress?: {
    formattedAddress?: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
}

interface ReceiverInfo {
  name?: string;
  phone?: string;
  formattedAddress?: string;
  address?: string;
  receiverId?: string | { _id: string }; // Add receiverId to the interface
  deliveryAddress?: {
    formattedAddress?: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
}

interface PackageResponse {
  _id: string;
  id?: string;
  title: string;
  description?: string;
  sender?: SenderInfo;
  receiver?: ReceiverInfo;
  items?: PackageItem[];
  price?: number;
  status?: string;
  pickupDate?: string;
  notes?: string;
  bids?: Array<{
    id: string;
    palId: string;
    palName: string;
    palRating: number;
    vehicleType?: 'car' | 'motorcycle' | 'bike' | 'truck' | 'van' | 'bicycle';
    estimatedTime: string;
    amount: number;
    message: string;
    placedAt: string;
    canEdit: boolean;
    isAccepted?: boolean;
    status?: string;
    createdAt: string;
  }>;
  createdAt?: string;
  orderNumber?: string;
}

function AvailableJobsPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isPlacingBid, setIsPlacingBid] = useState(false)

  const {
    user,
    deliveryJobs = [],
    setDeliveryJobs,
    setSelectedJob,
  } = useAppStore()

  // Fetch available jobs from backend
  useEffect(() => {
    const fetchJobs = async () => {
      if (!user) {
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)
        const response = await apiService.getAllPackages()

        if (response.success && response.data) {
          // Map backend packages to frontend DeliveryJob format
          const jobs: DeliveryJob[] = response.data.map((pkg: PackageResponse) => {
            // Get sender ID whether it's nested or direct
            const senderId = pkg.sender?.senderId 
              ? (typeof pkg.sender.senderId === 'object' ? pkg.sender.senderId._id : pkg.sender.senderId)
              : '';
            
            // Create a properly typed DeliveryJob object
            const deliveryJob: DeliveryJob = {
              id: pkg._id || pkg.id || '',
              orderNumber: pkg.orderNumber || `ORD-${(pkg._id || '').slice(0, 8).toUpperCase()}`,
              senderId,
              senderName: pkg.sender?.name || '',
              senderPhone: pkg.sender?.phone || '',
              title: pkg.title,
              description: pkg.description || '',
              pickupLocation: pkg.sender?.formattedAddress || pkg.sender?.address || pkg.sender?.pickupAddress?.formattedAddress || '',
              dropoffLocation: pkg.receiver?.formattedAddress || pkg.receiver?.address || pkg.receiver?.deliveryAddress?.formattedAddress || '',
              itemSize: (pkg.items?.[0]?.size as ItemSize | undefined) || 'Medium',
              category: pkg.items?.[0]?.category || '',
              weight: pkg.items?.[0]?.weight?.toString() || '1kg',
              value: pkg.price || 0,
              receiverName: pkg.receiver?.name || '',
              receiverPhone: pkg.receiver?.phone || '',
              receiverId: '', // This will be set below if available
              status: (pkg.status as DeliveryStatus) || 'pending',
              pickupDate: pkg.pickupDate || new Date().toISOString(),
              pickupTime: '12:00', // Default value since it's required
              notes: pkg.notes || '',
              images: pkg.items?.[0]?.images?.map(img => img.url) || [],
              bids: pkg.bids?.map(bid => ({
                ...bid,
                vehicleType: bid.vehicleType || 'car',
                canEdit: bid.canEdit || false,
                isAccepted: bid.isAccepted || false,
                placedAt: bid.placedAt || new Date().toISOString(),
                createdAt: bid.createdAt || new Date().toISOString()
              })) || [],
              createdAt: pkg.createdAt || new Date().toISOString(),
              distance: 0,
              selectedPalId: '',
              selectedPalName: '',
              selectedPalPhone: '',
              escrowAmount: 0
            };

            // Set receiverId if available
            if (pkg.receiver?.receiverId) {
              deliveryJob.receiverId = typeof pkg.receiver.receiverId === 'object' 
                ? pkg.receiver.receiverId._id 
                : pkg.receiver.receiverId;
            }

            return deliveryJob;
          });

          setDeliveryJobs(jobs);
        }
      } catch (error) {
        console.error('Error fetching jobs:', error)
        toast.error('Failed to load jobs. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchJobs()
  }, [user, setDeliveryJobs])

  // Filter for available jobs
  const availableJobs = deliveryJobs.filter(
    (job) => ['pending', 'bidding', 'assigned', 'in-transit'].includes(job.status)
  )

  const handleJobSelect = (job: DeliveryJob) => {
    setSelectedJob(job)
    router.push(`/jobs/${job.id}`)
  }

  const handlePlaceBid = async (job: DeliveryJob, bidAmount: number, message?: string) => {
    if (!user) {
      toast.error('You must be logged in to place a bid')
      router.push('/auth')
      return
    }

    if (isPlacingBid) return

    setIsPlacingBid(true)

    try {
      console.log('Placing bid:', { jobId: job.id, bidAmount, message })

      const response = await apiService.placeBid(job.id, bidAmount)

      if (response.success && response.data) {
        toast.success('Bid placed successfully!')

        // Refresh the job data to include the new bid
        const updatedJobResponse = await apiService.getPackageById(job.id)
        if (updatedJobResponse.success && updatedJobResponse.data) {
          const updatedPkg = updatedJobResponse.data
          const updatedJob: DeliveryJob = {
            ...job,
            bids: updatedPkg.bids || [],
            status: updatedPkg.status || job.status,
          }

          // Update in store
          setDeliveryJobs(deliveryJobs.map(j => j.id === job.id ? updatedJob : j))
          setSelectedJob(updatedJob)
        }

        // Navigate to bids page
        router.push(`/jobs/${job.id}/bids`)
      } else {
        throw new Error(response.message || 'Failed to place bid')
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to place bid. Please try again.';
      console.error('Error placing bid:', error);
      toast.error(errorMessage);
    } finally {
      setIsPlacingBid(false)
    }
  }

  const handleBack = () => {
    router.back()
  }

  if (isLoading) {
    return <PageLoader message="Loading available jobs..." />
  }

  return (
    <div className="container mx-auto">
      <AvailableJobsScreen
        availableJobs={availableJobs}
        onJobSelect={handleJobSelect}
        onPlaceBid={handlePlaceBid}
        onBack={handleBack}
        currentUser={user}
        allJobs={deliveryJobs}
      />
    </div>
  )
}

export default function JobsPageWrapper() {
  return (
    <Suspense fallback={<PageLoader message="Loading available jobs..." />}>
      <AvailableJobsPage />
    </Suspense>
  )
}
