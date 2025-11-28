"use client";
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  Plus, Package, Truck, Wallet, Package2, Zap
} from 'lucide-react';

import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { RecentActivity } from '../RecentActivity';
import { UserRole, User, DeliveryJob } from '../../types';
import {
  ACTION_BUTTON_CONFIGS
} from '../../constants/dashboard';
import { DashboardStats } from '../../utils/dashboard';
import { getSenderPackages, getPalPackages, getReceiverPackages, getProxyPackages } from '../../utils/packageFilters';

interface QuickActionsCardProps {
  activeRole: UserRole;
  stats: DashboardStats;
  user: User | null;
  allJobs: DeliveryJob[];
  onActionClick: (action: string) => void;
  onSpecialActionClick: (action: string) => void;
  onNavigateToSponsorship: () => void;
  onJobSelect?: (job: DeliveryJob) => void;
}

export function QuickActionsCard({
  activeRole,
  user,
  allJobs,
  onActionClick,
  onJobSelect
}: Omit<QuickActionsCardProps, 'stats' | 'onSpecialActionClick' | 'onNavigateToSponsorship'>) {
  const config = ACTION_BUTTON_CONFIGS[activeRole.toUpperCase() as keyof typeof ACTION_BUTTON_CONFIGS];

  // Filter sent packages for the current user (sender role)
  const sentPackages = useMemo(() => {
    if (!user) return [];
    const filtered = getSenderPackages(allJobs, user.id);
    console.log('📤 Sender packages filter:', {
      userId: user.id,
      allJobsCount: allJobs.length,
      filteredCount: filtered.length,
      allJobs: allJobs.map(j => ({ id: j.id, senderId: j.senderId })),
      filtered: filtered.map(j => ({ id: j.id, senderId: j.senderId }))
    });
    return filtered;
  }, [allJobs, user]);

  // Filter jobs where user is the accepted pal (pal role)
  const palJobs = useMemo(() => {
    if (!user) return [];
    return getPalPackages(allJobs, user.id);
  }, [allJobs, user]);

  // Filter jobs where user is the receiver (receiver role)
  const receivedPackages = useMemo(() => {
    if (!user) return [];
    return getReceiverPackages(allJobs, user.id);
  }, [allJobs, user]);

  // Filter jobs where user is the proxy (proxy role)
  const proxyPackages = useMemo(() => {
    if (!user) return [];
    return getProxyPackages(allJobs, user.id);
  }, [allJobs, user]);

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
      <Card className="w-full max-w-none p-4 sm:p-6 lg:p-8 border-0 rounded-2xl bg-white shadow-sm mx-0 my-4 sm:my-6 relative z-20 overflow-hidden" style={{
        isolation: 'isolate',
        pointerEvents: 'auto'
      }}>
        <div className=" border-b-0">
          {/* Wallet Balance and In-Escrow Section - Side by Side */}
          {/* <div className="grid grid-cols-2 gap-4 mb-8">
           
            <button
              onClick={() => onActionClick('wallet')}
              className="group relative overflow-hidden bg-gradient-to-br from-teal-50 to-teal-100/50 hover:from-teal-100 hover:to-teal-200/50 border-2 border-teal-200 hover:border-teal-300 rounded-2xl p-5 transition-all duration-300 cursor-pointer active:scale-[0.98] shadow-sm hover:shadow-md"
              style={{
                pointerEvents: 'auto',
                userSelect: 'none',
                WebkitUserSelect: 'none',
                WebkitTapHighlightColor: 'transparent'
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 rounded-xl bg-teal-600 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <span className="text-white font-bold text-lg">₦</span>
                </div>
                <div className="w-8 h-8 rounded-lg bg-white/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-4 h-4 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
              <div className="text-left">
                <p className="text-xs font-medium text-teal-700 mb-1 uppercase tracking-wide">Wallet Balance</p>
                <p className="text-2xl font-bold text-teal-900 truncate">
                  {formatAmount(user?.walletBalance || 0)}
                </p>
              </div>
            </button>

         
            <div className="relative">
              <button
                onClick={() => onActionClick('my-deliveries')}
                className="group w-full relative overflow-hidden bg-gradient-to-br from-orange-50 to-orange-100/50 hover:from-orange-100 hover:to-orange-200/50 border-2 border-orange-200 hover:border-orange-300 rounded-2xl p-5 transition-all duration-300 cursor-pointer active:scale-[0.98] shadow-sm hover:shadow-md"
                style={{
                  pointerEvents: 'auto',
                  userSelect: 'none',
                  WebkitUserSelect: 'none',
                  WebkitTapHighlightColor: 'transparent'
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 rounded-xl bg-[#f44708] flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Lock size={20} className="text-white" />
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setShowEscrowTooltip(!showEscrowTooltip);
                    }}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                      showEscrowTooltip
                        ? 'bg-[#f44708] text-white'
                        : 'bg-white/60 text-orange-600 hover:bg-white hover:text-[#f44708]'
                    }`}
                    style={{
                      pointerEvents: 'auto',
                      userSelect: 'none',
                      WebkitUserSelect: 'none',
                      WebkitTapHighlightColor: 'transparent'
                    }}
                  >
                    <Info size={16} />
                  </button>
                </div>
                <div className="text-left">
                  <p className="text-xs font-medium text-orange-700 mb-1 uppercase tracking-wide">In Escrow</p>
                  <p className="text-2xl font-bold text-orange-900 truncate">
                    {formatAmount(calculateEscrowAmount())}
                  </p>
                </div>
              </button>

        
              {showEscrowTooltip && (
                <div
                  ref={escrowPopupRef}
                  className="absolute top-full right-0 mt-3 w-80 max-w-[calc(100vw-2rem)] z-50 animate-in fade-in slide-in-from-top-2 duration-200"
                  style={{
                    right: 'max(-0.5rem, calc(-320px + 100%))'
                  }}
                >
                  <Card className="bg-white border border-gray-200 shadow-2xl rounded-2xl overflow-hidden">
            
                    <div className="bg-gradient-to-br from-[#f44708] to-orange-600 p-5 relative">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                            <Lock size={18} className="text-white" />
                          </div>
                          <h3 className="text-lg font-bold text-white">What is Escrow?</h3>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowEscrowTooltip(false);
                          }}
                          className="w-8 h-8 flex items-center justify-center hover:bg-white/20 rounded-xl transition-colors"
                          style={{
                            pointerEvents: 'auto',
                            userSelect: 'none',
                            WebkitUserSelect: 'none'
                          }}
                        >
                          <X size={16} className="text-white" />
                        </button>
                      </div>
                    </div>

                   
                    <div className="p-5 space-y-4">
                      {activeRole === 'sender' ? (
                        <>
                          <div className="flex items-start space-x-3">
                            <div className="w-8 h-8 bg-teal-100 rounded-xl flex items-center justify-center flex-shrink-0">
                              <Check size={16} className="text-teal-600" />
                            </div>
                            <div className="flex-1">
                              <p className="font-semibold text-gray-900 text-sm mb-1.5">
                                Secure Payment Protection
                              </p>
                              <p className="text-gray-600 text-xs leading-relaxed">
                                Your payment is safely held in escrow until delivery is completed. This protects your money.
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start space-x-3">
                            <div className="w-8 h-8 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                              <Lock size={16} className="text-[#f44708]" />
                            </div>
                            <div className="flex-1">
                              <p className="font-semibold text-gray-900 text-sm mb-1.5">
                                Released After Delivery
                              </p>
                              <p className="text-gray-600 text-xs leading-relaxed">
                                The Pal only receives payment after you confirm successful delivery. You&apos;re in control.
                              </p>
                            </div>
                          </div>

                          <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-xl p-4 border border-orange-200">
                            <p className="text-xs font-medium text-orange-700 mb-2 uppercase tracking-wide">Current Escrow Amount</p>
                            <p className="text-xl font-bold text-[#f44708]">
                              {formatAmount(calculateEscrowAmount())}
                            </p>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex items-start space-x-3">
                            <div className="w-8 h-8 bg-teal-100 rounded-xl flex items-center justify-center flex-shrink-0">
                              <Check size={16} className="text-teal-600" />
                            </div>
                            <div className="flex-1">
                              <p className="font-semibold text-gray-900 text-sm mb-1.5">
                                Guaranteed Payment
                              </p>
                              <p className="text-gray-600 text-xs leading-relaxed">
                                These funds are already secured in escrow. You&apos;re guaranteed to receive payment upon successful delivery.
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start space-x-3">
                            <div className="w-8 h-8 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                              <Lock size={16} className="text-[#f44708]" />
                            </div>
                            <div className="flex-1">
                              <p className="font-semibold text-gray-900 text-sm mb-1.5">
                                Held Until Delivery
                              </p>
                              <p className="text-gray-600 text-xs leading-relaxed">
                                Funds are released to your wallet immediately after the receiver confirms successful delivery.
                              </p>
                            </div>
                          </div>

                          <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-xl p-4 border border-orange-200">
                            <p className="text-xs font-medium text-orange-700 mb-2 uppercase tracking-wide">Pending Escrow Earnings</p>
                            <p className="text-xl font-bold text-[#f44708]">
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
          </div> */}

          <div className="flex items-center justify-between mb-[20px]">
            <h2 className="text-lg font-bold text-prawnbox-primary text-[34px] font-[Plus_Jakarta_Sans] tracking-[-1px]">{roleInstructions.title}</h2>

            {/* Wallet Display */}
            <button
              onClick={() => onActionClick('wallet')}
              className="xl:hidden bg-gray-50rounded-xl px-4 py-2.5 flex items-center space-x-3 hover:bg-gray-100 hover:border-gray-300 transition-all cursor-pointer"
              style={{
                pointerEvents: 'auto',
                userSelect: 'none',
                WebkitUserSelect: 'none',
                WebkitTapHighlightColor: 'transparent'
              }}
            >
             
              <div className="w-9 h-9 rounded-lg bg-[#f44708] flex items-center justify-center">
                <Wallet size={18} className="text-white" />
              </div>
            </button>
          </div>

          <p className="text-prawnbox-text-light text-left leading-relaxed text-[15px]">
            {activeRole === 'sender' && 'Let Pals (our verified delivery agents) bid to deliver your item. Or, choose a Pal you know.'}
            {activeRole === 'pal' && 'Pick up & deliver packages, whether you own a vehicle, or are a passenger.'}
            {activeRole === 'receiver' && 'Track your incoming deliveries and confirm receipt when they arrive safely.'}
            {activeRole === 'proxy' && 'Manage packages receivers missed, & hand over securely to receiver.'}
          </p>
        </div>

        {/* Role-Specific Action Buttons - Always Visible */}
        <div className=" sm:px-6 lg:px-8 mb-4">
          {activeRole === 'sender' && (
            <div className="w-full flex flex-row space-x-3">
              <Button
                className="flex-1 h-16 py-4 text-white rounded-[13px] flex items-center justify-center space-x-2 active:scale-95 transition-all duration-200 shadow-sm cursor-pointer touch-manipulation"
                style={{
                  backgroundColor: '#f44708',
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
                  e.currentTarget.style.backgroundColor = '#f44708';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#f44708';
                }}
              >
                <Plus size={20} className="text-white" />
                <span className="font-medium">Send a Package</span>
              </Button>

              <Button
                className="flex-1 h-16 py-4 text-[#2f2f2f] rounded-[13px] flex items-center justify-center space-x-2 active:scale-95 transition-all duration-200 shadow-sm cursor-pointer touch-manipulation"
                style={{
                  backgroundColor: 'white',
                  border: '1px solid #f44708',
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
          )}

          {activeRole === 'pal' && (
            <div className="w-full flex flex-row space-x-3">
              <Button
                className="flex-1 h-16 py-4 text-white rounded-[13px] flex items-center justify-center space-x-2 active:scale-95 transition-all duration-200 shadow-sm"
                style={{
                  backgroundColor: '#f44708',
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
                  border: '1px solid #f44708',
                  pointerEvents: 'auto'
                }}
                onClick={() => onActionClick('accepted-bids')}
              >
                <Truck size={20} className="text-[#2f2f2f]" />
                <span className="font-medium">Active Jobs</span>
              </Button>
            </div>
          )}

          {activeRole === 'receiver' && (
            <Button
              className="w-full h-16 text-white rounded-[13px] flex items-center justify-center space-x-2"
              style={{ backgroundColor: '#f44708', pointerEvents: 'auto' }}
              onClick={() => onActionClick('received-deliveries')}
            >
              <Package2 size={20} className="text-white" />
              <span className="font-medium">Incoming/Received Items</span>
            </Button>
          )}

          {activeRole === 'proxy' && (
            <Button
              className="w-full h-16 text-white rounded-[13px] flex items-center justify-center space-x-2"
              style={{ backgroundColor: '#f44708', pointerEvents: 'auto' }}
              onClick={() => onActionClick('proxy-dashboard')}
            >
              <Package size={20} className="text-white" />
              <span className="font-medium">Manage Store</span>
            </Button>
          )}
        </div>

        {/* Scrollable Recent Activity Section */}
        <div className="max-h-[400px] overflow-y-auto overflow-x-hidden">
          {activeRole === 'sender' && (
            <RecentActivity
              packages={sentPackages}
              onViewPackage={(job) => {
                if (onJobSelect) {
                  onJobSelect(job);
                } else {
                  onActionClick(`job-${job.id}`);
                }
              }}
            />
          )}

          {activeRole === 'pal' && (
            <RecentActivity
              packages={palJobs}
              onViewPackage={(job) => {
                if (onJobSelect) {
                  onJobSelect(job);
                } else {
                  onActionClick(`job-${job.id}`);
                }
              }}
            />
          )}

          {activeRole === 'receiver' && (
            <RecentActivity
              packages={receivedPackages}
              onViewPackage={(job) => {
                if (onJobSelect) {
                  onJobSelect(job);
                } else {
                  onActionClick(`job-${job.id}`);
                }
              }}
            />
          )}

          {activeRole === 'proxy' && (
            <RecentActivity
              packages={proxyPackages}
              onViewPackage={(job) => {
                if (onJobSelect) {
                  onJobSelect(job);
                } else {
                  onActionClick(`job-${job.id}`);
                }
              }}
            />
          )}
        </div>
      </Card>
    </>
  );
}