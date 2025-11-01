'use client'
import React, { useState, useMemo } from 'react';
import { ArrowLeft, Package, Clock, CheckCircle, Search, Filter, MapPin, DollarSign, Eye, MessageCircle, Star, Truck } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { DeliveryJob, User, Bid, Screen } from '../types';

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
    return userJobs.filter(job => {
      const matchesSearch = (job.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (job.pickupLocation || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (job.dropoffLocation || '').toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = filterStatus === 'all' || job.status === filterStatus;

      return matchesSearch && matchesStatus;
    });
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
        return { color: 'text-orange-600', bg: 'bg-orange-100', icon: Package, label: 'In Transit' };
      case 'delivered':
        return { color: 'text-green-600', bg: 'bg-green-100', icon: CheckCircle, label: 'Delivered' };
      case 'completed':
        return { color: 'text-emerald-600', bg: 'bg-emerald-100', icon: CheckCircle, label: 'Completed' };
      default:
        return { color: 'text-gray-600', bg: 'bg-gray-100', icon: Package, label: job.status };
    }
  };

  const stats = useMemo(() => {
    const total = userJobs.length;
    const bidding = userJobs.filter(job => ['pending', 'bidding'].includes(job.status)).length;
    const active = userJobs.filter(job => ['assigned', 'picked-up', 'in-transit'].includes(job.status)).length;
    const delivered = userJobs.filter(job => job.status === 'delivered').length;
    const completed = userJobs.filter(job => job.status === 'completed').length;

    return { total, bidding, active, delivered, completed };
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
              <ArrowLeft size={20} className="text-prawnbox-primary" />
            </motion.button>
            <div>
              <h1 className="text-lg font-semibold text-prawnbox-primary">Sent Deliveries</h1>
              <p className="text-sm text-gray-500">Your delivery history</p>
            </div>
          </div>
          {/* <motion.button
            onClick={() => onNavigate('dashboard')}
            className="px-4 py-2 bg-[#2f2f2f] hover:bg-[#404040] text-white rounded-xl font-medium transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Dashboard
          </motion.button> */}
        </div>
      </motion.div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: 'Total', value: stats.total, color: 'bg-blue-100', textColor: 'text-blue-600' },
            { label: 'Bidding', value: stats.bidding, color: 'bg-yellow-100', textColor: 'text-yellow-600' },
            { label: 'Active', value: stats.active, color: 'bg-orange-100', textColor: 'text-orange-600' },
            { label: 'Completed', value: stats.completed, color: 'bg-green-100', textColor: 'text-green-600' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className={`${stat.color} border border-gray-200 rounded-2xl p-4`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <p className="text-gray-600 text-sm">{stat.label}</p>
              <p className={`text-2xl font-bold ${stat.textColor}`}>{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Search & Filters */}
        <motion.div
          className="bg-gray-50 border border-gray-200 rounded-2xl p-4 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex space-x-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search deliveries..."
                className="pl-10 bg-white border-gray-300 text-prawnbox-primary"
              />
            </div>
            <motion.button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-4 py-2 rounded-xl font-medium flex items-center space-x-2 transition-colors ${showFilters ? 'bg-[#2f2f2f] text-white' : 'bg-white text-prawnbox-primary border border-gray-300'
                }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Filter size={18} />
              <span>Filter</span>
            </motion.button>
          </div>

          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="pt-4 border-t border-gray-200"
            >
              <label className="block text-gray-600 text-sm mb-2">Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as FilterStatus)}
                className="w-full p-2 bg-white border border-gray-300 rounded-xl text-prawnbox-primary"
              >
                <option value="all">All Deliveries</option>
                <option value="bidding">Bidding</option>
                <option value="assigned">Assigned</option>
                <option value="in-transit">In Transit</option>
                <option value="delivered">Delivered</option>
                <option value="completed">Completed</option>
              </select>
            </motion.div>
          )}
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
            <h3 className="text-prawnbox-primary font-semibold mb-2">No Deliveries Found</h3>
            <p className="text-gray-500 text-sm mb-4">
              {searchQuery || filterStatus !== 'all'
                ? 'Try adjusting your search or filters'
                : 'Your sent deliveries will appear here'}
            </p>
            <motion.button
              onClick={() => onNavigate('post-delivery')}
              className="px-6 py-3 bg-[#2f2f2f] hover:bg-[#404040] text-white rounded-xl font-semibold transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Post New Delivery
            </motion.button>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {filteredJobs.map((job, index) => {
              const statusInfo = getStatusInfo(job);
              const StatusIcon = statusInfo.icon;

              return (
                <motion.div
                  key={job.id}
                  className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-prawnbox-accent hover:shadow-md transition-all cursor-pointer"
                  onClick={() => handleJobAction(job)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + (index * 0.05) }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-prawnbox-primary font-semibold">{job.title}</h3>
                    <Badge className={`${statusInfo.bg} ${statusInfo.color} border-0`}>
                      <StatusIcon size={14} className="mr-1" />
                      {statusInfo.label}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center space-x-2 text-sm">
                      <MapPin size={16} className="text-blue-500" />
                      <span className="text-gray-500">From:</span>
                      <span className="text-prawnbox-primary truncate">{job.pickupLocation}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <MapPin size={16} className="text-purple-500" />
                      <span className="text-gray-500">To:</span>
                      <span className="text-prawnbox-primary truncate">{job.dropoffLocation}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div>
                      <p className="text-xs text-gray-500">Value</p>
                      <p className="text-prawnbox-primary font-medium">{formatAmount(job.acceptedBidAmount || job.value)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Size</p>
                      <p className="text-prawnbox-primary font-medium">{job.itemSize}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Bids</p>
                      <p className="text-prawnbox-primary font-medium">{job.bids?.length || 0}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleJobAction(job);
                      }}
                      className="px-4 py-2 bg-[#2f2f2f] hover:bg-[#404040] text-white rounded-xl text-sm font-medium flex items-center space-x-1 transition-colors"
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
                        className="px-4 py-2 bg-white hover:bg-gray-50 border border-gray-300 text-prawnbox-primary rounded-xl text-sm font-medium flex items-center space-x-1 transition-colors"
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
                        className="px-4 py-2 bg-yellow-100 hover:bg-yellow-200 border border-yellow-300 text-yellow-700 rounded-xl text-sm font-medium flex items-center space-x-1 transition-colors"
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
          <p className="text-center text-sm text-gray-500">
            Showing {filteredJobs.length} of {userJobs.length} deliveries
          </p>
        )}
      </div>
    </div>
  );
}