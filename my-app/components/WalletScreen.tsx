"use client";
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Plus, ArrowDown, CreditCard, TrendingUp, ArrowUpRight, ArrowDownLeft, Wallet, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from './ui/badge';
import { User, UserRole } from '../types';
import { apiService } from '@/utils/apiService';

interface WalletScreenProps {
  user: User | null;
  onBack: () => void;
  onAddFunds: () => void;
  onWithdraw: () => void;
  onManagePaymentMethods: () => void;
  userRole: UserRole;
}

interface Transaction {
  _id: string;
  type: 'deposit' | 'withdrawal' | 'escrow_lock' | 'escrow_release' | 'commission' | 'refund';
  amount: number;
  currency: string;
  status: 'pending' | 'success' | 'failed';
  balanceAfter?: number;
  description: string;
  createdAt: string | Date;
  metadata?: {
    paymentId?: string;
    reference?: string;
    provider?: string;
    providerReference?: string;
  };
}

interface AccountResponse {
  accountBalance: number;
  totalEscrowAmount: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
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
  const [walletData, setWalletData] = useState({
    balance: 0,
    transactions: [] as Transaction[]
  });
  const [loading, setLoading] = useState(true);

  // Fetch real wallet data from backend
  useEffect(() => {
    const fetchWalletData = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        
        // Fetch account balance
        const accountResponse = await apiService.get<AccountResponse>('/account/');
        const balance = accountResponse.data?.accountBalance || 0;
        
        // Fetch transactions using user endpoint
        const transactionsResponse = await apiService.get<{ transactions: Transaction[]; total: number }>('/user/transactions');
        const transactions = transactionsResponse.data?.transactions || [];
        
        console.log('📊 Raw transactions from backend:', transactionsResponse.data);
        console.log('📊 Processed transactions:', transactions);
        console.log('📊 Transaction details:', transactions.map(t => ({
          id: t._id,
          type: t.type,
          amount: t.amount,
          status: t.status,
          description: t.description,
          createdAt: t.createdAt
        })));
        
        setWalletData({
          balance,
          transactions
        });
        
        console.log('💰 Real wallet data loaded:', { balance, transactionCount: transactions.length });
      } catch (error) {
        console.error('❌ Error fetching wallet data:', error);
        // Set default values on error
        setWalletData({
          balance: 0,
          transactions: []
        });
      } finally {
        setLoading(false);
      }
    };

    fetchWalletData();

    // Listen for wallet refresh events (e.g., after payment success)
    const handleWalletRefresh = () => {
      console.log('🔄 Wallet refresh triggered - fetching fresh data');
      fetchWalletData();
    };

