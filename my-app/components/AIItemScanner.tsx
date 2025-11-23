'use client'
import React, { useState, useRef } from 'react';
import { ArrowLeft, Camera, Sparkles, CheckCircle, Package, Zap, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ScanData {
  itemName?: string;
  category?: string;
  size?: string;
  estimatedWeight?: string;
  color?: string;
  fragile?: boolean;
  confidence?: number;
  description?: string;
  images?: string[];
}

interface AIItemScannerProps {
  onScanComplete: (itemData: ScanData) => void;
  onCancel?: () => void;
  onBack?: () => void;
}

export function AIItemScanner({ onBack, onCancel, onScanComplete }: AIItemScannerProps) {
  const handleBack = () => {
    if (onCancel) {
      onCancel();
    } else if (onBack) {
      onBack();
    }
  };
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scannedData, setScannedData] = useState<ScanData | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsScanning(true);
    setScanProgress(0);

    // Simulate AI scanning progress
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Simulate AI results
          const mockData = {
            itemName: 'Electronics Package',
            category: 'Electronics',
            estimatedWeight: '2.5 kg',
            size: 'Medium',
            color: 'Black',
            fragile: true,
            confidence: 92,
            description: 'Appears to be a boxed electronic device, possibly a smartphone or tablet. Handle with care.'
          };
          setScannedData(mockData);
          setIsScanning(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleAccept = () => {
    if (scannedData) {
      onScanComplete(scannedData);
    }
  };

  const handleRescan = () => {
    setScannedData(null);
    setScanProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <motion.div
        className="bg-white border-b border-gray-200 p-6 flex-shrink-0 z-20 shadow-sm"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center space-x-4">
          <motion.button
            onClick={handleBack}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft size={20} className="text-gray-700" />
          </motion.button>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">AI Item Scanner</h1>
            <p className="text-sm text-gray-500">Scan your item for details</p>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6 relative z-10 overscroll-contain pb-6">
        <AnimatePresence mode="wait">
          {!scannedData && !isScanning && (
            <motion.div
              className="space-y-4 sm:space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* AI Info Card */}
              <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 sm:p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#f44708] flex items-center justify-center flex-shrink-0">
                    <Sparkles size={20} className="text-white sm:w-6 sm:h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-gray-900 font-semibold text-sm sm:text-base">AI-Powered Scanning</h3>
                    <p className="text-gray-600 text-xs sm:text-sm">Instant item detection</p>
                  </div>
                </div>
                <p className="text-gray-700 text-xs sm:text-sm">
                  Our AI analyzes your item photo to automatically detect size, weight, category, and special handling requirements.
                </p>
              </div>

              {/* Scan Button */}
              <motion.button
                onClick={() => fileInputRef.current?.click()}
                className="w-full bg-gray-50 border-2 border-dashed border-gray-300 hover:border-[#f44708] hover:bg-orange-50 rounded-2xl p-8 sm:p-12 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="text-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#f44708] flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <Camera size={32} className="text-white sm:w-10 sm:h-10" />
                  </div>
                  <h3 className="text-gray-900 font-semibold mb-1 sm:mb-2">Take or Upload Photo</h3>
                  <p className="text-gray-600 text-xs sm:text-sm">Click to scan your item with AI</p>
                </div>
              </motion.button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleImageSelect}
                className="hidden"
              />

              {/* Features - Collapsible */}
              <details className="bg-gray-50 border border-gray-200 rounded-2xl overflow-hidden group">
                <summary className="p-4 sm:p-6 cursor-pointer hover:bg-gray-100 transition-colors list-none">
                  <div className="flex items-center justify-between">
                    <h4 className="text-gray-900 font-semibold text-sm sm:text-base">What AI Detects:</h4>
                    <motion.div
                      className="text-gray-700"
                      animate={{ rotate: 0 }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </motion.div>
                  </div>
                </summary>
                <div className="px-4 pb-4 sm:px-6 sm:pb-6 pt-0 space-y-3">
                  {[
                    { icon: Package, text: 'Item category and type' },
                    { icon: Zap, text: 'Estimated size and weight' },
                    { icon: AlertCircle, text: 'Fragility and special care' },
                    { icon: CheckCircle, text: 'Packaging recommendations' }
                  ].map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-orange-100 flex items-center justify-center flex-shrink-0">
                          <Icon size={18} className="text-[#f44708] sm:w-5 sm:h-5" />
                        </div>
                        <p className="text-gray-700 text-xs sm:text-sm">{feature.text}</p>
                      </div>
                    );
                  })}
                </div>
              </details>
            </motion.div>
          )}

          {isScanning && (
            <motion.div
              className="flex flex-col items-center justify-center py-12 sm:py-20"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <motion.div
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-[#f44708] flex items-center justify-center mb-4 sm:mb-6"
                animate={{
                  rotate: 360
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'linear'
                }}
              >
                <Sparkles size={48} className="text-white sm:w-16 sm:h-16" />
              </motion.div>

              <h3 className="text-gray-900 font-semibold mb-2">Scanning Item...</h3>
              <p className="text-gray-600 text-sm mb-4 sm:mb-6">AI is analyzing your photo</p>

              <div className="w-full max-w-xs px-4">
                <div className="h-2 sm:h-3 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-[#f44708]"
                    initial={{ width: 0 }}
                    animate={{ width: `${scanProgress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <p className="text-center text-gray-900 text-sm mt-2">{scanProgress}%</p>
              </div>
            </motion.div>
          )}

          {scannedData && (
            <motion.div
              className="space-y-4 sm:space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {/* Success */}
              <div className="text-center">
                <motion.div
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-3 sm:mb-4"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                >
                  <CheckCircle size={32} className="text-white sm:w-10 sm:h-10" />
                </motion.div>
                <h3 className="text-gray-900 font-semibold mb-1 sm:mb-2">Scan Complete!</h3>
                <p className="text-gray-600 text-sm">AI confidence: {scannedData.confidence}%</p>
              </div>

              {/* Results */}
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 sm:p-6 space-y-3 sm:space-y-4">
                <h4 className="text-gray-900 font-semibold text-sm sm:text-base">Detected Information:</h4>

                <div className="space-y-2.5 sm:space-y-3">
                  <div>
                    <p className="text-gray-600 text-xs sm:text-sm mb-1">Item Name</p>
                    <p className="text-gray-900 font-medium text-sm sm:text-base">{scannedData.itemName}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-xs sm:text-sm mb-1">Category</p>
                    <p className="text-gray-900 font-medium text-sm sm:text-base">{scannedData.category}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-xs sm:text-sm mb-1">Estimated Weight</p>
                    <p className="text-gray-900 font-medium text-sm sm:text-base">{scannedData.estimatedWeight}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-xs sm:text-sm mb-1">Size</p>
                    <p className="text-gray-900 font-medium text-sm sm:text-base">{scannedData.size}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-xs sm:text-sm mb-1">Color</p>
                    <p className="text-gray-900 font-medium text-sm sm:text-base">{scannedData.color}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-xs sm:text-sm mb-1">Special Handling</p>
                    <p className="text-gray-900 font-medium text-sm sm:text-base">{scannedData.fragile ? 'Fragile - Handle with Care' : 'Standard Handling'}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-xs sm:text-sm mb-1">Description</p>
                    <p className="text-gray-900 text-sm sm:text-base">{scannedData.description}</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2.5 sm:space-y-3">
                <motion.button
                  onClick={handleAccept}
                  className="w-full bg-[#f44708] hover:bg-[#d63a00] text-white py-3 sm:py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 text-sm sm:text-base"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <CheckCircle size={18} className="sm:w-5 sm:h-5" />
                  <span>Use This Information</span>
                </motion.button>

                <motion.button
                  onClick={handleRescan}
                  className="w-full bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-900 py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Scan Again
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
