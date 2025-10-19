"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Plus, Package, Truck, Wallet, Settings, Bell, Gift, Package2, Star, TrendingUp, MapPin, Send, Activity, Handshake, Zap, Check, Lock, Users, Heart, Info, X
} from 'lucide-react';

import { Button } from '../ui/button';
import { Card } from '../ui/card';
// import { ImageWithFallback } from '../figma/ImageWithFallback';
import { UserRole, User, DeliveryJob } from '../../types';
import { 
  ACTION_BUTTON_CONFIGS, 
  BUTTON_THEMES, 
  COMMON_BUTTON_STYLES,
  MOBILE_GRID_CONFIG 
} from '../../constants/dashboard';
import { DashboardStats, formatAmount, getAvailableJobsCount } from '../../utils/dashboard';

// Import Figma assets for the image collage
// import passengerImage from 'figma:asset/75dde29ba0df803dcd43165e251f8e51e54e7827.png';
// import driverImage from 'figma:asset/8ba67cb5ae88ad91aa81084507cd83077914d5a7.png';
// import bikerImage from 'figma:asset/f748861dedfe023dcb683db189472ac9d300aef4.png';
// import senderDeliveryImage from 'figma:asset/134cae85c1b808f4e22f7e1f25d8bf61c90f2a89.png';
// import receiverDeliveryImage from 'figma:asset/7d6d3b5106a4e4bb3944cfd7097215cacaeddb03.png';
// import proxyDeliveryImage from 'figma:asset/76f723b9c743b6545d9ff392258cc5f4bc345066.png';

interface QuickActionsCardProps {
  activeRole: UserRole;
  stats: DashboardStats;
  user: User | null;
  allJobs: DeliveryJob[];
  onActionClick: (action: string) => void;
  onSpecialActionClick: (action: string) => void;
  onNavigateToSponsorship: () => void;
}

const ICON_COMPONENTS = {
  Plus,
  Package,
  Truck,
  Wallet,
  Settings,
  Bell,
  Gift,
  Package2,
  Star,
  TrendingUp,
  MapPin
};

