// Core types for the Prawnbox delivery application

export type Screen = 
  // Website Screens
  | 'website-home'
  | 'website-about'
  | 'website-how-it-works'
  | 'website-pricing'
  | 'website-safety'
  | 'website-faqs'
  | 'website-contact'
  | 'website-terms'
  | 'website-privacy'
  // App Screens
  | 'splash'
  | 'onboarding'
  | 'auth'
  | 'email-verification'
  | 'dashboard'
  | 'post-delivery'
  | 'pal-profile'
  | 'escrow-payment'
  | 'payment-confirmation'
  | 'available-jobs'
  | 'bid-edit'
  | 'tracking'
  | 'delivery-completion'
  | 'proxy-selection'
  | 'chat'
  | 'wallet'
  | 'wallet-add-funds'
  | 'wallet-withdraw'
  | 'bank-transfer'
  | 'card-payment'
  | 'payment-status'
  | 'location-selection'
  | 'referral'
  | 'sponsorship'
  | 'sponsor-search'
  | 'sponsor-user-search'
  | 'sponsor-user-confirmation'
  | 'sponsorship-success'
  | 'settings'
  | 'profile-information'
  | 'verification'
  | 'payment-methods'
  | 'help-center'
  | 'contact-support'
  | 'proxy-dashboard'
  | 'route-ads-management'

  | 'ratings'
  | 'qr-scanner'
  | 'pickup-confirmation'
  | 'pickup-verification'
  | 'handover-qr'
  | 'accepted-bids'
  | 'my-deliveries'
  | 'receiver-dashboard'
  | 'sponsorship-management'
  | 'sponsorship-details'
  | 'bids'
  | 'website-become-pal'
  | 'website-become-proxy'
  | 'website-send-items'
  | 'website-home'
  | "proxy-to-receiver-handover"
  | 'delivery-progress'
  | 'delivery-confirmation'
  | 'arrival-confirmation'
  | 'item-mismatch-notification'
  | 'sender-resolution'
  | 'cancellation-confirmation'
  | 'pal-waiting'
  | 'support-resolution'
  | 'evidence-collection'
  | 'notifications'
  | 'item-edit'
  | 'post-delivery-edit'
  | 'receiver-confirmation'
  | 'delivery-completed'
  | 'tape-distributor'
  | 'become-pal'
  | 'become-sender'
  | 'become-receiver'
  | 'become-proxy'
  | 'proxy-confirmation'
  | 'proxy-completed'
  | 'proxy-item-scan'
  | 'favorite-pal-input'
  | 'favorite-pal-confirmation'
  | 'pal-acceptance-notification'
  | 'proxy-acceptance-code'
  | 'proxy-handover-directions'
  | 'sent-deliveries-history'
  | 'proxy-deliveries'
  | 'received-deliveries'
  | 'sponsorship-management'
  | 'sponsorship-details';

export type UserRole = 'sender' | 'pal' | 'receiver' | 'proxy';

export type DeliveryStatus = 
  | 'pending'
  | 'bidding'
  | 'assigned'
  | 'picked-up'
  | 'in-transit'
  | 'arrived'
  | 'delivered'
  | 'completed'
  | 'cancelled'
  | 'disputed';

export type ItemSize = 'Small' | 'Medium' | 'Large';

export interface Item {
  title: string;
  description: string;
  category: string;
  size: string;
  weight?: string;
}

export interface VerifyEmailRequest {
  email: string;
  verificationCode: string;
}

export interface VerifyEmailResponse {
  success: boolean;
  message: string;
  user?: User;
  token?: string;
  refreshToken?: string;
  expiresIn?: number;
}

export type ProxyStatus = 'incoming' | 'stored' | 'completed' | 'returned' | 'waiting-pickup' | 'ready-pickup' | 'collected';

export type DisputeStatus = 'pending' | 'resolved' | 'escalated' | 'timeout';

export interface DisputeResolutionMetrics {
  disputeId: string;
  resolutionTimeMs: number;
  resolutionTimeHours: number;
  disputeType: string;
  jobValue: number;
  automaticResolution: boolean;
  timestamp: string;
}

