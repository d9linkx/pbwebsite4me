// 'use client'
// import React, { useState } from 'react';
// import { ArrowLeft, Search, Phone, User, Heart, CheckCircle, AlertCircle } from 'lucide-react';
// import { Button } from './ui/button';
// import { Input } from './ui/input';
// import { Card } from './ui/card';
// import { Label } from './ui/label';
// import { User as Pal, DeliveryJob, FavoritePalData } from '../types';

// interface FavoritePalInputScreenProps {
//   onBack: () => void;
//   onPalFound: (palData: FavoritePalData, jobData: DeliveryJob) => void;
//   jobData: DeliveryJob | null;
// }

// export function FavoritePalInputScreen({ onBack, onPalFound, jobData }: FavoritePalInputScreenProps) {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [isSearching, setIsSearching] = useState(false);
//   const [searchResult, setSearchResult] = useState<FavoritePalData | null>(null);
//   const [error, setError] = useState('');

//   // Mock Pal database for demonstration
//   const mockPals = [
//     {
//       id: 'PAL001',
//       name: 'Mike Johnson',
//       phone: '+234-802-123-4567',
//       rating: 4.9,
//       completedDeliveries: 342,
//       vehicleType: 'Motorcycle',
//       isVerified: true,
//       location: 'Lagos Island',
//       profileImage: null
//     },
//     {
//       id: 'PAL002',
//       name: 'Sarah Williams',
//       phone: '+234-803-567-8901',
//       rating: 4.8,
//       completedDeliveries: 189,
//       vehicleType: 'Car',
//       isVerified: true,
//       location: 'Victoria Island',
//       profileImage: null
//     },
//     {
//       id: 'PAL003',
//       name: 'David Okafor',
//       phone: '+234-804-234-5678',
//       rating: 4.7,
//       completedDeliveries: 276,
//       vehicleType: 'Bicycle',
//       isVerified: true,
//       location: 'Ikeja',
//       profileImage: null
//     }
//   ];

//   const handleSearch = () => {
//     if (!searchQuery.trim()) {
//       setError('Please enter a Pal ID or phone number');
//       return;
//     }

//     setIsSearching(true);
//     setError('');
//     setSearchResult(null);

//     // Simulate API search
//     setTimeout(() => {
//       const foundPal = mockPals.find(pal => 
//         pal.id.toLowerCase() === searchQuery.toLowerCase() || 
//         pal.phone.replace(/\D/g, '').includes(searchQuery.replace(/\D/g, '')) ||
//         searchQuery.replace(/\D/g, '').includes(pal.phone.replace(/\D/g, ''))
//       );

//       setIsSearching(false);

//       if (foundPal) {
//         setSearchResult(foundPal);
//         setError('');
//       } else {
//         setError('Pal not found. Please check the ID or phone number and try again.');
//         setSearchResult(null);
//       }
//     }, 1500);
//   };

//   const handleProceed = () => {
//     if (searchResult) {
//       console.log('🚀 Proceeding with Pal:', searchResult.name);
//       onPalFound(searchResult, jobData);
//     }
//   };

//   const formatAmount = (amount: number) => {
//     return new Intl.NumberFormat('en-NG', {
//       style: 'currency',
//       currency: 'NGN',
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 0,
//     }).format(amount);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
//       {/* Header */}
//       <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 z-10">
//         <div className="flex items-center justify-between p-6">
//           <div className="flex items-center space-x-4">
//             <button
//               onClick={onBack}
//               className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
//             >
//               <ArrowLeft size={20} className="text-prawnbox-primary" />
//             </button>
//             <div>
//               <h1 className="text-xl font-bold text-prawnbox-primary">Choose Favourite Pal</h1>
//               <p className="text-sm text-prawnbox-text-light">Enter Pal ID or phone number</p>
//             </div>
//           </div>
          
//           <div className="flex items-center space-x-2">
//             <Heart size={20} className="text-prawnbox-accent" />
//             <span className="text-sm font-medium text-prawnbox-accent">Trusted Delivery</span>
//           </div>
//         </div>
//       </div>

