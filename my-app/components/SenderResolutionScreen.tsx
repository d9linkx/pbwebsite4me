'use client'
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, AlertTriangle, Edit, XCircle, DollarSign } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/Dialog';
import { DeliveryJob, User, ItemSize } from '../types';

interface SenderResolutionScreenProps {
  job: DeliveryJob | null;
  user: User | null;
  onBack: () => void;
  onAcceptDispute: () => void;
  onUpdateDetails: (updatedJob: Partial<DeliveryJob>) => void;
  onCancelOrder: () => void;
  onDisputeResolved?: () => void;
}

export function SenderResolutionScreen({ 
  job, 
  user, 
  onBack, 
  onAcceptDispute,
  onUpdateDetails,
  onCancelOrder,
  onDisputeResolved 
}: SenderResolutionScreenProps) {
  const [activeTab, setActiveTab] = useState<'dispute' | 'edit' | 'cancel'>('dispute');
  const [timeRemaining, setTimeRemaining] = useState(300); // 5 minutes
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  
  // Edit form states
  const [editedTitle, setEditedTitle] = useState('');
  const [editedNotes, setEditedNotes] = useState('');
  const [editedSize, setEditedSize] = useState<ItemSize | ''>('');

  // Timer effect - must be before conditional return
  useEffect(() => {
    if (timeRemaining <= 0) return;
    const timer = setInterval(() => {
      setTimeRemaining(prev => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [timeRemaining]);

  if (!job || !user) return null;

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const calculateViolationFee = () => {
    return Math.floor((job.acceptedBidAmount || 0) * 0.5);
  };

  const handleUpdateDetails = () => {
    onUpdateDetails({
      title: editedTitle,
      notes: editedNotes,
      itemSize: editedSize || undefined
    });
  };

  const handleCancelConfirm = () => {
    setShowCancelDialog(false);
    onCancelOrder();
    onDisputeResolved?.();
  };

  const handleAcceptDispute = () => {
    onAcceptDispute();
    onDisputeResolved?.();
  };

  const tabs = [
    { id: 'dispute' as const, label: 'Dispute', icon: AlertTriangle },
    { id: 'edit' as const, label: 'Edit Details', icon: Edit },
    { id: 'cancel' as const, label: 'Cancel', icon: XCircle }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2f2f2f] via-[#1a1a1a] to-[#2f2f2f] flex flex-col">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-500 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-0 -left-40 w-80 h-80 bg-yellow-500 rounded-full opacity-10 blur-3xl"></div>
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
          <div className="flex-1">
            <h1 className="text-lg font-semibold text-white">Resolve Dispute</h1>
            <p className="text-sm text-gray-400">Respond to Pal&apos;s issue report</p>
          </div>
          <div className="flex items-center space-x-2 bg-red-500/20 border border-red-500/30 px-3 py-2 rounded-xl">
            <Clock size={16} className="text-red-400" />
            <span className="text-red-400 font-mono font-semibold">{formatTime(timeRemaining)}</span>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="bg-[#2f2f2f]/50 border-b border-white/10 p-4 sticky top-[88px] z-10">
        <div className="flex space-x-2">
          {tabs.map(tab => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-xl font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-[#f44708] text-white'
                  : 'bg-white/10 text-gray-400 hover:bg-white/20'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <tab.icon size={18} />
              <span>{tab.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 relative z-10">
        <AnimatePresence mode="wait">
          {activeTab === 'dispute' && (
            <motion.div
              key="dispute"
              className="space-y-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              {/* Dispute Details */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                <h3 className="text-white font-semibold mb-4">Dispute Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Delivery ID:</span>
                    <span className="text-white font-mono">#{job.id.slice(0, 8)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Item:</span>
                    <span className="text-white">{job.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Delivery Fee:</span>
                    <span className="text-white font-semibold">{formatAmount(job.acceptedBidAmount || 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Pal&apos;s Issue:</span>
                    <span className="text-red-400">Item Mismatch</span>
                  </div>
                </div>
              </div>

              {/* Financial Impact */}
              <div className="bg-red-500/20 border border-red-500/30 rounded-2xl p-6">
                <div className="flex items-start space-x-3 mb-4">
                  <DollarSign size={20} className="text-red-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-red-300 mb-1">Financial Impact</h4>
                    <p className="text-sm text-red-200">
                      If the dispute is valid, you may be charged:
                    </p>
                  </div>
                </div>
                <div className="bg-white/10 rounded-xl p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Delivery Fee:</span>
                    <span className="text-white">{formatAmount(job.acceptedBidAmount || 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Violation Fee (50%):</span>
                    <span className="text-red-400">+{formatAmount(calculateViolationFee())}</span>
                  </div>
                  <div className="border-t border-white/20 pt-2 flex justify-between">
                    <span className="text-white font-semibold">Total Charge:</span>
                    <span className="text-red-400 font-bold text-lg">
                      {formatAmount((job.acceptedBidAmount || 0) + calculateViolationFee())}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action */}
              <motion.button
                onClick={handleAcceptDispute}
                className="w-full bg-[#2f2f2f] hover:bg-[#1a1a1a] text-white py-4 rounded-xl font-semibold"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Accept Dispute & Pay Fees
              </motion.button>

              {/* Warning */}
              <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-2xl p-4">
                <div className="flex items-start space-x-3">
                  <AlertTriangle size={20} className="text-yellow-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-yellow-300 mb-1">Important</h4>
                    <p className="text-sm text-yellow-200">
                      You have {formatTime(timeRemaining)} to respond. If you believe the item details were correct,
                      you can edit them below to clarify, or cancel the order.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'edit' && (
            <motion.div
              key="edit"
              className="space-y-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                <h3 className="text-white font-semibold mb-4">Update Item Details</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">Item Title</label>
                    <Input
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">Item Size</label>
                    <Input
                      value={editedSize}
                      onChange={(e) => {
                        const value = e.target.value;
                        // Only allow valid ItemSize values or empty string
                        if (value === '' || value === 'Small' || value === 'Medium' || value === 'Large') {
                          setEditedSize(value as ItemSize | '');
                        }
                      }}
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">Additional Notes</label>
                    <Textarea
                      value={editedNotes}
                      onChange={(e) => setEditedNotes(e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder-gray-500"
                      rows={4}
                    />
                  </div>
                </div>
              </div>

              <motion.button
                onClick={handleUpdateDetails}
                className="w-full bg-[#f44708] hover:bg-[#ff5722] text-white py-4 rounded-xl font-semibold"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Update & Notify Pal
              </motion.button>

              <div className="bg-blue-500/20 border border-blue-500/30 rounded-2xl p-4">
                <p className="text-sm text-blue-200">
                  Updating details will notify the Pal and give them a chance to review the changes.
                  This may help resolve the dispute.
                </p>
              </div>
            </motion.div>
          )}

          {activeTab === 'cancel' && (
            <motion.div
              key="cancel"
              className="space-y-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                <h3 className="text-white font-semibold mb-4">Cancel Order</h3>
                <p className="text-gray-400 mb-4">
                  Canceling the order will:
                </p>
                <ul className="text-gray-300 space-y-2 list-disc list-inside mb-6">
                  <li>Terminate the delivery</li>
                  <li>Compensate the Pal for their time</li>
                  <li>Refund you the remaining amount</li>
                  <li>Close the dispute</li>
                </ul>

                <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4 mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-red-200">Pal Compensation:</span>
                    <span className="text-red-400 font-semibold">
                      {formatAmount(Math.floor((job.acceptedBidAmount || 0) * 0.4))}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-red-200">Your Refund:</span>
                    <span className="text-green-400 font-semibold">
                      {formatAmount(Math.floor((job.acceptedBidAmount || 0) * 0.6))}
                    </span>
                  </div>
                </div>
              </div>

              <motion.button
                onClick={() => setShowCancelDialog(true)}
                className="w-full bg-red-500 hover:bg-red-600 text-white py-4 rounded-xl font-semibold"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Cancel Order
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Cancel Confirmation Dialog */}
      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent className="sm:max-w-md mx-4 rounded-2xl bg-gradient-to-br from-[#2f2f2f] to-[#1a1a1a] border-white/20 text-white">
          <DialogHeader>
            <DialogTitle className="text-white">Confirm Cancellation</DialogTitle>
            <DialogDescription className="text-gray-400">
              This action cannot be undone
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <p className="text-gray-300">
              Are you sure you want to cancel this order? The Pal will be compensated and the
              dispute will be closed.
            </p>

            <div className="flex space-x-3">
              <motion.button
                onClick={() => setShowCancelDialog(false)}
                className="flex-1 border-2 border-white/20 text-white py-3 rounded-xl flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Keep Order
              </motion.button>
              <motion.button
                onClick={handleCancelConfirm}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Cancel Order
              </motion.button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
