/**
 * Verification Page
 *
 * Upload and verify documents for account verification to enable bidding.
 * Integrates with real backend APIs for document verification.
 */

'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { VerificationScreen } from '@/components/VerificationScreen'

export default function VerificationPage() {
  const router = useRouter()

  const handleNavigate = (screen: string) => {
    const routeMap: Record<string, string> = {
      'settings': '/settings',
      'dashboard': '/dashboard',
    }

    const route = routeMap[screen] || '/settings'
    router.push(route)
  }

  const handleBack = () => {
    router.back()
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <VerificationScreen
        onBack={handleBack}
        onNavigate={handleNavigate}
      />
    </div>
  )
}
