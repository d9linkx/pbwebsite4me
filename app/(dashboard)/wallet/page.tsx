/**
 * Wallet Page
 *
 * Shows wallet balance, recent transactions, and quick actions.
 * Replaces the 'wallet' screen from the monolith.
 */

'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { WalletScreen } from '@/components/WalletScreen'
import { useAppStore } from '@/stores/appStore'

export default function WalletPage() {
  const router = useRouter()

  const {
    user,
    activeRole,
  } = useAppStore()

  const handleAddFunds = () => {
    router.push('/wallet/add-funds')
  }

  const handleWithdraw = () => {
    router.push('/wallet/withdraw')
  }

  const handleManagePaymentMethods = () => {
    router.push('/settings/payment-methods')
  }

  const handleBack = () => {
    router.push('/dashboard')
  }

  return (
    <div className="container mx-auto">
      <WalletScreen
        user={user}
        onBack={handleBack}
        onAddFunds={handleAddFunds}
        onWithdraw={handleWithdraw}
        onManagePaymentMethods={handleManagePaymentMethods}
        userRole={activeRole}
      />
    </div>
  )
}
