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
import type { ChatThread } from '@/types/index'

function ChatContent() {
  const router = useRouter()
  const { chatThreads, setSelectedChatThread } = useAppStore()

  const handleThreadSelect = (thread: ChatThread) => {
    setSelectedChatThread(thread)
    router.push(`/chat/${thread.id}`)
  }

  const handleBack = () => {
    router.push('/dashboard')
  }

  if (!chatThreads) {
    return <PageLoader message="Loading chats..." />
  }

  return (
    <ChatListScreen
      threads={chatThreads}
      onThreadSelect={handleThreadSelect}
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
