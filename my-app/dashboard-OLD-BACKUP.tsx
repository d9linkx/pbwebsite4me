// 'use client'
// import React, { useState, useEffect, useCallback } from "react";
// import {
//   X,
//   Home,
//   Wallet,
//   Settings,
//   Heart,
//   Users,
//   Store,
//   Plus,
//   Zap,
//   Mail,
//   Building,
// } from "lucide-react";
// import { motion } from "framer-motion";
// import { toast } from "sonner";
// import Image from "next/image";
// // import { SplashScreen } from './components/SplashScreen';
// // import { OnboardingScreen } from './components/OnboardingScreen';
// import { AuthScreen } from "../../components/AuthScreen";
// import { DashboardScreen } from "../../components/dashboard/DashboardScreen";
// import { DashboardHeader } from "../../components/dashboard/DashboardHeader";
// import { DashboardFooter } from "../../components/dashboard/DashboardFooter";
// import { PostDeliveryScreen } from "../../components/PostDeliveryScreen";
// import { BidsScreen } from "../../components/BidsScreen";
// import { EscrowPaymentScreen } from "../../components/EscrowPaymentScreen";
// import { AvailableJobsScreen } from "../../components/AvailableJobScreen";
// import { TrackingScreen } from "../../components/TrackingScreen";
// import { WalletScreen } from "../../components/WalletScreen";
// import { SettingsScreen } from "../../components/SettingsScreen";
// import { ProxyDashboard } from "../../components/ProxyDashboard";

// import { RatingsScreen } from "../../components/RatingsScreen";
// import { ProfileInformationScreen } from "../../components/ProfileInformationScreen";
// import { VerificationScreen } from "../../components/VerificationScreen";
// import { PaymentMethodsScreen } from "../../components/PaymentMethodsScreen";
// import { HelpCenterScreen } from "../../components/HelpCenterScreen";
// import { ContactSupportScreen } from "../../components/ContactSupportScreen";
// import { PalProfileScreen } from "../../components/PalProfileScreen";
// import { ChatScreen } from "../../components/ChatScreen";
// import { LocationSelectionScreen } from "../../components/LocationSelectionScreen";
// import { BidEditScreen } from "../../components/BidEditScreen";
// import { WalletAddFundsScreen } from "../../components/WalletAddFundsScreen";
// import { WalletWithdrawScreen } from "../../components/WalletWithdrawScreen";
// import { PaymentConfirmationScreen } from "../../components/PaymentConfirmationScreen";
// import { ReferralScreen } from "../../components/ReferralScreen";
// // import { SponsorshipScreen } from '../../components/SponsorshipScreen';
// import { SponsorUserSearchScreen } from "../../components/SponsorUserSearchScreen";
// import { SponsorUserConfirmationScreen } from "../../components/SponsorUserConfirmationScreen";
// import { SponsorshipSuccessScreen } from "../../components/SponsorshipSuccessScreen";
// import { SponsorshipManagementScreen } from "../../components/SponsorshipManagementScreen";
// import { BankTransferScreen } from "../../components/BankTransferScreen";
// import { CardPaymentScreen } from "../../components/CardPaymentScreen";
// import { PaymentStatusScreen } from "../../components/PaymentStatusScreen";
// import { DeliveryCompletionScreen } from "../../components/DeliveryCompletionScreen";
// import { ProxySelectionScreen } from "../../components/ProxySelectionScreen";
// import { QRScannerScreen } from "../../components/QRScannerScreen";
// import { PickupConfirmationScreen } from "../../components/PickupConfirmationScreen";
// import { PickupVerificationScreen } from "../../components/PickupVerificationScreen";
// import { HandoverQRScreen } from "../../components/HandoverQRScreen";
// import { AcceptedBidsScreen } from "../../components/AcceptedBidsScreen";
// import { DeliveryProgressScreen } from "../../components/DeliveryProgressScreen";
// import { DeliveryConfirmationScreen } from "../../components/DeliveryConfirmationScreen";
// import { ArrivalConfirmationScreen } from "../../components/ArrivalConfirmationScreen";
// import { SenderResolutionScreen } from "../../components/SenderResolutionScreen";
// import { CancellationConfirmationScreen } from "../../components/CancellationConfirmationScreen";
// import { PalWaitingScreen } from "../../components/PalWaitingScreen";
// import { ItemMismatchNotificationScreen } from "../../components/ItemMismatchNotificationScreen";
// import { SupportResolutionScreen } from "../../components/SupportResolutionScreen";
// import { EvidenceCollectionScreen } from "../../components/EvidenceCollectionScreen";
// import { NotificationsScreen } from "../../components/NotificationsScreen";
// import { ItemEditScreen } from "../../components/ItemEditScreen";
// import { PostDeliveryEditScreen } from "../../components/PostDeliveryEditScreen";
// import { TapeDistributorScreen } from "../../components/TapeDistributorScreen";

// import { ReceiverConfirmationScreen } from "../../components/ReceiverConfirmationScreen";
// import { DeliveryCompletedScreen } from "../../components/DeliveryCompletedScreen";
// import { ProxyCompletedScreen } from "../../components/ProxyCompletedScreen";
// import { ProxyItemScanScreen } from "../../components/ProxyItemScanScreen";
// import { ProxyToReceiverHandoverScreen } from "../../components/ProxyToReceiverHandoverScreen";
// //import { FavoritePalInputScreen } from "../../components/FavoritePalInputScreen";
// import { FavoritePalConfirmationScreen } from "../../components/FavoritePalConfirmationScreen";
// import { PalAcceptanceNotificationScreen } from "../../components/PalAcceptanceNotificationScreen";
// // import { ProxyAcceptanceCodeScreen } from './components/ProxyAcceptanceCodeScreen';
// // import { ProxyHandoverDirectionsScreen } from './components/ProxyHandoverDirectionsScreen';
// import { SentDeliveriesHistoryScreen } from "../../components/SentDeliveriesHistoryScreen";
// import { ReceivedDeliveriesScreen } from "../../components/ReceivedDeliveriesScreen";
// import { RouteAdsManagementScreen } from "../../components/RouteAdsManagementScreen";

// // Website Components
// // import { WebsiteLayout } from './components/website/WebsiteLayout';
// // import { HomePage } from './components/website/HomePage';
// // import { AboutPage } from './components/website/AboutPage';
// // import { HowItWorksPage } from './components/website/HowItWorksPage';
// // import { PricingPage } from './components/website/PricingPage';
// // import { SafetyPage } from './components/website/SafetyPage';
// // import { FAQsPage } from './components/website/FAQsPage';
// // import { ContactPage } from './components/website/ContactPage';
// // import { TermsPage } from './components/website/TermsPage';
// // import { PrivacyPage } from './components/website/PrivacyPage';
// // import { BecomePalPage } from './components/website/BecomePalPage';
// // import { BecomeProxyPage } from './components/website/BecomeProxyPage';
// // import { SendItemsPage } from './components/website/SendItemsPage';

// // Import types and data
// import {
//   Screen,
//   User,
//   DeliveryJob,
//   Bid,
//   ProxyItem,
//   ChatThread,
//   ChatMessage,
//   NigerianLocation,
//   UserRole,
//   DisputeResolution,
//   Notification,
//   FavoritePalJobData,
//   FavoritePalData,
//   ProxyUserData,
//   Dispute,
//   ItemSize,
//   Transaction,
//   RatingData,
//   SponsorshipEscrow,
//   Item,
// } from "../../types/index";
// import {
//   mockDeliveryJobs,
//   mockProxyItems,
//   mockChatThreads,
//   nigerianLocations,
//   mockPalDetails,
//   demoUsers,
// } from "../../data/mockData";
// import {
//   enhanceUserWithDefaults,
//   formatPhoneNumber,
//   getUserJobs,
//   filterNotificationsByRole,
//   getUnreadNotificationCountForRole,
// } from "../../utils/helpers";
// import { sendNotificationWithWhatsAppFallback } from "../../utils/whatsappNotifications";

// // Import enhanced utilities
// import { NavigationManager, navigationUtils } from "../../utils/navigation";
// import { EventHandlers } from "../../utils/eventHandlers";
// import { SupportHandlers } from "../../utils/supportHandlers";
// import { ScreenRenderer } from "../../utils/ScreenRenderer";
// import {
//   openGoogleMapsNavigation,
//   openGoogleMapsDirections,
//   initializeGoogleMaps,
// } from "../../utils/googleMapsUtils";
// import { generateMockNotifications } from "../../utils/notificationGenerator";
// import ErrorBoundary from "../../components/ErrorBoundary";
// import { useAuth } from "../../utils/apiHooks";

// export default function App() {
//   // Start with dashboard for testing purposes
//   const [currentScreen, setCurrentScreen] = useState<Screen>("dashboard");

//   // Set up dynamic header height calculation
//   useEffect(() => {
//     const updateHeaderOffset = () => {
//       if (typeof window === 'undefined') return;
      
//       // Find the header element - adjust the selector to match your actual header
//       const header = document.querySelector('header') || 
//                     document.querySelector('.header') || 
//                     document.querySelector('nav');
      
//       if (header) {
//         const headerHeight = header.getBoundingClientRect().height;
//         // Add a small buffer (e.g., 1rem) to prevent any potential overlap
//         const offset = `${headerHeight + 16}px`;
//         document.documentElement.style.setProperty('--header-offset', offset);
//       } else {
//         // Fallback to a reasonable default if header not found
//         document.documentElement.style.setProperty('--header-offset', '5rem');
//       }
//     };

//     // Initial calculation
//     updateHeaderOffset();

//     // Update on window resize
//     window.addEventListener('resize', updateHeaderOffset);
    
//     // Cleanup
//     return () => {
//       window.removeEventListener('resize', updateHeaderOffset);
//     };
//   }, []);

//   // Initialize Google Maps safely on component mount - Demo Mode
//   useEffect(() => {
//     const initMaps = async () => {
//       // Silent initialization for demo mode - no error handling needed
//       await initializeGoogleMaps();
//     };

//     // Use setTimeout to ensure this doesn't block the initial render
//     setTimeout(initMaps, 100);
//   }, []);

//   // Use the auth context for user management
//   const { user, refreshAuth, loading: authLoading } = useAuth();

//   // Local state for user data that might be updated in the UI
//   const [localUser, setLocalUser] = useState<User | null>(null);

//   // Sync auth user with local state when it changes
//   useEffect(() => {
//     if (user) {
//       setLocalUser(user);
//     }
//   }, [user]);

//   // Auto-redirect to auth if on dashboard without user (after loading completes)
//   useEffect(() => {
//     if (!authLoading && !user && currentScreen === 'dashboard') {
//       console.log('🔄 No user found, auto-redirecting to auth screen');
//       setCurrentScreen('auth');
//     }
//   }, [authLoading, user, currentScreen]);
  
//   // Update user by refreshing auth data
//   const refreshUser = useCallback(async () => {
//     await refreshAuth();
//   }, [refreshAuth]);
//   const [selectedJob, setSelectedJob] = useState<DeliveryJob | null>(null);
//   const [selectedBid, setSelectedBid] = useState<Bid | null>(null);
//   const [selectedPal, setSelectedPal] = useState<User | null>(null);
//   const [selectedChatThread, setSelectedChatThread] =
//     useState<ChatThread | null>(null);
//   const [deliveryJobs, setDeliveryJobs] =
//     useState<DeliveryJob[]>(mockDeliveryJobs);
//   const [proxyItems, setProxyItems] = useState<ProxyItem[]>(mockProxyItems);
//   const [chatThreads, setChatThreads] = useState<ChatThread[]>(mockChatThreads);
//   const [activeRole, setActiveRole] = useState<UserRole>("sender");
//   const [locationSelectionContext, setLocationSelectionContext] = useState<{
//     type: "pickup" | "dropoff";
//     returnScreen: Screen;
//   } | null>(null);
//   const [paymentContext, setPaymentContext] = useState<{
//     amount: number;
//     purpose: string;
//     returnScreen: Screen;
//   } | null>(null);
//   const [scanCompleted, setScanCompleted] = useState(false);
//   const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
//   const [verificationRetries, setVerificationRetries] = useState(0);
//   const [scanContext, setScanContext] = useState<
//     "pickup" | "delivery" | "proxy-handover" | "receiver-unavailable"
//   >("pickup");
//   const [selectedProxyItem, setSelectedProxyItem] = useState<ProxyItem | null>(
//     null
//   );
//   const [scanningProxyItem, setScanningProxyItem] = useState<ProxyItem | null>(
//     null
//   );
//   const [favoritePalJobData, setFavoritePalJobData] =
//     useState<{
//       title: string;
//       pickupLocation: string;
//       dropoffLocation: string;
//       receiverName: string;
//       receiverPhone: string;
//       itemSize: string;
//       weight: string;
//       value: number;
//       pickupDate: string;
//       pickupTime?: string;
//       notes?: string;
//       images: string[];
//       userId: string;
//     } | null>(null);
//   const [selectedFavoritePal, setSelectedFavoritePal] =
//     useState<FavoritePalData | null>(null);
//   const [currentDispute, setCurrentDispute] =
//     useState<DisputeResolution | null>(null);
//   const [violationFee, setViolationFee] = useState(0);
//   const [refundAmount, setRefundAmount] = useState(0);
//   const [disputeTimer, setDisputeTimer] = useState(600); // 10 minutes
//   const [notifications, setNotifications] = useState<Notification[]>([]);
//   const [selectedNotification, setSelectedNotification] =
//     useState<Notification | null>(null);
//   const [selectedProxyReceiver, setSelectedProxyReceiver] =
//     useState<ProxyUserData | null>(null);
//   const [showCompletedDeliveries, setShowCompletedDeliveries] = useState(false);

//   // NOTIFICATION TAB STATE - Controls which tab is active when opening notifications
//   const [notificationTab, setNotificationTab] = useState<"alerts" | "general">(
//     "alerts"
//   );






//   // PENDING BID STATE - For wallet funding continuation flow
//   const [pendingBid, setPendingBid] = useState<{
//     jobId: string;
//     bidAmount: number;
//     job: DeliveryJob;
//   } | null>(null);

//   // 🔥 Enhanced Sponsor User Flow State with Escrow System
//   const [selectedAspiringPal, setSelectedAspiringPal] = useState<User | null>(
//     null
//   );
//   const [sponsorshipData, setSponsorshipData] = useState<{
//     amount: number;
//     paymentMethod: string;
//     message: string;
//     isAnonymous: boolean;
//     sponsorPercentage?: number;
//     duration?: number;
//     startDate?: string;
//     endDate?: string;
//     escrowId?: string;
//     status?: string;
//   } | null>(null);

//   // �� PICKUP TIMER STATE - For passing between screens
//   const [globalPickupTimers, setGlobalPickupTimers] = useState<{
//     [jobId: string]: number;
//   }>({});

//   // 🔥 TIMER UPDATE CALLBACK - For AcceptedBidsScreen to update global timer state
//   const handleTimerUpdate = (jobId: string, timerValue: number) => {
//     setGlobalPickupTimers((prev) => ({
//       ...prev,
//       [jobId]: timerValue,
//     }));
//   };

//   // 🔥 HAMBURGER MENU STATE - Mobile Menu Management (Now integrated with DashboardHeader)
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   // 🔥 ROUTE ADS STATE - For Pal route advertisements
//   const [routeAds, setRouteAds] = useState<
//     Array<{
//       id: string;
//       fromLocation: string;
//       toLocation: string;
//       vehicleType: string;
//       maxWeight?: string;
//       preferredCategories: string[];
//       startTime?: string;
//       endTime?: string;
//       notes?: string;
//       createdAt: string;
//       active: boolean;
//     }>
//   >([]);

//   // COLOR SCHEME FOR RECENT ACTIVITY BUTTONS
//   const recentActivityColors = [
//     {
//       bg: "bg-blue-50",
//       hover: "hover:bg-blue-100",
//       border: "border-blue-200",
//       text: "text-blue-900",
//       subtext: "text-blue-600",
//     },
//     {
//       bg: "bg-green-50",
//       hover: "hover:bg-green-100",
//       border: "border-green-200",
//       text: "text-green-900",
//       subtext: "text-green-600",
//     },
//     {
//       bg: "bg-purple-50",
//       hover: "hover:bg-purple-100",
//       border: "border-purple-200",
//       text: "text-purple-900",
//       subtext: "text-purple-600",
//     },
//     {
//       bg: "bg-orange-50",
//       hover: "hover:bg-orange-100",
//       border: "border-orange-200",
//       text: "text-orange-900",
//       subtext: "text-orange-600",
//     },
//     {
//       bg: "bg-pink-50",
//       hover: "hover:bg-pink-100",
//       border: "border-pink-200",
//       text: "text-pink-900",
//       subtext: "text-pink-600",
//     },
//     {
//       bg: "bg-indigo-50",
//       hover: "hover:bg-indigo-100",
//       border: "border-indigo-200",
//       text: "text-indigo-900",
//       subtext: "text-indigo-600",
//     },
//   ];

//   // Initialize enhanced utilities - Simplified to prevent initialization issues
//   const [navigationManager] = useState(
//     () =>
//       new NavigationManager({
//         currentScreen: "auth",
//         user: null,
//         activeRole: "sender",
//       })
//   );

//   // Sync user state changes back to localStorage (only for real users)
//   useEffect(() => {
//     if (user && user.id && user.email && user.id !== 'demo-user-1') {
//       // Only sync real users, not demo users
//       localStorage.setItem('prawnbox_user', JSON.stringify(user));
//       console.log('💾 Real user synced to localStorage:', user.email);
//     }
//   }, [user?.id, user?.email]);

//   const [supportHandlers] = useState(
//     () =>
//       new SupportHandlers({
//         job: null,
//         user: null,
//         dispute: null,
//       })
//   );

//   const [screenRenderer] = useState(
//     () => new ScreenRenderer(null, "sender", null)
//   );

//   // Update utility contexts when state changes - Fixed to prevent infinite loops
//   useEffect(() => {
//     if (navigationManager && currentScreen && user && activeRole) {
//       navigationManager.updateContext({ currentScreen, user, activeRole });
//     }
//   }, [currentScreen, user?.id, activeRole]);

//   const [eventHandlers] = useState(
//     () =>
//       new EventHandlers({
//         user: null,
//         selectedJob: null,
//         activeRole: "sender",
//       })
//   );
//   useEffect(() => {
//     if (eventHandlers && user && activeRole) {
//       eventHandlers.updateContext({ user, activeRole, selectedJob });
//     }
//   }, [user?.id, activeRole, selectedJob?.id]);

//   useEffect(() => {
//     if (supportHandlers && selectedJob && user) {
//       supportHandlers.updateContext({
//         job: selectedJob,
//         user,
//         dispute: currentDispute,
//       });
//     }
//   }, [selectedJob?.id, user?.id, currentDispute?.id]);

//   useEffect(() => {
//     if (screenRenderer && user && activeRole) {
//       screenRenderer.updateContext(user, activeRole, selectedJob);
//     }
//   }, [user?.id, activeRole, selectedJob?.id]);

//   // 🔥 MOBILE MENU HANDLERS - Now integrated with DashboardHeader
//   const toggleMobileMenu = () => {
//     console.log(
//       "🍔 Mobile Menu Toggle: Current state:",
//       isMobileMenuOpen,
//       "-> New state:",
//       !isMobileMenuOpen
//     );
//     setIsMobileMenuOpen((prev) => !prev);
//   };

//   // UPDATE
//   const closeMobileMenu = () => {
//     console.log("🍔 Mobile Menu Close: Closing menu");
//     setIsMobileMenuOpen(false);
//   };

//   const handleMobileMenuNavigation = (screen: Screen) => {
//     console.log("🍔 Mobile Menu Navigation to:", screen);
//     setIsMobileMenuOpen(false);
//     navigateToScreen(screen);
//   };

//   // Track component mounted state and pending navigation
//   const isMounted = React.useRef(true);
//   const pendingNavigation = React.useRef<Screen | null>(null);

//   // Handle navigation updates in an effect
//   useEffect(() => {
//     if (pendingNavigation.current && isMounted.current) {
//       setCurrentScreen(pendingNavigation.current);
//       pendingNavigation.current = null;
//     }

//     return () => {
//       isMounted.current = false;
//     };
//   }, [currentScreen]); // Re-run when currentScreen changes

//   // Enhanced navigation function using NavigationManager
//   const navigateToScreen = useCallback((screen: Screen) => {
//     console.log(
//       "🚀 Enhanced Navigation: Navigating from",
//       currentScreen,
//       "to",
//       screen
//     );
//     const targetScreen = navigationManager.navigateWithHistory(screen);
//     if (targetScreen) {
//       // Schedule the state update for the next render
//       pendingNavigation.current = targetScreen;
//     }
//   }, [currentScreen, navigationManager]);

//   // Enhanced back navigation
//   const goBack = () => {
//     const previousScreen = navigationManager.goBack();
//     if (previousScreen) {
//       setCurrentScreen(previousScreen);
//     }
//   };

//   //  PROXY ACCEPTANCE FLOW HANDLERS
//   // const handleStartProxyAcceptanceFlow = (proxy: any) => {
//   //   console.log('🔗 Starting proxy acceptance flow for:', proxy.name);
//   //   setSelectedProxyReceiver(proxy);
//   //   navigateToScreen('proxy-acceptance-code');
//   // };

//   // const handleProxyAcceptanceComplete = () => {
//   //   console.log('✅ Proxy acceptance completed, navigating to handover directions');
//   //   navigateToScreen('proxy-handover-directions');
//   // };

//   // const handleCallProxy = (phone: string) => {
//   //   window.open(`tel:${phone}`);
//   // };

//   // const handleProxyHandoverComplete = () => {
//   //   console.log('✅ Proxy handover completed, navigating to tracking');
//   //   navigateToScreen('tracking');
//   // };

//   // ENHANCED ACTION HANDLER - Navigate with filters for all user roles
//   const handleActionClick = (action: string) => {
//     console.log(
//       "🎯 Enhanced Action Click:",
//       action,
//       "Current Role:",
//       activeRole
//     );

//     // Handle Sender actions
//     if (action.startsWith("my-deliveries-") || action === "my-deliveries") {
//       console.log(
//         "📦 Sender: Navigating to Dashboard with status filter:",
//         action
//       );
//       const statusFilter =
//         action === "my-deliveries" ? "" : action.replace("my-deliveries-", "");
//       console.log("🎯 Sender Status filter:", statusFilter);

//       setShowCompletedDeliveries(false);
//       navigateToScreen("dashboard");

//       switch (statusFilter) {
//         case "pending":
//           console.log("⏳ Sender: Showing pending deliveries");
//           break;
//         case "active":
//           console.log("🚛 Sender: Showing active deliveries");
//           break;
//         case "completed":
//           console.log("✅ Sender: Showing completed deliveries");
//           break;
//         case "assigned":
//           console.log("📋 Sender: Showing deliveries awaiting pickup");
//           break;
//         case "in-transit":
//           console.log("🚛 Sender: Showing deliveries in transit");
//           break;
//         case "bidding":
//           console.log("💰 Sender: Showing deliveries with active bids");
//           break;
//         case "delivered":
//           console.log("📦 Sender: Showing delivered deliveries");
//           break;
//         case "picked-up":
//           console.log("📦 Sender: Showing picked up deliveries");
//           break;
//         case "sent":
//           console.log("📤 Sender: Showing sent deliveries specifically");
//           break;
//         case "":
//         default:
//           console.log("📦 Sender: Showing all deliveries");
//       }
//       return;
//     }
//     // Handle Pal actions
//     else if (action.startsWith("accepted-bids-")) {
//       console.log("🚗 Pal: Navigating to Accepted Bids with filter:", action);
//       const statusFilter = action.replace("accepted-bids-", "");

//       if (statusFilter === "completed") {
//         setShowCompletedDeliveries(true);
//       } else {
//         setShowCompletedDeliveries(false);
//       }

//       navigateToScreen("accepted-bids");

//       switch (statusFilter) {
//         case "assigned":
//           console.log("📋 Pal: Showing assigned jobs awaiting pickup");
//           break;
//         case "in-transit":
//           console.log("🚛 Pal: Showing jobs in transit");
//           break;
//         case "completed":
//           console.log("✅ Pal: Showing completed jobs");
//           break;
//         default:
//           console.log("📦 Pal: Showing all accepted bids");
//       }
//       return;
//     }
//     // Handle Proxy actions
//     else if (action.startsWith("proxy-dashboard")) {
//       console.log(
//         "🏪 Proxy: Navigating to Proxy Dashboard with filter:",
//         action
//       );
//       const statusFilter = action.replace("proxy-dashboard-", "");

//       setShowCompletedDeliveries(false);
//       navigateToScreen("proxy-dashboard");

//       switch (statusFilter) {
//         case "stored":
//           console.log("📥 Proxy: Showing items in storage");
//           break;
//         case "ready":
//           console.log("📤 Proxy: Showing items ready for pickup");
//           break;
//         case "completed":
//           console.log("✅ Proxy: Showing completed handovers");
//           break;
//         default:
//           console.log("🏪 Proxy: Showing all proxy items");
//       }
//       return;
//     }
//     // Handle Available Jobs for Pals
//     else if (action === "available-jobs") {
//       console.log("⚡ Pal: Navigating to Available Jobs");
//       setShowCompletedDeliveries(false);
//       navigateToScreen("available-jobs");
//       return;
//     }
//     // Handle legacy completed bids action
//     else if (action === "accepted-bids-completed") {
//       console.log(
//         "📋 Legacy: Navigating to accepted bids with completed filter"
//       );
//       setShowCompletedDeliveries(true);
//       navigateToScreen("accepted-bids");
//       return;
//     }
//     // Handle sent deliveries history
//     else if (action === "sent-deliveries-history") {
//       console.log("📋 Sent Deliveries History: Navigating to history screen");
//       setShowCompletedDeliveries(false);
//       navigateToScreen("sent-deliveries-history");
//       return;
//     }
//     // Handle proxy deliveries
//     else if (action === "proxy-deliveries") {
//       console.log("🏪 Proxy Deliveries: Navigating to proxy deliveries screen");
//       setShowCompletedDeliveries(false);
//       navigateToScreen("proxy-deliveries");
//       return;
//     }
//     // Handle received deliveries
//     else if (action === "received-deliveries") {
//       console.log(
//         "📦 Received Deliveries: Navigating to received deliveries screen"
//       );
//       setShowCompletedDeliveries(false);
//       navigateToScreen("received-deliveries");
//       return;
//     }
//     // Handle specific earning actions
//     else if (action === "sponsorship") {
//       console.log("💝 Sponsorship: Navigating to sponsorship screen");
//       setShowCompletedDeliveries(false);
//       navigateToScreen("sponsorship");
//       return;
//     } else if (action === "sponsor-user") {
//       console.log("🎯 Sponsor User: Navigating directly to user search");
//       setShowCompletedDeliveries(false);
//       navigateToScreen("sponsor-user-search");
//       return;
//     } else if (action === "referral") {
//       console.log("👥 Referral: Navigating to referral screen");
//       setShowCompletedDeliveries(false);
//       navigateToScreen("referral");
//       return;
//     } else if (action === "tape-distributor") {
//       console.log("🏪 Tape Distributor: Navigating to tape distributor screen");
//       setShowCompletedDeliveries(false);
//       navigateToScreen("tape-distributor");
//       return;
//     }
//     // Default navigation
//     else {
//       console.log("🔄 Default: Navigating to screen:", action);
//       setShowCompletedDeliveries(false);
//       navigateToScreen(action as Screen);
//       return;
//     }
//   };

//   // Timer for dispute resolution - Fixed to prevent memory leaks
//   useEffect(() => {
//     let timer: NodeJS.Timeout | null = null;

//     if (
//       currentDispute &&
//       currentDispute.status === "pending" &&
//       disputeTimer > 0
//     ) {
//       timer = setInterval(() => {
//         setDisputeTimer((prev) => {
//           if (prev <= 1) {
//             handleDisputeTimeout();
//             return 0;
//           }
//           return prev - 1;
//         });
//       }, 1000);
//     }

//     return () => {
//       if (timer) {
//         clearInterval(timer);
//       }
//     };
//   }, [currentDispute?.id, currentDispute?.status, disputeTimer > 0]);

//   // 🔥 HELPER FUNCTION: Add notification with WhatsApp fallback
//   const addNotificationWithWhatsApp = (notification: Notification) => {
//     console.log(
//       "📬 Creating notification with WhatsApp fallback:",
//       notification.title
//     );

