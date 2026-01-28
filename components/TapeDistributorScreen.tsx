'use client';
import React, { useState } from 'react';
import { ArrowLeft, Package, TrendingUp, Star, Plus, CheckCircle, Truck, BarChart3, ShoppingCart, Zap, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from './ui/badge';
import { User, Screen } from '../types';

interface TapeDistributorScreenProps {
  user: User | null;
  onBack: () => void;
  onNavigate: (screen: Screen) => void;
}

interface TapeProduct {
  id: string;
  name: string;
  type: 'standard' | 'premium' | 'industrial';
  description: string;
  unitPrice: number;
  minOrder: number;
  inStock: boolean;
  features: string[];
  commission: number;
}

export function TapeDistributorScreen({ user, onBack, onNavigate }: TapeDistributorScreenProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders'>('overview');

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const tapeProducts: TapeProduct[] = [
    {
      id: 'tape-1',
      name: 'Prawnbox Standard Security Tape',
      type: 'standard',
      description: 'Basic tamper-evident tape for standard deliveries',
      unitPrice: 150,
      minOrder: 100,
      inStock: true,
      features: ['Tamper-evident', 'Water-resistant', 'Easy application'],
      commission: 20
    },
    {
      id: 'tape-2',
      name: 'Prawnbox Premium Security Tape',
      type: 'premium',
      description: 'Advanced security tape with QR tracking codes',
      unitPrice: 250,
      minOrder: 50,
      inStock: true,
      features: ['QR code tracking', 'Enhanced security', 'Tear-resistant', 'UV resistant'],
      commission: 30
    },
    {
      id: 'tape-3',
      name: 'Prawnbox Industrial Security Tape',
      type: 'industrial',
      description: 'Heavy-duty tape for high-value shipments',
      unitPrice: 400,
      minOrder: 25,
      inStock: false,
      features: ['Military-grade security', 'Temperature resistant', 'Custom branding'],
      commission: 50
    }
  ];

  const stats = {
    totalOrders: 12,
    totalValue: 450000,
    pendingOrders: 3,
    activeLocations: 5
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark via-darker to-dark flex flex-col">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full opacity-10 blur-3xl"></div>
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
          <div>
            <h1 className="text-lg font-semibold text-white">Tape Distributor</h1>
            <p className="text-sm text-gray-400">Distribution program</p>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="bg-dark border-b border-white/10 p-4 relative z-10">
        <div className="flex space-x-2">
          {(['overview', 'products', 'orders'] as const).map((tab) => (
            <motion.button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl capitalize transition-all ${
                activeTab === tab
                  ? 'bg-white/20 text-white'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {tab}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 relative z-10">
        {activeTab === 'overview' && (
          <>
            {/* Welcome Card */}
            <motion.div 
              className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-2xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                  <Package size={24} className="text-purple-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white mb-2">Tape Distributor Program</h2>
                  <p className="text-purple-200 mb-3">
                    Join Nigeria&apos;s premier tamper-proof tape distribution network
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">Territory Rights</Badge>
                    <Badge className="bg-green-500/20 text-green-300 border-green-500/30">High Margins</Badge>
                    <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">Full Support</Badge>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Total Orders', value: stats.totalOrders, icon: ShoppingCart, color: 'blue' },
                { label: 'Total Value', value: formatAmount(stats.totalValue), icon: TrendingUp, color: 'green' },
                { label: 'Pending', value: stats.pendingOrders, icon: Package, color: 'yellow' },
                { label: 'Locations', value: stats.activeLocations, icon: MapPin, color: 'purple' }
              ].map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.1 }}
                  >
                    <Icon size={20} className={`text-${stat.color}-400 mb-2`} />
                    <p className="text-gray-400 text-sm">{stat.label}</p>
                    <p className="text-white text-xl font-semibold">{stat.value}</p>
                  </motion.div>
                );
              })}
            </div>

            {/* Quick Actions */}
            <motion.div 
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h3 className="text-white font-semibold mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <motion.button
                  onClick={() => setActiveTab('products')}
                  className="p-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Package size={24} className="text-blue-400 mx-auto mb-2" />
                  <p className="text-white text-sm">View Products</p>
                </motion.button>

                <motion.button
                  className="p-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Plus size={24} className="text-green-400 mx-auto mb-2" />
                  <p className="text-white text-sm">Place Order</p>
                </motion.button>

                <motion.button
                  className="p-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <BarChart3 size={24} className="text-purple-400 mx-auto mb-2" />
                  <p className="text-white text-sm">Analytics</p>
                </motion.button>

                <motion.button
                  onClick={() => setActiveTab('orders')}
                  className="p-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Truck size={24} className="text-orange-400 mx-auto mb-2" />
                  <p className="text-white text-sm">Track Orders</p>
                </motion.button>
              </div>
            </motion.div>
          </>
        )}

        {activeTab === 'products' && (
          <div className="space-y-4">
            {tapeProducts.map((product, index) => (
              <motion.div
                key={product.id}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-white font-semibold mb-1">{product.name}</h3>
                    <p className="text-gray-400 text-sm">{product.description}</p>
                  </div>
                  <Badge className={product.inStock ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </Badge>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {product.features.map((feature, i) => (
                    <div key={i} className="flex items-center space-x-1 text-sm text-gray-300">
                      <CheckCircle size={14} className="text-green-400" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Price per unit</p>
                    <p className="text-white text-lg font-semibold">{formatAmount(product.unitPrice)}</p>
                    <p className="text-gray-400 text-xs">Min order: {product.minOrder} units</p>
                  </div>
                  <motion.button
                    disabled={!product.inStock}
                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={product.inStock ? { scale: 1.05 } : {}}
                    whileTap={product.inStock ? { scale: 0.95 } : {}}
                  >
                    Order Now
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'orders' && (
          <motion.div 
            className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Package size={48} className="text-gray-500 mx-auto mb-4" />
            <h3 className="text-white font-semibold mb-2">No Orders Yet</h3>
            <p className="text-gray-400 mb-4">Place your first tape order to get started</p>
            <motion.button
              onClick={() => setActiveTab('products')}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-xl font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Products
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
