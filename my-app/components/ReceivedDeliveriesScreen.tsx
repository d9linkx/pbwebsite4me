'use client'
import React, { useState, useMemo } from 'react';
import { ArrowLeft, Package, Clock, CheckCircle, AlertCircle, Search, Filter, MapPin, User, Phone, MessageCircle, Star, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { DeliveryJob, User as UserType, Screen } from '../types';
import { PackageFilters, filterPackages } from '../utils/packageFilters';
import { calculateReceiverStats } from '../utils/packageStats';

interface ReceivedDeliveriesScreenProps {
  user: UserType | null;
  onBack: () => void;
  onNavigate: (screen: Screen) => void;
  receivedJobs: DeliveryJob[];
  onJobSelect: (job: DeliveryJob) => void;
  onOpenChat: (job: DeliveryJob) => void;
  onCall: (phoneNumber: string) => void;
  formatAmount: (amount: number) => string;
}

type FilterStatus = 'all' | 'incoming' | 'with-proxy' | 'confirming' | 'completed';

export function ReceivedDeliveriesScreen({
  user,
  onBack,
  onNavigate,
  receivedJobs,
  onJobSelect,
  onOpenChat,
  onCall,
  formatAmount
}: ReceivedDeliveriesScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredJobs = useMemo(() => {
    const filters = [
      PackageFilters.bySearchQuery(searchQuery)
    ];

    // Add status filter if not 'all'
    if (filterStatus !== 'all') {
      if (filterStatus === 'incoming') {
        filters.push(PackageFilters.receiver.incoming);
      } else if (filterStatus === 'with-proxy') {
        filters.push(PackageFilters.receiver.withProxy);
      } else if (filterStatus === 'confirming') {
        filters.push(PackageFilters.receiver.confirming);
      } else if (filterStatus === 'completed') {
        filters.push(PackageFilters.receiver.completed);
      }
    }

    return filterPackages(receivedJobs, filters);
  }, [receivedJobs, searchQuery, filterStatus]);

  const getStatusInfo = (job: DeliveryJob) => {
    if (['assigned', 'picked-up', 'in-transit'].includes(job.status)) {
      return {
        color: 'text-primary-dark',
        bg: 'bg-orange-100',
        icon: Clock,
        label: 'Incoming'
      };
    } else if (job.status === 'delivered' && job.proxyId) {
      return {
        color: 'text-purple-600',
        bg: 'bg-purple-100',
        icon: Package,
        label: 'With Proxy'
      };
    } else if (job.status === 'delivered') {
      return {
        color: 'text-green-600',
        bg: 'bg-green-100',
        icon: CheckCircle,
        label: 'Confirming'
      };
    } else if (job.status === 'completed') {
      return {
        color: 'text-emerald-600',
        bg: 'bg-emerald-100',
        icon: CheckCircle,
        label: 'Completed'
      };
    }
    return {
      color: 'text-gray-600',
      bg: 'bg-gray-100',
      icon: Package,
      label: job.status
    };
  };

  const stats = useMemo(() => {
    return calculateReceiverStats(receivedJobs);
  }, [receivedJobs]);

  const handleJobAction = (job: DeliveryJob) => {
    onJobSelect(job);
    if (['assigned', 'picked-up', 'in-transit'].includes(job.status)) {
      onNavigate('tracking');
    } else if (job.status === 'delivered') {
      onNavigate('receiver-confirmation');
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
              <h1 className="text-lg font-semibold text-gray-900">Received Items</h1>
              <p className="text-sm text-gray-600">Track your packages</p>
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
            <Clock size={24} className="text-primary-dark mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">{stats.incoming}</p>
            <p className="text-xs text-gray-600">Incoming</p>
          </motion.div>

          <motion.div
            className="bg-gray-50 border border-gray-200 rounded-2xl p-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Package size={24} className="text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">{stats.withProxy}</p>
            <p className="text-xs text-gray-600">With Proxy</p>
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
            { key: 'incoming', label: 'Incoming' },
            { key: 'with-proxy', label: 'With Proxy' },
            { key: 'confirming', label: 'Confirming' },
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

        {/* Items List */}
        {filteredJobs.length === 0 ? (
          <motion.div
            className="bg-gray-50 border border-gray-200 rounded-2xl p-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Package size={48} className="text-gray-400 mx-auto mb-4" />
            <h3 className="text-gray-900 font-semibold mb-2">No Items Found</h3>
            <p className="text-gray-600 text-sm">
              {searchQuery || filterStatus !== 'all'
                ? 'Try adjusting your search or filters'
                : 'Your received deliveries will appear here'}
            </p>
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
                      <User size={16} className="text-purple-600" />
                      <span className="text-gray-600">From:</span>
                      <span className="text-gray-900">{job.senderName}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <MapPin size={16} className="text-primary" />
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
                      <p className="text-xs text-gray-600">Pal</p>
                      <p className="text-gray-900 font-medium truncate">{job.selectedPalName || 'N/A'}</p>
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
                      <span>View</span>
                    </motion.button>

                    {job.selectedPalId && (
                      <>
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

                        {job.selectedPalPhone && (
                          <motion.button
                            onClick={(e) => {
                              e.stopPropagation();
                              onCall(job.selectedPalPhone!);
                            }}
                            className="px-4 py-2 bg-green-50 hover:bg-green-100 border border-green-200 text-green-700 rounded-xl text-sm font-medium flex items-center space-x-1 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Phone size={14} />
                            <span>Call</span>
                          </motion.button>
                        )}
                      </>
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
            Showing {filteredJobs.length} of {receivedJobs.length} items
          </p>
        )}
      </div>
    </div>
  );
}