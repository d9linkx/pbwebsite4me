/**
 * Recent Activity Component
 *
 * Displays packages sent in the last 24 hours
 * Refreshes daily to show only recent activity
 */

'use client'

import React from 'react'
import { Clock, Package, MapPin, ArrowRight } from 'lucide-react'
import { DeliveryJob } from '@/types'
import { motion } from 'framer-motion'

interface RecentActivityProps {
  packages: DeliveryJob[]
  onViewPackage: (job: DeliveryJob) => void
}

export function RecentActivity({ packages, onViewPackage }: RecentActivityProps) {
  // Filter packages sent in the last 24 hours
  const recentPackages = packages.filter((pkg) => {
    const createdAt = new Date(pkg.createdAt)
    const now = new Date()
    const hoursDiff = (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60)
    return hoursDiff <= 24
  })

  // Sort by most recent first
  const sortedPackages = recentPackages.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })

  const getTimeAgo = (dateString: string): string => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    return 'Today'
  }

  const getStatusColor = (status: string): string => {
    const statusColors: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800',
      bidding: 'bg-blue-100 text-blue-800',
      assigned: 'bg-purple-100 text-purple-800',
      'picked-up': 'bg-cyan-100 text-cyan-800',
      'in-transit': 'bg-indigo-100 text-indigo-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    }
    return statusColors[status] || 'bg-gray-100 text-gray-800'
  }

  const getStatusLabel = (status: string): string => {
    const statusLabels: Record<string, string> = {
      pending: 'Pending',
      bidding: 'Receiving Bids',
      assigned: 'Assigned',
      'picked-up': 'Picked Up',
      'in-transit': 'In Transit',
      delivered: 'Delivered',
      cancelled: 'Cancelled',
    }
    return statusLabels[status] || status
  }

  if (sortedPackages.length === 0) {
    return (
      <div className="bg-white rounded-lg p-4">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-gray-900">Recent Activity (24h)</h2>
        </div>
        <div className="text-center py-8">
          <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 text-sm">No packages sent in the last 24 hours</p>
          <p className="text-gray-400 text-xs mt-1">Your recent deliveries will appear here</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-gray-900">Recent Activity (24h)</h2>
        </div>
        <span className="text-sm text-gray-500">{sortedPackages.length} package{sortedPackages.length !== 1 ? 's' : ''}</span>
      </div>

      <div className="space-y-3">
        {sortedPackages.map((pkg, index) => (
          <motion.div
            key={pkg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => onViewPackage(pkg)}
            className="group bg-gray-50 hover:bg-gray-100 rounded-lg p-4 cursor-pointer transition-all border border-transparent hover:border-primary-light"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium text-gray-900 truncate group-hover:text-primary transition-colors">
                    {pkg.title}
                  </h3>
                  {pkg.orderNumber && (
                    <span className="text-xs text-gray-500 flex-shrink-0">#{pkg.orderNumber}</span>
                  )}
                </div>
                <p className="text-xs text-gray-500">{getTimeAgo(pkg.createdAt)}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 ml-2 ${getStatusColor(pkg.status)}`}>
                {getStatusLabel(pkg.status)}
              </span>
            </div>

            {/* Route */}
            <div className="flex items-start gap-2 text-sm mb-3">
              <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-gray-600 truncate">{pkg.pickupLocation}</p>
                <div className="flex items-center gap-1 my-1">
                  <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                  <div className="flex-1 h-px bg-gray-200"></div>
                  <ArrowRight className="w-3 h-3 text-gray-400" />
                </div>
                <p className="text-gray-600 truncate">{pkg.dropoffLocation}</p>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-3 text-gray-500">
                {pkg.bids && pkg.bids.length > 0 && (
                  <span className="flex items-center gap-1">
                    <Package className="w-3 h-3" />
                    {pkg.bids.length} bid{pkg.bids.length !== 1 ? 's' : ''}
                  </span>
                )}
                {pkg.receiverName && (
                  <span className="truncate max-w-[120px]">To: {pkg.receiverName}</span>
                )}
              </div>
              <span className="text-primary font-medium group-hover:underline">View →</span>
            </div>
          </motion.div>
        ))}
      </div>

      {sortedPackages.length > 3 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-xs text-center text-gray-500">
            Showing {sortedPackages.length} packages from the last 24 hours
          </p>
        </div>
      )}
    </div>
  )
}
