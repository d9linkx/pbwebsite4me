/**
 * Post Delivery Page
 *
 * Form for senders to create new delivery jobs.
 * Replaces the 'post-delivery' screen from the monolith.
 */

'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PostDeliveryScreen } from '@/components/PostDeliveryScreen'
import { useAppStore } from '@/stores/appStore'
import type { DeliveryJob, ItemSize, DeliveryStatus, Bid } from '@/types/index'
import type { BackendPackageResponse } from '@/types/api'
import { toast } from 'sonner'
import { apiService } from '@/utils/apiService'

export default function PostDeliveryPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    user,
    addDeliveryJob,
    setSelectedJob,
  } = useAppStore()

  const handleJobSubmit = async (jobData: Partial<DeliveryJob>) => {
    if (!user) {
      toast.error('You must be logged in to post a delivery')
      router.push('/auth')
      return
    }

    if (isSubmitting) {
      return // Prevent double submission
    }

    setIsSubmitting(true)

    try {
      // Extract state and city from location strings
      // Format examples: "Victoria Island, Lagos" or "Bodija, Ibadan, Oyo"
      const extractLocationParts = (locationString: string) => {
        const parts = locationString.split(',').map(p => p.trim())
        if (parts.length >= 3) {
          // Format: "Area, City, State"
          return {
            area: parts[0],
            city: parts[1],
            state: parts[2]
          }
        } else if (parts.length === 2) {
          // Format: "Area, State" (Lagos format)
          return {
            area: parts[0],
            city: parts[1], // For Lagos, city = state
            state: parts[1]
          }
        } else {
          // Fallback
          return {
            area: parts[0] || '',
            city: parts[0] || 'Unknown',
            state: parts[0] || 'Unknown'
          }
        }
      }

      const pickupParts = extractLocationParts(jobData.pickupLocation || '')
      const dropoffParts = extractLocationParts(jobData.dropoffLocation || '')

      console.log('📍 Pickup location parts:', pickupParts)
      console.log('📍 Dropoff location parts:', dropoffParts)

      // Prepare package data for backend with ALL required fields
      const packageData = {
        title: jobData.title || 'Untitled Delivery',
        description: jobData.description,
        pickupLocation: jobData.pickupLocation || '',
        dropoffLocation: jobData.dropoffLocation || '',

        // Sender state (extracted from pickup location)
        senderState: pickupParts.state,

        // Receiver details (all required)
        receiverName: jobData.receiverName || 'Receiver',
        receiverPhone: jobData.receiverPhone || '',
        receiverCity: dropoffParts.city,
        receiverState: dropoffParts.state,

        // Item details
        itemSize: jobData.itemSize || 'Medium',
        category: jobData.category || 'general',
        weight: jobData.weight || '1kg',
        value: jobData.value || 0,

        // Dates and notes
        pickupDate: jobData.pickupDate || new Date().toISOString(),
        notes: jobData.notes,
      }

      // Convert base64 images to File objects if needed
      const imageFiles: File[] = []
      if (jobData.images && jobData.images.length > 0) {
        // If images are base64 strings, convert to File objects
        for (let i = 0; i < jobData.images.length; i++) {
          const imageData = jobData.images[i]
          if (imageData.startsWith('data:image')) {
            try {
              const response = await fetch(imageData)
              const blob = await response.blob()
              const file = new File([blob], `image-${i}.jpg`, { type: 'image/jpeg' })
              imageFiles.push(file)
            } catch (error) {
              console.error('Error converting image:', error)
            }
          }
        }
      }

      // Call backend API to create package
      console.log('📦 Creating package with data:', packageData)
      const response = await apiService.createPackage(packageData, imageFiles.length > 0 ? imageFiles : undefined)

      if (response.success && response.data) {
        console.log('✅ Package created successfully:', response.data)

        // Map backend response to frontend DeliveryJob format
        const backendPackage = response.data as BackendPackageResponse
        // Helper function to validate ItemSize
        const validateItemSize = (size?: string): ItemSize => {
          const validSizes: ItemSize[] = ['Small', 'Medium', 'Large']
          return validSizes.includes(size as ItemSize) ? (size as ItemSize) : 'Medium'
        }

        // Helper function to validate DeliveryStatus
        const validateDeliveryStatus = (status?: string): DeliveryStatus => {
          const validStatuses: DeliveryStatus[] = ['pending', 'bidding', 'assigned', 'picked-up', 'in-transit', 'arrived', 'delivered', 'completed', 'cancelled', 'disputed']
          return validStatuses.includes(status as DeliveryStatus) ? (status as DeliveryStatus) : 'pending'
        }

        // Helper function to map backend bids to frontend Bid type
        const mapBackendBids = (backendBids?: BackendPackageResponse['bids']): Bid[] => {
          if (!backendBids) return []
          return backendBids.map(backendBid => ({
            id: backendBid._id || backendBid.id || `bid-${Date.now()}-${Math.random()}`,
            palId: backendBid.palId,
            palName: backendBid.palName || 'Unknown Pal',
            palRating: 0, // Default rating since backend doesn't provide it
            vehicleType: 'car', // Default vehicle type since backend doesn't provide it
            estimatedTime: '30 mins', // Default time since backend doesn't provide it
            amount: backendBid.amount,
            message: backendBid.message || '',
            placedAt: backendBid.placedAt || new Date().toISOString(),
            canEdit: true, // Default to editable
            createdAt: backendBid.placedAt || new Date().toISOString(),
          }))
        }

        const newJob: DeliveryJob = {
          id: backendPackage._id || backendPackage.id || `temp-${Date.now()}`,
          title: backendPackage.title,
          description: backendPackage.description || '',
          pickupLocation: backendPackage.sender?.formattedAddress || backendPackage.pickupLocation,
          dropoffLocation: backendPackage.receiver?.formattedAddress || backendPackage.dropoffLocation,
          itemSize: validateItemSize(backendPackage.items?.[0]?.size || backendPackage.itemSize),
          category: backendPackage.items?.[0]?.category || backendPackage.category,
          weight: backendPackage.items?.[0]?.weight?.toString() || backendPackage.weight,
          value: backendPackage.price || backendPackage.value || 0,
          receiverName: backendPackage.receiver?.name || '',
          receiverPhone: backendPackage.receiver?.phone || '',
          senderId: backendPackage.sender?.senderId 
            ? (typeof backendPackage.sender.senderId === 'object' ? backendPackage.sender.senderId._id : backendPackage.sender.senderId)
            : user.id,
          senderName: backendPackage.sender?.name || user.name,
          senderPhone: backendPackage.sender?.phone || user.phone,
          status: validateDeliveryStatus(backendPackage.status),
          pickupDate: backendPackage.pickupDate || new Date().toISOString(),
          pickupTime: jobData.pickupTime || '',
          notes: backendPackage.notes || '',
          images: backendPackage.items?.[0]?.images?.map((img: { url: string }) => img.url) || [],
          escrowAmount: jobData.escrowAmount || 0,
          bids: mapBackendBids(backendPackage.bids),
          isLive: true,
          createdAt: backendPackage.createdAt || new Date().toISOString(),
          orderNumber: backendPackage.orderNumber || `ORD-${Date.now()}`,
        }

        // Add to store
        addDeliveryJob(newJob)
        setSelectedJob(newJob)

        // Show success message
        toast.success('Delivery posted successfully!')

        // Navigate to processing page to show order confirmation and real-time bid updates
        // Add autoMinimize=true query param to trigger auto-minimize after 5 seconds
        router.push(`/jobs/${newJob.id}/processing?autoMinimize=true`)
      } else {
        throw new Error(response.message || 'Failed to create package')
      }
    } catch (error: unknown) {
      console.error('❌ Error creating package:', error)
      const errorMessage = error instanceof Error ? error.message : 'Failed to post delivery. Please try again.'
      toast.error(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleBack = () => {
    router.back()
  }

  const handleLocationSelect = (type: 'pickup' | 'dropoff') => {
    console.log('Location select:', type)
    // Navigate to location selection screen
    router.push(`/location-select?type=${type}&return=/jobs/post`)
  }

  const handleNavigateToMyDeliveries = () => {
    router.push('/jobs/my-deliveries')
  }

  const handleChooseFavoritePal = (jobData: unknown) => {
    console.log('Choose favorite pal:', jobData)
    // Navigate to favorite pal selection
    router.push('/jobs/favorite-pal')
  }

  return (
    <div className="container mx-auto">
      <PostDeliveryScreen
        onSubmit={handleJobSubmit}
        onBack={handleBack}
        onLocationSelect={handleLocationSelect}
        userId={user?.id || ''}
        onNavigateToMyDeliveries={handleNavigateToMyDeliveries}
        onChooseFavoritePal={handleChooseFavoritePal}
      />
    </div>
  )
}
