// Environment variable utilities for browser-safe access
// This file prevents "process is not defined" errors in browser environments

/**
 * Safe environment variable access that works in both browser and server environments
 * In browser/demo mode, always returns the fallback value
 */
export const getEnvVar = (key: string, fallback: string = ''): string => {
  try {
    // In browser environments, always use fallback (demo mode) - silent operation
    if (typeof window !== 'undefined') {
      return fallback;
    }
    
    // In server environments, this would check process.env
    // For this demo app, we always return fallback
    return fallback;
  } catch (error) {
    // Silent fallback for demo mode
    return fallback;
  }
};

/**
 * Check if we're running in development mode
 */
export const isDevelopment = (): boolean => {
  try {
    if (typeof window !== 'undefined') {
      // In browser, check hostname for development indicators
      return window.location.hostname === 'localhost' || 
             window.location.hostname === '127.0.0.1' ||
             window.location.hostname.includes('dev') ||
             window.location.port !== '';
    }
    return true; // Default to development mode
  } catch (error) {
    return true; // Default to development mode if we can't determine
  }
};

/**
 * Check if we're running in production mode
 */
export const isProduction = (): boolean => {
  return !isDevelopment();
};

/**
 * Get the current environment name
 */
export const getEnvironment = (): 'development' | 'production' | 'demo' => {
  if (typeof window !== 'undefined') {
    return 'demo'; // Always demo in browser
  }
  return isDevelopment() ? 'development' : 'production';
};

/**
 * Demo-safe configuration object
 */
export const config = {
  // Google Maps
  googleMapsApiKey: getEnvVar('GOOGLE_MAPS_API_KEY', ''),
  
  // API endpoints (demo mode uses mock data)
  apiBaseUrl: getEnvVar('API_BASE_URL', 'https://api.prawnbox.demo'),
  
  // Feature flags
  enableGoogleMaps: getEnvVar('ENABLE_GOOGLE_MAPS', 'false') === 'true',
  enableAnalytics: getEnvVar('ENABLE_ANALYTICS', 'false') === 'true',
  
  // App configuration
  appName: getEnvVar('APP_NAME', 'Prawnbox'),
  appVersion: getEnvVar('APP_VERSION', '1.0.0'),
  
  // Environment info
  environment: getEnvironment(),
  isDevelopment: isDevelopment(),
  isProduction: isProduction()
};

export default config;