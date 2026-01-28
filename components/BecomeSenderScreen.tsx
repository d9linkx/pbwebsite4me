import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Package, Clock, Shield, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';
import { Checkbox } from './ui/checkbox';

interface BecomeSenderScreenProps {
  onBack: () => void;
  onComplete: () => void;
}

export function BecomeSenderScreen({ onBack, onComplete }: BecomeSenderScreenProps) {
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleSubmit = () => {
    if (agreedToTerms) {
      onComplete();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark via-darker to-dark flex flex-col">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-0 -left-40 w-80 h-80 bg-purple-500 rounded-full opacity-10 blur-3xl"></div>
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
            <h1 className="text-lg font-semibold text-white">Become a Sender</h1>
            <p className="text-sm text-gray-400">Send items easily & securely</p>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 relative z-10">
        {/* Hero Section */}
        <motion.div 
          className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
              <Package size={32} className="text-white" />
            </div>
            <div>
              <h3 className="text-white text-xl font-bold">Send Anything</h3>
              <p className="text-blue-300">Documents to groceries</p>
            </div>
          </div>
        </motion.div>

        {/* Benefits */}
        <motion.div 
          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-white font-semibold mb-4">Why Use Prawnbox?</h3>
          <div className="space-y-3">
            {[
              { icon: Clock, text: 'Fast delivery - same day service available' },
              { icon: DollarSign, text: 'Competitive rates - you set the budget' },
              { icon: Shield, text: 'Escrow protection - pay only on delivery' },
              { icon: Package, text: 'Track deliveries in real-time' }
            ].map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <Icon size={20} className="text-blue-400" />
                  </div>
                  <p className="text-gray-300">{benefit.text}</p>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* How It Works */}
        <motion.div 
          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-white font-semibold mb-4">How It Works</h3>
          <div className="space-y-4">
            {[
              { step: '1', text: 'Post your delivery with pickup & dropoff details' },
              { step: '2', text: 'Receive bids from verified Pals' },
              { step: '3', text: 'Choose your preferred Pal' },
              { step: '4', text: 'Track delivery and confirm receipt' }
            ].map((item) => (
              <div key={item.step} className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                  {item.step}
                </div>
                <p className="text-gray-300 pt-1">{item.text}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Terms */}
        <motion.div 
          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-start space-x-3">
            <Checkbox
              checked={agreedToTerms}
              onCheckedChange={(checked: boolean) => setAgreedToTerms(checked)}
              className="mt-1 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
            />
            <label className="text-sm text-gray-300 cursor-pointer flex-1" onClick={() => setAgreedToTerms(!agreedToTerms)}>
              I agree to the <span className="text-blue-400 font-medium">Sender Terms & Conditions</span> and understand the platform&apos;s delivery policies
            </label>
          </div>
        </motion.div>

        {/* Submit Button */}
        <motion.button
          onClick={handleSubmit}
          disabled={!agreedToTerms}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-4 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          whileHover={agreedToTerms ? { scale: 1.02 } : {}}
          whileTap={agreedToTerms ? { scale: 0.98 } : {}}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <span>Start Sending Items</span>
          <ArrowRight size={20} />
        </motion.button>
      </div>
    </div>
  );
}
