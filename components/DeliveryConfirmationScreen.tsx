'use client'
import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, Phone, QrCode, MessageSquare, Package, User } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { DeliveryJob, User as UserType } from '../types';
import { GoogleMapsPreview } from './GoogleMapsPreview';

interface DeliveryConfirmationScreenProps {
  job: DeliveryJob | null;
  user: UserType | null;
  onBack: () => void;
  onDeliveryComplete: () => void;
  onCallReceiver: (phoneNumber: string) => void;
  onFindProxy?: () => void;
}

export function DeliveryConfirmationScreen({
  job,
  user,
  onBack,
  onDeliveryComplete,
  onCallReceiver,
  onFindProxy
}: DeliveryConfirmationScreenProps) {
  const [verificationMethod, setVerificationMethod] = useState<'qr' | 'phone'>('qr');
  const [phoneCode] = useState(() => 
    Math.floor(1000 + Math.random() * 9000).toString()
  );
  const [phoneCodeSent, setPhoneCodeSent] = useState(false);
  const [enteredCode, setEnteredCode] = useState('');
  const [confirmationCode] = useState(() => 
    Math.random().toString(36).substr(2, 6).toUpperCase()
  );
  const [verificationSuccess, setVerificationSuccess] = useState(false);

  if (!job || !user) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-12 h-12 bg-prawnbox-grey rounded-full animate-pulse mx-auto mb-4"></div>
          <p className="text-prawnbox-text-light">Loading delivery confirmation...</p>
        </div>
      </div>
    );
  }

  const handleSendPhoneCode = () => {
    setPhoneCodeSent(true);
  };

  const handleCodeEntry = (code: string) => {
    setEnteredCode(code);
    if (code === phoneCode) {
      handleVerificationSuccess('phone');
    }
  };

  const handleQRCodeScanned = () => {
    handleVerificationSuccess('qr');
  };

  const handleVerificationSuccess = (method: 'qr' | 'phone') => {
    setVerificationSuccess(true);
    setTimeout(() => {
      onDeliveryComplete();
    }, 1500);
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-prawnbox-grey">
      {/* Header */}
      <div className="bg-white border-b border-prawnbox-grey-dark sticky top-0 z-10">
        <div className="px-4 py-4">
          <div className="flex items-center space-x-4">
            <button 
              onClick={onBack}
              className="p-2 hover:bg-prawnbox-grey rounded-xl transition-colors"
            >
              <ArrowLeft size={20} className="text-prawnbox-primary" />
            </button>
            <div>
              <h1 className="text-lg font-semibold text-prawnbox-primary">Handover Confirmation</h1>
              <p className="text-sm text-prawnbox-text-light">Complete the delivery</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* 🗺️ GOOGLE MAPS PREVIEW - Compact Route Information */}
        <GoogleMapsPreview job={job} userRole="pal" showPalLocation={true} />

        {/* Delivery Summary */}
        <Card className="p-6 border border-prawnbox-grey-dark bg-white rounded-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl bg-prawnbox-accent/10 flex items-center justify-center">
                <Package size={20} className="text-prawnbox-accent" />
              </div>
              <div>
                <h2 className="font-semibold text-prawnbox-primary">{job.title}</h2>
                <p className="text-sm text-prawnbox-text-light">{job.dropoffLocation}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-prawnbox-accent">
                {formatAmount(job.acceptedBidAmount || job.value)}
              </p>
              <p className="text-xs text-prawnbox-text-light">Your earnings</p>
            </div>
          </div>
        </Card>

        {/* Receiver Info */}
        {job.receiverName && (
          <Card className="p-4 border border-prawnbox-grey-dark bg-white rounded-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-prawnbox-grey flex items-center justify-center">
                  <User size={16} className="text-prawnbox-primary" />
                </div>
                <div>
                  <p className="font-medium text-prawnbox-primary">{job.receiverName}</p>
                  <p className="text-xs text-prawnbox-text-light">Receiver</p>
                </div>
              </div>
              
              <Button
                onClick={() => job.receiverPhone && onCallReceiver(job.receiverPhone)}
                variant="outline"
                size="sm"
                className="rounded-lg border-prawnbox-primary text-prawnbox-primary hover:bg-prawnbox-primary hover:text-white"
                disabled={!job.receiverPhone}
              >
                <Phone size={14} className="mr-2" />
                Call
              </Button>
            </div>
          </Card>
        )}

        {/* Handover Methods */}
        <Card className="p-6 border border-prawnbox-grey-dark bg-white rounded-2xl">
          <h3 className="text-lg font-semibold text-prawnbox-primary mb-6">Choose Handover Method</h3>
          
          {/* Method Selection */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <button
              onClick={() => setVerificationMethod('qr')}
              className={`p-6 rounded-xl border-2 transition-all ${
                verificationMethod === 'qr' 
                  ? 'bg-prawnbox-primary text-white border-prawnbox-primary' 
                  : 'bg-white text-prawnbox-primary border-prawnbox-grey-dark hover:border-prawnbox-primary'
              }`}
            >
              <QrCode size={32} className="mx-auto mb-3" />
              <span className="font-medium">QR Code</span>
            </button>
            <button
              onClick={() => setVerificationMethod('phone')}
              className={`p-6 rounded-xl border-2 transition-all ${
                verificationMethod === 'phone' 
                  ? 'bg-prawnbox-primary text-white border-prawnbox-primary' 
                  : 'bg-white text-prawnbox-primary border-prawnbox-grey-dark hover:border-prawnbox-primary'
              }`}
            >
              <MessageSquare size={32} className="mx-auto mb-3" />
              <span className="font-medium">Phone Code</span>
            </button>
          </div>

          {/* QR Code Method */}
          {verificationMethod === 'qr' && !verificationSuccess && (
            <div className="text-center space-y-6">
              <p className="text-sm text-prawnbox-text-light">Show this QR code to the receiver</p>
              
              {/* QR Code Display */}
              <div className="inline-block p-6 bg-prawnbox-grey border-2 border-prawnbox-primary rounded-2xl">
                <div className="w-40 h-40 bg-white border border-prawnbox-grey-dark rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <QrCode size={48} className="text-prawnbox-primary mx-auto mb-2" />
                    <div className="text-sm text-prawnbox-primary font-mono font-bold">
                      {confirmationCode}
                    </div>
                  </div>
                </div>
              </div>
              
              <Button
                onClick={handleQRCodeScanned}
                className="bg-prawnbox-primary text-white hover:bg-gray-700 rounded-xl px-8 py-3"
              >
                <CheckCircle size={18} className="mr-2" />
                Simulate QR Scan
              </Button>
            </div>
          )}

          {/* Phone Code Method */}
          {verificationMethod === 'phone' && !verificationSuccess && (
            <div className="space-y-6">
              {!phoneCodeSent ? (
                <div className="text-center space-y-4">
                  <p className="text-sm text-prawnbox-text-light">Send verification code to receiver</p>
                  <div className="p-4 bg-prawnbox-grey rounded-xl">
                    <p className="font-medium text-prawnbox-primary">
                      {job.receiverPhone || '+234 XXX XXX XXXX'}
                    </p>
                  </div>
                  <Button
                    onClick={handleSendPhoneCode}
                    className="w-full bg-prawnbox-primary text-white hover:bg-gray-700 rounded-xl py-3"
                  >
                    <MessageSquare size={18} className="mr-2" />
                    Send Code
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-xl text-center">
                    <p className="text-sm text-green-800">✅ Code sent to receiver</p>
                    <p className="text-xs text-green-700 mt-1">Ask receiver for the 4-digit code</p>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-sm font-medium text-prawnbox-primary mb-4">Enter code from receiver:</p>
                    <div className="flex space-x-3 justify-center mb-4">
                      {[0, 1, 2, 3].map((index) => (
                        <input
                          key={index}
                          type="text"
                          maxLength={1}
                          className="w-14 h-14 text-center text-xl font-bold border-2 border-prawnbox-grey-dark rounded-xl focus:border-prawnbox-primary focus:outline-none"
                          onChange={(e) => {
                            const newCode = enteredCode.split('');
                            newCode[index] = e.target.value;
                            const fullCode = newCode.join('');
                            handleCodeEntry(fullCode);
                            
                            if (e.target.value && index < 3) {
                              const nextInput = e.target.parentElement?.children[index + 1] as HTMLInputElement;
                              nextInput?.focus();
                            }
                          }}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-prawnbox-text-light">Demo code: {phoneCode}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Success State */}
          {verificationSuccess && (
            <div className="text-center space-y-6">
              <div className="w-24 h-24 rounded-full bg-green-100 border-4 border-green-200 flex items-center justify-center mx-auto">
                <CheckCircle size={40} className="text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-green-800 mb-2">Handover Complete!</h3>
                <p className="text-green-700 mb-2">Verification successful</p>
                <p className="text-sm text-green-600">Completing delivery...</p>
              </div>
              <div className="flex justify-center">
                <div className="w-6 h-6 border-2 border-green-300 border-t-green-600 rounded-full animate-spin"></div>
              </div>
            </div>
          )}
        </Card>

        {/* Emergency Options */}
        {!verificationSuccess && (
          <Card className="p-4 border border-prawnbox-grey-dark bg-white rounded-xl">
            <div className="text-center">
              <p className="text-sm text-prawnbox-text-light mb-4">Receiver not available?</p>
              <Button
                onClick={onFindProxy}
                variant="outline"
                className="w-full border-prawnbox-accent text-prawnbox-accent hover:bg-prawnbox-accent hover:text-white rounded-xl"
              >
                Find Nearby Proxy
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}