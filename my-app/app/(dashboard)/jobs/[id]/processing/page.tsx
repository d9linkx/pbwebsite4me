'use client'
import { useEffect, useState, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useAppStore } from '@/stores/appStore'
import { JobProcessingScreen } from '@/components/JobProcessingScreen'
import { apiService } from '@/utils/apiService'
import { io, Socket } from 'socket.io-client'
import { DeliveryJob } from '@/types'

export default function JobProcessingPage() {
  const params = useParams()
  const router = useRouter()
  const jobId = params.id as string
  const { deliveryJobs, setDeliveryJobs } = useAppStore()
  const [job, setJob] = useState(deliveryJobs.find(j => j.id === jobId) || null)
  const [isMinimized, setIsMinimized] = useState(false)
  const [bidCount, setBidCount] = useState(0)
  const [socket, setSocket] = useState<Socket | null>(null)

  // Fetch job details on mount
  useEffect(() => {
    if (!job) {
      apiService.getPackageById(jobId).then(response => {
        if (response.success && response.data) {
          const mappedJob = mapPackageToDeliveryJob(response.data)
          setJob(mappedJob)
          setBidCount(response.data.bids?.length || 0)
        } else {
          console.error('Failed to fetch job:', response.message)
          router.push('/dashboard')
        }
      }).catch(error => {
        console.error('Error fetching job:', error)
        router.push('/dashboard')
      })
    } else {
      setBidCount(job.bids?.length || 0)
    }
    // Only run once on mount or when jobId changes
  }, [jobId, router])

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
        setBidCount(data.bidCount)

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
    router.push(`/jobs/${jobId}`)
  }, [router, jobId])

  const handleClose = useCallback(() => {
    router.push('/dashboard')
  }, [router])

  const handleMinimize = useCallback(() => {
    setIsMinimized(true)
    // Auto-redirect to dashboard after minimizing
    setTimeout(() => {
      router.push('/dashboard')
    }, 2000) // Wait 2 seconds before redirecting
  }, [router])

  // Helper function to map package data to DeliveryJob
  function mapPackageToDeliveryJob(packageData: any): DeliveryJob {
    return {
      id: packageData._id,
      orderNumber: packageData.orderNumber,
      senderId: packageData.sender?.senderId || '',
      senderName: packageData.sender?.name || '',
      senderPhone: packageData.sender?.phone || '',
      receiverId: packageData.receiver?.receiverId,
      receiverName: packageData.receiver?.name || '',
      receiverPhone: packageData.receiver?.phone || '',
      title: packageData.title || 'Package Delivery',
      description: packageData.description,
      pickupLocation: packageData.sender?.formattedAddress || '',
      dropoffLocation: packageData.receiver?.formattedAddress || '',
      itemSize: packageData.items?.[0]?.size || 'Medium',
      category: packageData.items?.[0]?.category || 'general',
      weight: packageData.items?.[0]?.weight?.toString() || '1kg',
      value: packageData.price || 0,
      pickupDate: packageData.pickupDate || new Date().toISOString(),
      pickupTime: packageData.pickupTime || '',
      notes: packageData.notes,
      images: packageData.items?.[0]?.images?.map((img: any) => img.url) || [],
      status: packageData.status || 'pending',
      bids: packageData.bids || [],
      escrowAmount: packageData.pal?.lockedEscrowAmount || 0,
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
      isMinimized={isMinimized}
      onMinimize={handleMinimize}
      onViewDetails={handleViewDetails}
      onClose={handleClose}
      bidCount={bidCount}
    />
  )
}
