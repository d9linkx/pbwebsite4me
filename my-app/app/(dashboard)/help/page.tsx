/**
 * Help Center Page
 *
 * Help resources and FAQs.
 * Replaces the 'help-center' screen from the monolith.
 */

'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { HelpCenterScreen } from '@/components/HelpCenterScreen'
import { useAppStore } from '@/stores/appStore'

export default function HelpPage() {
  const router = useRouter()
  const { user } = useAppStore()

  const handleContactSupport = () => {
    router.push('/help/contact')
  }

  const handleBack = () => {
    router.push('/settings')
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <HelpCenterScreen
        user={user}
        onBack={handleBack}
        onContactSupport={handleContactSupport}
      />
    </div>
  )
}
