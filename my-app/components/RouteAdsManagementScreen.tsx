'use client'
import React, { useState } from 'react';
import { ArrowLeft, MapPin, TrendingUp, Eye, Plus, Edit, Trash2, Play, Pause } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/Dialog';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { User } from '../types';

interface RouteAd {
  id: string;
  fromLocation: string;
  toLocation: string;
  description: string;
  budget: number;
  spent: number;
  views: number;
  clicks: number;
  conversions: number;
  status: 'active' | 'paused' | 'completed';
  startDate: string;
  endDate: string;
}

interface RouteAdsManagementScreenProps {
  user: User | null;
  onBack: () => void;
}

export function RouteAdsManagementScreen({ user, onBack }: RouteAdsManagementScreenProps) {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [selectedAd, setSelectedAd] = useState<RouteAd | null>(null);
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('5000');

  const [routeAds, setRouteAds] = useState<RouteAd[]>([
    {
      id: 'ad-1',
      fromLocation: 'Ikeja, Lagos',
      toLocation: 'Victoria Island, Lagos',
      description: 'Fast delivery to VI - Same day service available',
      budget: 10000,
      spent: 4500,
      views: 1250,
      clicks: 85,
      conversions: 12,
      status: 'active',
      startDate: '2024-01-15',
      endDate: '2024-02-15'
    },
    {
      id: 'ad-2',
      fromLocation: 'Lekki Phase 1',
      toLocation: 'Ajah',
      description: 'Reliable courier service along Lekki-Ajah corridor',
      budget: 8000,
      spent: 8000,
      views: 890,
      clicks: 56,
      conversions: 8,
      status: 'completed',
      startDate: '2024-01-10',
      endDate: '2024-01-25'
    },
    {
      id: 'ad-3',
      fromLocation: 'Surulere',
      toLocation: 'Yaba',
      description: 'Quick delivery to Yaba - Students discount available',
      budget: 6000,
      spent: 2100,
      views: 420,
      clicks: 32,
      conversions: 5,
      status: 'paused',
      startDate: '2024-01-20',
      endDate: '2024-02-10'
    }
  ]);

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Active</Badge>;
      case 'paused':
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Paused</Badge>;
      case 'completed':
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Completed</Badge>;
      default:
        return <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30">Unknown</Badge>;
    }
  };

  const toggleAdStatus = (adId: string) => {
    setRouteAds(prev => prev.map(ad => 
      ad.id === adId && ad.status !== 'completed'
        ? { ...ad, status: ad.status === 'active' ? 'paused' : 'active' as 'active' | 'paused' }
        : ad
    ));
  };

  const deleteAd = (adId: string) => {
    setRouteAds(prev => prev.filter(ad => ad.id !== adId));
  };

  const handleCreateAd = () => {
    const newAd: RouteAd = {
      id: `ad-${Date.now()}`,
      fromLocation,
      toLocation,
      description,
      budget: parseFloat(budget),
      spent: 0,
      views: 0,
      clicks: 0,
      conversions: 0,
      status: 'active',
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    };
    setRouteAds(prev => [newAd, ...prev]);
    setShowCreateDialog(false);
    setFromLocation('');
    setToLocation('');
    setDescription('');
    setBudget('5000');
  };

  const totalStats = {
    totalBudget: routeAds.reduce((sum, ad) => sum + ad.budget, 0),
    totalSpent: routeAds.reduce((sum, ad) => sum + ad.spent, 0),
    totalViews: routeAds.reduce((sum, ad) => sum + ad.views, 0),
    totalConversions: routeAds.reduce((sum, ad) => sum + ad.conversions, 0)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2f2f2f] via-[#1a1a1a] to-[#2f2f2f] flex flex-col">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-0 -left-40 w-80 h-80 bg-green-500 rounded-full opacity-10 blur-3xl"></div>
      </div>

      {/* Header */}
      <motion.div 
        className="bg-[#2f2f2f] border-b border-white/10 p-6 sticky top-0 z-20 shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between">
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
              <h1 className="text-lg font-semibold text-white">Route Ads</h1>
              <p className="text-sm text-gray-400">Promote your delivery routes</p>
            </div>
          </div>
          <motion.button
            onClick={() => setShowCreateDialog(true)}
            className="p-2 bg-[#f44708] hover:bg-[#ff5722] rounded-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus size={20} className="text-white" />
          </motion.button>
        </div>
      </motion.div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 relative z-10">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <motion.div 
            className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Total Budget</span>
              <TrendingUp size={20} className="text-blue-400" />
            </div>
            <p className="text-2xl font-bold text-white">
              {formatAmount(totalStats.totalBudget)}
            </p>
          </motion.div>

          <motion.div 
            className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Total Spent</span>
              <TrendingUp size={20} className="text-green-400" />
            </div>
            <p className="text-2xl font-bold text-white">
              {formatAmount(totalStats.totalSpent)}
            </p>
          </motion.div>

          <motion.div 
            className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Total Views</span>
              <Eye size={20} className="text-purple-400" />
            </div>
            <p className="text-2xl font-bold text-white">
              {totalStats.totalViews.toLocaleString()}
            </p>
          </motion.div>

          <motion.div 
            className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Conversions</span>
              <TrendingUp size={20} className="text-yellow-400" />
            </div>
            <p className="text-2xl font-bold text-white">
              {totalStats.totalConversions}
            </p>
          </motion.div>
        </div>

        {/* Ads List */}
        <div className="space-y-4">
          {routeAds.map((ad, index) => (
            <motion.div
              key={ad.id}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <MapPin size={16} className="text-blue-400" />
                    <span className="text-white font-medium">{ad.fromLocation}</span>
                    <span className="text-gray-400">→</span>
                    <MapPin size={16} className="text-green-400" />
                    <span className="text-white font-medium">{ad.toLocation}</span>
                  </div>
                  {getStatusBadge(ad.status)}
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-400 text-sm mb-4">{ad.description}</p>

              {/* Stats */}
              <div className="grid grid-cols-4 gap-3 mb-4">
                <div className="bg-white/10 rounded-xl p-3 text-center">
                  <p className="text-xs text-gray-400 mb-1">Views</p>
                  <p className="text-white font-semibold">{ad.views}</p>
                </div>
                <div className="bg-white/10 rounded-xl p-3 text-center">
                  <p className="text-xs text-gray-400 mb-1">Clicks</p>
                  <p className="text-white font-semibold">{ad.clicks}</p>
                </div>
                <div className="bg-white/10 rounded-xl p-3 text-center">
                  <p className="text-xs text-gray-400 mb-1">CTR</p>
                  <p className="text-white font-semibold">
                    {ad.views > 0 ? ((ad.clicks / ad.views) * 100).toFixed(1) : 0}%
                  </p>
                </div>
                <div className="bg-white/10 rounded-xl p-3 text-center">
                  <p className="text-xs text-gray-400 mb-1">Conv.</p>
                  <p className="text-green-400 font-semibold">{ad.conversions}</p>
                </div>
              </div>

              {/* Budget Progress */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-400">Budget</span>
                  <span className="text-xs text-white">
                    {formatAmount(ad.spent)} / {formatAmount(ad.budget)}
                  </span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full"
                    style={{ width: `${Math.min((ad.spent / ad.budget) * 100, 100)}%` }}
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-3 gap-2">
                {ad.status !== 'completed' && (
                  <motion.button
                    onClick={() => toggleAdStatus(ad.id)}
                    className={`flex items-center justify-center space-x-1 py-2.5 rounded-xl ${
                      ad.status === 'active'
                        ? 'bg-yellow-500 hover:bg-yellow-600'
                        : 'bg-green-500 hover:bg-green-600'
                    } text-white`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {ad.status === 'active' ? <Pause size={16} /> : <Play size={16} />}
                    <span className="text-sm font-medium">
                      {ad.status === 'active' ? 'Pause' : 'Resume'}
                    </span>
                  </motion.button>
                )}

                <motion.button
                  onClick={() => setSelectedAd(ad)}
                  className="flex items-center justify-center space-x-1 bg-blue-500 hover:bg-blue-600 text-white py-2.5 rounded-xl"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Edit size={16} />
                  <span className="text-sm font-medium">Edit</span>
                </motion.button>

                <motion.button
                  onClick={() => deleteAd(ad.id)}
                  className="flex items-center justify-center space-x-1 bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-xl"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Trash2 size={16} />
                  <span className="text-sm font-medium">Delete</span>
                </motion.button>
              </div>
            </motion.div>
          ))}

          {routeAds.length === 0 && (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <MapPin size={48} className="text-gray-500 mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">No Route Ads</h3>
              <p className="text-gray-400 mb-6">Create your first route ad to start promoting</p>
              <motion.button
                onClick={() => setShowCreateDialog(true)}
                className="bg-[#f44708] hover:bg-[#ff5722] text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Create Route Ad
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Create Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="sm:max-w-md mx-4 rounded-2xl bg-gradient-to-br from-[#2f2f2f] to-[#1a1a1a] border-white/20 text-white">
          <DialogHeader>
            <DialogTitle className="text-white">Create Route Ad</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm text-gray-400 mb-2 block">From Location</label>
              <Input
                value={fromLocation}
                onChange={(e) => setFromLocation(e.target.value)}
                placeholder="e.g., Ikeja, Lagos"
                className="bg-white/10 border-white/20 text-white"
              />
            </div>

            <div>
              <label className="text-sm text-gray-400 mb-2 block">To Location</label>
              <Input
                value={toLocation}
                onChange={(e) => setToLocation(e.target.value)}
                placeholder="e.g., Victoria Island"
                className="bg-white/10 border-white/20 text-white"
              />
            </div>

            <div>
              <label className="text-sm text-gray-400 mb-2 block">Description</label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your service..."
                className="bg-white/10 border-white/20 text-white"
                rows={3}
              />
            </div>

            <div>
              <label className="text-sm text-gray-400 mb-2 block">Budget (₦)</label>
              <Input
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="5000"
                className="bg-white/10 border-white/20 text-white"
              />
            </div>

            <motion.button
              onClick={handleCreateAd}
              disabled={!fromLocation || !toLocation || !description || !budget}
              className="w-full bg-[#f44708] hover:bg-[#ff5722] text-white py-3 rounded-xl font-semibold disabled:opacity-50 flex items-center justify-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Create Ad
            </motion.button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
