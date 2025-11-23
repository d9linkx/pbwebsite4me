'use client';
import React, { useState } from 'react';
import { ArrowLeft, Shield, CheckCircle, Upload, Camera, FileText, AlertCircle, User, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from './ui/badge';
import { User as UserType, Screen } from '../types';

interface VerificationScreenProps {
  user: UserType | null;
  onNavigate?: (screen: Screen) => void;
  onBack: () => void;
  onSubmit: (idUrl: string) => void;
  onUpdateUser?: (user: UserType) => void; // Keeping for backward compatibility
}

type VerificationStep = {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
  required: boolean;
};

export function VerificationScreen({ 
  user, 
  onBack, 
  onSubmit,
  onNavigate,
  onUpdateUser 
}: VerificationScreenProps) {
  const [verificationSteps, setVerificationSteps] = useState<VerificationStep[]>([
    {
      id: 'identity',
      title: 'Identity Verification',
      description: 'Upload a government-issued ID (NIN, Passport, Driver\'s License)',
      icon: User,
      status: user?.isVerified ? 'completed' : 'pending',
      required: true
    },
    {
      id: 'phone',
      title: 'Phone Verification',
      description: 'Verify your Nigerian phone number with OTP',
      icon: Phone,
      status: user?.phone ? 'completed' : 'pending',
      required: true
    },
    {
      id: 'address',
      title: 'Address Verification',
      description: 'Verify your address with a utility bill',
      icon: FileText,
      status: user?.location?.address ? 'in-progress' : 'pending',
      required: false
    }
  ]);

  const [selectedStep, setSelectedStep] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);

  const getStatusBadge = (status: string, required: boolean) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-700 border-0">Verified</Badge>;
      case 'in-progress':
        return <Badge className="bg-blue-100 text-blue-700 border-0">In Review</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-700 border-0">Failed</Badge>;
      default:
        return required
          ? <Badge className="bg-yellow-100 text-yellow-700 border-0">Required</Badge>
          : <Badge className="bg-gray-100 text-gray-700 border-0">Optional</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={24} className="text-green-600" />;
      case 'in-progress':
        return <div className="w-6 h-6 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />;
      case 'failed':
        return <AlertCircle size={24} className="text-red-600" />;
      default:
        return <div className="w-6 h-6 border-2 border-gray-400 rounded-full" />;
    }
  };

  const getOverallProgress = () => {
    const completed = verificationSteps.filter(step => step.status === 'completed').length;
    return (completed / verificationSteps.length) * 100;
  };

  const handleStepClick = (stepId: string) => {
    const step = verificationSteps.find(s => s.id === stepId);
    if (step && step.status !== 'completed') {
      setSelectedStep(stepId);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedFile(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!selectedStep || !uploadedFile) return;
    
    setIsUploading(true);
    setTimeout(() => {
      setVerificationSteps(prev => prev.map(step => 
        step.id === selectedStep 
          ? { ...step, status: 'in-progress' as const }
          : step
      ));
      setIsUploading(false);
      setSelectedStep(null);
      setUploadedFile(null);
    }, 2000);
  };

  const overallProgress = getOverallProgress();
  const completedCount = verificationSteps.filter(s => s.status === 'completed').length;

  if (!user) return null;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <motion.div
        className="bg-white border-b border-gray-200 p-6 sticky top-0 z-20 shadow-sm"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between">
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
              <h1 className="text-lg font-semibold text-gray-900">Account Verification</h1>
              <p className="text-sm text-gray-500">Complete verification to unlock features</p>
            </div>
          </div>
          <Badge className="bg-green-100 text-green-700 border-0 flex items-center space-x-1">
            <Shield size={14} />
            <span>{completedCount}/{verificationSteps.length}</span>
          </Badge>
        </div>
      </motion.div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 relative z-10">
        {/* Progress Card */}
        <motion.div
          className="bg-gray-50 border border-gray-200 rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-gray-900 font-semibold mb-1">Verification Progress</h3>
              <p className="text-gray-600 text-sm">{Math.round(overallProgress)}% complete</p>
            </div>
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <Shield size={32} className="text-green-600" />
            </div>
          </div>

          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${overallProgress}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </div>
        </motion.div>

        {/* Verification Steps */}
        <div className="space-y-4">
          {verificationSteps.map((step, index) => {
            const Icon = step.icon;
            const isSelected = selectedStep === step.id;

            return (
              <motion.div
                key={step.id}
                className={`bg-white border rounded-2xl p-6 cursor-pointer transition-all ${
                  isSelected
                    ? 'border-[#f44708] bg-[#f44708]/5 scale-[1.02]'
                    : step.status === 'completed'
                    ? 'border-green-200'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => handleStepClick(step.id)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: step.status !== 'completed' ? 1.02 : 1 }}
                whileTap={{ scale: step.status !== 'completed' ? 0.98 : 1 }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      step.status === 'completed'
                        ? 'bg-green-100'
                        : step.status === 'in-progress'
                        ? 'bg-blue-100'
                        : 'bg-gray-100'
                    }`}>
                      <Icon size={24} className={
                        step.status === 'completed'
                          ? 'text-green-600'
                          : step.status === 'in-progress'
                          ? 'text-blue-600'
                          : 'text-gray-600'
                      } />
                    </div>
                    <div>
                      <h4 className="text-gray-900 font-semibold">{step.title}</h4>
                      <p className="text-sm text-gray-600">{step.description}</p>
                    </div>
                  </div>
                  {getStatusIcon(step.status)}
                </div>

                <div className="flex items-center justify-between">
                  {getStatusBadge(step.status, step.required)}
                  {step.status !== 'completed' && (
                    <span className="text-[#f44708] text-sm font-medium">
                      Tap to {step.status === 'in-progress' ? 'review' : 'verify'} →
                    </span>
                  )}
                </div>

                {/* Expanded Upload Section */}
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      className="mt-4 pt-4 border-t border-gray-200 space-y-4"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      {/* Upload Preview */}
                      {uploadedFile ? (
                        <div className="space-y-3">
                          <div className="relative w-full h-48 rounded-xl overflow-hidden border border-gray-200">
                            <img
                              src={uploadedFile}
                              alt="Uploaded document"
                              className="w-full h-full object-cover"
                            />
                            <motion.button
                              onClick={() => setUploadedFile(null)}
                              className="absolute top-2 right-2 w-8 h-8 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center shadow-sm"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <AlertCircle size={16} className="text-white" />
                            </motion.button>
                          </div>
                          <motion.button
                            onClick={handleSubmit}
                            disabled={isUploading}
                            className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-semibold disabled:opacity-50 flex items-center justify-center shadow-sm"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {isUploading ? (
                              <span className="flex items-center justify-center">
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                Submitting...
                              </span>
                            ) : (
                              'Submit for Verification'
                            )}
                          </motion.button>
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 gap-3">
                          {/* Camera Upload */}
                          <div>
                            <input
                              type="file"
                              id={`camera-${step.id}`}
                              accept="image/*"
                              capture="environment"
                              onChange={handleFileUpload}
                              className="hidden"
                            />
                            <motion.label
                              htmlFor={`camera-${step.id}`}
                              className="flex flex-col items-center justify-center bg-[#f44708] hover:bg-[#ff5722] text-white p-6 rounded-xl cursor-pointer shadow-sm"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <Camera size={32} className="mb-2" />
                              <span className="font-medium text-sm">Take Photo</span>
                            </motion.label>
                          </div>

                          {/* File Upload */}
                          <div>
                            <input
                              type="file"
                              id={`file-${step.id}`}
                              accept="image/*,.pdf"
                              onChange={handleFileUpload}
                              className="hidden"
                            />
                            <motion.label
                              htmlFor={`file-${step.id}`}
                              className="flex flex-col items-center justify-center bg-blue-500 hover:bg-blue-600 text-white p-6 rounded-xl cursor-pointer shadow-sm"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <Upload size={32} className="mb-2" />
                              <span className="font-medium text-sm">Upload File</span>
                            </motion.label>
                          </div>
                        </div>
                      )}

                      <p className="text-xs text-gray-600 text-center">
                        Accepted: JPG, PNG, PDF • Max 5MB
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Info Section */}
        <motion.div
          className="bg-blue-50 border border-blue-200 rounded-2xl p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h4 className="font-medium text-blue-900 mb-2">Why Verify?</h4>
          <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
            <li>Increase trust with other users</li>
            <li>Access higher transaction limits</li>
            <li>Unlock premium features</li>
            <li>Priority support access</li>
          </ul>
        </motion.div>

        {/* Guidelines */}
        <motion.div
          className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h4 className="font-medium text-yellow-900 mb-2">Document Guidelines:</h4>
          <ul className="text-sm text-yellow-800 space-y-1 list-disc list-inside">
            <li>Ensure document is clear and readable</li>
            <li>All corners of the document must be visible</li>
            <li>No glare or shadows</li>
            <li>Information must match your profile</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
