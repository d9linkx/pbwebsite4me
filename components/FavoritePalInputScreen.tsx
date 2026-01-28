'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowLeft, Search, Phone, User, Heart, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Label } from './ui/label';
import { DeliveryJob, FavoritePalData } from '../types';

interface FavoritePalInputScreenProps {
  onBack: () => void;
  onPalFound: (palData: FavoritePalData, jobData: DeliveryJob) => void;
  jobData: DeliveryJob | null;
}

export function FavoritePalInputScreen({ onBack, onPalFound, jobData }: FavoritePalInputScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<FavoritePalData | null>(null);
  const [error, setError] = useState('');

// Mock Pal database for demonstration
  const mockPals = [
    {
      id: 'PAL001',
      userName: 'mikejohnson',
      firstName: 'Mike',
      lastName: 'Johnson',
      name: 'Mike Johnson',
      phone: '+234-802-123-4567',
      rating: 4.9,
      totalDeliveries: 342,
      isVerified: true,
      profileImage: '/api/placeholder/40/40'
    },
    {
      id: 'PAL002',
      userName: 'sarahwils',
      firstName: 'Sarah',
      lastName: 'Wilson',
      name: 'Sarah Wilson',
      phone: '+234-803-567-8901',
      rating: 4.8,
      totalDeliveries: 189,
      isVerified: true,
      profileImage: '/api/placeholder/40/40'
    },
    {
      id: 'PAL003',
      userName: 'davido',
      firstName: 'David',
      lastName: 'Okafor',
      name: 'David Okafor',
      phone: '+234-804-234-5678',
      rating: 4.7,
      totalDeliveries: 276,
      isVerified: true,
      profileImage: '/api/placeholder/40/40'
    }
  ];

const handleSearch = () => {
    if (!searchQuery.trim()) {
      setError('Please enter a Pal ID or phone number');
      return;
    }

    setIsSearching(true);
    setError('');
    setSearchResult(null);

    // Simulate API search
    setTimeout(() => {
      const foundPal = mockPals.find(pal => 
        pal.id.toLowerCase() === searchQuery.toLowerCase() || 
        pal.phone.replace(/\D/g, '').includes(searchQuery.replace(/\D/g, '')) ||
        searchQuery.replace(/\D/g, '').includes(pal.phone.replace(/\D/g, ''))
      );

      setIsSearching(false);

      if (foundPal) {
        setSearchResult(foundPal);
        setError('');
      } else {
        setError('Pal not found. Please check the ID or phone number and try again.');
        setSearchResult(null);
      }
    }, 1500);
  };

  const handleProceed = () => {
    if (searchResult && jobData) {
      console.log('🚀 Proceeding with Pal:', searchResult.name);
      onPalFound(searchResult, jobData);
    }
  };

const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Header */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 z-10">
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft size={20} className="text-gray-700" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Choose Favourite Pal</h1>
              <p className="text-sm text-gray-600">Enter Pal ID or phone number</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Heart size={20} className="text-primary" />
            <span className="text-sm font-medium text-primary">Trusted Delivery</span>
          </div>
        </div>
      </div>

      <div className="p-6 max-w-md mx-auto">
        {/* Delivery Summary */}
        <Card className="p-6 mb-6 border-0 shadow-lg rounded-2xl">
          <h3 className="font-bold text-gray-900 mb-4">Your Delivery</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Item:</span>
              <span className="text-sm font-semibold text-gray-900">{jobData?.title}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">From:</span>
              <span className="text-sm font-semibold text-gray-900">{jobData?.pickupLocation}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">To:</span>
              <span className="text-sm font-semibold text-gray-900">{jobData?.dropoffLocation}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Value:</span>
              <span className="text-sm font-semibold text-gray-900">{formatAmount(jobData?.value || 0)}</span>
            </div>
          </div>
        </Card>

        {/* Search Section */}
        <Card className="p-6 mb-6 border-0 shadow-lg rounded-2xl">
          <h3 className="font-bold text-gray-900 mb-4">Find Your Pal</h3>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="search" className="text-sm font-medium text-gray-900">
                Pal ID or Phone Number
              </Label>
              <div className="flex space-x-3 mt-2">
                <Input
                  id="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="PAL001 or +234-802-123-4567"
                  className="flex-1 rounded-xl h-12 border-gray-200 focus:border-primary"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <Button
                  onClick={handleSearch}
                  disabled={isSearching || !searchQuery.trim()}
                  className="bg-primary hover:bg-[#d63a00] text-white rounded-xl px-6 h-12"
                >
                  {isSearching ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  ) : (
                    <Search size={18} />
                  )}
                </Button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-xl">
                <AlertCircle size={16} className="text-red-600 flex-shrink-0" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Search Result */}
            {searchResult && (
              <div className="border-2 border-green-200 bg-green-50 rounded-xl p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <CheckCircle size={16} className="text-green-600" />
                  <span className="text-sm font-medium text-green-800">Pal Found!</span>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-orange-50 border-2 border-orange-200 flex items-center justify-center flex-shrink-0">
                    {searchResult.profileImage ? (
                      <Image 
                        src={searchResult.profileImage} 
                        alt={searchResult.name}
                        width={48}
                        height={48}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <User size={20} className="text-primary" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-bold text-gray-900">{searchResult.name}</h4>
                      {searchResult.isVerified && (
                        <CheckCircle size={14} className="text-green-600" />
                      )}
                    </div>
                    
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center space-x-2">
                        <Phone size={12} className="text-gray-600" />
                        <span className="text-gray-600">{searchResult.phone}</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <span className="text-yellow-500">⭐</span>
                          <span className="font-medium text-gray-900">{searchResult.rating}</span>
                        </div>
                        <span className="text-gray-600">{searchResult.totalDeliveries} deliveries</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Demo Information Section */}
        <Card className="p-4 border-0 bg-green-50 rounded-xl mb-4">
          <h4 className="font-medium text-green-800 mb-3">🎮 Demo Mode - Try These Pals</h4>
          <div className="space-y-3">
            <div className="bg-white rounded-lg p-3 border border-green-200">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-green-900">Mike Johnson</span>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">⭐ 4.9</span>
              </div>
              <div className="text-sm text-green-700 space-y-1">
                <div>• Pal ID: <span className="font-mono bg-green-100 px-1 rounded">PAL001</span></div>
                <div>• Phone: <span className="font-mono bg-green-100 px-1 rounded">+234-802-123-4567</span></div>
                <div>• 342 deliveries</div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-3 border border-green-200">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-green-900">Sarah Wilson</span>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">⭐ 4.8</span>
              </div>
              <div className="text-sm text-green-700 space-y-1">
                <div>• Pal ID: <span className="font-mono bg-green-100 px-1 rounded">PAL002</span></div>
                <div>• Phone: <span className="font-mono bg-green-100 px-1 rounded">+234-803-567-8901</span></div>
                <div>• 189 deliveries</div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-3 border border-green-200">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-green-900">David Okafor</span>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">⭐ 4.7</span>
              </div>
              <div className="text-sm text-green-700 space-y-1">
                <div>• Pal ID: <span className="font-mono bg-green-100 px-1 rounded">PAL003</span></div>
                <div>• Phone: <span className="font-mono bg-green-100 px-1 rounded">+234-804-234-5678</span></div>
                <div>• 276 deliveries</div>
              </div>
            </div>
          </div>
          <p className="text-xs text-green-600 mt-3 text-center">
            💡 Copy and paste any Pal ID or phone number above to test the search
          </p>
        </Card>

        {/* Help Section */}
        <Card className="p-4 border-0 bg-blue-50 rounded-xl mb-6">
          <h4 className="font-medium text-blue-800 mb-2">How to find your Pal</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Use the Pal ID (e.g., PAL001) from previous deliveries</li>
            <li>• Enter their phone number (+234-xxx-xxx-xxxx)</li>
            <li>• Check your delivery history for trusted Pals</li>
          </ul>
        </Card>

        {/* Proceed Button */}
        {searchResult && (
          <Button
            onClick={handleProceed}
            className="w-full bg-primary hover:bg-[#d63a00] text-white rounded-xl h-14 font-medium"
          >
            Proceed with {searchResult.name}
          </Button>
        )}
      </div>
    </div>
  );
}