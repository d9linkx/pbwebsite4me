/**
 * Verification Page
 *
 * Upload and verify government ID for account verification.
 * Replaces the 'verification' screen from the monolith.
 */

'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { VerificationScreen } from '@/components/VerificationScreen'
import { useAppStore } from '@/stores/appStore'
import type { Screen } from '@/types/index'
import { toast } from 'sonner'

export default function VerificationPage() {
  const router = useRouter()

  const { user, updateUser } = useAppStore()

  const handleNavigate = (screen: Screen) => {
    const routeMap: Partial<Record<Screen, string>> = {
      'settings': '/settings',
      'dashboard': '/',
    }

    const route = routeMap[screen] || '/settings'
    router.push(route)
  }

  const handleVerificationSubmit = (idUrl: string) => {
    if (!user) return

    updateUser({
      governmentIdUrl: idUrl,
      governmentIdStatus: 'pending',
    })

    toast.success('ID uploaded! We\'ll verify it within 24 hours.')

    // Navigate back to settings
    setTimeout(() => {
      router.push('/settings')
    }, 1500)
  }

  const handleBack = () => {
    router.back()
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <VerificationScreen
        user={user}
        onNavigate={handleNavigate}
        onBack={handleBack}
        onSubmit={handleVerificationSubmit}
      />
    </div>
  )
}
