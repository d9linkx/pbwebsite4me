/**
 * React Hook for Socket.IO Integration
 *
 * Provides easy-to-use React hooks for real-time features:
 * - useSocket: Access socket connection
 * - useSocketEvent: Listen to socket events with cleanup
 * - useConnectionStatus: Monitor connection status
 */

import { useEffect, useState, useCallback, useRef } from 'react'
import { socketService, type SocketEvents } from './socket'

/**
 * Hook to access the socket service
 */
export function useSocket() {
  const [isConnected, setIsConnected] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<
    'connected' | 'connecting' | 'disconnected' | 'reconnecting'
  >('disconnected')

  useEffect(() => {
    const updateStatus = () => {
      setIsConnected(socketService.isConnected())
      setConnectionStatus(socketService.getConnectionStatus())
    }

    // Update status on mount
    updateStatus()

    // Listen for connection changes
    socketService.on('connect', () => {
      updateStatus()
    })

    socketService.on('disconnect', () => {
      updateStatus()
    })

    socketService.on('reconnect_attempt', () => {
      updateStatus()
    })

    return () => {
      socketService.off('connect')
      socketService.off('disconnect')
      socketService.off('reconnect_attempt')
    }
  }, [])

  return {
    socket: socketService,
    isConnected,
    connectionStatus,
  }
}

/**
 * Hook to listen to socket events with automatic cleanup
 *
 * @example
 * useSocketEvent('chat:message', (message) => {
 *   console.log('New message:', message)
 * })
 */
export function useSocketEvent<K extends keyof SocketEvents>(
  event: K,
  callback: SocketEvents[K],
  deps: any[] = []
) {
  // Use ref to store the latest callback
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    const handler = ((...args: any[]) => {
      ;(callbackRef.current as any)(...args)
    }) as SocketEvents[K]

    socketService.on(event, handler)

    return () => {
      socketService.off(event, handler)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event, ...deps])
}

/**
 * Hook to monitor connection status with visual indicator
 */
export function useConnectionStatus() {
  const { isConnected, connectionStatus } = useSocket()
  const [showStatus, setShowStatus] = useState(false)
  const [hasConnectedBefore, setHasConnectedBefore] = useState(false)

  useEffect(() => {
    // Track if we've ever connected
    if (connectionStatus === 'connected') {
      setHasConnectedBefore(true)
    }

    // Only show status when reconnecting or when disconnected AFTER having been connected
    if (connectionStatus === 'reconnecting') {
      setShowStatus(true)
    } else if (connectionStatus === 'connected') {
      // Hide status after a brief delay when connected
      const timer = setTimeout(() => {
        setShowStatus(false)
      }, 2000)
      return () => clearTimeout(timer)
    } else if (connectionStatus === 'disconnected' && hasConnectedBefore) {
      // Only show disconnected if we've been connected before (not initial state)
      const timer = setTimeout(() => {
        setShowStatus(true)
      }, 3000) // Wait 3 seconds before showing disconnected
      return () => clearTimeout(timer)
    }
  }, [connectionStatus, hasConnectedBefore])

  const getStatusMessage = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'Connected'
      case 'connecting':
        return 'Connecting...'
      case 'reconnecting':
        return 'Reconnecting...'
      case 'disconnected':
        return 'Disconnected'
      default:
        return ''
    }
  }

  const getStatusColor = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'bg-green-500'
      case 'connecting':
      case 'reconnecting':
        return 'bg-yellow-500'
      case 'disconnected':
        return 'bg-red-500'
      default:
        return 'bg-gray-500'
    }
  }

  return {
    isConnected,
    connectionStatus,
    showStatus,
    statusMessage: getStatusMessage(),
    statusColor: getStatusColor(),
  }
}

/**
 * Hook to join and leave socket rooms automatically
 *
 * @example
 * useSocketRoom(`chat-${threadId}`)
 */
export function useSocketRoom(room: string | null) {
  useEffect(() => {
    if (!room) return

    socketService.joinRoom(room)

    return () => {
      socketService.leaveRoom(room)
    }
  }, [room])
}

/**
 * Hook to send typing indicators for chat
 */
export function useTypingIndicator(threadId: string | null) {
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const sendTyping = useCallback(() => {
    if (!threadId) return

    socketService.sendTypingIndicator(threadId, true)

    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }

    // Stop typing after 2 seconds of inactivity
    typingTimeoutRef.current = setTimeout(() => {
      socketService.sendTypingIndicator(threadId, false)
    }, 2000)
  }, [threadId])

  const stopTyping = useCallback(() => {
    if (!threadId) return

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }

    socketService.sendTypingIndicator(threadId, false)
  }, [threadId])

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
      }
    }
  }, [])

  return { sendTyping, stopTyping }
}

/**
 * Hook to handle real-time job location updates
 */
export function useJobLocationTracking(jobId: string | null) {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [lastUpdate, setLastUpdate] = useState<string | null>(null)

  useSocketEvent(
    'job:location-update',
    useCallback(
      (data) => {
        if (data.jobId === jobId) {
          setLocation(data.location)
          setLastUpdate(new Date().toISOString())
        }
      },
      [jobId]
    ),
    [jobId]
  )

  const updateLocation = useCallback(
    (newLocation: { lat: number; lng: number }) => {
      if (!jobId) return
      socketService.updateJobLocation(jobId, newLocation)
    },
    [jobId]
  )

  return {
    location,
    lastUpdate,
    updateLocation,
  }
}
