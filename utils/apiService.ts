import { apiClient, retry } from "../lib/apiClient";

import { PreRegisterRequest, PreRegisterResponse } from "../types/api";

import { ApiResponse } from "../lib/apiClient";

export class ApiService {
  async preRegister(
    userData: PreRegisterRequest,
  ): Promise<ApiResponse<PreRegisterResponse>> {
    return retry(() =>
      apiClient.post<PreRegisterResponse>("/user/pre-register", userData),
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
