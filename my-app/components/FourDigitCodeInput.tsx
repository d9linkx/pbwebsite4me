'use client'
import React, { useState } from 'react';
import { Hash, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

interface FourDigitCodeInputProps {
  onCodeVerified: (code: string) => void;
  onCancel?: () => void;
  placeholder?: string;
}

export function FourDigitCodeInput({ onCodeVerified, onCancel, placeholder }: FourDigitCodeInputProps) {
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [digitCode, setDigitCode] = useState(['', '', '', '']);
  const [codeSent, setCodeSent] = useState(false);

  const handleSendCode = (method: 'whatsapp' | 'sms' | 'email') => {
    const fourDigitCode = Math.floor(1000 + Math.random() * 9000).toString();
    setCodeSent(true);
    toast.success(`4-digit code sent via ${method.toUpperCase()}: ${fourDigitCode}`);
    // In production, this would send via the selected method
  };

  const handleDigitChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newCode = [...digitCode];
      newCode[index] = value;
      setDigitCode(newCode);

      // Auto-focus next input
      if (value && index < 3) {
        const nextInput = document.getElementById(`digit-${index + 1}`);
        nextInput?.focus();
      }

      // Auto-verify when all digits entered
      if (newCode.every(d => d) && newCode.join('').length === 4) {
        setTimeout(() => {
          onCodeVerified(`CODE-${newCode.join('')}`);
          toast.success('Code verified successfully');
        }, 500);
      }
    }
  };

  const handleDigitKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !digitCode[index] && index > 0) {
      const prevInput = document.getElementById(`digit-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleCancelAll = () => {
    setShowCodeInput(false);
    setCodeSent(false);
    setDigitCode(['', '', '', '']);
    if (onCancel) onCancel();
  };

  if (!showCodeInput) {
    return (
      <>
        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/20"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-[#1a1a1a] text-gray-400">OR</span>
          </div>
        </div>

        {/* 4-Digit Code Button */}
        <motion.button
          onClick={() => setShowCodeInput(true)}
          className="w-full bg-white/10 backdrop-blur-sm border border-white/20 text-white py-4 px-6 rounded-2xl font-medium"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center justify-center space-x-2">
            <Hash size={20} />
            <span>Enter 4-Digit Code Instead</span>
          </div>
        </motion.button>
      </>
    );
  }

  return (
    <motion.div
      className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 space-y-4"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
    >
      <div className="text-center">
        <h4 className="text-white font-medium mb-2">{placeholder || 'Request Code from Other Person'}</h4>
        <p className="text-gray-400 text-sm mb-4">
          {placeholder ? 'Enter the 4-digit code sent to them' : 'Ask them to send you a 4-digit verification code'}
        </p>
      </div>

      {!codeSent ? (
        <div className="grid grid-cols-3 gap-3">
          <motion.button
            onClick={() => handleSendCode('whatsapp')}
            className="bg-green-500/20 border border-green-500/30 text-green-300 py-3 px-4 rounded-xl font-medium hover:bg-green-500/30 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex flex-col items-center space-y-1">
              <Send size={18} />
              <span className="text-xs">WhatsApp</span>
            </div>
          </motion.button>
          <motion.button
            onClick={() => handleSendCode('sms')}
            className="bg-blue-500/20 border border-blue-500/30 text-blue-300 py-3 px-4 rounded-xl font-medium hover:bg-blue-500/30 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex flex-col items-center space-y-1">
              <Send size={18} />
              <span className="text-xs">SMS</span>
            </div>
          </motion.button>
          <motion.button
            onClick={() => handleSendCode('email')}
            className="bg-purple-500/20 border border-purple-500/30 text-purple-300 py-3 px-4 rounded-xl font-medium hover:bg-purple-500/30 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex flex-col items-center space-y-1">
              <Send size={18} />
              <span className="text-xs">Email</span>
            </div>
          </motion.button>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-green-400 text-sm text-center">Code sent! Ask them to share it with you</p>
          
          <div>
            <p className="text-gray-400 text-sm mb-3 text-center">Enter 4-Digit Code:</p>
            <div className="flex justify-center space-x-3">
              {digitCode.map((digit, index) => (
                <input
                  key={index}
                  id={`digit-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleDigitChange(index, e.target.value)}
                  onKeyDown={(e) => handleDigitKeyDown(index, e)}
                  className="w-14 h-14 text-center text-2xl font-bold bg-white/10 border-2 border-white/20 rounded-xl text-white focus:border-green-500 focus:outline-none transition-colors"
                />
              ))}
            </div>
          </div>

          <motion.button
            onClick={handleCancelAll}
            className="w-full bg-white/10 text-gray-400 py-2 px-4 rounded-xl text-sm hover:bg-white/20 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Cancel
          </motion.button>
        </div>
      )}
    </motion.div>
  );
}
