import { useState } from 'react';
import { 
  Screen, User, DeliveryJob, Bid, ProxyItem, ChatThread, ChatMessage, 
  NigerianLocation, UserRole, DisputeResolution, Notification 
} from '../types';

// Custom hook to manage app state
export const useAppState = () => {
  // Core state
  const [currentScreen, setCurrentScreen] = useState<Screen>('auth');
  const [user, setUser] = useState<User | null>(null);
  const [activeRole, setActiveRole] = useState<UserRole>('sender');

  // Entity selection state
  const [selectedJob, setSelectedJob] = useState<DeliveryJob | null>(null);
  const [selectedBid, setSelectedBid] = useState<Bid | null>(null);
  const [selectedPal, setSelectedPal] = useState<User | null>(null);
  const [selectedChatThread, setSelectedChatThread] = useState<ChatThread | null>(null);
  const [selectedProxyItem, setSelectedProxyItem] = useState<ProxyItem | null>(null);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [selectedProxyReceiver, setSelectedProxyReceiver] = useState<any>(null);
  
  // Data state
  const [deliveryJobs, setDeliveryJobs] = useState<DeliveryJob[]>([]);
  const [proxyItems, setProxyItems] = useState<ProxyItem[]>([]);
  const [chatThreads, setChatThreads] = useState<ChatThread[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Context state
  const [locationSelectionContext, setLocationSelectionContext] = useState<{
    type: 'pickup' | 'dropoff';
    returnScreen: Screen;
  } | null>(null);
  const [paymentContext, setPaymentContext] = useState<{
    amount: number;
    purpose: string;
    returnScreen: Screen;
  } | null>(null);

  // Flow state
  const [scanCompleted, setScanCompleted] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const [verificationRetries, setVerificationRetries] = useState(0);
  const [scanContext, setScanContext] = useState<'pickup' | 'delivery' | 'proxy-handover' | 'receiver-unavailable'>('pickup');
  const [scanningProxyItem, setScanningProxyItem] = useState<ProxyItem | null>(null);
  const [favoritePalJobData, setFavoritePalJobData] = useState<any>(null);
  const [selectedFavoritePal, setSelectedFavoritePal] = useState<any>(null);
  const [showCompletedDeliveries, setShowCompletedDeliveries] = useState(false);

  // Dispute and violation state
  const [currentDispute, setCurrentDispute] = useState<DisputeResolution | null>(null);
  const [violationFee, setViolationFee] = useState(0);
  const [refundAmount, setRefundAmount] = useState(0);
  const [disputeTimer, setDisputeTimer] = useState(600); // 10 minutes

  // Timer state
  const [globalPickupTimers, setGlobalPickupTimers] = useState<{[jobId: string]: number}>({});

  // UI state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return {
    // Core state
    currentScreen, setCurrentScreen,
    user, setUser,
    activeRole, setActiveRole,

    // Entity selection state
    selectedJob, setSelectedJob,
    selectedBid, setSelectedBid,
    selectedPal, setSelectedPal,
    selectedChatThread, setSelectedChatThread,
    selectedProxyItem, setSelectedProxyItem,
    selectedNotification, setSelectedNotification,
    selectedProxyReceiver, setSelectedProxyReceiver,

    // Data state
    deliveryJobs, setDeliveryJobs,
    proxyItems, setProxyItems,
    chatThreads, setChatThreads,
    notifications, setNotifications,

    // Context state
    locationSelectionContext, setLocationSelectionContext,
    paymentContext, setPaymentContext,

    // Flow state
    scanCompleted, setScanCompleted,
    selectedRoute, setSelectedRoute,
    verificationRetries, setVerificationRetries,
    scanContext, setScanContext,
    scanningProxyItem, setScanningProxyItem,
    favoritePalJobData, setFavoritePalJobData,
    selectedFavoritePal, setSelectedFavoritePal,
    showCompletedDeliveries, setShowCompletedDeliveries,

    // Dispute and violation state
    currentDispute, setCurrentDispute,
    violationFee, setViolationFee,
    refundAmount, setRefundAmount,
    disputeTimer, setDisputeTimer,

    // Timer state
    globalPickupTimers, setGlobalPickupTimers,

    // UI state
    isMobileMenuOpen, setIsMobileMenuOpen
  };
};