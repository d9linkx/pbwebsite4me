

/**
 * My Deliveries Page
 *
 * Shows user's delivery history (sent, received, or delivered as pal).
 * Replaces the 'my-deliveries' screen from the monolith.
 */

'use client'

import React, { useMemo, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAppStore } from '@/stores/appStore'
import { apiService } from '@/utils/apiService'
import type { DeliveryJob, DeliveryStatus, ItemSize, VehicleType, Bid } from '@/types/index'
import type { BackendPackageResponse } from '@/types/api'
import { toast } from 'sonner'

export default function MyDeliveriesPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const filter = searchParams.get('filter') // 'active', 'completed', etc.
  const [isLoading, setIsLoading] = useState(true)

  const {
    user,
    activeRole,
    deliveryJobs,
    setDeliveryJobs,
    setSelectedJob,
  } = useAppStore()

  // Fetch user's deliveries from backend
  useEffect(() => {
    const fetchMyDeliveries = async () => {
      if (!user) {
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)
        const response = await apiService.getAllPackages()

        if (response.success && response.data) {
          // Map backend packages to frontend DeliveryJob format
          const jobs = response.data.map((pkg: BackendPackageResponse): DeliveryJob => ({
            id: pkg._id || pkg.id || '',
            title: pkg.title,
            description: pkg.description || '',
            pickupLocation: pkg.sender?.formattedAddress || pkg.pickupLocation || '',
            dropoffLocation: pkg.receiver?.formattedAddress || pkg.dropoffLocation || '',
            itemSize: (pkg.items?.[0]?.size as ItemSize) || 'Medium',
            category: pkg.items?.[0]?.category || pkg.category || 'general',
            weight: pkg.items?.[0]?.weight?.toString() || pkg.weight || '1kg',
            value: pkg.price || pkg.value || 0,
            receiverName: pkg.receiver?.name || '',
            receiverPhone: pkg.receiver?.phone || '',
            receiverId: pkg.receiver?.id || '',
            senderId: pkg.sender?.senderId && typeof pkg.sender.senderId === 'object' && '_id' in pkg.sender.senderId
              ? pkg.sender.senderId._id 
              : (typeof pkg.sender?.senderId === 'string' ? pkg.sender.senderId : ''),
            senderName: pkg.sender?.name || '',
            senderPhone: pkg.sender?.phone || '',
            selectedPalId: pkg.pal?.palId,
            selectedPalName: pkg.pal?.name,
            selectedPalPhone: pkg.pal?.phone,
            proxyId: pkg.proxy?.proxyId,
            proxyName: pkg.proxy?.name,
            status: (pkg.status as DeliveryStatus) || 'pending',
            pickupDate: pkg.pickupDate || new Date().toISOString(),
            pickupTime: pkg.pickupTime || '',
            notes: pkg.notes || '',
            images: pkg.items?.[0]?.images?.map((img: { url: string }) => img.url) || [],
            escrowAmount: pkg.escrowAmount || 0,
            bids: (pkg.bids?.map(bid => ({
              id: bid._id || bid.id || '',
              palId: bid.palId,
              palName: bid.palName || '',
              palRating: 0, // Backend doesn't provide this, default to 0
              vehicleType: 'car' as const, // Backend doesn't provide this, default to car
              estimatedTime: '30 mins', // Backend doesn't provide this, default value
              amount: bid.amount,
              message: bid.message || '',
              placedAt: bid.placedAt || new Date().toISOString(),
              canEdit: bid.status === 'pending', // Determine editability from status
              isAccepted: bid.status === 'accepted',
              createdAt: bid.placedAt || new Date().toISOString()
            })) || []) as import('@/types/index').Bid[],
            distance: 0,
            createdAt: pkg.createdAt || new Date().toISOString(),
            orderNumber: pkg.orderNumber || `ORD-${(pkg._id || '').slice(0, 8).toUpperCase()}`,
          }))

          setDeliveryJobs(jobs)
        }
      } catch (error) {
        console.error('Error fetching deliveries:', error)
        toast.error('Failed to load your deliveries. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchMyDeliveries()
  }, [user, setDeliveryJobs])

  // Filter deliveries based on user role and filter param
  const myDeliveries = useMemo(() => {
    if (!user) return []

    let filtered = deliveryJobs.filter((job) => {
      switch (activeRole) {
        case 'sender':
          return job.senderId === user.id
        case 'pal':
          return job.selectedPalId === user.id
        case 'receiver':
          return job.receiverId === user.id
        case 'proxy':
          return job.proxyId === user.id
        default:
          return false
      }
    })

    // Apply filter param
    if (filter === 'completed') {
      filtered = filtered.filter((job) => job.status === 'completed')
    } else if (filter === 'active') {
      filtered = filtered.filter((job) =>
        job.status !== 'completed' && job.status !== 'cancelled'
      )
    }

    // Sort by date (most recent first)
    return filtered.sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
  }, [user, activeRole, deliveryJobs, filter])

  const handleJobClick = (job: DeliveryJob) => {
    setSelectedJob(job)
    router.push(`/jobs/${job.id}`)
  }

  const handleBack = () => {
    router.back()
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your deliveries...</p>
          </div>
        </div>
      </div>
    )
  }

  const getStatusBadgeColor = (status: string) => {
    const colors: Record<string, string> = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'bidding': 'bg-blue-100 text-blue-800',
      'assigned': 'bg-purple-100 text-purple-800',
      'picked-up': 'bg-indigo-100 text-indigo-800',
      'in-transit': 'bg-cyan-100 text-cyan-800',
      'arrived': 'bg-green-100 text-green-800',
      'delivered': 'bg-emerald-100 text-emerald-800',
      'completed': 'bg-gray-100 text-gray-800',
      'cancelled': 'bg-red-100 text-red-800',
      'disputed': 'bg-orange-100 text-orange-800',
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={handleBack}
          className="text-gray-600 hover:text-gray-900 mb-4 flex items-center gap-2"
        >
          ← Back
        </button>
        <h1 className="text-2xl font-bold text-gray-900">My Deliveries</h1>
        <p className="text-gray-600 mt-1">
          {activeRole === 'sender' && 'Deliveries you\'ve sent'}
          {activeRole === 'pal' && 'Deliveries you\'ve delivered'}
          {activeRole === 'receiver' && 'Deliveries you\'ve received'}
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-200">
        <button
          onClick={() => router.push('/jobs/my-deliveries')}
          className={`px-4 py-2 font-medium border-b-2 transition-colors ${
            !filter
              ? 'border-primary text-primary'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          All
        </button>
        <button
          onClick={() => router.push('/jobs/my-deliveries?filter=active')}
          className={`px-4 py-2 font-medium border-b-2 transition-colors ${
            filter === 'active'
              ? 'border-primary text-primary'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          Active
        </button>
        <button
          onClick={() => router.push('/jobs/my-deliveries?filter=completed')}
          className={`px-4 py-2 font-medium border-b-2 transition-colors ${
            filter === 'completed'
              ? 'border-primary text-primary'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          Completed
        </button>
      </div>

      {/* Deliveries List */}
      {myDeliveries.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-2 text-5xl">📦</div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">
            No deliveries yet
          </h3>
          <p className="text-gray-600 mb-4">
            {activeRole === 'sender' && 'Post your first delivery to get started'}
            {activeRole === 'pal' && 'Find available jobs to start delivering'}
            {activeRole === 'receiver' && 'You haven\'t received any deliveries yet'}
          </p>
          {activeRole === 'sender' && (
            <button
              onClick={() => router.push('/jobs/post')}
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-[#d63a00] transition-colors"
            >
              Post a Delivery
            </button>
          )}
          {activeRole === 'pal' && (
            <button
              onClick={() => router.push('/jobs')}
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-[#d63a00] transition-colors"
            >
              Find Jobs
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {myDeliveries.map((job) => (
            <div
              key={job.id}
              onClick={() => handleJobClick(job)}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-900">{job.title}</h3>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(
                    job.status
                  )}`}
                >
                  {job.status}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{job.description}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>📍 {job.pickupLocation}</span>
                <span>→</span>
                <span>📍 {job.dropoffLocation}</span>
              </div>
              <div className="mt-3 flex items-center justify-between text-sm">
                <span className="text-gray-500">
                  {new Date(job.createdAt).toLocaleDateString()}
                </span>
                {job.escrowAmount && job.escrowAmount > 0 && (
                  <span className="font-semibold text-gray-900">
                    ₦{job.escrowAmount.toLocaleString()}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
