"use client";

import { motion } from "framer-motion";
import AppConfig from "@/lib/config";
import Animations from "@/lib/animations";
import AnimatedHeading from "../shared/animated-heading";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const SME_BENEFITS = [
  "Affordable rates for businesses of all sizes",
  "Options for same-day or scheduled completion",
  "Business-friendly pricing structure",
  "Easy to fit into your current sales process",
] as const;

export default function SupportingSMEs() {
  const router = useRouter();

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="order-2 lg:order-1 rounded-2xl overflow-hidden shadow-2xl"
            initial="hidden"
            whileInView="visible"
            viewport={AppConfig.VIEWPORT}
            variants={Animations.fadeInLeft}
          >
            <Image
              src="/business-owner.jpg"
              alt="Small business owner"
              width={500}
              height={500}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </motion.div>
          <motion.div
            className="order-1 lg:order-2"
            initial="hidden"
            whileInView="visible"
            viewport={AppConfig.VIEWPORT}
            variants={Animations.fadeInRight}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-6">
              <AnimatedHeading>Supporting SMEs</AnimatedHeading>
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              For businesses, Prawnbox offers a practical way to ensure items reach customers or partners without unnecessary delays or complications.
            </p>
            <motion.ul
              className="space-y-4 mb-8"
              variants={Animations.staggerContainer}
            >
              {SME_BENEFITS.map((benefit, i) => (
                <motion.li
                  key={i}
                  className="flex items-start space-x-3"
                  variants={Animations.fadeInUp}
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <CheckCircle
                    className="text-primary shrink-0 mt-1"
                    size={20}
                  />
                  <span className="text-gray-700">{benefit}</span>
                </motion.li>
              ))}
            </motion.ul>
            <motion.button
              onClick={() => router.push("/pricing")}
              className="px-6 py-3 bg-dark text-white font-semibold rounded-xl hover:bg-darkest transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Business Pricing
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
