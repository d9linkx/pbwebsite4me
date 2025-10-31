// import { DeliveryJob, User, ProxyItem, ChatThread, ChatMessage, NigerianLocation } from '../types';

// // 🔥 ENHANCED MOCK DATA WITH ACTIVE BIDDING DELIVERIES FOR SENDER TESTING
// export const mockDeliveryJobs: DeliveryJob[] = [
//   // 🔥 DEMO DELIVERIES WITH ACTIVE BIDS - For Sender Demo User (sender-demo)
  
//   // BID DEMO 1: Luxury Watch Collection - Multiple competitive bids
//   {
//     id: 'bid-demo-1',
//     title: 'Luxury Watch Collection',
//     description: 'Premium watch collection including Rolex, Omega, and Tag Heuer timepieces in secure case',
//     pickupLocation: 'Luxury Timepieces Boutique, Victoria Island',
//     dropoffLocation: 'Ikoyi Towers',
//     pickupDate: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
//     value: 8500000,
//     weight: '2kg',
//     itemSize: 'Small',
//     status: 'bidding',
//     senderId: 'sender-demo',
//     senderName: 'Adebayo Ogundimu',
//     senderPhone: '+234 803 123 4567',
//     receiverId: 'receiver-luxury',
//     receiverName: 'Mr. Babatunde Adeleke',
//     receiverPhone: '+234 802 111 2222',
//     escrowAmount: 0,
//     bids: [
//       {
//         id: 'bid-1-1',
//         palId: 'pal-premium-1',
//         palName: 'Michael Chen',
//         palRating: 4.9,
//         estimatedTime: '45 minutes',
//         amount: 25000,
//         message: '⭐ Premium Pal with 200+ high-value deliveries! I specialize in luxury items and have secure transport with GPS tracking. Your watches will be insured and handled with white gloves.',
//         placedAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
//         canEdit: true,
//         vehicleType: 'Car',
//       },
//       {
//         id: 'bid-1-2',
//         palId: 'pal-experienced-1',
//         palName: 'Sarah Williams',
//         palRating: 4.8,
//         vehicleType: 'Car',
//         estimatedTime: '30 minutes',
//         amount: 18500,
//         message: 'Experienced with luxury goods! I have delivered high-value items worth over ₦50M total. Quick pickup and direct delivery - no stops. Temperature-controlled vehicle.',
//         placedAt: new Date(Date.now() - 8 * 60 * 1000).toISOString(),
//         canEdit: true,
//       },
//       {
//         id: 'bid-1-3',
//         palName: 'David Okonkwo',
//         palId: 'pal-competitive-1',
//         palRating: 4.7,
//         vehicleType: 'Car',
//         estimatedTime: '40 minutes',
//         amount: 22000,
//         message: 'Competitive rate with premium service! I have specialized security training and can provide real-time photo updates during transit. Available immediately!',
//         placedAt: new Date(Date.now() - 3 * 60 * 1000).toISOString(),
//         canEdit: true,
//       },
//       {
//         id: 'bid-1-4',
//         palId: 'pal-fast-1',
//         palName: 'James Adeyemi',
//         palRating: 4.6,
//         vehicleType: 'Motorcycle',
//         estimatedTime: '20 minutes',
//         amount: 15000,
//         message: '🚀 Fastest delivery guaranteed! I can beat traffic and deliver in half the time. Secure lockbox on bike for your watches. 150+ luxury deliveries completed.',
//         placedAt: new Date(Date.now() - 1 * 60 * 1000).toISOString(),
//         canEdit: true,
//       }
//     ],
//     createdAt: new Date(Date.now() - 20 * 60 * 1000).toISOString(),
//     notes: 'EXTREMELY HIGH VALUE! Must have insurance and secure transport. Prefer experienced Pal with luxury item delivery history.',
//     isLive: true
//   },

//   // BID DEMO 2: Wedding Cake Delivery - Time-sensitive bids
//   {
//     id: 'bid-demo-2',
//     title: 'Premium 5-Tier Wedding Cake',
//     description: 'Custom-designed 5-tier wedding cake with fresh flowers and intricate sugar work',
//     pickupLocation: 'Divine Cakes Bakery, Lekki Phase 1',
//     dropoffLocation: 'Oriental Hotel, Victoria Island',
//     pickupDate: new Date(Date.now() + 1 * 60 * 60 * 1000).toISOString(),
//     value: 350000,
//     weight: '15kg',
//     itemSize: 'Large',
//     status: 'bidding',
//     senderId: 'sender-demo',
//     senderName: 'Adebayo Ogundimu',
//     senderPhone: '+234 803 123 4567',
//     receiverId: 'receiver-wedding',
//     receiverName: 'Mrs. Blessing Nnamdi',
//     receiverPhone: '+234 809 222 3333',
//     escrowAmount: 0,
//     bids: [
//       {
//         id: 'bid-2-1',
//         palId: 'pal-fragile-specialist',
//         palName: 'Aisha Ibrahim',
//         palRating: 4.9,
//         vehicleType: 'Van',
//         estimatedTime: '35 minutes',
//         amount: 12000,
//         message: '🎂 Cake delivery specialist! I have refrigerated van and special cake carriers. Delivered 80+ wedding cakes with ZERO damage. Your cake will arrive perfect!',
//         placedAt: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
//         canEdit: true,
//       },
//       {
//         id: 'bid-2-2',
//         palId: 'pal-urgent-1',
//         palName: 'Fatima Abdullahi',
//         palRating: 4.7,
//         estimatedTime: '25 minutes',
//         amount: 9500,
//         message: '⏰ URGENT delivery expert! I understand wedding timelines. SUV with smooth suspension for delicate cakes. Available now - can pick up immediately!',
//         placedAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
//         canEdit: true,
//         vehicleType: 'Car',
//       },
//       {
//         id: 'bid-2-3',
//         palId: 'pal-budget-1',
//         palName: 'Emeka Okafor',
//         palRating: 4.5, 
//         vehicleType: 'Car',
//         estimatedTime: '45 minutes',
//         amount: 7000,
//         message: 'Affordable rate with careful handling! I have delivered cakes before and know how to drive smoothly. Budget-friendly option without compromising quality.',
//         placedAt: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
//         canEdit: true
//       }
//     ],
//     createdAt: new Date(Date.now() - 18 * 60 * 1000).toISOString(),
//     notes: 'WEDDING IN 3 HOURS! Cake MUST be kept level and refrigerated. Extremely delicate sugar flowers on top. Please drive very carefully!',
//     isLive: true
//   },

