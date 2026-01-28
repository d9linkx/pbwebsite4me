'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FavoritePalInputScreen } from '@/components/FavoritePalInputScreen'
import { FavoritePalConfirmationScreen } from '@/components/FavoritePalConfirmationScreen'
import { FavoritePalData, DeliveryJob, FavoritePalJobData } from '@/types'

// Mock data for demonstration - replace with actual API calls
const mockPals: FavoritePalData[] = [
  {
    id: 'PAL001',
    userName: 'mikejohnson',
    firstName: 'Mike',
    lastName: 'Johnson',
    name: 'Mike Johnson',
    phone: '+234-802-123-4567',
    rating: 4.9,
    totalDeliveries: 342,
    isVerified: true,
    profileImage: '/api/placeholder/40/40'
  },
  {
    id: 'PAL002',
    userName: 'sarahwils',
    firstName: 'Sarah',
    lastName: 'Wilson',
    name: 'Sarah Wilson',
    phone: '+234-805-987-6543',
    rating: 4.8,
    totalDeliveries: 256,
    isVerified: true,
    profileImage: '/api/placeholder/40/40'
  },
  {
    id: 'PAL003',
    userName: 'davido',
    firstName: 'David',
    lastName: 'Okafor',
    name: 'David Okafor',
    phone: '+234-803-456-7890',
    rating: 4.7,
    totalDeliveries: 189,
    isVerified: true,
    profileImage: '/api/placeholder/40/40'
  }
]

export default function FavoritePalPage() {
  const router = useRouter()
  const [currentScreen, setCurrentScreen] = useState<'input' | 'confirmation'>('input')
  const [selectedPal, setSelectedPal] = useState<FavoritePalData | null>(null)
  const [jobData, setJobData] = useState<DeliveryJob | null>(null)

  // Get job data from query params or localStorage
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const jobDataParam = urlParams.get('jobData')
    
    if (jobDataParam) {
      try {
        const parsedJobData = JSON.parse(decodeURIComponent(jobDataParam))
        setJobData(parsedJobData)
      } catch (error) {
        console.error('Error parsing job data:', error)
      }
    }
  }, [])

  const handlePalFound = (palData: FavoritePalData, jobData: DeliveryJob) => {
    setSelectedPal(palData)
    setJobData(jobData)
    setCurrentScreen('confirmation')
  }

  const handleBack = () => {
    if (currentScreen === 'confirmation') {
      setCurrentScreen('input')
    } else {
      router.back()
    }
  }

  const handleConfirmationContinue = (agreedPrice: number, paymentMethod: string) => {
    // Create the favorite pal job
    const favoritePalJobData: FavoritePalJobData = {
      jobId: jobData?.id || Date.now().toString(),
      palId: selectedPal?.id || '',
      palName: selectedPal?.name || '',
      jobTitle: jobData?.title || '',
      status: 'pending',
      amount: agreedPrice
    }

    // Here you would typically:
    // 1. Save the favorite pal job to your backend
    // 2. Process the payment
    // 3. Navigate to a success page or tracking page
    
    console.log('Favorite pal job created:', favoritePalJobData)
    
    // For now, navigate back to dashboard
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-white">
      {currentScreen === 'input' && (
        <FavoritePalInputScreen
          onBack={handleBack}
          onPalFound={handlePalFound}
          jobData={jobData}
        />
      )}
      
      {currentScreen === 'confirmation' && selectedPal && (
        <FavoritePalConfirmationScreen
          palName={selectedPal.name}
          palRating={selectedPal.rating}
          palDeliveries={selectedPal.totalDeliveries}
          onContinue={handleConfirmationContinue}
        />
      )}
    </div>
  )
}
