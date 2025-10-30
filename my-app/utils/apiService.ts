import { apiClient, retry } from '../utils/apiClient';
import {
  User,
  DeliveryJob,
  Bid,
  ProxyItem,
  ChatThread,
  ChatMessage,
  Notification,
  Transaction,
  UserRole,
  DeliveryStatus,
  NigerianLocation,
  DisputeResolution,

//   JobsResponse,
//   BidsResponse,
//   UsersResponse,
//   ChatThreadsResponse,
//   NotificationsResponse,
//   TransactionsResponse,
//   DashboardAnalyticsResponse,
//   ProfileResponse,
//   WalletBalanceResponse,
//   ProxyStorageResponse,
//   SponsorshipResponse,
//   ReferralStatsResponse,
//   LocationSearchResponse,
//   FileUploadResponse,
} from '../types';

import {   
AuthResponse,
} from '../types/api';

import { ApiResponse } from '../utils/apiClient';
import {
  LoginRequest,
  RegisterRequest,
//   CreateDeliveryJobRequest,
//   UpdateDeliveryJobRequest,
//   CreateBidRequest,
//   UpdateBidRequest,
//   SendMessageRequest,
//   CreateNotificationRequest,
//   UpdateUserRequest,
//   AddPaymentMethodRequest,
//   CreateTransactionRequest,
//   DisputeRequest,
//   UpdateProfileRequest,
//   WithdrawalRequest,
//   LocationSearchRequest,
//   FileUploadRequest,
//   ProxyStorageRequest,
//   SponsorshipRequest,
} from '../types/api';

import {
  VerifyEmailRequest,
  VerifyEmailResponse,
  UpdateUserRequest,
} from '../types/api';

export class ApiService {
  // Authentication
  async login(credentials: LoginRequest): Promise<ApiResponse<AuthResponse>> {
    return retry(() => apiClient.post<AuthResponse>('/user/login', credentials));
  }

  async register(userData: RegisterRequest): Promise<ApiResponse<AuthResponse>> {
    return retry(() => apiClient.post<AuthResponse>('/user/register', userData));
  }

  async refreshToken(refreshToken: string): Promise<ApiResponse<AuthResponse>> {
    return retry(() => apiClient.post<AuthResponse>('/user/refresh', { refreshToken }));
  }

  async logout(): Promise<ApiResponse<void>> {
    return retry(() => apiClient.post<void>('/user/logout'));
  }

  async getCurrentUser(): Promise<ApiResponse<User>> {
    return retry(() => apiClient.get<User>('/user/me'));
  }

  async verifyEmail(request: VerifyEmailRequest): Promise<ApiResponse<VerifyEmailResponse>> {
    return retry(() => apiClient.post<VerifyEmailResponse>('/user/verify-verification-code', request));
  }

  async updateProfile(userId: string, updates: UpdateUserRequest): Promise<ApiResponse<User>> {
    return retry(() => apiClient.put<User>(`/users/${userId}`, updates));
  }

  // Users
//   async getUsers(params?: {
//     role?: UserRole;
//     page?: number;
//     limit?: number;
//     search?: string;
//   }): Promise<ApiResponse<UsersResponse>> {
//     return retry(() => apiClient.get<UsersResponse>('/users', params));
//   }

//   async getUserById(userId: string): Promise<ApiResponse<User>> {
//     return retry(() => apiClient.get<User>(`/users/${userId}`));
//   }

//   async updateUser(userId: string, updates: UpdateUserRequest): Promise<ApiResponse<User>> {
//     return retry(() => apiClient.put<User>(`/users/${userId}`, updates));
//   }

//   async updateProfile(updates: UpdateProfileRequest): Promise<ApiResponse<ProfileResponse>> {
//     return retry(() => apiClient.put<ProfileResponse>('/users/profile', updates));
//   }

//   async getUserProfile(): Promise<ApiResponse<ProfileResponse>> {
//     return retry(() => apiClient.get<ProfileResponse>('/users/profile'));
//   }

//   async uploadProfileImage(file: File): Promise<ApiResponse<{ url: string }>> {
//     const formData = new FormData();
//     formData.append('profileImage', file);
//     return retry(() =>
//       apiClient.post<{ url: string }>('/users/profile/image', formData, {
//         headers: {}, // Let browser set Content-Type for FormData
//       })
//     );
//   }

