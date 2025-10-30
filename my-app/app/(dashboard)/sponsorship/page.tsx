/**
 * Sponsorship Page
 *
 * Sponsorship program overview and management.
 * Replaces the 'sponsorship' screen from the monolith.
 */

'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useAppStore } from '@/stores/appStore'

export default function SponsorshipPage() {
  const router = useRouter()
  const { user } = useAppStore()

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <button
        onClick={() => router.back()}
        className="text-gray-600 hover:text-gray-900 mb-4 flex items-center gap-2"
      >
        ← Back
      </button>

      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Sponsorship Program
      </h1>

      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          Sponsor Aspiring Pals
        </h2>
        <p className="text-gray-600 mb-4">
          Help others become delivery partners by sponsoring their onboarding costs.
        </p>
        <button
          onClick={() => router.push('/sponsorship/search')}
          className="bg-[#f44708] text-white px-6 py-3 rounded-lg hover:bg-[#d63a00] font-medium"
        >
          Find Users to Sponsor
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          My Sponsorships
        </h2>
        <p className="text-gray-600 mb-4">
          Manage your active and past sponsorships.
        </p>
        <button
          onClick={() => router.push('/sponsorship/manage')}
          className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 font-medium"
        >
          Manage Sponsorships
        </button>
      </div>
    </div>
  )
}
