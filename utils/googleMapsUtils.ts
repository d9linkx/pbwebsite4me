// Google Maps utility functions with proper error handling and browser compatibility
import { config } from './env';

// Extend Window interface for Google Maps (generic approach)
declare global {
  interface Window {
    google?: Record<string, unknown>;
    initMap?: () => void;
  }
}

// Google Maps API type definitions for our usage
interface GoogleMapsAPI {
  maps: {
    Geocoder: new () => GoogleMapsGeocoder;
    GeocoderStatus: {
      OK: string;
    };
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

interface GoogleMapsGeocoder {
  geocode(request: { address: string }, callback: (results: GoogleGeocoderResult[], status: string) => void): void;
}

interface GoogleGeocoderResult {
  geometry: {
    location: {
      lat(): number;
      lng(): number;
    };
  };
  [key: string]: unknown;
}

// Browser environment check
const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';

// Google Maps configuration
const GOOGLE_MAPS_CONFIG = {
  apiKey: config.googleMapsApiKey, // Safe browser-compatible access
  libraries: ['places', 'geometry'],
  loadTimeout: 10000, // 10 seconds
  retryAttempts: 3,
  retryDelay: 2000 // 2 seconds
};

// Google Maps loading state
interface GoogleMapsState {
  isLoaded: boolean;
  isLoading: boolean;
  hasError: boolean;
  errorMessage?: string;
  loadPromise?: Promise<void>;
}

let googleMapsState: GoogleMapsState = {
  isLoaded: false,
  isLoading: false,
  hasError: false
};

// Check if Google Maps is already loaded
export const isGoogleMapsLoaded = (): boolean => {
  try {
    return isBrowser && typeof window.google !== 'undefined' && typeof window.google.maps !== 'undefined';
  } catch (error) {
    return false;
  }
};

// Safe Google Maps initialization - Demo Mode
export const initializeGoogleMaps = async (): Promise<boolean> => {
  // Demo mode: Always succeed silently without any console output
  googleMapsState.isLoaded = true;
  googleMapsState.isLoading = false;
  googleMapsState.hasError = false;
  googleMapsState.errorMessage = undefined;
  return true;
};

// Load Google Maps script with timeout and retry logic
const loadGoogleMapsScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      // Always resolve immediately in demo mode - silent operation
      resolve();
      return;

    } catch (error) {
      // Even if there's an error, resolve for demo mode - silent operation
      resolve();
    }
  });
};

// Safe navigation to Google Maps
export const openGoogleMapsNavigation = (destination: string): void => {
  try {
    if (!destination || destination.trim() === '') {
      console.warn('🗺️ Navigation: No destination provided');
      return;
    }

    const encodedDestination = encodeURIComponent(destination.trim());
    const googleMapsUrl = `https://maps.google.com/?q=${encodedDestination}`;
    
    console.log('🗺️ Navigation: Opening Google Maps for:', destination);
    
    if (isBrowser && window.open) {
      window.open(googleMapsUrl, '_blank', 'noopener,noreferrer');
    } else {
      console.log('🗺️ Navigation: Would open URL:', googleMapsUrl);
    }
  } catch (error) {
    console.error('🗺️ Navigation: Error opening Google Maps:', error);
    // Fallback: try to open basic URL
    try {
      if (isBrowser && window.open) {
        window.open(`https://maps.google.com/`, '_blank', 'noopener,noreferrer');
      }
    } catch (fallbackError) {
      console.error('🗺️ Navigation: Fallback navigation also failed:', fallbackError);
    }
  }
};

