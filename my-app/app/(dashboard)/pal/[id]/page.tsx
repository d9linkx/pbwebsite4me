/**
 * Pal Profile Page
 * 
 * Shows profile details for a Pal (delivery person)
 * Dynamic route: /pal/[id]
 */

'use client'

import React, { useEffect, useState } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeft, Star, MapPin, Car, CheckCircle, MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

export default function PalProfilePage() {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const palId = params.id as string
  const palName = searchParams.get('name') || 'Pal'
  
  const [isLoading, setIsLoading] = useState(true)
  const [pal, setPal] = useState({
    id: palId,
    name: palName,
    rating: 4.5,
    phone: '+2348077591629',
    email: 'pal@example.com',
    location: 'Lagos, Nigeria',
    vehicleType: 'Motorcycle',
    completedDeliveries: 127,
    memberSince: '2024-01-15',
    responseRate: '98%',
    averageResponseTime: '5 mins',
    verified: true,
    languages: ['English', 'Pidgin'],
    specialties: ['Express Delivery', 'Fragile Items', 'Same Day Delivery'],
    about: 'Experienced delivery professional with excellent track record. Specialized in express and fragile item delivery.'
  })

  useEffect(() => {
    // Simulate loading Pal data
    const loadPalData = async () => {
      try {
        setIsLoading(true)
        // TODO: Replace with actual API call
        // const response = await apiService.getPalProfile(palId)
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Mock data - in real app, this would come from API
        setPal(currentPal => ({
          ...currentPal,
          name: searchParams.get('name') || `Pal ${palId.slice(-4)}`,
        }))
        
      } catch (error) {
        console.error('Error loading Pal profile:', error)
        toast.error('Failed to load Pal profile')
      } finally {
        setIsLoading(false)
      }
    }

    loadPalData()
  }, [palId, searchParams])

  const handleContactPal = () => {
    // Open WhatsApp with the pal if phone number is available
    if (pal.phone) {
      const cleanPhone = pal.phone.replace(/[^\d+]/g, '');
      const whatsappUrl = `https://wa.me/${cleanPhone}`;
      window.open(whatsappUrl, '_blank');
    } else {
      // Fallback: navigate to chat page
      router.push('/chat');
    }
  }

  const handleBack = () => {
    router.back()
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#f44708] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Pal profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.div 
        className="bg-white border-b border-gray-200 p-6 sticky top-0 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center space-x-4">
          <motion.button 
            onClick={handleBack}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft size={20} className="text-gray-700" />
          </motion.button>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Pal Profile</h1>
            <p className="text-sm text-gray-500">View delivery partner details</p>
          </div>
        </div>
      </motion.div>

      {/* Profile Content */}
      <div className="p-6 max-w-4xl mx-auto">
        {/* Profile Header */}
        <motion.div 
          className="bg-white rounded-xl p-6 shadow-sm mb-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-start space-x-6">
            <Avatar className="w-24 h-24">
              <AvatarFallback className="bg-gradient-to-br from-[#f44708] to-[#ff5722] text-white text-2xl">
                {pal.name.split(' ').map((n: string) => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold text-gray-900">{pal.name}</h2>
                {pal.verified && (
                  <Badge className="bg-green-100 text-green-800 border-0">
                    <CheckCircle size={14} className="mr-1" />
                    Verified
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  <Star size={16} className="text-yellow-400 fill-current" />
                  <span className="font-semibold text-gray-900">{pal.rating}</span>
                  <span className="text-gray-500">({pal.completedDeliveries} deliveries)</span>
                </div>
                <div className="flex items-center space-x-1 text-gray-500">
                  <MapPin size={16} />
                  <span>{pal.location}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Car size={16} />
                  <span>{pal.vehicleType}</span>
                </div>
                <div>Response rate: {pal.responseRate}</div>
                <div>Avg response: {pal.averageResponseTime}</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="text-2xl font-bold text-[#f44708]">{pal.completedDeliveries}</div>
            <div className="text-sm text-gray-600">Completed Deliveries</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="text-2xl font-bold text-[#f44708]">{pal.responseRate}</div>
            <div className="text-sm text-gray-600">Response Rate</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="text-2xl font-bold text-[#f44708]">{pal.averageResponseTime}</div>
            <div className="text-sm text-gray-600">Avg Response Time</div>
          </div>
        </motion.div>

        {/* About Section */}
        <motion.div 
          className="bg-white rounded-xl p-6 shadow-sm mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="font-semibold text-gray-900 mb-3">About</h3>
          <p className="text-gray-600 leading-relaxed">{pal.about}</p>
        </motion.div>

        {/* Specialties */}
        <motion.div 
          className="bg-white rounded-xl p-6 shadow-sm mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="font-semibold text-gray-900 mb-3">Specialties</h3>
          <div className="flex flex-wrap gap-2">
            {pal.specialties.map((specialty, index) => (
              <Badge key={index} className="bg-blue-100 text-blue-800 border-0">
                {specialty}
              </Badge>
            ))}
          </div>
        </motion.div>

        {/* Languages */}
        <motion.div 
          className="bg-white rounded-xl p-6 shadow-sm mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="font-semibold text-gray-900 mb-3">Languages</h3>
          <div className="flex flex-wrap gap-2">
            {pal.languages.map((language, index) => (
              <Badge key={index} className="bg-gray-100 text-gray-800 border-0">
                {language}
              </Badge>
            ))}
          </div>
        </motion.div>

        {/* Contact Actions */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <motion.button
            onClick={handleContactPal}
            className="flex-1 bg-[#f44708] hover:bg-[#ff5722] text-white px-6 py-3 rounded-xl font-medium shadow-sm flex items-center justify-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <MessageCircle size={20} />
            <span>Contact Pal</span>
          </motion.button>
          
          <motion.button
            onClick={handleBack}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 px-6 py-3 rounded-xl font-medium transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Go Back
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}
