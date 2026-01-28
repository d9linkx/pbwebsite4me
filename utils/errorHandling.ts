// import { ApiError } from './apiClient';

// // Error types for different scenarios
// export type ErrorSeverity = 'low' | 'medium' | 'high' | 'critical';

// export interface AppError {
//   id: string;
//   message: string;
//   code?: string;
//   severity: ErrorSeverity;
//   timestamp: Date;
//   context?: {
//     component?: string;
//     action?: string;
//     userId?: string;
//     metadata?: Record<string, unknown>;
//   };
//   retryable: boolean;
//   resolved?: boolean;
// }

// // Error boundary for React components
// export class ErrorHandler {
//   private static errors: AppError[] = [];
//   private static maxErrors = 100;

//   static createError(
//     message: string,
//     severity: ErrorSeverity = 'medium',
//     context?: AppError['context'],
//     code?: string,
//     retryable: boolean = false
//   ): AppError {
//     const error: AppError = {
//       id: `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
//       message,
//       code,
//       severity,
//       timestamp: new Date(),
//       context,
//       retryable,
//     };

//     this.errors.unshift(error);

//     // Keep only the most recent errors
//     if (this.errors.length > this.maxErrors) {
//       this.errors = this.errors.slice(0, this.maxErrors);
//     }

//     // Log error based on severity
//     this.logError(error);

//     return error;
//   }

//   static handleApiError(
//     error: ApiError,
//     context?: AppError['context']
//   ): AppError {
//     const severity: ErrorSeverity =
//       error.status >= 500 ? 'high' :
//       error.status >= 400 ? 'medium' : 'low';

//     return this.createError(
//       error.message,
//       severity,
//       context,
//       `API_${error.status}`,
//       error.status >= 500 || error.status === 429
//     );
//   }

//   static handleNetworkError(
//     context?: AppError['context']
//   ): AppError {
//     return this.createError(
//       'Network connection failed. Please check your internet connection.',
//       'high',
//       context,
//       'NETWORK_ERROR',
//       true
//     );
//   }

//   static handleValidationError(
//     errors: Record<string, string[]>,
//     context?: AppError['context']
//   ): AppError {
//     const message = Object.values(errors).flat().join(', ');
//     return this.createError(
//       message,
//       'medium',
//       context,
//       'VALIDATION_ERROR',
//       false
//     );
//   }

//   static resolveError(errorId: string): void {
//     const error = this.errors.find(e => e.id === errorId);
//     if (error) {
//       error.resolved = true;
//     }
//   }

//   static getErrors(severity?: ErrorSeverity): AppError[] {
//     if (severity) {
//       return this.errors.filter(e => e.severity === severity && !e.resolved);
//     }
//     return this.errors.filter(e => !e.resolved);
//   }

//   static clearErrors(): void {
//     this.errors = this.errors.filter(e => !e.resolved);
//   }

//   private static logError(error: AppError): void {
//     const logLevel = this.getLogLevel(error.severity);

//     const logData = {
//       id: error.id,
//       message: error.message,
//       code: error.code,
//       severity: error.severity,
//       timestamp: error.timestamp,
//       context: error.context,
//     };

//     switch (logLevel) {
//       case 'error':
//         console.error('🚨 Error:', logData);
//         break;
//       case 'warn':
//         console.warn('⚠️ Warning:', logData);
//         break;
//       case 'info':
//         console.info('ℹ️ Info:', logData);
//         break;
//       default:
//         console.log('📝 Log:', logData);
//     }

//     // In production, send to error tracking service
//     if (process.env.NODE_ENV === 'production') {
//       this.sendToErrorTracker(logData);
//     }
//   }

//   private static getLogLevel(severity: ErrorSeverity): 'error' | 'warn' | 'info' | 'log' {
//     switch (severity) {
//       case 'critical':
//       case 'high':
//         return 'error';
//       case 'medium':
//         return 'warn';
//       case 'low':
//         return 'info';
//       default:
//         return 'log';
//     }
//   }

//   private static sendToErrorTracker(errorData: any): void {
//     // Implement error tracking service integration (e.g., Sentry, LogRocket)
//     // This is a placeholder for production error tracking
//     console.log('📊 Sending to error tracker:', errorData);
//   }
// }

