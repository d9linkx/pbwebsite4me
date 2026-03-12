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
    title: "Built for all senders",
    body: "Send inventory, products, and documents across Nigeria with ease. Focus on growing your business while we handle deliveries.",
    cta: "Start Sending",
    href: "/send-items",
    variants: Animations.fadeInLeft,
    disabled: false,
  },
  {
    src: "/professional.jpeg",
    alt: "Delivery professional",
    title: "Earn as a Delivery Pal",
    body: (
      <>
        Join our network of verified Pals{" "}
        <span className="font-bold">with or without a vehicle</span>. Set your
        own rates, choose your schedule, and build your reputation.
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
    title: "Tamper-Proof Security Tapes",
    body: "Enhanced security for your deliveries with our exclusive tamper-proof tapes. Ensure package integrity from pickup to delivery.",
    cta: "Coming Soon",
    href: null,
    badge: "Coming Soon",
    variants: Animations.fadeInLeft,
    disabled: true,
  },
  {
    src: "/woman-in-a-shop.png",
    alt: "Nigerian woman shop owner",
    title: "Earn as a Proxy Receiver",
    body: "Turn your business location into a secure package hub. Earn storage fees by safely holding deliveries for pickup when receivers are unavailable.",
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
            <AnimatedHeading>Empowering Nigerian Entrepreneurs</AnimatedHeading>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From small business owners to delivery professionals, Prawnbox is
            transforming how Nigerians work and earn.
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