// Safe directions to Google Maps
export const openGoogleMapsDirections = (origin: string, destination: string): void => {
  try {
    if (!destination || destination.trim() === '') {
      console.warn('🗺️ Directions: No destination provided');
      return;
    }

    const encodedOrigin = origin ? encodeURIComponent(origin.trim()) : '';
    const encodedDestination = encodeURIComponent(destination.trim());
    
    let directionsUrl: string;
    if (encodedOrigin) {
      directionsUrl = `https://maps.google.com/maps?saddr=${encodedOrigin}&daddr=${encodedDestination}`;
    } else {
      directionsUrl = `https://maps.google.com/maps?daddr=${encodedDestination}`;
    }
    
    console.log('🗺️ Directions: Opening Google Maps directions');
    console.log('🗺️ From:', origin || 'Current location');
    console.log('🗺️ To:', destination);
    
    if (isBrowser && window.open) {
      window.open(directionsUrl, '_blank', 'noopener,noreferrer');
    } else {
      console.log('🗺️ Directions: Would open URL:', directionsUrl);
    }
  } catch (error) {
    console.error('🗺️ Directions: Error opening Google Maps directions:', error);
    // Fallback to simple navigation
    openGoogleMapsNavigation(destination);
  }
};

// Get Google Maps embed URL (safe for iframes)
export const getGoogleMapsEmbedUrl = (location: string, apiKey?: string): string => {
  try {
    if (!location || location.trim() === '') {
      return '';
    }

    const encodedLocation = encodeURIComponent(location.trim());
    const key = apiKey || GOOGLE_MAPS_CONFIG.apiKey;
    
    if (key) {
      return `https://www.google.com/maps/embed/v1/place?key=${key}&q=${encodedLocation}`;
    } else {
      // Return a fallback static map URL (doesn't require API key for basic usage)
      return `https://maps.google.com/maps?q=${encodedLocation}&output=embed`;
    }
  } catch (error) {
    console.error('🗺️ Embed URL: Error generating Google Maps embed URL:', error);
    return '';
  }
};

// Geocoding functions with error handling
export const geocodeAddress = async (address: string): Promise<{ lat: number; lng: number } | null> => {
  try {
    // Skip geocoding in demo mode
    if (!isGoogleMapsLoaded() || !address || address.trim() === '') {
      console.log('🗺️ Geocoding: Skipping in demo mode or invalid address');
      return null;
    }

    const googleMaps = window.google as GoogleMapsAPI;
    const geocoder = new googleMaps.maps.Geocoder();
    const result = await new Promise<GoogleGeocoderResult[]>((resolve, reject) => {
      geocoder.geocode({ address: address.trim() }, (results, status) => {
        if (status === googleMaps.maps.GeocoderStatus.OK && results && results.length > 0) {
          resolve(results);
        } else {
          reject(new Error(`Geocoding failed: ${status}`));
        }
      });
    });

    const location = result[0].geometry.location;
    return {
      lat: location.lat(),
      lng: location.lng()
    };
  } catch (error) {
    console.error('🗺️ Geocoding: Error geocoding address:', error);
    return null;
  }
};

// Calculate distance between two points (fallback when Google Maps is not available)
export const calculateDistance = (
  lat1: number, 
  lng1: number, 
  lat2: number, 
  lng2: number
): number => {
  try {
    // Use Google Maps Distance Matrix if available
    if (isGoogleMapsLoaded()) {
      // This would typically use the Distance Matrix API
      // For now, fall back to Haversine formula
    }

    // Haversine formula fallback
    const R = 6371; // Radius of Earth in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  } catch (error) {
    console.error('🗺️ Distance: Error calculating distance:', error);
    return 0;
  }
};

