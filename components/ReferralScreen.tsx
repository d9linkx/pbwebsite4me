'use client'
import React, { useState } from 'react';
import { ArrowLeft, Copy, Share2, Users, Gift, CheckCircle, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from './ui/badge';
import { User, Screen } from '../types';

interface ReferralScreenProps {
  user: User | null;
  onBack: () => void;
  onNavigate: (screen: Screen) => void;
}



export function ReferralScreen({ user, onBack }: ReferralScreenProps) {
  const [copied, setCopied] = useState(false);

  const referralCode = user?._id ? `PRAWN${user._id.slice(0, 6).toUpperCase()}` : 'PRAWN000';
  const referralLink = `https://prawnbox.com/ref/${referralCode}`;
  
  const mockReferrals = [
    { id: '1', name: 'John Doe', joinedDate: '2025-01-10', earned: 500, status: 'completed' },
    { id: '2', name: 'Jane Smith', joinedDate: '2025-01-12', earned: 500, status: 'completed' },
    { id: '3', name: 'Mike Johnson', joinedDate: '2025-01-14', earned: 250, status: 'pending' },
  ];

  const totalEarned = mockReferrals.reduce((sum, ref) => sum + ref.earned, 0);

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Join Prawnbox',
        text: `Use my code ${referralCode} to get ₦500 bonus on Prawnbox!`,
        url: referralLink,
      });
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <motion.div
        className="bg-white border-b border-gray-200 p-6 sticky top-0 z-10 shadow-sm"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center space-x-4">
          <motion.button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft size={24} className="text-gray-700" />
          </motion.button>
          <div>
            <h1 className="text-xl text-gray-900">Referral Program</h1>
            <p className="text-sm text-gray-500">Earn by inviting friends</p>
          </div>
        </div>
      </motion.div>

      <div className="p-6 space-y-6 relative z-10">
        {/* Rewards Banner */}
        <motion.div 
          className="bg-gradient-to-r from-primary to-primary-hover rounded-2xl p-6 text-white"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Gift size={24} />
            </div>
            <div>
              <h3 className="font-bold text-lg">Earn ₦500 per referral!</h3>
              <p className="text-sm text-white/90">They get ₦500 too</p>
            </div>
          </div>
          <p className="text-sm text-white/80">
            Invite your friends to Prawnbox and both of you earn ₦500 when they complete their first delivery!
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <motion.div
            className="bg-gray-50 border border-gray-200 rounded-xl p-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center space-x-2 mb-2">
              <Users size={18} className="text-primary" />
              <span className="text-gray-600 text-sm">Total Referrals</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{mockReferrals.length}</p>
          </motion.div>

          <motion.div
            className="bg-gray-50 border border-gray-200 rounded-xl p-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp size={18} className="text-green-600" />
              <span className="text-gray-600 text-sm">Total Earned</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalEarned)}</p>
          </motion.div>
        </div>

        {/* Referral Code Card */}
        <motion.div
          className="bg-gray-50 border border-gray-200 rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-gray-900 font-semibold mb-4">Your Referral Code</h3>

          <div className="bg-white rounded-xl p-4 mb-4 border border-gray-200">
            <p className="text-center text-3xl font-bold text-primary tracking-wider mb-2">
              {referralCode}
            </p>
            <p className="text-center text-sm text-gray-600">{referralLink}</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <motion.button
              onClick={handleCopy}
              className="bg-white hover:bg-gray-50 border border-gray-200 text-gray-900 rounded-xl py-3 px-4 font-medium transition-all duration-300 flex items-center justify-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {copied ? <CheckCircle size={18} /> : <Copy size={18} />}
              <span>{copied ? 'Copied!' : 'Copy Link'}</span>
            </motion.button>

            <motion.button
              onClick={handleShare}
              className="bg-primary hover:bg-primary-hover text-white rounded-xl py-3 px-4 font-medium transition-all duration-300 flex items-center justify-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Share2 size={18} />
              <span>Share</span>
            </motion.button>
          </div>
        </motion.div>

        {/* How It Works */}
        <motion.div
          className="bg-gray-50 border border-gray-200 rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-gray-900 font-semibold mb-4">How It Works</h3>
          <div className="space-y-4">
            {[
              { step: '1', text: 'Share your unique referral code or link' },
              { step: '2', text: 'Friend signs up using your code' },
              { step: '3', text: 'They complete their first delivery' },
              { step: '4', text: 'You both get ₦500 instantly!' }
            ].map((item, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">{item.step}</span>
                </div>
                <p className="text-gray-700 text-sm pt-1">{item.text}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Referral History */}
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-gray-900 font-semibold">Referral History</h3>

          {mockReferrals.length > 0 ? (
            mockReferrals.map((referral, index) => (
              <motion.div
                key={referral.id}
                className="bg-white border border-gray-200 rounded-xl p-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.05 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        {referral.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="text-gray-900 font-medium">{referral.name}</p>
                      <p className="text-xs text-gray-600">
                        Joined {new Date(referral.joinedDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-primary font-semibold">{formatCurrency(referral.earned)}</p>
                    <Badge className={`text-xs border-0 ${
                      referral.status === 'completed'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {referral.status}
                    </Badge>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="bg-gray-50 rounded-xl p-8 text-center border border-gray-200">
              <Users size={48} className="text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No referrals yet</p>
              <p className="text-sm text-gray-500 mt-2">Start sharing your code to earn rewards!</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
