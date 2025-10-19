import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, TrendingUp, Clock, Shield, Users, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/Select';
import { Checkbox } from './ui/checkbox';

interface BecomePalScreenProps {
  onBack: () => void;
  onComplete: () => void;
}

export function BecomePalScreen({ onBack, onComplete }: BecomePalScreenProps) {
  const [vehicleType, setVehicleType] = useState('');
  const [availability, setAvailability] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleSubmit = () => {
    if (vehicleType && availability && agreedToTerms) {
      onComplete();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2f2f2f] via-[#1a1a1a] to-[#2f2f2f] flex flex-col">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-500 rounded-full opacity-10 blur-3xl"></div>
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
            <h1 className="text-lg font-semibold text-white">Become a Pal</h1>
            <p className="text-sm text-gray-400">Start earning with deliveries</p>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 relative z-10">
        {/* Hero Section */}
        <motion.div 
          className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30 rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center">
              <TrendingUp size={32} className="text-white" />
            </div>
            <div>
              <h3 className="text-white text-xl font-bold">Earn ₦50,000+</h3>
              <p className="text-green-300">per month delivering</p>
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
          <h3 className="text-white font-semibold mb-4">Why Become a Pal?</h3>
          <div className="space-y-3">
            {[
              { icon: Clock, text: 'Flexible schedule - work when you want' },
              { icon: TrendingUp, text: 'Earn competitive rates per delivery' },
              { icon: Shield, text: 'Insurance coverage included' },
              { icon: Users, text: 'Join a trusted community of Pals' }
            ].map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center flex-shrink-0">
                    <Icon size={20} className="text-green-400" />
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
          <h3 className="text-white font-semibold mb-4">Setup Your Profile</h3>

          <div>
            <label className="text-sm text-gray-400 mb-2 block">Vehicle Type</label>
            <Select value={vehicleType} onValueChange={setVehicleType}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Select vehicle type" />
              </SelectTrigger>
              <SelectContent className="bg-[#2f2f2f] border-white/20 text-white">
                <SelectItem value="bicycle">Bicycle</SelectItem>
                <SelectItem value="motorcycle">Motorcycle</SelectItem>
                <SelectItem value="car">Car</SelectItem>
                <SelectItem value="van">Van/Truck</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-2 block">Availability</label>
            <Select value={availability} onValueChange={setAvailability}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Select availability" />
              </SelectTrigger>
              <SelectContent className="bg-[#2f2f2f] border-white/20 text-white">
                <SelectItem value="fulltime">Full-time (6+ hours/day)</SelectItem>
                <SelectItem value="parttime">Part-time (3-6 hours/day)</SelectItem>
                <SelectItem value="weekends">Weekends only</SelectItem>
                <SelectItem value="flexible">Flexible hours</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-start space-x-3 pt-2">
            <Checkbox
              checked={agreedToTerms}
              onCheckedChange={(checked: boolean) => setAgreedToTerms(checked as boolean)}
              className="mt-1 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
            />
            <label className="text-sm text-gray-300 cursor-pointer flex-1" onClick={() => setAgreedToTerms(!agreedToTerms)}>
              I agree to the <span className="text-green-400 font-medium">Pal Terms & Conditions</span> and understand I&apos;ll be subject to background verification
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
            <li>Valid Nigerian ID (NIN, Driver&apos;s License, or Passport)</li>
            <li>Smartphone with internet connection</li>
            <li>Vehicle (bicycle, motorcycle, or car)</li>
            <li>Must be 18 years or older</li>
          </ul>
        </motion.div>

        {/* Submit Button */}
        <motion.button
          onClick={handleSubmit}
          disabled={!vehicleType || !availability || !agreedToTerms}
          className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white py-4 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          whileHover={vehicleType && availability && agreedToTerms ? { scale: 1.02 } : {}}
          whileTap={vehicleType && availability && agreedToTerms ? { scale: 0.98 } : {}}
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
