/**
 * Bid Scoring and Ranking Utilities
 *
 * ⚠️ IMPORTANT: THESE ARE CLIENT-SIDE UTILITIES FOR DEVELOPMENT/TESTING ONLY
 *
 * In production, ALL bid scoring, ranking, and validation MUST be done on the server.
 * These functions are provided for:
 * 1. Development/testing before backend is ready
 * 2. UI previews and mock data
 * 3. Reference implementation for backend developers
 *
 * DO NOT USE IN PRODUCTION for actual bid acceptance or payment decisions.
 *
 * Server should implement these calculations and return:
 * - Pre-scored bids with bidScore field
 * - Pre-ranked bids with bidRank field
 * - isLowestBid flag set by server
 * - Validated bid acceptance with wallet checks
 */

import { Bid } from '@/types'

// Scoring weights (must sum to 100)
export const SCORING_WEIGHTS = {
  rating: 40,           // 40% - Pal's rating
  distance: 30,         // 30% - Proximity to pickup
  completionRate: 15,   // 15% - Success rate
  pickupTime: 10,       // 10% - How quickly they can pick up
  price: 5              // 5% - Competitive pricing
}

interface ScoringContext {
  maxDistance: number   // Maximum distance among all bids
  maxPickupTime: number // Maximum pickup time in minutes
  maxAmount: number     // Highest bid amount
}

/**
 * Calculate comprehensive bid score (0-100)
 */
export function calculateBidScore(bid: Bid, context: ScoringContext): number {
  const {
    palRating = 4.0,
    palDistance = 10,
    palCompletionRate = 90,
    estimatedPickupTime = '30 mins',
    amount = 1000
  } = bid

  const { maxDistance, maxPickupTime, maxAmount } = context

  // Rating score (0-100, normalized from 0-5 stars)
  const ratingScore = (palRating / 5) * 100

  // Distance score (closer is better)
  const distanceScore = maxDistance > 0
    ? (1 - palDistance / maxDistance) * 100
    : 100

  // Completion rate score (already 0-100)
  const completionScore = palCompletionRate

  // Pickup time score (faster is better)
  const pickupMinutes = parsePickupTime(estimatedPickupTime)
  const pickupScore = maxPickupTime > 0
    ? (1 - pickupMinutes / maxPickupTime) * 100
    : 100

  // Price score (lower price is better, but not too heavily weighted)
  const priceScore = maxAmount > 0
    ? (1 - amount / maxAmount) * 100
    : 100

  // Weighted total score
  const totalScore =
    (ratingScore * SCORING_WEIGHTS.rating / 100) +
    (distanceScore * SCORING_WEIGHTS.distance / 100) +
    (completionScore * SCORING_WEIGHTS.completionRate / 100) +
    (pickupScore * SCORING_WEIGHTS.pickupTime / 100) +
    (priceScore * SCORING_WEIGHTS.price / 100)

  return Math.round(totalScore)
}

/**
 * Rank bids by score and identify key properties
 */
export function rankBids(bids: Bid[]): Bid[] {
  if (bids.length === 0) return []

  // Calculate scoring context
  const context: ScoringContext = {
    maxDistance: Math.max(...bids.map(b => b.palDistance || 0)),
    maxPickupTime: Math.max(...bids.map(b => parsePickupTime(b.estimatedPickupTime || '30 mins'))),
    maxAmount: Math.max(...bids.map(b => b.amount))
  }

  // Calculate scores for all bids
  const scoredBids = bids.map(bid => ({
    ...bid,
    bidScore: calculateBidScore(bid, context)
  }))

  // Sort by score (highest first)
  const rankedBids = scoredBids.sort((a, b) => (b.bidScore || 0) - (a.bidScore || 0))

  // Find lowest bid
  const lowestAmount = Math.min(...rankedBids.map(b => b.amount))

  // Assign ranks and flags
  return rankedBids.map((bid, index) => ({
    ...bid,
    bidRank: index + 1,
    isLowestBid: bid.amount === lowestAmount
  }))
}

/**
 * Get the best bid based on scoring algorithm
 */
export function getBestBid(bids: Bid[]): Bid | null {
  const rankedBids = rankBids(bids)
  return rankedBids.length > 0 ? rankedBids[0] : null
}

/**
 * Get the lowest bid by amount
 */
export function getLowestBid(bids: Bid[]): Bid | null {
  if (bids.length === 0) return null
  return bids.reduce((lowest, bid) =>
    bid.amount < lowest.amount ? bid : lowest
  )
}

