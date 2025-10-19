'use client'
import React, { useState } from 'react';
import { ArrowLeft, MapPin, Package, User, Phone, MessageCircle, Camera, CheckCircle, X, AlertTriangle, RefreshCw, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { DeliveryJob, User as UserType } from '../types';
import { AIItemScanner } from './AIItemScanner';
import { toast } from 'sonner';

interface PickupConfirmationScreenProps {
  job: DeliveryJob | null;
  user: UserType | null;
  onBack: () => void;
  onConfirmPickup: () => void;
  onOpenChat: () => void;
  onCall: (phone: string) => void;
}

interface ScanResult {
  itemName?: string;
  category?: string;
  estimatedWeight?: string;
  color?: string;
  size?: string;
  confidence?: number;
}

export function PickupConfirmationScreen({ 
  job, 
  user, 
  onBack, 
  onConfirmPickup,
  onOpenChat,
  onCall 
}: PickupConfirmationScreenProps) {
  const [showScanner, setShowScanner] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [matchStatus, setMatchStatus] = useState<'matched' | 'not-matched' | null>(null);
  const [overrideComment, setOverrideComment] = useState('');
  const [showOverrideInput, setShowOverrideInput] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const handleScanComplete = (result: ScanResult) => {
    setScanResult(result);
    setShowScanner(false);
    
    // Simulate matching logic - compare with sender's stored data
    const senderData = {
      itemName: job?.title || '',
      category: job?.category || '',
      size: job?.itemSize || '',
      weight: job?.weight || '',
      color: job?.itemColor || 'N/A'
    };

    // Check if items match (with some tolerance for AI variations)
    // Add null/undefined checks to prevent errors
    const itemNameMatch = (result.itemName && senderData.itemName) ? 
      (result.itemName.toLowerCase().includes(senderData.itemName.toLowerCase().substring(0, 5)) || 
       senderData.itemName.toLowerCase().includes(result.itemName.toLowerCase().substring(0, 5))) : false;
    const categoryMatch = (result.category && senderData.category) ? 
      result.category.toLowerCase() === senderData.category.toLowerCase() : false;
    const sizeMatch = (result.size && senderData.size) ? 
      result.size.toLowerCase() === senderData.size.toLowerCase() : false;
    
    // If at least 2 out of 3 key attributes match, consider it a match
    const matchScore = [itemNameMatch, categoryMatch, sizeMatch].filter(Boolean).length;
    
    if (matchScore >= 2) {
      setMatchStatus('matched');
      setIsVerified(true);
      toast.success('Item verified! Matches sender\'s description');
    } else {
      setMatchStatus('not-matched');
      setIsVerified(false);
      toast.error('Item mismatch detected. Please review or retry scan.');
    }
  };

  const handleRetry = () => {
    setScanResult(null);
    setMatchStatus(null);
    setShowScanner(true);
  };

  const handleOverrideApproval = () => {
    if (overrideComment.trim().length < 10) {
      toast.error('Please provide a detailed comment (min 10 characters)');
      return;
    }
    setIsVerified(true);
    toast.success('Item approved with comment');
  };

  const handleConfirm = () => {
    if (isVerified) {
      onConfirmPickup();
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
            <h1 className="text-lg font-semibold text-white">Pickup Confirmation</h1>
            <p className="text-sm text-gray-400">Verify item details</p>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 relative z-10">
        {/* Item Details */}
        <motion.div 
          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center space-x-3 mb-4">
            <Package size={24} className="text-green-400" />
            <h3 className="text-white font-semibold">Sender&apos;s Item Information</h3>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-gray-400 text-sm">Item</p>
              <p className="text-white font-medium">{job?.title || 'N/A'}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Description</p>
              <p className="text-white">{job?.description || 'N/A'}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-gray-400 text-sm">Size</p>
                <p className="text-white">{job?.itemSize || 'N/A'}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Weight</p>
                <p className="text-white">{job?.weight || 'N/A'}</p>
              </div>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Category</p>
              <p className="text-white">{job?.category || 'N/A'}</p>
            </div>
          </div>
        </motion.div>

        {/* Pickup Location */}
        <motion.div 
          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center space-x-3 mb-4">
            <MapPin size={24} className="text-blue-400" />
            <h3 className="text-white font-semibold">Pickup Location</h3>
          </div>
          <p className="text-white">{job?.pickupLocation || 'N/A'}</p>
        </motion.div>

        {/* Sender Info */}
        <motion.div 
          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center space-x-3 mb-4">
            <User size={24} className="text-purple-400" />
            <h3 className="text-white font-semibold">Sender Details</h3>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-gray-400 text-sm">Name</p>
              <p className="text-white font-medium">{job?.senderName || 'N/A'}</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <motion.button
                onClick={onOpenChat}
                className="flex items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white py-2.5 rounded-xl"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <MessageCircle size={16} />
                <span className="text-sm">Chat</span>
              </motion.button>
              <motion.button
                onClick={() => onCall(job?.senderPhone || '+234 800 000 0000')}
                className="flex items-center justify-center space-x-2 bg-green-500 hover:bg-green-600 text-white py-2.5 rounded-xl"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Phone size={16} />
                <span className="text-sm">Call</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* AI Item Verification */}
        <motion.div 
          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold">AI Item Verification</h3>
            {isVerified && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center space-x-1 text-green-400"
              >
                <CheckCircle size={18} />
                <span className="text-sm">Verified</span>
              </motion.div>
            )}
          </div>

          {!scanResult ? (
            <>
              <motion.button
                onClick={() => setShowScanner(true)}
                className="w-full py-4 rounded-xl font-medium bg-white/10 border-2 border-dashed border-white/30 text-white hover:border-blue-500/50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-center space-x-2">
                  <Camera size={20} />
                  <span>Scan Item with AI</span>
                </div>
              </motion.button>
              <p className="text-gray-400 text-sm mt-2 text-center">
                Use AI scanner to verify item matches sender&apos;s description
              </p>
            </>
          ) : (
            <AnimatePresence mode="wait">
              {matchStatus === 'matched' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-green-500/20 border border-green-500/30 rounded-xl p-4"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <CheckCircle size={24} className="text-green-400" />
                    <h4 className="text-green-400 font-semibold">Item Matched!</h4>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-green-200">Scanned Item:</span>
                      <span className="text-white font-medium">{scanResult.itemName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-200">Category:</span>
                      <span className="text-white">{scanResult.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-200">Size:</span>
                      <span className="text-white">{scanResult.size}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-200">Confidence:</span>
                      <span className="text-white">{scanResult.confidence}%</span>
                    </div>
                  </div>
                  <motion.button
                    onClick={handleRetry}
                    className="w-full mt-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg flex items-center justify-center space-x-2 text-sm"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <RefreshCw size={16} />
                    <span>Scan Again</span>
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-red-500/20 border border-red-500/30 rounded-xl p-4"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <AlertTriangle size={24} className="text-red-400" />
                    <h4 className="text-red-400 font-semibold">Item Mismatch</h4>
                  </div>
                  <div className="space-y-2 text-sm mb-3">
                    <div className="flex justify-between">
                      <span className="text-red-200">Scanned:</span>
                      <span className="text-white font-medium">{scanResult.itemName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-red-200">Expected:</span>
                      <span className="text-white">{job?.title}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <motion.button
                      onClick={handleRetry}
                      className="py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center justify-center space-x-2 text-sm"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <RefreshCw size={16} />
                      <span>Retry Scan</span>
                    </motion.button>
                    <motion.button
                      onClick={() => setShowOverrideInput(!showOverrideInput)}
                      className="py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg flex items-center justify-center space-x-2 text-sm"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FileText size={16} />
                      <span>Override</span>
                    </motion.button>
                  </div>

                  <AnimatePresence>
                    {showOverrideInput && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-3 space-y-2">
                          <p className="text-yellow-200 text-xs">
                            Explain why you&apos;re approving this item despite the mismatch:
                          </p>
                          <textarea
                            value={overrideComment}
                            onChange={(e) => setOverrideComment(e.target.value)}
                            placeholder="E.g., Different color but same item, similar brand variation..."
                            className="w-full bg-white/10 border border-white/20 rounded-lg p-2 text-white text-sm placeholder-gray-400 min-h-[80px]"
                          />
                          <motion.button
                            onClick={handleOverrideApproval}
                            disabled={overrideComment.trim().length < 10}
                            className="w-full py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            Approve with Comment
                          </motion.button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </motion.div>

        {/* Confirm Button */}
        <motion.button
          onClick={handleConfirm}
          disabled={!isVerified}
          className="w-full bg-white hover:bg-gray-100 text-[#2f2f2f] py-4 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          whileHover={isVerified ? { scale: 1.02 } : {}}
          whileTap={isVerified ? { scale: 0.98 } : {}}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <CheckCircle size={20} />
          <span>Confirm Pickup</span>
        </motion.button>
      </div>

      {/* AI Scanner Modal */}
      <AnimatePresence>
        {showScanner && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex flex-col"
          >
            <div className="flex items-center justify-between p-4 bg-[#2f2f2f] border-b border-white/10">
              <h2 className="text-white font-semibold">Scan Item</h2>
              <motion.button
                onClick={() => setShowScanner(false)}
                className="p-2 hover:bg-white/10 rounded-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={24} className="text-white" />
              </motion.button>
            </div>
            <div className="flex-1">
              <AIItemScanner
                onScanComplete={handleScanComplete}
                onCancel={() => setShowScanner(false)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
