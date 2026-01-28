/**
 * Real-time Notification Listener
 * 
 * Listens for Socket.IO events and converts them into notifications
 * Replaces the mock notification generator with live event handling
 */

import { socketService } from './socket'
import type { Notification, User, UserRole } from '@/types/index'

export interface NotificationEvent {
  type: string
  data: Record<string, unknown>
  timestamp: string
  userId?: string
  priority?: 'low' | 'medium' | 'high' | 'urgent'
}

class NotificationListener {
  private static instance: NotificationListener
  private notificationCallbacks: Set<(notification: Notification) => void> = new Set()
  private currentUser: User | null = null
  private isConnected = false

  static getInstance(): NotificationListener {
    if (!NotificationListener.instance) {
      NotificationListener.instance = new NotificationListener()
    }
    return NotificationListener.instance
  }

  /**
   * Initialize notification listener for a user
   */
  async initialize(user: User): Promise<void> {
    this.currentUser = user
    
    try {
      // Connect to socket if not already connected
      if (!socketService.isConnected()) {
        await socketService.connect()
      }

      this.isConnected = true
      console.log(`🔔 Notification listener initialized for user: ${user.userName}`)

      // Set up event listeners
      this.setupEventListeners()

      // Join user-specific room for targeted notifications
      socketService.joinRoom(`user_${user.id || user._id}`)

    } catch (error) {
      console.error('❌ Failed to initialize notification listener:', error)
      throw error
    }
  }

  /**
   * Set up Socket.IO event listeners
   */
  private setupEventListeners(): void {
    if (!socketService.isConnected()) {
      console.warn('⚠️ Socket not connected, cannot set up listeners')
      return
    }

    // Listen for direct notifications
    socketService.on('notification:new', (notification: Notification) => {
      this.handleNotification(notification)
    })

    // Listen for package events
    socketService.on('package:created', (data: {
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
    }) => {
      this.handlePackageCreated(data)
    })

    socketService.on('package:status-update', (data: {
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
    }) => {
      this.handlePackageStatusUpdate(data)
    })

    // Listen for bid events
    socketService.on('bid:placed', (data: {
      packageId: string
      bidId: string
      bidderId: string
      bidderName: string
      amount: number
      senderId: string
      packageTitle: string
    }) => {
      this.handleBidPlaced(data)
    })

    socketService.on('bid:accepted', (data: {
      packageId: string
      orderNumber: string
      palId: string
      pickupLocation: string
      deliveryCode?: string
    }) => {
      this.handleBidAccepted(data)
    })

    socketService.on('bid:rejected', (data: {
      packageId: string
      orderNumber: string
      palId: string
    }) => {
      this.handleBidRejected(data)
    })

    // Listen for delivery events
    socketService.on('delivery:assigned', (data: {
      packageId: string
      packageTitle: string
      palId: string
      pickupLocation: string
      deliveryCode?: string
    }) => {
      this.handleDeliveryAssigned(data)
    })

    socketService.on('delivery:started', (data: {
      packageId: string
      receiverId: string
      palName: string
      estimatedArrival?: string
    }) => {
      this.handleDeliveryStarted(data)
    })

    socketService.on('delivery:completed', (data: {
      packageId: string
      orderNumber: string
      senderId?: string
      receiverId?: string
      palId?: string
      receiverName?: string
    }) => {
      this.handleDeliveryCompleted(data)
    })

    // Listen for payment events
    socketService.on('payment:processed', (data: {
      paymentId: string
      userId: string
      amount: number
      type: 'received' | 'sent'
    }) => {
      this.handlePaymentProcessed(data)
    })

    // Listen for system events
    socketService.on('system:maintenance', (data: {
      message?: string
      urgent?: boolean
      scheduledTime?: string
      duration?: string
    }) => {
      this.handleSystemMaintenance(data)
    })

    console.log('🔔 Event listeners set up successfully')
  }

