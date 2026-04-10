"use client";

import Animations from "@/lib/animations";
import AppConfig from "@/lib/config";
import { motion } from "framer-motion";
import AnimatedHeading from "../shared/animated-heading";
import { Shield, Zap, Package, Users, TrendingUp, Star } from "lucide-react";

const FEATURES = [
  {
    icon: Zap,
    title: "Fast Execution",
    description:
      "Once a trade is created, a verified Pal (our Trade Partner) steps in to carry it through. Which means most items reach the right person within minutes instead of days.",
  },
  {
    icon: Shield,
    title: "Safe Process",
    description:
      "Every trade is set up from the beginning with clear steps. Everyone involved knows their role, and the process is designed to run smoothly without confusion or uncertainty.",
  },
  {
    icon: Package,
    title: "Full Visibility",
    description:
      "You don't need to keep calling or checking up on both the Pal and the Ender (the prearranged buyer at the end of the trade). You can see updates, so you always know what is happening.",
  },
  {
    icon: Users,
    title: "A Trusted Network",
    description:
      "Everyone (you the Supplier, the Pal, the Ender, and the Proxy) on Prawnbox is verified and rated based on past activity. You work with people who have already built trust on the platform.",
  },
  {
    icon: TrendingUp,
    title: "Transparent Pricing",
    description:
      "Before you list your item, you see exactly what it will cost and can accept the best bid from our trusted Pals. There are no hidden charges or unexpected changes along the way.",
  },
  {
    icon: Star,
    title: "Reliable Experience",
    description:
      "Rated 4.8/5 by our users. Thousands of users use Prawnbox because the system is simple and it works consistently. We are committed to providing excellent service every single time.",
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
            We’ve changed how inventory moves from one person to another.
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
