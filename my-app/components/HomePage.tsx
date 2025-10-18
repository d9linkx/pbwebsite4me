import React from 'react';
import { Package, Zap, Shield, Users, TrendingUp, CheckCircle, ArrowRight, Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface HomePageProps {
  onNavigate?: (screen: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  // Animation variants for scroll effects (compatible with framer-motion v12)
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 }
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
    visible: { opacity: 1, scale: 1 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const cardHover = {
    scale: 1.05
  };

  return (
    <div className="pt-[70px] m-[0px] pr-[0px] pb-[0px] pl-[0px]">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#2f2f2f] via-[#1a1a1a] to-black text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #f44708 2px, transparent 2px),
                             radial-gradient(circle at 75% 75%, #f44708 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-16 lg:pb-32 m-[0px] pt-[56px] pr-[28px] pb-[112px] pl-[28px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-[0px] p-[0px] mx-[-20px] my-[0px] mr-[-15px] mb-[0px] ml-[-15px] mt-[-30px] lg:mt-[2px] lg:ml-[-25px] lg:mr-[-25px]">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInLeft}
            >
              <motion.div
                className="inline-flex items-center space-x-2 bg-[#f44708]/20 px-4 py-2 rounded-full mb-6"
                variants={scaleIn}
              >
                <Package className="w-4 h-4 text-[#f44708]" />
                <span className="text-sm font-medium text-[#f44708]">Trusted by 50,000+ Users</span>
              </motion.div>

              <motion.h1
                className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
                variants={fadeInUp}
              >
                Send <span className="text-[#f44708]">Anything</span>, Anywhere in Nigeria
              </motion.h1>

              <motion.p
                className="text-xl text-gray-300 mb-8 leading-relaxed"
                variants={fadeInUp}
              >
                Enjoy 7x faster, safer, and 5x more affordable peer-to-peer delivery services within Nigeria & beyond.
              </motion.p>

              {/* Quick Stats */}
              <motion.div
                className="grid grid-cols-3 gap-4 mb-8"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                <motion.div
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center"
                  variants={scaleIn}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 1.05 }}
                >
                  <div className="text-2xl font-bold text-[#f44708]">10k+</div>
                  <div className="text-xs text-gray-300 mt-1">Verified Pals</div>
                </motion.div>
                <motion.div
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center"
                  variants={scaleIn}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 1.05 }}
                >
                  <div className="text-2xl font-bold text-[#f44708]">50k+</div>
                  <div className="text-xs text-gray-300 mt-1">Deliveries</div>
                </motion.div>
                <motion.div
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center"
                  variants={scaleIn}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 1.05 }}
                >
                  <div className="text-2xl font-bold text-[#f44708]">4.8★</div>
                  <div className="text-xs text-gray-300 mt-1">Avg. Rating</div>
                </motion.div>
              </motion.div>

              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <motion.button
                  onClick={() => onNavigate?.('auth')}
                  className="group bg-[#f44708] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#ff5722] transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 inline-flex items-center justify-start space-x-2"
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Send an item today</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>

                <motion.button
                  onClick={() => onNavigate?.('website-send-items')}
                  className="group bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 px-8 py-4 rounded-xl font-semibold hover:bg-white/20 hover:border-white/50 transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 inline-flex items-center justify-start space-x-2"
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>See how it works</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>

              <motion.p
                className="text-sm text-gray-400"
                variants={fadeInUp}
              >
                ✓ No hidden fees  ✓ 24/7 support  ✓ Instant matching
              </motion.p>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              className="relative"
              initial="hidden"
              animate="visible"
              variants={fadeInRight}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                {/* Placeholder for hero image - replace with actual image */}
                <div className="w-full h-[500px] bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                  <div className="text-center text-gray-600">
                    <Package size={64} className="mx-auto mb-4" />
                    <p>Hero Delivery Image</p>
                    <p className="text-sm">Replace with actual image</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent lg:from-black/20 lg:to-transparent px-[0px] p-[0px] mx-[0px] m-[0px]"></div>

                {/* Floating Card */}
                <motion.div
                  className="absolute bottom-6 left-6 right-6 bg-white rounded-xl p-4 shadow-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Active Deliveries Today</div>
                      <div className="text-2xl font-bold text-[#2f2f2f]">2,847</div>
                    </div>
                    <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                      +28%
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-100px" }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#2f2f2f] mb-4">
              <span className="h2-animated-underline relative inline-block">
                Why Choose Prawnbox?
                <motion.span
                  className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-[#f44708] to-[#f4470899] rounded-full"
                  initial={{ width: "0%", opacity: 0 }}
                  whileInView={{ width: "100%", opacity: 1 }}
                  viewport={{ once: false, margin: "-50px" }}
                  transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
                />
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the future of delivery with our innovative platform designed for you.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-100px" }}
            variants={staggerContainer}
          >
            {[
              {
                icon: Zap,
                title: 'Lightning Fast',
                description: 'Get your items delivered in hours, not days. Our network of Pals ensures quick pickups and deliveries across Nigeria.'
              },
              {
                icon: Shield,
                title: 'Secure & Safe',
                description: 'Escrow payments, verified Pals, and insurance protection. Your packages are always safe with us.'
              },
              {
                icon: Package,
                title: 'Track Everything',
                description: 'Real-time tracking, live updates, and direct chat with your Pal. Always know where your package is.'
              },
              {
                icon: Users,
                title: 'Trusted Community',
                description: 'Join thousands of verified Pals and satisfied customers. Build your reputation and earn trust.'
              },
              {
                icon: TrendingUp,
                title: 'Best Prices',
                description: 'Competitive bidding system ensures you always get the best rates. No hidden fees, transparent pricing.'
              },
              {
                icon: Star,
                title: 'Quality Service',
                description: 'Rated 4.8/5 by our users. We are committed to providing excellent service every single time.'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="p-8 rounded-2xl bg-gray-50 hover:bg-[#f44708] hover:text-white group transition-all duration-300 cursor-pointer"
                variants={scaleIn}
                whileHover={cardHover}
                whileTap={cardHover}
              >
                <feature.icon size={40} className="text-[#f44708] group-hover:text-white mb-4 transition-transform duration-300 group-hover:scale-110" />
                <h3 className="text-xl font-bold text-[#2f2f2f] group-hover:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 group-hover:text-white/90">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-100px" }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#2f2f2f] mb-4">
              <span className="h2-animated-underline relative inline-block">
                How to send items
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
              Get started in 3 simple steps
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-100px" }}
            variants={staggerContainer}
          >
            {[
              {
                step: '01',
                title: 'Post Your Delivery',
                description: 'Tell us what you need delivered, where it is going, and when you need it. Get instant bids from verified Pals.'
              },
              {
                step: '02',
                title: 'Choose Your Pal',
                description: 'Review bids, check ratings, and select the best Pal for your delivery. Secure payment held in escrow.'
              },
              {
                step: '03',
                title: 'Track & Receive',
                description: 'Track your delivery in real-time, chat with your Pal, and confirm receipt. Payment released on delivery.'
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                className="relative"
                variants={fadeInUp}
              >
                <div className="text-center">
                  <motion.div
                    className="inline-block mb-6"
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                  >
                    <span className="text-6xl font-bold text-[#f44708] opacity-20">
                      {step.step}
                    </span>
                  </motion.div>
                  <h3 className="text-2xl font-bold text-[#2f2f2f] mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">
                    {step.description}
                  </p>
                </div>
                {index < 2 && (
                  <motion.div
                    className="hidden md:block absolute top-1/3 right-0 transform translate-x-1/2"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 0.3, x: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                  >
                    <ArrowRight size={32} className="text-[#f44708]" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Real People, Real Stories Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-100px" }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#2f2f2f] mb-4">
              <span className="h2-animated-underline relative inline-block">
                Empowering Nigerian Entrepreneurs
                <motion.span
                  className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-[#f44708] to-[#f4470899] rounded-full"
                  initial={{ width: "0%", opacity: 0 }}
                  whileInView={{ width: "100%", opacity: 1 }}
                  viewport={{ once: false, margin: "-50px" }}
                  transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
                />
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From small business owners to delivery professionals, Prawnbox is transforming how Nigerians work and earn.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Entrepreneur Story */}
            <motion.div
              className="rounded-2xl overflow-hidden shadow-xl cursor-pointer"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-100px" }}
              variants={fadeInLeft}
              whileHover={{ scale: 1.05, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
              whileTap={{ scale: 1.05, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
              transition={{ duration: 0.3 }}
            >
              <div className="h-80 overflow-hidden">
                {/* Placeholder for entrepreneur image */}
                <div className="w-full h-full bg-gradient-to-br from-blue-200 to-blue-300 flex items-center justify-center">
                  <div className="text-center text-gray-600">
                    <Users size={64} className="mx-auto mb-4" />
                    <p>Nigerian Entrepreneur</p>
                  </div>
                </div>
              </div>
              <div className="p-8 bg-gray-50">
                <h3 className="text-2xl font-bold text-[#2f2f2f] mb-3">
                  Built for all senders
                </h3>
                <p className="text-gray-600 mb-4">
                  Send inventory, products, and documents across Nigeria with ease. Focus on growing your business while we handle deliveries.
                </p>
                <motion.button
                  onClick={() => onNavigate?.('website-send-items')}
                  className="text-[#f44708] font-semibold hover:underline flex items-center"
                  whileHover={{ x: 5 }}
                  whileTap={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  Start Sending <ArrowRight className="ml-2" size={18} />
                </motion.button>
              </div>
            </motion.div>

            {/* Delivery Professional Story */}
            <motion.div
              className="rounded-2xl overflow-hidden shadow-xl cursor-pointer"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-100px" }}
              variants={fadeInRight}
              whileHover={{ scale: 1.05, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
              whileTap={{ scale: 1.05, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
              transition={{ duration: 0.3 }}
            >
              <div className="h-80 overflow-hidden">
                {/* Placeholder for delivery professional image */}
                <div className="w-full h-full bg-gradient-to-br from-green-200 to-green-300 flex items-center justify-center">
                  <div className="text-center text-gray-600">
                    <Package size={64} className="mx-auto mb-4" />
                    <p>Delivery Professional</p>
                  </div>
                </div>
              </div>
              <div className="p-8 bg-gray-50">
                <h3 className="text-2xl font-bold text-[#2f2f2f] mb-3">
                  Earn as a Delivery Pal
                </h3>
                <p className="text-gray-600 mb-4">
                  Join our network of verified Pals <span className="font-bold">with or without a vehicle</span>. Set your own rates, choose your schedule, and build your reputation.
                </p>
                <motion.button
                  onClick={() => onNavigate?.('website-become-pal')}
                  className="text-[#f44708] font-semibold hover:underline flex items-center"
                  whileHover={{ x: 5 }}
                  whileTap={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  Become a Pal <ArrowRight className="ml-2" size={18} />
                </motion.button>
              </div>
            </motion.div>

            {/* Tamper-Proof Tapes - Coming Soon */}
            <motion.div
              className="rounded-2xl overflow-hidden shadow-xl cursor-pointer relative"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-100px" }}
              variants={fadeInLeft}
              whileHover={{ scale: 1.05, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
              whileTap={{ scale: 1.05, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
              transition={{ duration: 0.3 }}
            >
              <div className="h-80 overflow-hidden relative">
                {/* Placeholder for tamper-proof tape image */}
                <div className="w-full h-full bg-gradient-to-br from-orange-200 to-orange-300 flex items-center justify-center">
                  <div className="text-center text-gray-600">
                    <Shield size={64} className="mx-auto mb-4" />
                    <p>Tamper-Proof Security</p>
                    <p className="text-sm">Coming Soon</p>
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-[#f44708] text-white px-4 py-2 rounded-full shadow-lg">
                  <span className="font-semibold text-sm">Coming Soon</span>
                </div>
              </div>
              <div className="p-8 bg-gray-50">
                <h3 className="text-2xl font-bold text-[#2f2f2f] mb-3">
                  Tamper-Proof Security Tapes
                </h3>
                <p className="text-gray-600 mb-4">
                  Enhanced security for your deliveries with our exclusive tamper-proof tapes. Ensure package integrity from pickup to delivery.
                </p>
                <motion.button
                  className="text-gray-400 font-semibold flex items-center cursor-not-allowed"
                  whileHover={{ x: 5 }}
                  whileTap={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  Coming Soon <ArrowRight className="ml-2" size={18} />
                </motion.button>
              </div>
            </motion.div>

            {/* Earn as Proxy Receiver */}
            <motion.div
              className="rounded-2xl overflow-hidden shadow-xl cursor-pointer"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-100px" }}
              variants={fadeInRight}
              whileHover={{ scale: 1.05, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
              whileTap={{ scale: 1.05, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
              transition={{ duration: 0.3 }}
            >
              <div className="h-80 overflow-hidden">
                {/* Placeholder for proxy shop owner image */}
                <div className="w-full h-full bg-gradient-to-br from-purple-200 to-purple-300 flex items-center justify-center">
                  <div className="text-center text-gray-600">
                    <Users size={64} className="mx-auto mb-4" />
                    <p>Shop Owner</p>
                  </div>
                </div>
              </div>
              <div className="p-8 bg-gray-50">
                <h3 className="text-2xl font-bold text-[#2f2f2f] mb-3">
                  Earn as a Proxy Receiver
                </h3>
                <p className="text-gray-600 mb-4">
                  Turn your business location into a secure package hub. Earn storage fees by safely holding deliveries for pickup when receivers are unavailable.
                </p>
                <motion.button
                  onClick={() => onNavigate?.('website-become-proxy')}
                  className="text-[#f44708] font-semibold hover:underline flex items-center"
                  whileHover={{ x: 5 }}
                  whileTap={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  Become a Proxy <ArrowRight className="ml-2" size={18} />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust & Community Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-100px" }}
              variants={fadeInLeft}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#2f2f2f] mb-6">
                <span className="h2-animated-underline relative inline-block">
                  A Platform Built on Trust
                  <motion.span
                    className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-[#f44708] to-[#f4470899] rounded-full"
                    initial={{ width: "0%", opacity: 0 }}
                    whileInView={{ width: "100%", opacity: 1 }}
                    viewport={{ once: false, margin: "-50px" }}
                    transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
                  />
                </span>
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Every Pal on Prawnbox goes through a rigorous verification process. We prioritize safety, security, and reliability so you can have peace of mind with every delivery.
              </p>
              <motion.div
                className="space-y-4"
                variants={staggerContainer}
              >
                {[
                  { label: 'Verified ID & Background Checks', icon: CheckCircle },
                  { label: 'Secure Escrow Payments', icon: Shield },
                  { label: 'Real-time GPS Tracking', icon: Package },
                  { label: 'Rated & Reviewed Community', icon: Star }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-3"
                    variants={fadeInUp}
                    whileHover={{ x: 10 }}
                    whileTap={{ x: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <item.icon className="text-[#f44708] flex-shrink-0" size={24} />
                    <span className="text-gray-700">{item.label}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
            <motion.div
              className="rounded-2xl overflow-hidden shadow-2xl"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-100px" }}
              variants={fadeInRight}
            >
              {/* Placeholder for trust and security image */}
              <div className="w-full h-full bg-gradient-to-br from-indigo-200 to-indigo-300 flex items-center justify-center">
                <div className="text-center text-gray-600">
                  <Shield size={64} className="mx-auto mb-4" />
                  <p>Trust & Security</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Community Impact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="order-2 lg:order-1 rounded-2xl overflow-hidden shadow-2xl"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInLeft}
            >
              {/* Placeholder for community marketplace image */}
              <div className="w-full h-full bg-gradient-to-br from-teal-200 to-teal-300 flex items-center justify-center">
                <div className="text-center text-gray-600">
                  <Users size={64} className="mx-auto mb-4" />
                  <p>Community Marketplace</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              className="order-1 lg:order-2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInRight}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#2f2f2f] mb-6">
                <span className="h2-animated-underline relative inline-block">
                  Connecting Communities Across Nigeria
                  <motion.span
                    className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-[#f44708] to-[#f4470899] rounded-full"
                    initial={{ width: "0%", opacity: 0 }}
                    whileInView={{ width: "100%", opacity: 1 }}
                    viewport={{ once: false, margin: "-50px" }}
                    transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
                  />
                </span>
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                From Lagos to Abuja, Port Harcourt to Kano, Prawnbox is bringing people together through reliable delivery services. We&apos;re not just moving packages — we&apos;re building connections.
              </p>
              <motion.div
                className="grid grid-cols-2 gap-6"
                variants={staggerContainer}
              >
                <motion.div
                  className="p-6 bg-gray-50 rounded-xl"
                  variants={scaleIn}
                  whileHover={{ scale: 1.05, backgroundColor: "#f44708", color: "#ffffff" }}
                  whileTap={{ scale: 1.05, backgroundColor: "#f44708", color: "#ffffff" }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-4xl font-bold text-[#f44708] mb-2">36</p>
                  <p className="text-gray-600">States Covered</p>
                </motion.div>
                <motion.div
                  className="p-6 bg-gray-50 rounded-xl"
                  variants={scaleIn}
                  whileHover={{ scale: 1.05, backgroundColor: "#f44708", color: "#ffffff" }}
                  whileTap={{ scale: 1.05, backgroundColor: "#f44708", color: "#ffffff" }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-4xl font-bold text-[#f44708] mb-2">100+</p>
                  <p className="text-gray-600">Cities & Towns</p>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Flexible Earning Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInLeft}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#2f2f2f] mb-6">
                <span className="h2-animated-underline relative inline-block">
                  Earn Money on Your Own Terms
                  <motion.span
                    className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-[#f44708] to-[#f4470899] rounded-full"
                    initial={{ width: "0%", opacity: 0 }}
                    whileInView={{ width: "100%", opacity: 1 }}
                    viewport={{ once: false, margin: "-50px" }}
                    transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
                  />
                </span>
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Whether you&apos;re a motorcycle rider, car owner, passenger, or have spare time for deliveries, Prawnbox lets you earn income flexibly. Work when you want, where you want.
              </p>
              <motion.div
                className="space-y-6"
                variants={staggerContainer}
              >
                <motion.div
                  className="flex items-start space-x-4"
                  variants={fadeInUp}
                  whileHover={{ x: 10 }}
                  whileTap={{ x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-12 h-12 bg-[#f44708] rounded-full flex items-center justify-center flex-shrink-0">
                    <Zap className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#2f2f2f] mb-2">Set Your Own Rates</h3>
                    <p className="text-gray-600">Bid on deliveries that match your schedule and price expectations.</p>
                  </div>
                </motion.div>
                <motion.div
                  className="flex items-start space-x-4"
                  variants={fadeInUp}
                  whileHover={{ x: 10 }}
                  whileTap={{ x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-12 h-12 bg-[#f44708] rounded-full flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#2f2f2f] mb-2">Weekly Payouts</h3>
                    <p className="text-gray-600">Get paid weekly for completed deliveries with instant wallet withdrawals.</p>
                  </div>
                </motion.div>
                <motion.div
                  className="flex items-start space-x-4"
                  variants={fadeInUp}
                  whileHover={{ x: 10 }}
                  whileTap={{ x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-12 h-12 bg-[#f44708] rounded-full flex items-center justify-center flex-shrink-0">
                    <Star className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#2f2f2f] mb-2">Build Your Reputation</h3>
                    <p className="text-gray-600">Earn ratings and reviews to unlock premium delivery opportunities.</p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
            <motion.div
              className="rounded-2xl overflow-hidden shadow-2xl"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInRight}
            >
              {/* Placeholder for flexible delivery work image */}
              <div className="w-full h-full bg-gradient-to-br from-yellow-200 to-yellow-300 flex items-center justify-center">
                <div className="text-center text-gray-600">
                  <Package size={64} className="mx-auto mb-4" />
                  <p>Flexible Delivery Work</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Support Local Businesses Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="order-2 lg:order-1 rounded-2xl overflow-hidden shadow-2xl"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInLeft}
            >
              {/* Placeholder for small business owner image */}
              <div className="w-full h-full bg-gradient-to-br from-pink-200 to-pink-300 flex items-center justify-center">
                <div className="text-center text-gray-600">
                  <Users size={64} className="mx-auto mb-4" />
                  <p>Small Business Owner</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              className="order-1 lg:order-2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInRight}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#2f2f2f] mb-6">
                <span className="h2-animated-underline relative inline-block">
                  Supporting Nigerian SMEs
                  <motion.span
                    className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-[#f44708] to-[#f4470899] rounded-full"
                    initial={{ width: "0%", opacity: 0 }}
                    whileInView={{ width: "100%", opacity: 1 }}
                    viewport={{ once: false, margin: "-50px" }}
                    transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
                  />
                </span>
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Small and medium businesses are the backbone of Nigeria&apos;s economy. Prawnbox provides affordable, reliable delivery solutions that help local businesses compete and grow.
              </p>
              <motion.ul
                className="space-y-4 mb-8"
                variants={staggerContainer}
              >
                <motion.li
                  className="flex items-start space-x-3"
                  variants={fadeInUp}
                  whileHover={{ x: 10 }}
                  whileTap={{ x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <CheckCircle className="text-[#f44708] flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">Affordable rates for businesses of all sizes</span>
                </motion.li>
                <motion.li
                  className="flex items-start space-x-3"
                  variants={fadeInUp}
                  whileHover={{ x: 10 }}
                  whileTap={{ x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <CheckCircle className="text-[#f44708] flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">Same-day and scheduled delivery options</span>
                </motion.li>
                <motion.li
                  className="flex items-start space-x-3"
                  variants={fadeInUp}
                  whileHover={{ x: 10 }}
                  whileTap={{ x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <CheckCircle className="text-[#f44708] flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">Business accounts with volume discounts</span>
                </motion.li>
                <motion.li
                  className="flex items-start space-x-3"
                  variants={fadeInUp}
                  whileHover={{ x: 10 }}
                  whileTap={{ x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <CheckCircle className="text-[#f44708] flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">Integration with online stores and marketplaces</span>
                </motion.li>
              </motion.ul>
              <motion.button
                onClick={() => onNavigate?.('website-pricing')}
                className="px-6 py-3 bg-[#2f2f2f] text-white font-semibold rounded-xl hover:bg-black transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Business Pricing
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#2f2f2f] to-[#000000] text-white">
        <motion.div
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.h2
            className="text-3xl md:text-5xl font-bold mb-6"
            variants={fadeInUp}
          >
            Ready to Start Delivering?
          </motion.h2>
          <motion.p
            className="text-xl text-gray-300 mb-8"
            variants={fadeInUp}
          >
            Join thousands of Nigerians who trust Prawnbox for their delivery needs.
          </motion.p>
          <motion.button
            onClick={() => onNavigate?.('auth')}
            className="px-8 py-4 bg-[#f44708] text-white text-lg font-semibold rounded-xl hover:bg-[#ff5722] shadow-2xl"
            variants={scaleIn}
            whileHover={{ scale: 1.1, boxShadow: "0 25px 50px -12px rgba(244, 71, 8, 0.5)" }}
            whileTap={{ scale: 0.95 }}
          >
            Create Free Account
            <ArrowRight className="inline ml-2" size={20} />
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
}
