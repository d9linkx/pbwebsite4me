'use client'
import React, { useState, useMemo } from 'react';
import { ArrowLeft, Package, MapPin, Clock, Phone, MessageCircle, Navigation, CheckCircle, ChevronDown, ChevronUp, Calendar, User as UserIcon, Hash, Building } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from './ui/badge';
import { DeliveryJob, User } from '../types';
import { PackageFilters } from '../utils/packageFilters';
import { calculatePalStats } from '../utils/packageStats';

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
  onViewDetails, // Reserved for future use
  onOpenChat,
  onCall,
  user // Reserved for future use
}: AcceptedBidsScreenProps) {
  const [activeFilter, setActiveFilter] = useState<DeliveryFilter>('all');
  const [expandedDeliveryId, setExpandedDeliveryId] = useState<string | null>(null);

  // Suppress unused variable warnings for reserved props
  void onViewDetails;
  void user;
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
        return <Badge className="bg-blue-50 text-blue-700 border-blue-200">Awaiting Pickup</Badge>;
      case 'picked-up':
      case 'in-transit':
        return <Badge className="bg-purple-50 text-purple-700 border-purple-200">In Transit</Badge>;
      case 'delivered':
        return <Badge className="bg-green-50 text-green-700 border-green-200">Delivered</Badge>;
      default:
        return <Badge className="bg-gray-50 text-gray-700 border-gray-200">Pending</Badge>;
    }
  };

  const filteredJobs = useMemo(() => {
    if (activeFilter === 'all') return acceptedJobs;

    if (activeFilter === 'in-transit') {
      return acceptedJobs.filter(PackageFilters.pal.inTransit);
    } else if (activeFilter === 'assigned') {
      return acceptedJobs.filter(PackageFilters.pal.awaiting);
    } else if (activeFilter === 'delivered') {
      return acceptedJobs.filter(PackageFilters.pal.delivered);
    }

    return acceptedJobs;
  }, [acceptedJobs, activeFilter]);

  const stats = useMemo(() => {
    return calculatePalStats(acceptedJobs);
  }, [acceptedJobs]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <motion.div
        className="bg-white border-b border-gray-200 p-6 sticky top-0 z-20 shadow-sm"
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
              <h1 className="text-lg font-semibold text-gray-900">Active Deliveries</h1>
              <p className="text-sm text-gray-600">{stats.total} active jobs</p>
            </div>
          </div>
          <Badge className="bg-green-50 text-green-700 border-green-200">
            {formatAmount(stats.totalEarnings)}
          </Badge>
        </div>
      </motion.div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 relative z-10">
        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-3">
          <motion.div
            className="bg-gray-50 border border-gray-200 rounded-2xl p-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Package size={24} className="text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            <p className="text-xs text-gray-600">Total</p>
          </motion.div>

          <motion.div
            className="bg-gray-50 border border-gray-200 rounded-2xl p-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
          >
            <Clock size={24} className="text-yellow-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">{stats.awaitingPickup}</p>
            <p className="text-xs text-gray-600">Awaiting</p>
          </motion.div>

          <motion.div
            className="bg-gray-50 border border-gray-200 rounded-2xl p-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Navigation size={24} className="text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">{stats.inTransit}</p>
            <p className="text-xs text-gray-600">Transit</p>
          </motion.div>

          <motion.div
            className="bg-gray-50 border border-gray-200 rounded-2xl p-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <CheckCircle size={24} className="text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">{stats.delivered}</p>
            <p className="text-xs text-gray-600">Delivered</p>
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
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
                className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-gray-900 font-semibold">{job.title}</h3>
                      {getStatusBadge(job.status)}
                    </div>
                    <p className="text-sm text-gray-600">Sender: {job.senderName}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-green-600 font-bold text-lg">{formatAmount(job.acceptedBidAmount || 0)}</p>
                  </div>
                </div>

                {/* Locations */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-start space-x-2 text-sm">
                    <MapPin size={14} className="text-primary mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <span className="text-gray-600">Pickup:</span>
                      <p className="text-gray-900">{job.pickupLocation}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2 text-sm">
                    <MapPin size={14} className="text-green-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <span className="text-gray-600">Dropoff:</span>
                      <p className="text-gray-900">{job.dropoffLocation}</p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                {job.status === 'delivered' ? (
                  <div>
                    {/* Collapsible Details Toggle */}
                    <motion.button
                      onClick={() => setExpandedDeliveryId(expandedDeliveryId === job.id ? null : job.id)}
                      className="w-full flex items-center justify-between bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-900 py-3 px-4 rounded-xl transition-all"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <div className="flex items-center space-x-2">
                        <Package size={16} className="text-green-600" />
                        <span className="text-sm font-medium">Delivery Summary</span>
                      </div>
                      {expandedDeliveryId === job.id ? (
                        <ChevronUp size={16} className="text-gray-600" />
                      ) : (
                        <ChevronDown size={16} className="text-gray-600" />
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
                          <div className="mt-3 p-4 bg-gray-50 border border-gray-200 rounded-xl space-y-3">
                            {/* Delivery ID */}
                            <div className="flex items-start space-x-3">
                              <Hash size={16} className="text-cyan-600 mt-0.5 flex-shrink-0" />
                              <div className="flex-1">
                                <p className="text-xs text-gray-600">Delivery ID</p>
                                <p className="text-sm text-gray-900 font-mono">#{job.id.substring(0, 8).toUpperCase()}</p>
                              </div>
                            </div>

                            {/* Delivery Date */}
                            <div className="flex items-start space-x-3">
                              <Calendar size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
                              <div className="flex-1">
                                <p className="text-xs text-gray-600">Delivery Date</p>
                                <p className="text-sm text-gray-900">{job.deliveredAt ? new Date(job.deliveredAt).toLocaleDateString('en-GB') : job.pickupDate || new Date().toLocaleDateString('en-GB')}</p>
                              </div>
                            </div>

                            {/* Sender Details */}
                            <div className="flex items-start space-x-3">
                              <UserIcon size={16} className="text-purple-600 mt-0.5 flex-shrink-0" />
                              <div className="flex-1">
                                <p className="text-xs text-gray-600">Sender</p>
                                <p className="text-sm text-gray-900">{job.senderName}</p>
                                <p className="text-xs text-gray-600">{job.senderPhone || 'N/A'}</p>
                              </div>
                            </div>

                            {/* Receiver Details */}
                            <div className="flex items-start space-x-3">
                              <UserIcon size={16} className="text-pink-600 mt-0.5 flex-shrink-0" />
                              <div className="flex-1">
                                <p className="text-xs text-gray-600">Receiver</p>
                                <p className="text-sm text-gray-900">{job.receiverName || 'N/A'}</p>
                                <p className="text-xs text-gray-600">{job.receiverPhone || 'N/A'}</p>
                              </div>
                            </div>

                            {/* Proxy Details (if applicable) */}
                            {job.proxyId && (
                              <div className="flex items-start space-x-3">
                                <Building size={16} className="text-indigo-600 mt-0.5 flex-shrink-0" />
                                <div className="flex-1">
                                  <p className="text-xs text-gray-600">Proxy Storage</p>
                                  <p className="text-sm text-gray-900">{String(job.metadata?.proxyName || 'Proxy Used')}</p>
                                  <p className="text-xs text-gray-600">Item was stored at proxy location</p>
                                </div>
                              </div>
                            )}

                            {/* Item Details */}
                            <div className="flex items-start space-x-3">
                              <Package size={16} className="text-primary mt-0.5 flex-shrink-0" />
                              <div className="flex-1">
                                <p className="text-xs text-gray-600">Item Details</p>
                                <p className="text-sm text-gray-900">{job.title}</p>
                                {job.description && (
                                  <p className="text-xs text-gray-600 mt-1">{job.description}</p>
                                )}
                              </div>
                            </div>

                            {/* Earnings */}
                            <div className="pt-3 border-t border-gray-200">
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-600">Earnings</span>
                                <span className="text-lg font-bold text-green-600">{formatAmount(job.acceptedBidAmount || 0)}</span>
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
                      className="flex items-center justify-center space-x-1 bg-primary hover:bg-[#d63a00] text-white py-2.5 rounded-xl"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <MessageCircle size={16} />
                      <span className="text-sm font-medium">Chat</span>
                    </motion.button>

                    <motion.button
                      onClick={() => onCall(job.senderPhone || '+234 800 000 0000')}
                      className="flex items-center justify-center space-x-1 bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-xl"
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
              <Package size={48} className="text-gray-400 mx-auto mb-4" />
              <h3 className="text-gray-900 font-semibold mb-2">
                {activeFilter === 'all' ? 'No Active Deliveries' : `No ${activeFilter === 'assigned' ? 'Awaiting Pickup' : activeFilter === 'in-transit' ? 'In Transit' : 'Delivered'} Jobs`}
              </h3>
              <p className="text-gray-600">
                {activeFilter === 'all' ? 'Your accepted bids will appear here' : `No jobs in this category`}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
