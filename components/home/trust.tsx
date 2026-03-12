"use client";

import Animations from "@/lib/animations";
import AppConfig from "@/lib/config";
import { motion } from "framer-motion";
import AnimatedHeading from "../shared/animated-heading";
import { CheckCircle, Shield, Package, Star } from "lucide-react";
import Image from "next/image";

const TRUST_ITEMS = [
  { label: "Verified ID & Background Checks", icon: CheckCircle },
  { label: "Secure Escrow Payments", icon: Shield },
  { label: "Real-time GPS Tracking", icon: Package },
  { label: "Rated & Reviewed Community", icon: Star },
] as const;

export default function Trust() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={AppConfig.VIEWPORT}
            variants={Animations.fadeInLeft}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-6">
              <AnimatedHeading>A Platform Built on Trust</AnimatedHeading>
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Every Pal on Prawnbox goes through a rigorous verification
              process. We prioritize safety, security, and reliability so you
              can have peace of mind with every delivery.
            </p>
            <motion.div
              className="space-y-4"
              variants={Animations.staggerContainer}
            >
              {TRUST_ITEMS.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-3"
                  variants={Animations.fadeInUp}
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <item.icon className="text-primary shrink-0" size={24} />
                  <span className="text-gray-700">{item.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          <motion.div
            className="rounded-2xl overflow-hidden shadow-2xl"
            initial="hidden"
            whileInView="visible"
            viewport={AppConfig.VIEWPORT}
            variants={Animations.fadeInRight}
          >
            <Image
              src="/entrepreneurs.jpg"
              alt="Trust and security"
              width={500}
              height={500}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
