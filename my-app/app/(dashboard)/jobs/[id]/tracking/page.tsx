/**
 * Job Tracking Page
 *
 * Live tracking for an active delivery.
 * Dynamic route: /jobs/[id]/tracking
 */

'use client'

import React, { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { TrackingScreen } from '@/components/TrackingScreen'
import { useAppStore } from '@/stores/appStore'
import type { Screen } from '@/types/index'

export default function JobTrackingPage() {
  const params = useParams()
  const router = useRouter()
  const jobId = params.id as string

  const {
    user,
    deliveryJobs,
    setSelectedJob,
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

  const handleNavigate = (screen: Screen) => {
    if (screen === 'dashboard') {
      router.push('/')
    } else {
      router.push(`/jobs/${jobId}`)
    }
  }

  const handleBack = () => {
    router.back()
  }

  const handleCall = (phone: string) => {
    const cleanPhone = phone.replace(/\D/g, '')
    if (typeof window !== 'undefined') {
      window.open(`https://wa.me/${cleanPhone}`, '_blank')
    }
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <TrackingScreen
        job={job}
        onNavigate={handleNavigate}
        onBack={handleBack}
        handleCall={handleCall}
        user={user}
      />
    </div>
  )
}
