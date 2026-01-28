

export interface LocationPoint {
  latitude: number;
  longitude: number;
  accuracy: number;
  speed?: number;
  heading?: number;
  timestamp: string;
}

export interface LocationUpdate {
  type: 'location_update' | 'tracking_stopped' | 'initial_location';
  jobId: string;
  palLocation?: LocationPoint;
  isActive?: boolean;
  timestamp: string;
}

export class LocationTrackingService {
  private static instance: LocationTrackingService;
  private websockets: Map<string, WebSocket> = new Map();
  private locationCallbacks: Map<string, ((update: LocationUpdate) => void)[]> = new Map();
  private watchId: number | null = null;
  private isTracking: boolean = false;
  private currentJobId: string | null = null;
  private reconnectAttempts: Map<string, number> = new Map();
  private maxReconnectAttempts: number = 5;

  static getInstance(): LocationTrackingService {
    if (!LocationTrackingService.instance) {
      LocationTrackingService.instance = new LocationTrackingService();
    }
    return LocationTrackingService.instance;
  }

  // 🚗 Start GPS tracking for Pal
  async startTracking(jobId: string, accessToken?: string): Promise<boolean> {
    try {
      console.log('📍 Starting GPS tracking for job:', jobId);

      // Skip backend server calls for demo - use local tracking only
      console.log('📍 Demo mode: Using local GPS tracking without backend server')

      // Start GPS watching
      if ('geolocation' in navigator) {
        this.watchId = navigator.geolocation.watchPosition(
          (position) => this.handleLocationUpdate(jobId, position, accessToken),
          (error) => this.handleLocationError(error),
          {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 10000
          }
        );

        this.isTracking = true;
        this.currentJobId = jobId;
        console.log('📍 GPS tracking started successfully');
        return true;
      } else {
        throw new Error('Geolocation not supported');
      }
    } catch (error) {
      console.error('Error starting GPS tracking:', error);
      return false;
    }
  }

