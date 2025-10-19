'use client'
import React, { useState, useEffect } from 'react';
import { CheckCircle, DollarSign, Clock, ArrowRight, Home, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { DeliveryJob, User } from '../types';

interface CancellationConfirmationScreenProps {
  job: DeliveryJob | null;
  user: User | null;
  onComplete: () => void;
  onContactSupport: () => void;
  violationFee: number;
  refundAmount: number;
}

export function CancellationConfirmationScreen({
  job,
  user,
  onComplete,
  onContactSupport,
  violationFee,
  refundAmount
}: CancellationConfirmationScreenProps) {
  const [processingStep, setProcessingStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const processingSteps = [
    'Processing cancellation...',
    'Calculating violation fee...',
    'Compensating Pal...',
    'Processing your refund...',
    'Updating delivery status...',
    'Cancellation complete!'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProcessingStep((prev) => {
        if (prev < processingSteps.length - 1) {
          return prev + 1;
        } else {
          setIsComplete(true);
          clearInterval(timer);
          return prev;
        }
      });
    }, 800);

    return () => clearInterval(timer);
  }, []);

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (!job || !user) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-500">Unable to process cancellation</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md space-y-6">
          {/* Processing Animation */}
          {!isComplete ? (
            <Card className="p-8 bg-white border border-gray-100 rounded-2xl text-center">
              <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-6">
                <div className="w-8 h-8 border-4 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
              
              <h2 className="text-xl font-medium text-black mb-2">Processing Cancellation</h2>
              <p className="text-gray-600 mb-6">Please wait while we handle your request...</p>
              
              <div className="space-y-3">
                {processingSteps.map((step, index) => (
                  <div
                    key={index}
                    className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ${
                      index <= processingStep
                        ? 'bg-green-50 border border-green-200'
                        : 'bg-gray-50 border border-gray-200'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      index < processingStep
                        ? 'bg-green-500'
                        : index === processingStep
                        ? 'bg-orange-500 animate-pulse'
                        : 'bg-gray-300'
                    }`}>
                      {index < processingStep ? (
                        <CheckCircle size={16} className="text-white" />
                      ) : (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                    <span className={`text-sm ${
                      index <= processingStep ? 'text-green-800' : 'text-gray-500'
                    }`}>
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          ) : (
            /* Completion Screen */
            <div className="space-y-6">
              {/* Success Header */}
              <Card className="p-8 bg-white border border-gray-100 rounded-2xl text-center">
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={40} className="text-green-600" />
                </div>
                
                <h2 className="text-2xl font-medium text-black mb-2">Cancellation Completed</h2>
                <p className="text-gray-600">Your delivery order has been successfully cancelled.</p>
                
                <Badge className="mt-4 bg-green-50 text-green-700 border-green-200 rounded-xl px-4 py-2">
                  Order #{job.id} Cancelled
                </Badge>
              </Card>

              {/* Financial Summary */}
              <Card className="p-6 bg-white border border-gray-100 rounded-2xl">
                <h3 className="font-medium text-black mb-4 flex items-center">
                  <DollarSign size={18} className="mr-2 text-gray-600" />
                  Financial Summary
                </h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Original Escrow Amount:</span>
                    <span className="font-medium text-black">{formatAmount(job.escrowAmount || job.value)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Violation Fee Charged:</span>
                    <span className="font-medium text-red-600">-{formatAmount(violationFee)}</span>
                  </div>
                  
                  <Separator className="my-3" />
                  
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-black">Refund Amount:</span>
                    <span className="font-medium text-green-600">{formatAmount(refundAmount)}</span>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <Clock size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-blue-900">Refund Processing</p>
                      <p className="text-xs text-blue-700">
                        Your refund will be processed within 1-3 business days and credited to your wallet.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Pal Compensation Notice */}
              <Card className="p-4 bg-green-50 border border-green-200 rounded-xl">
                <div className="flex items-start space-x-3">
                  <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-green-900 mb-1">Pal Compensated</p>
                    <p className="text-xs text-green-800">
                      Your assigned Pal has been compensated {formatAmount(violationFee)} for their time and effort.
                    </p>
                  </div>
                </div>
              </Card>

              {/* Next Steps */}
              <Card className="p-6 bg-white border border-gray-100 rounded-2xl">
                <h4 className="font-medium text-black mb-4">What happens next?</h4>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-blue-600 font-medium text-sm">1</span>
                    </div>
                    <div>
                      <p className="font-medium text-black">Refund Processing</p>
                      <p className="text-sm text-gray-600">Your refund will appear in your wallet within 1-3 business days.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-blue-600 font-medium text-sm">2</span>
                    </div>
                    <div>
                      <p className="font-medium text-black">Account Record</p>
                      <p className="text-sm text-gray-600">This cancellation will be recorded in your delivery history.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-blue-600 font-medium text-sm">3</span>
                    </div>
                    <div>
                      <p className="font-medium text-black">Future Deliveries</p>
                      <p className="text-sm text-gray-600">You can post new delivery requests anytime from your dashboard.</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  onClick={onComplete}
                  className="w-full bg-black text-white hover:bg-gray-800 rounded-xl py-3"
                >
                  <Home size={18} className="mr-2" />
                  Return to Dashboard
                </Button>
                
                <Button
                  onClick={onContactSupport}
                  variant="outline"
                  className="w-full border-gray-200 text-gray-600 hover:bg-gray-50 rounded-xl py-3"
                >
                  <MessageCircle size={18} className="mr-2" />
                  Contact Support
                </Button>
              </div>

              {/* Feedback Notice */}
              <div className="text-center">
                <p className="text-xs text-gray-500">
                  We&apos;re sorry this delivery didn&apos;t work out. Your feedback helps us improve the platform.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}