  // Package/Delivery Jobs Management
  /**
   * Create a new package/delivery job
   * Backend: POST /package/ (not /package/new!)
   * @param packageData - Package details including pickup, dropoff, item info
   * @param images - Optional array of image files to upload
   */
  async createPackage(packageData: {
    title: string;
    description?: string;
    pickupLocation: string;
    dropoffLocation: string;
    senderState: string;
    receiverName: string;
    receiverPhone: string;
    receiverCity: string;
    receiverState: string;
    itemSize: string;
    category?: string;
    weight?: string;
    value: number;
    pickupDate: string;
    notes?: string;
  }, images?: File[]): Promise<ApiResponse<any>> {
    const formData = new FormData();

    // Append package data with ALL required fields
    formData.append('title', packageData.title);
    if (packageData.description) formData.append('description', packageData.description);

    // Location fields
    formData.append('pickupLocation', packageData.pickupLocation);
    formData.append('dropoffLocation', packageData.dropoffLocation);
    formData.append('senderState', packageData.senderState);

    // Receiver fields (all required by backend)
    formData.append('receiverName', packageData.receiverName);
    formData.append('receiverPhone', packageData.receiverPhone);
    formData.append('receiverCity', packageData.receiverCity);
    formData.append('receiverState', packageData.receiverState);

    // Item details
    formData.append('itemSize', packageData.itemSize);
    if (packageData.category) formData.append('category', packageData.category);
    if (packageData.weight) formData.append('weight', packageData.weight);
    formData.append('value', packageData.value.toString());

    // Dates and notes
    formData.append('pickupDate', packageData.pickupDate);
    if (packageData.notes) formData.append('notes', packageData.notes);

    // Append images if provided
    if (images && images.length > 0) {
      images.forEach((image) => {
        formData.append('images', image);
      });
    }

    return retry(() =>
      apiClient.post<any>('/package/', formData, {
        headers: {
          // Don't set Content-Type - let browser set it with boundary for FormData
        } as any
      })
    );
  }

  /**
   * Get all packages for the current user (sender, receiver, pal, or proxy)
   * Backend returns all packages where user is involved in any role
   * Backend: GET /package/user
   */
  async getAllPackages(): Promise<ApiResponse<any[]>> {
    return retry(() => apiClient.get<any[]>('/package/user'));
  }

  /**
   * Get packages sent by user (as sender)
   * Backend doesn't have separate endpoint - we get all and filter on frontend
   */
  async getSentPackages(): Promise<ApiResponse<any[]>> {
    const response = await this.getAllPackages();
    if (response.success && response.data) {
      // Filter packages where user is sender
      // Backend returns packages with sender.senderId
      return {
        ...response,
        data: response.data
      };
    }
    return response;
  }

  /**
   * Get packages received by user (as receiver)
   * Backend doesn't have separate endpoint - we get all and filter on frontend
   */
  async getReceivedPackages(): Promise<ApiResponse<any[]>> {
    return this.getAllPackages();
  }

  /**
   * Get packages for pal (deliverer)
   * Backend doesn't have separate endpoint - we get all and filter on frontend
   */
  async getPalPackages(): Promise<ApiResponse<any[]>> {
    return this.getAllPackages();
  }

  /**
   * Get package by ID
   */
  async getPackageById(packageId: string): Promise<ApiResponse<any>> {
    return retry(() => apiClient.get<any>(`/package/${packageId}`));
  }

  /**
   * Update package
   */
  async updatePackage(packageId: string, updates: any): Promise<ApiResponse<any>> {
    return retry(() => apiClient.patch<any>(`/package/${packageId}`, updates));
  }

  /**
   * Delete package
   */
  async deletePackage(packageId: string): Promise<ApiResponse<void>> {
    return retry(() => apiClient.delete<void>(`/package/${packageId}`));
  }

  /**
   * Place a bid on a package
   */
  async placeBid(packageId: string, bidAmount: number): Promise<ApiResponse<any>> {
    return retry(() => apiClient.post<any>(`/package/${packageId}/bid`, { price: bidAmount }));
  }

  /**
   * Accept a bid on a package
   */
  async acceptBid(packageId: string, bidId: string): Promise<ApiResponse<any>> {
    return retry(() => apiClient.patch<any>(`/package/${packageId}/accept-bid`, { bidId }));
  }

  /**
   * Update package status
   */
  async updatePackageStatus(packageId: string, status: string): Promise<ApiResponse<any>> {
    return retry(() => apiClient.patch<any>(`/package/${packageId}/status`, { status }));
  }

