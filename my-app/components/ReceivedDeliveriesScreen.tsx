'use client'
import React, { useState, useMemo } from 'react';
import { ArrowLeft, Package, Clock, CheckCircle, AlertCircle, Search, Filter, MapPin, User, Phone, MessageCircle, Star, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { DeliveryJob, User as UserType, Screen } from '../types';

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
    return receivedJobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           job.senderName.toLowerCase().includes(searchQuery.toLowerCase());
      
      let matchesStatus: boolean = false;
      if (filterStatus === 'all') {
        matchesStatus = true;
      } else if (filterStatus === 'incoming') {
        matchesStatus = ['assigned', 'picked-up', 'in-transit'].includes(job.status);
      } else if (filterStatus === 'with-proxy') {
        matchesStatus = job.status === 'delivered' && !!job.proxyId;
      } else if (filterStatus === 'confirming') {
        matchesStatus = job.status === 'delivered' && !job.proxyId;
      } else if (filterStatus === 'completed') {
        matchesStatus = job.status === 'completed';
      }
      
      return matchesSearch && matchesStatus;
    });
  }, [receivedJobs, searchQuery, filterStatus]);

  const getStatusInfo = (job: DeliveryJob) => {
    if (['assigned', 'picked-up', 'in-transit'].includes(job.status)) {
      return { 
        color: 'text-orange-400', 
        bg: 'bg-orange-500/20', 
        icon: Clock, 
        label: 'Incoming'
      };
    } else if (job.status === 'delivered' && job.proxyId) {
      return { 
        color: 'text-purple-400', 
        bg: 'bg-purple-500/20', 
        icon: Package, 
        label: 'With Proxy'
      };
    } else if (job.status === 'delivered') {
      return { 
        color: 'text-green-400', 
        bg: 'bg-green-500/20', 
        icon: CheckCircle, 
        label: 'Confirming'
      };
    } else if (job.status === 'completed') {
      return { 
        color: 'text-emerald-400', 
        bg: 'bg-emerald-500/20', 
        icon: CheckCircle, 
        label: 'Completed'
      };
    }
    return { 
      color: 'text-gray-400', 
      bg: 'bg-gray-500/20', 
      icon: Package, 
      label: job.status
    };
  };

  const stats = useMemo(() => {
    const total = receivedJobs.length;
    const incoming = receivedJobs.filter(job => ['assigned', 'picked-up', 'in-transit'].includes(job.status)).length;
    const withProxy = receivedJobs.filter(job => job.status === 'delivered' && job.proxyId).length;
    const confirming = receivedJobs.filter(job => job.status === 'delivered' && !job.proxyId).length;
    const completed = receivedJobs.filter(job => job.status === 'completed').length;
    
    return { total, incoming, withProxy, confirming, completed };
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
    <div className="min-h-screen bg-gradient-to-br from-[#2f2f2f] via-[#1a1a1a] to-[#2f2f2f] flex flex-col">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full opacity-10 blur-3xl"></div>
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
              <h1 className="text-lg font-semibold text-white">Received Items</h1>
              <p className="text-sm text-gray-400">Track your packages</p>
            </div>
          </div>
          <motion.button
            onClick={() => onNavigate('dashboard')}
            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-xl font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Dashboard
          </motion.button>
        </div>
      </motion.div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 relative z-10">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: 'Total', value: stats.total, color: 'blue' },
            { label: 'Incoming', value: stats.incoming, color: 'orange' },
            { label: 'With Proxy', value: stats.withProxy, color: 'purple' },
            { label: 'Confirming', value: stats.confirming, color: 'green' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <p className="text-gray-400 text-sm">{stat.label}</p>
              <p className={`text-2xl font-bold text-${stat.color}-400`}>{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Search & Filters */}
        <motion.div 
          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 space-y-4"
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
                placeholder="Search items..."
                className="pl-10 bg-white/10 border-white/20 text-white"
              />
            </div>
            <motion.button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-4 py-2 rounded-xl font-medium flex items-center space-x-2 ${
                showFilters ? 'bg-purple-500 text-white' : 'bg-white/10 text-gray-300'
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
              className="pt-4 border-t border-white/10"
            >
              <label className="block text-gray-400 text-sm mb-2">Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as FilterStatus)}
                className="w-full p-2 bg-white/10 border border-white/20 rounded-xl text-white"
              >
                <option value="all">All Items</option>
                <option value="incoming">Incoming</option>
                <option value="with-proxy">With Proxy</option>
                <option value="confirming">Confirming</option>
                <option value="completed">Completed</option>
              </select>
            </motion.div>
          )}
        </motion.div>

        {/* Items List */}
        {filteredJobs.length === 0 ? (
          <motion.div 
            className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Package size={48} className="text-gray-500 mx-auto mb-4" />
            <h3 className="text-white font-semibold mb-2">No Items Found</h3>
            <p className="text-gray-400 text-sm">
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
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all cursor-pointer"
                  onClick={() => handleJobAction(job)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + (index * 0.05) }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white font-semibold">{job.title}</h3>
                    <Badge className={`${statusInfo.bg} ${statusInfo.color} border-0`}>
                      <StatusIcon size={14} className="mr-1" />
                      {statusInfo.label}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center space-x-2 text-sm">
                      <User size={16} className="text-purple-400" />
                      <span className="text-gray-400">From:</span>
                      <span className="text-white">{job.senderName}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <MapPin size={16} className="text-blue-400" />
                      <span className="text-gray-400">To:</span>
                      <span className="text-white truncate">{job.dropoffLocation}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div>
                      <p className="text-xs text-gray-400">Value</p>
                      <p className="text-white font-medium">{formatAmount(job.acceptedBidAmount || job.value)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Size</p>
                      <p className="text-white font-medium">{job.itemSize}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Pal</p>
                      <p className="text-white font-medium truncate">{job.selectedPalName || 'N/A'}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleJobAction(job);
                      }}
                      className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-xl text-sm font-medium flex items-center space-x-1"
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
                          className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl text-sm font-medium flex items-center space-x-1"
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
                            className="px-4 py-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 text-green-400 rounded-xl text-sm font-medium flex items-center space-x-1"
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
                        className="px-4 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-500/30 text-yellow-400 rounded-xl text-sm font-medium flex items-center space-x-1"
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
            Showing {filteredJobs.length} of {receivedJobs.length} items
          </p>
        )}
      </div>
    </div>
  );
}
