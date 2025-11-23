'use client'
import React from 'react';
import { ArrowLeft, User, MessageCircle, Star, Clock, Car, Bike, CheckCircle, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { DeliveryJob, Bid } from '../types';

interface BidsScreenProps {
  job: DeliveryJob | null;
  onBack: () => void;
  onBidSelect: (bid: Bid, job: DeliveryJob) => void;
  onAcceptBid: (bid: Bid) => void | Promise<void>;
  onViewProfile: (bid: Bid) => void;
  onOpenChat: (job: DeliveryJob) => void;
}

export function BidsScreen({ job, onBack, onBidSelect, onAcceptBid, onViewProfile, onOpenChat }: BidsScreenProps) {
  if (!job) return null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getVehicleIcon = (vehicleType: string) => {
    switch ((vehicleType || '').toLowerCase()) {
      case 'car':
        return <Car size={16} className="text-[#f44708]" />;
      case 'motorcycle':
      case 'bike':
        return <Bike size={16} className="text-[#f44708]" />;
      default:
        return <Car size={16} className="text-[#f44708]" />;
    }
  };

  const handleAcceptBid = (bid: Bid) => {
    onBidSelect(bid, job);
    onAcceptBid(bid);
  };

  const handleViewProfile = (bid: Bid) => {
    onBidSelect(bid, job);
    onViewProfile(bid);
  };

  const sortedBids = [...job.bids].sort((a, b) => a.amount - b.amount);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2f2f2f] via-[#1a1a1a] to-[#2f2f2f]">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#f44708] rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#f44708] rounded-full opacity-10 blur-3xl"></div>
      </div>

      {/* Header */}
      <motion.div 
        className="bg-[#2f2f2f] border-b border-white/10 p-6 relative z-10 sticky top-0"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <motion.button 
              onClick={onBack}
              className="p-2 hover:bg-white/10 rounded-xl transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft size={24} className="text-white" />
            </motion.button>
            <div>
              <h1 className="text-xl text-white">Bids Received</h1>
              <p className="text-sm text-gray-400">
                {job.bids.length} Pals interested
              </p>
            </div>
          </div>
          
          <motion.button
            onClick={() => onOpenChat(job)}
            className="bg-white/10 border border-white/20 text-white hover:bg-white/20 rounded-xl px-4 py-2 transition-all duration-300 flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <MessageCircle size={16} />
            <span>Chat</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Job Summary */}
      <div className="p-6 pb-4 relative z-10">
        <motion.div 
          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-white mb-2">{job.title}</h3>
          <p className="text-sm text-gray-300 mb-3">
            {job.pickupLocation} → {job.dropoffLocation}
          </p>
          <div className="flex items-center space-x-4 text-sm text-gray-400">
            <span>{job.itemSize} • {job.weight}</span>
            <span>Value: <span className="text-[#f44708] font-medium">{formatCurrency(job.value)}</span></span>
          </div>
        </motion.div>
      </div>

      {/* Bids List */}
      <div className="flex-1 px-6 pb-6 relative z-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white">Available Bids</h3>
          <Badge className="bg-blue-500/20 text-blue-400 text-xs border-0">
            Sorted by price
          </Badge>
        </div>

        {sortedBids.length > 0 ? (
          <div className="space-y-4">
            {sortedBids.map((bid, index) => (
              <motion.div 
                key={bid.id} 
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.05 }}
                whileHover={{ scale: 1.02 }}
              >
                {index === 0 && (
                  <div className="absolute -top-2 -right-2">
                    <Badge className="bg-green-500 text-white text-xs border-0 rounded-full px-3 py-1 shadow-lg">
                      ⭐ Best Price
                    </Badge>
                  </div>
                )}
                
                <div className="flex items-start space-x-4">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-gradient-to-br from-[#f44708] to-[#ff5722] text-white">
                      {bid.palName.split(' ').map((n: string) => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="text-white font-medium">{bid.palName}</h4>
                          <div className="flex items-center space-x-1">
                            <Star size={14} className="text-yellow-400 fill-current" />
                            <span className="text-sm text-gray-300">{bid.palRating}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-400">
                          {getVehicleIcon(bid.vehicleType)}
                          <span>{bid.vehicleType}</span>
                          <span>•</span>
                          <Clock size={14} />
                          <span>{bid.estimatedTime}</span>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-2xl text-[#f44708] font-bold">{formatCurrency(bid.amount)}</p>
                        <p className="text-xs text-gray-400">Delivery fee</p>
                      </div>
                    </div>
                    
                    {bid.message && (
                      <div className="mb-3">
                        <p className="text-sm text-gray-200 bg-white/5 p-3 rounded-lg border border-white/10">
                          `{bid.message}`
                        </p>
                      </div>
                    )}
                    
                    <div className="flex space-x-3">
                      <motion.button
                        onClick={() => handleViewProfile(bid)}
                        className="flex-1 bg-white/10 border border-white/20 text-white hover:bg-white/20 rounded-xl py-2 px-4 transition-all duration-300 flex items-center justify-center space-x-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Eye size={16} />
                        <span>View Profile</span>
                      </motion.button>
                      
                      <motion.button
                        onClick={() => handleAcceptBid(bid)}
                        className="flex-1 bg-[#f44708] hover:bg-[#ff5722] text-white rounded-xl py-2 px-4 transition-all duration-300 flex items-center justify-center space-x-2 font-semibold shadow-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <CheckCircle size={16} />
                        <span>Accept Bid</span>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div 
            className="flex flex-col items-center justify-center py-12 bg-white/5 rounded-2xl border border-white/10"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center mb-6">
              <User size={40} className="text-gray-400" />
            </div>
            <h3 className="text-white mb-2">No Bids Yet</h3>
            <p className="text-gray-400 text-center px-8 max-w-md">
              Pals haven&apos;t started bidding yet. Check back in a few minutes or share your job to get more visibility.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
