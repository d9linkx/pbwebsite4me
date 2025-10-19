'use client'
import React, { useEffect } from 'react';
import { CheckCircle, Package, Shield, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { DeliveryJob, Bid } from '../types';

interface PaymentConfirmationScreenProps {
  job: DeliveryJob | null;
  bid?: Bid;
  onBack?: () => void;
  onTrackDelivery?: () => void;
  onOpenChat?: () => void;
}

export function PaymentConfirmationScreen({ job, bid, onBack, onTrackDelivery, onOpenChat }: PaymentConfirmationScreenProps) {
  const onContinue = onTrackDelivery || (() => {});
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      onContinue();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onContinue]);

  const totalAmount = (job?.acceptedBidAmount || 0) * 1.05;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2f2f2f] via-[#1a1a1a] to-[#2f2f2f] flex flex-col items-center justify-center p-6">
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
          <h1 className="text-3xl font-bold text-white mb-3">Payment Successful!</h1>
          <p className="text-gray-400 text-lg">Your delivery is now confirmed</p>
        </motion.div>

        {/* Payment Details */}
        <motion.div 
          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
            <span className="text-gray-400">Amount Paid:</span>
            <span className="text-2xl font-bold text-green-400">{formatAmount(totalAmount)}</span>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Item:</span>
              <span className="text-white">{job?.title || 'N/A'}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Pal:</span>
              <span className="text-white">{job?.selectedPalName || 'N/A'}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Transaction ID:</span>
              <span className="text-white text-sm">#{Date.now().toString().slice(-8)}</span>
            </div>
          </div>
        </motion.div>

        {/* What's Next */}
        <motion.div 
          className="bg-blue-500/20 border border-blue-500/30 rounded-2xl p-5 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h4 className="font-medium text-blue-300 mb-3 flex items-center">
            <Package size={20} className="mr-2" />
            What&apos;s Next?
          </h4>
          <ul className="text-sm text-blue-200 space-y-2">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Pal will pick up your item soon</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Track delivery progress in real-time</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Funds released after delivery confirmation</span>
            </li>
          </ul>
        </motion.div>

        {/* Continue Button */}
        <motion.button
          onClick={onContinue}
          className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white py-4 rounded-xl font-semibold flex items-center justify-center space-x-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <span>Track Your Delivery</span>
          <ArrowRight size={20} />
        </motion.button>

        <motion.p
          className="text-center text-sm text-gray-500 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          Redirecting automatically in 5 seconds...
        </motion.p>
      </div>
    </div>
  );
}
