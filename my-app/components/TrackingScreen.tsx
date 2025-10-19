'use client';
import React, { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Phone, MessageCircle, Clock, Package, User, Navigation, ChevronDown, ChevronUp, Edit3, AlertCircle, Map, Save, X, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { DeliveryJob, UserRole } from '../types';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './ui/collapsible';

interface TrackingScreenProps {
  job: DeliveryJob | null;
  onBack: () => void;
  onDeliveryComplete: (job: DeliveryJob) => void;
  onOpenChat: () => void;
  onCall: (phone: string) => void;
  userRole: UserRole;
  onStartPickup?: () => void;
  onReceiverUnavailable?: () => void;
  onEditReceiver?: () => void;
  onJobUpdate?: (job: DeliveryJob) => void;
}

// Helper function to calculate route estimates (same as AvailableJobsScreen)
const calculateRouteEstimates = (pickupLocation: string, dropoffLocation: string) => {
  // Simple distance estimation based on location names
  const estimateDistance = () => {
    // Mock distance calculation - in real app would use Google Maps API
    const baseDist = Math.random() * 15 + 5; // 5-20 km
    return `${baseDist.toFixed(1)} km`;
  };

  const estimateTime = () => {
    // Mock time calculation based on distance
    const baseTime = Math.random() * 30 + 15; // 15-45 minutes
    return `${Math.floor(baseTime)} mins`;
  };

  return {
    distance: estimateDistance(),
    estimatedTime: estimateTime(),
    estimatedMinutes: Math.floor(Math.random() * 30 + 15) // Return numeric value for timer
  };
};

export function TrackingScreen({ 
  job, 
  onBack, 
  onDeliveryComplete, 
  onOpenChat, 
  onCall, 
  userRole,
  onStartPickup,
  onReceiverUnavailable,
  onEditReceiver,
  onJobUpdate
}: TrackingScreenProps) {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isStagesOpen, setIsStagesOpen] = useState(false);
  const [isMapExpanded, setIsMapExpanded] = useState(false);
  const [isPackageDetailsOpen, setIsPackageDetailsOpen] = useState(false);
  const [isEditReceiverOpen, setIsEditReceiverOpen] = useState(false);
  const [editedReceiverPhone, setEditedReceiverPhone] = useState('');
  const [editedReceiverName, setEditedReceiverName] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  // Calculate route estimates
  const routeEstimates = job ? calculateRouteEstimates(job.pickupLocation, job.dropoffLocation) : { distance: '0 km', estimatedTime: '0 mins', estimatedMinutes: 0 };
  
  // Timer calculation: estimatedMinutes + 50% of estimatedMinutes
  const totalEstimatedMinutes = routeEstimates.estimatedMinutes + (routeEstimates.estimatedMinutes * 0.5);
  const [estimatedArrival, setEstimatedArrival] = useState(totalEstimatedMinutes);

  if (!job) return null;

  // Timer for tracking delivery time - countdown from total estimated time
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (job.status === 'in-transit' || job.status === 'picked-up') {
      const interval = setInterval(() => {
        setElapsedTime(prev => prev + 1);
        if (estimatedArrival > 0) {
          setEstimatedArrival(prev => Math.max(0, prev - 1/60)); // Decrease by 1 second
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [job.status, estimatedArrival]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hrs > 0) {
      return `${hrs}h ${mins}m ${secs}s`;
    }
    return `${mins}m ${secs}s`;
  };

  const formatEstimatedTime = (minutes: number) => {
    if (minutes < 1) return '< 1 min';
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const mins = Math.floor(minutes % 60);
      return `${hours}h ${mins}m`;
    }
    return `${Math.floor(minutes)} min`;
  };

  // Delivery stages
  const stages = [
    { 
      id: 1, 
      name: 'Order Placed', 
      status: 'completed',
      time: job.createdAt ? new Date(job.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : '--:--'
    },
    { 
      id: 2, 
      name: 'Pal Assigned', 
      status: job.status === 'pending' ? 'pending' : 'completed',
      time: job.acceptedAt ? new Date(job.acceptedAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : '--:--'
    },
    { 
      id: 3, 
      name: 'Package Picked Up', 
      status: job.status === 'picked-up' || job.status === 'in-transit' || job.status === 'delivered' ? 'completed' : 
              job.status === 'assigned' ? 'active' : 'pending',
      time: job.pickupDate ? new Date(job.pickupDate).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : '--:--'
    },
    { 
      id: 4, 
      name: 'In Transit', 
      status: job.status === 'in-transit' ? 'active' : 
              job.status === 'delivered' ? 'completed' : 'pending',
      time: '--:--'
    },
    { 
      id: 5, 
      name: 'Delivered', 
      status: job.status === 'delivered' ? 'completed' : 'pending',
      time: job.deliveredAt ? new Date(job.deliveredAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : '--:--'
    }
  ];

  const getStatusBadgeColor = () => {
    switch (job.status) {
      case 'in-transit':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'picked-up':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'assigned':
        return 'bg-orange-500/20 text-[#f44708] border-orange-500/30';
      case 'delivered':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusText = () => {
    switch (job.status) {
      case 'in-transit':
        return 'In Transit';
      case 'picked-up':
        return 'Picked Up';
      case 'assigned':
        return 'Awaiting Pickup';
      case 'delivered':
        return 'Delivered';
      default:
        return job.status;
    }
  };

  // Role-specific contact person
  const getContactPerson = () => {
    switch (userRole) {
      case 'sender':
        return {
          name: job.selectedPalName || 'Pal',
          phone: '+234 801 234 5678',
          role: 'Your Pal'
        };
      case 'pal':
        return {
          name: job.receiverName || 'Receiver',
          phone: job.receiverPhone || '+234 801 234 5679',
          role: 'Receiver'
        };
      case 'receiver':
        return {
          name: job.selectedPalName || 'Pal',
          phone: '+234 801 234 5678',
          role: 'Your Pal'
        };
      default:
        return null;
    }
  };

  const contactPerson = getContactPerson();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2f2f2f] via-[#1a1a1a] to-[#2f2f2f] pb-6">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#f44708] rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full opacity-10 blur-3xl"></div>
      </div>

      {/* Header */}
      <motion.div 
        className="sticky top-0 z-10 bg-[#2f2f2f] border-b border-white/10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between p-6">
          <motion.button
            onClick={onBack}
            className="flex items-center space-x-2 text-white hover:bg-white/10 rounded-xl px-3 py-2 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </motion.button>
          <h1 className="font-semibold text-white">Live Tracking</h1>
          <div className="w-20" /> {/* Spacer for centering */}
        </div>
      </motion.div>

      <div className="px-6 py-6 space-y-4 max-w-2xl mx-auto relative z-10">
        {/* Status Badge */}
        <motion.div 
          className="flex justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Badge className={`${getStatusBadgeColor()} border px-4 py-2 rounded-full`}>
            {getStatusText()}
          </Badge>
        </motion.div>

        {/* Timer Card */}
        <motion.div 
          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="grid grid-cols-2 gap-4">
            {/* Elapsed Time */}
            <div className="text-center">
              <div className="flex items-center justify-center text-gray-400 mb-2">
                <Clock size={16} className="mr-1" />
                <span className="text-sm">Elapsed Time</span>
              </div>
              <p className="text-2xl font-mono font-semibold text-white">
                {formatTime(elapsedTime)}
              </p>
            </div>

            {/* Estimated Arrival */}
            <div className="text-center border-l border-white/20 pl-4">
              <div className="flex items-center justify-center text-gray-400 mb-2">
                <Navigation size={16} className="mr-1" />
                <span className="text-sm">ETA</span>
              </div>
              <p className={`text-2xl font-mono font-semibold ${
                estimatedArrival <= 5 ? 'text-[#f44708]' : 'text-white'
              }`}>
                {job.status === 'delivered' ? 'Arrived' : formatEstimatedTime(estimatedArrival)}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Route Details Card */}
        <motion.div 
          className="bg-gradient-to-r from-blue-500/20 to-indigo-500/20 border border-blue-500/30 rounded-2xl p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center">
                <Navigation size={18} className="text-white" />
              </div>
              <div>
                <p className="text-xs text-blue-300 font-medium">Route Details</p>
                <p className="text-sm font-semibold text-white">
                  {routeEstimates.distance} • {routeEstimates.estimatedTime}
                </p>
              </div>
            </div>
            
            {/* Toggle Map Button */}
            <motion.button
              onClick={() => setIsMapExpanded(!isMapExpanded)}
              className="flex items-center space-x-1 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-200 border border-white/20 text-blue-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Map size={14} />
              <span className="text-xs font-medium">
                {isMapExpanded ? 'Hide' : 'View'} Map
              </span>
              {isMapExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </motion.button>
          </div>

          {/* Expanded Map View */}
          <AnimatePresence>
            {isMapExpanded && (
              <motion.div 
                className="mt-4 rounded-xl overflow-hidden border-2 border-blue-500/30 shadow-lg"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                {/* Map Iframe */}
                <div className="relative bg-white" style={{ height: '200px' }}>
                  <iframe
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps/embed/v1/directions?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&origin=${encodeURIComponent(job.pickupLocation)}&destination=${encodeURIComponent(job.dropoffLocation)}&mode=driving`}
                  ></iframe>
                  
                  {/* Map overlay info */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                    <div className="flex items-center justify-between text-white text-xs">
                      <div className="flex items-center space-x-2">
                        <Clock size={12} />
                        <span className="font-medium">{routeEstimates.estimatedTime} drive</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Navigation size={12} />
                        <span className="font-medium">{routeEstimates.distance}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons Below Map */}
                <div className="bg-[#2f2f2f] p-2 border-t border-white/10">
                  <motion.button
                    onClick={() => {
                      window.open(
                        `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(job.pickupLocation)}&destination=${encodeURIComponent(job.dropoffLocation)}&travelmode=driving`,
                        '_blank'
                      );
                    }}
                    className="w-full flex items-center justify-center space-x-2 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors text-xs font-medium"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Navigation size={14} />
                    <span>Open in Google Maps</span>
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Package Details Card - Collapsible */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Collapsible
            open={isPackageDetailsOpen}
            onOpenChange={setIsPackageDetailsOpen}
            className="w-full"
          >
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden">
              <CollapsibleTrigger className="w-full">
                <div className="flex items-center justify-between p-6 hover:bg-white/5 transition-colors">
                  <div className="flex items-center space-x-3">
                    <Package size={20} className="text-[#f44708]" />
                    <h3 className="font-semibold text-white">Package Details</h3>
                  </div>
                  {isPackageDetailsOpen ? (
                    <ChevronUp size={20} className="text-gray-400" />
                  ) : (
                    <ChevronDown size={20} className="text-gray-400" />
                  )}
                </div>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <div className="px-6 pb-6 space-y-4 border-t border-white/10">
                  {/* Pickup Location */}
                  <div className="pt-4 pb-4 border-b border-white/10">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                        <MapPin size={18} className="text-green-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-400 mb-1">Pickup Location</p>
                        <p className="font-medium text-white truncate">{job.pickupLocation}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          From: {job.senderName}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Dropoff Location */}
                  <div className="pb-4 border-b border-white/10">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                        <MapPin size={18} className="text-[#f44708]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-400 mb-1">Dropoff Location</p>
                        <p className="font-medium text-white truncate">{job.dropoffLocation}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          To: {job.receiverName || 'Receiver'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Package Info */}
                  <div>
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                        <Package size={18} className="text-blue-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-400 mb-1">Package</p>
                        <p className="font-medium text-white">{job.title}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <Badge variant="outline" className="text-xs bg-white/5 border-white/20 text-gray-300">
                            {job.itemSize}
                          </Badge>
                          {job.category && (
                            <Badge variant="outline" className="text-xs bg-white/5 border-white/20 text-gray-300">
                              {job.category}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>
        </motion.div>

        {/* Edit Receiver Details - Sender Only */}
        {userRole === 'sender' && job.status !== 'delivered' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Collapsible
              open={isEditReceiverOpen}
              onOpenChange={(open: boolean) => {
                setIsEditReceiverOpen(open);
                if (open) {
                  // Pre-fill with current values when opening
                  setEditedReceiverPhone(job.receiverPhone || '');
                  setEditedReceiverName(job.receiverName || '');
                }
              }}
              className="w-full"
            >
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden">
                <CollapsibleTrigger className="w-full">
                  <div className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors">
                    <div className="flex items-center space-x-3">
                      <Edit3 size={18} className="text-white" />
                      <span className="font-medium text-white">Edit Receiver Details</span>
                    </div>
                    {isEditReceiverOpen ? (
                      <ChevronUp size={20} className="text-gray-400" />
                    ) : (
                      <ChevronDown size={20} className="text-gray-400" />
                    )}
                  </div>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <div className="px-6 pb-6 space-y-4 border-t border-white/10 pt-4">
                    <div className="bg-orange-500/20 border border-orange-500/30 rounded-xl p-3">
                      <div className="flex items-start space-x-2">
                        <AlertCircle size={16} className="text-[#f44708] mt-0.5 flex-shrink-0" />
                        <p className="text-xs text-orange-300">
                          Update receiver details if they can&apos;t receive the verification code or need to change contact information.
                        </p>
                      </div>
                    </div>

                    {/* Receiver Name Input */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Receiver Name
                      </label>
                      <Input
                        type="text"
                        value={editedReceiverName}
                        onChange={(e) => setEditedReceiverName(e.target.value)}
                        placeholder="Enter receiver name"
                        className="w-full rounded-xl bg-white/5 border-white/20 text-white placeholder:text-gray-500"
                      />
                    </div>

                    {/* Receiver Phone Input */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Receiver Phone Number *
                      </label>
                      <Input
                        type="tel"
                        value={editedReceiverPhone}
                        onChange={(e) => setEditedReceiverPhone(e.target.value)}
                        placeholder="+234 801 234 5678"
                        className="w-full rounded-xl bg-white/5 border-white/20 text-white placeholder:text-gray-500"
                      />
                      <p className="text-xs text-gray-400 mt-1">
                        This number will receive the verification code for package handover
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <motion.button
                        onClick={() => {
                          setIsEditReceiverOpen(false);
                          setEditedReceiverPhone('');
                          setEditedReceiverName('');
                        }}
                        className="bg-white/10 border border-white/20 text-white hover:bg-white/20 rounded-xl py-2 px-4 flex items-center justify-center space-x-2"
                        disabled={isSaving}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <X size={16} />
                        <span>Cancel</span>
                      </motion.button>
                      <motion.button
                        onClick={async () => {
                          if (!editedReceiverPhone.trim()) {
                            alert('Please enter a valid phone number');
                            return;
                          }

                          setIsSaving(true);
                          
                          // Update the job with new receiver details
                          const updatedJob = {
                            ...job,
                            receiverPhone: editedReceiverPhone.trim(),
                            receiverName: editedReceiverName.trim() || job.receiverName
                          };

                          // Call the update handler if provided
                          if (onJobUpdate) {
                            onJobUpdate(updatedJob);
                          }

                          // Show success feedback card
                          setTimeout(() => {
                            setIsSaving(false);
                            setIsEditReceiverOpen(false);
                            setShowSuccessMessage(true);
                            
                            // Auto-hide after 5 seconds
                            setTimeout(() => {
                              setShowSuccessMessage(false);
                            }, 5000);
                          }, 500);
                        }}
                        className="bg-[#f44708] hover:bg-[#ff5722] text-white rounded-xl py-2 px-4 flex items-center justify-center space-x-2 font-medium disabled:opacity-50"
                        disabled={isSaving}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {isSaving ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Saving...</span>
                          </>
                        ) : (
                          <>
                            <Save size={16} />
                            <span>Save Changes</span>
                          </>
                        )}
                      </motion.button>
                    </div>
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>
          </motion.div>
        )}

        {/* Success Message Card */}
        <AnimatePresence>
          {showSuccessMessage && (
            <motion.div 
              className="bg-green-500/20 border border-green-500/30 rounded-2xl p-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="flex items-start space-x-3">
                <CheckCircle size={20} className="text-green-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-green-300">
                    Receiver details updated successfully!
                  </p>
                  <p className="text-xs text-green-400 mt-1">
                    Your Pal will be notified of the changes.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Contact & Chat Section */}
        {contactPerson && (
          <motion.div 
            className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                  <User size={20} className="text-white" />
                </div>
                <div>
                  <p className="font-semibold text-white">{contactPerson.name}</p>
                  <p className="text-xs text-gray-400">{contactPerson.role}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <motion.button
                className="bg-[#f44708] hover:bg-[#ff5722] text-white rounded-xl py-3 flex items-center justify-center space-x-2 font-medium"
                onClick={() => onCall(contactPerson.phone)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Phone size={16} />
                <span>Call</span>
              </motion.button>
              <motion.button
                className="bg-white/10 border border-white/20 text-white hover:bg-white/20 rounded-xl py-3 flex items-center justify-center space-x-2 font-medium"
                onClick={onOpenChat}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <MessageCircle size={16} />
                <span>Chat</span>
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Delivery Stages - Collapsible */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Collapsible
            open={isStagesOpen}
            onOpenChange={setIsStagesOpen}
            className="w-full"
          >
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden">
              <CollapsibleTrigger className="w-full">
                <div className="flex items-center justify-between p-6 hover:bg-white/5 transition-colors">
                  <h3 className="font-semibold text-white">Delivery Stages</h3>
                  {isStagesOpen ? (
                    <ChevronUp size={20} className="text-gray-400" />
                  ) : (
                    <ChevronDown size={20} className="text-gray-400" />
                  )}
                </div>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <div className="px-6 pb-6 space-y-4 border-t border-white/10 pt-4">
                  {stages.map((stage, index) => (
                    <div key={stage.id} className="flex items-start space-x-4">
                      {/* Timeline indicator */}
                      <div className="flex flex-col items-center">
                        <motion.div 
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            stage.status === 'completed' 
                              ? 'bg-green-500 text-white' 
                              : stage.status === 'active'
                              ? 'bg-[#f44708] text-white'
                              : 'bg-white/20 text-gray-500'
                          }`}
                          animate={stage.status === 'active' ? { scale: [1, 1.1, 1] } : {}}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          {stage.status === 'completed' ? '✓' : stage.id}
                        </motion.div>
                        {index < stages.length - 1 && (
                          <div className={`w-0.5 h-12 ${
                            stage.status === 'completed' ? 'bg-green-500' : 'bg-white/20'
                          }`} />
                        )}
                      </div>

                      {/* Stage details */}
                      <div className="flex-1 pt-1">
                        <div className="flex items-center justify-between">
                          <p className={`font-medium ${
                            stage.status === 'active' 
                              ? 'text-[#f44708]' 
                              : stage.status === 'completed'
                              ? 'text-white'
                              : 'text-gray-500'
                          }`}>
                            {stage.name}
                          </p>
                          {stage.status !== 'pending' && (
                            <p className="text-xs text-gray-400">{stage.time}</p>
                          )}
                        </div>
                        {stage.status === 'active' && (
                          <p className="text-xs text-gray-400 mt-1">
                            In progress...
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>
        </motion.div>

        {/* Action Buttons Based on Role & Status */}
        {userRole === 'pal' && (
          <motion.div 
            className="space-y-3 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            {job.status === 'assigned' && onStartPickup && (
              <motion.button
                className="w-full bg-[#f44708] hover:bg-[#ff5722] text-white rounded-xl h-12 font-semibold"
                onClick={onStartPickup}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Start Pickup
              </motion.button>
            )}

            {(job.status === 'in-transit' || job.status === 'picked-up') && onReceiverUnavailable && (
              <motion.button
                className="w-full bg-orange-500/20 border border-orange-500/30 text-[#f44708] hover:bg-orange-500/30 rounded-xl h-12 font-semibold flex items-center justify-center space-x-2"
                onClick={onReceiverUnavailable}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <AlertCircle size={16} />
                <span>Receiver Unavailable</span>
              </motion.button>
            )}

            {job.status === 'in-transit' && (
              <motion.button
                className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl h-12 font-semibold"
                onClick={() => onDeliveryComplete(job)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Complete Delivery
              </motion.button>
            )}
          </motion.div>
        )}

        {/* Receiver Action Buttons */}
        {userRole === 'receiver' && (
          <motion.div 
            className="space-y-3 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            {job.status === 'delivered' && (
              <motion.button
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl h-12 font-semibold flex items-center justify-center space-x-2"
                onClick={() => onDeliveryComplete(job)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <CheckCircle size={20} />
                <span>Confirm Delivery Receipt</span>
              </motion.button>
            )}
          </motion.div>
        )}

        {/* Info Message */}
        <motion.div 
          className="mt-6 p-4 bg-blue-500/20 border border-blue-500/30 rounded-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-sm text-blue-300 text-center">
            {userRole === 'sender' && '📦 Your package is being carefully delivered'}
            {userRole === 'pal' && '🚗 Follow the route to complete the delivery'}
            {userRole === 'receiver' && '📍 Your package is on the way'}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