export interface Dispute{
  id: string;
  jobId: string;
  reason: string;
  details: string;
  reportedBy: string;
  reportedAt: string;
  status: DisputeStatus;
  resolution?: DisputeResolution;
}

export interface User {
  id: string;
  _id?: string; // MongoDB ObjectId field
  userName: string;
  firstName: string;
  lastName: string;
  name: string; // Full name (computed from firstName + lastName)
  fullName?: string;
  email: string;
  phone: string; // Frontend expects 'phone', backend returns 'phoneNumber'
  phoneNumber?: string; // Backend field name
  role: UserRole;
  profileImage?: string;
  walletBalance?: number;
  rating?: number;
  totalDeliveries?: number;
  joinedDate?: string;
  vehicleType?: 'car' | 'motorcycle' | 'bike' | 'truck' | 'van' | 'bicycle';
  isVerified?: boolean;
  governmentIdUrl?: string;
  governmentIdStatus?: 'pending' | 'verified' | 'rejected';
  activeEscrows?: SponsorshipEscrow[];
  transactions?: Transaction[];
  bankAccounts?: BankAccount[];
  cards?: PaymentCard[];
  preferences?: UserPreferences;
  location?: {
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
}

export interface UserPreferences {
  notifications: {
    push: boolean;
    email: boolean;
    sms: boolean;
  };
  privacy: {
    shareLocation: boolean;
    shareProfile: boolean;
  };
  delivery: {
    autoAcceptRadius: number;
    preferredVehicles: VehicleType[];
  };
  emailUpdate?: boolean;
  smsUpdate?: boolean;
}

// Sponsorship system types
export interface SponsorshipEscrow {
  id: string;
  beneficiaryName: string;
  beneficiaryId: string;
  amount: number;
  availableAmount: number;
  usedAmount: number;
  commissionRate: number;
  totalEarnings: number;
  pendingReturn: number;
  endDate: string;
  startDate: string;
  status: 'active' | 'completed' | 'cancelled';
}

export interface BankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
  isDefault: boolean;
}

export interface PaymentCard {
  id: string;
  last4: string;
  brand: string;
  expiryMonth: number;
  expiryYear: number;
  isDefault: boolean;
}

export type PaymentMethod = 
  | {
      type: 'card';
      id: string;
      last4: string;
      brand: string;
      expiryMonth: number;
      expiryYear: number;
      isDefault: boolean;
    }
  | {
      type: 'bank';
      id: string;
      bankName: string;
      accountNumber: string;
      accountName: string;
      isDefault: boolean;
    };

export interface Transaction {
  id: string;
  userId: string;
  type: 'earning' | 'withdrawal' | 'escrow_payment' | 'refund' | 'fee' | 'bonus' | 'tip_payment' | 'storage_fee' | 'wallet_topup' | 'equipment_fee';
  amount: number; // Positive for credits, negative for debits
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  description: string;
  jobId?: string;
  timestamp: string;
  paymentMethod: 'wallet' | 'bank_transfer' | 'card' | 'cash';
  reference: string;
  metadata?: {
    [key: string]: unknown;
  };
}

export interface DispurteResolution {
  id: string;
  disputeId: string;
  resolverId: string; // User ID of the support agent or system that resolved it
  resolutionDetails: string;
  compensationAmount?: number; // NGN
  penaltyAmount?: number; // NGN
  resolvedAt: string;
}

export interface DeliveryJob {
  id: string;
  orderNumber: string;
  senderId: string;
  senderName: string;
  senderPhone?: string;
  receiverId?: string;
  receiverName?: string;
  receiverPhone?: string;
  selectedPalId?: string;
  selectedPalName?: string;
  selectedPalPhone?: string;
  proxyId?: string;
  proxyName?: string; // Name of the proxy associated with this delivery
  chatId?: string;
  
  title: string;
  pickupLocation: string;
  dropoffLocation: string;
  itemSize: ItemSize;
  category?: string;
  itemColor?: string;
  weight?: string;
  value: number;
  pickupDate: string;
  pickupTime: string;
  notes?: string;
  images?: string[];
  description?: string;
  distance?: number; // km
  
  status: DeliveryStatus;
  bids: Bid[];
  acceptedBidAmount?: number;
  escrowAmount?: number;
  escrowId?: string;
  
