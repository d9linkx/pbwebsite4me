"use client";

import { motion } from "framer-motion";
import Animations from "@/lib/animations";
import AnimatedHeading from "../shared/animated-heading";
import {
  BarChart3,
  Brain,
  Building2,
  CheckCircle,
  Code,
  Coins,
  Gift,
  Globe,
  GraduationCap,
  Handshake,
  Lock,
  Map,
  Rocket,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export default function RoadMap() {
  return (
    <section className="py-20 bg-linear-to-br from-gray-900 via-darker to-gray-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full filter blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-primary rounded-full filter blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
          variants={Animations.fadeInUp}
        >
          <p className="text-sm font-semibold text-primary mb-2 uppercase tracking-wide">
            Our Journey
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            <AnimatedHeading>Prawnbox Roadmap</AnimatedHeading>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            From concept to nationwide expansion - our journey to transform
            delivery in Nigeria
          </p>
        </motion.div>

        {/* Year-Based Timeline Groups - Collapsible */}
        {/* Vertical Timeline - All Content Visible */}
        <div className="relative">
          {/* Timeline Vertical Line */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 bg-linear-to-b from-primary via-gray-300 to-gray-200"></div>

          {/* Timeline Milestones */}
          <div className="space-y-12 md:space-y-16">
            {/* 2024-2025: Foundation Phase */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-100px" }}
              variants={Animations.fadeInUp}
              className="relative pl-12 md:pl-20"
            >
              {/* Year Badge */}
              <div className="absolute left-0 top-0 w-8 h-8 md:w-12 md:h-12 bg-primary rounded-full border-4 border-white shadow-lg flex items-center justify-center z-10">
                <Rocket className="w-4 h-4 md:w-6 md:h-6 text-white" />
              </div>

              {/* Phase Header */}
              <div className="mb-6">
                <div className="inline-block px-3 py-1 bg-primary/10 rounded-full mb-2">
                  <span className="text-sm font-semibold text-primary">
                    2024-2025
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  Foundation Phase
                </h3>
                <p className="text-gray-300 text-base">
                  Building the groundwork for delivery revolution
                </p>
              </div>

              {/* Milestone Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {/* Market Research */}
                <motion.div
                  variants={Animations.scaleIn}
                  className="group relative"
                >
                  <div className="relative bg-white rounded-xl p-5 md:p-6 border border-gray-200 hover:border-primary transition-all duration-300 hover:shadow-xl">
                    <div className="flex items-start gap-4 mb-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                        <BarChart3 className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold text-primary mb-1">
                          August 2024
                        </div>
                        <h4 className="text-dark font-bold text-base mb-2">
                          Market Research
                        </h4>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Comprehensive market analysis of Nigeria&apos;s delivery
                      landscape, identifying pain points and opportunities in
                      Lagos and beyond.
                    </p>
                  </div>
                </motion.div>

                {/* Company Founding */}
                <motion.div
                  variants={Animations.scaleIn}
                  className="group relative"
                >
                  <div className="relative bg-white rounded-xl p-5 md:p-6 border border-gray-200 hover:border-primary transition-all duration-300 hover:shadow-xl">
                    <div className="flex items-start gap-4 mb-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                        <Rocket className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold text-primary mb-1">
                          October 2024
                        </div>
                        <h4 className="text-dark font-bold text-base mb-2">
                          Company Founding
                        </h4>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Prawnbox Technology Ltd. officially founded by our team of
                      passionate entrepreneurs committed to revolutionizing
                      delivery.
                    </p>
                  </div>
                </motion.div>

                {/* CAC Registration */}
                <motion.div
                  variants={Animations.scaleIn}
                  className="group relative"
                >
                  <div className="relative bg-white rounded-xl p-5 md:p-6 border border-gray-200 hover:border-primary transition-all duration-300 hover:shadow-xl">
                    <div className="flex items-start gap-4 mb-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                        <CheckCircle className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold text-primary mb-1">
                          November 2024
                        </div>
                        <h4 className="text-dark font-bold text-base mb-2">
                          CAC Registration
                        </h4>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Official registration with Corporate Affairs Commission
                      (RC 8179339), establishing Prawnbox as a legitimate
                      Nigerian company.
                    </p>
                  </div>
                </motion.div>

                {/* Business Structuring */}
                <motion.div
                  variants={Animations.scaleIn}
                  className="group relative"
                >
                  <div className="relative bg-white rounded-xl p-5 md:p-6 border border-gray-200 hover:border-primary transition-all duration-300 hover:shadow-xl">
                    <div className="flex items-start gap-4 mb-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                        <Building2 className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold text-primary mb-1">
                          January 2025
                        </div>
                        <h4 className="text-dark font-bold text-base mb-2">
                          Business Structuring
                        </h4>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Finalized business model, legal framework, partnership
                      agreements, and operational structure for sustainable
                      growth.
                    </p>
                  </div>
                </motion.div>

                {/* MVP Development */}
                <motion.div
                  variants={Animations.scaleIn}
                  className="group relative"
                >
                  <div className="relative bg-white rounded-xl p-5 md:p-6 border border-gray-200 hover:border-primary transition-all duration-300 hover:shadow-xl">
                    <div className="flex items-start gap-4 mb-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                        <Code className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold text-primary mb-1">
                          January - June 2025
                        </div>
                        <h4 className="text-dark font-bold text-base mb-2">
                          MVP Development
                        </h4>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Built our first Minimum Viable Product with core features:
                      Pal verification, escrow payments, real-time tracking, and
                      bidding system.
                    </p>
                  </div>
                </motion.div>

                {/* Private MVP Launch */}
                <motion.div
                  variants={Animations.scaleIn}
                  className="group relative"
                >
                  <div className="relative bg-white rounded-xl p-5 md:p-6 border border-gray-200 hover:border-primary transition-all duration-300 hover:shadow-xl">
                    <div className="flex items-start gap-4 mb-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                        <Lock className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold text-primary mb-1">
                          September 2025
                        </div>
                        <h4 className="text-dark font-bold text-base mb-2">
                          Private MVP Launch
                        </h4>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Soft launch to a limited group of early adopters in Lagos
                      and Ibadan for real-world validation and feedback.
                    </p>
                  </div>
                </motion.div>

                {/* Early Bird Registrations */}
                <motion.div
                  variants={Animations.scaleIn}
                  className="group relative"
                >
                  <div className="relative bg-white rounded-xl p-5 md:p-6 border border-gray-200 hover:border-primary transition-all duration-300 hover:shadow-xl">
                    <div className="flex items-start gap-4 mb-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                        <Gift className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold text-primary mb-1">
                          October 2025 to January 2026
                        </div>
                        <h4 className="text-dark font-bold text-base mb-2">
                          Early Bird Registrations
                        </h4>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Building our community! Pre-launch registrations for
                      senders and Pals with exclusive early adopter benefits and
                      discounts.
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
              variants={Animations.fadeInUp}
              className="relative pl-12 md:pl-20"
            >
              {/* Year Badge - Current Phase (Animated) */}
              <div className="absolute left-0 top-0 w-8 h-8 md:w-12 md:h-12 bg-primary rounded-full border-4 border-white shadow-lg flex items-center justify-center z-10">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles className="w-4 h-4 md:w-6 md:h-6 text-white" />
                </motion.div>
              </div>

              {/* Phase Header */}
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary rounded-full mb-2">
                  <span className="text-sm font-semibold text-white">2026</span>
                  <span className="text-xs px-2 py-0.5 bg-white/20 rounded-full text-white">
                    Current
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  Launch & Growth Phase
                </h3>
                <p className="text-gray-300 text-base">
                  Scaling nationwide and expanding features
                </p>
              </div>

              {/* Milestone Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {/* Public Launch - Featured */}
                <motion.div
                  variants={Animations.scaleIn}
                  className="group relative md:col-span-2 lg:col-span-3"
                >
                  <div className="relative bg-linear-to-br from-primary to-primary-hover rounded-xl p-6 md:p-8 border-2 border-white/20 shadow-xl">
                    <div className="flex items-start gap-4 md:gap-6">
                      <div className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-lg flex items-center justify-center shrink-0">
                        <Sparkles className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="text-white/90 text-xs font-semibold mb-1">
                          February 2026
                        </div>
                        <h4 className="text-white font-bold text-lg md:text-xl mb-2">
                          Public Launch
                        </h4>
                        <p className="text-white/90 text-sm md:text-base leading-relaxed mb-4">
                          Official nationwide public launch in Lagos and Ibadan!
                          Full platform access, mass marketing campaign, and
                          onboarding thousands of Pals.
                        </p>
                        <div className="flex flex-wrap gap-3">
                          <div className="bg-white/20 backdrop-blur-sm px-3 py-2 rounded-lg">
                            <div className="text-white text-xs">
                              Expected Users
                            </div>
                            <div className="text-white font-bold">10,000+</div>
                          </div>
                          <div className="bg-white/20 backdrop-blur-sm px-3 py-2 rounded-lg">
                            <div className="text-white text-xs">
                              Active Pals
                            </div>
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
                  variants={Animations.scaleIn}
                  className="group relative"
                >
                  <div className="relative bg-white rounded-xl p-5 md:p-6 border border-gray-200 hover:border-primary transition-all duration-300 hover:shadow-xl">
                    <div className="flex items-start gap-4 mb-3">
                      <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center shrink-0">
                        <Brain className="w-5 h-5 text-purple-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold text-purple-600 mb-1">
                          Q2 2026
                        </div>
                        <h4 className="text-dark font-bold text-base mb-2">
                          AI-Powered Matching
                        </h4>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Launch intelligent Pal-to-delivery matching algorithm
                      using AI to optimize routes, reduce delivery times, and
                      increase Pal earnings.
                    </p>
                  </div>
                </motion.div>

                {/* Corporate Partnerships */}
                <motion.div
                  variants={Animations.scaleIn}
                  className="group relative"
                >
                  <div className="relative bg-white rounded-xl p-5 md:p-6 border border-gray-200 hover:border-primary transition-all duration-300 hover:shadow-xl">
                    <div className="flex items-start gap-4 mb-3">
                      <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center shrink-0">
                        <Handshake className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold text-blue-600 mb-1">
                          Q3 2026
                        </div>
                        <h4 className="text-dark font-bold text-base mb-2">
                          Corporate Partnerships
                        </h4>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Strategic B2B partnerships with e-commerce platforms,
                      restaurants, and retail businesses for bulk delivery
                      contracts.
                    </p>
                  </div>
                </motion.div>

                {/* New Earning Opportunities */}
                <motion.div
                  variants={Animations.scaleIn}
                  className="group relative"
                >
                  <div className="relative bg-white rounded-xl p-5 md:p-6 border border-gray-200 hover:border-primary transition-all duration-300 hover:shadow-xl">
                    <div className="flex items-start gap-4 mb-3">
                      <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center shrink-0">
                        <Coins className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold text-green-600 mb-1">
                          Q4 2026
                        </div>
                        <h4 className="text-dark font-bold text-base mb-2">
                          New Earning Opportunities
                        </h4>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Introducing innovative earning opportunities for everyone
                      - senders and receivers can now earn on the platform
                      through various engagement programs and rewards.
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
              variants={Animations.fadeInUp}
              className="relative pl-12 md:pl-20"
            >
              {/* Year Badge - Future Phase */}
              <div className="absolute left-0 top-0 w-8 h-8 md:w-12 md:h-12 bg-gray-300 rounded-full border-4 border-white shadow-lg flex items-center justify-center z-10">
                <Map className="w-4 h-4 md:w-6 md:h-6 text-gray-600" />
              </div>

              {/* Phase Header */}
              <div className="mb-6">
                <div className="inline-block px-3 py-1 bg-gray-200 rounded-full mb-2">
                  <span className="text-sm font-semibold text-gray-600">
                    2027
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  National Expansion Phase
                </h3>
                <p className="text-gray-300 text-base">
                  Taking Prawnbox across Nigeria
                </p>
              </div>

              {/* Milestone Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {/* Multi-State Expansion */}
                <motion.div
                  variants={Animations.scaleIn}
                  className="group relative"
                >
                  <div className="relative bg-white rounded-xl p-5 md:p-6 border border-gray-200 hover:border-primary transition-all duration-300 hover:shadow-xl">
                    <div className="flex items-start gap-4 mb-3">
                      <div className="w-10 h-10 bg-yellow-500/10 rounded-lg flex items-center justify-center shrink-0">
                        <Map className="w-5 h-5 text-yellow-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold text-yellow-600 mb-1">
                          Q1-Q2 2027
                        </div>
                        <h4 className="text-dark font-bold text-base mb-2">
                          Multi-State Expansion
                        </h4>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Major expansion to Port Harcourt, Abuja, Enugu, Kano, and
                      Calabar - bringing Prawnbox to all major Nigerian cities.
                    </p>
                  </div>
                </motion.div>

                {/* Pal Training Academy */}
                <motion.div
                  variants={Animations.scaleIn}
                  className="group relative"
                >
                  <div className="relative bg-white rounded-xl p-5 md:p-6 border border-gray-200 hover:border-primary transition-all duration-300 hover:shadow-xl">
                    <div className="flex items-start gap-4 mb-3">
                      <div className="w-10 h-10 bg-indigo-500/10 rounded-lg flex items-center justify-center shrink-0">
                        <GraduationCap className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold text-indigo-600 mb-1">
                          Q2 2027
                        </div>
                        <h4 className="text-dark font-bold text-base mb-2">
                          Pal Training Academy
                        </h4>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Launch comprehensive training program for Pals covering
                      customer service, safe handling, route optimization, and
                      professional development.
                    </p>
                  </div>
                </motion.div>

                {/* Electronic Tamper-Proof Security */}
                <motion.div
                  variants={Animations.scaleIn}
                  className="group relative"
                >
                  <div className="relative bg-white rounded-xl p-5 md:p-6 border border-gray-200 hover:border-primary transition-all duration-300 hover:shadow-xl">
                    <div className="flex items-start gap-4 mb-3">
                      <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center shrink-0">
                        <ShieldCheck className="w-5 h-5 text-red-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold text-red-600 mb-1">
                          Q3 2027
                        </div>
                        <h4 className="text-dark font-bold text-base mb-2">
                          Electronic Security
                        </h4>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed mb-2">
                      Revolutionary electronic security system for package
                      protection with tamper-proof tracking technology.
                    </p>
                    <div className="inline-block px-2 py-1 bg-red-50 rounded-md">
                      <p className="text-red-600 text-xs">
                        Subject to earlier launch
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* International Pilot */}
                <motion.div
                  variants={Animations.scaleIn}
                  className="group relative"
                >
                  <div className="relative bg-white rounded-xl p-5 md:p-6 border border-gray-200 hover:border-primary transition-all duration-300 hover:shadow-xl">
                    <div className="flex items-start gap-4 mb-3">
                      <div className="w-10 h-10 bg-teal-500/10 rounded-lg flex items-center justify-center shrink-0">
                        <Globe className="w-5 h-5 text-teal-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold text-teal-600 mb-1">
                          Q4 2027
                        </div>
                        <h4 className="text-dark font-bold text-base mb-2">
                          International Pilot
                        </h4>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Pilot program for cross-border deliveries to Ghana and
                      other West African countries - expanding Prawnbox beyond
                      Nigeria.
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
              variants={Animations.fadeInUp}
              className="relative mt-12 md:mt-16 pl-12 md:pl-20"
            >
              <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                <motion.div
                  className="h-full bg-linear-to-r from-primary to-primary-hover"
                  initial={{ width: "0%" }}
                  whileInView={{ width: "45%" }}
                  viewport={{ once: false }}
                  transition={{ duration: 2, ease: "easeOut" }}
                />
              </div>
              <div className="flex justify-between mt-3 text-sm">
                <span className="text-gray-500">2024</span>
                <span className="text-primary font-bold">2025 Current</span>
                <span className="text-gray-500">2027</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
