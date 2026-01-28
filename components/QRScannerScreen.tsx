'use client'
import React, { useState } from 'react';
import { ArrowLeft, QrCode, Camera, Copy, CheckCircle, Repeat } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { FourDigitCodeInput } from './FourDigitCodeInput';

import { DeliveryJob, User, UserRole } from '../types';

interface QRScannerScreenProps {
  onBack: () => void;
  onScanSuccess: (code: string) => void;
  onComplete: () => void;
  job: DeliveryJob | null;
  user: User | null;
  userRole: UserRole;
  scanMode: "pickup" | "delivery" | "proxy-handover" | "receiver-unavailable";
  verificationRetries: number;
  onRetryVerification: () => void;
  onPalOverride: () => void;
  onItemMismatch: (mismatchData: { expected: string; actual: string; }) => void;
}

export function QRScannerScreen({
  onBack,
  onScanSuccess,
  onComplete,
  job,
  user,
  userRole,
  scanMode,
  verificationRetries,
  onRetryVerification,
  onPalOverride,
  onItemMismatch
}: QRScannerScreenProps) {
  const [mode, setMode] = useState<'scan' | 'show'>('scan');
  const [isScanning, setIsScanning] = useState(false);
  const [scannedCode, setScannedCode] = useState<string | null>(null);

  // Generate handover code based on job and user info
  const myHandoverCode = `PRAWN-${job?.id || 'DEMO'}-${Date.now().toString().slice(-4)}`;
  const deliveryId = job?.id || 'N/A';
  const itemTitle = job?.title || 'Item';

  const handleScanDemo = () => {
    setIsScanning(true);
    // Simulate scanning delay
    setTimeout(() => {
      const mockCode = `PRAWN-${Date.now().toString().slice(-8)}`;
      setScannedCode(mockCode);
      setIsScanning(false);
      toast.success('QR Code scanned successfully');
    }, 2000);
  };

  const handleConfirmScan = () => {
    if (scannedCode) {
      onScanSuccess(scannedCode);
      onComplete();
    }
  };

  const handleCodeVerified = (code: string) => {
    setScannedCode(code);
    onScanSuccess(code);
    onComplete();
  };

  const handleScanAgain = () => {
    setScannedCode(null);
    setIsScanning(false);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(myHandoverCode);
    toast.success('Code copied to clipboard');
  };

  const getInstructions = () => {
    if (mode === 'show') {
      return scanMode === 'pickup'
        ? "Show this QR code to the person giving you the item"
        : "Show this QR code to the person receiving the item";
    } else {
      return scanMode === 'pickup'
        ? "Scan the sender's QR code to confirm receipt"
        : "Scan the receiver's QR code to confirm handover";
    }
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
            <h1 className="text-lg font-semibold text-white">
              QR Code Verification
            </h1>
            <p className="text-sm text-gray-400">
              {getInstructions()}
            </p>
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
              <span>Scan Their Code</span>
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
                          Position the other person&apos;s QR code within the frame to verify and complete the handover.
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
                    <h3 className="text-white font-semibold text-xl mb-2">Code Scanned!</h3>
                    <p className="text-green-200 text-sm mb-4">QR code verified successfully</p>
                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
                      <p className="text-gray-400 text-xs mb-1">Scanned Code:</p>
                      <p className="text-white font-mono font-semibold text-lg">{scannedCode}</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <motion.button
                      onClick={handleScanAgain}
                      className="flex-1 bg-white/10 backdrop-blur-sm border border-white/20 text-white py-4 px-6 rounded-2xl font-medium"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <Repeat size={20} />
                        <span>Scan Again</span>
                      </div>
                    </motion.button>
                    <motion.button
                      onClick={handleConfirmScan}
                      className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 px-6 rounded-2xl font-medium shadow-lg"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <CheckCircle size={20} />
                        <span>Confirm</span>
                      </div>
                    </motion.button>
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
                <h3 className="text-white font-semibold mb-2">{itemTitle}</h3>
                <p className="text-purple-200 text-sm">Delivery ID: {deliveryId}</p>
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
                <p className="text-gray-400 text-sm mb-3 text-center">Handover Code:</p>
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
                    <p className="text-blue-200 text-sm leading-relaxed">
                      The other person can scan this code with their camera to verify the handover. Alternatively, they can share their code for you to scan.
                    </p>
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
