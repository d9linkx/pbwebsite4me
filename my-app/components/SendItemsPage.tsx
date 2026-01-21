"use client";
import React from "react";
import {
  ArrowRight,
  Package,
  TrendingDown,
  Clock,
  Shield,
  Check,
  Star,
  Smartphone,
  ShoppingCart,
  Gift,
  FileText,
  Shirt,
  Utensils,
} from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/routes";
import Image from "next/image";

export function SendItemsPage() {
  const router = useRouter();

  const benefits = [
    {
      icon: <TrendingDown className="w-8 h-8" />,
      title: "Save Up to 60%",
      description:
        "Pay less than traditional couriers. Flexible bidding means you choose the price that works for you.",
      stat: "60%",
      statLabel: "Cost Savings",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Same day or scheduled delivery",
      description:
        "Get your items delivered within hours. No waiting days for packages to arrive.",
      stat: "2-4 hrs",
      statLabel: "Average Delivery Time",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Escrow Protection",
      description:
        "Your payment is secured in escrow until delivery is complete. 100% safe and guaranteed.",
      stat: "100%",
      statLabel: "Payment Protected",
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Real-Time Tracking",
      description:
        "Track your package live on a map. Chat with your Pal anytime. Complete transparency.",
      stat: "Live",
      statLabel: "GPS Tracking",
    },
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Post Your Delivery",
      description:
        "Tell us what you're sending, where it's going, and when you need it delivered. Takes 2 minutes.",
      time: "2 mins",
    },
    {
      step: "2",
      title: "Get Bids from Pals",
      description:
        "Verified Pals bid on your delivery. Choose based on price, rating, and delivery time.",
      time: "5-15 mins",
    },
    {
      step: "3",
      title: "Make Secure Payment",
      description:
        "Pay via wallet, card, or bank transfer. Money held safely in escrow until delivery.",
      time: "Instant",
    },
    {
      step: "4",
      title: "Track & Receive",
      description:
        "Track your package live. Your Pal delivers, you confirm, payment releases automatically.",
      time: "Real-time",
    },
  ];

  const useCases = [
    {
      icon: <ShoppingCart className="w-10 h-10" />,
      title: "Online Shopping",
      description: "Get your marketplace purchases delivered fast and cheap",
      examples: ["Jumia orders", "Jiji items", "Instagram vendors"],
    },
    {
      icon: <Gift className="w-10 h-10" />,
      title: "Gifts & Surprises",
      description: "Send gifts to loved ones anywhere in Lagos or Ibadan",
      examples: ["Birthday gifts", "Anniversary packages", "Care packages"],
    },
    {
      icon: <FileText className="w-10 h-10" />,
      title: "Documents",
      description: "Important papers delivered securely and quickly",
      examples: ["Contracts", "IDs", "Certificates"],
    },
    {
      icon: <Shirt className="w-10 h-10" />,
      title: "Fashion & Clothes",
      description: "Send clothes, shoes, and accessories safely",
      examples: ["Tailor pickups", "Online fashion", "Returns"],
    },
    {
      icon: <Smartphone className="w-10 h-10" />,
      title: "Electronics",
      description: "Phones, laptops, and gadgets delivered with care",
      examples: ["Phone repairs", "Laptop delivery", "Accessories"],
    },
    {
      icon: <Utensils className="w-10 h-10" />,
      title: "Food & Groceries",
      description: "Fresh food delivered quickly to maintain quality",
      examples: ["Home-cooked meals", "Groceries", "Bakery items"],
    },
  ];

  const testimonials = [
    {
      name: "Chioma Nwosu",
      role: "Fashion Designer - Lagos",
      image: "/fashion.jpg",
      rating: 5.0,
      quote:
        "I use Prawnbox daily to deliver clothes to my customers. The bidding system means I always get the best price, and my clients love the same-day delivery!",
      savings: "Saves ₦50,000/month",
    },
    {
      name: "Mr. Femi Adeyemi",
      role: "Entrepreneur - Ibadan",
      image: "/femi-adeyemi.jpg",
      rating: 4.9,
      quote:
        "Prawnbox has been a game-changer for my business. I can send documents and products anywhere in the city within hours. The escrow system gives me peace of mind.",
      savings: "Uses 5x weekly",
    },
    {
      name: "Grace Okafor",
      role: "Student - Lagos",
      image: "/okafor.jpg",
      rating: 5.0,
      quote:
        "As a student, Prawnbox helps me send gifts home to my family without breaking the bank. The prices are unbeatable and tracking is so easy!",
      savings: "Saves 65%",
    },
  ];

  const features = [
    {
      icon: <Check className="w-5 h-5" />,
      text: "No Platform Fees for Senders",
    },
    { icon: <Check className="w-5 h-5" />, text: "Get the best prices" },
    { icon: <Check className="w-5 h-5" />, text: "Live GPS Tracking" },
    { icon: <Check className="w-5 h-5" />, text: "Instant Chat with Pal" },
    { icon: <Check className="w-5 h-5" />, text: "Insurance Included" },
    { icon: <Check className="w-5 h-5" />, text: "Escrow Protection" },
    { icon: <Check className="w-5 h-5" />, text: "Rate Your Experience" },
    { icon: <Check className="w-5 h-5" />, text: "24/7 Customer Support" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#2f2f2f] via-[#1a1a1a] to-black text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, #f44708 2px, transparent 2px),
                             radial-gradient(circle at 75% 75%, #f44708 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
            }}
          ></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-16 lg:pb-32 m-[0px] pt-[56px] pr-[28px] pb-[112px] pl-[28px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-[0px] p-[0px] mx-[-20px] my-[0px] mr-[-15px] mb-[0px] ml-[-15px] mt-[-30px] lg:mt-[-13px] lg:ml-[-25px] lg:mr-[-25px]">
            <div className="pt-[80px] pr-[0px] pb-[0px] pl-[0px]">
              <div className="inline-flex items-center space-x-2 bg-[#f44708]/20 px-4 py-2 rounded-full mb-6">
                <Package className="w-4 h-4 text-[#f44708]" />
                <span className="text-sm font-medium text-[#f44708]">
                  50,000+ Deliveries Completed
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Send Items <span className="text-[#f44708]">Fast & Cheap</span>
              </h1>

              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Nigeria&apos;s smartest way to send packages. Same-day delivery,
                save up to 60%, and track everything live. From ₦1,000 per
                delivery.
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-[#f44708]">
                    ₦1,000
                  </div>
                  <div className="text-xs text-gray-300 mt-1">From</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-[#f44708]">
                    2-4hrs
                  </div>
                  <div className="text-xs text-gray-300 mt-1">
                    Delivery Time
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-[#f44708]">60%</div>
                  <div className="text-xs text-gray-300 mt-1">Savings</div>
                </div>
              </div>

              <button
                onClick={() => router.push(ROUTES.AUTH)}
                className="group bg-[#f44708] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#ff5722] transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 inline-flex items-center space-x-2"
              >
                <span>Send Your First Item</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <p className="text-sm text-gray-400 mt-4">
                ✓ No registration fee ✓ No platform fees ✓ Money-back guarantee
              </p>
            </div>

            {/* Hero Image */}
            <div className="relative sm-hidden lg:mt-[80px]">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/couple.jpg"
                  alt="Prawnbox delivery in Lagos"
                  width={1000}
                  height={600}
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent lg:from-black/20 lg:to-transparent m-[0px] p-[0px]"></div>

                {/* Floating Card */}
                <div className="absolute bottom-6 left-6 right-6 bg-white rounded-xl p-4 shadow-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="text-sm text-gray-600 mb-1">
                        Active Delivery
                      </div>
                      <div className="text-lg font-bold text-[#2f2f2f]">
                        Wedding Dress Package
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Arriving in 15 minutes
                      </div>
                    </div>
                    <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                      On Time
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#f44708] rounded-full opacity-20 blur-2xl"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#f44708] rounded-full opacity-20 blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2f2f2f] mb-4">
              <span className="h2-animated-underline relative inline-block">
                Why Send with Prawnbox?
                <motion.span
                  className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-[#f44708] to-[#f4470899] rounded-full"
                  initial={{ width: "0%", opacity: 0 }}
                  whileInView={{ width: "100%", opacity: 1 }}
                  viewport={{ once: false, margin: "-50px" }}
                  transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
                />
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The smartest, safest, and most affordable way to send packages in
              Nigeria
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-16 h-16 bg-[#f44708]/10 rounded-xl flex items-center justify-center text-[#f44708] group-hover:bg-[#f44708] group-hover:text-white transition-colors duration-300">
                    {benefit.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[#2f2f2f] mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{benefit.description}</p>
                    <div className="flex items-end space-x-2">
                      <div className="text-3xl font-bold text-[#f44708]">
                        {benefit.stat}
                      </div>
                      <div className="text-sm text-gray-500 mb-1">
                        {benefit.statLabel}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Features Grid */}
          <div className="mt-12 bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-[#2f2f2f] mb-6 text-center">
              Everything You Need
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="text-green-600">{feature.icon}</div>
                  <span className="text-sm text-gray-700">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2f2f2f] mb-4">
              <span className="h2-animated-underline relative inline-block">
                What Can You Send?
                <motion.span
                  className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-[#f44708] to-[#f4470899] rounded-full"
                  initial={{ width: "0%", opacity: 0 }}
                  whileInView={{ width: "100%", opacity: 1 }}
                  viewport={{ once: false, margin: "-50px" }}
                  transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
                />
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From documents to electronics, fashion to food – we deliver it all
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
              >
                <div className="text-[#2f2f2f] mb-4">{useCase.icon}</div>
                <h3 className="text-xl font-bold text-[#2f2f2f] mb-2">
                  {useCase.title}
                </h3>
                <p className="text-gray-600 mb-4">{useCase.description}</p>
                <div className="space-y-1">
                  {useCase.examples.map((example, i) => (
                    <div
                      key={i}
                      className="flex items-center space-x-2 text-sm text-gray-500"
                    >
                      <div className="w-1 h-1 bg-[#f44708] rounded-full"></div>
                      <span>{example}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-2 font-medium">And more.</p>
            <p className="text-gray-600 mb-4">
              Not sure if we can deliver your item?{" "}
              <button
                onClick={() => router.push(ROUTES.CONTACT)}
                className="text-[#f44708] font-semibold hover:underline"
              >
                Contact us
              </button>
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2f2f2f] mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Send your first package in 4 simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                  {/* Step Number */}
                  <div className="w-16 h-16 bg-[#f44708] text-white rounded-full flex items-center justify-center text-2xl font-bold mb-6 shadow-lg">
                    {step.step}
                  </div>

                  <h3 className="text-xl font-bold text-[#2f2f2f] mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{step.description}</p>

                  <div className="inline-flex items-center space-x-2 bg-[#f44708]/10 px-3 py-1 rounded-full">
                    <Clock className="w-4 h-4 text-[#f44708]" />
                    <span className="text-sm font-medium text-[#f44708]">
                      {step.time}
                    </span>
                  </div>
                </div>

                {/* Connector Line */}
                {index < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-[#f44708] to-gray-300 transform translate-x-0 -translate-y-1/2"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2f2f2f] mb-4">
              Trusted by Thousands
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See what our senders are saying about Prawnbox
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Profile */}
                <div className="flex items-center space-x-4 mb-6">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={100}
                    height={100}
                    className="w-16 h-16 rounded-full object-cover border-2 border-[#f44708]"
                  />
                  <div>
                    <h4 className="font-bold text-[#2f2f2f]">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                    <div className="flex items-center space-x-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < Math.floor(testimonial.rating)
                              ? "text-[#f44708] fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="text-xs text-gray-600 ml-1">
                        {testimonial.rating}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quote */}
                <p className="text-gray-700 mb-6 italic leading-relaxed">
                  &quot;{testimonial.quote}&quot;
                </p>

                {/* Savings Badge */}
                <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold inline-flex items-center space-x-2">
                  <TrendingDown className="w-4 h-4" />
                  <span>{testimonial.savings}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Comparison */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2f2f2f] mb-4">
              Compare & Save
            </h2>
            <p className="text-xl text-gray-600">
              See how much you can save with Prawnbox
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">
              {/* Traditional Courier */}
              <div className="p-8">
                <h3 className="text-xl font-bold text-gray-400 mb-6 text-center">
                  Traditional Courier
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className="font-bold text-gray-900">
                      ₦4,000 - ₦15,000
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Platform Fee</span>
                    <span className="font-bold text-gray-900">5-10% + VAT</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Same-Day</span>
                    <span className="font-bold text-gray-900">
                      Extra ₦2,000+
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Tracking</span>
                    <span className="font-bold text-gray-900">
                      Premium only
                    </span>
                  </div>
                  <div className="pt-4 border-t">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900">
                        ₦6,000+
                      </div>
                      <div className="text-sm text-gray-600">Average Cost</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Prawnbox */}
              <div className="p-8 bg-gradient-to-br from-[#f44708]/5 to-orange-50">
                <h3 className="text-xl font-bold text-[#f44708] mb-6 text-center">
                  Prawnbox
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Delivery Fee</span>
                    <span className="font-bold text-[#2f2f2f]">
                      From ₦1,000
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Platform Fee</span>
                    <span className="font-bold text-green-600">FREE (₦0)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Same-Day</span>
                    <span className="font-bold text-green-600">Included</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Tracking</span>
                    <span className="font-bold text-green-600">
                      Free Live GPS
                    </span>
                  </div>
                  <div className="pt-4 border-t border-[#f44708]/20">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-[#f44708]">
                        ₦2,000+
                      </div>
                      <div className="text-sm text-gray-600">Average Cost</div>
                      <div className="inline-flex items-center space-x-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold mt-2">
                        <TrendingDown className="w-3 h-3" />
                        <span>Save 60%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#2f2f2f] to-black text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, #f44708 2px, transparent 2px)`,
              backgroundSize: "50px 50px",
            }}
          ></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-5xl font-bold mb-6">
            Ready to Send Smarter?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join 50,000+ happy senders who have switched to Prawnbox. Save
            money, save time, track everything live.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <button
              onClick={() => router.push(ROUTES.AUTH)}
              className="group bg-[#f44708] text-white px-10 py-5 rounded-xl font-bold text-lg hover:bg-[#ff5722] transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-105 inline-flex items-center space-x-2 w-full sm:w-auto"
            >
              <span>Post Your First Delivery</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => router.push(ROUTES.PRICING)}
              className="bg-white text-[#2f2f2f] px-10 py-5 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-xl inline-flex items-center space-x-2 w-full sm:w-auto"
            >
              <span>See Pricing</span>
            </button>
          </div>

          <p className="text-sm text-gray-400">
            Questions? Call us at{" "}
            <span className="text-[#f44708] font-semibold">
              +234 906 870 9992
            </span>{" "}
            or email{" "}
            <span className="text-[#f44708] font-semibold">
              info@prawnbox.com
            </span>
          </p>
        </div>
      </section>
    </div>
  );
}