//     // Add to in-app notifications
//     setNotifications((prev) => [notification, ...prev]);

//     // Find user's phone number
//     const recipientUser =
//       notification.userId === user?.id
//         ? user
//         : deliveryJobs.find(
//             (j) =>
//               j.senderId === notification.userId ||
//               j.selectedPalId === notification.userId ||
//               j.receiverId === notification.userId
//           );

//     let userPhone: string | undefined =
//       notification.userId === user?.id ? user?.phone : undefined;
//     if (!userPhone && recipientUser) {
//       // If recipientUser has a 'phone' property treat it as a User
//       if (
//         "phone" in recipientUser &&
//         typeof (recipientUser as User).phone === "string"
//       ) {
//         userPhone = (recipientUser as User).phone;
//       }
//       // Otherwise if it has a 'senderPhone' property treat it as a DeliveryJob
//       else if (
//         "senderPhone" in recipientUser &&
//         typeof (recipientUser as DeliveryJob).senderPhone === "string"
//       ) {
//         userPhone = (recipientUser as DeliveryJob).senderPhone;
//       }
//     }

//     // Send WhatsApp fallback for alert notifications
//     sendNotificationWithWhatsAppFallback(notification, userPhone);
//   };

//   // 🔥 ENHANCED LOGIN WITH SIMULATED TRANSACTIONS
//   const handleLogin = async (userData: User) => {
//     console.log("🔥 ENHANCED LOGIN WITH TRANSACTION SIMULATION!");
//     console.log("📦 Received user data:", userData);

//     try {
//       // Normalize user data to match frontend expectations
//       const normalizedUser: User = {
//         ...userData,
//         // Handle _id vs id (backend may return _id)
//         id: userData.id || userData._id || '',
//         // Construct name from firstName + lastName if not provided
//         name: userData.name || `${userData.firstName || ''} ${userData.lastName || ''}`.trim(),
//         // Handle phoneNumber vs phone field name differences
//         phone: userData.phone || userData.phoneNumber || '',
//       };

//       console.log("📦 Normalized user data:", normalizedUser);

//       // More flexible validation - log what's missing
//       const missingFields = [];
//       if (!normalizedUser.id) missingFields.push('id or _id');
//       if (!normalizedUser.name && (!normalizedUser.firstName || !normalizedUser.lastName)) {
//         missingFields.push('name (or firstName + lastName)');
//       }
//       if (!normalizedUser.email) missingFields.push('email');
//       if (!normalizedUser.role) missingFields.push('role');

//       if (missingFields.length > 0) {
//         console.error('❌ Missing fields:', missingFields);
//         console.error('📦 User data received:', JSON.stringify(userData, null, 2));
//         throw new Error(`User data is missing required fields: ${missingFields.join(', ')}`);
//       }

//       const userWithDefaults = enhanceUserWithDefaults(normalizedUser);

//       // 🔥 SIMULATE TRANSACTIONS AND NOTIFICATIONS FOR EACH USER ROLE
//       const transactions = generateSimulatedTransactions(
//         userWithDefaults.role,
//         userWithDefaults.id
//       ).map((t) => ({
//         ...t,
//         type: t.type as Transaction["type"],
//         status: t.status as "pending" | "completed" | "cancelled" | "failed",
//         paymentMethod: t.paymentMethod as Transaction["paymentMethod"],
//       }));

//       const enhancedUserWithTransactions = {
//         ...userWithDefaults,
//         transactions,
//       };

//       // 🔥 GENERATE MOCK NOTIFICATIONS - Async to prevent blocking
//       setTimeout(() => {
//         try {
//           const mockNotifications = generateMockNotifications(
//             userWithDefaults.role,
//             userWithDefaults.id
//           );
//           setNotifications(mockNotifications);
//         } catch (error) {
//           console.warn("Failed to generate notifications:", error);
//           setNotifications([]);
//         }
//       }, 0);

//       // Store user in localStorage
//       localStorage.setItem('prawnbox_user', JSON.stringify(enhancedUserWithTransactions));

//       // Update local state and refresh auth state
//       setLocalUser(enhancedUserWithTransactions);
//       setActiveRole(enhancedUserWithTransactions.role);
//       await refreshUser();

//       // Clear navigation history for fresh start
//       if (navigationManager?.clearHistory) {
//         navigationManager.clearHistory();
//       }

//       navigateToScreen("dashboard");
//     } catch (error) {
//       console.error("❌ Enhanced Login Error:", error);
//       alert(
//         `Login failed: ${
//           error instanceof Error ? error.message : "Unknown error occurred"
//         }`
//       );
//     }
//   };

//   // 🔥 GENERATE MOCK NOTIFICATIONS FOR ALL USER ROLES
//   const generateMockNotifications = (
//     role: UserRole,
//     userId: string
//   ): Notification[] => {
//     const now = new Date();
//     const notifications: Notification[] = [];

//     // Common notifications for all roles
//     notifications.push(
//       {
//         id: "notif-welcome-1",
//         userId,
//         type: "system-message",
//         title: "Welcome to Prawnbox! ���",
//         message:
//           "Your account has been successfully created. Start by exploring the dashboard or creating your first delivery.",
//         timestamp: new Date(
//           now.getTime() - 2 * 24 * 60 * 60 * 1000
//         ).toISOString(),
//         read: false,
//         actionRequired: false,
//       },
//       {
//         id: "notif-promo-1",
//         userId,
//         type: "promo-offer",
//         title: "Special Promo: 20% Off Your Next 5 Deliveries! 🎁",
//         message:
//           "Use code PRAWN20 for your next deliveries and save big. Valid until the end of this month!",
//         timestamp: new Date(now.getTime() - 3 * 60 * 60 * 1000).toISOString(),
//         read: false,
//         actionRequired: false,
//         priority: "low",
//         metadata: { promoCode: "PRAWN20", discountPercent: 20 },
//       }
//     );

//     // Role-specific notifications
//     if (role === "sender") {
//       notifications.push(
//         // CRITICAL: Item edit request notification - this is the main feature requested
//         {
//           id: "notif-edit-request-1",
//           userId,
//           type: "item-edit-request",
//           title: "Pal Needs Item Description Update 📝",
//           message:
//             "Your Pal Mike Johnson has requested that you update the item description for your Wedding Dress Package delivery to help with verification.",
//           timestamp: new Date(now.getTime() - 30 * 60 * 1000).toISOString(),
//           read: false,
//           actionRequired: true,
//           priority: "urgent",
//           jobId: "2",
//           metadata: {
//             palName: "Mike Johnson",
//             editReason:
//               "Item description needs more specific details for verification",
//             jobTitle: "Wedding Dress Package",
//           },
//         },
//         // 🔥 MULTIPLE BID NOTIFICATIONS - Demo the bidding flow
//         {
//           id: "notif-bid-placed-1",
//           userId,
//           type: "bid-placed",
//           title: "🎯 First Bid Received! 💰",
//           message:
//             "Sarah Williams placed a bid of ₦8,500 for your Electronics Package delivery. Review and accept now.",
//           timestamp: new Date(now.getTime() - 5 * 60 * 1000).toISOString(),
//           read: false,
//           actionRequired: true,
//           priority: "urgent",
//           jobId: "7",
//           metadata: {
//             amount: 8500,
//             bidderName: "Sarah Williams",
//             jobTitle: "Electronics Package",
//           },
//         },
//         {
//           id: "notif-bid-placed-2",
//           userId,
//           type: "bid-placed",
//           title: "💰 New Bid - Lower Price!",
//           message:
//             "David Okonkwo placed a competitive bid of ₦7,800 for your Electronics Package. Save ₦700!",
//           timestamp: new Date(now.getTime() - 3 * 60 * 1000).toISOString(),
//           read: false,
//           actionRequired: true,
//           priority: "urgent",
//           jobId: "7",
//           metadata: {
//             amount: 7800,
//             bidderName: "David Okonkwo",
//             jobTitle: "Electronics Package",
//             savings: 700,
//           },
//         },
//         {
//           id: "notif-bid-placed-3",
//           userId,
//           type: "bid-placed",
//           title: "⭐ Premium Pal Bid!",
//           message:
//             "Michael Chen (4.9⭐) placed a bid of ₦9,200 for your Wedding Dress Package. Highly rated Pal!",
//           timestamp: new Date(now.getTime() - 15 * 60 * 1000).toISOString(),
//           read: false,
//           actionRequired: true,
//           priority: "urgent",
//           jobId: "2",
//           metadata: {
//             amount: 9200,
//             bidderName: "Michael Chen",
//             jobTitle: "Wedding Dress Package",
//             palRating: 4.9,
//           },
//         },
//         {
//           id: "notif-bid-placed-4",
//           userId,
//           type: "bid-placed",
//           title: "🚀 Fast Delivery Bid!",
//           message:
//             "James Adeyemi can deliver your Medical Documents in 20 minutes for ₦2,500. Quick service!",
//           timestamp: new Date(now.getTime() - 25 * 60 * 1000).toISOString(),
//           read: false,
//           actionRequired: true,
//           priority: "urgent",
//           jobId: "3",
//           metadata: {
//             amount: 2500,
//             bidderName: "James Adeyemi",
//             jobTitle: "Medical Documents",
//             estimatedTime: "20 minutes",
//           },
//         },
//         {
//           id: "notif-bid-placed-5",
//           userId,
//           type: "bid-placed",
//           title: "💎 Verified Pal Bid",
//           message:
//             "Aisha Ibrahim (Verified) placed a bid of ₦12,000 for your Anniversary Gift Box. Trusted delivery!",
//           timestamp: new Date(now.getTime() - 45 * 60 * 1000).toISOString(),
//           read: false,
//           actionRequired: true,
//           priority: "urgent",
//           jobId: "4",
//           metadata: {
//             amount: 12000,
//             bidderName: "Aisha Ibrahim",
//             jobTitle: "Anniversary Gift Box",
//             verified: true,
//           },
//         },
//         {
//           id: "notif-bid-placed-6",
//           userId,
//           type: "bid-placed",
//           title: "📦 Multiple Bids Alert!",
//           message:
//             "Your Electronics Package has received 3 bids! Prices range from ₦7,800 to ₦9,500. Review all bids now.",
//           timestamp: new Date(now.getTime() - 1 * 60 * 1000).toISOString(),
//           read: false,
//           actionRequired: true,
//           priority: "urgent",
//           jobId: "7",
//           metadata: {
//             bidCount: 3,
//             lowestBid: 7800,
//             highestBid: 9500,
//             jobTitle: "Electronics Package",
//           },
//         },
//         {
//           id: "notif-delivery-completed-1",
//           userId,
//           type: "delivery-completed",
//           title: "Delivery Completed Successfully! ✅",
//           message:
//             "Your Anniversary Gift Box has been delivered to Jane Smith. Please rate your Pal experience.",
//           timestamp: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(),
//           read: true,
//           actionRequired: false,
//           priority: "normal",
//           jobId: "4",
//         },
//         {
//           id: "notif-payment-1",
//           userId,
//           type: "payment-received",
//           title: "Escrow Released 💳",
//           message:
//             "Payment of ₦25,000 has been released from escrow for your completed delivery.",
//           timestamp: new Date(now.getTime() - 6 * 60 * 60 * 1000).toISOString(),
//           read: true,
//           actionRequired: false,
//           metadata: { amount: 25000 },
//         }
//       );
//     } else if (role === "pal") {
//       notifications.push(
//         {
//           id: "notif-job-assigned-1",
//           userId,
//           type: "delivery-assigned",
//           title: "New Delivery Assigned! 📦",
//           message:
//             "You've been assigned to deliver an Electronics Package. Pickup from Victoria Island by 2 PM today.",
//           timestamp: new Date(now.getTime() - 45 * 60 * 1000).toISOString(),
//           read: false,
//           actionRequired: true,
//           jobId: "7",
//           metadata: { pickupLocation: "Victoria Island, Lagos" },
//         },
//         {
//           id: "notif-payment-2",
//           userId,
//           type: "payment-received",
//           title: "Payment Received! 💰",
//           message:
//             "You earned ₦12,000 for completing the Anniversary Gift Box delivery. Funds added to your wallet.",
//           timestamp: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(),
//           read: false,
//           actionRequired: false,
//           metadata: { amount: 12000 },
//         },
//         {
//           id: "notif-rating-1",
//           userId,
//           type: "rating-received",
//           title: "You Received a 5-Star Rating! ⭐",
//           message:
//             'John Adamu rated your delivery service 5 stars with the comment: "Excellent service, very professional!"',
//           timestamp: new Date(now.getTime() - 4 * 60 * 60 * 1000).toISOString(),
//           read: true,
//           actionRequired: false,
//           jobId: "3",
//         },
//         {
//           id: "notif-bonus-1",
//           userId,
//           type: "payment-received",
//           title: "Weekly Performance Bonus! 🏆",
//           message:
//             "Congratulations! You earned ₦5,000 bonus for completing 10+ deliveries this week with 4.8+ rating.",
//           timestamp: new Date(
//             now.getTime() - 1 * 24 * 60 * 60 * 1000
//           ).toISOString(),
//           read: true,
//           actionRequired: false,
//           metadata: { amount: 5000, bonusType: "performance" },
//         }
//       );
//     } else if (role === "receiver") {
//       notifications.push(
//         {
//           id: "notif-delivery-coming-1",
//           userId,
//           type: "delivery-update",
//           title: "Your Delivery is Coming! 🚗",
//           message:
//             "Mike Johnson is 5 minutes away with your package. He'll call when he arrives at your location.",
//           timestamp: new Date(now.getTime() - 10 * 60 * 1000).toISOString(),
//           read: false,
//           actionRequired: false,
//           jobId: "8",
//           metadata: { palName: "Mike Johnson", eta: "5 minutes" },
//         },
//         {
//           id: "notif-delivery-completed-2",
//           userId,
//           type: "delivery-completed",
//           title: "Package Delivered! 📦",
//           message:
//             "Your Medical Documents have been successfully delivered. Thank you for using Prawnbox!",
//           timestamp: new Date(now.getTime() - 3 * 60 * 60 * 1000).toISOString(),
//           read: true,
//           actionRequired: false,
//           jobId: "3",
//         },
//         {
//           id: "notif-tip-reminder-1",
//           userId,
//           type: "system-message",
//           title: "Consider Tipping Your Pal 💝",
//           message:
//             "Your delivery was completed perfectly! Consider leaving a tip for Mike Johnson to show your appreciation.",
//           timestamp: new Date(now.getTime() - 5 * 60 * 60 * 1000).toISOString(),
//           read: true,
//           actionRequired: false,
//           jobId: "8",
//         }
//       );
//     } else if (role === "proxy") {
//       notifications.push(
//         {
//           id: "notif-item-stored-1",
//           userId,
//           type: "delivery-update",
//           title: "New Item in Storage 📥",
//           message:
//             "A Jewelry Package has been dropped off at your location. Receiver will collect within 24 hours.",
//           timestamp: new Date(now.getTime() - 1 * 60 * 60 * 1000).toISOString(),
//           read: false,
//           actionRequired: false,
//           metadata: { itemType: "Jewelry Package", storageTime: "24 hours" },
//         },
//         {
//           id: "notif-storage-fee-1",
//           userId,
//           type: "payment-received",
//           title: "Storage Fee Earned! 💰",
//           message:
//             "You earned ₦2,000 for 4 days of storage service for a Jewelry Package. Great job!",
//           timestamp: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(),
//           read: true,
//           actionRequired: false,
//           metadata: { amount: 2000, storageDays: 4 },
//         },
//         {
//           id: "notif-pickup-reminder-1",
//           userId,
//           type: "system-message",
//           title: "Pickup Reminder 📅",
//           message:
//             "The Electronics package stored 2 days ago is scheduled for pickup today between 2-4 PM.",
//           timestamp: new Date(now.getTime() - 4 * 60 * 60 * 1000).toISOString(),
//           read: true,
//           actionRequired: false,
//         }
//       );
//     }

//     return notifications.sort(
//       (a, b) =>
//         new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
//     );
//   };

//   // 🔥 GENERATE SIMULATED TRANSACTIONS FOR USER ROLES
//   const generateSimulatedTransactions = (role: UserRole, userId: string) => {
//     const now = new Date();
//     const transactions = [];

//     if (role === "pal") {
//       // Pal transactions: Earnings from deliveries, withdrawals, fees
//       transactions.push(
//         {
//           id: "txn-pal-1",
//           userId,
//           type: "earning",
//           amount: 15000,
//           status: "completed",
//           description: "Delivery earnings - Electronics Package",
//           jobId: "7",
//           timestamp: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(),
//           paymentMethod: "wallet",
//           reference: "EARN-7-001",
//         },
//         {
//           id: "txn-pal-2",
//           userId,
//           type: "earning",
//           amount: 12000,
//           status: "completed",
//           description: "Delivery earnings - Anniversary Gift Box",
//           jobId: "4",
//           timestamp: new Date(now.getTime() - 4 * 60 * 60 * 1000).toISOString(),
//           paymentMethod: "wallet",
//           reference: "EARN-4-001",
//         },
//         {
//           id: "txn-pal-3",
//           userId,
//           type: "withdrawal",
//           amount: -20000,
//           status: "completed",
//           description: "Bank withdrawal to GTBank",
//           timestamp: new Date(
//             now.getTime() - 1 * 24 * 60 * 60 * 1000
//           ).toISOString(),
//           paymentMethod: "bank_transfer",
//           reference: "WTH-PAL-001",
//         },
//         {
//           id: "txn-pal-4",
//           userId,
//           type: "earning",
//           amount: 8500,
//           status: "pending",
//           description: "Delivery earnings - Wedding Dress Package",
//           jobId: "2",
//           timestamp: new Date(now.getTime() - 30 * 60 * 1000).toISOString(),
//           paymentMethod: "wallet",
//           reference: "EARN-2-001",
//         },
//         {
//           id: "txn-pal-5",
//           userId,
//           type: "bonus",
//           amount: 5000,
//           status: "completed",
//           description: "Weekly performance bonus",
//           timestamp: new Date(
//             now.getTime() - 2 * 24 * 60 * 60 * 1000
//           ).toISOString(),
//           paymentMethod: "wallet",
//           reference: "BONUS-WEEK-12",
//         },
//         {
//           id: "txn-pal-6",
//           userId,
//           type: "fee",
//           amount: -500,
//           status: "completed",
//           description: "Platform service fee",
//           timestamp: new Date(
//             now.getTime() - 3 * 24 * 60 * 60 * 1000
//           ).toISOString(),
//           paymentMethod: "wallet",
//           reference: "FEE-SERVICE-001",
//         }
//       );
//     } else if (role === "sender") {
//       // Sender transactions: Escrow payments, refunds, fees
//       transactions.push(
//         {
//           id: "txn-send-1",
//           userId,
//           type: "escrow_payment",
//           amount: -458500, // Job value + pal fee
//           status: "completed",
//           description: "Escrow payment - Wedding Dress Package",
//           jobId: "2",
//           timestamp: new Date(now.getTime() - 3 * 60 * 60 * 1000).toISOString(),
//           paymentMethod: "card",
//           reference: "ESC-2-001",
//         },
//         {
//           id: "txn-send-2",
//           userId,
//           type: "escrow_payment",
//           amount: -31500, // Job value + pal fee
//           status: "completed",
//           description: "Escrow payment - Medical Documents",
//           jobId: "3",
//           timestamp: new Date(now.getTime() - 4 * 60 * 60 * 1000).toISOString(),
//           paymentMethod: "wallet",
//           reference: "ESC-3-001",
//         },
//         {
//           id: "txn-send-3",
//           userId,
//           type: "wallet_topup",
//           amount: 50000,
//           status: "completed",
//           description: "Wallet top-up via bank transfer",
//           timestamp: new Date(
//             now.getTime() - 1 * 24 * 60 * 60 * 1000
//           ).toISOString(),
//           paymentMethod: "bank_transfer",
//           reference: "TOP-SEND-001",
//         },
//         {
//           id: "txn-send-4",
//           userId,
//           type: "refund",
//           amount: 25000,
//           status: "completed",
//           description: "Refund - Cancelled delivery",
//           timestamp: new Date(
//             now.getTime() - 2 * 24 * 60 * 60 * 1000
//           ).toISOString(),
//           paymentMethod: "wallet",
//           reference: "REF-CANCEL-001",
//         },
//         {
//           id: "txn-send-5",
//           userId,
//           type: "fee",
//           amount: -2500,
//           status: "completed",
//           description: "Service fee - Delivery processing",
//           timestamp: new Date(
//             now.getTime() - 3 * 24 * 60 * 60 * 1000
//           ).toISOString(),
//           paymentMethod: "wallet",
//           reference: "FEE-PROC-001",
//         }
//       );
//     } else if (role === "receiver") {
//       // Receiver transactions: Tips, refunds for damaged items
//       transactions.push(
//         {
//           id: "txn-recv-1",
//           userId,
//           type: "tip_payment",
//           amount: -2000,
//           status: "completed",
//           description: "Tip to Pal - Excellent service",
//           jobId: "8",
//           timestamp: new Date(now.getTime() - 1 * 60 * 60 * 1000).toISOString(),
//           paymentMethod: "wallet",
//           reference: "TIP-8-001",
//         },
//         {
//           id: "txn-recv-2",
//           userId,
//           type: "refund",
//           amount: 15000,
//           status: "completed",
//           description: "Compensation - Damaged item received",
//           timestamp: new Date(
//             now.getTime() - 2 * 24 * 60 * 60 * 1000
//           ).toISOString(),
//           paymentMethod: "wallet",
//           reference: "COMP-DAM-001",
//         },
//         {
//           id: "txn-recv-3",
//           userId,
//           type: "wallet_topup",
//           amount: 10000,
//           status: "completed",
//           description: "Wallet top-up for tips",
//           timestamp: new Date(
//             now.getTime() - 3 * 24 * 60 * 60 * 1000
//           ).toISOString(),
//           paymentMethod: "card",
//           reference: "TOP-RECV-001",
//         }
//       );
//     } else if (role === "proxy") {
//       // Proxy transactions: Storage fees earned, business expenses
//       transactions.push(
//         {
//           id: "txn-prox-1",
//           userId,
//           type: "storage_fee",
//           amount: 1500,
//           status: "completed",
//           description: "Storage fee - Electronics package (3 days)",
//           timestamp: new Date(now.getTime() - 1 * 60 * 60 * 1000).toISOString(),
//           paymentMethod: "wallet",
//           reference: "STOR-ELEC-001",
//         },
//         {
//           id: "txn-prox-2",
//           userId,
//           type: "storage_fee",
//           amount: 1000,
//           status: "completed",
//           description: "Storage fee - Document envelope (2 days)",
//           timestamp: new Date(
//             now.getTime() - 2 * 24 * 60 * 60 * 1000
//           ).toISOString(),
//           paymentMethod: "wallet",
//           reference: "STOR-DOC-001",
//         },
//         {
//           id: "txn-prox-3",
//           userId,
//           type: "storage_fee",
//           amount: 2000,
//           status: "completed",
//           description: "Storage fee - Jewelry package (4 days)",
//           timestamp: new Date(
//             now.getTime() - 3 * 24 * 60 * 60 * 1000
//           ).toISOString(),
//           paymentMethod: "wallet",
//           reference: "STOR-JEW-001",
//         },
//         {
//           id: "txn-prox-4",
//           userId,
//           type: "withdrawal",
//           amount: -15000,
//           status: "completed",
//           description: "Business account withdrawal",
//           timestamp: new Date(
//             now.getTime() - 4 * 24 * 60 * 60 * 1000
//           ).toISOString(),
//           paymentMethod: "bank_transfer",
//           reference: "WTH-BIZ-001",
//         },
//         {
//           id: "txn-prox-5",
//           userId,
//           type: "equipment_fee",
//           amount: -3000,
//           status: "completed",
//           description: "Storage equipment maintenance",
//           timestamp: new Date(
//             now.getTime() - 5 * 24 * 60 * 60 * 1000
//           ).toISOString(),
//           paymentMethod: "wallet",
//           reference: "MAINT-EQ-001",
//         }
//       );
//     }

//     console.log(
//       `🔥 Generated ${transactions.length} transactions for ${role}:`,
//       transactions
//     );
//     return transactions;
//   };

//   // Quick demo login function with enhanced error handling
//   const handleDemoLogin = (
//     userType: "sender" | "pal" | "receiver" | "proxy"
//   ) => {
//     console.log(
//       "�� COMPLETE FLOW SIMULATION WITH TRANSACTIONS - DEMO LOGIN:",
//       userType.toUpperCase()
//     );

//     try {
//       const demoUser = demoUsers[userType];
//       console.log("📋 Demo user data:", demoUser);

//       if (demoUser) {
//         console.log(
//           "✅ Demo user found, calling enhanced handleLogin with transaction simulation..."
//         );
//         handleLogin(demoUser);
//       } else {
//         console.error("❌ Demo user not found for type:", userType);
//         throw new Error(`Demo user not found for type: ${userType}`);
//       }
//     } catch (error) {
//       console.error("❌ Enhanced Demo Login Error:", error);
//       alert(
//         `Demo login failed: ${
//           error instanceof Error ? error.message : "Unknown error occurred"
//         }`
//       );
//     }
//   };

//   const handleCall = (phoneNumber: string) => {
//     console.log("📞 Enhanced Call: Initiating call to", phoneNumber);
//     try {
//       const formattedNumber = formatPhoneNumber(phoneNumber);
//       window.open(`tel:${formattedNumber}`);
//     } catch (error) {
//       console.error("📞 Call Error:", error);
//     }
//   };

//   const handleJobSelect = (job: DeliveryJob) => {
//     console.log("📦 Enhanced Job Selection:", job.id, job.title);
//     setSelectedJob(job);
//     setScanCompleted(false);
//     setVerificationRetries(0);
//   };

//   const handleBidSelect = (bid: Bid, job?: DeliveryJob) => {
//     console.log("💰 Enhanced Bid Selection:", bid.id, "for", bid.amount);
//     setSelectedBid(bid);
//     if (job) {
//       setSelectedJob(job);
//     }
//   };

//   const handlePalSelect = (pal: User) => {
//     console.log("🚗 Enhanced Pal Selection:", pal.id, pal.name);
//     setSelectedPal(pal);
//   };

//   const handleRoleChange = (role: UserRole) => {
//     console.log("🎭 Enhanced Role Change to:", role);
//     setActiveRole(role);
//   };

//   const handleJobUpdate = (updatedJob: DeliveryJob) => {
//     console.log(
//       "📝 Enhanced Job Update:",
//       updatedJob.id,
//       "status:",
//       updatedJob.status
//     );

//     // Add completion timestamp if job is being marked as delivered/completed
//     if (
//       ["delivered", "completed"].includes(updatedJob.status) &&
//       !updatedJob.completedAt
//     ) {
//       updatedJob.completedAt = new Date().toISOString();
//     }

//     setDeliveryJobs((prev) =>
//       prev.map((job) => (job.id === updatedJob.id ? updatedJob : job))
//     );
//     setSelectedJob(updatedJob);

//     // 🔥 AUTOMATIC STATUS UPDATE NOTIFICATION
//     if (["delivered", "completed"].includes(updatedJob.status)) {
//       console.log(
//         "🎯 AUTOMATIC STATUS UPDATE: Job moved to completed section!",
//         updatedJob.title
//       );
//     }
//   };

//   const handleNewJob = (newJob: DeliveryJob) => {
//     console.log("🆕 Enhanced New Job:", newJob.id, newJob.title);
//     setDeliveryJobs((prev) => [newJob, ...prev]);
//   };

//   // 🔥 AUTOMATIC DELIVERY COMPLETION SIMULATOR
//   // const handleAutoCompleteDelivery = (jobId: string) => {
//   //   const jobToComplete = deliveryJobs.find((job) => job.id === jobId);
//   //   if (!jobToComplete) return;

//   //   // Remove unused function
//   //   return;

//   //   if (["picked-up", "in-transit"].includes(jobToComplete.status)) {
//   //     const completedJob = {
//   //       ...jobToComplete,
//   //       status: "delivered" as const,
//   //       completedAt: new Date().toISOString(),
//   //       deliveredAt: new Date().toISOString(),
//   //     };

//   //     console.log(
//   //       "🔄 AUTO-COMPLETE: Moving job from picked-up to completed",
//   //       completedJob.title
//   //     );
//   //     handleJobUpdate(completedJob);

