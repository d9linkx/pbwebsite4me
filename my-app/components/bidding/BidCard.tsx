'use client'

import React from 'react'
import { Star, MapPin, Clock, Car, Bike, Truck, MessageCircle, Award, CheckCircle } from 'lucide-react'
import { Bid, VehicleType } from '@/types'
import { formatPrice } from '@/utils/pricing/calculate'
import { getScoreBadgeColor } from '@/utils/bidding/scoring'
import { motion } from 'framer-motion'

interface BidCardProps {
  bid: Bid
  isLowest: boolean
  isRecommended?: boolean
  onAccept: (bidId: string) => void
  onViewProfile: (palId: string) => void
  onMessage?: (palId: string) => void
  showAcceptButton?: boolean
}

const VEHICLE_ICONS: Record<VehicleType, React.ComponentType<any>> = {
  car: Car,
  motorcycle: Bike,
  bike: Bike,
  truck: Truck,
  van: Truck,
  bicycle: Bike
}

export function BidCard({
  bid,
  isLowest,
  isRecommended = false,
  onAccept,
  onViewProfile,
  onMessage,
  showAcceptButton = true
}: BidCardProps) {
  const VehicleIcon = VEHICLE_ICONS[bid.vehicleType] || Car
  const scoreBadgeColor = getScoreBadgeColor(bid.bidScore || 0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-xl border-2 p-5 transition-all hover:shadow-lg ${
        isLowest ? 'border-green-500 bg-green-50/50' : 'border-gray-200'
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          {/* Pal Avatar */}
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#f44708] to-[#ff5722] flex items-center justify-center text-white font-bold text-lg">
            {bid.palName.charAt(0).toUpperCase()}
          </div>

          {/* Pal Info */}
          <div>
            <div className="flex items-center space-x-2">
              <h4 className="font-semibold text-gray-900">{bid.palName}</h4>
              {isLowest && (
                <span className="bg-green-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                  Lowest Bid
                </span>
              )}
              {isRecommended && !isLowest && (
                <span className="bg-blue-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                  Recommended
                </span>
              )}
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-2 mt-1">
              <div className="flex items-center space-x-1">
                <Star size={14} className="text-yellow-500 fill-yellow-500" />
                <span className="text-sm font-medium text-gray-700">{bid.palRating.toFixed(1)}</span>
              </div>
              {bid.palCompletedJobs !== undefined && (
                <span className="text-xs text-gray-500">
                  {bid.palCompletedJobs} deliveries
                </span>
              )}
              {bid.palCompletionRate !== undefined && (
                <span className="text-xs text-green-600 font-medium">
                  {bid.palCompletionRate}% success
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Bid Score Badge */}
        {bid.bidScore !== undefined && (
          <div className={`px-3 py-1 rounded-full ${scoreBadgeColor} font-semibold text-sm`}>
            {bid.bidScore}/100
          </div>
        )}
      </div>

      {/* Bid Details Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {/* Price */}
        <div className="bg-gradient-to-br from-[#f44708] to-[#ff5722] rounded-lg p-3 text-white">
          <p className="text-xs opacity-90 mb-1">Bid Amount</p>
          <p className="text-2xl font-bold">{formatPrice(bid.amount)}</p>
        </div>

        {/* Estimated Time */}
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-xs text-gray-600 mb-1">Estimated Time</p>
          <div className="flex items-center space-x-1">
            <Clock size={16} className="text-gray-600" />
            <p className="text-lg font-semibold text-gray-900">{bid.estimatedTime}</p>
          </div>
        </div>

        {/* Distance */}
        {bid.palDistance !== undefined && (
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs text-gray-600 mb-1">Distance</p>
            <div className="flex items-center space-x-1">
              <MapPin size={16} className="text-gray-600" />
              <p className="text-lg font-semibold text-gray-900">{bid.palDistance.toFixed(1)} km</p>
            </div>
          </div>
        )}

        {/* Vehicle Type */}
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-xs text-gray-600 mb-1">Vehicle</p>
          <div className="flex items-center space-x-1">
            <VehicleIcon size={16} className="text-gray-600" />
            <p className="text-lg font-semibold text-gray-900 capitalize">{bid.vehicleType}</p>
          </div>
        </div>
      </div>

      {/* Pickup Time */}
      {bid.estimatedPickupTime && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <Clock size={16} className="text-blue-600" />
            <p className="text-sm text-blue-900">
              <span className="font-semibold">Can pickup in:</span> {bid.estimatedPickupTime}
            </p>
          </div>
        </div>
      )}

      {/* Message */}
      {bid.message && (
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-start space-x-2">
            <MessageCircle size={16} className="text-gray-600 mt-0.5" />
            <p className="text-sm text-gray-700">{bid.message}</p>
          </div>
        </div>
      )}

      {/* Rank Badge */}
      {bid.bidRank && (
        <div className="mb-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Award size={16} />
            <span>Ranked #{bid.bidRank} among all bids</span>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center space-x-3">
        {showAcceptButton && (
          <button
            onClick={() => onAccept(bid.id)}
            className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-all ${
              isLowest || isRecommended
                ? 'bg-[#f44708] hover:bg-[#ff5722] text-white shadow-md hover:shadow-lg'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
            }`}
          >
            {isLowest || isRecommended ? (
              <span className="flex items-center justify-center space-x-2">
                <CheckCircle size={18} />
                <span>Accept Bid</span>
              </span>
            ) : (
              'Accept Bid'
            )}
          </button>
        )}

        <button
          onClick={() => onViewProfile(bid.palId)}
          className="px-4 py-3 rounded-lg border-2 border-gray-200 hover:border-gray-300 font-semibold text-gray-700 transition-all"
        >
          View Profile
        </button>

        {onMessage && (
          <button
            onClick={() => onMessage(bid.palId)}
            className="p-3 rounded-lg border-2 border-gray-200 hover:border-gray-300 transition-all"
          >
            <MessageCircle size={20} className="text-gray-600" />
          </button>
        )}
      </div>

      {/* Bid timestamp */}
      <div className="mt-3 pt-3 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          Placed {new Date(bid.placedAt).toLocaleString()}
        </p>
      </div>
    </motion.div>
  )
}
