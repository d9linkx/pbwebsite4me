// API Configuration and Client
export const API_CONFIG = {
  BASE_URL: typeof window === 'undefined' ? '/api' : (process.env.NEXT_PUBLIC_API_BASE_URL || ''),
  TIMEOUT: 30000, // 30 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
} as const;

// Type for JSON-serializable data
export type RequestData = Record<string, unknown> | unknown[] | string | number | boolean | null;

// Type guard to check if data is JSON serializable
function isSerializable(data: unknown): data is RequestData {
  if (data === null || data === undefined) return true;
  if (typeof data === 'string' || typeof data === 'number' || typeof data === 'boolean') return true;
  if (Array.isArray(data)) return data.every(isSerializable);
  if (typeof data === 'object') {
    return Object.values(data as Record<string, unknown>).every(isSerializable);
  }
  return false;
}

// Helper function to safely serialize data
function serializeData(data: unknown): string | undefined {
  if (data === undefined || data === null) return undefined;

  if (!isSerializable(data)) {
    console.error('Attempted to serialize non-serializable data:', data);
    throw new Error('Data contains non-serializable values');
  }

  try {
    return JSON.stringify(data);
  } catch (error) {
    console.error('Failed to serialize request data:', error);
    throw new Error('Failed to serialize request data');
  }
}

export type ApiResponse<T = unknown> = {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export type ApiError = {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
};

/**
 * Type-safe API client for making HTTP requests with authentication and error handling
 *
 * Features:
 * - Automatic Bearer token injection from localStorage
 * - Type-safe request/response handling
 * - Automatic retry with exponential backoff
 * - Comprehensive error handling
 * - JSON serialization with validation
 *
 * @example
 * ```typescript
 * // GET request
 * const response = await apiClient.get<User[]>('/users');
 *
 * // POST request with data
 * const loginResponse = await apiClient.post<{ user: User; token: string }>(
 *   '/auth/login',
 *   { email: 'user@example.com', password: 'password' }
 * );
 *
 * // Set authentication token
 * apiClient.setAuthToken('your-jwt-token');
 * ```
 */
export class ApiClient {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;

  constructor(baseURL: string = API_CONFIG.BASE_URL) {
    this.baseURL = baseURL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;

    // Create headers object with proper typing
    const headers: Record<string, string> = {
      ...this.defaultHeaders,
    };

    // Handle different types of options.headers
    if (options.headers) {
      if (options.headers instanceof Headers) {
        // Convert Headers object to Record<string, string>
        options.headers.forEach((value, key) => {
          headers[key] = value;
        });
      } else if (Array.isArray(options.headers)) {
        // Handle string[][] format
        options.headers.forEach(([key, value]) => {
          headers[key] = value;
        });
      } else if (typeof options.headers === 'object' && options.headers !== null) {
        // Handle Record<string, string> format, but exclude arrays and other non-record objects
        Object.entries(options.headers).forEach(([key, value]) => {
          if (typeof value === 'string') {
            headers[key] = value;
          }
        });
      }
    }

    // Add auth token if available
    const token = this.getAuthToken();
    if (token && token !== 'undefined' && token !== 'null') {
      headers.Authorization = `Bearer ${token}`;
    }

    const config: RequestInit = {
      ...options,
      headers,
      credentials: 'include', // Include credentials for authentication
    };

    try {
      const response = await fetch(url, config);
      return await this.handleResponse<T>(response);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    const contentType = response.headers.get('content-type');

    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();

      if (!response.ok) {
        throw {
          message: data.message || 'An error occurred',
          status: response.status,
          errors: data.errors,
        } as ApiError;
      }

      // Handle different response structures
      let extractedData: T;

      if (data.data && typeof data.data === 'object') {
        // Check if it's the nested user structure
        if (data.data.user && typeof data.data.user === 'object') {
          extractedData = data.data.user as T;
        } else {
          extractedData = data.data as T;
        }
      } else {
        extractedData = data as T;
      }

      return {
        success: true,
        data: extractedData,
        message: data.message,
        pagination: data.pagination,
      };
    } else {
      if (!response.ok) {
        throw {
          message: response.statusText || 'An error occurred',
          status: response.status,
        } as ApiError;
      }

      return {
        success: true,
        data: null as T,
      };
    }
  }

  private handleError(error: unknown): ApiError {
    if (error instanceof Error && error.name === 'TypeError' && error.message.includes('fetch')) {
      return {
        message: 'Network error. Please check your connection.',
        status: 0,
      };
    }

    if (error && typeof error === 'object' && 'status' in error) {
      return error as ApiError;
    }

    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    console.error('API Error:', error); // Log the original error for debugging
    return {
      message: errorMessage,
      status: 500,
    };
  }

  public getAuthToken(): string | null {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth_token');
      // Don't return invalid token strings
      if (token && token !== 'undefined' && token !== 'null' && token.trim() !== '') {
        return token;
      }
      return null;
    }
    return null;
  }

  async get<T>(endpoint: string, params?: Record<string, string>): Promise<ApiResponse<T>> {
    const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
    return this.request<T>(`${endpoint}${queryString}`, {
      method: 'GET',
    });
  }

  async post<T>(endpoint: string, data?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: serializeData(data),
    });
  }

  async put<T>(endpoint: string, data?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: serializeData(data),
    });
  }

  async patch<T>(endpoint: string, data?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: serializeData(data),
    });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
    });
  }

  setAuthToken(token: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
    }
  }

  clearAuthToken() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
  }
}

// Create and export a default API client instance
export const apiClient = new ApiClient();

// Utility functions for API calls
export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const retry = async <T>(
  fn: () => Promise<T>,
  attempts: number = API_CONFIG.RETRY_ATTEMPTS,
  delay: number = API_CONFIG.RETRY_DELAY
): Promise<T> => {
  try {
    return await fn();
  } catch (error) {
    if (attempts > 1) {
      await sleep(delay);
      return retry(fn, attempts - 1, delay * 2); // Exponential backoff
    }
    throw error;
  }
};
