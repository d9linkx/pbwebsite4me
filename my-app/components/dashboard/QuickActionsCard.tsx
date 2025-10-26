"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Plus, Package, Truck, Wallet, Settings, Bell, Gift, Package2, Star, TrendingUp, MapPin, Send, Activity, Handshake, Zap, Check, Lock, Users, Heart, Info, X
} from 'lucide-react';

import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { UserRole, User, DeliveryJob } from '../../types';
import {
  ACTION_BUTTON_CONFIGS,
  BUTTON_THEMES,
  COMMON_BUTTON_STYLES,
  MOBILE_GRID_CONFIG
} from '../../constants/dashboard';
import { DashboardStats, formatAmount, getAvailableJobsCount } from '../../utils/dashboard';

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

  const [lastActivity, setLastActivity] = useState(Date.now());
  const [showVibration, setShowVibration] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const activityTimerRef = useRef<number | null>(null);
  const vibrationTimeoutRef = useRef<number | null>(null);

  const [showEscrowTooltip, setShowEscrowTooltip] = useState(false);
  const escrowPopupRef = useRef<HTMLDivElement>(null);

  const resetActivity = useCallback(() => {
    setLastActivity(Date.now());
    setShowVibration(false);

    if (activityTimerRef.current) {
      clearTimeout(activityTimerRef.current);
    }
    if (vibrationTimeoutRef.current) {
      clearTimeout(vibrationTimeoutRef.current);
    }

    activityTimerRef.current = setTimeout(() => {
      setShowVibration(true);

      vibrationTimeoutRef.current = setTimeout(() => {
        setShowVibration(false);
      }, 2000) as unknown as number;
    }, 5000) as unknown as number;
  }, []);

  useEffect(() => {
    const handleActivity = () => {
      resetActivity();
    };

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    events.forEach(event => {
      document.addEventListener(event, handleActivity, true);
    });

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

  const calculateEscrowAmount = () => {
    if (!user) return 0;

    const userActiveJobs = allJobs.filter(job => {
      if (activeRole === 'sender') {
        return job.senderId === user.id &&
          ['assigned', 'picked-up', 'in-transit'].includes(job.status) &&
          job.escrowAmount;
      }
      else if (activeRole === 'pal') {
        return job.selectedPalId === user.id &&
          ['assigned', 'picked-up', 'in-transit'].includes(job.status) &&
          job.escrowAmount;
      }
      return false;
    });

    return userActiveJobs.reduce((total, job) => {
      return total + (job.escrowAmount || job.acceptedBidAmount || job.value || 0);
    }, 0);
  };

  return (
    <>
      <Card className="w-full max-w-none p-4 sm:p-6 lg:p-8 border-0 rounded-2xl bg-white shadow-sm mx-0 my-4 sm:my-6 relative z-20" style={{
        isolation: 'isolate',
        pointerEvents: 'auto'
      }}>
        <div className="mb-6 border-b-0">
          {/* Wallet Balance and In-Escrow Section - Side by Side */}
          <div className="flex flex-row items-start justify-between gap-3 mb-6">
            {/* Wallet Balance - Left */}
            <button
              onClick={() => onActionClick('wallet')}
              className="flex-1 flex items-center space-x-2 p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:border-prawnbox-accent/20 rounded-xl transition-all duration-200 cursor-pointer active:scale-95 touch-manipulation"
              style={{
                pointerEvents: 'auto',
                userSelect: 'none',
                WebkitUserSelect: 'none',
                WebkitTapHighlightColor: 'transparent'
              }}
            >
              <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center flex-shrink-0">
                <span className="text-teal-600 font-bold text-sm">₦</span>
              </div>
              <div className="text-left min-w-0">
                <p className="text-xs text-gray-500">Wallet Balance</p>
                <p className="font-bold text-teal-600 truncate">
                  {formatAmount(user?.walletBalance || 0)}
                </p>
              </div>
            </button>

            {/* In-Escrow - Right with Info Icon Below */}
            <div className="flex-1 flex flex-col items-end">
              <button
                onClick={() => onActionClick('my-deliveries')}
                className="w-full flex items-center justify-end space-x-2 p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:border-prawnbox-accent/20 rounded-xl transition-all duration-200 cursor-pointer active:scale-95 touch-manipulation"
                style={{
                  pointerEvents: 'auto',
                  userSelect: 'none',
                  WebkitUserSelect: 'none',
                  WebkitTapHighlightColor: 'transparent'
                }}
              >
                <div className="text-right min-w-0">
                  <p className="text-xs text-gray-500">In Escrow</p>
                  <p className="font-bold text-orange-600 truncate">
                    {formatAmount(calculateEscrowAmount())}
                  </p>
                </div>
                <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
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
                  className={`p-1 hover:bg-gray-200 rounded-full transition-all duration-200 ${showEscrowTooltip ? 'bg-prawnbox-accent/10' : ''
                    }`}
                  style={{
                    pointerEvents: 'auto',
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                    WebkitTapHighlightColor: 'transparent'
                  }}
                >
                  <Info size={14} className={`transition-colors ${showEscrowTooltip ? 'text-prawnbox-accent' : 'text-gray-400 hover:text-prawnbox-accent'
                    }`} />
                </button>

                {/* Escrow Info Card Popup */}
                {showEscrowTooltip && (
                  <div
                    ref={escrowPopupRef}
                    className="absolute top-full right-0 mt-3 w-80 max-w-[calc(100vw-2rem)] z-50 animate-in fade-in slide-in-from-top-2 duration-200"
                    style={{
                      right: 'max(-0.5rem, calc(-320px + 100%))'
                    }}
                  >
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

          <h2 className="text-lg font-bold text-prawnbox-primary text-[34px] font-[Plus_Jakarta_Sans] tracking-[-1px] mb-[20px]">{roleInstructions.title}</h2>

          <p className="text-prawnbox-text-light text-left leading-relaxed text-[15px]">
            {activeRole === 'sender' && 'Let Pals (our verified delivery agents) bid to deliver your item. Or, choose a Pal you know.'}
            {activeRole === 'pal' && 'Pick up & deliver packages, whether you own a vehicle, or are a passenger.'}
            {activeRole === 'receiver' && 'Track your incoming deliveries and confirm receipt when they arrive safely.'}
            {activeRole === 'proxy' && 'Manage packages receivers missed, & hand over securely to receiver.'}
          </p>

          {/* Scrollable Content Area */}
          <div className="max-h-[calc(100vh-400px)] overflow-y-auto relative z-30" style={{
            pointerEvents: 'auto',
            isolation: 'isolate'
          }}>
            {/* Role-Specific Action Buttons */}
            <div className="flex flex-col relative z-30">
              {activeRole === 'sender' && (
                <>
                  <div className="mb-6">
                    <div className="relative w-full max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-lg">
                      <div className="absolute inset-0 bg-gradient-to-t from-prawnbox-accent/80 to-transparent flex items-end">
                        <div className="p-6 text-white w-full">
                          <h4 className="font-bold text-xl mb-2">Send with Confidence</h4>
                          <p className="text-sm opacity-90">Post your delivery, receive competitive bids from trusted Pals, and track your package every step of the way with real-time updates.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col items-center relative z-40">
                    <div className="w-full flex flex-row space-x-3">
                      <Button
                        className="flex-1 h-16 py-4 text-white rounded-[13px] flex items-center justify-center space-x-2 active:scale-95 transition-all duration-200 shadow-sm relative z-50 cursor-pointer touch-manipulation"
                        style={{
                          backgroundColor: '#2f2f2f',
                          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                          pointerEvents: 'auto',
                          userSelect: 'none',
                          WebkitUserSelect: 'none',
                          WebkitTapHighlightColor: 'transparent'
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
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

                      <Button
                        className="flex-1 h-16 py-4 text-[#2f2f2f] rounded-[13px] flex items-center justify-center space-x-2 active:scale-95 transition-all duration-200 shadow-sm relative z-50 cursor-pointer touch-manipulation"
                        style={{
                          backgroundColor: 'white',
                          border: '1px solid #2f2f2f',
                          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                          pointerEvents: 'auto',
                          userSelect: 'none',
                          WebkitUserSelect: 'none',
                          WebkitTapHighlightColor: 'transparent'
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
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
                  </div>
                </>
              )}

              {activeRole === 'pal' && (
                <>
                  <div className="mb-6">
                    {/* Pal content here */}
                  </div>
                  <div className="mt-6 flex flex-col items-center relative z-40">
                    <div className="w-full flex flex-row space-x-3">
                      <Button
                        className="flex-1 h-16 py-4 text-white rounded-[13px] flex items-center justify-center space-x-2 active:scale-95 transition-all duration-200 shadow-sm relative z-50 cursor-pointer touch-manipulation"
                        style={{
                          backgroundColor: '#2f2f2f',
                          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                          pointerEvents: 'auto'
                        }}
                        onClick={() => onActionClick('available-jobs')}
                      >
                        <Zap size={20} className="text-white" />
                        <span className="font-medium">Find Jobs</span>
                      </Button>

                      <Button
                        className="flex-1 h-16 py-4 text-[#2f2f2f] rounded-[13px] flex items-center justify-center space-x-2 active:scale-95 transition-all duration-200 shadow-sm"
                        style={{
                          backgroundColor: 'white',
                          border: '1px solid #2f2f2f',
                          pointerEvents: 'auto'
                        }}
                        onClick={() => onActionClick('accepted-bids')}
                      >
                        <Truck size={20} className="text-[#2f2f2f]" />
                        <span className="font-medium">Active Jobs</span>
                      </Button>
                    </div>
                  </div>
                </>
              )}

              {activeRole === 'receiver' && (
                <>
                  <div className="mb-6">
                    {/* Receiver content */}
                  </div>
                  <div className="mt-6">
                    <Button
                      className="w-full h-16 text-white rounded-[13px] flex items-center justify-center space-x-2"
                      style={{ backgroundColor: '#2f2f2f', pointerEvents: 'auto' }}
                      onClick={() => onActionClick('received-deliveries')}
                    >
                      <Package2 size={20} className="text-white" />
                      <span className="font-medium">Incoming/Received Items</span>
                    </Button>
                  </div>
                </>
              )}

              {activeRole === 'proxy' && (
                <>
                  <div className="mb-6">
                    {/* Proxy content */}
                  </div>
                  <div className="mt-6">
                    <Button
                      className="w-full h-16 text-white rounded-[13px] flex items-center justify-center space-x-2"
                      style={{ backgroundColor: '#2f2f2f', pointerEvents: 'auto' }}
                      onClick={() => onActionClick('proxy-dashboard')}
                    >
                      <Package size={20} className="text-white" />
                      <span className="font-medium">Manage Store</span>
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}