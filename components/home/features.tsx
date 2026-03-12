"use client";

import Animations from "@/lib/animations";
import AppConfig from "@/lib/config";
import { motion } from "framer-motion";
import AnimatedHeading from "../shared/animated-heading";
import { Shield, Zap, Package, Users, TrendingUp, Star } from "lucide-react";

const FEATURES = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Get your items delivered in hours, not days. Our network of Pals ensures quick pickups and deliveries across Nigeria.",
  },
  {
    icon: Shield,
    title: "Secure & Safe",
    description:
      "Escrow payments, verified Pals, and insurance protection. Your packages are always safe with us.",
  },
  {
    icon: Package,
    title: "Track Everything",
    description:
      "Real-time tracking, live updates, and direct chat with your Pal. Always know where your package is.",
  },
  {
    icon: Users,
    title: "Trusted Community",
    description:
      "Join thousands of verified Pals and satisfied customers. Build your reputation and earn trust.",
  },
  {
    icon: TrendingUp,
    title: "Best Prices",
    description:
      "Competitive bidding system ensures you always get the best rates. No hidden fees, transparent pricing.",
  },
  {
    icon: Star,
    title: "Quality Service",
    description:
      "Rated 4.8/5 by our users. We are committed to providing excellent service every single time.",
  },
] as const;

export default function Features() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={AppConfig.VIEWPORT}
          variants={Animations.fadeInUp}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
            <AnimatedHeading>Why Choose Prawnbox?</AnimatedHeading>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience the future of delivery with our innovative platform
            designed for you.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={AppConfig.VIEWPORT}
          variants={Animations.staggerContainer}
        >
          {FEATURES.map((feature, index) => (
            <motion.div
              key={index}
              className="p-8 rounded-2xl bg-gray-50 hover:bg-primary hover:text-white group transition-all duration-300 cursor-pointer"
              variants={Animations.scaleIn}
              whileHover={Animations.cardHover}
            >
              <feature.icon
                size={40}
                className="text-primary group-hover:text-white mb-4 transition-transform duration-300 group-hover:scale-110"
              />
              <h3 className="text-xl font-bold text-dark group-hover:text-white mb-3">
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
  );
}
