'use client'
import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Send, Phone, MoreVertical, User as UserIcon, MessageCircle, AlertTriangle, Shield, Flag, HelpCircle, FileText, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { ChatThread, User, ChatMessage, UserRole } from '../types';
import { formatPhoneNumber } from '../utils/helpers';

interface ChatScreenProps {
  chatThread: ChatThread | null;
  currentUser: User | null;
  onBack: () => void;
  onSendMessage: (message: string) => void;
  onReportIssue?: (issue: { type: string; description: string; severity: 'low' | 'medium' | 'high' }) => void;
  onRequestMediation?: () => void;
  onContactSupport?: () => void;
}

export function ChatScreen({ chatThread, currentUser, onBack, onSendMessage, onReportIssue, onRequestMediation, onContactSupport }: ChatScreenProps) {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showConflictResolution, setShowConflictResolution] = useState(false);
  const [reportType, setReportType] = useState('');
  const [reportDescription, setReportDescription] = useState('');
  const [reportSeverity, setReportSeverity] = useState<'low' | 'medium' | 'high'>('medium');
  const [showQuickActions, setShowQuickActions] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatThread?.messages]);

  if (!chatThread || !currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#2f2f2f] via-[#1a1a1a] to-[#2f2f2f] flex items-center justify-center p-4">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <MessageCircle size={48} className="text-gray-400 mx-auto mb-4" />
          <h3 className="text-white mb-2">No Chat Available</h3>
          <p className="text-gray-400 mb-4">Unable to load chat conversation</p>
          <motion.button
            onClick={onBack}
            className="bg-[#f44708] hover:bg-[#ff5722] text-white px-6 py-3 rounded-xl font-medium flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Go Back
          </motion.button>
        </motion.div>
      </div>
    );
  }

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
    setIsTyping(e.target.value.length > 0);
  };

  // Get participant info for display
  const getParticipantInfo = (senderId: string) => {
    if (senderId === 'system') {
      return { name: 'System', role: 'system' as UserRole, color: 'text-gray-400' };
    }
    if (senderId === currentUser.id) {
      return { name: 'You', role: currentUser.role, color: 'text-white' };
    }
    return { name: 'Participant', role: 'sender' as UserRole, color: 'text-white' };
  };

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case 'sender': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'pal': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'receiver': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'proxy': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const formatMessageTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    
    return date.toLocaleDateString();
  };

  // Conflict Resolution Functions
  const handleReportIssue = () => {
    if (reportType && reportDescription.trim() && onReportIssue) {
      onReportIssue({
        type: reportType,
        description: reportDescription.trim(),
        severity: reportSeverity
      });
      
      onSendMessage(`🚨 Issue Reported: ${reportType} - ${reportDescription.trim()}`);
      
      setReportType('');
      setReportDescription('');
      setReportSeverity('medium');
      setShowConflictResolution(false);
    }
  };

  const handleRequestMediation = () => {
    if (onRequestMediation) {
      onRequestMediation();
      onSendMessage('🤝 Mediation has been requested. A Prawnbox support agent will join the chat shortly to help resolve any issues.');
      setShowConflictResolution(false);
    }
  };

  const conflictIssueTypes = [
    { value: 'item-mismatch', label: 'Item Description Mismatch', icon: '📦' },
    { value: 'delivery-delay', label: 'Delivery Delay/Issue', icon: '⏰' },
    { value: 'location-problem', label: 'Pickup/Delivery Location Problem', icon: '📍' },
    { value: 'payment-dispute', label: 'Payment/Pricing Dispute', icon: '💰' },
    { value: 'damage-concern', label: 'Item Damage Concern', icon: '⚠️' },
    { value: 'safety-issue', label: 'Safety/Security Concern', icon: '🔒' },
    { value: 'communication-issue', label: 'Communication Problem', icon: '💬' },
    { value: 'other', label: 'Other Issue', icon: '❓' }
  ];

  const getQuickReplies = (message: ChatMessage, userRole: UserRole) => {
    const replies: string[] = [];
    const msgLower = (message.message || '').toLowerCase();
    
    if (message.senderId === 'support-agent') {
      if (msgLower.includes('what specific challenges') || msgLower.includes('what issue')) {
        replies.push('Item doesn\'t match description', 'Having delivery delays', 'Communication issues');
      } else if (msgLower.includes('available solutions') || msgLower.includes('which option')) {
        replies.push('Option 1 sounds good', 'I prefer the second option', 'Let\'s go with Option 3');
      } else if (msgLower.includes('resolution complete') || msgLower.includes('resolved')) {
        replies.push('Thank you for your help!', 'Much appreciated', 'Great service!');
      } else {
        replies.push('Yes, that works', 'I understand', 'Thank you');
      }
      return replies.slice(0, 3);
    }
    
    if (userRole === 'sender') {
      if (msgLower.includes('arrived') || msgLower.includes('here')) {
        replies.push('Thank you! Coming down now', 'Great, I\'ll be right there', 'Perfect timing!');
      } else if (msgLower.includes('pickup')) {
        replies.push('Yes, it\'s ready', 'Package is waiting', 'All set for pickup');
      } else if (msgLower.includes('delivered')) {
        replies.push('Thank you so much!', 'Excellent service', 'Much appreciated');
      } else {
        replies.push('Sounds good', 'Thank you', 'Understood');
      }
    } else if (userRole === 'pal') {
      if (msgLower.includes('ready') || msgLower.includes('waiting')) {
        replies.push('On my way!', 'ETA 5 minutes', 'Almost there');
      } else if (msgLower.includes('handle with care') || msgLower.includes('fragile')) {
        replies.push('Absolutely, I\'ll be very careful', 'Noted - extra care', 'Will handle gently');
      } else {
        replies.push('Copy that', 'Understood', 'Will do');
      }
    } else if (userRole === 'receiver') {
      if (msgLower.includes('minutes away') || msgLower.includes('arriving')) {
        replies.push('I\'ll be ready', 'Waiting for you', 'Perfect, see you soon');
      } else if (msgLower.includes('delivered')) {
        replies.push('Coming to collect now', 'On my way down', 'Be right there');
      } else {
        replies.push('Thanks for the update', 'Got it', 'Sounds good');
      }
    }
    
    return replies.slice(0, 3);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2f2f2f] via-[#1a1a1a] to-[#2f2f2f] flex flex-col">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#f44708] rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-blue-500 rounded-full opacity-10 blur-3xl"></div>
      </div>

      {/* Header */}
      <motion.div 
        className="bg-[#2f2f2f] border-b border-white/10 p-6 z-10 relative"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <motion.button
              onClick={onBack}
              className="p-2 hover:bg-white/10 rounded-xl transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft size={20} className="text-white" />
            </motion.button>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#f44708]/20 rounded-full flex items-center justify-center">
                <MessageCircle size={20} className="text-[#f44708]" />
              </div>
              <div>
                <h1 className="font-semibold text-white flex items-center space-x-2">
                  <span>Delivery Chat</span>
                  {chatThread.participants.includes('support-agent') && (
                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">
                      🤝 Support Active
                    </Badge>
                  )}
                </h1>
                <div className="flex items-center space-x-2">
                  <p className="text-sm text-gray-400">
                    {chatThread.participants.length} participants
                  </p>
                  <div className={`w-2 h-2 rounded-full ${
                    chatThread.participants.includes('support-agent') 
                      ? 'bg-blue-500' 
                      : 'bg-green-500'
                  }`}></div>
                  <span className={`text-xs ${
                    chatThread.participants.includes('support-agent') 
                      ? 'text-blue-400' 
                      : 'text-green-400'
                  }`}>
                    {chatThread.participants.includes('support-agent') ? 'Mediation Active' : 'Active'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <motion.button
            onClick={() => setShowConflictResolution(!showConflictResolution)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl border transition-all ${
              showConflictResolution 
                ? 'bg-[#f44708]/20 border-[#f44708]/30 text-[#f44708]' 
                : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Shield size={16} />
            <span className="text-sm font-medium">Help</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Conflict Resolution Panel */}
      <AnimatePresence>
        {showConflictResolution && (
          <motion.div 
            className="bg-[#2f2f2f]/50 border-b border-white/10 z-10 relative"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="p-6">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-[#f44708]/20 rounded-full flex items-center justify-center">
                    <Shield size={20} className="text-[#f44708]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Conflict Resolution Center</h3>
                    <p className="text-sm text-gray-400">Get help resolving delivery issues</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Quick Mediation */}
                  <motion.div
                    className="bg-green-500/20 border border-green-500/30 rounded-2xl p-4 text-center cursor-pointer hover:bg-green-500/30 transition-all"
                    onClick={handleRequestMediation}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="w-12 h-12 bg-green-500/30 rounded-full flex items-center justify-center mx-auto mb-3">
                      <HelpCircle size={24} className="text-green-400" />
                    </div>
                    <h4 className="font-medium text-green-400 mb-2">Request Mediation</h4>
                    <p className="text-sm text-green-300/70">Get a support agent to join and help resolve issues</p>
                  </motion.div>

                  {/* Report Issue */}
                  <Collapsible>
                    <CollapsibleTrigger asChild>
                      <motion.div
                        className="bg-[#f44708]/20 border border-[#f44708]/30 rounded-2xl p-4 text-center cursor-pointer hover:bg-[#f44708]/30 transition-all"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="w-12 h-12 bg-[#f44708]/30 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Flag size={24} className="text-[#f44708]" />
                        </div>
                        <h4 className="font-medium text-white mb-2">Report Issue</h4>
                        <p className="text-sm text-gray-400">Document a specific problem for resolution</p>
                      </motion.div>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="mt-4 p-4 bg-white/5 border border-white/10 rounded-2xl space-y-4">
                        {/* Issue Type Selection */}
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">Issue Type</label>
                          <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                            {conflictIssueTypes.map((type) => (
                              <motion.button
                                key={type.value}
                                onClick={() => setReportType(type.value)}
                                className={`p-2 text-xs rounded-xl border transition-all text-left ${
                                  reportType === type.value
                                    ? 'border-[#f44708] bg-[#f44708]/20 text-[#f44708]'
                                    : 'border-white/20 bg-white/5 hover:border-[#f44708]/30 text-gray-300'
                                }`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <span className="mr-1">{type.icon}</span>
                                {type.label}
                              </motion.button>
                            ))}
                          </div>
                        </div>

                        {/* Severity Level */}
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">Severity</label>
                          <div className="flex space-x-2">
                            {[
                              { value: 'low', label: 'Low', color: 'green' },
                              { value: 'medium', label: 'Medium', color: 'yellow' },
                              { value: 'high', label: 'High', color: 'red' }
                            ].map((severity) => (
                              <motion.button
                                key={severity.value}
                                onClick={() => setReportSeverity(severity.value as 'low' | 'medium' | 'high')}
                                className={`px-3 py-1 text-xs rounded-full border transition-all ${
                                  reportSeverity === severity.value
                                    ? `border-${severity.color}-500/30 bg-${severity.color}-500/20 text-${severity.color}-400`
                                    : 'border-white/20 bg-white/5 text-gray-400'
                                }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                {severity.label}
                              </motion.button>
                            ))}
                          </div>
                        </div>

                        {/* Description */}
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">Description</label>
                          <textarea
                            value={reportDescription}
                            onChange={(e) => setReportDescription(e.target.value)}
                            placeholder="Please describe the issue in detail..."
                            className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-gray-500 resize-none focus:border-[#f44708] focus:outline-none"
                            rows={3}
                          />
                        </div>

                        <motion.button
                          onClick={handleReportIssue}
                          disabled={!reportType || !reportDescription.trim()}
                          className="w-full bg-[#f44708] hover:bg-[#ff5722] text-white py-3 rounded-xl font-medium disabled:bg-gray-600 disabled:cursor-not-allowed transition-all flex items-center justify-center"
                          whileHover={{ scale: !reportType || !reportDescription.trim() ? 1 : 1.02 }}
                          whileTap={{ scale: !reportType || !reportDescription.trim() ? 1 : 0.98 }}
                        >
                          Submit Issue Report
                        </motion.button>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>

                  {/* Contact Support */}
                  <motion.div
                    className="bg-blue-500/20 border border-blue-500/30 rounded-2xl p-4 text-center cursor-pointer hover:bg-blue-500/30 transition-all"
                    onClick={onContactSupport}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="w-12 h-12 bg-blue-500/30 rounded-full flex items-center justify-center mx-auto mb-3">
                      <MessageCircle size={24} className="text-blue-400" />
                    </div>
                    <h4 className="font-medium text-blue-400 mb-2">Contact Support</h4>
                    <p className="text-sm text-blue-300/70">Get direct help from our support team</p>
                  </motion.div>
                </div>

                {/* Resolution Guidelines */}
                <div className="mt-6 p-4 bg-white/5 border border-white/10 rounded-xl">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle size={16} className="text-[#f44708] mt-0.5 flex-shrink-0" />
                    <div className="text-xs text-gray-400">
                      <p className="font-medium text-white mb-1">Resolution Process:</p>
                      <p>1. Try to resolve issues through direct communication first</p>
                      <p>2. Use mediation for complex disputes requiring neutral intervention</p>
                      <p>3. Report serious issues that may require immediate action or policy enforcement</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Messages Container */}
      <div className="flex-1 overflow-hidden pb-32 relative z-10">
        <div className="h-full flex flex-col">
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {chatThread.messages.length === 0 ? (
              <motion.div 
                className="flex flex-col items-center justify-center h-full text-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <MessageCircle size={48} className="text-gray-400 mb-4" />
                <h3 className="text-white mb-2">Start the Conversation</h3>
                <p className="text-gray-400 max-w-md">
                  This is the beginning of your delivery chat. You can communicate with all parties involved in this delivery.
                </p>
              </motion.div>
            ) : (
              chatThread.messages.map((msg, index) => {
                const isCurrentUser = msg.senderId === currentUser.id;
                const isSystemMessage = msg.type === 'system';
                const participantInfo = getParticipantInfo(msg.senderId);
                const isRecentMessage = index >= chatThread.messages.length - 3;
                
                return (
                  <motion.div 
                    key={msg.id} 
                    className="space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {/* System Messages */}
                    {isSystemMessage ? (
                      <div className="flex justify-center">
                        <div className={`px-4 py-2 rounded-full text-sm max-w-md text-center ${
                          msg.message.includes('🚨') || msg.message.includes('Issue reported') 
                            ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                            : msg.message.includes('🤝') || msg.message.includes('mediation') || msg.message.includes('support agent')
                            ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                            : msg.message.includes('✅') || msg.message.includes('resolved')
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                            : 'bg-white/10 text-gray-400 border border-white/10'
                        }`}>
                          {msg.message}
                        </div>
                      </div>
                    ) : (
                      /* Regular Messages */
                      <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs sm:max-w-md lg:max-w-lg ${isCurrentUser ? 'order-1' : 'order-2'}`}>
                          {/* Sender Info */}
                          {!isCurrentUser && (
                            <div className="flex items-center space-x-2 mb-1 px-1">
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                msg.senderId === 'support-agent' 
                                  ? 'bg-blue-500/20' 
                                  : 'bg-white/10'
                              }`}>
                                {msg.senderId === 'support-agent' ? (
                                  <Shield size={12} className="text-blue-400" />
                                ) : (
                                  <UserIcon size={12} className="text-white" />
                                )}
                              </div>
                              <span className={`text-sm font-medium ${
                                msg.senderId === 'support-agent' 
                                  ? 'text-blue-400' 
                                  : 'text-white'
                              }`}>
                                {msg.senderName}
                                {msg.senderId === 'support-agent' && (
                                  <span className="text-xs text-blue-400/70 ml-1">(Support)</span>
                                )}
                              </span>
                              <Badge 
                                variant="secondary" 
                                className={`text-xs px-2 py-0.5 capitalize border ${
                                  msg.senderId === 'support-agent' 
                                    ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                                    : msg.senderRole === 'system'
                                      ? 'bg-gray-500/20 text-gray-400 border-gray-500/30'
                                      : getRoleColor(msg.senderRole)
                                }`}
                              >
                                {msg.senderId === 'support-agent' ? 'Support' : msg.senderRole}
                              </Badge>
                            </div>
                          )}
                          
                          {/* Message Bubble */}
                          <div className={`rounded-2xl p-4 shadow-lg ${
                            isCurrentUser
                              ? 'bg-[#f44708] text-white rounded-br-md'
                              : msg.senderId === 'support-agent'
                              ? 'bg-blue-500/20 text-blue-300 rounded-bl-md border-2 border-blue-500/30'
                              : 'bg-white/10 text-white rounded-bl-md border border-white/20'
                          }`}>
                            <p className="text-sm leading-relaxed whitespace-pre-wrap">
                              {msg.message}
                            </p>
                            <p className={`text-xs mt-2 ${
                              isCurrentUser 
                                ? 'text-white/70' 
                                : msg.senderId === 'support-agent' 
                                ? 'text-blue-400/70' 
                                : 'text-gray-400'
                            }`}>
                              {formatMessageTime(msg.timestamp)}
                              {isCurrentUser && msg.read && (
                                <span className="ml-1">✓✓</span>
                              )}
                            </p>
                          </div>
                          
                          {/* Quick Reply Buttons */}
                          {!isCurrentUser && !isSystemMessage && isRecentMessage && currentUser && (
                            <div className="mt-2 flex flex-wrap gap-2">
                              {getQuickReplies(msg, currentUser.role).map((reply, replyIndex) => (
                                <motion.button
                                  key={`${msg.id}-reply-${replyIndex}`}
                                  onClick={() => onSendMessage && onSendMessage(reply)}
                                  className="px-3 py-1.5 text-xs bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-full transition-all"
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  style={{
                                    maxWidth: '160px',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap'
                                  }}
                                >
                                  {reply}
                                </motion.button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </motion.div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Message Input - Sticky */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#2f2f2f] border-t border-white/10 p-6 shadow-lg z-50">
        <div className="flex items-end space-x-3">
          <div className="flex-1 relative">
            <Input
              value={message}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="w-full rounded-2xl bg-white/10 border-white/20 text-white placeholder:text-gray-500 px-4 py-3 pr-12 focus:bg-white/15 focus:border-[#f44708] resize-none min-h-[48px]"
              style={{ paddingRight: '3rem' }}
            />
            
            {/* Typing indicator */}
            {isTyping && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="flex space-x-1">
                  <div className="w-1 h-1 bg-[#f44708] rounded-full animate-bounce"></div>
                  <div className="w-1 h-1 bg-[#f44708] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-1 h-1 bg-[#f44708] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            )}
          </div>
          
          <motion.button
            onClick={handleSend}
            disabled={!message.trim()}
            className={`w-12 h-12 p-0 rounded-2xl transition-all duration-200 ${
              message.trim()
                ? 'bg-[#f44708] hover:bg-[#ff5722] text-white scale-100'
                : 'bg-white/10 text-gray-500 scale-95'
            }`}
            whileHover={{ scale: message.trim() ? 1.05 : 0.95 }}
            whileTap={{ scale: message.trim() ? 0.95 : 0.95 }}
          >
            <Send size={18} className={message.trim() ? 'transform translate-x-0.5' : ''} />
          </motion.button>
        </div>

        {/* Quick Info */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/10">
          <span className="text-xs text-gray-400">
            Last active: {formatMessageTime(chatThread.lastActivity)}
          </span>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-green-400">Online</span>
          </div>
        </div>
      </div>
    </div>
  );
}
