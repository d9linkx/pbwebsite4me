'use client'
import React, { useState } from 'react';
import { ArrowLeft, CreditCard, Plus, Trash2, Shield, Building2, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/Dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { PaymentMethod } from '../types';

interface PaymentMethodsScreenProps {
  onBack: () => void;
}

export function PaymentMethodsScreen({ onBack }: PaymentMethodsScreenProps) {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: '1',
      type: 'card',
      last4: '4242',
      brand: 'Visa',
      isDefault: true,
      expiryMonth: 12,
      expiryYear: 2027
    },
    {
      id: '2',
      type: 'card',
      last4: '8888',
      brand: 'Mastercard',
      isDefault: false,
      expiryMonth: 8,
      expiryYear: 2026
    }
  ]);

  const [isAddingCard, setIsAddingCard] = useState(false);
  const [newCardData, setNewCardData] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });

  const handleSetDefault = (id: string) => {
    setPaymentMethods(prev => prev.map(method => ({
      ...method,
      isDefault: method.id === id
    })));
  };

  const handleRemoveMethod = (id: string) => {
    setPaymentMethods(prev => prev.filter(method => method.id !== id));
  };

  const handleAddCard = () => {
    const newMethod: PaymentMethod = {
      id: Date.now().toString(),
      type: 'card',
      last4: newCardData.number.slice(-4),
      brand: 'Visa',
      isDefault: paymentMethods.length === 0,
      expiryMonth: parseInt(newCardData.expiry.split('/')[0]),
      expiryYear: parseInt('20' + newCardData.expiry.split('/')[1])
    };

    setPaymentMethods(prev => [...prev, newMethod]);
    setIsAddingCard(false);
    setNewCardData({ number: '', expiry: '', cvv: '', name: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex flex-col">
      {/* Dark Header */}
      <motion.div 
        className="bg-gradient-to-r from-[#2f2f2f] to-[#1a1a1a] border-b border-white/10 p-6 shadow-lg"
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
              <h1 className="text-lg font-semibold text-white">Payment Methods</h1>
              <p className="text-sm text-gray-400">Manage your saved payment methods</p>
            </div>
          </div>
          
          <Dialog open={isAddingCard} onOpenChange={setIsAddingCard}>
            <DialogTrigger asChild>
              <motion.button
                className="bg-[#f44708] hover:bg-[#ff5722] text-white px-4 py-2 rounded-xl flex items-center space-x-2 font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Plus size={16} />
                <span>Add</span>
              </motion.button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md mx-4 rounded-2xl">
              <DialogHeader>
                <DialogTitle>Add Payment Method</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="cardNumber" className="text-sm font-medium text-gray-700">Card Number</Label>
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={newCardData.number}
                    onChange={(e) => setNewCardData(prev => ({ ...prev, number: e.target.value }))}
                    className="mt-2 rounded-xl h-12 border-gray-300"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiry" className="text-sm font-medium text-gray-700">Expiry</Label>
                    <Input
                      id="expiry"
                      placeholder="MM/YY"
                      value={newCardData.expiry}
                      onChange={(e) => setNewCardData(prev => ({ ...prev, expiry: e.target.value }))}
                      className="mt-2 rounded-xl h-12 border-gray-300"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv" className="text-sm font-medium text-gray-700">CVV</Label>
                    <Input
                      id="cvv"
                      placeholder="123"
                      value={newCardData.cvv}
                      onChange={(e) => setNewCardData(prev => ({ ...prev, cvv: e.target.value }))}
                      className="mt-2 rounded-xl h-12 border-gray-300"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="cardName" className="text-sm font-medium text-gray-700">Cardholder Name</Label>
                  <Input
                    id="cardName"
                    placeholder="John Doe"
                    value={newCardData.name}
                    onChange={(e) => setNewCardData(prev => ({ ...prev, name: e.target.value }))}
                    className="mt-2 rounded-xl h-12 border-gray-300"
                  />
                </div>
                <div className="flex space-x-3 pt-4">
                  <motion.button
                    onClick={() => setIsAddingCard(false)}
                    className="flex-1 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl py-3 font-medium"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    onClick={handleAddCard}
                    disabled={!newCardData.number || !newCardData.expiry || !newCardData.cvv || !newCardData.name}
                    className="flex-1 bg-[#2f2f2f] hover:bg-[#1a1a1a] text-white rounded-xl py-3 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Add Card
                  </motion.button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </motion.div>

      {/* White Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Security Notice */}
        <motion.div 
          className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-4 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-start space-x-3">
            <Shield size={24} className="text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-blue-900 mb-1">Secure Payments</h4>
              <p className="text-sm text-blue-700">
                Your payment information is encrypted and secure. We never store your full card details.
              </p>
            </div>
          </div>
        </motion.div>

        <h3 className="text-lg font-semibold text-gray-900 mb-4">Saved Payment Methods</h3>
        
        {paymentMethods.length > 0 ? (
          <div className="space-y-4">
            {paymentMethods.map((method, index) => (
              <motion.div
                key={method.id}
                className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-[#f44708]/10 flex items-center justify-center">
                      <CreditCard size={24} className="text-[#f44708]" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-semibold text-gray-900">
                          {method.type === 'card' 
                            ? `${method.brand} •••• ${method.last4}`
                            : `Bank •••• ${method.last4}`
                          }
                        </h4>
                        {method.isDefault && (
                          <Badge className="bg-green-500/20 text-green-700 border-green-500/30">
                            Default
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">
                        {method.type === 'card' && method.expiryMonth && method.expiryYear
                          ? `Expires ${method.expiryMonth}/${method.expiryYear}`
                          : 'Active'
                        }
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {!method.isDefault && (
                      <motion.button
                        onClick={() => handleSetDefault(method.id)}
                        className="p-2 text-[#f44708] hover:bg-[#f44708]/10 rounded-xl"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Star size={20} />
                      </motion.button>
                    )}
                    <motion.button
                      onClick={() => handleRemoveMethod(method.id)}
                      disabled={method.isDefault}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                      whileHover={!method.isDefault ? { scale: 1.1 } : {}}
                      whileTap={!method.isDefault ? { scale: 0.9 } : {}}
                    >
                      <Trash2 size={20} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div 
            className="flex flex-col items-center justify-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-6">
              <CreditCard size={40} className="text-gray-400" />
            </div>
            <h3 className="text-gray-900 font-semibold mb-2">No Payment Methods</h3>
            <p className="text-gray-600 text-center max-w-md mb-6">
              Add a payment method to start sending and receiving deliveries.
            </p>
            <motion.button
              onClick={() => setIsAddingCard(true)}
              className="bg-[#2f2f2f] hover:bg-[#1a1a1a] text-white px-6 py-3 rounded-xl flex items-center space-x-2 font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus size={18} />
              <span>Add Payment Method</span>
            </motion.button>
          </motion.div>
        )}

        {/* Supported Methods */}
        <motion.div 
          className="bg-gray-100 border-2 border-gray-200 rounded-2xl p-6 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h4 className="font-semibold text-gray-900 mb-4">Supported Payment Methods</h4>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                <CreditCard size={24} className="text-gray-600" />
              </div>
              <span className="text-xs text-gray-600 text-center">Credit Cards</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                <CreditCard size={24} className="text-gray-600" />
              </div>
              <span className="text-xs text-gray-600 text-center">Debit Cards</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                <Building2 size={24} className="text-gray-600" />
              </div>
              <span className="text-xs text-gray-600 text-center">Bank Transfer</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
