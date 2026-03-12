"use client";

import Animations from "@/lib/animations";
import AppConfig from "@/lib/config";
import { motion } from "framer-motion";
import AnimatedHeading from "../shared/animated-heading";
import Image from "next/image";

export default function CommunityImpact() {
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
              src="/community.jpeg"
              alt="Community marketplace"
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
              <AnimatedHeading>
                Connecting Communities Across Nigeria
              </AnimatedHeading>
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              From Lagos to Abuja, Port Harcourt to Kano, Prawnbox is bringing
              people together through reliable delivery services. We&apos;re not
              just moving packages — we&apos;re building connections.
            </p>
            <motion.div
              className="grid grid-cols-2 gap-6"
              variants={Animations.staggerContainer}
            >
              {[
                { value: "36", label: "States Covered" },
                { value: "100+", label: "Cities & Towns" },
              ].map(({ value, label }) => (
                <motion.div
                  key={label}
                  className="p-6 bg-gray-50 rounded-xl"
                  variants={Animations.scaleIn}
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "#f44708",
                    color: "#ffffff",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-4xl font-bold text-primary mb-2">
                    {value}
                  </p>
                  <p className="text-gray-600">{label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
