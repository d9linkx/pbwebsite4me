'use client'
import React, { useState } from 'react';
import { ArrowLeft, DollarSign, Percent, Calendar, Shield, CheckCircle, AlertTriangle, CreditCard, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Input } from './ui/input';
import { Slider } from './ui/slider';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { User } from '../types';

interface SponsorUserConfirmationScreenProps {
  user: User | null;
  selectedUserId: string;
  selectedUserName: string;
  onBack: () => void;
  onConfirm: (amount: number, paymentMethod: string, message: string, sponsorPercentage: number, duration: number) => void;
}

export function SponsorUserConfirmationScreen({ 
  user, 
  selectedUserId,
  selectedUserName,
  onBack, 
  onConfirm 
}: SponsorUserConfirmationScreenProps) {
  const [amount, setAmount] = useState('25000');
  const [commission, setCommission] = useState([15]);
  const [duration, setDuration] = useState([90]);
  const [paymentMethod, setPaymentMethod] = useState('wallet');
  const [message, setMessage] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatAmount = (value: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const calculateProjectedEarnings = () => {
    const amountValue = parseFloat(amount) || 0;
    const commissionValue = commission[0];
    // Estimate: assume 80% of funds will be used over the period
    const estimatedUsage = amountValue * 0.8;
    return Math.round(estimatedUsage * (commissionValue / 100));
  };

  const handleConfirm = () => {
    const amountValue = parseFloat(amount);
    if (!amountValue || !agreedToTerms) return;

    setIsSubmitting(true);
    setTimeout(() => {
      onConfirm(amountValue, paymentMethod, message, commission[0], duration[0]);
    }, 2000);
  };

  const canSubmit = parseFloat(amount) >= 10000 && agreedToTerms;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2f2f2f] via-[#1a1a1a] to-[#2f2f2f] flex flex-col">
      {/* Background Elements */}
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
            <h1 className="text-lg font-semibold text-white">Confirm Sponsorship</h1>
            <p className="text-sm text-gray-400">Set terms for {selectedUserName}</p>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 relative z-10">
        {/* User Card */}
        <motion.div 
          className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#f44708] to-[#ff5722] flex items-center justify-center text-white text-2xl font-bold">
              {selectedUserName.charAt(0)}
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg">{selectedUserName}</h3>
              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                ID: #{selectedUserId.slice(0, 8)}
              </Badge>
            </div>
          </div>
        </motion.div>

        {/* Amount Input */}
        <motion.div 
          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <label className="flex items-center space-x-2 text-white font-semibold mb-3">
            <DollarSign size={20} className="text-green-400" />
            <span>Sponsorship Amount</span>
          </label>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="bg-white/10 border-white/20 text-white text-2xl font-bold placeholder-gray-500 focus:border-[#f44708] mb-2"
          />
          <p className="text-gray-400 text-sm">
            Minimum: ₦10,000 • Recommended: ₦20,000 - ₦50,000
          </p>
        </motion.div>

        {/* Commission Rate */}
        <motion.div 
          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <label className="flex items-center justify-between text-white font-semibold mb-4">
            <div className="flex items-center space-x-2">
              <Percent size={20} className="text-purple-400" />
              <span>Commission Rate</span>
            </div>
            <span className="text-2xl text-[#f44708]">{commission[0]}%</span>
          </label>
          <Slider
            value={commission}
            onValueChange={setCommission}
            min={10}
            max={25}
            step={1}
            className="mb-3"
          />
          <div className="flex justify-between text-xs text-gray-400">
            <span>10% (Lower)</span>
            <span>25% (Higher)</span>
          </div>
        </motion.div>

        {/* Duration */}
        <motion.div 
          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <label className="flex items-center justify-between text-white font-semibold mb-4">
            <div className="flex items-center space-x-2">
              <Calendar size={20} className="text-blue-400" />
              <span>Duration</span>
            </div>
            <span className="text-2xl text-[#f44708]">{duration[0]} days</span>
          </label>
          <Slider
            value={duration}
            onValueChange={setDuration}
            min={30}
            max={180}
            step={30}
            className="mb-3"
          />
          <div className="flex justify-between text-xs text-gray-400">
            <span>30 days</span>
            <span>180 days</span>
          </div>
        </motion.div>

        {/* Payment Method */}
        <motion.div 
          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <label className="flex items-center space-x-2 text-white font-semibold mb-3">
            <CreditCard size={20} className="text-blue-400" />
            <span>Payment Method</span>
          </label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full bg-white/10 border border-white/20 text-white rounded-lg p-3 focus:border-[#f44708] focus:outline-none"
          >
            <option value="wallet">Wallet</option>
            <option value="card">Credit/Debit Card</option>
            <option value="bank_transfer">Bank Transfer</option>
          </select>
        </motion.div>

        {/* Message */}
        <motion.div 
          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <label className="flex items-center space-x-2 text-white font-semibold mb-3">
            <MessageCircle size={20} className="text-purple-400" />
            <span>Message (Optional)</span>
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Add a personal message for the sponsored user..."
            className="w-full bg-white/10 border border-white/20 text-white rounded-lg p-3 focus:border-[#f44708] focus:outline-none resize-none"
            rows={3}
          />
        </motion.div>

        {/* Projected Earnings */}
        <motion.div 
          className="bg-green-500/20 border border-green-500/30 rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h4 className="font-medium text-green-300 mb-3">Projected Earnings</h4>
          <div className="text-center">
            <p className="text-4xl font-bold text-green-400 mb-2">
              {formatAmount(calculateProjectedEarnings())}
            </p>
            <p className="text-sm text-green-200">
              Based on {commission[0]}% commission over {duration[0]} days
            </p>
          </div>
        </motion.div>

        {/* Summary */}
        <motion.div 
          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h4 className="font-medium text-white mb-4">Sponsorship Summary</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Sponsored User:</span>
              <span className="text-white font-medium">{selectedUserName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Amount:</span>
              <span className="text-white font-semibold">{formatAmount(parseFloat(amount) || 0)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Commission Rate:</span>
              <span className="text-white font-medium">{commission[0]}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Duration:</span>
              <span className="text-white font-medium">{duration[0]} days</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">End Date:</span>
              <span className="text-white">
                {new Date(Date.now() + duration[0] * 24 * 60 * 60 * 1000).toLocaleDateString()}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Important Info */}
        <motion.div 
          className="bg-yellow-500/20 border border-yellow-500/30 rounded-2xl p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-start space-x-3">
            <AlertTriangle size={20} className="text-yellow-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-yellow-300 mb-2">Important:</h4>
              <ul className="text-sm text-yellow-200 space-y-1 list-disc list-inside">
                <li>Funds are held in secure escrow</li>
                <li>Commission earned on user&apos;s activity only</li>
                <li>Unused funds returned at end of period</li>
                <li>Early termination may incur fees</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Terms Checkbox */}
        <motion.div 
          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="flex items-start space-x-3">
            <Checkbox
              checked={agreedToTerms}
              onCheckedChange={(checked: boolean) => setAgreedToTerms(checked)}
              className="mt-1 data-[state=checked]:bg-[#f44708] data-[state=checked]:border-[#f44708]"
            />
            <label className="text-sm text-gray-300 cursor-pointer" onClick={() => setAgreedToTerms(!agreedToTerms)}>
              I agree to the <span className="text-[#f44708] font-medium">Sponsorship Terms & Conditions</span> and understand that my funds will be held in escrow for the duration of the sponsorship period.
            </label>
          </div>
        </motion.div>

        {/* Confirm Button */}
        <motion.button
          onClick={handleConfirm}
          disabled={!canSubmit || isSubmitting}
          className="w-full bg-[#f44708] hover:bg-[#ff5722] text-white py-4 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          whileHover={canSubmit ? { scale: 1.02 } : {}}
          whileTap={canSubmit ? { scale: 0.98 } : {}}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Processing...</span>
            </>
          ) : (
            <>
              <CheckCircle size={20} />
              <span>Confirm Sponsorship</span>
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
}