  /**
   * Handle incoming notification
   */
  private handleNotification(notification: Notification): void {
    if (!this.currentUser || notification.userId !== this.currentUser.id && notification.userId !== this.currentUser._id) {
      return // Not for this user
    }

    this.notifyCallbacks(notification)
  }

  /**
   * Handle package created event
   */
  private handlePackageCreated(data: {
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
  }): void {
    if (!this.currentUser) return

    // Only notify if this user is the receiver
    if (data.receiverId === this.currentUser.id || data.receiverId === this.currentUser._id) {
      const notification: Notification = {
        id: `package-${data.packageId}-${Date.now()}`,
        userId: this.currentUser.id,
        type: 'package-created',
        title: 'Package Created for You 📦',
        message: `A package (${data.orderNumber}) has been created for delivery to you. You'll be notified when a Pal is assigned.`,
        timestamp: new Date().toISOString(),
        read: false,
        actionRequired: false,
        category: 'general',
        priority: 'medium',
        jobId: data.packageId,
        metadata: {
          orderNumber: data.orderNumber,
          senderName: data.senderName
        }
      }

      this.notifyCallbacks(notification)
    }
  }

  /**
   * Handle package status update
   */
  private handlePackageStatusUpdate(data: {
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
  }): void {
    if (!this.currentUser) return

    const relevantRoles = ['sender', 'receiver', 'pal', 'proxy']
    const userRole = this.getUserRoleForPackage(data)

    if (userRole && relevantRoles.includes(userRole)) {
      const notification: Notification = {
        id: `package-update-${data.packageId}-${Date.now()}`,
        userId: this.currentUser.id,
        type: 'package-update',
        title: 'Package Status Updated 📋',
        message: `Your package ${data.orderNumber} status has been updated to ${data.status}.`,
        timestamp: new Date().toISOString(),
        read: false,
        actionRequired: data.actionRequired || false,
        category: data.status === 'cancelled' ? 'alert' : 'general',
        priority: data.urgent ? 'urgent' : 'medium',
        jobId: data.packageId,
        metadata: {
          orderNumber: data.orderNumber,
          oldStatus: data.oldStatus,
          newStatus: data.status
        }
      }

      this.notifyCallbacks(notification)
    }
  }

  /**
   * Handle bid placed event
   */
  private handleBidPlaced(data: {
    packageId: string
    bidId: string
    bidderId: string
    bidderName: string
    amount: number
    senderId: string
    packageTitle: string
  }): void {
    if (!this.currentUser) return

    // Only notify the sender
    if (data.senderId === this.currentUser.id || data.senderId === this.currentUser._id) {
      const notification: Notification = {
        id: `bid-${data.bidId}-${Date.now()}`,
        userId: this.currentUser.id,
        type: 'bid-placed',
        title: 'New Bid Received! 💰',
        message: `${data.bidderName} placed a bid of ₦${data.amount} for your ${data.packageTitle}. Review and accept now.`,
        timestamp: new Date().toISOString(),
        read: false,
        actionRequired: true,
        category: 'alert',
        priority: 'urgent',
        jobId: data.packageId,
        metadata: {
          amount: data.amount,
          bidderName: data.bidderName,
          bidId: data.bidId
        }
      }

      this.notifyCallbacks(notification)
    }
  }

  /**
   * Handle bid accepted event
   */
  private handleBidAccepted(data: {
    packageId: string
    orderNumber: string
    palId: string
    pickupLocation: string
    deliveryCode?: string
  }): void {
    if (!this.currentUser) return

    // Notify the Pal whose bid was accepted
    if (data.palId === this.currentUser.id || data.palId === this.currentUser._id) {
      const notification: Notification = {
        id: `bid-accepted-${data.packageId}-${Date.now()}`,
        userId: this.currentUser.id,
        type: 'bid_accepted',
        title: 'Bid Accepted! 🎉',
        message: `Your bid for package ${data.orderNumber} has been accepted! Proceed to pickup.`,
        timestamp: new Date().toISOString(),
        read: false,
        actionRequired: true,
        category: 'alert',
        priority: 'urgent',
        jobId: data.packageId,
        metadata: {
          orderNumber: data.orderNumber,
          pickupLocation: data.pickupLocation
        }
      }

      this.notifyCallbacks(notification)
    }
  }

