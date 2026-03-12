"use client";

import { motion } from "framer-motion";
import Animations from "@/lib/animations";
import AppConfig from "@/lib/config";

const STATS = [
  { number: "10,000+", label: "Verified Pals" },
  { number: "50,000+", label: "Deliveries Completed" },
  { number: "4.8/5", label: "Average Rating" },
  { number: "7 Cities", label: "Coming Soon" },
] as const;

export default function Stats() {
  return (
    <section className="py-20 bg-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={AppConfig.VIEWPORT}
          variants={Animations.staggerContainer}
        >
          {STATS.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              variants={Animations.scaleIn}
            >
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                {stat.number}
              </div>
              <div className="text-gray-300">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
