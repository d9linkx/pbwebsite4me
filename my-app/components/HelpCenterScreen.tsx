'use client'
import React, { useState } from 'react';
import { ArrowLeft, Search, HelpCircle, ChevronRight, ChevronDown, MessageSquare, Phone, Mail, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from './ui/input';
import { User } from '../types';

interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

interface HelpCenterScreenProps {
  user: User | null;
  onBack: () => void;
  onContactSupport: () => void;
}

export function HelpCenterScreen({ user, onBack, onContactSupport }: HelpCenterScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'All Topics', icon: HelpCircle },
    { id: 'getting-started', name: 'Getting Started', icon: HelpCircle },
    { id: 'delivery', name: 'Deliveries', icon: HelpCircle },
    { id: 'payment', name: 'Payments', icon: HelpCircle },
    { id: 'account', name: 'Account', icon: HelpCircle },
    { id: 'safety', name: 'Safety', icon: HelpCircle }
  ];

  const faqs: FAQItem[] = [
    {
      id: '1',
      category: 'getting-started',
      question: 'How do I create a Prawnbox account?',
      answer: 'Download the Prawnbox app, tap "Sign Up", enter your phone number, and verify with the OTP sent to you. Complete your profile with basic information to start using the platform.'
    },
    {
      id: '2',
      category: 'getting-started',
      question: 'What is a Pal?',
      answer: 'A Pal is a delivery person on Prawnbox who accepts and delivers items for senders. Pals can earn money by delivering packages along their regular routes.'
    },
    {
      id: '3',
      category: 'delivery',
      question: 'How do I post a delivery request?',
      answer: 'Tap "Post Delivery" from your dashboard, fill in pickup and dropoff locations, add item details and photos, set your delivery fee, and publish. Pals will bid on your delivery.'
    },
    {
      id: '4',
      category: 'delivery',
      question: 'What is the bidding system?',
      answer: 'When you post a delivery, Pals can bid on it by offering their delivery fee. You can review bids, check Pal ratings, and accept the bid that works best for you.'
    },
    {
      id: '5',
      category: 'payment',
      question: 'How does escrow payment work?',
      answer: 'When you accept a bid, the delivery fee is held in escrow. It\'s released to the Pal only when you confirm successful delivery. This protects both parties.'
    },
    {
      id: '6',
      category: 'payment',
      question: 'What payment methods are accepted?',
      answer: 'We accept bank transfers, debit/credit cards, and wallet top-ups. All transactions are processed securely in Nigerian Naira (₦).'
    },
    {
      id: '7',
      category: 'account',
      question: 'How do I verify my account?',
      answer: 'Go to Settings > Verification and complete identity, phone, and address verification. Verified accounts have higher transaction limits and increased trust.'
    },
    {
      id: '8',
      category: 'account',
      question: 'How do I withdraw from my wallet?',
      answer: 'Go to Wallet > Withdraw, enter the amount, provide your bank details, and confirm. Withdrawals are processed within 24 hours.'
    },
    {
      id: '9',
      category: 'safety',
      question: 'What if the item doesn\'t match the description?',
      answer: 'Pals verify items at pickup. If there\'s a mismatch, they can dispute and submit evidence. Support will review and resolve the issue fairly.'
    },
    {
      id: '10',
      category: 'safety',
      question: 'Is my personal information safe?',
      answer: 'Yes. We use encryption and never share your information with third parties. Phone numbers are masked during delivery coordination.'
    }
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <motion.div
        className="bg-white border-b border-gray-200 p-6 sticky top-0 z-20 shadow-sm"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center space-x-4">
          <motion.button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft size={20} className="text-gray-700" />
          </motion.button>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Help Center</h1>
            <p className="text-sm text-gray-500">Find answers to common questions</p>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 relative z-10">
        {/* Search Bar */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for help..."
            className="pl-12 bg-white border-gray-200 text-gray-900 placeholder-gray-500 focus:border-[#f44708] h-12"
          />
        </motion.div>

        {/* Categories */}
        <motion.div
          className="flex overflow-x-auto gap-2 pb-2 -mx-6 px-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-all ${
                selectedCategory === category.id
                  ? 'bg-[#f44708] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        {/* FAQs */}
        <div className="space-y-3">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((faq, index) => (
              <motion.div
                key={faq.id}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <motion.button
                  onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                  className="w-full p-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <span className="text-gray-900 font-medium text-left">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: expandedFAQ === faq.id ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown size={20} className="text-gray-600" />
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {expandedFAQ === faq.id && (
                    <motion.div
                      className="px-5 pb-5 border-t border-gray-200"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <p className="text-gray-600 text-sm leading-relaxed pt-4">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          ) : (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <HelpCircle size={48} className="text-gray-400 mx-auto mb-4" />
              <h3 className="text-gray-900 font-semibold mb-2">No results found</h3>
              <p className="text-gray-600">Try a different search term or category</p>
            </motion.div>
          )}
        </div>

        {/* Contact Support */}
        <motion.div
          className="bg-gray-50 border border-gray-200 rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-gray-900 font-semibold mb-4">Still need help?</h3>
          <div className="grid grid-cols-1 gap-3">
            <motion.button
              onClick={onContactSupport}
              className="flex items-center justify-between bg-[#f44708] hover:bg-[#ff5722] text-white p-4 rounded-xl shadow-sm"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center space-x-3">
                <MessageSquare size={20} />
                <span className="font-medium">Contact Support</span>
              </div>
              <ChevronRight size={20} />
            </motion.button>

            <motion.a
              href="tel:+2348012345678"
              className="flex items-center justify-between bg-green-500 hover:bg-green-600 text-white p-4 rounded-xl shadow-sm"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center space-x-3">
                <Phone size={20} />
                <span className="font-medium">Call Us</span>
              </div>
              <ChevronRight size={20} />
            </motion.a>

            <motion.a
              href="mailto:support@prawnbox.com"
              className="flex items-center justify-between bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-xl shadow-sm"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center space-x-3">
                <Mail size={20} />
                <span className="font-medium">Email Us</span>
              </div>
              <ExternalLink size={16} />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