  /**
   * Handle bid rejected event
   */
  private handleBidRejected(data: {
    packageId: string
    orderNumber: string
    palId: string
  }): void {
    if (!this.currentUser) return

    // Notify the Pal whose bid was rejected
    if (data.palId === this.currentUser.id || data.palId === this.currentUser._id) {
      const notification: Notification = {
        id: `bid-rejected-${data.packageId}-${Date.now()}`,
        userId: this.currentUser.id,
        type: 'bid-rejected',
        title: 'Bid Rejected',
        message: `Your bid for package ${data.orderNumber} was not selected.`,
        timestamp: new Date().toISOString(),
        read: false,
        actionRequired: false,
        category: 'general',
        priority: 'low',
        jobId: data.packageId,
        metadata: {
          orderNumber: data.orderNumber
        }
      }

      this.notifyCallbacks(notification)
    }
  }

  /**
   * Handle delivery assigned event
   */
  private handleDeliveryAssigned(data: {
    packageId: string
    packageTitle: string
    palId: string
    pickupLocation: string
    deliveryCode?: string
  }): void {
    if (!this.currentUser) return

    // Notify the Pal
    if (data.palId === this.currentUser.id || data.palId === this.currentUser._id) {
      const notification: Notification = {
        id: `delivery-assigned-${data.packageId}-${Date.now()}`,
        userId: this.currentUser.id,
        type: 'delivery-assigned',
        title: 'Delivery Assigned! 📦',
        message: `You've been assigned to deliver ${data.packageTitle}. Pickup from ${data.pickupLocation}.`,
        timestamp: new Date().toISOString(),
        read: false,
        actionRequired: true,
        category: 'alert',
        priority: 'urgent',
        jobId: data.packageId,
        metadata: {
          pickupLocation: data.pickupLocation,
          deliveryCode: data.deliveryCode
        }
      }

      this.notifyCallbacks(notification)
    }
  }

  /**
   * Handle delivery started event
   */
  private handleDeliveryStarted(data: {
    packageId: string
    receiverId: string
    palName: string
    estimatedArrival?: string
  }): void {
    if (!this.currentUser) return

    // Notify the receiver
    if (data.receiverId === this.currentUser.id || data.receiverId === this.currentUser._id) {
      const notification: Notification = {
        id: `delivery-started-${data.packageId}-${Date.now()}`,
        userId: this.currentUser.id,
        type: 'delivery-update',
        title: 'Delivery Started! 🚗',
        message: `${data.palName} has picked up your package and is on the way.`,
        timestamp: new Date().toISOString(),
        read: false,
        actionRequired: false,
        category: 'alert',
        priority: 'medium',
        jobId: data.packageId,
        metadata: {
          palName: data.palName,
          estimatedArrival: data.estimatedArrival
        }
      }

      this.notifyCallbacks(notification)
    }
  }

  /**
   * Handle delivery completed event
   */
  private handleDeliveryCompleted(data: {
    packageId: string
    orderNumber: string
    senderId?: string
    receiverId?: string
    palId?: string
    receiverName?: string
  }): void {
    if (!this.currentUser) return

    const userRole = this.getUserRoleForPackage(data)
    
    if (userRole) {
      let title, message
      
      switch (userRole) {
        case 'sender':
          title = 'Delivery Completed Successfully! ✅'
          message = `Your package ${data.orderNumber} has been delivered to ${data.receiverName}. Please rate your Pal.`
          break
        case 'receiver':
          title = 'Package Delivered! 📦'
          message = `Your package ${data.orderNumber} has been successfully delivered. Thank you for using Prawnbox!`
          break
        case 'pal':
          title = 'Delivery Completed! 🎉'
          message = `You've successfully delivered package ${data.orderNumber}. Your payment has been processed.`
          break
        default:
          return
      }

      const notification: Notification = {
        id: `delivery-completed-${data.packageId}-${Date.now()}`,
        userId: this.currentUser.id,
        type: 'delivery-completed',
        title,
        message,
        timestamp: new Date().toISOString(),
        read: false,
        actionRequired: userRole === 'sender',
        category: 'general',
        priority: 'medium',
        jobId: data.packageId,
        metadata: {
          orderNumber: data.orderNumber
        }
      }

      this.notifyCallbacks(notification)
    }
  }

