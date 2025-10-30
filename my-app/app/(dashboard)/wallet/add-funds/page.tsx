/**
 * Add Funds Page
 *
 * Allows users to add money to their wallet via bank transfer or card.
 * Replaces the 'wallet-add-funds' screen from the monolith.
 */

'use client'

import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { WalletAddFundsScreen } from '@/components/WalletAddFundsScreen'
import { useAppStore } from '@/stores/appStore'
import type { Screen } from '@/types/index'
import { toast } from 'sonner'

export default function AddFundsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const method = searchParams.get('method') // 'bank' or 'card'

  const {
    user,
    updateUser,
    setPaymentContext,
  } = useAppStore()

  const handleBankTransfer = (amount: number) => {
    if (!user) {
      toast.error('You must be logged in')
      return
    }

    console.log(`Bank transfer: ₦${amount}`)

    // Set payment context
    setPaymentContext({
      amount,
      purpose: 'wallet-funding',
      returnScreen: 'wallet',
    })

    // In production, navigate to bank transfer screen or show payment details
    toast.info('Bank transfer details would be displayed here')
  }

  const handleCardPayment = (amount: number) => {
    if (!user) {
      toast.error('You must be logged in')
      return
    }

    console.log(`Card payment: ₦${amount}`)

    // Set payment context
    setPaymentContext({
      amount,
      purpose: 'wallet-funding',
      returnScreen: 'wallet',
    })

    // In production, integrate with payment gateway
    toast.info('Payment gateway would be initiated here')
  }

  const handleAddComplete = (amount: number) => {
    if (!user) return

    // Update user wallet balance
    const newBalance = (user.walletBalance || 0) + amount
    updateUser({ walletBalance: newBalance })

    // Clear payment context
    setPaymentContext(null)

    // Show success message
    toast.success(`₦${amount.toLocaleString()} added to your wallet!`)

    // Navigate back to wallet
    setTimeout(() => {
      router.push('/wallet')
    }, 1500)
  }

  const handleBack = () => {
    router.back()
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <WalletAddFundsScreen
        user={user}
        onBack={handleBack}
        onBankTransfer={handleBankTransfer}
        onCardPayment={handleCardPayment}
        onAddComplete={handleAddComplete}
      />
    </div>
  )
}
