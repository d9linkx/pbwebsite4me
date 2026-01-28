/**
 * Job Bids Page
 *
 * Shows all bids for a specific job.
 * Dynamic route: /jobs/[id]/bids
 */

'use client'
import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { BidsScreen } from '@/components/BidsScreen';
import { useAppStore } from '@/stores/appStore';
import { apiService } from '@/utils/apiService';
import type { Bid, DeliveryJob, DeliveryStatus, ItemSize, VehicleType } from '@/types/index';
import { toast } from 'sonner';

export default function JobBidsPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = Array.isArray(params.id) ? params.id[0] : params.id;
  const { deliveryJobs, setDeliveryJobs, setSelectedJob, user } = useAppStore();
  const [isLoading, setIsLoading] = useState(true);
  const [isAcceptingBid, setIsAcceptingBid] = useState(false);
  const [job, setJob] = useState<DeliveryJob | null>(null);

  // Use ref to track if we've already fetched the job
  const hasFetched = React.useRef(false);

  // Fetch job details with bids from backend
  useEffect(() => {
    const fetchJobWithBids = async () => {
      if (!user || !jobId || hasFetched.current) return;
      
      hasFetched.current = true;
      setIsLoading(true);

      try {
        const response = await apiService.getPackageById(jobId);
        
        if (response.success && response.data) {
          const pkg = response.data;
          const fetchedJob = mapPackageToJob(pkg);
          
          setJob(fetchedJob);
          setSelectedJob(fetchedJob);
          
          // Update in store only if job data is different
          const existing = deliveryJobs.find(j => j.id === jobId);
          if (JSON.stringify(existing) !== JSON.stringify(fetchedJob)) {
            const updatedJobs = existing
              ? deliveryJobs.map(j => j.id === jobId ? fetchedJob : j)
              : [...deliveryJobs, fetchedJob];
            setDeliveryJobs(updatedJobs);
          }
        }
      } catch (error) {
        console.error('Error fetching job bids:', error);
        toast.error('Failed to load job bids. Please try again.');
      } finally {
        setIsLoading(false);
        console.log('API call completed, isLoading set to false');
      }
    };

    fetchJobWithBids();
  }, [jobId, user?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  // Handler functions
  const handleBidSelect = useCallback((bid: Bid) => {
    // Store selected bid for future use
    console.log('Selected bid:', bid.id);
  }, []);

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  const handleAcceptBid = useCallback(async (bid: Bid) => {
    if (!user || !job || !jobId) {
      toast.error('Unable to accept bid');
      return;
    }

    if (job.senderId !== user.id) {
      toast.error('Only the sender can accept bids');
      return;
    }

    setIsAcceptingBid(true);
    
    try {
      console.log('🎯 Accepting bid:', { jobId: job.id, bidId: bid.id, palId: bid.palId });
      
      const response = await apiService.acceptBid(job.id, bid.id);
      
      if (response.success) {
        toast.success(`Bid accepted! ${bid.palName} will be notified.`);
        
        // Update job status to reflect accepted bid
        const updatedJob = { 
          ...job, 
          status: 'assigned' as DeliveryStatus,
          selectedPalId: bid.palId,
          selectedPalName: bid.palName,
          selectedPalPhone: '', // Will be populated from backend if available
        };
        
        setJob(updatedJob);
        setSelectedJob(updatedJob);
        
        // Update in store
        setDeliveryJobs(deliveryJobs.map(j => j.id === jobId ? updatedJob : j));
        
        // Navigate to tracking after a short delay
        setTimeout(() => {
          router.push(`/jobs/${jobId}/tracking`);
        }, 2000);
        
      } else {
        throw new Error(response.message || 'Failed to accept bid');
      }
    } catch (error) {
      console.error('❌ Error accepting bid:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to accept bid. Please try again.');
    } finally {
      setIsAcceptingBid(false);
    }
  }, [job, user?.id, jobId, setSelectedJob, setDeliveryJobs, deliveryJobs, user, router]);

  const handleViewProfile = useCallback((bid: Bid) => {
    console.log('👤 Viewing profile for Pal:', { palId: bid.palId, palName: bid.palName });
    
    // Navigate to Pal profile page
    router.push(`/pal/${bid.palId}?name=${encodeURIComponent(bid.palName)}`);
  }, [router]);

  const handleOpenChat = useCallback((job: DeliveryJob) => {
    // Open WhatsApp with the selected pal if available
    if (job.selectedPalPhone) {
      const cleanPhone = job.selectedPalPhone.replace(/[^\d+]/g, '');
      const whatsappUrl = `https://wa.me/${cleanPhone}`;
      window.open(whatsappUrl, '_blank');
    } else {
      // Fallback: navigate to chat page to see all contacts
      router.push('/chat');
    }
  }, [router]);

  // Loading state
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Loading bids...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-gray-700">Job not found</h2>
          <button
            onClick={handleBack}
            className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-[#d63a00]"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <BidsScreen
      job={job}
      onBack={handleBack}
      onBidSelect={handleBidSelect}
      onAcceptBid={handleAcceptBid}
      onViewProfile={handleViewProfile}
      onOpenChat={handleOpenChat}
      isAcceptingBid={isAcceptingBid}
    />
  );
}

// Helper function to map API response to DeliveryJob
function mapPackageToJob(pkg: {
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
    size?: string;
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
  bids?: Array<{
    id?: string;
    _id?: string;
    palId?: string;
    palName?: string;
    palRating?: number;
    vehicleType?: string;
    estimatedTime?: string;
    amount?: number;
    message?: string;
    placedAt?: string;
    canEdit?: boolean;
    isAccepted?: boolean;
    createdAt?: string;
  }>;
  orderNumber?: string;
  createdAt?: string;
}): DeliveryJob {
  return {
    id: pkg._id || pkg.id || '',
    title: pkg.title,
    description: pkg.description || '',
    pickupLocation: pkg.sender?.formattedAddress || 'Not specified',
    dropoffLocation: pkg.receiver?.formattedAddress || 'Not specified',
    itemSize: (pkg.items?.[0]?.size === 'Small' || pkg.items?.[0]?.size === 'Medium' || pkg.items?.[0]?.size === 'Large') 
      ? pkg.items[0].size as ItemSize 
      : 'Medium' as ItemSize,
    category: pkg.items?.[0]?.category || 'general',
    weight: pkg.items?.[0]?.weight?.toString() || '1kg',
    itemColor: '',
    value: pkg.price || pkg.value || 0,
    receiverName: pkg.receiver?.name || '',
    receiverPhone: pkg.receiver?.phone || '',
    receiverId: typeof pkg.receiver?.receiverId === 'object' 
      ? pkg.receiver.receiverId._id 
      : pkg.receiver?.receiverId || '',
    senderId: typeof pkg.sender?.senderId === 'object' 
      ? pkg.sender.senderId._id 
      : pkg.sender?.senderId || '',
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
    bids: (pkg.bids || []).map((bid) => ({
      ...bid,
      id: bid.id || bid._id || '',
      palId: bid.palId || '',
      palName: bid.palName || '',
      palRating: bid.palRating || 0,
      vehicleType: (bid.vehicleType || 'car') as VehicleType,
      estimatedTime: bid.estimatedTime || '',
      amount: bid.amount || 0,
      message: bid.message || '',
      canEdit: bid.canEdit || false,
      isAccepted: bid.isAccepted || false,
      placedAt: bid.placedAt || new Date().toISOString(),
      createdAt: bid.createdAt || new Date().toISOString()
    })),
    isLive: true,
    createdAt: pkg.createdAt || new Date().toISOString(),
    orderNumber: pkg.orderNumber || `ORD-${(pkg._id || pkg.id || '').slice(0, 8).toUpperCase()}`,
  };
}