//   //     // Create completion notification for the Pal
//   //     if (user && user.role === "pal") {
//   //       const completionNotification: Notification = {
//   //         id: `completion-${Date.now()}`,
//   //         userId: user.id,
//   //         type: "delivery-completed",
//   //         title: "Delivery Completed Successfully! ✅",
//   //         message: `You have successfully completed the delivery of "${completedJob.title}". Payment has been processed.`,
//   //         timestamp: new Date().toISOString(),
//   //         read: false,
//   //         actionRequired: false,
//   //         jobId: completedJob.id,
//   //         metadata: {
//   //           amount: completedJob.acceptedBidAmount || completedJob.value,
//   //           completionTime: new Date().toISOString(),
//   //         },
//   //       };

//   //       setNotifications((prev) => [completionNotification, ...prev]);
//   //     }

//   //     return completedJob;
//   //   }
//   // };

//   const handleUserUpdate = async (updatedUser: User) => {
//     console.log("👤 Enhanced User Update:", updatedUser.id, updatedUser.name);
//     // Update local state immediately for better UX
//     setLocalUser(updatedUser);
//     // Refresh from server to ensure consistency
//     await refreshUser();
//   };

//   // 🔥 ENHANCED DEMO CONVERSATION WITH QUICK REPLY SHOWCASE
//   const generateConversationMessages = (job: DeliveryJob): ChatMessage[] => {
//     try {
//       const now = new Date();
//       const senderFirstName = job.senderName?.split(" ")[0] || "Alex";
//       const palFirstName = job.selectedPalName?.split(" ")[0] || "Mike";
//       const receiverFirstName = user?.name?.split(" ")[0] || "Sarah";

//       return [
//         // Initial system message
//         {
//           id: `system-start-${Date.now()}`,
//           senderId: "system",
//           senderName: "System",
//           senderRole: "sender",
//           message: `🎯 DEMO: ${senderFirstName} and ${palFirstName} are in this chat - Quick replies are enabled!`,
//           timestamp: new Date(now.getTime() - 50 * 60 * 1000).toISOString(), // 50 mins ago
//           type: "system",
//           read: true,
//         },

//         // Initial coordination between Sender and Pal
//         {
//           id: `msg-1-${Date.now()}`,
//           senderId: job.senderId,
//           senderName: senderFirstName,
//           senderRole: "sender",
//           message: `Hi ${palFirstName}! Thanks for accepting the delivery. The package is a ${job.title.toLowerCase()}. I'll be available until 6 PM for pickup.`,
//           timestamp: new Date(now.getTime() - 47 * 60 * 1000).toISOString(), // 47 mins ago
//           type: "text",
//           read: true,
//         },

//         {
//           id: `msg-2-${Date.now()}`,
//           senderId: job.selectedPalId || "pal-demo",
//           senderName: palFirstName,
//           senderRole: "pal",
//           message: `Perfect ${senderFirstName}! I'm heading to ${job.pickupLocation} now. Should be there in about 15 minutes. Is the package ready?`,
//           timestamp: new Date(now.getTime() - 45 * 60 * 1000).toISOString(), // 45 mins ago
//           type: "text",
//           read: true,
//         },

//         {
//           id: `msg-3-${Date.now()}`,
//           senderId: job.senderId,
//           senderName: senderFirstName,
//           senderRole: "sender",
//           message: `Yes, it's all packed and ready. It's in a brown box, fairly light. Please handle with care - it's quite fragile!`,
//           timestamp: new Date(now.getTime() - 43 * 60 * 1000).toISOString(), // 43 mins ago
//           type: "text",
//           read: true,
//         },

//         // Pickup coordination with handle with care trigger
//         {
//           id: `msg-4-${Date.now()}`,
//           senderId: job.selectedPalId || "pal-demo",
//           senderName: palFirstName,
//           senderRole: "pal",
//           message: `Absolutely, I'll be very careful. Just arrived at pickup location! I can see the building.`,
//           timestamp: new Date(now.getTime() - 40 * 60 * 1000).toISOString(), // 40 mins ago
//           type: "text",
//           read: true,
//         },

//         {
//           id: `msg-5-${Date.now()}`,
//           senderId: job.senderId,
//           senderName: senderFirstName,
//           senderRole: "sender",
//           message: `Thank you! Coming down now`,
//           timestamp: new Date(now.getTime() - 38 * 60 * 1000).toISOString(), // 38 mins ago
//           type: "text",
//           read: true,
//         },

//         // Package pickup confirmation
//         {
//           id: `msg-6-${Date.now()}`,
//           senderId: job.selectedPalId || "pal-demo",
//           senderName: palFirstName,
//           senderRole: "pal",
//           message: `Package collected successfully! ✅ Confirmed it matches the description. Now heading to ${job.dropoffLocation}`,
//           timestamp: new Date(now.getTime() - 35 * 60 * 1000).toISOString(), // 35 mins ago
//           type: "text",
//           read: true,
//         },

//         {
//           id: `msg-7-${Date.now()}`,
//           senderId: job.senderId,
//           senderName: senderFirstName,
//           senderRole: "sender",
//           message: `Excellent service`,
//           timestamp: new Date(now.getTime() - 33 * 60 * 1000).toISOString(), // 33 mins ago
//           type: "text",
//           read: true,
//         },

//         // Transit updates with delay mention
//         {
//           id: `msg-8-${Date.now()}`,
//           senderId: job.selectedPalId || "pal-demo",
//           senderName: palFirstName,
//           senderRole: "pal",
//           message: `Quick update: There's a bit of traffic on the main road, so there might be a small delay. ETA now around 20 minutes. Sorry about this!`,
//           timestamp: new Date(now.getTime() - 25 * 60 * 1000).toISOString(), // 25 mins ago
//           type: "text",
//           read: true,
//         },

//         {
//           id: `msg-9-${Date.now()}`,
//           senderId: job.senderId,
//           senderName: senderFirstName,
//           senderRole: "sender",
//           message: `No problem, take your time`,
//           timestamp: new Date(now.getTime() - 23 * 60 * 1000).toISOString(), // 23 mins ago
//           type: "text",
//           read: true,
//         },

//         // Receiver contact and ETA
//         {
//           id: `msg-10-${Date.now()}`,
//           senderId: job.selectedPalId || "pal-demo",
//           senderName: palFirstName,
//           senderRole: "pal",
//           message: `Hi ${receiverFirstName}! I'm ${palFirstName}, your delivery Pal. I'm currently 10 minutes away with your package from ${senderFirstName}.`,
//           timestamp: new Date(now.getTime() - 18 * 60 * 1000).toISOString(), // 18 mins ago
//           type: "text",
//           read: true,
//         },

//         // Receiver joins notification
//         {
//           id: `join-receiver-${Date.now()}`,
//           senderId: "system",
//           senderName: "System",
//           senderRole: "sender",
//           message: `📱 DEMO: ${receiverFirstName} has joined the chat - Try the quick replies!`,
//           timestamp: new Date(now.getTime() - 15 * 60 * 1000).toISOString(), // 15 mins ago
//           type: "system",
//           read: true,
//         },

//         // Recent conversation with arrival and call keywords
//         {
//           id: `msg-11-${Date.now()}`,
//           senderId:
//             (user?.id === job.receiverId ? user?.id : undefined) ||
//             "receiver-demo",
//           senderName: receiverFirstName,
//           senderRole: "receiver",
//           message: `Hi ${palFirstName}! Great to hear from you. Should I wait downstairs or will you call when you arrive?`,
//           timestamp: new Date(now.getTime() - 12 * 60 * 1000).toISOString(), // 12 mins ago
//           type: "text",
//           read: true,
//         },

//         {
//           id: `msg-12-${Date.now()}`,
//           senderId: job.selectedPalId || "pal-demo",
//           senderName: palFirstName,
//           senderRole: "pal",
//           message: `I'll call you when I'm about 2 minutes away so you can come down. Just to confirm the address - ${job.dropoffLocation}, right?`,
//           timestamp: new Date(now.getTime() - 10 * 60 * 1000).toISOString(), // 10 mins ago
//           type: "text",
//           read: true,
//         },

//         {
//           id: `msg-13-${Date.now()}`,
//           senderId:
//             (user?.id === job.receiverId ? user?.id : undefined) ||
//             "receiver-demo",
//           senderName: receiverFirstName,
//           senderRole: "receiver",
//           message: `Perfect, see you soon`,
//           timestamp: new Date(now.getTime() - 8 * 60 * 1000).toISOString(), // 8 mins ago
//           type: "text",
//           read: true,
//         },

//         // Arrival and delivery coordination
//         {
//           id: `msg-14-${Date.now()}`,
//           senderId: job.selectedPalId || "pal-demo",
//           senderName: palFirstName,
//           senderRole: "pal",
//           message: `I'm just 5 minutes away now! The package is secure and in perfect condition.`,
//           timestamp: new Date(now.getTime() - 5 * 60 * 1000).toISOString(), // 5 mins ago
//           type: "text",
//           read: true,
//         },

//         {
//           id: `msg-15-${Date.now()}`,
//           senderId:
//             (user?.id === job.receiverId ? user?.id : undefined) ||
//             "receiver-demo",
//           senderName: receiverFirstName,
//           senderRole: "receiver",
//           message: `I'll be ready`,
//           timestamp: new Date(now.getTime() - 4 * 60 * 1000).toISOString(), // 4 mins ago
//           type: "text",
//           read: true,
//         },

//         // Arrival notification (perfect for quick replies)
//         {
//           id: `msg-16-${Date.now()}`,
//           senderId: job.selectedPalId || "pal-demo",
//           senderName: palFirstName,
//           senderRole: "pal",
//           message: `I've arrived and I'm here outside! 🚗 Ready for the handover whenever you are.`,
//           timestamp: new Date(now.getTime() - 2 * 60 * 1000).toISOString(), // 2 mins ago
//           type: "text",
//           read: true,
//         },

//         // Most recent message to trigger quick replies
//         {
//           id: `msg-17-${Date.now()}`,
//           senderId: job.selectedPalId || "pal-demo",
//           senderName: palFirstName,
//           senderRole: "pal",
//           message: `📦 DEMO: Package is ready for delivery! Check out the quick reply buttons below this message ⬇️`,
//           timestamp: new Date(now.getTime() - 30 * 1000).toISOString(), // 30 seconds ago
//           type: "text",
//           read: false,
//         },
//       ];
//     } catch (error) {
//       console.warn("Error generating conversation messages:", error);
//       return [];
//     }
//   };

//   // 🔥 UNIVERSAL CHAT HANDLER - WORKS FOR ALL TRACKING PAGES AND USER ROLES
//   const handleUniversalChat = (job: DeliveryJob) => {
//     console.log(
//       "💬 UNIVERSAL CHAT HANDLER - Opening chat for delivery:",
//       job.title,
//       "ID:",
//       job.id
//     );
//     console.log("👤 Current user role:", activeRole, "User ID:", user?.id);
//     console.log(
//       "📦 Job participants: Sender:",
//       job.senderId,
//       "Pal:",
//       job.selectedPalId,
//       "Receiver:",
//       job.receiverId
//     );

//     if (!job || !user) {
//       console.error("❌ Universal Chat: Missing job or user data");
//       return;
//     }

//     // Find or create chat thread for this job
//     let chatThread = chatThreads.find((chat) => chat.jobId === job.id);

//     if (!chatThread) {
//       console.log(
//         "📝 Universal Chat: Creating new chat thread with realistic conversation"
//       );

//       // Create new chat thread with realistic conversation simulation
//       const conversationMessages = generateConversationMessages(job);

//       // Determine all participants based on job data
//       const participants: string[] = [];
//       if (job.senderId) participants.push(job.senderId);
//       if (job.selectedPalId) participants.push(job.selectedPalId);
//       if (job.receiverId) participants.push(job.receiverId);

//       // Ensure current user is included if not already
//       if (user.id && !participants.includes(user.id)) {
//         participants.push(user.id);
//       }

//       // Remove duplicates and empty values
//       const uniqueParticipants = [...new Set(participants)].filter(Boolean);

//       const newChatThread: ChatThread = {
//         id: `chat-${job.id}-${Date.now()}`,
//         jobId: job.id,
//         participants: uniqueParticipants,
//         lastActivity: new Date().toISOString(),
//         messages: conversationMessages,
//       };

//       setChatThreads((prev) => [...prev, newChatThread]);
//       chatThread = newChatThread;

//       // Update job with chat ID
//       const updatedJob = { ...job, chatId: newChatThread.id };
//       handleJobUpdate(updatedJob);

//       console.log("✅ Universal Chat: Created new chat thread");
//       console.log("👥 Participants:", uniqueParticipants.length);
//       console.log("💭 Messages:", conversationMessages.length);
//     } else {
//       console.log(
//         "📝 Universal Chat: Found existing chat thread:",
//         chatThread.id
//       );

//       // Check if current user is in the chat participants
//       if (!chatThread.participants.includes(user.id)) {
//         console.log(
//           "👤 Universal Chat: Adding current user to chat participants"
//         );

//         // Add user to participants
//         const updatedParticipants = [...chatThread.participants, user.id];

//         // Add system message for user joining
//         const joinMessage: ChatMessage = {
//           id: `join-${user.id}-${Date.now()}`,
//           senderId: "system",
//           senderName: "System",
//           senderRole: "sender",
//           message: `${(user.name || user.email || 'User').split(" ")[0]} has joined the chat`,
//           timestamp: new Date().toISOString(),
//           type: "system",
//           read: false,
//         };

//         const updatedThread = {
//           ...chatThread,
//           participants: updatedParticipants,
//           messages: [...chatThread.messages, joinMessage],
//           lastActivity: new Date().toISOString(),
//         };

//         setChatThreads((prev) =>
//           prev.map((thread) =>
//             thread.id === updatedThread.id ? updatedThread : thread
//           )
//         );
//         chatThread = updatedThread;

//         console.log("✅ Universal Chat: Added user to existing chat");
//       }
//     }

//     // Set the selected chat thread and job
//     console.log("💬 Universal Chat: Opening chat screen");
//     console.log("📨 Chat thread:", chatThread.id);
//     console.log("👥 Total participants:", chatThread.participants.length);
//     console.log("💭 Total messages:", chatThread.messages.length);

//     setSelectedChatThread(chatThread);
//     setSelectedJob(job);
//     navigateToScreen("chat");
//   };

//   // 🔥 ENHANCED CHAT HANDLER FOR RECEIVER WITH CONVERSATION SIMULATION
//   const handleReceiverChatSelect = (job: DeliveryJob) => {
//     console.log(
//       "🔥 RECEIVER JOINING CHAT - Enhanced Flow with Conversation Simulation:"
//     );
//     console.log("📦 Job:", job.title, "ID:", job.id);
//     console.log(
//       "👥 Participants: Sender:",
//       job.senderName?.split(" ")[0],
//       ", Pal:",
//       job.selectedPalName?.split(" ")[0]
//     );

//     // Use the universal chat handler for consistency
//     handleUniversalChat(job);
//   };

//   // ���� COMPREHENSIVE RESOLUTION FLOW - Full Support Agent Integration
//   const handleFullResolutionFlow = (
//     chatThread: ChatThread,
//     requestingUser: User
//   ) => {
//     console.log(
//       "🎯 FULL RESOLUTION FLOW: Starting comprehensive dispute resolution"
//     );
//     console.log(
//       "👤 Requesting User:",
//       requestingUser.name,
//       "Role:",
//       activeRole
//     );
//     console.log(
//       "📝 Job Context:",
//       selectedJob?.title,
//       "Status:",
//       selectedJob?.status
//     );

//     // Step 1: Add initial mediation request message
//     const mediationRequestMessage: ChatMessage = {
//       id: `mediation-request-${Date.now()}`,
//       senderId: "system",
//       senderName: "System",
//       senderRole: "sender",
//       message: `🤝 ${requestingUser.name} has requested mediation. A Prawnbox support agent will join this chat shortly to help resolve any issues.`,
//       timestamp: new Date().toISOString(),
//       type: "system",
//       read: true,
//     };

//     // Update chat with mediation request
//     const threadWithRequest = {
//       ...chatThread,
//       messages: [...chatThread.messages, mediationRequestMessage],
//       lastActivity: new Date().toISOString(),
//     };

//     setChatThreads((prev) =>
//       prev.map((thread) =>
//         thread.id === threadWithRequest.id ? threadWithRequest : thread
//       )
//     );
//     setSelectedChatThread(threadWithRequest);

//     // Step 2: Support agent joins and starts resolution process
//     setTimeout(() => {
//       startSupportAgentResolution(threadWithRequest, requestingUser);
//     }, 2000);
//   };

//   // 🔥 SUPPORT AGENT RESOLUTION PROCESS
//   const startSupportAgentResolution = (
//     chatThread: ChatThread,
//     requestingUser: User
//   ) => {
//     console.log("👨‍💼 SUPPORT AGENT: Starting resolution process");

//     const supportAgentMessages: ChatMessage[] = [
//       {
//         id: `support-join-${Date.now()}`,
//         senderId: "support-agent",
//         senderName: "Alex Chen",
//         senderRole: "sender",
//         message: `Hello everyone! I'm Alex Chen from Prawnbox Support. I'm here to help resolve this delivery issue. Let me review the details and get everyone back on track. 👋`,
//         timestamp: new Date().toISOString(),
//         type: "text",
//         read: false,
//       },
//     ];

//     // Add support agent to participants
//     const updatedParticipants = [...chatThread.participants];
//     if (!updatedParticipants.includes("support-agent")) {
//       updatedParticipants.push("support-agent");
//     }

//     const threadWithAgent = {
//       ...chatThread,
//       messages: [...chatThread.messages, ...supportAgentMessages],
//       participants: updatedParticipants,
//       lastActivity: new Date().toISOString(),
//     };

//     setChatThreads((prev) =>
//       prev.map((thread) =>
//         thread.id === threadWithAgent.id ? threadWithAgent : thread
//       )
//     );
//     setSelectedChatThread(threadWithAgent);

//     // Continue with investigation phase
//     setTimeout(() => {
//       supportAgentInvestigation(threadWithAgent, requestingUser);
//     }, 3000);
//   };

//   // 🔥 SUPPORT AGENT INVESTIGATION PHASE
//   const supportAgentInvestigation = (
//     chatThread: ChatThread,
//     requestingUser: User
//   ) => {
//     console.log("🔍 SUPPORT AGENT: Investigation phase");

//     const investigationMessages: ChatMessage[] = [];

//     // Analyze the issue based on job status and user role
//     if (selectedJob) {
//       investigationMessages.push({
//         id: `investigation-${Date.now()}`,
//         senderId: "support-agent",
//         senderName: "Alex Chen",
//         senderRole: "sender",
//         message: `I can see this involves the delivery "${
//           selectedJob.title
//         }" with a value of ${formatAmount(
//           selectedJob.acceptedBidAmount || selectedJob.value
//         )}. Let me understand what's happening here.`,
//         timestamp: new Date().toISOString(),
//         type: "text",
//         read: false,
//       });

//       // Role-specific investigation questions
//       if (activeRole === "sender") {
//         investigationMessages.push({
//           id: `investigation-sender-${Date.now()}`,
//           senderId: "support-agent",
//           senderName: "Alex Chen",
//           senderRole: "sender",
//           message: `${requestingUser.name}, as the sender, can you tell me specifically what issue you're experiencing? Is it related to:\n\n• Item verification problems?\n• Communication issues with your Pal?\n• Delivery delays or concerns?\n• Something else?\n\nPlease be as detailed as possible.`,
//           timestamp: new Date().toISOString(),
//           type: "text",
//           read: false,
//         });
//       } else if (activeRole === "pal") {
//         investigationMessages.push({
//           id: `investigation-pal-${Date.now()}`,
//           senderId: "support-agent",
//           senderName: "Alex Chen",
//           senderRole: "sender",
//           message: `${requestingUser.name}, as the Pal handling this delivery, what specific challenges are you facing? Is it:\n\n• Item doesn't match description?\n• Pickup/delivery location issues?\n• Receiver unavailable?\n• Safety or security concerns?\n• Payment or compensation issues?\n\nYour detailed explanation will help me assist everyone.`,
//           timestamp: new Date().toISOString(),
//           type: "text",
//           read: false,
//         });
//       } else if (activeRole === "receiver") {
//         investigationMessages.push({
//           id: `investigation-receiver-${Date.now()}`,
//           senderId: "support-agent",
//           senderName: "Alex Chen",
//           senderRole: "sender",
//           message: `${requestingUser.name}, as the receiver, what's your main concern? Are you experiencing:\n\n• Delivery delays?\n• Communication issues?\n• Concerns about item condition?\n• Scheduling conflicts?\n• Something else?\n\nI'm here to make sure you receive your delivery safely.`,
//           timestamp: new Date().toISOString(),
//           type: "text",
//           read: false,
//         });
//       }
//     }

//     const threadWithInvestigation = {
//       ...chatThread,
//       messages: [...chatThread.messages, ...investigationMessages],
//       lastActivity: new Date().toISOString(),
//     };

//     setChatThreads((prev) =>
//       prev.map((thread) =>
//         thread.id === threadWithInvestigation.id
//           ? threadWithInvestigation
//           : thread
//       )
//     );
//     setSelectedChatThread(threadWithInvestigation);

//     // Start solution offering phase
//     setTimeout(() => {
//       supportAgentSolutions(threadWithInvestigation, requestingUser);
//     }, 8000);
//   };

//   // 🔥 SUPPORT AGENT SOLUTIONS PHASE - Enhanced with AI Recommendations
//   const supportAgentSolutions = (
//     chatThread: ChatThread,
//     requestingUser: User
//   ) => {
//     console.log(
//       "💡 SUPPORT AGENT: Solutions phase - presenting options with AI analysis"
//     );

//     // Get AI recommendation for optimal solution
//     const aiRecommendedOption = analyzeOptimalSolution(
//       activeRole,
//       selectedJob,
//       requestingUser
//     );
//     console.log(
//       "🤖 AI RECOMMENDATION: Optimal solution for",
//       activeRole,
//       "is Option",
//       aiRecommendedOption
//     );

//     const solutionMessages: ChatMessage[] = [
//       {
//         id: `solutions-intro-${Date.now()}`,
//         senderId: "support-agent",
//         senderName: "Alex Chen",
//         senderRole: "sender",
//         message: `Based on my comprehensive analysis of your situation, I have several tailored solutions. I've analyzed your delivery context and will highlight my recommended approach:`,
//         timestamp: new Date().toISOString(),
//         type: "text",
//         read: false,
//       },
//     ];

//     // Offer role-specific solutions with AI recommendations
//     if (selectedJob) {
//       const jobValue = selectedJob.acceptedBidAmount || selectedJob.value;
//       const isHighValue = jobValue > 50000;
//       const userRating = requestingUser.rating || 4.5;
//       const isPremiumUser = userRating >= 4.8;

//       if (activeRole === "sender") {
//         solutionMessages.push({
//           id: `solutions-sender-${Date.now()}`,
//           senderId: "support-agent",
//           senderName: "Alex Chen",
//           senderRole: "sender",
//           message: `📋 **Tailored Solutions for Your ${formatAmount(
//             jobValue
//           )} Delivery:**\n\n${
//             aiRecommendedOption === 1 ? "🎯 **RECOMMENDED** " : ""
//           }**Option 1: Item Description Update**\n• Quick fix - Update item details for easier verification\n• Pal gets ₦${Math.floor(
//             jobValue * 0.1
//           )} compensation for delay\n• Delivery continues with current Pal\n• ⏱️ Resolution time: 5-10 minutes\n\n${
//             aiRecommendedOption === 2 ? "🎯 **RECOMMENDED** " : ""
//           }**Option 2: Direct Resolution**\n• Personal coordination between you and your Pal\n• I'll facilitate a quick resolution call\n• ${
//             isPremiumUser
//               ? "Premium support for valued customers"
//               : "Direct communication channel"
//           }\n• ⏱️ Resolution time: 2-5 minutes\n\n${
//             aiRecommendedOption === 3 ? "🎯 **RECOMMENDED** " : ""
//           }**Option 3: Delivery Reassignment**\n• Fresh start with a different, verified Pal\n• Full refund: ₦${jobValue} returned to wallet\n• Premium Pal matching for ${
//             isHighValue ? "high-value" : "priority"
//           } deliveries\n• ⏱️ New assignment: 2-4 hours\n\n${
//             aiRecommendedOption === 4 ? "🎯 **RECOMMENDED** " : ""
//           }**Option 4: Full Cancellation**\n• Complete cancellation with fair compensation\n• Full refund: ₦${jobValue} (platform fees waived)\n• Pal receives ₦${Math.floor(
//             jobValue * 0.2
//           )} for time spent\n• ⏱️ Immediate resolution\n\n💡 **Use the quick reply buttons below to select your preferred option.**`,
//           timestamp: new Date().toISOString(),
//           type: "text",
//           read: false,
//         });
//       } else if (activeRole === "pal") {
//         solutionMessages.push({
//           id: `solutions-pal-${Date.now()}`,
//           senderId: "support-agent",
//           senderName: "Alex Chen",
//           senderRole: "sender",
//           message: `🚗 **Optimized Solutions for ${
//             userRating >= 4.5 ? "Premium" : ""
//           } Pal (${userRating}⭐):**\n\n${
//             aiRecommendedOption === 1 ? "🎯 **RECOMMENDED** " : ""
//           }**Option 1: Verification Assistance**\n• Step-by-step guided verification process\n• Enhanced item description from sender\n• Compensation: ₦${Math.floor(
//             jobValue * 0.08
//           )} for extra time\n• ⏱️ Resolution time: 10-15 minutes\n\n${
//             aiRecommendedOption === 2 ? "🎯 **RECOMMENDED** " : ""
//           }**Option 2: Enhanced Compensation Package**\n• Immediate bonus: ₦${Math.floor(
//             jobValue * 0.15
//           )} \n• Completion bonus: Additional ₦${Math.floor(
//             jobValue * 0.05
//           )}\n• ${
//             isPremiumUser
//               ? "VIP support line access"
//               : "Priority verification support"
//           }\n• Rating protection guaranteed\n\n${
//             aiRecommendedOption === 3 ? "🎯 **RECOMMENDED** " : ""
//           }**Option 3: Professional Transfer**\n• Transfer to qualified replacement Pal\n• Fair compensation: ₦${Math.floor(
//             jobValue * 0.2
//           )} for your time\n• ${
//             userRating >= 4.5
//               ? "Maintains your excellent rating"
//               : "No negative rating impact"
//           }\n• Priority access to future premium deliveries\n\n${
//             aiRecommendedOption === 4 ? "🎯 **RECOMMENDED** " : ""
//           }**Option 4: Protected Cancellation**\n• Safe exit with full compensation: ₦${Math.floor(
//             jobValue * 0.25
//           )}\n• Complete rating protection\n• ${
//             isPremiumUser
//               ? "VIP status maintained"
//               : "Account standing protected"
//           }\n• Immediate wallet credit\n\n💡 **Select your preferred option using the quick reply buttons below.**`,
//           timestamp: new Date().toISOString(),
//           type: "text",
//           read: false,
//         });
//       } else if (activeRole === "receiver") {
//         const isUrgent =
//           selectedJob.pickupDate &&
//           new Date(selectedJob.pickupDate) <=
//             new Date(Date.now() + 24 * 60 * 60 * 1000);

//         solutionMessages.push({
//           id: `solutions-receiver-${Date.now()}`,
//           senderId: "support-agent",
//           senderName: "Alex Chen",
//           senderRole: "sender",
//           message: `📦 **Priority Solutions for Your ${
//             isUrgent ? "Urgent " : ""
//           }Delivery:**\n\n${
//             aiRecommendedOption === 1 ? "🎯 **RECOMMENDED** " : ""
//           }**Option 1: Express Priority Service**\n• ${
//             isUrgent
//               ? "URGENT: Guaranteed delivery within 2 hours"
//               : "Priority delivery within 4 hours"
//           }\n• Personal delivery coordinator assigned\n�� Real-time SMS updates every 15 minutes\n• Service credit: ₦${Math.floor(
//             jobValue * 0.03
//           )} for inconvenience\n\n${
//             aiRecommendedOption === 2 ? "🎯 **RECOMMENDED** " : ""
//           }**Option 2: Flexible Scheduling**\n• Reschedule to any time within 48 hours\n• ${
//             isPremiumUser
//               ? "Premium location options"
//               : "Alternative delivery locations"
//           }\n• Proxy delivery authorization\n• No additional charges for changes\n\n${
//             aiRecommendedOption === 3 ? "🎯 **RECOMMENDED** " : ""
//           }**Option 3: Enhanced Communication**\n• Direct phone line with your Pal\n• ${
//             isPremiumUser
//               ? "VIP coordination service"
//               : "Personal delivery updates"
//           }\n• WhatsApp group with all parties\n• Real-time tracking every 20 minutes\n\n${
//             aiRecommendedOption === 4 ? "🎯 **RECOMMENDED** " : ""
//           }**Option 4: Secure Proxy Service**\n• Professional storage at nearby verified location\n• 72-hour pickup window (no rush)\n• SMS notification when ready\n• Convenience credit: ₦${Math.floor(
//             jobValue * 0.02
//           )}\n\n💡 **Use the quick reply buttons to choose your preferred solution.**`,
//           timestamp: new Date().toISOString(),
//           type: "text",
//           read: false,
//         });
//       }
//     }

