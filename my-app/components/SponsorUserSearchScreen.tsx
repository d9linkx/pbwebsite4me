'use client'
import React, { useState } from 'react';
import { ArrowLeft, Search, Star, TrendingUp, Award, Users, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { User } from '../types';

interface SponsorUserSearchScreenProps {
  user: User | null;
  onBack: () => void;
  onSelectUser: (user: User) => void;
}

interface SponsorCandidate {
  id: string;
  name: string;
  role: string;
  rating: number;
  deliveriesCompleted: number;
  reliability: number;
  earnings: number;
  joinedDate: string;
  verified: boolean;
}

export function SponsorUserSearchScreen({ user, onBack, onSelectUser }: SponsorUserSearchScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'pals' | 'senders'>('all');

  const filters = ['all', 'pals', 'senders'] as const;

  const candidates: SponsorCandidate[] = [
    {
      id: 'user-1',
      name: 'Mike Johnson',
      role: 'Pal',
      rating: 4.8,
      deliveriesCompleted: 145,
      reliability: 95,
      earnings: 125000,
      joinedDate: '2024-01-15',
      verified: true
    },
    {
      id: 'user-2',
      name: 'Sarah Williams',
      role: 'Pal',
      rating: 4.9,
      deliveriesCompleted: 203,
      reliability: 98,
      earnings: 180000,
      joinedDate: '2023-12-10',
      verified: true
    },
    {
      id: 'user-3',
      name: 'David Chen',
      role: 'Sender',
      rating: 4.7,
      deliveriesCompleted: 89,
      reliability: 92,
      earnings: 75000,
      joinedDate: '2024-02-01',
      verified: true
    },
    {
      id: 'user-4',
      name: 'Emma Davis',
      role: 'Pal',
      rating: 4.6,
      deliveriesCompleted: 67,
      reliability: 88,
      earnings: 55000,
      joinedDate: '2024-03-05',
      verified: false
    }
  ];

  const filteredCandidates = candidates.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || c.role.toLowerCase() === selectedFilter.slice(0, -1);
    return matchesSearch && matchesFilter;
  });

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark via-darker to-dark flex flex-col">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-500 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-0 -left-40 w-80 h-80 bg-purple-500 rounded-full opacity-10 blur-3xl"></div>
      </div>

      {/* Header */}
      <motion.div 
        className="bg-dark border-b border-white/10 p-6 sticky top-0 z-20 shadow-lg"
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
            <h1 className="text-lg font-semibold text-white">Find Users to Sponsor</h1>
            <p className="text-sm text-gray-400">Search for reliable users</p>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 relative z-10">
        {/* Search Bar */}
        <motion.div 
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name..."
            className="pl-12 bg-white/10 border-white/20 text-white placeholder-gray-500 focus:border-primary h-12"
          />
        </motion.div>

        {/* Filters */}
        <motion.div 
          className="flex gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {filters.map((filter) => (
            <motion.button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-4 py-2 rounded-xl font-medium transition-all ${
                selectedFilter === filter
                  ? 'bg-primary text-white'
                  : 'bg-white/10 text-gray-400 hover:bg-white/20'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </motion.button>
          ))}
        </motion.div>

        {/* Info Card */}
        <motion.div 
          className="bg-blue-500/20 border border-blue-500/30 rounded-2xl p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h4 className="font-medium text-blue-300 mb-2">How Sponsorship Works:</h4>
          <ul className="text-sm text-blue-200 space-y-1 list-disc list-inside">
            <li>Provide capital for users to grow their business</li>
            <li>Earn commission (10-20%) on their activity</li>
            <li>Funds held in escrow for security</li>
            <li>Choose duration and commission rate</li>
          </ul>
        </motion.div>

        {/* Candidates List */}
        <div className="space-y-4">
          {filteredCandidates.length > 0 ? (
            filteredCandidates.map((candidate, index) => (
              <motion.div
                key={candidate.id}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center text-white text-xl font-bold">
                      {candidate.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-white font-semibold">{candidate.name}</h3>
                        {candidate.verified && (
                          <Award size={16} className="text-green-400" />
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={
                          candidate.role === 'Pal' 
                            ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                            : 'bg-purple-500/20 text-purple-400 border-purple-500/30'
                        }>
                          {candidate.role}
                        </Badge>
                        <div className="flex items-center space-x-1">
                          <Star size={14} className="text-yellow-400 fill-yellow-400" />
                          <span className="text-yellow-400 text-sm font-medium">
                            {candidate.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="bg-white/10 rounded-xl p-3 text-center">
                    <p className="text-xs text-gray-400 mb-1">Deliveries</p>
                    <p className="text-white font-semibold">{candidate.deliveriesCompleted}</p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-3 text-center">
                    <p className="text-xs text-gray-400 mb-1">Reliability</p>
                    <p className="text-green-400 font-semibold">{candidate.reliability}%</p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-3 text-center">
                    <p className="text-xs text-gray-400 mb-1">Earnings</p>
                    <p className="text-white font-semibold text-sm">
                      {formatAmount(candidate.earnings)}
                    </p>
                  </div>
                </div>

                {/* Performance Indicator */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-400">Performance Score</span>
                    <span className="text-xs text-white font-medium">
                      {Math.round((candidate.rating / 5) * 100)}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full"
                      style={{ width: `${(candidate.rating / 5) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Action Button */}
                <motion.button
                  onClick={() => {
                    // Convert candidate data to User object format
                    const [firstName, ...lastNameParts] = candidate.name.split(' ');
                    const lastName = lastNameParts.join(' ') || 'User';
                    const userName = `${firstName.toLowerCase()}${lastNameParts.length > 0 ? lastNameParts[0].toLowerCase() : ''}`;
                    
                    const userObject: User = {
                      id: candidate.id,
                      userName: userName,
                      firstName: firstName,
                      lastName: lastName,
                      name: candidate.name,
                      email: `${candidate.name.toLowerCase().replace(/\s+/g, '.')}@example.com`,
                      phone: `+234${Math.floor(Math.random() * 900000000) + 100000000}`,
                      role: candidate.role.toLowerCase() as 'pal' | 'sender',
                      rating: candidate.rating,
                      totalDeliveries: candidate.deliveriesCompleted,
                      walletBalance: 0,
                      profileImage: '',
                      isVerified: candidate.verified,
                      governmentIdUrl: '',
                      governmentIdStatus: 'pending',
                      activeEscrows: [],
                      transactions: [],
                      bankAccounts: [],
                      cards: [],
                      preferences: {
                        notifications: {
                          push: true,
                          email: true,
                          sms: false,
                        },
                        privacy: {
                          shareLocation: false,
                          shareProfile: false,
                        },
                        delivery: {
                          autoAcceptRadius: 5,
                          preferredVehicles: ['car'],
                        },
                      },
                    };
                    onSelectUser(userObject);
                  }}
                  className="w-full bg-primary hover:bg-primary-hover text-white py-3 rounded-xl font-semibold flex items-center justify-center space-x-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Sponsor {candidate.name.split(' ')[0]}</span>
                  <ChevronRight size={16} />
                </motion.button>
              </motion.div>
            ))
          ) : (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Users size={48} className="text-gray-500 mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">No Users Found</h3>
              <p className="text-gray-400">Try a different search or filter</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
