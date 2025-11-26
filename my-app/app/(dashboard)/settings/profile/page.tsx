/**
 * Profile Information Page
 *
 * Edit user profile information (name, email, phone, etc.)
 * Replaces the 'profile-information' screen from the monolith.
 */

'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { ProfileInformationScreen } from '@/components/ProfileInformationScreen'
import { useAppStore } from '@/stores/appStore'
import type { Screen, User } from '@/types/index'
import { toast } from 'sonner'

export default function ProfilePage() {
  const router = useRouter()

  const { user, updateUser } = useAppStore()

  const handleNavigate = (screen: Screen) => {
    const routeMap: Partial<Record<Screen, string>> = {
      'settings': '/settings',
      'dashboard': '/dashboard',
    }

    const route = routeMap[screen] || '/settings'
    router.push(route)
  }

  const handleProfileUpdate = (updates: Partial<User>) => {
    if (!user) return

    updateUser(updates)
    toast.success('Profile updated successfully!')

    // Navigate back to settings after a short delay
    setTimeout(() => {
      router.push('/settings')
    }, 1000)
  }

  const handleBack = () => {
    router.back()
  }

  return (
    <ProfileInformationScreen
      user={user}
      onNavigate={handleNavigate}
      onBack={handleBack}
      onSave={handleProfileUpdate}
    />
  )
}