  isLive?: boolean;
  createdAt: string;
  updatedAt?: string;
  completedAt?: string;
  deliveredAt?: string;
  acceptedAt?: string; // When Pal accepts the job
  
  // Dispute fields
  isDisputed?: boolean;
  disputeReason?: string;
  disputeDetails?: string;
  disputeTimestamp?: string;
  disputeTimeoutAt?: string;
  violationFee?: number;
  disputeResolution?: DisputeResolution;
  
  // Tracking
  currentLocation?: {
    lat: number;
    lng: number;
    timestamp: string;
  };
  
  // Location Privacy & "I'm Here" Feature
  locationPrivacy?: {
    isPalLocationVisible: boolean; // true when Pal triggers "I'm here"
    palRevealedLocationAt?: string; // timestamp when Pal revealed location
    palRevealedLocation?: {
      lat: number;
      lng: number;
    };
    isWithinProximity?: boolean; // true when Pal is within 5-10m of destination
    proximityDistance?: number; // actual distance in meters
  };
  
  // Item verification scan data (Enhanced for AI matching)
  itemScanData?: {
    itemId?: string;
    itemName?: string;
    category?: string;
    size?: string;
    estimatedWeight?: string;
    color?: string;
    confidence: number;
    timestamp: string;
    features?: number;
    scanHash?: string;
    scannedBy: string;
    scanType: 'sender_verification' | 'pal_pickup' | 'receiver_delivery';
    images?: string[];
    detectionDetails?: unknown;
    cameraUsed?: boolean;
  };
  
  // Metadata
  metadata?: {
    [key: string]: unknown;
  };
}

export type VehicleType = 'car' | 'motorcycle' | 'bike' | 'truck' | 'van' | 'bicycle';

export interface Bid {
  id: string;
  palId: string;
  palName: string;
  palRating: number;
  vehicleType: VehicleType;
  estimatedTime: string;
  amount: number;
  message: string;
  placedAt: string;
  canEdit: boolean;
  isAccepted?: boolean;
}

export interface ProxyItem {
  id: string;
  jobId?: string;
  title: string;
  senderName: string;
  receiverName: string;
  receiverPhone: string;
  status: ProxyStatus;
  dropoffDate: string;
  storedDate?: string; // When item was stored by proxy
  value: number;
  storageFee: number;
  storageEarnings?: number; // Earnings from completed proxy storage
  itemSize: ItemSize;
  size?: string; // Backward compatibility alias for itemSize
  weight: string;
  notes?: string;
  images?: string[];
  notificationAttempts?: number;
  maxStorageDays: number;
  daysStored: number;
  createdAt: string;
}

export interface ChatThread {
  id: string;
  jobId: string;
  participants: string[]; // User IDs
  otherUserName?: string; // Display name of the other user in the chat
  otherUserPhone?: string; // Phone number of the other user
  jobTitle?: string; // Title of the related job
  lastActivity: string;
  messages: ChatMessage[];
  awaitingUserChoice?: boolean;
  supportAgentState?: string;
}

export interface ChatMessage {
  id: string;
  threadId: string; // Links message to a specific chat thread
  senderId: string; // Can be 'system' for system messages
  senderName: string;
  senderRole: UserRole | 'system';
  message: string;
  timestamp: string;
  type: 'text' | 'image' | 'system' | 'location';
  read: boolean;
  metadata?: {
    [key: string]: unknown;
  };
}

export interface CommunicationMessage {
  id: string;
  from: string; // User ID of sender
  fromRole: UserRole;
  to: 'sender' | 'pal' | 'receiver' | 'support';
  message: string;
  urgency: 'low' | 'medium' | 'high';
  timestamp: string;
  jobId?: string; // Optional job reference
  read: boolean;
}

export interface NigerianLocation {
  id: string;
  name: string;
  state: string;
  lga: string; // Local Government Area
  type: 'city' | 'town' | 'village' | 'landmark';
  coordinates: {
    lat: number;
    lng: number;
  };
  isPopular: boolean;
}

