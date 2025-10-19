'use client'
import React, { useState, useEffect } from 'react';
import { CheckCircle, Clock, User, MapPin, Package, Phone, MessageCircle, ArrowRight, Navigation } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from './ui/badge';
import { DeliveryJob, User as Pal } from '../types';

interface PalAcceptanceNotificationScreenProps {
  onReturnToDashboard: () => void;
  onViewMyDeliveries: () => void;
  onCallPal: (phoneNumber: string) => void;
  onChatWithPal: () => void;
  palData: Pal;
  deliveryJob: DeliveryJob;
}

export function PalAcceptanceNotificationScreen({ 
  onReturnToDashboard, 
  onViewMyDeliveries,
  onCallPal,
  onChatWithPal,
  palData, 
  deliveryJob
}: PalAcceptanceNotificationScreenProps) {
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [palStatus, setPalStatus] = useState<'accepted' | 'heading_to_pickup' | 'almost_there'>('accepted');

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);

    const statusTimer1 = setTimeout(() => {
      setPalStatus('heading_to_pickup');
    }, 5000);

    const statusTimer2 = setTimeout(() => {
      setPalStatus('almost_there');
    }, 15000);

    return () => {
      clearInterval(timer);
      clearTimeout(statusTimer1);
      clearTimeout(statusTimer2);
    };
  }, []);

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatTimeElapsed = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusInfo = () => {
    switch (palStatus) {
      case 'heading_to_pickup':
        return {
          text: 'Heading to Pickup Location',
          color: 'blue',
          icon: Navigation
        };
      case 'almost_there':
        return {
          text: 'Almost There!',
          color: 'green',
          icon: MapPin
        };
      default:
        return {
          text: 'Bid Accepted',
          color: 'purple',
          icon: CheckCircle
        };
    }
  };

  const statusInfo = getStatusInfo();
  const StatusIcon = statusInfo.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2f2f2f] via-[#1a1a1a] to-[#2f2f2f] flex flex-col">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 bg-green-500 rounded-full opacity-20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
        <motion.div
          className="absolute bottom-0 -left-40 w-96 h-96 bg-blue-500 rounded-full opacity-15 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.15, 0.25, 0.15]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.5
          }}
        />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 relative z-10">
        {/* Success Animation */}
        <motion.div
          className="text-center py-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <motion.div
            className="w-32 h-32 rounded-full bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center mx-auto mb-6"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              duration: 0.8,
              type: 'spring',
              stiffness: 200
            }}
          >
            <CheckCircle size={64} className="text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold text-white mb-3">Bid Accepted!</h1>
          <p className="text-gray-400 text-lg">{palData?.name || 'Pal'} is on the way</p>
        </motion.div>

        {/* Status Card */}
        <motion.div 
          className={`bg-gradient-to-r from-${statusInfo.color}-500/20 to-${statusInfo.color === 'blue' ? 'purple' : 'green'}-500/20 border border-${statusInfo.color}-500/30 rounded-2xl p-6`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <StatusIcon size={24} className={`text-${statusInfo.color}-400`} />
              <h3 className="text-white font-semibold">{statusInfo.text}</h3>
            </div>
            <Badge className={`bg-${statusInfo.color}-500/20 text-${statusInfo.color}-400 border-${statusInfo.color}-500/30`}>
              {formatTimeElapsed(timeElapsed)}
            </Badge>
          </div>
        </motion.div>

        {/* Pal Info */}
        <motion.div 
          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-white font-semibold mb-4">Your Pal</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center">
                <User size={24} className="text-white" />
              </div>
              <div>
                <p className="text-white font-medium">{palData?.name || 'N/A'}</p>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className="text-yellow-400 text-sm">★</span>
                    ))}
                  </div>
                  <span className="text-gray-400 text-sm">(4.8)</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <motion.button
                onClick={onChatWithPal}
                className="flex items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <MessageCircle size={18} />
                <span>Chat</span>
              </motion.button>

              <motion.button
                onClick={() => onCallPal(palData?.phone || '+234 800 000 0000')}
                className="flex items-center justify-center space-x-2 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Phone size={18} />
                <span>Call</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Delivery Details */}
        <motion.div 
          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-white font-semibold mb-4">Delivery Details</h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <Package size={20} className="text-green-400 mt-0.5" />
              <div>
                <p className="text-gray-400 text-sm">Item</p>
                <p className="text-white">{deliveryJob?.title || 'N/A'}</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <MapPin size={20} className="text-blue-400 mt-0.5" />
              <div>
                <p className="text-gray-400 text-sm">Pickup Location</p>
                <p className="text-white">{deliveryJob?.pickupLocation || 'N/A'}</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <MapPin size={20} className="text-purple-400 mt-0.5" />
              <div>
                <p className="text-gray-400 text-sm">Dropoff Location</p>
                <p className="text-white">{deliveryJob?.dropoffLocation || 'N/A'}</p>
              </div>
            </div>
            <div className="h-px bg-white/10"></div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Delivery Fee:</span>
              <span className="text-green-400 font-semibold text-lg">
                {formatAmount(deliveryJob?.acceptedBidAmount || 0)}
              </span>
            </div>
          </div>
        </motion.div>

        {/* What's Next */}
        <motion.div 
          className="bg-blue-500/20 border border-blue-500/30 rounded-2xl p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h4 className="font-medium text-blue-300 mb-2">What&apos;s Next?</h4>
          <ul className="text-sm text-blue-200 space-y-1 list-decimal list-inside">
            <li>Pal picks up your item</li>
            <li>Track delivery in real-time</li>
            <li>Receive item at dropoff location</li>
            <li>Confirm delivery and rate Pal</li>
          </ul>
        </motion.div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <motion.button
            onClick={onViewMyDeliveries}
            className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white py-4 rounded-xl font-semibold flex items-center justify-center space-x-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Package size={20} />
            <span>Track Delivery</span>
          </motion.button>

          <motion.button
            onClick={onReturnToDashboard}
            className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white py-4 rounded-xl font-semibold flex items-center justify-center space-x-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
          >
            <ArrowRight size={20} />
            <span>Back to Dashboard</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