//   // BID DEMO 3: Medical Equipment - Professional bids
//   {
//     id: 'bid-demo-3',
//     title: 'Portable X-Ray Machine',
//     description: 'Professional medical imaging equipment - portable X-ray machine with accessories',
//     pickupLocation: 'MedEquip Supplies, Ikeja',
//     dropoffLocation: 'St. Nicholas Hospital, Lagos Island',
//     pickupDate: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(),
//     value: 1200000,
//     weight: '25kg',
//     itemSize: 'Large',
//     status: 'bidding',
//     senderId: 'sender-demo',
//     senderName: 'Adebayo Ogundimu',
//     senderPhone: '+234 803 123 4567',
//     receiverId: 'receiver-hospital',
//     receiverName: 'Dr. Chidinma Obi',
//     receiverPhone: '+234 813 000 1111',
//     escrowAmount: 0,
//     bids: [
//       {
//         id: 'bid-3-1',
//         palId: 'pal-medical-specialist',
//         palName: 'Ibrahim Mohammed',
//         palRating: 4.8,
//         vehicleType: 'Van',
//         estimatedTime: '50 minutes',
//         amount: 18000,
//         message: '🏥 Medical equipment specialist! I work with 5 hospitals regularly and understand proper handling of delicate medical devices. Insured van with padding.',
//         placedAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
//         canEdit: true,
//       },
//       {
//         id: 'bid-3-2',
//         palId: 'pal-heavy-items',
//         palName: 'Chukwudi Eze',
//         palRating: 4.6,
//         vehicleType: 'Car',
//         estimatedTime: '60 minutes',
//         amount: 15000,
//         message: 'Heavy item expert! I have lift gate and moving equipment. Can handle 25kg easily. Experience with medical and industrial equipment deliveries.',
//         placedAt: new Date(Date.now() - 6 * 60 * 1000).toISOString(),
//         canEdit: true
//       }
//     ],
//     createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
//     notes: 'Professional medical equipment - requires careful handling. Must have vehicle with proper padding/support. Hospital needs it today for emergency procedures.',
//     isLive: true
//   },

//   // BID DEMO 4: Art Piece - Creative competitive bidding
//   {
//     id: 'bid-demo-4',
//     title: 'Contemporary Art Sculpture',
//     description: 'Original bronze sculpture by renowned Nigerian artist - 1.2m tall',
//     pickupLocation: 'Nike Art Gallery, Lekki',
//     dropoffLocation: 'Collector\'s Residence, Banana Island',
//     pickupDate: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
//     value: 2800000,
//     weight: '35kg',
//     itemSize: 'Large',
//     status: 'bidding',
//     senderId: 'sender-demo',
//     senderName: 'Adebayo Ogundimu',
//     senderPhone: '+234 803 123 4567',
//     receiverId: 'receiver-collector',
//     receiverName: 'Chief Adebayo Williams',
//     receiverPhone: '+234 816 666 7777',
//     escrowAmount: 0,
//     bids: [
//       {
//         id: 'bid-4-1',
//         palId: 'pal-art-specialist',
//         palName: 'Ngozi Okafor',
//         palRating: 4.9,
//         vehicleType: 'Van',
//         estimatedTime: '40 minutes',
//         amount: 22000,
//         message: '🎨 Art delivery specialist! I have delivered over 100 pieces for galleries and collectors. Custom van with climate control and padding. Fully insured for high-value art.',
//         placedAt: new Date(Date.now() - 8 * 60 * 1000).toISOString(),
//         canEdit: true
//       },
//       {
//         id: 'bid-4-2',
//         palId: 'pal-premium-2',
//         palName: 'Oluwaseun Adebayo',
//         palRating: 4.7,
//         vehicleType: 'Car',
//         estimatedTime: '35 minutes',
//         amount: 20000,
//         message: 'White glove service for your sculpture! I handle only premium items and can provide white glove installation if needed. Fully insured delivery.',
//         placedAt: new Date(Date.now() - 4 * 60 * 1000).toISOString(),
//         canEdit: true
//       }
//     ],
//     createdAt: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
//     notes: 'PRICELESS ART! Bronze sculpture by Ben Enwonwu - extremely valuable. Must be wrapped professionally and transported vertically. Insurance required.',
//     isLive: true
//   },