//     const threadWithSolutions = {
//       ...chatThread,
//       messages: [...chatThread.messages, ...solutionMessages],
//       lastActivity: new Date().toISOString(),
//       awaitingUserChoice: true,
//       supportAgentState: "awaiting-option-selection",
//       aiRecommendedOption: aiRecommendedOption,
//     };

//     setChatThreads((prev) =>
//       prev.map((thread) =>
//         thread.id === threadWithSolutions.id ? threadWithSolutions : thread
//       )
//     );
//     setSelectedChatThread(threadWithSolutions);

//     console.log(
//       "🔄 SUPPORT AGENT: Waiting for user to select option via quick replies only..."
//     );
//   };

//   // 🔥 ENHANCED AI AGENT SOLUTION ANALYZER - Advanced contextual analysis
//   const analyzeOptimalSolution = (
//     userRole: UserRole,
//     job: DeliveryJob | null,
//     userContext: User
//   ) => {
//     if (!job) return 1; // Default to option 1 if no job context

//     console.log(
//       "🤖 ENHANCED AI AGENT: Deep analysis for",
//       userRole,
//       "with comprehensive context"
//     );

//     const jobValue = job.acceptedBidAmount || job.value;
//     const userRating = userContext.rating || 4.5;
//     const userWalletBalance = userContext.walletBalance || 0;
//     const isHighValueJob = jobValue > 50000;
//     const isMediumValueJob = jobValue >= 15000 && jobValue <= 50000;
//     const isLowValueJob = jobValue < 15000;
//     const isPremiumUser = userRating >= 4.8;
//     const isExperiencedUser = userRating >= 4.5;
//     const isNewUser = userRating < 4.0;
//     const isUrgentDelivery =
//       job.pickupDate &&
//       new Date(job.pickupDate) <= new Date(Date.now() + 24 * 60 * 60 * 1000);
//     const hasGoodWalletBalance = userWalletBalance > jobValue * 2;
//     const currentHour = new Date().getHours();
//     const isBusinessHours = currentHour >= 9 && currentHour <= 17;

//     // Enhanced AI Analysis with multiple factors
//     if (userRole === "sender") {
//       console.log("🤖 SENDER ANALYSIS:", {
//         jobValue,
//         isHighValueJob,
//         isPremiumUser,
//         isUrgentDelivery,
//         hasGoodWalletBalance,
//       });

//       // Premium users get premium solutions
//       if (isPremiumUser && isHighValueJob) {
//         return 2; // Direct Resolution - VIP treatment
//       }

//       // Urgent deliveries need quick fixes
//       if (isUrgentDelivery && isBusinessHours) {
//         return 1; // Item Description Update - fastest
//       }

//       // High-value jobs deserve careful handling
//       if (isHighValueJob && hasGoodWalletBalance) {
//         return 3; // Delivery Reassignment - premium replacement
//       }

//       // Low-value jobs can be cancelled with minimal impact
//       if (isLowValueJob && !isUrgentDelivery) {
//         return 4; // Full Cancellation - minimal loss
//       }

//       // Medium-value jobs get balanced approach
//       if (isMediumValueJob) {
//         return 2; // Direct Resolution - personal attention
//       }

//       return 1; // Default to item update
//     } else if (userRole === "pal") {
//       console.log("🤖 PAL ANALYSIS:", {
//         userRating,
//         isPremiumUser,
//         isHighValueJob,
//         isUrgentDelivery,
//         isNewUser,
//       });

//       // Premium Pals get premium compensation
//       if (isPremiumUser && (isHighValueJob || isUrgentDelivery)) {
//         return 2; // Enhanced Compensation Package
//       }

//       // New Pals need protection
//       if (isNewUser && !isLowValueJob) {
//         return 4; // Safe Cancellation - protect rating
//       }

//       // Experienced Pals can handle verification assistance
//       if (isExperiencedUser && isBusinessHours) {
//         return 1; // Verification Assistance - they can handle it
//       }

//       // Medium experience gets fresh start option
//       if (userRating >= 4.0 && userRating < 4.5) {
//         return 3; // Transfer Assignment - clean slate
//       }

//       // High-value jobs need careful handling
//       if (isHighValueJob) {
//         return 2; // Compensation Package - worth the effort
//       }

//       return 1; // Default to assistance
//     } else if (userRole === "receiver") {
//       console.log("🤖 RECEIVER ANALYSIS:", {
//         isUrgentDelivery,
//         isPremiumUser,
//         isBusinessHours,
//         jobValue,
//       });

//       // Urgent deliveries get express treatment
//       if (isUrgentDelivery) {
//         return 1; // Expedited Delivery - top priority
//       }

//       // Premium users get enhanced communication
//       if (isPremiumUser && isBusinessHours) {
//         return 3; // Direct Communication - VIP service
//       }

//       // High-value packages get proxy options for security
//       if (isHighValueJob) {
//         return 4; // Proxy Service - secure handling
//       }

//       // Evening/weekend deliveries get flexible scheduling
//       if (!isBusinessHours) {
//         return 2; // Flexible Scheduling - convenience
//       }

//       // Medium-value standard deliveries get communication upgrade
//       if (isMediumValueJob) {
//         return 3; // Direct Communication - personal touch
//       }

//       return 2; // Default to flexible scheduling
//     }

//     return 1; // Ultimate fallback
//   };

//   // 🔥 HANDLE USER OPTION SELECTION - Enhanced with AI Recommendation
//   const handleUserOptionSelection = (
//     optionChoice: string,
//     chatThread: ChatThread,
//     requestingUser: User
//   ) => {
//     console.log("🎯 SUPPORT AGENT: User selected option:", optionChoice);

//     // Only accept exact quick reply options
//     const validQuickReplies = ["Option 1", "Option 2", "Option 3", "Option 4"];
//     if (!validQuickReplies.includes(optionChoice.trim())) {
//       console.log("❌ SUPPORT AGENT: Invalid option format, ignoring message");
//       return; // Don't respond to non-quick-reply messages
//     }

//     // Parse the option number from the exact quick reply
//     const selectedOption = parseInt(optionChoice.replace("Option ", ""));
//     console.log(
//       "✅ SUPPORT AGENT: Valid quick reply option selected:",
//       selectedOption
//     );

//     // AI Agent analyzes the optimal solution
//     const aiRecommendedOption = analyzeOptimalSolution(
//       activeRole,
//       selectedJob,
//       requestingUser
//     );
//     const isOptimalChoice = selectedOption === aiRecommendedOption;

//     console.log(
//       "🤖 AI ANALYSIS: Recommended option:",
//       aiRecommendedOption,
//       "User chose:",
//       selectedOption,
//       "Optimal:",
//       isOptimalChoice
//     );

//     // Generate personalized explanation for the choice
//     const getChoiceExplanation = (
//       chosen: number,
//       recommended: number,
//       role: UserRole,
//       job: DeliveryJob
//     ) => {
//       const jobValue = job.acceptedBidAmount || job.value;
//       const isHighValue = jobValue > 50000;
//       const userRating = requestingUser.rating || 4.5;
//       const isPremium = userRating >= 4.8;

//       if (chosen === recommended) {
//         const explanations = {
//           1:
//             role === "sender"
//               ? "This quick update approach minimizes delays while keeping your current Pal"
//               : role === "pal"
//               ? "Guided assistance will help you complete this delivery successfully with support"
//               : "Express priority ensures your package arrives as quickly as possible",
//           2:
//             role === "sender"
//               ? `Direct communication works best for ${
//                   isHighValue
//                     ? "high-value"
//                     : isPremium
//                     ? "premium"
//                     : "valuable"
//                 } deliveries like yours`
//               : role === "pal"
//               ? `Enhanced compensation reflects the value of your ${
//                   isPremium ? "premium" : "professional"
//                 } service`
//               : "Flexible scheduling gives you maximum convenience for this delivery",
//           3:
//             role === "sender"
//               ? "A fresh Pal assignment often resolves verification issues completely"
//               : role === "pal"
//               ? "Professional transfer maintains your rating while ensuring fair compensation"
//               : "Enhanced communication provides the personal touch this delivery deserves",
//           4:
//             role === "sender"
//               ? "Smart cancellation minimizes your costs while compensating all parties fairly"
//               : role === "pal"
//               ? "Protected cancellation safeguards your rating while providing full compensation"
//               : "Secure proxy service offers maximum flexibility and safety for your package",
//         };
//         return `🎯 **Perfect choice!** ${
//           explanations[chosen as keyof typeof explanations]
//         } My analysis confirms this is optimal for your situation.`;
//       } else {
//         return `👍 **Great choice!** Option ${chosen} is an excellent solution. While I initially suggested Option ${recommended} based on ${
//           role === "sender"
//             ? "your delivery value and urgency"
//             : role === "pal"
//             ? "your rating and experience"
//             : "timing and convenience factors"
//         }, your choice perfectly addresses your specific needs.`;
//       }
//     };

//     // Enhanced acknowledgment with personalized AI insights
//     const acknowledgmentMessage: ChatMessage = {
//       id: `acknowledgment-${Date.now()}`,
//       senderId: "support-agent",
//       senderName: "Alex Chen",
//       senderRole: "sender",
//       message: selectedJob
//         ? getChoiceExplanation(
//             selectedOption,
//             aiRecommendedOption,
//             activeRole,
//             selectedJob
//           )
//         : `Perfect! You've chosen Option ${selectedOption}. Let me implement this solution right away. 🚀`,
//       timestamp: new Date().toISOString(),
//       type: "text",
//       read: false,
//     };

//     const threadWithAcknowledgment = {
//       ...chatThread,
//       messages: [...chatThread.messages, acknowledgmentMessage],
//       lastActivity: new Date().toISOString(),
//       awaitingUserChoice: false,
//       supportAgentState: "implementing-choice",
//       selectedOption: selectedOption,
//       aiRecommendedOption: aiRecommendedOption,
//       isOptimalChoice: isOptimalChoice,
//     };

//     setChatThreads((prev) =>
//       prev.map((thread) =>
//         thread.id === threadWithAcknowledgment.id
//           ? threadWithAcknowledgment
//           : thread
//       )
//     );
//     setSelectedChatThread(threadWithAcknowledgment);

//     // Implement the chosen option after a brief delay
//     setTimeout(() => {
//       supportAgentImplementUserChoice(
//         threadWithAcknowledgment,
//         requestingUser,
//         selectedOption
//       );
//     }, 1500);
//   };

//   // 🔥 SUPPORT AGENT FACILITATION PHASE - Now triggered by user choice
//   const supportAgentFacilitation = (
//     chatThread: ChatThread,
//     requestingUser: User
//   ) => {
//     console.log("🤝 SUPPORT AGENT: Facilitation phase");

//     const facilitationMessages: ChatMessage[] = [
//       {
//         id: `facilitation-${Date.now()}`,
//         senderId: "support-agent",
//         senderName: "Alex Chen",
//         senderRole: "sender",
//         message: `I'm now going to facilitate a solution between all parties. Let me coordinate the best path forward for everyone. 🤝`,
//         timestamp: new Date().toISOString(),
//         type: "text",
//         read: false,
//       },
//       {
//         id: `facilitation-coordination-${Date.now()}`,
//         senderId: "support-agent",
//         senderName: "Alex Chen",
//         senderRole: "sender",
//         message: `**RESOLUTION COORDINATION:**\n\n✅ **Step 1: Immediate Actions**\n• All parties remain in this chat\n• I'll coordinate real-time solutions\n• No actions needed until I provide guidance\n\n✅ **Step 2: Fair Resolution**\n• Solution will be fair to all parties\n• Compensation handled appropriately\n• Ratings protected for cooperation\n\n✅ **Step 3: Completion**\n• Clear next steps for everyone\n• Monitored execution\n• Follow-up to ensure satisfaction`,
//         timestamp: new Date().toISOString(),
//         type: "text",
//         read: false,
//       },
//     ];

//     const threadWithFacilitation = {
//       ...chatThread,
//       messages: [...chatThread.messages, ...facilitationMessages],
//       lastActivity: new Date().toISOString(),
//     };

//     setChatThreads((prev) =>
//       prev.map((thread) =>
//         thread.id === threadWithFacilitation.id
//           ? threadWithFacilitation
//           : thread
//       )
//     );
//     setSelectedChatThread(threadWithFacilitation);

//     // Move to resolution implementation
//     setTimeout(() => {
//       supportAgentResolutionImplementation(
//         threadWithFacilitation,
//         requestingUser
//       );
//     }, 6000);
//   };

//   // 🔥 IMPLEMENT USER'S SPECIFIC CHOICE - New Dynamic Implementation
//   const supportAgentImplementUserChoice = (
//     chatThread: ChatThread,
//     requestingUser: User,
//     selectedOption: number
//   ) => {
//     console.log(
//       "⚙️ SUPPORT AGENT: Implementing user choice - Option",
//       selectedOption
//     );

//     const implementationMessages: ChatMessage[] = [];

//     if (!selectedJob) return;

//     // Role-specific implementation based on chosen option
//     if (activeRole === "sender") {
//       switch (selectedOption) {
//         case 1: // Item Description Update
//           implementationMessages.push({
//             id: `implementation-sender-option1-${Date.now()}`,
//             senderId: "support-agent",
//             senderName: "Alex Chen",
//             senderRole: "sender",
//             message: `🎯 **IMPLEMENTING: Item Description Update**\n\n📝 **Action Plan:**\n• I'll guide you to update item details immediately\n• Enhanced description will help Pal verify the item\n• Pal gets additional ₦${Math.floor(
//               (selectedJob.acceptedBidAmount || selectedJob.value) * 0.1
//             )} compensation for the delay\n• Delivery continues as normal after verification\n\n**Next Steps:**\n1. Navigate to your delivery details to update item description\n2. Add more specific details about size, color, packaging\n3. Pal will retry verification with new information\n4. Delivery proceeds normally\n\n✅ **This solution maintains the current delivery while fixing the verification issue.**`,
//             timestamp: new Date().toISOString(),
//             type: "text",
//             read: false,
//           });

//           // Provide compensation to Pal
//           if (selectedJob.selectedPalId && user?.role === "sender") {
//             const compensationAmount = Math.floor(
//               (selectedJob.acceptedBidAmount || selectedJob.value) * 0.1
//             );

//             const updatedJob = {
//               ...selectedJob,
//               status: "assigned" as const,
//               isDisputed: false,
//               disputeReason: undefined,
//               disputeDetails: undefined,
//               resolutionNotes:
//                 "Support Resolution: Sender chose item description update - Pal compensated for delay",
//             };
//             handleJobUpdate(updatedJob);
//           }
//           break;

//         case 2: // Direct Resolution
//           implementationMessages.push({
//             id: `implementation-sender-option2-${Date.now()}`,
//             senderId: "support-agent",
//             senderName: "Alex Chen",
//             senderRole: "sender",
//             message: `🎯 **IMPLEMENTING: Direct Resolution**\n\n🤝 **Action Plan:**\n• I'll facilitate direct communication between you and your Pal\n• Quick resolution call to clear up any misunderstandings\n• Pal gets priority verification support\n• Small courtesy compensation of ₦${Math.floor(
//               (selectedJob.acceptedBidAmount || selectedJob.value) * 0.05
//             )} for the inconvenience\n\n**Next Steps:**\n1. I'll connect you directly with your Pal via call\n2. You both discuss and resolve the verification issue\n3. Pal proceeds with delivery immediately\n4. No changes to delivery terms or timeline\n\n✅ **This solution resolves the issue through direct communication.**`,
//             timestamp: new Date().toISOString(),
//             type: "text",
//             read: false,
//           });

//           if (selectedJob) {
//             const updatedJob = {
//               ...selectedJob,
//               status: "assigned" as const,
//               isDisputed: false,
//               disputeReason: undefined,
//               disputeDetails: undefined,
//               resolutionNotes:
//                 "Support Resolution: Direct communication facilitated between sender and Pal",
//             };
//             handleJobUpdate(updatedJob);
//           }
//           break;

//         case 3: // Delivery Reassignment
//           implementationMessages.push({
//             id: `implementation-sender-option3-${Date.now()}`,
//             senderId: "support-agent",
//             senderName: "Alex Chen",
//             senderRole: "sender",
//             message: `🎯 **IMPLEMENTING: Delivery Reassignment**\n\n🔄 **Action Plan:**\n• Current Pal assignment will be cancelled with full compensation\n• Your delivery will be reassigned to a new, verified Pal\n• Full refund of current delivery fee: ₦${
//               selectedJob.acceptedBidAmount || selectedJob.value
//             }\n• New Pal matching starts immediately\n\n**What Happens Next:**\n1. Current Pal receives full compensation for time spent\n2. Your item returns to available delivery pool\n3. Premium Pals will be notified for priority pickup\n4. New delivery timeline: 2-4 hours for new assignment\n\n✅ **This solution gives you a fresh start with a different Pal.**`,
//             timestamp: new Date().toISOString(),
//             type: "text",
//             read: false,
//           });

//           if (selectedJob && user) {
//             // Refund sender
//             const refundAmount =
//               selectedJob.acceptedBidAmount || selectedJob.value;
//             const updatedUser = {
//               ...user,
//               walletBalance: (user.walletBalance || 0) + refundAmount,
//             };
//             handleUserUpdate(updatedUser);

//             const reassignedJob = {
//               ...selectedJob,
//               status: "pending" as const,
//               selectedPalId: undefined,
//               selectedPalName: undefined,
//               acceptedBidAmount: undefined,
//               isDisputed: false,
//               resolutionNotes:
//                 "Support Resolution: Delivery reassigned to new Pal - original Pal compensated",
//             };
//             handleJobUpdate(reassignedJob);
//           }
//           break;

//         case 4: // Full Cancellation
//           implementationMessages.push({
//             id: `implementation-sender-option4-${Date.now()}`,
//             senderId: "support-agent",
//             senderName: "Alex Chen",
//             senderRole: "sender",
//             message: `🎯 **IMPLEMENTING: Full Cancellation**\n\n❌ **Action Plan:**\n• Complete delivery cancellation with full refund\n• Pal receives full compensation for time and effort\n• Your item stays with you - no delivery attempt\n• Platform fee waived due to technical issue\n\n**Final Settlement:**\n• Full refund to you: ₦${
//               selectedJob.acceptedBidAmount || selectedJob.value
//             }\n• Pal compensation: ₦${Math.floor(
//               (selectedJob.acceptedBidAmount || selectedJob.value) * 0.2
//             )}\n• No negative ratings for anyone\n• You can repost delivery anytime\n\n✅ **This solution completely cancels the delivery with fair compensation for all.**`,
//             timestamp: new Date().toISOString(),
//             type: "text",
//             read: false,
//           });

//           if (selectedJob && user) {
//             // Full refund to sender
//             const refundAmount =
//               selectedJob.acceptedBidAmount || selectedJob.value;
//             const updatedUser = {
//               ...user,
//               walletBalance: (user.walletBalance || 0) + refundAmount,
//             };
//             handleUserUpdate(updatedUser);

//             const cancelledJob = {
//               ...selectedJob,
//               status: "cancelled" as const,
//               isDisputed: false,
//               resolutionNotes:
//                 "Support Resolution: Full cancellation - both parties compensated fairly",
//             };
//             handleJobUpdate(cancelledJob);
//           }
//           break;
//       }
//     } else if (activeRole === "pal") {
//       switch (selectedOption) {
//         case 1: // Verification Assistance
//           implementationMessages.push({
//             id: `implementation-pal-option1-${Date.now()}`,
//             senderId: "support-agent",
//             senderName: "Alex Chen",
//             senderRole: "sender",
//             message: `🎯 **IMPLEMENTING: Verification Assistance**\n\n🔍 **Action Plan:**\n• I'll guide you through step-by-step verification process\n• Sender will update item description with more details\n• You get direct support line for any questions\n• ₦${Math.floor(
//               (selectedJob.acceptedBidAmount || selectedJob.value) * 0.08
//             )} compensation for extra time\n\n**Verification Support:**\n1. Check updated item description (arriving in 5 minutes)\n2. Use guided scanning process with my assistance\n3. Immediate help line if you need clarification\n4. Proceed with delivery once verified\n\n✅ **This solution helps you complete the delivery successfully.**`,
//             timestamp: new Date().toISOString(),
//             type: "text",
//             read: false,
//           });

//           if (user && selectedJob) {
//             const compensationAmount = Math.floor(
//               (selectedJob.acceptedBidAmount || selectedJob.value) * 0.15
//             );
//             const updatedUser = {
//               ...user,
//               walletBalance: (user.walletBalance || 0) + compensationAmount,
//             };
//             handleUserUpdate(updatedUser);
//           }
//           break;

//         case 3: // Transfer Assignment
//           implementationMessages.push({
//             id: `implementation-pal-option3-${Date.now()}`,
//             senderId: "support-agent",
//             senderName: "Alex Chen",
//             senderRole: "sender",
//             message: `🎯 **IMPLEMENTING: Transfer Assignment**\n\n🔄 **Action Plan:**\n• You'll be released from this delivery with full compensation\n• Another qualified Pal will take over immediately\n• You receive ₦${Math.floor(
//               (selectedJob.acceptedBidAmount || selectedJob.value) * 0.2
//             )} for time spent\n• No negative impact on your ratings or metrics\n\n**Transfer Process:**\n1. You're released from delivery obligation now\n2. Full compensation processed to your wallet\n3. Item returns to you (if picked up) or stays with sender\n4. New Pal assignment begins immediately\n\n✅ **This solution lets you move on with fair compensation.**`,
//             timestamp: new Date().toISOString(),
//             type: "text",
//             read: false,
//           });

//           if (user && selectedJob) {
//             const compensationAmount = Math.floor(
//               (selectedJob.acceptedBidAmount || selectedJob.value) * 0.2
//             );
//             const updatedUser = {
//               ...user,
//               walletBalance: (user.walletBalance || 0) + compensationAmount,
//             };
//             handleUserUpdate(updatedUser);

//             const transferredJob = {
//               ...selectedJob,
//               status: "pending" as const,
//               selectedPalId: undefined,
//               selectedPalName: undefined,
//               acceptedBidAmount: undefined,
//               isDisputed: false,
//               resolutionNotes:
//                 "Support Resolution: Transferred to new Pal - original Pal compensated",
//             };
//             handleJobUpdate(transferredJob);
//           }
//           break;

//         case 4: // Safe Cancellation
//           implementationMessages.push({
//             id: `implementation-pal-option4-${Date.now()}`,
//             senderId: "support-agent",
//             senderName: "Alex Chen",
//             senderRole: "sender",
//             message: `🎯 **IMPLEMENTING: Safe Cancellation**\n\n✅ **Action Plan:**\n• Complete delivery cancellation with full protection\n• You receive ₦${Math.floor(
//               (selectedJob.acceptedBidAmount || selectedJob.value) * 0.25
//             )} compensation\n• Zero negative impact on ratings or account\n• Item returns to sender safely\n\n**Cancellation Benefits:**\n• Full compensation for time and effort\n• Positive rating protection maintained\n• No penalties or negative marks\n• Priority access to future premium deliveries\n\n✅ **This solution protects your reputation while compensating fairly.**`,
//             timestamp: new Date().toISOString(),
//             type: "text",
//             read: false,
//           });

//           if (user && selectedJob) {
//             const compensationAmount = Math.floor(
//               (selectedJob.acceptedBidAmount || selectedJob.value) * 0.25
//             );
//             const updatedUser = {
//               ...user,
//               walletBalance: (user.walletBalance || 0) + compensationAmount,
//             };
//             handleUserUpdate(updatedUser);

//             const cancelledJob = {
//               ...selectedJob,
//               status: "cancelled" as const,
//               isDisputed: false,
//               resolutionNotes:
//                 "Support Resolution: Safe cancellation - Pal fully compensated and protected",
//             };
//             handleJobUpdate(cancelledJob);
//           }
//           break;
//       }
//     } else if (activeRole === "receiver") {
//       switch (selectedOption) {
//         case 1: // Expedited Delivery
//           implementationMessages.push({
//             id: `implementation-receiver-option1-${Date.now()}`,
//             senderId: "support-agent",
//             senderName: "Alex Chen",
//             senderRole: "sender",
//             message: `🎯 **IMPLEMENTING: Expedited Delivery**\n\n⚡ **Priority Service:**\n• Your delivery is now marked as PRIORITY\n• Direct coordinator assigned to monitor progress\n• Guaranteed delivery within next 2 hours\n• Real-time SMS updates every 15 minutes\n\n**Enhanced Experience:**\n• Personal coordination agent (me) tracking progress\n• Direct call 5 minutes before arrival\n• Flexible delivery window to match your schedule\n• Service credit: ₦${Math.floor(
//               (selectedJob.acceptedBidAmount || selectedJob.value) * 0.03
//             )} for inconvenience\n\n✅ **This solution prioritizes your delivery above all others.**`,
//             timestamp: new Date().toISOString(),
//             type: "text",
//             read: false,
//           });
//           break;

//         case 2: // Flexible Scheduling
//           implementationMessages.push({
//             id: `implementation-receiver-option2-${Date.now()}`,
//             senderId: "support-agent",
//             senderName: "Alex Chen",
//             senderRole: "sender",
//             message: `🎯 **IMPLEMENTING: Flexible Scheduling**\n\n📅 **Schedule Control:**\n• You can now reschedule delivery to any time within 48 hours\n• Alternative pickup locations available (work, friend's place, etc.)\n• Proxy delivery option activated if needed\n• No additional charges for rescheduling\n\n**Flexibility Options:**\n1. Choose new delivery time that works for you\n2. Change delivery location if more convenient\n3. Authorize proxy pickup if you're unavailable\n4. Pal will coordinate around your schedule\n\n✅ **This solution adapts the delivery to your needs.**`,
//             timestamp: new Date().toISOString(),
//             type: "text",
//             read: false,
//           });
//           break;

//         case 3: // Direct Communication
//           implementationMessages.push({
//             id: `implementation-receiver-option3-${Date.now()}`,
//             senderId: "support-agent",
//             senderName: "Alex Chen",
//             senderRole: "sender",
//             message: `🎯 **IMPLEMENTING: Direct Communication**\n\n📞 **Enhanced Communication:**\n• Direct phone line established with your Pal\n• Real-time tracking updates via SMS every 20 minutes\n• Personal delivery coordinator (me) monitoring progress\n• WhatsApp group with sender, Pal, and support\n\n**Communication Benefits:**\n• Instant updates on any changes\n• Direct input on delivery timing\n• Immediate resolution of any concerns\n• Personal attention throughout delivery\n\n✅ **This solution keeps you informed every step of the way.**`,
//             timestamp: new Date().toISOString(),
//             type: "text",
//             read: false,
//           });
//           break;

//         case 4: // Proxy Service
//           implementationMessages.push({
//             id: `implementation-receiver-option4-${Date.now()}`,
//             senderId: "support-agent",
//             senderName: "Alex Chen",
//             senderRole: "sender",
//             message: `🎯 **IMPLEMENTING: Proxy Service**\n\n🏪 **Secure Proxy Delivery:**\n• Your package will be delivered to verified proxy location\n• Extended 72-hour pickup window\n• Safe, secure storage with tracking\n• No rush to collect - pickup at your convenience\n\n**Proxy Benefits:**\n• Delivery to nearby trusted business location\n• Professional package handling and storage\n• SMS notification when ready for pickup\n• Service credit: ₦${Math.floor(
//               (selectedJob.acceptedBidAmount || selectedJob.value) * 0.02
//             )} for convenience\n\n✅ **This solution gives you maximum flexibility for pickup.**`,
//             timestamp: new Date().toISOString(),
//             type: "text",
//             read: false,
//           });
//           break;
//       }
//     }