// // Retry utility with exponential backoff
// export class RetryHandler {
//   static async withRetry<T>(
//     operation: () => Promise<T>,
//     maxAttempts: number = 3,
//     baseDelay: number = 1000
//   ): Promise<T> {
//     let lastError: Error;

//     for (let attempt = 1; attempt <= maxAttempts; attempt++) {
//       try {
//         return await operation();
//       } catch (error) {
//         lastError = error as Error;

//         if (attempt === maxAttempts) {
//           throw lastError;
//         }

//         // Check if error is retryable
//         if (!this.isRetryableError(error)) {
//           throw error;
//         }

//         const delay = baseDelay * Math.pow(2, attempt - 1);
//         await this.sleep(delay);
//       }
//     }

//     throw lastError!;
//   }

//   private static isRetryableError(error: any): boolean {
//     // Network errors, 5xx server errors, and rate limiting are retryable
//     if (error.name === 'TypeError' && error.message.includes('fetch')) {
//       return true; // Network error
//     }

//     if (error.status) {
//       return error.status >= 500 || error.status === 429;
//     }

//     return false;
//   }

//   private static sleep(ms: number): Promise<void> {
//     return new Promise(resolve => setTimeout(resolve, ms));
//   }
// }

// // Loading state management
// export interface LoadingState {
//   id: string;
//   message?: string;
//   progress?: number;
//   startTime: Date;
// }

// export class LoadingManager {
//   private static loadingStates: LoadingState[] = [];

//   static startLoading(
//     id: string,
//     message?: string,
//     progress?: number
//   ): LoadingState {
//     const loadingState: LoadingState = {
//       id,
//       message,
//       progress,
//       startTime: new Date(),
//     };

//     this.loadingStates.push(loadingState);
//     return loadingState;
//   }

//   static updateLoading(
//     id: string,
//     updates: Partial<Pick<LoadingState, 'message' | 'progress'>>
//   ): void {
//     const loadingState = this.loadingStates.find(ls => ls.id === id);
//     if (loadingState) {
//       Object.assign(loadingState, updates);
//     }
//   }

//   static stopLoading(id: string): LoadingState | null {
//     const index = this.loadingStates.findIndex(ls => ls.id === id);
//     if (index !== -1) {
//       const loadingState = this.loadingStates[index];
//       this.loadingStates.splice(index, 1);
//       return loadingState;
//     }
//     return null;
//   }

//   static getLoadingStates(): LoadingState[] {
//     return [...this.loadingStates];
//   }

//   static isLoading(id?: string): boolean {
//     if (id) {
//       return this.loadingStates.some(ls => ls.id === id);
//     }
//     return this.loadingStates.length > 0;
//   }

//   static getLoadingProgress(id: string): number | null {
//     const loadingState = this.loadingStates.find(ls => ls.id === id);
//     return loadingState?.progress ?? null;
//   }
// }

// // Form validation utilities
// export class ValidationUtils {
//   static validateEmail(email: string): string | null {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!email) return 'Email is required';
//     if (!emailRegex.test(email)) return 'Please enter a valid email address';
//     return null;
//   }

//   static validatePhone(phone: string): string | null {
//     const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
//     if (!phone) return 'Phone number is required';
//     if (!phoneRegex.test(phone)) return 'Please enter a valid phone number';
//     return null;
//   }

//   static validatePassword(password: string): string | null {
//     if (!password) return 'Password is required';
//     if (password.length < 8) return 'Password must be at least 8 characters';
//     if (!/(?=.*[a-z])/.test(password)) return 'Password must contain at least one lowercase letter';
//     if (!/(?=.*[A-Z])/.test(password)) return 'Password must contain at least one uppercase letter';
//     if (!/(?=.*\d)/.test(password)) return 'Password must contain at least one number';
//     return null;
//   }

//   static validateRequired(value: any, fieldName: string): string | null {
//     if (!value || (typeof value === 'string' && !value.trim())) {
//       return `${fieldName} is required`;
//     }
//     return null;
//   }

//   static validateAmount(amount: number, min: number = 0, max?: number): string | null {
//     if (amount < min) return `Amount must be at least ${min}`;
//     if (max && amount > max) return `Amount must not exceed ${max}`;
//     return null;
//   }
// }
