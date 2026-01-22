'use client'
import React, { useState } from 'react';
import { ArrowLeft, Star, Camera, Save } from 'lucide-react';
import { motion } from 'framer-motion';
import { Textarea } from './ui/textarea';
import { RatingData } from '../types/index';

interface PostDeliveryEditScreenProps {
  onBack: () => void;
  onSubmit: (data: RatingData) => void;
  palName: string;
}

export function PostDeliveryEditScreen({ onBack, onSubmit, palName }: PostDeliveryEditScreenProps) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [photoTaken, setPhotoTaken] = useState(false);

  const handleSubmit = () => {
    onSubmit({ rating, review, photoTaken });
  };

  const canSubmit = rating > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark via-darker to-dark flex flex-col">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-500 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-0 -left-40 w-80 h-80 bg-green-500 rounded-full opacity-10 blur-3xl"></div>
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
            <h1 className="text-lg font-semibold text-white">Rate Delivery</h1>
            <p className="text-sm text-gray-400">Share your experience</p>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 relative z-10">
        {/* Pal Info */}
        <motion.div 
          className="bg-gradient-to-r from-yellow-500/20 to-green-500/20 border border-yellow-500/30 rounded-2xl p-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="text-white font-semibold mb-2">How was {palName}?</h3>
          <p className="text-yellow-200 text-sm">Your feedback helps improve the community</p>
        </motion.div>

        {/* Rating */}
        <motion.div 
          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-white font-semibold mb-4">Rating *</h3>
          <div className="flex items-center justify-center space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <motion.button
                key={star}
                onClick={() => setRating(star)}
                className={`p-2 transition-colors ${
                  star <= rating ? 'text-yellow-400' : 'text-gray-600'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Star 
                  size={40} 
                  className={star <= rating ? 'fill-yellow-400' : ''} 
                />
              </motion.button>
            ))}
          </div>
          {rating > 0 && (
            <p className="text-center text-gray-400 mt-3">
              {rating === 5 ? 'Excellent!' : rating === 4 ? 'Very Good!' : rating === 3 ? 'Good' : rating === 2 ? 'Fair' : 'Needs Improvement'}
            </p>
          )}
        </motion.div>

        {/* Review */}
        <motion.div 
          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-white font-semibold mb-4">Review (Optional)</h3>
          <Textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Share details about your delivery experience..."
            rows={4}
            className="bg-white/10 border-white/20 text-white placeholder-gray-500 focus:border-yellow-500"
          />
        </motion.div>

        {/* Photo */}
        <motion.div 
          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-white font-semibold mb-4">Add Photo (Optional)</h3>
          <motion.button
            onClick={() => setPhotoTaken(!photoTaken)}
            className={`w-full py-4 rounded-xl font-medium transition-all ${
              photoTaken
                ? 'bg-green-500/20 border-2 border-green-500 text-green-400'
                : 'bg-white/10 border-2 border-dashed border-white/30 text-white hover:border-blue-500/50'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center justify-center space-x-2">
              <Camera size={20} />
              <span>{photoTaken ? 'Photo Added' : 'Add Photo'}</span>
            </div>
          </motion.button>
        </motion.div>

        {/* Submit Button */}
        <motion.button
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="w-full bg-gradient-to-r from-yellow-500 to-green-500 hover:from-yellow-600 hover:to-green-600 text-white py-4 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          whileHover={canSubmit ? { scale: 1.02 } : {}}
          whileTap={canSubmit ? { scale: 0.98 } : {}}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Save size={20} />
          <span>Submit Review</span>
        </motion.button>
      </div>
    </div>
  );
}
