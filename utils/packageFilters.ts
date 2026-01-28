/**
 * Centralized Package Filtering Utilities
 *
 * Provides consistent, reusable filter functions for DeliveryJobs across the app.
 * All filters use proper ID-based comparisons to ensure packages appear in the correct screens.
 *
 * Key Principle: A package should only appear in ONE screen per user based on their role in that delivery.
 */

import { DeliveryJob, User, UserRole, DeliveryStatus } from '@/types'

/**
 * Core filter predicates - Pure functions that return filter functions
 */
export const PackageFilters = {
  // ============================================================================
  // ROLE-BASED FILTERS
  // These determine which packages a user sees based on their role in each delivery
  // ============================================================================

  /**
   * Filter packages where user is the sender
   * Use for: Sender dashboard, sent deliveries screen
   */
  bySender: (userId: string) => (job: DeliveryJob): boolean => {
    return job.senderId?.toString() === userId?.toString()
  },

  /**
   * Filter packages where user is the pal (delivery person)
   * Use for: Pal dashboard, accepted bids screen, active deliveries
   */
  byPal: (userId: string) => (job: DeliveryJob): boolean => {
    return job.selectedPalId?.toString() === userId?.toString()
  },

  /**
   * Filter packages where user is the receiver
   * Use for: Receiver dashboard, received deliveries screen
   */
  byReceiver: (userId: string) => (job: DeliveryJob): boolean => {
    return job.receiverId?.toString() === userId?.toString()
  },

  /**
   * Filter packages where user is the proxy (storage location)
   * Use for: Proxy dashboard, stored items screen
   */
  byProxy: (userId: string) => (job: DeliveryJob): boolean => {
    return job.proxyId?.toString() === userId?.toString()
  },

  /**
   * Filter packages by active role
   * Use for: Main dashboard when switching roles
   */
  byRole: (userId: string, role: UserRole) => (job: DeliveryJob): boolean => {
    const userIdStr = userId?.toString()
    switch (role) {
      case 'sender':
        return job.senderId?.toString() === userIdStr
      case 'pal':
        return job.selectedPalId?.toString() === userIdStr
      case 'receiver':
        return job.receiverId?.toString() === userIdStr
      case 'proxy':
        return job.proxyId?.toString() === userIdStr
      default:
        return false
    }
  },

  /**
   * Filter packages where user has ANY involvement
   * Use for: Global package search, analytics
   */
  byAnyRole: (userId: string) => (job: DeliveryJob): boolean => {
    const userIdStr = userId?.toString()
    return (
      job.senderId?.toString() === userIdStr ||
      job.selectedPalId?.toString() === userIdStr ||
      job.receiverId?.toString() === userIdStr ||
      job.proxyId?.toString() === userIdStr
    )
  },

  // ============================================================================
  // STATUS-BASED FILTERS
  // Unified status definitions across all screens
  // ============================================================================

  /**
   * Universal status filters (same meaning across all roles)
   */
  byStatus: {
    pending: (job: DeliveryJob) => ['pending', 'bidding'].includes(job.status),
    active: (job: DeliveryJob) => ['assigned', 'picked-up', 'in-transit'].includes(job.status),
    delivered: (job: DeliveryJob) => job.status === 'delivered',
    completed: (job: DeliveryJob) => job.status === 'completed',
    cancelled: (job: DeliveryJob) => job.status === 'cancelled',
    disputed: (job: DeliveryJob) => job.status === 'disputed',
  },

  /**
   * Sender-specific status filters
   */
  sender: {
    bidding: (job: DeliveryJob) => ['pending', 'bidding'].includes(job.status),
    assigned: (job: DeliveryJob) => job.status === 'assigned',
    active: (job: DeliveryJob) => ['assigned', 'picked-up', 'in-transit'].includes(job.status),
    delivered: (job: DeliveryJob) => job.status === 'delivered',
    completed: (job: DeliveryJob) => job.status === 'completed',
  },

  /**
   * Receiver-specific status filters
   */
  receiver: {
    incoming: (job: DeliveryJob) => ['assigned', 'picked-up', 'in-transit'].includes(job.status),
    withProxy: (job: DeliveryJob) => job.status === 'delivered' && !!job.proxyId,
    confirming: (job: DeliveryJob) => job.status === 'delivered' && !job.proxyId,
    completed: (job: DeliveryJob) => job.status === 'completed',
  },

  /**
   * Proxy-specific status filters
   */
  proxy: {
    incoming: (job: DeliveryJob) => ['assigned', 'picked-up'].includes(job.status),
    stored: (job: DeliveryJob) => job.status === 'delivered',
    pickedUp: (job: DeliveryJob) => job.status === 'in-transit',
    completed: (job: DeliveryJob) => job.status === 'completed',
  },

  /**
   * Pal-specific status filters
   */
  pal: {
    awaiting: (job: DeliveryJob) => job.status === 'assigned',
    inTransit: (job: DeliveryJob) => ['in-transit', 'picked-up'].includes(job.status),
    delivered: (job: DeliveryJob) => job.status === 'delivered',
    completed: (job: DeliveryJob) => job.status === 'completed',
  },

  // ============================================================================
  // SEARCH FILTERS
  // ============================================================================

  /**
   * Search across all relevant job fields
   */
  bySearchQuery: (query: string) => (job: DeliveryJob): boolean => {
    if (!query) return true
    const lowerQuery = query.toLowerCase()
    return (
      (job.title || '').toLowerCase().includes(lowerQuery) ||
      (job.orderNumber || '').toLowerCase().includes(lowerQuery) ||
      (job.pickupLocation || '').toLowerCase().includes(lowerQuery) ||
      (job.dropoffLocation || '').toLowerCase().includes(lowerQuery) ||
      (job.senderName || '').toLowerCase().includes(lowerQuery) ||
      (job.receiverName || '').toLowerCase().includes(lowerQuery) ||
      (job.selectedPalName || '').toLowerCase().includes(lowerQuery) ||
      (job.proxyName || '').toLowerCase().includes(lowerQuery)
    )
  },

  // ============================================================================
  // BID-BASED FILTERS
  // ============================================================================

  /**
   * Filter packages where user has placed a bid
   */
  byBidPlacer: (userId: string) => (job: DeliveryJob): boolean => {
    return job.bids?.some(bid => bid.palId?.toString() === userId?.toString()) || false
  },

  /**
   * Filter packages where user has placed a bid OR is the accepted pal
   */
  byPalInvolvement: (userId: string) => (job: DeliveryJob): boolean => {
    const userIdStr = userId?.toString()
    return (
      job.selectedPalId?.toString() === userIdStr ||
      job.bids?.some(bid => bid.palId?.toString() === userIdStr) ||
      false
    )
  },
}

