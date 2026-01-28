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

  const handleBack = () => {
    router.back()
  }

  const handleCall = (phone: string) => {
    const cleanPhone = phone.replace(/\D/g, '')
    if (typeof window !== 'undefined') {
      window.open(`https://wa.me/${cleanPhone}`, '_blank')
    }
  }

  const handleDeliveryComplete = (job: { id: string }) => {
    // Handle delivery completion logic here
    console.log('Delivery completed:', job)
    router.push(`/jobs/${jobId}/complete`)
  }

  const handleOpenChat = () => {
    // Open WhatsApp with the pal if phone number is available
    if (job.selectedPalPhone) {
      const cleanPhone = job.selectedPalPhone.replace(/[^\d+]/g, '');
      const whatsappUrl = `https://wa.me/${cleanPhone}`;
      window.open(whatsappUrl, '_blank');
    } else {
      // Fallback: navigate to chat page
      router.push('/chat');
    }
  }

  // Determine user role based on job and current user
  const userRole = user?.id === job.senderId ? 'sender' : 
                  user?.id === job.selectedPalId ? 'pal' : 
                  'receiver'

  return (
    <div className="container mx-auto px-4 py-6">
      <TrackingScreen
        job={job}
        onBack={handleBack}
        onDeliveryComplete={handleDeliveryComplete}
        onOpenChat={handleOpenChat}
        onCall={handleCall}
        userRole={userRole}
      />
    </div>
  )
}
