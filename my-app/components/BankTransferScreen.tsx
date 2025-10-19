'use client'
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Copy, Check, Building2, Clock, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

interface BankTransferScreenProps {
  amount: number;
  purpose: string;
  onBack: () => void;
  onComplete: () => void;
}

export function BankTransferScreen({ amount, purpose, onBack, onComplete }: BankTransferScreenProps) {
  const [copied, setCopied] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(900);
  const [isCompleted, setIsCompleted] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const bankDetails = {
    bankName: 'Providus Bank',
    accountNumber: '9012345678',
    accountName: 'Prawnbox Limited',
    reference: `PB${Date.now().toString().slice(-8)}`,
    amount: amount
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const completionTimer = setTimeout(() => {
      setIsCompleted(true);
      setTimeout(() => onComplete(), 2000);
    }, 10000);
    return () => clearTimeout(completionTimer);
  }, [onComplete]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopied(field);
    toast.success(`${field} copied`);
    setTimeout(() => setCopied(null), 2000);
  };

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#2f2f2f] via-[#1a1a1a] to-[#2f2f2f] flex flex-col items-center justify-center p-6">
        <motion.div
          className="w-24 h-24 rounded-full bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          <Check size={48} className="text-white" />
        </motion.div>
        <h2 className="text-2xl font-bold text-white mb-2">Transfer Received!</h2>
        <p className="text-gray-400 text-center mb-6">
          Payment of {formatCurrency(amount)} processed successfully
        </p>
        <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm text-gray-400 mt-3">Updating wallet...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2f2f2f] via-[#1a1a1a] to-[#2f2f2f] flex flex-col">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full opacity-10 blur-3xl"></div>
      </div>

      {/* Header */}
      <motion.div 
        className="bg-[#2f2f2f] border-b border-white/10 p-6 sticky top-0 z-20"
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
          <div className="flex-1">
            <h1 className="text-lg font-semibold text-white">Bank Transfer</h1>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <Clock size={14} />
              <span>Time left: {formatTime(timeLeft)}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 relative z-10">
        {/* Alert */}
        <motion.div 
          className="bg-yellow-500/20 border border-yellow-500/30 rounded-2xl p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-start space-x-3">
            <AlertCircle size={20} className="text-yellow-400 flex-shrink-0 mt-0.5" />
            <p className="text-yellow-200 text-sm">
              Transfer exactly {formatCurrency(amount)} with the reference number provided
            </p>
          </div>
        </motion.div>

        {/* Bank Details */}
        <motion.div 
          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-white font-semibold">Transfer Details</h3>
          
          {[
            { label: 'Bank Name', value: bankDetails.bankName, field: 'Bank' },
            { label: 'Account Number', value: bankDetails.accountNumber, field: 'Account' },
            { label: 'Account Name', value: bankDetails.accountName, field: 'Name' },
            { label: 'Amount', value: formatCurrency(bankDetails.amount), field: 'Amount' },
            { label: 'Reference', value: bankDetails.reference, field: 'Reference' }
          ].map((item, index) => (
            <div key={item.label} className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
              <div>
                <p className="text-gray-400 text-sm">{item.label}</p>
                <p className="text-white font-medium">{item.value}</p>
              </div>
              <motion.button
                onClick={() => copyToClipboard(item.value, item.field)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {copied === item.field ? (
                  <Check size={18} className="text-green-400" />
                ) : (
                  <Copy size={18} className="text-gray-400" />
                )}
              </motion.button>
            </div>
          ))}
        </motion.div>

        {/* Instructions */}
        <motion.div 
          className="bg-blue-500/20 border border-blue-500/30 rounded-2xl p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h4 className="font-medium text-blue-300 mb-2">Instructions:</h4>
          <ol className="text-sm text-blue-200 space-y-1 list-decimal list-inside">
            <li>Open your bank app</li>
            <li>Transfer to the account above</li>
            <li>Use the reference number</li>
            <li>Wait for confirmation</li>
          </ol>
        </motion.div>
      </div>
    </div>
  );
}
