"use client";
import React, { useState } from "react";
import {
  ArrowRight,
  Mail,
  Lock,
  User as UserIcon,
  ArrowLeft,
  Phone,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "./ui/input";
import { User } from "../types";
import { useRouter } from "next/navigation";
import { useAuth } from "../utils/apiHooks";
import { isValidPassword, isValidUsername } from "@/utils/helpers";
import Image from "next/image";

interface AuthScreenProps {
  onLogin: (user: User) => void;
}

export function AuthScreen({ onLogin }: AuthScreenProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [identifier, setIdentifier] = useState(""); // Can be email or username
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { login, register, loading, error: authError } = useAuth();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (loading) return;
    setError("");

    // Validate required fields for signup
    if (!isLogin) {
      if (
        !firstName.trim() ||
        !lastName.trim() ||
        !userName.trim() ||
        !phoneNumber.trim()
      ) {
        setError("Please fill in all required fields");
        return;
      }
      if (phoneNumber.trim().length < 10) {
        setError("Please enter a valid phone number");
        return;
      }
    }

    if (!identifier.trim() || !password.trim()) {
      setError("Please fill in all required fields");
      return;
    }

    if (!isLogin && !isValidUsername(userName)) {
      setError(
        "Username must only contain letters and numbers and must be between 3 and 30 characters",
      );
      return;
    }

    if (!isLogin && !isValidPassword(password)) {
      setError(
        "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character",
      );
      return;
    }

    try {
      let result;
      if (isLogin) {
        result = await login(identifier, password);
      } else {
        result = await register({
          firstName,
          lastName,
          userName,
          email: identifier, // Use identifier as email for registration
          phone: phoneNumber,
          password,
          role: "pal", // Default role for new users
        });
      }

      if (result.success && result.user) {
        // For registration, show email verification screen first
        if (!isLogin) {
          // Store user data temporarily and navigate to email verification
          localStorage.setItem("pendingUser", JSON.stringify(result.user));
          router.push("/email-verification");
        } else {
          // For login, proceed directly to dashboard
          onLogin(result.user);
          router.push("/dashboard");
        }
      } else {
        setError(
          result.error || (isLogin ? "Login failed" : "Registration failed"),
        );
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    }
  };

  const handleSocialLogin = async (
    provider: string,
    event?: React.MouseEvent,
  ) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (loading) return;
    setError("");

    // For now, show a message that social login is not implemented
    setError(
      `${provider} login is not yet implemented. Please use email/password.`,
    );
    return;
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
            Welcome to Prawnbox
          </h1>
          <p className="text-gray-400">Peer-to-peer delivery made simple</p>
        </motion.div>

        {/* Auth Card */}
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
            {/* Login/Signup Toggle */}
            <div className="flex gap-2 mb-6 bg-white/10 p-1 rounded-2xl">
              <motion.button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-3 rounded-xl font-semibold transition-all flex items-center justify-center ${
                  isLogin
                    ? "bg-primary text-white shadow-lg"
                    : "text-gray-400 hover:text-white"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Login
              </motion.button>
              <motion.button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-3 rounded-xl font-semibold transition-all flex items-center justify-center ${
                  !isLogin
                    ? "bg-primary text-white shadow-lg"
                    : "text-gray-400 hover:text-white"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Sign Up
              </motion.button>
            </div>

            {/* Form */}
            <form onSubmit={handleFormSubmit} className="space-y-4">
              {(error || authError) && (
                <div className="bg-red-500/20 border border-red-500/30 text-red-300 p-3 rounded-xl text-sm">
                  <div className="font-semibold mb-1">
                    {isLogin ? "Login Failed" : "Registration Failed"}
                  </div>
                  <div>{error || authError}</div>
                </div>
              )}

              <AnimatePresence mode="wait">
                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-sm text-gray-400 mb-2 block">
                          First Name
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
                            required={!isLogin}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm text-gray-400 mb-2 block">
                          Last Name
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
                            required={!isLogin}
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm text-gray-400 mb-2 block">
                        Username
                      </label>
                      <div className="relative">
                        <UserIcon
                          size={20}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        />
                        <Input
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                          placeholder="johndoe123"
                          className="pl-12 bg-white/10 border-white/20 text-white placeholder-gray-500 focus:border-primary h-14"
                          required={!isLogin}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm text-gray-400 mb-2 block">
                        Phone Number
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
                          required={!isLogin}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div>
                <label className="text-sm text-gray-400 mb-2 block">
                  {isLogin ? "Email or Username" : "Email Address"}
                </label>
                <div className="relative">
                  <Mail
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <Input
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder={
                      isLogin ? "Enter email or username" : "you@example.com"
                    }
                    className="pl-12 bg-white/10 border-white/20 text-white placeholder-gray-500 focus:border-primary h-14"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-2 block">
                  Password
                </label>
                <div className="relative">
                  <Lock
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pl-12 bg-white/10 border-white/20 text-white placeholder-gray-500 focus:border-primary h-14"
                    required
                    minLength={8}
                  />
                </div>
              </div>

              {isLogin && (
                <div className="text-right">
                  <button
                    type="button"
                    className="text-sm text-primary hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
              )}

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
                    <span>Please wait...</span>
                  </>
                ) : (
                  <>
                    <span>{isLogin ? "Login" : "Create Account"}</span>
                    <ArrowRight size={20} />
                  </>
                )}
              </motion.button>
            </form>

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-1 h-px bg-white/20"></div>
              <span className="px-4 text-sm text-gray-400">
                or continue with
              </span>
              <div className="flex-1 h-px bg-white/20"></div>
            </div>

            {/* Social Login */}
            <div>
              <motion.button
                onClick={(e) => handleSocialLogin("google", e)}
                disabled={loading}
                className="w-full flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white py-3 rounded-xl font-medium disabled:opacity-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span>Google</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