    // Listen for storage changes (payment success)
    const handleStorageChange = (e: StorageEvent) => {
      console.log('🔄 Storage change detected:', { key: e.key, oldValue: e.oldValue, newValue: e.newValue });
      if (e.key === 'walletRefresh') {
        console.log('🔄 Wallet refresh flag detected - triggering refresh');
        handleWalletRefresh();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also check for immediate refresh (same tab)
    const checkRefresh = () => {
      const refreshFlag = localStorage.getItem('walletRefresh');
      console.log('🔄 Checking for refresh flag:', refreshFlag);
      if (refreshFlag) {
        console.log('🔄 Refresh flag found - removing and triggering refresh');
        localStorage.removeItem('walletRefresh');
        handleWalletRefresh();
      }
    };

    // Check immediately and set up interval for same-tab updates
    checkRefresh();
    const interval = setInterval(checkRefresh, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [user]);

  const formatAmount = (amount: number) => {
    if (amount === 0) {
      return '₦-.--';
    }
    
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string | Date) => {
    try {
      const date = new Date(dateString);
      
      // Check if date is valid
      if (isNaN(date.getTime())) {
        return 'Invalid date';
      }
      
      return date.toLocaleDateString('en-NG', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      console.error('Date formatting error:', error);
      return 'Invalid date';
    }
  };

  const getTransactionIcon = (type: string) => {
    return type === 'deposit' ? (
      <ArrowDownLeft size={16} className="text-green-600" />
    ) : (
      <ArrowUpRight size={16} className="text-red-600" />
    );
  };

  const getTotalThisMonth = () => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    return walletData.transactions
      .filter(transaction => {
        const transactionDate = new Date(transaction.createdAt);
        return transactionDate.getMonth() === currentMonth && 
               transactionDate.getFullYear() === currentYear &&
               transaction.type === 'deposit' &&
               transaction.status === 'success';
      })
      .reduce((total, transaction) => {
        return total + transaction.amount;
      }, 0);
  };

  const getTotalEarned = () => {
    return walletData.transactions
      .filter(t => t.type === 'deposit' && t.status === 'success')
      .reduce((sum, t) => sum + t.amount, 0);
  };

  const getTotalSpent = () => {
    return walletData.transactions
      .filter(t => t.type === 'withdrawal' && t.status === 'success')
      .reduce((sum, t) => sum + t.amount, 0);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-600">Please log in to view your wallet</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#f44708] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading wallet data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">

      {/* Header */}
      <motion.div
        className="bg-white border-b border-gray-200 relative z-10 sticky top-0 shadow-sm"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between px-6 py-4">
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
              <h1 className="text-xl text-gray-900">Wallet</h1>
              <p className="text-sm text-gray-500">Manage your funds</p>
            </div>
          </div>

          <motion.button
            onClick={onManagePaymentMethods}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <CreditCard size={20} className="text-gray-600" />
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
                {showBalance ? formatAmount(walletData.balance) : '****'}
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
                className="bg-white hover:bg-white/90 text-[#f44708] rounded-xl py-3 px-4 font-semibold transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg"
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
            className="bg-gray-50 border border-gray-200 rounded-xl p-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <ArrowDownLeft size={18} className="text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Earn</p>
                <p className="text-lg font-semibold text-gray-900">
                  {formatAmount(getTotalEarned())}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-gray-50 border border-gray-200 rounded-xl p-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <ArrowUpRight size={18} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Spent</p>
                <p className="text-lg font-semibold text-gray-900">
                  {formatAmount(getTotalSpent())}
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
            <h2 className="text-lg font-semibold text-gray-900">Recent Transactions</h2>
            <button className="text-sm text-[#f44708] hover:text-[#ff5722] transition-colors">
              View All
            </button>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            {walletData.transactions.length === 0 ? (
              <div className="p-8 text-center">
                <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center mx-auto mb-4">
                  <Wallet size={24} className="text-gray-400" />
                </div>
                <p className="text-gray-600 mb-2">No transactions yet</p>
                <p className="text-sm text-gray-500">Your transaction history will appear here</p>
              </div>
            ) : (
              walletData.transactions.slice(0, 5).map((transaction, index) => (
                <motion.div
                  key={transaction._id}
                  className={`p-4 hover:bg-gray-50 transition-colors ${
                    index !== walletData.transactions.slice(0, 5).length - 1 ? 'border-b border-gray-200' : ''
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        transaction.type === 'deposit' ? 'bg-green-100' : 'bg-red-100'
                      }`}>
                        {getTransactionIcon(transaction.type)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{transaction.description}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <p className="text-xs text-gray-500">{formatDate(transaction.createdAt)}</p>
                          <Badge className={`text-xs px-2 py-0.5 rounded-lg border-0 ${
                            transaction.status === 'success' 
                              ? 'bg-green-100 text-green-700' 
                              : transaction.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {transaction.status === 'success' ? 'Completed' : transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${
                        transaction.type === 'deposit' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.type === 'deposit' ? '+' : '-'}{formatAmount(transaction.amount)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>

        {/* Role-specific insights */}
        {userRole === 'pal' && (
          <motion.div
            className="bg-blue-50 border border-blue-200 rounded-xl p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <TrendingUp size={18} className="text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">Pal Earnings Insight</h3>
                <p className="text-sm text-gray-600 mb-2">
                  You&apos;ve earned {formatAmount(getTotalThisMonth())} this month from {walletData.transactions.filter(t => t.type === 'deposit').length} transactions.
                </p>
                <p className="text-xs text-blue-600">Keep up the great work!</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Payment Methods Quick Access */}
        <motion.div
          className="bg-gray-50 border border-gray-200 rounded-xl p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                <CreditCard size={18} className="text-gray-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Payment Methods</p>
                <p className="text-sm text-gray-600">Manage cards and bank accounts</p>
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
