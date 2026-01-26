import { apiClient, retry } from "../utils/apiClient";
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
} from "../types";

import {
  AuthResponse,
  BackendPackageResponse,
  PreRegisterRequest,
  PreRegisterResponse,
} from "../types/api";

import { ApiResponse } from "../utils/apiClient";
import {
  LoginRequest,
  RegisterRequest,
  //   AddPaymentMethodRequest,
  //   CreateTransactionRequest,
  //   DisputeRequest,
  //   UpdateProfileRequest,
  //   WithdrawalRequest,
  //   LocationSearchRequest,
  //   FileUploadRequest,
  //   ProxyStorageRequest,
  //   SponsorshipRequest,
} from "../types/api";

import {
  VerifyEmailRequest,
  VerifyEmailResponse,
  UpdateUserRequest,
  PricingSuggestionRequest,
  PricingSuggestionResponse,
} from "../types/api";

export class ApiService {
  // Authentication
  async login(credentials: LoginRequest): Promise<ApiResponse<AuthResponse>> {
    return retry(() =>
      apiClient.post<AuthResponse>("/user/login", credentials),
    );
  }

  async register(
    userData: RegisterRequest,
  ): Promise<ApiResponse<AuthResponse>> {
    return retry(() =>
      apiClient.post<AuthResponse>("/user/register", userData),
    );
  }

  async preRegister(
    userData: PreRegisterRequest,
  ): Promise<ApiResponse<PreRegisterResponse>> {
    return retry(() =>
      apiClient.post<PreRegisterResponse>("/user/pre-register", userData),
    );
  }

  async refreshToken(refreshToken: string): Promise<ApiResponse<AuthResponse>> {
    return retry(() =>
      apiClient.post<AuthResponse>("/user/refresh", { refreshToken }),
    );
  }

  async logout(): Promise<ApiResponse<void>> {
    return retry(() => apiClient.post<void>("/user/logout"));
  }

  async getCurrentUser(): Promise<ApiResponse<User>> {
    return retry(() => apiClient.get<User>("/user/me"));
  }

  async verifyEmail(
    request: VerifyEmailRequest,
  ): Promise<ApiResponse<VerifyEmailResponse>> {
    return retry(() =>
      apiClient.post<VerifyEmailResponse>(
        "/user/verify-verification-code",
        request,
      ),
    );
  }

