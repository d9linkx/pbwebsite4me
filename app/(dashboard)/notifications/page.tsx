/**
 * Notifications Page
 *
 * Shows all user notifications with tabs for alerts and general notifications.
 * Replaces the 'notifications' screen from the monolith.
 */

'use client'
import React, { useCallback, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { NotificationsScreen } from '@/components/NotificationsScreen'
import { useAppStore } from '@/stores/appStore'
import { apiService } from '@/utils/apiService'
import { toast } from 'sonner'
import type { Notification, Screen } from '@/types/index'

export default function NotificationsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const tab = searchParams.get('tab') as 'alerts' | 'general' | null
  const [loading, setLoading] = useState(true)
  const [localNotifications, setLocalNotifications] = useState<Notification[]>([])

  const {
    user,
    notifications, // Get notifications from global store
    setSelectedNotification,
    setNotifications,
    notificationTab,
    setNotificationTab,
    activeRole = 'sender' as const // Default to 'sender' which is a valid UserRole
  } = useAppStore()

  // Debug: Log user and role info
  console.log('🔔 User data:', user)
  console.log('🔔 Active role from store:', activeRole)

  // Type for database notification structure
interface DatabaseNotification {
  _id: string;
  recipient: string;
  recipientType: string;
  sender?: string;
  senderType?: string;
  type: string;
  title: string;
  message: string;
  createdAt: string;
  status?: string;
  priority?: string;
  actionUrl?: string;
  data?: Record<string, unknown>;
}

// Type for notification data with packageId
interface NotificationData {
  packageId?: string;
  bidId?: string;
  bidderId?: string;
  bidderName?: string;
  amount?: number;
  orderNumber?: string;
}

// Transform database notifications to frontend format
  const transformNotification = useCallback((dbNotification: DatabaseNotification): Notification => {
    // Generate actionUrl from metadata if not present
    let actionUrl = dbNotification.actionUrl;
    if (!actionUrl && dbNotification.data && typeof dbNotification.data === 'object') {
      const data = dbNotification.data as NotificationData;
      if (data.packageId) {
        actionUrl = `/jobs/${data.packageId}/bids`; // Navigate to bids page for review
      }
    }
    
    const transformed = {
      id: dbNotification._id,
      userId: dbNotification.recipient,
      type: (dbNotification.type === 'bid_accepted' ? 'bid-placed' : dbNotification.type) as Notification['type'], // Cast to Notification type
      title: dbNotification.title,
      message: dbNotification.message,
      timestamp: dbNotification.createdAt,
      read: dbNotification.status === 'read',
      actionRequired: dbNotification.type === 'bid_accepted' || dbNotification.priority === 'urgent',
      priority: (dbNotification.priority as 'low' | 'medium' | 'high' | 'urgent' || undefined),
      category: (dbNotification.type === 'bid_accepted' ? 'alert' : 'general') as 'alert' | 'general', // Cast to NotificationCategory
      actionUrl: actionUrl,
      metadata: dbNotification.data || {}
    }
    
    console.log('🔔 Transforming notification:', {
      original: dbNotification,
      transformed: transformed,
      actionUrl: transformed.actionUrl,
      generatedFromMetadata: !dbNotification.actionUrl && actionUrl
    })
    
    return transformed
  }, [])

  // Fetch notifications from backend
  useEffect(() => {
    const fetchNotifications = async () => {
      if (!user) return
      
      try {
        setLoading(true)
        
        const response = await apiService.getNotifications({
          page: 1,
          limit: 50
        })
        
        console.log('🔔 API response:', response)
        
        if (response.success && response.data) {
          console.log('🔔 Raw API notifications array:', response.data.notifications)
          
          // Transform database notifications to frontend format
          const rawNotifications = response.data.notifications as unknown as DatabaseNotification[]
          const transformedNotifications = rawNotifications.map(transformNotification)
          console.log('🔔 Transformed notifications:', transformedNotifications)
          
          setLocalNotifications(transformedNotifications)
          setNotifications(transformedNotifications)
        }
      } catch (error) {
        console.error('❌ Error fetching notifications:', error)
        toast.error('Failed to load notifications')
      } finally {
        setLoading(false)
      }
    }

    fetchNotifications()
  }, [user, setNotifications, transformNotification])

  // Set tab from URL param
  React.useEffect(() => {
    if (tab) {
      setNotificationTab(tab)
    }
  }, [tab, setNotificationTab])

  const handleNotificationAction = (notification: Notification) => {
    console.log('🔔 Notification clicked:', notification)
    console.log('🔔 Action URL:', notification.actionUrl)
    
    setSelectedNotification(notification)
    // Navigate based on notification type
    if (notification.actionUrl) {
      console.log('🔔 Navigating to:', notification.actionUrl)
      router.push(notification.actionUrl)
    } else {
      console.log('🔔 No action URL found for notification:', notification.type)
    }
  }

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      console.log('🔔 Marking notification as read:', notificationId)
      
      const response = await apiService.markNotificationAsRead(notificationId)
      
      if (response.success) {
        // Update local state
        const updated = localNotifications.map((n) =>
          n.id === notificationId ? { ...n, read: true } : n
        )
        setLocalNotifications(updated)
        setNotifications(updated)
        console.log('✅ Notification marked as read')
      } else {
        throw new Error(response.message || 'Failed to mark as read')
      }
    } catch (error) {
      console.error('❌ Error marking notification as read:', error)
      toast.error('Failed to mark notification as read')
    }
  }

  const handleMarkAllAsRead = async () => {
    try {
      console.log('🔔 Marking all notifications as read')
      
      const response = await apiService.markAllNotificationsAsRead()
      
      if (response.success) {
        // Update local state
        const updated = localNotifications.map(n => ({ ...n, read: true }))
        setLocalNotifications(updated)
        setNotifications(updated)
        console.log('✅ All notifications marked as read')
        toast.success('All notifications marked as read')
      } else {
        throw new Error(response.message || 'Failed to mark all as read')
      }
    } catch (error) {
      console.error('❌ Error marking all notifications as read:', error)
      toast.error('Failed to mark all notifications as read')
    }
  }

  const handleNavigate = (screen: Screen) => {
    if (screen === 'dashboard') {
      router.push('/')
    }
  }

  const handleBack = () => {
    router.back()
  }

  return (
    <NotificationsScreen
      notifications={notifications.length > 0 ? notifications : localNotifications}
      onNotificationAction={handleNotificationAction}
      onNavigate={handleNavigate}
      onBack={handleBack}
      activeRole={activeRole}
      onMarkAsRead={handleMarkAsRead}
      onMarkAllAsRead={handleMarkAllAsRead}
      initialTab={notificationTab}
      loading={loading}
    />
  )
}
