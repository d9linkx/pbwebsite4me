'use client'
import React, { useState } from 'react';
import { ArrowLeft, Save, Clock, Package, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Bid, DeliveryJob } from '../types';

interface BidEditScreenProps {
  bid: Bid | null;
  job: DeliveryJob | null;
  onBack: () => void;
  onUpdateBid: (bid: Bid) => void;
}

export function BidEditScreen({ bid, job, onBack, onUpdateBid }: BidEditScreenProps) {
  const [bidData, setBidData] = useState({
    amount: bid?.amount?.toString() || '',
    estimatedTime: bid?.estimatedTime || '',
    message: bid?.message || ''
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleUpdate = () => {
    if (!bid) return;
    
    const updatedBid: Bid = {
      ...bid,
      amount: parseInt(bidData.amount) || 0,
      estimatedTime: bidData.estimatedTime,
      message: bidData.message,
      canEdit: false
    };
    
    onUpdateBid(updatedBid);
  };

  const canUpdate = bidData.amount && parseInt(bidData.amount) > 0 && bidData.estimatedTime;

  if (!bid || !job) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark via-darker to-dark flex flex-col">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-500 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-0 -left-40 w-80 h-80 bg-blue-500 rounded-full opacity-10 blur-3xl"></div>
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
          <div className="flex-1">
            <h1 className="text-lg font-semibold text-white">Edit Bid</h1>
            <p className="text-sm text-gray-400 flex items-center">
              <Clock size={14} className="mr-1" />
              You can edit this bid for 10 minutes
            </p>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 relative z-10">
        {/* Job Info */}
        <motion.div 
          className="bg-gradient-to-r from-orange-500/20 to-blue-500/20 border border-orange-500/30 rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-start space-x-3">
            <Package size={24} className="text-orange-300 flex-shrink-0" />
            <div>
              <h3 className="text-white font-semibold mb-2">{job.title}</h3>
              <p className="text-orange-200 text-sm">
                {job.pickupLocation} → {job.dropoffLocation}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Current Bid */}
        <motion.div 
          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-white font-semibold mb-4">Current Bid Details</h3>
          <div className="space-y-3">
            <div>
              <p className="text-gray-400 text-sm">Original Amount</p>
              <p className="text-white text-lg font-semibold">{formatCurrency(bid.amount || 0)}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Original Time</p>
              <p className="text-white">{bid.estimatedTime}</p>
            </div>
          </div>
        </motion.div>

        {/* Edit Form */}
        <motion.div 
          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-white font-semibold">Update Bid</h3>

          <div>
            <label className="text-sm text-gray-400 mb-2 block flex items-center">
              <DollarSign size={16} className="mr-1" />
              Bid Amount (₦) *
            </label>
            <Input
              type="number"
              value={bidData.amount}
              onChange={(e) => setBidData({ ...bidData, amount: e.target.value })}
              placeholder="Enter amount"
              className="bg-white/10 border-white/20 text-white text-lg placeholder-gray-500 focus:border-orange-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-2 block flex items-center">
              <Clock size={16} className="mr-1" />
              Estimated Time *
            </label>
            <Input
              value={bidData.estimatedTime}
              onChange={(e) => setBidData({ ...bidData, estimatedTime: e.target.value })}
              placeholder="e.g., 30 mins"
              className="bg-white/10 border-white/20 text-white placeholder-gray-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-2 block">Message (Optional)</label>
            <Textarea
              value={bidData.message}
              onChange={(e) => setBidData({ ...bidData, message: e.target.value })}
              placeholder="Add a message to your bid..."
              rows={3}
              className="bg-white/10 border-white/20 text-white placeholder-gray-500 focus:border-purple-500"
            />
          </div>
        </motion.div>

        {/* Warning */}
        <motion.div 
          className="bg-yellow-500/20 border border-yellow-500/30 rounded-2xl p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h4 className="font-medium text-yellow-300 mb-2">⚠️ Important:</h4>
          <p className="text-sm text-yellow-200">
            Once you update your bid, it cannot be edited again. The sender will be notified of the changes.
          </p>
        </motion.div>

        {/* Update Button */}
        <motion.button
          onClick={handleUpdate}
          disabled={!canUpdate}
          className="w-full bg-gradient-to-r from-orange-500 to-blue-500 hover:from-primary-dark hover:to-blue-600 text-white py-4 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          whileHover={canUpdate ? { scale: 1.02 } : {}}
          whileTap={canUpdate ? { scale: 0.98 } : {}}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Save size={20} />
          <span>Update Bid</span>
        </motion.button>
      </div>
    </div>
  );
}