//       <div className="p-6 max-w-md mx-auto">
//         {/* Delivery Summary */}
//         <Card className="p-6 mb-6 border-0 shadow-lg rounded-2xl">
//           <h3 className="font-bold text-prawnbox-primary mb-4">Your Delivery</h3>
//           <div className="space-y-3">
//             <div className="flex justify-between">
//               <span className="text-sm text-prawnbox-text-light">Item:</span>
//               <span className="text-sm font-semibold text-prawnbox-primary">{jobData?.title}</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="text-sm text-prawnbox-text-light">From:</span>
//               <span className="text-sm font-semibold text-prawnbox-primary">{jobData?.pickupLocation}</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="text-sm text-prawnbox-text-light">To:</span>
//               <span className="text-sm font-semibold text-prawnbox-primary">{jobData?.dropoffLocation}</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="text-sm text-prawnbox-text-light">Value:</span>
//               <span className="text-sm font-semibold text-prawnbox-primary">{formatAmount(jobData?.value || 0)}</span>
//             </div>
//           </div>
//         </Card>

//         {/* Search Section */}
//         <Card className="p-6 mb-6 border-0 shadow-lg rounded-2xl">
//           <h3 className="font-bold text-prawnbox-primary mb-4">Find Your Pal</h3>
          
//           <div className="space-y-4">
//             <div>
//               <Label htmlFor="search" className="text-sm font-medium text-prawnbox-primary">
//                 Pal ID or Phone Number
//               </Label>
//               <div className="flex space-x-3 mt-2">
//                 <Input
//                   id="search"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   placeholder="PAL001 or +234-802-123-4567"
//                   className="flex-1 rounded-xl h-12 border-gray-200 focus:border-prawnbox-accent"
//                   onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
//                 />
//                 <Button
//                   onClick={handleSearch}
//                   disabled={isSearching || !searchQuery.trim()}
//                   className="bg-prawnbox-accent hover:bg-prawnbox-accent-light text-white rounded-xl px-6 h-12"
//                 >
//                   {isSearching ? (
//                     <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
//                   ) : (
//                     <Search size={18} />
//                   )}
//                 </Button>
//               </div>
//             </div>

//             {/* Error Message */}
//             {error && (
//               <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-xl">
//                 <AlertCircle size={16} className="text-red-600 flex-shrink-0" />
//                 <p className="text-sm text-red-700">{error}</p>
//               </div>
//             )}

//             {/* Search Result */}
//             {searchResult && (
//               <div className="border-2 border-green-200 bg-green-50 rounded-xl p-4">
//                 <div className="flex items-center space-x-2 mb-3">
//                   <CheckCircle size={16} className="text-green-600" />
//                   <span className="text-sm font-medium text-green-800">Pal Found!</span>
//                 </div>
                
//                 <div className="flex items-start space-x-4">
//                   <div className="w-12 h-12 rounded-full bg-prawnbox-accent/10 border-2 border-prawnbox-accent/20 flex items-center justify-center flex-shrink-0">
//                     {searchResult.profileImage ? (
//                       <img 
//                         src={searchResult.profileImage} 
//                         alt={searchResult.name}
//                         className="w-full h-full rounded-full object-cover"
//                       />
//                     ) : (
//                       <User size={20} className="text-prawnbox-accent" />
//                     )}
//                   </div>
                  
//                   <div className="flex-1">
//                     <div className="flex items-center space-x-2 mb-1">
//                       <h4 className="font-bold text-prawnbox-primary">{searchResult.name}</h4>
//                       {searchResult.isVerified && (
//                         <CheckCircle size={14} className="text-green-600" />
//                       )}
//                     </div>
                    