//     const threadWithImplementation = {
//       ...chatThread,
//       messages: [...chatThread.messages, ...implementationMessages],
//       lastActivity: new Date().toISOString(),
//       supportAgentState: "choice-implemented",
//     };

//     setChatThreads((prev) =>
//       prev.map((thread) =>
//         thread.id === threadWithImplementation.id
//           ? threadWithImplementation
//           : thread
//       )
//     );
//     setSelectedChatThread(threadWithImplementation);

//     // Move to completion phase
//     setTimeout(() => {
//       supportAgentResolutionComplete(threadWithImplementation, requestingUser);
//     }, 5000);
//   };

//   // 🔥 SUPPORT AGENT RESOLUTION IMPLEMENTATION - Legacy function for non-interactive flow
//   const supportAgentResolutionImplementation = (
//     chatThread: ChatThread,
//     requestingUser: User
//   ) => {
//     console.log("⚙️ SUPPORT AGENT: Legacy resolution implementation phase");

//     // This function is kept for backwards compatibility but now redirects to user choice implementation
//     // Default to Option 1 if no user choice was made
//     supportAgentImplementUserChoice(chatThread, requestingUser, 1);
//   };

//   // 🔥 SUPPORT AGENT RESOLUTION COMPLETION
//   const supportAgentResolutionComplete = (
//     chatThread: ChatThread,
//     requestingUser: User
//   ) => {
//     console.log("✅ SUPPORT AGENT: Resolution completion phase");

//     const completionMessages: ChatMessage[] = [
//       {
//         id: `completion-${Date.now()}`,
//         senderId: "support-agent",
//         senderName: "Alex Chen",
//         senderRole: "sender",
//         message: `🎉 **RESOLUTION COMPLETE**\n\nGreat news! I've successfully implemented a solution that addresses everyone's concerns. Here's what happens next:`,
//         timestamp: new Date().toISOString(),
//         type: "text",
//         read: false,
//       },
//       {
//         id: `completion-summary-${Date.now()}`,
//         senderId: "support-agent",
//         senderName: "Alex Chen",
//         senderRole: "sender",
//         message: `📋 **RESOLUTION SUMMARY:**\n\n✅ **Issue Status:** RESOLVED\n✅ **All Parties:** Compensated fairly\n✅ **Delivery Status:** Back on track\n✅ **Ratings:** Protected for all cooperation\n\n🔄 **What's Next:**\n• Continue using this chat for delivery coordination\n• I'll monitor progress for the next 2 hours\n• Contact support anytime if you need assistance\n\n**Case #${Date.now()
//           .toString()
//           .slice(
//             -6
//           )} - Closed**\n\nThank you all for working together to resolve this! Prawnbox is committed to making every delivery successful. 🚀`,
//         timestamp: new Date().toISOString(),
//         type: "text",
//         read: false,
//       },
//       {
//         id: `completion-final-${Date.now()}`,
//         senderId: "system",
//         senderName: "System",
//         senderRole: "sender",
//         message: `✅ Issue resolved by Support Agent Alex Chen. All parties can continue with the delivery process. Support monitoring will continue for 2 hours.`,
//         timestamp: new Date().toISOString(),
//         type: "system",
//         read: true,
//       },
//     ];

//     const threadWithCompletion = {
//       ...chatThread,
//       messages: [...chatThread.messages, ...completionMessages],
//       lastActivity: new Date().toISOString(),
//       isResolved: true,
//       resolutionTimestamp: new Date().toISOString(),
//       resolutionAgent: "Alex Chen",
//     };

//     setChatThreads((prev) =>
//       prev.map((thread) =>
//         thread.id === threadWithCompletion.id ? threadWithCompletion : thread
//       )
//     );
//     setSelectedChatThread(threadWithCompletion);

//     // Create resolution completion notifications for all parties
//     if (selectedJob) {
//       const resolutionNotifications: Notification[] = [
//         {
//           id: `resolution-${Date.now()}-sender`,
//           userId: selectedJob.senderId,
//           type: "system-message",
//           title: "Dispute Resolved Successfully! ✅",
//           message: `Your delivery issue for "${selectedJob.title}" has been resolved by our support team. Delivery will continue as planned.`,
//           timestamp: new Date().toISOString(),
//           read: false,
//           actionRequired: false,
//           jobId: selectedJob.id,
//           metadata: {
//             resolutionAgent: "Alex Chen",
//             caseNumber: Date.now().toString().slice(-6),
//           },
//         },
//       ];

//       if (selectedJob.selectedPalId) {
//         resolutionNotifications.push({
//           id: `resolution-${Date.now()}-pal`,
//           userId: selectedJob.selectedPalId,
//           type: "system-message",
//           title: "Delivery Issue Resolved! 🎯",
//           message: `The delivery issue for "${selectedJob.title}" has been resolved. Thank you for your patience and cooperation!`,
//           timestamp: new Date().toISOString(),
//           read: false,
//           actionRequired: false,
//           jobId: selectedJob.id,
//           metadata: {
//             resolutionAgent: "Alex Chen",
//             caseNumber: Date.now().toString().slice(-6),
//           },
//         });
//       }

//       if (selectedJob.receiverId) {
//         resolutionNotifications.push({
//           id: `resolution-${Date.now()}-receiver`,
//           userId: selectedJob.receiverId,
//           type: "system-message",
//           title: "Your Delivery Issue Resolved! 📦",
//           message: `Great news! The issue with your "${selectedJob.title}" delivery has been resolved. Your package is back on track for delivery.`,
//           timestamp: new Date().toISOString(),
//           read: false,
//           actionRequired: false,
//           jobId: selectedJob.id,
//           metadata: {
//             resolutionAgent: "Alex Chen",
//             caseNumber: Date.now().toString().slice(-6),
//           },
//         });
//       }

//       // Add notifications with WhatsApp fallback
//       resolutionNotifications.forEach((notif) =>
//         addNotificationWithWhatsApp(notif)
//       );
//     }

//     console.log(
//       "🎉 FULL RESOLUTION FLOW COMPLETE: All parties have been assisted and compensated appropriately"
//     );
//   };

//   const handleChatSelect = (chatThread: ChatThread) => {
//     console.log("💬 Enhanced Chat Selection:", chatThread.id);
//     setSelectedChatThread(chatThread);
//     navigateToScreen("chat");
//   };

//   const handleLocationSelect = (
//     location: NigerianLocation,
//     context: { type: "pickup" | "dropoff"; returnScreen: Screen }
//   ) => {
//     console.log(
//       "📍 Enhanced Location Selection:",
//       location.name,
//       "for",
//       context.type
//     );
//     setLocationSelectionContext(null);
//     navigateToScreen(context.returnScreen);
//   };

//   const getPalDetails = (palId: string): User | null => {
//     return mockPalDetails[palId] || null;
//   };

//   // Enhanced function to get ALL Pal's jobs including completed ones for status updates
//   const getPalAcceptedJobs = (palId: string): DeliveryJob[] => {
//     const jobs = deliveryJobs.filter(
//       (job) =>
//         job.selectedPalId === palId &&
//         [
//           "assigned",
//           "picked-up",
//           "in-transit",
//           "delivered",
//           "completed",
//         ].includes(job.status)
//     );
//     console.log(
//       "🔍 ENHANCED getPalAcceptedJobs: Found",
//       jobs.length,
//       "jobs for Pal",
//       palId
//     );
//     console.log(
//       "📦 Enhanced job details:",
//       jobs.map(
//         (j) => `${j.title} (${j.status}) - ${j.acceptedBidAmount || j.value}`
//       )
//     );
//     return jobs;
//   };

//   // Enhanced dispute creation
//   const createDisputeNotification = (job: DeliveryJob) => {
//     const notification: Notification = {
//       id: Date.now().toString(),
//       userId: job.senderId,
//       type: "dispute-flagged",
//       title: "Item Flagged by Pal",
//       message: `Your Pal has reported an item mismatch for "${job.title}". Action required.`,
//       jobId: job.id,
//       timestamp: new Date().toISOString(),
//       read: false,
//       actionRequired: true,
//       priority: "urgent",
//     };

//     // Add notification with WhatsApp fallback
//     addNotificationWithWhatsApp(notification);
//   };

//   // Enhanced item mismatch handling using SupportHandlers
//   const handleItemMismatch = () => {
//     if (selectedJob && user) {
//       const dispute = supportHandlers.handleItemMismatch({
//         expectedItem: selectedJob.title,
//         actualItem: "Item does not match description",
//         notes: "Pal reports significant discrepancy during pickup verification",
//       });

//       if (dispute) {
//         setCurrentDispute(dispute);
//         setDisputeTimer(supportHandlers.calculateDisputeTimeout("medium"));

//         const updatedJob = {
//           ...selectedJob,
//           status: "disputed" as const,
//           disputeReason: dispute.reason,
//           disputeDetails: dispute.description,
//           disputeTimestamp: dispute.timestamp,
//           disputeTimeoutAt: dispute.timeoutAt,
//           isDisputed: true,
//         };

//         handleJobUpdate(updatedJob);
//         createDisputeNotification(updatedJob);
//         navigateToScreen("pal-waiting");
//       }
//     }
//   };

//   // Enhanced dispute timeout handling
//   // Remove the duplicate handleDisputeTimeout and use this corrected version
//   const handleDisputeTimeout = () => {
//     if (selectedJob && currentDispute) {
//       const compensation = supportHandlers.calculateCompensation(
//         currentDispute.reason,
//         selectedJob.acceptedBidAmount || selectedJob.value,
//         user?.rating || 0.95
//       );

//       // Create updatedJob before using it
//       const updatedJob: DeliveryJob = {
//         ...selectedJob,
//         status: "cancelled",
//         isDisputed: false,
//       };

//       // Ensure 'user' is non-null before accessing properties
//       if (user && user.id === selectedJob.selectedPalId) {
//         const updatedUser: User = {
//           id: user.id,
//           userName: user.userName,
//           firstName: user.firstName,
//           lastName: user.lastName,
//           name: user.name,
//           email: user.email,
//           phone: user.phone,
//           role: user.role,
//           profileImage: user.profileImage,
//           walletBalance:
//             (user.walletBalance || 0) + compensation.palCompensation,
//           rating: user.rating,
//           totalDeliveries: user.totalDeliveries,
//           joinedDate: user.joinedDate,
//           // vehicleType: user.vehicleType,
//           isVerified: user.isVerified,
//           governmentIdUrl: user.governmentIdUrl,
//           governmentIdStatus: user.governmentIdStatus,
//           activeEscrows: user.activeEscrows,
//           transactions: user.transactions,
//           bankAccounts: user.bankAccounts,
//           cards: user.cards,
//           preferences: user.preferences,
//           location: user.location,
//         };

//         handleUserUpdate(updatedUser);
//         handleJobUpdate(updatedJob);

//         setCurrentDispute(null);
//         navigateToScreen("cancellation-confirmation");
//       }
//     }
//   };

//   // Enhanced sender resolution handling
//   const handleEditDetails = (updatedJob: DeliveryJob) => {
//     const jobWithResolvedDispute = {
//       ...updatedJob,
//       status: "assigned" as const,
//       isDisputed: false,
//       disputeReason: undefined,
//       disputeDetails: undefined,
//     };

//     handleJobUpdate(jobWithResolvedDispute);
//     setCurrentDispute(null);
//     setDisputeTimer(0);
//     navigateToScreen("dashboard");
//   };

//   // Enhanced order cancellation handling
//   const handleCancelOrder = () => {
//     if (selectedJob && user && currentDispute) {
//       const compensation = supportHandlers.calculateCompensation(
//         currentDispute.reason,
//         selectedJob.acceptedBidAmount || selectedJob.value,
//         user?.rating || 0.95
//       );

//       const updatedJob = {
//         ...selectedJob,
//         status: "disputed" as const,
//         disputeReason: currentDispute.reason,
//         disputeDetails: currentDispute.description,
//         disputeTimestamp: currentDispute.timestamp,
//         disputeTimeoutAt: currentDispute.timeoutAt,
//         isDisputed: true,
//         disputeCompensation: compensation,
//       };

//       handleJobUpdate(updatedJob);
//       createDisputeNotification(updatedJob);
//       navigateToScreen("pal-waiting");
//     }
//   };

//   // Enhanced navigation logic for MyDeliveriesScreen
//   const handleMyDeliveriesJobSelect = (job: DeliveryJob) => {
//     handleJobSelect(job);

//     if (job.status === "disputed" && activeRole === "sender") {
//       navigateToScreen("sender-resolution");
//     } else if (job.status === "bidding" && activeRole === "sender") {
//       navigateToScreen("bids");
//     } else if (["in-transit", "picked-up"].includes(job.status)) {
//       navigateToScreen("tracking");
//     } else if (job.status === "assigned" && activeRole === "pal") {
//       navigateToScreen("pickup-confirmation");
//     } else if (
//       job.status === "delivered" &&
//       (activeRole === "sender" || activeRole === "receiver")
//     ) {
//       navigateToScreen("ratings");
//     } else {
//       if (["assigned", "in-transit", "picked-up"].includes(job.status)) {
//         navigateToScreen("tracking");
//       }
//     }
//   };

//   // Enhanced AcceptedBids job selection with NavigationManager
//   const handleAcceptedBidsJobSelect = (job: DeliveryJob) => {
//     console.log(
//       "🔥 ENHANCED ACCEPTED BIDS JOB SELECTED:",
//       job.title,
//       "Status:",
//       job.status
//     );
//     console.log("📍 Enhanced Job Details:", {
//       id: job.id,
//       status: job.status,
//       location: job.pickupLocation,
//       value: job.acceptedBidAmount || job.value,
//     });
//     console.log("💡 Enhanced smart navigation system engaged!");

//     handleJobSelect(job);
//     const targetScreen = navigationManager.handlePalJobNavigation(job);
//     if (targetScreen) {
//       setCurrentScreen(targetScreen);
//     }
//   };

//   // Enhanced notification handling
//   const handleNotificationJobSelect = (job: DeliveryJob) => {
//     handleJobSelect(job);
//     if (job.status === "disputed" && activeRole === "sender") {
//       navigateToScreen("item-mismatch-notification");
//     }
//   };

//   // 🔥 NOTIFICATION HANDLERS
//   const handleMarkNotificationAsRead = (notificationId: string) => {
//     setNotifications((prev) =>
//       prev.map((notification) =>
//         notification.id === notificationId
//           ? { ...notification, read: true }
//           : notification
//       )
//     );
//   };

//   const handleMarkAllNotificationsAsRead = () => {
//     setNotifications((prev) =>
//       prev.map((notification) => ({ ...notification, read: true }))
//     );
//   };

//   // 🔥 NOTIFICATION TAB NAVIGATION HANDLERS
//   const handleAlertsClick = () => {
//     console.log("🚨 Alerts button clicked - opening Alerts tab");
//     setNotificationTab("alerts");
//     navigateToScreen("notifications");
//   };

//   const handleGeneralNotificationsClick = () => {
//     console.log(
//       "🔔 General Notifications button clicked - opening General tab"
//     );
//     setNotificationTab("general");
//     navigateToScreen("notifications");
//   };

//   const handleNotificationAction = (notification: Notification) => {
//     console.log(
//       "🔔 Notification Action:",
//       notification.type,
//       notification.title
//     );

//     // Set selected notification for context
//     setSelectedNotification(notification);

//     switch (notification.type) {
//       case "item-edit-request":
//         // Navigate to item edit screen
//         if (notification.jobId) {
//           const job = deliveryJobs.find((j) => j.id === notification.jobId);
//           if (job) {
//             handleJobSelect(job);
//             navigateToScreen("item-edit");
//           }
//         }
//         break;

//       case "bid-placed":
//         // Navigate to bids screen
//         if (notification.jobId) {
//           const job = deliveryJobs.find((j) => j.id === notification.jobId);
//           if (job) {
//             handleJobSelect(job);
//             navigateToScreen("bids");
//           }
//         }
//         break;

//       case "delivery-assigned":
//       case "delivery-update":
//         // Navigate to tracking screen
//         if (notification.jobId) {
//           const job = deliveryJobs.find((j) => j.id === notification.jobId);
//           if (job) {
//             handleJobSelect(job);
//             if (activeRole === "pal" && job.status === "assigned") {
//               navigateToScreen("pickup-confirmation");
//             } else {
//               navigateToScreen("tracking");
//             }
//           }
//         }
//         break;

//       case "delivery-completed":
//         // Navigate to ratings screen
//         if (notification.jobId) {
//           const job = deliveryJobs.find((j) => j.id === notification.jobId);
//           if (job) {
//             handleJobSelect(job);
//             navigateToScreen("ratings");
//           }
//         }
//         break;

//       case "payment-received":
//       case "wallet-topup":
//         // Navigate to wallet screen
//         navigateToScreen("wallet");
//         break;

//       case "dispute-flagged":
//         // Navigate to appropriate dispute screen
//         if (notification.jobId) {
//           const job = deliveryJobs.find((j) => j.id === notification.jobId);
//           if (job) {
//             handleJobSelect(job);
//             if (activeRole === "sender") {
//               navigateToScreen("sender-resolution");
//             } else {
//               navigateToScreen("item-mismatch-notification");
//             }
//           }
//         }
//         break;

//       case "rating-received":
//         // Navigate to ratings screen
//         navigateToScreen("ratings");
//         break;

//       case "promo-offer":
//         // Navigate to dashboard to use promo
//         navigateToScreen("dashboard");
//         break;

//       case "delivery-posted":
//         // Navigate to my deliveries to see the posted delivery
//         if (notification.jobId) {
//           const job = deliveryJobs.find((j) => j.id === notification.jobId);
//           if (job) {
//             handleJobSelect(job);
//           }
//         }
//         navigateToScreen("dashboard");
//         break;

//       default:
//         // For system messages, just mark as read and stay on notifications
//         console.log("📄 System notification viewed:", notification.title);
//         break;
//     }
//   };

//   // 🔥 ITEM EDIT COMPLETION HANDLER
//   const handleItemEditComplete = (itemData: Item) => {
//     console.log("✏️ Item Edit Complete:", itemData.title);

//     if (!selectedJob) {
//     console.error("❌ Item edit attempted without selected job");
//     return;
//   }

//      const updatedJob: DeliveryJob = {
//     ...selectedJob,
//     title: itemData.title,
//     description: itemData.description,
//     category: itemData.category,
//     itemSize: itemData.size as ItemSize,
//     weight: itemData.weight,
//   };

//     // Update the job
//     handleJobUpdate(updatedJob);

//     // Create notification for the Pal to retry scanning
//     if (updatedJob.selectedPalId) {
//       const palNotification: Notification = {
//         id: `pal-retry-${Date.now()}`,
//         userId: updatedJob.selectedPalId,
//         type: "item-verified",
//         title: "Item Details Updated - Retry Verification",
//         message: `${
//           user?.name || "The sender"
//         } has updated the item description for "${
//           updatedJob.title
//         }". You can now try scanning again.`,
//         timestamp: new Date().toISOString(),
//         read: false,
//         actionRequired: true,
//         jobId: updatedJob.id,
//         metadata: {
//           senderName: user?.name,
//           updatedFields: ["title", "description", "weight", "itemSize"],
//         },
//       };

//       // In a real app, this would be sent to the Pal's notification system
//       console.log("📤 Pal Notification Created:", palNotification);
//     }

//     // Navigate back to dashboard
//     navigateToScreen("dashboard");
//   };

//   // Enhanced floating action button using NavigationManager
//   const handleFloatingActionClick = () => {
//     console.log(
//       "🚀 Enhanced Floating Action: Clicked with active role:",
//       activeRole
//     );
//     const targetScreen = navigationManager.handleRoleBasedNavigation(activeRole);
//     if (targetScreen) {
//       setCurrentScreen(targetScreen);
//     }
//   };

//   // Type guard to safely detect support-agent related transient fields on chat threads
//   const isSupportAwaitingThread = (
//     thread: ChatThread | null | undefined
//   ): thread is ChatThread & {
//     awaitingUserChoice?: boolean;
//     supportAgentState?: string;
//   } => {
//     if (!thread) return false;
//     // Use unknown -> Record to check runtime properties without using `any`
//     const record = thread as unknown as Record<string, unknown>;
//     return (
//       record["awaitingUserChoice"] === true &&
//       typeof record["supportAgentState"] === "string"
//     );
//   };

//   const renderScreen = () => {
//     // Safety check to prevent infinite loops
//     if (!currentScreen) {
//       console.warn("No current screen set, defaulting to auth");
//       setCurrentScreen("auth");
//       return null;
//     }

//     const commonProps = {
//       user,
//       onBack: goBack,
//       onNavigate: navigateToScreen,
//       handleCall,
//       getUserJobs: (userId: string, userRole: UserRole) =>
//         getUserJobs(userId, userRole, deliveryJobs),
//     };

//     console.log(
//       "🖥️ Complete Flow Simulation - Rendering screen:",
//       currentScreen,
//       "User exists:",
//       !!user,
//       "User role:",
//       user?.role,
//       "Auth loading:",
//       authLoading
//     );

//     // Debug: Log exact currentScreen value with type
//     console.log("🔍 DEBUG currentScreen:", JSON.stringify(currentScreen), "Type:", typeof currentScreen);

//     switch (currentScreen) {
//       // Website Screens
//       // case 'website-home':
//       //   return (
//       //     <WebsiteLayout onNavigate={navigateToScreen}>
//       //       <HomePage onNavigate={navigateToScreen} />
//       //     </WebsiteLayout>
//       //   );

//       // case 'website-about':
//       //   return (
//       //     <WebsiteLayout onNavigate={navigateToScreen}>
//       //       <AboutPage onNavigate={navigateToScreen} />
//       //     </WebsiteLayout>
//       //   );

//       // case 'website-how-it-works':
//       //   return (
//       //     <WebsiteLayout onNavigate={navigateToScreen}>
//       //       <HowItWorksPage onNavigate={navigateToScreen} />
//       //     </WebsiteLayout>
//       //   );

//       // case 'website-pricing':
//       //   return (
//       //     <WebsiteLayout onNavigate={navigateToScreen}>
//       //       <PricingPage onNavigate={navigateToScreen} />
//       //     </WebsiteLayout>
//       //   );

//       // case 'website-safety':
//       //   return (
//       //     <WebsiteLayout onNavigate={navigateToScreen}>
//       //       <SafetyPage onNavigate={navigateToScreen} />
//       //     </WebsiteLayout>
//       //   );

//       // case 'website-faqs':
//       //   return (
//       //     <WebsiteLayout onNavigate={navigateToScreen}>
//       //       <FAQsPage onNavigate={navigateToScreen} />
//       //     </WebsiteLayout>
//       //   );

//       // case 'website-contact':
//       //   return (
//       //     <WebsiteLayout onNavigate={navigateToScreen}>
//       //       <ContactPage onNavigate={navigateToScreen} />
//       //     </WebsiteLayout>
//       //   );

//       // case 'website-terms':
//       //   return (
//       //     <WebsiteLayout onNavigate={navigateToScreen}>
//       //       <TermsPage onNavigate={navigateToScreen} />
//       //     </WebsiteLayout>
//       //   );

//       // case 'website-privacy':
//       //   return (
//       //     <WebsiteLayout onNavigate={navigateToScreen}>
//       //       <PrivacyPage onNavigate={navigateToScreen} />
//       //     </WebsiteLayout>
//       //   );

//       // case 'website-become-pal':
//       //   return (
//       //     <WebsiteLayout onNavigate={navigateToScreen}>
//       //       <BecomePalPage onNavigate={navigateToScreen} />
//       //     </WebsiteLayout>
//       //   );

//       // case 'website-become-proxy':
//       //   return (
//       //     <WebsiteLayout onNavigate={navigateToScreen}>
//       //       <BecomeProxyPage onNavigate={navigateToScreen} />
//       //     </WebsiteLayout>
//       //   );

//       // case 'website-send-items':
//       //   return (
//       //     <WebsiteLayout onNavigate={navigateToScreen}>
//       //       <SendItemsPage onNavigate={navigateToScreen} />
//       //     </WebsiteLayout>
//       //   );

//       // case 'splash':
//       //   return <SplashScreen />;

//       // case 'onboarding':
//       //   return <OnboardingScreen onComplete={() => navigateToScreen('auth')} />;

//       case 'auth':
//         console.log('🔥 RENDERING COMPLETE FLOW SIMULATION AUTH SCREEN');
//         return (
//           <AuthScreen
//             onLogin={handleLogin}
//             // onDemoLogin={handleDemoLogin}
//           />
//         );

//       case "dashboard":
//         // Wait for auth to finish loading before checking user
//         if (authLoading) {
//           return screenRenderer.renderLoadingScreen(
//             "Loading user data...",
//             true
//           );
//         }

//         if (!user) {
//           console.warn(
//             "⚠️ Dashboard: Accessed without user, redirecting to auth"
//           );
//           setTimeout(() => navigateToScreen("auth"), 0);
//           return screenRenderer.renderLoadingScreen(
//             "Redirecting to login...",
//             true
//           );
//         }
//         console.log("🔥 RENDERING COMPLETE FLOW SIMULATION DASHBOARD");
//         return (
//           <DashboardScreen
//             {...commonProps}
//             activeRole={activeRole}
//             onNavigate={navigateToScreen}
//             onJobSelect={(job) => {
//               if (job.status === "disputed" && activeRole === "sender") {
//                 handleNotificationJobSelect(job);
//               } else {
//                 handleJobSelect(job);
//               }
//             }}
//             onRoleChange={handleRoleChange}
//             userJobs={commonProps.getUserJobs(user?.id || "", activeRole)}
//             allJobs={deliveryJobs}
//             proxyItems={proxyItems}
//             selectedRoute={selectedRoute}
//             onRouteSelect={setSelectedRoute}
//             notifications={notifications}
//             onActionClick={handleActionClick}
//           />
//         );

//       case "post-delivery":
//         return (
//           <PostDeliveryScreen
//             onBack={goBack}
//             onSubmit={(newJob) => {
//               console.log(
//                 "🔥 POST DELIVERY SUBMISSION: Automatically creating and updating delivery order"
//               );
//               console.log(
//                 "📦 New Job Created:",
//                 newJob.title,
//                 "ID:",
//                 newJob.id
//               );

//               // Add the new job to the delivery jobs list
//               handleNewJob(newJob);

//               // Set the newly created job as the selected job for immediate availability
//               setSelectedJob(newJob);

//               // Create a success notification for the sender
//               const successNotification: Notification = {
//                 id: `delivery-posted-${Date.now()}`,
//                 userId: user?.id || "",
//                 type: "delivery-posted",
//                 title: "Delivery Request Posted Successfully! 🎯",
//                 message: `Your delivery "${newJob.title}" has been posted and is now live. Pals can start bidding immediately.`,
//                 timestamp: new Date().toISOString(),
//                 read: false,
//                 actionRequired: false,
//                 jobId: newJob.id,
//                 metadata: {
//                   jobTitle: newJob.title,
//                   value: newJob.value,
//                   status: newJob.status,
//                 },
//               };

//               setNotifications((prev) => [successNotification, ...prev]);

//               console.log("✅ AUTOMATIC ORDER CREATION COMPLETE");
//               console.log("📍 Job Status:", newJob.status);
//               console.log("💰 Job Value:", newJob.value);
//               console.log(
//                 "🎯 Order is now available in My Sent Deliveries immediately!"
//               );
//             }}
//             onNavigateToMyDeliveries={() => navigateToScreen("dashboard")}
//             onLocationSelect={(type) => {
//               setLocationSelectionContext({
//                 type,
//                 returnScreen: "post-delivery",
//               });
//               navigateToScreen("location-selection");
//             }}
//             onChooseFavoritePal={(jobData) => {
//               setFavoritePalJobData(jobData);
//               navigateToScreen("favorite-pal-input");
//             }}
//             userId={user?.id || ""}
//           />
//         );

//       case "bids":
//         return (
//           <BidsScreen
//             job={selectedJob}
//             onBack={goBack}
//             onBidSelect={handleBidSelect}
//             onAcceptBid={() => navigateToScreen("escrow-payment")}
//             onViewProfile={(bid) => {
//               const pal = getPalDetails(bid.palId);
//               if (pal) {
//                 handlePalSelect(pal);
//                 navigateToScreen("pal-profile");
//               }
//             }}
//             onOpenChat={handleUniversalChat}
//           />
//         );

