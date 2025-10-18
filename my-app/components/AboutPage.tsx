"use client"
import React from 'react';
import { Target, Users, Zap, Heart, Shield, TrendingUp, ArrowRight, Linkedin, BarChart3, Rocket, CheckCircle, Building2, Code, Lock, Gift, Sparkles, Brain, Handshake, Coins, Map, GraduationCap, ShieldCheck, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface AboutPageProps {
  onNavigate?: (screen: string) => void;
}

export function AboutPage({ onNavigate }: AboutPageProps) {

  // Animation variants (compatible with framer-motion v12)
  // Added to make this look cool
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

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#2f2f2f] to-[#1a1a1a] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Transforming Delivery in Nigeria
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              We are building Africa&apos;s most trusted peer-to-peer delivery platform, connecting Nigerians who need to send packages with verified Pals who can deliver them safely and efficiently.
            </p>

            {/* CAC Registration Badge */}
            <div className="mt-8 flex justify-center">
              <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
                <Shield className="text-[#f44708] mr-3" size={20} />
                <div className="text-left">
                  <p className="text-sm font-semibold text-white">
                    Prawnbox Technology Ltd. (the company behind the Prawnbox delivery app)
                  </p>
                  <p className="text-sm text-gray-300">
                    is registered with the Corporate Affairs Commission (CAC) RC 8179339
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section with Image */}
      <section className="py-20 bg-white">
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
                  Our Story
                  <motion.span
                    className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-[#f44708] to-[#f4470899] rounded-full"
                    initial={{ width: "0%", opacity: 0 }}
                    whileInView={{ width: "100%", opacity: 1 }}
                    viewport={{ once: false, margin: "-50px" }}
                    transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
                  />
                </span>
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                Prawnbox was born from a simple frustration: sending packages in Nigeria was expensive, unreliable, and complicated. We saw friends and family struggle with traditional courier services that charged exorbitant fees and often delayed deliveries.
              </p>

              {/* Founder Quote - Friday */}
              <div className="bg-gray-50 border-l-4 border-[#f44708] p-6 mb-4 rounded-r-xl">
                <p className="text-gray-700 italic mb-2">
                  &quot;We realized that millions of Nigerians travel the same routes every day. Why not connect those who need to send packages with those already making the journey? That&apos;s how we can democratize delivery and create opportunities for everyone.&quot;
                </p>
                <p className="text-sm font-semibold text-[#2f2f2f]">
                  — Uchechukwu Friday, Co-founder & Executive Director, Business & Partnership
                </p>
              </div>

              <p className="text-lg text-gray-600 mb-4">
                We envisioned a better way - a community-driven platform where everyday Nigerians could earn money by delivering packages on routes they were already traveling, while senders enjoyed affordable, fast, and transparent delivery services.
              </p>

              {/* Founder Quote - Prince */}
              <div className="bg-gray-50 border-l-4 border-[#f44708] p-6 mb-4 rounded-r-xl">
                <p className="text-gray-700 italic mb-2">
                  &quot;At Prawnbox, we are not just building a delivery platform; we are building trust, one package at a time. Our technology ensures that every stakeholder—sender, receiver, and Pal—has complete transparency and security throughout the delivery journey.&quot;
                </p>
                <p className="text-sm font-semibold text-[#2f2f2f]">
                  — Prince Dike, Co-founder & Executive Director, Product & Marketing
                </p>
              </div>

              <p className="text-lg text-gray-600 mb-4">
                Today, Prawnbox is a registered Nigerian company (CAC RC 8179339) that has successfully launched in Lagos and Ibadan, with active verified Pals serving thousands of customers. We are rapidly expanding to Port Harcourt, Abuja, Enugu, Kano, and Calabar.
              </p>

              <p className="text-lg text-gray-600">
                We are not just a delivery platform; we are a community built on trust, transparency, and mutual support, connecting Nigerians who need to send packages with those already traveling the routes.
              </p>
            </motion.div>
            <motion.div
              className="relative h-96 rounded-2xl overflow-hidden shadow-2xl"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInRight}
            >
              <motion.img
                src="https://images.unsplash.com/photo-1649502913092-fb7f0e8fc632?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxMYWdvcyUyME5pZ2VyaWElMjBjaXR5JTIwc2t5bGluZXxlbnwxfHx8fDE3NjAxMDk2Njh8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Lagos Nigeria Skyline"
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#2f2f2f] mb-4">
              <span className="h2-animated-underline relative inline-block">
                Our Mission & Values
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
              We are driven by a commitment to make delivery accessible, affordable, and reliable for every Nigerian.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {[
              {
                icon: Target,
                title: 'Our Mission',
                description: 'To democratize delivery in Nigeria by connecting communities and empowering individuals to earn while they travel.'
              },
              {
                icon: Shield,
                title: 'Trust First',
                description: 'Every Pal is verified with government-issued ID. Every transaction is protected by secure escrow payments.'
              },
              {
                icon: Heart,
                title: 'Community Driven',
                description: 'We believe in the power of community. Nigerians helping Nigerians, building trust one delivery at a time.'
              },
              {
                icon: Zap,
                title: 'Speed & Efficiency',
                description: 'We leverage technology to make deliveries faster, tracking more transparent, and communication seamless.'
              },
              {
                icon: Users,
                title: 'Fair Compensation',
                description: 'Pals keep 95% of their earnings. We believe in rewarding hard work fairly and transparently.'
              },
              {
                icon: TrendingUp,
                title: 'Continuous Innovation',
                description: 'We are constantly improving our platform based on feedback from our community of senders, Pals, and receivers.'
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                className="p-8 bg-white rounded-2xl shadow-lg cursor-pointer"
                variants={scaleIn}
                whileHover={{ scale: 1.05, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
                transition={{ duration: 0.3 }}
              >
                <value.icon size={40} className="text-[#f44708] mb-4" />
                <h3 className="text-xl font-bold text-[#2f2f2f] mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-[#2f2f2f] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {[
              { number: '10,000+', label: 'Verified Pals' },
              { number: '50,000+', label: 'Deliveries Completed' },
              { number: '4.8/5', label: 'Average Rating' },
              { number: '7 Cities', label: 'Coming Soon' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                variants={scaleIn}
              >
                <div className="text-4xl md:text-5xl font-bold text-[#f44708] mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-300">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Our Reach - City Expansion */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <p className="text-sm font-semibold text-[#f44708] mb-2 uppercase tracking-wide">
              Nationwide Expansion
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2f2f2f] mb-4">
              <span className="h2-animated-underline relative inline-block">
                Our Growing Reach Across Nigeria
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
              Officially registered with CAC (RC 8179339), we&apos;ve launched in key cities and are rapidly expanding nationwide.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {/* Currently Active */}
            <div className="bg-gradient-to-br from-[#f44708] to-[#ff5722] rounded-2xl p-8 text-white shadow-2xl">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                  <Zap className="text-white" size={24} />
                </div>
                <h3 className="text-2xl font-bold">Live Now</h3>
              </div>
              <p className="text-white/90 mb-6">
                We&apos;re actively serving customers with verified Pals in these cities:
              </p>
              <ul className="space-y-3">
                {[
                  { city: 'Lagos', description: 'Nigeria&apos;s commercial hub' },
                  { city: 'Ibadan', description: 'Oyo State capital' }
                ].map((location, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <div>
                      <span className="font-semibold text-lg">{location.city}</span>
                      <p className="text-white/80 text-sm">{location.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Coming Soon */}
            <div className="bg-gray-50 rounded-2xl p-8 border-2 border-gray-200">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-[#2f2f2f] rounded-full flex items-center justify-center mr-4">
                  <TrendingUp className="text-white" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-[#2f2f2f]">Expanding Soon</h3>
              </div>
              <p className="text-gray-600 mb-6">
                We&apos;re bringing Prawnbox to more cities across Nigeria:
              </p>
              <ul className="space-y-3">
                {[
                  { city: 'Port Harcourt', description: 'Rivers State capital' },
                  { city: 'Abuja', description: 'Federal Capital Territory' },
                  { city: 'Enugu', description: 'Coal City' },
                  { city: 'Kano', description: 'Commercial center of the North' },
                  { city: 'Calabar', description: 'Cross River State capital' }
                ].map((location, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-[#f44708] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <div>
                      <span className="font-semibold text-[#2f2f2f]">{location.city}</span>
                      <p className="text-gray-500 text-sm">{location.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Roadmap Section - Next Generation Design */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-[#1a1a1a] to-gray-900 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#f44708] rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#f44708] rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-100px" }}
            variants={fadeInUp}
          >
            <p className="text-sm font-semibold text-[#f44708] mb-2 uppercase tracking-wide">
              Our Journey
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              <span className="h2-animated-underline relative inline-block">
                Prawnbox Roadmap
                <motion.span
                  className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-[#f44708] to-[#f4470899] rounded-full"
                  initial={{ width: "0%", opacity: 0 }}
                  whileInView={{ width: "100%", opacity: 1 }}
                  viewport={{ once: false, margin: "-50px" }}
                  transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
                />
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              From concept to nationwide expansion - our journey to transform delivery in Nigeria
            </p>
          </motion.div>

          {/* Year-Based Timeline Groups - Collapsible */}
          {/* Vertical Timeline - All Content Visible */}
          <div className="relative">
            {/* Timeline Vertical Line */}
            <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#f44708] via-gray-300 to-gray-200"></div>

            {/* Timeline Milestones */}
            <div className="space-y-12 md:space-y-16">
              {/* 2024-2025: Foundation Phase */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: "-100px" }}
                variants={fadeInUp}
                className="relative pl-12 md:pl-20"
              >
                {/* Year Badge */}
                <div className="absolute left-0 top-0 w-8 h-8 md:w-12 md:h-12 bg-[#f44708] rounded-full border-4 border-white shadow-lg flex items-center justify-center z-10">
                  <Rocket className="w-4 h-4 md:w-6 md:h-6 text-white" />
                </div>

                {/* Phase Header */}
                <div className="mb-6">
                  <div className="inline-block px-3 py-1 bg-[#f44708]/10 rounded-full mb-2">
                    <span className="text-sm font-semibold text-[#f44708]">2024-2025</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Foundation Phase</h3>
                  <p className="text-gray-300 text-base">Building the groundwork for delivery revolution</p>
                </div>

                {/* Milestone Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {/* Market Research */}
                  <motion.div
                    variants={scaleIn}
                    className="group relative"
                  >
                    <div className="relative bg-white rounded-xl p-5 md:p-6 border border-gray-200 hover:border-[#f44708] transition-all duration-300 hover:shadow-xl">
                      <div className="flex items-start gap-4 mb-3">
                        <div className="w-10 h-10 bg-[#f44708]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <BarChart3 className="w-5 h-5 text-[#f44708]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-semibold text-[#f44708] mb-1">August 2024</div>
                          <h4 className="text-[#2f2f2f] font-bold text-base mb-2">Market Research</h4>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Comprehensive market analysis of Nigeria&apos;s delivery landscape, identifying pain points and opportunities in Lagos and beyond.
                      </p>
                    </div>
                  </motion.div>

                  {/* Company Founding */}
                  <motion.div
                    variants={scaleIn}
                    className="group relative"
                  >
                    <div className="relative bg-white rounded-xl p-5 md:p-6 border border-gray-200 hover:border-[#f44708] transition-all duration-300 hover:shadow-xl">
                      <div className="flex items-start gap-4 mb-3">
                        <div className="w-10 h-10 bg-[#f44708]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Rocket className="w-5 h-5 text-[#f44708]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-semibold text-[#f44708] mb-1">October 2024</div>
                          <h4 className="text-[#2f2f2f] font-bold text-base mb-2">Company Founding</h4>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Prawnbox Technology Ltd. officially founded by our team of passionate entrepreneurs committed to revolutionizing delivery.
                      </p>
                    </div>
                  </motion.div>

                  {/* CAC Registration */}
                  <motion.div
                    variants={scaleIn}
                    className="group relative"
                  >
                    <div className="relative bg-white rounded-xl p-5 md:p-6 border border-gray-200 hover:border-[#f44708] transition-all duration-300 hover:shadow-xl">
                      <div className="flex items-start gap-4 mb-3">
                        <div className="w-10 h-10 bg-[#f44708]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="w-5 h-5 text-[#f44708]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-semibold text-[#f44708] mb-1">November 2024</div>
                          <h4 className="text-[#2f2f2f] font-bold text-base mb-2">CAC Registration</h4>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Official registration with Corporate Affairs Commission (RC 8179339), establishing Prawnbox as a legitimate Nigerian company.
                      </p>
                    </div>
                  </motion.div>

                  {/* Business Structuring */}
                  <motion.div
                    variants={scaleIn}
                    className="group relative"
                  >
                    <div className="relative bg-white rounded-xl p-5 md:p-6 border border-gray-200 hover:border-[#f44708] transition-all duration-300 hover:shadow-xl">
                      <div className="flex items-start gap-4 mb-3">
                        <div className="w-10 h-10 bg-[#f44708]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Building2 className="w-5 h-5 text-[#f44708]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-semibold text-[#f44708] mb-1">January 2025</div>
                          <h4 className="text-[#2f2f2f] font-bold text-base mb-2">Business Structuring</h4>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Finalized business model, legal framework, partnership agreements, and operational structure for sustainable growth.
                      </p>
                    </div>
                  </motion.div>

                  {/* MVP Development */}
                  <motion.div
                    variants={scaleIn}
                    className="group relative"
                  >
                    <div className="relative bg-white rounded-xl p-5 md:p-6 border border-gray-200 hover:border-[#f44708] transition-all duration-300 hover:shadow-xl">
                      <div className="flex items-start gap-4 mb-3">
                        <div className="w-10 h-10 bg-[#f44708]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Code className="w-5 h-5 text-[#f44708]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-semibold text-[#f44708] mb-1">January - June 2025</div>
                          <h4 className="text-[#2f2f2f] font-bold text-base mb-2">MVP Development</h4>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Built our first Minimum Viable Product with core features: Pal verification, escrow payments, real-time tracking, and bidding system.
                      </p>
                    </div>
                  </motion.div>

                  {/* Private MVP Launch */}
                  <motion.div
                    variants={scaleIn}
                    className="group relative"
                  >
                    <div className="relative bg-white rounded-xl p-5 md:p-6 border border-gray-200 hover:border-[#f44708] transition-all duration-300 hover:shadow-xl">
                      <div className="flex items-start gap-4 mb-3">
                        <div className="w-10 h-10 bg-[#f44708]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Lock className="w-5 h-5 text-[#f44708]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-semibold text-[#f44708] mb-1">September 2025</div>
                          <h4 className="text-[#2f2f2f] font-bold text-base mb-2">Private MVP Launch</h4>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Soft launch to a limited group of early adopters in Lagos and Ibadan for real-world validation and feedback.
                      </p>
                    </div>
                  </motion.div>

                  {/* Early Bird Registrations */}
                  <motion.div
                    variants={scaleIn}
                    className="group relative"
                  >
                    <div className="relative bg-white rounded-xl p-5 md:p-6 border border-gray-200 hover:border-[#f44708] transition-all duration-300 hover:shadow-xl">
                      <div className="flex items-start gap-4 mb-3">
                        <div className="w-10 h-10 bg-[#f44708]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Gift className="w-5 h-5 text-[#f44708]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-semibold text-[#f44708] mb-1">October 2025 to January 2026</div>
                          <h4 className="text-[#2f2f2f] font-bold text-base mb-2">Early Bird Registrations</h4>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Building our community! Pre-launch registrations for senders and Pals with exclusive early adopter benefits and discounts.
                      </p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* 2026: Launch & Growth Phase */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: "-100px" }}
                variants={fadeInUp}
                className="relative pl-12 md:pl-20"
              >
                {/* Year Badge - Current Phase (Animated) */}
                <div className="absolute left-0 top-0 w-8 h-8 md:w-12 md:h-12 bg-[#f44708] rounded-full border-4 border-white shadow-lg flex items-center justify-center z-10">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Sparkles className="w-4 h-4 md:w-6 md:h-6 text-white" />
                  </motion.div>
                </div>

                {/* Phase Header */}
                <div className="mb-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#f44708] rounded-full mb-2">
                    <span className="text-sm font-semibold text-white">2026</span>
                    <span className="text-xs px-2 py-0.5 bg-white/20 rounded-full text-white">Current</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Launch & Growth Phase</h3>
                  <p className="text-gray-300 text-base">Scaling nationwide and expanding features</p>
                </div>

                {/* Milestone Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {/* Public Launch - Featured */}
                  <motion.div
                    variants={scaleIn}
                    className="group relative md:col-span-2 lg:col-span-3"
                  >
                    <div className="relative bg-gradient-to-br from-[#f44708] to-[#ff5722] rounded-xl p-6 md:p-8 border-2 border-white/20 shadow-xl">
                      <div className="flex items-start gap-4 md:gap-6">
                        <div className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                          <Sparkles className="w-6 h-6 md:w-7 md:h-7 text-[#f44708]" />
                        </div>
                        <div className="flex-1">
                          <div className="text-white/90 text-xs font-semibold mb-1">February 2026</div>
                          <h4 className="text-white font-bold text-lg md:text-xl mb-2">Public Launch</h4>
                          <p className="text-white/90 text-sm md:text-base leading-relaxed mb-4">
                            Official nationwide public launch in Lagos and Ibadan! Full platform access, mass marketing campaign, and onboarding thousands of Pals.
                          </p>
                          <div className="flex flex-wrap gap-3">
                            <div className="bg-white/20 backdrop-blur-sm px-3 py-2 rounded-lg">
                              <div className="text-white text-xs">Expected Users</div>
                              <div className="text-white font-bold">10,000+</div>
                            </div>
                            <div className="bg-white/20 backdrop-blur-sm px-3 py-2 rounded-lg">
                              <div className="text-white text-xs">Active Pals</div>
                              <div className="text-white font-bold">2,500+</div>
                            </div>
                            <div className="bg-white/20 backdrop-blur-sm px-3 py-2 rounded-lg">
                              <div className="text-white text-xs">Cities</div>
                              <div className="text-white font-bold">2</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* AI-Powered Matching */}
                  <motion.div
                    variants={scaleIn}
                    className="group relative"
                  >
                    <div className="relative bg-white rounded-xl p-5 md:p-6 border border-gray-200 hover:border-[#f44708] transition-all duration-300 hover:shadow-xl">
                      <div className="flex items-start gap-4 mb-3">
                        <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Brain className="w-5 h-5 text-purple-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-semibold text-purple-600 mb-1">Q2 2026</div>
                          <h4 className="text-[#2f2f2f] font-bold text-base mb-2">AI-Powered Matching</h4>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Launch intelligent Pal-to-delivery matching algorithm using AI to optimize routes, reduce delivery times, and increase Pal earnings.
                      </p>
                    </div>
                  </motion.div>

                  {/* Corporate Partnerships */}
                  <motion.div
                    variants={scaleIn}
                    className="group relative"
                  >
                    <div className="relative bg-white rounded-xl p-5 md:p-6 border border-gray-200 hover:border-[#f44708] transition-all duration-300 hover:shadow-xl">
                      <div className="flex items-start gap-4 mb-3">
                        <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Handshake className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-semibold text-blue-600 mb-1">Q3 2026</div>
                          <h4 className="text-[#2f2f2f] font-bold text-base mb-2">Corporate Partnerships</h4>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Strategic B2B partnerships with e-commerce platforms, restaurants, and retail businesses for bulk delivery contracts.
                      </p>
                    </div>
                  </motion.div>

                  {/* New Earning Opportunities */}
                  <motion.div
                    variants={scaleIn}
                    className="group relative"
                  >
                    <div className="relative bg-white rounded-xl p-5 md:p-6 border border-gray-200 hover:border-[#f44708] transition-all duration-300 hover:shadow-xl">
                      <div className="flex items-start gap-4 mb-3">
                        <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Coins className="w-5 h-5 text-green-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-semibold text-green-600 mb-1">Q4 2026</div>
                          <h4 className="text-[#2f2f2f] font-bold text-base mb-2">New Earning Opportunities</h4>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Introducing innovative earning opportunities for everyone - senders and receivers can now earn on the platform through various engagement programs and rewards.
                      </p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* 2027: Expansion Phase */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: "-100px" }}
                variants={fadeInUp}
                className="relative pl-12 md:pl-20"
              >
                {/* Year Badge - Future Phase */}
                <div className="absolute left-0 top-0 w-8 h-8 md:w-12 md:h-12 bg-gray-300 rounded-full border-4 border-white shadow-lg flex items-center justify-center z-10">
                  <Map className="w-4 h-4 md:w-6 md:h-6 text-gray-600" />
                </div>

                {/* Phase Header */}
                <div className="mb-6">
                  <div className="inline-block px-3 py-1 bg-gray-200 rounded-full mb-2">
                    <span className="text-sm font-semibold text-gray-600">2027</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">National Expansion Phase</h3>
                  <p className="text-gray-300 text-base">Taking Prawnbox across Nigeria</p>
                </div>

                {/* Milestone Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                  {/* Multi-State Expansion */}
                  <motion.div
                    variants={scaleIn}
                    className="group relative"
                  >
                    <div className="relative bg-white rounded-xl p-5 md:p-6 border border-gray-200 hover:border-[#f44708] transition-all duration-300 hover:shadow-xl">
                      <div className="flex items-start gap-4 mb-3">
                        <div className="w-10 h-10 bg-yellow-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Map className="w-5 h-5 text-yellow-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-semibold text-yellow-600 mb-1">Q1-Q2 2027</div>
                          <h4 className="text-[#2f2f2f] font-bold text-base mb-2">Multi-State Expansion</h4>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Major expansion to Port Harcourt, Abuja, Enugu, Kano, and Calabar - bringing Prawnbox to all major Nigerian cities.
                      </p>
                    </div>
                  </motion.div>

                  {/* Pal Training Academy */}
                  <motion.div
                    variants={scaleIn}
                    className="group relative"
                  >
                    <div className="relative bg-white rounded-xl p-5 md:p-6 border border-gray-200 hover:border-[#f44708] transition-all duration-300 hover:shadow-xl">
                      <div className="flex items-start gap-4 mb-3">
                        <div className="w-10 h-10 bg-indigo-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <GraduationCap className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-semibold text-indigo-600 mb-1">Q2 2027</div>
                          <h4 className="text-[#2f2f2f] font-bold text-base mb-2">Pal Training Academy</h4>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Launch comprehensive training program for Pals covering customer service, safe handling, route optimization, and professional development.
                      </p>
                    </div>
                  </motion.div>

                  {/* Electronic Tamper-Proof Security */}
                  <motion.div
                    variants={scaleIn}
                    className="group relative"
                  >
                    <div className="relative bg-white rounded-xl p-5 md:p-6 border border-gray-200 hover:border-[#f44708] transition-all duration-300 hover:shadow-xl">
                      <div className="flex items-start gap-4 mb-3">
                        <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <ShieldCheck className="w-5 h-5 text-red-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-semibold text-red-600 mb-1">Q3 2027</div>
                          <h4 className="text-[#2f2f2f] font-bold text-base mb-2">Electronic Security</h4>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed mb-2">
                        Revolutionary electronic security system for package protection with tamper-proof tracking technology.
                      </p>
                      <div className="inline-block px-2 py-1 bg-red-50 rounded-md">
                        <p className="text-red-600 text-xs">Subject to earlier launch</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* International Pilot */}
                  <motion.div
                    variants={scaleIn}
                    className="group relative"
                  >
                    <div className="relative bg-white rounded-xl p-5 md:p-6 border border-gray-200 hover:border-[#f44708] transition-all duration-300 hover:shadow-xl">
                      <div className="flex items-start gap-4 mb-3">
                        <div className="w-10 h-10 bg-teal-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Globe className="w-5 h-5 text-teal-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-semibold text-teal-600 mb-1">Q4 2027</div>
                          <h4 className="text-[#2f2f2f] font-bold text-base mb-2">International Pilot</h4>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Pilot program for cross-border deliveries to Ghana and other West African countries - expanding Prawnbox beyond Nigeria.
                      </p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Timeline Progress Bar */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: "-100px" }}
                variants={fadeInUp}
                className="relative mt-12 md:mt-16 pl-12 md:pl-20"
              >
                <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#f44708] to-[#ff5722]"
                    initial={{ width: "0%" }}
                    whileInView={{ width: "45%" }}
                    viewport={{ once: false }}
                    transition={{ duration: 2, ease: "easeOut" }}
                  />
                </div>
                <div className="flex justify-between mt-3 text-sm">
                  <span className="text-gray-500">2024</span>
                  <span className="text-[#f44708] font-bold">2025 Current</span>
                  <span className="text-gray-500">2027</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-[#f44708] mb-2 uppercase tracking-wide">
              Built from experience
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2f2f2f] mb-4">
              <span className="h2-animated-underline relative inline-block">
                Meet the Team
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
              Experienced leaders driving innovation in Nigerian logistics
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Uchechukwu FRIDAY',
                role: 'Co-founder/Executive Director, Business & Partnership',
                company: 'Prawnbox',
                linkedin: 'https://www.linkedin.com/in/uchechukwu-friday/',
                initials: 'UF',
                photo: null // Placeholder for team member photos
              },
              {
                name: 'Prince DIKE',
                role: 'Co-founder/Executive Director, Product & Marketing',
                company: 'Prawnbox',
                linkedin: 'https://www.linkedin.com/in/prince-dike/',
                initials: 'PD',
                photo: null // Placeholder for team member photos
              },
              {
                name: 'Laurels ECHICHINWO',
                role: 'Chief Technology Officer (CTO)',
                company: 'Prawnbox',
                linkedin: 'https://www.linkedin.com/in/laurels-ozy-echichinwo/',
                initials: 'LE',
                photo: null // Placeholder for team member photos
              }
            ].map((member, index) => (
              <div
                key={index}
                className="text-center bg-gray-50 rounded-[0px] hover:shadow-xl transition-all duration-300 group relative pt-[7px] pr-[7px] pb-[20px] pl-[7px]"
              >
                {/* Square Image with slight rounding - positioned at top with 99% width */}
                <div className="w-[99%] aspect-square rounded-lg mx-auto mb-4 overflow-hidden group-hover:scale-105 transition-transform duration-300 shadow-lg">
                  {member.photo ? (
                    <Image
                      src={member.photo}
                      alt={member.name}
                      className="w-full h-full object-cover object-center"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#2f2f2f] to-[#1a1a1a] flex items-center justify-center">
                      <span className="text-white text-3xl font-bold">
                        {member.initials}
                      </span>
                    </div>
                  )}
                </div>

                {/* Name with LinkedIn icon beside it */}
                <div className="flex items-center justify-center gap-2 mb-2 px-2">
                  <h3 className="text-xl font-bold text-[#2f2f2f]">
                    {member.name}
                  </h3>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-[#0077b5] hover:text-[#005582] transition-colors duration-200 hover:scale-110"
                    aria-label={`View ${member.name}&apos;s LinkedIn profile`}
                  >
                    <Linkedin size={20} />
                  </a>
                </div>

                {/* Role */}
                <p className="text-gray-600 font-medium text-sm">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#f44708] to-[#ff5722] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Join the Prawnbox Community
          </h2>
          <p className="text-xl mb-8">
            Whether you want to send packages or earn money as a Pal, we are here for you.
          </p>
          <button
            onClick={() => onNavigate?.('auth')}
            className="px-8 py-4 bg-white text-[#f44708] text-lg font-semibold rounded-xl hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-2xl"
          >
            Get Started Today
            <ArrowRight className="inline ml-2" size={20} />
          </button>
        </div>
      </section>
    </div>
  );
}
