/**
 * Contact Support Page
 *
 * Contact form for customer support.
 * Replaces the 'contact-support' screen from the monolith.
 */

'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { ContactSupportScreen } from '@/components/ContactSupportScreen'
import { useAppStore } from '@/stores/appStore'
import { toast } from 'sonner'

export default function ContactSupportPage() {
  const router = useRouter()
  const { user } = useAppStore()


  const handleSubmit = (message: string, category: string) => {
    console.log('Support request:', { message, category, user })
    toast.success('Your message has been sent! We\'ll get back to you soon.')

    setTimeout(() => {
      router.push('/help')
    }, 1500)
  }

  const handleBack = () => {
    router.back()
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <ContactSupportScreen
        user={user}
        onBack={handleBack}
      />
    </div>
  )
}
