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
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/utils/apiHooks";
import { Input } from "@/components/ui/input";

export default function PreRegister() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [interests, setInterests] = useState<
    ("pal" | "sender" | "receiver" | "proxy")[]
  >([]);
  const [referralCode, setReferralCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const { preRegister, loading } = useAuth();

  const toggleInterest = (
    interest: "pal" | "sender" | "receiver" | "proxy",
  ) => {
    if (interests.includes(interest)) {
      setInterests(interests.filter((i) => i !== interest));
    } else {
      setInterests([...interests, interest]);
    }
  };

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
      interests.length === 0
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
        city: city || undefined,
        state: state || undefined,
        interests,
        referralCode: referralCode || undefined,
      });

      if (result.success) {
        setSuccess(true);
        // Clear form after successful submission
        setTimeout(() => {
          router.push("/");
        }, 3000);
      } else {
        setError(result.error || "Pre-registration failed");
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark via-darker to-dark flex flex-col overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-blue-500 rounded-full opacity-15 blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500 rounded-full opacity-10 blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 relative z-10">
        {/* Back Button */}
        <motion.button
          onClick={() => router.push("/")}
          className="absolute top-6 left-6 z-20 flex items-center space-x-2 text-white/80 hover:text-white transition-colors duration-200"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft size={20} />
          <span className="text-sm font-medium">Back to Home</span>
        </motion.button>

        {/* Logo & Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.button
            onClick={() => router.push("/")}
            className="w-12 h-12 mx-auto mb-4"
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <Image
              src="/P-logo.png"
              alt="Prawnbox"
              width={100}
              height={100}
              className="w-12 h-12 object-contain mx-auto"
            />
          </motion.button>
          <h1 className="text-3xl font-bold text-white mb-2">
            Join the Waitlist
          </h1>
          <p className="text-gray-400">Be the first to know when we launch</p>
        </motion.div>

        {/* Pre-Registration Card */}
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
            <AnimatePresence mode="wait">
              {success ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="text-center py-8"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                  >
                    <CheckCircle
                      size={64}
                      className="text-green-500 mx-auto mb-4"
                    />
                  </motion.div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    You&apos;re on the list!
                  </h2>
                  <p className="text-gray-400 mb-6">
                    We&apos;ll notify you as soon as we launch.
                  </p>
                  <p className="text-sm text-gray-500">
                    Redirecting to home...
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  {error && (
                    <div className="bg-red-500/20 border border-red-500/30 text-red-300 p-3 rounded-xl text-sm">
                      <div className="font-semibold mb-1">Error</div>
                      <div>{error}</div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm text-gray-400 mb-2 block">
                        First Name <span className="text-red-400">*</span>
                      </label>
                      <div className="relative">
                        <UserIcon
                          size={20}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        />
                        <Input
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="John"
                          className="pl-12 bg-white/10 border-white/20 text-white placeholder-gray-500 focus:border-primary h-14"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-gray-400 mb-2 block">
                        Last Name <span className="text-red-400">*</span>
                      </label>
                      <div className="relative">
                        <UserIcon
                          size={20}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        />
                        <Input
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder="Doe"
                          className="pl-12 bg-white/10 border-white/20 text-white placeholder-gray-500 focus:border-primary h-14"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">
                      Email Address <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <Mail
                        size={20}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      />
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="pl-12 bg-white/10 border-white/20 text-white placeholder-gray-500 focus:border-primary h-14"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">
                      Phone Number <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <Phone
                        size={20}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      />
                      <Input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="+234 123 456 7890"
                        className="pl-12 bg-white/10 border-white/20 text-white placeholder-gray-500 focus:border-primary h-14"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm text-gray-400 mb-2 block">
                        City
                      </label>
                      <div className="relative">
                        <MapPin
                          size={20}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        />
                        <Input
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="Lagos"
                          className="pl-12 bg-white/10 border-white/20 text-white placeholder-gray-500 focus:border-primary h-14"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-gray-400 mb-2 block">
                        State
                      </label>
                      <div className="relative">
                        <MapPin
                          size={20}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        />
                        <Input
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                          placeholder="Lagos"
                          className="pl-12 bg-white/10 border-white/20 text-white placeholder-gray-500 focus:border-primary h-14"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">
                      I&apos;m interested as{" "}
                      <span className="text-red-400">*</span>
                    </label>
                    <p className="text-xs text-gray-500 mb-3">
                      Select all that apply
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      <motion.button
                        type="button"
                        onClick={() => toggleInterest("sender")}
                        className={`py-3 px-4 rounded-xl font-semibold transition-all text-sm border-2 ${
                          interests.includes("sender")
                            ? "bg-primary border-primary text-white shadow-lg"
                            : "bg-white/5 border-white/20 text-gray-400 hover:text-white hover:border-white/40"
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Sender
                      </motion.button>
                      <motion.button
                        type="button"
                        onClick={() => toggleInterest("receiver")}
                        className={`py-3 px-4 rounded-xl font-semibold transition-all text-sm border-2 ${
                          interests.includes("receiver")
                            ? "bg-primary border-primary text-white shadow-lg"
                            : "bg-white/5 border-white/20 text-gray-400 hover:text-white hover:border-white/40"
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Receiver
                      </motion.button>
                      <motion.button
                        type="button"
                        onClick={() => toggleInterest("pal")}
                        className={`py-3 px-4 rounded-xl font-semibold transition-all text-sm border-2 ${
                          interests.includes("pal")
                            ? "bg-primary border-primary text-white shadow-lg"
                            : "bg-white/5 border-white/20 text-gray-400 hover:text-white hover:border-white/40"
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Pal
                      </motion.button>
                      <motion.button
                        type="button"
                        onClick={() => toggleInterest("proxy")}
                        className={`py-3 px-4 rounded-xl font-semibold transition-all text-sm border-2 ${
                          interests.includes("proxy")
                            ? "bg-primary border-primary text-white shadow-lg"
                            : "bg-white/5 border-white/20 text-gray-400 hover:text-white hover:border-white/40"
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Proxy
                      </motion.button>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">
                      Referral Code (Optional)
                    </label>
                    <Input
                      value={referralCode}
                      onChange={(e) => setReferralCode(e.target.value)}
                      placeholder="Enter code if you have one"
                      className="bg-white/10 border-white/20 text-white placeholder-gray-500 focus:border-primary h-14"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-primary to-primary-hover hover:from-primary-hover hover:to-primary text-white py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 disabled:opacity-50 shadow-lg"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
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

                  <p className="text-center text-xs text-gray-500 mt-4">
                    Already registered?{" "}
                    <button
                      type="button"
                      onClick={() => router.push("/auth")}
                      className="text-primary hover:underline"
                    >
                      Sign in here
                    </button>
                  </p>
                </form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
