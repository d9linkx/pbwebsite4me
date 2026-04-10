"use client";

import Animations from "@/lib/animations";
import AppConfig from "@/lib/config";
import { motion } from "framer-motion";
import AnimatedHeading from "../shared/animated-heading";
import { ArrowRight } from "lucide-react";

const HOW_STEPS = [
  {
    step: "01",
    title: "List your item",
    description:
      "Add details of the item, include who it is meant for, and choose when you want it completed. At this point, you are simply setting up a trade that needs to be carried out.",
  },
  {
    step: "02",
    title: "We match the trade",
    description:
      "Choose the bid that suits you and we'll automatically assign the verified Pal to step into the trade and complete it. You can also chat in-app with your Pal to coordinate the trade.",
  },
  {
    step: "03",
    title: "Pal completes the trade",
    description:
      "The item is exchanged as planned, and it reaches the Ender (the final buyer). You receive updates along the way, so you stay informed until everything is done.",
  },
] as const;

export default function HowItWorks() {
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
            <AnimatedHeading>How to start a trade</AnimatedHeading>
          </h2>
          <p className="text-xl text-gray-600">Complete a trade in 3 simple steps</p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={AppConfig.VIEWPORT}
          variants={Animations.staggerContainer}
        >
          {HOW_STEPS.map((step, index) => (
            <motion.div
              key={index}
              className="relative"
              variants={Animations.fadeInUp}
            >
              <div className="text-center">
                <motion.div
                  className="inline-block mb-6"
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={AppConfig.VIEWPORT}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <span className="text-6xl font-bold text-primary opacity-20">
                    {step.step}
                  </span>
                </motion.div>
                <h3 className="text-2xl font-bold text-dark mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
              {index < 2 && (
                <motion.div
                  className="hidden md:block absolute top-1/3 right-0 transform translate-x-1/2 w-8"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 0.3, x: 0 }}
                  viewport={AppConfig.VIEWPORT}
                  transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                >
                  <ArrowRight size={32} className="text-primary" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
