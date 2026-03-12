"use client";

import { motion } from "framer-motion";
import Animations from "@/lib/animations";
import AppConfig from "@/lib/config";
import AnimatedHeading from "../shared/animated-heading";
import { TrendingUp, Zap } from "lucide-react";

export default function OurReach() {
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
          <p className="text-sm font-semibold text-primary mb-2 uppercase tracking-wide">
            Nationwide Expansion
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
            <AnimatedHeading>Our Growing Reach Across Nigeria</AnimatedHeading>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Officially registered with CAC (RC 8179339), we&apos;ve launched in
            key cities and are rapidly expanding nationwide.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={AppConfig.VIEWPORT}
          variants={Animations.staggerContainer}
        >
          {/* Currently Active */}
          <div className="bg-linear-to-br from-primary to-primary-hover rounded-2xl p-8 text-white shadow-2xl">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                <Zap className="text-white" size={24} />
              </div>
              <h3 className="text-2xl font-bold">Live Now</h3>
            </div>
            <p className="text-white/90 mb-6">
              We&apos;re actively serving customers with verified Pals in these
              cities:
            </p>
            <ul className="space-y-3">
              {[
                {
                  city: "Lagos",
                  description: "Nigeria&apos;s commercial hub",
                },
                { city: "Ibadan", description: "Oyo State capital" },
              ].map((location, index) => (
                <li key={index} className="flex items-start">
                  <div className="w-2 h-2 bg-white rounded-full mt-2 mr-3 shrink-0"></div>
                  <div>
                    <span className="font-semibold text-lg">
                      {location.city}
                    </span>
                    <p className="text-white/80 text-sm">
                      {location.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Coming Soon */}
          <div className="bg-gray-50 rounded-2xl p-8 border-2 border-gray-200">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-dark rounded-full flex items-center justify-center mr-4">
                <TrendingUp className="text-white" size={24} />
              </div>
              <h3 className="text-2xl font-bold text-dark">Expanding Soon</h3>
            </div>
            <p className="text-gray-600 mb-6">
              We&apos;re bringing Prawnbox to more cities across Nigeria:
            </p>
            <ul className="space-y-3">
              {[
                {
                  city: "Port Harcourt",
                  description: "Rivers State capital",
                },
                { city: "Abuja", description: "Federal Capital Territory" },
                { city: "Enugu", description: "Coal City" },
                {
                  city: "Kano",
                  description: "Commercial center of the North",
                },
                { city: "Calabar", description: "Cross River State capital" },
              ].map((location, index) => (
                <li key={index} className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 shrink-0"></div>
                  <div>
                    <span className="font-semibold text-dark">
                      {location.city}
                    </span>
                    <p className="text-gray-500 text-sm">
                      {location.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