//       case "pal-profile":
//         return (
//           <PalProfileScreen
//             pal={selectedPal}
//             onBack={goBack}
//             onCall={handleCall}
//             onMessage={() => {
//               if (selectedJob) {
//                 handleUniversalChat(selectedJob);
//               }
//             }}
//           />
//         );

//       case "escrow-payment":
//         return (
//           <EscrowPaymentScreen
//             bid={selectedBid ?? undefined}
//             job={selectedJob}
//             user={user ?? undefined}
//             onBack={goBack}
//             onPaymentComplete={(updatedJob, updatedUser) => {
//               // Update job to "assigned" status (awaiting pickup)
//               handleJobUpdate(updatedJob);

//               // Update user wallet if payment was made from wallet
//               handleUserUpdate(updatedUser);

//               // Create transaction record for escrow payment
//               const escrowTransaction = {
//                 id: `txn-escrow-${Date.now()}`,
//                 userId: updatedUser.id,
//                 type: "escrow_payment",
//                 amount: -(updatedJob.escrowAmount || 0),
//                 status: "completed",
//                 description: `Escrow payment - ${updatedJob.title}`,
//                 jobId: updatedJob.id,
//                 timestamp: new Date().toISOString(),
//                 paymentMethod: "wallet",
//                 reference: `ESC-${updatedJob.id}-001`,
//               };

//               // In a real app, this would be added to the transaction history
//               console.log("💳 Escrow Transaction Created:", escrowTransaction);

//               // Create notification for successful escrow payment
//               const escrowNotification: Notification = {
//                 id: `escrow-success-${Date.now()}`,
//                 userId: updatedUser.id,
//                 type: "payment-processed",
//                 title: "Escrow Payment Successful! ✅",
//                 message: `Your payment of ${formatAmount(
//                   updatedJob.escrowAmount || 0
//                 )} has been secured in escrow. ${
//                   updatedJob.selectedPalName
//                 } has been assigned to your delivery.`,
//                 timestamp: new Date().toISOString(),
//                 read: false,
//                 actionRequired: false,
//                 jobId: updatedJob.id,
//                 metadata: {
//                   escrowAmount: updatedJob.escrowAmount,
//                   palName: updatedJob.selectedPalName,
//                   escrowId: updatedJob.escrowId,
//                 },
//               };

//               setNotifications((prev) => [escrowNotification, ...prev]);

//               // Navigate to payment confirmation
//               navigateToScreen("payment-confirmation");
//             }}
//           />
//         );

//       case "payment-confirmation":
//         return (
//           <PaymentConfirmationScreen
//             job={selectedJob}
//             bid={selectedBid ?? undefined}
//             onBack={goBack}
//             onTrackDelivery={() => navigateToScreen("tracking")}
//             onOpenChat={() => {
//               if (selectedJob) {
//                 handleUniversalChat(selectedJob);
//               }
//             }}
//           />
//         );

//       case "available-jobs":
//         return (
//           <AvailableJobsScreen
//             onBack={goBack}
//             onJobSelect={handleJobSelect}
//             onPlaceBid={(job, bidAmount, message) => {
//               const newBid: Bid = {
//                 id: Date.now().toString(),
//                 palId: user?.id || "",
//                 palName: user?.name || "",
//                 palRating: user?.rating || 4.5,
//                 // vehicleType: user?.vehicleType || "Car",
//                 estimatedTime: "30 minutes",
//                 amount: bidAmount,
//                 message: message,
//                 placedAt: new Date().toISOString(),
//                 canEdit: true,
//               };

//               const updatedJob = {
//                 ...job,
//                 bids: [...job.bids, newBid],
//                 status: "bidding" as const,
//               };

//               handleJobUpdate(updatedJob);

//               // Clear pending bid after successful submission
//               setPendingBid(null);

//               navigateToScreen("dashboard");
//             }}
//             availableJobs={deliveryJobs.filter(
//               (job) => job.status === "pending" && job.senderId !== user?.id
//             )}
//             selectedRoute={selectedRoute}
//             currentUser={user}
//             allJobs={deliveryJobs}
//             onNavigateToWallet={(job, bidAmount) => {
//               // Store pending bid information
//               console.log(
//                 "💰 Storing pending bid for wallet funding:",
//                 job.title,
//                 bidAmount
//               );
//               setPendingBid({
//                 jobId: job.id,
//                 bidAmount: bidAmount,
//                 job: job,
//               });
//               navigateToScreen("wallet-add-funds");
//             }}
//             pendingBid={pendingBid}
//             onClearPendingBid={() => setPendingBid(null)}
//             routeAds={routeAds}
//             onNavigateToRouteAds={() =>
//               navigateToScreen("route-ads-management")
//             }
//           />
//         );

//       case "bid-edit":
//         return (
//           <BidEditScreen
//             bid={selectedBid}
//             job={selectedJob}
//             onBack={goBack}
//             onUpdateBid={(updatedBid) => {
//               if (selectedJob) {
//                 const updatedJob = {
//                   ...selectedJob,
//                   bids: selectedJob.bids.map((bid) =>
//                     bid.id === updatedBid.id ? updatedBid : bid
//                   ),
//                 };
//                 handleJobUpdate(updatedJob);
//               }
//               navigateToScreen("available-jobs");
//             }}
//           />
//         );

//       // 🔥 FIXED TRACKING SCREEN WITH UNIVERSAL CHAT HANDLER
//       case "tracking":
//         return (
//           <TrackingScreen
//             job={selectedJob}
//             onBack={goBack}
//             onDeliveryComplete={(job) => {
//               if (activeRole === "pal") {
//                 setScanContext("delivery");
//                 navigateToScreen("qr-scanner");
//               } else {
//                 navigateToScreen("delivery-completion");
//               }
//             }}
//             onOpenChat={() => {
//               if (selectedJob) {
//                 handleUniversalChat(selectedJob);
//               }
//             }}
//             onCall={handleCall}
//             userRole={activeRole}
//             onStartPickup={() => {
//               if (activeRole === "pal" && selectedJob?.status === "assigned") {
//                 navigateToScreen("pickup-confirmation");
//               }
//             }}
//             onReceiverUnavailable={() => {
//               setScanContext("receiver-unavailable");
//               navigateToScreen("qr-scanner");
//             }}
//             onEditReceiver={() => {
//               // Navigate to post-delivery-edit screen to edit receiver details
//               navigateToScreen("post-delivery-edit");
//             }}
//             onJobUpdate={(updatedJob) => {
//               console.log(
//                 "📝 Receiver details updated on tracking screen:",
//                 updatedJob.receiverPhone
//               );
//               handleJobUpdate(updatedJob);

//               // Create notification for the Pal about receiver details update
//               if (updatedJob.selectedPalId) {
//                 const palNotification = {
//                   id: `receiver-update-${Date.now()}`,
//                   userId: updatedJob.selectedPalId,
//                   type: "delivery-update" as const,
//                   title: "Receiver Details Updated 📱",
//                   message: `The sender has updated receiver contact information for "${updatedJob.title}". New phone: ${updatedJob.receiverPhone}`,
//                   timestamp: new Date().toISOString(),
//                   read: false,
//                   actionRequired: true,
//                   jobId: updatedJob.id,
//                   metadata: {
//                     newPhone: updatedJob.receiverPhone,
//                     newName: updatedJob.receiverName,
//                     updatedBy: user?.name,
//                   },
//                 };

//                 setNotifications((prev) => [palNotification, ...prev]);
//               }
//             }}
//           />
//         );

//       case "delivery-completion":
//         return (
//           <DeliveryCompletionScreen
//             job={selectedJob}
//             user={user}
//             onBack={goBack}
//             onComplete={() => {
//               if (selectedJob) {
//                 handleJobUpdate({ ...selectedJob, status: "delivered" });
//                 navigateToScreen("ratings");
//               }
//             }}
//             onHandToProxy={() => navigateToScreen("proxy-selection")}
//             userRole={activeRole}
//           />
//         );

//       case "proxy-selection":
//         return (
//           <ProxySelectionScreen
//             job={selectedJob}
//             user={user}
//             onBack={goBack}
//             onSelectProxy={(proxyId: string) => {
//               if (selectedJob) {
//                 const updatedJob = {
//                   ...selectedJob,
//                   proxyId: proxyId,
//                   status: "delivered" as const,
//                 };
//                 handleJobUpdate(updatedJob);
//                 navigateToScreen("ratings");
//               }
//             }}
//           />
//         );

//       case "chat":
//         return (
//           <ChatScreen
//             chatThread={selectedChatThread}
//             currentUser={user}
//             onBack={goBack}
//             onSendMessage={(message) => {
//               if (selectedChatThread && user) {
//                 const newMessage: ChatMessage = {
//                   id: Date.now().toString(),
//                   senderId: user.id,
//                   senderName: (user.name || user.email || 'User').split(" ")[0], // Use first name only
//                   senderRole: activeRole,
//                   message: message,
//                   timestamp: new Date().toISOString(),
//                   type: "text",
//                   read: false,
//                 };

//                 const updatedThread = {
//                   ...selectedChatThread,
//                   messages: [...selectedChatThread.messages, newMessage],
//                   lastActivity: new Date().toISOString(),
//                 };

//                 setChatThreads((prev) =>
//                   prev.map((thread) =>
//                     thread.id === updatedThread.id ? updatedThread : thread
//                   )
//                 );
//                 setSelectedChatThread(updatedThread);

//                 // Check if this is a valid option selection for support agent
//                 if (
//                   selectedChatThread?.awaitingUserChoice &&
//                   selectedChatThread?.supportAgentState ===
//                     "awaiting-option-selection"
//                 ) {
//                   // Only process exact quick reply format: "Option 1", "Option 2", etc.
//                   const validQuickReplies = [
//                     "Option 1",
//                     "Option 2",
//                     "Option 3",
//                     "Option 4",
//                   ];
//                   if (validQuickReplies.includes(message.trim())) {
//                     console.log("✅ VALID QUICK REPLY DETECTED:", message);
//                     // User has selected a valid option, handle it
//                     setTimeout(() => {
//                       handleUserOptionSelection(message, updatedThread, user);
//                     }, 1000);
//                   } else {
//                     console.log("❌ INVALID OPTION FORMAT, IGNORING:", message);
//                   }
//                 }
//               }
//             }}
//             onReportIssue={(issue) => {
//               console.log("🚨 Conflict Resolution: Issue Reported", issue);

//               // Create a dispute/issue record
//               const disputeId = `dispute-${Date.now()}`;
//               const issueNotification: Notification = {
//                 id: `issue-${Date.now()}`,
//                 userId: "support-team", // This would go to support
//                 type: "dispute-flagged",
//                 title: `Chat Issue Reported: ${issue.type}`,
//                 message: `${user?.name} reported a ${issue.severity} severity issue: ${issue.description}`,
//                 timestamp: new Date().toISOString(),
//                 read: false,
//                 actionRequired: true,
//                 jobId: selectedJob?.id,
//                 metadata: {
//                   reportedBy: user?.id,
//                   reporterName: user?.name,
//                   issueType: issue.type,
//                   severity: issue.severity,
//                   chatThreadId: selectedChatThread?.id,
//                 },
//               };

//               // In a real app, this would be sent to the support system
//               console.log(
//                 "📤 Issue notification created for support:",
//                 issueNotification
//               );

//               // Add system message to chat
//               if (selectedChatThread && user) {
//                 const systemMessage: ChatMessage = {
//                   id: Date.now().toString(),
//                   senderId: "system",
//                   senderName: "System",
//                   senderRole: "sender",
//                   message: `🚨 Issue reported by ${user.name}: ${issue.type} (${issue.severity} severity). Support has been notified and will respond shortly.`,
//                   timestamp: new Date().toISOString(),
//                   type: "system",
//                   read: true,
//                 };

//                 const updatedThread = {
//                   ...selectedChatThread,
//                   messages: [...selectedChatThread.messages, systemMessage],
//                   lastActivity: new Date().toISOString(),
//                 };

//                 setChatThreads((prev) =>
//                   prev.map((thread) =>
//                     thread.id === updatedThread.id ? updatedThread : thread
//                   )
//                 );
//                 setSelectedChatThread(updatedThread);
//               }
//             }}
//             onRequestMediation={() => {
//               console.log(
//                 "🤝 Conflict Resolution: Mediation Requested - Starting Full Resolution Flow"
//               );

//               if (selectedChatThread && user) {
//                 // Start comprehensive resolution flow
//                 handleFullResolutionFlow(selectedChatThread, user);
//               }
//             }}
//             onContactSupport={() => {
//               console.log("📞 Conflict Resolution: Contacting Support");
//               navigateToScreen("contact-support");
//             }}
//           />
//         );

//       case "wallet":
//         return (
//           <WalletScreen
//             user={user}
//             onBack={goBack}
//             onAddFunds={() => navigateToScreen("wallet-add-funds")}
//             onWithdraw={() => navigateToScreen("wallet-withdraw")}
//             onManagePaymentMethods={() => navigateToScreen("payment-methods")}
//             userRole={activeRole}
//           />
//         );

//       case "wallet-add-funds":
//         return (
//           <WalletAddFundsScreen
//             user={user}
//             onBack={goBack}
//             onBankTransfer={(amount) => {
//               setPaymentContext({
//                 amount,
//                 purpose: "Add Funds",
//                 returnScreen: pendingBid ? "payment-status" : "wallet",
//               });
//               navigateToScreen("bank-transfer");
//             }}
//             onCardPayment={(amount) => {
//               setPaymentContext({
//                 amount,
//                 purpose: "Add Funds",
//                 returnScreen: pendingBid ? "payment-status" : "wallet",
//               });
//               navigateToScreen("card-payment");
//             }}
//             onAddComplete={(amount) => {
//               if (user) {
//                 const updatedUser = {
//                   ...user,
//                   walletBalance: (user.walletBalance || 0) + amount,
//                 };
//                 handleUserUpdate(updatedUser);
//               }

//               // Always go to payment-status screen now for better UX
//               navigateToScreen("payment-status");
//             }}
//           />
//         );

//       case "wallet-withdraw":
//         return (
//           <WalletWithdrawScreen
//             user={user}
//             onBack={goBack}
//             onWithdrawComplete={(amount) => {
//               if (user) {
//                 const updatedUser = {
//                   ...user,
//                   walletBalance: (user.walletBalance || 0) - amount,
//                 };
//                 handleUserUpdate(updatedUser);
//               }
//               navigateToScreen("payment-status");
//             }}
//           />
//         );

//       case "bank-transfer":
//         return (
//           <BankTransferScreen
//             amount={paymentContext?.amount || 0}
//             purpose={paymentContext?.purpose || ""}
//             onBack={goBack}
//             onComplete={() => {
//               if (paymentContext && user) {
//                 const updatedUser = {
//                   ...user,
//                   walletBalance:
//                     (user.walletBalance || 0) + paymentContext.amount,
//                 };
//                 handleUserUpdate(updatedUser);
//                 setPaymentContext(null);
//                 navigateToScreen("payment-status");
//               }
//             }}
//           />
//         );

//       case "card-payment":
//         return (
//           <CardPaymentScreen
//             amount={paymentContext?.amount || 0}
//             purpose={paymentContext?.purpose || ""}
//             onBack={goBack}
//             onComplete={() => {
//               if (paymentContext && user) {
//                 const updatedUser = {
//                   ...user,
//                   walletBalance:
//                     (user.walletBalance || 0) + paymentContext.amount,
//                 };
//                 handleUserUpdate(updatedUser);
//                 setPaymentContext(null);
//                 navigateToScreen("payment-status");
//               }
//             }}
//           />
//         );

//       case "payment-status":
//         return (
//           <PaymentStatusScreen
//             onContinue={() => {
//               // If we have a pending bid, go to available-jobs to complete it
//               if (pendingBid) {
//                 navigateToScreen("available-jobs");
//               } else {
//                 navigateToScreen("wallet");
//               }
//             }}
//             onGoToDashboard={() => {
//               // Clear pending bid and go to dashboard
//               setPendingBid(null);
//               navigateToScreen("dashboard");
//             }}
//             success={true}
//             message="Payment completed successfully!"
//             hasPendingBid={!!pendingBid}
//             pendingBidJobTitle={pendingBid?.job?.title}
//           />
//         );

//       case "location-selection":
//         return (
//           <LocationSelectionScreen
//             locations={nigerianLocations}
//             onBack={goBack}
//             onSelectLocation={(location) => {
//               if (locationSelectionContext) {
//                 handleLocationSelect(location, locationSelectionContext);
//               }
//             }}
//             searchQuery=""
//           />
//         );

//       case "referral":
//         return (
//           <ReferralScreen
//             user={user}
//             onBack={goBack}
//             onNavigate={navigateToScreen}
//           />
//         );

//       // case 'sponsorship':
//       //   return (
//       //     <SponsorshipScreen
//       //       user={user}
//       //       onBack={goBack}
//       //       onPayment={(amount) => {
//       //         setPaymentContext({ amount, purpose: 'Sponsorship', returnScreen: 'referral' });
//       //         navigateToScreen('card-payment');
//       //       }}
//       //       onSponsorSpecificUser={() => navigateToScreen('sponsor-user-search')}
//       //     />
//       //   );

//       case "sponsor-user-search":
//         return (
//           <SponsorUserSearchScreen
//             user={user}
//             onBack={goBack}
//             onSelectUser={(aspiringPal: User) => {
//               setSelectedAspiringPal(aspiringPal);
//               navigateToScreen("sponsor-user-confirmation");
//             }}
//           />
//         );

//       case "sponsor-user-confirmation":
//         // Local interfaces for stronger typing within this block
//         interface EscrowFund {
//           id: string;
//           sponsorId: string;
//           sponsorName: string;
//           beneficiaryId: string;
//           beneficiaryName: string;
//           totalAmount: number;
//           availableAmount: number;
//           usedAmount: number;
//           sponsorCommission?: number;
//           duration: number;
//           startDate: string;
//           endDate: string;
//           status: string;
//           transactions: Transaction[];
//           earnings: {
//             totalEarned: number;
//             pendingReturn: number;
//           };
//         }

//         interface ActiveEscrowItem {
//           id: string;
//           beneficiaryName?: string;
//           amount: number;
//           commissonRate?: number;
//           endDate: string;
//           estimatedEarnings: number;
//         }

//         return (
//           <SponsorUserConfirmationScreen
//             user={user}
//             selectedUserId={selectedAspiringPal?.id || ""}
//             selectedUserName={selectedAspiringPal?.name || ""}
//             onBack={goBack}
//             onConfirm={(
//               amount: number,
//               paymentMethod: string,
//               message: string,
//               sponsorPercentage: number,
//               duration: number
//             ) => {
//               // 🔥 Enhanced Escrow-Based Sponsorship Data
//               setSponsorshipData({
//                 amount,
//                 paymentMethod,
//                 message,
//                 isAnonymous: false,
//                 sponsorPercentage,
//                 duration,
//                 startDate: new Date().toISOString(),
//                 endDate: new Date(
//                   Date.now() + duration * 24 * 60 * 60 * 1000
//                 ).toISOString(),
//                 escrowId: `escrow-${Date.now()}`,
//                 status: "active",
//               });

//               // Create escrow record in sponsored user's account
//               if (selectedAspiringPal && user) {
//                 const escrowFund: EscrowFund = {
//                   id: `escrow-${Date.now()}`,
//                   sponsorId: user.id,
//                   sponsorName: user.name,
//                   beneficiaryId: selectedAspiringPal.id,
//                   beneficiaryName: selectedAspiringPal.name,
//                   totalAmount: amount,
//                   availableAmount: amount,
//                   usedAmount: 0,
//                   sponsorCommission: sponsorPercentage,
//                   duration: duration,
//                   startDate: new Date().toISOString(),
//                   endDate: new Date(
//                     Date.now() + duration * 24 * 60 * 60 * 1000
//                   ).toISOString(),
//                   status: "active",
//                   transactions: [],
//                   earnings: {
//                     totalEarned: 0,
//                     pendingReturn: amount,
//                   },
//                 };

//                 console.log("🔒 ESCROW FUND CREATED:", escrowFund);
//               }

//               // Update user wallet if paying via wallet
//               if (paymentMethod === "wallet" && user) {
//                 const newEscrow: SponsorshipEscrow = {
//                   id: `escrow-${Date.now()}`,
//                   beneficiaryId: selectedAspiringPal?.id || "",
//                   beneficiaryName: selectedAspiringPal?.name || "",
//                   amount: amount,
//                   availableAmount: amount,
//                   usedAmount: 0,
//                   commissionRate: sponsorPercentage,
//                   totalEarnings: amount * (selectedAspiringPal?.role === "pal" ? 0.8 : 0.6) * (sponsorPercentage / 100),
//                   pendingReturn: 0,
//                   startDate: new Date().toISOString(),
//                   endDate: new Date(
//                     Date.now() + duration * 24 * 60 * 60 * 1000
//                   ).toISOString(),
//                   status: "active",
//                 };

//                 const updatedUser: User = {
//                   ...user,
//                   walletBalance: (user.walletBalance || 0) - amount,
//                   // Add to sponsor's escrow portfolio
//                   activeEscrows: [
//                     ...(user.activeEscrows || []),
//                     newEscrow,
//                   ],
//                 };
//                 handleUserUpdate(updatedUser);
//               }

//               // Navigate to success screen
//               navigateToScreen("sponsorship-success");
//             }}
//           />
//         );

//       case "sponsorship-success":
//         return (
//           <SponsorshipSuccessScreen
//             beneficiaryName={selectedAspiringPal?.name || ""}
//             amount={sponsorshipData?.amount || 0}
//             commission={sponsorshipData?.sponsorPercentage || 15}
//             duration={sponsorshipData?.duration || 90}
//             onContinue={() => {
//               // Clean up sponsorship data
//               setSelectedAspiringPal(null);
//               setSponsorshipData(null);
//               // Navigate home
//               navigateToScreen("dashboard");
//             }}
//           />
//         );

//       case "sponsorship-management":
//         return (
//           <SponsorshipManagementScreen
//             user={user}
//             onBack={goBack}
//             onNavigate={navigateToScreen}
//           />
//         );

//       case "settings":
//         return (
//           <SettingsScreen
//             user={user}
//             onBack={goBack}
//             onNavigate={navigateToScreen}
//             onLogout={() => {
//               console.log("🚪 Logout: User logged out");
//               // Note: The auth context's logout will handle clearing the user
//               navigateToScreen("auth");
//             }}
//           />
//         );

//       case "profile-information":
//         return (
//           <ProfileInformationScreen
//             onBack={goBack}
//             onUpdateUser={handleUserUpdate}
//             // Removed: currentUser prop - ProfileInformationScreen now fetches from API
//           />
//         );

//       case "verification":
//         return (
//           <VerificationScreen
//             user={user}
//             onBack={goBack}
//             onUpdateUser={handleUserUpdate}
//           />
//         );

//       case "payment-methods":
//         return (
//           <PaymentMethodsScreen onBack={() => navigateToScreen("settings")} />
//         );

//       case "help-center":
//         return (
//           <HelpCenterScreen
//             user={user}
//             onBack={() => navigateToScreen("settings")}
//             onContactSupport={() => navigateToScreen("contact-support")}
//           />
//         );

//       case "contact-support":
//         return (
//           <ContactSupportScreen
//             user={user}
//             onBack={() => navigateToScreen("help-center")}
//           />
//         );

//       // 🔥 ENHANCED RECEIVER DASHBOARD WITH UNIVERSAL CHAT FUNCTIONALITY
//       case "receiver-dashboard":
//         console.log("🔥 RENDERING ENHANCED RECEIVER FLOW WITH UNIVERSAL CHAT");
//         return (
//           <ReceiverConfirmationScreen
//             job={selectedJob}
//             onBack={() => navigateToScreen("dashboard")}
//             onConfirmReceipt={() => {
//               if (selectedJob) {
//                 handleJobSelect(selectedJob);
//                 navigateToScreen("delivery-confirmation");
//               }
//               navigateToScreen("receiver-confirmation");
//             }}
//           />
//         );

//       // 🔥 ENHANCED PROXY DASHBOARD WITH COMPLETE FUNCTIONALITY
//       case "proxy-dashboard":
//         console.log("🔥 RENDERING COMPLETE PROXY FLOW SIMULATION");
//         return (
//           <ProxyDashboard
//             onBack={() => navigateToScreen("dashboard")}
//             proxyItems={proxyItems}
//             onItemUpdate={(updatedItem) => {
//               setProxyItems((prev) =>
//                 prev.map((item) =>
//                   item.id === updatedItem.id ? updatedItem : item
//                 )
//               );
//             }}
//             onNotifyReceiver={(item) => {
//               // Show "one more attempt left" and update notification attempts
//               const updatedItem: ProxyItem = {
//                 ...item,
//                 status: "ready-pickup" as const,
//                 notificationAttempts: (item.notificationAttempts || 0) + 1,
//               };
//               setProxyItems((prev) =>
//                 prev.map((i) => (i.id === updatedItem.id ? updatedItem : i))
//               );
//               console.log(
//                 "📞 Proxy notifying receiver:",
//                 item.receiverName,
//                 "Attempts:",
//                 updatedItem.notificationAttempts
//               );
//             }}
//             onHandoverToReceiver={(item) => {
//               setSelectedProxyItem(item);
//               navigateToScreen("proxy-to-receiver-handover");
//             }}
//             onOpenChat={(item) => {
//               // Find the delivery job associated with this proxy item
//               if (item.jobId) {
//                 const job = deliveryJobs.find((j) => j.id === item.jobId);
//                 if (job) {
//                   handleUniversalChat(job);
//                 }
//               }
//             }}
//             onCall={handleCall}
//             onStartScan={(item) => {
//               setScanningProxyItem(item);
//               navigateToScreen("proxy-item-scan");
//             }}
//             user={user}
//           />
//         );

//       case "ratings":
//         return (
//           <RatingsScreen
//             onBack={() => navigateToScreen("dashboard")}
//             job={selectedJob}
//             userRole={activeRole}
//             onRatingComplete={() => {
//               if (selectedJob) {
//                 handleJobUpdate({ ...selectedJob, status: "completed" });
//               }
//             }}
//             onNavigateToDashboard={() => navigateToScreen("dashboard")}
//           />
//         );

//       case "qr-scanner":
//         return (
//           <QRScannerScreen
//             onScanSuccess={(code) => {
//               console.log("QR Code scanned:", code);
//               // For demo purposes, just navigate back
//               if (scanContext === "pickup") {
//                 navigateToScreen("pickup-confirmation");
//               } else if (scanContext === "delivery") {
//                 navigateToScreen("tracking");
//               } else if (scanContext === "proxy-handover") {
//                 navigateToScreen("proxy-dashboard");
//               } else {
//                 navigateToScreen("tracking");
//               }
//             }}
//             job={selectedJob}
//             user={user}
//             onBack={() => {
//               if (scanContext === "pickup") {
//                 navigateToScreen("pickup-confirmation");
//               } else if (scanContext === "delivery") {
//                 navigateToScreen("tracking");
//               } else if (scanContext === "proxy-handover") {
//                 navigateToScreen("proxy-dashboard");
//               } else {
//                 navigateToScreen("tracking");
//               }
//             }}
//             onComplete={() => {
//               setScanCompleted(true);
//               if (selectedJob) {
//                 if (scanContext === "pickup") {
//                   handleJobUpdate({ ...selectedJob, status: "picked-up" });
//                   navigateToScreen("delivery-progress");
//                 } else if (scanContext === "delivery") {
//                   handleJobUpdate({ ...selectedJob, status: "delivered" });
//                   // Check if we came from receiver confirmation
//                   if (activeRole === "receiver") {
//                     navigateToScreen("delivery-completed");
//                   } else {
//                     navigateToScreen("ratings");
//                   }
//                 } else if (scanContext === "proxy-handover") {
//                   navigateToScreen("proxy-dashboard");
//                 } else if (scanContext === "receiver-unavailable") {
//                   navigateToScreen("proxy-selection");
//                 }
//               }
//             }}
//             userRole={activeRole}
//             scanMode={scanContext}
//             verificationRetries={verificationRetries}
//             onRetryVerification={() =>
//               setVerificationRetries((prev) => prev + 1)
//             }
//             onPalOverride={() => {
//               setScanCompleted(true);
//               if (selectedJob) {
//                 if (scanContext === "pickup") {
//                   handleJobUpdate({ ...selectedJob, status: "picked-up" });
//                   navigateToScreen("delivery-progress");
//                 } else if (scanContext === "delivery") {
//                   handleJobUpdate({ ...selectedJob, status: "delivered" });
//                   // Check if we came from receiver confirmation
//                   if (activeRole === "receiver") {
//                     navigateToScreen("delivery-completed");
//                   } else {
//                     navigateToScreen("ratings");
//                   }
//                 }
//               }
//             }}
//             onItemMismatch={handleItemMismatch}
//           />
//         );

