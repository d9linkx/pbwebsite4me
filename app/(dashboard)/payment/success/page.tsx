'use client'

import { useEffect, useState, useCallback } from 'react'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import MonnifyCallbackHandler from '@/components/MonnifyCallbackHandler'

export default function PaymentSuccessPage() {
  const router = useRouter()
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('loading')
  const [error, setError] = useState<string | null>(null)

  const handleSuccess = useCallback((data: unknown) => {
    setStatus('success')
    console.log('✅ Payment successful:', data)
    
    // Refresh wallet balance after successful payment
    if (typeof window !== 'undefined') {
      localStorage.setItem('lastPaymentSuccess', JSON.stringify(data))
      // Trigger wallet refresh by setting a flag
      localStorage.setItem('walletRefresh', Date.now().toString())
    }
  }, [])

  const handleError = useCallback((message: string) => {
    setStatus('error')
    setError(message)
    console.error('❌ Payment error:', message)
  }, [])

  const handleLoading = useCallback((isLoading: boolean) => {
    if (isLoading) {
      setStatus('loading')
    }
    // Don't set back to idle - let success/error states take precedence
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 text-center">
        {status === 'loading' && (
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
            <h2 className="text-2xl font-bold">Processing your payment...</h2>
            <p className="text-gray-600">Please wait while we verify your payment</p>
          </div>
        )}

        {status === 'success' && (
          <div className="space-y-4">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <svg
                className="h-6 w-6 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold">Payment Successful!</h2>
            <p className="text-gray-600">Your payment has been processed successfully.</p>
            <div className="pt-4 space-y-2">
              <Button onClick={() => router.push('/wallet')} className="w-full">
                View Wallet Balance
              </Button>
              <Button variant="outline" onClick={() => router.push('/dashboard')} className="w-full">
                Go to Dashboard
              </Button>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="space-y-4">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <svg
                className="h-6 w-6 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold">Payment Failed</h2>
            <p className="text-gray-600">{error || 'There was an error processing your payment.'}</p>
            <div className="pt-4 flex gap-2 justify-center">
              <Button variant="outline" onClick={() => router.push('/wallet/add-funds')}>
                Try Again
              </Button>
              <Button onClick={() => router.push('/dashboard')}>Back to Dashboard</Button>
            </div>
          </div>
        )}

        {status === 'idle' && (
          <div className="space-y-4">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
              <svg
                className="h-6 w-6 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold">Processing Payment</h2>
            <p className="text-gray-600">Please wait...</p>
          </div>
        )}
      </div>

      {/* Process the Monnify callback */}
      <MonnifyCallbackHandler
        onSuccess={handleSuccess}
        onError={handleError}
        onLoading={handleLoading}
      />
    </div>
  )
}
