'use client'
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Star, Package, MapPin, CheckCircle2, Sparkles, Award, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Textarea } from './ui/textarea';
import { DeliveryJob, UserRole } from '../types';

interface RatingTarget {
  id: string;
  name: string;
  role: string;
  description: string;
}

interface RatingsScreenProps {
  onBack: () => void;
  job: DeliveryJob | null;
  userRole: UserRole;
  onRatingComplete: () => void;
  onNavigateToAcceptedBids?: () => void;
  onNavigateToDashboard?: () => void;
}

export function RatingsScreen({ 
  onBack, 
  job, 
  userRole, 
  onRatingComplete,
  onNavigateToAcceptedBids,
  onNavigateToDashboard 
}: RatingsScreenProps) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAnimation, setShowAnimation] = useState(true);
  const [showRatingSection, setShowRatingSection] = useState(false);
  const [showBackReminder, setShowBackReminder] = useState(false);

  useEffect(() => {
    // Show rating section after animation
    const timer = setTimeout(() => {
      setShowRatingSection(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!job) return null;

  // Determine rating target based on user role
  const getRatingTarget = (): RatingTarget => {
    switch (userRole) {
      case 'sender':
        if (job.proxyId) {
          return {
            id: job.proxyId,
            name: job.proxyName || 'Proxy Store',
            role: 'Proxy Storage',
            description: 'How was your experience with the proxy storage service?'
          };
        }
        return {
          id: job.selectedPalId || '',
          name: job.selectedPalName || 'Your Pal',
          role: 'Delivery Pal',
          description: 'How was your delivery experience?'
        };
      
      case 'pal':
        if (job.proxyId) {
          return {
            id: job.proxyId,
            name: job.proxyName || 'Proxy Store',
            role: 'Proxy Storage',
            description: 'How was the proxy handover process?'
          };
        }
        return {
          id: job.receiverId || job.senderId,
          name: job.receiverName || job.senderName || 'Customer',
          role: job.receiverId ? 'Receiver' : 'Sender',
          description: 'How was your experience with the customer?'
        };
        
      case 'receiver':
        return {
          id: job.selectedPalId || '',
          name: job.selectedPalName || 'Your Pal',
          role: 'Delivery Pal',
          description: 'How was your delivery experience?'
        };
        
      case 'proxy':
        return {
          id: job.selectedPalId || '',
          name: job.selectedPalName || 'Delivery Pal',
          role: 'Delivery Pal',
          description: 'How was the handover experience?'
        };
        
      default:
        return {
          id: '',
          name: 'User',
          role: 'User',
          description: 'Rate your experience'
        };
    }
  };

  const target = getRatingTarget();

  const quickReviews = [
    "Fast delivery", "Great communication", "Professional", "Careful handling",
    "On time", "Friendly", "Reliable", "Excellent service"
  ];

  const handleStarClick = (star: number) => {
    setRating(star);
  };

  const handleComplete = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      
      // Complete the rating process
      onRatingComplete();
      
      // Always navigate to dashboard after completion
      if (onNavigateToDashboard) {
        onNavigateToDashboard();
      } else {
        // Fallback: try to navigate to dashboard via onBack
        onBack();
      }
    }, 1000);
  };

  const handleSkipRating = () => {
    // Always navigate to dashboard when skipping rating
    if (onNavigateToDashboard) {
      onNavigateToDashboard();
    } else {
      // Fallback: complete rating process and go back
      onRatingComplete();
      onBack();
    }
  };

  const handleBackClick = () => {
    console.log('Ratings back button clicked - showing delivery success reminder!');
    
    // Show simple in-page reminder instead of navigating
    setShowBackReminder(true);
    
    // Auto-hide the reminder after 5 seconds
    setTimeout(() => {
      setShowBackReminder(false);
    }, 5000);
    
    console.log('Delivery success reminder displayed, Pal should rate or skip');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark via-darker to-dark flex flex-col relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-10 right-10 w-4 h-4 bg-green-400 rounded-full"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div 
          className="absolute top-32 left-8 w-3 h-3 bg-green-500 rounded-full"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        />
        <motion.div 
          className="absolute top-20 left-1/2 w-2 h-2 bg-primary rounded-full"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        />
        <motion.div 
          className="absolute bottom-40 right-16 w-3 h-3 bg-green-400 rounded-full"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
        />
      </div>

      {/* Header */}
      <motion.div 
        className="bg-dark border-b border-white/10 p-6 sticky top-0 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center space-x-4">
          <motion.button 
            onClick={handleBackClick}
            className="p-2 hover:bg-white/10 rounded-xl transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft size={24} className="text-white" />
          </motion.button>
          <h1 className="text-xl text-white">Delivery Complete</h1>
        </div>
      </motion.div>

      {/* Main Content Container - Scrollable */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden relative z-10">
        {/* Back Button Reminder Banner */}
        {showBackReminder && (
          <motion.div 
            className="mx-6 mt-4 mb-4 bg-green-500/20 border border-green-500/30 rounded-2xl p-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                <CheckCircle2 size={14} className="text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-green-400 text-sm">Delivery Successful!</h4>
                <p className="text-green-300 text-sm mt-1">
                  Your delivery has been completed successfully. Please rate your experience or skip to continue to your dashboard.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Success Animation Section */}
        <motion.div 
          className="transition-all duration-1000"
          initial={{ opacity: 0 }}
          animate={{ opacity: showAnimation ? 1 : 0 }}
        >
          {/* Celebration Header */}
          <div className="text-center pt-6 pb-6 px-6">
            <div className="relative inline-block">
              {/* Success Icon with Animation */}
              <motion.div 
                className="w-24 h-24 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <CheckCircle2 size={48} className="text-white" />
                <motion.div 
                  className="absolute -top-2 -right-2"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg">
                    <Sparkles size={16} className="text-white" />
                  </div>
                </motion.div>
              </motion.div>
              
              {/* Floating celebration elements */}
              <motion.div 
                className="absolute -top-4 -left-4"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
              >
                <div className="w-3 h-3 bg-primary rounded-full"></div>
              </motion.div>
              <motion.div 
                className="absolute -top-6 -right-8"
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.8 }}
              >
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              </motion.div>
            </div>
            
            <h2 className="text-3xl font-bold text-white mb-4">
              🎉 Congratulations!
            </h2>
            <p className="text-lg text-gray-300 mb-2">Your delivery was completed successfully</p>
            
            {/* Job Details Card */}
            <motion.div 
              className="mx-4 p-5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl mt-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Package size={24} className="text-green-400" />
                </div>
                <div className="text-left flex-1 min-w-0">
                  <h3 className="font-semibold text-white text-lg truncate">{job.title}</h3>
                  <div className="flex items-center text-sm text-gray-400 mt-1">
                    <MapPin size={14} className="mr-1 flex-shrink-0" />
                    <span className="truncate">{job.pickupLocation} → {job.dropoffLocation}</span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <Award size={16} className="text-white" />
                  </div>
                </div>
              </div>
              
              <div className="bg-green-500/20 p-4 rounded-xl border border-green-500/30">
                <p className="text-sm font-medium text-green-400 flex items-center">
                  <CheckCircle2 size={16} className="mr-2 flex-shrink-0" />
                  Payment processed successfully
                </p>
                <p className="text-xs text-green-300 mt-1">
                  Funds have been transferred to your wallet
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Rating Section */}
        <motion.div 
          className="transform transition-all duration-1000"
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: showRatingSection ? 1 : 0,
            y: showRatingSection ? 0 : 20 
          }}
        >
          <div className="bg-dark rounded-t-3xl border-t border-white/20 shadow-2xl mx-0 px-6 pt-8 pb-8">
            {/* Optional Rating Header */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center space-x-2 mb-3">
                <Heart size={20} className="text-primary" />
                <h3 className="text-lg font-semibold text-white">Share Your Experience</h3>
                <Heart size={20} className="text-primary" />
              </div>
              <p className="text-sm text-gray-400">Help others by rating your experience (optional)</p>
            </div>

            {/* Rating Target */}
            <div className="text-center mb-6">
              <Avatar className="w-16 h-16 mx-auto mb-3 border-2 border-white/20">
                <AvatarFallback className="bg-gradient-to-br from-primary to-primary-hover text-white text-lg font-semibold">
                  {target.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <h4 className="font-semibold text-white">{target.name}</h4>
              <p className="text-sm text-gray-400">{target.role}</p>
            </div>

            {/* Star Rating */}
            <div className="text-center mb-6">
              <div className="flex justify-center space-x-2 mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <motion.button
                    key={star}
                    onClick={() => handleStarClick(star)}
                    className="p-1"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Star
                      size={32}
                      className={`${
                        star <= rating
                          ? 'text-primary fill-current'
                          : 'text-gray-600 hover:text-gray-500'
                      }`}
                    />
                  </motion.button>
                ))}
              </div>
              {rating > 0 && (
                <motion.p 
                  className="text-sm text-gray-300"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {rating === 1 && "😞 Could be better"}
                  {rating === 2 && "😐 Fair experience"}
                  {rating === 3 && "🙂 Good service"}
                  {rating === 4 && "😊 Very good!"}
                  {rating === 5 && "🤩 Excellent!"}
                </motion.p>
              )}
            </div>

            {/* Quick Review Options */}
            {rating >= 4 && (
              <motion.div 
                className="mb-6"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
              >
                <p className="text-sm font-medium text-white mb-3">Quick compliments:</p>
                <div className="flex flex-wrap gap-2">
                  {quickReviews.slice(0, 6).map((quickReview) => (
                    <motion.button
                      key={quickReview}
                      onClick={() => setReview(review ? `${review}, ${quickReview}` : quickReview)}
                      className="rounded-full bg-white/10 border border-white/20 text-gray-300 hover:bg-primary hover:text-white hover:border-primary text-xs px-4 py-2 transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {quickReview}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Written Review */}
            {rating > 0 && (
              <motion.div 
                className="mb-6"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
              >
                <Textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Share more details about your experience... (optional)"
                  className="rounded-xl bg-white/5 border-white/20 text-white placeholder:text-gray-500 min-h-[80px] resize-none"
                />
              </motion.div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              <motion.button
                onClick={handleComplete}
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary-hover text-white rounded-xl h-14 font-semibold transition-all duration-300 disabled:opacity-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                    Completing...
                  </div>
                ) : (
                  'Complete'
                )}
              </motion.button>
              
              {rating === 0 && (
                <motion.button
                  onClick={handleSkipRating}
                  className="w-full text-gray-400 hover:text-white rounded-xl h-12 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Skip Rating & Continue
                </motion.button>
              )}
              
              <p className="text-xs text-gray-500 text-center mt-2 pb-2">
                Your feedback helps improve our service
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