//   // Regular jobs for other users
//   {
//     id: '1',
//     title: 'MacBook Pro Delivery',
//     description: 'Brand new MacBook Pro 16-inch in original packaging',
//     pickupLocation: 'Computer Village, Ikeja',
//     dropoffLocation: 'Victoria Island',
//     pickupDate: new Date().toISOString(),
//     deliveredAt: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
//     value: 2500000,
//     weight: '2.5kg',
//     itemSize: 'Small',
//     status: 'pending',
//     senderId: 'sender-1',
//     senderName: 'Adebayo Ogundimu',
//     senderPhone: '+234 803 123 4567',
//     receiverId: 'receiver-1',
//     receiverName: 'Chinyere Okwu',
//     receiverPhone: '+234 805 987 6543',
//     escrowAmount: 2500000,
//     bids: [],
//     createdAt: new Date().toISOString(),
//     notes: 'Handle with extreme care. Original packaging must remain intact.'
//   },

//   // 🔥 EXACT 6 ACTIVE DELIVERIES FOR PAL TESTING - Assigned to Kemi Ajayi (pal-1)
  
//   // ID '2': Wedding Dress Package (assigned - ready for pickup)
//   {
//     id: '2',
//     title: 'Wedding Dress Package',
//     description: 'Custom wedding dress with accessories in protective garment bag',
//     pickupLocation: 'Balogun Market, Lagos Island',
//     dropoffLocation: 'Lekki Phase 1',
//     pickupDate: new Date().toISOString(),
//     deliveredAt: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
//     value: 450000,
//     weight: '3kg',
//     itemSize: 'Medium',
//     status: 'assigned',
//     senderId: 'sender-2',
//     senderName: 'Folake Adebayo',
//     senderPhone: '+234 806 234 5678',
//     receiverId: 'receiver-2',
//     receiverName: 'Blessing Uche',
//     receiverPhone: '+234 807 345 6789',
//     selectedPalId: 'pal-1', // 🔥 Assigned to Kemi Ajayi
//     selectedPalName: 'Kemi Ajayi',
//     acceptedBidAmount: 8500,
//     escrowAmount: 450000,
//     bids: [],
//     createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
//     notes: 'Very delicate item. Must be kept flat and protected from moisture. Wedding is tomorrow!'
//   },

//   // ID '3': Medical Documents (picked-up - ready to deliver)
//   {
//     id: '3',
//     title: 'Medical Documents',
//     description: 'Confidential medical records and test results in sealed envelope',
//     pickupLocation: 'Lagos University Teaching Hospital, Idi-Araba',
//     dropoffLocation: 'Surulere Medical Center',
//     pickupDate: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
//     deliveredAt: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
//     value: 25000,
//     weight: '0.5kg',
//     itemSize: 'Small',
//     status: 'picked-up',
//     senderId: 'sender-3',
//     senderName: 'Dr. Emeka Nwankwo',
//     senderPhone: '+234 808 456 7890',
//     receiverId: 'receiver-3',
//     receiverName: 'Mrs. Adunni Okafor',
//     receiverPhone: '+234 809 567 8901',
//     selectedPalId: 'pal-1', // 🔥 Assigned to Kemi Ajayi
//     selectedPalName: 'Kemi Ajayi',
//     acceptedBidAmount: 6500,
//     escrowAmount: 25000,
//     bids: [],
//     createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
//     notes: 'URGENT: Patient waiting for results. Confidential - do not open envelope.'
//   },

//   // ID '4': Anniversary Gift Box (in-transit - ready to complete)
//   {
//     id: '4',
//     title: 'Anniversary Gift Box',
//     description: 'Luxury gift box with jewelry, perfume, and personalized items',
//     pickupLocation: 'Palms Shopping Mall, Lekki',
//     dropoffLocation: 'Banana Island',
//     pickupDate: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
//     deliveredAt: new Date(Date.now() + 1 * 60 * 60 * 1000).toISOString(),
//     value: 350000,
//     weight: '2kg',
//     itemSize: 'Medium',
//     status: 'in-transit',
//     senderId: 'sender-4',
//     senderName: 'Tunde Bakare',
//     senderPhone: '+234 810 678 9012',
//     receiverId: 'receiver-4',
//     receiverName: 'Funmi Bakare',
//     receiverPhone: '+234 811 789 0123',
//     selectedPalId: 'pal-1', // 🔥 Assigned to Kemi Ajayi
//     selectedPalName: 'Kemi Ajayi',
//     acceptedBidAmount: 12000,
//     escrowAmount: 350000,
//     bids: [],
//     createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
//     notes: 'Surprise delivery! Do not reveal contents. Call receiver upon arrival.'
//   },

//   // ID '5': Business Contract Documents (assigned - ready for pickup)
//   {
//     id: '5',
//     title: 'Business Contract Documents',
//     description: 'Important business contracts and legal documents in briefcase',
//     pickupLocation: 'Corporate Office, Ikoyi',
//     dropoffLocation: 'Law Chambers, Victoria Island',
//     pickupDate: new Date().toISOString(),
//     deliveredAt: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
//     value: 150000,
//     weight: '1.5kg',
//     itemSize: 'Small',
//     status: 'assigned',
//     senderId: 'sender-5',
//     senderName: 'Chioma Okafor',
//     senderPhone: '+234 812 890 1234',
//     receiverId: 'receiver-5',
//     receiverName: 'Barrister Ahmed Yusuf',
//     receiverPhone: '+234 813 901 2345',
//     selectedPalId: 'pal-1', // 🔥 Assigned to Kemi Ajayi
//     selectedPalName: 'Kemi Ajayi',
//     acceptedBidAmount: 9500,
//     escrowAmount: 150000,
//     bids: [],
//     createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
//     notes: 'Time-sensitive legal documents. Must be delivered before 5 PM today.'
//   },

