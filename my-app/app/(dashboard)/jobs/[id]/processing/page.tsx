'use client'
import { useEffect, useState, useCallback } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useAppStore } from '@/stores/appStore'
import { JobProcessingScreen } from '@/components/JobProcessingScreen'
import { apiService } from '@/utils/apiService'
import { io, Socket } from 'socket.io-client'
import { DeliveryJob, ItemSize, DeliveryStatus } from '@/types'
import { BackendPackageResponse } from '@/types/api'

export default function JobProcessingPage() {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const jobId = params.id as string
  const shouldAutoMinimize = searchParams.get('autoMinimize') === 'true'
  const {
    deliveryJobs,
    setDeliveryJobs,
    processingJob,
    isProcessingMinimized,
    processingBidCount,
    setProcessingJob,
    setProcessingMinimized,
    setProcessingBidCount
  } = useAppStore()
  const [job, setJob] = useState(deliveryJobs.find(j => j.id === jobId) || null)
  const [socket, setSocket] = useState<Socket | null>(null)

  // Expand the view when this page loads (un-minimize)
  useEffect(() => {
    setProcessingMinimized(false)
  }, [setProcessingMinimized])

  // Initialize processing job in global store on mount
  useEffect(() => {
    if (!job) {
      apiService.getPackageById(jobId).then(response => {
        if (response.success && response.data) {
          const mappedJob = mapPackageToDeliveryJob(response.data)
          setJob(mappedJob)
          setProcessingJob(mappedJob)
          setProcessingBidCount(response.data.bids?.length || 0)
        } else {
          console.error('Failed to fetch job:', response.message)
          router.push('/dashboard')
        }
      }).catch(error => {
        console.error('Error fetching job:', error)
        router.push('/dashboard')
      })
    } else {
      // If job exists, set it as the processing job
      setProcessingJob(job)
      setProcessingBidCount(job.bids?.length || 0)
    }
    // Only run once on mount or when jobId changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobId])

  // Initialize WebSocket connection separately
  useEffect(() => {
    const socketInstance = io('http://localhost:4000', {
      auth: {
        token: localStorage.getItem('token')
      },
      transports: ['websocket', 'polling']
    })

    socketInstance.on('connect', () => {
      console.log('WebSocket connected')
      // Join package-specific room for real-time updates
      socketInstance.emit('join_room', `package_${jobId}`)
    })

    // Listen for bid_placed events
    socketInstance.on('bid_placed', (data) => {
      if (data.packageId === jobId) {
        console.log('New bid received:', data)
        setProcessingBidCount(data.bidCount)

        // Update job state with new bid
        setJob(prevJob => {
          if (!prevJob) return prevJob
          return { ...prevJob, bids: [...(prevJob.bids || []), data.latestBid] }
        })
      }
    })

    socketInstance.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error)
    })

    setSocket(socketInstance)

    return () => {
      if (socketInstance) {
        socketInstance.emit('leave_room', `package_${jobId}`)
        socketInstance.disconnect()
      }
    }
  }, [jobId])

  const handleViewDetails = useCallback(() => {
    // Navigate directly to the bids page since sender wants to see bids and user details
    router.push(`/jobs/${jobId}/bids`)
  }, [router, jobId])

  const handleClose = useCallback(() => {
    // Just minimize and navigate back - don't clear the processing job
    setProcessingMinimized(true)
    setTimeout(() => {
      router.push('/dashboard')
    }, 100)
  }, [router, setProcessingMinimized])

  const handleMinimize = useCallback(() => {
    // Set minimized state BEFORE redirecting
    setProcessingMinimized(true)
    // Use setTimeout to ensure state is set before navigation
    setTimeout(() => {
      router.push('/dashboard')
    }, 100)
  }, [router, setProcessingMinimized])

  // Helper function to map package data to DeliveryJob
  function mapPackageToDeliveryJob(packageData: BackendPackageResponse): DeliveryJob {
    // Handle senderId that can be string or object
    const getSenderId = () => {
      if (!packageData.sender?.senderId) return '';
      if (typeof packageData.sender.senderId === 'string') return packageData.sender.senderId;
      if (typeof packageData.sender.senderId === 'object' && packageData.sender.senderId._id) {
        return packageData.sender.senderId._id;
      }
      return '';
    };

    return {
      id: packageData._id,
      orderNumber: packageData.orderNumber || '',
      senderId: getSenderId(),
      senderName: packageData.sender?.name || '',
      senderPhone: packageData.sender?.phone || '',
      receiverId: packageData.receiver?.id || '',
      receiverName: packageData.receiver?.name || '',
      receiverPhone: packageData.receiver?.phone || '',
      title: packageData.title || 'Package Delivery',
      description: packageData.description,
      pickupLocation: packageData.pickupLocation || '',
      dropoffLocation: packageData.dropoffLocation || '',
      itemSize: (packageData.itemSize as ItemSize) || 'Medium',
      category: packageData.category || 'general',
      weight: packageData.weight || '1kg',
      value: packageData.value || 0,
      pickupDate: packageData.pickupDate || new Date().toISOString(),
      pickupTime: packageData.pickupTime || '',
      notes: packageData.notes,
      images: packageData.items?.[0]?.images?.map((img) => img.url) || [],
      status: (packageData.status as DeliveryStatus) || 'pending',
      bids: (packageData.bids || []).map((backendBid) => ({
        id: backendBid._id || backendBid.id || '',
        palId: backendBid.palId || '',
        palName: backendBid.palName || `Pal ${(backendBid.palId || '').slice(-4)}`,
        palRating: 0, // Backend doesn't provide palRating
        vehicleType: 'motorcycle' as const, // Backend doesn't provide vehicleType
        estimatedTime: '30 mins', // Backend doesn't provide estimatedTime
        amount: backendBid.amount || 0,
        message: backendBid.message || '',
        placedAt: backendBid.placedAt || new Date().toISOString(),
        canEdit: backendBid.status === 'pending',
        isAccepted: backendBid.status === 'accepted',
        createdAt: backendBid.placedAt || new Date().toISOString(),
      })),
      escrowAmount: packageData.escrowAmount || 0,
      selectedPalId: packageData.pal?.palId,
      isLive: true,
      createdAt: packageData.createdAt || new Date().toISOString()
    }
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    )
  }

  return (
    <JobProcessingScreen
      job={job}
      isMinimized={isProcessingMinimized}
      onMinimize={handleMinimize}
      onViewDetails={handleViewDetails}
      onClose={handleClose}
      bidCount={processingBidCount}
      autoMinimize={shouldAutoMinimize}
    />
  )
}
