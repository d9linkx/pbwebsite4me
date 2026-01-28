/**
 * Pricing Calculation Utilities
 *
 * ⚠️ IMPORTANT: THESE ARE CLIENT-SIDE UTILITIES FOR DEVELOPMENT/TESTING ONLY
 *
 * In production, ALL pricing calculations MUST be done on the server.
 * These functions are provided for:
 * 1. Development/testing before backend is ready
 * 2. UI previews while user fills form (estimated pricing)
 * 3. Reference implementation for backend developers
 *
 * DO NOT USE IN PRODUCTION for actual pricing decisions.
 *
 * Server should:
 * - Calculate pricing based on real-time data (traffic, weather APIs)
 * - Store pricing history for market average calculations
 * - Validate prices before job posting
 * - Return PricingSuggestion via GET /api/pricing/suggest
 *
 * Dynamic pricing algorithm for delivery jobs based on multiple factors:
 * - Distance, package size, urgency, time of day, traffic, weather
 */

import { ItemSize, PricingSuggestion } from '@/types'

// Pricing constants (Nigerian Naira)
export const PRICING_CONFIG = {
  baseRate: 500,          // ₦500 base fee
  perKmRate: 100,         // ₦100 per kilometer

  packageMultiplier: {
    Small: 1.0,
    Medium: 1.2,
    Large: 1.5,
    'X-Large': 2.0
  } as Record<ItemSize, number>,

  urgencyMultiplier: {
    low: 1.0,           // Next day
    medium: 1.3,        // Same day
    high: 1.7           // Express (< 3 hours)
  },

  surgeMultiplier: {
    morning: 1.2,       // 7-9am
    lunch: 1.15,        // 12-2pm
    evening: 1.3,       // 5-8pm
    night: 1.1,         // 8pm-12am
    default: 1.0
  },

  trafficMultiplier: {
    light: 1.0,
    moderate: 1.1,
    heavy: 1.25
  },

  weatherMultiplier: {
    clear: 1.0,
    rain: 1.15,
    storm: 1.3
  },

  // Minimum bid decrement
  minBidDecrement: 50  // ₦50
}

interface PricingParams {
  jobId?: string
  distance: number // in kilometers
  packageSize: ItemSize
  urgency: 'low' | 'medium' | 'high'
  pickupTime?: string // ISO string or time string
  traffic?: 'light' | 'moderate' | 'heavy'
  weather?: 'clear' | 'rain' | 'storm'
}

/**
 * Calculate suggested price based on job parameters
 */
export function calculateSuggestedPrice(params: PricingParams): PricingSuggestion {
  const {
    jobId,
    distance,
    packageSize,
    urgency,
    pickupTime,
    traffic = 'moderate',
    weather = 'clear'
  } = params

  // Base price calculation
  const basePrice = PRICING_CONFIG.baseRate + (distance * PRICING_CONFIG.perKmRate)

  // Calculate individual factor impacts
  const sizeMultiplier = PRICING_CONFIG.packageMultiplier[packageSize] || 1.2
  const sizeImpact = basePrice * (sizeMultiplier - 1)

  const urgencyMultiplier = PRICING_CONFIG.urgencyMultiplier[urgency]
  const urgencyImpact = basePrice * (urgencyMultiplier - 1)

  const timeMultiplier = getSurgeMultiplier(pickupTime)
  const surgeImpact = basePrice * (timeMultiplier - 1)

  const trafficMultiplier = PRICING_CONFIG.trafficMultiplier[traffic]
  const trafficImpact = basePrice * (trafficMultiplier - 1)

  const weatherMultiplier = PRICING_CONFIG.weatherMultiplier[weather]
  const weatherImpact = basePrice * (weatherMultiplier - 1)

  // Total suggested price
  const suggestedPrice = Math.round(
    basePrice +
    sizeImpact +
    urgencyImpact +
    surgeImpact +
    trafficImpact +
    weatherImpact
  )

  // Calculate price range (±20%)
  const priceRange = {
    min: Math.round(suggestedPrice * 0.8),
    max: Math.round(suggestedPrice * 1.2)
  }

  // Market average (mock for now - should query database)
  const marketAverage = Math.round(suggestedPrice * 1.05)

  // Competitive bid (10% below suggested to attract quick bids)
  const competitiveBid = Math.round(suggestedPrice * 0.9)

  return {
    jobId,
    basePrice,
    factors: {
      distance: {
        value: distance,
        impact: distance * PRICING_CONFIG.perKmRate
      },
      packageSize: {
        value: packageSize,
        impact: Math.round(sizeImpact)
      },
      urgency: {
        value: urgency,
        impact: Math.round(urgencyImpact)
      },
      timeOfDay: {
        value: pickupTime || new Date().toISOString(),
        impact: Math.round(surgeImpact)
      },
      traffic: {
        value: traffic,
        impact: Math.round(trafficImpact)
      },
      weather: {
        value: weather,
        impact: Math.round(weatherImpact)
      }
    },
    suggestedPrice,
    priceRange,
    marketAverage,
    competitiveBid,
    calculatedAt: new Date().toISOString()
  }
}

