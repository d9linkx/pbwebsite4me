import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Home, TrendingUp, Shield, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { Input } from './ui/input';
import { Checkbox } from './ui/checkbox';

interface BecomeProxyScreenProps {
  onBack: () => void;
  onComplete: () => void;
}

export function BecomeProxyScreen({ onBack, onComplete }: BecomeProxyScreenProps) {
  const [businessName, setBusinessName] = useState('');
  const [address, setAddress] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleSubmit = () => {
    if (businessName && address && agreedToTerms) {
      onComplete();
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-dark via-darker to-dark flex flex-col">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-0 -left-40 w-80 h-80 bg-blue-500 rounded-full opacity-10 blur-3xl"></div>
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
            <h1 className="text-lg font-semibold text-white">Become a Proxy</h1>
            <p className="text-sm text-gray-400">Hold items for receivers</p>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 relative z-10">
        {/* Hero Section */}
        <motion.div 
          className="bg-linear-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-linear-to-br from-purple-500 to-blue-500 flex items-center justify-center">
              <Home size={32} className="text-white" />
            </div>
            <div>
              <h3 className="text-white text-xl font-bold">Earn Passive Income</h3>
              <p className="text-purple-300">Store items safely</p>
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
          <h3 className="text-white font-semibold mb-4">Why Become a Proxy?</h3>
          <div className="space-y-3">
            {[
              { icon: TrendingUp, text: 'Earn ₦200-500 per item stored' },
              { icon: Clock, text: 'Flexible - accept items when convenient' },
              { icon: Shield, text: 'Secure storage with insurance' },
              { icon: Home, text: 'Work from your home or business' }
            ].map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center shrink-0">
                    <Icon size={20} className="text-purple-400" />
                  </div>
                  <p className="text-gray-300">{benefit.text}</p>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Form */}
        <motion.div 
          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-white font-semibold mb-4">Setup Your Proxy Location</h3>

          <div>
            <label className="text-sm text-gray-400 mb-2 block">Business/Location Name</label>
            <Input
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="e.g., Joe's Shop, My Home"
              className="bg-white/10 border-white/20 text-white placeholder-gray-500 focus:border-purple-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-2 block">Address</label>
            <Input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="e.g., 123 Main St, Ikeja, Lagos"
              className="bg-white/10 border-white/20 text-white placeholder-gray-500 focus:border-purple-500"
            />
          </div>

          <div className="flex items-start space-x-3 pt-2">
            <Checkbox
              checked={agreedToTerms}
              onCheckedChange={(checked: boolean) => setAgreedToTerms(checked as boolean)}
              className="mt-1 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
            />
            <label className="text-sm text-gray-300 cursor-pointer flex-1" onClick={() => setAgreedToTerms(!agreedToTerms)}>
              I agree to the <span className="text-purple-400 font-medium">Proxy Terms & Conditions</span> and understand storage responsibilities
            </label>
          </div>
        </motion.div>

        {/* Requirements */}
        <motion.div 
          className="bg-blue-500/20 border border-blue-500/30 rounded-2xl p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h4 className="font-medium text-blue-300 mb-2">Requirements:</h4>
          <ul className="text-sm text-blue-200 space-y-1 list-disc list-inside">
            <li>Secure storage space (home, office, or shop)</li>
            <li>Available during business hours</li>
            <li>Smartphone for notifications</li>
            <li>Verified identity and location</li>
          </ul>
        </motion.div>

        {/* Submit Button */}
        <motion.button
          onClick={handleSubmit}
          disabled={!businessName || !address || !agreedToTerms}
          className="w-full bg-linear-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white py-4 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          whileHover={businessName && address && agreedToTerms ? { scale: 1.02 } : {}}
          whileTap={businessName && address && agreedToTerms ? { scale: 0.98 } : {}}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <span>Continue to Verification</span>
          <ArrowRight size={20} />
        </motion.button>
      </div>
    </div>
  );
}