//   // ID '6': Custom Birthday Cake (assigned - ready for pickup)
//   {
//     id: '6',
//     title: 'Custom Birthday Cake',
//     description: '3-tier custom birthday cake with special decorations',
//     pickupLocation: 'CakeCity Bakery, Gbagada',
//     dropoffLocation: 'Magodo GRA',
//     pickupDate: new Date().toISOString(),
//     deliveredAt: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(),
//     value: 85000,
//     weight: '4kg',
//     itemSize: 'Large',
//     status: 'assigned',
//     senderId: 'sender-6',
//     senderName: 'Yemi Adegoke',
//     senderPhone: '+234 814 012 3456',
//     receiverId: 'receiver-6',
//     receiverName: 'Kemi Adegoke',
//     receiverPhone: '+234 815 123 4567',
//     selectedPalId: 'pal-1', // 🔥 Assigned to Kemi Ajayi
//     selectedPalName: 'Kemi Ajayi',
//     acceptedBidAmount: 7500,
//     escrowAmount: 85000,
//     bids: [],
//     createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
//     notes: 'FRAGILE! Keep level at all times. Refrigerated transport preferred. Birthday party at 6 PM.'
//   },

//   // ID '7': Electronics Package (in-transit - ready to complete)
//   {
//     id: '7',
//     title: 'Electronics Package',
//     description: 'Gaming console and accessories in original packaging',
//     pickupLocation: 'Slot Systems, Ikeja City Mall',
//     dropoffLocation: 'Ojodu Berger',
//     pickupDate: new Date(Date.now() - 1.5 * 60 * 60 * 1000).toISOString(),
//     deliveredAt: new Date(Date.now() + 1.5 * 60 * 60 * 1000).toISOString(),
//     value: 520000,
//     weight: '3.5kg',
//     itemSize: 'Medium',
//     status: 'in-transit',
//     senderId: 'sender-7',
//     senderName: 'David Olamide',
//     senderPhone: '+234 816 234 5678',
//     receiverId: 'receiver-7',
//     receiverName: 'Joshua Olamide',
//     receiverPhone: '+234 817 345 6789',
//     selectedPalId: 'pal-1', // 🔥 Assigned to Kemi Ajayi
//     selectedPalName: 'Kemi Ajayi',
//     acceptedBidAmount: 15000,
//     escrowAmount: 520000,
//     bids: [],
//     createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
//     notes: 'Brand new gaming console. Check serial numbers upon delivery. Teen birthday gift.'
//   },

//   // Additional receiver/proxy testing jobs
//   {
//     id: '8',
//     title: 'Smartphone Repair',
//     description: 'iPhone 14 Pro returning from repair service',
//     pickupLocation: 'Phone Clinic, Computer Village',
//     dropoffLocation: 'Ajah',
//     pickupDate: new Date().toISOString(),
//     deliveredAt: new Date(Date.now() + 5 * 60 * 60 * 1000).toISOString(),
//     value: 180000,
//     weight: '0.3kg',
//     itemSize: 'Small',
//     status: 'in-transit',
//     senderId: 'sender-8',
//     senderName: 'Stella Okonkwo',
//     senderPhone: '+234 818 456 7890',
//     receiverId: 'receiver-demo', // 🔥 For receiver testing
//     receiverName: 'Chinyere Okwu',
//     receiverPhone: '+234 807 345 6789',
//     selectedPalId: 'pal-2',
//     selectedPalName: 'Ibrahim Mohammed',
//     acceptedBidAmount: 4500,
//     escrowAmount: 180000,
//     bids: [],
//     createdAt: new Date().toISOString(),
//     notes: 'Repaired screen and battery. Check functionality before leaving repair shop.'
//   },

//   {
//     id: '9',
//     title: 'Fashion Items',
//     description: 'Designer clothes and shoes from boutique',
//     pickupLocation: 'Balogun Market, Lagos Island',
//     dropoffLocation: 'Ikorodu',
//     pickupDate: new Date().toISOString(),
//     deliveredAt: new Date(Date.now() + 7 * 60 * 60 * 1000).toISOString(),
//     value: 125000,
//     weight: '2kg',
//     itemSize: 'Medium',
//     status: 'assigned',
//     senderId: 'sender-9',
//     senderName: 'Amaka Eze',
//     senderPhone: '+234 820 678 9012',
//     receiverId: 'receiver-demo', // 🔥 For receiver testing
//     receiverName: 'Chinyere Okwu',
//     receiverPhone: '+234 807 345 6789',
//     selectedPalId: 'pal-3',
//     selectedPalName: 'Fatima Abdullahi',
//     acceptedBidAmount: 6000,
//     escrowAmount: 125000,
//     bids: [],
//     createdAt: new Date().toISOString(),
//     notes: 'Multiple clothing items. Keep wrinkle-free during transport.'
//   },

