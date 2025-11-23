'use client'
import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, MapPin, Package, Calendar, DollarSign, Camera, Upload, X, CheckCircle, Users, MapIcon, Heart, User, Phone, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/Select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/Dialog';
import { DeliveryJob, ItemSize } from '../types';
import { AIItemScanner } from './AIItemScanner';

interface ScanData {
  itemName?: string;
  category?: string;
  size?: string;
  estimatedWeight?: string;
  color?: string;
  confidence?: number;
  timestamp?: string;
  scannedBy?: string;
  scanType?: string;
  images?: string[];
  cameraUsed?: boolean;
  detectionDetails?: unknown;
}

interface FavoritePalJobData {
  title: string;
  pickupLocation: string;
  dropoffLocation: string;
  receiverName: string;
  receiverPhone: string;
  itemSize: string;
  weight: string;
  value: number;
  pickupDate: string;
  pickupTime?: string;
  notes?: string;
  images: string[];
  userId: string;
}

interface PostDeliveryScreenProps {
  onBack: () => void;
  onSubmit: (job: DeliveryJob) => void;
  onLocationSelect: (type: 'pickup' | 'dropoff') => void;
  userId: string;
  onNavigateToMyDeliveries: () => void;
  onChooseFavoritePal: (jobData: FavoritePalJobData) => void;
}

