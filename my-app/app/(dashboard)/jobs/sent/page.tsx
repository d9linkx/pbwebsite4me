/**
 * Sent Deliveries Page
 *
 * Shows all deliveries that the user has sent (as sender role)
 */

'use client'

import React, { useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { SentDeliveriesHistoryScreen } from '@/components/SentDeliveriesHistoryScreen'
import { useAppStore } from '@/stores/appStore'
import { ItemSize, DeliveryJob, DeliveryStatus, Bid, Screen } from '@/types/index'
import type { BackendPackageResponse } from '@/types/api'
import { apiService } from '@/utils/apiService'
import { toast } from 'sonner'

export default function SentDeliveriesPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  const user = useAppStore((state) => state.user)
  const deliveryJobs = useAppStore((state) => state.deliveryJobs)
  const setDeliveryJobs = useAppStore((state) => state.setDeliveryJobs)
  const setSelectedJob = useAppStore((state) => state.setSelectedJob)

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
          const allMappedJobs: DeliveryJob[] = response.data.map((pkg: BackendPackageResponse) => {
            // Get sender ID whether it's nested or direct
            const senderId = pkg.sender?.senderId 
              ? (typeof pkg.sender.senderId === 'object' ? pkg.sender.senderId._id : pkg.sender.senderId)
              : user?.id || '';
            
            // Create the DeliveryJob object with all required fields
            const job: DeliveryJob = {
              id: pkg._id || pkg.id || '',
              orderNumber: pkg.orderNumber || `ORD-${(pkg._id || '').slice(0, 8).toUpperCase()}`,
              senderId,
              senderName: pkg.sender?.name || user?.name || '',
              senderPhone: pkg.sender?.phone || user?.phone || '',
              title: pkg.title,
              description: pkg.description || '',
              pickupLocation: pkg.pickupLocation || pkg.sender?.formattedAddress || 'Pickup address not specified',
              dropoffLocation: pkg.dropoffLocation || pkg.receiver?.formattedAddress || 'Delivery address not specified',
              itemSize: (pkg.itemSize as ItemSize) || 'Medium',
              category: pkg.category || '',
              weight: pkg.weight || '',
              value: pkg.value || pkg.price || 0,
              receiverId: pkg.receiver?.id,
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
              images: pkg.items?.[0]?.images?.map(img => img.url) || [],
              bids: pkg.bids?.map(bid => ({
                id: bid._id || bid.id || '',
                palId: bid.palId || '',
                palName: bid.palName || '',
                palRating: 0,
                vehicleType: 'car' as const,
                estimatedTime: '30 mins',
                amount: bid.amount || 0,
                message: bid.message || '',
                placedAt: bid.placedAt || new Date().toISOString(),
                canEdit: true,
                createdAt: bid.placedAt || new Date().toISOString(),
                isAccepted: bid.status === 'accepted',
                bidStatus: (bid.status || 'pending') as 'pending' | 'rejected' | 'accepted' | 'withdrawn' | 'expired'
              })) || [],
              isLive: true,
              createdAt: pkg.createdAt || new Date().toISOString(),
              distance: 0
            };
            
            return job;
          });

          console.log('📦 Total packages fetched:', allMappedJobs.length);

          // Update Zustand store with ALL fetched jobs
          // The userJobs will be computed from this via useMemo
          setDeliveryJobs(allMappedJobs);
        } else {
          console.warn('⚠️ No packages found or request failed');
        }
      } catch (error: unknown) {
        console.error('❌ Error fetching packages:', error);
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        toast.error(`Failed to load deliveries: ${errorMessage}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSentPackages();
  }, [user, router, setDeliveryJobs]);

  // Filter sent packages from the global store
  // This will automatically update when new packages are added
  const userJobs = useMemo(() => {
    if (!user) return [];

    return deliveryJobs
      .filter(job => {
        const jobSenderId = job.senderId?.toString();
        const currentUserId = user.id?.toString();
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
      }))
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [user, deliveryJobs]);

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
    // Open WhatsApp with the selected pal if available
    console.log('🔔 Opening WhatsApp chat for job:', job.id)
    console.log('🔔 Selected pal phone:', job.selectedPalPhone)
    
    if (job.selectedPalPhone) {
      const cleanPhone = job.selectedPalPhone.replace(/[^\d+]/g, '');
      const whatsappUrl = `https://wa.me/${cleanPhone}`;
      console.log('🔔 WhatsApp URL:', whatsappUrl)
      console.log('🔔 Opening WhatsApp...')
      window.open(whatsappUrl, '_blank');
    } else {
      console.log('🔔 No phone number available, falling back to chat page')
      // Fallback: navigate to chat page to see all contacts
      router.push('/chat');
    }
  }

  const handleBidSelect = (bid: Bid, job: DeliveryJob) => {
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
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
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