//   {
//     id: '10',
//     title: 'Groceries and Food Items',
//     description: 'Fresh groceries and perishable items',
//     pickupLocation: 'ShopRite, Surulere',
//     dropoffLocation: 'Festac Town',
//     pickupDate: new Date().toISOString(),
//     deliveredAt: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
//     value: 45000,
//     weight: '5kg',
//     itemSize: 'Large',
//     status: 'picked-up',
//     senderId: 'sender-10',
//     senderName: 'Mrs. Funmilayo Adejumo',
//     senderPhone: '+234 822 890 1234',
//     receiverId: 'receiver-demo', // 🔥 For receiver testing
//     receiverName: 'Chinyere Okwu',
//     receiverPhone: '+234 807 345 6789',
//     selectedPalId: 'pal-2',
//     selectedPalName: 'Ibrahim Mohammed',
//     acceptedBidAmount: 3500,
//     escrowAmount: 45000,
//     bids: [],
//     createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
//     notes: 'Frozen items included. Maintain cold chain during delivery.'
//   },

//   // 🔥 SENDER DEMO DATA - For showing different delivery statuses in My Sent Deliveries
  
//   // Awaiting Pickup (assigned status)
//   {
//     id: '11',
//     title: 'Business Presentation Materials',
//     description: 'Printed presentation materials, banners, and marketing brochures',
//     pickupLocation: 'Print Express, Allen Avenue, Ikeja',
//     dropoffLocation: 'Eko Hotel & Suites, Victoria Island',
//     pickupDate: new Date(Date.now() + 1 * 60 * 60 * 1000).toISOString(),
//     deliveredAt: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
//     value: 185000,
//     weight: '8kg',
//     itemSize: 'Large',
//     status: 'assigned',
//     senderId: 'sender-demo', // 🔥 For sender testing - matches demo sender user
//     senderName: 'Adebayo Ogundimu',
//     senderPhone: '+234 803 123 4567',
//     receiverId: 'receiver-11',
//     receiverName: 'Conference Coordinator',
//     receiverPhone: '+234 813 456 7890',
//     selectedPalId: 'pal-2',
//     selectedPalName: 'Ibrahim Mohammed',
//     acceptedBidAmount: 12500,
//     escrowAmount: 197500, // Value + Pal fee
//     bids: [],
//     createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
//     notes: 'Important conference materials needed by 3 PM today. Handle with care - do not fold banners.'
//   },

//   // In Transit
//   {
//     id: '12',
//     title: 'Wedding Photography Equipment',
//     description: 'Professional camera gear and lighting equipment rental return',
//     pickupLocation: 'Photo Studio Pro, Surulere',
//     dropoffLocation: 'Radisson Blu Anchorage Hotel, Victoria Island',
//     pickupDate: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
//     deliveredAt: new Date(Date.now() + 75 * 60 * 1000).toISOString(),
//     value: 850000,
//     weight: '15kg',
//     itemSize: 'Large',
//     status: 'in-transit',
//     senderId: 'sender-demo', // 🔥 For sender testing - matches demo sender user
//     senderName: 'Adebayo Ogundimu',
//     senderPhone: '+234 803 123 4567',
//     receiverId: 'receiver-12',
//     receiverName: 'Wedding Planner',
//     receiverPhone: '+234 807 234 5678',
//     selectedPalId: 'pal-3',
//     selectedPalName: 'Fatima Abdullahi',
//     acceptedBidAmount: 25000,
//     escrowAmount: 875000, // Value + Pal fee
//     bids: [],
//     createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
//     notes: 'Extremely valuable photography equipment. Insured delivery required. Contains 5 cameras, lenses, and studio lights.'
//   },

//   // Another In Transit
//   {
//     id: '13',
//     title: 'Corporate Gift Hampers',
//     description: 'Executive gift hampers for client appreciation event',
//     pickupLocation: 'Luxury Gifts & More, Lekki Phase 1',
//     dropoffLocation: 'Four Points by Sheraton, Victoria Island',
//     pickupDate: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
//     deliveredAt: new Date(Date.now() + 90 * 60 * 1000).toISOString(),
//     value: 320000,
//     weight: '12kg',
//     itemSize: 'Large',
//     status: 'in-transit',
//     senderId: 'sender-demo', // 🔥 For sender testing - matches demo sender user
//     senderName: 'Adebayo Ogundimu',
//     senderPhone: '+234 803 123 4567',
//     receiverId: 'receiver-13',
//     receiverName: 'Event Manager',
//     receiverPhone: '+234 809 567 8901',
//     selectedPalId: 'pal-1',
//     selectedPalName: 'Kemi Ajayi',
//     acceptedBidAmount: 18000,
//     escrowAmount: 338000, // Value + Pal fee
//     bids: [],
//     createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
//     notes: '8 luxury gift hampers for VIP clients. Each hamper contains wine, chocolates, and branded items. Keep upright during transport.'
//   },

//   // Completed Delivery
//   {
//     id: '14',
//     title: 'Legal Case Documents',
//     description: 'Confidential legal documents and evidence files for court case',
//     pickupLocation: 'Adebayo & Associates Law Firm, Ikoyi',
//     dropoffLocation: 'Lagos High Court, Tafawa Balewa Square',
//     pickupDate: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
//     deliveredAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
//     value: 75000,
//     weight: '2kg',
//     itemSize: 'Small',
//     status: 'completed',
//     senderId: 'sender-demo', // 🔥 For sender testing - matches demo sender user
//     senderName: 'Adebayo Ogundimu',
//     senderPhone: '+234 803 123 4567',
//     receiverId: 'receiver-14',
//     receiverName: 'Court Registrar',
//     receiverPhone: '+234 806 123 4567',
//     selectedPalId: 'pal-2',
//     selectedPalName: 'Ibrahim Mohammed',
//     acceptedBidAmount: 8500,
//     escrowAmount: 83500, // Value + Pal fee
//     bids: [],
//     createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
//     completedAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
//     notes: 'Time-sensitive legal documents for court hearing. Requires signature confirmation and ID verification upon delivery.'
//   },