// Comprehensive list of real Lagos and Oyo State locations
const LAGOS_OYO_LOCATIONS = [
  // Lagos - Island
  'Victoria Island, Lagos',
  'Ikoyi, Lagos',
  'Lekki Phase 1, Lagos',
  'Lekki Phase 2, Lagos',
  'Ajah, Lagos',
  'Banana Island, Lagos',
  'Parkview Estate, Ikoyi, Lagos',
  'Eko Atlantic City, Lagos',
  'Oniru Estate, Lagos',
  'Osapa London, Lekki, Lagos',
  'Abraham Adesanya Estate, Ajah, Lagos',
  'Chevron Drive, Lekki, Lagos',
  'Admiralty Way, Lekki, Lagos',
  'Adeola Odeku Street, Victoria Island, Lagos',
  'Ahmadu Bello Way, Victoria Island, Lagos',
  'Awolowo Road, Ikoyi, Lagos',
  'Bourdillon Road, Ikoyi, Lagos',
  'Akin Adesola Street, Victoria Island, Lagos',
  'Ozumba Mbadiwe Avenue, Victoria Island, Lagos',
  'Eti-Osa, Lagos',
  
  // Lagos - Mainland
  'Ikeja, Lagos',
  'Surulere, Lagos',
  'Yaba, Lagos',
  'Ebute Metta, Lagos',
  'Mushin, Lagos',
  'Oshodi, Lagos',
  'Isolo, Lagos',
  'Ejigbo, Lagos',
  'Agege, Lagos',
  'Ikotun, Lagos',
  'Egbeda, Lagos',
  'Alimosho, Lagos',
  'Ipaja, Lagos',
  'Abule Egba, Lagos',
  'Dopemu, Lagos',
  'Shogunle, Ikeja, Lagos',
  'Allen Avenue, Ikeja, Lagos',
  'Opebi, Ikeja, Lagos',
  'GRA Ikeja, Lagos',
  'Maryland, Lagos',
  'Anthony Village, Lagos',
  'Gbagada, Lagos',
  'Ogudu, Lagos',
  'Ojota, Lagos',
  'Ketu, Lagos',
  'Mile 12, Lagos',
  'Ikorodu, Lagos',
  'Alapere, Ketu, Lagos',
  'Magodo Phase 1, Lagos',
  'Magodo Phase 2, Lagos',
  'Omole Phase 1, Lagos',
  'Omole Phase 2, Lagos',
  'Berger, Lagos',
  'Isheri, Lagos',
  'Ojodu, Lagos',
  'Ogba, Lagos',
  'Ifako-Ijaiye, Lagos',
  'Abule Egba, Lagos',
  'Iyana Ipaja, Lagos',
  'Egbeda, Lagos',
  'Idimu, Lagos',
  'Igando, Lagos',
  'Ikotun-Egbe, Lagos',
  'Isolo, Lagos',
  'Okota, Lagos',
  'Amuwo Odofin, Lagos',
  'Festac Town, Lagos',
  'Mile 2, Lagos',
  'Orile, Lagos',
  'Apapa, Lagos',
  'Ijora, Lagos',
  'Lagos Island, Lagos',
  'CMS, Lagos',
  'Marina, Lagos',
  'Broad Street, Lagos Island',
  'Balogun Market, Lagos',
  'Idumota, Lagos',
  'Ebute Ero, Lagos',
  'Campos Square, Lagos',
  
  // Lagos - Other Areas
  'Badagry, Lagos',
  'Epe, Lagos',
  'Ibeju-Lekki, Lagos',
  'Sangotedo, Lagos',
  'Awoyaya, Lagos',
  'Lakowe, Lagos',
  'Bogije, Lagos',
  'Eleko, Lagos',
  'Ikorodu Town, Lagos',
  'Igbogbo, Ikorodu, Lagos',
  'Owutu, Ikorodu, Lagos',
  'Agbowa, Ikorodu, Lagos',
  'Kosofe, Lagos',
  'Somolu, Lagos',
  'Bariga, Lagos',
  'Akoka, Lagos',
  'Palmgrove, Lagos',
  'Jibowu, Lagos',
  'Fadeyi, Lagos',
  'Onipanu, Lagos',
  'Ilupeju, Lagos',
  'Mushin, Lagos',
  'Papa Ajao, Mushin, Lagos',
  'Idi-Araba, Mushin, Lagos',
  
  // Oyo State - Ibadan
  'Bodija, Ibadan, Oyo',
  'Ring Road, Ibadan, Oyo',
  'Mokola, Ibadan, Oyo',
  'Dugbe, Ibadan, Oyo',
  'Oke Ado, Ibadan, Oyo',
  'Agodi GRA, Ibadan, Oyo',
  'Jericho, Ibadan, Oyo',
  'Challenge, Ibadan, Oyo',
  'Felele, Ibadan, Oyo',
  'Sango, Ibadan, Oyo',
  'UI, Ibadan, Oyo',
  'Ajibode, Ibadan, Oyo',
  'Apata, Ibadan, Oyo',
  'Akobo, Ibadan, Oyo',
  'Oluyole Estate, Ibadan, Oyo',
  'Iyaganku, Ibadan, Oyo',
  'New Bodija, Ibadan, Oyo',
  'Old Bodija, Ibadan, Oyo',
  'Samonda, Ibadan, Oyo',
  'Poly Road, Ibadan, Oyo',
  'Eleyele, Ibadan, Oyo',
  'Ashi, Ibadan, Oyo',
  'Oke Ado, Ibadan, Oyo',
  'Molete, Ibadan, Oyo',
  'Beere, Ibadan, Oyo',
  'Oje, Ibadan, Oyo',
  'Orita Challenge, Ibadan, Oyo',
  'Orita Mefa, Ibadan, Oyo',
  'Iwo Road, Ibadan, Oyo',
  'Sabo, Ibadan, Oyo',
  'Odo Ona, Ibadan, Oyo',
  'Oke Bola, Ibadan, Oyo',
  'Oke Ado, Ibadan, Oyo',
  'Agbowo, Ibadan, Oyo',
  'Bodija Market, Ibadan, Oyo',
  'Adamasingba, Ibadan, Oyo',
  'Liberty Stadium Area, Ibadan, Oyo',
  'Secretariat, Ibadan, Oyo',
  'Oke Ado, Ibadan, Oyo',
  'Total Garden, Ibadan, Oyo',
  'Apete, Ibadan, Oyo',
  'Awotan, Ibadan, Oyo',
  'Ologuneru, Ibadan, Oyo',
  'Eleyele, Ibadan, Oyo',
  'Moniya, Ibadan, Oyo',
  'Akinyele, Ibadan, Oyo',
  
  // Oyo State - Other Cities
  'Ogbomoso, Oyo',
  'Oyo Town, Oyo',
  'Iseyin, Oyo',
  'Saki, Oyo',
  'Igbo Ora, Oyo',
  'Eruwa, Oyo',
  'Igboho, Oyo',
  'Kishi, Oyo',
  'Lalupon, Oyo',
  'Oke Ogun, Oyo',
  'Fiditi, Oyo',
  'Lanlate, Oyo'
];

