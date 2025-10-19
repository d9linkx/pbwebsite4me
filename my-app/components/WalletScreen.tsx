"use client";
import React from 'react';
import { ArrowLeft, Plus, ArrowDown, CreditCard, TrendingUp, ArrowUpRight, ArrowDownLeft, Wallet, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from './ui/badge';
import { User, UserRole } from '../types';

interface WalletScreenProps {
  user: User | null;
  onBack: () => void;
  onAddFunds: () => void;
  onWithdraw: () => void;
  onManagePaymentMethods: () => void;
  userRole: UserRole;
}

export function WalletScreen({
  user,
  onBack,
  onAddFunds,
  onWithdraw,
  onManagePaymentMethods,
  userRole
}: WalletScreenProps) {
  const [showBalance, setShowBalance] = React.useState(true);

  const mockTransactions = [
    {
      id: '1',
      type: 'credit',
      amount: 25000,
      description: 'Delivery payment received',
      date: '2025-01-15T14:30:00Z',
      status: 'completed'
    },
    {
      id: '2',
      type: 'debit',
      amount: 5000,
      description: 'Delivery fee payment',
      date: '2025-01-15T10:15:00Z',
      status: 'completed'
    },
    {
      id: '3',
      type: 'credit',
      amount: 50000,
      description: 'Wallet top-up',
      date: '2025-01-14T16:45:00Z',
      status: 'completed'
    },
    {
      id: '4',
      type: 'debit',
      amount: 15000,
      description: 'Withdrawal to bank',
      date: '2025-01-14T09:20:00Z',
      status: 'pending'
    },
    {
      id: '5',
      type: 'credit',
      amount: 18000,
      description: 'Delivery payment received',
      date: '2025-01-13T18:10:00Z',
      status: 'completed'
    }
  ];

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-NG', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTransactionIcon = (type: string) => {
    return type === 'credit' ? (
      <ArrowDownLeft size={16} className="text-green-600" />
    ) : (
      <ArrowUpRight size={16} className="text-red-600" />
    );
  };

  const getTotalThisMonth = () => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    return mockTransactions
      .filter(transaction => {
        const transactionDate = new Date(transaction.date);
        return transactionDate.getMonth() === currentMonth && 
               transactionDate.getFullYear() === currentYear &&
               transaction.status === 'completed';
      })
      .reduce((total, transaction) => {
        return transaction.type === 'credit' 
          ? total + transaction.amount 
          : total - transaction.amount;
      }, 0);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#2f2f2f] via-[#1a1a1a] to-[#2f2f2f] flex items-center justify-center">
        <p className="text-gray-300">Please log in to view your wallet</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2f2f2f] via-[#1a1a1a] to-[#2f2f2f]">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#f44708] rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#f44708] rounded-full opacity-10 blur-3xl"></div>
      </div>

      {/* Header */}
      <motion.div 
        className="bg-[#2f2f2f] border-b border-white/10 relative z-10 sticky top-0"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between px-6 py-4">
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
              <h1 className="text-xl text-white">Wallet</h1>
              <p className="text-sm text-gray-400">Manage your funds</p>
            </div>
          </div>
          
          <motion.button
            onClick={onManagePaymentMethods}
            className="p-2 hover:bg-white/10 rounded-xl transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <CreditCard size={20} className="text-gray-400" />
          </motion.button>
        </div>
      </motion.div>

      <div className="px-6 py-6 space-y-6 relative z-10">
        {/* Balance Card */}
        <motion.div 
          className="bg-gradient-to-br from-[#f44708] to-[#ff5722] text-white border-0 rounded-2xl p-6 relative overflow-hidden shadow-2xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-x-16 -translate-y-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -translate-x-12 translate-y-12"></div>
          
          <div className="relative">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Wallet size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-white/90 text-sm">Available Balance</p>
                  <p className="text-white/70 text-xs">Last updated: Just now</p>
                </div>
              </div>
              
              <motion.button
                onClick={() => setShowBalance(!showBalance)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {showBalance ? <Eye size={18} className="text-white/90" /> : <EyeOff size={18} className="text-white/90" />}
              </motion.button>
            </div>

            <div className="mb-6">
              <p className="text-4xl font-bold text-white mb-2">
                {showBalance ? formatAmount(user.walletBalance || 0) : '****'}
              </p>
              <div className="flex items-center space-x-2">
                <TrendingUp size={14} className="text-white/90" />
                <span className="text-white/90 text-sm font-medium">+{formatAmount(getTotalThisMonth())}</span>
                <span className="text-white/70 text-sm">this month</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <motion.button
                onClick={onAddFunds}
                className="bg-[#2f2f2f] hover:bg-[#1a1a1a] text-white rounded-xl py-3 px-4 font-semibold transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Plus size={18} />
                <span>Add Funds</span>
              </motion.button>
              <motion.button
                onClick={onWithdraw}
                className="bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/30 rounded-xl py-3 px-4 font-semibold transition-all duration-200 flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowDown size={18} />
                <span>Withdraw</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <motion.div 
            className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                <ArrowDownLeft size={18} className="text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Total Earned</p>
                <p className="text-lg font-semibold text-white">
                  {formatAmount(mockTransactions
                    .filter(t => t.type === 'credit' && t.status === 'completed')
                    .reduce((sum, t) => sum + t.amount, 0)
                  )}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <ArrowUpRight size={18} className="text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Total Spent</p>
                <p className="text-lg font-semibold text-white">
                  {formatAmount(mockTransactions
                    .filter(t => t.type === 'debit' && t.status === 'completed')
                    .reduce((sum, t) => sum + t.amount, 0)
                  )}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Recent Transactions */}
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Recent Transactions</h2>
            <button className="text-sm text-[#f44708] hover:text-[#ff5722] transition-colors">
              View All
            </button>
          </div>

          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden">
            {mockTransactions.slice(0, 5).map((transaction, index) => (
              <motion.div
                key={transaction.id}
                className={`p-4 hover:bg-white/5 transition-colors ${
                  index !== mockTransactions.slice(0, 5).length - 1 ? 'border-b border-white/10' : ''
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.05 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      transaction.type === 'credit' ? 'bg-green-500/20' : 'bg-red-500/20'
                    }`}>
                      {getTransactionIcon(transaction.type)}
                    </div>
                    <div>
                      <p className="font-medium text-white text-sm">{transaction.description}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <p className="text-xs text-gray-400">{formatDate(transaction.date)}</p>
                        <Badge className={`text-xs px-2 py-0.5 rounded-lg border-0 ${
                          transaction.status === 'completed' 
                            ? 'bg-green-500/20 text-green-400' 
                            : transaction.status === 'pending'
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'bg-gray-500/20 text-gray-400'
                        }`}>
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${
                      transaction.type === 'credit' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {transaction.type === 'credit' ? '+' : '-'}{formatAmount(transaction.amount)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Role-specific insights */}
        {userRole === 'pal' && (
          <motion.div 
            className="bg-gradient-to-r from-blue-500/20 to-indigo-500/20 backdrop-blur-sm border border-blue-500/30 rounded-xl p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/30 flex items-center justify-center">
                <TrendingUp size={18} className="text-blue-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-white mb-1">Pal Earnings Insight</h3>
                <p className="text-sm text-gray-300 mb-2">
                  You&apos;ve earned {formatAmount(getTotalThisMonth())} this month from {mockTransactions.filter(t => t.type === 'credit' && t.status === 'completed').length} deliveries.
                </p>
                <p className="text-xs text-blue-400">Keep up the great work! 🚀</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Payment Methods Quick Access */}
        <motion.div 
          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                <CreditCard size={18} className="text-gray-400" />
              </div>
              <div>
                <p className="font-medium text-white">Payment Methods</p>
                <p className="text-sm text-gray-400">Manage cards and bank accounts</p>
              </div>
            </div>
            <motion.button
              onClick={onManagePaymentMethods}
              className="bg-[#f44708] hover:bg-[#ff5722] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Manage
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
