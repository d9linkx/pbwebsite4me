/**
 * Chat Thread Page
 *
 * Individual chat conversation.
 * Dynamic route: /chat/[threadId]
 */

'use client'

import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useAppStore } from '@/stores/appStore'
import type { ChatMessage } from '@/types/index'

export default function ChatThreadPage() {
  const params = useParams()
  const router = useRouter()
  const threadId = params.threadId as string

  const {
    user,
    chatThreads,
    selectedChatThread,
    setSelectedChatThread,
  } = useAppStore()

  const [newMessage, setNewMessage] = useState('')

  const thread = chatThreads.find((t) => t.id === threadId)

  useEffect(() => {
    if (thread) {
      setSelectedChatThread(thread)
    }
  }, [thread, setSelectedChatThread])

  if (!thread) {
    return (
      <div className="container mx-auto px-4 py-6">
        <p>Chat thread not found</p>
      </div>
    )
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || !user) return

    const message: ChatMessage = {
      id: `msg-${Date.now()}`,
      threadId: thread.id,
      senderId: user.id,
      senderName: user.name,
      senderRole: user.role, // Assuming user has a role property
      message: newMessage,
      type: 'text',
      timestamp: new Date().toISOString(),
      read: false,
    }

    console.log('Sending message:', message)
    // In production, this would make an API call
    setNewMessage('')
  }

  const handleCall = (phone: string) => {
    const cleanPhone = phone.replace(/\D/g, '')
    if (typeof window !== 'undefined') {
      window.open(`https://wa.me/${cleanPhone}`, '_blank')
    }
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      {/* Header */}
      <div className="bg-white rounded-t-lg border border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="text-gray-600 hover:text-gray-900"
          >
            ←
          </button>
          <div>
            <h2 className="font-semibold text-gray-900">{thread.otherUserName}</h2>
            <p className="text-sm text-gray-500">
              {thread.jobTitle || 'General Chat'}
            </p>
          </div>
        </div>
        <button
          onClick={() => handleCall(thread.otherUserPhone || '')}
          className="text-primary hover:text-[#d63a00]"
        >
          📞 Call
        </button>
      </div>

      {/* Messages */}
      <div className="bg-gray-50 border-x border-gray-200 p-6 min-h-[400px] max-h-[500px] overflow-y-auto">
        {thread.messages.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No messages yet. Start the conversation!
          </div>
        ) : (
          <div className="space-y-4">
            {thread.messages.map((message) => {
              const isOwn = message.senderId === user?.id
              return (
                <div
                  key={message.id}
                  className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg px-4 py-2 ${
                      isOwn
                        ? 'bg-primary text-white'
                        : 'bg-white text-gray-900 border border-gray-200'
                    }`}
                  >
                    <p>{message.message}</p>
                    <p
                      className={`text-xs mt-1 ${
                        isOwn ? 'text-white/70' : 'text-gray-500'
                      }`}
                    >
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Message Input */}
      <form
        onSubmit={handleSendMessage}
        className="bg-white rounded-b-lg border border-gray-200 p-4 flex gap-3"
      >
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
        />
        <button
          type="submit"
          className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-[#d63a00] font-medium"
        >
          Send
        </button>
      </form>
    </div>
  )
}
