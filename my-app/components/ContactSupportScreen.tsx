'use client'
import React, { useState } from 'react';
import { ArrowLeft, MessageSquare, Upload, X, Send, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { User } from '../types';

interface ContactSupportScreenProps {
  user: User | null;
  onBack: () => void;
}

export function ContactSupportScreen({ user, onBack }: ContactSupportScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [attachments, setAttachments] = useState<{ id: string; url: string; name: string }[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const categories = [
    { id: 'delivery-issue', label: 'Delivery Issue', color: 'red' },
    { id: 'payment', label: 'Payment Problem', color: 'yellow' },
    { id: 'account', label: 'Account Help', color: 'blue' },
    { id: 'technical', label: 'Technical Issue', color: 'purple' },
    { id: 'other', label: 'Other', color: 'gray' }
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          setAttachments(prev => [...prev, {
            id: Math.random().toString(36).substring(7),
            url: e.target?.result as string,
            name: file.name
          }]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeAttachment = (id: string) => {
    setAttachments(prev => prev.filter(a => a.id !== id));
  };

  const handleSubmit = () => {
    if (!selectedCategory || !subject.trim() || !message.trim()) return;
    
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 2000);
  };

  const canSubmit = selectedCategory && subject.trim() && message.trim();

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
        <motion.div
          className="text-center relative z-10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <motion.div
            className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            <CheckCircle size={48} className="text-green-600" />
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Ticket Submitted!</h2>
          <p className="text-gray-600 mb-2">Reference: #{Math.random().toString(36).substring(2, 9).toUpperCase()}</p>
          <p className="text-gray-600 mb-8 max-w-md">
            Our support team will review your request and get back to you within 24 hours.
          </p>
          <motion.button
            onClick={onBack}
            className="bg-[#f44708] hover:bg-[#ff5722] text-white px-8 py-3 rounded-xl font-semibold flex items-center justify-center shadow-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Back to Dashboard
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <motion.div
        className="bg-white border-b border-gray-200 p-6 sticky top-0 z-20 shadow-sm"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center space-x-4">
          <motion.button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft size={20} className="text-gray-700" />
          </motion.button>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Contact Support</h1>
            <p className="text-sm text-gray-500">We&apos;re here to help</p>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 relative z-10">
        {/* Category Selection */}
        <motion.div
          className="bg-gray-50 border border-gray-200 rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="text-gray-900 font-semibold mb-4">What do you need help with?</h3>
          <div className="grid grid-cols-2 gap-3">
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-4 rounded-xl border-2 transition-all ${
                  selectedCategory === category.id
                    ? 'border-[#f44708] bg-[#f44708]/5 scale-[1.02]'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <span className={`font-medium ${
                  selectedCategory === category.id ? 'text-[#f44708]' : 'text-gray-900'
                }`}>
                  {category.label}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Subject */}
        <motion.div
          className="bg-gray-50 border border-gray-200 rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <label className="text-gray-900 font-semibold mb-3 block">Subject</label>
          <Input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Brief description of your issue"
            className="bg-white border-gray-200 text-gray-900 placeholder-gray-500 focus:border-[#f44708]"
          />
        </motion.div>

        {/* Message */}
        <motion.div
          className="bg-gray-50 border border-gray-200 rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <label className="text-gray-900 font-semibold mb-3 block">Message</label>
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value.slice(0, 1000))}
            placeholder="Describe your issue in detail..."
            className="bg-white border-gray-200 text-gray-900 placeholder-gray-500 focus:border-[#f44708] min-h-[150px]"
            rows={6}
          />
          <p className="text-xs text-gray-600 mt-2 text-right">{message.length}/1000</p>
        </motion.div>

        {/* Attachments */}
        <motion.div
          className="bg-gray-50 border border-gray-200 rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-gray-900 font-semibold mb-4">Attachments (Optional)</h3>

          {attachments.length > 0 && (
            <div className="space-y-2 mb-4">
              <AnimatePresence>
                {attachments.map((attachment) => (
                  <motion.div
                    key={attachment.id}
                    className="flex items-center justify-between bg-white border border-gray-200 rounded-xl p-3 group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden border border-gray-200">
                        <img
                          src={attachment.url}
                          alt={attachment.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-gray-900 text-sm truncate max-w-[200px]">
                        {attachment.name}
                      </span>
                    </div>
                    <motion.button
                      onClick={() => removeAttachment(attachment.id)}
                      className="w-8 h-8 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <X size={16} className="text-white" />
                    </motion.button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          <input
            type="file"
            id="file-upload"
            accept="image/*,.pdf"
            multiple
            onChange={handleFileUpload}
            className="hidden"
          />
          <motion.label
            htmlFor="file-upload"
            className="flex items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Upload size={20} />
            <span className="font-medium">Upload Files</span>
          </motion.label>
          <p className="text-xs text-gray-600 mt-2 text-center">
            Max 5 files • JPG, PNG, PDF
          </p>
        </motion.div>

        {/* Submit Button */}
        <motion.button
          onClick={handleSubmit}
          disabled={!canSubmit || isSubmitting}
          className="w-full bg-[#f44708] hover:bg-[#ff5722] text-white py-4 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          whileHover={canSubmit ? { scale: 1.02 } : {}}
          whileTap={canSubmit ? { scale: 0.98 } : {}}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Submitting...</span>
            </>
          ) : (
            <>
              <Send size={20} />
              <span>Submit Ticket</span>
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
}
