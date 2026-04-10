"use client";

import Animations from "@/lib/animations";
import AppConfig from "@/lib/config";
import { motion } from "framer-motion";
import AnimatedHeading from "../shared/animated-heading";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const DATA = [
  {
    src: "/city.jpeg",
    alt: "Nigerian entrepreneur",
    title: "Built for your needs",
    body: "Whether personal items or business goods, Prawnbox gives you a simple and more secure way to get it across via a structured trade.",
    cta: "Start a trade",
    href: "/send-items",
    variants: Animations.fadeInLeft,
    disabled: false,
  },
  {
    src: "/professional.jpeg",
    alt: "Delivery professional",
    title: "Earn from your trades",
    body: (
      <>
        Get verified and{" "}
        <span className="font-bold"> bid on trades</span>, carry them through, and earn from completing them. Choose how you move, and when you'll be active.
      </>
    ),
    cta: "Become a Pal",
    href: "/become-pal",
    variants: Animations.fadeInRight,
    disabled: false,
  },
  {
    src: "/tamper-proof-tape.png",
    alt: "Tamper-proof security tape",
    title: "Tamper-roof tapes",
    body: "Additional tools to help keep items protected and intact throughout the process.",
    cta: "Coming Soon",
    href: null,
    badge: "Coming Soon",
    variants: Animations.fadeInLeft,
    disabled: true,
  },
  {
    src: "/woman-in-a-shop.png",
    alt: "Nigerian woman shop owner",
    title: "Earn as a Proxy",
    body: "If you have a shop or a safe space, you can serve as a reliable handover point and earn when trades are completed through your location.",
    cta: "Become a Proxy",
    href: "/become-proxy",
    variants: Animations.fadeInRight,
    disabled: false,
  },
] as const;

export default function Empowerment() {
  const router = useRouter();

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
            <AnimatedHeading>Empowering Nigerians</AnimatedHeading>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Anyone can supply and list an item, become a Pal, or even a Proxy, creating new income opportunities and fostering economic growth across Nigeria.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Card helper — reduces repetition */}
          {DATA.map((card, i) => (
            <motion.div
              key={i}
              className="rounded-2xl overflow-hidden shadow-xl cursor-pointer relative"
              initial="hidden"
              whileInView="visible"
              viewport={AppConfig.VIEWPORT}
              variants={card.variants}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="h-80 overflow-hidden">
                <motion.img
                  src={card.src}
                  alt={card.alt}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                  loading="lazy"
                />
                {"badge" in card && card.badge && (
                  <div className="absolute top-4 right-4 bg-primary text-white px-4 py-2 rounded-full shadow-lg">
                    <span className="font-semibold text-sm">{card.badge}</span>
                  </div>
                )}
              </div>
              <div className="p-8 bg-gray-50">
                <h3 className="text-2xl font-bold text-dark mb-3">
                  {card.title}
                </h3>
                <p className="text-gray-600 mb-4">{card.body}</p>
                {card.disabled ? (
                  <span className="text-gray-400 font-semibold flex items-center cursor-not-allowed">
                    {card.cta} <ArrowRight className="ml-2" size={18} />
                  </span>
                ) : (
                  <motion.button
                    onClick={() => card.href && router.push(card.href)}
                    className="text-primary font-semibold hover:underline flex items-center"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {card.cta} <ArrowRight className="ml-2" size={18} />
                  </motion.button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
