'use client'
import React, { useEffect } from 'react';
import { CheckCircle, XCircle, ArrowRight, Home } from 'lucide-react';
import { motion } from 'framer-motion';

interface PaymentStatusScreenProps {
  onContinue: () => void;
  success: boolean;
  message: string;
  hasPendingBid?: boolean;
  onGoToDashboard?: () => void;
  pendingBidJobTitle?: string;
}

export function PaymentStatusScreen({ 
  onContinue, 
  success, 
  message,
  hasPendingBid = false,
  onGoToDashboard,
  pendingBidJobTitle
}: PaymentStatusScreenProps) {
  useEffect(() => {
    if (success && !hasPendingBid) {
      const timer = setTimeout(() => {
        onContinue();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, hasPendingBid, onContinue]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2f2f2f] via-[#1a1a1a] to-[#2f2f2f] flex flex-col items-center justify-center p-6">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-40 -right-40 w-80 h-80 ${success ? 'bg-green-500' : 'bg-red-500'} rounded-full opacity-10 blur-3xl`}></div>
        <div className={`absolute bottom-0 -left-40 w-80 h-80 ${success ? 'bg-blue-500' : 'bg-orange-500'} rounded-full opacity-10 blur-3xl`}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-md w-full">
        <motion.div
          className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${
            success ? 'bg-gradient-to-br from-green-500 to-blue-500' : 'bg-gradient-to-br from-red-500 to-orange-500'
          }`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          {success ? (
            <CheckCircle size={48} className="text-white" />
          ) : (
            <XCircle size={48} className="text-white" />
          )}
        </motion.div>
        
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className={`text-2xl font-bold mb-2 ${success ? 'text-green-400' : 'text-red-400'}`}>
            {success ? 'Wallet Funded!' : 'Payment Failed'}
          </h2>
          <p className="text-gray-400">
            {message}
          </p>
        </motion.div>

        {success && hasPendingBid && pendingBidJobTitle && (
          <motion.div 
            className="bg-green-500/20 border border-green-500/30 rounded-2xl p-4 mb-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-green-300 mb-1">
              💰 Ready to complete your bid!
            </p>
            <p className="text-green-200 text-sm">
              For: <span className="font-medium">{pendingBidJobTitle}</span>
            </p>
          </motion.div>
        )}
        
        <div className="space-y-3">
          {success && hasPendingBid ? (
            <>
              <motion.button
                onClick={onContinue}
                className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white py-4 rounded-xl font-semibold flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <span>Continue to Place Bid</span>
                <ArrowRight size={20} />
              </motion.button>
              
              <motion.button
                onClick={onGoToDashboard || onContinue}
                className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white py-4 rounded-xl font-semibold flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
              >
                <Home size={18} />
                <span>Go to Dashboard</span>
              </motion.button>
            </>
          ) : (
            <motion.button
              onClick={success ? (onGoToDashboard || onContinue) : onContinue}
              className={`w-full ${
                success 
                  ? 'bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600' 
                  : 'bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600'
              } text-white py-4 rounded-xl font-semibold`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {success ? 'Continue' : 'Try Again'}
            </motion.button>
          )}
        </div>

        {success && !hasPendingBid && (
          <motion.p
            className="text-center text-sm text-gray-500 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Auto-redirecting in 3 seconds...
          </motion.p>
        )}
      </div>
    </div>
  );
}