  /**
   * Upload delivery proof
   */
  async uploadDeliveryProof(packageId: string, proofImage: File): Promise<ApiResponse<any>> {
    const formData = new FormData();
    formData.append('proof', proofImage);

    return retry(() =>
      apiClient.post<any>(`/package/${packageId}/proof`, formData, {
        headers: {} as any
      })
    );
  }

//   // Bids
//   async createBid(bidData: CreateBidRequest): Promise<ApiResponse<Bid>> {
//     return retry(() => apiClient.post<Bid>('/bids', bidData));
//   }

//   async updateBid(bidId: string, updates: UpdateBidRequest): Promise<ApiResponse<Bid>> {
//     return retry(() => apiClient.put<Bid>(`/bids/${bidId}`, updates));
//   }

//   async deleteBid(bidId: string): Promise<ApiResponse<void>> {
//     return retry(() => apiClient.delete<void>(`/bids/${bidId}`));
//   }

//   async acceptBid(jobId: string, bidId: string): Promise<ApiResponse<DeliveryJob>> {
//     return retry(() => apiClient.post<DeliveryJob>(`/jobs/${jobId}/bids/${bidId}/accept`));
//   }

//   // Chat and Messaging
//   async getChatThreads(userId: string, params?: { page?: number; limit?: number }): Promise<ApiResponse<ChatThreadsResponse>> {
//     return retry(() => apiClient.get<ChatThreadsResponse>(`/users/${userId}/chat-threads`, params));
//   }

//   async getChatThread(threadId: string): Promise<ApiResponse<ChatThread>> {
//     return retry(() => apiClient.get<ChatThread>(`/chat-threads/${threadId}`));
//   }

//   async sendMessage(messageData: SendMessageRequest): Promise<ApiResponse<ChatMessage>> {
//     return retry(() => apiClient.post<ChatMessage>('/messages', messageData));
//   }

//   async markThreadAsRead(threadId: string): Promise<ApiResponse<void>> {
//     return retry(() => apiClient.post<void>(`/chat-threads/${threadId}/read`));
//   }

//   // Notifications
//   async getNotifications(userId: string, params?: {
//     category?: 'alert' | 'general';
//     unreadOnly?: boolean;
//     page?: number;
//     limit?: number;
//   }): Promise<ApiResponse<NotificationsResponse>> {
//     return retry(() => apiClient.get<NotificationsResponse>(`/users/${userId}/notifications`, params));
//   }

//   async markNotificationAsRead(notificationId: string): Promise<ApiResponse<Notification>> {
//     return retry(() => apiClient.put<Notification>(`/notifications/${notificationId}/read`));
//   }

//   async markAllNotificationsAsRead(userId: string): Promise<ApiResponse<void>> {
//     return retry(() => apiClient.post<void>(`/users/${userId}/notifications/read-all`));
//   }

//   async createNotification(notificationData: CreateNotificationRequest): Promise<ApiResponse<Notification>> {
//     return retry(() => apiClient.post<Notification>('/notifications', notificationData));
//   }

//   // Wallet and Transactions
//   async getWalletBalance(userId: string): Promise<ApiResponse<WalletBalanceResponse>> {
//     return retry(() => apiClient.get<WalletBalanceResponse>(`/users/${userId}/wallet`));
//   }

//   async getTransactions(userId: string, params?: {
//     type?: string;
//     status?: string;
//     page?: number;
//     limit?: number;
//     dateRange?: { start: string; end: string };
//   }): Promise<ApiResponse<TransactionsResponse>> {
//     return retry(() => apiClient.get<TransactionsResponse>(`/users/${userId}/transactions`, params));
//   }

//   async createTransaction(transactionData: CreateTransactionRequest): Promise<ApiResponse<Transaction>> {
//     return retry(() => apiClient.post<Transaction>('/transactions', transactionData));
//   }

//   async withdrawFunds(withdrawalData: WithdrawalRequest): Promise<ApiResponse<Transaction>> {
//     return retry(() => apiClient.post<Transaction>('/transactions/withdraw', withdrawalData));
//   }

//   // Payment Methods
//   async getPaymentMethods(userId: string): Promise<ApiResponse<any[]>> {
//     return retry(() => apiClient.get<any[]>(`/users/${userId}/payment-methods`));
//   }

//   async addPaymentMethod(userId: string, paymentData: AddPaymentMethodRequest): Promise<ApiResponse<any>> {
//     return retry(() => apiClient.post<any>(`/users/${userId}/payment-methods`, paymentData));
//   }

//   async deletePaymentMethod(userId: string, paymentMethodId: string): Promise<ApiResponse<void>> {
//     return retry(() => apiClient.delete<void>(`/users/${userId}/payment-methods/${paymentMethodId}`));
//   }

//   async setDefaultPaymentMethod(userId: string, paymentMethodId: string): Promise<ApiResponse<any>> {
//     return retry(() => apiClient.put<any>(`/users/${userId}/payment-methods/${paymentMethodId}/default`));
//   }

//   // Location Services
//   async searchLocations(searchData: LocationSearchRequest): Promise<ApiResponse<LocationSearchResponse>> {
//     return retry(() => apiClient.post<LocationSearchResponse>('/locations/search', searchData));
//   }

//   async getPopularLocations(): Promise<ApiResponse<NigerianLocation[]>> {
//     return retry(() => apiClient.get<NigerianLocation[]>('/locations/popular'));
//   }

//   async updateLocation(userId: string, location: { lat: number; lng: number; address?: string }): Promise<ApiResponse<User>> {
//     return retry(() => apiClient.put<User>(`/users/${userId}/location`, location));
//   }

//   // File Upload
//   async uploadFile(uploadData: FileUploadRequest): Promise<ApiResponse<FileUploadResponse>> {
//     const formData = new FormData();
//     formData.append('file', uploadData.file);
//     formData.append('type', uploadData.type);
//     if (uploadData.folder) {
//       formData.append('folder', uploadData.folder);
//     }

//     return retry(() =>
//       apiClient.post<FileUploadResponse>('/upload', formData, {
//         headers: {}, // Let browser set Content-Type for FormData
//       })
//     );
//   }

//   async deleteFile(fileId: string): Promise<ApiResponse<void>> {
//     return retry(() => apiClient.delete<void>(`/upload/${fileId}`));
//   }

//   // Analytics and Dashboard
//   async getDashboardAnalytics(userId: string, role: UserRole): Promise<ApiResponse<DashboardAnalyticsResponse>> {
//     return retry(() => apiClient.get<DashboardAnalyticsResponse>(`/users/${userId}/analytics`, { role }));
//   }

//   async getUserAnalytics(userId: string): Promise<ApiResponse<any>> {
//     return retry(() => apiClient.get<any>(`/users/${userId}/analytics`));
//   }

//   // Proxy Services
//   async getProxyItems(userId: string, params?: {
//     status?: ProxyStatus[];
//     page?: number;
//     limit?: number;
//   }): Promise<ApiResponse<any>> {
//     return retry(() => apiClient.get<any>(`/users/${userId}/proxy-items`, params));
//   }

//   async createProxyStorage(storageData: ProxyStorageRequest): Promise<ApiResponse<ProxyStorageResponse>> {
//     return retry(() => apiClient.post<ProxyStorageResponse>('/proxy/storage', storageData));
//   }

//   async updateProxyItem(proxyItemId: string, updates: any): Promise<ApiResponse<ProxyItem>> {
//     return retry(() => apiClient.put<ProxyItem>(`/proxy-items/${proxyItemId}`, updates));
//   }

//   async handoverToReceiver(proxyItemId: string, receiverId: string): Promise<ApiResponse<ProxyItem>> {
//     return retry(() => apiClient.post<ProxyItem>(`/proxy-items/${proxyItemId}/handover`, { receiverId }));
//   }

//   // Dispute Resolution
//   async createDispute(disputeData: DisputeRequest): Promise<ApiResponse<DisputeResolution>> {
//     return retry(() => apiClient.post<DisputeResolution>('/disputes', disputeData));
//   }

//   async getDisputes(userId: string, params?: {
//     status?: DisputeStatus[];
//     page?: number;
//     limit?: number;
//   }): Promise<ApiResponse<any>> {
//     return retry(() => apiClient.get<any>(`/users/${userId}/disputes`, params));
//   }

//   async resolveDispute(disputeId: string, resolution: {
//     resolutionDetails: string;
//     compensationAmount?: number;
//     penaltyAmount?: number;
//   }): Promise<ApiResponse<DisputeResolution>> {
//     return retry(() => apiClient.put<DisputeResolution>(`/disputes/${disputeId}/resolve`, resolution));
//   }

//   // Sponsorship System
//   async createSponsorship(sponsorshipData: SponsorshipRequest): Promise<ApiResponse<SponsorshipResponse>> {
//     return retry(() => apiClient.post<SponsorshipResponse>('/sponsorships', sponsorshipData));
//   }

//   async getUserSponsorships(userId: string): Promise<ApiResponse<any[]>> {
//     return retry(() => apiClient.get<any[]>(`/users/${userId}/sponsorships`));
//   }

//   async getAvailableSponsorships(): Promise<ApiResponse<any[]>> {
//     return retry(() => apiClient.get<any[]>('/sponsorships/available'));
//   }

//   // Referral System
//   async getReferralStats(userId: string): Promise<ApiResponse<ReferralStatsResponse>> {
//     return retry(() => apiClient.get<ReferralStatsResponse>(`/users/${userId}/referrals`));
//   }

//   async createReferralCode(userId: string, code: string, reward: number): Promise<ApiResponse<any>> {
//     return retry(() => apiClient.post<any>(`/users/${userId}/referral-codes`, { code, reward }));
//   }

//   async applyReferralCode(code: string): Promise<ApiResponse<{ discount: number; message: string }>> {
//     return retry(() => apiClient.post<{ discount: number; message: string }>('/referrals/apply', { code }));
//   }

//   // QR Code and Verification
//   async verifyItemScan(jobId: string, scanData: {
//     itemId?: string;
//     itemName?: string;
//     category?: string;
//     size?: string;
//     estimatedWeight?: string;
//     color?: string;
//     confidence: number;
//     images?: string[];
//     features?: number;
//     scanHash?: string;
//   }): Promise<ApiResponse<any>> {
//     return retry(() => apiClient.post<any>(`/jobs/${jobId}/verify-scan`, scanData));
//   }

//   async generateQRCode(jobId: string, type: 'pickup' | 'delivery' | 'handover'): Promise<ApiResponse<{ qrCode: string; expiresAt: string }>> {
//     return retry(() => apiClient.post<{ qrCode: string; expiresAt: string }>(`/jobs/${jobId}/qr-code`, { type }));
//   }

//   async verifyQRCode(jobId: string, token: string): Promise<ApiResponse<{ verified: boolean; message: string }>> {
//     return retry(() => apiClient.post<{ verified: boolean; message: string }>(`/jobs/${jobId}/verify-qr`, { token }));
//   }

//   // Route and Navigation
//   async getRoute(from: { lat: number; lng: number }, to: { lat: number; lng: number }, vehicleType?: VehicleType): Promise<ApiResponse<{
//     distance: number;
//     duration: number;
//     polyline: string;
//     instructions: string[];
//   }>> {
//     return retry(() => apiClient.get<{
//       distance: number;
//       duration: number;
//       polyline: string;
//       instructions: string[];
//     }>('/routes', { fromLat: from.lat.toString(), fromLng: from.lng.toString(), toLat: to.lat.toString(), toLng: to.lng.toString(), vehicleType }));
//   }

//   async getNearbyUsers(userId: string, location: { lat: number; lng: number }, radius?: number): Promise<ApiResponse<any[]>> {
//     return retry(() => apiClient.get<any[]>(`/users/${userId}/nearby`, {
//       lat: location.lat.toString(),
//       lng: location.lng.toString(),
//       radius: radius?.toString()
//     }));
//   }

//   // System and Configuration
//   async getSystemNotices(): Promise<ApiResponse<any[]>> {
//     return retry(() => apiClient.get<any[]>('/system/notices'));
//   }

//   async getAppConfig(): Promise<ApiResponse<any>> {
//     return retry(() => apiClient.get<any>('/config'));
//   }

//   async healthCheck(): Promise<ApiResponse<{ status: string; timestamp: string }>> {
//     return retry(() => apiClient.get<{ status: string; timestamp: string }>('/health'));
//   }

//   // Admin and Support
//   async getSupportTickets(userId: string): Promise<ApiResponse<any[]>> {
//     return retry(() => apiClient.get<any[]>(`/users/${userId}/support-tickets`));
//   }

//   async createSupportTicket(ticketData: {
//     subject: string;
//     message: string;
//     priority: 'low' | 'medium' | 'high';
//     category: string;
//     jobId?: string;
//   }): Promise<ApiResponse<any>> {
//     return retry(() => apiClient.post<any>('/support-tickets', ticketData));
//   }

//   async updateSupportTicket(ticketId: string, updates: { message: string; status?: string }): Promise<ApiResponse<any>> {
//     return retry(() => apiClient.put<any>(`/support-tickets/${ticketId}`, updates));
//   }
}

// // Create and export a default API service instance
export const apiService = new ApiService();