'use client'
import React, { useState, useEffect } from 'react';
import { ArrowLeft, QrCode, Phone, Check, Copy } from 'lucide-react';
import { motion } from 'framer-motion';
import { Input } from './ui/input';
import { DeliveryJob, User, UserRole } from '../types';
import { toast } from 'sonner';

interface DeliveryCompletionScreenProps {
  job: DeliveryJob | null;
  user: User | null;
  onBack: () => void;
  onComplete: () => void;
  onHandToProxy: () => void;
  userRole: UserRole;
  completionType?: 'qr' | 'otp';
}

export function DeliveryCompletionScreen({ 
  job, 
  user, 
  onBack, 
  onComplete, 
  onHandToProxy,
  userRole,
  completionType = 'qr'
}: DeliveryCompletionScreenProps) {
  const [generatedCode, setGeneratedCode] = useState('');
  const [enteredCode, setEnteredCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(code);
  }, []);

  const handleCodeVerification = () => {
    setIsVerifying(true);
    setTimeout(() => {
      if (enteredCode === generatedCode) {
        setIsVerifying(false);
        onComplete();
      } else {
        setIsVerifying(false);
        toast.error('Invalid code');
        setEnteredCode('');
      }
    }, 1500);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    toast.success('Code copied');
  };

  if (!job) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2f2f2f] via-[#1a1a1a] to-[#2f2f2f] flex flex-col">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-500 rounded-full opacity-10 blur-3xl"></div>
      </div>

      <motion.div 
        className="bg-[#2f2f2f] border-b border-white/10 p-6 sticky top-0 z-20"
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
            <h1 className="text-lg font-semibold text-white">Delivery Handover</h1>
            <p className="text-sm text-gray-400">Complete delivery</p>
          </div>
        </div>
      </motion.div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 relative z-10">
        {userRole === 'pal' ? (
          <>
            <motion.div 
              className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30 rounded-2xl p-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h3 className="text-white font-semibold mb-2">Your Handover Code</h3>
              <p className="text-green-200 text-sm mb-4">Share this with the receiver</p>
              
              <div className="bg-white p-8 rounded-2xl mb-4">
                <QrCode size={160} className="mx-auto text-gray-800" />
              </div>

              <div className="flex items-center justify-center space-x-2 mb-2">
                <p className="text-white text-4xl font-mono font-bold tracking-wider">{generatedCode}</p>
                <motion.button
                  onClick={copyCode}
                  className="p-2 hover:bg-white/10 rounded-lg"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Copy size={20} className="text-gray-400" />
                </motion.button>
              </div>
            </motion.div>

            <motion.button
              onClick={onHandToProxy}
              className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white py-4 rounded-xl font-semibold"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Hand to Proxy Instead
            </motion.button>
          </>
        ) : (
          <>
            <motion.div 
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h3 className="text-white font-semibold mb-4">Enter Handover Code</h3>
              <p className="text-gray-400 text-sm mb-4">Get the code from your Pal</p>
              
              <Input
                value={enteredCode}
                onChange={(e) => setEnteredCode(e.target.value)}
                placeholder="000000"
                maxLength={6}
                className="bg-white/10 border-white/20 text-white text-center text-2xl tracking-widest mb-4"
              />

              <motion.button
                onClick={handleCodeVerification}
                disabled={enteredCode.length !== 6 || isVerifying}
                className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white py-4 rounded-xl font-semibold disabled:opacity-50"
                whileHover={enteredCode.length === 6 ? { scale: 1.02 } : {}}
                whileTap={enteredCode.length === 6 ? { scale: 0.98 } : {}}
              >
                {isVerifying ? 'Verifying...' : 'Confirm Delivery'}
              </motion.button>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}
