/**
 * Job Bids Page
 *
 * Shows all bids for a specific job.
 * Dynamic route: /jobs/[id]/bids
 */

'use client'

import React, { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { BidsScreen } from '@/components/BidsScreen'
import { useAppStore } from '@/stores/appStore'
import type { Bid, DeliveryJob } from '@/types/index'

export default function JobBidsPage() {
  const params = useParams()
  const router = useRouter()
  const jobId = params.id as string

  const {
    user,
    deliveryJobs,
    setSelectedJob,
    setSelectedBid,
  } = useAppStore()

  const job = deliveryJobs.find((j) => j.id === jobId)

  useEffect(() => {
    if (job) {
      setSelectedJob(job)
    }
  }, [job, setSelectedJob])

  if (!job) {
    return (
      <div className="container mx-auto px-4 py-6">
        <p>Job not found</p>
      </div>
    )
  }

  const handleBidSelect = (bid: Bid, job: DeliveryJob) => {
    setSelectedBid(bid)
    // Could navigate to bid detail or accept flow
  }

  const handleBack = () => {
    router.back()
  }

  const handleAcceptBid = () => {
    // Handle bid acceptance logic
    console.log('Bid accepted')
  }

  const handleViewProfile = (bid: Bid) => {
    // Navigate to user profile
    console.log('View profile for bid:', bid.id)
  }

  const handleOpenChat = (job: DeliveryJob) => {
    // Open chat with the job poster
    console.log('Open chat for job:', job.id)
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <BidsScreen
        job={job}
        onBidSelect={handleBidSelect}
        onBack={handleBack}
        onAcceptBid={handleAcceptBid}
        onViewProfile={handleViewProfile}
        onOpenChat={handleOpenChat}
      />
    </div>
  )
}
