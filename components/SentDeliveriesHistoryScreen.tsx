'use client'
import React, { useState, useMemo } from 'react';
import { ArrowLeft, Package, Clock, CheckCircle, Search, Filter, MapPin, DollarSign, Eye, MessageCircle, Star, Truck } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { DeliveryJob, User, Bid, Screen } from '../types';
import { PackageFilters, filterPackages } from '../utils/packageFilters';
import { calculateSenderStats } from '../utils/packageStats';

interface SentDeliveriesHistoryScreenProps {
  user: User | null;
  onBack: () => void;
  onNavigate: (screen: Screen) => void;
  userJobs: DeliveryJob[];
  onJobSelect: (job: DeliveryJob) => void;
  onOpenChat: (job: DeliveryJob) => void;
  formatAmount: (amount: number) => string;
  onBidSelect?: (bid: Bid, job: DeliveryJob) => void;
}

type FilterStatus = 'all' | 'pending' | 'bidding' | 'assigned' | 'in-transit' | 'delivered' | 'completed';

export function SentDeliveriesHistoryScreen({
  user,
  onBack,
  onNavigate,
  userJobs,
  onJobSelect,
  onOpenChat,
  formatAmount
}: SentDeliveriesHistoryScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredJobs = useMemo(() => {
    const filters = [
      PackageFilters.bySearchQuery(searchQuery)
    ];

    // Add status filter if not 'all'
    if (filterStatus !== 'all') {
      if (filterStatus === 'bidding' || filterStatus === 'pending') {
        filters.push(PackageFilters.sender.bidding);
      } else if (filterStatus === 'assigned') {
        filters.push(PackageFilters.sender.assigned);
      } else if (['in-transit', 'picked-up'].includes(filterStatus)) {
        filters.push((job) => ['in-transit', 'picked-up'].includes(job.status));
      } else if (filterStatus === 'delivered') {
        filters.push(PackageFilters.sender.delivered);
      } else if (filterStatus === 'completed') {
        filters.push(PackageFilters.sender.completed);
      }
    }

    return filterPackages(userJobs, filters);
  }, [userJobs, searchQuery, filterStatus]);

  const getStatusInfo = (job: DeliveryJob) => {
    switch (job.status) {
      case 'pending':
      case 'bidding':
        return { color: 'text-yellow-600', bg: 'bg-yellow-100', icon: Clock, label: 'Bidding' };
      case 'assigned':
      case 'picked-up':
        return { color: 'text-blue-600', bg: 'bg-blue-100', icon: Truck, label: 'In Progress' };
      case 'in-transit':
        return { color: 'text-primary-dark', bg: 'bg-orange-100', icon: Package, label: 'In Transit' };
      case 'delivered':
        return { color: 'text-green-600', bg: 'bg-green-100', icon: CheckCircle, label: 'Delivered' };
      case 'completed':
        return { color: 'text-emerald-600', bg: 'bg-emerald-100', icon: CheckCircle, label: 'Completed' };
      default:
        return { color: 'text-gray-600', bg: 'bg-gray-100', icon: Package, label: job.status };
    }
  };

  const stats = useMemo(() => {
    return calculateSenderStats(userJobs);
  }, [userJobs]);

  const handleJobAction = (job: DeliveryJob) => {
    onJobSelect(job);
    if (['pending', 'bidding'].includes(job.status)) {
      onNavigate('bids');
    } else if (['assigned', 'picked-up', 'in-transit'].includes(job.status)) {
      onNavigate('tracking');
    } else if (job.status === 'delivered') {
      onNavigate('delivery-confirmation');
    } else if (job.status === 'completed') {
      onNavigate('ratings');
    }
  };

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
              <h1 className="text-lg font-semibold text-gray-900">Sent Deliveries</h1>
              <p className="text-sm text-gray-600">Your delivery history</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
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
            <p className="text-2xl font-bold text-gray-900">{stats.bidding}</p>
            <p className="text-xs text-gray-600">Bidding</p>
          </motion.div>

          <motion.div
            className="bg-gray-50 border border-gray-200 rounded-2xl p-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Truck size={24} className="text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">{stats.active}</p>
            <p className="text-xs text-gray-600">Active</p>
          </motion.div>

          <motion.div
            className="bg-gray-50 border border-gray-200 rounded-2xl p-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <CheckCircle size={24} className="text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">{stats.completed}</p>
            <p className="text-xs text-gray-600">Completed</p>
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
            { key: 'bidding', label: 'Bidding' },
            { key: 'assigned', label: 'Assigned' },
            { key: 'in-transit', label: 'In Transit' },
            { key: 'delivered', label: 'Delivered' },
            { key: 'completed', label: 'Completed' }
          ].map((filter) => (
            <motion.button
              key={filter.key}
              onClick={() => setFilterStatus(filter.key as FilterStatus)}
              className={`px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-all ${
                filterStatus === filter.key
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

        {/* Deliveries List */}
        {filteredJobs.length === 0 ? (
          <motion.div
            className="bg-gray-50 border border-gray-200 rounded-2xl p-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Package size={48} className="text-gray-400 mx-auto mb-4" />
            <h3 className="text-gray-900 font-semibold mb-2">No Deliveries Found</h3>
            <p className="text-gray-600 text-sm mb-4">
              {searchQuery || filterStatus !== 'all'
                ? 'Try adjusting your search or filters'
                : 'Your sent deliveries will appear here'}
            </p>
            {/* <motion.button
              onClick={() => onNavigate('post-delivery')}
              className="px-6 py-3 bg-dark hover:bg-[#404040] text-white rounded-xl font-semibold transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Post New Delivery
            </motion.button> */}
          </motion.div>
        ) : (
          <div className="space-y-4">
            {filteredJobs.map((job, index) => {
              const statusInfo = getStatusInfo(job);
              const StatusIcon = statusInfo.icon;

              return (
                <motion.div
                  key={job.id}
                  className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-primary hover:shadow-md transition-all cursor-pointer"
                  onClick={() => handleJobAction(job)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + (index * 0.05) }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-gray-900 font-semibold">{job.title}</h3>
                    <Badge className={`${statusInfo.bg} ${statusInfo.color} border-0`}>
                      <StatusIcon size={14} className="mr-1" />
                      {statusInfo.label}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center space-x-2 text-sm">
                      <MapPin size={16} className="text-primary" />
                      <span className="text-gray-600">From:</span>
                      <span className="text-gray-900 truncate">{job.pickupLocation}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <MapPin size={16} className="text-green-600" />
                      <span className="text-gray-600">To:</span>
                      <span className="text-gray-900 truncate">{job.dropoffLocation}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div>
                      <p className="text-xs text-gray-600">Value</p>
                      <p className="text-gray-900 font-medium">{formatAmount(job.acceptedBidAmount || job.value)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Size</p>
                      <p className="text-gray-900 font-medium">{job.itemSize}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Bids</p>
                      <p className="text-gray-900 font-medium">{job.bids?.length || 0}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleJobAction(job);
                      }}
                      className="px-4 py-2 bg-primary hover:bg-[#d63a00] text-white rounded-xl text-sm font-medium flex items-center space-x-1 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Eye size={14} />
                      <span>
                        {['pending', 'bidding'].includes(job.status) ? 'View Bids' :
                          ['assigned', 'picked-up', 'in-transit'].includes(job.status) ? 'Track' :
                            'View Details'}
                      </span>
                    </motion.button>

                    {job.selectedPalId && (
                      <motion.button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenChat(job);
                        }}
                        className="px-4 py-2 bg-white hover:bg-gray-50 border border-gray-300 text-gray-900 rounded-xl text-sm font-medium flex items-center space-x-1 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <MessageCircle size={14} />
                        <span>Chat</span>
                      </motion.button>
                    )}

                    {job.status === 'completed' && (
                      <motion.button
                        onClick={(e) => {
                          e.stopPropagation();
                          onJobSelect(job);
                          onNavigate('ratings');
                        }}
                        className="px-4 py-2 bg-yellow-50 hover:bg-yellow-100 border border-yellow-200 text-yellow-700 rounded-xl text-sm font-medium flex items-center space-x-1 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Star size={14} />
                        <span>Rate</span>
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {filteredJobs.length > 0 && (
          <p className="text-center text-sm text-gray-600">
            Showing {filteredJobs.length} of {userJobs.length} deliveries
          </p>
        )}
      </div>
    </div>
  );
}