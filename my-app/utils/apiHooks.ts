/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback, useRef } from "react";
import { apiService } from "./apiService";
import { apiClient } from "./apiClient";
import { ApiResponse } from "./apiClient";
import { User, UserRole } from "../types";
import { AuthResponse } from "../types/api";

// Generic API Hook
interface UseApiOptions {
  enabled?: boolean;
  retry?: boolean;
  cacheTime?: number;
}

interface UseApiResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  mutate: (data: T | null) => void;
}

export function useApi<T>(
  apiCall: () => Promise<ApiResponse<T>>,
  options: UseApiOptions & {
    requiresAuth?: boolean;
  } = {},
): UseApiResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const cacheRef = useRef<Map<string, { data: T; timestamp: number }>>(
    new Map(),
  );
  const isExecutingRef = useRef(false); // Prevent multiple simultaneous calls

  const {
    enabled = true,
    retry = true,
    cacheTime = 5 * 60 * 1000,
    requiresAuth = false,
  } = options;

  const executeApiCall = useCallback(async () => {
    if (!enabled || isExecutingRef.current) return;

    // For authenticated endpoints, check if token exists
    if (requiresAuth) {
      const token = apiClient.getAuthToken();
      if (!token) {
        setError("Authentication required");
        return;
      }
    }

    isExecutingRef.current = true;
    setLoading(true);
    setError(null);

    try {
      const response = await apiCall();

      if (response.success && response.data !== undefined) {
        setData(response.data);
        // Cache the result
        const cacheKey = JSON.stringify(apiCall);
        cacheRef.current.set(cacheKey, {
          data: response.data,
          timestamp: Date.now(),
        });
      } else {
        setError(response.message || "An error occurred");
      }
    } catch (err: any) {
      const errorMessage = err.message || "An unexpected error occurred";
      setError(errorMessage);

      if (retry) {
        // Retry logic could be implemented here
        console.error("API call failed:", errorMessage);
      }
    } finally {
      setLoading(false);
      isExecutingRef.current = false;
    }
  }, [apiCall, enabled, retry, requiresAuth]);

  const refetch = useCallback(async () => {
    await executeApiCall();
  }, [executeApiCall]);

  const mutate = useCallback((newData: T | null) => {
    setData(newData);
  }, []);

  useEffect(() => {
    executeApiCall();
  }, [executeApiCall]); // Safe now with useCallback and execution protection

  // Cleanup expired cache entries
  useEffect(() => {
    const cleanup = () => {
      const now = Date.now();
      cacheRef.current.forEach((value, key) => {
        if (now - value.timestamp > cacheTime) {
          cacheRef.current.delete(key);
        }
      });
    };

    const interval = setInterval(cleanup, cacheTime);
    return () => clearInterval(interval);
  }, [cacheTime]);

  return { data, loading, error, refetch, mutate };
}

