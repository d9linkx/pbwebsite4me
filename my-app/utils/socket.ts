/**
 * Socket.IO Client Setup for Real-time Features
 *
 * Provides WebSocket connection management for:
 * - Real-time chat messages
 * - Live notifications
 * - Delivery tracking updates
 * - Connection status monitoring
 */

import { io, Socket } from 'socket.io-client'
import type { ChatMessage, Notification, Bid } from '@/types/index'

// Socket.IO connection configuration
const SOCKET_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000'

interface SocketEvents {
  // Chat events
  'chat:message': (message: ChatMessage) => void
  'chat:typing': (data: { threadId: string; userId: string; isTyping: boolean }) => void

  // Notification events
  'notification:new': (notification: Notification) => void
  'notification:read': (notificationId: string) => void

  // Package events
  'package:created': (data: {
    packageId: string
    orderNumber: string
    senderId: string
    senderName: string
    receiverId: string
    title: string
    pickupLocation: string
    dropoffLocation: string
    value: number
    status: string
  }) => void
  'package:status-update': (data: {
    packageId: string
    orderNumber: string
    status: string
    oldStatus?: string
    senderId?: string
    receiverId?: string
    palId?: string
    proxyId?: string
    actionRequired?: boolean
    urgent?: boolean
  }) => void

  // Bid events
  'bid:placed': (data: {
    packageId: string
    bidId: string
    bidderId: string
    bidderName: string
    amount: number
    senderId: string
    packageTitle: string
  }) => void
  'bid:accepted': (data: {
    packageId: string
    orderNumber: string
    palId: string
    pickupLocation: string
    deliveryCode?: string
  }) => void
  'bid:rejected': (data: {
    packageId: string
    orderNumber: string
    palId: string
  }) => void

  // Delivery events
  'delivery:assigned': (data: {
    packageId: string
    packageTitle: string
    palId: string
    pickupLocation: string
    deliveryCode?: string
  }) => void
  'delivery:started': (data: {
    packageId: string
    receiverId: string
    palName: string
    estimatedArrival?: string
  }) => void
  'delivery:completed': (data: {
    packageId: string
    orderNumber: string
    senderId?: string
    receiverId?: string
    palId?: string
    receiverName?: string
  }) => void

  // Payment events
  'payment:processed': (data: {
    paymentId: string
    userId: string
    amount: number
    type: 'received' | 'sent'
  }) => void

  // System events
  'system:maintenance': (data: {
    message?: string
    urgent?: boolean
    scheduledTime?: string
    duration?: string
  }) => void

  // Job/Delivery events (legacy)
  'job:status-update': (data: { jobId: string; status: string; updatedAt: string }) => void
  'job:new-bid': (data: { jobId: string; bid: Bid }) => void
  'job:bid-accepted': (data: { jobId: string; bidId: string }) => void
  'job:location-update': (data: { jobId: string; location: { lat: number; lng: number } }) => void

  // Connection events
  'connect': () => void
  'disconnect': () => void
  'connect_error': (error: Error) => void
  'reconnect': (attemptNumber: number) => void
  'reconnect_attempt': (attemptNumber: number) => void
  'reconnect_error': (error: Error) => void
  'reconnect_failed': () => void
}

class SocketService {
  private socket: Socket | null = null
  private connectionPromise: Promise<Socket> | null = null
  private reconnectAttempts = 0
  private maxReconnectAttempts = 5
  private listeners: Map<string, Set<(...args: unknown[]) => void>> = new Map()

