'use client'

import { useEffect, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import { apiService } from '@/utils/apiService'

// Type definitions for API responses
interface PaymentVerificationResponse {
  success: boolean
  status: string
  message: string
  data: {
    paymentReference: string
    paymentStatus: string
    completed: boolean
    transactionReference?: string
    amountPaid?: number
    amount?: number
    customerName?: string
    customerEmail?: string
    currencyCode?: string
  }
}

interface MonnifyCallbackHandlerProps {
  onSuccess?: (data: PaymentVerificationResponse['data']) => void
  onError?: (error: string) => void
  onLoading?: (isLoading: boolean) => void
}

const MonnifyCallbackHandler: React.FC<MonnifyCallbackHandlerProps> = ({
  onSuccess,
  onError,
  onLoading
}) => {
  const searchParams = useSearchParams()

  const paymentReference = searchParams.get('paymentReference')
  let transactionReference = searchParams.get('transactionReference')
  
  console.log('🔍 Initial values from URL:', {
    paymentReference,
    transactionReference,
    urlParams: Object.fromEntries(searchParams.entries())
  })
  
  // Try to get transaction reference from session storage if not in URL
  if (!transactionReference) {
    try {
      const paymentContext = sessionStorage.getItem('paymentContext')
      console.log('🔍 Session storage contents:', paymentContext)
      
      if (paymentContext) {
        const context = JSON.parse(paymentContext)
        console.log('🔍 Parsed session context:', context)
        transactionReference = context.transactionReference
        console.log('🔍 Retrieved transaction reference from session storage:', transactionReference)
      } else {
        console.log('❌ No payment context found in session storage')
      }
    } catch (error) {
      console.error('❌ Error reading session storage:', error)
    }
  }
  
  console.log('🔍 Final values before API call:', {
    paymentReference,
    transactionReference
  })
  
  const processPayment = useCallback(async () => {
    try {
      onLoading?.(true)
      
      console.log('🔍 Monnify callback handler checking params:', {
        paymentReference,
        transactionReference,
        hasParams: !!(paymentReference || transactionReference),
        allParams: Object.fromEntries(searchParams.entries())
      })
      
      console.log(' ALL URL PARAMETERS RECEIVED:');
      searchParams.forEach((value, key) => {
        console.log(`  ${key}: ${value}`);
      });
      
      console.log(' Current URL:', window.location.href);
      
      if (!paymentReference) {
        throw new Error('No payment reference found')
      }

      console.log('⚠️ No status parameter found, but proceeding with verification since payment was completed...');
      
      // Verify payment with our backend - this calls Monnify API with retry logic
      console.log('🔍 Verifying payment with Monnify (with retry logic)...');
      
      // Build the verify URL with payment reference only - backend will get transactionReference from database
      const verifyUrl = `/payment/verify?paymentReference=${paymentReference}`;
      
      console.log('🔗 About to call verify endpoint:', verifyUrl);
      console.log('📡 Making API call to backend...');
      
      const response = await apiService.get<PaymentVerificationResponse>(verifyUrl)
      
      console.log('📡 Backend API response received:', response);
      console.log('🔍 Backend verification response:', response.data)

      if (response.data?.success) {
        const { status, data } = response.data;
        
        if (status === 'PAID') {
          // Payment is verified and completed
          onSuccess?.(data)
          console.log('✅ Payment verified successfully:', data)
          
          // Update URL with transaction reference if available
          if (data?.transactionReference && !searchParams.get('transactionReference')) {
            const newUrl = new URL(window.location.href)
            newUrl.searchParams.set('transactionReference', data.transactionReference)
            window.history.replaceState({}, '', newUrl.toString())
            console.log('🔄 Updated URL with transactionReference:', data.transactionReference)
          }
        } else if (status === 'PENDING') {
          // Payment is still pending - retry logic already tried, so show user-friendly message
          console.log('⏳ Payment verification still pending after retries')
          onError?.('Payment is still processing - please wait a few more moments or check back later')
        } else {
          // Payment failed or other status
          throw new Error(response.data.message || 'Payment verification failed')
        }
      } else {
        throw new Error(response.data?.message || 'Payment verification failed')
      }
      
    } catch (error: unknown) {
      console.error(' Payment processing error:', error)
      const errorMessage = error instanceof Error ? error.message : 'Payment processing failed'
      onError?.(errorMessage)
    } finally {
      onLoading?.(false)
    }
  }, [paymentReference, transactionReference, searchParams, onSuccess, onError, onLoading])

  useEffect(() => {
    processPayment()
  }, [processPayment])

  return null // This component doesn't render anything
}

export default MonnifyCallbackHandler