  async updateProfile(
    userId: string,
    updates: UpdateUserRequest,
  ): Promise<ApiResponse<User>> {
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
  async createPackage(
    packageData: {
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
    },
    images?: File[],
  ): Promise<ApiResponse<BackendPackageResponse>> {
    const formData = new FormData();

    // Append package data with ALL required fields
    formData.append("title", packageData.title);
    if (packageData.description)
      formData.append("description", packageData.description);

    // Location fields
    formData.append("pickupLocation", packageData.pickupLocation);
    formData.append("dropoffLocation", packageData.dropoffLocation);
    formData.append("senderState", packageData.senderState);

    // Receiver fields (all required by backend)
    formData.append("receiverName", packageData.receiverName);
    formData.append("receiverPhone", packageData.receiverPhone);
    formData.append("receiverCity", packageData.receiverCity);
    formData.append("receiverState", packageData.receiverState);

    // Item details
    formData.append("itemSize", packageData.itemSize);
    if (packageData.category) formData.append("category", packageData.category);
    if (packageData.weight) formData.append("weight", packageData.weight);
    formData.append("value", packageData.value.toString());

    // Dates and notes
    formData.append("pickupDate", packageData.pickupDate);
    if (packageData.notes) formData.append("notes", packageData.notes);

    // Append images if provided
    if (images && images.length > 0) {
      images.forEach((image) => {
        formData.append("images", image);
      });
    }

    return retry(() =>
      apiClient.post<BackendPackageResponse>("/package/", formData, {
        headers: {
          // Don't set Content-Type - let browser set it with boundary for FormData
        } as Record<string, string>,
      }),
    );
  }

  /**
   * Get all packages available for bidding
   * Backend: GET /package (returns all packages, not just user's)
   */
  async getAllPackages(): Promise<ApiResponse<BackendPackageResponse[]>> {
    return retry(() => apiClient.get<BackendPackageResponse[]>("/package"));
  }

  /**
   * Get packages sent by user (as sender)
   * Backend doesn't have separate endpoint - we get all and filter on frontend
   */
  async getSentPackages(): Promise<ApiResponse<BackendPackageResponse[]>> {
    const response = await this.getAllPackages();
    if (response.success && response.data) {
      // Filter packages where user is sender
      // Backend returns packages with sender.senderId
      return {
        ...response,
        data: response.data,
      };
    }
    return response;
  }

  /**
   * Get packages received by user (as receiver)
   * Backend doesn't have separate endpoint - we get all and filter on frontend
   */
  async getReceivedPackages(): Promise<ApiResponse<BackendPackageResponse[]>> {
    return this.getAllPackages();
  }

  /**
   * Get packages for pal (deliverer)
   * Backend doesn't have separate endpoint - we get all and filter on frontend
   */
  async getPalPackages(): Promise<ApiResponse<BackendPackageResponse[]>> {
    return this.getAllPackages();
  }

  /**
   * Get package by ID
   */
  async getPackageById(
    packageId: string,
  ): Promise<ApiResponse<BackendPackageResponse>> {
    return retry(() =>
      apiClient.get<BackendPackageResponse>(`/package/${packageId}`),
    );
  }

  /**
   * Update package
   */
  async updatePackage(
    packageId: string,
    updates: Partial<BackendPackageResponse>,
  ): Promise<ApiResponse<BackendPackageResponse>> {
    return retry(() =>
      apiClient.patch<BackendPackageResponse>(`/package/${packageId}`, updates),
    );
  }

  /**
   * Delete package
   */
  async deletePackage(packageId: string): Promise<ApiResponse<void>> {
    return retry(() => apiClient.delete<void>(`/package/${packageId}`));
  }

  /**
   * Test backend connectivity
   */
  async healthCheck(): Promise<ApiResponse<{ status: string }>> {
    return retry(() => apiClient.get<{ status: string }>("/health"));
  }

  /**
   * Place a bid on a package
   */
  async placeBid(
    packageId: string,
    bidAmount: number,
  ): Promise<ApiResponse<Bid>> {
    return retry(() =>
      apiClient.post<Bid>(`/package/${packageId}/bid/test`, { bidAmount }),
    );
  }
  /**
   * Accept a bid on a package
   */
  async acceptBid(
    packageId: string,
    bidId: string,
  ): Promise<ApiResponse<BackendPackageResponse>> {
    return retry(() =>
      apiClient.patch<BackendPackageResponse>(
        `/package/${packageId}/accept-bid`,
        { bidId },
      ),
    );
  }

  /**
   * Update package status
   */
  async updatePackageStatus(
    packageId: string,
    status: string,
  ): Promise<ApiResponse<BackendPackageResponse>> {
    return retry(() =>
      apiClient.patch<BackendPackageResponse>(`/package/${packageId}/status`, {
        status,
      }),
    );
  }

  /**
   * Upload delivery proof
   */
  async uploadDeliveryProof(
    packageId: string,
    proofImage: File,
  ): Promise<ApiResponse<BackendPackageResponse>> {
    const formData = new FormData();
    formData.append("proof", proofImage);

    return retry(() =>
      apiClient.post<BackendPackageResponse>(
        `/package/${packageId}/proof`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      ),
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

  // ==========================================
  // BIDDING SYSTEM APIs (Server-Side)
  // ==========================================

  /**
   * Get pricing suggestion for a delivery job
   * Server calculates price based on distance, size, urgency, traffic, weather
   */
  async getPricingSuggestion(
    params: PricingSuggestionRequest,
  ): Promise<ApiResponse<PricingSuggestionResponse>> {
    const queryParams: Record<string, string> = {};
    if (params.pickupLocation)
      queryParams.pickupLocation = params.pickupLocation;
    if (params.dropoffLocation)
      queryParams.dropoffLocation = params.dropoffLocation;
    if (params.packageSize) queryParams.packageSize = params.packageSize;
    if (params.urgency) queryParams.urgency = params.urgency;
    if (params.pickupTime) queryParams.pickupTime = params.pickupTime;

    return retry(() =>
      apiClient.get<PricingSuggestionResponse>("/pricing/suggest", queryParams),
    );
  }

  /**
   * Get all bids for a package (server-ranked with scores)
   * Server returns bids already scored and ranked
   */
  async getBidsForPackage(
    packageId: string,
  ): Promise<ApiResponse<{ bids: Bid[] }>> {
    return retry(() =>
      apiClient.get<{ bids: Bid[] }>(`/package/${packageId}/bids/enhanced`),
    );
  }

  /**
   * Place a bid on a package with full validation
   * Server validates: wallet balance, bid amount, eligibility
   */
  async createBid(
    packageId: string,
    bidData: {
      amount: number;
      estimatedTime: string;
      estimatedPickupTime?: string;
      message?: string;
      vehicleType: string;
    },
  ): Promise<ApiResponse<Bid>> {
    return retry(() =>
      apiClient.post<Bid>(`/package/${packageId}/bid`, bidData),
    );
  }

  /**
   * Update an existing bid (if allowed)
   * Server checks if bid is still editable
   */
  async updateBid(
    packageId: string,
    bidId: string,
    updates: {
      amount?: number;
      estimatedTime?: string;
      message?: string;
    },
  ): Promise<ApiResponse<Bid>> {
    return retry(() =>
      apiClient.patch<Bid>(`/package/${packageId}/bid/${bidId}`, updates),
    );
  }

  /**
   * Withdraw a bid
   */
  async withdrawBid(
    packageId: string,
    bidId: string,
  ): Promise<ApiResponse<void>> {
    return retry(() =>
      apiClient.delete<void>(`/package/${packageId}/bid/${bidId}`),
    );
  }

  /**
   * Accept a bid (with wallet & escrow validation)
   * Server validates:
   * - Sender has sufficient wallet balance
   * - Bid is still valid
   * - Creates escrow transaction
   * - Locks funds in escrow
   * - Notifies Pal
   */
  async acceptBidSecure(
    packageId: string,
    bidId: string,
  ): Promise<
    ApiResponse<{
      job: DeliveryJob;
      escrowTransaction: Transaction;
      walletBalance: number;
    }>
  > {
    return retry(() =>
      apiClient.post<{
        job: DeliveryJob;
        escrowTransaction: Transaction;
        walletBalance: number;
      }>(`/package/${packageId}/bid/${bidId}/accept`),
    );
  }

  /**
   * Initialize payment with Monnify
   * - Gets payment reference and redirect URL
   * - Creates payment record
   */
  async initializePayment(paymentData: {
    amount: number;
    customerName: string;
    customerEmail: string;
    paymentDescription: string;
  }): Promise<
    ApiResponse<{
      paymentReference: string;
      checkoutUrl: string;
      apiKey: string;
      contractCode: string;
    }>
  > {
    return retry(() =>
      apiClient.post<{
        paymentReference: string;
        checkoutUrl: string;
        apiKey: string;
        contractCode: string;
      }>("/payment/initiate", paymentData),
    );
  }

  /**
   * Fund wallet directly (for quick funding)
   * - Creates payment and returns checkout URL
   */
  async fundWallet(
    amount: number,
    paymentDescription: string,
  ): Promise<
    ApiResponse<{
      paymentReference: string;
      checkoutUrl: string;
      amount: number;
    }>
  > {
    return retry(() =>
      apiClient.post<{
        paymentReference: string;
        checkoutUrl: string;
        amount: number;
      }>("/payment/fund-wallet", {
        amount,
        paymentDescription,
      }),
    );
  }

  /**
   * Verify payment and credit wallet
   * - Called after payment completion
   */
  async verifyPayment(
    paymentReference: string,
    transactionReference: string,
  ): Promise<
    ApiResponse<{
      status: string;
      amount: number;
      newBalance: number;
      transactionId: string;
    }>
  > {
    return retry(() =>
      apiClient.post<{
        status: string;
        amount: number;
        newBalance: number;
        transactionId: string;
      }>("/payment/verify", {
        paymentReference,
        transactionReference,
      }),
    );
  }

  /**
   * Get wallet balance
   */
  async getWalletBalance(): Promise<
    ApiResponse<{
      balance: number;
      currency: string;
      lastUpdated: string;
    }>
  > {
    return retry(() =>
      apiClient.get<{
        balance: number;
        currency: string;
        lastUpdated: string;
      }>("/payment/balance"),
    );
  }

  /**
   * Get transaction history
   */
  async getTransactionHistory(filters?: {
    type?: string;
    status?: string;
    page?: number;
    limit?: number;
  }): Promise<
    ApiResponse<{
      transactions: Array<{
        id: string;
        type: string;
        amount: number;
        status: string;
        description: string;
        createdAt: string;
        balanceAfter: number;
      }>;
      pagination: {
        page: number;
        limit: number;
        total: number;
        pages: number;
      };
      summary: {
        totalDeposits: number;
        totalWithdrawals: number;
        totalTransactions: number;
      };
    }>
  > {
    // Convert number filters to strings for API client and filter out undefined values
    const stringFilters: Record<string, string> | undefined = filters
      ? (() => {
          const entries = Object.entries({
            type: filters.type,
            status: filters.status,
            page: filters.page?.toString(),
            limit: filters.limit?.toString(),
          });
          const filteredEntries = entries.filter(
            ([, value]) => value !== undefined,
          ) as [string, string][];
          return Object.fromEntries(filteredEntries);
        })()
      : undefined;

    return retry(() =>
      apiClient.get<{
        transactions: Array<{
          id: string;
          type: string;
          amount: number;
          status: string;
          description: string;
          createdAt: string;
          balanceAfter: number;
        }>;
        pagination: {
          page: number;
          limit: number;
          total: number;
          pages: number;
        };
        summary: {
          totalDeposits: number;
          totalWithdrawals: number;
          totalTransactions: number;
        };
      }>("/payment/history", stringFilters),
    );
  }

  /**
   * Request withdrawal to bank account
   */
  async requestWithdrawal(withdrawalData: {
    amount: number;
    bankCode: string;
    accountNumber: string;
    accountName: string;
    description?: string;
  }): Promise<
    ApiResponse<{
      withdrawalId: string;
      amount: number;
      status: string;
      estimatedProcessingTime: string;
    }>
  > {
    return retry(() =>
      apiClient.post<{
        withdrawalId: string;
        amount: number;
        status: string;
        estimatedProcessingTime: string;
      }>("/payment/withdraw", withdrawalData),
    );
  }

  /**
   * Get bid statistics for a job
   * Server calculates: average bid, lowest, highest, total bids
   */
  async getBidStatistics(packageId: string): Promise<
    ApiResponse<{
      totalBids: number;
      averageAmount: number;
      lowestAmount: number;
      highestAmount: number;
      averageRating: number;
    }>
  > {
    return retry(() =>
      apiClient.get<{
        totalBids: number;
        averageAmount: number;
        lowestAmount: number;
        highestAmount: number;
        averageRating: number;
      }>(`/package/${packageId}/bids/statistics`),
    );
  }

  /**
   * Get recommended bids (top 3 by server scoring)
   */
  async getRecommendedBids(
    packageId: string,
    limit: number = 3,
  ): Promise<ApiResponse<{ bids: Bid[] }>> {
    return retry(() =>
      apiClient.get<{ bids: Bid[] }>(`/package/${packageId}/bids/recommended`, {
        limit: limit.toString(),
      }),
    );
  }

  // ==========================================
  // WALLET & PAYMENT APIs
  // ==========================================

  /**
   * Check if user can afford a bid acceptance
   * Server validates wallet balance + escrow requirements
   */
  async validateBidAcceptance(
    packageId: string,
    bidId: string,
  ): Promise<
    ApiResponse<{
      canAccept: boolean;
      walletBalance: number;
      requiredAmount: number;
      escrowAmount: number;
      insufficientFunds: boolean;
    }>
  > {
    return retry(() =>
      apiClient.post<{
        canAccept: boolean;
        walletBalance: number;
        requiredAmount: number;
        escrowAmount: number;
        insufficientFunds: boolean;
      }>(`/package/${packageId}/bid/${bidId}/validate`),
    );
  }

  /**
   * Add funds to wallet
   */
  async addFundsToWallet(
    amount: number,
    paymentMethod: string,
  ): Promise<ApiResponse<Transaction>> {
    return retry(() =>
      apiClient.post<Transaction>("/wallet/add-funds", {
        amount,
        paymentMethod,
      }),
    );
  }

  /**
   * Get wallet transactions
   */
  async getWalletTransactions(params?: {
    page?: number;
    limit?: number;
    type?: "credit" | "debit" | "escrow";
  }): Promise<ApiResponse<{ transactions: Transaction[]; total: number }>> {
    const queryParams: Record<string, string> = {};
    if (params?.page !== undefined) queryParams.page = params.page.toString();
    if (params?.limit !== undefined)
      queryParams.limit = params.limit.toString();
    if (params?.type !== undefined) queryParams.type = params.type;

    return retry(() =>
      apiClient.get<{ transactions: Transaction[]; total: number }>(
        "/wallet/transactions",
        Object.keys(queryParams).length > 0 ? queryParams : undefined,
      ),
    );
  }

  /**
   * Get escrow details for a job
   */
  async getEscrowDetails(packageId: string): Promise<
    ApiResponse<{
      escrowAmount: number;
      status: string;
      createdAt: string;
      releaseConditions: string[];
    }>
  > {
    return retry(() =>
      apiClient.get<{
        escrowAmount: number;
        status: string;
        createdAt: string;
        releaseConditions: string[];
      }>(`/package/${packageId}/escrow`),
    );
  }

  // ==========================================
  // NOTIFICATIONS API
  async getNotifications(params?: {
    page?: number;
    limit?: number;
    status?: string;
    type?: string;
    unreadOnly?: boolean;
  }): Promise<
    ApiResponse<{
      notifications: Notification[];
      total: number;
      unreadCount: number;
    }>
  > {
    // Convert params to strings for API client
    const stringParams = params
      ? Object.fromEntries(
          Object.entries(params).map(([key, value]) => [
            key,
            value?.toString(),
          ]),
        )
      : undefined;

    return retry(() =>
      apiClient.get<{
        notifications: Notification[];
        total: number;
        unreadCount: number;
      }>("/notifications", stringParams),
    );
  }

  async getUnreadCount(): Promise<ApiResponse<{ count: number }>> {
    return retry(() =>
      apiClient.get<{ count: number }>("/notifications/unread-count"),
    );
  }

  async markNotificationAsRead(
    notificationId: string,
  ): Promise<ApiResponse<void>> {
    return retry(() =>
      apiClient.patch(`/notifications/${notificationId}/read`),
    );
  }

  async markAllNotificationsAsRead(): Promise<ApiResponse<void>> {
    return retry(() => apiClient.put("/notifications/read-all"));
  }

  async createTestNotification(data: {
    title: string;
    message: string;
    type: string;
    priority?: string;
    category?: string;
    actionRequired?: boolean;
  }): Promise<ApiResponse<Notification>> {
    return retry(() =>
      apiClient.post<Notification>("/notifications/test", data),
    );
  }

  // BROADCAST & NOTIFICATIONS
  // ==========================================

  /**
   * Manually re-broadcast a job to wider radius
   * Server finds Pals in expanded radius and sends push notifications
   */
  async rebroadcastJob(
    packageId: string,
    radius: number,
  ): Promise<
    ApiResponse<{
      palsNotified: number;
      newRadius: number;
    }>
  > {
    return retry(() =>
      apiClient.post<{ palsNotified: number; newRadius: number }>(
        `/package/${packageId}/broadcast`,
        { radius },
      ),
    );
  }

  /**
   * Get bidding-related notifications
   */
  async getBiddingNotifications(params?: {
    page?: number;
    limit?: number;
    unreadOnly?: boolean;
  }): Promise<
    ApiResponse<{ notifications: Notification[]; unreadCount: number }>
  > {
    const stringParams: Record<string, string> = {};
    if (params?.page !== undefined) stringParams.page = params.page.toString();
    if (params?.limit !== undefined)
      stringParams.limit = params.limit.toString();
    if (params?.unreadOnly !== undefined)
      stringParams.unreadOnly = params.unreadOnly.toString();

    return retry(() =>
      apiClient.get<{ notifications: Notification[]; unreadCount: number }>(
        "/notifications/bidding",
        Object.keys(stringParams).length > 0 ? stringParams : undefined,
      ),
    );
  }

  // Document Verification Methods
  async getVerificationStatus(): Promise<
    ApiResponse<{
      isVerified: boolean;
      documents: {
        governmentId: { uploaded: boolean; url?: string };
        nin: { uploaded: boolean; verified: boolean; number?: string };
        additionalDocument: { uploaded: boolean; type?: string };
        bvn: { verified: boolean };
      };
      canBid: boolean;
    }>
  > {
    return retry(() => apiClient.get("/user/documents/status"));
  }

  async uploadGovernmentId(file: File): Promise<
    ApiResponse<{
      message: string;
      documentUrl: { url: string; public_id: string };
    }>
  > {
    const formData = new FormData();
    formData.append("file", file);

    return retry(() =>
      apiClient.patch("/user/documents/government-id", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
    );
  }

  async verifyNin(ninNumber: string): Promise<
    ApiResponse<{
      message: string;
      nin: { number: string; verified: boolean };
    }>
  > {
    return retry(() => apiClient.post("/user/documents/nin", { ninNumber }));
  }

  async verifyBvn(bvnNumber: string): Promise<
    ApiResponse<{
      message: string;
      bvn: {
        bvn: string;
        verified: boolean;
        firstName: string;
        lastName: string;
      };
    }>
  > {
    return retry(() => apiClient.post("/user/documents/bvn", { bvnNumber }));
  }

  async uploadAdditionalDocument(
    file: File,
    docType?: string,
  ): Promise<
    ApiResponse<{
      message: string;
      otherDocument: { docType: string; docUrl: string };
    }>
  > {
    const formData = new FormData();
    formData.append("file", file);
    if (docType) formData.append("docType", docType);

    return retry(() =>
      apiClient.patch("/user/documents/additional", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
    );
  }

  // Generic POST method for custom requests
  async post<T = unknown>(
    url: string,
    data?: unknown,
  ): Promise<ApiResponse<T>> {
    return retry(() => apiClient.post<T>(url, data));
  }

  // Generic GET method for custom requests
  async get<T = unknown>(
    url: string,
    params?: Record<string, unknown>,
  ): Promise<ApiResponse<T>> {
    // Convert unknown values to strings for query parameters
    const stringParams = params
      ? Object.fromEntries(
          Object.entries(params).map(([key, value]) => [key, String(value)]),
        )
      : undefined;

    return retry(() => apiClient.get<T>(url, stringParams));
  }

  // Generic PUT method for custom requests
  async put<T = unknown>(url: string, data?: unknown): Promise<ApiResponse<T>> {
    return retry(() => apiClient.put<T>(url, data));
  }

  // Generic PATCH method for custom requests
  async patch<T = unknown>(
    url: string,
    data?: unknown,
  ): Promise<ApiResponse<T>> {
    return retry(() => apiClient.patch<T>(url, data));
  }

  // Generic DELETE method for custom requests
  async delete<T = unknown>(url: string): Promise<ApiResponse<T>> {
    return retry(() => apiClient.delete<T>(url));
  }
}

// // Create and export a default API service instance
export const apiService = new ApiService();
