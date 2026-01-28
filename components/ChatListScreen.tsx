'use client';

import React from 'react';
import { MessageCircle, ExternalLink } from 'lucide-react';
import { ChatThread } from '../types';

interface ChatListScreenProps {
  threads: ChatThread[];
  onBack: () => void;
}

export function ChatListScreen({
  threads,
  onBack,
}: ChatListScreenProps) {
  // Debug: Log threads to see their structure
  console.log('🔔 ChatListScreen received threads:', threads.length, threads)
  if (threads.length > 0) {
    console.log('🔔 First thread structure:', threads[0])
  }
  
  // Function to open WhatsApp chat
  const openWhatsAppChat = (thread: ChatThread) => {
    console.log('🔔 Opening WhatsApp chat for thread:', thread.id)
    console.log('🔔 Thread phone number:', thread.otherUserPhone)
    
    // Test: Add alert to see if click handler is called
    alert(`Chat clicked for ${thread.otherUserName}! Phone: ${thread.otherUserPhone || 'Not available'}`)
    
    const phoneNumber = thread.otherUserPhone;
    if (phoneNumber) {
      // Remove any non-numeric characters except + for country code
      const cleanPhone = phoneNumber.replace(/[^\d+]/g, '');
      const whatsappUrl = `https://wa.me/${cleanPhone}`;
      console.log('🔔 Cleaned phone:', cleanPhone)
      console.log('🔔 WhatsApp URL:', whatsappUrl)
      
      // Open in new tab
      window.open(whatsappUrl, '_blank');
    } else {
      // Fallback: show alert if no phone number
      console.log('🔔 No phone number available for thread:', thread.id)
      alert('Phone number not available for this contact');
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center">
            <button 
              onClick={onBack}
              className="mr-4 text-gray-500 hover:text-gray-700"
            >
              ←
            </button>
            <h1 className="text-xl font-semibold text-gray-900">Messages</h1>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <ExternalLink size={16} className="mr-1" />
            Opens in WhatsApp
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {threads.length > 0 ? (
            threads.map((thread) => (
              <div key={thread.id} className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center flex-1">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-500 flex items-center justify-center mr-3">
                      <MessageCircle className="h-5 w-5 text-white" />
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
                        {thread.otherUserPhone ? `📱 ${thread.otherUserPhone}` : 'No phone number'}
                      </p>
                      {thread.jobTitle && (
                        <div className="mt-1">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            💬 Chat via WhatsApp
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => openWhatsAppChat(thread)}
                    className="ml-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium text-sm"
                  >
                    Open WhatsApp
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center">
              <MessageCircle className="h-12 w-12 text-gray-300 mx-auto" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No conversations</h3>
              <p className="mt-1 text-sm text-gray-500">
                Start a conversation via WhatsApp when you connect with delivery partners.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