  /**
   * Handle payment processed event
   */
  private handlePaymentProcessed(data: {
    paymentId: string
    userId: string
    amount: number
    type: 'received' | 'sent'
  }): void {
    if (!this.currentUser) return

    if (data.userId === this.currentUser.id || data.userId === this.currentUser._id) {
      const notification: Notification = {
        id: `payment-${data.paymentId}-${Date.now()}`,
        userId: this.currentUser.id,
        type: 'payment-received',
        title: 'Payment Processed! 💳',
        message: `Payment of ₦${data.amount} has been ${data.type === 'received' ? 'received' : 'sent'} successfully.`,
        timestamp: new Date().toISOString(),
        read: false,
        actionRequired: false,
        category: 'general',
        priority: 'medium',
        metadata: {
          amount: data.amount,
          paymentType: data.type
        }
      }

      this.notifyCallbacks(notification)
    }
  }

  /**
   * Handle system maintenance event
   */
  private handleSystemMaintenance(data: {
    message?: string
    urgent?: boolean
    scheduledTime?: string
    duration?: string
  }): void {
    if (!this.currentUser) return

    const notification: Notification = {
      id: `system-${Date.now()}`,
      userId: this.currentUser.id,
      type: 'system-message',
      title: 'System Maintenance 🔧',
      message: data.message || 'System maintenance scheduled. Service may be temporarily unavailable.',
      timestamp: new Date().toISOString(),
      read: false,
      actionRequired: false,
      category: 'general',
      priority: data.urgent ? 'high' : 'medium',
      metadata: {
        scheduledTime: data.scheduledTime,
        duration: data.duration
      }
    }

    this.notifyCallbacks(notification)
  }

  /**
   * Get user's role for a specific package
   */
  private getUserRoleForPackage(packageData: {
    senderId?: string
    receiverId?: string
    palId?: string
    proxyId?: string
  }): 'sender' | 'receiver' | 'pal' | 'proxy' | null {
    if (!this.currentUser || !packageData) return null

    if (packageData.senderId === this.currentUser.id || packageData.senderId === this.currentUser._id) return 'sender'
    if (packageData.receiverId === this.currentUser.id || packageData.receiverId === this.currentUser._id) return 'receiver'
    if (packageData.palId === this.currentUser.id || packageData.palId === this.currentUser._id) return 'pal'
    if (packageData.proxyId === this.currentUser.id || packageData.proxyId === this.currentUser._id) return 'proxy'

    return null
  }

  /**
   * Notify all registered callbacks
   */
  private notifyCallbacks(notification: Notification): void {
    this.notificationCallbacks.forEach(callback => {
      try {
        callback(notification)
      } catch (error) {
        console.error('❌ Error in notification callback:', error)
      }
    })
  }

  /**
   * Register callback for new notifications
   */
  onNotification(callback: (notification: Notification) => void): void {
    this.notificationCallbacks.add(callback)
  }

  /**
   * Unregister callback
   */
  offNotification(callback: (notification: Notification) => void): void {
    this.notificationCallbacks.delete(callback)
  }

  /**
   * Disconnect and cleanup
   */
  disconnect(): void {
    if (this.currentUser) {
      socketService.leaveRoom(`user_${this.currentUser.id || this.currentUser._id}`)
    }

    this.notificationCallbacks.clear()
    this.currentUser = null
    this.isConnected = false

    console.log('🔔 Notification listener disconnected')
  }

  /**
   * Check if listener is connected
   */
  isListenerConnected(): boolean {
    return this.isConnected && socketService.isConnected()
  }
}

// Export singleton instance
export const notificationListener = NotificationListener.getInstance()
