/**
 * Available Jobs Page
 *
 * Shows available delivery jobs for pals to bid on.
 * Replaces the 'available-jobs' screen from the monolith.
 */

'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { AvailableJobsScreen } from '@/components/AvailableJobScreen'
import { useAppStore } from '@/stores/appStore'
import type { DeliveryJob, Bid } from '@/types/index'

export default function AvailableJobsPage() {
  const router = useRouter()

  const {
    user,
    deliveryJobs,
    setSelectedJob,
    setSelectedBid,
  } = useAppStore()

  // Filter for available jobs (pending or bidding status)
  const availableJobs = deliveryJobs.filter(
    (job) => job.status === 'pending' || job.status === 'bidding'
  )

  const handleJobSelect = (job: DeliveryJob) => {
    setSelectedJob(job)
    router.push(`/jobs/${job.id}`)
  }

  const handlePlaceBid = (job: DeliveryJob, bidAmount: number, message: string) => {
    console.log('Bid placed:', { job, bidAmount, message })
    // In production, this would make an API call to submit the bid
    // For now, just navigate to job detail
    router.push(`/jobs/${job.id}/bids`)
  }

  const handleBack = () => {
    router.back()
  }

  return (
    <div className="container mx-auto">
      <AvailableJobsScreen
        availableJobs={availableJobs}
        onJobSelect={handleJobSelect}
        onPlaceBid={handlePlaceBid}
        onBack={handleBack}
        currentUser={user}
        allJobs={deliveryJobs}
      />
    </div>
  )
}
