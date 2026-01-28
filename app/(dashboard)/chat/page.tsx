/**
 * Chat Page
 *
 * Shows list of chat threads.
 * Replaces the 'chat' screen from the monolith.
 */

'use client'

import { Suspense } from 'react'
import { useRouter } from 'next/navigation'
import { useAppStore } from '@/stores/appStore'
import { ChatListScreen } from '@/components/ChatListScreen'
import { PageLoader } from '@/components/LoadingStates'

function ChatContent() {
  const router = useRouter()
  const { chatThreads } = useAppStore()

  // Debug: Log what we're getting from the store
  console.log('🔔 Chat page - chatThreads from store:', chatThreads)
  console.log('🔔 Chat page - chatThreads length:', chatThreads?.length || 0)

  const handleBack = () => {
    router.push('/dashboard')
  }

  if (!chatThreads) {
    console.log('🔔 Chat page - No chatThreads, showing loader')
    return <PageLoader message="Loading chats..." />
  }

  if (chatThreads.length === 0) {
    console.log('🔔 Chat page - Empty chatThreads array')
  }

  return (
    <ChatListScreen
      threads={chatThreads}
      onBack={handleBack}
    />
  )
}

export default function ChatPage() {
  return (
    <Suspense fallback={<PageLoader message="Loading chats..." />}>
      <ChatContent />
    </Suspense>
  )
}
