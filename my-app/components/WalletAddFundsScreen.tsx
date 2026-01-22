'use client'
import React, { useState } from 'react';
import { ArrowLeft, CreditCard, Building2, Smartphone, Plus, Wallet } from 'lucide-react';
import { motion } from 'framer-motion';
import { Input } from './ui/input';
import { User } from '../types';

interface WalletAddFundsScreenProps {
  user: User | null;
  onBack: () => void;
  onBankTransfer: (amount: number) => void;
  onCardPayment: (amount: number) => void;
  isLoading?: boolean;
}

export function WalletAddFundsScreen({
  user,
  onBack,
  onBankTransfer,
  onCardPayment,
  isLoading = false
}: WalletAddFundsScreenProps) {
  const [amount, setAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState<'card' | 'bank' | 'mobile' | null>(null);

  const quickAmounts = [5000, 10000, 25000, 50000, 100000];

  const formatAmount = (value: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const handleQuickAmount = (value: number) => {
    setAmount(value.toString());
  };

  const handleProceed = () => {
    const numericAmount = parseFloat(amount);
    if (numericAmount > 0 && selectedMethod) {
      if (selectedMethod === 'card') {
        onCardPayment(numericAmount);
      } else if (selectedMethod === 'bank') {
        onBankTransfer(numericAmount);
      } else if (selectedMethod === 'mobile') {
        // Mobile money uses same flow as card payment (Monnify supports mobile payments)
        onCardPayment(numericAmount);
      }
    }
  };

  const paymentMethods = [
    {
      id: 'card',
      name: 'Debit/Credit Card',
      description: 'Visa, Mastercard, Verve',
      icon: CreditCard,
      color: 'blue'
    },
    {
      id: 'bank',
      name: 'Bank Transfer',
      description: 'Direct bank transfer',
      icon: Building2,
      color: 'green'
    },
    {
      id: 'mobile',
      name: 'Mobile Money',
      description: 'Opay, Kuda, PalmPay',
      icon: Smartphone,
      color: 'purple'
    }
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center p-4">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Wallet size={48} className="text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Please log in to add funds</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <motion.div 
        className="bg-white border-b border-gray-200 p-6 shadow-sm"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
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
            <h1 className="text-lg font-semibold text-gray-900">Add Funds</h1>
            <p className="text-sm text-gray-500">Top up your wallet</p>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Current Balance */}
        <motion.div 
          className="bg-white border border-gray-200 rounded-xl p-6 text-center shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-sm text-gray-600 mb-2">Current Balance</p>
          <p className="text-3xl font-bold text-primary">{formatAmount(user.walletBalance || 0)}</p>
        </motion.div>

        {/* Amount Input */}
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter Amount
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl font-semibold">₦</span>
              <Input
                type="number"
                placeholder="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-10 pr-4 py-4 text-xl font-semibold border-2 border-gray-300 rounded-xl focus:border-primary"
              />
            </div>
          </div>

          {/* Quick Amount Buttons */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-3">Quick Select</p>
            <div className="grid grid-cols-3 gap-3">
              {quickAmounts.map((value, index) => (
                <motion.button
                  key={value}
                  onClick={() => handleQuickAmount(value)}
                  className={`py-3 rounded-xl border-2 font-medium transition-all flex items-center justify-center ${
                    amount === value.toString() 
                      ? 'bg-primary text-white border-primary' 
                      : 'bg-white text-gray-700 border-gray-300 hover:border-primary'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  {formatAmount(value)}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Payment Methods */}
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-lg font-semibold text-gray-900">Payment Method</h3>
          <div className="space-y-3">
            {paymentMethods.map((method, index) => {
              const IconComponent = method.icon;
              const isSelected = selectedMethod === method.id;
              
              return (
                <motion.div
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id as 'card' | 'bank' | 'mobile')}
                  className={`p-4 cursor-pointer transition-all rounded-xl border-2 ${
                    isSelected 
                      ? 'border-primary bg-primary text-white shadow-sm' 
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      isSelected ? 'bg-white/20' : 'bg-gray-100'
                    }`}>
                      <IconComponent size={24} className={isSelected ? 'text-white' : 'text-gray-600'} />
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-semibold ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                        {method.name}
                      </h4>
                      <p className={`text-sm ${isSelected ? 'text-white/80' : 'text-gray-600'}`}>
                        {method.description}
                      </p>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      isSelected 
                        ? 'border-white bg-white' 
                        : 'border-gray-300'
                    }`}>
                      {isSelected && (
                        <div className="w-3 h-3 rounded-full bg-primary"></div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Summary & Proceed */}
        {amount && selectedMethod && (
          <motion.div 
            className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Amount to add:</span>
                <span className="font-bold text-xl text-primary">{formatAmount(parseFloat(amount))}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">New balance:</span>
                <span className="font-bold text-xl text-gray-900">
                  {formatAmount((user.walletBalance || 0) + parseFloat(amount))}
                </span>
              </div>
              <div className="pt-4 border-t border-gray-200">
                <motion.button
                  onClick={handleProceed}
                  disabled={!amount || parseFloat(amount) <= 0 || !selectedMethod || isLoading}
                  className="w-full bg-primary hover:bg-[#e03d06] text-white py-4 font-semibold rounded-xl flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  whileHover={amount && selectedMethod && !isLoading ? { scale: 1.02 } : {}}
                  whileTap={amount && selectedMethod && !isLoading ? { scale: 0.98 } : {}}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <Plus size={20} className="mr-2" />
                      Add {formatAmount(parseFloat(amount) || 0)}
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Security Note */}
        <motion.div 
          className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-sm text-blue-700 font-medium">
            🔒 Your payment information is secure and encrypted
          </p>
        </motion.div>
      </div>
    </div>
  );
}
