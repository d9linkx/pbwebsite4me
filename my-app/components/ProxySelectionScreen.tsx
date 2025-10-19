'use client'
import React, { useState } from 'react';
import { ArrowLeft, MapPin, Star, Navigation, Phone, Clock, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from './ui/badge';

interface Proxy {
  id: string;
  name: string;
  address: string;
  distance: string;
  rating: number;
  reviews: number;
  storageHours: string;
  phone: string;
  verified: boolean;
}

import { DeliveryJob, User } from '../types';

interface ProxySelectionScreenProps {
  job: DeliveryJob | null;
  user: User | null;
  onBack: () => void;
  onSelectProxy: (proxyId: string) => void;
}

export function ProxySelectionScreen({ job, user, onBack, onSelectProxy }: ProxySelectionScreenProps) {
  const [selectedProxyId, setSelectedProxyId] = useState<string | null>(null);

  const nearbyProxies: Proxy[] = [
    {
      id: 'proxy-1',
      name: 'Joe\'s Convenience Store',
      address: '123 Main St, Ikeja, Lagos',
      distance: '0.5 km',
      rating: 4.8,
      reviews: 142,
      storageHours: '8am - 10pm',
      phone: '+234 801 234 5678',
      verified: true
    },
    {
      id: 'proxy-2',
      name: 'Sarah\'s Pharmacy',
      address: '456 Allen Ave, Ikeja, Lagos',
      distance: '1.2 km',
      rating: 4.9,
      reviews: 98,
      storageHours: '7am - 11pm',
      phone: '+234 802 345 6789',
      verified: true
    },
    {
      id: 'proxy-3',
      name: 'Mike\'s Hardware Shop',
      address: '789 Opebi Rd, Ikeja, Lagos',
      distance: '1.8 km',
      rating: 4.6,
      reviews: 67,
      storageHours: '9am - 8pm',
      phone: '+234 803 456 7890',
      verified: false
    }
  ];

  const handleConfirm = () => {
    if (selectedProxyId) {
      onSelectProxy(selectedProxyId);
    }
  };

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
            <h1 className="text-lg font-semibold text-white">Select Proxy</h1>
            <p className="text-sm text-gray-400">Choose a convenient pickup location</p>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 relative z-10">
        {/* Dropoff Location */}
        <motion.div 
          className="bg-blue-500/20 border border-blue-500/30 rounded-2xl p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-start space-x-3">
            <MapPin size={20} className="text-blue-400 mt-0.5" />
            <div>
              <p className="text-sm text-blue-300">Delivery Destination:</p>
              <p className="text-white font-medium">{job?.dropoffLocation || 'Unknown location'}</p>
            </div>
          </div>
        </motion.div>

        {/* Proxies List */}
        <div className="space-y-4">
          <h3 className="text-white font-semibold">Nearby Proxies</h3>
          
          {nearbyProxies.map((proxy, index) => (
            <motion.div
              key={proxy.id}
              onClick={() => setSelectedProxyId(proxy.id)}
              className={`bg-white/10 backdrop-blur-sm border rounded-2xl p-5 cursor-pointer transition-all ${
                selectedProxyId === proxy.id
                  ? 'border-purple-500 bg-purple-500/10'
                  : 'border-white/20 hover:border-white/40'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="text-white font-semibold">{proxy.name}</h4>
                    {proxy.verified && (
                      <CheckCircle size={16} className="text-green-400" />
                    )}
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1">
                      <Star size={14} className="text-yellow-400 fill-yellow-400" />
                      <span className="text-yellow-400 text-sm font-medium">{proxy.rating}</span>
                      <span className="text-gray-400 text-sm">({proxy.reviews})</span>
                    </div>
                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">
                      {proxy.distance}
                    </Badge>
                  </div>
                </div>
                {selectedProxyId === proxy.id && (
                  <motion.div
                    className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    <CheckCircle size={16} className="text-white" />
                  </motion.div>
                )}
              </div>

              {/* Address */}
              <div className="flex items-start space-x-2 text-sm mb-3">
                <MapPin size={14} className="text-gray-400 mt-0.5 flex-shrink-0" />
                <p className="text-gray-300">{proxy.address}</p>
              </div>

              {/* Details */}
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center space-x-1">
                  <Clock size={14} className="text-green-400" />
                  <span className="text-gray-300">{proxy.storageHours}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Phone size={14} className="text-blue-400" />
                  <span className="text-gray-300">{proxy.phone}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Info */}
        <motion.div 
          className="bg-yellow-500/20 border border-yellow-500/30 rounded-2xl p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h4 className="font-medium text-yellow-300 mb-2">How it works:</h4>
          <ul className="text-sm text-yellow-200 space-y-1 list-disc list-inside">
            <li>Pal delivers item to selected Proxy</li>
            <li>You receive pickup code via SMS</li>
            <li>Visit Proxy location to collect</li>
            <li>Show code to verify and receive item</li>
          </ul>
        </motion.div>

        {/* Confirm Button */}
        <motion.button
          onClick={handleConfirm}
          disabled={!selectedProxyId}
          className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white py-4 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          whileHover={selectedProxyId ? { scale: 1.02 } : {}}
          whileTap={selectedProxyId ? { scale: 0.98 } : {}}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Navigation size={20} />
          <span>Confirm Proxy Selection</span>
        </motion.button>
      </div>
    </div>
  );
}
