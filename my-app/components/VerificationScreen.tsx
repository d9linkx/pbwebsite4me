'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, Shield, CheckCircle, Upload, Camera, FileText, AlertCircle, User, Phone, CreditCard, FileCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from './ui/badge';
import { apiService } from '@/utils/apiService';
import { toast } from 'sonner';

interface VerificationStatus {
  isVerified: boolean;
  documents: {
    governmentId: { uploaded: boolean; url?: string };
    nin: { uploaded: boolean; verified: boolean; number?: string };
    additionalDocument: { uploaded: boolean; type?: string };
    bvn: { verified: boolean };
  };
  canBid: boolean;
}

interface VerificationScreenProps {
  onBack: () => void;
  onNavigate?: (screen: string) => void;
}

type VerificationStep = {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
  required: boolean;
  key: keyof VerificationStatus['documents'];
};

export function VerificationScreen({ onBack, onNavigate }: VerificationScreenProps) {
  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedStep, setSelectedStep] = useState<string | null>('governmentId');
  const [uploading, setUploading] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [ninInput, setNinInput] = useState('');
  const [bvnInput, setBvnInput] = useState('');

  useEffect(() => {
    fetchVerificationStatus();
  }, []);

  const getVerificationSteps = useCallback((): VerificationStep[] => {
    // Always return steps, even if verificationStatus is loading
    const defaultSteps = [
      {
        id: 'governmentId',
        title: 'Government ID',
        description: 'Upload a government-issued ID (Passport, Driver\'s License, etc.)',
        icon: FileText,
        status: 'pending' as const,
        required: true,
        key: 'governmentId' as const
      },
      {
        id: 'nin',
        title: 'NIN Verification',
        description: 'Verify your National Identification Number',
        icon: CreditCard,
        status: 'pending' as const,
        required: true,
        key: 'nin' as const
      },
      {
        id: 'bvn',
        title: 'BVN Verification',
        description: 'Verify your Bank Verification Number',
        icon: User,
        status: 'pending' as const,
        required: true,
        key: 'bvn' as const
      },
      {
        id: 'additionalDocument',
        title: 'Additional Document',
        description: 'Upload utility bill or other supporting document',
        icon: FileCheck,
        status: 'pending' as const,
        required: false,
        key: 'additionalDocument' as const
      }
    ];

    if (!verificationStatus || !verificationStatus.documents) {
      return defaultSteps;
    }

    return defaultSteps.map(step => {
      switch (step.id) {
        case 'governmentId':
          return {
            ...step,
            status: verificationStatus.documents.governmentId.uploaded ? 'completed' : 'pending'
          };
        case 'nin':
          return {
            ...step,
            status: verificationStatus.documents.nin.verified ? 'completed' : 
                   verificationStatus.documents.nin.uploaded ? 'in-progress' : 'pending'
          };
        case 'bvn':
          return {
            ...step,
            status: verificationStatus.documents.bvn.verified ? 'completed' : 'pending'
          };
        case 'additionalDocument':
          return {
            ...step,
            status: verificationStatus.documents.additionalDocument.uploaded ? 'completed' : 'pending'
          };
        default:
          return step;
      }
    });
  }, [verificationStatus]);

  useEffect(() => {
    // Auto-select the first incomplete required step
    if (verificationStatus && !selectedStep && !loading) {
      const steps = getVerificationSteps();
      const firstIncompleteStep = steps.find(step => 
        step.required && step.status !== 'completed'
      );
      if (firstIncompleteStep) {
        console.log('Auto-selecting step:', firstIncompleteStep.id);
        setSelectedStep(firstIncompleteStep.id);
      }
    }
  }, [verificationStatus, selectedStep, loading, getVerificationSteps]);

  const fetchVerificationStatus = async () => {
    try {
      const response = await apiService.getVerificationStatus();
      if (response.success && response.data) {
        setVerificationStatus(response.data);
      }
    } catch (error) {
      toast.error('Failed to fetch verification status');
    } finally {
      setLoading(false);
    }
  };

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

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, stepId: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(stepId);
    
    try {
      let response;
      
      if (stepId === 'governmentId') {
        response = await apiService.uploadGovernmentId(file);
      } else if (stepId === 'additionalDocument') {
        response = await apiService.uploadAdditionalDocument(file, 'utility_bill');
      }

      if (response?.success && response.data) {
        toast.success(response.data.message);
        await fetchVerificationStatus(); // Refresh status
        setSelectedStep(null);
        setUploadedFile(null);
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Upload failed';
      toast.error(errorMessage);
    } finally {
      setUploading(null);
    }
  };

  const handleNinVerification = async () => {
    if (!ninInput.trim()) {
      toast.error('Please enter your NIN number');
      return;
    }

    setUploading('nin');
    
    try {
      const response = await apiService.verifyNin(ninInput.trim());
      if (response.success && response.data) {
        toast.success(response.data.message);
        setNinInput('');
        await fetchVerificationStatus();
        setSelectedStep(null);
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'NIN verification failed';
      toast.error(errorMessage);
    } finally {
      setUploading(null);
    }
  };

  const handleBvnVerification = async () => {
    if (!bvnInput.trim()) {
      toast.error('Please enter your BVN number');
      return;
    }

    setUploading('bvn');
    
    try {
      const response = await apiService.verifyBvn(bvnInput.trim());
      if (response.success && response.data) {
        toast.success(response.data.message);
        setBvnInput('');
        await fetchVerificationStatus();
        setSelectedStep(null);
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'BVN verification failed';
      toast.error(errorMessage);
    } finally {
      setUploading(null);
    }
  };

  const handleStepClick = (stepId: string) => {
    const steps = getVerificationSteps();
    const step = steps.find(s => s.id === stepId);
    if (step && step.status !== 'completed') {
      setSelectedStep(stepId);
    }
  };

  const verificationSteps = getVerificationSteps();
  const overallProgress = verificationSteps.length > 0 
    ? (verificationSteps.filter(step => step.status === 'completed').length / verificationSteps.length) * 100 
    : 0;
  const completedCount = verificationSteps.filter(step => step.status === 'completed').length;

  // Debug log
  console.log('selectedStep:', selectedStep);
  console.log('verificationSteps:', verificationSteps);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!verificationStatus) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <AlertCircle size={48} className="text-red-500 mx-auto mb-4" />
          <p className="text-gray-600">Failed to load verification status</p>
        </div>
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
              <p className="text-sm text-gray-500">Complete verification to unlock bidding features</p>
            </div>
          </div>
          <Badge className={verificationStatus.canBid ? "bg-green-100 text-green-700 border-0" : "bg-yellow-100 text-yellow-700 border-0"}>
            <Shield size={14} />
            <span className="ml-1">
              {verificationSteps.length > 0 ? `${completedCount}/${verificationSteps.length}` : 'Loading...'}
            </span>
          </Badge>
        </div>
      </motion.div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 relative z-10">
        {/* Status Banner */}
        {verificationStatus.canBid && (
          <motion.div
            className="bg-green-50 border border-green-200 rounded-2xl p-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center space-x-3">
              <CheckCircle size={24} className="text-green-600" />
              <div>
                <h4 className="font-medium text-green-900">Verification Complete!</h4>
                <p className="text-sm text-green-800">You can now bid on packages and make deliveries.</p>
              </div>
            </div>
          </motion.div>
        )}

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
            
            console.log(`Step ${step.id} isSelected:`, isSelected);

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
                      {step.id === 'nin' && (
                        <div className="space-y-3">
                          <input
                            type="text"
                            value={ninInput}
                            onChange={(e) => setNinInput(e.target.value)}
                            placeholder="Enter your 11-digit NIN number"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            maxLength={11}
                          />
                          <motion.button
                            onClick={handleNinVerification}
                            disabled={uploading === 'nin' || !ninInput.trim()}
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-semibold disabled:opacity-50 flex items-center justify-center"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {uploading === 'nin' ? (
                              <span className="flex items-center justify-center">
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                Verifying...
                              </span>
                            ) : (
                              'Verify NIN'
                            )}
                          </motion.button>
                        </div>
                      )}

                      {step.id === 'bvn' && (
                        <div className="space-y-3">
                          <input
                            type="text"
                            value={bvnInput}
                            onChange={(e) => setBvnInput(e.target.value)}
                            placeholder="Enter your 11-digit BVN number"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            maxLength={11}
                          />
                          <motion.button
                            onClick={handleBvnVerification}
                            disabled={uploading === 'bvn' || !bvnInput.trim()}
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-semibold disabled:opacity-50 flex items-center justify-center"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {uploading === 'bvn' ? (
                              <span className="flex items-center justify-center">
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                Verifying...
                              </span>
                            ) : (
                              'Verify BVN'
                            )}
                          </motion.button>
                        </div>
                      )}

                      {(step.id === 'governmentId' || step.id === 'additionalDocument') && (
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <input
                              type="file"
                              id={`camera-${step.id}`}
                              accept="image/*,.pdf"
                              capture="environment"
                              onChange={(e) => handleFileUpload(e, step.id)}
                              className="hidden"
                              disabled={uploading === step.id}
                            />
                            <motion.label
                              htmlFor={`camera-${step.id}`}
                              className="flex flex-col items-center justify-center bg-blue-50 border-2 border-blue-500 text-blue-600 p-6 rounded-xl cursor-pointer disabled:opacity-50 hover:bg-blue-100"
                              whileHover={{ scale: uploading === step.id ? 1 : 1.02 }}
                              whileTap={{ scale: uploading === step.id ? 1 : 0.98 }}
                            >
                              {uploading === step.id ? (
                                <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mb-2"></div>
                              ) : (
                                <Camera size={32} className="mb-2" />
                              )}
                              <span className="font-medium text-sm">
                                {uploading === step.id ? 'Uploading...' : 'Take Photo'}
                              </span>
                            </motion.label>
                          </div>

                          <div>
                            <input
                              type="file"
                              id={`file-${step.id}`}
                              accept="image/*,.pdf"
                              onChange={(e) => handleFileUpload(e, step.id)}
                              className="hidden"
                              disabled={uploading === step.id}
                            />
                            <motion.label
                              htmlFor={`file-${step.id}`}
                              className="flex flex-col items-center justify-center bg-blue-50 border-2 border-blue-500 text-blue-600 p-6 rounded-xl cursor-pointer disabled:opacity-50 hover:bg-blue-100"
                              whileHover={{ scale: uploading === step.id ? 1 : 1.02 }}
                              whileTap={{ scale: uploading === step.id ? 1 : 0.98 }}
                            >
                              {uploading === step.id ? (
                                <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mb-2"></div>
                              ) : (
                                <Upload size={32} className="mb-2" />
                              )}
                              <span className="font-medium text-sm">
                                {uploading === step.id ? 'Uploading...' : 'Upload File'}
                              </span>
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
            <li>Bid on packages and make deliveries</li>
            <li>Access higher transaction limits</li>
            <li>Priority support access</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
