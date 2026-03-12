"use client";

import { motion } from "framer-motion";
import AppConfig from "@/lib/config";
import Animations from "@/lib/animations";
import AnimatedHeading from "../shared/animated-heading";
import { Zap, TrendingUp, Star } from "lucide-react";
import Image from "next/image";

const DATA = [
  {
    icon: Zap,
    title: "Set Your Own Rates",
    body: "Bid on deliveries that match your schedule and price expectations.",
  },
  {
    icon: TrendingUp,
    title: "Weekly Payouts",
    body: "Get paid weekly for completed deliveries with instant wallet withdrawals.",
  },
  {
    icon: Star,
    title: "Build Your Reputation",
    body: "Earn ratings and reviews to unlock premium delivery opportunities.",
  },
] as const;

export default function FlexibleEarning() {
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
              <AnimatedHeading>Earn Money on Your Own Terms</AnimatedHeading>
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Whether you&apos;re a motorcycle rider, car owner, passenger, or
              have spare time for deliveries, Prawnbox lets you earn income
              flexibly. Work when you want, where you want.
            </p>
            <motion.div
              className="space-y-6"
              variants={Animations.staggerContainer}
            >
              {DATA.map(({ icon: Icon, title, body }, i) => (
                <motion.div
                  key={i}
                  className="flex items-start space-x-4"
                  variants={Animations.fadeInUp}
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shrink-0">
                    <Icon className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-dark mb-2">{title}</h3>
                    <p className="text-gray-600">{body}</p>
                  </div>
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
              src="/delivery-work.jpeg"
              alt="Flexible delivery work"
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
