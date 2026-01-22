'use client'
import React, { useEffect } from 'react';
import { CheckCircle, Star, TrendingUp, Calendar, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface SponsorshipSuccessScreenProps {
  beneficiaryName: string;
  amount: number;
  commission: number;
  duration: number;
  onContinue: () => void;
}

export function SponsorshipSuccessScreen({ 
  beneficiaryName, 
  amount, 
  commission, 
  duration, 
  onContinue 
}: SponsorshipSuccessScreenProps) {
  const formatAmount = (value: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const projectedEarnings = Math.round(amount * 0.8 * (commission / 100));

  useEffect(() => {
    const timer = setTimeout(() => {
      onContinue();
    }, 6000);

    return () => clearTimeout(timer);
  }, [onContinue]);

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
            <Star size={64} className="text-white fill-white" />
          </motion.div>
        </motion.div>

        {/* Success Message */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-3xl font-bold text-white mb-3">Sponsorship Active!</h1>
          <p className="text-gray-400 text-lg">You&apos;re now sponsoring {beneficiaryName}</p>
        </motion.div>

        {/* Sponsorship Details */}
        <motion.div 
          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <span className="text-gray-400">Sponsored Amount:</span>
              <span className="text-2xl font-bold text-white">{formatAmount(amount)}</span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Commission Rate:</span>
                <span className="text-purple-400 font-semibold">{commission}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Duration:</span>
                <span className="text-white">{duration} days</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">End Date:</span>
                <span className="text-white">
                  {new Date(Date.now() + duration * 24 * 60 * 60 * 1000).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Projected Earnings */}
        <motion.div 
          className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-2xl p-6 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="flex items-center space-x-3 mb-3">
            <TrendingUp size={24} className="text-purple-400" />
            <h4 className="font-medium text-purple-300">Projected Earnings</h4>
          </div>
          <p className="text-4xl font-bold text-white mb-2">{formatAmount(projectedEarnings)}</p>
          <p className="text-sm text-purple-200">
            Based on estimated {commission}% commission over {duration} days
          </p>
        </motion.div>

        {/* What's Next */}
        <motion.div 
          className="bg-blue-500/20 border border-blue-500/30 rounded-2xl p-5 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <h4 className="font-medium text-blue-300 mb-3 flex items-center">
            <Calendar size={20} className="mr-2" />
            What&apos;s Next?
          </h4>
          <ul className="text-sm text-blue-200 space-y-2">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Funds are now in secure escrow</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>{beneficiaryName} can start using the funds</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>You earn commission on every transaction</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Track earnings in Sponsorship Management</span>
            </li>
          </ul>
        </motion.div>

        {/* Continue Button */}
        <motion.button
          onClick={onContinue}
          className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white py-4 rounded-xl font-semibold flex items-center justify-center space-x-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
        >
          <span>View Sponsorships</span>
          <ArrowRight size={20} />
        </motion.button>

        <motion.p
          className="text-center text-sm text-gray-500 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
        >
          Redirecting automatically in 6 seconds...
        </motion.p>
      </div>
    </div>
  );
}