  // 📍 Handle GPS location updates
  private async handleLocationUpdate(
    jobId: string, 
    position: GeolocationPosition, 
    accessToken?: string
  ) {
    try {
      const locationData = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
        speed: position.coords.speed || 0,
        heading: position.coords.heading || 0
      };

      // Demo mode: Skip server updates, just log locally
      console.log('📍 Location updated (demo mode):', locationData.latitude, locationData.longitude);
      
      // Notify callbacks directly for demo
      const callbacks = this.locationCallbacks.get(jobId) || [];
      callbacks.forEach(callback => {
        callback({
          type: 'location_update',
          jobId,
          palLocation: {
            ...locationData,
            timestamp: new Date().toISOString()
          },
          timestamp: new Date().toISOString()
        });
      });
    } catch (error) {
      console.error('Error updating location:', error);
    }
  }

  // ❌ Handle GPS errors
  private handleLocationError(error: GeolocationPositionError) {
    console.error('GPS Error:', error);
    switch (error.code) {
      case error.PERMISSION_DENIED:
        console.error('Location permission denied');
        break;
      case error.POSITION_UNAVAILABLE:
        console.error('Location unavailable');
        break;
      case error.TIMEOUT:
        console.error('Location timeout');
        break;
    }
  }

  // 🛑 Stop GPS tracking
  async stopTracking(jobId: string, accessToken?: string): Promise<void> {
    try {
      console.log('📍 Stopping GPS tracking for job:', jobId);

      // Stop GPS watching
      if (this.watchId !== null) {
        navigator.geolocation.clearWatch(this.watchId);
        this.watchId = null;
      }

      // Demo mode: Skip server calls, just clean up local state
      this.isTracking = false;
      this.currentJobId = null;
      console.log('📍 GPS tracking stopped (demo mode)');
      
      // Notify callbacks that tracking stopped
      const callbacks = this.locationCallbacks.get(jobId) || [];
      callbacks.forEach(callback => {
        callback({
          type: 'tracking_stopped',
          jobId,
          timestamp: new Date().toISOString()
        });
      });
    } catch (error) {
      console.error('Error stopping GPS tracking:', error);
    }
  }

  // 🔌 Connect to WebSocket for real-time updates with improved error handling
  connectToLocationUpdates(jobId: string, callback: (update: LocationUpdate) => void): void {
    try {
      console.log('🔌 Demo mode: Connecting to location updates for job:', jobId);

      // Close existing connection if any
      this.disconnectFromLocationUpdates(jobId);

      // Reset reconnect attempts for new connection
      this.reconnectAttempts.set(jobId, 0);

      // Use demo connection instead of real WebSocket
      this.createWebSocketConnection(jobId, callback);

    } catch (error) {
      console.error('Error connecting to location updates:', error);
      // Provide fallback mock data even if connection fails
      this.provideFallbackLocationData(jobId, callback);
    }
  }
  
  // 📍 Provide fallback location data when connections fail
  private provideFallbackLocationData(jobId: string, callback: (update: LocationUpdate) => void): void {
    console.log('📍 Providing fallback location data for job:', jobId);
    
    const lagosCenter = { lat: 6.5244, lng: 3.3792 };
    const mockLocation: LocationPoint = {
      latitude: lagosCenter.lat,
      longitude: lagosCenter.lng,
      accuracy: 10,
      speed: 35,
      heading: 90,
      timestamp: new Date().toISOString()
    };
    
    setTimeout(() => {
      callback({
        type: 'initial_location',
        jobId,
        palLocation: mockLocation,
        timestamp: new Date().toISOString()
      });
    }, 1000);
  }

  // 🔌 Create WebSocket connection with retry logic (Demo Mode)
  private createWebSocketConnection(jobId: string, callback: (update: LocationUpdate) => void): void {
    try {
      console.log('🔌 Demo mode: Simulating WebSocket connection for job:', jobId);
      
      // Store callback for demo simulation
      if (!this.locationCallbacks.has(jobId)) {
        this.locationCallbacks.set(jobId, []);
      }
      this.locationCallbacks.get(jobId)!.push(callback);
      
      // Simulate successful connection
      setTimeout(() => {
        console.log('🔌 Demo WebSocket connected for job:', jobId);
        this.reconnectAttempts.set(jobId, 0);
        
        // Send initial location update after a delay
        setTimeout(() => {
          this.simulateLocationUpdate(jobId, callback);
        }, 2000);
      }, 100);

    } catch (error) {
      console.error('Error creating demo WebSocket connection:', error);
    }
  }
  
  // 📍 Simulate location updates for demo
  private simulateLocationUpdate(jobId: string, callback: (update: LocationUpdate) => void): void {
    // Generate realistic Lagos coordinates
    const lagosCenter = { lat: 6.5244, lng: 3.3792 };
    const randomOffset = () => (Math.random() - 0.5) * 0.01; // Small random offset
    
    const mockLocation: LocationPoint = {
      latitude: lagosCenter.lat + randomOffset(),
      longitude: lagosCenter.lng + randomOffset(),
      accuracy: Math.random() * 10 + 5, // 5-15 meters
      speed: Math.random() * 20 + 30, // 30-50 km/h
      heading: Math.random() * 360,
      timestamp: new Date().toISOString()
    };
    
    const update: LocationUpdate = {
      type: 'initial_location',
      jobId,
      palLocation: mockLocation,
      timestamp: new Date().toISOString()
    };
    
    console.log('📍 Demo location update:', update);
    callback(update);
    
    // Continue simulating updates every 10 seconds
    const updateInterval = setInterval(() => {
      if (this.locationCallbacks.has(jobId)) {
        const newMockLocation: LocationPoint = {
          latitude: lagosCenter.lat + randomOffset(),
          longitude: lagosCenter.lng + randomOffset(),
          accuracy: Math.random() * 10 + 5,
          speed: Math.random() * 20 + 30,
          heading: Math.random() * 360,
          timestamp: new Date().toISOString()
        };
        
        callback({
          type: 'location_update',
          jobId,
          palLocation: newMockLocation,
          timestamp: new Date().toISOString()
        });
      } else {
        clearInterval(updateInterval);
      }
    }, 10000);
  }

  // 🔄 Handle WebSocket reconnection with exponential backoff (Demo Mode)
  private handleWebSocketReconnect(jobId: string, callback: (update: LocationUpdate) => void, closeCode: number): void {
    const attempts = this.reconnectAttempts.get(jobId) || 0;
    
    if (attempts >= this.maxReconnectAttempts) {
      console.log(`🔌 Demo mode: Max reconnection attempts reached for job ${jobId}, using fallback data`);
      this.reconnectAttempts.delete(jobId);
      // Provide fallback data instead of failing
      this.provideFallbackLocationData(jobId, callback);
      return;
    }

    // Demo mode: Don't actually reconnect, just provide mock data
    console.log(`🔌 Demo mode: Simulating reconnection ${attempts + 1}/${this.maxReconnectAttempts} for job ${jobId}`);
    
    this.reconnectAttempts.set(jobId, attempts + 1);
    
    setTimeout(() => {
      if (this.locationCallbacks.has(jobId)) {
        console.log(`🔌 Demo mode: Providing mock location data for job ${jobId}`);
        this.provideFallbackLocationData(jobId, callback);
      }
    }, 1000); // Shorter delay for demo
  }

  // 🔌 Disconnect from WebSocket
  disconnectFromLocationUpdates(jobId: string): void {
    const ws = this.websockets.get(jobId);
    if (ws) {
      ws.close(1000, 'Intentional disconnect'); // Use code 1000 for normal closure
      this.websockets.delete(jobId);
    }
    this.locationCallbacks.delete(jobId);
    this.reconnectAttempts.delete(jobId);
    console.log('🔌 Disconnected from WebSocket for job:', jobId);
  }

  // 📍 Get current location for a job
  async getCurrentLocation(jobId: string): Promise<LocationPoint | null> {
    try {
      console.log('📍 Demo mode: Generating mock current location for job:', jobId);
      
      // Return mock location data for demo
      const lagosCenter = { lat: 6.5244, lng: 3.3792 };
      const randomOffset = () => (Math.random() - 0.5) * 0.01;
      
      return {
        latitude: lagosCenter.lat + randomOffset(),
        longitude: lagosCenter.lng + randomOffset(),
        accuracy: Math.random() * 10 + 5,
        speed: Math.random() * 20 + 30,
        heading: Math.random() * 360,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error generating mock location:', error);
      return null;
    }
  }

  // 🔑 Get stored authentication token
  private getStoredToken(): string | null {
    try {
      // Try to get from localStorage

      
      // Fallback: try simpler storage
      return localStorage.getItem('supabase.auth.token');
    } catch (error) {
      console.error('Error getting stored token:', error);
      return null;
    }
  }

  // 🚗 Check if currently tracking
  get isCurrentlyTracking(): boolean {
    return this.isTracking;
  }

  // 📦 Get current job being tracked
  get trackingJobId(): string | null {
    return this.currentJobId;
  }

  // 🌍 Request location permission
  async requestLocationPermission(): Promise<boolean> {
    try {
      if ('geolocation' in navigator) {
        return new Promise((resolve) => {
          navigator.geolocation.getCurrentPosition(
            () => resolve(true),
            (error) => {
              console.error('Location permission error:', error);
              resolve(false);
            },
            { timeout: 10000 }
          );
        });
      }
      return false;
    } catch (error) {
      console.error('Error requesting location permission:', error);
      return false;
    }
  }

  // 🔄 Cleanup all connections
  cleanup(): void {
    // Stop GPS tracking
    if (this.watchId !== null) {
      navigator.geolocation.clearWatch(this.watchId);
      this.watchId = null;
    }

    // Close all WebSocket connections
    this.websockets.forEach((ws) => {
      ws.close(1000, 'Service cleanup');
    });
    this.websockets.clear();
    this.locationCallbacks.clear();
    this.reconnectAttempts.clear();

    this.isTracking = false;
    this.currentJobId = null;
    console.log('🧹 Location service cleanup completed');
  }

  // 🔍 Get connection status for debugging
  getConnectionStatus(jobId: string): {
    isConnected: boolean;
    reconnectAttempts: number;
    hasCallbacks: boolean;
  } {
    const ws = this.websockets.get(jobId);
    return {
      isConnected: ws ? ws.readyState === WebSocket.OPEN : false,
      reconnectAttempts: this.reconnectAttempts.get(jobId) || 0,
      hasCallbacks: this.locationCallbacks.has(jobId)
    };
  }
}