// ============================================================================
// COMPOSABLE FILTER BUILDER
// ============================================================================

/**
 * Apply multiple filters to a job list
 * All filters must pass for a job to be included
 */
export function filterPackages(
  jobs: DeliveryJob[],
  filters: Array<(job: DeliveryJob) => boolean>
): DeliveryJob[] {
  if (!filters || filters.length === 0) return jobs
  return jobs.filter(job => filters.every(filter => filter(job)))
}

// ============================================================================
// HIGH-LEVEL FILTER FUNCTIONS
// Convenience functions for common filtering scenarios
// ============================================================================

/**
 * Get all packages for a user based on their active role
 */
export function getUserPackages(
  jobs: DeliveryJob[],
  user: User | null,
  role: UserRole
): DeliveryJob[] {
  if (!user) return []
  return jobs.filter(PackageFilters.byRole(user.id, role))
}

/**
 * Get all packages where user is the sender
 */
export function getSenderPackages(jobs: DeliveryJob[], userId: string): DeliveryJob[] {
  if (!userId) return []
  return jobs.filter(PackageFilters.bySender(userId))
}

/**
 * Get all packages where user is the pal
 */
export function getPalPackages(jobs: DeliveryJob[], userId: string): DeliveryJob[] {
  if (!userId) return []
  return jobs.filter(PackageFilters.byPal(userId))
}

/**
 * Get all packages where user is the receiver
 */
export function getReceiverPackages(jobs: DeliveryJob[], userId: string): DeliveryJob[] {
  if (!userId) return []
  return jobs.filter(PackageFilters.byReceiver(userId))
}

/**
 * Get all packages where user is the proxy
 */
export function getProxyPackages(jobs: DeliveryJob[], userId: string): DeliveryJob[] {
  if (!userId) return []
  return jobs.filter(PackageFilters.byProxy(userId))
}

/**
 * Get all packages where user has any involvement
 */
export function getAllUserPackages(jobs: DeliveryJob[], userId: string): DeliveryJob[] {
  if (!userId) return []
  return jobs.filter(PackageFilters.byAnyRole(userId))
}

/**
 * Get packages for specific role with status filter
 */
export function getPackagesByRoleAndStatus(
  jobs: DeliveryJob[],
  userId: string,
  role: UserRole,
  statusFilter: (job: DeliveryJob) => boolean
): DeliveryJob[] {
  if (!userId) return []
  return filterPackages(jobs, [
    PackageFilters.byRole(userId, role),
    statusFilter
  ])
}
