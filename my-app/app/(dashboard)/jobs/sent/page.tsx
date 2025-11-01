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
import type { DeliveryJob, Screen, ItemSize, DeliveryStatus, Bid } from '@/types/index'
import { apiService } from '@/utils/apiService'
import { toast } from 'sonner'

interface Address {
  coordinates?: {
    lat: number;
    lng: number;
  };
  formattedAddress?: string;
}

// Types for API response
interface PackageImage {
  url: string;
  // Add other image properties as needed
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
  formattedAddress?: string;  // For the display address string
  address?: string;           // Alternative property name that might be used
  pickupAddress?: {
    formattedAddress?: string;  // Nested address in pickupAddress
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
}

interface ReceiverInfo {
  name?: string;
  phone?: string;
  formattedAddress?: string;  // For the display address string
  address?: string;          // Alternative property name
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

export default function SentDeliveriesPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [userJobs, setUserJobs] = useState<DeliveryJob[]>([])
  const [selectedJob, setSelectedJob] = useState<DeliveryJob | null>(null)
  const [selectedBid, setSelectedBid] = useState<Bid | null>(null)

  const user = useAppStore((state) => state.user)
  const setDeliveryJobs = useAppStore((state) => state.setDeliveryJobs)

  // Fetch sent packages from backend on component mount
  useEffect(() => {
    const fetchSentPackages = async () => {
      if (!user) {
        router.push('/auth');
        return;
      }

      try {
        setIsLoading(true);
        console.log('📦 Fetching sent packages from backend...');

        const response = await apiService.getSentPackages();

        if (response.success && response.data) {
          console.log('✅ Packages fetched from backend:', response.data);

          // Map backend packages to frontend DeliveryJob format
          const allMappedJobs: DeliveryJob[] = response.data.map((pkg: PackageResponse) => {
            // Get sender ID whether it's nested or direct
            const senderId = pkg.sender?.senderId 
              ? (typeof pkg.sender.senderId === 'object' ? pkg.sender.senderId._id : pkg.sender.senderId)
              : user?.id || '';
            
            // Get coordinates with proper typing
            const pickupCoords = pkg.sender?.pickupAddress?.coordinates;
            const dropoffCoords = pkg.receiver?.deliveryAddress?.coordinates;
            
            // Create the DeliveryJob object with all required fields
            const job: DeliveryJob = {
              id: pkg._id || pkg.id || '',
              orderNumber: pkg.orderNumber || `ORD-${(pkg._id || '').slice(0, 8).toUpperCase()}`,
              senderId,
              senderName: pkg.sender?.name || user?.name || '',
              senderPhone: pkg.sender?.phone || user?.phone || '',
              title: pkg.title,
              description: pkg.description || '',
              pickupLocation: pkg.sender?.formattedAddress || pkg.sender?.address || pkg.sender?.pickupAddress?.formattedAddress || 'Pickup address not specified',
              dropoffLocation: pkg.receiver?.formattedAddress || pkg.receiver?.address || pkg.receiver?.deliveryAddress?.formattedAddress || 'Delivery address not specified',
              itemSize: (pkg.items?.[0]?.size as ItemSize) || 'Medium',
              category: pkg.items?.[0]?.category || '',
              weight: pkg.items?.[0]?.weight?.toString() || '',
              value: pkg.price || pkg.items?.[0]?.value || 0,
              receiverName: pkg.receiver?.name || '',
              receiverPhone: pkg.receiver?.phone || '',
              status: (pkg.status as DeliveryStatus) || 'pending',
              pickupDate: pkg.pickupDate || new Date().toISOString(),
              pickupTime: '12:00', // Default value since it's required
              notes: pkg.notes || '',
              images: pkg.items?.[0]?.images?.map(img => img.url) || [],
              bids: pkg.bids?.map(bid => ({
                ...bid,
                vehicleType: bid.vehicleType || 'car', // Provide a default value if not present
                canEdit: bid.canEdit || false,
                isAccepted: bid.isAccepted || false,
                placedAt: bid.placedAt || new Date().toISOString(),
                createdAt: bid.createdAt || new Date().toISOString()
              })) || [],
              isLive: true,
              createdAt: pkg.createdAt || new Date().toISOString(),
              distance: 0,
              ...(pickupCoords && { 
                pickupCoordinates: {
                  lat: pickupCoords.lat,
                  lng: pickupCoords.lng,
                  timestamp: new Date().toISOString()
                }
              }),
              ...(dropoffCoords && {
                dropoffCoordinates: {
                  lat: dropoffCoords.lat,
                  lng: dropoffCoords.lng,
                  timestamp: new Date().toISOString()
                }
              })
            };
            
            return job;
          });

          // Filter packages where user is the sender
          const sentJobs = allMappedJobs
            .filter(job => {
              const jobSenderId = job.senderId?.toString();
              const currentUserId = user?.id?.toString();
              console.log('Comparing senderId:', jobSenderId, 'with userId:', currentUserId);
              return jobSenderId === currentUserId;
            })
            .map(job => ({
              ...job,
              orderNumber: job.orderNumber || `ORD-${job.id.slice(0, 8).toUpperCase()}`,
              pickupTime: job.pickupTime || '12:00',
              bids: job.bids || [],
              value: job.value || 0,
              status: job.status || 'pending',
              createdAt: job.createdAt || new Date().toISOString(),
              pickupDate: job.pickupDate || new Date().toISOString()
            }));

          console.log('📦 Filtered sent packages:', sentJobs.length, 'out of', allMappedJobs.length, 'total');
          setUserJobs(sentJobs);

          // Update Zustand store with ALL fetched jobs (not just sent)
          setDeliveryJobs(allMappedJobs);
        } else {
          console.warn('⚠️ No sent packages found or request failed');
          setUserJobs([]);
        }
      } catch (error: unknown) {
        console.error('❌ Error fetching sent packages:', error);
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        toast.error(`Failed to load sent deliveries: ${errorMessage}`);
        setUserJobs([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSentPackages();
  }, [user, router, setDeliveryJobs]);

  const handleBack = () => {
    router.push('/dashboard')
  }

  const handleNavigate = (screen: Screen) => {
    const screenToRouteMap: Partial<Record<Screen, string>> = {
      'dashboard': '/dashboard',
      'post-delivery': '/jobs/post',
      'tracking': '/jobs/tracking',
      'chat': '/chat',
      'bids': '/jobs/bids',
    }

    const route = screenToRouteMap[screen] || '/dashboard'
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
