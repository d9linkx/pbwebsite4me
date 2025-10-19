'use client'
import React, { useState } from 'react';
import { ArrowLeft, CreditCard, Lock, Shield, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface CardPaymentScreenProps {
  amount: number;
  purpose: string;
  onBack: () => void;
  onComplete: () => void;
}

export function CardPaymentScreen({ amount, purpose, onBack, onComplete }: CardPaymentScreenProps) {
  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: '',
    pin: ''
  });
  const [currentStep, setCurrentStep] = useState<'card' | 'pin' | 'processing'>('card');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const fee = Math.round(amount * 0.015);
  const total = amount + fee;

  const handleCardSubmit = () => setCurrentStep('pin');
  
  const handlePinSubmit = () => {
    setCurrentStep('processing');
    setTimeout(() => onComplete(), 3000);
  };

  if (currentStep === 'processing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#2f2f2f] via-[#1a1a1a] to-[#2f2f2f] flex items-center justify-center p-6">
        <div className="text-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center mx-auto mb-6">
            <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Processing Payment</h2>
          <p className="text-gray-400">
            Please wait... {formatCurrency(total)}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2f2f2f] via-[#1a1a1a] to-[#2f2f2f] flex flex-col">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full opacity-10 blur-3xl"></div>
      </div>

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
          <div>
            <h1 className="text-lg font-semibold text-white">Card Payment</h1>
            <p className="text-sm text-gray-400">Secure checkout</p>
          </div>
        </div>
      </motion.div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 relative z-10">
        <motion.div 
          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-400">Amount:</span>
            <span className="text-white text-lg font-semibold">{formatCurrency(amount)}</span>
          </div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-400">Fee (1.5%):</span>
            <span className="text-gray-300">{formatCurrency(fee)}</span>
          </div>
          <div className="h-px bg-white/10 mb-4"></div>
          <div className="flex items-center justify-between">
            <span className="text-white font-semibold">Total:</span>
            <span className="text-green-400 text-xl font-bold">{formatCurrency(total)}</span>
          </div>
        </motion.div>

        {currentStep === 'card' ? (
          <motion.div 
            className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-white font-semibold mb-4">Card Details</h3>
            
            <div>
              <Label className="text-gray-400 text-sm">Card Number</Label>
              <Input
                value={cardData.number}
                onChange={(e) => setCardData({...cardData, number: e.target.value})}
                placeholder="0000 0000 0000 0000"
                className="bg-white/10 border-white/20 text-white mt-1"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-400 text-sm">Expiry</Label>
                <Input
                  value={cardData.expiry}
                  onChange={(e) => setCardData({...cardData, expiry: e.target.value})}
                  placeholder="MM/YY"
                  className="bg-white/10 border-white/20 text-white mt-1"
                />
              </div>
              <div>
                <Label className="text-gray-400 text-sm">CVV</Label>
                <Input
                  value={cardData.cvv}
                  onChange={(e) => setCardData({...cardData, cvv: e.target.value})}
                  placeholder="123"
                  type="password"
                  maxLength={3}
                  className="bg-white/10 border-white/20 text-white mt-1"
                />
              </div>
            </div>

            <div>
              <Label className="text-gray-400 text-sm">Cardholder Name</Label>
              <Input
                value={cardData.name}
                onChange={(e) => setCardData({...cardData, name: e.target.value})}
                placeholder="JOHN DOE"
                className="bg-white/10 border-white/20 text-white mt-1"
              />
            </div>

            <motion.button
              onClick={handleCardSubmit}
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white py-4 rounded-xl font-semibold flex items-center justify-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Lock size={20} />
              <span>Continue</span>
            </motion.button>

            <div className="flex items-center justify-center space-x-2 text-gray-400 text-sm">
              <Shield size={16} />
              <span>Secure payment powered by Paystack</span>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3 className="text-white font-semibold mb-4">Enter PIN</h3>
            
            <Input
              value={cardData.pin}
              onChange={(e) => setCardData({...cardData, pin: e.target.value})}
              placeholder="****"
              type="password"
              maxLength={4}
              className="bg-white/10 border-white/20 text-white text-center text-2xl tracking-widest mb-4"
            />

            <motion.button
              onClick={handlePinSubmit}
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white py-4 rounded-xl font-semibold"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Pay {formatCurrency(total)}
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