//   // Another Completed Delivery
//   {
//     id: '15',
//     title: 'Anniversary Surprise Package',
//     description: 'Romantic anniversary surprise with flowers, jewelry, and personalized gifts',
//     pickupLocation: 'Romantic Gestures Store, Lekki Shopping Mall',
//     dropoffLocation: 'Home Address, Banana Island',
//     pickupDate: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
//     deliveredAt: new Date(Date.now() - 22 * 60 * 60 * 1000).toISOString(),
//     value: 450000,
//     weight: '3kg',
//     itemSize: 'Medium',
//     status: 'completed',
//     senderId: 'sender-demo', // 🔥 For sender testing - matches demo sender user
//     senderName: 'Adebayo Ogundimu',
//     senderPhone: '+234 803 123 4567',
//     receiverId: 'receiver-15',
//     receiverName: 'Mrs. Folakemi Ogundimu',
//     receiverPhone: '+234 805 234 5678',
//     selectedPalId: 'pal-3',
//     selectedPalName: 'Fatima Abdullahi',
//     acceptedBidAmount: 15000,
//     escrowAmount: 465000, // Value + Pal fee
//     bids: [],
//     createdAt: new Date(Date.now() - 30 * 60 * 60 * 1000).toISOString(),
//     completedAt: new Date(Date.now() - 22 * 60 * 60 * 1000).toISOString(),
//     notes: 'Surprise delivery for wife - do not reveal contents! Contains fresh flowers, gold bracelet, and photo album. Wife expects routine grocery delivery.'
//   },

//   // Third Completed Delivery with higher value
//   {
//     id: '16',
//     title: 'Tech Startup Equipment',
//     description: 'New office equipment for startup company - laptops, monitors, and accessories',
//     pickupLocation: 'Slot Systems, Computer Village, Ikeja',
//     dropoffLocation: 'Co-Creation Hub, Yaba',
//     pickupDate: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
//     deliveredAt: new Date(Date.now() - 46 * 60 * 60 * 1000).toISOString(),
//     value: 1250000,
//     weight: '25kg',
//     itemSize: 'Large',
//     status: 'completed',
//     senderId: 'sender-demo', // 🔥 For sender testing - matches demo sender user
//     senderName: 'Adebayo Ogundimu',
//     senderPhone: '+234 803 123 4567',
//     receiverId: 'receiver-16',
//     receiverName: 'Startup CEO',
//     receiverPhone: '+234 811 345 6789',
//     selectedPalId: 'pal-1',
//     selectedPalName: 'Kemi Ajayi',
//     acceptedBidAmount: 35000,
//     escrowAmount: 1285000, // Value + Pal fee
//     bids: [],
//     createdAt: new Date(Date.now() - 52 * 60 * 60 * 1000).toISOString(),
//     completedAt: new Date(Date.now() - 46 * 60 * 60 * 1000).toISOString(),
//     notes: 'High-value tech equipment for new office setup. Includes 5 MacBook Pros, 3 monitors, accessories. Requires careful handling and inventory check upon delivery.'
//   },

//   // 🔥 RECEIVER DEMO DELIVERY - DELIVERED STATUS FOR CONFIRMATION TESTING
//   {
//     id: 'receiver-demo-delivered',
//     title: 'Designer Handbag Collection',
//     description: 'Authentic designer handbags - Louis Vuitton, Gucci, and Prada collection from Jumia premium store',
//     pickupLocation: 'Jumia Premium Store, Victoria Island',
//     dropoffLocation: 'Lekki Phase 1, Lagos',
//     pickupDate: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
//     deliveredAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
//     value: 850000,
//     weight: '4kg',
//     itemSize: 'Medium',
//     status: 'delivered',
//     senderId: 'sender-luxury',
//     senderName: 'Luxury Boutique Lagos',
//     senderPhone: '+234 801 555 1234',
//     receiverId: 'receiver-demo', // 🔥 For receiver testing - matches demo receiver user
//     receiverName: 'Chinyere Okwu',
//     receiverPhone: '+234 807 345 6789',
//     selectedPalId: 'pal-1',
//     selectedPalName: 'Kemi Ajayi',
//     acceptedBidAmount: 18000,
//     escrowAmount: 868000, // Value + Pal fee
//     bids: [],
//     createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
//     category: 'Fashion & Accessories',
//     notes: '⭐ High-value designer items! Package contains 3 authentic designer handbags with certificates of authenticity. Please inspect items carefully before confirming receipt.',
//     isLive: true
//   },

