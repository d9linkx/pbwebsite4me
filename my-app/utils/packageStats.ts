/**
 * Package Statistics Calculators
 *
 * Provides consistent statistics calculation for packages across all screens.
 * Works with packageFilters.ts to ensure stats match filtered data.
 */

import { DeliveryJob } from '@/types'
import { PackageFilters } from './packageFilters'

export interface PackageStats {
  total: number
  [key: string]: number
}

/**
 * Calculate statistics for sender's packages
 */
export function calculateSenderStats(jobs: DeliveryJob[]): PackageStats {
  return {
    total: jobs.length,
    bidding: jobs.filter(PackageFilters.sender.bidding).length,
    assigned: jobs.filter(PackageFilters.sender.assigned).length,
    active: jobs.filter(PackageFilters.sender.active).length,
    delivered: jobs.filter(PackageFilters.sender.delivered).length,
    completed: jobs.filter(PackageFilters.sender.completed).length,
  }
}

/**
 * Calculate statistics for receiver's packages
 */
export function calculateReceiverStats(jobs: DeliveryJob[]): PackageStats {
  return {
    total: jobs.length,
    incoming: jobs.filter(PackageFilters.receiver.incoming).length,
    withProxy: jobs.filter(PackageFilters.receiver.withProxy).length,
    confirming: jobs.filter(PackageFilters.receiver.confirming).length,
    completed: jobs.filter(PackageFilters.receiver.completed).length,
  }
}

/**
 * Calculate statistics for proxy's packages
 */
export function calculateProxyStats(jobs: DeliveryJob[]): PackageStats {
  return {
    total: jobs.length,
    incoming: jobs.filter(PackageFilters.proxy.incoming).length,
    stored: jobs.filter(PackageFilters.proxy.stored).length,
    pickedUp: jobs.filter(PackageFilters.proxy.pickedUp).length,
    completed: jobs.filter(PackageFilters.proxy.completed).length,
  }
}

/**
 * Calculate statistics for pal's packages
 */
export function calculatePalStats(jobs: DeliveryJob[]): PackageStats {
  return {
    total: jobs.length,
    awaiting: jobs.filter(PackageFilters.pal.awaiting).length,
    awaitingPickup: jobs.filter(PackageFilters.pal.awaiting).length, // Alias for accepted bids screen
    inTransit: jobs.filter(PackageFilters.pal.inTransit).length,
    delivered: jobs.filter(PackageFilters.pal.delivered).length,
    completed: jobs.filter(PackageFilters.pal.completed).length,
    totalEarnings: jobs.reduce((sum, job) => sum + (job.acceptedBidAmount || 0), 0),
  }
}

/**
 * Generic stats calculator that works with any filtered job list
 */
export function calculateGenericStats(jobs: DeliveryJob[]): PackageStats {
  return {
    total: jobs.length,
    pending: jobs.filter(PackageFilters.byStatus.pending).length,
    active: jobs.filter(PackageFilters.byStatus.active).length,
    delivered: jobs.filter(PackageFilters.byStatus.delivered).length,
    completed: jobs.filter(PackageFilters.byStatus.completed).length,
    cancelled: jobs.filter(PackageFilters.byStatus.cancelled).length,
    disputed: jobs.filter(PackageFilters.byStatus.disputed).length,
  }
}

/**
 * Stats calculator factory - returns the appropriate calculator for a role
 */
export const PackageStatsCalculators = {
  sender: calculateSenderStats,
  receiver: calculateReceiverStats,
  proxy: calculateProxyStats,
  pal: calculatePalStats,
  generic: calculateGenericStats,
} as const