// 📱 Location utility functions
export const locationUtils = {
  // Calculate distance between two points (Haversine formula)
  calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Radius of Earth in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  },

  // Format distance for display
  formatDistance(distanceKm: number): string {
    if (distanceKm < 1) {
      return `${Math.round(distanceKm * 1000)}m`;
    }
    return `${distanceKm.toFixed(1)}km`;
  },

  // Check if location is accurate enough
  isLocationAccurate(accuracy: number): boolean {
    return accuracy <= 50; // 50 meters or better
  },

  // Get location name from coordinates (reverse geocoding)
  async getLocationName(lat: number, lng: number): Promise<string> {
    try {
      // This would typically use Google Maps Geocoding API
      // For now, return coordinates
      return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
    } catch (error) {
      return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
    }
  },

  // 🎯 Calculate distance in meters (more precise for proximity detection)
  calculateDistanceInMeters(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371000; // Radius of Earth in meters
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  },

  // 🔒 Check if Pal is within proximity (5-10 meters) of destination
  isWithinProximity(
    palLat: number, 
    palLng: number, 
    destLat: number, 
    destLng: number, 
    proximityThreshold: number = 10
  ): { isWithin: boolean; distance: number } {
    const distance = this.calculateDistanceInMeters(palLat, palLng, destLat, destLng);
    return {
      isWithin: distance <= proximityThreshold,
      distance: Math.round(distance)
    };
  },

  // 🎭 Check if location should be visible based on user role and privacy settings
  shouldShowExactLocation(
    userRole: 'sender' | 'pal' | 'receiver' | 'proxy' | 'admin',
    isPalLocationRevealed: boolean
  ): boolean {
    // Admin and Pal always see exact location
    if (userRole === 'admin' || userRole === 'pal') {
      return true;
    }
    
    // Others only see exact location after Pal reveals it
    return isPalLocationRevealed;
  },

  // 📍 Get obfuscated location (general area instead of exact coordinates)
  getObfuscatedLocation(lat: number, lng: number, radiusKm: number = 0.5): { lat: number; lng: number } {
    // Add random offset to hide exact location
    // This creates a circular area around the actual location
    const angle = Math.random() * 2 * Math.PI;
    const distance = Math.sqrt(Math.random()) * radiusKm; // Random distance up to radius
    
    // Convert distance to degrees (approximate)
    const latOffset = (distance / 111) * Math.cos(angle); // 111km per degree latitude
    const lngOffset = (distance / (111 * Math.cos(lat * Math.PI / 180))) * Math.sin(angle);
    
    return {
      lat: lat + latOffset,
      lng: lng + lngOffset
    };
  },

  // 🗺️ Format proximity distance for UI
  formatProximityDistance(meters: number): string {
    if (meters < 10) {
      return `${meters}m away`;
    } else if (meters < 100) {
      return `${Math.round(meters / 10) * 10}m away`;
    } else if (meters < 1000) {
      return `${Math.round(meters / 50) * 50}m away`;
    } else {
      return `${(meters / 1000).toFixed(1)}km away`;
    }
  }
};

export default LocationTrackingService;