//       // 🔥 FIXED PICKUP CONFIRMATION WITH UNIVERSAL CHAT
//       case "pickup-confirmation":
//         return (
//           <PickupConfirmationScreen
//             job={selectedJob}
//             user={user}
//             onBack={() => navigateToScreen("accepted-bids")}
//             onConfirmPickup={() => {
//               if (selectedJob) {
//                 handleJobUpdate({ ...selectedJob, status: "picked-up" });

//                 navigateToScreen("delivery-progress");
//               }
//             }}
//             onOpenChat={() => {
//               if (selectedJob) {
//                 handleUniversalChat(selectedJob);
//               }
//             }}
//             onCall={(phone: string) => handleCall(phone)}
//           />
//         );

//       case "pickup-verification":
//         return (
//           <PickupVerificationScreen
//             job={selectedJob}
//             user={user}
//             onBack={() => navigateToScreen("pickup-confirmation")}
//             onVerificationComplete={() => {
//               if (selectedJob) {
//                 handleJobUpdate({ ...selectedJob, status: "picked-up" });
//                 navigateToScreen("delivery-progress");
//               }
//             }}
//           />
//         );

//       case "handover-qr":
//         if (!selectedJob) {
//           return <div>No job selected for QR handover.</div>;
//         }

//         if (activeRole !== "pal") {
//           return (
//             <div>Only delivery Pals can access the handover QR screen.</div>
//           );
//         }

//         if (!user) {
//           return <div>User not found.</div>;
//         }

//         return (
//           <HandoverQRScreen
//             deliveryId={selectedJob.id}
//             itemTitle={selectedJob.title}
//             handoverCode=""
//             onBack={() => navigateToScreen("tracking")}
//           />
//         );

//       // Enhanced AcceptedBidsScreen case
//       case "accepted-bids":
//         console.log("🔥 RENDERING COMPLETE PAL ACCEPTED BIDS SIMULATION");
//         // Get ALL jobs for the Pal (including completed ones for the completed toggle)
//         const allPalJobs = deliveryJobs.filter(
//           (job) =>
//             job.selectedPalId === user?.id &&
//             [
//               "assigned",
//               "picked-up",
//               "in-transit",
//               "delivered",
//               "completed",
//             ].includes(job.status)
//         );
//         console.log("📦 All Pal jobs count:", allPalJobs.length);
//         console.log(
//           "📦 All Pal jobs:",
//           allPalJobs.map(
//             (j) =>
//               `${j.title} (${j.status}) - ${formatAmount(
//                 j.acceptedBidAmount || j.value
//               )}`
//           )
//         );

//         return (
//           <AcceptedBidsScreen
//             onBack={() => navigateToScreen("dashboard")}
//             onViewDetails={handleAcceptedBidsJobSelect}
//             acceptedJobs={allPalJobs}
//             onOpenChat={handleUniversalChat}
//             onCall={handleCall}
//             user={user}
//           />
//         );

//       // 🔥 FIXED DELIVERY PROGRESS WITH UNIVERSAL CHAT
//       case "delivery-progress":
//         return (
//           <DeliveryProgressScreen
//             job={selectedJob}
//             user={user}
//             onBack={() => navigateToScreen("pickup-confirmation")}
//             onCompleteDelivery={() => navigateToScreen("delivery-confirmation")}
//             onCallReceiver={handleCall}
//             onOpenChat={handleUniversalChat}
//             onNavigate={navigateToScreen}
//           />
//         );

//       // 🔥 FIXED DELIVERY CONFIRMATION WITH UNIVERSAL CHAT
//       case "delivery-confirmation":
//         return (
//           <DeliveryConfirmationScreen
//             job={selectedJob}
//             user={user}
//             onBack={() => navigateToScreen("delivery-progress")}
//             onDeliveryComplete={() => {
//               if (selectedJob) {
//                 handleJobUpdate({ ...selectedJob, status: "delivered" });
//                 navigateToScreen("ratings");
//               }
//             }}
//             onCallReceiver={handleCall}
//             onFindProxy={() => navigateToScreen("proxy-selection")}
//           />
//         );

//       case "arrival-confirmation":
//         return (
//           <ArrivalConfirmationScreen
//             job={selectedJob}
//             user={user}
//             onBack={() => navigateToScreen("delivery-progress")}
//             onConfirmArrival={() => {
//               // Update job status to indicate arrival
//               if (selectedJob) {
//                 const updatedJob = {
//                   ...selectedJob,
//                   status: "arrived" as const,
//                   arrivedAt: new Date().toISOString(),
//                 };
//                 handleJobUpdate(updatedJob);

//                 // Create real-time notifications for sender and receiver
//                 const arrivalNotifications = [
//                   {
//                     id: `arrival-sender-${Date.now()}`,
//                     userId: selectedJob.senderId,
//                     type: "delivery-update" as const,
//                     title: "Your Pal has arrived! 🎯",
//                     message: `${
//                       user?.name || "Your Pal"
//                     } has arrived at the delivery location for "${
//                       selectedJob.title
//                     }". The handover will begin shortly.`,
//                     timestamp: new Date().toISOString(),
//                     read: false,
//                     actionRequired: false,
//                     jobId: selectedJob.id,
//                     metadata: {
//                       palName: user?.name,
//                       arrivalTime: new Date().toISOString(),
//                       location: selectedJob.dropoffLocation,
//                     },
//                   },
//                 ];

//                 if (selectedJob.receiverId) {
//                   arrivalNotifications.push({
//                     id: `arrival-receiver-${Date.now()}`,
//                     userId: selectedJob.receiverId,
//                     type: "delivery-update" as const,
//                     title: "Your delivery Pal has arrived! 📦",
//                     message: `${
//                       user?.name || "Your Pal"
//                     } is now at your location with your "${
//                       selectedJob.title
//                     }" package. Please prepare to receive your delivery.`,
//                     timestamp: new Date().toISOString(),
//                     read: false,
//                     actionRequired: true,
//                     jobId: selectedJob.id,
//                     metadata: {
//                       palName: user?.name,
//                       arrivalTime: new Date().toISOString(),
//                       location: selectedJob.dropoffLocation,
//                     },
//                   });
//                 }

//                 setNotifications((prev) => [...arrivalNotifications, ...prev]);

//                 // Navigate to delivery confirmation for final handover
//                 navigateToScreen("delivery-confirmation");
//               }
//             }}
//             onCallReceiver={handleCall}
//             onOpenChat={handleUniversalChat}
//             onUploadPhoto={() => {
//               // Handle photo upload for proof of arrival
//               console.log("📸 Uploading arrival photo");
//             }}
//             onScanQR={() => {
//               // Handle QR code scanning for verification
//               setScanContext("delivery");
//               navigateToScreen("qr-scanner");
//             }}
//             onGenerateOTP={() => {
//               // Handle OTP generation for secure handover
//               console.log("🔑 Generating OTP for secure handover");
//             }}
//           />
//         );

//       case "item-mismatch-notification":
//         return (
//           <ItemMismatchNotificationScreen
//             job={selectedJob}
//             user={user}
//             onBack={() => navigateToScreen("dashboard")}
//             onViewMyDeliveries={() => navigateToScreen("my-deliveries")}
//             onContactPal={handleCall}
//             timeRemaining={disputeTimer}
//           />
//         );

//       case "sender-resolution": {
//         const senderResolutionProps: React.ComponentProps<
//           typeof SenderResolutionScreen
//         > = {
//           job: selectedJob,
//           user: user,
//           onBack: () => navigateToScreen("my-deliveries"),
//           onAcceptDispute: () => {
//             console.log("✅ Dispute accepted - processing payment and resolution");
//             // For demo purposes, just navigate back
//             navigateToScreen("my-deliveries");
//           },
//           onUpdateDetails: (updatedJob: Partial<DeliveryJob>) => {
//             console.log("📝 Updating job details:", updatedJob);
//             if (selectedJob) {
//               const updatedFullJob = { ...selectedJob, ...updatedJob };
//               handleJobUpdate(updatedFullJob);
//             }
//           },
//           onCancelOrder: handleCancelOrder,
//           onDisputeResolved: () => {
//             setCurrentDispute(null);
//             setViolationFee(0);
//             setRefundAmount(0);
//             setDisputeTimer(0);
//             navigateToScreen("my-deliveries");
//           },
//         };

//         return <SenderResolutionScreen {...senderResolutionProps} />;
//       }

//       case "cancellation-confirmation":
//         return (
//           <CancellationConfirmationScreen
//             job={selectedJob}
//             user={user}
//             onComplete={() => {
//               setCurrentDispute(null);
//               setViolationFee(0);
//               setRefundAmount(0);
//               setDisputeTimer(0);
//               navigateToScreen("my-deliveries");
//             }}
//             onContactSupport={() => navigateToScreen("contact-support")}
//             violationFee={violationFee}
//             refundAmount={refundAmount}
//           />
//         );

//       case "pal-waiting":
//         return (
//           <PalWaitingScreen
//             job={selectedJob}
//             user={user}
//             onBack={() => navigateToScreen("dashboard")}
//             onTimeoutComplete={(compensationAmount) => {
//               if (user) {
//                 const updatedUser = {
//                   ...user,
//                   walletBalance: (user.walletBalance || 0) + compensationAmount,
//                 };
//                 handleUserUpdate(updatedUser);
//               }
//               navigateToScreen("dashboard");
//             }}
//             onDisputeResolved={() => {
//               navigateToScreen("pickup-confirmation");
//             }}
//           />
//         );

//       // Support-related screens
//       case "support-resolution":
//         return (
//           <SupportResolutionScreen
//             job={selectedJob}
//             senderUser={user}
//             palUser={user}
//             onBack={goBack}
//             onResolveDispute={() => navigateToScreen("dashboard")}
//           />
//         );

//       case "evidence-collection":
//         return (
//           <EvidenceCollectionScreen
//             job={selectedJob}
//             user={user}
//             onBack={goBack}
//             onSubmitEvidence={() => navigateToScreen("support-resolution")}
//           />
//         );

//       case "notifications":
//         return (
//           <NotificationsScreen
//             user={user}
//             notifications={notifications.filter((n) => n.userId === user?.id)}
//             activeRole={activeRole}
//             onBack={goBack}
//             onNavigate={navigateToScreen}
//             onMarkAsRead={handleMarkNotificationAsRead}
//             onMarkAllAsRead={handleMarkAllNotificationsAsRead}
//             onNotificationAction={handleNotificationAction}
//             initialTab={notificationTab}
//           />
//         );

//       case "item-edit":
//         return (
//           <ItemEditScreen
//             onBack={goBack}
//             onSave={handleItemEditComplete}
//             initialData={{
//               title: selectedJob?.title || "",
//               description: selectedJob?.description || "",
//               category: selectedJob?.category || "",
//               size: selectedJob?.itemSize || "",
//               weight: selectedJob?.weight || "",
//             }}
//           />
//         );

//       case "post-delivery-edit":
//         // Typed handlers and props for PostDeliveryEditScreen
//         type LocationType = "pickup" | "dropoff";

//         const handlePostDeliveryEditLocationSelect =
//           (type: LocationType) => {
//             setLocationSelectionContext({
//               type,
//               returnScreen: "post-delivery-edit",
//             });
//             navigateToScreen("location-selection");
//           };

//         // Handler for the rating submission that matches component expectations
//         const handlePostDeliveryEditSubmit = (data: RatingData) => {
//           console.log("⭐ Post Delivery Edit - Submitting rating:", data);
//           // For now, just navigate back - in a real app you'd save the rating
//           goBack();
//         };

//         return (
//           <PostDeliveryEditScreen
//             onBack={goBack}
//             onSubmit={handlePostDeliveryEditSubmit}
//             palName={selectedJob?.selectedPalName || "Pal"}
//           />
//         );

//       case "tape-distributor":
//         return (
//           <TapeDistributorScreen
//             user={user}
//             onBack={goBack}
//             onNavigate={navigateToScreen}
//           />
//         );

//       // case 'become-pal':
//       //   return (
//       //     <BecomePalScreen
//       //       user={user}
//       //       onBack={goBack}
//       //       onNavigate={navigateToScreen}
//       //     />
//       //   );

//       // case 'become-sender':
//       //   return (
//       //     <BecomeSenderScreen
//       //       user={user}
//       //       onBack={goBack}
//       //       onNavigate={navigateToScreen}
//       //     />
//       //   );

//       // case 'become-receiver':
//       //   return (
//       //     <BecomeReceiverScreen
//       //       user={user}
//       //       onBack={goBack}
//       //       onNavigate={navigateToScreen}
//       //     />
//       //   );

//       // case 'become-proxy':
//       //   return (
//       //     <BecomeProxyScreen
//       //       user={user}
//       //       onBack={goBack}
//       //       onNavigate={navigateToScreen}
//       //     />
//       //   );

//       case "receiver-confirmation":
//         return (
//           <ReceiverConfirmationScreen
//             job={selectedJob}
//             onBack={() => navigateToScreen("dashboard")}
//             onConfirmReceipt={() => {
//               if (selectedJob) {
//                 handleJobUpdate({ ...selectedJob, status: "delivered" });
//               }
//               navigateToScreen("delivery-completed");
//             }}
//           />
//         );

//       case "delivery-completed":
//         return (
//           <DeliveryCompletedScreen
//             job={selectedJob}
//             user={user}
//             onReturnToDashboard={() => navigateToScreen("dashboard")}
//             onGoToIncomingDeliveries={() => navigateToScreen("dashboard")}
//             onRateDelivery={() => {
//               if (selectedJob) {
//                 navigateToScreen("ratings");
//               }
//             }}
//           />
//         );

//       // Removed: proxy-confirmation - Now using proxy-to-receiver-handover instead

//       case "proxy-completed": {
//         return (
//           <ProxyCompletedScreen
//             proxyItem={selectedProxyItem}
//             onReturnToDashboard={() => navigateToScreen("dashboard")}
//             onGoToProxyStorage={() => navigateToScreen("proxy-dashboard")}
//             onRateExperience={() => {
//               if (selectedProxyItem) {
//                 navigateToScreen("ratings");
//               }
//             }}
//           />
//         );
//       }

//       case "proxy-item-scan":
//         return (
//           <ProxyItemScanScreen
//             itemTitle={scanningProxyItem?.title || "Item"}
//             deliveryId={scanningProxyItem?.id}
//             onBack={() => navigateToScreen("proxy-dashboard")}
//             onScanComplete={() => {
//               // Auto-accept after verification - navigate to proxy dashboard
//               navigateToScreen("proxy-dashboard");
//             }}
//           />
//         );

//       case "proxy-to-receiver-handover":
//         return (
//           <ProxyToReceiverHandoverScreen
//             itemTitle={selectedProxyItem?.title || "Item"}
//             deliveryId={selectedProxyItem?.id}
//             receiverName={selectedProxyItem?.receiverName || "Receiver"}
//             onBack={() => navigateToScreen("proxy-dashboard")}
//             onHandoverComplete={() => {
//               // Auto-complete handover - update item status and navigate to success
//               if (selectedProxyItem) {
//                 const updatedItem = {
//                   ...selectedProxyItem,
//                   status: "completed" as const,
//                 };
//                 setProxyItems((prev) =>
//                   prev.map((item) =>
//                     item.id === updatedItem.id ? updatedItem : item
//                   )
//                 );
//               }
//               toast.success("Handover completed successfully!");
//               navigateToScreen("proxy-dashboard");
//             }}
//           />
//         );

//       // case "favorite-pal-input":
//       //   return (
//       //     <FavoritePalInputScreen
//       //       onBack={() => navigateToScreen("post-delivery")}
//       //       onPalFound={(palData, jobData) => {
//       //         setSelectedFavoritePal(palData);
//       //         setFavoritePalJobData(jobData);
//       //         navigateToScreen("favorite-pal-confirmation");
//       //       }}
//       //       jobData={favoritePalJobData}
//       //     />
//       //   );

//       case "favorite-pal-confirmation": {
//         // Local interfaces for clarity
//         type FavoritePalJobPartial = Partial<
//           Pick<
//             DeliveryJob,
//             | "title"
//             | "pickupLocation"
//             | "dropoffLocation"
//             | "itemSize"
//             | "weight"
//             | "value"
//             | "pickupDate"
//             | "notes"
//             | "images"
//           >
//         >;

//         interface NewAssignedDeliveryJob extends DeliveryJob {
//           id: string;
//           senderId: string;
//           senderName: string;
//           title: string;
//           pickupLocation: string;
//           dropoffLocation: string;
//           itemSize: ItemSize;
//           weight: string;
//           value: number;
//           pickupDate: string;
//           notes?: string;
//           images?: string[];
//           status: "assigned";
//           createdAt: string;
//         }

//         // Function to create job and handle payment
//         const handleJobCreation = (
//           agreedPrice: number,
//           paymentMethod: "wallet" | "card" | string
//         ) => {
//           const jobData = favoritePalJobData as
//             | FavoritePalJobPartial
//             | undefined;

//           // Create the delivery job with direct assignment to favorite Pal
//           const newJob: NewAssignedDeliveryJob = {
//             id: Date.now().toString(),
//             senderId: user?.id || "",
//             senderName: user?.name || "Unknown Sender",
//             title: jobData?.title || "",
//             pickupLocation: jobData?.pickupLocation || "",
//             dropoffLocation: jobData?.dropoffLocation || "",
//             itemSize: jobData?.itemSize || "Medium",
//             weight: jobData?.weight || "",
//             value: jobData?.value || 0,
//             pickupDate: jobData?.pickupDate || "",
//             notes: jobData?.notes || "",
//             images: jobData?.images || [],
//             status: "assigned",
//             selectedPalId: selectedFavoritePal?.id,
//             selectedPalName: selectedFavoritePal?.name,
//             acceptedBidAmount: agreedPrice,
//             escrowAmount: agreedPrice,
//             bids: [],
//             isLive: false,
//             createdAt: new Date().toISOString(),
//           };

//           // Update user wallet if paid via wallet
//           if (paymentMethod === "wallet" && user) {
//             const platformFee: number = Math.max(500, agreedPrice * 0.05);
//             const totalAmount: number = agreedPrice + platformFee;
//             const updatedUser: User = {
//               ...user,
//               walletBalance: (user.walletBalance || 0) - totalAmount,
//             };
//             handleUserUpdate(updatedUser);
//           }

//           // Add the job and navigate to acceptance notification
//           handleNewJob(newJob);
//           setSelectedJob(newJob);
//           navigateToScreen("pal-acceptance-notification");
//         };

//         return (
//           <FavoritePalConfirmationScreen
//             palName={selectedFavoritePal?.name || ""}
//             palRating={selectedFavoritePal?.rating || 0}
//             palDeliveries={selectedFavoritePal?.totalDeliveries || 0}
//             onContinue={handleJobCreation}
//           />
//         );
//       }

//       case "pal-acceptance-notification":
//         if (!selectedJob) {
//           console.warn(
//             "⚠️ pal-acceptance-notification accessed without a selected job, redirecting to dashboard"
//           );
//           setTimeout(() => navigateToScreen("dashboard"), 0);
//           return screenRenderer.renderErrorScreen(
//             "No delivery selected",
//             () => navigateToScreen("dashboard"),
//             () => navigateToScreen("dashboard")
//           );
//         }

//         // Convert FavoritePalData to User type for palData prop
//         function createUserFromPalData(pal: FavoritePalData | null): User {
//           if (!pal) {
//             return {} as User; // Handle the null case by returning an empty User (shouldn't happen in practice)
//           }

//           // We know exactly what fields FavoritePalData has and what we need to add for User
//           return {
//             id: pal.id,
//             userName: pal.userName,
//             firstName: pal.firstName,
//             lastName: pal.lastName,
//             name: pal.name,
//             email: "", // FavoritePalData doesn't include email
//             phone: pal.phone,
//             role: "pal" as const, // Using const assertion for type safety
//             rating: pal.rating,
//             totalDeliveries: pal.totalDeliveries,
//             // vehicleType: pal.vehicleType,
//             isVerified: pal.isVerified,
//             walletBalance: 0,
//             governmentIdUrl: "",
//             governmentIdStatus: "pending" as const,
//             activeEscrows: [],
//             transactions: [],
//             bankAccounts: [],
//             cards: [],
//             preferences: {
//               notifications: {
//                 push: true,
//                 email: true,
//                 sms: false,
//               },
//               privacy: {
//                 shareLocation: false,
//                 shareProfile: false,
//               },
//               delivery: {
//                 autoAcceptRadius: 5,
//                 // preferredVehicles: ['Motorcycle'], // Fixing the VehicleType in the preferences section
//               },
//             },
//           };
//         }

//         const palDataAsUser = createUserFromPalData(selectedFavoritePal);

//         return (
//           <PalAcceptanceNotificationScreen
//             onReturnToDashboard={() => navigateToScreen("dashboard")}
//             onViewMyDeliveries={() => navigateToScreen("my-deliveries")}
//             onCallPal={handleCall}
//             onChatWithPal={() => {
//               if (selectedJob) {
//                 handleUniversalChat(selectedJob);
//               }
//             }}
//             palData={palDataAsUser}
//             deliveryJob={selectedJob}
//           />
//         );
//       case "sent-deliveries-history":
//         return (
//           <SentDeliveriesHistoryScreen
//             user={user}
//             onBack={() => navigateToScreen("dashboard")}
//             onNavigate={navigateToScreen}
//             userJobs={commonProps.getUserJobs(user?.id || "", "sender")}
//             onJobSelect={handleJobSelect}
//             onOpenChat={handleUniversalChat}
//             formatAmount={formatAmount}
//             onBidSelect={handleBidSelect}
//           />
//         );

//       // case 'proxy-deliveries':
//       //   return (
//       //   <ProxyDeliveriesScreen
//       //     user={user}
//       //     onBack={() => navigateToScreen('dashboard')}
//       //     onNavigate={navigateToScreen}
//       //     proxyItems={proxyItems}
//       //     onItemUpdate={(item) => {
//       //       setProxyItems(prev => prev.map(existingItem =>
//       //         existingItem.id === item.id ? item : existingItem
//       //       ));
//       //     }}
//       //     onNotifyReceiver={(item) => {
//       //       // Update notification attempts
//       //       const updatedItem = {
//       //         ...item,
//       //         status: 'notified' as const,
//       //         notificationAttempts: (item.notificationAttempts || 0) + 1
//       //       };
//       //       setProxyItems(prev => prev.map(existingItem =>
//       //         existingItem.id === updatedItem.id ? updatedItem : existingItem
//       //       ));
//       //       console.log('📞 Proxy notifying receiver:', item.receiverName, 'Attempts:', updatedItem.notificationAttempts);
//       //     }}
//       //     onHandoverToReceiver={(item) => {
//       //       setSelectedProxyItem(item);
//       //       navigateToScreen('proxy-to-receiver-handover');
//       //     }}
//       //     onOpenChat={(item) => {
//       //       // Find the delivery job associated with this proxy item
//       //       if (item.jobId) {
//       //         const job = deliveryJobs.find(j => j.id === item.jobId);
//       //         if (job) {
//       //           handleUniversalChat(job);
//       //         }
//       //       }
//       //     }}
//       //     onCall={handleCall}
//       //     formatAmount={formatAmount}
//       //   />
//       // );

//       case "received-deliveries":
//         return (
//           <ReceivedDeliveriesScreen
//             user={user}
//             onBack={() => navigateToScreen("dashboard")}
//             onNavigate={navigateToScreen}
//             receivedJobs={deliveryJobs.filter(
//               (job) => job.receiverId === user?.id
//             )}
//             onJobSelect={handleJobSelect}
//             onOpenChat={handleUniversalChat}
//             onCall={handleCall}
//             formatAmount={formatAmount}
//           />
//         );

//       case "route-ads-management":
//         return <RouteAdsManagementScreen onBack={goBack} user={user} />;

//       default:
//         console.warn("⚠️ Enhanced Render: Unknown screen:", currentScreen);
//         return screenRenderer.renderErrorScreen(
//           `Unknown screen: ${currentScreen}`,
//           () => navigateToScreen("dashboard"),
//           () => navigateToScreen("dashboard")
//         );
//     }
//   };

//   const formatAmount = (amount: number) => {
//     return new Intl.NumberFormat("en-NG", {
//       style: "currency",
//       currency: "NGN",
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 0,
//     }).format(amount);
//   };

//   // 🔥 ENHANCED RESPONSIVE LAYOUT DETECTION - FIXED FOR MOBILE & TABLET
//   const isDesktopLayout = navigationUtils.shouldUseDesktopEnhancements(
//     currentScreen,
//     !!user
//   );

//   // 🔥 FULL-SCREEN SCREENS DETECTION - Better Mobile & Tablet Handling
//   const isFullScreenScreen = ["splash", "onboarding", "auth", "profile-information", "notifications"].includes(
//     currentScreen
//   );

//   // 🔥 DASHBOARD HEADER VISIBILITY - NOW SHOWN ON ALL NON-FULL-SCREEN PAGES
//   const shouldShowDashboardHeader = !isFullScreenScreen && user;

//   console.log(
//     "🚀 COMPLETE USER ROLE FLOW WITH TRANSACTIONS SIMULATION LOADED AND READY!"
//   );
//   console.log("🍔 Global Header Status:", {
//     shouldShowDashboardHeader,
//     isDesktopLayout,
//     isFullScreenScreen,
//     user: !!user,
//   });

//   return (
//     <ErrorBoundary
//       onError={(error, errorInfo) => {
//         console.error("🚨 App Error Boundary caught error:", error, errorInfo);
//       }}
//     >
//       <div className="min-h-screen w-screen relative bg-gradient-to-br from-gray-50 via-white to-gray-50 overflow-x-hidden">
//         {/* 🔥 RESPONSIVE VIEWPORT META - Ensure proper mobile scaling */}
//         <meta
//           name="viewport"
//           content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
//         />

//         {/* Enhanced background pattern - Desktop Only */}
//         <div className="hidden xl:block absolute inset-0 opacity-[0.02] pointer-events-none z-0">
//           <div
//             className="absolute inset-0 pointer-events-none"
//             style={{
//               backgroundImage: `radial-gradient(circle at 25% 25%, var(--color-prawnbox-accent) 2px, transparent 2px), 
//                            radial-gradient(circle at 75% 75%, var(--color-prawnbox-primary) 1px, transparent 1px)`,
//               backgroundSize: "50px 50px",
//             }}
//           ></div>
//         </div>

//         {/* 🔥 GLOBAL DASHBOARD HEADER - NOW SHOWN ON ALL NON-FULL-SCREEN PAGES */}
//         {shouldShowDashboardHeader && (
//           <div className="fixed top-0 left-0 right-0 z-50">
//             <DashboardHeader
//               activeRole={activeRole}
//               onRoleChange={handleRoleChange}
//               onNotificationsClick={handleGeneralNotificationsClick}
//               onAlertsClick={handleAlertsClick}
//               onMenuToggle={toggleMobileMenu}
//               onProfileClick={() => navigateToScreen("profile-information")}
//               onNavigate={navigateToScreen}
//               isMenuOpen={isMobileMenuOpen}
//               notifications={notifications.filter((n) => n.userId === user?.id)}
//               user={user}
//               currentScreen={currentScreen}
//             />
//           </div>
//         )}

//         {/* 🔥 MOBILE MENU OVERLAY AND CONTENT */}
//         {shouldShowDashboardHeader && isMobileMenuOpen && (
//           <>
//             {/* Menu Backdrop */}
//             <motion.div
//               className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
//               onClick={closeMobileMenu}
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.3 }}
//               style={{
//                 touchAction: "manipulation",
//               }}
//             />

