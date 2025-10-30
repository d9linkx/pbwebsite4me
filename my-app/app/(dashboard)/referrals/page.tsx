/**
 * Referrals Page
 *
 * Referral program - invite friends and earn rewards.
 * Replaces the 'referral' screen from the monolith.
 */

'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { ReferralScreen } from '@/components/ReferralScreen'
import { useAppStore } from '@/stores/appStore'
import type { Screen } from '@/types/index'

export default function ReferralsPage() {
  const router = useRouter()
  const { user } = useAppStore()

  const handleNavigate = (screen: Screen) => {
    if (screen === 'dashboard') {
      router.push('/')
    } else if (screen === 'settings') {
      router.push('/settings')
    }
  }

  const handleBack = () => {
    router.push('/')
  }

  return (
    <div className="container mx-auto">
      <ReferralScreen
        user={user}
        onNavigate={handleNavigate}
        onBack={handleBack}
      />
    </div>
  )
}
