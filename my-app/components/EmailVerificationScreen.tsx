'use client';
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Mail, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { VerifyEmailResponse } from '../types';
import { useAuth } from '@/utils/apiHooks';

interface EmailVerificationScreenProps {
  email: string;
  onBack: () => void;
  onVerified: (response: VerifyEmailResponse) => void;
  onResendCode: () => void;
}

export function EmailVerificationScreen({
  email,
  onBack,
  onVerified,
  onResendCode
}: EmailVerificationScreenProps) {
  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [canResend, setCanResend] = useState(false);
  const { verifyEmail } = useAuth();

  // Countdown timer for code expiration
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle verification code input
  const handleCodeChange = (value: string) => {
    // Only allow numeric input and limit to 6 digits
    const numericValue = value.replace(/\D/g, '').slice(0, 6);
    setVerificationCode(numericValue);
    setError('');
  };

  // Handle verification submission
  const handleVerify = async () => {
    if (verificationCode.length !== 6) {
      setError('Please enter the complete 6-digit verification code');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await verifyEmail(email, verificationCode);

      if (response.success) {
        toast.success('Email verified successfully!');
        onVerified(response);
      } else {
        setError(response.message || 'Invalid verification code. Please try again.');
        toast.error('Verification failed');
      }
    } catch (error) {
      setError('Network error. Please check your connection and try again.');
      toast.error('Verification failed');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle resend code
  const handleResendCode = () => {
    setCanResend(false);
    setTimeLeft(600);
    setVerificationCode('');
    setError('');
    onResendCode();
    toast.success('Verification code resent to your email');
  };

  // Auto-submit when code is complete
  useEffect(() => {
    if (verificationCode.length === 6) {
      handleVerify();
    }
  }, [verificationCode]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark via-darker to-dark flex flex-col overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-blue-500 rounded-full opacity-15 blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500 rounded-full opacity-10 blur-3xl"></div>
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
              <h1 className="text-lg font-semibold text-white">Email Verification</h1>
              <p className="text-sm text-gray-400">Verify your account to continue</p>
            </div>
          </div>

          {/* Timer */}
          <div className="flex items-center space-x-2">
            <Clock size={16} className="text-gray-400" />
            <span className={`text-sm font-mono ${timeLeft < 60 ? 'text-red-400' : 'text-gray-400'}`}>
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 relative z-10">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
            {/* Email Icon and Info */}
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail size={40} className="text-white" />
              </div>
              <h2 className="text-xl font-semibold text-white mb-2">Check Your Email</h2>
              <p className="text-gray-400 text-sm mb-2">
                We&apos;ve sent a 6-digit verification code to:
              </p>
              <p className="text-white font-medium break-all">{email}</p>
            </motion.div>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  className="bg-red-500/20 border border-red-500/30 text-red-300 p-3 rounded-xl text-sm mb-6 flex items-center space-x-2"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <AlertCircle size={18} />
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Verification Code Input */}
            <div className="mb-6">
              <label className="text-sm text-gray-400 mb-3 block">Enter Verification Code</label>
              <div className="flex justify-center space-x-2">
                {Array.from({ length: 6 }).map((_, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={verificationCode[index] || ''}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value.match(/^\d*$/)) {
                        const newCode = verificationCode.split('');
                        newCode[index] = value;
                        setVerificationCode(newCode.join(''));
                        // Auto-focus next input
                        if (value && index < 5) {
                          const nextInput = document.querySelector(`input[data-index="${index + 1}"]`) as HTMLInputElement;
                          nextInput?.focus();
                        }
                      }
                    }}
                    className="w-12 h-12 bg-white/10 border-2 border-white/20 rounded-xl text-center text-xl font-semibold text-white focus:border-primary focus:outline-none transition-all"
                    style={{ caretColor: 'transparent' }}
                    data-index={index}
                  />
                ))}
              </div>
              <p className="text-xs text-gray-500 text-center mt-2">
                Enter the 6-digit code from your email
              </p>
            </div>

            {/* Verify Button */}
            <motion.button
              onClick={handleVerify}
              disabled={isLoading || verificationCode.length !== 6}
              className="w-full bg-gradient-to-r from-primary to-primary-hover hover:from-primary-hover hover:to-primary text-white py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 disabled:opacity-50 shadow-lg mb-4"
              whileHover={{ scale: verificationCode.length === 6 ? 1.02 : 1 }}
              whileTap={{ scale: verificationCode.length === 6 ? 0.98 : 1 }}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <CheckCircle size={20} />
                  <span>Verify Email</span>
                </>
              )}
            </motion.button>

            {/* Resend Code */}
            <div className="text-center">
              {canResend ? (
                <button
                  onClick={handleResendCode}
                  className="text-primary hover:text-primary-hover text-sm font-medium transition-colors"
                >
                  Resend verification code
                </button>
              ) : (
                <p className="text-gray-400 text-sm">
                  Didn&apos;t receive the code?{' '}
                  <span className="text-gray-500">Resend in {formatTime(timeLeft)}</span>
                </p>
              )}
            </div>

            {/* Help Text */}
            <motion.div
              className="mt-6 p-4 bg-blue-500/20 border border-blue-500/30 rounded-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <h4 className="font-medium text-blue-300 mb-2">Need Help?</h4>
              <ul className="text-sm text-blue-200 space-y-1">
                <li>• Check your spam/junk folder</li>
                <li>• Make sure the email address is correct</li>
                <li>• The code expires in 10 minutes</li>
                <li>• Contact support if you continue having issues</li>
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
