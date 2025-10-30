/**
 * Chat Page
 *
 * Shows list of chat threads.
 * Replaces the 'chat' screen from the monolith.
 */

'use client'

import { useRouter } from 'next/navigation'
import { useAppStore } from '@/stores/appStore'
import { ChatListScreen } from '@/components/ChatListScreen'
import type { ChatThread } from '@/types/index'

export default function ChatPage() {
  const router = useRouter()

  const {
    user,
    chatThreads,
    setSelectedChatThread,
  } = useAppStore()

  const handleThreadSelect = (thread: ChatThread) => {
    setSelectedChatThread(thread);
    router.push(`/chat/${thread.id}`);
  };

  const handleNavigate = (screen: string) => {
    router.push(`/${screen}`);
  };

  const handleBack = () => {
    router.push('/dashboard');
  };

  if (!chatThreads) {
    return <div>Loading...</div>;
  }

  return (
    <ChatListScreen
      threads={chatThreads}
      onThreadSelect={handleThreadSelect}
      onBack={handleBack}
    />
  )
}
