import React, { useState } from 'react';
import { Package, DollarSign, MapPin, CheckCircle, Users, Building, Mail, ArrowRight, Smartphone, Shield, Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface HowItWorksPageProps {
  onNavigate?: (screen: string) => void;
}

export function HowItWorksPage({ onNavigate }: HowItWorksPageProps) {
  const [activeTab, setActiveTab] = useState<'sender' | 'pal' | 'receiver' | 'proxy'>('sender');

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0 }
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const tabs = [
    { id: 'sender' as const, label: 'For Senders', icon: Package },
    { id: 'pal' as const, label: 'For Pals', icon: Users },
    { id: 'receiver' as const, label: 'For Receivers', icon: Mail },
    { id: 'proxy' as const, label: 'For Proxies', icon: Building }
  ];

  const senderSteps = [
    {
      number: '01',
      title: 'Create Your Account',
      description: 'Sign up in minutes with your email or social media. Verify your phone number to get started.',
      icon: Smartphone
    },
    {
      number: '02',
      title: 'Post Delivery Details',
      description: 'Add pickup and delivery locations, item description, photos, size, weight, and value. Set your preferred delivery time.',
      icon: Package
    },
    {
      number: '03',
      title: 'Review Pal Bids',
      description: 'Verified Pals bid on your delivery. Review their ratings, vehicle types, and delivery times. Choose the best option.',
      icon: Star
    },
    {
      number: '04',
      title: 'Pay into Escrow',
      description: 'Your payment is held securely in escrow. The Pal only gets paid after successful delivery. Your money is protected.',
      icon: Shield
    },
    {
      number: '05',
      title: 'Track Your Delivery',
      description: 'Get real-time GPS tracking. Chat with your Pal directly. Receive updates at every stage of delivery.',
      icon: MapPin
    },
    {
      number: '06',
      title: 'Confirm Receipt',
      description: 'Receiver confirms delivery with QR code or OTP. Payment is released to the Pal automatically.',
      icon: CheckCircle
    },
    {
      number: '07',
      title: 'Rate Your Experience',
      description: 'Leave a review for your Pal. Help build trust in the community. Get discounts on future deliveries.',
      icon: Star
    }
  ];

  const palSteps = [
    {
      number: '01',
      title: 'Get Verified',
      description: 'Upload government-issued ID, selfie, and vehicle documents. Our team verifies your identity within 24 hours.',
      icon: Shield
    },
    {
      number: '02',
      title: 'Browse Available Jobs',
      description: 'See deliveries on routes you are already traveling. Filter by location, package size, and payment amount.',
      icon: Package
    },
    {
      number: '03',
      title: 'Place Your Bid',
      description: 'Offer a competitive price and estimated delivery time. Highlight your ratings and fast delivery history.',
      icon: DollarSign
    },
    {
      number: '04',
      title: 'Pick Up the Item',
      description: 'Once accepted, navigate to pickup location. Scan QR code or use OTP to verify the package. Take photos for records.',
      icon: MapPin
    },
    {
      number: '05',
      title: 'Deliver Safely',
      description: 'Navigate to dropoff location with GPS. Chat with receiver to coordinate handover. Handle packages with care.',
      icon: CheckCircle
    },
    {
      number: '06',
      title: 'Get Paid Instantly',
      description: 'Receiver confirms delivery. Payment is released from escrow to your wallet immediately. You keep 95% of the bid amount.',
      icon: DollarSign
    },
    {
      number: '07',
      title: 'Build Your Reputation',
      description: 'Earn 5-star ratings. Get more job offers. Access premium delivery requests. Grow your delivery business.',
      icon: Star
    }
  ];

  const receiverSteps = [
    {
      number: '01',
      title: 'Get Notified',
      description: 'Sender adds you as receiver. You get SMS and app notifications about incoming delivery. No account needed initially.',
      icon: Mail
    },
    {
      number: '02',
      title: 'Track Arrival',
      description: 'See real-time updates as Pal picks up and transports your package. Get ETA notifications.',
      icon: MapPin
    },
    {
      number: '03',
      title: 'Verify the Pal',
      description: 'Check Pal details before accepting package. Verify their ID matches the app. Ensure it is the right person.',
      icon: Shield
    },
    {
      number: '04',
      title: 'Receive Your Item',
      description: 'Inspect the package. Ensure it matches the description. Check for any damage before accepting.',
      icon: Package
    },
    {
      number: '05',
      title: 'Confirm Delivery',
      description: 'Scan Pal QR code or enter OTP to confirm receipt. This releases payment to the Pal automatically.',
      icon: CheckCircle
    }
  ];

  const proxySteps = [
    {
      number: '01',
      title: 'Register Your Location',
      description: 'Sign up as a proxy location. Provide your business address and opening hours. Get verified by our team.',
      icon: Building
    },
    {
      number: '02',
      title: 'Accept Deliveries',
      description: 'Pals deliver packages to your location when receivers are unavailable. You store them securely.',
      icon: Package
    },
    {
      number: '03',
      title: 'Store Securely',
      description: 'Keep packages safe in designated storage area. Scan items into your inventory system. Notify receiver.',
      icon: Shield
    },
    {
      number: '04',
      title: 'Hand Over to Receiver',
      description: 'Receiver comes to collect. Verify their identity with QR code or OTP. Hand over package and confirm in app.',
      icon: CheckCircle
    },
    {
      number: '05',
      title: 'Earn Storage Fees',
      description: 'Get paid for each day of storage. Earn ₦500-₦2,000 per package depending on size and duration.',
      icon: DollarSign
    }
  ];

  const getStepsForTab = () => {
    switch (activeTab) {
      case 'sender': return senderSteps;
      case 'pal': return palSteps;
      case 'receiver': return receiverSteps;
      case 'proxy': return proxySteps;
    }
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#2f2f2f] to-[#1a1a1a] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              How Prawnbox Works
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Simple, transparent, and secure. Choose your role to see how easy it is to get started.
            </p>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="bg-white border-b border-gray-200 sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-4 border-b-2 transition-all duration-200 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-[#f44708] text-[#f44708]'
                    : 'border-transparent text-gray-600 hover:text-[#2f2f2f]'
                }`}
              >
                <tab.icon size={20} />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="space-y-12"
            key={activeTab}
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {getStepsForTab().map((step, index) => (
              <motion.div
                key={index}
                className={`flex flex-col md:flex-row gap-8 items-center ${
                  index % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}
                variants={index % 2 === 0 ? fadeInLeft : fadeInRight}
              >
                {/* Step Number and Icon */}
                <motion.div
                  className="flex-shrink-0 relative"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="w-32 h-32 rounded-2xl bg-gradient-to-br from-[#f44708] to-[#ff5722] flex items-center justify-center shadow-2xl"
                    whileHover={{ boxShadow: "0 30px 60px -12px rgba(244, 71, 8, 0.5)" }}
                  >
                    <step.icon size={48} className="text-white" />
                  </motion.div>
                  <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-[#2f2f2f] flex items-center justify-center">
                    <span className="text-white font-bold text-xl">{step.number}</span>
                  </div>
                </motion.div>

                {/* Step Content */}
                <motion.div
                  className="flex-1 bg-white p-8 rounded-2xl shadow-lg"
                  whileHover={{ scale: 1.02, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-2xl font-bold text-[#2f2f2f] mb-4">
                    {step.title}
                  </h3>
                  <p className="text-lg text-gray-600">
                    {step.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Video Section (Placeholder) */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2f2f2f] mb-4">
              <span className="h2-animated-underline relative inline-block">
                See It in Action
                <motion.span
                  className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-[#f44708] to-[#f4470899] rounded-full"
                  initial={{ width: "0%", opacity: 0 }}
                  whileInView={{ width: "100%", opacity: 1 }}
                  viewport={{ once: false, margin: "-50px" }}
                  transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
                />
              </span>
            </h2>
            <p className="text-xl text-gray-600">
              Watch how easy it is to send or deliver with Prawnbox
            </p>
          </div>
          <div className="aspect-video rounded-2xl bg-gray-900 flex items-center justify-center shadow-2xl">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-[#f44708] flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <p className="text-white">Video Tutorial Coming Soon</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Teaser */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-[#2f2f2f] mb-6">
            <span className="h2-animated-underline relative inline-block">
              Still Have Questions?
              <motion.span
                className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-[#f44708] to-[#f4470899] rounded-full"
                initial={{ width: "0%", opacity: 0 }}
                whileInView={{ width: "100%", opacity: 1 }}
                viewport={{ once: false, margin: "-50px" }}
                transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
              />
            </span>
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Check out our comprehensive FAQ section for detailed answers
          </p>
          <button
            onClick={() => onNavigate?.('website-faqs')}
            className="px-8 py-4 bg-[#2f2f2f] text-white text-lg font-semibold rounded-xl hover:bg-[#1a1a1a] transform hover:scale-105 transition-all duration-200"
          >
            View FAQs
            <ArrowRight className="inline ml-2" size={20} />
          </button>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#2f2f2f] to-[#000000] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8">
            Join thousands of Nigerians using Prawnbox every day
          </p>
          <button
            onClick={() => onNavigate?.('auth')}
            className="px-8 py-4 bg-[#f44708] text-white text-lg font-semibold rounded-xl hover:bg-[#ff5722] transform hover:scale-105 transition-all duration-200 shadow-2xl"
          >
            Create Free Account
            <ArrowRight className="inline ml-2" size={20} />
          </button>
        </div>
      </section>
    </div>
  );
}
