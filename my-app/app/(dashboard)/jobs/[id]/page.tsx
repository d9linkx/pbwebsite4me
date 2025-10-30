/**
 * Job Detail Page
 *
 * Shows detailed information about a specific delivery job.
 * Dynamic route: /jobs/[id]
 */

'use client'

import React, { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useAppStore } from '@/stores/appStore'
import type { DeliveryJob } from '@/types/index'

export default function JobDetailPage() {
  const params = useParams()
  const router = useRouter()
  const jobId = params.id as string

  const {
    user,
    activeRole,
    deliveryJobs,
    selectedJob,
    setSelectedJob,
  } = useAppStore()

  // Find job by ID
  const job = deliveryJobs.find((j) => j.id === jobId)

  // Set selected job in store
  useEffect(() => {
    if (job) {
      setSelectedJob(job)
    }
  }, [job, setSelectedJob])

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
            className="bg-[#f44708] text-white px-6 py-2 rounded-lg hover:bg-[#d63a00]"
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

          {/* Action Buttons */}
          <div className="flex gap-3">
            {canViewBids && (
              <button
                onClick={() => router.push(`/jobs/${jobId}/bids`)}
                className="flex-1 bg-[#f44708] text-white px-6 py-3 rounded-lg hover:bg-[#d63a00] font-medium"
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
    </div>
  )
}
