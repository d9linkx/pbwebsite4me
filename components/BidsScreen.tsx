'use client'
import React, { useMemo, memo, useCallback } from 'react';
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
  isAcceptingBid?: boolean;
}

const BidsScreenComponent = ({ job, onBack, onBidSelect, onAcceptBid, onViewProfile, onOpenChat, isAcceptingBid = false }: BidsScreenProps) => {
  // Memoize sorted bids for performance
  const sortedBids = useMemo(() => {
    if (!job?.bids) return [];
    return [...job.bids].sort((a, b) => a.amount - b.amount);
  }, [job?.bids]);

  // Memoize utility functions
  const formatCurrency = useCallback((amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }, []);

  const getVehicleIcon = useCallback((vehicleType: string) => {
    switch ((vehicleType || '').toLowerCase()) {
      case 'car':
        return <Car size={16} className="text-primary" />;
      case 'motorcycle':
      case 'bike':
        return <Bike size={16} className="text-primary" />;
      default:
        return <Car size={16} className="text-primary" />;
    }
  }, []);

  // Memoize event handlers
  const handleAcceptBid = useCallback((bid: Bid) => {
    if (!job) return;
    onBidSelect(bid, job);
    onAcceptBid(bid);
  }, [job, onBidSelect, onAcceptBid]);

  const handleViewProfile = useCallback((bid: Bid) => {
    if (!job) return;
    onViewProfile(bid);
  }, [job, onViewProfile]);

  if (!job) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.div 
        className="bg-white border-b border-gray-200 p-6 sticky top-0 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <motion.button 
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft size={20} className="text-gray-700" />
            </motion.button>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Bids Received</h1>
              <p className="text-sm text-gray-500">
                {job.bids.length} {job.bids.length === 1 ? 'Pal' : 'Pals'} interested
              </p>
            </div>
          </div>
          
          <motion.button
            onClick={() => onOpenChat(job)}
            className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-xl font-medium shadow-sm flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <MessageCircle size={16} />
            <span>Chat</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Job Summary */}
      <div className="p-6 pb-4">
        <motion.div 
          className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="font-semibold text-gray-900 mb-2">{job.title}</h3>
          <p className="text-sm text-gray-600 mb-3">
            {job.pickupLocation} → {job.dropoffLocation}
          </p>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span>{job.itemSize} • {job.weight}</span>
            <span>Value: <span className="text-primary font-medium">{formatCurrency(job.value)}</span></span>
          </div>
        </motion.div>
      </div>

      {/* Bids List */}
      <div className="flex-1 px-6 pb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">Available Bids</h3>
          <Badge className="bg-blue-100 text-blue-800 text-xs border-0">
            Sorted by price
          </Badge>
        </div>

        {sortedBids.length > 0 ? (
          <div className="space-y-4">
            {sortedBids.map((bid, index) => (
              <motion.div 
                key={bid.id} 
                className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.02 }}
              >
                {index === 0 && (
                  <div className="absolute -top-2 -right-2">
                    <Badge className="bg-green-100 text-green-800 text-xs border-0 rounded-full px-3 py-1 shadow-sm">
                      ⭐ Best Price
                    </Badge>
                  </div>
                )}
                
                <div className="flex items-start space-x-4">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-gradient-to-br from-primary to-primary-hover text-white">
                      {(bid.palName || 'Unknown').split(' ').map((n: string) => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-semibold text-gray-900">{bid.palName || 'Unknown Pal'}</h4>
                          <div className="flex items-center space-x-1">
                            <Star size={14} className="text-yellow-400 fill-current" />
                            <span className="text-sm text-gray-600">{bid.palRating}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          {getVehicleIcon(bid.vehicleType)}
                          <span>{bid.vehicleType}</span>
                          <span>•</span>
                          <Clock size={14} />
                          <span>{bid.estimatedTime}</span>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">{formatCurrency(bid.amount)}</p>
                        <p className="text-xs text-gray-500">Delivery fee</p>
                      </div>
                    </div>
                    
                    {bid.message && (
                      <div className="mb-3">
                        <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-100">
                          &ldquo;{bid.message}&rdquo;
                        </p>
                      </div>
                    )}
                    
                    <div className="flex space-x-2">
                      <motion.button
                        onClick={() => handleViewProfile(bid)}
                        className="flex-1 bg-white border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 rounded-xl py-2 px-3 transition-all duration-200 flex items-center justify-center space-x-1.5 font-medium shadow-sm text-sm"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Eye size={14} />
                        <span>Profile</span>
                      </motion.button>
                      
                      <motion.button
                        onClick={() => handleAcceptBid(bid)}
                        disabled={isAcceptingBid}
                        className={`flex-1 rounded-xl py-2 px-3 transition-all duration-200 flex items-center justify-center space-x-1.5 font-semibold shadow-md text-sm ${
                          isAcceptingBid 
                            ? 'bg-gray-300 text-gray-600 cursor-not-allowed border-2 border-gray-300' 
                            : 'bg-primary hover:bg-[#e03d06] text-white border-2 border-primary hover:border-[#e03d06] shadow-lg hover:shadow-xl'
                        }`}
                        whileHover={isAcceptingBid ? {} : { scale: 1.02 }}
                        whileTap={isAcceptingBid ? {} : { scale: 0.98 }}
                      >
                        {isAcceptingBid ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-500 mr-2"></div>
                            <span>Accepting...</span>
                          </>
                        ) : (
                          <>
                            <CheckCircle size={16} />
                            <span>Accept Bid</span>
                          </>
                        )}
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div 
            className="flex flex-col items-center justify-center py-12 bg-white border border-gray-200 rounded-xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-6">
              <User size={40} className="text-gray-400" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">No Bids Yet</h3>
            <p className="text-gray-500 text-center px-8 max-w-md">
              Pals haven&apos;t started bidding yet. Check back in a few minutes or share your job to get more visibility.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

// Export the memoized component with improved comparison
export const BidsScreen = memo(BidsScreenComponent, (prevProps, nextProps) => {
  // More comprehensive comparison to prevent unnecessary re-renders
  const prevJob = prevProps.job;
  const nextJob = nextProps.job;
  
  // Basic job checks
  if (prevJob?.id !== nextJob?.id) return false;
  if (prevJob?.bids?.length !== nextJob?.bids?.length) return false;
  
  // Check if bids array actually changed (deep comparison of bid IDs and amounts)
  if (prevJob?.bids && nextJob?.bids) {
    const prevBidsStr = JSON.stringify(prevJob.bids.map(b => ({ id: b.id, amount: b.amount, isAccepted: b.isAccepted })));
    const nextBidsStr = JSON.stringify(nextJob.bids.map(b => ({ id: b.id, amount: b.amount, isAccepted: b.isAccepted })));
    if (prevBidsStr !== nextBidsStr) return false;
  }
  
  // Check other props that might cause re-renders
  if (prevProps.isAcceptingBid !== nextProps.isAcceptingBid) return false;
  
  return true;
});
