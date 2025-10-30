/**
 * Ratings Page
 *
 * View and manage user ratings and reviews.
 * Replaces the 'ratings' screen from the monolith.
 */

'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { RatingsScreen } from '@/components/RatingsScreen'
import { useAppStore } from '@/stores/appStore'
import type { Screen } from '@/types/index'

export default function RatingsPage() {
  const router = useRouter()
  const { selectedJob, activeRole = 'sender' as const } = useAppStore()

  const handleRatingComplete = () => {
    // Handle rating completion
    console.log('Rating completed')
    router.push('/jobs/my-deliveries')
  }

  const handleBack = () => {
    router.push('/jobs/my-deliveries')
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <RatingsScreen
        job={selectedJob}
        userRole={activeRole}
        onBack={handleBack}
        onRatingComplete={handleRatingComplete}
      />
    </div>
  )
}
