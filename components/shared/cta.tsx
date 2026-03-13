"use client";

import { motion } from "framer-motion";
import AppConfig from "@/lib/config";
import Animations from "@/lib/animations";
import { ArrowRight } from "lucide-react";
import { cn } from "../ui/utils";

export default function CTAs({
  title,
  description,
  buttonText,
  buttonUrl,
  accent,
}: {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonUrl?: string;
  accent?: "dark" | "primary";
}) {
  return (
    <section
      className={cn(
        "py-20 bg-linear-to-br text-white",
        accent === "primary"
          ? "from-primary to-primary-hover"
          : "from-dark to-darkest",
      )}
    >
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
          {title || "Ready to Start Delivering?"}
        </motion.h2>
        <motion.p
          className="text-xl text-gray-300 mb-8"
          variants={Animations.fadeInUp}
        >
          {description ||
            "Join thousands of Nigerians who trust Prawnbox for their delivery needs."}
        </motion.p>
        <motion.button
          onClick={() => {
            window.location.href =
              buttonUrl || "https://app.prawnbox.com/register";
          }}
          className={cn(
            "px-8 py-4 text-lg font-semibold rounded-xl shadow-2xl",
            accent === "primary"
              ? "bg-white hover:bg-gray-100 text-primary"
              : "bg-primary text-white hover:bg-primary-hover",
          )}
          variants={Animations.scaleIn}
          whileHover={{
            scale: 1.1,
            boxShadow: `0 25px 50px -12px ${accent === "primary" ? "rgba(0, 0, 0, 0.5)" : "rgba(244, 71, 8, 0.5)"}`,
          }}
          whileTap={{ scale: 0.95 }}
        >
          {buttonText || "Create Free Account"}
          <ArrowRight className="inline ml-2" size={20} />
        </motion.button>
      </motion.div>
    </section>
  );
}
