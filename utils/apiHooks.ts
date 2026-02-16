/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from "react";
import { apiService } from "./apiService";

// Authentication Hooks
export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const preRegister = useCallback(
    async (userData: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      address: string;
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

  return {
    loading,
    error,
    preRegister,
  };
}
