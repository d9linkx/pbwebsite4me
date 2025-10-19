'use client'
import React, { useState } from 'react';
import { ArrowLeft, Camera, Upload, X, FileText, AlertCircle, Image as ImageIcon, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Textarea } from './ui/textarea';
import { DeliveryJob, User } from '../types';

interface EvidenceFile {
  id: string;
  name: string;
  type: string;
  url: string;
  size: number;
}

interface EvidenceCollectionScreenProps {
  job: DeliveryJob | null;
  user: User | null;
  onBack: () => void;
  onSubmitEvidence: (files: EvidenceFile[], description: string) => void;
}

export function EvidenceCollectionScreen({ 
  job, 
  user, 
  onBack, 
  onSubmitEvidence 
}: EvidenceCollectionScreenProps) {
  const [evidenceFiles, setEvidenceFiles] = useState<EvidenceFile[]>([]);
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          const newFile: EvidenceFile = {
            id: Math.random().toString(36).substring(7),
            name: file.name,
            type: file.type,
            url: result,
            size: file.size
          };
          setEvidenceFiles(prev => [...prev, newFile]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeFile = (id: string) => {
    setEvidenceFiles(prev => prev.filter(f => f.id !== id));
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      onSubmitEvidence(evidenceFiles, description);
    }, 1500);
  };

  const canSubmit = evidenceFiles.length > 0 && description.trim().length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2f2f2f] via-[#1a1a1a] to-[#2f2f2f] flex flex-col">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-500 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-0 -left-40 w-80 h-80 bg-orange-500 rounded-full opacity-10 blur-3xl"></div>
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
            <h1 className="text-lg font-semibold text-white">Collect Evidence</h1>
            <p className="text-sm text-gray-400">Submit photos and details</p>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 relative z-10">
        {/* Dispute Info */}
        <motion.div 
          className="bg-red-500/20 border border-red-500/30 rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-start space-x-3">
            <AlertCircle size={24} className="text-red-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-white font-semibold mb-2">Dispute Active</h3>
              <p className="text-red-200 text-sm">
                Provide evidence to support your case. Include clear photos and a detailed description of the issue.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Upload Section */}
        <motion.div 
          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-white font-semibold mb-4">Evidence Photos</h3>
          
          {/* Upload Buttons */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <label className="cursor-pointer">
              <motion.div
                className="bg-white/10 hover:bg-white/20 border-2 border-dashed border-white/30 hover:border-blue-500/50 rounded-xl p-4 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex flex-col items-center text-center">
                  <Camera size={32} className="text-blue-400 mb-2" />
                  <span className="text-white text-sm font-medium">Take Photo</span>
                </div>
              </motion.div>
              <input
                type="file"
                accept="image/*"
                capture="environment"
                multiple
                onChange={handleFileCapture}
                className="hidden"
              />
            </label>

            <label className="cursor-pointer">
              <motion.div
                className="bg-white/10 hover:bg-white/20 border-2 border-dashed border-white/30 hover:border-purple-500/50 rounded-xl p-4 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex flex-col items-center text-center">
                  <Upload size={32} className="text-purple-400 mb-2" />
                  <span className="text-white text-sm font-medium">Upload File</span>
                </div>
              </motion.div>
              <input
                type="file"
                accept="image/*,application/pdf"
                multiple
                onChange={handleFileCapture}
                className="hidden"
              />
            </label>
          </div>

          {/* File List */}
          <AnimatePresence>
            {evidenceFiles.length > 0 && (
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                {evidenceFiles.map((file) => (
                  <motion.div
                    key={file.id}
                    className="bg-white/10 border border-white/20 rounded-xl p-3 flex items-center space-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    {file.type.startsWith('image/') ? (
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-white/10 flex-shrink-0">
                        <img src={file.url} alt={file.name} className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                        <FileText size={24} className="text-blue-400" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium truncate">{file.name}</p>
                      <p className="text-gray-400 text-xs">{(file.size / 1024).toFixed(1)} KB</p>
                    </div>
                    <motion.button
                      onClick={() => removeFile(file.id)}
                      className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <X size={18} className="text-red-400" />
                    </motion.button>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {evidenceFiles.length === 0 && (
            <p className="text-gray-400 text-sm text-center py-4">
              No files added yet. Upload at least one photo.
            </p>
          )}
        </motion.div>

        {/* Description */}
        <motion.div 
          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-white font-semibold mb-4">Description *</h3>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the issue in detail. Include what happened, when it occurred, and any relevant context..."
            rows={6}
            className="bg-white/10 border-white/20 text-white placeholder-gray-500 focus:border-red-500"
          />
          <p className="text-gray-400 text-sm mt-2">
            {description.length} characters
          </p>
        </motion.div>

        {/* Tips */}
        <motion.div 
          className="bg-blue-500/20 border border-blue-500/30 rounded-2xl p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h4 className="font-medium text-blue-300 mb-2">Evidence Tips:</h4>
          <ul className="text-sm text-blue-200 space-y-1 list-disc list-inside">
            <li>Take clear, well-lit photos</li>
            <li>Include multiple angles if relevant</li>
            <li>Provide specific details in description</li>
            <li>Include timestamps or receipts if available</li>
          </ul>
        </motion.div>

        {/* Submit Button */}
        <motion.button
          onClick={handleSubmit}
          disabled={!canSubmit || isSubmitting}
          className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white py-4 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          whileHover={canSubmit && !isSubmitting ? { scale: 1.02 } : {}}
          whileTap={canSubmit && !isSubmitting ? { scale: 0.98 } : {}}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Submitting Evidence...</span>
            </>
          ) : (
            <>
              <CheckCircle size={20} />
              <span>Submit Evidence</span>
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
}
