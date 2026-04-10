"use client";

import Animations from "@/lib/animations";
import { motion } from "framer-motion";
import { ArrowRight, Package } from "lucide-react";
import { useRouter } from "next/navigation";

const STATS = [
  { value: "1k+", label: "Verified Partners (Pals)" },
  { value: "100+", label: "Completed Trades" },
  { value: "4.8★", label: "Average Reviews Rating" },
] as const;

export default function Hero() {
  const router = useRouter();

  return (
    <section className="relative bg-linear-to-br from-dark via-darker to-darkest text-white overflow-hidden min-h-[calc(100vh-5rem)]">
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        aria-hidden
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #f44708 2px, transparent 2px),
                               radial-gradient(circle at 75% 75%, #f44708 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={Animations.fadeInLeft}
            className="px-4"
          >
            <motion.div
              className="inline-flex items-center space-x-2 bg-primary-light px-4 py-2 rounded-full mb-6"
              variants={Animations.scaleIn}
            >
              <Package className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Trusted by 3,000+ Users
              </span>
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
              variants={Animations.fadeInUp}
            >
              Move Items Across Nigeria
            </motion.h1>

            <motion.p
              className="text-xl text-gray-300 mb-8 leading-relaxed"
              variants={Animations.fadeInUp}
            >
              Turn any item into a clear, structured trade. List your item on Prawnbox, someone steps in to execute it properly, and the item gets to the right person without stress.
            </motion.p>

                        <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <motion.button
                onClick={() => {
                  window.location.href = "https://app.prawnbox.com/register";
                }}
                className="group bg-primary text-white px-8 py-4 rounded-xl font-semibold hover:bg-primary-hover transition-all duration-300 shadow-lg hover:shadow-2xl inline-flex items-center justify-start space-x-2"
                variants={Animations.fadeInUp}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>List your item</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.button
                onClick={() => router.push("/send-items")}
                className="group bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 px-8 py-4 rounded-xl font-semibold hover:bg-white/20 hover:border-white/50 transition-all duration-300 shadow-lg inline-flex items-center justify-start space-x-2"
                variants={Animations.fadeInUp}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>See how it works</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>

            {/* Quick Stats */}
            <motion.div
              className="grid grid-cols-3 gap-4 mb-8"
              variants={Animations.staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {STATS.map(({ value, label }) => (
                <motion.div
                  key={label}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center"
                  variants={Animations.scaleIn}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-2xl font-bold text-primary">{value}</div>
                  <div className="text-xs text-gray-300 mt-1">{label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Hero Image — eager load since it's above the fold */}
          <motion.div
            className="relative hidden lg:block"
            initial="hidden"
            animate="visible"
            variants={Animations.fadeInRight}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <motion.img
                src="/woman.jpg"
                alt="Prawnbox delivery Pal with package"
                className="w-full h-125 object-cover object-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
                loading="eager"
                fetchPriority="high"
              />
              <div className="absolute inset-0 bg-linear-to-t from-darkest/60 to-transparent lg:from-darkest/20 lg:to-transparent" />

              <motion.div
                className="absolute bottom-6 left-6 right-6 bg-white rounded-xl p-4 shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">
                      Active Deliveries Today
                    </div>
                    <div className="text-2xl font-bold text-dark">2,847 </div>
                  </div>
                  <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                    +28%
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