export interface DisputeResolution {
  id: string;
  jobId: string;
  palId?: string; // Pal involved in the dispute
  senderId?: string; // Sender involved in the dispute
  reason: string;
  description: string;
  reportedBy: string;
  reportedAt: string;
  status: DisputeStatus;
  evidence?: EvidenceFile[];
  resolution?: string;
  resolvedAt?: string;
  timestamp: string;
  timeoutAt?: string;
  involvedParties: string[];
  compensationAmount?: number;
  penaltyAmount?: number;
}

export type NotificationCategory = 'alert' | 'general';

export interface Notification {
  id: string;
  userId: string;
  type: 'bid-placed' | 'delivery-assigned' | 'delivery-completed' | 'payment-received' | 'item-edit-request' | 'dispute-flagged' | 'rating-received' | 'system-message' | 'promo-offer' | 'delivery-update' | 'item-verified' | 'wallet-topup' | 'delivery-posted' | 'payment-processed' | 'tip-payment'| 'delivery-picked-up';
  actionUrl?: string; // Optional URL to navigate to when the notification is clicked
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionRequired: boolean;
  priority?: 'urgent' | 'normal' | 'low'; // Time-sensitive priority level
  category?: NotificationCategory; // Categorize as alert or general
  jobId?: string;
  metadata?: {
    [key: string]: unknown;
  };
}

export interface AppConfig {
  maxDeliveryDistance: number; // km
  platformFeePercentage: number;
  minPlatformFee: number; // NGN
  maxImageSize: number; // bytes
  supportedImageTypes: string[];
  disputeTimeoutMinutes: number;
  maxBidsPerJob: number;
  walletMinBalance: number; // NGN
  withdrawalMinAmount: number; // NGN
}

export type ImageUploadStatus = 'idle' | 'uploading' | 'success' | 'error';

export interface ImageUpload {
  id: string;
  file: File;
  preview: string;
  status: ImageUploadStatus;
  progress?: number;
  error?: string;
}

export interface EvidenceFile {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadedAt: string;
  url: string;
}

export interface FavoritePalJobData {
  jobId: string;
  palId: string;
  palName: string;
  jobTitle: string;
  status: DeliveryStatus;
  amount: number;
}

export interface RatingData {
  rating: number;
  review: string;
  photoTaken: boolean;
}

export interface FavoritePalData {
  id: string;
  userName: string;
  firstName: string;
  lastName: string;
  name: string; // Full name (computed from firstName + lastName)
  phone: string;
  rating: number;
  totalDeliveries: number;
  // vehicleType: VehicleType;
  isVerified: boolean;
}

export interface ProxyUserData {
  id: string;
  name: string;
  phone: string;
  location: string;
  rating: number;
  isVerified: boolean;
  businessName?: string;
}

// Payment types
export interface EscrowPayment {
  id: string;
  jobId: string;
  senderId: string;
  palId: string;
  amount: number;
  platformFee: number;
  totalAmount: number;
  status: 'pending' | 'held' | 'released' | 'refunded';
  createdAt: string;
  releasedAt?: string;
}

// Referral system types
export interface ReferralCode {
  id: string;
  userId: string;
  code: string;
  type: 'sender' | 'pal' | 'universal';
  usageCount: number;
  maxUsage?: number;
  reward: number; // NGN
  isActive: boolean;
  expiresAt?: string;
  createdAt: string;
}

export interface ReferralReward {
  id: string;
  referrerId: string;
  refereeId: string;
  referralCodeId: string;
  amount: number;
  status: 'pending' | 'paid' | 'expired';
  createdAt: string;
  paidAt?: string;
}

// Analytics types
export interface UserAnalytics {
  totalDeliveries: number;
  totalEarnings: number;
  averageRating: number;
  completionRate: number;
  activeHours: number;
  favoriteRoutes: string[];
  peakHours: number[];
  monthlyStats: {
    month: string;
    deliveries: number;
    earnings: number;
    rating: number;
  }[];
}

// System maintenance types
export interface SystemNotice {
  id: string;
  type: 'maintenance' | 'update' | 'announcement';
  title: string;
  message: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  startTime?: string;
  endTime?: string;
  affectedFeatures?: string[];
  isActive: boolean;
  targetUsers?: UserRole[];
  createdAt: string;
}