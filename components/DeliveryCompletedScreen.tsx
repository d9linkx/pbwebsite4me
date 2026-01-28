'use client'
import React from 'react';
import { CheckCircle, Home, Package, Star, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { User, DeliveryJob } from '../types';

interface DeliveryCompletedScreenProps {
  job: DeliveryJob | null;
  user: User | null;
  onReturnToDashboard: () => void;
  onGoToIncomingDeliveries: () => void;
  onRateDelivery?: () => void;
}

export function DeliveryCompletedScreen({
  job,
  user,
  onReturnToDashboard,
  onGoToIncomingDeliveries,
  onRateDelivery
}: DeliveryCompletedScreenProps) {
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark via-darker to-dark flex flex-col items-center justify-center p-6">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 bg-green-500 rounded-full opacity-20 blur-3xl"
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
          className="w-32 h-32 rounded-full bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center mx-auto mb-8"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            duration: 0.8,
            type: 'spring',
            stiffness: 200
          }}
        >
          <CheckCircle size={64} className="text-white" />
        </motion.div>

        {/* Success Message */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-3xl font-bold text-white mb-3">
            Delivery Complete! 🎉
          </h1>
          <p className="text-gray-400 text-lg">
            Your package has been delivered successfully
          </p>
        </motion.div>

        {/* Delivery Details Card */}
        {job && (
          <motion.div 
            className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                <Package size={24} className="text-green-400" />
              </div>
              <div>
                <h3 className="text-white font-semibold">{job.title}</h3>
                <p className="text-gray-400 text-sm">From {job.senderName?.split(' ')[0] || 'Sender'}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Delivery Value:</span>
                <span className="text-white font-semibold">
                  {formatAmount(job.acceptedBidAmount || job.value)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Delivered by:</span>
                <span className="text-white font-medium">
                  {job.selectedPalName?.split(' ')[0] || 'Pal'}
                </span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-center space-x-2 text-green-400">
              <CheckCircle size={16} />
              <span className="text-sm font-medium">Confirmed & Complete</span>
            </div>
          </motion.div>
        )}

        {/* Actions */}
        <div className="space-y-3">
          {onRateDelivery && (
            <motion.button
              onClick={onRateDelivery}
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-primary-dark text-white py-4 rounded-xl font-semibold flex items-center justify-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Star size={20} />
              <span>Rate Delivery</span>
            </motion.button>
          )}

          <motion.button
            onClick={onReturnToDashboard}
            className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white py-4 rounded-xl font-semibold flex items-center justify-center space-x-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75 }}
          >
            <Home size={20} />
            <span>Back to Dashboard</span>
          </motion.button>

          <motion.button
            onClick={onGoToIncomingDeliveries}
            className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white py-4 rounded-xl font-semibold flex items-center justify-center space-x-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Package size={20} />
            <span>View Deliveries</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
