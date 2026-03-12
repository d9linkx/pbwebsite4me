"use client";

import { motion } from "framer-motion";
import Animations from "@/lib/animations";
import AppConfig from "@/lib/config";
import AnimatedHeading from "../shared/animated-heading";
import { Target, Shield, Heart, Zap, Users, TrendingUp } from "lucide-react";

const DATA = [
  {
    icon: Target,
    title: "Our Mission",
    description:
      "To democratize delivery in Nigeria by connecting communities and empowering individuals to earn while they travel.",
  },
  {
    icon: Shield,
    title: "Trust First",
    description:
      "Every Pal is verified with government-issued ID. Every transaction is protected by secure escrow payments.",
  },
  {
    icon: Heart,
    title: "Community Driven",
    description:
      "We believe in the power of community. Nigerians helping Nigerians, building trust one delivery at a time.",
  },
  {
    icon: Zap,
    title: "Speed & Efficiency",
    description:
      "We leverage technology to make deliveries faster, tracking more transparent, and communication seamless.",
  },
  {
    icon: Users,
    title: "Fair Compensation",
    description:
      "Pals keep 95% of their earnings. We believe in rewarding hard work fairly and transparently.",
  },
  {
    icon: TrendingUp,
    title: "Continuous Innovation",
    description:
      "We are constantly improving our platform based on feedback from our community of senders, Pals, and receivers.",
  },
] as const;

export default function MissionAndValues() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={AppConfig.VIEWPORT}
          variants={Animations.fadeInUp}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
            <AnimatedHeading>Our Mission & Values</AnimatedHeading>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We are driven by a commitment to make delivery accessible,
            affordable, and reliable for every Nigerian.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={AppConfig.VIEWPORT}
          variants={Animations.staggerContainer}
        >
          {DATA.map((value, index) => (
            <motion.div
              key={index}
              className="p-8 bg-white rounded-2xl shadow-lg cursor-pointer"
              variants={Animations.scaleIn}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              }}
              transition={{ duration: 0.3 }}
            >
              <value.icon size={40} className="text-primary mb-4" />
              <h3 className="text-xl font-bold text-dark mb-3">
                {value.title}
              </h3>
              <p className="text-gray-600">{value.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