  /**
   * Initialize Socket.IO connection
   */
  connect(token?: string): Promise<Socket> {
    // If already connecting, return existing promise
    if (this.connectionPromise) {
      return this.connectionPromise
    }

    // If already connected, return immediately
    if (this.socket?.connected) {
      return Promise.resolve(this.socket)
    }

    this.connectionPromise = new Promise((resolve, reject) => {
      try {
        console.log('🔌 Initializing Socket.IO connection to:', SOCKET_URL)

        // Create socket connection with auth token
        this.socket = io(SOCKET_URL, {
          auth: {
            token: token || (typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null)
          },
          transports: ['websocket', 'polling'],
          reconnection: true,
          reconnectionDelay: 1000,
          reconnectionDelayMax: 5000,
          reconnectionAttempts: this.maxReconnectAttempts,
          timeout: 10000,
        })

        // Connection successful
        this.socket.on('connect', () => {
          console.log('✅ Socket.IO connected:', this.socket?.id)
          this.reconnectAttempts = 0
          this.connectionPromise = null
          resolve(this.socket!)
        })

        // Connection error
        this.socket.on('connect_error', (error) => {
          console.error('❌ Socket.IO connection error:', error.message)
          this.connectionPromise = null

          // Don't reject immediately, let reconnection logic handle it
          if (this.reconnectAttempts >= this.maxReconnectAttempts) {
            reject(error)
          }
        })

        // Disconnected
        this.socket.on('disconnect', (reason) => {
          console.log('🔌 Socket.IO disconnected:', reason)

          if (reason === 'io server disconnect') {
            // Server forcefully disconnected, try to reconnect
            this.socket?.connect()
          }
        })

        // Reconnection attempt
        this.socket.on('reconnect_attempt', (attemptNumber) => {
          this.reconnectAttempts = attemptNumber
          console.log(`🔄 Reconnection attempt ${attemptNumber}/${this.maxReconnectAttempts}`)
        })

        // Reconnected successfully
        this.socket.on('reconnect', (attemptNumber) => {
          console.log(`✅ Reconnected after ${attemptNumber} attempts`)
          this.reconnectAttempts = 0
        })

        // Reconnection failed
        this.socket.on('reconnect_failed', () => {
          console.error('❌ Socket.IO reconnection failed after max attempts')
          this.connectionPromise = null
          reject(new Error('Failed to reconnect to server'))
        })

      } catch (error) {
        console.error('❌ Error creating socket connection:', error)
        this.connectionPromise = null
        reject(error)
      }
    })

    return this.connectionPromise
  }

  /**
   * Disconnect from Socket.IO
   */
  disconnect(): void {
    if (this.socket) {
      console.log('🔌 Disconnecting Socket.IO')
      this.socket.disconnect()
      this.socket = null
      this.connectionPromise = null
      this.listeners.clear()
    }
  }

  /**
   * Check if socket is connected
   */
  isConnected(): boolean {
    return this.socket?.connected || false
  }

  /**
   * Get connection status
   */
  getConnectionStatus(): 'connected' | 'connecting' | 'disconnected' | 'reconnecting' {
    if (!this.socket) return 'disconnected'
    if (this.socket.connected) return 'connected'
    if (this.connectionPromise) return 'connecting'
    if (this.reconnectAttempts > 0) return 'reconnecting'
    return 'disconnected'
  }

  /**
   * Emit an event to the server
   */
  emit(event: string, data?: unknown): void {
    if (!this.socket?.connected) {
      console.warn('⚠️ Socket not connected, cannot emit event:', event)
      return
    }

    this.socket.emit(event, data)
  }

  /**
   * Listen for an event from the server
   */
  on<K extends keyof SocketEvents>(event: K, callback: SocketEvents[K]): void {
    if (!this.socket) {
      console.warn('⚠️ Socket not initialized, cannot add listener for:', event)
      return
    }

    // Store listener reference for cleanup
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set())
    }
    this.listeners.get(event)!.add(callback as (...args: unknown[]) => void)

    this.socket.on(event as string, callback)
  }

  /**
   * Remove event listener
   */
  off<K extends keyof SocketEvents>(event: K, callback?: SocketEvents[K]): void {
    if (!this.socket) return

    if (callback) {
      this.socket.off(event as string, callback)
      this.listeners.get(event)?.delete(callback as (...args: unknown[]) => void)
    } else {
      // Remove all listeners for this event
      this.socket.off(event as string)
      this.listeners.delete(event)
    }
  }

  /**
   * Join a room
   */
  joinRoom(room: string): void {
    if (this.socket?.connected) {
      this.socket.emit('join-room', room)
    }
  }

  /**
   * Leave a room
   */
  leaveRoom(room: string): void {
    if (this.socket?.connected) {
      this.socket.emit('leave-room', room)
    }
  }

  /**
   * Send chat message
   */
  sendMessage(threadId: string, message: string, attachments?: string[]): void {
    this.emit('chat:send-message', {
      threadId,
      message,
      attachments,
      timestamp: new Date().toISOString(),
    })
  }

  /**
   * Send typing indicator
   */
  sendTypingIndicator(threadId: string, isTyping: boolean): void {
    this.emit('chat:typing', {
      threadId,
      isTyping,
    })
  }

  /**
   * Mark notification as read
   */
  markNotificationRead(notificationId: string): void {
    this.emit('notification:mark-read', { notificationId })
  }

  /**
   * Update job location (for pals during delivery)
   */
  updateJobLocation(jobId: string, location: { lat: number; lng: number }): void {
    this.emit('job:update-location', {
      jobId,
      location,
      timestamp: new Date().toISOString(),
    })
  }
}

// Export singleton instance
export const socketService = new SocketService()

// Export types for use in components
export type { SocketEvents }
