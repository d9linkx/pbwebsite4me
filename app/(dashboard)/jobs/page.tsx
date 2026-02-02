/**
 * Available Jobs Page
 *
 * Shows available delivery jobs for pals to bid on.
 * Replaces the 'available-jobs' screen from the monolith.
 */

'use client'

import React, { Suspense, useEffect, useState, useMemo, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { AvailableJobsScreen } from '@/components/AvailableJobScreen'
import { PageLoader } from '@/components/LoadingStates'
import { useAppStore } from '@/stores/appStore'
import { apiService } from '@/utils/apiService'
import type { DeliveryJob, DeliveryStatus, ItemSize, Bid } from '@/types/index'
import type { BackendPackageResponse } from '@/types/api'

// Define the backend bid type based on actual backend structure
type BackendBid = {
  _id?: string;
  id?: string;
  bidderId?: string; // Backend uses bidderId
  palId?: string; // Fallback
  price?: number; // Backend uses price
  amount?: number; // Fallback
  message?: string;
  placedAt?: string;
  status?: string;
  palName?: string;
};

// Define sender object type for better type safety
type SenderObject = { _id: string } & Record<string, unknown>;

// Helper function to transform backend bid to frontend Bid type
const transformBackendBid = (backendBid: BackendBid): Bid => ({
  id: backendBid._id || backendBid.id || '',
  palId: backendBid.bidderId || backendBid.palId || '', // Backend uses bidderId
  palName: backendBid.palName || `Pal ${(backendBid.bidderId || backendBid.palId || '').slice(-4) || 'Unknown'}`,
  palRating: 0, // Backend doesn't provide palRating, default to 0
  vehicleType: 'motorcycle', // Backend doesn't provide vehicleType, default to motorcycle
  estimatedTime: '30 mins', // Backend doesn't provide estimatedTime, default to 30 mins
  amount: backendBid.price || backendBid.amount || 0, // Backend uses price
  message: backendBid.message || '',
  placedAt: backendBid.placedAt || new Date().toISOString(),
  canEdit: backendBid.status === 'pending',
  isAccepted: backendBid.status === 'accepted',
  createdAt: backendBid.placedAt || new Date().toISOString(),
});

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
  const fetchJobs = useCallback(async () => {
    if (!user) {
      setIsLoading(false)
      return
    }

    try {
      setIsLoading(true)
      console.log('🌐 Fetching all packages...');
      const response = await apiService.getAllPackages()
      console.log('📡 API response:', response);

      if (response.success && response.data) {
        console.log('📦 Raw backend packages:', response.data);
        console.log('📦 Number of packages:', response.data.length);
        
        // Map backend packages to frontend DeliveryJob format
        const jobs: DeliveryJob[] = response.data.map((pkg: BackendPackageResponse) => {
          // Get sender ID whether it's nested or direct
          const senderId = pkg.sender?.senderId 
            ? (typeof pkg.sender.senderId === 'object' && pkg.sender.senderId !== null 
                ? (pkg.sender.senderId as SenderObject)._id 
                : pkg.sender.senderId)
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
            pickupLocation: pkg.sender?.formattedAddress || '',
            dropoffLocation: pkg.receiver?.formattedAddress || '',
            itemSize: (pkg.items?.[0]?.size as ItemSize | undefined) || 'Medium',
            category: pkg.items?.[0]?.category || '',
            weight: pkg.items?.[0]?.weight?.toString() || '1kg',
            value: pkg.price || 0,
            receiverName: pkg.receiver?.name || '',
            receiverPhone: pkg.receiver?.phone || '',
            receiverId: '', // Backend doesn't provide receiverId, leaving empty
            status: (pkg.status as DeliveryStatus) || 'pending',
            pickupDate: pkg.pickupDate || new Date().toISOString(),
            pickupTime: '12:00', // Default value since it's required
            notes: pkg.notes || '',
            images: pkg.items?.[0]?.images?.map(img => img.url) || [],
            bids: pkg.bids?.map(transformBackendBid) || [],
            createdAt: pkg.createdAt || new Date().toISOString(),
            distance: 0,
            selectedPalId: '',
            selectedPalName: '',
            selectedPalPhone: '',
            escrowAmount: 0
          };

          return deliveryJob;
        });

        setDeliveryJobs(jobs);
        console.log('✅ Jobs mapped successfully:', jobs.length, 'jobs');
        
        // Check for jobs with bids
        const jobsWithBids = jobs.filter(job => job.bids && job.bids.length > 0);
        console.log('🎯 Jobs with bids:', jobsWithBids.length);
        
        if (jobsWithBids.length > 0) {
          console.log('🔍 Sample job with bids:', jobsWithBids[0]);
          console.log('🔍 Sample job bids structure:', jobsWithBids[0].bids);
        } else {
          console.log('⚠️ No jobs have bids in the transformed data');
        }
        
        // Show sample job structure
        console.log('🔍 Sample transformed job:', {
          id: jobs[0]?.id,
          title: jobs[0]?.title,
          status: jobs[0]?.status,
          bidsCount: jobs[0]?.bids?.length,
          bids: jobs[0]?.bids,
          senderId: jobs[0]?.senderId,
          isUserSender: jobs[0]?.senderId === user?._id
        });
        
        // Check if user is only seeing their own jobs
        const userJobs = jobs.filter(job => job.senderId === user?._id);
        const otherUserJobs = jobs.filter(job => job.senderId !== user?._id);
        
        console.log('👤 Jobs created by user:', userJobs.length);
        console.log('🌍 Jobs created by others:', otherUserJobs.length);
        
        if (otherUserJobs.length > 0) {
          console.log('🔍 Sample job from other user:', {
            id: otherUserJobs[0]?.id,
            senderId: otherUserJobs[0]?.senderId,
            bidsCount: otherUserJobs[0]?.bids?.length,
            bids: otherUserJobs[0]?.bids
          });
        }
      } else {
        console.log('❌ API response failed:', response);
      }
    } catch (error) {
      console.error('❌ Error fetching jobs:', error)
      toast.error('Failed to load jobs. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }, [user, setDeliveryJobs])

  // Fetch jobs on component mount and when user changes
  useEffect(() => {
    fetchJobs()
  }, [fetchJobs])

  // Filter for available jobs (exclude packages where user has already bid)
  const availableJobs = useMemo(() => {
    const filtered = deliveryJobs.filter(
      (job) => {
        // Check if package is in appropriate status
        const isAppropriateStatus = ['pending', 'bidding', 'assigned', 'in-transit'].includes(job.status);
        
        // Check if user has already bid on this package
        const hasUserBid = job.bids.some(bid => bid.palId === user?._id);
        
        // Debug logging for ALL jobs (not just ones with bids)
        console.log(`🔍 Job ${job.id}:`, {
          title: job.title,
          status: job.status,
          bidsCount: job.bids.length,
          userBids: job.bids.filter(bid => bid.palId === user?._id),
          allBids: job.bids.map(b => ({ palId: b.palId, amount: b.amount, id: b.id })),
          userId: user?._id,
          isAppropriateStatus,
          hasUserBid,
          willBeAvailable: isAppropriateStatus && !hasUserBid,
          willBeMyBid: isAppropriateStatus && hasUserBid,
          // Show raw bid data for debugging
          rawBids: job.bids
        });
        
        // Only include if status is appropriate AND user hasn't bid yet
        return isAppropriateStatus && !hasUserBid;
      }
    );
    
    console.log('📋 Available jobs count:', filtered.length);
    console.log('👤 Current user ID:', user?._id);
    console.log('👤 Current user:', user);
    return filtered;
  }, [deliveryJobs, user]);

  // Filter for jobs where user has already bid
  const myBids = useMemo(() => {
    const filtered = deliveryJobs.filter(
      (job) => {
        // Check if package is in appropriate status
        const isAppropriateStatus = ['pending', 'bidding', 'assigned', 'in-transit'].includes(job.status);
        
        // Check if user has already bid on this package
        const hasUserBid = job.bids.some(bid => bid.palId === user?._id);
        
        // Only include if status is appropriate AND user has bid
        return isAppropriateStatus && hasUserBid;
      }
    );
    
    console.log('📋 My bids count:', filtered.length);
    return filtered;
  }, [deliveryJobs, user]);

  const handleJobSelect = (job: DeliveryJob) => {
    setSelectedJob(job)
    router.push(`/jobs/${job.id}`)
  }

  const handlePlaceBid = async (job: DeliveryJob, bidAmount: number) => {
    if (!user) {
      toast.error('You must be logged in to place a bid')
      router.push('/auth')
      return
    }

    if (isPlacingBid) return

    setIsPlacingBid(true)

    try {
      const response = await apiService.placeBid(job.id, bidAmount)

      if (response.success && response.data) {
        toast.success('Bid placed successfully!')

        // Refresh the job data to include the new bid
        const updatedJobResponse = await apiService.getPackageById(job.id)
        if (updatedJobResponse.success && updatedJobResponse.data) {
          const updatedPkg = updatedJobResponse.data
          const updatedJob: DeliveryJob = {
            ...job,
            bids: updatedPkg.bids?.map(transformBackendBid) || [],
            status: (updatedPkg.status as DeliveryStatus) || job.status,
          }

          // Update in store
          const updatedJobs = deliveryJobs.map(j => j.id === job.id ? updatedJob : j);
          setDeliveryJobs(updatedJobs);
          setSelectedJob(updatedJob)

          // Debug logging for the updated job
          console.log('🔄 Updated job with new bid:', updatedJob);
          console.log('🔄 User bids in updated job:', updatedJob.bids);
          console.log('🔄 Current user ID:', user?._id);
          
          // Additional debugging to check bid structure
          const userBids = updatedJob.bids.filter(bid => bid.palId === user?._id);
          console.log('🔍 User bids after filtering:', userBids);
          console.log('🔍 Bid palId values:', updatedJob.bids.map(b => ({ palId: b.palId, amount: b.amount })));
          console.log('🔍 User ID comparison:', {
            userId: user?._id,
            userBidsFound: userBids.length,
            bidMatches: updatedJob.bids.map(bid => ({
              palId: bid.palId,
              userId: user?._id,
              matches: bid.palId === user?._id
            }))
          });
        }

        // Refresh jobs after a short delay to ensure filters update
        setTimeout(() => {
          fetchJobs()
        }, 1000);
      } else {
        throw new Error(response.message || 'Failed to place bid')
      }
    } catch (error: unknown) {
      console.error('Error placing bid:', error);
      
      // Try to extract more error information
      let errorMessage = 'Failed to place bid. Please try again.';
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'object' && error !== null) {
        const messageFromError = (error as Record<string, unknown>).message;
        errorMessage = typeof messageFromError === 'string' ? messageFromError : JSON.stringify(error);
      } else {
        errorMessage = String(error);
      }
      
      // Handle specific verification errors
      if (errorMessage.includes('verification required') || errorMessage.includes('403')) {
        toast.error('You need to complete document verification before bidding. Please complete your KYC verification first.');
        router.push('/profile/verification');
      } else {
        toast.error(errorMessage);
      }
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
        myBids={myBids}
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
