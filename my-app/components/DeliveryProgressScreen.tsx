'use client'
import React, { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Navigation, Phone, Clock, Package, User, CheckCircle, Truck, Timer, MessageCircle, ChevronDown, ChevronUp, Bell, MapPinned } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { DeliveryJob, User as UserType, Screen } from '../types';
import { openGoogleMapsNavigation, calculateDeliveryDeadline } from '../utils/googleMapsUtils';
import { GoogleMapsPreview } from './GoogleMapsPreview';
import { locationUtils } from '../utils/locationService';

interface DeliveryProgressScreenProps {
  job: DeliveryJob | null;
  user: UserType | null;
  onBack: () => void;
  onCompleteDelivery: () => void;
  onCallReceiver: (phoneNumber: string) => void;
  onOpenChat?: (job: DeliveryJob) => void;
  onNavigate?: (screen: Screen) => void;
}

export function DeliveryProgressScreen({
  job,
  user,
  onBack,
  onCompleteDelivery,
  onCallReceiver,
  onOpenChat,
  onNavigate
}: DeliveryProgressScreenProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [totalEstimatedTime, setTotalEstimatedTime] = useState<number>(0);
  const [googleMapsTime, setGoogleMapsTime] = useState<number>(0);
  const [bufferTime, setBufferTime] = useState<number>(0);
  const [showJobDetails, setShowJobDetails] = useState(false);
  
  // GPS PROXIMITY SIMULATION
  const [simulatedDistance, setSimulatedDistance] = useState<number>(2300);
  const [isAutoApproaching, setIsAutoApproaching] = useState(false);
  const [demoMode, setDemoMode] = useState(false);

  // "I'm Here" Feature State
  const [palCurrentLocation, setPalCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isWithinProximity, setIsWithinProximity] = useState(false);
  const [distanceToDestination, setDistanceToDestination] = useState<number>(0);
  const [locationRevealed, setLocationRevealed] = useState(false);

  // Calculate estimated delivery time
  const calculateEstimatedTime = (pickupLocation: string, dropoffLocation: string): number => {
    const deadlineData = calculateDeliveryDeadline(pickupLocation, dropoffLocation);
    setGoogleMapsTime(deadlineData.googleMapsMinutes * 60);
    setBufferTime(deadlineData.bufferMinutes * 60);
    return deadlineData.totalSeconds;
  };

  // Get destination coordinates
  const getDestinationCoordinates = (location: string): { lat: number; lng: number } => {
    const locations: { [key: string]: { lat: number; lng: number } } = {
      'Victoria Island': { lat: 6.4281, lng: 3.4219 },
      'Ikeja': { lat: 6.6018, lng: 3.3515 },
      'Lekki': { lat: 6.4698, lng: 3.5852 },
      'Surulere': { lat: 6.4969, lng: 3.3841 },
      'Yaba': { lat: 6.5158, lng: 3.3707 },
      'Default': { lat: 6.5244, lng: 3.3792 }
    };
    
    const locationKey = Object.keys(locations).find(key => 
      location.toLowerCase().includes(key.toLowerCase())
    );
    
    return locations[locationKey || 'Default'];
  };

  // Simulate Pal's current location
  const simulatePalLocation = () => {
    const destination = getDestinationCoordinates(job?.dropoffLocation || '');
    const offsetKm = simulatedDistance / 1000;
    const offsetDegrees = offsetKm / 111;
    
    return {
      lat: destination.lat - offsetDegrees,
      lng: destination.lng - offsetDegrees
    };
  };

  // Check proximity
  useEffect(() => {
    if (!job) return;
    
    const currentLoc = simulatePalLocation();
    setPalCurrentLocation(currentLoc);
    
    const destination = getDestinationCoordinates(job.dropoffLocation);
    const proximityCheck = locationUtils.isWithinProximity(
      currentLoc.lat,
      currentLoc.lng,
      destination.lat,
      destination.lng,
      10
    );
    
    setIsWithinProximity(proximityCheck.isWithin);
    setDistanceToDestination(proximityCheck.distance);
  }, [simulatedDistance, job]);

  // Handle "I'm Here" button
  const handleImHereClick = () => {
    if (!job || !isWithinProximity) return;
    setLocationRevealed(true);
    alert(`✅ Location revealed! All parties have been notified of your arrival.\n\nYou are ${distanceToDestination}m from the destination.`);
  };

  // Initialize timer
  useEffect(() => {
    if (job && timeRemaining === 0) {
      const estimated = calculateEstimatedTime(job.pickupLocation, job.dropoffLocation);
      setTimeRemaining(estimated);
      setTotalEstimatedTime(estimated);
    }
  }, [job]);

  // Countdown timer
  useEffect(() => {
    if (timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => Math.max(0, prev - 1));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeRemaining]);

  // Auto-approaching simulation
  useEffect(() => {
    if (isAutoApproaching && simulatedDistance > 0) {
      const interval = setInterval(() => {
        setSimulatedDistance(prev => Math.max(0, prev - 50));
      }, 500);
      return () => clearInterval(interval);
    }
  }, [isAutoApproaching, simulatedDistance]);

  if (!job) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#2f2f2f] via-[#1a1a1a] to-[#2f2f2f] flex items-center justify-center p-4">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Package size={48} className="text-gray-400 mx-auto mb-4" />
          <h3 className="text-white mb-2">No Job Selected</h3>
          <p className="text-gray-400 mb-4">Please select a delivery job</p>
          <motion.button
            onClick={onBack}
            className="bg-[#f44708] hover:bg-[#ff5722] text-white px-6 py-3 rounded-xl font-medium flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Go Back
          </motion.button>
        </motion.div>
      </div>
    );
  }

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m ${secs}s`;
  };

  const getProgressPercentage = (): number => {
    if (totalEstimatedTime === 0) return 0;
    return ((totalEstimatedTime - timeRemaining) / totalEstimatedTime) * 100;
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusInfo = () => {
    if (isWithinProximity && locationRevealed) {
      return { status: 'At Destination', color: 'bg-green-500/20 text-green-400 border-green-500/30' };
    } else if (isWithinProximity) {
      return { status: 'Arriving', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' };
    }
    return { status: 'In Transit', color: 'bg-[#f44708]/20 text-[#f44708] border-[#f44708]/30' };
  };

  const statusInfo = getStatusInfo();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2f2f2f] via-[#1a1a1a] to-[#2f2f2f] flex flex-col">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#f44708] rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-0 -left-40 w-80 h-80 bg-blue-500 rounded-full opacity-10 blur-3xl"></div>
      </div>

      {/* Header */}
      <motion.div 
        className="bg-[#2f2f2f] border-b border-white/10 p-6 sticky top-0 z-20 shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between mb-4">
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
              <h1 className="text-lg font-semibold text-white">Delivery in Progress</h1>
              <p className="text-sm text-gray-400">En route to destination</p>
            </div>
          </div>
          
          <Badge className={`rounded-xl px-3 py-1 text-sm border ${statusInfo.color}`}>
            <Truck size={14} className="mr-1" />
            {statusInfo.status}
          </Badge>
        </div>
        
        {/* ETA Section */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-[#f44708] flex items-center justify-center">
                <Clock size={20} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">Delivery Deadline</p>
                <p className="text-xs text-gray-400">
                  Maps: {Math.floor(googleMapsTime / 60)}min + Buffer: {Math.floor(bufferTime / 60)}min
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-[#f44708]">
                {formatTime(timeRemaining)}
              </p>
              <p className="text-xs text-gray-400">remaining</p>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-xs text-gray-400 mb-2">
              <span>Journey Progress</span>
              <span>{Math.round(getProgressPercentage())}% complete</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-[#f44708] to-green-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${getProgressPercentage()}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 relative z-10">
        {/* Google Maps Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <GoogleMapsPreview job={job} userRole="pal" showPalLocation={true} />
        </motion.div>

        {/* "I'm Here" Proximity Card */}
        <motion.div 
          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <MapPinned size={24} className={isWithinProximity ? 'text-green-400' : 'text-blue-400'} />
                <div>
                  <p className="font-medium text-white">
                    {isWithinProximity ? '✅ You\'re here!' : '📍 Approaching destination'}
                  </p>
                  <p className="text-sm text-gray-400">
                    Distance: {locationUtils.formatProximityDistance(distanceToDestination)}
                  </p>
                </div>
              </div>
              {isWithinProximity && !locationRevealed && (
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                  Within range
                </Badge>
              )}
              {locationRevealed && (
                <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                  Location shared
                </Badge>
              )}
            </div>

            {/* Privacy Info */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-gray-400">
              {!locationRevealed ? (
                <p>
                  🔒 <span className="font-medium text-white">Privacy mode:</span> Your exact location is hidden. Click &quot;I&apos;m Here&quot; when within 10m to reveal your location.
                </p>
              ) : (
                <p>
                  ✅ <span className="font-medium text-white">Location revealed:</span> All parties can now see your exact location.
                </p>
              )}
            </div>

            {/* "I'm Here" Button */}
            <motion.button
              onClick={handleImHereClick}
              disabled={!isWithinProximity || locationRevealed}
              className={`w-full py-3 rounded-xl font-medium flex items-center justify-center transition-all ${
                isWithinProximity && !locationRevealed
                  ? 'bg-[#2f2f2f] hover:bg-[#1a1a1a] text-white'
                  : 'bg-white/10 text-gray-500 cursor-not-allowed'
              }`}
              whileHover={isWithinProximity && !locationRevealed ? { scale: 1.02 } : {}}
              whileTap={isWithinProximity && !locationRevealed ? { scale: 0.98 } : {}}
            >
              <MapPinned size={18} className="mr-2" />
              {locationRevealed 
                ? 'Location Shared ✓' 
                : isWithinProximity 
                  ? 'I\'m Here - Reveal Location' 
                  : `Get within 10m to enable (${Math.round(distanceToDestination)}m away)`}
            </motion.button>

            {/* Demo Controls */}
            {demoMode && (
              <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-xl p-3">
                <p className="text-xs text-yellow-400 mb-2 font-medium">🎮 Demo Controls</p>
                <motion.button
                  onClick={() => setIsAutoApproaching(!isAutoApproaching)}
                  className={`w-full text-sm py-2 rounded-lg font-medium ${
                    isAutoApproaching 
                      ? 'bg-red-500 hover:bg-red-600 text-white' 
                      : 'bg-green-500 hover:bg-green-600 text-white'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isAutoApproaching ? '⏸ Stop Approaching' : '▶️ Auto-Approach Destination'}
                </motion.button>
                <p className="text-xs text-yellow-400 mt-2 text-center">
                  Current: {simulatedDistance}m from destination
                </p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Delivery Info Card */}
        <motion.div 
          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-white">Delivery Information</h2>
            <motion.button
              onClick={() => setShowJobDetails(!showJobDetails)}
              className="text-[#f44708] hover:text-[#ff5722] transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {showJobDetails ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </motion.button>
          </div>

          <AnimatePresence>
            {showJobDetails && (
              <motion.div 
                className="space-y-4"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <div className="flex items-start space-x-3">
                  <Package size={18} className="text-[#f44708] mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-medium text-white">{job.title}</p>
                    <p className="text-sm text-gray-400 mt-1">
                      Size: {job.itemSize} • Weight: {job.weight || 'N/A'}
                    </p>
                    {job.notes && (
                      <p className="text-sm text-gray-400 mt-2 italic">
                        Note: {job.notes}
                      </p>
                    )}
                  </div>
                </div>

                <div className="border-t border-white/10 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Delivery Fee:</span>
                    <span className="font-bold text-white">
                      {formatAmount(job.acceptedBidAmount || job.value)}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Contact Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <motion.button
            onClick={() => onCallReceiver(job.receiverPhone || '+234 800 000 0000')}
            className="bg-white/10 hover:bg-white/20 border-2 border-white/20 text-white rounded-xl py-3 flex items-center justify-center font-medium transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Phone size={18} className="mr-2" />
            Call Receiver
          </motion.button>

          {onOpenChat && (
            <motion.button
              onClick={() => onOpenChat(job)}
              className="bg-white/10 hover:bg-white/20 border-2 border-white/20 text-white rounded-xl py-3 flex items-center justify-center font-medium transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <MessageCircle size={18} className="mr-2" />
              Chat
            </motion.button>
          )}
        </div>

        {/* Complete Delivery Button */}
        <motion.button
          onClick={() => {
            setIsLoading(true);
            setTimeout(() => {
              onCompleteDelivery();
              setIsLoading(false);
            }, 1000);
          }}
          disabled={isLoading}
          className="w-full bg-[#2f2f2f] hover:bg-[#1a1a1a] text-white rounded-xl py-4 font-semibold flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          whileHover={!isLoading ? { scale: 1.02 } : {}}
          whileTap={!isLoading ? { scale: 0.98 } : {}}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Processing...
            </>
          ) : (
            <>
              <CheckCircle size={20} className="mr-2" />
              Arrive & Complete Delivery
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
}
