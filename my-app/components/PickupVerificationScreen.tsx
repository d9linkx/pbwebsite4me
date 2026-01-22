'use client'
import React, { useState } from 'react';
import { ArrowLeft, QrCode, CheckCircle, Package, Camera, Copy, Repeat } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { DeliveryJob, User } from '../types';
import { FourDigitCodeInput } from './FourDigitCodeInput';

interface PickupVerificationScreenProps {
  job: DeliveryJob | null;
  user: User | null;
  onBack: () => void;
  onVerificationComplete: () => void;
}

export function PickupVerificationScreen({ job, user, onBack, onVerificationComplete }: PickupVerificationScreenProps) {
  const [mode, setMode] = useState<'scan' | 'show'>('scan');
  const [isScanning, setIsScanning] = useState(false);
  const [scannedCode, setScannedCode] = useState<string | null>(null);

  const myHandoverCode = `PRAWN-${Date.now().toString().slice(-6)}`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(myHandoverCode);
    toast.success('Code copied to clipboard');
  };

  const handleScanDemo = () => {
    setIsScanning(true);
    setTimeout(() => {
      const mockCode = `PRAWN-${Date.now().toString().slice(-8)}`;
      setScannedCode(mockCode);
      setIsScanning(false);
      toast.success('QR Code scanned successfully');
      // Auto-complete pickup after scan
      setTimeout(() => {
        onVerificationComplete();
      }, 1000);
    }, 2000);
  };

  const handleScanAgain = () => {
    setScannedCode(null);
    setIsScanning(false);
  };

  const handleCodeVerified = (code: string) => {
    setScannedCode(code);
    toast.success('Sender code verified');
    // Auto-complete pickup after code verification
    setTimeout(() => {
      onVerificationComplete();
    }, 1000);
  };

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
        <div className="flex items-center space-x-4">
          <motion.button
            onClick={onBack}
            className="p-2 hover:bg-white/10 rounded-xl transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft size={20} className="text-white" />
          </motion.button>
          <div className="flex-1">
            <h1 className="text-lg font-semibold text-white">Pickup Verification</h1>
            <p className="text-sm text-gray-400">Verify handover with sender</p>
          </div>
        </div>
      </motion.div>

      {/* Mode Toggle */}
      <motion.div 
        className="p-4 relative z-10"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-2 flex space-x-2">
          <motion.button
            onClick={() => setMode('scan')}
            className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
              mode === 'scan' 
                ? 'bg-white text-dark' 
                : 'text-gray-400 hover:text-white'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center justify-center space-x-2">
              <Camera size={18} />
              <span>Scan Sender&apos;s Code</span>
            </div>
          </motion.button>
          <motion.button
            onClick={() => setMode('show')}
            className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
              mode === 'show' 
                ? 'bg-white text-dark' 
                : 'text-gray-400 hover:text-white'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center justify-center space-x-2">
              <QrCode size={18} />
              <span>Show My Code</span>
            </div>
          </motion.button>
        </div>
      </motion.div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 relative z-10">
        <AnimatePresence mode="wait">
          {mode === 'scan' ? (
            <motion.div
              key="scan"
              className="space-y-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              {/* Item Info */}
              <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-2xl p-6">
                <div className="flex items-center space-x-3">
                  <Package size={24} className="text-purple-300" />
                  <div>
                    <h3 className="text-white font-semibold">{job?.title || 'N/A'}</h3>
                    <p className="text-purple-200 text-sm">Delivery ID: {job?.id || 'N/A'}</p>
                  </div>
                </div>
              </div>

              {!scannedCode ? (
                <>
                  {/* Scanner View */}
                  <div className="w-full aspect-square bg-white/10 backdrop-blur-sm border-2 border-dashed border-white/30 rounded-2xl overflow-hidden relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        className="w-64 h-64 border-4 border-green-500 rounded-2xl relative"
                        animate={{
                          boxShadow: [
                            '0 0 0 0 rgba(34, 197, 94, 0.4)',
                            '0 0 0 20px rgba(34, 197, 94, 0)',
                            '0 0 0 0 rgba(34, 197, 94, 0)'
                          ]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'easeOut'
                        }}
                      >
                        {/* Corner markers */}
                        <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-green-500"></div>
                        <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-green-500"></div>
                        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-green-500"></div>
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-green-500"></div>

                        {/* Scanning line */}
                        <motion.div
                          className="absolute left-0 right-0 h-1 bg-green-500"
                          animate={{ top: ['0%', '100%'] }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'linear'
                          }}
                        />

                        {/* Center icon */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          {isScanning ? (
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            >
                              <Camera size={48} className="text-green-500/50" />
                            </motion.div>
                          ) : (
                            <QrCode size={48} className="text-green-500/50" />
                          )}
                        </div>
                      </motion.div>
                    </div>
                  </div>

                  {/* Instructions */}
                  <div className="bg-green-500/20 border border-green-500/30 rounded-2xl p-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-green-500/30 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Camera size={20} className="text-green-300" />
                      </div>
                      <div className="flex-1">
                        <p className="text-green-200 text-sm leading-relaxed">
                          Position the sender&apos;s QR code within the frame to verify the pickup handover.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Scan Button */}
                  <motion.button
                    onClick={handleScanDemo}
                    disabled={isScanning}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 px-6 rounded-2xl font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: isScanning ? 1 : 1.02 }}
                    whileTap={{ scale: isScanning ? 1 : 0.98 }}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      {isScanning ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          >
                            <Camera size={20} />
                          </motion.div>
                          <span>Scanning...</span>
                        </>
                      ) : (
                        <>
                          <Camera size={20} />
                          <span>Start Camera Scan</span>
                        </>
                      )}
                    </div>
                  </motion.button>

                  {/* 4-Digit Code Alternative */}
                  <FourDigitCodeInput 
                    onCodeVerified={handleCodeVerified}
                    onCancel={() => {}}
                  />
                </>
              ) : (
                <motion.div
                  className="space-y-6"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  {/* Success Card */}
                  <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-2xl p-8 text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                      className="inline-flex w-20 h-20 bg-green-500/30 rounded-full items-center justify-center mb-4"
                    >
                      <CheckCircle size={40} className="text-green-400" />
                    </motion.div>
                    <h3 className="text-white font-semibold text-xl mb-2">Code Verified!</h3>
                    <p className="text-green-200 text-sm mb-4">Completing pickup automatically...</p>
                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
                      <p className="text-gray-400 text-xs mb-1">Verified Code:</p>
                      <p className="text-white font-mono font-semibold text-lg">{scannedCode}</p>
                    </div>
                  </div>

                  {/* Loading Animation */}
                  <div className="flex justify-center">
                    <motion.div
                      className="flex space-x-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
                          animate={{
                            y: [-10, 0, -10],
                            opacity: [0.5, 1, 0.5]
                          }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            delay: i * 0.2,
                            ease: 'easeInOut'
                          }}
                        />
                      ))}
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="show"
              className="space-y-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              {/* Item Info */}
              <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-2xl p-6 text-center">
                <h3 className="text-white font-semibold mb-2">{job?.title || 'N/A'}</h3>
                <p className="text-purple-200 text-sm">Delivery ID: {job?.id || 'N/A'}</p>
              </div>

              {/* QR Code Display */}
              <motion.div
                className="bg-white p-8 rounded-2xl shadow-2xl"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                <div className="aspect-square bg-gray-200 rounded-xl flex items-center justify-center relative overflow-hidden">
                  {/* Decorative pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="grid grid-cols-8 grid-rows-8 h-full w-full">
                      {Array.from({ length: 64 }).map((_, i) => (
                        <div key={i} className={`border border-gray-400 ${Math.random() > 0.5 ? 'bg-gray-800' : ''}`}></div>
                      ))}
                    </div>
                  </div>
                  <QrCode size={200} className="text-gray-800 relative z-10" />
                </div>
              </motion.div>

              {/* Code Display */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                <p className="text-gray-400 text-sm mb-3 text-center">My Pickup Code:</p>
                <div className="flex items-center justify-center space-x-3">
                  <p className="text-white text-3xl font-mono font-bold tracking-wider">
                    {myHandoverCode}
                  </p>
                  <motion.button
                    onClick={handleCopyCode}
                    className="p-3 hover:bg-white/10 rounded-xl transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Copy size={20} className="text-gray-400" />
                  </motion.button>
                </div>
              </div>

              {/* Instructions */}
              <div className="bg-blue-500/20 border border-blue-500/30 rounded-2xl p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-blue-500/30 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                    <QrCode size={20} className="text-blue-300" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-blue-300 mb-2">Pickup Verification:</h4>
                    <ul className="text-sm text-blue-200 space-y-1 list-disc list-inside">
                      <li>Show this code to the sender</li>
                      <li>Sender can scan to verify handover</li>
                      <li>Alternatively, you can scan their code</li>
                      <li>Take photos after verification</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
