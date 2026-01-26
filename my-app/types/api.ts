import {
  User,
  DeliveryJob,
  ProxyItem,
  UserRole,
  DeliveryStatus,
  ItemSize,
  //   VehicleType,
} from "./index";

// API Request/Response Types
export interface LoginRequest {
  detail: {
    email?: string;
    userName?: string;
  };
  password: string;
  deviceInfo?: {
    userAgent: string;
    ipAddress?: string;
  };
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  phone: string;
  password: string;
  role: UserRole;
  //   vehicleType?: VehicleType;
  location?: {
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  referralCode?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
  expiresIn: number;
  // Alternative token field names for backend compatibility
  accessToken?: string;
  jwt?: string;
  authToken?: string;
  // Nested tokens object (for your backend format)
  tokens?: {
    accessToken: string;
    refreshToken: string;
  };
}

export interface PreRegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city?: string;
  state?: string;
  interests: ("pal" | "sender" | "receiver" | "proxy")[];
  referralCode?: string;
}

export interface PreRegisterResponse {
  message: string;
  data: {
    rowNumber: number;
    email: string;
    timestamp: string;
  };
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

export interface CreateDeliveryJobRequest {
  title: string;
  description?: string;
  pickupLocation: string;
  dropoffLocation: string;
  itemSize: ItemSize;
  category?: string;
  weight?: string;
  value: number;
  pickupDate: string;
  notes?: string;
  images?: File[];
  receiverName?: string;
  receiverPhone?: string;
}

export interface UpdateDeliveryJobRequest {
  title?: string;
  description?: string;
  pickupLocation?: string;
  dropoffLocation?: string;
  itemSize?: ItemSize;
  category?: string;
  weight?: string;
  value?: number;
  pickupDate?: string;
  notes?: string;
  images?: File[];
  receiverName?: string;
  receiverPhone?: string;
}

export interface CreateBidRequest {
  jobId: string;
  amount: number;
  estimatedTime: string;
  message: string;
  //   vehicleType: VehicleType;
}

export interface UpdateBidRequest {
  amount?: number;
  estimatedTime?: string;
  message?: string;
}

// export interface SendMessageRequest {
//   chatThreadId: string;
//   message: string;
//   type?: 'text' | 'image' | 'location';
//   metadata?: Record<string, any>;
// }

// export interface CreateNotificationRequest {
//   userId: string;
//   type: string;
//   title: string;
//   message: string;
//   jobId?: string;
//   priority?: 'urgent' | 'normal' | 'low';
//   metadata?: Record<string, any>;
// }

export interface UpdateUserRequest {
  firstName?: string;
  lastName?: string;
  userName?: string;
  email?: string;
  phone?: string;
  profileImage?: File;
  preferences?: {
    notifications?: {
      push?: boolean;
      email?: boolean;
      sms?: boolean;
    };
    privacy?: {
      shareLocation?: boolean;
      shareProfile?: boolean;
    };
    delivery?: {
      autoAcceptRadius?: number;
      //   preferredVehicles?: VehicleType[];
    };
  };
}

export interface AddPaymentMethodRequest {
  type: "card" | "bank";
  cardDetails?: {
    number: string;
    expiryMonth: number;
    expiryYear: number;
    cvv: string;
    holderName: string;
  };
  bankDetails?: {
    bankName: string;
    accountNumber: string;
    accountName: string;
    routingNumber?: string;
  };
}

// export interface CreateTransactionRequest {
//   type: string;
//   amount: number;
//   paymentMethod: 'wallet' | 'bank_transfer' | 'card';
//   description?: string;
//   jobId?: string;
//   metadata?: Record<string, any>;
// }

export interface DisputeRequest {
  jobId: string;
  reason: string;
  description: string;
  evidence?: File[];
}

// API Response Types
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface JobsResponse extends PaginatedResponse<DeliveryJob> {
  filters?: {
    status?: DeliveryStatus[];
    role?: UserRole;
    dateRange?: {
      start: string;
      end: string;
    };
  };
}

// export interface BidsResponse extends PaginatedResponse<Bid> {}

// export interface UsersResponse extends PaginatedResponse<User> {}

// export interface ChatThreadsResponse extends PaginatedResponse<ChatThread> {}

// export interface NotificationsResponse extends PaginatedResponse<Notification> {}

// export interface TransactionsResponse extends PaginatedResponse<Transaction> {}

// Location and Search Types
export interface LocationSearchRequest {
  query: string;
  limit?: number;
  types?: ("city" | "town" | "village" | "landmark")[];
}

export interface LocationSearchResponse {
  locations: Array<{
    id: string;
    name: string;
    state: string;
    lga: string;
    type: "city" | "town" | "village" | "landmark";
    coordinates: {
      lat: number;
      lng: number;
    };
    isPopular: boolean;
  }>;
}

// File Upload Types
export interface FileUploadResponse {
  id: string;
  url: string;
  filename: string;
  size: number;
  mimeType: string;
  uploadedAt: string;
}

export interface FileUploadRequest {
  file: File;
  type: "image" | "document" | "evidence";
  folder?: string;
}

// Analytics Types
export interface DashboardAnalyticsResponse {
  totalDeliveries: number;
  totalEarnings: number;
  activeJobs: number;
  completedJobs: number;
  pendingJobs: number;
  averageRating: number;
  completionRate: number;
  recentActivity: Array<{
    type: string;
    title: string;
    timestamp: string;
    amount?: number;
  }>;
}

// Profile and Settings Types
export interface ProfileResponse {
  user: User;
  stats: {
    totalDeliveries: number;
    totalEarnings: number;
    averageRating: number;
    completionRate: number;
    joinedDate: string;
  };
  preferences: User["preferences"];
}

export interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
  userName?: string;
  email?: string;
  phone?: string;
  profileImage?: File;
  preferences?: User["preferences"];
}

