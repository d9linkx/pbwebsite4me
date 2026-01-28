'use client'
import React from 'react';
import { ArrowLeft, MapPin, CheckCircle, Package } from 'lucide-react';
import { motion } from 'framer-motion';
import { DeliveryJob, User } from '../types';

interface ArrivalConfirmationScreenProps {
  job: DeliveryJob | null;
  user: User | null;
  onBack: () => void;
  onConfirmArrival: () => void;
  onCallReceiver?: (phoneNumber: string) => void;
  onOpenChat?: (job: DeliveryJob) => void;
  onUploadPhoto?: () => void;
  onScanQR?: () => void;
  onGenerateOTP?: () => void;
}

export function ArrivalConfirmationScreen({
  job,
  user: _user, // eslint-disable-line @typescript-eslint/no-unused-vars
  onBack,
  onConfirmArrival,
  onCallReceiver: _onCallReceiver, // eslint-disable-line @typescript-eslint/no-unused-vars
  onOpenChat: _onOpenChat, // eslint-disable-line @typescript-eslint/no-unused-vars
  onUploadPhoto: _onUploadPhoto, // eslint-disable-line @typescript-eslint/no-unused-vars
  onScanQR: _onScanQR, // eslint-disable-line @typescript-eslint/no-unused-vars
  onGenerateOTP: _onGenerateOTP // eslint-disable-line @typescript-eslint/no-unused-vars
}: ArrivalConfirmationScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-dark via-darker to-dark flex flex-col">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-500 rounded-full opacity-10 blur-3xl"></div>
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
            <h1 className="text-lg font-semibold text-white">Arrival Confirmation</h1>
            <p className="text-sm text-gray-400">Confirm your arrival</p>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 relative z-10">
        {/* Success Icon */}
        <motion.div
          className="text-center py-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <motion.div
            className="w-32 h-32 rounded-full bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center mx-auto mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <MapPin size={64} className="text-white" />
          </motion.div>
          <h2 className="text-white text-2xl font-bold mb-2">You&apos;ve Arrived!</h2>
          <p className="text-gray-400">Confirm your arrival at the destination</p>
        </motion.div>

        {/* Delivery Info */}
        <motion.div 
          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center space-x-3 mb-4">
            <Package size={24} className="text-green-400" />
            <h3 className="text-white font-semibold">Delivery Details</h3>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-gray-400 text-sm">Item</p>
              <p className="text-white font-medium">{job?.title || 'N/A'}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Dropoff Location</p>
              <p className="text-white">{job?.dropoffLocation || 'N/A'}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Receiver</p>
              <p className="text-white">{job?.receiverName || 'N/A'}</p>
            </div>
          </div>
        </motion.div>

        {/* Next Steps */}
        <motion.div 
          className="bg-blue-500/20 border border-blue-500/30 rounded-2xl p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h4 className="font-medium text-blue-300 mb-2">Next Steps:</h4>
          <ul className="text-sm text-blue-200 space-y-1 list-decimal list-inside">
            <li>Confirm your arrival</li>
            <li>Contact the receiver</li>
            <li>Hand over the item</li>
            <li>Get handover confirmation</li>
          </ul>
        </motion.div>

        {/* Confirm Button */}
        <motion.button
          onClick={onConfirmArrival}
          className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white py-4 rounded-xl font-semibold flex items-center justify-center space-x-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <CheckCircle size={20} />
          <span>Confirm Arrival</span>
        </motion.button>
      </div>
    </div>
  );
}
