"use client";
import React, { useState } from 'react';
import { ArrowLeft, DollarSign, CreditCard, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Input } from './ui/input';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/Select';
import { User } from '../types';

interface BankDetails {
  bank: string;
  accountNumber: string;
  accountName: string;
}

interface WalletWithdrawScreenProps {
  user: User | null;
  onBack: () => void;
  onWithdrawComplete: (amount: number, bankDetails?: BankDetails) => void;
}

export function WalletWithdrawScreen({ user, onBack, onWithdrawComplete }: WalletWithdrawScreenProps) {
  const [amount, setAmount] = useState('');
  const [bank, setBank] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const formatAmount = (value: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const availableBalance = user?.walletBalance || 0;
  const withdrawAmount = parseFloat(amount) || 0;
  const fee = withdrawAmount >= 5000 ? 0 : 50;
  const amountToReceive = withdrawAmount;

  const handleWithdraw = () => {
    if (withdrawAmount < 1000 || withdrawAmount > availableBalance || !bank || !accountNumber) {
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      onWithdrawComplete(withdrawAmount, {
        bank,
        accountNumber,
        accountName
      });
    }, 2000);
  };

  const canWithdraw = withdrawAmount >= 1000 && withdrawAmount <= availableBalance && bank && accountNumber;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <motion.div
        className="bg-white border-b border-gray-200 p-6 sticky top-0 z-20 shadow-sm"
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
            <h1 className="text-lg font-semibold text-gray-900">Withdraw Funds</h1>
            <p className="text-sm text-gray-500">Transfer to your bank account</p>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 relative z-10">
        {/* Balance Card */}
        <motion.div
          className="bg-gradient-to-r from-primary to-primary-hover text-white rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-white/80 text-sm mb-2">Available Balance</p>
          <p className="text-4xl font-bold text-white">{formatAmount(availableBalance)}</p>
        </motion.div>

        {/* Amount Input */}
        <motion.div
          className="bg-gray-50 border border-gray-200 rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <label className="flex items-center space-x-2 text-gray-900 font-semibold mb-3">
            <DollarSign size={20} className="text-green-600" />
            <span>Withdrawal Amount</span>
          </label>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="bg-white border-gray-200 text-gray-900 text-2xl font-bold placeholder-gray-400 focus:border-green-500 mb-2"
          />
          <p className="text-gray-600 text-sm">
            Min: ₦1,000 • Max: {formatAmount(availableBalance)}
          </p>

          {/* Quick Amount Buttons */}
          <div className="grid grid-cols-3 gap-2 mt-4">
            {[5000, 10000, 20000].map((preset) => (
              <motion.button
                key={preset}
                onClick={() => setAmount(preset.toString())}
                disabled={preset > availableBalance}
                className="py-2 rounded-xl bg-white hover:bg-gray-100 border border-gray-200 text-gray-900 text-sm disabled:opacity-30"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {formatAmount(preset)}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Bank Details */}
        <motion.div
          className="bg-gray-50 border border-gray-200 rounded-2xl p-6 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-gray-900 font-semibold flex items-center">
            <CreditCard size={20} className="mr-2 text-blue-600" />
            Bank Details
          </h3>

          <div>
            <label className="text-sm text-gray-600 mb-2 block">Bank</label>
            <Select value={bank} onValueChange={setBank}>
              <SelectTrigger className="bg-white border-gray-200 text-gray-900">
                <SelectValue placeholder="Select your bank" />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-200 text-gray-900">
                <SelectItem value="gtbank">GTBank</SelectItem>
                <SelectItem value="access">Access Bank</SelectItem>
                <SelectItem value="zenith">Zenith Bank</SelectItem>
                <SelectItem value="first">First Bank</SelectItem>
                <SelectItem value="uba">UBA</SelectItem>
                <SelectItem value="fidelity">Fidelity Bank</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm text-gray-600 mb-2 block">Account Number</label>
            <Input
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              placeholder="0123456789"
              maxLength={10}
              className="bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 mb-2 block">Account Name</label>
            <Input
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              placeholder="John Doe"
              className="bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-blue-500"
            />
          </div>
        </motion.div>

        {/* Summary */}
        {withdrawAmount > 0 && (
          <motion.div
            className="bg-gray-50 border border-gray-200 rounded-2xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3 className="text-gray-900 font-semibold mb-4">Transaction Summary</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Withdrawal Amount:</span>
                <span className="text-gray-900">{formatAmount(withdrawAmount)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Transaction Fee:</span>
                <span className="text-gray-900">{formatAmount(fee)}</span>
              </div>
              <div className="h-px bg-gray-200"></div>
              <div className="flex items-center justify-between">
                <span className="text-gray-900 font-semibold">You&apos;ll Receive:</span>
                <span className="text-2xl font-bold text-green-600">{formatAmount(amountToReceive)}</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Info */}
        <motion.div
          className="bg-blue-50 border border-blue-200 rounded-2xl p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h4 className="font-medium text-blue-900 mb-2 flex items-center">
            <AlertCircle size={18} className="mr-2" />
            Important:
          </h4>
          <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
            <li>Withdrawals under ₦5,000 incur a ₦50 fee</li>
            <li>Funds arrive within 24 hours</li>
            <li>Ensure bank details are correct</li>
            <li>Minimum withdrawal: ₦1,000</li>
          </ul>
        </motion.div>

        {/* Withdraw Button */}
        <motion.button
          onClick={handleWithdraw}
          disabled={!canWithdraw || isProcessing}
          className="w-full bg-primary hover:bg-primary-hover text-white py-4 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          whileHover={canWithdraw ? { scale: 1.02 } : {}}
          whileTap={canWithdraw ? { scale: 0.98 } : {}}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {isProcessing ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Processing...</span>
            </>
          ) : (
            <>
              <CheckCircle size={20} />
              <span>Withdraw {withdrawAmount > 0 ? formatAmount(withdrawAmount) : 'Funds'}</span>
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
}
