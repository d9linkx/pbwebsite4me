export const ROUTES = {
  // Website routes
  HOME: "/",
  ABOUT: "/about",
  HOW_IT_WORKS: "/how-it-works",
  PRICING: "/pricing",
  SAFETY: "/safety",
  FAQS: "/faqs",
  CONTACT: "/contact",
  TERMS: "/terms",
  PRIVACY: "/privacy",
  BECOME_PAL: "/become-pal",
  BECOME_PROXY: "/become-proxy",
  SEND_ITEMS: "/send-items",

  // App routes

  // Core
  SPLASH: "/splash",
  ONBOARDING: "/onboarding",
  AUTH: "/auth",
  EMAIL_VERIFICATION: "/email-verification",

  // Dashboards
  DASHBOARD: "/dashboard",
  PROXY_DASHBOARD: "/proxy",
  RECEIVER_DASHBOARD: "/receiver",

  // Jobs & Bids
  AVAILABLE_JOBS: "/jobs",
  BIDS: "/bids",
  ACCEPTED_BIDS: "/accepted-bids",

  // Deliveries
  MY_DELIVERIES: "/my-deliveries",
  SENT_DELIVERIES_HISTORY: "/sent-deliveries-history",
  RECEIVED_DELIVERIES: "/received-deliveries",
  PROXY_DELIVERIES: "/proxy-deliveries",

  DELIVERY_PROGRESS: "/delivery-progress",
  TRACKING: "/tracking",
  PICKUP_CONFIRMATION: "/pickup-confirmation",
  PICKUP_VERIFICATION: "/pickup-verification",
  HANDOVER_QR: "/handover-qr",
  ARRIVAL_CONFIRMATION: "/arrival-confirmation",
  DELIVERY_CONFIRMATION: "/delivery-confirmation",
  DELIVERY_COMPLETED: "/delivery-completed",
  POST_DELIVERY: "/post-delivery",
  POST_DELIVERY_EDIT: "/post-delivery-edit",

  // Proxy flow
  PROXY_SELECTION: "/proxy-selection",
  PROXY_CONFIRMATION: "/proxy-confirmation",
  PROXY_COMPLETED: "/proxy-completed",
  PROXY_ITEM_SCAN: "/proxy-item-scan",
  PROXY_TO_RECEIVER_HANDOVER: "/proxy-to-receiver-handover",
  PROXY_HANDOVER_DIRECTIONS: "/proxy-handover-directions",
  PROXY_ACCEPTANCE_CODE: "/proxy-acceptance-code",

  // Payments & Wallet
  WALLET: "/wallet",
  WALLET_ADD_FUNDS: "/wallet-add-funds",
  WALLET_WITHDRAW: "/wallet-withdraw",
  ESCROW_PAYMENT: "/escrow-payment",
  PAYMENT_CONFIRMATION: "/payment-confirmation",
  PAYMENT_STATUS: "/payment-status",
  BANK_TRANSFER: "/bank-transfer",
  CARD_PAYMENT: "/card-payment",
  PAYMENT_METHODS: "/payment-methods",

  // Profile & Settings
  SETTINGS: "/settings",
  PROFILE: "/profile",
  PROFILE_INFORMATION: "/profile-information",
  PAL_PROFILE: "/pal-profile",
  VERIFICATION: "/verification",
  RATINGS: "/ratings",

  // Chat & Notifications
  CHAT: "/chat",
  NOTIFICATIONS: "/notifications",

  // Referrals & Sponsorship
  REFERRAL: "/referral",
  SPONSORSHIP: "/sponsorship",
  SPONSOR_SEARCH: "/sponsor-search",
  SPONSOR_USER_SEARCH: "/sponsor-user-search",
  SPONSOR_USER_CONFIRMATION: "/sponsor-user-confirmation",
  SPONSORSHIP_SUCCESS: "/sponsorship-success",
  SPONSORSHIP_MANAGEMENT: "/sponsorship-management",
  SPONSORSHIP_DETAILS: "/sponsorship-details",

  // Support & Help
  HELP_CENTER: "/help",
  CONTACT_SUPPORT: "/contact-support",
  SUPPORT_RESOLUTION: "/support-resolution",
  EVIDENCE_COLLECTION: "/evidence-collection",

  // Misc
  QR_SCANNER: "/qr-scanner",
  LOCATION_SELECTION: "/location-selection",
  ITEM_EDIT: "/item-edit",
  ITEM_MISMATCH_NOTIFICATION: "/item-mismatch-notification",

  // Role onboarding
  BECOME_SENDER: "/become-sender",
  BECOME_RECEIVER: "/become-receiver",

  // Special flows
  FAVORITE_PAL_INPUT: "/favorite-pal-input",
  FAVORITE_PAL_CONFIRMATION: "/favorite-pal-confirmation",
  PAL_ACCEPTANCE_NOTIFICATION: "/pal-acceptance-notification",
  PAL_WAITING: "/pal-waiting",
  TAPE_DISTRIBUTOR: "/tape-distributor",
  ROUTE_ADS_MANAGEMENT: "/route-ads-management",

  CANCELLATION_CONFIRMATION: "/cancellation-confirmation",
  RECEIVER_CONFIRMATION: "/receiver-confirmation",
  SENDER_RESOLUTION: "/sender-resolution",
} as const;

// Helper to check if a route is an app route
export const isAppRoute = (path: string): boolean => {
  const appRoutes = [
    "/auth",
    "/dashboard",
    "/wallet",
    "/settings",
    "/profile",
    "/payment",
    "/jobs",
    "/chat",
    "/notifications",
    "/proxy",
    "/help",
    "/sponsorship",
    "/referrals",
    "/ratings",
  ];
  return appRoutes.some((route) => path.startsWith(route));
};