export function QuickActionsCard({
  activeRole,
  stats,
  user,
  allJobs,
  onActionClick,
  onSpecialActionClick,
  onNavigateToSponsorship
}: QuickActionsCardProps) {
  const config = ACTION_BUTTON_CONFIGS[activeRole.toUpperCase() as keyof typeof ACTION_BUTTON_CONFIGS];
  
  // Activity tracking and vibration animation state
  const [lastActivity, setLastActivity] = useState(Date.now());
  const [showVibration, setShowVibration] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const activityTimerRef = useRef<number | null>(null);
  const vibrationTimeoutRef = useRef<number | null>(null);
  
  // Tooltip state for In Escrow info icon
  const [showEscrowTooltip, setShowEscrowTooltip] = useState(false);
  const escrowPopupRef = useRef<HTMLDivElement>(null);

  // Reset user activity tracking and start inactivity timer
  const resetActivity = useCallback(() => {
    setLastActivity(Date.now());
    setShowVibration(false);
    
    // Clear existing timers
    if (activityTimerRef.current) {
      clearTimeout(activityTimerRef.current);
    }
    if (vibrationTimeoutRef.current) {
      clearTimeout(vibrationTimeoutRef.current);
    }
    
    // Set new timeout for 5 seconds of inactivity
    activityTimerRef.current = setTimeout(() => {
      setShowVibration(true);
      
      // Remove vibration after animation completes (2 seconds)
      vibrationTimeoutRef.current = setTimeout(() => {
        setShowVibration(false);
      }, 2000) as unknown as number;
    }, 5000) as unknown as number;
  }, []);

  // Track user activity for vibration animation
  useEffect(() => {
    const handleActivity = () => {
      resetActivity();
    };

    // Listen for user interactions
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    events.forEach(event => {
      document.addEventListener(event, handleActivity, true);
    });

    // Initial setup
    resetActivity();

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleActivity, true);
      });
      if (activityTimerRef.current) {
        clearTimeout(activityTimerRef.current);
      }
      if (vibrationTimeoutRef.current) {
        clearTimeout(vibrationTimeoutRef.current);
      }
    };
  }, [resetActivity]);

  // Click outside handler for escrow popup
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showEscrowTooltip && escrowPopupRef.current && !escrowPopupRef.current.contains(event.target as Node)) {
        setShowEscrowTooltip(false);
      }
    };

    if (showEscrowTooltip) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showEscrowTooltip]);

  if (!config) {
    console.warn('No config found for role:', activeRole);
    return null;
  }

  // Role-specific instructions and descriptions
  const getRoleInstructions = () => {
    switch (activeRole) {
      case 'sender':
        return {
          title: "Send an item",
          description: "Start by posting your delivery request. Choose your pickup and drop-off locations, describe what you're sending, and let our trusted Pals bid on your delivery."
        };
      case 'pal':
        return {
          title: "Start delivery",
          description: "Check your active deliveries, browse available jobs in your area, and pick up items ready for delivery. The more deliveries you complete, the more you earn."
        };
      case 'receiver':
        return {
          title: "Receive item",
          description: "Track your incoming packages, see when they'll arrive, and communicate directly with your Pal. Stay updated on all items being delivered to you."
        };
      case 'proxy':
        return {
          title: "Store items",
          description: "Keep track of items in your storage, handle pickups and drop-offs, and earn fees for providing secure storage services to your community."
        };
      default:
        return {
          title: "Quick Actions",
          description: "Choose an action below to get started"
        };
    }
  };

  const roleInstructions = getRoleInstructions();

  // Calculate total escrow amount for current user
  const calculateEscrowAmount = () => {
    if (!user) return 0;
    
    // Calculate based on user's active deliveries that have escrow payments
    const userActiveJobs = allJobs.filter(job => {
      // For senders: jobs they created that are in active status (assigned, picked-up, in-transit)
      if (activeRole === 'sender') {
        return job.senderId === user.id && 
               ['assigned', 'picked-up', 'in-transit'].includes(job.status) &&
               job.escrowAmount;
      }
      // For pals: jobs they're delivering (escrow is held until completion)
      else if (activeRole === 'pal') {
        return job.selectedPalId === user.id && 
               ['assigned', 'picked-up', 'in-transit'].includes(job.status) &&
               job.escrowAmount;
      }
      // For receivers and proxies: no direct escrow involvement
      return false;
    });

    return userActiveJobs.reduce((total, job) => {
      return total + (job.escrowAmount || job.acceptedBidAmount || job.value || 0);
    }, 0);
  };

  return (
    <>
      {/* Main Content Cards */}
      <Card className="sm:p-6 lg:p-8 border-0 rounded-2xl bg-white shadow-sm my-[15px] px-[28px] pt-[20px] pb-[0px] my-[-30px] my-[-40px] mx-[-15px] pr-[28px] pl-[28px] relative z-20" style={{
        isolation: 'isolate',
        pointerEvents: 'auto'
      }}>
        <div className="mb-6 border-b-0">
          {/* Wallet Balance and In-Escrow Section */}
          <div className="flex items-center justify-between mx-[0px] px-[0px] p-[0px] mt-[10px] mr-[0px] mb-[0px] ml-[0px]">
            {/* Wallet Balance - Left */}
            <button
              onClick={() => onActionClick('wallet')}
              className="flex items-center space-x-2 p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:border-prawnbox-accent/20 rounded-xl transition-all duration-200 cursor-pointer active:scale-95 touch-manipulation"
              style={{
                pointerEvents: 'auto',
                userSelect: 'none',
                WebkitUserSelect: 'none',
                WebkitTapHighlightColor: 'transparent'
              }}
            >
              <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center">
                <span className="text-teal-600 font-bold text-sm">₦</span>
              </div>
              <div className="text-left">
                <p className="text-xs text-gray-500">Wallet Balance</p>
                <p className="font-bold text-teal-600">
                  {formatAmount(user?.walletBalance || 0)}
                </p>
              </div>
            </button>

            {/* In-Escrow - Right */}
            <div className="relative flex flex-col items-end mt-[26px] mr-[0px] mb-[0px] ml-[0px]">
              <button
                onClick={() => onActionClick('my-deliveries')} // This will show deliveries with escrow
                className="flex items-center space-x-2 p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:border-prawnbox-accent/20 rounded-xl transition-all duration-200 cursor-pointer active:scale-95 touch-manipulation"
                style={{
                  pointerEvents: 'auto',
                  userSelect: 'none',
                  WebkitUserSelect: 'none',
                  WebkitTapHighlightColor: 'transparent'
                }}
              >
                <div className="text-right">
                  <p className="text-xs text-gray-500">In Escrow</p>
                  <p className="font-bold text-orange-600">
                    {formatAmount(calculateEscrowAmount())}
                  </p>
                </div>
                <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
                  <Lock size={14} className="text-orange-600" />
                </div>
              </button>
              
              {/* Info Icon Button - Below Escrow Button */}
              <div className="relative mt-1 mr-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowEscrowTooltip(!showEscrowTooltip);
                  }}
                  className={`p-1 hover:bg-gray-200 rounded-full transition-all duration-200 ${
                    showEscrowTooltip ? 'bg-prawnbox-accent/10' : ''
                  }`}
                  style={{
                    pointerEvents: 'auto',
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                    WebkitTapHighlightColor: 'transparent'
                  }}
                >
                  <Info size={14} className={`transition-colors ${
                    showEscrowTooltip ? 'text-prawnbox-accent' : 'text-gray-400 hover:text-prawnbox-accent'
                  }`} />
                </button>

                
                {/* Escrow Info Card Popup - Appears Below Info Icon */}
                {showEscrowTooltip && (
                  <div 
                    ref={escrowPopupRef}
                    className="absolute top-full right-0 mt-3 w-80 max-w-[calc(100vw-2rem)] z-50 animate-in fade-in slide-in-from-top-2 duration-200"
                    style={{
                      right: 'max(-0.5rem, calc(-320px + 100%))'
                    }}
                  >
                    {/* Arrow pointing up to info icon */}
                    <div className="absolute bottom-full right-2 mb-[-2px] z-10">

                    </div>
                    
                    <Card className="bg-white border-2 border-gray-200 shadow-2xl rounded-2xl overflow-hidden">
                      {/* Card Header */}
                      <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 relative">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                              <Lock size={16} className="text-white" />
                            </div>
                            <h3 className="font-bold text-white">What is Escrow?</h3>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowEscrowTooltip(false);
                            }}
                            className="w-6 h-6 flex items-center justify-center hover:bg-white/20 rounded-full transition-colors"
                            style={{
                              pointerEvents: 'auto',
                              userSelect: 'none',
                              WebkitUserSelect: 'none'
                            }}
                          >
                            <X size={14} className="text-white" />
                          </button>
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="p-4 space-y-3">
                        {activeRole === 'sender' ? (
                          <>
                            <div className="flex items-start space-x-3">
                              <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Check size={14} className="text-teal-600" />
                              </div>
                              <div>
                                <p className="font-semibold text-prawnbox-primary text-sm mb-1">
                                  Secure Payment Protection
                                </p>
                                <p className="text-gray-600 text-xs leading-relaxed">
                                  Your payment is safely held in escrow until delivery is completed. This protects your money.
                                </p>
                              </div>
                            </div>

                            <div className="flex items-start space-x-3">
                              <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Lock size={14} className="text-orange-600" />
                              </div>
                              <div>
                                <p className="font-semibold text-prawnbox-primary text-sm mb-1">
                                  Released After Delivery
                                </p>
                                <p className="text-gray-600 text-xs leading-relaxed">
                                  The Pal only receives payment after you confirm successful delivery. You&apos;re in control.
                                </p>
                              </div>
                            </div>

                            <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
                              <p className="text-xs text-gray-500 mb-1">Current Escrow Amount</p>
                              <p className="font-bold text-orange-600">
                                {formatAmount(calculateEscrowAmount())}
                              </p>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="flex items-start space-x-3">
                              <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Check size={14} className="text-teal-600" />
                              </div>
                              <div>
                                <p className="font-semibold text-prawnbox-primary text-sm mb-1">
                                  Guaranteed Payment
                                </p>
                                <p className="text-gray-600 text-xs leading-relaxed">
                                  These funds are already secured in escrow. You&apos;re guaranteed to receive payment upon successful delivery.
                                </p>
                              </div>
                            </div>

                            <div className="flex items-start space-x-3">
                              <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Lock size={14} className="text-orange-600" />
                              </div>
                              <div>
                                <p className="font-semibold text-prawnbox-primary text-sm mb-1">
                                  Held Until Delivery
                                </p>
                                <p className="text-gray-600 text-xs leading-relaxed">
                                  Funds are released to your wallet immediately after the receiver confirms successful delivery.
                                </p>
                              </div>
                            </div>

                            <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
                              <p className="text-xs text-gray-500 mb-1">Pending Escrow Earnings</p>
                              <p className="font-bold text-orange-600">
                                {formatAmount(calculateEscrowAmount())}
                              </p>
                            </div>
                          </>
                        )}
                      </div>
                    </Card>
                  </div>
                )}
              </div>
            </div>
          </div>

          <h2 className="text-lg font-bold text-prawnbox-primary text-[34px] font-[Plus_Jakarta_Sans] mx-[0px] my-[50px] tracking-[-1px] mt-[0px] mr-[0px] mb-[40px] ml-[0px] p-[0px]">{roleInstructions.title}</h2>
          
          {/* Role-Specific Description */}
          <p className="text-prawnbox-text-light text-left leading-relaxed mb-[21px] px-2 mt-[-40px] mr-[0px] ml-[0px] pt-[0px] pr-[20px] pb-[0px] pl-[0px] text-[15px]">
            {activeRole === 'sender' && 'Let Pals (our verified delivery agents) bid to deliver your item. Or, choose a Pal you know.'}
            {activeRole === 'pal' && 'Pick up & deliver packages, whether you own a vehicle, or are a passenger.'}
            {activeRole === 'receiver' && 'Track your incoming deliveries and confirm receipt when they arrive safely.'}
            {activeRole === 'proxy' && 'Manage packages receivers missed, & hand over securely to receiver.'}
          </p>
          
          {/* Role-Specific Action Buttons */}
          <div className="flex flex-col mt-[14px] p-[0px] mr-[0px] mb-[0px] ml-[0px] rounded-[0px] relative z-30" style={{
            pointerEvents: 'auto',
            isolation: 'isolate',
            position: 'relative'
          }}>
            {activeRole === 'sender' && (
              <>
                {/* Image Section - Separated */}
                <div className="relative z-10 mb-8" style={{ pointerEvents: 'none' }}>
                  <div className="relative w-full max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-lg" style={{ pointerEvents: 'none' }}>
                    <img    
                      src="https://images.unsplash.com/photo-1719865400276-d1e7bde7e9c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMHdvbWFuJTIwc21pbGluZyUyMHdhbGtlciUyMHdhbGtpbmd8ZW58MXx8fHwxNzU5NDE1MDY0fDA&ixlib=rb-4.1.0&q=80&w=1080"
                      alt="Professional package sending and delivery service with Prawnbox Pal"
                      className="w-full h-64 object-cover"
                      style={{ pointerEvents: 'none', userSelect: 'none', WebkitUserSelect: 'none' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-prawnbox-accent/80 to-transparent flex items-end" style={{ pointerEvents: 'none' }}>
                      <div className="p-6 text-white w-full" style={{ pointerEvents: 'none' }}>
                        <h4 className="font-bold text-xl mb-2">Send with Confidence</h4>
                        <p className="text-sm opacity-90">Post your delivery, receive competitive bids from trusted Pals, and track your package every step of the way with real-time updates.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Primary and Secondary Buttons - Sender */}
                <div className="mt-6 flex flex-col items-center relative z-40" style={{
                  pointerEvents: 'auto',
                  isolation: 'isolate'
                }}>
                  {/* CTA Buttons Row */}
                  <div className="w-full flex flex-row space-x-3 mt-[-30px] mr-[0px] mb-[0px] ml-[0px]">
                    {/* Primary Button - Send a Package */}
                    <Button
                      className="flex-1 h-16 py-4 text-white rounded-[13px] flex items-center justify-center space-x-2 active:scale-95 transition-all duration-200 shadow-sm relative z-50 cursor-pointer touch-manipulation"
                      style={{ 
                        backgroundColor: '#2f2f2f',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                        pointerEvents: 'auto',
                        userSelect: 'none',
                        WebkitUserSelect: 'none',
                        WebkitTapHighlightColor: 'transparent',
                        isolation: 'isolate',
                        position: 'relative'
                      }}
                      onClick={(e) => {
                        e.preventDefault(); 
                        e.stopPropagation(); 
                        console.log('🖱️ Primary button clicked: post-delivery');
                        onActionClick('post-delivery');
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#404040';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#2f2f2f';
                      }}
                    >
                      <Plus size={20} className="text-white" />
                      <span className="font-medium">Send a Package</span>
                    </Button>
                    
                    {/* Second Button - My Sent Deliveries */}
                    <Button
                      className="flex-1 h-16 py-4 text-[#2f2f2f] rounded-[13px] flex items-center justify-center space-x-2 active:scale-95 transition-all duration-200 shadow-sm relative z-50 cursor-pointer touch-manipulation"
                      style={{ 
                        backgroundColor: 'white',
                        border: '1px solid #2f2f2f',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                        pointerEvents: 'auto',
                        userSelect: 'none',
                        WebkitUserSelect: 'none',
                        WebkitTapHighlightColor: 'transparent',
                        isolation: 'isolate',
                        position: 'relative'
                      }}
                      onClick={(e) => {
                        e.preventDefault(); 
                        e.stopPropagation(); 
                        console.log('🖱️ My Sent Deliveries button clicked: sent-deliveries-history');
                        onActionClick('sent-deliveries-history');
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#f8f9fa';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'white';
                      }}
                    >
                      <Package size={20} className="text-[#2f2f2f]" />
                      <span className="font-medium">My Sent Deliveries</span>
                    </Button>
                  </div>

                  {/* Learn More Link */}
                  <div className="mt-4 text-center relative z-50">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log('🎓 Learn more link clicked: become-sender');
                        onActionClick('become-sender');
                      }}
                      className="text-sm underline transition-all duration-200 cursor-pointer"
                      style={{
                        color: '#f44708',
                        pointerEvents: 'auto',
                        userSelect: 'none',
                        WebkitUserSelect: 'none',
                        WebkitTapHighlightColor: 'transparent'
                      }}
                    >
                      Learn more about sending items
                    </button>
                  </div>

                </div>

              </>
            )}

            {activeRole === 'pal' && (
              <>
                {/* Image Collage - Delivery Methods */}
                <div className="mb-6 relative z-10" style={{ pointerEvents: 'none' }}>
                  <div className="relative w-full max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-lg" style={{ pointerEvents: 'none' }}>
                    <img
                      src="https://images.unsplash.com/photo-1719903647426-d14726e9d5e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwZGVsaXZlcnklMjBwZW9wbGUlMjBOaWdlcmlhJTIwbW90b3JjeWNsZXMlMjBjYXJzfGVufDF8fHx8MTc1OTQxMzQzNXww&ixlib=rb-4.1.0&q=80&w=1080"
                      alt="Diverse delivery people in Nigeria using motorcycles and cars"
                      className="w-full h-72 object-cover"
                      style={{ pointerEvents: 'none', userSelect: 'none', WebkitUserSelect: 'none' }}
                    />
                    <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-4" style={{ pointerEvents: 'none' }}>
                      {/* Passenger/Traveler */}
                      <div className="relative group overflow-hidden" style={{ pointerEvents: 'none' }}>
                        <img
                          src="https://images.unsplash.com/photo-1719903647426-d14726e9d5e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwZGVsaXZlcnklMjBwZW9wbGUlMjBOaWdlcmlhJTIwbW90b3JjeWNsZXMlMjBjYXJzfGVufDF8fHx8MTc1OTQxMzQzNXww&ixlib=rb-4.1.0&q=80&w=1080"
                          alt="Black man smiling as bus passenger"
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          style={{ pointerEvents: 'none', userSelect: 'none', WebkitUserSelect: 'none' }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-prawnbox-primary/80 to-transparent flex items-end" style={{ pointerEvents: 'none' }}>
                          <div className="p-4 text-white" style={{ pointerEvents: 'none' }}>
                            <h4 className="font-bold text-lg">Passenger</h4>
                            <p className="text-sm opacity-90">Earn while you travel</p>
                          </div>
                        </div>
                      </div>

                      {/* Driver */}
                      <div className="relative group overflow-hidden" style={{ pointerEvents: 'none' }}>
                        <img
                          src="https://images.unsplash.com/photo-1719903647426-d14726e9d5e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwZGVsaXZlcnklMjBwZW9wbGUlMjBOaWdlcmlhJTIwbW90b3JjeWNsZXMlMjBjYXJzfGVufDF8fHx8MTc1OTQxMzQzNXww&ixlib=rb-4.1.0&q=80&w=1080"
                          alt="Black man driver smiling in car"
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          style={{ pointerEvents: 'none', userSelect: 'none', WebkitUserSelect: 'none' }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-prawnbox-accent/80 to-transparent flex items-end" style={{ pointerEvents: 'none' }}>
                          <div className="p-4 text-white" style={{ pointerEvents: 'none' }}>
                            <h4 className="font-bold text-lg">Driver</h4>
                            <p className="text-sm opacity-90">Use your car to earn</p>
                          </div>
                        </div>
                      </div>

                      {/* Biker */}
                      <div className="relative group overflow-hidden" style={{ pointerEvents: 'none' }}>
                        <img
                          src="https://images.unsplash.com/photo-1719903647426-d14726e9d5e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwZGVsaXZlcnklMjBwZW9wbGUlMjBOaWdlcmlhJTIwbW90b3JjeWNsZXMlMjBjYXJzfGVufDF8fHx8MTc1OTQxMzQzNXww&ixlib=rb-4.1.0&q=80&w=1080"
                          alt="Black man biker smiling with motorcycle - delivery Pal"
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          style={{ pointerEvents: 'none', userSelect: 'none', WebkitUserSelect: 'none' }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-prawnbox-primary/80 to-transparent flex items-end" style={{ pointerEvents: 'none' }}>
                          <div className="p-4 text-white" style={{ pointerEvents: 'none' }}>
                            <h4 className="font-bold text-lg">Biker</h4>
                            <p className="text-sm opacity-90">Fast bike deliveries</p>
                          </div>
                        </div>
                      </div>

                      {/* Walker */}
                      <div className="relative group overflow-hidden" style={{ pointerEvents: 'none' }}>
                        <img
                          src="https://images.unsplash.com/photo-1719865400276-d1e7bde7e9c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMHdvbWFuJTIwc21pbGluZyUyMHdhbGtlciUyMHdhbGtpbmd8ZW58MXx8fHwxNzU5NDE1MDY0fDA&ixlib=rb-4.1.0&q=80&w=1080"
                          alt="Black woman walker smiling"
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          style={{ pointerEvents: 'none', userSelect: 'none', WebkitUserSelect: 'none' }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-prawnbox-accent/80 to-transparent flex items-end" style={{ pointerEvents: 'none' }}>
                          <div className="p-4 text-white" style={{ pointerEvents: 'none' }}>
                            <h4 className="font-bold text-lg">Walker</h4>
                            <p className="text-sm opacity-90">Earn on foot</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Primary and Secondary Buttons - Pal */}
                <div className="mt-6 flex flex-col items-center relative z-40" style={{
                  pointerEvents: 'auto',
                  isolation: 'isolate'
                }}>
                  {/* CTA Buttons Row */}
                  <div className="w-full flex flex-row space-x-3 mt-[-20px] mr-[0px] mb-[0px] ml-[0px]">
                    {/* Primary Button - Find Jobs */}
                    <Button
                      className="flex-1 h-16 py-4 text-white rounded-[13px] flex items-center justify-center space-x-2 active:scale-95 transition-all duration-200 shadow-sm relative z-50 cursor-pointer touch-manipulation"
                      style={{ 
                        backgroundColor: '#2f2f2f',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                        pointerEvents: 'auto',
                        userSelect: 'none',
                        WebkitUserSelect: 'none',
                        WebkitTapHighlightColor: 'transparent',
                        isolation: 'isolate',
                        position: 'relative'
                      }}
                      onClick={(e) => {
                        e.preventDefault(); 
                        e.stopPropagation(); 
                        console.log('🖱️ Primary button clicked: available-jobs');
                        onActionClick('available-jobs');
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#404040';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#2f2f2f';
                      }}
                    >
                      <Zap size={20} className="text-white" />
                      <span className="font-medium">Find Jobs</span>
                    </Button>
                    
                    {/* Second Button - Active Jobs */}
                    <Button
                      className="flex-1 h-16 py-4 text-[#2f2f2f] rounded-[13px] flex items-center justify-center space-x-2 active:scale-95 transition-all duration-200 shadow-sm relative z-50 cursor-pointer touch-manipulation"
                      style={{ 
                        backgroundColor: 'white',
                        border: '1px solid #2f2f2f',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                        pointerEvents: 'auto',
                        userSelect: 'none',
                        WebkitUserSelect: 'none',
                        WebkitTapHighlightColor: 'transparent',
                        isolation: 'isolate',
                        position: 'relative'
                      }}
                      onClick={(e) => {
                        e.preventDefault(); 
                        e.stopPropagation(); 
                        console.log('🖱️ Second button clicked: accepted-bids');
                        onActionClick('accepted-bids');
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#f8f9fa';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'white';
                      }}
                    >
                      <Truck size={20} className="text-[#2f2f2f]" />
                      <span className="font-medium">Active Jobs</span>
                    </Button>
                  </div>

                  {/* Learn More Link */}
                  <div className="mt-4 text-center relative z-50">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log('🎓 Learn more link clicked: become-pal');
                        onActionClick('become-pal');
                      }}
                      className="text-sm underline transition-all duration-200 cursor-pointer"
                      style={{
                        color: '#f44708',
                        pointerEvents: 'auto',
                        userSelect: 'none',
                        WebkitUserSelect: 'none',
                        WebkitTapHighlightColor: 'transparent'
                      }}
                    >
                      Learn more about delivering items
                    </button>
                  </div>

                </div>

              </>
            )}

            {activeRole === 'receiver' && (
              <>
                {/* Single Image - Package Receiving */}
                <div className="mb-6 relative z-10" style={{ pointerEvents: 'none' }}>
                  <div className="relative w-full max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-lg" style={{ pointerEvents: 'none' }}>
                    <img
                      src="https://images.unsplash.com/photo-1719865400276-d1e7bde7e9c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMHdvbWFuJTIwc21pbGluZyUyMHdhbGtlciUyMHdhbGtpbmd8ZW58MXx8fHwxNzU5NDE1MDY0fDA&ixlib=rb-4.1.0&q=80&w=1080"
                      alt="Professional receiver confirming package delivery with Prawnbox Pal"
                      className="w-full h-64 object-cover"
                      style={{ pointerEvents: 'none', userSelect: 'none', WebkitUserSelect: 'none' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-prawnbox-accent/80 to-transparent flex items-end" style={{ pointerEvents: 'none' }}>
                      <div className="p-6 text-white w-full" style={{ pointerEvents: 'none' }}>
                        <h4 className="font-bold text-xl mb-2">Receive Your Packages</h4>
                        <p className="text-sm opacity-90">Track deliveries, confirm receipt, and stay updated on all your incoming packages with real-time notifications.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Primary and Secondary Buttons - Receiver */}
                <div className="mt-6 flex flex-col items-center relative z-40" style={{
                  pointerEvents: 'auto',
                  isolation: 'isolate'
                }}>
                  {/* CTA Buttons Row */}
                  <div className="w-full flex flex-row space-x-3 mt-[-20px] mr-[0px] mb-[0px] ml-[0px]">
                    {/* Primary Button - Incoming Deliveries */}

                    
                    {/* Second Button - Notifications */}
                    <Button
                      className="flex-1 h-16 py-4 text-white rounded-[13px] flex items-center justify-center space-x-2 active:scale-95 transition-all duration-200 shadow-sm relative z-50 cursor-pointer touch-manipulation"
                      style={{ 
                        backgroundColor: '#2f2f2f',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                        pointerEvents: 'auto',
                        userSelect: 'none',
                        WebkitUserSelect: 'none',
                        WebkitTapHighlightColor: 'transparent',
                        isolation: 'isolate',
                        position: 'relative'
                      }}
                      onClick={(e) => {
                        e.preventDefault(); 
                        e.stopPropagation(); 
                        console.log('🖱️ Second button clicked: received-deliveries');
                        onActionClick('received-deliveries');
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#404040';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#2f2f2f';
                      }}
                    >
                      <Package2 size={20} className="text-white" />
                      <span className="font-medium">Incoming/Received Items</span>
                    </Button>
                  </div>

                  {/* Learn More Link */}
                  <div className="mt-4 text-center relative z-50">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log('🎓 Learn more link clicked: become-receiver');
                        onActionClick('become-receiver');
                      }}
                      className="text-sm underline transition-all duration-200 cursor-pointer"
                      style={{
                        color: '#f44708',
                        pointerEvents: 'auto',
                        userSelect: 'none',
                        WebkitUserSelect: 'none',
                        WebkitTapHighlightColor: 'transparent'
                      }}
                    >
                      Learn more about receiving items
                    </button>
                  </div>

                </div>

              </>
            )}

            {activeRole === 'proxy' && (
              <>
                {/* Single Image - Proxy Storage Services */}
                <div className="mb-6 relative z-10" style={{ pointerEvents: 'none' }}>
                  <div className="relative w-full max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-lg" style={{ pointerEvents: 'none' }}>
                    <img
                      src="https://images.unsplash.com/photo-1719865400276-d1e7bde7e9c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMHdvbWFuJTIwc21pbGluZyUyMHdhbGtlciUyMHdhbGtpbmd8ZW58MXx8fHwxNzU5NDE1MDY0fDA&ixlib=rb-4.1.0&q=80&w=1080"
                      alt="Professional Prawnbox Proxy providing secure package storage services"
                      className="w-full h-64 object-cover"
                      style={{ pointerEvents: 'none', userSelect: 'none', WebkitUserSelect: 'none' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-prawnbox-accent/80 to-transparent flex items-end" style={{ pointerEvents: 'none' }}>
                      <div className="p-6 text-white w-full" style={{ pointerEvents: 'none' }}>
                        <h4 className="font-bold text-xl mb-2">Secure Package Storage</h4>
                        <p className="text-sm opacity-90">Provide safe storage for packages when receivers are unavailable. Earn fees while helping your community with reliable proxy services.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Primary and Secondary Buttons - Proxy */}
                <div className="mt-6 flex flex-col items-center relative z-40" style={{
                  pointerEvents: 'auto',
                  isolation: 'isolate'
                }}>
                  {/* CTA Buttons Row */}
                  <div className="w-full flex flex-row space-x-3 mt-[-20px] mr-[0px] mb-[0px] ml-[0px]">
                    {/* Primary Button - Storage Management */}
                    <Button
                      className="flex-1 h-16 py-4 text-white rounded-[13px] flex items-center justify-center space-x-2 active:scale-95 transition-all duration-200 shadow-sm relative z-50 cursor-pointer touch-manipulation"
                      style={{ 
                        backgroundColor: '#2f2f2f',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                        pointerEvents: 'auto',
                        userSelect: 'none',
                        WebkitUserSelect: 'none',
                        WebkitTapHighlightColor: 'transparent',
                        isolation: 'isolate',
                        position: 'relative'
                      }}
                      onClick={(e) => {
                        e.preventDefault(); 
                        e.stopPropagation(); 
                        console.log('🖱️ Primary button clicked: proxy-dashboard');
                        onActionClick('proxy-dashboard');
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#404040';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#2f2f2f';
                      }}
                    >
                      <Package size={20} className="text-white" />
                      <span className="font-medium">Manage Store</span>
                    </Button>
                  </div>

                  {/* Learn More Link */}
                  <div className="mt-4 text-center relative z-50">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log('🎓 Learn more link clicked: become-proxy');
                        onActionClick('become-proxy');
                      }}
                      className="text-sm underline transition-all duration-200 cursor-pointer"
                      style={{
                        color: '#f44708',
                        pointerEvents: 'auto',
                        userSelect: 'none',
                        WebkitUserSelect: 'none',
                        WebkitTapHighlightColor: 'transparent'
                      }}
                    >
                      Learn more about being a proxy
                    </button>
                  </div>

                </div>

              </>
            )}
          </div>
        </div>



      </Card>
    </>
  );
}