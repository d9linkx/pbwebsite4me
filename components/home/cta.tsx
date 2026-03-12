"use client";

import { motion } from "framer-motion";
import AppConfig from "@/lib/config";
import Animations from "@/lib/animations";
import { ArrowRight } from "lucide-react";

export default function CTAs() {
  return (
    <section className="py-20 bg-linear-to-br from-dark to-darkest text-white">
      <motion.div
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={AppConfig.VIEWPORT}
        variants={Animations.staggerContainer}
      >
        <motion.h2
          className="text-3xl md:text-5xl font-bold mb-6"
          variants={Animations.fadeInUp}
        >
          Ready to Start Delivering?
        </motion.h2>
        <motion.p
          className="text-xl text-gray-300 mb-8"
          variants={Animations.fadeInUp}
        >
          Join thousands of Nigerians who trust Prawnbox for their delivery
          needs.
        </motion.p>
        <motion.button
          onClick={() => {
            window.location.href = "https://app.prawnbox.com/register";
          }}
          className="px-8 py-4 bg-primary text-white text-lg font-semibold rounded-xl hover:bg-primary-hover shadow-2xl"
          variants={Animations.scaleIn}
          whileHover={{
            scale: 1.1,
            boxShadow: "0 25px 50px -12px rgba(244, 71, 8, 0.5)",
          }}
          whileTap={{ scale: 0.95 }}
        >
          Create Free Account
          <ArrowRight className="inline ml-2" size={20} />
        </motion.button>
      </motion.div>
    </section>
  );
}