//   // 🔥 RECEIVER DEMO DELIVERY - IN-TRANSIT FOR COMPARISON
//   {
//     id: 'receiver-demo-transit',
//     title: 'Electronics Package - iPhone 15 Pro',
//     description: 'Brand new iPhone 15 Pro Max 256GB in Deep Purple from Apple Store',
//     pickupLocation: 'Apple Store, Ikeja City Mall',
//     dropoffLocation: 'Lekki Phase 1, Lagos',
//     pickupDate: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
//     deliveredAt: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
//     value: 1450000,
//     weight: '0.5kg',
//     itemSize: 'Small',
//     status: 'in-transit',
//     senderId: 'sender-apple',
//     senderName: 'Apple Store Lagos',
//     senderPhone: '+234 801 888 9999',
//     receiverId: 'receiver-demo', // 🔥 For receiver testing - matches demo receiver user
//     receiverName: 'Chinyere Okwu',
//     receiverPhone: '+234 807 345 6789',
//     selectedPalId: 'pal-2',
//     selectedPalName: 'Ibrahim Mohammed',
//     acceptedBidAmount: 12000,
//     escrowAmount: 1462000, // Value + Pal fee
//     bids: [],
//     createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
//     category: 'Electronics',
//     notes: '📱 High-value electronics! Brand new sealed iPhone. Handle with care and avoid any drops or impacts.',
//     isLive: true
//   }
// ];

// // Enhanced Demo Users
// export const demoUsers: { [key: string]: User } = {
//   sender: {
//     id: 'sender-demo',
//     name: 'Adebayo Ogundimu',
//     email: 'adebayo@prawnbox.ng',
//     phone: '+234 803 123 4567',
//     role: 'sender',
//     rating: 4.8,
//     walletBalance: 125000,
//     isVerified: true,
//     joinedDate: '2024-01-15',
//     profileImage: ''
//   },
//   // 🔥 ENHANCED PAL USER - Kemi Ajayi with 6 Active Deliveries
//   pal: {
//     id: 'pal-1',
//     name: 'Kemi Ajayi',
//     email: 'kemi@prawnbox.ng',
//     phone: '+234 805 987 6543',
//     role: 'pal',
//     rating: 4.9,
//     walletBalance: 89500,
//     isVerified: true,
//     joinedDate: '2023-08-20',
//     profileImage: '',
//     vehicleType: 'Car'
//   },
//   // 🔥 ENHANCED RECEIVER USER - Chinyere Okwu with Incoming Deliveries
//   receiver: {
//     id: 'receiver-demo',
//     name: 'Chinyere Okwu',
//     email: 'chinyere@prawnbox.ng',
//     phone: '+234 807 345 6789',
//     role: 'receiver',
//     rating: 4.6,
//     walletBalance: 15000,
//     isVerified: true,
//     joinedDate: '2024-02-10',
//     profileImage: ''
//   },
//   // 🔥 ENHANCED PROXY USER - Ahmed Yusuf with Business Items
//   proxy: {
//     id: 'proxy-demo',
//     name: 'Ahmed Yusuf',
//     email: 'ahmed@prawnbox.ng',
//     phone: '+234 809 567 8901',
//     role: 'proxy',
//     rating: 4.7,
//     walletBalance: 32000,
//     isVerified: true,
//     joinedDate: '2023-12-05',
//     profileImage: ''
//   }
// };

// // Enhanced Pal Details for Testing
// export const mockPalDetails: { [key: string]: User } = {
//   'pal-1': {
//     id: 'pal-1',
//     name: 'Kemi Ajayi',
//     email: 'kemi@prawnbox.ng',
//     phone: '+234 805 987 6543',
//     role: 'pal',
//     rating: 4.9,
//     walletBalance: 89500,
//     isVerified: true,
//     joinedDate: '2023-08-20',
//     profileImage: '',
//     vehicleType: 'Car'
//   },
//   'pal-2': {
//     id: 'pal-2',
//     name: 'Ibrahim Mohammed',
//     email: 'ibrahim@prawnbox.ng',
//     phone: '+234 806 234 5678',
//     role: 'pal',
//     rating: 4.3,
//     walletBalance: 45000,
//     isVerified: true,
//     joinedDate: '2023-11-12',
//     profileImage: '',
//     vehicleType: 'Motorcycle'
//     },
//   'pal-3': {
//     id: 'pal-3',
//     name: 'Fatima Abdullahi',
//     email: 'fatima@prawnbox.ng',
//     phone: '+234 807 345 6789',
//     role: 'pal',
//     rating: 4.6,
//     walletBalance: 67000,
//     isVerified: true,
//     joinedDate: '2023-09-08',
//     profileImage: '',
//     vehicleType: 'Bicycle',
//   }
// };

// // 🔥 ENHANCED PROXY ITEMS WITH REALISTIC BUSINESS SCENARIOS
// export const mockProxyItems: ProxyItem[] = [
//   // Incoming item - Pal requesting proxy storage
 
//   // Stored item with 24hr countdown - recently stored
  
  
//   // Stored item with urgent countdown - almost expired
 
  
//   // Another incoming request
// //   {
// //     id: 'proxy-4',
// //     title: 'Fashion Accessories',
// //     value: 95000,
// //     weight: '2kg',
// //     itemSize: 'Medium',
// //     status: 'incoming',
// //     pickupDeadline: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
// //     proxyId: 'proxy-demo',
// //     jobId: 'job-proxy-4',
// //     palId: 'pal-2',
// //     palName: 'Ibrahim Mohammed',
// //     notificationAttempts: 0,
// //     notes: 'Multiple items in branded bags. Keep clean and organized.'
// //   },
  
//   // Completed item - successfully picked up
// //   {
// //     id: 'proxy-5',
// //     title: 'Medical Supplies',
// //     value: 45000,
// //     weight: '1kg',
// //     itemSize: 'Small',
// //     status: 'completed',
// //     dropoffDate: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
// //     storageFee: 500,
// //     maxStorageDays: 7,
// //     daysStored: 4,
// //     createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
// //     jobId: 'job-proxy-5',
// //     notificationAttempts: 1,
// //     notes: 'Temperature-sensitive items. Was stored in cool area as requested.',
// //     palName: 'Ibrahim Mohammed',
// //     proxyId: 'proxy-demo'
// //   },
  
