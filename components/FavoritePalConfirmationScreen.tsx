'use client'
import React, { useEffect } from "react";
import { Heart, Star, CheckCircle, TrendingUp, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface FavoritePalConfirmationScreenProps {
  palName: string;
  palRating: number;
  palDeliveries: number;
  onContinue: (
    agreedPrice: number,
    paymentMethod: "wallet" | "card" | string
  ) => void;
}

export function FavoritePalConfirmationScreen({
  palName,
  palRating,
  palDeliveries,
  onContinue,
}: FavoritePalConfirmationScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      // Default values for the favorite pal flow
      onContinue(1000, "wallet"); // Example values - adjust as needed based on your business logic
    }, 4000);

    return () => clearTimeout(timer);
  }, [onContinue]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark via-darker to-dark flex flex-col items-center justify-center p-6">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 bg-primary rounded-full opacity-20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 -left-40 w-96 h-96 bg-purple-500 rounded-full opacity-15 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-md w-full">
        {/* Success Icon */}
        <motion.div
          className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center mx-auto mb-8"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            duration: 0.8,
            type: "spring",
            stiffness: 200,
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
          >
            <Heart size={64} className="text-white fill-white" />
          </motion.div>
        </motion.div>

        {/* Success Message */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-3xl font-bold text-white mb-3">
            Pal Added to Favorites!
          </h1>
          <p className="text-gray-400 text-lg">
            {palName} is now your favorite Pal
          </p>
        </motion.div>

        {/* Pal Stats */}
        <motion.div
          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-center space-x-8">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 mb-2">
                <Star size={24} className="text-yellow-400 fill-yellow-400" />
                <span className="text-2xl font-bold text-white">
                  {palRating}
                </span>
              </div>
              <p className="text-sm text-gray-400">Rating</p>
            </div>

            <div className="w-px h-16 bg-white/20"></div>

            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 mb-2">
                <CheckCircle size={24} className="text-green-400" />
                <span className="text-2xl font-bold text-white">
                  {palDeliveries}
                </span>
              </div>
              <p className="text-sm text-gray-400">Deliveries</p>
            </div>
          </div>
        </motion.div>

        {/* Benefits */}
        <motion.div
          className="bg-gradient-to-r from-orange-500/20 to-purple-500/20 border border-orange-500/30 rounded-2xl p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h4 className="font-medium text-orange-300 mb-4 flex items-center">
            <TrendingUp size={20} className="mr-2" />
            Benefits of Favorite Pals
          </h4>
          <ul className="text-sm text-orange-200 space-y-2">
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Quick access when posting deliveries</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Priority notifications for your jobs</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Build trust with repeat collaborations</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Faster, more reliable deliveries</span>
            </li>
          </ul>
        </motion.div>

        {/* Continue Button */}
        <motion.button
          onClick={() => onContinue(1000, "wallet")} // Example values - adjust based on your business logic
          className="w-full bg-gradient-to-r from-primary to-primary-hover hover:from-primary-hover hover:to-primary text-white py-4 rounded-xl font-semibold flex items-center justify-center space-x-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <span>Continue</span>
          <ArrowRight size={20} />
        </motion.button>

        <motion.p
          className="text-center text-sm text-gray-500 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          Returning to dashboard in 4 seconds...
        </motion.p>
      </div>
    </div>
  );
}