/**
 * Get surge multiplier based on time of day
 */
function getSurgeMultiplier(pickupTime?: string): number {
  if (!pickupTime) return PRICING_CONFIG.surgeMultiplier.default

  const date = new Date(pickupTime)
  const hour = date.getHours()

  if (hour >= 7 && hour < 9) return PRICING_CONFIG.surgeMultiplier.morning
  if (hour >= 12 && hour < 14) return PRICING_CONFIG.surgeMultiplier.lunch
  if (hour >= 17 && hour < 20) return PRICING_CONFIG.surgeMultiplier.evening
  if (hour >= 20 || hour < 6) return PRICING_CONFIG.surgeMultiplier.night

  return PRICING_CONFIG.surgeMultiplier.default
}

/**
 * Get time-based surge label
 */
export function getSurgeLabel(pickupTime?: string): string {
  if (!pickupTime) return 'Standard'

  const date = new Date(pickupTime)
  const hour = date.getHours()

  if (hour >= 7 && hour < 9) return 'Morning Rush'
  if (hour >= 12 && hour < 14) return 'Lunch Hour'
  if (hour >= 17 && hour < 20) return 'Evening Rush'
  if (hour >= 20 || hour < 6) return 'Night Time'

  return 'Standard'
}

/**
 * Calculate estimated distance (mock - should use real geocoding)
 */
export function calculateDistance(pickupLocation: string, dropoffLocation: string): number {
  // TODO: Implement real distance calculation using geocoding API
  // For now, return a random distance between 5-20km
  return Math.floor(Math.random() * 15) + 5
}

/**
 * Format price in Nigerian Naira
 */
export function formatPrice(amount: number): string {
  return `₦${amount.toLocaleString('en-NG')}`
}

/**
 * Calculate price breakdown for display
 */
export function getPriceBreakdown(pricing: PricingSuggestion) {
  return [
    {
      label: 'Base Fee',
      amount: pricing.basePrice,
      description: 'Standard delivery charge'
    },
    {
      label: 'Distance',
      amount: pricing.factors.distance.impact,
      description: `${pricing.factors.distance.value}km @ ₦${PRICING_CONFIG.perKmRate}/km`
    },
    {
      label: 'Package Size',
      amount: pricing.factors.packageSize.impact,
      description: `${pricing.factors.packageSize.value} package`
    },
    {
      label: 'Urgency',
      amount: pricing.factors.urgency.impact,
      description: `${pricing.factors.urgency.value} priority`
    },
    {
      label: 'Time of Day',
      amount: pricing.factors.timeOfDay.impact,
      description: getSurgeLabel(pricing.factors.timeOfDay.value)
    },
    {
      label: 'Traffic',
      amount: pricing.factors.traffic.impact,
      description: `${pricing.factors.traffic.value} traffic`
    },
    {
      label: 'Weather',
      amount: pricing.factors.weather.impact,
      description: `${pricing.factors.weather.value} conditions`
    }
  ].filter(item => item.amount > 0) // Only show factors that add cost
}