export function PostDeliveryScreen({ onBack, onSubmit, onLocationSelect, userId, onNavigateToMyDeliveries, onChooseFavoritePal }: PostDeliveryScreenProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<{
    title: string;
    pickupLocation: string;
    dropoffLocation: string;
    itemSize: ItemSize | '';
    category: string;
    value: string;
    pickupDate: string;
    pickupTime: string;
    notes: string;
    receiverName: string;
    receiverPhone: string;
    weight: string;
  }>({
    title: '',
    pickupLocation: '',
    dropoffLocation: '',
    itemSize: '',
    category: '',
    value: '',
    pickupDate: '',
    pickupTime: '',
    notes: '',
    receiverName: '',
    receiverPhone: '',
    weight: ''
  });
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdJob, setCreatedJob] = useState<DeliveryJob | null>(null);
  const [scanCompleted, setScanCompleted] = useState(false);
  const [scanData, setScanData] = useState<ScanData | null>(null);
  const [showAIScanner, setShowAIScanner] = useState(false);
  
  // Autocomplete states
  const [pickupQuery, setPickupQuery] = useState('');
  const [dropoffQuery, setDropoffQuery] = useState('');
  const [pickupSuggestions, setPickupSuggestions] = useState<string[]>([]);
  const [dropoffSuggestions, setDropoffSuggestions] = useState<string[]>([]);
  const [showPickupDropdown, setShowPickupDropdown] = useState(false);
  const [showDropoffDropdown, setShowDropoffDropdown] = useState(false);
  
  const pickupRef = useRef<HTMLDivElement>(null);
  const dropoffRef = useRef<HTMLDivElement>(null);
  
  // Click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickupRef.current && !pickupRef.current.contains(event.target as Node)) {
        setShowPickupDropdown(false);
      }
      if (dropoffRef.current && !dropoffRef.current.contains(event.target as Node)) {
        setShowDropoffDropdown(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const totalSteps = 3;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          setImages(prev => [...prev, result]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isFormValid()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Generate a random 6-digit order number
    const generateOrderNumber = () => {
      return 'ORD' + Math.floor(100000 + Math.random() * 900000).toString();
    };

    const newJob: DeliveryJob = {
      id: Date.now().toString(),
      orderNumber: generateOrderNumber(),
      senderId: userId,
      senderName: 'John Doe',
      receiverName: formData.receiverName,
      receiverPhone: formData.receiverPhone,
      title: formData.title,
      pickupLocation: formData.pickupLocation,
      dropoffLocation: formData.dropoffLocation,
      itemSize: formData.itemSize as ItemSize,
      pickupTime: formData.pickupTime || new Date().toISOString(), // Use provided time or current time if not specified
      category: formData.category,
      itemColor: scanData?.color,
      weight: scanData?.estimatedWeight || formData.weight,
      value: parseFloat(formData.value) || 0,
      pickupDate: formData.pickupDate,
      notes: formData.notes,
      images: images,
      status: 'pending',
      bids: [],
      isLive: true,
      createdAt: new Date().toISOString(),
      itemScanData: scanData ? {
        itemName: scanData.itemName || formData.title,
        category: scanData.category || formData.category,
        size: scanData.size || formData.itemSize,
        estimatedWeight: scanData.estimatedWeight,
        color: scanData.color,
        confidence: scanData.confidence || 0,
        timestamp: scanData.timestamp || new Date().toISOString(),
        scannedBy: userId,
        scanType: 'sender_verification' as const,
        images: scanData.images || images,
        cameraUsed: scanData.cameraUsed || false,
        detectionDetails: scanData.detectionDetails
      } : undefined
    };
    
    setTimeout(() => {
      setIsSubmitting(false);
      setCreatedJob(newJob);
      // Navigate to processing page via parent component
      onSubmit(newJob);
    }, 1000);
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Handle pickup location input
  const handlePickupInput = (value: string) => {
    setPickupQuery(value);
    updateFormData('pickupLocation', value);
    
    if (value.trim().length > 0) {
      const filtered = LAGOS_OYO_LOCATIONS.filter(location =>
        location.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 8); // Show max 8 suggestions
      setPickupSuggestions(filtered);
      setShowPickupDropdown(true);
    } else {
      setPickupSuggestions([]);
      setShowPickupDropdown(false);
    }
  };

  // Handle delivery location input
  const handleDropoffInput = (value: string) => {
    setDropoffQuery(value);
    updateFormData('dropoffLocation', value);
    
    if (value.trim().length > 0) {
      const filtered = LAGOS_OYO_LOCATIONS.filter(location =>
        location.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 8); // Show max 8 suggestions
      setDropoffSuggestions(filtered);
      setShowDropoffDropdown(true);
    } else {
      setDropoffSuggestions([]);
      setShowDropoffDropdown(false);
    }
  };

  // Select pickup suggestion
  const selectPickupSuggestion = (location: string) => {
    setPickupQuery(location);
    updateFormData('pickupLocation', location);
    setShowPickupDropdown(false);
    setPickupSuggestions([]);
  };

  // Select delivery suggestion
  const selectDropoffSuggestion = (location: string) => {
    setDropoffQuery(location);
    updateFormData('dropoffLocation', location);
    setShowDropoffDropdown(false);
    setDropoffSuggestions([]);
  };

  const isFormValid = () => {
    return formData.title && 
           formData.pickupLocation && 
           formData.dropoffLocation && 
           formData.receiverName &&
           formData.receiverPhone &&
           formData.itemSize && 
           formData.category &&
           formData.value && 
           formData.pickupDate &&
           scanCompleted;
  };

  const isCurrentStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.title && 
               formData.itemSize && 
               formData.category &&
               formData.value &&
               scanCompleted;
      case 2:
        return formData.pickupLocation && formData.dropoffLocation && formData.pickupDate;
      case 3:
        return formData.receiverName && formData.receiverPhone;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (!isCurrentStepValid()) return;
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return 'Item Details';
      case 2: return 'Pickup & Delivery';
      case 3: return 'Receiver & Additional Info';
      default: return 'Post Delivery';
    }
  };

  const getStepIcon = () => {
    switch (currentStep) {
      case 1: return <Package size={20} />;
      case 2: return <MapPin size={20} />;
      case 3: return <User size={20} />;
      default: return <Package size={20} />;
    }
  };


  const handleChooseFavoritePal = () => {
    if (!isFormValid()) return;
    
    const jobData = {
      title: formData.title,
      pickupLocation: formData.pickupLocation,
      dropoffLocation: formData.dropoffLocation,
      receiverName: formData.receiverName,
      receiverPhone: formData.receiverPhone,
      itemSize: formData.itemSize,
      weight: formData.weight,
      value: parseFloat(formData.value) || 0,
      pickupDate: formData.pickupDate,
      pickupTime: formData.pickupTime,
      notes: formData.notes,
      images: images,
      userId: userId
    };
    
    onChooseFavoritePal(jobData);
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex flex-col">
      {/* Dark Header */}
      <motion.div 
        className="bg-gradient-to-r from-[#2f2f2f] to-[#1a1a1a] border-b border-white/10 sticky top-0 z-20 shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="px-6 py-4">
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center space-x-2">
              {getStepIcon()}
              <h1 className="font-semibold text-white">{getStepTitle()}</h1>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((step) => (
              <React.Fragment key={step}>
                <div className="flex flex-col items-center">
                  <motion.div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold transition-all ${step < currentStep
                        ? 'bg-green-500 text-white'
                        : step === currentStep
                          ? 'bg-[#f44708] text-white'
                          : 'bg-white/20 text-gray-400'
                      }`}
                    animate={step === currentStep ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    {step < currentStep ? <CheckCircle size={16} /> : step}
                  </motion.div>
                  <span className={`text-xs mt-1 ${step === currentStep ? 'text-white font-medium' : 'text-gray-400'
                    }`}>
                    Step {step}
                  </span>
                </div>
                {step < 3 && (
                  <div className={`h-1 flex-1 mx-2 rounded-full ${step < currentStep ? 'bg-green-500' : 'bg-white/20'
                    }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </motion.div>

      {/* White Content Area - Form */}
      <div className="flex-1 overflow-y-auto">
        <form onSubmit={handleSubmit} className="w-full p-4 sm:p-6 lg:p-8">
          <motion.div
            className="bg-white rounded-2xl shadow-lg border border-gray-200 space-y-6 w-full p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* Step 1: Item Details */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="title" className="text-sm font-medium text-gray-700">Item Name <span className="text-red-500">*</span></Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => updateFormData('title', e.target.value)}
                    placeholder="e.g., iPhone 15 Pro, Birthday Cake, Designer Shoes"
                    className="mt-2 rounded-xl h-12 border-gray-300 focus:border-[#f44708]"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="itemSize" className="text-sm font-medium text-gray-700">
                      Package Size <span className="text-red-500">*</span>
                    </Label>
                    <Select value={formData.itemSize} onValueChange={(value) => updateFormData('itemSize', value)}>
                      <SelectTrigger className="mt-2 rounded-xl h-12 border-gray-300">
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent className="bg-white/95 backdrop-blur-xl border border-gray-200 shadow-2xl rounded-xl z-50">
                        <SelectItem value="Small" className="hover:bg-gray-100/80 backdrop-blur-sm">
                          Small (Fits in pocket)
                        </SelectItem>
                        <SelectItem value="Medium" className="hover:bg-gray-100/80 backdrop-blur-sm">
                          Medium (Shoebox size)
                        </SelectItem>
                        <SelectItem value="Large" className="hover:bg-gray-100/80 backdrop-blur-sm">
                          Large (Suitcase size)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="category" className="text-sm font-medium text-gray-700">
                      Category <span className="text-red-500">*</span>
                    </Label>
                    <Select value={formData.category} onValueChange={(value) => updateFormData('category', value)}>
                      <SelectTrigger className="mt-2 rounded-xl h-12 border-gray-300">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent className="max-h-[300px] bg-white/95 backdrop-blur-xl border border-gray-200 shadow-2xl rounded-xl z-50">
                        <SelectItem value="electronics" className="hover:bg-gray-100/80 backdrop-blur-sm">
                          Electronics
                        </SelectItem>
                        <SelectItem value="food" className="hover:bg-gray-100/80 backdrop-blur-sm">
                          Food & Groceries
                        </SelectItem>
                        <SelectItem value="documents" className="hover:bg-gray-100/80 backdrop-blur-sm">
                          Documents
                        </SelectItem>
                        <SelectItem value="clothing" className="hover:bg-gray-100/80 backdrop-blur-sm">
                          Clothing & Fashion
                        </SelectItem>
                        <SelectItem value="jewelry" className="hover:bg-gray-100/80 backdrop-blur-sm">
                          Jewelry & Accessories
                        </SelectItem>
                        <SelectItem value="medical" className="hover:bg-gray-100/80 backdrop-blur-sm">
                          Medical Supplies
                        </SelectItem>
                        <SelectItem value="fragile" className="hover:bg-gray-100/80 backdrop-blur-sm">
                          Fragile Items
                        </SelectItem>
                        <SelectItem value="other" className="hover:bg-gray-100/80 backdrop-blur-sm">
                          Other
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="value" className="text-sm font-medium text-gray-700">Item Value (₦) <span className="text-red-500">*</span></Label>
                  <Input
                    id="value"
                    type="number"
                    value={formData.value}
                    onChange={(e) => updateFormData('value', e.target.value)}
                    placeholder="e.g. 350000 (for iPhone), 25000 (for cake)"
                    className="mt-2 rounded-xl h-12 border-gray-300 focus:border-[#f44708]"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    This helps Pals understand the responsibility and sets collateral amount
                  </p>
                </div>

                {/* AI Item Scanner */}
                <div>
                  <Label className="text-sm font-medium text-gray-700">Item Verification Scan <span className="text-red-500">*</span></Label>
                  <div className="mt-2">
                    {!scanCompleted ? (
                      <motion.div 
                        className="border-2 border-dashed border-blue-300 bg-blue-50 rounded-2xl p-8 text-center"
                        whileHover={{ scale: 1.01 }}
                      >
                        <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                          <Camera size={32} className="text-white" />
                        </div>
                        <h4 className="text-lg font-semibold text-blue-900 mb-2">
                          Scan Your Item with AI Camera
                        </h4>
                        <p className="text-sm text-blue-700 mb-6 max-w-md mx-auto">
                          Our AI will scan and verify your item&apos;s unique features. This ensures your Pal picks up exactly what you
                          &pos;re sending.
                        </p>
                        <motion.button
                          type="button"
                          onClick={() => setShowAIScanner(true)}
                          className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium shadow-lg transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Camera size={18} className="mr-2" />
                          Start AI Scan
                        </motion.button>
                        <p className="text-xs text-blue-600 mt-4">
                          ✓ Secure • ✓ AI-powered • ✓ Verified by Pal during pickup
                        </p>
                      </motion.div>
                    ) : (
                      <motion.div 
                        className="border-2 border-green-300 bg-green-50 rounded-2xl p-6"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                      >
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                            <CheckCircle size={24} className="text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-green-900">Item Scan Completed ✓</h4>
                            <p className="text-sm text-green-700">Your item has been verified and secured with AI</p>
                          </div>
                        </div>

                        {scanData && (
                          <div className="bg-white rounded-xl p-4 space-y-3">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <span className="text-xs text-gray-600 font-medium">Detected Item:</span>
                                <p className="text-sm text-gray-900 font-semibold">{scanData.itemName || formData.title}</p>
                              </div>
                              <div>
                                <span className="text-xs text-gray-600 font-medium">AI Confidence:</span>
                                <p className="font-bold text-green-600">{scanData.confidence}%</p>
                              </div>
                              <div>
                                <span className="text-xs text-gray-600 font-medium">Category:</span>
                                <p className="text-sm text-gray-900">{scanData.category || formData.category}</p>
                              </div>
                              <div>
                                <span className="text-xs text-gray-600 font-medium">Size:</span>
                                <p className="text-sm text-gray-900">{scanData.size || formData.itemSize}</p>
                              </div>
                              {scanData.color && (
                                <div>
                                  <span className="text-xs text-gray-600 font-medium">Color:</span>
                                  <p className="text-sm text-gray-900">{scanData.color}</p>
                                </div>
                              )}
                              {scanData.estimatedWeight && (
                                <div>
                                  <span className="text-xs text-gray-600 font-medium">Est. Weight:</span>
                                  <p className="text-sm text-gray-900">{scanData.estimatedWeight}</p>
                                </div>
                              )}
                            </div>
                            
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-3">
                              <div className="flex items-start space-x-2">
                                <Sparkles size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
                                <p className="text-xs text-blue-800">
                                  <strong>Verification Ready:</strong> Your Pal will scan this item during pickup to confirm it matches these details.
                                </p>
                              </div>
                            </div>

                            <motion.button
                              type="button"
                              onClick={() => {
                                setScanCompleted(false);
                                setScanData(null);
                                setImages([]);
                              }}
                              className="w-full mt-2 py-2 text-sm text-blue-600 hover:text-blue-800 font-medium hover:bg-blue-50 rounded-lg transition-colors"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              🔄 Rescan Item
                            </motion.button>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Pickup & Delivery */}
            {currentStep === 2 && (
              <div className="space-y-6">
                {/* Pickup Location with Autocomplete */}
                <div className="relative" ref={pickupRef}>
                  <Label className="text-sm font-medium text-gray-700">Pickup Location <span className="text-red-500">*</span></Label>
                  <div className="relative mt-2">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <MapPin size={20} className="text-[#f44708]" />
                    </div>
                    <Input
                      type="text"
                      value={pickupQuery}
                      onChange={(e) => handlePickupInput(e.target.value)}
                      onFocus={() => {
                        if (pickupQuery.trim() && pickupSuggestions.length > 0) {
                          setShowPickupDropdown(true);
                        }
                      }}
                      placeholder="e.g., Victoria Island, Ikeja, Bodija Ibadan"
                      className="pl-12 pr-4 h-12 rounded-xl border-gray-300 focus:border-[#f44708]"
                      required
                    />
                  </div>
                  
                  {/* Pickup Suggestions Dropdown */}
                  <AnimatePresence>
                    {showPickupDropdown && pickupSuggestions.length > 0 && (
                      <motion.div
                        className="absolute z-50 w-full mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-xl max-h-64 overflow-y-auto"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        {pickupSuggestions.map((location, index) => (
                          <motion.button
                            key={index}
                            type="button"
                            onClick={() => selectPickupSuggestion(location)}
                            className="w-full px-4 py-3 text-left hover:bg-orange-50 flex items-center space-x-3 border-b border-gray-100 last:border-b-0 transition-colors"
                            whileHover={{ backgroundColor: 'rgba(244, 71, 8, 0.1)' }}
                          >
                            <MapPin size={16} className="text-[#f44708] flex-shrink-0" />
                            <span className="text-gray-900 text-sm">{location}</span>
                          </motion.button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Delivery Location with Autocomplete */}
                <div className="relative" ref={dropoffRef}>
                  <Label className="text-sm font-medium text-gray-700">Delivery Location <span className="text-red-500">*</span></Label>
                  <div className="relative mt-2">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <MapPin size={20} className="text-[#f44708]" />
                    </div>
                    <Input
                      type="text"
                      value={dropoffQuery}
                      onChange={(e) => handleDropoffInput(e.target.value)}
                      onFocus={() => {
                        if (dropoffQuery.trim() && dropoffSuggestions.length > 0) {
                          setShowDropoffDropdown(true);
                        }
                      }}
                      placeholder="e.g., Lekki, Surulere, Ogbomoso"
                      className="pl-12 pr-4 h-12 rounded-xl border-gray-300 focus:border-[#f44708]"
                      required
                    />
                  </div>
                  
                  {/* Delivery Suggestions Dropdown */}
                  <AnimatePresence>
                    {showDropoffDropdown && dropoffSuggestions.length > 0 && (
                      <motion.div
                        className="absolute z-50 w-full mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-xl max-h-64 overflow-y-auto"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        {dropoffSuggestions.map((location, index) => (
                          <motion.button
                            key={index}
                            type="button"
                            onClick={() => selectDropoffSuggestion(location)}
                            className="w-full px-4 py-3 text-left hover:bg-orange-50 flex items-center space-x-3 border-b border-gray-100 last:border-b-0 transition-colors"
                            whileHover={{ backgroundColor: 'rgba(244, 71, 8, 0.1)' }}
                          >
                            <MapPin size={16} className="text-[#f44708] flex-shrink-0" />
                            <span className="text-gray-900 text-sm">{location}</span>
                          </motion.button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="pickupDate" className="text-sm font-medium text-gray-700">Pickup Date <span className="text-red-500">*</span></Label>
                    <Input
                      id="pickupDate"
                      type="date"
                      value={formData.pickupDate}
                      onChange={(e) => updateFormData('pickupDate', e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="mt-2 rounded-xl h-12 border-gray-300 focus:border-[#f44708]"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="pickupTime" className="text-sm font-medium text-gray-700">Pickup Time (Optional)</Label>
                    <Input
                      id="pickupTime"
                      type="time"
                      value={formData.pickupTime}
                      onChange={(e) => updateFormData('pickupTime', e.target.value)}
                      className="mt-2 rounded-xl h-12 border-gray-300 focus:border-[#f44708]"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="notes" className="text-sm font-medium text-gray-700">Special Instructions (Optional)</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => updateFormData('notes', e.target.value)}
                    placeholder="e.g., Handle with care, Fragile, Call when arriving, etc."
                    className="mt-2 rounded-xl border-gray-300 focus:border-[#f44708] min-h-[100px]"
                    rows={4}
                  />
                </div>
              </div>
            )}

            {/* Step 3: Receiver Information */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="receiverName" className="text-sm font-medium text-gray-700">Receiver Name <span className="text-red-500">*</span></Label>
                  <Input
                    id="receiverName"
                    value={formData.receiverName}
                    onChange={(e) => updateFormData('receiverName', e.target.value)}
                    placeholder="Full name of receiver"
                    className="mt-2 rounded-xl h-12 border-gray-300 focus:border-[#f44708]"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="receiverPhone" className="text-sm font-medium text-gray-700">Receiver Phone <span className="text-red-500">*</span></Label>
                  <Input
                    id="receiverPhone"
                    type="tel"
                    value={formData.receiverPhone}
                    onChange={(e) => updateFormData('receiverPhone', e.target.value)}
                    placeholder="+234 801 234 5678"
                    className="mt-2 rounded-xl h-12 border-gray-300 focus:border-[#f44708]"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    This number will receive the verification code for package handover
                  </p>
                </div>

                {/* Payment Explanation */}
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-orange-200 rounded-2xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <span>How Payment Works</span>
                    <span className="ml-2 px-2 py-0.5 bg-[#f44708] text-white text-xs rounded-full">Secure Escrow</span>
                  </h4>
                  
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-7 h-7 bg-[#f44708] text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                        1
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">Payment Debited When You Accept a Bid</p>
                        <p className="text-xs text-gray-600 mt-1">
                          Once you accept a Pal&apos;s bid, the agreed amount will be charged immediately.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="w-7 h-7 bg-[#f44708] text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                        2
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">Money Held Safely in Escrow</p>
                        <p className="text-xs text-gray-600 mt-1">
                          Your payment is securely held throughout the delivery process. Your money is protected.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="w-7 h-7 bg-green-500 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                        3
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">Pal Paid After Successful Delivery</p>
                        <p className="text-xs text-gray-600 mt-1">
                          The Pal only receives payment after you or your receiver confirms successful delivery.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-white rounded-xl border border-orange-300">
                    <div className="flex items-center space-x-2">
                      <CheckCircle size={16} className="text-green-600" />
                      <p className="text-xs font-medium text-gray-700">
                        100% Secure • Your money is protected until delivery is confirmed
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </form>
      </div>

      {/* Bottom Navigation - White Background */}
      <div className="bg-white border-t border-gray-200 p-6 shadow-lg">
        <div className="max-w-3xl mx-auto">
          {currentStep < totalSteps ? (
            <div className="flex gap-4">
              {currentStep > 1 && (
                <motion.button
                  type="button"
                  onClick={handlePrevious}
                  className="flex-1 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl h-14 font-medium flex items-center justify-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ArrowLeft size={20} className="mr-2" />
                  Previous
                </motion.button>
              )}
              
              <motion.button
                type="button"
                onClick={handleNext}
                disabled={!isCurrentStepValid()}
                className={`${currentStep === 1 ? 'w-full' : 'flex-1'} bg-[#2f2f2f] hover:bg-[#1a1a1a] text-white rounded-xl h-14 font-semibold flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-all mb-10`}
                whileHover={isCurrentStepValid() ? { scale: 1.02 } : {}}
                whileTap={isCurrentStepValid() ? { scale: 0.98 } : {}}
              >
                Next
                <ArrowRight size={20} className="ml-2" />
              </motion.button>
            </div>
          ) : (
            <>
              <div className="flex gap-4 mb-4">
                <motion.button
                  type="button"
                  onClick={handlePrevious}
                  className="flex-1 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl h-14 font-medium flex items-center justify-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ArrowLeft size={20} className="mr-2" />
                  Previous
                </motion.button>
                
                <motion.button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!isFormValid() || isSubmitting}
                  className="flex-1 bg-[#2f2f2f] hover:bg-[#1a1a1a] text-white rounded-xl h-14 font-semibold flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  whileHover={isFormValid() && !isSubmitting ? { scale: 1.02 } : {}}
                  whileTap={isFormValid() && !isSubmitting ? { scale: 0.98 } : {}}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                      Posting Job...
                    </>
                  ) : (
                    <>
                      Find Delivery Agents
                      <ArrowRight size={20} className="ml-2" />
                    </>
                  )}
                </motion.button>
              </div>

              <div className="flex items-center my-4">
                <div className="flex-1 h-px bg-gray-300"></div>
                <span className="text-gray-500 text-sm font-medium px-4">OR</span>
                <div className="flex-1 h-px bg-gray-300"></div>
              </div>

              <div className="text-center">
                <motion.button
                  type="button"
                  onClick={handleChooseFavoritePal}
                  disabled={!isFormValid() || isSubmitting}
                  className="text-[#f44708] hover:text-[#ff5722] underline font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  choose delivery person you know
                </motion.button>
              </div>
            </>
          )}
          
          {!isCurrentStepValid() && (
            <p className="text-gray-500 text-xs text-center mt-4">
              {currentStep === 1 
                ? 'Please scan your item and fill in all required fields (*)'
                : 'Please fill in all required fields (*) for this step'}
            </p>
          )}
        </div>
      </div>


      {/* AI Scanner Modal */}
      <AnimatePresence>
        {showAIScanner && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex flex-col"
          >
            <div className="flex items-center justify-between p-4 bg-[#2f2f2f] border-b border-white/10">
              <h2 className="text-white font-semibold">AI Item Scanner</h2>
              <motion.button
                onClick={() => setShowAIScanner(false)}
                className="p-2 hover:bg-white/10 rounded-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={24} className="text-white" />
              </motion.button>
            </div>
            <div className="flex-1">
              <AIItemScanner
                onScanComplete={(scanResult) => {
                  // Store comprehensive scan data for later verification
                  const enhancedScanData = {
                    ...scanResult,
                    itemName: scanResult.itemName || formData.title,
                    category: scanResult.category || formData.category,
                    size: scanResult.size || formData.itemSize,
                    estimatedWeight: scanResult.estimatedWeight,
                    color: scanResult.color,
                    confidence: scanResult.confidence,
                    timestamp: new Date().toISOString(),
                    scannedBy: userId,
                    scanType: 'sender_verification'
                  };
                  
                  setScanData(enhancedScanData);
                  setScanCompleted(true);
                  setShowAIScanner(false);
                  
                  // Store images if available
                  if (scanResult.images && scanResult.images.length > 0) {
                    setImages(scanResult.images);
                  }
                }}
                onCancel={() => setShowAIScanner(false)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
