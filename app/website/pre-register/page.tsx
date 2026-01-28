"use client";

import React, { useState } from "react";
import {
  ArrowRight,
  Mail,
  User as UserIcon,
  ArrowLeft,
  Phone,
  MapPin,
  CheckCircle,
  Send,
  Sparkles,
  Package,
  Users,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/utils/apiHooks";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/routes";

export default function PreRegister() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { preRegister, loading } = useAuth();
  const router = useRouter();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (loading) return;
    setError("");
    setSuccess(false);

    // Validate required fields
    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !phoneNumber.trim() ||
      !address.trim()
    ) {
      setError(
        "Please fill in all required fields and select at least one interest",
      );
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (phoneNumber.trim().length < 10) {
      setError("Please enter a valid phone number");
      return;
    }

    try {
      const result = await preRegister({
        firstName,
        lastName,
        email,
        phone: phoneNumber,
        address,
      });

      if (result.success) {
        setSuccess(true);
      } else {
        setError(result.error || "Pre-registration failed");
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    }
  };

  const handleJoinWhatsApp = () => {
    window.open("https://chat.whatsapp.com/JrmYB2rOWA0GhguFEVBoUd", "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col lg:flex-row relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 bg-orange-500 rounded-full opacity-20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 -left-40 w-96 h-96 bg-blue-500 rounded-full opacity-15 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500 rounded-full opacity-10 blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Left Side - Hero Image & Content */}
      <div className="lg:w-1/2 relative z-10 p-8 lg:p-12 flex flex-col justify-center">
        {/* Back Button */}
        <motion.button
          onClick={() => router.push(ROUTES.HOME)}
          className="absolute top-6 left-6 flex items-center space-x-2 text-white/80 hover:text-white transition-colors duration-200"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft size={20} />
          <span className="text-sm font-medium">Back to Home</span>
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-xl mx-auto lg:mx-0"
        >
          {/* Logo */}
          <motion.div
            className="mb-8"
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-2xl">
              <Package size={32} className="text-white" />
            </div>
          </motion.div>

          {/* Hero Text */}
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            Sign up to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
              Deliver Items
            </span>
          </h1>
          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            Be among the first 100 to join the Prawnbox delivery team
          </p>

          {/* Features */}
          <div className="space-y-4 mb-8">
            {[
              {
                icon: Zap,
                text: "Fast job matching & instant delivery requests",
                color: "text-yellow-400",
              },
              {
                icon: Users,
                text: "Join a trusted delivery community",
                color: "text-blue-400",
              },
              {
                icon: Sparkles,
                text: "Early access rewards & priority payouts",
                color: "text-purple-400",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="flex items-center space-x-3"
              >
                <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <feature.icon size={20} className={feature.color} />
                </div>
                <span className="text-gray-200">{feature.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right Side - Registration Form */}
      <div className="lg:w-1/2 relative z-10 p-6 lg:p-12 flex items-center justify-center">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-2xl">
            <AnimatePresence mode="wait">
              {success ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="text-center py-8"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      delay: 0.2,
                      type: "spring",
                      stiffness: 200,
                    }}
                  >
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                      <CheckCircle size={40} className="text-white" />
                    </div>
                  </motion.div>

                  <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-3xl font-bold text-white mb-3"
                  >
                    You&apos;re In! 🎉
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-gray-300 mb-2 text-lg"
                  >
                    Welcome to the Prawnbox delivery family!
                  </motion.p>

                  {/* WhatsApp CTA Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 border-2 border-orange-500/40 rounded-2xl p-6 mb-6 mt-8"
                  >
                    <div className="flex items-center justify-center mb-3">
                      <div className="bg-gradient-to-r from-green-400 to-green-500 rounded-full p-2">
                        <Send size={24} className="text-white" />
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2">
                      🔔 One More Step!
                    </h3>

                    <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                      Join our exclusive WhatsApp community to get:
                    </p>

                    <div className="text-left space-y-2 mb-6">
                      <div className="flex items-start space-x-2">
                        <span className="text-orange-400 mt-0.5">⚡</span>
                        <p className="text-gray-300 text-sm">
                          <strong className="text-white">
                            Instant launch alerts
                          </strong>{" "}
                          - Be the first to know when we go live
                        </p>
                      </div>
                      <div className="flex items-start space-x-2">
                        <span className="text-orange-400 mt-0.5">🎁</span>
                        <p className="text-gray-300 text-sm">
                          <strong className="text-white">
                            Exclusive bonuses
                          </strong>{" "}
                          for early members
                        </p>
                      </div>
                      <div className="flex items-start space-x-2">
                        <span className="text-orange-400 mt-0.5">💬</span>
                        <p className="text-gray-300 text-sm">
                          <strong className="text-white">Direct support</strong>{" "}
                          from the team
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={handleJoinWhatsApp}
                      className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center space-x-2 shadow-xl transition-all duration-200 hover:shadow-2xl hover:scale-[1.03] animate-pulse hover:animate-none"
                    >
                      <Send size={22} />
                      <span>Get Instant Updates 📱</span>
                    </button>
                  </motion.div>

                  {/* Additional Info */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="space-y-3"
                  >
                    <div className="flex items-center justify-center space-x-2 text-gray-400 text-sm">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                      <span>Join delivery partners already in the group</span>
                    </div>

                    <p className="text-gray-500 text-xs">
                      Don&apos;t worry, you can leave anytime. No spam, just
                      value! 🚀
                    </p>
                  </motion.div>
                </motion.div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-white mb-2">
                      Join the Waitlist
                    </h2>
                    <p className="text-gray-400 text-sm">
                      Secure your spot for early access
                    </p>
                  </div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-red-500/20 border border-red-500/30 text-red-300 p-3 rounded-xl text-sm"
                    >
                      <div className="font-semibold mb-1">Error</div>
                      <div>{error}</div>
                    </motion.div>
                  )}

                  <div className="grid md:grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm text-gray-300 mb-2 block font-medium">
                        First Name <span className="text-red-400">*</span>
                      </label>
                      <div className="relative">
                        <UserIcon
                          size={18}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        />
                        <input
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="John"
                          className="w-full pl-11 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-gray-300 mb-2 block font-medium">
                        Last Name <span className="text-red-400">*</span>
                      </label>
                      <div className="relative">
                        <UserIcon
                          size={18}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        />
                        <input
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder="Doe"
                          className="w-full pl-11 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-gray-300 mb-2 block font-medium">
                      Email Address <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <Mail
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full pl-11 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-gray-300 mb-2 block font-medium">
                      Phone Number <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <Phone
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      />
                      <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="+234 123 456 7890"
                        className="w-full pl-11 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-gray-300 mb-2 block font-medium">
                      Address
                    </label>
                    <div className="relative">
                      <MapPin
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      />
                      <input
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="No. 5, Dominion City, Lekki, Lagos."
                        className="w-full pl-11 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all"
                      />
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-orange-500/30 transition-all duration-200"
                    whileHover={{ scale: loading ? 1 : 1.02 }}
                    whileTap={{ scale: loading ? 1 : 0.98 }}
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <span>Join Waitlist</span>
                        <ArrowRight size={20} />
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
