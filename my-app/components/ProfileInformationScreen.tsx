'use client'
import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, User, Mail, Phone, MapPin, Camera, Save, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Textarea } from './ui/textarea';
import { User as UserType, Screen } from '../types';
import { useUserProfile, useUpdateProfile } from '../utils/apiHooks';
import { toast } from 'sonner';

interface ProfileInformationScreenProps {
  user: UserType | null;
  onNavigate?: (screen: Screen) => void;
  onBack: () => void;
  onSave: (updates: Partial<UserType>) => void;
}

export function ProfileInformationScreen({ 
  user,
  onBack, 
  onSave,
  onNavigate 
}: ProfileInformationScreenProps) {
  const { user: apiCurrentUser, loading: apiUserLoading, error: apiUserError, refetch } = useUserProfile();
  const { updateProfile, loading: updateLoading } = useUpdateProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    phone: '',
    address: ''
  });

  // Photo upload states
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [photoVerificationStatus, setPhotoVerificationStatus] = useState<'idle' | 'uploading' | 'verifying' | 'success' | 'failed'>('idle');
  const [verificationMessage, setVerificationMessage] = useState('');
  const [previewPhoto, setPreviewPhoto] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Always use API user data - ignore mock user prop from dashboard
  const currentUser = apiCurrentUser;
  const userLoading = apiUserLoading;
  const userError = apiUserError;

  // // Type assertion to help TypeScript understand the structure
  // you areconst typedUser = currentUser as User | null;

  // Validate that currentUser has the expected structure
  const isValidUser = currentUser && typeof currentUser === 'object' && (currentUser.id || currentUser._id);

  // Update form data when user data loads
  useEffect(() => {
    if (currentUser) {
      setFormData({
        firstName: currentUser.firstName || '',
        lastName: currentUser.lastName || '',
        userName: currentUser.userName || '',
        email: currentUser.email || '',
        phone: currentUser.phoneNumber || '',
        address: currentUser.location?.address || ''
      });
    }
  }, [currentUser]);

  // Show loading state while fetching user data
  if (apiUserLoading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-primary border-t-transparent"></div>
        <p className="text-gray-900 mt-4">Loading profile...</p>
      </div>
    );
  }

  // Show error state if user data fails to load
  if (apiUserError || !isValidUser) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <div className="text-gray-900 text-center">
          <p className="mb-4">Failed to load profile information</p>
          <button
            onClick={() => refetch()}
            className="bg-primary hover:bg-primary-hover text-gray-900 px-4 py-2 rounded-xl"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const handleSave = async () => {
    if (!currentUser?.id) return;

    try {
      const response = await updateProfile(currentUser.id, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        userName: formData.userName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
      });

      if (response.success && response.profile) {
        toast.success('Profile updated successfully!');
        onSave(response.profile);
        setIsEditing(false);
      } else {
        toast.error(response.error || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Profile update error:', error);
      toast.error('Failed to update profile');
    }
  };

  // Photo upload functionality
  const handlePhotoUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setVerificationMessage('Please select a valid image file');
      setPhotoVerificationStatus('failed');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setVerificationMessage('Image size must be less than 5MB');
      setPhotoVerificationStatus('failed');
      return;
    }

    setPhotoVerificationStatus('uploading');
    setVerificationMessage('');

    try {
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewPhoto(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      // Simulate upload process
      await new Promise(resolve => setTimeout(resolve, 1500));

      setPhotoVerificationStatus('verifying');
      setVerificationMessage('Verifying photo against your ID...');

      // Simulate ID verification process
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulate verification result (90% success rate for demo)
      const verificationSuccess = Math.random() > 0.1;

      if (verificationSuccess) {
        setPhotoVerificationStatus('success');
        setVerificationMessage('Photo verified successfully! Your profile photo has been updated.');

        // Update user profile with new photo immediately
        const updatedUser = {
          ...currentUser,
          ...(previewPhoto && { profileImage: previewPhoto })
        };
        onSave(updatedUser);

        // Reset verification states after success but keep the photo
        setTimeout(() => {
          setPhotoVerificationStatus('idle');
          setVerificationMessage('');
          setPreviewPhoto(null); // Clear preview since photo is now saved to user.profileImage
        }, 3000);
      } else {
        setPhotoVerificationStatus('failed');
        setVerificationMessage('Photo verification failed. The photo does not match your verified ID. Please try again with a clearer photo or contact support.');
        setPreviewPhoto(null);

        // Reset after failure
        setTimeout(() => {
          setPhotoVerificationStatus('idle');
          setVerificationMessage('');
        }, 5000);
      }
    } catch (error) {
      setPhotoVerificationStatus('failed');
      setVerificationMessage('Upload failed. Please try again.');
      setPreviewPhoto(null);

      setTimeout(() => {
        setPhotoVerificationStatus('idle');
        setVerificationMessage('');
      }, 3000);
    }
  };

  const handleCancel = () => {
    if (currentUser) {
      // Reset form data to current user values
      setFormData({
        firstName: currentUser.firstName || '',
        lastName: currentUser.lastName || '',
        userName: currentUser.userName || '',
        email: currentUser.email || '',
        phone: currentUser.phone || '',
        address: currentUser.location?.address || ''
      });
    }
    setIsEditing(false);
    // Reset photo upload states
    setPhotoVerificationStatus('idle');
    setVerificationMessage('');
    setPreviewPhoto(null);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <motion.div
        className="bg-white border-b border-gray-200 p-6 sticky top-0 z-10 shadow-sm"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <motion.button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft size={24} className="text-gray-700" />
            </motion.button>
            <h1 className="text-xl text-gray-700">Profile Information</h1>
          </div>
          {!isEditing && (
            <motion.button
              onClick={() => setIsEditing(true)}
              className="bg-gray-100 border border-gray-200 text-gray-700 hover:bg-gray-200 rounded-xl px-4 py-2 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Edit
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* Profile Photo */}
      <motion.div
        className="p-6 text-center relative z-10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="relative inline-block">
          <Avatar className="w-24 h-24 mx-auto border-4 border-gray-200">
            {previewPhoto ? (
              <img src={previewPhoto} alt="Profile Preview" className="w-full h-full object-cover rounded-full" />
            ) : currentUser?.profileImage ? (
              <img src={currentUser.profileImage} alt={currentUser?.fullName || 'Profile'} className="w-full h-full object-cover rounded-full" />
            ) : (
              <AvatarFallback className="bg-gradient-to-br from-primary to-primary-hover text-gray-900 text-2xl">
                {currentUser?.fullName ? currentUser.fullName.split(' ').map(n => n[0]).join('').toUpperCase() : 'U'}
              </AvatarFallback>
            )}
          </Avatar>
          {isEditing && (
            <>
              <motion.button
                onClick={handlePhotoUpload}
                disabled={photoVerificationStatus === 'uploading' || photoVerificationStatus === 'verifying'}
                className="absolute bottom-0 right-0 w-10 h-10 bg-primary text-gray-900 rounded-full flex items-center justify-center shadow-sm hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {photoVerificationStatus === 'uploading' || photoVerificationStatus === 'verifying' ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Camera size={18} />
                )}
              </motion.button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </>
          )}

          {/* Verification Status Indicator */}
          {photoVerificationStatus !== 'idle' && (
            <motion.div
              className="absolute -bottom-2 -right-2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              {photoVerificationStatus === 'success' && (
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-sm">
                  <CheckCircle size={16} className="text-gray-900" />
                </div>
              )}
              {photoVerificationStatus === 'failed' && (
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-sm">
                  <XCircle size={16} className="text-gray-900" />
                </div>
              )}
              {(photoVerificationStatus === 'uploading' || photoVerificationStatus === 'verifying') && (
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-sm">
                  <Loader2 size={14} className="text-gray-900 animate-spin" />
                </div>
              )}
            </motion.div>
          )}
        </div>
        <p className="text-gray-500 text-sm mt-3">
          {isEditing ? 'Tap to change photo' : 'Profile Photo'}
        </p>

        {/* Verification Message */}
        {verificationMessage && (
          <motion.div
            className={`mt-3 p-3 rounded-xl text-sm border ${
              photoVerificationStatus === 'success'
                ? 'bg-green-500/20 text-green-400 border-green-500/30'
                : photoVerificationStatus === 'failed'
                  ? 'bg-red-500/20 text-red-400 border-red-500/30'
                  : 'bg-blue-500/20 text-blue-400 border-blue-500/30'
            }`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {verificationMessage}
          </motion.div>
        )}

        {/* ID Verification Notice */}
        {isEditing && (
          <motion.div
            className="mt-3 p-3 bg-yellow-500/20 text-yellow-400 text-xs rounded-xl border border-yellow-500/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="font-medium">Security Notice:</span> Your photo will be verified against your ID document to ensure account security and trust on the platform.
          </motion.div>
        )}
      </motion.div>

      {/* Form */}
      <div className="flex-1 overflow-y-auto px-6 pb-32 relative z-10">
        <div className="space-y-4">
          {/* Personal Information */}
          <motion.div
            className="bg-gray-100 backdrop-blur-sm border border-gray-200 rounded-2xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-gray-900 mb-4 flex items-center font-semibold">
              <User size={20} className="mr-2 text-primary" />
              Personal Information
            </h3>

            <div className="space-y-4">
              <div>
                <Label htmlFor="firstName" className="text-gray-600">First Name</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                  className="mt-1 rounded-xl h-12 bg-white/5 border-gray-200 text-gray-900 placeholder:text-gray-500 disabled:opacity-50"
                  disabled={!isEditing}
                  required
                />
              </div>

              <div>
                <Label htmlFor="lastName" className="text-gray-600">Last Name</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                  className="mt-1 rounded-xl h-12 bg-white/5 border-gray-200 text-gray-900 placeholder:text-gray-500 disabled:opacity-50"
                  disabled={!isEditing}
                  required
                />
              </div>

              <div>
                <Label htmlFor="userName" className="text-gray-600">Username</Label>
                <Input
                  id="userName"
                  value={formData.userName}
                  onChange={(e) => setFormData(prev => ({ ...prev, userName: e.target.value }))}
                  className="mt-1 rounded-xl h-12 bg-white/5 border-gray-200 text-gray-900 placeholder:text-gray-500 disabled:opacity-50"
                  disabled={!isEditing}
                  required
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-gray-600">Email Address</Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="mt-1 rounded-xl h-12 bg-white/5 border-gray-200 text-gray-900 placeholder:text-gray-500 pl-10 disabled:opacity-50"
                    disabled={!isEditing}
                    required
                  />
                  <Mail size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 mt-0.5" />
                </div>
              </div>

              <div>
                <Label htmlFor="phone" className="text-gray-600">Phone Number</Label>
                <div className="relative">
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+234 (XXX) XXX-XXXX"
                    className="mt-1 rounded-xl h-12 bg-white/5 border-gray-200 text-gray-900 placeholder:text-gray-500 pl-10 disabled:opacity-50"
                    disabled={!isEditing}
                  />
                  <Phone size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 mt-0.5" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Address Information */}
          <motion.div
            className="bg-gray-100 backdrop-blur-sm border border-gray-200 rounded-2xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-gray-900 mb-4 flex items-center font-semibold">
              <MapPin size={20} className="mr-2 text-primary" />
              Address Information
            </h3>

            <div>
              <Label htmlFor="address" className="text-gray-600">Home Address</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                placeholder="Street, City, State"
                className="mt-1 rounded-xl bg-white/5 border-gray-200 text-gray-900 placeholder:text-gray-500 min-h-20 disabled:opacity-50"
                disabled={!isEditing}
              />
              <p className="text-xs text-gray-500 mt-2">
                This helps Pals find you for deliveries and pickups
              </p>
            </div>
          </motion.div>

          {/* Account Stats */}
          <motion.div
            className="bg-gray-100 backdrop-blur-sm border border-gray-200 rounded-2xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-gray-900 mb-4 font-semibold">Account Statistics</h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-xl p-4 text-center">
                <p className="text-3xl text-primary font-bold">{currentUser?.rating || 0}</p>
                <p className="text-xs text-gray-500 mt-1">Rating</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 text-center">
                <p className="text-3xl text-primary font-bold">{currentUser?.totalDeliveries || 0}</p>
                <p className="text-xs text-gray-500 mt-1">Deliveries</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Action Buttons - Fixed at bottom */}
      {isEditing && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-200 z-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex space-x-3">
            <motion.button
              onClick={handleCancel}
              className="flex-1 bg-gray-100 border border-gray-200 text-gray-900 hover:bg-gray-200 rounded-xl py-3 px-4 font-medium transition-all duration-300"
              disabled={updateLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Cancel
            </motion.button>
            <motion.button
              onClick={handleSave}
              className="flex-1 bg-primary hover:bg-primary-hover text-gray-900 rounded-xl py-3 px-4 font-semibold transition-all duration-300 disabled:opacity-50"
              disabled={updateLoading || !formData.firstName || !formData.lastName || !formData.email}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {updateLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                  Saving...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <Save size={18} className="mr-2" />
                  Save Changes
                </div>
              )}
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
