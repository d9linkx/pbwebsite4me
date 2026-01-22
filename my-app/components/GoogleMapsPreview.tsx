'use client'
import React, { useState } from 'react';
import { Map, ChevronDown, ChevronUp, Navigation, Clock } from 'lucide-react';
import { DeliveryJob, UserRole } from '../types';

interface GoogleMapsPreviewProps {
  job: DeliveryJob;
  className?: string;
  userRole?: UserRole;
  showPalLocation?: boolean; // Whether to show Pal's current location on map
}

export function GoogleMapsPreview({ job, className = '', userRole = 'sender', showPalLocation = false }: GoogleMapsPreviewProps) {
  const [isMapExpanded, setIsMapExpanded] = useState(false);

  // Check if user should see exact Pal location based on privacy settings
  const canSeeExactPalLocation = userRole === 'pal' || 
                                  job.locationPrivacy?.isPalLocationVisible;

  // Calculate route estimates based on specific delivery route (deterministic)
  const calculateRouteEstimates = () => {
    // Create a deterministic hash from pickup and dropoff locations
    const routeString = `${job.pickupLocation}-${job.dropoffLocation}`;
    let hash = 0;
    for (let i = 0; i < routeString.length; i++) {
      const char = routeString.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    
    // Use hash to generate consistent distance for this specific route
    // Range: 3-30 km based on route hash
    const baseDistance = Math.abs(hash % 28) + 3;
    
    // Calculate time: ~3-4 mins per km depending on route characteristics
    const timePerKm = 3 + (Math.abs(hash % 10) / 10); // 3.0 - 3.9 mins per km
    const baseTime = Math.floor(baseDistance * timePerKm);
    
    return {
      distance: `${baseDistance} km`,
      estimatedTime: baseTime < 60 ? `${baseTime} mins` : `${Math.floor(baseTime / 60)}h ${baseTime % 60}m`
    };
  };

  const routeEstimates = calculateRouteEstimates();

  return (
    <div className={`bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center">
            <Navigation size={16} className="text-white" />
          </div>
          <div>
            <p className="text-xs text-blue-600 font-medium">Route Details</p>
            <p className="text-sm font-semibold text-blue-900">
              {routeEstimates.distance} • {routeEstimates.estimatedTime}
            </p>
          </div>
        </div>
        
        {/* Toggle Map Button */}
        <button
          onClick={() => setIsMapExpanded(!isMapExpanded)}
          className="flex items-center space-x-1 px-3 py-1.5 bg-white hover:bg-blue-50 rounded-lg transition-all duration-200 border border-blue-200 text-blue-700 hover:text-blue-900"
        >
          <Map size={14} />
          <span className="text-xs font-medium">
            {isMapExpanded ? 'Hide' : 'View'} Map
          </span>
          {isMapExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      </div>
      
      {/* Locations Row */}
      <div className="flex items-center space-x-3 text-xs px-1">
        <div className="flex items-center space-x-2 flex-1 min-w-0">
          <div className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0"></div>
          <span className="text-gray-700 truncate font-medium">{job.pickupLocation}</span>
        </div>
        <div className="w-5 h-px bg-gray-300 flex-shrink-0"></div>
        <div className="flex items-center space-x-2 flex-1 min-w-0">
          <div className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0"></div>
          <span className="text-gray-700 truncate font-medium">{job.dropoffLocation}</span>
        </div>
      </div>

      {/* Expanded Map View */}
      {isMapExpanded && (
        <div className="mt-4 rounded-lg overflow-hidden border-2 border-blue-300 shadow-md animate-in slide-in-from-top-2 duration-300">
          {/* Map Iframe */}
          <div className="relative bg-white" style={{ height: '200px' }}>
            <iframe
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps/embed/v1/directions?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&origin=${encodeURIComponent(job.pickupLocation)}&destination=${encodeURIComponent(job.dropoffLocation)}&mode=driving`}
            ></iframe>
            
            {/* Map overlay info */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-darkest/70 to-transparent p-3">
              <div className="flex items-center justify-between text-white text-xs">
                <div className="flex items-center space-x-2">
                  <Clock size={12} />
                  <span className="font-medium">{routeEstimates.estimatedTime} drive</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Navigation size={12} />
                  <span className="font-medium">{routeEstimates.distance}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons Below Map */}
          <div className="bg-white p-2 border-t border-blue-200">
            <button
              onClick={() => {
                window.open(
                  `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(job.pickupLocation)}&destination=${encodeURIComponent(job.dropoffLocation)}&travelmode=driving`,
                  '_blank'
                );
              }}
              className="w-full flex items-center justify-center space-x-2 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-xs font-medium"
            >
              <Navigation size={14} />
              <span>Open in Google Maps</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
