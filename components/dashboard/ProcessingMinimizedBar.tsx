'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Package, Eye, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '@/stores/appStore'

/**
 * Global minimized processing bar
 * Shows at the top of the dashboard when a job is being processed
 */
export function ProcessingMinimizedBar() {
  const router = useRouter()
  const {
    processingJob,
    isProcessingMinimized,
    processingBidCount
  } = useAppStore()

  // Determine if we should show the bar
  const shouldShow = !!(processingJob && isProcessingMinimized)

  // Early return if nothing to show - prevents extra padding
  if (!shouldShow) {
    return null
  }

  const handleViewDetails = () => {
    // Navigate to the processing page and expand the view
    if (processingJob) {
      router.push(`/jobs/${processingJob.id}/processing`)
    }
  }

  return (
    <div
      className="fixed top-0 left-0 right-0 bg-green-500 text-white p-3 shadow-lg z-[70] cursor-pointer hover:bg-green-600 transition-colors"
      onClick={handleViewDetails}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4">
        <div className="flex items-center space-x-3">
          <Package size={20} />
          <div className="flex flex-col">
            <span className="font-semibold text-sm">Order #{processingJob.orderNumber}</span>
            <span className="text-xs opacity-90">
              {processingBidCount === 0
                ? 'Waiting for bids...'
                : `${processingBidCount} ${processingBidCount === 1 ? 'bid' : 'bids'} received`}
            </span>
          </div>
        </div>
        <div className="flex items-center">
          <div className="p-2 text-white/80">
            <Eye size={18} />
          </div>
        </div>
      </div>
    </div>
  )
}