/**
 * Check if bid qualifies for auto-accept
 */
export function isQualifiedForAutoAccept(
  bid: Bid,
  criteria: {
    maxPriceVariance: number // percentage
    minPalRating: number
    suggestedPrice: number
  }
): boolean {
  const { maxPriceVariance, minPalRating, suggestedPrice } = criteria

  // Check rating requirement
  if ((bid.palRating || 0) < minPalRating) {
    return false
  }

  // Check price variance (bid should be within X% of suggested price)
  const maxAcceptablePrice = suggestedPrice * (1 + maxPriceVariance / 100)
  if (bid.amount > maxAcceptablePrice) {
    return false
  }

  // Check completion rate (should be at least 80%)
  if ((bid.palCompletionRate || 0) < 80) {
    return false
  }

  return true
}

/**
 * Parse pickup time string to minutes
 */
export function parsePickupTime(timeStr: string): number {
  const lowerTime = timeStr.toLowerCase()

  // Handle different formats
  if (lowerTime.includes('hour')) {
    const hours = parseInt(lowerTime)
    return hours * 60
  }

  if (lowerTime.includes('min')) {
    return parseInt(lowerTime)
  }

  // Default to 30 minutes if can't parse
  return 30
}

/**
 * Get bid status color for UI
 */
export function getBidStatusColor(bidStatus?: string): string {
  switch (bidStatus) {
    case 'accepted':
      return 'text-green-600 bg-green-50'
    case 'rejected':
      return 'text-red-600 bg-red-50'
    case 'withdrawn':
      return 'text-gray-600 bg-gray-50'
    case 'expired':
      return 'text-orange-600 bg-orange-50'
    case 'pending':
    default:
      return 'text-blue-600 bg-blue-50'
  }
}

/**
 * Get score badge color
 */
export function getScoreBadgeColor(score: number): string {
  if (score >= 80) return 'bg-green-100 text-green-800'
  if (score >= 60) return 'bg-blue-100 text-blue-800'
  if (score >= 40) return 'bg-yellow-100 text-yellow-800'
  return 'bg-orange-100 text-orange-800'
}

/**
 * Generate bid comparison data
 */
export function compareBids(bidA: Bid, bidB: Bid) {
  return {
    price: {
      difference: bidA.amount - bidB.amount,
      percentage: ((bidA.amount - bidB.amount) / bidB.amount) * 100,
      cheaper: bidA.amount < bidB.amount ? 'A' : 'B'
    },
    rating: {
      difference: (bidA.palRating || 0) - (bidB.palRating || 0),
      better: (bidA.palRating || 0) > (bidB.palRating || 0) ? 'A' : 'B'
    },
    distance: {
      difference: (bidA.palDistance || 0) - (bidB.palDistance || 0),
      closer: (bidA.palDistance || 0) < (bidB.palDistance || 0) ? 'A' : 'B'
    },
    pickupTime: {
      difference: parsePickupTime(bidA.estimatedPickupTime || '30 mins') -
                  parsePickupTime(bidB.estimatedPickupTime || '30 mins'),
      faster: parsePickupTime(bidA.estimatedPickupTime || '30 mins') <
              parsePickupTime(bidB.estimatedPickupTime || '30 mins') ? 'A' : 'B'
    }
  }
}

/**
 * Get recommended bids (top 3 by score)
 */
export function getRecommendedBids(bids: Bid[], count: number = 3): Bid[] {
  const rankedBids = rankBids(bids)
  return rankedBids.slice(0, count)
}

/**
 * Calculate bid statistics for a job
 */
export function getBidStatistics(bids: Bid[]) {
  if (bids.length === 0) {
    return {
      totalBids: 0,
      averageAmount: 0,
      lowestAmount: 0,
      highestAmount: 0,
      averageRating: 0,
      averageDistance: 0
    }
  }

  const amounts = bids.map(b => b.amount)
  const ratings = bids.map(b => b.palRating || 0)
  const distances = bids.map(b => b.palDistance || 0)

  return {
    totalBids: bids.length,
    averageAmount: Math.round(amounts.reduce((a, b) => a + b, 0) / amounts.length),
    lowestAmount: Math.min(...amounts),
    highestAmount: Math.max(...amounts),
    averageRating: ratings.reduce((a, b) => a + b, 0) / ratings.length,
    averageDistance: distances.reduce((a, b) => a + b, 0) / distances.length
  }
}
