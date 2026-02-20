import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Package, MapPin, Shield, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Checkbox } from './ui/checkbox';

interface BecomeReceiverScreenProps {
  onBack: () => void;
  onComplete: () => void;
}

export function BecomeReceiverScreen({ onBack, onComplete }: BecomeReceiverScreenProps) {
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleSubmit = () => {
    if (agreedToTerms) {
      onComplete();
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-dark via-darker to-dark flex flex-col">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-500 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-0 -left-40 w-80 h-80 bg-green-500 rounded-full opacity-10 blur-3xl"></div>
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
            <h1 className="text-lg font-semibold text-white">Become a Receiver</h1>
            <p className="text-sm text-gray-400">Receive items conveniently</p>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 relative z-10">
        {/* Hero Section */}
        <motion.div 
          className="bg-linear-to-r from-yellow-500/20 to-green-500/20 border border-yellow-500/30 rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-linear-to-br from-yellow-500 to-green-500 flex items-center justify-center">
              <Package size={32} className="text-white" />
            </div>
            <div>
              <h3 className="text-white text-xl font-bold">Receive Packages</h3>
              <p className="text-yellow-300">Track & confirm deliveries</p>
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
          <h3 className="text-white font-semibold mb-4">Benefits for Receivers</h3>
          <div className="space-y-3">
            {[
              { icon: Package, text: 'Track deliveries in real-time' },
              { icon: MapPin, text: 'Flexible pickup locations with Proxies' },
              { icon: Shield, text: 'Verify items before accepting' },
              { icon: CheckCircle, text: 'Confirm receipt securely' }
            ].map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-yellow-500/20 flex items-center justify-center shrink-0">
                    <Icon size={20} className="text-yellow-400" />
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
              { step: '1', text: 'Get notified when items are being sent to you' },
              { step: '2', text: 'Track delivery progress in real-time' },
              { step: '3', text: 'Choose direct delivery or proxy pickup' },
              { step: '4', text: 'Verify and confirm item receipt' }
            ].map((item) => (
              <div key={item.step} className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-white font-bold shrink-0">
                  {item.step}
                </div>
                <p className="text-gray-300 pt-1">{item.text}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Info Card */}
        <motion.div 
          className="bg-green-500/20 border border-green-500/30 rounded-2xl p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h4 className="font-medium text-green-300 mb-2">Good to Know:</h4>
          <ul className="text-sm text-green-200 space-y-1 list-disc list-inside">
            <li>No cost to receive items - sender pays</li>
            <li>Communicate with sender & Pal via in-app chat</li>
            <li>Optional: Use nearby Proxies for convenient pickup</li>
            <li>Verify items match description before confirming</li>
          </ul>
        </motion.div>

        {/* Terms */}
        <motion.div 
          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-start space-x-3">
            <Checkbox
              checked={agreedToTerms}
              onCheckedChange={(checked: boolean) => setAgreedToTerms(checked as boolean)}
              className="mt-1 data-[state=checked]:bg-yellow-500 data-[state=checked]:border-yellow-500"
            />
            <label className="text-sm text-gray-300 cursor-pointer flex-1" onClick={() => setAgreedToTerms(!agreedToTerms)}>
              I agree to the <span className="text-yellow-400 font-medium">Receiver Terms & Conditions</span> and understand delivery confirmation procedures
            </label>
          </div>
        </motion.div>

        {/* Submit Button */}
        <motion.button
          onClick={handleSubmit}
          disabled={!agreedToTerms}
          className="w-full bg-linear-to-r from-yellow-500 to-green-500 hover:from-yellow-600 hover:to-green-600 text-white py-4 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          whileHover={agreedToTerms ? { scale: 1.02 } : {}}
          whileTap={agreedToTerms ? { scale: 0.98 } : {}}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <span>Start Receiving Items</span>
          <ArrowRight size={20} />
        </motion.button>
      </div>
    </div>
  );
}
