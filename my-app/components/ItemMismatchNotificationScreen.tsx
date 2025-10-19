'use client'
import React, { useState, useEffect } from 'react';
import { ArrowLeft, AlertTriangle, Clock, User, Package, MapPin, PhoneCall, MessageCircle, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from './ui/badge';
import { DeliveryJob, User as UserType } from '../types';

interface ItemMismatchNotificationScreenProps {
  job: DeliveryJob | null;
  user: UserType | null;
  onBack: () => void;
  onViewMyDeliveries: () => void;
  onContactPal?: (phone: string) => void;
  timeRemaining?: number;
}

export function ItemMismatchNotificationScreen({
  job,
  user,
  onBack,
  onViewMyDeliveries,
  onContactPal,
  timeRemaining = 600
}: ItemMismatchNotificationScreenProps) {
  const [countdown, setCountdown] = useState(timeRemaining);

  useEffect(() => {
    if (!job?.disputeTimeoutAt) {
      const timer = setInterval(() => {
        setCountdown(prev => Math.max(0, prev - 1));
      }, 1000);
      return () => clearInterval(timer);
    }

    const updateCountdown = () => {
      const now = Date.now();
      const timeoutTime = new Date(job.disputeTimeoutAt!).getTime();
      const remaining = Math.max(0, Math.floor((timeoutTime - now) / 1000));
      setCountdown(remaining);
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [job?.disputeTimeoutAt]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const progress = ((timeRemaining - countdown) / timeRemaining) * 100;

  if (!job || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#2f2f2f] via-[#1a1a1a] to-[#2f2f2f] flex items-center justify-center">
        <p className="text-gray-400">Unable to load notification details</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2f2f2f] via-[#1a1a1a] to-[#2f2f2f] flex flex-col">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-500 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-0 -left-40 w-80 h-80 bg-orange-500 rounded-full opacity-10 blur-3xl"></div>
      </div>

      {/* Header */}
      <motion.div 
        className="bg-[#2f2f2f] border-b border-white/10 p-6 sticky top-0 z-20 shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center space-x-4">
          <motion.button
            onClick={onBack}
            className="p-2 hover:bg-white/10 rounded-xl transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft size={20} className="text-white" />
          </motion.button>
          <div>
            <h1 className="text-lg font-semibold text-white">Item Mismatch Alert</h1>
            <p className="text-sm text-gray-400">Dispute in progress</p>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 relative z-10">
        {/* Alert Banner */}
        <motion.div 
          className="bg-red-500/20 border border-red-500/30 rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
              <AlertTriangle size={24} className="text-red-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-white font-semibold mb-2">Item Mismatch Reported</h3>
              <p className="text-red-200 text-sm mb-3">
                The Pal has reported that the item doesn&apos;t match the description. Please resolve this issue within the time limit.
              </p>
              <div className="flex items-center space-x-2">
                <Clock size={16} className="text-red-300" />
                <span className="text-red-300 font-semibold">{formatTime(countdown)} remaining</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Progress Bar */}
        <motion.div 
          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Time Progress</span>
            <span className="text-white text-sm">{Math.round(progress)}%</span>
          </div>
          <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </motion.div>

        {/* Item Details */}
        <motion.div 
          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-white font-semibold mb-4">Expected Item</h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <Package size={20} className="text-orange-400 mt-0.5" />
              <div>
                <p className="text-gray-400 text-sm">Item</p>
                <p className="text-white">{job.title}</p>
              </div>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Description</p>
              <p className="text-white">{job.description || 'N/A'}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-gray-400 text-sm">Size</p>
                <p className="text-white">{job.itemSize || 'N/A'}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Category</p>
                <p className="text-white">{job.category || 'N/A'}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Pal Info */}
        <motion.div 
          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-white font-semibold mb-4">Pal Information</h3>
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
              <User size={24} className="text-white" />
            </div>
            <div>
              <p className="text-white font-medium">{job.selectedPalName || 'N/A'}</p>
              <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 text-xs">
                Waiting at pickup
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <motion.button
              onClick={() => onContactPal && onContactPal(job.senderPhone || '+234 800 000 0000')}
              className="flex items-center justify-center space-x-2 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-medium"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <PhoneCall size={18} />
              <span>Call</span>
            </motion.button>

            <motion.button
              className="flex items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-medium"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <MessageCircle size={18} />
              <span>Chat</span>
            </motion.button>
          </div>
        </motion.div>

        {/* What Happens Next */}
        <motion.div 
          className="bg-orange-500/20 border border-orange-500/30 rounded-2xl p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h4 className="font-medium text-orange-300 mb-2">What Happens Next?</h4>
          <ul className="text-sm text-orange-200 space-y-1 list-disc list-inside">
            <li>Contact Pal to clarify the issue</li>
            <li>Resolve mismatch or update item details</li>
            <li>If unresolved, dispute will escalate</li>
            <li>After timeout, 40% compensation applies</li>
          </ul>
        </motion.div>

        {/* Action Button */}
        <motion.button
          onClick={onViewMyDeliveries}
          className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white py-4 rounded-xl font-semibold flex items-center justify-center space-x-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <span>View My Deliveries</span>
          <ChevronRight size={20} />
        </motion.button>
      </div>
    </div>
  );
}
