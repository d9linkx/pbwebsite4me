'use client'
import React, { useState } from 'react';
import { ArrowLeft, Search, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { Input } from './ui/input';
import { NigerianLocation } from '../types';

interface LocationSelectionScreenProps {
  locations: NigerianLocation[];
  onBack: () => void;
  onSelectLocation: (location: NigerianLocation) => void;
  searchQuery: string;
}

export function LocationSelectionScreen({ locations, onBack, onSelectLocation, searchQuery }: LocationSelectionScreenProps) {
  const [search, setSearch] = useState(searchQuery);

  const filteredLocations = locations.filter(location =>
    location.name.toLowerCase().includes(search.toLowerCase()) ||
    location.state.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex flex-col">
      {/* Dark Header */}
      <motion.div 
        className="bg-gradient-to-r from-[#2f2f2f] to-[#1a1a1a] border-b border-white/10 p-6 shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center space-x-4">
          <motion.button
            onClick={onBack}
            className="p-2 hover:bg-white/10 rounded-xl transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft size={20} className="text-white" />
          </motion.button>
          <div>
            <h1 className="text-lg font-semibold text-white">Select Location</h1>
            <p className="text-sm text-gray-400">Search for a location in Nigeria</p>
          </div>
        </div>
      </motion.div>

      {/* Search Bar */}
      <div className="p-6 bg-white border-b border-gray-200">
        <motion.div 
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search locations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-12 rounded-xl h-12 bg-gray-50 border-2 border-gray-200 focus:border-[#f44708]"
          />
        </motion.div>
      </div>

      {/* White Content - Location List */}
      <div className="flex-1 overflow-y-auto p-6">
        {filteredLocations.length > 0 ? (
          <div className="space-y-3">
            {filteredLocations.map((location, index) => (
              <motion.div
                key={index}
                onClick={() => onSelectLocation(location)}
                className="bg-white border-2 border-gray-200 rounded-2xl p-4 cursor-pointer hover:border-[#f44708] hover:shadow-lg transition-all"
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-[#f44708]/10 flex items-center justify-center flex-shrink-0">
                    <MapPin size={24} className="text-[#f44708]" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{location.name}</h4>
                    <p className="text-sm text-gray-600">
                      {location.lga && `${location.lga}, `}{location.state}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div 
            className="flex flex-col items-center justify-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-6">
              <MapPin size={40} className="text-gray-400" />
            </div>
            <h3 className="text-gray-900 font-semibold mb-2">No Locations Found</h3>
            <p className="text-gray-600 text-center max-w-md">
              Try adjusting your search query to find more results
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
