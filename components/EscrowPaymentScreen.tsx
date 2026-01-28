'use client'
import React, { useState } from 'react';
import { ArrowLeft, Shield, Lock, CheckCircle, DollarSign, Package } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from './ui/badge';
import { DeliveryJob, User, Bid } from '../types';

interface EscrowPaymentScreenProps {
  job: DeliveryJob | null;
  onBack: () => void;
  onPaymentComplete: (updatedJob: DeliveryJob, updatedUser: User) => void;
  bid?: Bid;
  user?: User;
}

export function EscrowPaymentScreen({ job, onBack, onPaymentComplete, bid, user }: EscrowPaymentScreenProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleConfirm = () => {
    setIsProcessing(true);
    setTimeout(() => {
      if (job && user) {
        // Update job with payment info
        const updatedJob = {
          ...job,
          status: 'assigned' as const,
          escrowAmount: totalAmount,
          acceptedBidAmount: deliveryFee,
          paymentStatus: 'escrowed' as const
        };
        
        // Update user wallet (deduct payment)
        const updatedUser = {
          ...user,
          walletBalance: (user.walletBalance || 0) - totalAmount
        };
        
        onPaymentComplete(updatedJob, updatedUser);
      }
    }, 2000);
  };

  const deliveryFee = job?.acceptedBidAmount || 0;
  const serviceFee = Math.round(deliveryFee * 0.05);
  const totalAmount = deliveryFee + serviceFee;

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark via-darker to-dark flex flex-col">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-0 -left-40 w-80 h-80 bg-purple-500 rounded-full opacity-10 blur-3xl"></div>
      </div>

      {/* Header */}
      <motion.div 
        className="bg-dark border-b border-white/10 p-6 sticky top-0 z-20 shadow-lg"
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
            <h1 className="text-lg font-semibold text-white">Escrow Payment</h1>
            <p className="text-sm text-gray-400">Secure payment processing</p>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 relative z-10">
        {/* Escrow Explanation */}
        <motion.div 
          className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
              <Shield size={32} className="text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold">Protected by Escrow</h3>
              <p className="text-sm text-blue-200">Your money is safe until delivery</p>
            </div>
          </div>
          <p className="text-sm text-blue-200">
            Funds are held securely and released to the Pal only after you confirm successful delivery.
          </p>
        </motion.div>

        {/* Delivery Details */}
        <motion.div 
          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-white font-semibold mb-4">Delivery Details</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Package size={20} className="text-blue-400" />
              <div className="flex-1">
                <p className="text-sm text-gray-400">Item</p>
                <p className="text-white">{job?.title || 'N/A'}</p>
              </div>
            </div>
            <div className="h-px bg-white/10"></div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Pal:</span>
              <span className="text-white">{job?.selectedPalName || 'N/A'}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Distance:</span>
              <span className="text-white">{job?.distance || 'N/A'}</span>
            </div>
          </div>
        </motion.div>

        {/* Payment Breakdown */}
        <motion.div 
          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-white font-semibold mb-4">Payment Breakdown</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Delivery Fee:</span>
              <span className="text-white">{formatAmount(deliveryFee)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Service Fee (5%):</span>
              <span className="text-white">{formatAmount(serviceFee)}</span>
            </div>
            <div className="h-px bg-white/10"></div>
            <div className="flex items-center justify-between">
              <span className="text-white font-semibold">Total Amount:</span>
              <span className="text-2xl font-bold text-green-400">{formatAmount(totalAmount)}</span>
            </div>
          </div>
        </motion.div>

        {/* Security Features */}
        <motion.div 
          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-white font-semibold mb-4">Security Features</h3>
          <div className="space-y-3">
            {[
              { icon: Lock, text: 'Funds held in secure escrow' },
              { icon: Shield, text: 'Released only on confirmation' },
              { icon: CheckCircle, text: 'Full refund if delivery fails' }
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center flex-shrink-0">
                    <Icon size={20} className="text-green-400" />
                  </div>
                  <p className="text-gray-300">{feature.text}</p>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Confirm Button */}
        <motion.button
          onClick={handleConfirm}
          disabled={isProcessing}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-4 rounded-xl font-semibold disabled:opacity-50 flex items-center justify-center space-x-2"
          whileHover={!isProcessing ? { scale: 1.02 } : {}}
          whileTap={!isProcessing ? { scale: 0.98 } : {}}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {isProcessing ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Processing Payment...</span>
            </>
          ) : (
            <>
              <DollarSign size={20} />
              <span>Confirm & Pay {formatAmount(totalAmount)}</span>
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
}
