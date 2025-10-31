/**
 * Withdraw Funds Page
 *
 * Allows users to withdraw money from their wallet to their bank account.
 * Replaces the 'wallet-withdraw' screen from the monolith.
 */

'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { WalletWithdrawScreen } from '@/components/WalletWithdrawScreen'
import { useAppStore } from '@/stores/appStore'
import type { Screen } from '@/types/index'
import { toast } from 'sonner'

export default function WithdrawPage() {
  const router = useRouter()

  const {
    user,
    updateUser,
  } = useAppStore()

  const handleWithdrawComplete = (amount: number, bankDetails?: { bank: string; accountNumber: string; accountName: string }) => {
    if (!user) {
      toast.error('You must be logged in')
      return
    }

    const currentBalance = user.walletBalance || 0

    if (amount > currentBalance) {
      toast.error('Insufficient balance')
      return
    }

    console.log(`Withdrawing ₦${amount}`, bankDetails)

    // Update user wallet balance
    const newBalance = currentBalance - amount
    updateUser({ walletBalance: newBalance })

    // Show success message
    toast.success(`₦${amount.toLocaleString()} withdrawal initiated!`)

    // Navigate back to wallet
    setTimeout(() => {
      router.push('/wallet')
    }, 1500)
  }

  const handleBack = () => {
    router.back()
  }

  return (
    <div className="container mx-auto">
      <WalletWithdrawScreen
        user={user}
        onBack={handleBack}
        onWithdrawComplete={handleWithdrawComplete}
      />
    </div>
  )
}
