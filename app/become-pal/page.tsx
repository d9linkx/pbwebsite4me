"use client";

import {
  ArrowRight,
  Package,
  TrendingUp,
  Clock,
  Shield,
  DollarSign,
  MapPin,
  Star,
  Users,
  Smartphone,
  Bike,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function BecomePalPage() {
  const router = useRouter();

  const benefits = [
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Earn ₦80,000 - ₦200,000/month",
      description:
        "Set your own rates and keep 80% of every delivery. Top Pals earn over ₦200k monthly.",
      stat: "₦120k",
      statLabel: "Average Monthly Earnings",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Work on Your Schedule",
      description:
        "Choose when, where, and how much you work. Perfect for students, freelancers, or anyone seeking extra income.",
      stat: "24/7",
      statLabel: "Flexible Hours",
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Instant Payouts",
      description:
        "Get paid instantly after each delivery. Money hits your wallet immediately - withdraw anytime.",
      stat: "Instant",
      statLabel: "Payment Processing",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Insurance Coverage",
      description:
        "All deliveries are insured. Your safety and security are our top priorities.",
      stat: "100%",
      statLabel: "Protected Deliveries",
    },
  ];

  const requirements = [
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Smartphone",
      description: "Android or iOS device with internet",
    },
    {
      icon: <Bike className="w-6 h-6" />,
      title: "Transport",
      description: "Motorcycle, car, or even walking for short distances",
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
        "Create your Pal account in under 5 minutes. Upload your ID and vehicle details.",
      time: "5 mins",
    },
    {
      step: "2",
      title: "Get Verified",
      description:
        "Quick background check and vehicle verification. Most Pals are approved within 24 hours.",
      time: "24 hours",
    },
    {
      step: "3",
      title: "Browse Jobs",
      description:
        "See available deliveries in your area. Choose jobs that match your schedule and route.",
      time: "Instant",
    },
    {
      step: "4",
      title: "Deliver & Earn",
      description:
        "Pick up, deliver, and get paid. Rate senders and build your reputation.",
      time: "₦₦₦",
    },
  ];

  const testimonials = [
    {
      name: "Chidi Okafor",
      role: "Top Pal - Lagos",
      image: "/chidi.jpg",
      rating: 4.9,
      quote:
        "I've been a Pal for 6 months and I'm making more than my previous job. The flexibility is amazing – I work around my classes and still earn ₦150k monthly.",
      earnings: "₦150,000/mo",
    },
    {
      name: "Amina Ibrahim",
      role: "Weekend Pal - Ibadan",
      image: "/ibrahim.jpg",
      rating: 4.8,
      quote:
        "As a working mother, Prawnbox lets me earn extra income on weekends when my kids are with their dad. It's perfect for anyone who needs flexible side income.",
      earnings: "₦80,000/mo",
    },
    {
      name: "Tunde Adeyemi",
      role: "Full-Time Pal - Lagos",
      image: "/tunde.jpg",
      rating: 5.0,
      quote:
        "I quit my 9-5 to become a full-time Pal and I've never looked back. I'm my own boss, earning more, and I love the freedom.",
      earnings: "₦220,000/mo",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-dark via-darker to-darkest text-white overflow-hidden">
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
              <div className="inline-flex items-center space-x-2 bg-primary-light px-4 py-2 rounded-full mb-6">
                <Package className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">
                  Join 5,000+ Active Pals
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Become a <span className="text-primary">Pal</span>
              </h1>

              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Turn your free time into income. Deliver packages, set your own
                schedule, and earn up to ₦200,000 monthly in Lagos and Ibadan.
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-primary">₦120k</div>
                  <div className="text-xs text-gray-300 mt-1">Avg. Monthly</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-primary">80%</div>
                  <div className="text-xs text-gray-300 mt-1">
                    Your Earnings
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-primary">24/7</div>
                  <div className="text-xs text-gray-300 mt-1">Flexibility</div>
                </div>
              </div>

              <button
                onClick={() => router.push("/pre-register")}
                className="group bg-primary text-white px-8 py-4 rounded-xl font-semibold hover:bg-primary-hover transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 inline-flex items-center space-x-2"
              >
                <span>Start Earning Today</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <p className="text-sm text-gray-400 mt-4">
                ✓ No registration fee ✓ Get approved in 24 hours ✓ Start earning
                immediately
              </p>
            </div>

            {/* Hero Image */}
            <div className="relative hidden lg:block lg:mt-[80px]">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/pal.jpg"
                  alt="Prawnbox Pals - Professional delivery team ready to earn"
                  width={500}
                  height={400}
                  className="w-full h-[500px] object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-darkest/60 to-transparent lg:from-darkest/20 lg:to-transparent"></div>

                {/* Floating Card */}
                <div className="absolute bottom-6 left-6 right-6 bg-white rounded-xl p-4 shadow-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">
                        Today&apos;s Earnings
                      </div>
                      <div className="text-2xl font-bold text-dark">
                        ₦12,500
                      </div>
                    </div>
                    <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                      +35%
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
              Why Become a Prawnbox Pal?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join Nigeria&apos;s fastest-growing delivery platform and enjoy
              benefits that put you first.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
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
              All you need to start earning with Prawnbox
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

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-6">
              ✓ No experience required ✓ Free training provided ✓ Start earning
              in 48 hours
            </p>
            <button
              onClick={() => router.push("/pre-register")}
              className="bg-dark text-white px-8 py-4 rounded-xl font-semibold hover:bg-darkest transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center space-x-2"
            >
              <span>Check If You Qualify</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-dark mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From signup to your first delivery in just 4 simple steps
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
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary to-gray-300 transform translate-x-0 -translate-y-1/2"></div>
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
              Success Stories from Our Pals
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real Pals, real earnings, real success
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
                    src={testimonial.image || ""}
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

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-dark to-darkest text-white relative overflow-hidden">
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
            Ready to Start Earning?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of Pals already earning flexible income with
            Prawnbox. Sign up now and get approved in 24 hours.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <button
              onClick={() => router.push("/pre-register")}
              className="group bg-primary text-white px-10 py-5 rounded-xl font-bold text-lg hover:bg-primary-hover transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-105 inline-flex items-center space-x-2 w-full sm:w-auto"
            >
              <span>Sign Up as a Pal</span>
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
