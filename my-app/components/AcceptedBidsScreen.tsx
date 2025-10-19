'use client'
import React, { useState } from 'react';
import { ArrowLeft, Package, MapPin, Clock, Phone, MessageCircle, Navigation, CheckCircle, ChevronDown, ChevronUp, Calendar, User as UserIcon, Hash, Building } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from './ui/badge';
import { DeliveryJob, User } from '../types';

type DeliveryFilter = 'all' | 'assigned' | 'in-transit' | 'delivered';

interface AcceptedBidsScreenProps {
  onBack: () => void;
  acceptedJobs: DeliveryJob[];
  onViewDetails: (job: DeliveryJob) => void;
  onOpenChat: (job: DeliveryJob) => void;
  onCall: (phoneNumber: string) => void;
  user: User | null;
}

export function AcceptedBidsScreen({ 
  onBack, 
  acceptedJobs, 
  onViewDetails,
  onOpenChat,
  onCall,
  user
}: AcceptedBidsScreenProps) {
  const [activeFilter, setActiveFilter] = useState<DeliveryFilter>('all');
  const [expandedDeliveryId, setExpandedDeliveryId] = useState<string | null>(null);
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'assigned':
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Awaiting Pickup</Badge>;
      case 'picked-up':
      case 'in-transit':
        return <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">In Transit</Badge>;
      case 'delivered':
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Delivered</Badge>;
      default:
        return <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30">Pending</Badge>;
    }
  };

  const filteredJobs = activeFilter === 'all' 
    ? acceptedJobs 
    : acceptedJobs.filter(job => {
        if (activeFilter === 'in-transit') {
          return job.status === 'in-transit' || job.status === 'picked-up';
        }
        return job.status === activeFilter;
      });

  const stats = {
    total: acceptedJobs.length,
    inTransit: acceptedJobs.filter(j => j.status === 'in-transit' || j.status === 'picked-up').length,
    awaitingPickup: acceptedJobs.filter(j => j.status === 'assigned').length,
    delivered: acceptedJobs.filter(j => j.status === 'delivered').length,
    totalEarnings: acceptedJobs.reduce((sum, j) => sum + (j.acceptedBidAmount || 0), 0)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2f2f2f] via-[#1a1a1a] to-[#2f2f2f] flex flex-col">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-500 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-0 -left-40 w-80 h-80 bg-blue-500 rounded-full opacity-10 blur-3xl"></div>
      </div>

      {/* Header */}
      <motion.div 
        className="bg-[#2f2f2f] border-b border-white/10 p-6 sticky top-0 z-20 shadow-lg"
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
              <ArrowLeft size={20} className="text-white" />
            </motion.button>
            <div>
              <h1 className="text-lg font-semibold text-white">Active Deliveries</h1>
              <p className="text-sm text-gray-400">{stats.total} active jobs</p>
            </div>
          </div>
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
            {formatAmount(stats.totalEarnings)}
          </Badge>
        </div>
      </motion.div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 relative z-10">
        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-3">
          <motion.div 
            className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Package size={24} className="text-blue-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{stats.total}</p>
            <p className="text-xs text-gray-400">Total</p>
          </motion.div>

          <motion.div 
            className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
          >
            <Clock size={24} className="text-yellow-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{stats.awaitingPickup}</p>
            <p className="text-xs text-gray-400">Awaiting</p>
          </motion.div>

          <motion.div 
            className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Navigation size={24} className="text-purple-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{stats.inTransit}</p>
            <p className="text-xs text-gray-400">Transit</p>
          </motion.div>

          <motion.div 
            className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <CheckCircle size={24} className="text-green-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{stats.delivered}</p>
            <p className="text-xs text-gray-400">Delivered</p>
          </motion.div>
        </div>

        {/* Filters */}
        <motion.div 
          className="flex overflow-x-auto gap-2 pb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {[
            { key: 'all', label: 'All' },
            { key: 'assigned', label: 'Awaiting Pickup' },
            { key: 'in-transit', label: 'In Transit' },
            { key: 'delivered', label: 'Delivered' }
          ].map((filter) => (
            <motion.button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key as DeliveryFilter)}
              className={`px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-all ${
                activeFilter === filter.key
                  ? 'bg-[#f44708] text-white'
                  : 'bg-white/10 text-gray-400 hover:bg-white/20'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {filter.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Jobs List */}
        <div className="space-y-4">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job, index) => (
              <motion.div
                key={job.id}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-white font-semibold">{job.title}</h3>
                      {getStatusBadge(job.status)}
                    </div>
                    <p className="text-sm text-gray-400">Sender: {job.senderName}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-green-400 font-bold text-lg">{formatAmount(job.acceptedBidAmount || 0)}</p>
                  </div>
                </div>

                {/* Locations */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-start space-x-2 text-sm">
                    <MapPin size={14} className="text-blue-400 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <span className="text-gray-400">Pickup:</span>
                      <p className="text-white">{job.pickupLocation}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2 text-sm">
                    <MapPin size={14} className="text-green-400 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <span className="text-gray-400">Dropoff:</span>
                      <p className="text-white">{job.dropoffLocation}</p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                {job.status === 'delivered' ? (
                  <div>
                    {/* Collapsible Details Toggle */}
                    <motion.button
                      onClick={() => setExpandedDeliveryId(expandedDeliveryId === job.id ? null : job.id)}
                      className="w-full flex items-center justify-between bg-white/5 hover:bg-white/10 border border-white/20 text-white py-3 px-4 rounded-xl transition-all"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <div className="flex items-center space-x-2">
                        <Package size={16} className="text-green-400" />
                        <span className="text-sm font-medium">Delivery Summary</span>
                      </div>
                      {expandedDeliveryId === job.id ? (
                        <ChevronUp size={16} className="text-gray-400" />
                      ) : (
                        <ChevronDown size={16} className="text-gray-400" />
                      )}
                    </motion.button>

                    {/* Expanded Details */}
                    <AnimatePresence>
                      {expandedDeliveryId === job.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-3 p-4 bg-white/5 border border-white/10 rounded-xl space-y-3">
                            {/* Delivery ID */}
                            <div className="flex items-start space-x-3">
                              <Hash size={16} className="text-cyan-400 mt-0.5 flex-shrink-0" />
                              <div className="flex-1">
                                <p className="text-xs text-gray-400">Delivery ID</p>
                                <p className="text-sm text-white font-mono">#{job.id.substring(0, 8).toUpperCase()}</p>
                              </div>
                            </div>

                            {/* Delivery Date */}
                            <div className="flex items-start space-x-3">
                              <Calendar size={16} className="text-blue-400 mt-0.5 flex-shrink-0" />
                              <div className="flex-1">
                                <p className="text-xs text-gray-400">Delivery Date</p>
                                <p className="text-sm text-white">{job.deliveredAt ? new Date(job.deliveredAt).toLocaleDateString('en-GB') : job.pickupDate || new Date().toLocaleDateString('en-GB')}</p>
                              </div>
                            </div>

                            {/* Sender Details */}
                            <div className="flex items-start space-x-3">
                              <UserIcon size={16} className="text-purple-400 mt-0.5 flex-shrink-0" />
                              <div className="flex-1">
                                <p className="text-xs text-gray-400">Sender</p>
                                <p className="text-sm text-white">{job.senderName}</p>
                                <p className="text-xs text-gray-400">{job.senderPhone || 'N/A'}</p>
                              </div>
                            </div>

                            {/* Receiver Details */}
                            <div className="flex items-start space-x-3">
                              <UserIcon size={16} className="text-pink-400 mt-0.5 flex-shrink-0" />
                              <div className="flex-1">
                                <p className="text-xs text-gray-400">Receiver</p>
                                <p className="text-sm text-white">{job.receiverName || 'N/A'}</p>
                                <p className="text-xs text-gray-400">{job.receiverPhone || 'N/A'}</p>
                              </div>
                            </div>

                            {/* Proxy Details (if applicable) */}
                            {job.proxyId && (
                              <div className="flex items-start space-x-3">
                                <Building size={16} className="text-indigo-400 mt-0.5 flex-shrink-0" />
                                <div className="flex-1">
                                  <p className="text-xs text-gray-400">Proxy Storage</p>
                                  <p className="text-sm text-white">{String(job.metadata?.proxyName || 'Proxy Used')}</p>
                                  <p className="text-xs text-gray-400">Item was stored at proxy location</p>
                                </div>
                              </div>
                            )}

                            {/* Item Details */}
                            <div className="flex items-start space-x-3">
                              <Package size={16} className="text-orange-400 mt-0.5 flex-shrink-0" />
                              <div className="flex-1">
                                <p className="text-xs text-gray-400">Item Details</p>
                                <p className="text-sm text-white">{job.title}</p>
                                {job.description && (
                                  <p className="text-xs text-gray-400 mt-1">{job.description}</p>
                                )}
                              </div>
                            </div>

                            {/* Earnings */}
                            <div className="pt-3 border-t border-white/10">
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-400">Earnings</span>
                                <span className="text-lg font-bold text-green-400">{formatAmount(job.acceptedBidAmount || 0)}</span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    <motion.button
                      onClick={() => onOpenChat(job)}
                      className="flex items-center justify-center space-x-1 bg-blue-500 hover:bg-blue-600 text-white py-2.5 rounded-xl"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <MessageCircle size={16} />
                      <span className="text-sm font-medium">Chat</span>
                    </motion.button>

                    <motion.button
                      onClick={() => onCall(job.senderPhone || '+234 800 000 0000')}
                      className="flex items-center justify-center space-x-1 bg-green-500 hover:bg-green-600 text-white py-2.5 rounded-xl"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Phone size={16} />
                      <span className="text-sm font-medium">Call</span>
                    </motion.button>
                  </div>
                )}
              </motion.div>
            ))
          ) : (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Package size={48} className="text-gray-500 mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">
                {activeFilter === 'all' ? 'No Active Deliveries' : `No ${activeFilter === 'assigned' ? 'Awaiting Pickup' : activeFilter === 'in-transit' ? 'In Transit' : 'Delivered'} Jobs`}
              </h3>
              <p className="text-gray-400">
                {activeFilter === 'all' ? 'Your accepted bids will appear here' : `No jobs in this category`}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
