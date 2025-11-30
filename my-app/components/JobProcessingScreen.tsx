'use client'
import React, { useEffect } from 'react';
import { CheckCircle, Package, X, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { DeliveryJob } from '../types';

interface JobProcessingScreenProps {
  job: DeliveryJob | null;
  onViewDetails: () => void;
  onClose: () => void;
  isMinimized: boolean;
  onMinimize: () => void;
  bidCount?: number;
  autoMinimize?: boolean; // Only auto-minimize on initial post
}

export function JobProcessingScreen({
  job,
  onViewDetails,
  onClose,
  isMinimized,
  onMinimize,
  bidCount = 0,
  autoMinimize = false
}: JobProcessingScreenProps) {
  useEffect(() => {
    // Only auto-minimize if explicitly requested (on initial post)
    if (!autoMinimize) return;

    const timer = setTimeout(() => {
      onMinimize();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onMinimize, autoMinimize]);

  // Minimized status bar at top
  if (isMinimized) {
    return (
      <motion.div
        className="fixed top-0 left-0 right-0 bg-green-500 text-white p-3 z-50 shadow-lg"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        exit={{ y: -100 }}
      >
        <div className="flex items-center justify-between max-w-md mx-auto">
          <div className="flex items-center space-x-3">
            <Package size={20} />
            <div className="flex flex-col">
              <span className="font-semibold text-sm">Order #{job?.orderNumber}</span>
              <span className="text-xs opacity-90">
                {bidCount === 0
                  ? 'Waiting for bids...'
                  : `${bidCount} ${bidCount === 1 ? 'bid' : 'bids'} received`}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <motion.button
              onClick={onViewDetails}
              className="p-2 hover:bg-green-600 rounded-lg transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Eye size={18} />
            </motion.button>
            <motion.button
              onClick={onClose}
              className="p-2 hover:bg-green-600 rounded-lg transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <X size={18} />
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  }

  // Full screen processing view
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <motion.div
        className="text-center relative z-10 max-w-md"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        {/* Success Icon */}
        <motion.div
          className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        >
          <CheckCircle size={48} className="text-green-600" />
        </motion.div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Posted!</h2>

        {/* Order Number */}
        <p className="text-gray-600 mb-1 font-medium">Order #{job?.orderNumber}</p>

        {/* Status Messages */}
        <p className="text-gray-600 mb-2">Your order is being processed</p>
        <p className="text-gray-600 mb-8">Available Pals will bid on your delivery soon</p>

        {/* Bid Status Card */}
        <motion.div
          className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <p className="text-blue-900 font-medium">
              {bidCount === 0
                ? 'Waiting for bids...'
                : `${bidCount} ${bidCount === 1 ? 'bid' : 'bids'} received`}
            </p>
          </div>
        </motion.div>

        {/* Auto-minimize countdown */}
        <motion.p
          className="text-xs text-gray-500 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Auto-minimizing in 5 seconds...
        </motion.p>

        {/* Action Buttons */}
        <div className="flex flex-col space-y-3 w-full">
          <motion.button
            onClick={onViewDetails}
            className="bg-[#f44708] hover:bg-[#ff5722] text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 shadow-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Eye size={20} />
            <span>View Details</span>
          </motion.button>

          <motion.button
            onClick={onClose}
            className="bg-gray-100 hover:bg-gray-200 text-gray-900 px-6 py-3 rounded-xl font-semibold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            Close
          </motion.button>
        </div>

        {/* Additional Info */}
        <motion.div
          className="mt-8 bg-gray-50 border border-gray-200 rounded-xl p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">What happens next?</h4>
          <ul className="text-xs text-gray-600 space-y-1 text-left">
            <li>• Available Pals will review your delivery request</li>
            <li>• You&apos;ll receive bids from interested Pals</li>
            <li>• Review bids and select the best Pal for your delivery</li>
            <li>• Track your delivery in real-time once accepted</li>
          </ul>
        </motion.div>
      </motion.div>
    </div>
  );
}
