"use client";

import React, {
  useState,
  useMemo,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/stores/appStore";
import { ROUTES } from "@/lib/routes";
import type {
  DeliveryJob,
  ItemSize,
  DeliveryStatus,
  BackendPackage,
} from "@/types/index";
import {
  getPalPackages,
  getProxyPackages,
  getReceiverPackages,
  getSenderPackages,
  getUserPackages,
} from "@/utils/packageFilters";
import { apiService } from "@/utils/apiService";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { formatAmount } from "@/utils/dashboard";
import {
  Check,
  Info,
  Lock,
  Package,
  Package2,
  Plus,
  Truck,
  Wallet,
  X,
  Zap,
  Shield,
  AlertCircle,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import { ACTION_BUTTON_CONFIGS } from "@/constants/dashboard";
import { Button } from "@/components/ui/button";
import { RecentActivity } from "@/components/RecentActivity";
import { getRoleInstructions } from "@/utils/helpers";

// Tier configuration
const TIER_CONFIG = {
  1: {
    name: "Basic",
    canReceive: true,
    canSend: false,
    canBePal: false,
    canBeProxy: false,
    requirements: {
      forTier2: ["Verify NIN", "Fund wallet", "Upload documents"],
    },
  },
  2: {
    name: "Verified",
    canReceive: true,
    canSend: true,
    canBePal: true,
    canBeProxy: false,
    requirements: {
      forTier3: [
        "Verify physical location",
        "Provide rent details",
        "Upload utility bills",
      ],
    },
  },
  3: {
    name: "Pro",
    canReceive: true,
    canSend: true,
    canBePal: true,
    canBeProxy: true,
    requirements: {},
  },
} as const;

// Helper function to check tier permissions
const checkTierPermission = (
  userTier: number,
  requiredAction: keyof (typeof TIER_CONFIG)[1],
) => {
  const tierConfig =
    TIER_CONFIG[userTier as keyof typeof TIER_CONFIG] || TIER_CONFIG[1];
  return tierConfig[requiredAction] || false;
};

// Tier upgrade prompt component
const TierUpgradePrompt = ({
  currentTier,
  requiredTier,
  action,
  onClose,
  onUpgrade,
}: {
  currentTier: number;
  requiredTier: number;
  action: string;
  onClose: () => void;
  onUpgrade: () => void;
}) => {
  const tierConfig = TIER_CONFIG[currentTier as keyof typeof TIER_CONFIG];
  const nextTierKey =
    `forTier${requiredTier}` as keyof typeof tierConfig.requirements;
  const requirements: any = tierConfig.requirements[nextTierKey] || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <Card className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="relative bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 p-6 text-white">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12" />

          <div className="relative flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Upgrade Required</h3>
                <p className="text-white/80 text-sm mt-0.5">
                  Tier {requiredTier} Feature
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div className="flex items-start space-x-3 p-4 bg-amber-50 border border-amber-200 rounded-xl">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-amber-900">
                To {action}, you need to upgrade to Tier {requiredTier}
              </p>
              <p className="text-xs text-amber-700 mt-1">
                You&apos;re currently on Tier {currentTier} (
                {TIER_CONFIG[currentTier as keyof typeof TIER_CONFIG].name})
              </p>
            </div>
          </div>

          {requirements.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                <TrendingUp className="w-4 h-4 mr-2 text-primary" />
                Complete these steps to upgrade:
              </h4>
              <div className="space-y-2">
                {requirements.map((req: any, idx: any) => (
                  <div
                    key={idx}
                    className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-primary">
                        {idx + 1}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 font-medium">{req}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 h-12 rounded-xl border-2"
            >
              Maybe Later
            </Button>
            <Button
              onClick={onUpgrade}
              className="flex-1 h-12 rounded-xl bg-gradient-to-r from-primary to-orange-600 hover:from-orange-600 hover:to-primary text-white font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              <span>Upgrade Now</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default function DashboardPage() {
  const router = useRouter();

  const {
    user,
    activeMode,
    deliveryJobs,
    proxyItems,
    notifications,
    setSelectedJob,
    setActiveMode,
    setDeliveryJobs,
  } = useAppStore();

  const config =
    ACTION_BUTTON_CONFIGS[
      activeMode.toUpperCase() as keyof typeof ACTION_BUTTON_CONFIGS
    ];

  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const [showUpgradePrompt, setShowUpgradePrompt] = useState(false);
  const [upgradeContext, setUpgradeContext] = useState<{
    action: string;
    requiredTier: number;
  } | null>(null);

  // Filter sent packages for the current user (sender role)
  const sentPackages = useMemo(() => {
    if (!user) return [];
    const filtered = getSenderPackages(deliveryJobs, user._id);
    return filtered;
  }, [deliveryJobs, user]);

  // Filter jobs where user is the accepted pal (pal role)
  const palJobs = useMemo(() => {
    if (!user) return [];
    return getPalPackages(deliveryJobs, user._id);
  }, [deliveryJobs, user]);

  // Filter jobs where user is the receiver (receiver role)
  const receivedPackages = useMemo(() => {
    if (!user) return [];
    return getReceiverPackages(deliveryJobs, user._id);
  }, [deliveryJobs, user]);

  // Filter jobs where user is the proxy (proxy role)
  const proxyPackages = useMemo(() => {
    if (!user) return [];
    return getProxyPackages(deliveryJobs, user._id);
  }, [deliveryJobs, user]);

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

    const events = [
      "mousedown",
      "mousemove",
      "keypress",
      "scroll",
      "touchstart",
      "click",
    ];
    events.forEach((event) => {
      document.addEventListener(event, handleActivity, true);
    });

    resetActivity();

    return () => {
      events.forEach((event) => {
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

  // Fetch packages from backend
  useEffect(() => {
    const fetchPackages = async () => {
      if (!user) {
        router.push(ROUTES.AUTH);
        return;
      }

      try {
        const response = await apiService.getAllPackages();

        if (response.success && response.data) {
          const mappedJobs: DeliveryJob[] = response.data.map(
            (pkg: BackendPackage) => {
              const senderId = pkg.sender?.senderId
                ? typeof pkg.sender.senderId === "object"
                  ? pkg.sender.senderId._id
                  : pkg.sender.senderId
                : user?._id || "";

              return {
                id: pkg._id || pkg.id || "",
                orderNumber:
                  pkg.orderNumber ||
                  `ORD-${(pkg._id || "").slice(0, 8).toUpperCase()}`,
                senderId,
                senderName: pkg.sender?.name || user?.firstName || "",
                senderPhone: pkg.sender?.phone || user?.phoneNumber || "",
                title: pkg.title,
                description: pkg.description || "",
                pickupLocation:
                  pkg.sender?.formattedAddress ||
                  pkg.sender?.address ||
                  pkg.pickupLocation ||
                  "Pickup address not specified",
                dropoffLocation:
                  pkg.receiver?.formattedAddress ||
                  pkg.receiver?.address ||
                  pkg.dropoffLocation ||
                  "Delivery address not specified",
                itemSize: (pkg.items?.[0]?.size as ItemSize) || "Medium",
                category: pkg.items?.[0]?.category || pkg.category || "",
                weight: pkg.items?.[0]?.weight?.toString() || pkg.weight || "",
                value: pkg.price || pkg.value || 0,
                receiverId: pkg.receiver?.receiverId,
                receiverName: pkg.receiver?.name || "",
                receiverPhone: pkg.receiver?.phone || "",
                selectedPalId: pkg.pal?.palId,
                selectedPalName: pkg.pal?.name,
                selectedPalPhone: pkg.pal?.phone,
                proxyId: pkg.proxy?.proxyId,
                proxyName: pkg.proxy?.name,
                status: (pkg.status as DeliveryStatus) || "pending",
                pickupDate: pkg.pickupDate || new Date().toISOString(),
                pickupTime: pkg.pickupTime || "12:00",
                notes: pkg.notes || "",
                images: pkg.items?.[0]?.images?.map((img) => img.url) || [],
                bids:
                  pkg.bids?.map((bid) => ({
                    id: bid._id || bid.id || "",
                    palId: bid.palId || "",
                    palName: bid.palName || "",
                    palRating: bid.palRating || 0,
                    vehicleType:
                      (bid.vehicleType as "car" | "bike" | "van" | "truck") ||
                      "car",
                    estimatedTime: bid.estimatedTime || "",
                    amount: bid.amount || 0,
                    message: bid.message || "",
                    placedAt: bid.placedAt || new Date().toISOString(),
                    canEdit: bid.canEdit || false,
                    isAccepted: bid.isAccepted || false,
                    createdAt: bid.createdAt || new Date().toISOString(),
                  })) || [],
                isLive: true,
                createdAt: pkg.createdAt || new Date().toISOString(),
                distance: 0,
              } as DeliveryJob;
            },
          );

          setDeliveryJobs(mappedJobs);
        }
      } catch (error) {
        console.error("❌ Error fetching packages:", error);
        toast.error("Failed to load packages");
      }
    };

    fetchPackages();
  }, [user, router, setDeliveryJobs]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showEscrowTooltip &&
        escrowPopupRef.current &&
        !escrowPopupRef.current.contains(event.target as Node)
      ) {
        setShowEscrowTooltip(false);
      }
    };

    if (showEscrowTooltip) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showEscrowTooltip]);

  if (!config) {
    console.warn("No config found for role:", activeMode);
    return null;
  }

  const roleInstructions = getRoleInstructions(activeMode);

  const calculateEscrowAmount = () => {
    if (!user) return 0;

    const userActiveJobs = deliveryJobs.filter((job) => {
      if (activeMode === "sender") {
        return (
          job.senderId === user._id &&
          ["assigned", "picked-up", "in-transit"].includes(job.status) &&
          job.escrowAmount
        );
      } else if (activeMode === "pal") {
        return (
          job.selectedPalId === user._id &&
          ["assigned", "picked-up", "in-transit"].includes(job.status) &&
          job.escrowAmount
        );
      }
      return false;
    });

    return userActiveJobs.reduce((total, job) => {
      return (
        total + (job.escrowAmount || job.acceptedBidAmount || job.value || 0)
      );
    }, 0);
  };

  const handleJobSelect = (job: DeliveryJob) => {
    setSelectedJob(job);
    router.push(`${ROUTES.AVAILABLE_JOBS}/${job.id}`);
  };

  const handleCall = (phone: string) => {
    const cleanPhone = phone.replace(/\D/g, "");
    if (typeof window !== "undefined") {
      const whatsappUrl = `https://wa.me/${cleanPhone}`;
      window.open(whatsappUrl, "_blank");
    }
  };

  // Enhanced action handler with tier checking
  const handleActionClick = (action: string, requiredTier?: number) => {
    const userTier = user?.tier || 1;

    // Check tier permission if required
    if (requiredTier && userTier < requiredTier) {
      setUpgradeContext({
        action: action.replace(/-/g, " "),
        requiredTier,
      });
      setShowUpgradePrompt(true);
      return;
    }

    const actionRoutes: Record<string, string> = {
      "post-delivery": `${ROUTES.AVAILABLE_JOBS}/post`,
      "available-jobs": ROUTES.AVAILABLE_JOBS,
      "accepted-bids": ROUTES.ACCEPTED_BIDS,
      "accepted-bids-completed": `${ROUTES.MY_DELIVERIES}?filter=completed`,
      "my-deliveries": ROUTES.MY_DELIVERIES,
      wallet: ROUTES.WALLET,
      "wallet-add-funds": `${ROUTES.WALLET}/add-funds`,
      settings: ROUTES.SETTINGS,
      referral: ROUTES.REFERRAL,
      "tape-distributor": ROUTES.TAPE_DISTRIBUTOR,
      "proxy-dashboard": ROUTES.PROXY_DASHBOARD,
      "sent-deliveries-history": ROUTES.MY_DELIVERIES,
      "received-deliveries": ROUTES.MY_DELIVERIES,
    };

    const route = actionRoutes[action];
    if (route) {
      router.push(route);
    } else {
      console.warn("No route mapping for action:", action);
    }
  };

  const handleUpgradeClick = () => {
    setShowUpgradePrompt(false);
    router.push(ROUTES.SETTINGS + "?tab=verification");
  };

  const userJobs = useMemo(() => {
    return getUserPackages(deliveryJobs, user, activeMode);
  }, [deliveryJobs, user, activeMode]);

  const userTier = user?.tier || 1;
  const canSend = checkTierPermission(userTier, "canSend");
  const canBePal = checkTierPermission(userTier, "canBePal");
  const canBeProxy = checkTierPermission(userTier, "canBeProxy");

  return (
    <>
      <Card
        className="w-full max-w-none p-4 sm:p-6 lg:p-8 mx-0 my-4 sm:my-6 relative border-0 z-20 overflow-hidden"
        style={{
          isolation: "isolate",
          pointerEvents: "auto",
        }}
      >
        <div className="border-b-0">
          {/* Tier Badge */}
          <div className="mb-6 inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-full">
            <Shield className="w-4 h-4 text-amber-600" />
            <span className="text-sm font-bold text-amber-900">
              Tier {userTier} -{" "}
              {TIER_CONFIG[userTier as keyof typeof TIER_CONFIG].name}
            </span>
          </div>

          {/* Wallet Balance and In-Escrow Section - Side by Side */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <button
              onClick={() => handleActionClick("wallet")}
              className="group relative overflow-hidden bg-gradient-to-br from-emerald-50 to-teal-100/50 hover:from-emerald-100 hover:to-teal-200/50 border-2 border-emerald-200 hover:border-emerald-300 rounded-2xl p-5 transition-all duration-300 cursor-pointer active:scale-[0.98] shadow-sm hover:shadow-md"
              style={{
                pointerEvents: "auto",
                userSelect: "none",
                WebkitUserSelect: "none",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-600 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Wallet className="w-5 h-5 text-white" />
                </div>
                <div className="w-8 h-8 rounded-lg bg-white/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="w-4 h-4 text-emerald-600" />
                </div>
              </div>
              <div className="text-left">
                <p className="text-xs font-semibold text-emerald-700 mb-1 uppercase tracking-wide">
                  Wallet Balance
                </p>
                <p className="text-2xl font-bold text-emerald-900 truncate">
                  {formatAmount(user?.balance || 0)}
                </p>
              </div>
            </button>

            <div className="relative">
              <button
                onClick={() => handleActionClick("my-deliveries")}
                className="group w-full relative overflow-hidden bg-gradient-to-br from-orange-50 to-rose-100/50 hover:from-orange-100 hover:to-rose-200/50 border-2 border-orange-200 hover:border-orange-300 rounded-2xl p-5 transition-all duration-300 cursor-pointer active:scale-[0.98] shadow-sm hover:shadow-md"
                style={{
                  pointerEvents: "auto",
                  userSelect: "none",
                  WebkitUserSelect: "none",
                  WebkitTapHighlightColor: "transparent",
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-rose-500 flex items-center justify-center flex-shrink-0 shadow-sm">
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
                        ? "bg-orange-500 text-white shadow-sm"
                        : "bg-white/60 text-orange-700 hover:bg-white hover:text-orange-500"
                    }`}
                    style={{
                      pointerEvents: "auto",
                      userSelect: "none",
                      WebkitUserSelect: "none",
                      WebkitTapHighlightColor: "transparent",
                    }}
                  >
                    <Info size={16} />
                  </button>
                </div>
                <div className="text-left">
                  <p className="text-xs font-semibold text-orange-700 mb-1 uppercase tracking-wide">
                    In Escrow
                  </p>
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
                    right: "max(-0.5rem, calc(-320px + 100%))",
                  }}
                >
                  <Card className="border border-gray-200 shadow-2xl rounded-2xl overflow-hidden bg-white">
                    <div className="bg-gradient-to-br from-orange-500 to-rose-500 p-5 relative">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />

                      <div className="relative flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                            <Lock size={18} className="text-white" />
                          </div>
                          <h3 className="text-lg font-bold text-white">
                            What is Escrow?
                          </h3>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowEscrowTooltip(false);
                          }}
                          className="w-8 h-8 flex items-center justify-center hover:bg-white/20 rounded-xl transition-colors"
                          style={{
                            pointerEvents: "auto",
                            userSelect: "none",
                            WebkitUserSelect: "none",
                          }}
                        >
                          <X size={16} className="text-white" />
                        </button>
                      </div>
                    </div>

                    <div className="p-5 space-y-4">
                      {activeMode === "sender" ? (
                        <>
                          <div className="flex items-start space-x-3">
                            <div className="w-8 h-8 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                              <Check size={16} className="text-emerald-600" />
                            </div>
                            <div className="flex-1">
                              <p className="font-semibold text-gray-900 text-sm mb-1.5">
                                Secure Payment Protection
                              </p>
                              <p className="text-gray-600 text-xs leading-relaxed">
                                Your payment is safely held in escrow until
                                delivery is completed. This protects your money.
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start space-x-3">
                            <div className="w-8 h-8 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                              <Lock size={16} className="text-orange-600" />
                            </div>
                            <div className="flex-1">
                              <p className="font-semibold text-gray-900 text-sm mb-1.5">
                                Released After Delivery
                              </p>
                              <p className="text-gray-600 text-xs leading-relaxed">
                                The Pal only receives payment after you confirm
                                successful delivery. You&apos;re in control.
                              </p>
                            </div>
                          </div>

                          <div className="bg-gradient-to-br from-orange-50 to-rose-50 rounded-xl p-4 border border-orange-200">
                            <p className="text-xs font-semibold text-orange-700 mb-2 uppercase tracking-wide">
                              Current Escrow Amount
                            </p>
                            <p className="text-xl font-bold text-orange-900">
                              {formatAmount(calculateEscrowAmount())}
                            </p>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex items-start space-x-3">
                            <div className="w-8 h-8 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                              <Check size={16} className="text-emerald-600" />
                            </div>
                            <div className="flex-1">
                              <p className="font-semibold text-gray-900 text-sm mb-1.5">
                                Guaranteed Payment
                              </p>
                              <p className="text-gray-600 text-xs leading-relaxed">
                                These funds are already secured in escrow.
                                You&apos;re guaranteed to receive payment upon
                                successful delivery.
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start space-x-3">
                            <div className="w-8 h-8 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                              <Lock size={16} className="text-orange-600" />
                            </div>
                            <div className="flex-1">
                              <p className="font-semibold text-gray-900 text-sm mb-1.5">
                                Held Until Delivery
                              </p>
                              <p className="text-gray-600 text-xs leading-relaxed">
                                Funds are released to your wallet immediately
                                after the receiver confirms successful delivery.
                              </p>
                            </div>
                          </div>

                          <div className="bg-gradient-to-br from-orange-50 to-rose-50 rounded-xl p-4 border border-orange-200">
                            <p className="text-xs font-semibold text-orange-700 mb-2 uppercase tracking-wide">
                              Pending Escrow Earnings
                            </p>
                            <p className="text-xl font-bold text-orange-900">
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

          <div className="flex items-center justify-between mb-[20px]">
            <h2 className="text-lg font-bold text-primary text-[34px] font-[Plus_Jakarta_Sans] tracking-[-1px]">
              {roleInstructions.title}
            </h2>
          </div>

          <p className="text-white text-left leading-relaxed text-[15px] mb-6">
            {activeMode === "sender" &&
              "Let Pals (our verified delivery agents) bid to deliver your item. Or, choose a Pal you know."}
            {activeMode === "pal" &&
              "Pick up & deliver packages, whether you own a vehicle, or are a passenger."}
            {activeMode === "receiver" &&
              "Track your incoming deliveries and confirm receipt when they arrive safely."}
            {activeMode === "proxy" &&
              "Manage packages receivers missed, & hand over securely to receiver."}
          </p>
        </div>

        {/* Role-Specific Action Buttons with Tier Restrictions */}
        <div className="sm:px-6 lg:px-8 mb-4">
          {activeMode === "sender" && (
            <div className="w-full flex flex-col md:flex-row gap-4">
              <Button
                className="flex-1 h-16 py-4 text-white rounded-[13px] flex items-center justify-center space-x-2 active:scale-95 transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer touch-manipulation disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: canSend
                    ? "linear-gradient(135deg, #f44708 0%, #ff6b35 100%)"
                    : "linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)",
                  pointerEvents: "auto",
                  userSelect: "none",
                  WebkitUserSelect: "none",
                  WebkitTapHighlightColor: "transparent",
                }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleActionClick("post-delivery", 2);
                }}
                disabled={!canSend}
              >
                {canSend ? (
                  <>
                    <Plus size={20} className="text-white" />
                    <span className="font-semibold">Send a Package</span>
                  </>
                ) : (
                  <>
                    <Lock size={18} className="text-white" />
                    <span className="font-semibold">
                      Send a Package (Tier 2)
                    </span>
                  </>
                )}
              </Button>

              <Button
                className="flex-1 h-16 py-4 rounded-[13px] flex items-center justify-center space-x-2 active:scale-95 transition-all duration-200 shadow-sm cursor-pointer touch-manipulation"
                style={{
                  backgroundColor: "white",
                  border: "2px solid #f44708",
                  color: "#1f2937",
                  pointerEvents: "auto",
                  userSelect: "none",
                  WebkitUserSelect: "none",
                  WebkitTapHighlightColor: "transparent",
                }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleActionClick("sent-deliveries-history");
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#fef2f2";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "white";
                }}
              >
                <Package size={20} />
                <span className="font-semibold">My Sent Packages</span>
              </Button>
            </div>
          )}

          {activeMode === "pal" && (
            <div className="w-full flex flex-row space-x-3">
              <Button
                className="flex-1 h-16 py-4 text-white rounded-[13px] flex items-center justify-center space-x-2 active:scale-95 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: canBePal
                    ? "linear-gradient(135deg, #f44708 0%, #ff6b35 100%)"
                    : "linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)",
                  pointerEvents: "auto",
                }}
                onClick={() => handleActionClick("available-jobs", 2)}
                disabled={!canBePal}
              >
                {canBePal ? (
                  <>
                    <Zap size={20} className="text-white" />
                    <span className="font-semibold">Find Jobs</span>
                  </>
                ) : (
                  <>
                    <Lock size={18} className="text-white" />
                    <span className="font-semibold">Find Jobs (Tier 2)</span>
                  </>
                )}
              </Button>

              <Button
                className="flex-1 h-16 py-4 rounded-[13px] flex items-center justify-center space-x-2 active:scale-95 transition-all duration-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: "white",
                  border: "2px solid #f44708",
                  color: "#1f2937",
                  pointerEvents: "auto",
                }}
                onClick={() => handleActionClick("accepted-bids", 2)}
                disabled={!canBePal}
              >
                <Truck size={20} />
                <span className="font-semibold">Active Jobs</span>
              </Button>
            </div>
          )}

          {activeMode === "receiver" && (
            <Button
              className="w-full h-16 text-white rounded-[13px] flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
              style={{
                background: "linear-gradient(135deg, #f44708 0%, #ff6b35 100%)",
                pointerEvents: "auto",
              }}
              onClick={() => handleActionClick("received-deliveries")}
            >
              <Package2 size={20} className="text-white" />
              <span className="font-semibold">Incoming/Received Items</span>
            </Button>
          )}

          {activeMode === "proxy" && (
            <Button
              className="w-full h-16 text-white rounded-[13px] flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: canBeProxy
                  ? "linear-gradient(135deg, #f44708 0%, #ff6b35 100%)"
                  : "linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)",
                pointerEvents: "auto",
              }}
              onClick={() => handleActionClick("proxy-dashboard", 3)}
              disabled={!canBeProxy}
            >
              {canBeProxy ? (
                <>
                  <Package size={20} className="text-white" />
                  <span className="font-semibold">Manage Store</span>
                </>
              ) : (
                <>
                  <Lock size={18} className="text-white" />
                  <span className="font-semibold">Manage Store (Tier 3)</span>
                </>
              )}
            </Button>
          )}
        </div>

        {/* Scrollable Recent Activity Section */}
        <div className="max-h-[400px] overflow-y-auto overflow-x-hidden">
          {activeMode === "sender" && (
            <RecentActivity
              packages={sentPackages}
              onViewPackage={(job) => {
                if (handleJobSelect) {
                  handleJobSelect(job);
                } else {
                  handleActionClick(`job-${job.id}`);
                }
              }}
            />
          )}

          {activeMode === "pal" && (
            <RecentActivity
              packages={palJobs}
              onViewPackage={(job) => {
                if (handleJobSelect) {
                  handleJobSelect(job);
                } else {
                  handleActionClick(`job-${job.id}`);
                }
              }}
            />
          )}

          {activeMode === "receiver" && (
            <RecentActivity
              packages={receivedPackages}
              onViewPackage={(job) => {
                if (handleJobSelect) {
                  handleJobSelect(job);
                } else {
                  handleActionClick(`job-${job.id}`);
                }
              }}
            />
          )}

          {activeMode === "proxy" && (
            <RecentActivity
              packages={proxyPackages}
              onViewPackage={(job) => {
                if (handleJobSelect) {
                  handleJobSelect(job);
                } else {
                  handleActionClick(`job-${job.id}`);
                }
              }}
            />
          )}
        </div>
      </Card>

      {/* Tier Upgrade Prompt Modal */}
      {showUpgradePrompt && upgradeContext && (
        <TierUpgradePrompt
          currentTier={userTier}
          requiredTier={upgradeContext.requiredTier}
          action={upgradeContext.action}
          onClose={() => setShowUpgradePrompt(false)}
          onUpgrade={handleUpgradeClick}
        />
      )}
    </>
  );
}
