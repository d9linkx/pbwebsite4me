/**
 * Received Deliveries Page
 *
 * Shows all deliveries that the user is receiving (as receiver role)
 */

'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { ReceivedDeliveriesScreen } from '@/components/ReceivedDeliveriesScreen'
import { useAppStore } from '@/stores/appStore'
import type { DeliveryJob, Screen } from '@/types/index'

export default function ReceivedDeliveriesPage() {
  const router = useRouter()

  const { user, deliveryJobs, setSelectedJob } = useAppStore()

  // Filter jobs where user is the receiver
  const receivedJobs = deliveryJobs.filter(job => job.receiverId === user?.id)

  const handleBack = () => {
    router.push('/dashboard')
  }

  const handleNavigate = (screen: Screen) => {
    const screenToRouteMap: Partial<Record<Screen, string>> = {
      'dashboard': '/dashboard',
      'tracking': '/jobs/tracking',
      'chat': '/chat',
    }

    const route = screenToRouteMap[screen] || '/dashboard'
    router.push(route)
  }

  const handleJobSelect = (job: DeliveryJob) => {
    setSelectedJob(job)
    router.push(`/jobs/${job.id}`)
  }

  const handleOpenChat = (job: DeliveryJob) => {
    setSelectedJob(job)
    // In a real app, you'd create/find the chat thread for this job
    router.push('/chat')
  }

  const handleCall = (phoneNumber: string) => {
    // Remove any non-numeric characters
    const cleanPhone = phoneNumber.replace(/\D/g, '')

    // Try WhatsApp first
    if (typeof window !== 'undefined') {
      const whatsappUrl = `https://wa.me/${cleanPhone}`
      window.open(whatsappUrl, '_blank')
    }
  }

  const formatAmount = (amount: number): string => {
    return `₦${amount.toLocaleString('en-NG')}`
  }

  return (
    <div className="container mx-auto">
      <ReceivedDeliveriesScreen
        user={user}
        onBack={handleBack}
        onNavigate={handleNavigate}
        receivedJobs={receivedJobs}
        onJobSelect={handleJobSelect}
        onOpenChat={handleOpenChat}
        onCall={handleCall}
        formatAmount={formatAmount}
      />
    </div>
  )
}
