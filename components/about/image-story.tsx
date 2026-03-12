"use client";

import { motion } from "framer-motion";
import Animations from "@/lib/animations";
import AppConfig from "@/lib/config";
import AnimatedHeading from "../shared/animated-heading";

export default function ImageStory() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={AppConfig.VIEWPORT}
            variants={Animations.fadeInLeft}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-6">
              <AnimatedHeading>Our Story</AnimatedHeading>
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              Prawnbox was born from a simple frustration: sending packages in
              Nigeria was expensive, unreliable, and complicated. We saw friends
              and family struggle with traditional courier services that charged
              exorbitant fees and often delayed deliveries.
            </p>

            {/* Founder Quote - Friday */}
            <div className="bg-gray-50 border-l-4 border-primary p-6 mb-4 rounded-r-xl">
              <p className="text-gray-700 italic mb-2">
                &quot;We realized that millions of Nigerians travel the same
                routes every day. Why not connect those who need to send
                packages with those already making the journey? That&apos;s how
                we can democratize delivery and create opportunities for
                everyone.&quot;
              </p>
              <p className="text-sm font-semibold text-dark">
                — Uchechukwu Friday, Co-founder & Executive Director, Business &
                Partnership
              </p>
            </div>

            <p className="text-lg text-gray-600 mb-4">
              We envisioned a better way - a community-driven platform where
              everyday Nigerians could earn money by delivering packages on
              routes they were already traveling, while senders enjoyed
              affordable, fast, and transparent delivery services.
            </p>

            {/* Founder Quote - Prince */}
            <div className="bg-gray-50 border-l-4 border-primary p-6 mb-4 rounded-r-xl">
              <p className="text-gray-700 italic mb-2">
                &quot;At Prawnbox, we are not just building a delivery platform;
                we are building trust, one package at a time. Our technology
                ensures that every stakeholder—sender, receiver, and Pal—has
                complete transparency and security throughout the delivery
                journey.&quot;
              </p>
              <p className="text-sm font-semibold text-dark">
                — Prince Dike, Co-founder & Executive Director, Product &
                Marketing
              </p>
            </div>

            <p className="text-lg text-gray-600 mb-4">
              Today, Prawnbox is a registered Nigerian company (CAC RC 8179339)
              that has successfully launched in Lagos and Ibadan, with active
              verified Pals serving thousands of customers. We are rapidly
              expanding to Port Harcourt, Abuja, Enugu, Kano, and Calabar.
            </p>

            <p className="text-lg text-gray-600">
              We are not just a delivery platform; we are a community built on
              trust, transparency, and mutual support, connecting Nigerians who
              need to send packages with those already traveling the routes.
            </p>
          </motion.div>
          <motion.div
            className="relative h-96 rounded-2xl overflow-hidden shadow-2xl"
            initial="hidden"
            whileInView="visible"
            viewport={AppConfig.VIEWPORT}
            variants={Animations.fadeInRight}
          >
            <motion.img
              src="/nigeria-skyline.jpg"
              alt="Lagos Nigeria Skyline"
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