// Error Types
export interface ValidationError {
  field: string;
  message: string;
}

export interface ApiErrorResponse {
  message: string;
  errors?: ValidationError[];
  code?: string;
  details?: Record<string, unknown>;
}

// WebSocket and Real-time Types
// export interface WebSocketMessage {
//   type: 'job_update' | 'bid_placed' | 'message' | 'notification' | 'location_update';
//   data: any;
//   timestamp: string;
//   userId?: string;
// }

export interface LocationUpdateRequest {
  latitude: number;
  longitude: number;
  accuracy?: number;
  jobId?: string;
}

export interface LocationUpdateResponse {
  location: {
    lat: number;
    lng: number;
    timestamp: string;
    accuracy?: number;
  };
  nearbyUsers?: Array<{
    id: string;
    name: string;
    role: UserRole;
    distance: number;
  }>;
}

// Proxy and Storage Types
export interface ProxyStorageRequest {
  jobId: string;
  proxyId: string;
  duration: number; // days
  storageFee: number;
  notes?: string;
}

export interface ProxyStorageResponse {
  proxyItem: ProxyItem;
  estimatedFee: number;
  availableUntil: string;
}

// Payment and Wallet Types
export interface WalletBalanceResponse {
  balance: number;
  currency: string;
  lastUpdated: string;
  pendingWithdrawals: number;
  availableBalance: number;
}

export interface WithdrawalRequest {
  amount: number;
  paymentMethodId: string;
  description?: string;
}

export interface PaymentMethodResponse {
  id: string;
  type: "card" | "bank";
  last4: string;
  isDefault: boolean;
  brand?: string;
  bankName?: string;
  expiryMonth?: number;
  expiryYear?: number;
  accountNumber?: string;
  accountName?: string;
}

// Sponsorship and Referral Types
export interface SponsorshipRequest {
  beneficiaryId: string;
  amount: number;
  duration: number; // days
  commissionRate: number;
  message?: string;
  isAnonymous?: boolean;
}

export interface SponsorshipResponse {
  sponsorship: {
    id: string;
    sponsorId: string;
    beneficiaryId: string;
    amount: number;
    commissionRate: number;
    duration: number;
    startDate: string;
    endDate: string;
    status: "active" | "completed" | "cancelled";
    message?: string;
    isAnonymous: boolean;
  };
}

export interface ReferralStatsResponse {
  totalReferrals: number;
  activeReferrals: number;
  totalEarnings: number;
  availableBalance: number;
  referralCode: string;
  recentReferrals: Array<{
    id: string;
    refereeName: string;
    joinDate: string;
    status: "active" | "completed";
    earnings: number;
  }>;
}

// Pricing Types
export interface PricingSuggestionRequest {
  pickupLocation: string;
  dropoffLocation: string;
  packageSize: string;
  urgency?: "low" | "medium" | "high";
  pickupTime?: string;
}

export interface PricingSuggestionResponse {
  suggestedPrice: number;
  currency: string;
  breakdown: {
    basePrice: number;
    distanceFee: number;
    sizeFee: number;
    urgencyFee?: number;
    weatherAdjustment?: number;
    trafficAdjustment?: number;
  };
  estimatedDeliveryTime: string;
  confidence: number;
  factors: {
    distance: number;
    estimatedDuration: number;
    difficulty: "easy" | "medium" | "hard";
  };
}

// Backend Package Response Types (MongoDB format)
export interface BackendPackageResponse {
  _id: string; // MongoDB ObjectId
  id?: string; // Optional alternative field
  title: string;
  description?: string;
  pickupLocation: string;
  dropoffLocation: string;
  itemSize: string;
  category?: string;
  weight?: string;
  value: number;
  price?: number; // Backend may use price instead of value
  pickupDate: string;
  notes?: string;
  status: string;
  createdAt: string;
  orderNumber?: string;
  pickupTime?: string;
  escrowAmount?: number;

  // Nested objects from backend
  sender?: {
    id?: string;
    senderId?: string | { _id: string }; // Can be string or object with _id
    name?: string;
    phone?: string;
    formattedAddress?: string;
  };
  receiver?: {
    id?: string;
    name?: string;
    phone?: string;
    formattedAddress?: string;
  };
  items?: Array<{
    size?: string;
    category?: string;
    weight?: string;
    images?: Array<{ url: string }>;
  }>;
  bids?: Array<{
    _id: string;
    id?: string;
    amount: number;
    palId: string;
    palName?: string;
    message?: string;
    placedAt?: string;
    status?: string;
  }>;
  pal?: {
    palId?: string;
    name?: string;
    phone?: string;
    location?: {
      type: string;
      coordinates?: number[];
    };
    lockedEscrowAmount?: number;
    acceptedBid?: number;
  };
  proxy?: {
    proxyId?: string;
    name?: string;
    phone?: string;
    location?: {
      type: string;
      coordinates?: number[];
    };
    lockedEscrowAmount?: number;
    acceptedBid?: number;
  };
}
