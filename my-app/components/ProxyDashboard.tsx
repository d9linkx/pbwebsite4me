'use client'
import React, { useState } from 'react';
import { ArrowLeft, Package, Clock, Phone, CheckCircle, AlertCircle, Users, MessageCircle, DollarSign, QrCode } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from './ui/badge';
import { ProxyItem, User, ProxyStatus, Screen } from '../types';

type FilterType = ProxyStatus | 'all';

interface ProxyDashboardProps {
  onBack: () => void;
  proxyItems: ProxyItem[];
  selectedRoute?: string | null;  // Add this
  onRouteSelect?: (route: string | null) => void;  // Add this
  onItemSelect?: (item: ProxyItem) => void;  // Add this
  onNavigate?: (screen: Screen) => void;
  onItemUpdate: (item: ProxyItem) => void;
  onNotifyReceiver?: (item: ProxyItem) => void;
  onHandoverToReceiver?: (item: ProxyItem) => void;
  onOpenChat?: (item: ProxyItem) => void;
  onCall?: (phoneNumber: string) => void;  // Note the name is 'onCall'
  user: User | null;
  onStartScan?: (item: ProxyItem) => void;
}

export function ProxyDashboard({
  onBack,
  proxyItems,
  onNotifyReceiver,
  onHandoverToReceiver,
  onOpenChat,
  onCall,
  user,
  onStartScan
}: ProxyDashboardProps) {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'incoming':
        return <Badge className="bg-blue-100 text-blue-600 border-0">Incoming</Badge>;
      case 'stored':
        return <Badge className="bg-yellow-100 text-yellow-600 border-0">Stored</Badge>;
      case 'completed':
        return <Badge className="bg-green-100 text-green-600 border-0">Completed</Badge>;
      case 'returned':
        return <Badge className="bg-red-100 text-red-600 border-0">Returned</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-600 border-0">Unknown</Badge>;
    }
  };

  const getDaysStored = (storedDate: string) => {
    const stored = new Date(storedDate);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - stored.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const filteredItems = activeFilter === 'all'
    ? proxyItems
    : proxyItems.filter(item => item.status === activeFilter);

  const stats = {
    incoming: proxyItems.filter(i => i.status === 'incoming').length,
    stored: proxyItems.filter(i => i.status === 'stored').length,
    completed: proxyItems.filter(i => i.status === 'completed').length
  };

  const totalEarnings = proxyItems
    .filter(i => i.status === 'completed')
    .reduce((sum, item) => sum + (item.storageEarnings || 0), 0);

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
              <h1 className="text-lg font-semibold text-gray-900">Proxy Dashboard</h1>
              <p className="text-sm text-gray-600">{user?.name || 'Proxy'}</p>
            </div>
          </div>
          <Badge className="bg-green-50 text-green-700 border-green-200 flex items-center space-x-1">
            <Users size={14} />
            <span>{proxyItems.length} items</span>
          </Badge>
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
            <p className="text-2xl font-bold text-gray-900">{stats.incoming + stats.stored}</p>
            <p className="text-xs text-gray-600">Active</p>
          </motion.div>

          <motion.div
            className="bg-gray-50 border border-gray-200 rounded-2xl p-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
          >
            <Clock size={24} className="text-yellow-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">{stats.incoming}</p>
            <p className="text-xs text-gray-600">Incoming</p>
          </motion.div>

          <motion.div
            className="bg-gray-50 border border-gray-200 rounded-2xl p-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <CheckCircle size={24} className="text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">{stats.completed}</p>
            <p className="text-xs text-gray-600">Completed</p>
          </motion.div>

          <motion.div
            className="bg-gray-50 border border-gray-200 rounded-2xl p-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <DollarSign size={24} className="text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">₦{(totalEarnings / 1000).toFixed(1)}k</p>
            <p className="text-xs text-gray-600">Earnings</p>
          </motion.div>
        </div>

        {/* Filters */}
        <motion.div
          className="flex overflow-x-auto gap-2 pb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {['all', 'incoming', 'stored', 'completed'].map((filter) => (
            <motion.button
              key={filter}
              onClick={() => setActiveFilter(filter as FilterType)}
              className={`px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-all ${activeFilter === filter
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </motion.button>
          ))}
        </motion.div>

        {/* Items List */}
        <div className="space-y-4">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                className="bg-white border border-gray-200 rounded-2xl p-5 hover:border-primary hover:shadow-md transition-all"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                {/* Item Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-gray-900 font-semibold">{item.title || 'Package'}</h3>
                      {getStatusBadge(item.status)}
                    </div>
                    <p className="text-sm text-gray-600">
                      ID: #{item.id.slice(0, 8)} • {item.size || 'Medium'}
                    </p>
                  </div>
                </div>

                {/* Item Details */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center space-x-2 text-sm">
                    <Users size={14} className="text-blue-600" />
                    <span className="text-gray-600">Receiver:</span>
                    <span className="text-gray-900">{item.receiverName}</span>
                  </div>

                  {item.status === 'stored' && item.storedDate && (
                    <div className="flex items-center space-x-2 text-sm">
                      <Clock size={14} className="text-yellow-600" />
                      <span className="text-gray-600">Stored:</span>
                      <span className="text-gray-900">{getDaysStored(item.storedDate)} days</span>
                    </div>
                  )}

                  {item.storageEarnings && (
                    <div className="flex items-center space-x-2 text-sm">
                      <DollarSign size={14} className="text-green-600" />
                      <span className="text-gray-600">Earnings:</span>
                      <span className="text-green-600 font-semibold">
                        ₦{item.storageEarnings.toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-2">
                  {item.status === 'incoming' && (
                    <>
                      <motion.button
                        onClick={() => onStartScan?.(item)}
                        className="flex items-center justify-center space-x-2 bg-primary hover:bg-[#d63a00] text-white py-2.5 rounded-xl transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <QrCode size={16} />
                        <span className="text-sm font-medium">Scan QR</span>
                      </motion.button>
                      <motion.button
                        onClick={() => onCall?.(item.receiverPhone || '')}
                        className="flex items-center justify-center space-x-2 bg-white hover:bg-gray-50 border border-gray-300 text-gray-900 py-2.5 rounded-xl transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Phone size={16} />
                        <span className="text-sm font-medium">Call</span>
                      </motion.button>
                    </>
                  )}

                  {item.status === 'stored' && (
                    <>
                      <motion.button
                        onClick={() => onNotifyReceiver?.(item)}
                        className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <MessageCircle size={16} />
                        <span className="text-sm font-medium">Notify</span>
                      </motion.button>
                      <motion.button
                        onClick={() => onHandoverToReceiver?.(item)}
                        className="flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-xl transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <CheckCircle size={16} />
                        <span className="text-sm font-medium">Handover</span>
                      </motion.button>
                    </>
                  )}

                  {item.status === 'completed' && (
                    <div className="col-span-2 bg-green-50 border border-green-200 rounded-xl p-3 text-center">
                      <p className="text-green-700 text-sm font-medium">
                        ✓ Completed • Earned ₦{item.storageEarnings?.toLocaleString()}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Package size={48} className="text-gray-400 mx-auto mb-4" />
              <h3 className="text-gray-900 font-semibold mb-2">No Items</h3>
              <p className="text-gray-600">
                {activeFilter === 'all'
                  ? 'No proxy items yet'
                  : `No ${activeFilter} items`
                }
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}