//             {/* Slide-out Menu */}
//             <motion.div
//               className="fixed top-0 right-0 h-full bg-gradient-to-br from-[#2f2f2f] via-[#1a1a1a] to-[#2f2f2f] shadow-2xl z-50 w-full max-w-sm sm:max-w-md overflow-hidden"
//               initial={{ x: "100%" }}
//               animate={{ x: 0 }}
//               exit={{ x: "100%" }}
//               transition={{ type: "spring", damping: 25, stiffness: 200 }}
//             >
//               {/* Background decorations */}
//               <div className="absolute inset-0 overflow-hidden pointer-events-none">
//                 <motion.div
//                   className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full opacity-20 blur-3xl"
//                   animate={{
//                     scale: [1, 1.2, 1],
//                     opacity: [0.2, 0.3, 0.2],
//                   }}
//                   transition={{
//                     duration: 4,
//                     repeat: Infinity,
//                     ease: "easeInOut",
//                   }}
//                 />
//                 <motion.div
//                   className="absolute bottom-0 -left-40 w-80 h-80 bg-blue-500 rounded-full opacity-15 blur-3xl"
//                   animate={{
//                     scale: [1, 1.3, 1],
//                     opacity: [0.15, 0.25, 0.15],
//                   }}
//                   transition={{
//                     duration: 5,
//                     repeat: Infinity,
//                     ease: "easeInOut",
//                     delay: 0.5,
//                   }}
//                 />
//               </div>

//               <div className="flex flex-col h-full relative z-10">
//                 {/* Menu Header */}
//                 <motion.div
//                   className="p-6 border-b border-white/10 bg-white/5 backdrop-blur-sm"
//                   initial={{ opacity: 0, y: -20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.1 }}
//                 >
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center space-x-3">
//                       <Image
//                         src="/P-logo.png"
//                         alt="Prawnbox"
//                         width={40}
//                         height={40}
//                         className="object-contain"
//                       />

//                       <div>
//                         <h2 className="text-lg font-bold text-white">
//                           Prawnbox
//                         </h2>
//                         <p className="text-sm text-gray-400 capitalize">
//                           {user ? `${activeRole} Account` : "Welcome"}
//                         </p>
//                       </div>
//                     </div>
//                     <motion.button
//                       onClick={closeMobileMenu}
//                       className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-all"
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                     >
//                       <X size={20} className="text-white" />
//                     </motion.button>
//                   </div>
//                 </motion.div>

//                 {/* User Profile Section */}
//                 {user && (
//                   <motion.div
//                     className="p-6 border-b border-white/10"
//                     initial={{ opacity: 0, y: -10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.2 }}
//                   >
//                     <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4">
//                       <div className="flex items-center space-x-4">
//                         {/* Profile Photo */}
//                         <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#f44708] to-[#ff6b35] border-2 border-[#f44708]/30 flex items-center justify-center flex-shrink-0 shadow-lg">
//                           {user.profileImage ? (
//                             <Image
//                               src={user.profileImage}
//                               alt={user.name}
//                               width={40}
//                               height={40}
//                               className="rounded-full object-cover"
//                             />
//                           ) : (
//                             <span className="text-white font-bold text-lg">
//                               {user.name
//                                 .split(" ")
//                                 .map((n) => n[0])
//                                 .join("")
//                                 .toUpperCase()}
//                             </span>
//                           )}
//                         </div>

//                         <div className="flex-1 min-w-0">
//                           <h3 className="font-bold text-white truncate">
//                             {user.name}
//                           </h3>
//                           <p className="text-sm text-gray-400 truncate">
//                             {user.email}
//                           </p>
//                           {/* Wallet Balance */}
//                           <div className="flex items-center space-x-2 mt-2 bg-[#f44708]/20 border border-[#f44708]/30 rounded-lg px-3 py-1.5">
//                             <Wallet size={14} className="text-[#f44708]" />
//                             <span className="font-bold text-[#f44708] text-sm">
//                               {formatAmount(user.walletBalance || 0)}
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </motion.div>
//                 )}

//                 {/* Navigation Menu */}
//                 <div className="flex-1 overflow-y-auto p-6 space-y-3">
//                   {/* Dashboard Button */}
//                   <motion.button
//                     onClick={() => handleMobileMenuNavigation("dashboard")}
//                     className={`w-full flex items-center space-x-4 p-4 rounded-xl transition-all duration-200 ${
//                       currentScreen === "dashboard"
//                         ? "bg-[#f44708]/20 border border-[#f44708]/40"
//                         : "bg-white/10 hover:bg-white/15 border border-white/20"
//                     }`}
//                     whileHover={{ scale: 1.02, x: 5 }}
//                     whileTap={{ scale: 0.98 }}
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: 0.3 }}
//                     style={{
//                       pointerEvents: "auto",
//                       userSelect: "none",
//                       WebkitUserSelect: "none",
//                       WebkitTapHighlightColor: "transparent",
//                     }}
//                   >
//                     <div
//                       className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
//                         currentScreen === "dashboard"
//                           ? "bg-[#f44708]"
//                           : "bg-white/10"
//                       }`}
//                     >
//                       <Home size={20} className="text-white" />
//                     </div>
//                     <span className="font-medium text-white flex-1 text-left">
//                       Dashboard
//                     </span>
//                     {currentScreen === "dashboard" && (
//                       <motion.div
//                         className="w-2 h-2 rounded-full bg-[#f44708]"
//                         initial={{ scale: 0 }}
//                         animate={{ scale: 1 }}
//                         transition={{ type: "spring", stiffness: 500 }}
//                       />
//                     )}
//                   </motion.button>

//                   {/* Wallet Button */}
//                   <motion.button
//                     onClick={() => handleMobileMenuNavigation("wallet")}
//                     className={`w-full flex items-center space-x-4 p-4 rounded-xl transition-all duration-200 ${
//                       currentScreen === "wallet"
//                         ? "bg-[#f44708]/20 border border-[#f44708]/40"
//                         : "bg-white/10 hover:bg-white/15 border border-white/20"
//                     }`}
//                     whileHover={{ scale: 1.02, x: 5 }}
//                     whileTap={{ scale: 0.98 }}
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: 0.35 }}
//                     style={{
//                       pointerEvents: "auto",
//                       userSelect: "none",
//                       WebkitUserSelect: "none",
//                       WebkitTapHighlightColor: "transparent",
//                     }}
//                   >
//                     <div
//                       className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
//                         currentScreen === "wallet"
//                           ? "bg-[#f44708]"
//                           : "bg-white/10"
//                       }`}
//                     >
//                       <Wallet size={20} className="text-white" />
//                     </div>
//                     <span className="font-medium text-white flex-1 text-left">
//                       Wallet
//                     </span>
//                     {currentScreen === "wallet" && (
//                       <motion.div
//                         className="w-2 h-2 rounded-full bg-[#f44708]"
//                         initial={{ scale: 0 }}
//                         animate={{ scale: 1 }}
//                         transition={{ type: "spring", stiffness: 500 }}
//                       />
//                     )}
//                   </motion.button>

//                   {/* Settings Button */}
//                   <motion.button
//                     onClick={() => handleMobileMenuNavigation("settings")}
//                     className={`w-full flex items-center space-x-4 p-4 rounded-xl transition-all duration-200 ${
//                       currentScreen === "settings"
//                         ? "bg-[#f44708]/20 border border-[#f44708]/40"
//                         : "bg-white/10 hover:bg-white/15 border border-white/20"
//                     }`}
//                     whileHover={{ scale: 1.02, x: 5 }}
//                     whileTap={{ scale: 0.98 }}
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: 0.4 }}
//                     style={{
//                       pointerEvents: "auto",
//                       userSelect: "none",
//                       WebkitUserSelect: "none",
//                       WebkitTapHighlightColor: "transparent",
//                     }}
//                   >
//                     <div
//                       className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
//                         currentScreen === "settings"
//                           ? "bg-[#f44708]"
//                           : "bg-white/10"
//                       }`}
//                     >
//                       <Settings size={20} className="text-white" />
//                     </div>
//                     <span className="font-medium text-white flex-1 text-left">
//                       Settings
//                     </span>
//                     {currentScreen === "settings" && (
//                       <motion.div
//                         className="w-2 h-2 rounded-full bg-[#f44708]"
//                         initial={{ scale: 0 }}
//                         animate={{ scale: 1 }}
//                         transition={{ type: "spring", stiffness: 500 }}
//                       />
//                     )}
//                   </motion.button>

//                   {/* Sponsor a User Button */}
//                   <motion.button
//                     onClick={() =>
//                       handleMobileMenuNavigation("sponsor-user-search")
//                     }
//                     className={`w-full flex items-center space-x-4 p-4 rounded-xl transition-all duration-200 ${
//                       currentScreen === "sponsor-user-search"
//                         ? "bg-[#f44708]/20 border border-[#f44708]/40"
//                         : "bg-white/10 hover:bg-white/15 border border-white/20"
//                     }`}
//                     whileHover={{ scale: 1.02, x: 5 }}
//                     whileTap={{ scale: 0.98 }}
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: 0.45 }}
//                     style={{
//                       pointerEvents: "auto",
//                       userSelect: "none",
//                       WebkitUserSelect: "none",
//                       WebkitTapHighlightColor: "transparent",
//                     }}
//                   >
//                     <div
//                       className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
//                         currentScreen === "sponsor-user-search"
//                           ? "bg-[#f44708]"
//                           : "bg-white/10"
//                       }`}
//                     >
//                       <Heart size={20} className="text-white" />
//                     </div>
//                     <span className="font-medium text-white flex-1 text-left">
//                       Sponsor a User
//                     </span>
//                     {currentScreen === "sponsor-user-search" && (
//                       <motion.div
//                         className="w-2 h-2 rounded-full bg-[#f44708]"
//                         initial={{ scale: 0 }}
//                         animate={{ scale: 1 }}
//                         transition={{ type: "spring", stiffness: 500 }}
//                       />
//                     )}
//                   </motion.button>

//                   {/* Refer Button */}
//                   <motion.button
//                     onClick={() => handleMobileMenuNavigation("referral")}
//                     className={`w-full flex items-center space-x-4 p-4 rounded-xl transition-all duration-200 ${
//                       currentScreen === "referral"
//                         ? "bg-[#f44708]/20 border border-[#f44708]/40"
//                         : "bg-white/10 hover:bg-white/15 border border-white/20"
//                     }`}
//                     whileHover={{ scale: 1.02, x: 5 }}
//                     whileTap={{ scale: 0.98 }}
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: 0.5 }}
//                     style={{
//                       pointerEvents: "auto",
//                       userSelect: "none",
//                       WebkitUserSelect: "none",
//                       WebkitTapHighlightColor: "transparent",
//                     }}
//                   >
//                     <div
//                       className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
//                         currentScreen === "referral"
//                           ? "bg-[#f44708]"
//                           : "bg-white/10"
//                       }`}
//                     >
//                       <Users size={20} className="text-white" />
//                     </div>
//                     <span className="font-medium text-white flex-1 text-left">
//                       Refer
//                     </span>
//                     {currentScreen === "referral" && (
//                       <motion.div
//                         className="w-2 h-2 rounded-full bg-[#f44708]"
//                         initial={{ scale: 0 }}
//                         animate={{ scale: 1 }}
//                         transition={{ type: "spring", stiffness: 500 }}
//                       />
//                     )}
//                   </motion.button>

//                   {/* Tape Distributor Button */}
//                   <motion.button
//                     onClick={() =>
//                       handleMobileMenuNavigation("tape-distributor")
//                     }
//                     className={`w-full flex items-center space-x-4 p-4 rounded-xl transition-all duration-200 ${
//                       currentScreen === "tape-distributor"
//                         ? "bg-[#f44708]/20 border border-[#f44708]/40"
//                         : "bg-white/10 hover:bg-white/15 border border-white/20"
//                     }`}
//                     whileHover={{ scale: 1.02, x: 5 }}
//                     whileTap={{ scale: 0.98 }}
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: 0.55 }}
//                     style={{
//                       pointerEvents: "auto",
//                       userSelect: "none",
//                       WebkitUserSelect: "none",
//                       WebkitTapHighlightColor: "transparent",
//                     }}
//                   >
//                     <div
//                       className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
//                         currentScreen === "tape-distributor"
//                           ? "bg-[#f44708]"
//                           : "bg-white/10"
//                       }`}
//                     >
//                       <Store size={20} className="text-white" />
//                     </div>
//                     <span className="font-medium text-white flex-1 text-left">
//                       Tape Distributor
//                     </span>
//                     {currentScreen === "tape-distributor" && (
//                       <motion.div
//                         className="w-2 h-2 rounded-full bg-[#f44708]"
//                         initial={{ scale: 0 }}
//                         animate={{ scale: 1 }}
//                         transition={{ type: "spring", stiffness: 500 }}
//                       />
//                     )}
//                   </motion.button>

//                   {/* Divider */}
//                   <div className="border-t border-white/10 my-4"></div>

//                   {/* Role-Specific Quick Actions */}
//                   {activeRole === "sender" && (
//                     <motion.button
//                       onClick={() =>
//                         handleMobileMenuNavigation("post-delivery")
//                       }
//                       className="w-full flex items-center space-x-4 p-4 rounded-xl bg-gradient-to-r from-[#2f2f2f] to-[#1a1a1a] hover:from-[#3f3f3f] hover:to-[#2a2a2a] border border-[#f44708]/40 shadow-lg"
//                       whileHover={{ scale: 1.02, x: 5 }}
//                       whileTap={{ scale: 0.98 }}
//                       initial={{ opacity: 0, x: -20 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       transition={{ delay: 0.6 }}
//                       style={{
//                         pointerEvents: "auto",
//                         userSelect: "none",
//                         WebkitUserSelect: "none",
//                         WebkitTapHighlightColor: "transparent",
//                       }}
//                     >
//                       <div className="w-10 h-10 rounded-lg bg-[#f44708] flex items-center justify-center flex-shrink-0">
//                         <Plus size={20} className="text-white" />
//                       </div>
//                       <span className="font-medium text-white flex-1 text-left">
//                         Post New Delivery
//                       </span>
//                     </motion.button>
//                   )}

//                   {activeRole === "pal" && (
//                     <motion.button
//                       onClick={() =>
//                         handleMobileMenuNavigation("available-jobs")
//                       }
//                       className="w-full flex items-center space-x-4 p-4 rounded-xl bg-gradient-to-r from-[#2f2f2f] to-[#1a1a1a] hover:from-[#3f3f3f] hover:to-[#2a2a2a] border border-[#f44708]/40 shadow-lg"
//                       whileHover={{ scale: 1.02, x: 5 }}
//                       whileTap={{ scale: 0.98 }}
//                       initial={{ opacity: 0, x: -20 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       transition={{ delay: 0.6 }}
//                       style={{
//                         pointerEvents: "auto",
//                         userSelect: "none",
//                         WebkitUserSelect: "none",
//                         WebkitTapHighlightColor: "transparent",
//                       }}
//                     >
//                       <div className="w-10 h-10 rounded-lg bg-[#f44708] flex items-center justify-center flex-shrink-0">
//                         <Zap size={20} className="text-white" />
//                       </div>
//                       <span className="font-medium text-white flex-1 text-left">
//                         Find Jobs
//                       </span>
//                     </motion.button>
//                   )}

//                   {activeRole === "receiver" && (
//                     <motion.button
//                       onClick={() => handleMobileMenuNavigation("dashboard")}
//                       className="w-full flex items-center space-x-4 p-4 rounded-xl bg-gradient-to-r from-[#2f2f2f] to-[#1a1a1a] hover:from-[#3f3f3f] hover:to-[#2a2a2a] border border-[#f44708]/40 shadow-lg"
//                       whileHover={{ scale: 1.02, x: 5 }}
//                       whileTap={{ scale: 0.98 }}
//                       initial={{ opacity: 0, x: -20 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       transition={{ delay: 0.6 }}
//                       style={{
//                         pointerEvents: "auto",
//                         userSelect: "none",
//                         WebkitUserSelect: "none",
//                         WebkitTapHighlightColor: "transparent",
//                       }}
//                     >
//                       <div className="w-10 h-10 rounded-lg bg-[#f44708] flex items-center justify-center flex-shrink-0">
//                         <Mail size={20} className="text-white" />
//                       </div>
//                       <span className="font-medium text-white flex-1 text-left">
//                         Incoming Deliveries
//                       </span>
//                     </motion.button>
//                   )}

//                   {activeRole === "proxy" && (
//                     <motion.button
//                       onClick={() =>
//                         handleMobileMenuNavigation("proxy-dashboard")
//                       }
//                       className="w-full flex items-center space-x-4 p-4 rounded-xl bg-gradient-to-r from-[#2f2f2f] to-[#1a1a1a] hover:from-[#3f3f3f] hover:to-[#2a2a2a] border border-[#f44708]/40 shadow-lg"
//                       whileHover={{ scale: 1.02, x: 5 }}
//                       whileTap={{ scale: 0.98 }}
//                       initial={{ opacity: 0, x: -20 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       transition={{ delay: 0.6 }}
//                       style={{
//                         pointerEvents: "auto",
//                         userSelect: "none",
//                         WebkitUserSelect: "none",
//                         WebkitTapHighlightColor: "transparent",
//                       }}
//                     >
//                       <div className="w-10 h-10 rounded-lg bg-[#f44708] flex items-center justify-center flex-shrink-0">
//                         <Building size={20} className="text-white" />
//                       </div>
//                       <span className="font-medium text-white flex-1 text-left">
//                         Storage Management
//                       </span>
//                     </motion.button>
//                   )}
//                 </div>

//                 {/* Menu Footer */}
//                 <motion.div
//                   className="p-6 border-t border-white/10 bg-white/5 backdrop-blur-sm"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: 0.7 }}
//                 >
//                   <div className="text-center space-y-2">
//                     <div className="flex items-center justify-center space-x-2">
//                       <div className="w-2 h-2 rounded-full bg-[#f44708] animate-pulse"></div>
//                       <p className="text-xs text-gray-400">System Online</p>
//                     </div>
//                     <p className="text-xs text-gray-500">Prawnbox v1.0</p>
//                     <p className="text-xs text-gray-500">
//                       © 2025 All rights reserved
//                     </p>
//                   </div>
//                 </motion.div>
//               </div>
//             </motion.div>
//           </>
//         )}


//         {isDesktopLayout ? (
//   /* ✅ DESKTOP LAYOUT - CENTERED TABLET-WIDTH WITH WHITE SIDES */
//   <>
//     <div className="w-full h-screen flex flex-row overflow-hidden bg-white">
//       {/* Enhanced Desktop Sidebar - Expanded Width */}
//       <div className="hidden xl:flex xl:w-96 2xl:w-[450px] bg-white/90 backdrop-blur-sm border-r border-gray-100 flex-col relative z-20 flex-shrink-0">
//         {/* Sidebar Header */}
//         <div className="p-4 2xl:p-6 border-b border-gray-100 flex-shrink-0">
//           <div className="flex items-center space-x-3 mb-4">
//             <div className="w-10 h-10 rounded-xl bg-prawnbox-accent flex items-center justify-center flex-shrink-0">
//               <span className="text-white font-bold text-lg">P</span>
//             </div>
//             <div className="min-w-0 flex-1">
//               <h2 className="font-semibold text-prawnbox-primary text-base truncate">
//                 Prawnbox
//               </h2>
//               <p className="text-sm text-prawnbox-text-light capitalize truncate">
//                 {activeRole} Dashboard
//               </p>
//             </div>
//           </div>

//           {/* Enhanced User Info */}
//           {user && (
//             <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
//               <div className="w-10 h-10 rounded-full bg-prawnbox-accent/10 border-2 border-prawnbox-accent/20 flex items-center justify-center flex-shrink-0">
//                 <span className="text-prawnbox-accent font-medium text-sm">
//                   {(user.name || user.email || 'U')
//                     .split(" ")
//                     .map((n) => n[0])
//                     .join("")
//                     .toUpperCase()
//                     .substring(0, 2)}
//                 </span>
//               </div>
//               <div className="flex-1 min-w-0">
//                 <p className="font-medium text-prawnbox-primary truncate text-sm">
//                   {user.name || user.email || 'User'}
//                 </p>
//                 <p className="text-xs text-prawnbox-text-light truncate">
//                   {formatAmount(user.walletBalance || 0)}
//                 </p>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Enhanced Sidebar Navigation - Scrollable Content */}
//         <div className="flex-1 p-4 2xl:p-6 overflow-y-auto">
//           <nav className="space-y-2">
//             {[
//               { screen: "dashboard", label: "Dashboard" },
//               { screen: "my-deliveries", label: "My Deliveries" },
//               { screen: "wallet", label: "Wallet" },
//               { screen: "settings", label: "Settings" },
//             ].map((item) => (
//               <button
//                 key={item.screen}
//                 onClick={eventHandlers.createNavigationHandler(
//                   item.screen as Screen,
//                   navigateToScreen
//                 )}
//                 className={`w-full flex items-center px-4 py-3 rounded-xl transition-all duration-200 text-left hover:scale-[1.02] active:scale-95 relative z-30 ${
//                   currentScreen === item.screen
//                     ? "bg-prawnbox-accent text-white shadow-lg"
//                     : "hover:bg-gray-100 text-prawnbox-primary"
//                 }`}
//                 style={{
//                   pointerEvents: "auto",
//                   userSelect: "none",
//                   WebkitUserSelect: "none",
//                 }}
//               >
//                 <span className="font-medium text-sm truncate">
//                   {item.label}
//                 </span>
//               </button>
//             ))}
//           </nav>

//           {/* 🔥 ENHANCED RECENT ACTIVITY WITH COLORED BUTTONS */}
//           <div className="mt-8">
//             <h3 className="font-medium text-prawnbox-primary mb-4 text-sm">
//               Recent Activity
//             </h3>
//             <div className="space-y-3">
//               {deliveryJobs.slice(0, 6).map((job, index) => {
//                 const colorScheme =
//                   recentActivityColors[
//                     index % recentActivityColors.length
//                   ];
//                 return (
//                   <button
//                     key={job.id}
//                     className={`w-full p-3 ${colorScheme.bg} ${colorScheme.hover} border ${colorScheme.border} rounded-xl transition-all duration-200 cursor-pointer text-left relative z-30 hover:scale-[1.02] active:scale-95 shadow-sm`}
//                     onClick={eventHandlers.createJobSelectionHandler(
//                       job,
//                       handleJobSelect,
//                       () => navigateToScreen("tracking")
//                     )}
//                     style={{
//                       pointerEvents: "auto",
//                       userSelect: "none",
//                       WebkitUserSelect: "none",
//                     }}
//                   >
//                     <p
//                       className={`font-medium text-xs ${colorScheme.text} truncate`}
//                     >
//                       {job.title}
//                     </p>
//                     <p
//                       className={`text-xs ${colorScheme.subtext} capitalize`}
//                     >
//                       {job.status}
//                     </p>
//                   </button>
//                 );
//               })}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main content area with proper spacing */}
//       <div className="flex-1 flex flex-col min-w-0 relative z-10 bg-white">
//         {/* Scrollable content area */}
//         <div className="flex-1 w-full overflow-y-auto">
//           <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
//             {renderScreen()}
//           </div>
//         </div>
//       </div>
//     </div>

//     {/* Footer outside the main container */}
//     {!isFullScreenScreen && (
//       <DashboardFooter
//         activeRole={activeRole}
//         onActionClick={handleActionClick}
//       />
//     )}
//   </>
// ) : (
//   /* 🔥 MOBILE & TABLET LAYOUT - FULL WIDTH FOR ALL SCREENS */
//   <>
//     <div className="w-full min-h-screen flex flex-col relative z-10">
//       {/* 🔥 MOBILE & TABLET CONTAINER - FULL WIDTH OPTIMIZED */}
//       <div
//         className={`w-full flex-1 bg-white ${
//           isFullScreenScreen
//             ? "p-0"
//             : shouldShowDashboardHeader
//             ? `${
//                 currentScreen === "dashboard"
//                   ? "pt-44"
//                   : currentScreen === "notifications"
//                   ? "pt-20"
//                   : "pt-18"
//               } pb-safe-area-inset-bottom sm:px-4 lg:px-6`
//             : "px-2 py-2 pb-safe-area-inset-bottom sm:px-4 sm:py-4 lg:px-6"
//         }`}
//       >
//         <div className="w-full min-h-full">{renderScreen()}</div>
//       </div>
//     </div>
    
//     {!isFullScreenScreen && (
//       <DashboardFooter
//         activeRole={activeRole}
//         onActionClick={handleActionClick}
//       />
//     )}
//   </>
// )}
//         {/* Enhanced Floating Action Button - Desktop Only */}
//         {isDesktopLayout && currentScreen === "dashboard" && (
//           <div className="hidden xl:block fixed bottom-8 right-8 z-50">
//             <button
//               onClick={eventHandlers.createButtonHandler(
//                 "floating-action",
//                 handleFloatingActionClick,
//                 { preventBubbling: true, logAction: true, requireAuth: true }
//               )}
//               className="w-14 h-14 bg-prawnbox-accent hover:bg-prawnbox-accent-light text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center hover:scale-110 active:scale-95 relative z-50"
//               style={{
//                 pointerEvents: "auto",
//                 userSelect: "none",
//                 WebkitUserSelect: "none",
//               }}
//             >
//               <span className="text-2xl transition-transform duration-200">
//                 {activeRole === "sender"
//                   ? "+"
//                   : activeRole === "pal"
//                   ? "⚡"
//                   : activeRole === "receiver"
//                   ? "📨"
//                   : "🏪"}
//               </span>
//             </button>
//           </div>
//         )}

//         {/* 🔥 BREADCRUMB NAVIGATION - Desktop Only, Positioned Below Global Header */}
//         {isDesktopLayout &&
//           currentScreen !== "dashboard" &&
//           shouldShowDashboardHeader && (
//             <div className="hidden xl:block fixed top-48 left-96 2xl:left-[450px] right-4 xl:right-8 z-30 pointer-events-none">
//               <div className="mt-4 mb-2">
//                 <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-2.5 shadow-sm border border-gray-100 max-w-fit pointer-events-auto">
//                   {screenRenderer.renderBreadcrumbs(
//                     navigationManager.generateBreadcrumbs().map((crumb) => ({
//                       label: crumb.label,
//                       onClick:
//                         crumb.screen === "dashboard"
//                           ? () => navigateToScreen("dashboard")
//                           : undefined,
//                     }))
//                   )}
//                 </div>
//               </div>
//             </div>
//           )}
//       </div>
//     </ErrorBoundary>
//   );
// }
// // Global fallback navigator - used only if the in-App navigateToScreen (inside the React component)
// // isn't available. It attempts several safe fallbacks:
// // 1. If a page-level handler was registered at window.__navigateToScreen, call it.
// // 2. Otherwise update the URL hash and emit a CustomEvent('app:navigate') so other code can react.
// // This keeps behavior predictable during tests, storybooks, or when the component internals are not mounted.
// export function navigateToScreenFallback(screen: string): void {
//   try {
//     // 1) Prefer an explicitly registered global handler (App can set window.__navigateToScreen = ...)
//     const globalHandler = (
//       window as unknown as Window & {
//         __navigateToScreen?: (screen: string) => void;
//       }
//     ).__navigateToScreen;
//     if (typeof globalHandler === "function") {
//       globalHandler(screen);
//       return;
//     }

//     // 2) Fallback: update URL hash and notify listeners
//     if (typeof window !== "undefined" && "location" in window) {
//       const newHash = `#${encodeURIComponent(String(screen))}`;
//       if (window.location.hash !== newHash) {
//         // Use pushState to avoid a full page reload
//         try {
//           window.history.pushState({ screen }, "", newHash);
//         } catch {
//           // If pushState fails (very old browsers), fall back to assigning hash
//           window.location.hash = newHash;
//         }
//       }

//       // Emit a notification so any runtime code can react to this navigation
//       const evt = new CustomEvent("app:navigate", { detail: { screen } });
//       window.dispatchEvent(evt);
//       return;
//     }
//   } catch (err) {
//     // swallow errors - navigation fallback should never throw
//     console.warn("navigateToScreen fallback error", err);
//   }

//   // Final fallback: log the navigation attempt
//   console.warn(
//     "navigateToScreen: no navigation handler available, requested screen:",
//     screen
//   );
// }

// // Expose the fallback as a global handler so other code (and the in-component logic that checks window.__navigateToScreen) can use it.
// // This also ensures the function is referenced and avoids "defined but never used" diagnostics.
// if (typeof window !== "undefined") {
//   (
//     window as Window & { __navigateToScreen?: (screen: string) => void }
//   ).__navigateToScreen = navigateToScreenFallback;
// }
