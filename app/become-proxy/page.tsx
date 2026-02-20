"use client";

import {
  ArrowRight,
  Store,
  TrendingUp,
  Clock,
  Shield,
  DollarSign,
  MapPin,
  Star,
  Users,
  Package,
  Building,
  Footprints,
  Zap,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function BecomeProxyPage() {
  const router = useRouter();

  const benefits = [
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Earn ₦50,000 - ₦150,000/month",
      description:
        "Get paid for every package stored. No delivery, just secure storage. Earn 100% of storage fees.",
      stat: "₦85k",
      statLabel: "Average Monthly Earnings",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Zero Time Commitment",
      description:
        "Packages are dropped off and picked up at your convenience. No schedules, no pressure.",
      stat: "0 hrs",
      statLabel: "Active Work Required",
    },
    {
      icon: <Store className="w-8 h-8" />,
      title: "Use Your Existing Space",
      description:
        "Turn your shop, office, or home into a secure storage point. No extra equipment needed.",
      stat: "100%",
      statLabel: "Passive Income",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Fully Insured",
      description:
        "All packages are insured. Zero liability for you. We handle all the risk.",
      stat: "₦0",
      statLabel: "Your Risk",
    },
    {
      icon: <Footprints className="w-8 h-8" />,
      title: "Increase Foot Traffic",
      description:
        "Attract more customers to your location as receivers come to pick up their packages. Turn storage into sales opportunities.",
      stat: "+25%",
      statLabel: "More Visitors",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Instant Payout",
      description:
        "Get paid immediately after each package handover. No waiting, no delays. Your earnings hit your wallet instantly.",
      stat: "< 1 min",
      statLabel: "Payment Time",
    },
  ];

  const requirements = [
    {
      icon: <Building className="w-6 h-6" />,
      title: "Physical Location",
      description: "Shop, office, or secure home address",
    },
    {
      icon: <Package className="w-6 h-6" />,
      title: "Storage Space",
      description: "Safe area to store packages securely",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "18+ Years",
      description: "Valid government-issued ID required",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Lagos or Ibadan",
      description: "Currently operating in these cities",
    },
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Sign Up",
      description:
        "Register your location as a Proxy point. Upload photos of your secure storage area.",
      time: "5 mins",
    },
    {
      step: "2",
      title: "Get Verified",
      description:
        "Quick location verification visit. Most Proxies are approved within 48 hours.",
      time: "48 hours",
    },
    {
      step: "3",
      title: "Receive Packages",
      description:
        "Pals drop off packages when receivers aren't available. You simply store them securely.",
      time: "Passive",
    },
    {
      step: "4",
      title: "Hand Over & Earn",
      description:
        "Receiver picks up package. You get paid automatically. That's it!",
      time: "₦₦₦",
    },
  ];

  const testimonials = [
    {
      name: "Mrs. Adebisi Ogunleye",
      role: "Proxy - Yaba, Lagos",
      image: "/adebisi.jpg",
      rating: 5.0,
      quote:
        "My boutique is now a Proxy point. I earn extra ₦90k monthly just for storing packages safely. It's literally free money – no extra work!",
      earnings: "₦90,000/mo",
    },
    {
      name: "Mr. Emeka Nwosu",
      role: "Proxy - Dugbe, Ibadan",
      image: "/emeka.jpg",
      rating: 4.9,
      quote:
        "I run a small electronics shop. Being a Proxy has brought more foot traffic to my store and I earn ₦65k monthly for basically doing nothing.",
      earnings: "₦65,000/mo",
    },
    {
      name: "Alhaji Ibrahim Lawal",
      role: "Proxy - Ikeja, Lagos",
      image: "/lawal.jpg",
      rating: 5.0,
      quote:
        "My provision store is perfect for storing packages. New customers discover my shop when they come to pick up deliveries. Win-win!",
      earnings: "₦120,000/mo",
    },
  ];

  const faqs = [
    {
      question: "Do I need to deliver packages?",
      answer:
        "No! As a Proxy, you only store packages safely. Pals handle all deliveries and pickups.",
    },
    {
      question: "What if a package gets damaged?",
      answer:
        "All packages are fully insured. You have zero liability. Prawnbox handles all claims.",
    },
    {
      question: "How much space do I need?",
      answer:
        "Even a small corner is enough. Most packages are small to medium sized items.",
    },
    {
      question: "When do I get paid?",
      answer:
        "Automatically after each successful handover. Weekly withdrawals available.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-dark via-darker to-darkest text-white overflow-hidden">
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

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-16 lg:pb-32 m-0 pt-14 pr-7 pb-28 pl-7">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-0 p-0 -mx-5 my-0 -mr-3.75 mb-0 -ml-3.75 -mt-7.5 lg:-mt-3.25 lg:-ml-6.25 lg:-mr-6.25">
            <div className="pt-20 pr-0 pb-0 pl-0">
              <div className="inline-flex items-center space-x-2 bg-primary-light px-4 py-2 rounded-full mb-6">
                <Store className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">
                  Join 2,000+ Trusted Proxies
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Become a <span className="text-primary">Proxy</span>
              </h1>

              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Turn your shop, office, or home into passive income. Store
                packages safely and earn up to ₦150,000 monthly with zero active
                work.
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-primary">₦85k</div>
                  <div className="text-xs text-gray-300 mt-1">Avg. Monthly</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-primary">100%</div>
                  <div className="text-xs text-gray-300 mt-1">
                    Your Earnings
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-primary">₦0</div>
                  <div className="text-xs text-gray-300 mt-1">Liability</div>
                </div>
              </div>

              <button
                onClick={() => {
                  window.location.href = "https://app.prawnbox.com/register";
                }}
                className="group bg-primary text-white px-8 py-4 rounded-xl font-semibold hover:bg-primary-hover transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 inline-flex items-center space-x-2"
              >
                <span>Start Earning Passive Income</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <p className="text-sm text-gray-400 mt-4">
                ✓ Zero registration fee ✓ No delivery required ✓ 100% passive
                income
              </p>
            </div>

            {/* Hero Image */}
            <div className="relative hidden lg:block lg:mt-20">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/proxy.jpg"
                  alt="Prawnbox Proxy - Shop owner with smartphone"
                  width={600}
                  height={500}
                  className="w-full h-125 object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-darkest/60 to-transparent lg:from-darkest/20 lg:to-transparent"></div>

                {/* Floating Card */}
                <div className="absolute bottom-6 left-6 right-6 bg-white rounded-xl p-4 shadow-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">
                        This Month&apos;s Passive Income
                      </div>
                      <div className="text-2xl font-bold text-dark">
                        ₦89,500
                      </div>
                    </div>
                    <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                      +42%
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary rounded-full opacity-20 blur-2xl"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary rounded-full opacity-20 blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-dark mb-4">
              Why Become a Prawnbox Proxy?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The easiest way to earn passive income with your existing space
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="flex items-start space-x-4">
                  <div className="shrink-0 w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    {benefit.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-dark mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{benefit.description}</p>
                    <div className="flex items-end space-x-2">
                      <div className="text-3xl font-bold text-primary">
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
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-dark mb-4">
              Simple Requirements
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              All you need to become a Prawnbox Proxy
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {requirements.map((req, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-6 text-center hover:bg-primary/5 transition-colors duration-300 group"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  {req.icon}
                </div>
                <h3 className="font-bold text-dark mb-2">{req.title}</h3>
                <p className="text-sm text-gray-600">{req.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-linear-to-r from-primary/10 to-orange-100 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-dark mb-4">Perfect For:</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                "Retail Shops",
                "Beauty Salons",
                "Phone Repair Shops",
                "Barbershops",
                "Offices",
                "Provision Stores",
                "Pharmacies",
                "Tailors",
              ].map((type, index) => (
                <span
                  key={index}
                  className="bg-white px-4 py-2 rounded-full text-sm font-medium text-dark shadow-sm"
                >
                  {type}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-6">
              ✓ No equipment needed ✓ Free training provided ✓ Start earning in
              48 hours
            </p>
            <button
              onClick={() => {
                window.location.href = "https://app.prawnbox.com/register";
              }}
              className="bg-dark text-white px-8 py-4 rounded-xl font-semibold hover:bg-darkest transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center space-x-2"
            >
              <span>Register Your Location</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-linear-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-dark mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Four simple steps to passive income
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                  {/* Step Number */}
                  <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mb-6 shadow-lg">
                    {step.step}
                  </div>

                  <h3 className="text-xl font-bold text-dark mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{step.description}</p>

                  <div className="inline-flex items-center space-x-2 bg-primary/10 px-3 py-1 rounded-full">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-primary">
                      {step.time}
                    </span>
                  </div>
                </div>

                {/* Connector Line */}
                {index < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-linear-to-r from-primary to-gray-300 transform translate-x-0 -translate-y-1/2"></div>
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
            <h2 className="text-3xl sm:text-4xl font-bold text-dark mb-4">
              Success Stories from Our Proxies
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real Proxies, real passive income, real success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-linear-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Profile */}
                <div className="flex items-center space-x-4 mb-6">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={100}
                    height={100}
                    className="w-16 h-16 rounded-full object-cover border-2 border-primary"
                  />
                  <div>
                    <h4 className="font-bold text-dark">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                    <div className="flex items-center space-x-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < Math.floor(testimonial.rating)
                              ? "text-primary fill-current"
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

                {/* Earnings Badge */}
                <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold inline-flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4" />
                  <span>{testimonial.earnings}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-dark mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-md">
                <h4 className="font-bold text-dark mb-2">{faq.question}</h4>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-linear-to-br from-dark to-darkest text-white relative overflow-hidden">
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
            Ready for Passive Income?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of business owners earning extra income with
            Prawnbox. Zero effort, 100% passive.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <button
              onClick={() => {
                window.location.href = "https://app.prawnbox.com/register";
              }}
              className="group bg-primary text-white px-10 py-5 rounded-xl font-bold text-lg hover:bg-primary-hover transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-105 inline-flex items-center space-x-2 w-full sm:w-auto"
            >
              <span>Sign Up as a Proxy</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => router.push("/contact")}
              className="bg-white text-dark px-10 py-5 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-xl inline-flex items-center space-x-2 w-full sm:w-auto"
            >
              <span>Learn More</span>
            </button>
          </div>

          <p className="text-sm text-gray-400">
            Questions? Call us at{" "}
            <span className="text-primary font-semibold">
              +234 906 870 9992
            </span>{" "}
            or email{" "}
            <span className="text-primary font-semibold">
              info@prawnbox.com
            </span>
          </p>
        </div>
      </section>
    </div>
  );
}
