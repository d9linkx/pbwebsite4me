'use client'
import React, { useState } from 'react';
import { ArrowLeft, TrendingUp, DollarSign, User, Calendar, ChevronRight, Plus, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from './ui/badge';
import { User as UserType, Screen} from '../types';

interface SponsorshipManagementScreenProps {
  user: UserType | null;
  onBack: () => void;
  onNavigate: (screen: Screen) => void;
}

export function SponsorshipManagementScreen({ user, onBack, onNavigate }: SponsorshipManagementScreenProps) {
  const [activeTab, setActiveTab] = useState<'active' | 'completed' | 'earnings'>('active');

  const tabs = ['active', 'completed', 'earnings'] as const;

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-NG', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getDaysRemaining = (endDate: string) => {
    const now = new Date();
    const end = new Date(endDate);
    const diffTime = end.getTime() - now.getTime();
    return Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  };

  const activeEscrows = user?.activeEscrows || [
    {
      id: 'escrow-1',
      beneficiaryName: 'Mike Johnson',
      beneficiaryId: 'user-1',
      amount: 25000,
      availableAmount: 18500,
      usedAmount: 6500,
      commissionRate: 15,
      totalEarnings: 975,
      pendingReturn: 18500,
      endDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(),
      startDate: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'active'
    },
    {
      id: 'escrow-2',
      beneficiaryName: 'Sarah Williams',
      beneficiaryId: 'user-2',
      amount: 15000,
      availableAmount: 12300,
      usedAmount: 2700,
      commissionRate: 12,
      totalEarnings: 324,
      pendingReturn: 12300,
      endDate: new Date(Date.now() + 72 * 24 * 60 * 60 * 1000).toISOString(),
      startDate: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'active'
    }
  ];

  const totalInvested = activeEscrows.reduce((sum, e) => sum + e.amount, 0);
  const totalEarnings = activeEscrows.reduce((sum, e) => sum + e.totalEarnings, 0);
  const totalPendingReturn = activeEscrows.reduce((sum, e) => sum + e.pendingReturn, 0);

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
              <h1 className="text-lg font-semibold text-white">Sponsorships</h1>
              <p className="text-sm text-gray-400">Manage your active sponsorships</p>
            </div>
          </div>
          <motion.button
            onClick={() => onNavigate('sponsor-search')}
            className="p-2 bg-primary hover:bg-primary-hover rounded-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus size={20} className="text-white" />
          </motion.button>
        </div>
      </motion.div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 relative z-10">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 gap-4">
          <motion.div 
            className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Total Invested</span>
              <DollarSign size={20} className="text-blue-400" />
            </div>
            <p className="text-2xl font-bold text-white">
              {formatAmount(totalInvested)}
            </p>
          </motion.div>

          <motion.div 
            className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Total Earnings</span>
              <TrendingUp size={20} className="text-green-400" />
            </div>
            <p className="text-2xl font-bold text-green-400">
              {formatAmount(totalEarnings)}
            </p>
          </motion.div>

          <motion.div 
            className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Pending Return</span>
              <Calendar size={20} className="text-yellow-400" />
            </div>
            <p className="text-2xl font-bold text-white">
              {formatAmount(totalPendingReturn)}
            </p>
          </motion.div>

          <motion.div 
            className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Active</span>
              <User size={20} className="text-purple-400" />
            </div>
            <p className="text-2xl font-bold text-white">{activeEscrows.length}</p>
          </motion.div>
        </div>

        {/* Tabs */}
        <motion.div 
          className="flex space-x-2 bg-white/10 p-1 rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {tabs.map((tab) => (
            <motion.button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 rounded-lg font-medium transition-all ${
                activeTab === tab
                  ? 'bg-primary text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </motion.button>
          ))}
        </motion.div>

        {/* Active Sponsorships */}
        {activeTab === 'active' && (
          <div className="space-y-4">
            {activeEscrows.map((escrow, index) => (
              <motion.div
                key={escrow.id}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center text-white font-bold">
                      {escrow.beneficiaryName.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">{escrow.beneficiaryName}</h3>
                      <p className="text-sm text-gray-400">ID: #{escrow.beneficiaryId.slice(0, 8)}</p>
                    </div>
                  </div>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    Active
                  </Badge>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-white/10 rounded-xl p-3">
                    <p className="text-xs text-gray-400 mb-1">Sponsored Amount</p>
                    <p className="text-white font-semibold">{formatAmount(escrow.amount)}</p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-3">
                    <p className="text-xs text-gray-400 mb-1">Your Earnings</p>
                    <p className="text-green-400 font-semibold">{formatAmount(escrow.totalEarnings)}</p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-3">
                    <p className="text-xs text-gray-400 mb-1">Used Amount</p>
                    <p className="text-white font-semibold">{formatAmount(escrow.usedAmount)}</p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-3">
                    <p className="text-xs text-gray-400 mb-1">Available</p>
                    <p className="text-white font-semibold">{formatAmount(escrow.availableAmount)}</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-400">Fund Usage</span>
                    <span className="text-xs text-white font-medium">
                      {Math.round((escrow.usedAmount / escrow.amount) * 100)}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-primary-hover rounded-full"
                      style={{ width: `${(escrow.usedAmount / escrow.amount) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Info */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Commission Rate:</span>
                    <span className="text-white font-medium">{escrow.commissionRate}%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Days Remaining:</span>
                    <span className="text-yellow-400 font-medium">
                      {getDaysRemaining(escrow.endDate)} days
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">End Date:</span>
                    <span className="text-white">{formatDate(escrow.endDate)}</span>
                  </div>
                </div>

                {/* Action Button */}
                <motion.button
                  onClick={() => onNavigate('sponsorship-details')}
                  className="w-full bg-primary hover:bg-primary-hover text-white py-3 rounded-xl font-medium flex items-center justify-center space-x-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>View Details</span>
                  <ChevronRight size={16} />
                </motion.button>
              </motion.div>
            ))}

            {activeEscrows.length === 0 && (
              <motion.div
                className="text-center py-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Star size={48} className="text-gray-500 mx-auto mb-4" />
                <h3 className="text-white font-semibold mb-2">No Active Sponsorships</h3>
                <p className="text-gray-400 mb-6">Start sponsoring users to earn commission</p>
                <motion.button
                  onClick={() => onNavigate('sponsor-search')}
                  className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Find Users to Sponsor
                </motion.button>
              </motion.div>
            )}
          </div>
        )}

        {/* Other tabs placeholders */}
        {activeTab === 'completed' && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Calendar size={48} className="text-gray-500 mx-auto mb-4" />
            <h3 className="text-white font-semibold mb-2">No Completed Sponsorships</h3>
            <p className="text-gray-400">Completed sponsorships will appear here</p>
          </motion.div>
        )}

        {activeTab === 'earnings' && (
          <motion.div
            className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3 className="text-white font-semibold mb-4">Earnings Breakdown</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Total Commission Earned:</span>
                <span className="text-green-400 font-bold text-lg">{formatAmount(totalEarnings)}</span>
              </div>
              <div className="h-px bg-white/10"></div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Average Commission Rate:</span>
                <span className="text-white">
                  {(activeEscrows.reduce((sum, e) => sum + e.commissionRate, 0) / activeEscrows.length).toFixed(1)}%
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Total Sponsored Users:</span>
                <span className="text-white">{activeEscrows.length}</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
