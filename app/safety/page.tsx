"use client";
import React from "react";
import {
  Shield,
  Lock,
  Eye,
  CheckCircle,
  AlertTriangle,
  Phone,
  FileText,
  Camera,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function SafetyPage() {
  const router = useRouter();

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: {
      opacity: 1,
      x: 0,
    },
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 60 },
    visible: {
      opacity: 1,
      x: 0,
    },
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-dark to-darker text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div>
              <Shield className="w-20 h-20 text-primary mx-auto mb-6" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Your Safety is Our Priority
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Multi-layer security measures to protect every delivery, every
              transaction, and every user on our platform.
            </p>
          </div>
        </div>
      </section>

      {/* Security Features Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {[
              {
                icon: Shield,
                title: "Verified Pals Only",
                description:
                  "Every Pal goes through rigorous background checks with government-issued ID verification before they can accept deliveries.",
              },
              {
                icon: Lock,
                title: "Escrow Protection",
                description:
                  "Your payment is held securely until successful delivery. Pals only get paid when you confirm receipt.",
              },
              {
                icon: Eye,
                title: "Real-Time GPS Tracking",
                description:
                  "Track your package every step of the way with live GPS updates. Always know where your delivery is.",
              },
              {
                icon: Camera,
                title: "Photo Verification",
                description:
                  "Pals take photos at pickup and delivery. Visual proof of package condition at every stage.",
              },
              {
                icon: Phone,
                title: "24/7 Support",
                description:
                  "Our support team is always available to help resolve any issues or answer your questions.",
              },
              {
                icon: FileText,
                title: "Insurance Coverage",
                description:
                  "All deliveries are insured up to package value. Full compensation for damaged or lost items.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="p-8 bg-gray-50 rounded-2xl cursor-pointer shadow-sm hover:shadow-md"
                variants={scaleIn}
                whileHover={{
                  scale: 1.05,
                  y: -10,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                }}
                whileTap={{
                  scale: 1.05,
                  y: -10,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  whileTap={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.6 }}
                >
                  <feature.icon size={48} className="text-primary mb-4" />
                </motion.div>
                <h3 className="text-xl font-bold text-dark mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Verification Process */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
              <span className="h2-animated-underline relative inline-block">
                How We Verify Pals
                <motion.span
                  className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-primary to-[#f4470899] rounded-full"
                  initial={{ width: "0%", opacity: 0 }}
                  whileInView={{ width: "100%", opacity: 1 }}
                  viewport={{ once: false, margin: "-50px" }}
                  transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
                />
              </span>
            </h2>
            <p className="text-xl text-gray-600">
              Strict verification process to ensure quality and safety
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {[
              {
                step: "1",
                title: "ID Verification",
                description:
                  "Government-issued ID with live selfie verification",
              },
              {
                step: "2",
                title: "Background Check",
                description: "Criminal record screening and reference checks",
              },
              {
                step: "3",
                title: "Vehicle Inspection",
                description:
                  "Vehicle registration and roadworthiness certificate",
              },
              {
                step: "4",
                title: "Passenger Verification",
                description:
                  "Special verification process for passengers delivering items",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                className="text-center"
                variants={scaleIn}
              >
                <motion.div
                  className="w-20 h-20 rounded-full bg-primary text-white text-3xl font-bold flex items-center justify-center mx-auto mb-4"
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  whileTap={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.6 }}
                >
                  {step.step}
                </motion.div>
                <h3 className="text-lg font-bold text-dark mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Safety Tips */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Sender Safety Tips */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInLeft}
            >
              <h2 className="text-2xl font-bold text-dark mb-6">
                <span className="h2-animated-underline relative inline-block">
                  Safety Tips for Senders
                  <motion.span
                    className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-primary to-[#f4470899] rounded-full"
                    initial={{ width: "0%", opacity: 0 }}
                    whileInView={{ width: "100%", opacity: 1 }}
                    viewport={{ once: false, margin: "-50px" }}
                    transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
                  />
                </span>
              </h2>
              <ul className="space-y-4">
                {[
                  "Always check Pal ratings and reviews before accepting a bid",
                  "Use clear, accurate item descriptions to avoid disputes",
                  "Take photos of your package before handover",
                  "Meet Pals in well-lit, public locations when possible",
                  "Never include cash or prohibited items in packages",
                  "Report suspicious behavior immediately to support",
                ].map((tip, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle
                      size={20}
                      className="text-primary flex-shrink-0 mt-1"
                    />
                    <span className="text-gray-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Pal Safety Tips */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInRight}
            >
              <h2 className="text-2xl font-bold text-dark mb-6">
                <span className="h2-animated-underline relative inline-block">
                  Safety Tips for Pals
                  <motion.span
                    className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-primary to-[#f4470899] rounded-full"
                    initial={{ width: "0%", opacity: 0 }}
                    whileInView={{ width: "100%", opacity: 1 }}
                    viewport={{ once: false, margin: "-50px" }}
                    transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
                  />
                </span>
              </h2>
              <ul className="space-y-4">
                {[
                  "Verify package contents match description before pickup",
                  "Take photos at pickup and delivery for proof",
                  "Never accept packages that look suspicious or damaged",
                  "Use GPS tracking to share your route with trusted contacts",
                  "Trust your instincts - report unsafe situations",
                  "Keep valuable items secure and out of sight during transport",
                ].map((tip, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle
                      size={20}
                      className="text-primary flex-shrink-0 mt-1"
                    />
                    <span className="text-gray-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Prohibited Items */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="bg-red-50 border-2 border-red-200 rounded-2xl p-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={scaleIn}
          >
            <div className="flex items-center mb-6">
              <AlertTriangle size={32} className="text-red-600 mr-4" />
              <h2 className="text-2xl font-bold text-dark">
                <span className="h2-animated-underline relative inline-block">
                  Prohibited Items
                  <motion.span
                    className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-primary to-[#f4470899] rounded-full"
                    initial={{ width: "0%", opacity: 0 }}
                    whileInView={{ width: "100%", opacity: 1 }}
                    viewport={{ once: false, margin: "-50px" }}
                    transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
                  />
                </span>
              </h2>
            </div>
            <p className="text-gray-700 mb-4">
              For everyone&apos;s safety, the following items are strictly
              prohibited on Prawnbox:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                "Weapons and ammunition",
                "Illegal drugs and substances",
                "Explosives and fireworks",
                "Hazardous materials",
                "Live animals",
                "Perishable food (without proper packaging)",
                "Cash above ₦50,000",
                "Stolen or counterfeit goods",
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <span className="text-red-600 font-bold">✗</span>
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Emergency Support */}
      <section className="py-20 bg-dark text-white">
        <motion.div
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div variants={scaleIn}>
            <Phone className="w-16 h-16 text-primary mx-auto mb-6" />
          </motion.div>
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-6"
            variants={fadeInUp}
          >
            24/7 Emergency Support
          </motion.h2>
          <motion.p className="text-xl text-gray-300 mb-8" variants={fadeInUp}>
            If you ever feel unsafe or encounter an emergency during a delivery,
            contact us immediately.
          </motion.p>
          <motion.div className="space-y-4" variants={staggerContainer}>
            <motion.div variants={scaleIn}>
              <p className="text-gray-400 mb-2">Emergency Hotline</p>
              <p className="text-3xl font-bold text-primary">
                +234 800 EMERGENCY
              </p>
            </motion.div>
            <motion.div variants={scaleIn}>
              <p className="text-gray-400 mb-2">WhatsApp Support</p>
              <p className="text-2xl font-bold">+234 800 PRAWNBOX</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary-hover text-white">
        <motion.div
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.h2
            className="text-3xl md:text-5xl font-bold mb-6"
            variants={fadeInUp}
          >
            Safe, Secure, Reliable
          </motion.h2>
          <motion.p className="text-xl mb-8" variants={fadeInUp}>
            Experience peace of mind with every delivery
          </motion.p>
          <motion.button
            onClick={() => router.push("/pre-register")}
            className="px-8 py-4 bg-white text-primary text-lg font-semibold rounded-xl hover:bg-gray-100 shadow-2xl"
            variants={scaleIn}
            whileHover={{
              scale: 1.1,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started Safely
            <ArrowRight className="inline ml-2" size={20} />
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
}
