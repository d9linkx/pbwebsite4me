/**
 * Breadcrumbs Component
 *
 * Shows navigation breadcrumbs for the dashboard
 * Format: Dashboard → Current Page
 */

'use client'

import React from 'react'
import { useRouter, usePathname } from 'next/navigation'

interface BreadcrumbItem {
  label: string
  path?: string
}

export function Breadcrumbs() {
  const router = useRouter()
  const pathname = usePathname()

  // Generate breadcrumbs based on current path
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'Dashboard', path: '/' }
    ]

    // Don't show breadcrumbs on dashboard home
    if (pathname === '/' || pathname === '/dashboard') {
      return []
    }

    // Map paths to readable labels
    const pathLabels: Record<string, string> = {
      '/jobs': 'Available Jobs',
      '/jobs/post': 'Post Delivery',
      '/jobs/my-deliveries': 'My Deliveries',
      '/wallet': 'Wallet',
      '/wallet/add-funds': 'Add Funds',
      '/wallet/withdraw': 'Withdraw Funds',
      '/wallet/transactions': 'Transactions',
      '/settings': 'Settings',
      '/settings/profile': 'Profile Information',
      '/settings/verification': 'Verification',
      '/settings/payment-methods': 'Payment Methods',
      '/chat': 'Chat',
      '/notifications': 'Notifications',
      '/proxy': 'Proxy Dashboard',
      '/help': 'Help Center',
      '/help/contact': 'Contact Support',
      '/sponsorship': 'Sponsorship',
      '/referrals': 'Referrals',
      '/ratings': 'Ratings & Reviews',
    }

    // Check for dynamic routes
    if (pathname.startsWith('/jobs/') && !pathname.startsWith('/jobs/post') && !pathname.startsWith('/jobs/my-deliveries')) {
      if (pathname.includes('/bids')) {
        breadcrumbs.push({ label: 'Job Details' })
        breadcrumbs.push({ label: 'Bids' })
      } else if (pathname.includes('/tracking')) {
        breadcrumbs.push({ label: 'Job Details' })
        breadcrumbs.push({ label: 'Tracking' })
      } else {
        breadcrumbs.push({ label: 'Job Details' })
      }
    } else if (pathname.startsWith('/chat/')) {
      breadcrumbs.push({ label: 'Chat', path: '/chat' })
      breadcrumbs.push({ label: 'Conversation' })
    } else {
      // Use the mapped label or fallback to formatted pathname
      const label = pathLabels[pathname] || formatPathname(pathname)
      breadcrumbs.push({ label })
    }

    return breadcrumbs
  }

  // Format pathname to readable label
  const formatPathname = (path: string): string => {
    return path
      .split('/')
      .filter(Boolean)
      .map(segment => segment.replace(/-/g, ' '))
      .map(segment => segment.charAt(0).toUpperCase() + segment.slice(1))
      .join(' - ')
  }

  const breadcrumbs = generateBreadcrumbs()

  // Don't render if no breadcrumbs
  if (breadcrumbs.length === 0) {
    return null
  }

  return (
    <div className="hidden xl:block mt-4 mx-4 pointer-events-none">
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-2.5 shadow-sm border border-gray-100 max-w-fit pointer-events-auto">
        <nav className="flex items-center space-x-2 text-sm">
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={index}>
              {index > 0 && <span className="text-gray-400">→</span>}
              {crumb.path ? (
                <button
                  onClick={() => router.push(crumb.path!)}
                  className="text-[#f44708] hover:text-[#d63d07] transition-colors hover:underline font-medium"
                >
                  {crumb.label}
                </button>
              ) : (
                <span className="text-gray-900 font-medium">{crumb.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>
      </div>
    </div>
  )
}
