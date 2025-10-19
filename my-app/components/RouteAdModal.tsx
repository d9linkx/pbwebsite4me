'use client'
import React, { useState, useEffect } from 'react';
import { X, MapPin, Package, Truck, Weight, Clock, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';

interface RouteAd {
  id: string;
  fromLocation: string;
  toLocation: string;
  vehicleType: string;
  maxWeight?: string;
  preferredCategories: string[];
  startTime?: string;
  endTime?: string;
  notes?: string;
  createdAt: string;
  active: boolean;
}

interface RouteAdModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (routeAd: Omit<RouteAd, 'id' | 'createdAt' | 'active'>) => void;
  onUpdate: (routeAd: RouteAd) => void;
  editingAd?: RouteAd | null;
}

const VEHICLE_TYPES = ['Bike', 'Car', 'Van', 'Truck', 'SUV', 'Passenger'];
const CATEGORIES = [
  'Food & Groceries',
  'Electronics',
  'Documents',
  'Packages',
  'Fashion',
  'Jewelry',
  'Medical',
  'General'
];

export function RouteAdModal({ isOpen, onClose, onSave, onUpdate, editingAd }: RouteAdModalProps) {
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [vehicleType, setVehicleType] = useState('Car');
  const [maxWeight, setMaxWeight] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [notes, setNotes] = useState('');

  // Notification modal states
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState<'error' | 'success'>('error');
  
  // Cancel confirmation modal state
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  // Load editing ad data
  useEffect(() => {
    if (editingAd) {
      setFromLocation(editingAd.fromLocation);
      setToLocation(editingAd.toLocation);
      setVehicleType(editingAd.vehicleType);
      setMaxWeight(editingAd.maxWeight || '');
      setSelectedCategories(editingAd.preferredCategories);
      setStartTime(editingAd.startTime || '');
      setEndTime(editingAd.endTime || '');
      setNotes(editingAd.notes || '');
    } else {
      // Reset for new ad
      setFromLocation('');
      setToLocation('');
      setVehicleType('Car');
      setMaxWeight('');
      setSelectedCategories([]);
      setStartTime('');
      setEndTime('');
      setNotes('');
    }
  }, [editingAd, isOpen]);

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleSubmit = () => {
    if (!fromLocation || !toLocation) {
      // Show error notification instead of alert
      setNotificationType('error');
      setNotificationMessage('Please enter both starting and destination locations');
      setShowNotification(true);
      
      // Auto-dismiss after 4 seconds
      setTimeout(() => {
        setShowNotification(false);
      }, 4000);
      return;
    }

    const routeAdData = {
      fromLocation,
      toLocation,
      vehicleType,
      maxWeight: maxWeight || undefined,
      preferredCategories: selectedCategories,
      startTime: startTime || undefined,
      endTime: endTime || undefined,
      notes: notes || undefined
    };

    if (editingAd) {
      onUpdate({
        ...editingAd,
        ...routeAdData
      });
    } else {
      onSave(routeAdData);
    }

    // Show success notification
    setNotificationType('success');
    setNotificationMessage('Route ad created successfully!');
    setShowNotification(true);
    
    // Auto-dismiss and close modal after 4 seconds
    setTimeout(() => {
      setShowNotification(false);
      onClose();
    }, 4000);
  };

  // Check if form has any data
  const hasFormData = () => {
    return fromLocation || toLocation || maxWeight || selectedCategories.length > 0 || 
           startTime || endTime || notes || vehicleType !== 'Car';
  };

  // Handle cancel button click
  const handleCancelClick = () => {
    if (hasFormData()) {
      setShowCancelConfirm(true);
    } else {
      onClose();
    }
  };

  // Handle continue editing
  const handleContinue = () => {
    setShowCancelConfirm(false);
  };

  // Handle confirm cancellation
  const handleConfirmCancel = () => {
    setShowCancelConfirm(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="bg-[#2f2f2f] p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-bold">
                {editingAd ? 'Edit Route Ad' : 'Create New Route Ad'}
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <p className="text-sm text-white/90">
              Let senders know where you&apos;re headed and what you can deliver
            </p>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
            <div className="space-y-6">
              {/* Route Section */}
              <div className="space-y-4">
                <h3 className="font-semibold text-prawnbox-primary flex items-center space-x-2">
                  <MapPin size={18} className="text-prawnbox-accent" />
                  <span>Your Route</span>
                </h3>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Starting From
                    </label>
                    <Input
                      value={fromLocation}
                      onChange={(e) => setFromLocation(e.target.value)}
                      placeholder="e.g., Ikeja, Lagos"
                      className="w-full"
                    />
                  </div>
                  
                  <div className="flex items-center justify-center">
                    <div className="h-8 w-px bg-gray-300"></div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Going To
                    </label>
                    <Input
                      value={toLocation}
                      onChange={(e) => setToLocation(e.target.value)}
                      placeholder="e.g., Lekki, Lagos"
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Vehicle & Weight Section */}
              <div className="space-y-4">
                <h3 className="font-semibold text-prawnbox-primary flex items-center space-x-2">
                  <Truck size={18} className="text-prawnbox-accent" />
                  <span>Vehicle & Capacity</span>
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Vehicle Type
                    </label>
                    <select
                      value={vehicleType}
                      onChange={(e) => setVehicleType(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      {VEHICLE_TYPES.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Max Weight (kg) - Optional
                    </label>
                    <Input
                      type="number"
                      value={maxWeight}
                      onChange={(e) => setMaxWeight(e.target.value)}
                      placeholder="e.g., 20"
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Time Window Section */}
              <div className="space-y-4">
                <h3 className="font-semibold text-prawnbox-primary flex items-center space-x-2">
                  <Clock size={18} className="text-prawnbox-accent" />
                  <span>Time Window (Optional)</span>
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Available From
                    </label>
                    <Input
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Available Until
                    </label>
                    <Input
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Preferred Categories Section */}
              <div className="space-y-4">
                <h3 className="font-semibold text-prawnbox-primary flex items-center space-x-2">
                  <Package size={18} className="text-prawnbox-accent" />
                  <span>Preferred Categories (Optional)</span>
                </h3>
                
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map(category => (
                    <button
                      key={category}
                      onClick={() => toggleCategory(category)}
                      className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                        selectedCategories.includes(category)
                          ? 'bg-[#2f2f2f] text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes Section */}
              <div className="space-y-4">
                <h3 className="font-semibold text-prawnbox-primary">
                  Additional Notes (Optional)
                </h3>
                
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g., I make this trip daily, preferred pickup before 5pm"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent min-h-[80px]"
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-100 bg-gray-50">
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={handleCancelClick}
                className="flex-1 h-11"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                className="flex-1 h-11 bg-[#2f2f2f] text-white hover:bg-[#404040]"
              >
                {editingAd ? 'Update Route Ad' : 'Create Route Ad'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Notification Modal - Auto-dismiss */}
      {showNotification && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-[60] slide-in-from-top">
          <div className={`px-6 py-4 rounded-xl shadow-2xl border-2 ${
            notificationType === 'error' 
              ? 'bg-red-50 border-red-500 text-red-900' 
              : 'bg-green-50 border-green-500 text-green-900'
          }`}>
            <div className="flex items-center space-x-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                notificationType === 'error' ? 'bg-red-500' : 'bg-green-500'
              }`}>
                {notificationType === 'error' ? (
                  <X size={16} className="text-white" />
                ) : (
                  <svg className="w-4 h-4 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                )}
              </div>
              <p className="font-medium">{notificationMessage}</p>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Confirmation Modal - Persistent */}
      {showCancelConfirm && (
        <>
          <div className="fixed inset-0 bg-black/60 z-[55]" onClick={handleContinue} />
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[60] w-full max-w-md mx-4">
            <div className="bg-white rounded-2xl shadow-2xl p-6">
              <div className="mb-4">
                <h3 className="text-lg font-bold text-prawnbox-primary mb-2">
                  Cancel Route Ad Creation?
                </h3>
                <p className="text-sm text-gray-600">
                  You have unsaved changes. Are you sure you want to cancel? All your entered information will be lost.
                </p>
              </div>
              
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={handleContinue}
                  className="flex-1 h-11 border-gray-300 hover:bg-gray-50"
                >
                  Continue Editing
                </Button>
                <Button
                  onClick={handleConfirmCancel}
                  className="flex-1 h-11 bg-red-500 text-white hover:bg-red-600"
                >
                  Yes, Cancel
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
