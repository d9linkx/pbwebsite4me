'use client'
import React, { useEffect } from 'react';
import { CheckCircle, Package, Home, Star, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { ProxyItem } from '../types/index';

interface ProxyCompletedScreenProps {
  proxyItem: ProxyItem | null;
  onReturnToDashboard: () => void;
  onGoToProxyStorage: () => void;
  onRateExperience: () => void;
}

export function ProxyCompletedScreen({
  proxyItem,
  onReturnToDashboard,
  onGoToProxyStorage,
  onRateExperience
}: ProxyCompletedScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onReturnToDashboard();
    }, 4000);

    return () => clearTimeout(timer);
  }, [onReturnToDashboard]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark via-darker to-dark flex flex-col items-center justify-center p-6">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500 rounded-full opacity-20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
        <motion.div
          className="absolute bottom-0 -left-40 w-96 h-96 bg-blue-500 rounded-full opacity-15 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.15, 0.25, 0.15]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.5
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-md w-full">
        {/* Success Icon */}
        <motion.div
          className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center mx-auto mb-8"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            duration: 0.8,
            type: 'spring',
            stiffness: 200
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <CheckCircle size={64} className="text-white" />
          </motion.div>
        </motion.div>

        {/* Success Message */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-3xl font-bold text-white mb-3">Handover Complete!</h1>
          <p className="text-gray-400 text-lg">Item safely stored at proxy</p>
        </motion.div>

        {/* Details */}
        <motion.div
          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Package size={20} className="text-purple-400" />
              <div>
                <p className="text-gray-400 text-sm">Item</p>
                <p className="text-white font-medium">{proxyItem?.title || 'Item'}</p>
              </div>
            </div>
            <div className="h-px bg-white/10"></div>
            <div className="flex items-center space-x-3">
              <Home size={20} className="text-blue-400" />
              <div>
                <p className="text-gray-400 text-sm">Proxy Location</p>
                <p className="text-white font-medium">{proxyItem?.receiverName || 'Receiver Location'}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="space-y-3 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <button
            onClick={onRateExperience}
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center space-x-2"
          >
            <Star size={20} />
            <span>Rate Experience</span>
          </button>
          <button
            onClick={onGoToProxyStorage}
            className="w-full bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl font-semibold border border-white/20"
          >
            View Proxy Storage
          </button>
        </motion.div>

        {/* Continue Button */}
        <motion.button
          onClick={onReturnToDashboard}
          className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white py-4 rounded-xl font-semibold flex items-center justify-center space-x-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <span>Back to Dashboard</span>
          <ArrowRight size={20} />
        </motion.button>

        <motion.p
          className="text-center text-sm text-gray-500 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          Redirecting automatically in 4 seconds...
        </motion.p>
      </div>
    </div>
  );
}
