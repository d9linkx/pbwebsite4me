/**
 * Notifications Page
 *
 * Shows all user notifications with tabs for alerts and general notifications.
 * Replaces the 'notifications' screen from the monolith.
 */

'use client'

import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { NotificationsScreen } from '@/components/NotificationsScreen'
import { useAppStore } from '@/stores/appStore'
import type { Notification, Screen } from '@/types/index'

export default function NotificationsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const tab = searchParams.get('tab') as 'alerts' | 'general' | null

  const {
    user,
    notifications,
    setSelectedNotification,
    setNotifications,
    notificationTab,
    setNotificationTab,
    activeRole = 'sender' as const // Default to 'sender' which is a valid UserRole
  } = useAppStore()

  // Set tab from URL param
  React.useEffect(() => {
    if (tab) {
      setNotificationTab(tab)
    }
  }, [tab, setNotificationTab])

  const handleNotificationAction = (notification: Notification) => {
    setSelectedNotification(notification)
    // Navigate based on notification type
    if (notification.actionUrl) {
      router.push(notification.actionUrl)
    }
  }

  const handleMarkAsRead = (notificationId: string) => {
    const updated = notifications.map((n) =>
      n.id === notificationId ? { ...n, read: true } : n
    )
    setNotifications(updated)
  }

  const handleMarkAllAsRead = () => {
    const updated = notifications.map(n => ({ ...n, read: true }))
    setNotifications(updated)
  }

  const handleNavigate = (screen: Screen) => {
    if (screen === 'dashboard') {
      router.push('/')
    }
  }

  const handleBack = () => {
    router.push('/')
  }

  const handleTabChange = (newTab: 'alerts' | 'general') => {
    setNotificationTab(newTab)
    router.push(`/notifications?tab=${newTab}`)
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <NotificationsScreen
        notifications={notifications}
        onNotificationAction={handleNotificationAction}
        onNavigate={handleNavigate}
        onBack={handleBack}
        user={user}
        activeRole={activeRole}
        onMarkAsRead={handleMarkAsRead}
        onMarkAllAsRead={handleMarkAllAsRead}
        initialTab={notificationTab}
      />
    </div>
  )
}