// Authentication Hooks
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshAuth = useCallback(async () => {
    const token = apiClient.getAuthToken();
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await apiService.getCurrentUser();

      if (response.success && response.data) {
        // Normalize user object - ensure id is set from _id if needed
        const normalizedUser = {
          ...response.data,
          id: response.data.id || response.data._id || "",
          phone: response.data.phone || response.data.phoneNumber || "",
          name:
            response.data.name ||
            `${response.data.firstName} ${response.data.lastName}`.trim(),
        };

        console.log("👤 Normalized user from getCurrentUser:", normalizedUser);
        setUser(normalizedUser);
      } else {
        setUser(null);
        apiClient.clearAuthToken();
      }
    } catch {
      setUser(null);
      apiClient.clearAuthToken();
      setError("Failed to refresh authentication");
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (identifier: string, password: string) => {
    setLoading(true);
    setError(null);

    // Determine if identifier is email or username
    const isEmail = identifier.includes("@");
    const loginData = {
      detail: isEmail ? { email: identifier } : { userName: identifier },
      password,
    };

    try {
      const response = await apiService.login(loginData);

      if (response.success && response.data) {
        // Debug: Log the actual response structure
        console.log("🔍 Login API Response:", response);
        console.log("📦 Response data:", response.data);

        // Handle different possible token locations
        const user = response.data.user;
        let token: string | undefined = response.data.token;

        // Fallback: Check if token is directly in response.data
        if (!token && response.data) {
          console.log("🔄 Checking alternative token locations...");

          // Type-safe approach to check for alternative token fields
          const data = response.data as AuthResponse;

          // Try common token field names
          token = data.token || data.accessToken || data.jwt || data.authToken;

          // Check if token is nested under tokens object (your backend format)
          if (!token && data.tokens && data.tokens.accessToken) {
            console.log("🎫 Found token in tokens.accessToken");
            token = data.tokens.accessToken;
          }

          // Try if user data contains the token
          if (
            data.user &&
            typeof data.user === "object" &&
            data.user !== null
          ) {
            // Safe type assertion for debugging - user might have additional properties
            const userData = data.user as User & Record<string, unknown>;
            token = (userData.token as string) || token;
          }
        }

        console.log("🎫 Extracted token:", token);
        console.log("👤 Extracted user:", user);

        if (token && user) {
          // Normalize user object - ensure id is set from _id if needed
          const normalizedUser = {
            ...user,
            id: user.id || user._id || "",
            phone: user.phone || user.phoneNumber || "",
            name: user.name || `${user.firstName} ${user.lastName}`.trim(),
          };

          console.log("👤 Normalized user:", normalizedUser);
          setUser(normalizedUser);
          apiClient.setAuthToken(token);
          console.log("✅ Login successful, token stored");
          return { success: true, user: normalizedUser };
        } else {
          console.error("❌ Token or user missing from response");
          setError("Login response missing required data");
          return { success: false, error: "Invalid response format" };
        }
      } else {
        console.error("❌ Login API failed:", response);
        setError(response.message || "Login failed");
        return { success: false, error: response.message };
      }
    } catch (err: any) {
      const errorMessage = err.message || "Login failed";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(
    async (userData: {
      firstName: string;
      lastName: string;
      userName: string;
      email: string;
      phone: string;
      password: string;
      role: UserRole;
    }) => {
      setLoading(true);
      setError(null);

      try {
        const response = await apiService.register(userData);

        if (response.success && response.data) {
          const { user, token } = response.data;
          setUser(user);
          apiClient.setAuthToken(token);
          return { success: true, user };
        } else {
          setError(response.message || "Registration failed");
          return { success: false, error: response.message };
        }
      } catch (err: any) {
        const errorMessage = err.message || "Registration failed";
        setError(errorMessage);
        return { success: false, error: errorMessage };
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const preRegister = useCallback(
    async (userData: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      city?: string;
      state?: string;
      interests: ("pal" | "sender" | "receiver" | "proxy")[];
      referralCode?: string;
    }) => {
      setLoading(true);
      setError(null);

      try {
        const response = await apiService.preRegister(userData);

        if (response.success && response.data) {
          return {
            success: true,
            data: response.data,
            message: response.message,
          };
        } else {
          setError(response.message || "Pre-registration failed");
          return { success: false, error: response.message };
        }
      } catch (err: any) {
        const errorMessage = err.message || "Pre-registration failed";
        setError(errorMessage);
        return { success: false, error: errorMessage };
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  // Don't forget to return preRegister in your hook return statement
  // return { login, register, preRegister, ... }

  const verifyEmail = useCallback(
    async (email: string, verificationCode: string) => {
      setLoading(true);
      setError(null);

      try {
        const response = await apiService.verifyEmail({
          email,
          verificationCode,
        });

        if (response.success && response.data) {
          const { user, token } = response.data;
          if (user && token) {
            setUser(user);
            apiClient.setAuthToken(token);
          }
          return {
            success: true,
            message: "Email verified successfully",
            user,
            token,
          };
        } else {
          setError(response.message || "Email verification failed");
          return {
            success: false,
            message: response.message || "Email verification failed",
          };
        }
      } catch (err: any) {
        const errorMessage = err.message || "Email verification failed";
        setError(errorMessage);
        return {
          success: false,
          message: errorMessage,
        };
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const logout = useCallback(async () => {
    try {
      await apiService.logout();
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setUser(null);
      apiClient.clearAuthToken();
    }
  }, []);

  useEffect(() => {
    refreshAuth();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    user,
    loading,
    error,
    login,
    register,
    preRegister,
    logout,
    refreshAuth,
    verifyEmail,
  };
}
export function useUserProfile() {
  const getCurrentUser = useCallback(() => apiService.getCurrentUser(), []);
  const { data, loading, error, refetch } = useApi(getCurrentUser, {
    requiresAuth: true,
  });

  return {
    profile: data || null,
    user: data || null,
    loading,
    error,
    refetch,
  };
}

export function useUpdateProfile() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateProfile = useCallback(
    async (
      userId: string,
      updates: {
        firstName?: string;
        lastName?: string;
        userName?: string;
        email?: string;
        phone?: string;
        address?: string;
      },
    ) => {
      setLoading(true);
      setError(null);

      try {
        const response = await apiService.updateProfile(userId, updates);

        if (response.success && response.data) {
          return { success: true, profile: response.data };
        } else {
          setError(response.message || "Failed to update profile");
          return { success: false, error: response.message };
        }
      } catch (err: any) {
        const errorMessage = err.message || "Failed to update profile";
        setError(errorMessage);
        return { success: false, error: errorMessage };
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return { updateProfile, loading, error };
}

// Jobs Hooks
// export function useJobs(params?: {
//   status?: DeliveryStatus[];
//   role?: UserRole;
//   userId?: string;
//   page?: number;
//   limit?: number;
// }) {
//   const { data, loading, error, refetch } = useApi(
//     () => apiService.getJobs(params),
//     { enabled: !!params }
//   );

//   return {
//     jobs: data?.data?.data || [],
//     pagination: data?.data?.pagination,
//     loading,
//     error,
//     refetch,
//     total: data?.data?.pagination?.total || 0,
//   };
// }

// export function useJob(jobId: string | null) {
//   const { data, loading, error, refetch } = useApi(
//     () => apiService.getJobById(jobId!),
//     { enabled: !!jobId }
//   );

//   return { job: data?.data || null, loading, error, refetch };
// }

// export function useCreateJob() {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const createJob = useCallback(async (jobData: {
//     title: string;
//     description?: string;
//     pickupLocation: string;
//     dropoffLocation: string;
//     itemSize: string;
//     category?: string;
//     weight?: string;
//     value: number;
//     pickupDate: string;
//     notes?: string;
//     images?: File[];
//     receiverName?: string;
//     receiverPhone?: string;
//   }) => {
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await apiService.createJob(jobData);

//       if (response.success && response.data) {
//         return { success: true, job: response.data };
//       } else {
//         setError(response.message || 'Failed to create job');
//         return { success: false, error: response.message };
//       }
//     } catch (err) {
//       const errorMessage = err.message || 'Failed to create job';
//       setError(errorMessage);
//       return { success: false, error: errorMessage };
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   return { createJob, loading, error };
// }

// export function useUpdateJob() {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const updateJob = useCallback(async (jobId: string, updates: {
//     title?: string;
//     description?: string;
//     pickupLocation?: string;
//     dropoffLocation?: string;
//     itemSize?: string;
//     category?: string;
//     weight?: string;
//     value?: number;
//     pickupDate?: string;
//     notes?: string;
//     images?: File[];
//     receiverName?: string;
//     receiverPhone?: string;
//   }) => {
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await apiService.updateJob(jobId, updates);

//       if (response.success && response.data) {
//         return { success: true, job: response.data };
//       } else {
//         setError(response.message || 'Failed to update job');
//         return { success: false, error: response.message };
//       }
//     } catch (err) {
//       const errorMessage = err.message || 'Failed to update job';
//       setError(errorMessage);
//       return { success: false, error: errorMessage };
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   return { updateJob, loading, error };
// }

// // Bids Hooks
// export function useBids(jobId?: string) {
//   const { data, loading, error, refetch } = useApi(
//     () => apiService.getJobBids(jobId!),
//     { enabled: !!jobId }
//   );

//   return {
//     bids: data?.data?.data || [],
//     pagination: data?.data?.pagination,
//     loading,
//     error,
//     refetch,
//   };
// }

// export function useCreateBid() {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const createBid = useCallback(async (bidData: {
//     jobId: string;
//     amount: number;
//     estimatedTime: string;
//     message: string;
//     vehicleType: string;
//   }) => {
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await apiService.createBid(bidData);

//       if (response.success && response.data) {
//         return { success: true, bid: response.data };
//       } else {
//         setError(response.message || 'Failed to place bid');
//         return { success: false, error: response.message };
//       }
//     } catch (err) {
//       const errorMessage = err.message || 'Failed to place bid';
//       setError(errorMessage);
//       return { success: false, error: errorMessage };
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   return { createBid, loading, error };
// }

// // Chat Hooks
// export function useChatThreads(userId?: string) {
//   const { data, loading, error, refetch } = useApi(
//     () => apiService.getChatThreads(userId!),
//     { enabled: !!userId }
//   );

//   return {
//     threads: data?.data?.data || [],
//     pagination: data?.data?.pagination,
//     loading,
//     error,
//     refetch,
//   };
// }

// export function useChatThread(threadId: string | null) {
//   const { data, loading, error, refetch } = useApi(
//     () => apiService.getChatThread(threadId!),
//     { enabled: !!threadId }
//   );

//   return { thread: data?.data || null, loading, error, refetch };
// }

// export function useSendMessage() {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const sendMessage = useCallback(async (messageData: {
//     chatThreadId: string;
//     message: string;
//     type?: 'text' | 'image' | 'location';
//   }) => {
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await apiService.sendMessage(messageData);

//       if (response.success && response.data) {
//         return { success: true, message: response.data };
//       } else {
//         setError(response.message || 'Failed to send message');
//         return { success: false, error: response.message };
//       }
//     } catch (err) {
//       const errorMessage = err.message || 'Failed to send message';
//       setError(errorMessage);
//       return { success: false, error: errorMessage };
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   return { sendMessage, loading, error };
// }

// // Notifications Hooks
// export function useNotifications(userId?: string) {
//   const { data, loading, error, refetch } = useApi(
//     () => apiService.getNotifications(userId!),
//     { enabled: !!userId }
//   );

//   return {
//     notifications: data?.data?.data || [],
//     pagination: data?.data?.pagination,
//     loading,
//     error,
//     refetch,
//   };
// }

// export function useMarkNotificationAsRead() {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const markAsRead = useCallback(async (notificationId: string) => {
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await apiService.markNotificationAsRead(notificationId);

//       if (response.success && response.data) {
//         return { success: true, notification: response.data };
//       } else {
//         setError(response.message || 'Failed to mark notification as read');
//         return { success: false, error: response.message };
//       }
//     } catch (err) {
//       const errorMessage = err.message || 'Failed to mark notification as read';
//       setError(errorMessage);
//       return { success: false, error: errorMessage };
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   return { markAsRead, loading, error };
// }

// // Wallet Hooks
// export function useWalletBalance(userId?: string) {
//   const { data, loading, error, refetch } = useApi(
//     () => apiService.getWalletBalance(userId!),
//     { enabled: !!userId }
//   );

//   return {
//     balance: data?.data?.balance || 0,
//     availableBalance: data?.data?.availableBalance || 0,
//     currency: data?.data?.currency || 'NGN',
//     loading,
//     error,
//     refetch,
//   };
// }

// export function useTransactions(userId?: string, params?: {
//   type?: string;
//   page?: number;
//   limit?: number;
// }) {
//   const { data, loading, error, refetch } = useApi(
//     () => apiService.getTransactions(userId!, params),
//     { enabled: !!userId }
//   );

//   return {
//     transactions: data?.data?.data || [],
//     pagination: data?.data?.pagination,
//     loading,
//     error,
//     refetch,
//   };
// }

// // User Profile Hooks
// export function useUserProfile() {
//   const { data, loading, error, refetch } = useApi(
//     () => apiService.getUserProfile()
//   );

//   return {
//     profile: data?.data,
//     user: data?.data?.user || null,
//     stats: data?.data?.stats || null,
//     preferences: data?.data?.preferences || null,
//     loading,
//     error,
//     refetch,
//   };
// }

// export function useUpdateProfile() {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const updateProfile = useCallback(async (updates: {
//     firstName?: string;
//     lastName?: string;
//     userName?: string;
//     email?: string;
//     phone?: string;
//     profileImage?: File;
//     preferences?: UserPreferences;
//   }) => {
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await apiService.updateProfile(updates);

//       if (response.success && response.data) {
//         return { success: true, profile: response.data };
//       } else {
//         setError(response.message || 'Failed to update profile');
//         return { success: false, error: response.message };
//       }
//     } catch (err) {
//       const errorMessage = err.message || 'Failed to update profile';
//       setError(errorMessage);
//       return { success: false, error: errorMessage };
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   return { updateProfile, loading, error };
// }

// // Location Hooks
// export function useLocationSearch() {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [results, setResults] = useState<Array<{
//     id: string;
//     name: string;
//     state: string;
//     lga: string;
//     type: string;
//     coordinates: { lat: number; lng: number };
//     isPopular: boolean;
//   }>>([]);

//   const searchLocations = useCallback(async (query: string, options?: {
//     limit?: number;
//     types?: string[];
//   }) => {
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await apiService.searchLocations({
//         query,
//         ...options,
//       });

//       if (response.success && response.data) {
//         setResults(response.data.locations || []);
//         return { success: true, locations: response.data.locations };
//       } else {
//         setError(response.message || 'Failed to search locations');
//         return { success: false, error: response.message };
//       }
//     } catch (err) {
//       const errorMessage = err.message || 'Failed to search locations';
//       setError(errorMessage);
//       return { success: false, error: errorMessage };
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   return { searchLocations, results, loading, error };
// }

// // Dashboard Analytics Hook
// export function useDashboardAnalytics(userId?: string, role?: UserRole) {
//   const { data, loading, error, refetch } = useApi(
//     () => apiService.getDashboardAnalytics(userId!, role!),
//     { enabled: !!userId && !!role }
//   );

//   return {
//     analytics: data?.data || null,
//     totalDeliveries: data?.data?.totalDeliveries || 0,
//     totalEarnings: data?.data?.totalEarnings || 0,
//     activeJobs: data?.data?.activeJobs || 0,
//     completedJobs: data?.data?.completedJobs || 0,
//     averageRating: data?.data?.averageRating || 0,
//     completionRate: data?.data?.completionRate || 0,
//     recentActivity: data?.data?.recentActivity || [],
//     loading,
//     error,
//     refetch,
//   };
// }

// // Real-time Updates Hook (for WebSocket-like functionality)
// export function useRealTimeUpdates(userId?: string) {
//   const [connected, setConnected] = useState(false);
//   const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

//   useEffect(() => {
//     if (!userId) return;

//   return { connected, lastUpdate };
// }
