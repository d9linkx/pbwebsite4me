'use client'

import React, { useState } from 'react'
import { Filter, TrendingDown, TrendingUp, Award } from 'lucide-react'
import { Bid } from '@/types'
import { BidCard } from './BidCard'
import { formatPrice } from '@/utils/pricing/calculate'

interface BidListProps {
  bids: Bid[] // ⚠️ EXPECTED: Bids should come pre-ranked from server with bidScore already calculated
  stats?: {
    totalBids: number
    averageAmount: number
    lowestAmount: number
    highestAmount: number
    averageRating: number
  } // ⚠️ OPTIONAL: Server-calculated statistics. Will compute client-side if not provided.
  onAcceptBid: (bidId: string) => void
  onViewProfile: (palId: string) => void
  onMessage?: (palId: string) => void
  showAcceptButton?: boolean
}

type SortOption = 'score' | 'price_low' | 'price_high' | 'rating' | 'distance'

export function BidList({
  bids,
  stats: serverStats,
  onAcceptBid,
  onViewProfile,
  onMessage,
  showAcceptButton = true
}: BidListProps) {
  const [sortBy, setSortBy] = useState<SortOption>('score')
  const [showStats, setShowStats] = useState(true)

  // ⚠️ IMPORTANT: Bids should come from server already ranked with bidScore
  // This component just displays them. Client-side sorting is for UI preferences only.

  // Fallback statistics calculation (client-side) if not provided by server
  const stats = serverStats || (() => {
    if (bids.length === 0) {
      return {
        totalBids: 0,
        averageAmount: 0,
        lowestAmount: 0,
        highestAmount: 0,
        averageRating: 0
      }
    }

    const amounts = bids.map(b => b.amount)
    const ratings = bids.map(b => b.palRating || 0)

    return {
      totalBids: bids.length,
      averageAmount: Math.round(amounts.reduce((a, b) => a + b, 0) / amounts.length),
      lowestAmount: Math.min(...amounts),
      highestAmount: Math.max(...amounts),
      averageRating: ratings.reduce((a, b) => a + b, 0) / ratings.length
    }
  })()

  // CLIENT-SIDE SORTING: For UI display preferences only
  // Server has already ranked bids - this is just for user's viewing preference
  const sortedBids = [...bids].sort((a, b) => {
    switch (sortBy) {
      case 'price_low':
        return a.amount - b.amount
      case 'price_high':
        return b.amount - a.amount
      case 'rating':
        return (b.palRating || 0) - (a.palRating || 0)
      case 'distance':
        return (a.palDistance || 0) - (b.palDistance || 0)
      case 'score':
      default:
        // Use server-calculated bidScore
        return (b.bidScore || 0) - (a.bidScore || 0)
    }
  })

  if (bids.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Award size={32} className="text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Bids Yet</h3>
        <p className="text-gray-600">
          Pals are being notified about your delivery. Bids will appear here as they come in.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Statistics Card */}
      {showStats && (
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Bid Summary</h3>
            <button
              onClick={() => setShowStats(false)}
              className="text-sm opacity-75 hover:opacity-100"
            >
              Hide
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm opacity-90 mb-1">Total Bids</p>
              <p className="text-2xl font-bold">{stats.totalBids}</p>
            </div>
            <div>
              <p className="text-sm opacity-90 mb-1">Lowest Bid</p>
              <div className="flex items-center space-x-1">
                <TrendingDown size={20} />
                <p className="text-2xl font-bold">{formatPrice(stats.lowestAmount)}</p>
              </div>
            </div>
            <div>
              <p className="text-sm opacity-90 mb-1">Average Bid</p>
              <p className="text-2xl font-bold">{formatPrice(stats.averageAmount)}</p>
            </div>
            <div>
              <p className="text-sm opacity-90 mb-1">Highest Bid</p>
              <div className="flex items-center space-x-1">
                <TrendingUp size={20} />
                <p className="text-2xl font-bold">{formatPrice(stats.highestAmount)}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sort Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {sortedBids.length} {sortedBids.length === 1 ? 'Bid' : 'Bids'} Received
          </h3>
          <p className="text-sm text-gray-600">
            Sorted by {sortBy === 'score' ? 'best match (server-ranked)' : sortBy.replace('_', ' ')}
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Filter size={18} className="text-gray-600" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f44708] focus:border-transparent"
          >
            <option value="score">Best Match</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
            <option value="rating">Rating: High to Low</option>
            <option value="distance">Distance: Nearest First</option>
          </select>
        </div>
      </div>

      {/* Bid Cards */}
      <div className="space-y-4">
        {sortedBids.map((bid, index) => (
          <BidCard
            key={bid.id}
            bid={bid}
            isLowest={bid.isLowestBid || false}
            isRecommended={sortBy === 'score' && index === 0}
            onAccept={onAcceptBid}
            onViewProfile={onViewProfile}
            onMessage={onMessage}
            showAcceptButton={showAcceptButton}
          />
        ))}
      </div>
    </div>
  )
}
