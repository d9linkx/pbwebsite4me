/**
 * Job Detail Page
 *
 * Shows detailed information about a specific delivery job.
 * Dynamic route: /jobs/[id]
 */

'use client'

import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useAppStore } from '@/stores/appStore'
import { apiService } from '@/utils/apiService'
import { ConfirmDialog, useConfirmDialog } from '@/components/ConfirmDialog'
import type { DeliveryJob, DeliveryStatus, ItemSize, User, VehicleType } from '@/types/index'
import { toast } from 'sonner'

export default function JobDetailPage() {
  const params = useParams()
  const router = useRouter()
  const jobId = params.id as string
  const [isLoading, setIsLoading] = useState(true)
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false)
  const [pendingStatusUpdate, setPendingStatusUpdate] = useState<string | null>(null)

  const {
    user,
    activeRole,
    deliveryJobs,
    setDeliveryJobs,
    setSelectedJob,
  } = useAppStore()

  const [job, setJob] = useState<DeliveryJob | null>(
    deliveryJobs.find((j) => j.id === jobId) || null
  )

  // Confirmation dialog for status updates
  const confirmDialog = useConfirmDialog()

  // Fetch job details from backend on mount
  useEffect(() => {
    const fetchJobDetails = async () => {
      const currentUser = user
      if (!currentUser) {
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)
        const response = await apiService.getPackageById(jobId)

        if (response.success && response.data) {
          const pkg = response.data

          // Map backend package to frontend DeliveryJob format
          const fetchedJob: DeliveryJob = {
            id: pkg._id || pkg.id || jobId,
            title: pkg.title,
            description: pkg.description || '',
            pickupLocation: pkg.sender?.formattedAddress || pkg.pickupLocation || '',
            dropoffLocation: pkg.receiver?.formattedAddress || pkg.dropoffLocation || '',
            itemSize: (pkg.items?.[0]?.size || pkg.itemSize || 'Medium') as ItemSize,
            category: pkg.items?.[0]?.category || pkg.category || 'general',
            weight: pkg.items?.[0]?.weight?.toString() || pkg.weight || '1kg',
            value: pkg.price || pkg.value || 0,
            receiverName: pkg.receiver?.name || '',
            receiverPhone: pkg.receiver?.phone || '',
            receiverId: pkg.receiver?.id || '',
            senderId: pkg.sender?.id || '',
            senderName: pkg.sender?.name || '',
            senderPhone: pkg.sender?.phone || '',
            selectedPalId: (() => {
              const palId = pkg.pal?.palId;
              if (!palId) return '';
              if (typeof palId === 'string') return palId;
              if (typeof palId === 'object' && palId !== null && '_id' in palId) {
                return String((palId as { _id: unknown })._id);
              }
              return String(palId);
            })(),
            selectedPalName: pkg.pal?.palId ? 
              (typeof pkg.pal.palId === 'object' && pkg.pal.palId !== null ? 
                `${(pkg.pal.palId as User).firstName || ''} ${(pkg.pal.palId as User).lastName || ''}`.trim() : 
                pkg.pal.palId.toString()) : undefined,
            selectedPalPhone: pkg.pal?.palId ? 
              (typeof pkg.pal.palId === 'object' && pkg.pal.palId !== null ? 
                (pkg.pal.palId as User).phone : 
                pkg.pal.palId.toString()) : undefined,
            status: (pkg.status || 'pending') as DeliveryStatus,
            pickupDate: pkg.pickupDate || new Date().toISOString(),
            pickupTime: pkg.pickupTime || '',
            notes: pkg.notes || '',
            images: pkg.items?.[0]?.images?.map((img: { url: string }) => img.url) || [],
            escrowAmount: pkg.escrowAmount || 0,
            bids: (pkg.bids || []).map((bid: {
              _id: string;
              id?: string;
              amount: number;
              palId: string;
              palName?: string;
              message?: string;
              placedAt?: string;
              status?: string;
              palRating?: number;
              vehicleType?: string;
              estimatedTime?: string;
              canEdit?: boolean;
              createdAt?: string;
            }) => ({
              id: bid._id || bid.id || '',
              palId: bid.palId || '',
              palName: bid.palName || '',
              palRating: bid.palRating || 0,
              vehicleType: (bid.vehicleType || 'car') as VehicleType,
              estimatedTime: bid.estimatedTime || '30 mins',
              amount: bid.amount || 0,
              message: bid.message || '',
              placedAt: bid.placedAt || bid.createdAt || new Date().toISOString(),
              canEdit: bid.canEdit ?? true,
              createdAt: bid.createdAt || bid.placedAt || new Date().toISOString(),
              isAccepted: bid.status === 'accepted',
              bidStatus: (bid.status || 'pending') as 'pending' | 'rejected' | 'accepted' | 'withdrawn' | 'expired'
            })),
            isLive: true,
            createdAt: pkg.createdAt || new Date().toISOString(),
            orderNumber: pkg.orderNumber || '',
          }

          setJob(fetchedJob)
          setSelectedJob(fetchedJob)

          // Update in store - get latest state at the time of update
          const jobExists = deliveryJobs.some(j => j.id === jobId)
          if (jobExists) {
            setDeliveryJobs(deliveryJobs.map(j => j.id === jobId ? fetchedJob : j))
          } else {
            setDeliveryJobs([...deliveryJobs, fetchedJob])
          }
        }
      } catch (error) {
        console.error('Error fetching job details:', error)
        toast.error('Failed to load job details. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchJobDetails()
    // Only run on mount or when jobId changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobId])

  // Show confirmation dialog for status update
  const showStatusUpdateConfirmation = (newStatus: string) => {
    setPendingStatusUpdate(newStatus)
    confirmDialog.open()
  }

  // Handle confirmed status update
  const handleConfirmedStatusUpdate = async () => {
    if (!user || !job || !pendingStatusUpdate) {
      toast.error('Unable to update status')
      return
    }

    if (isUpdatingStatus) return

    const newStatus = pendingStatusUpdate
    confirmDialog.setIsLoading(true)
    setIsUpdatingStatus(true)

    try {
      console.log('Updating job status:', { jobId: job.id, newStatus })

      const response = await apiService.updatePackageStatus(job.id, newStatus)

      if (response.success && response.data) {
        toast.success(`Status updated to ${newStatus}`)

        // Update local state
        const updatedJob: DeliveryJob = { ...job, status: newStatus as DeliveryStatus }
        setJob(updatedJob)
        setSelectedJob(updatedJob)

        // Update store
        setDeliveryJobs(deliveryJobs.map(j => j.id === job.id ? updatedJob : j))
      } else {
        throw new Error(response.message || 'Failed to update status')
      }
    } catch (error: unknown) {
      console.error('Error updating status:', error)
      const errorMessage = error instanceof Error ? error.message : 'Failed to update status. Please try again.'
      toast.error(errorMessage)
      throw error
    } finally {
      setIsUpdatingStatus(false)
      confirmDialog.setIsLoading(false)
      setPendingStatusUpdate(null)
    }
  }

  // Get confirmation message for status update
  const getStatusUpdateMessage = (status: string): string => {
    const messages: Record<string, string> = {
      'picked-up': 'Mark this delivery as picked up? This will notify the sender and receiver.',
      'in-transit': 'Mark this delivery as in transit? The sender and receiver will be notified of your progress.',
      'delivered': 'Mark this delivery as delivered? This action confirms the package has reached its destination.',
      'cancelled': 'Cancel this delivery? This action cannot be undone and all parties will be notified.',
    }
    return messages[status] || `Update status to ${status}?`
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Loading job details...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!job) {
    return (
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Job not found
          </h2>
          <p className="text-gray-600 mb-4">
            This delivery job doesn&apos;t exist or has been removed.
          </p>
          <button
            onClick={() => router.push('/jobs')}
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-[#d63a00]"
          >
            Browse Jobs
          </button>
        </div>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'bidding': 'bg-blue-100 text-blue-800 border-blue-200',
      'assigned': 'bg-purple-100 text-purple-800 border-purple-200',
      'picked-up': 'bg-indigo-100 text-indigo-800 border-indigo-200',
      'in-transit': 'bg-cyan-100 text-cyan-800 border-cyan-200',
      'arrived': 'bg-green-100 text-green-800 border-green-200',
      'delivered': 'bg-emerald-100 text-emerald-800 border-emerald-200',
      'completed': 'bg-gray-100 text-gray-800 border-gray-200',
      'cancelled': 'bg-red-100 text-red-800 border-red-200',
      'disputed': 'bg-orange-100 text-orange-800 border-orange-200',
    }
    return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200'
  }

  const canViewBids = user && (user.id === job.senderId || activeRole === 'pal')
  const canTrack = job.status !== 'pending' && job.status !== 'bidding'

  // Debug logging for permissions
  console.log('🔐 Job Details Permissions:', {
    userId: user?.id,
    jobSenderId: job?.senderId,
    isSender: user?.id === job?.senderId,
    activeRole,
    canViewBids,
    jobStatus: job?.status,
    canTrack
  })

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      {/* Header */}
      <button
        onClick={() => router.back()}
        className="text-gray-600 hover:text-gray-900 mb-4 flex items-center gap-2"
      >
        ← Back
      </button>

      {/* Job Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Status Banner */}
        <div className={`px-6 py-3 border-b ${getStatusColor(job.status)}`}>
          <p className="font-medium">
            Status: {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
          </p>
        </div>

        {/* Job Details */}
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{job.title}</h1>
          <p className="text-gray-600 mb-6">{job.description}</p>

          {/* Locations */}
          <div className="space-y-4 mb-6">
            <div className="flex items-start gap-3">
              <span className="text-2xl">📍</span>
              <div>
                <p className="text-sm text-gray-500">Pickup</p>
                <p className="font-medium text-gray-900">{job.pickupLocation}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">📍</span>
              <div>
                <p className="text-sm text-gray-500">Dropoff</p>
                <p className="font-medium text-gray-900">{job.dropoffLocation}</p>
              </div>
            </div>
          </div>

          {/* Job Info Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-sm text-gray-500">Item Size</p>
              <p className="font-medium text-gray-900">{job.itemSize}</p>
            </div>
            {job.weight && (
              <div>
                <p className="text-sm text-gray-500">Weight</p>
                <p className="font-medium text-gray-900">{job.weight}</p>
              </div>
            )}
            <div>
              <p className="text-sm text-gray-500">Pickup Date</p>
              <p className="font-medium text-gray-900">
                {new Date(job.pickupDate).toLocaleDateString()}
              </p>
            </div>
            {job.pickupTime && (
              <div>
                <p className="text-sm text-gray-500">Pickup Time</p>
                <p className="font-medium text-gray-900">{job.pickupTime}</p>
              </div>
            )}
          </div>

          {/* Receiver Info */}
          <div className="border-t border-gray-200 pt-4 mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">Receiver</h3>
            <p className="text-gray-700">{job.receiverName}</p>
            <p className="text-gray-600 text-sm">{job.receiverPhone}</p>
          </div>

          {/* Escrow Amount */}
          {job.escrowAmount && job.escrowAmount > 0 && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600">Escrow Amount</p>
              <p className="text-2xl font-bold text-gray-900">
                ₦{job.escrowAmount.toLocaleString()}
              </p>
            </div>
          )}

          {/* Notes */}
          {job.notes && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">Notes</h3>
              <p className="text-gray-600">{job.notes}</p>
            </div>
          )}

          {/* Images */}
          {job.images && job.images.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">Images</h3>
              <div className="grid grid-cols-3 gap-2">
                {job.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Item ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Status Update (for Pal) */}
          {activeRole === 'pal' && job.selectedPalId === user?.id && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Update Status</h3>
              <div className="grid grid-cols-2 gap-2">
                {job.status === 'assigned' && (
                  <button
                    onClick={() => showStatusUpdateConfirmation('picked-up')}
                    disabled={isUpdatingStatus}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isUpdatingStatus ? 'Updating...' : 'Mark as Picked Up'}
                  </button>
                )}
                {job.status === 'picked-up' && (
                  <button
                    onClick={() => showStatusUpdateConfirmation('in-transit')}
                    disabled={isUpdatingStatus}
                    className="bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isUpdatingStatus ? 'Updating...' : 'Mark as In Transit'}
                  </button>
                )}
                {job.status === 'in-transit' && (
                  <button
                    onClick={() => showStatusUpdateConfirmation('arrived')}
                    disabled={isUpdatingStatus}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isUpdatingStatus ? 'Updating...' : 'Mark as Arrived'}
                  </button>
                )}
                {job.status === 'arrived' && (
                  <button
                    onClick={() => showStatusUpdateConfirmation('delivered')}
                    disabled={isUpdatingStatus}
                    className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isUpdatingStatus ? 'Updating...' : 'Mark as Delivered'}
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            {canViewBids && (
              <button
                onClick={() => router.push(`/jobs/${jobId}/bids`)}
                className="flex-1 bg-primary text-white px-6 py-3 rounded-lg hover:bg-[#d63a00] font-medium"
              >
                View Bids ({job.bids?.length || 0})
              </button>
            )}
            {canTrack && (
              <button
                onClick={() => router.push(`/jobs/${jobId}/tracking`)}
                className="flex-1 bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 font-medium"
              >
                Track Delivery
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={confirmDialog.close}
        onConfirm={handleConfirmedStatusUpdate}
        title="Confirm Status Update"
        message={pendingStatusUpdate ? getStatusUpdateMessage(pendingStatusUpdate) : ''}
        confirmText="Update Status"
        cancelText="Cancel"
        variant={pendingStatusUpdate === 'cancelled' ? 'danger' : 'warning'}
        isLoading={confirmDialog.isLoading}
      />
    </div>
  )
}
