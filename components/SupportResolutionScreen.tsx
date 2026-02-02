'use client';
import React, { useState } from 'react';
import { ArrowLeft, Shield, CheckCircle, Users, DollarSign, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { DeliveryJob, User } from '../types';

type ResolutionType = 'favor-sender' | 'favor-pal' | 'split';

interface SupportResolutionScreenProps {
  job: DeliveryJob | null;
  senderUser: User | null;
  palUser: User | null;
  onBack: () => void;
  onResolveDispute: (resolution: ResolutionType, notes: string) => void;
}

export function SupportResolutionScreen({ 
  job, 
  senderUser,
  palUser,
  onBack, 
  onResolveDispute 
}: SupportResolutionScreenProps) {
  const [selectedResolution, setSelectedResolution] = useState<ResolutionType | null>(null);
  const [resolutionNotes, setResolutionNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!job) return null;

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const deliveryFee = job.acceptedBidAmount || 0;

  const resolutionOptions = [
    {
      id: 'favor-sender' as const,
      label: 'Favor Sender',
      description: 'Full refund to sender, no payment to Pal',
      color: 'blue',
      senderRefund: deliveryFee,
      palPayment: 0,
      icon: Users
    },
    {
      id: 'favor-pal' as const,
      label: 'Favor Pal',
      description: 'Full payment to Pal, no refund to sender',
      color: 'green',
      senderRefund: 0,
      palPayment: deliveryFee,
      icon: CheckCircle
    },
    {
      id: 'split' as const,
      label: 'Split 50/50',
      description: 'Partial refund and payment to both parties',
      color: 'purple',
      senderRefund: Math.floor(deliveryFee * 0.5),
      palPayment: Math.floor(deliveryFee * 0.5),
      icon: DollarSign
    }
  ];

  const handleSubmit = () => {
    if (!selectedResolution || !resolutionNotes.trim()) return;
    
    setIsSubmitting(true);
    setTimeout(() => {
      onResolveDispute(selectedResolution, resolutionNotes);
    }, 1500);
  };

  const canSubmit = selectedResolution && resolutionNotes.trim().length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark via-darker to-dark flex flex-col">
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
        <div className="flex items-center justify-between">
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
              <h1 className="text-lg font-semibold text-white">Admin Resolution</h1>
              <p className="text-sm text-gray-400">Review and resolve dispute</p>
            </div>
          </div>
          <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 flex items-center space-x-1">
            <Shield size={14} />
            <span>Admin</span>
          </Badge>
        </div>
      </motion.div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 relative z-10">
        {/* Dispute Summary */}
        <motion.div 
          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="text-white font-semibold mb-4">Dispute Summary</h3>
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
              <span className="text-white font-semibold">{formatAmount(deliveryFee)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Sender:</span>
              <span className="text-white">{senderuser?.firstName || 'Sender Name'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Pal:</span>
              <span className="text-white">{paluser?.firstName || 'Pal Name'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Issue Type:</span>
              <span className="text-red-400">Item Mismatch</span>
            </div>
          </div>
        </motion.div>

        {/* Evidence */}
        <motion.div 
          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-white font-semibold mb-4">Evidence</h3>
          
          <div className="space-y-4">
            {/* Sender Evidence */}
            <div className="bg-blue-500/20 border border-blue-500/30 rounded-xl p-4">
              <div className="flex items-center space-x-2 mb-2">
                <FileText size={16} className="text-blue-400" />
                <span className="text-blue-300 font-medium">Sender&apos;s Evidence</span>
              </div>
              <p className="text-blue-200 text-sm">
                &quot;I provided accurate photos and description. The item matches what I sent.&quot;
              </p>
              <p className="text-blue-300 text-xs mt-2">2 photos attached</p>
            </div>

            {/* Pal Evidence */}
            <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-4">
              <div className="flex items-center space-x-2 mb-2">
                <FileText size={16} className="text-green-400" />
                <span className="text-green-300 font-medium">Pal&apos;s Evidence</span>
              </div>
              <p className="text-green-200 text-sm">
                &quot;The item I picked up looks different from the photos. Size is wrong.&quot;
              </p>
              <p className="text-green-300 text-xs mt-2">3 photos attached</p>
            </div>
          </div>
        </motion.div>

        {/* Resolution Options */}
        <motion.div 
          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-white font-semibold mb-4">Choose Resolution</h3>
          
          <div className="space-y-3">
            {resolutionOptions.map((option, index) => {
              const Icon = option.icon;
              const isSelected = selectedResolution === option.id;
              const colorClasses = {
                blue: 'bg-blue-500/20 border-blue-500/30 text-blue-300',
                green: 'bg-green-500/20 border-green-500/30 text-green-300',
                purple: 'bg-purple-500/20 border-purple-500/30 text-purple-300'
              };

              return (
                <motion.div
                  key={option.id}
                  onClick={() => setSelectedResolution(option.id)}
                  className={`cursor-pointer rounded-xl p-4 border-2 transition-all ${
                    isSelected
                      ? colorClasses[option.color as keyof typeof colorClasses] + ' scale-[1.02]'
                      : 'bg-white/10 border-white/20 hover:border-white/40'
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <Icon size={20} className={isSelected ? `text-${option.color}-400` : 'text-gray-400'} />
                      <h4 className={`font-semibold ${isSelected ? '' : 'text-white'}`}>
                        {option.label}
                      </h4>
                    </div>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className={`w-6 h-6 rounded-full bg-${option.color}-400 flex items-center justify-center`}
                      >
                        <CheckCircle size={16} className="text-white" />
                      </motion.div>
                    )}
                  </div>
                  
                  <p className={`text-sm mb-3 ${isSelected ? '' : 'text-gray-400'}`}>
                    {option.description}
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className={isSelected ? '' : 'text-gray-400'}>
                      <span className="block text-xs opacity-80">Sender Refund</span>
                      <span className="font-semibold">{formatAmount(option.senderRefund)}</span>
                    </div>
                    <div className={isSelected ? '' : 'text-gray-400'}>
                      <span className="block text-xs opacity-80">Pal Payment</span>
                      <span className="font-semibold">{formatAmount(option.palPayment)}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Resolution Notes */}
        <motion.div 
          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-white font-semibold mb-4">Resolution Notes</h3>
          <Textarea
            value={resolutionNotes}
            onChange={(e) => setResolutionNotes(e.target.value.slice(0, 500))}
            placeholder="Explain your decision and reasoning for this resolution..."
            className="bg-white/10 border-white/20 text-white placeholder-gray-500 focus:border-purple-500 min-h-[120px]"
            rows={5}
          />
          <div className="flex justify-between items-center mt-2">
            <p className="text-xs text-gray-400">Required for transparency</p>
            <p className="text-xs text-gray-400">{resolutionNotes.length}/500</p>
          </div>
        </motion.div>

        {/* Submit Button */}
        <motion.button
          onClick={handleSubmit}
          disabled={!canSubmit || isSubmitting}
          className="w-full bg-purple-500 hover:bg-purple-600 text-white py-4 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          whileHover={canSubmit ? { scale: 1.02 } : {}}
          whileTap={canSubmit ? { scale: 0.98 } : {}}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Submitting Resolution...</span>
            </>
          ) : (
            <>
              <Shield size={20} />
              <span>Submit Resolution</span>
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
}