//   // Returned item - receiver never showed up
//   {
//     id: 'proxy-6',
//     title: 'Birthday Cake',
//     senderName: 'Sweet Dreams Bakery',
//     receiverName: 'Chioma Nwosu',
//     receiverPhone: '+234 807 234 5678',
//     value: 35000,
//     weight: '2.5kg',
//     itemSize: 'Large',
//     status: 'returned',
//     dropoffDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
//     storageFee: 500,
//     maxStorageDays: 7,
//     daysStored: 4,
//     createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
//     jobId: 'job-proxy-6',
//     notificationAttempts: 3,
//     notes: 'Perishable item. Receiver was unreachable after multiple attempts.'
//   }
// ];

// // Chat Threads
// export const mockChatThreads: ChatThread[] = [
//   {
//     id: 'chat-1',
//     jobId: '2',
//     participants: ['sender-2', 'pal-1'],
//     lastActivity: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
//     messages: [
//       {
//         id: 'msg-1',
//         senderId: 'sender-2',
//         senderName: 'Folake Adebayo',
//         senderRole: 'sender',
//         message: 'Hi! The wedding dress is very delicate. Please handle with care.',
//         timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
//         type: 'text',
//         read: true
//       },
//       {
//         id: 'msg-2',
//         senderId: 'pal-1',
//         senderName: 'Kemi Ajayi',
//         senderRole: 'pal',
//         message: 'Absolutely! I understand how important this is. Will treat it with maximum care.',
//         timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
//         type: 'text',
//         read: false
//       }
//     ]
//   },
//   {
//     id: 'chat-2',
//     jobId: '8',
//     participants: ['sender-8', 'receiver-demo'],
//     lastActivity: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
//     messages: [
//       {
//         id: 'msg-3',
//         senderId: 'sender-8',
//         senderName: 'Stella Okonkwo',
//         senderRole: 'sender',
//         message: 'Your phone is ready! The Pal should be arriving soon.',
//         timestamp: new Date(Date.now() - 20 * 60 * 1000).toISOString(),
//         type: 'text',
//         read: true
//       },
//       {
//         id: 'msg-4',
//         senderId: 'receiver-demo',
//         senderName: 'Chinyere Okwu',
//         senderRole: 'receiver',
//         message: 'Thank you! I\'ll be waiting. Hope the repair went well.',
//         timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
//         type: 'text',
//         read: false
//       }
//     ]
//   }
// ];

// // Nigerian Locations
// export const nigerianLocations: NigerianLocation[] = [
//   {
//     id: 'loc-1',
//     name: 'Victoria Island',
//     state: 'Lagos',
//     lga: 'Eti-Osa',
//     type: 'city',
//     isPopular: true,
//     coordinates: { lat: 6.4281, lng: 3.4219 }
//   },
//   {
//     id: 'loc-2',
//     name: 'Ikeja',
//     state: 'Lagos',
//     lga: 'Ikeja',
//     type: 'city',
//     isPopular: false,
//     coordinates: { lat: 6.5950, lng: 3.3384 }
//   },
//   {
//     id: 'loc-3',
//     name: 'Surulere',
//     state: 'Lagos',
//     lga: 'Surulere',
//     type: 'city',
//     isPopular: true,
//     coordinates: { lat: 6.4969, lng: 3.3614 }
//   },
//   {
//     id: 'loc-4',
//     name: 'Lekki',
//     state: 'Lagos',
//     lga: 'Eti-Osa',
//     type: 'city',
//     isPopular: true,
//     coordinates: { lat: 6.4474, lng: 3.4739 }
//   },
//   {
//     id: 'loc-5',
//     name: 'Yaba',
//     state: 'Lagos',
//     lga: 'Lagos Mainland',
//     type: 'city',
//     isPopular: true,
//     coordinates: { lat: 6.5158, lng: 3.3696 }
//   },
//   {
//     id: 'loc-6',
//     name: 'Gbagada',
//     state: 'Lagos',
//     lga: 'Kosofe',
//     type: 'city',
//     isPopular: true,
//     coordinates: { lat: 6.5436, lng: 3.3933 }
//   },
//   {
//     id: 'loc-7',
//     name: 'Ikorodu',
//     state: 'Lagos',
//     lga: 'Ikorodu',
//     type: 'city',
//     isPopular: true,
//     coordinates: { lat: 6.6194, lng: 3.5108 }
//   },
//   {
//     id: 'loc-8',
//     name: 'Magodo',
//     state: 'Lagos',
//     lga: 'Kosofe',
//     type: 'city',
//     isPopular: true,
//     coordinates: { lat: 6.5673, lng: 3.3924 }
//   },
//   {
//     id: 'loc-9',
//     name: 'Ajah',
//     state: 'Lagos',
//     lga: 'Eti-Osa',
//     type: 'city',
//     isPopular: true,
//     coordinates: { lat: 6.4647, lng: 3.5562 }
//   },
//   {
//     id: 'loc-10',
//     name: 'Festac Town',
//     state: 'Lagos',
//     lga: 'Amuwo-Odofin',
//     type: 'city',
//     isPopular: true,
//     coordinates: { lat: 6.4658, lng: 3.2792 }
//   }
// ];