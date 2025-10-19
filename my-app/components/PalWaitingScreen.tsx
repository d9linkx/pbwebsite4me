'use client'
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, AlertTriangle, CheckCircle, DollarSign, Package } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from './ui/badge';
import { DeliveryJob, User } from '../types';

interface PalWaitingScreenProps {
  job: DeliveryJob | null;
  user: User | null;
  onBack: () => void;
  onTimeoutComplete: (compensationAmount: number) => void;
  onDisputeResolved: () => void;
}

export function PalWaitingScreen({
  job,
  user,
  onBack,
  onTimeoutComplete,
  onDisputeResolved
}: PalWaitingScreenProps) {
  const [timeRemaining, setTimeRemaining] = useState(600);
  const [isExpired, setIsExpired] = useState(false);
  const [showCompensation, setShowCompensation] = useState(false);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const calculateCompensation = (): number => {
    if (!job?.acceptedBidAmount) return 0;
    return Math.floor(job.acceptedBidAmount * 0.4);
  };

  const formatAmount = (amount: number): string => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  useEffect(() => {
    if (timeRemaining <= 0) {
      setIsExpired(true);
      setShowCompensation(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          setIsExpired(true);
          setShowCompensation(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining]);

  const handleClaimCompensation = () => {
    const compensation = calculateCompensation();
    onTimeoutComplete(compensation);
  };

  const progress = ((600 - timeRemaining) / 600) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2f2f2f] via-[#1a1a1a] to-[#2f2f2f] flex flex-col">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-500 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-0 -left-40 w-80 h-80 bg-blue-500 rounded-full opacity-10 blur-3xl"></div>
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
            <h1 className="text-lg font-semibold text-white">Waiting for Sender</h1>
            <p className="text-sm text-gray-400">Bid accepted, awaiting confirmation</p>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 relative z-10">
        {/* Timer Card */}
        <motion.div 
          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          {!isExpired ? (
            <>
              <Clock size={64} className="text-yellow-400 mx-auto mb-4" />
              <h2 className="text-white text-xl font-semibold mb-2">Sender has 10 minutes</h2>
              <p className="text-gray-400 mb-6">to confirm your bid acceptance</p>
              
              <div className="mb-4">
                <div className="text-6xl font-bold text-white mb-2">
                  {formatTime(timeRemaining)}
                </div>
                <p className="text-sm text-gray-400">minutes remaining</p>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </>
          ) : (
            <>
              <AlertTriangle size={64} className="text-red-400 mx-auto mb-4" />
              <h2 className="text-white text-xl font-semibold mb-2">Time Expired</h2>
              <p className="text-gray-400">Sender did not confirm in time</p>
            </>
          )}
        </motion.div>

        {/* Job Details */}
        <motion.div 
          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-white font-semibold mb-4">Delivery Details</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Item:</span>
              <span className="text-white">{job?.title || 'N/A'}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Your Bid:</span>
              <span className="text-white font-semibold">{formatAmount(job?.acceptedBidAmount || 0)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Sender:</span>
              <span className="text-white">{job?.senderName || 'N/A'}</span>
            </div>
          </div>
        </motion.div>

        {/* What Happens Next */}
        <motion.div 
          className="bg-blue-500/20 border border-blue-500/30 rounded-2xl p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h4 className="font-medium text-blue-300 mb-2">What happens next?</h4>
          <ul className="text-sm text-blue-200 space-y-1 list-disc list-inside">
            <li>Sender reviews your acceptance and confirms</li>
            <li>Payment goes into escrow for security</li>
            <li>You&apos;ll get pickup details once confirmed</li>
            <li>If time expires, you&apos;ll receive 40% compensation</li>
          </ul>
        </motion.div>

        {/* Compensation Section */}
        {showCompensation && (
          <motion.div 
            className="bg-green-500/20 border border-green-500/30 rounded-2xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-white font-semibold">Compensation Available</h3>
                <p className="text-sm text-gray-400">40% of your bid amount</p>
              </div>
              <CheckCircle size={32} className="text-green-400" />
            </div>

            <div className="bg-white/10 rounded-xl p-4 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Amount:</span>
                <span className="text-2xl font-bold text-green-400">
                  {formatAmount(calculateCompensation())}
                </span>
              </div>
            </div>

            <motion.button
              onClick={handleClaimCompensation}
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white py-4 rounded-xl font-semibold flex items-center justify-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <DollarSign size={20} />
              <span>Claim Compensation</span>
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
