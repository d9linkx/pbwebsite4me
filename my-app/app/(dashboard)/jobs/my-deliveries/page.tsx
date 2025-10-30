

/**
 * My Deliveries Page
 *
 * Shows user's delivery history (sent, received, or delivered as pal).
 * Replaces the 'my-deliveries' screen from the monolith.
 */

'use client'

import React, { useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAppStore } from '@/stores/appStore'
import type { DeliveryJob } from '@/types/index'

export default function MyDeliveriesPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const filter = searchParams.get('filter') // 'active', 'completed', etc.

  const {
    user,
    activeRole,
    deliveryJobs,
    setSelectedJob,
  } = useAppStore()

  // Filter deliveries based on user role and filter param
  const myDeliveries = useMemo(() => {
    if (!user) return []

    let filtered = deliveryJobs.filter((job) => {
      switch (activeRole) {
        case 'sender':
          return job.senderId === user.id
        case 'pal':
          return job.senderId === user.id
        case 'receiver':
          return job.receiverId === user.id
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
              ? 'border-[#f44708] text-[#f44708]'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          All
        </button>
        <button
          onClick={() => router.push('/jobs/my-deliveries?filter=active')}
          className={`px-4 py-2 font-medium border-b-2 transition-colors ${
            filter === 'active'
              ? 'border-[#f44708] text-[#f44708]'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          Active
        </button>
        <button
          onClick={() => router.push('/jobs/my-deliveries?filter=completed')}
          className={`px-4 py-2 font-medium border-b-2 transition-colors ${
            filter === 'completed'
              ? 'border-[#f44708] text-[#f44708]'
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
              className="bg-[#f44708] text-white px-6 py-2 rounded-lg hover:bg-[#d63a00] transition-colors"
            >
              Post a Delivery
            </button>
          )}
          {activeRole === 'pal' && (
            <button
              onClick={() => router.push('/jobs')}
              className="bg-[#f44708] text-white px-6 py-2 rounded-lg hover:bg-[#d63a00] transition-colors"
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
