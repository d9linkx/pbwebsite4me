/**
 * Add Funds Page
 *
 * Allows users to add money to their wallet via bank transfer or card.
 * Replaces the 'wallet-add-funds' screen from the monolith.
 */

'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { WalletAddFundsScreen } from '@/components/WalletAddFundsScreen'
import { useAppStore } from '@/stores/appStore'
import { apiService } from '@/utils/apiService'
import { toast } from 'sonner'

export default function AddFundsPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const {
    user,
    setPaymentContext,
  } = useAppStore()

  const handleCardPayment = async (amount: number) => {
    if (!user) {
      toast.error('You must be logged in')
      return
    }

    try {
      setIsLoading(true)
      console.log(`🎯 Initiating card payment: ₦${amount}`)

      // Initialize payment with Monnify
      const response = await apiService.initializePayment({
        amount,
        customerName: `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.email || 'User',
        customerEmail: user.email || '',
        paymentDescription: `Wallet funding - ₦${amount.toLocaleString()}`
      })

      if (response.success && response.data) {
        console.log('💳 Payment initiation response:', response.data)
        
        if (!response.data.checkoutUrl) {
          console.error('❌ No checkout URL returned from backend')
          toast.error('Payment initialization failed: No checkout URL provided')
          return
        }
        
        // Define proper type for Monnify response
interface MonnifyPaymentResponse {
  paymentReference: string
  checkoutUrl: string
  apiKey: string
  contractCode: string
  transactionReference?: string // Optional transaction reference
}

// Store payment context for verification
        const paymentContextData = {
          amount,
          purpose: 'wallet-funding',
          returnScreen: 'wallet' as const, // Explicitly type as Screen
          paymentReference: response.data.paymentReference,
          transactionReference: (response.data as MonnifyPaymentResponse).transactionReference // Use proper type
        }
        
        setPaymentContext(paymentContextData)
        
        // Save to session storage to persist across Monnify redirect
        sessionStorage.setItem('paymentContext', JSON.stringify(paymentContextData))
        console.log('💾 Saved payment context to session storage:', paymentContextData)

        console.log('🔄 Redirecting to checkout URL:', response.data.checkoutUrl)
        // Redirect to Monnify checkout
        window.location.href = response.data.checkoutUrl
      } else {
        throw new Error(response.message || 'Failed to initialize payment')
      }
    } catch (error) {
      console.error('❌ Error initiating card payment:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to initiate payment. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleBankTransfer = async (amount: number) => {
    if (!user) {
      toast.error('You must be logged in')
      return
    }

    try {
      setIsLoading(true)
      console.log(`🏦 Initiating bank transfer: ₦${amount}`)

      // Use fund wallet endpoint for bank transfer
      const response = await apiService.fundWallet(
        amount,
        `Wallet funding via bank transfer - ₦${amount.toLocaleString()}`
      )

      if (response.success && response.data) {
        console.log('💳 Bank transfer response:', response.data)
        
        if (!response.data.checkoutUrl) {
          console.error('❌ No checkout URL returned from backend')
          toast.error('Bank transfer initialization failed: No checkout URL provided')
          return
        }
        
        // Store payment context
        const paymentContextData = {
          amount,
          purpose: 'wallet-funding',
          returnScreen: 'wallet' as const, // Explicitly type as Screen
          paymentReference: response.data.paymentReference
        }
        
        setPaymentContext(paymentContextData)
        
        // Save to session storage to persist across Monnify redirect
        sessionStorage.setItem('paymentContext', JSON.stringify(paymentContextData))
        console.log('💾 Saved payment context to session storage:', paymentContextData)

        console.log('🔄 Redirecting to checkout URL:', response.data.checkoutUrl)
        // Redirect to Monnify checkout (bank transfer also uses Monnify)
        window.location.href = response.data.checkoutUrl
      } else {
        throw new Error(response.message || 'Failed to initiate bank transfer')
      }
    } catch (error) {
      console.error('❌ Error initiating bank transfer:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to initiate bank transfer. Please try again.')
    } finally {
      setIsLoading(false)
    }
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
        isLoading={isLoading}
      />
    </div>
  )
}
