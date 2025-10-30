'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';
import { ChatThread, User } from '../types';

interface ChatListScreenProps {
  threads: ChatThread[];
  onThreadSelect: (thread: ChatThread) => void;
  onBack: () => void;
}

export function ChatListScreen({
  threads,
  onThreadSelect,
  onBack,
}: ChatListScreenProps) {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex items-center">
          <button 
            onClick={onBack}
            className="mr-4 text-gray-500 hover:text-gray-700"
          >
            ←
          </button>
          <h1 className="text-xl font-semibold text-gray-900">Messages</h1>
        </div>

        <div className="divide-y divide-gray-200">
          {threads.length > 0 ? (
            threads.map((thread) => (
              <button
                key={thread.id}
                onClick={() => onThreadSelect(thread)}
                className="w-full text-left p-4 hover:bg-gray-50 transition-colors duration-150 flex items-center"
              >
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                  <MessageCircle className="h-5 w-5 text-gray-500" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {thread.otherUserName || 'Unknown User'}
                    </h3>
                    <span className="text-xs text-gray-500">
                      {new Date(thread.lastActivity).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 truncate">
                    {thread.messages.length > 0 
                      ? thread.messages[thread.messages.length - 1].message
                      : 'No messages yet'}
                  </p>
                  {thread.jobTitle && (
                    <div className="mt-1">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {thread.jobTitle}
                      </span>
                    </div>
                  )}
                </div>
              </button>
            ))
          ) : (
            <div className="p-8 text-center">
              <MessageCircle className="h-12 w-12 text-gray-300 mx-auto" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No conversations</h3>
              <p className="mt-1 text-sm text-gray-500">
                You don&apos;t have any messages yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