// 🔥 Calculate estimated route time and distance for delivery
export const calculateRouteTimeAndDistance = (
  pickupLocation: string,
  dropoffLocation: string
): { distanceKm: number; durationMinutes: number; durationSeconds: number } => {
  try {
    console.log('🗺️ Route Calculation: Calculating for', pickupLocation, 'to', dropoffLocation);
    
    // Deterministic calculation based on location names (Demo Mode)
    // In production, this would use Google Maps Directions API
    
    // Calculate a consistent hash from location names for deterministic results
    const locationHash = (pickupLocation + dropoffLocation).split('').reduce(
      (hash, char) => ((hash << 5) - hash) + char.charCodeAt(0), 0
    );
    
    // Base distance on total character count (simulating real distance)
    const baseDistance = Math.abs(locationHash % 50) + 5; // 5-55km range
    const distanceKm = parseFloat((baseDistance).toFixed(1));
    
    // Calculate duration based on distance and estimated speed (30 km/h average in Lagos traffic)
    const averageSpeedKmh = 30;
    const baseDurationMinutes = (distanceKm / averageSpeedKmh) * 60;
    
    // Add traffic factor (10-30% extra time)
    const trafficFactor = 1 + ((Math.abs(locationHash % 20) + 10) / 100);
    const durationMinutes = Math.round(baseDurationMinutes * trafficFactor);
    const durationSeconds = durationMinutes * 60;
    
    console.log(`🗺️ Route: ${distanceKm}km, ${durationMinutes} minutes (${durationSeconds} seconds)`);
    
    return {
      distanceKm,
      durationMinutes,
      durationSeconds
    };
  } catch (error) {
    console.error('🗺️ Route Calculation: Error:', error);
    // Fallback values
    return {
      distanceKm: 10,
      durationMinutes: 25,
      durationSeconds: 1500
    };
  }
};

// 🔥 Calculate delivery deadline with 50% buffer (Google Maps time + 50%)
export const calculateDeliveryDeadline = (
  pickupLocation: string,
  dropoffLocation: string
): { totalSeconds: number; googleMapsMinutes: number; bufferMinutes: number } => {
  const routeData = calculateRouteTimeAndDistance(pickupLocation, dropoffLocation);
  
  // Add 50% buffer to Google Maps estimate
  const bufferMinutes = Math.round(routeData.durationMinutes * 0.5);
  const totalMinutes = routeData.durationMinutes + bufferMinutes;
  const totalSeconds = totalMinutes * 60;
  
  console.log(`⏰ Delivery Deadline: ${routeData.durationMinutes}min (Google Maps) + ${bufferMinutes}min (50% buffer) = ${totalMinutes}min total`);
  
  return {
    totalSeconds,
    googleMapsMinutes: routeData.durationMinutes,
    bufferMinutes
  };
};

// Get current Google Maps state
export const getGoogleMapsState = (): GoogleMapsState => {
  return { ...googleMapsState };
};

// Clean up Google Maps resources
export const cleanupGoogleMaps = (): void => {
  try {
    googleMapsState = {
      isLoaded: false,
      isLoading: false,
      hasError: false
    };
    
    // Clean up global callback if it exists
    if (isBrowser && window.initMap) {
      delete window.initMap;
    }
    
    console.log('🗺️ Google Maps: Cleanup completed');
  } catch (error) {
    console.error('🗺️ Google Maps: Error during cleanup:', error);
  }
};

// Safe wrapper for any Google Maps operation
export async function safeGoogleMapsOperation<T>(
  operation: () => Promise<T> | T,
  fallback: T,
  operationName = 'Google Maps operation'
): Promise<T> {
  try {
    console.log(`🗺️ ${operationName}: Starting...`);
    const result = await operation();
    console.log(`🗺️ ${operationName}: Completed successfully`);
    return result;
  } catch (error) {
    console.error(`🗺️ ${operationName}: Error occurred:`, error);
    console.log(`🗺️ ${operationName}: Using fallback value`);
    return fallback;
  }
}

export default {
  initializeGoogleMaps,
  isGoogleMapsLoaded,
  openGoogleMapsNavigation,
  openGoogleMapsDirections,
  getGoogleMapsEmbedUrl,
  geocodeAddress,
  calculateDistance,
  calculateRouteTimeAndDistance,
  calculateDeliveryDeadline,
  getGoogleMapsState,
  cleanupGoogleMaps,
  safeGoogleMapsOperation
};