//                     <div className="space-y-1 text-sm">
//                       <div className="flex items-center space-x-2">
//                         <Phone size={12} className="text-prawnbox-text-light" />
//                         <span className="text-prawnbox-text-light">{searchResult.phone}</span>
//                       </div>
//                       <div className="flex items-center space-x-4">
//                         <div className="flex items-center space-x-1">
//                           <span className="text-yellow-500">⭐</span>
//                           <span className="font-medium text-prawnbox-primary">{searchResult.rating}</span>
//                         </div>
//                         <span className="text-prawnbox-text-light">{searchResult.completedDeliveries} deliveries</span>
//                       </div>
//                       <div className="flex items-center space-x-1">
//                         <span className="text-prawnbox-text-light">Vehicle:</span>
//                         <span className="font-medium text-prawnbox-primary">{searchResult.vehicleType}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </Card>

//         {/* Demo Information Section */}
//         <Card className="p-4 border-0 bg-green-50 rounded-xl mb-4">
//           <h4 className="font-medium text-green-800 mb-3">🎮 Demo Mode - Try These Pals</h4>
//           <div className="space-y-3">
//             <div className="bg-white rounded-lg p-3 border border-green-200">
//               <div className="flex items-center justify-between mb-1">
//                 <span className="font-medium text-green-900">Mike Johnson</span>
//                 <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">⭐ 4.9</span>
//               </div>
//               <div className="text-sm text-green-700 space-y-1">
//                 <div>• Pal ID: <span className="font-mono bg-green-100 px-1 rounded">PAL001</span></div>
//                 <div>• Phone: <span className="font-mono bg-green-100 px-1 rounded">+234-802-123-4567</span></div>
//                 <div>• Vehicle: Motorcycle • 342 deliveries</div>
//               </div>
//             </div>
            
//             <div className="bg-white rounded-lg p-3 border border-green-200">
//               <div className="flex items-center justify-between mb-1">
//                 <span className="font-medium text-green-900">Sarah Williams</span>
//                 <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">⭐ 4.8</span>
//               </div>
//               <div className="text-sm text-green-700 space-y-1">
//                 <div>• Pal ID: <span className="font-mono bg-green-100 px-1 rounded">PAL002</span></div>
//                 <div>• Phone: <span className="font-mono bg-green-100 px-1 rounded">+234-803-567-8901</span></div>
//                 <div>• Vehicle: Car • 189 deliveries</div>
//               </div>
//             </div>

//             <div className="bg-white rounded-lg p-3 border border-green-200">
//               <div className="flex items-center justify-between mb-1">
//                 <span className="font-medium text-green-900">David Okafor</span>
//                 <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">⭐ 4.7</span>
//               </div>
//               <div className="text-sm text-green-700 space-y-1">
//                 <div>• Pal ID: <span className="font-mono bg-green-100 px-1 rounded">PAL003</span></div>
//                 <div>• Phone: <span className="font-mono bg-green-100 px-1 rounded">+234-804-234-5678</span></div>
//                 <div>• Vehicle: Bicycle • 276 deliveries</div>
//               </div>
//             </div>
//           </div>
//           <p className="text-xs text-green-600 mt-3 text-center">
//             💡 Copy and paste any Pal ID or phone number above to test the search
//           </p>
//         </Card>

//         {/* Help Section */}
//         <Card className="p-4 border-0 bg-blue-50 rounded-xl mb-6">
//           <h4 className="font-medium text-blue-800 mb-2">How to find your Pal</h4>
//           <ul className="text-sm text-blue-700 space-y-1">
//             <li>• Use the Pal ID (e.g., PAL001) from previous deliveries</li>
//             <li>• Enter their phone number (+234-xxx-xxx-xxxx)</li>
//             <li>• Check your delivery history for trusted Pals</li>
//           </ul>
//         </Card>

//         {/* Proceed Button */}
//         {searchResult && (
//           <Button
//             onClick={handleProceed}
//             className="w-full bg-prawnbox-primary hover:bg-prawnbox-primary/90 text-white rounded-xl h-14 font-medium"
//           >
//             Proceed with {searchResult.name}
//           </Button>
//         )}
//       </div>
//     </div>
//   );
// }