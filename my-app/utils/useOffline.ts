/**
 * Offline Detection Hook
 *
 * Monitors network connection and provides offline/online status
 */

import { useState, useEffect } from 'react'

export interface OfflineState {
  isOffline: boolean
  isOnline: boolean
  wasOffline: boolean
}

export function useOffline() {
  const [state, setState] = useState<OfflineState>({
    isOffline: false,
    isOnline: true,
    wasOffline: false,
  })

  useEffect(() => {
    // Check initial connection status
    const updateOnlineStatus = () => {
      const online = navigator.onLine
      setState((prev) => ({
        isOffline: !online,
        isOnline: online,
        wasOffline: prev.isOffline && online, // Was offline but now online
      }))
    }

    // Set initial status
    updateOnlineStatus()

    // Listen for connection changes
    window.addEventListener('online', updateOnlineStatus)
    window.addEventListener('offline', updateOnlineStatus)

    // Cleanup
    return () => {
      window.removeEventListener('online', updateOnlineStatus)
      window.removeEventListener('offline', updateOnlineStatus)
    }
  }, [])

  // Reset wasOffline flag after a delay
  useEffect(() => {
    if (state.wasOffline) {
      const timer = setTimeout(() => {
        setState((prev) => ({ ...prev, wasOffline: false }))
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [state.wasOffline])

  return state
}

// Hook to show offline banner
export function useOfflineBanner() {
  const { isOffline, wasOffline } = useOffline()
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    if (isOffline) {
      setShowBanner(true)
    } else if (wasOffline) {
      // Show "back online" message briefly
      setShowBanner(true)
      const timer = setTimeout(() => {
        setShowBanner(false)
      }, 3000)

      return () => clearTimeout(timer)
    } else {
      setShowBanner(false)
    }
  }, [isOffline, wasOffline])

  return { showBanner, isOffline, wasOffline }
}
