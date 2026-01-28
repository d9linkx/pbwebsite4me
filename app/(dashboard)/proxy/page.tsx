/**
 * Proxy Dashboard Page
 *
 * Dashboard for proxy users to manage stored items.
 * Replaces the 'proxy-dashboard' screen from the monolith.
 */

'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ProxyDashboard } from '@/components/ProxyDashboard'
import { useAppStore } from '@/stores/appStore'
import type { ProxyItem, Screen } from '@/types/index'

export default function ProxyDashboardPage() {
  const router = useRouter()

  const {
    user,
    proxyItems,
    setSelectedProxyItem,
  } = useAppStore()

  const [selectedRoute, setSelectedRoute] = useState<string | null>(null)

  const handleItemSelect = (item: ProxyItem) => {
    setSelectedProxyItem(item)
    // Navigate to item detail or handover flow
    router.push(`/proxy/items/${item.id}`)
  }

  const handleNavigate = (screen: Screen) => {
    const routeMap: Partial<Record<Screen, string>> = {
      'dashboard': '/dashboard',
      'settings': '/settings',
      'route-ads-management': '/proxy/route-ads',
    }

    const route = routeMap[screen] || '/'
    router.push(route)
  }

  const handleBack = () => {
    router.push('/dashboard')
  }

  const handleCall = (phone: string) => {
    const cleanPhone = phone.replace(/\D/g, '')
    if (typeof window !== 'undefined') {
      window.open(`https://wa.me/${cleanPhone}`, '_blank')
    }
  }

  return (
    <div className="container mx-auto">
      <ProxyDashboard
        user={user}
        proxyItems={proxyItems}
        selectedRoute={selectedRoute}
        onRouteSelect={setSelectedRoute}
        onItemSelect={handleItemSelect}
        onItemUpdate={(item) => {
          // Add your logic to update the item here
          // For example, you might want to update the item in your state
          console.log('Item updated:', item);
        }}
        onNavigate={handleNavigate}
        onBack={handleBack}
        onCall={handleCall}
      />
    </div>
  )
}
