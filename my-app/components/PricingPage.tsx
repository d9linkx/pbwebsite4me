import React, { useState } from 'react';
import { Check, X, ArrowRight, Calculator, TrendingDown, Shield, Package, DollarSign, Truck } from 'lucide-react';
import { motion } from 'framer-motion';

interface PricingPageProps {
  onNavigate?: (screen: string) => void;
}

export function PricingPage({ onNavigate }: PricingPageProps) {
  const [palBid, setPalBid] = useState(3000);
  const [hasProxyFee, setHasProxyFee] = useState(false);
  const [proxyFee, setProxyFee] = useState(1000);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  // Pals keep 80% of their accepted bid
  const palEarnings = palBid * 0.80;
  const platformFeeFromPal = palBid * 0.20;

  // Sender pays only the bid amount + proxy fee (if receiver is unavailable)
  const totalSenderPays = palBid + (hasProxyFee ? proxyFee : 0);

  return (
    <div className="pt-20">
      {/* Hero Section with Background Image */}
      <section className="relative bg-gradient-to-br from-[#2f2f2f] to-[#1a1a1a] text-white py-20 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1659484789150-7d9e164cf8a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxOaWdlcmlhJTIwZGVsaXZlcnklMjBtb3RvcmN5Y2xlJTIwcmlkZXJ8ZW58MXx8fHwxNzYwMTEyNDE2fDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Nigerian delivery rider"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#2f2f2f] via-[#2f2f2f]/80 to-[#1a1a1a]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Transparent Pricing
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              No hidden fees. No surprises. Just fair, transparent pricing for everyone in Nigeria.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Calculator */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <Calculator className="w-16 h-16 text-[#f44708] mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-[#2f2f2f] mb-4">
              <span className="h2-animated-underline relative inline-block">
                Pricing Calculator
                <motion.span
                  className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-[#f44708] to-[#f4470899] rounded-full"
                  initial={{ width: "0%", opacity: 0 }}
                  whileInView={{ width: "100%", opacity: 1 }}
                  viewport={{ once: false, margin: "-50px" }}
                  transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
                />
              </span>
            </h2>
            <p className="text-xl text-gray-600">
              See exactly what you will pay or earn
            </p>
          </motion.div>

          <motion.div
            className="bg-gray-50 p-8 rounded-2xl shadow-lg"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={scaleIn}
          >
            {/* Input Fields */}
            <div className="space-y-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-[#2f2f2f] mb-2">
                  Accepted Pal Bid (₦)
                </label>
                <input
                  type="number"
                  value={palBid}
                  onChange={(e) => setPalBid(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#f44708] focus:ring-2 focus:ring-[#f44708]/20 outline-none"
                />
                <p className="text-xs text-gray-500 mt-1">This is the delivery fee you agreed to pay</p>
              </div>

              <div>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasProxyFee}
                    onChange={(e) => setHasProxyFee(e.target.checked)}
                    className="w-5 h-5 text-[#f44708] rounded border-gray-300 focus:ring-[#f44708]"
                  />
                  <span className="text-sm font-medium text-[#2f2f2f]">
                    Receiver unavailable (Proxy needed)
                  </span>
                </label>
              </div>

              {hasProxyFee && (
                <div>
                  <label className="block text-sm font-medium text-[#2f2f2f] mb-2">
                    Emergency Proxy Fee (₦)
                  </label>
                  <input
                    type="number"
                    value={proxyFee}
                    onChange={(e) => setProxyFee(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#f44708] focus:ring-2 focus:ring-[#f44708]/20 outline-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">Paid upfront, earned by Proxy if receiver doesn&apos;t show up. Returns to your wallet if receiver picks it up from Pal.</p>
                </div>
              )}
            </div>

            {/* Calculation Results */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {/* Sender Breakdown */}
              <motion.div
                className="bg-white p-6 rounded-xl border-2 border-[#f44708]"
                variants={scaleIn}
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px -12px rgba(244, 71, 8, 0.3)" }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-bold text-[#2f2f2f] mb-4 flex items-center">
                  <Package className="mr-2" size={20} />
                  Sender Pays
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Fee (Bid):</span>
                    <span className="font-semibold">₦{palBid.toLocaleString()}</span>
                  </div>
                  {hasProxyFee && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Proxy Emergency Fee:</span>
                      <span className="font-semibold">₦{proxyFee.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-green-600">
                    <span className="font-medium">Platform Fee:</span>
                    <span className="font-semibold">₦0 (FREE!)</span>
                  </div>
                  <div className="border-t-2 border-gray-200 pt-3 flex justify-between">
                    <span className="font-bold text-[#2f2f2f]">Total in Escrow:</span>
                    <span className="font-bold text-[#f44708] text-xl">₦{totalSenderPays.toLocaleString()}</span>
                  </div>
                  <p className="text-xs text-gray-500 italic mt-2">
                    ✓ Funds held safely in escrow until delivery complete
                  </p>
                </div>
              </motion.div>

              {/* Pal Earnings */}
              <motion.div
                className="bg-white p-6 rounded-xl border-2 border-[#2f2f2f]"
                variants={scaleIn}
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px -12px rgba(47, 47, 47, 0.3)" }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-bold text-[#2f2f2f] mb-4 flex items-center">
                  <Truck className="mr-2" size={20} />
                  Pal Earns
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Bid Amount:</span>
                    <span className="font-semibold">₦{palBid.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Platform Fee (20%):</span>
                    <span className="font-semibold text-red-600">-₦{platformFeeFromPal.toLocaleString()}</span>
                  </div>
                  <div className="border-t-2 border-gray-200 pt-3 flex justify-between">
                    <span className="font-bold text-[#2f2f2f]">You Keep (80%):</span>
                    <span className="font-bold text-[#f44708] text-xl">₦{palEarnings.toLocaleString()}</span>
                  </div>
                  <p className="text-xs text-gray-500 italic mt-2">
                    ✓ Released from escrow after successful delivery
                  </p>
                </div>
              </motion.div>

              {/* Proxy Earnings */}
              <motion.div
                className="bg-white p-6 rounded-xl border-2 border-gray-300"
                variants={scaleIn}
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.2)" }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-bold text-[#2f2f2f] mb-4 flex items-center">
                  <DollarSign className="mr-2" size={20} />
                  Proxy Earns
                </h3>
                <div className="space-y-3">
                  {hasProxyFee ? (
                    <>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Emergency Fee:</span>
                        <span className="font-semibold">₦{proxyFee.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-green-600">
                        <span className="font-medium">Platform Fee:</span>
                        <span className="font-semibold">₦0 (FREE!)</span>
                      </div>
                      <div className="border-t-2 border-gray-200 pt-3 flex justify-between">
                        <span className="font-bold text-[#2f2f2f]">You Keep (100%):</span>
                        <span className="font-bold text-[#f44708] text-xl">₦{proxyFee.toLocaleString()}</span>
                      </div>
                      <p className="text-xs text-gray-500 italic mt-2">
                        ✓ Earned when receiver doesn&apos;t show up
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="text-center py-4">
                        <p className="text-gray-500 text-sm">
                          Emergency fee only applies when receiver is unavailable
                        </p>
                      </div>
                      <div className="border-t-2 border-gray-200 pt-3 flex justify-between">
                        <span className="font-bold text-[#2f2f2f]">Typical Range:</span>
                        <span className="font-bold text-[#f44708]">₦500-₦2,000</span>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            </motion.div>

            {/* Key Points Banner */}
            <div className="mt-6 bg-[#f44708]/10 border-2 border-[#f44708] rounded-xl p-4">
              <h4 className="font-bold text-[#2f2f2f] mb-3 flex items-center">
                <Shield className="mr-2 text-[#f44708]" size={20} />
                How Payment Works
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-start space-x-2">
                  <Check className="text-[#f44708] flex-shrink-0 mt-0.5" size={16} />
                  <p className="text-gray-700">
                    <span className="font-semibold">Senders:</span> Pay only the bid + proxy fee (if needed). Money locked in escrow.
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <Check className="text-[#f44708] flex-shrink-0 mt-0.5" size={16} />
                  <p className="text-gray-700">
                    <span className="font-semibold">Pals:</span> Receive 80% of bid after successful delivery from escrow.
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <Check className="text-[#f44708] flex-shrink-0 mt-0.5" size={16} />
                  <p className="text-gray-700">
                    <span className="font-semibold">Proxies:</span> Keep 100% of emergency fee when receiver doesn&apos;t show up.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Fee Breakdown */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#2f2f2f] mb-4">
              <span className="h2-animated-underline relative inline-block">
                Complete Fee Breakdown
                <motion.span
                  className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-[#f44708] to-[#f4470899] rounded-full"
                  initial={{ width: "0%", opacity: 0 }}
                  whileInView={{ width: "100%", opacity: 1 }}
                  viewport={{ once: false, margin: "-50px" }}
                  transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
                />
              </span>
            </h2>
            <p className="text-xl text-gray-600">
              Here is exactly what everyone pays
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {[
              {
                role: 'Senders',
                fee: 'FREE',
                minimum: 'No platform fee',
                description: 'Pay only accepted bid + proxy fee if needed',
                features: ['Escrow protection', 'Real-time tracking', '24/7 support', 'Money-back guarantee']
              },
              {
                role: 'Pals',
                fee: 'Keep 80%',
                minimum: 'Of accepted bid',
                description: 'Released from escrow after delivery',
                features: ['Instant wallet credit', 'Weekly withdrawals', 'Performance bonuses', 'Premium job access']
              },
              {
                role: 'Receivers',
                fee: 'FREE',
                minimum: 'Always free',
                description: 'No charges ever',
                features: ['Free tracking', 'SMS notifications', 'Delivery alerts', 'Support access']
              },
              {
                role: 'Proxies',
                fee: 'Keep 100%',
                minimum: 'Of emergency fee',
                description: 'Earned when receiver absent',
                features: ['No platform fees', 'Business dashboard', 'Inventory tracking', 'Earnings reports']
              }
            ].map((plan, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg cursor-pointer"
                variants={scaleIn}
                whileHover={{ scale: 1.05, y: -10, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-[#2f2f2f] mb-2">{plan.role}</h3>
                  <div className="text-3xl font-bold text-[#f44708] mb-2">{plan.fee}</div>
                  <p className="text-sm text-gray-500">{plan.minimum}</p>
                  <p className="text-sm text-gray-600 mt-2">{plan.description}</p>
                </div>

                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <Check size={20} className="text-[#f44708] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Comparison with Traditional Services */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1658402834612-6c76ce7a45cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxMYWdvcyUyME5pZ2VyaWElMjBtYXJrZXQlMjBzdHJlZXR8ZW58MXx8fHwxNzYwMTEyNDE2fDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Lagos market"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <TrendingDown className="w-16 h-16 text-[#f44708] mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-[#2f2f2f] mb-4">
              <span className="h2-animated-underline relative inline-block">
                Save Up to 60% vs Traditional Couriers in Nigeria
                <motion.span
                  className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-[#f44708] to-[#f4470899] rounded-full"
                  initial={{ width: "0%", opacity: 0 }}
                  whileInView={{ width: "100%", opacity: 1 }}
                  viewport={{ once: false, margin: "-50px" }}
                  transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
                />
              </span>
            </h2>
          </motion.div>

          <motion.div
            className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={scaleIn}
          >
            {/* Horizontal scroll container for mobile */}
            <div className="overflow-x-auto scrollbar-smooth">
              <table className="w-full min-w-[640px]">
              <thead className="bg-[#2f2f2f] text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Feature</th>
                  <th className="px-6 py-4 text-center">Prawnbox</th>
                  <th className="px-6 py-4 text-center">Traditional Courier</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'Delivery Fee', prawnbox: 'Flexible bidding - as low as ₦1,000', traditional: 'Fixed ₦4,000 - ₦15,000' },
                  { feature: 'Platform Fee (Sender)', prawnbox: 'FREE (₦0)', traditional: '5-10% + VAT' },
                  { feature: 'Delivery Scheduling', prawnbox: 'Flexible scheduling with Pal', traditional: 'Fixed time slots only' },
                  { feature: 'Accepted Timer for Deliveries', prawnbox: 'Built-in pickup countdown', traditional: 'Not available' },
                  { feature: 'Same-Day Delivery', prawnbox: 'Included', traditional: 'Extra ₦2,000+' },
                  { feature: 'Real-Time GPS Tracking', prawnbox: 'Free for all parties', traditional: 'Premium only' },
                  { feature: 'Direct Chat', prawnbox: 'Pal, Receiver & Proxy (if needed)', traditional: 'Call center only' },
                  { feature: 'Escrow Protection', prawnbox: 'Every delivery secured', traditional: 'Not available' },
                  { feature: 'Flexible Pricing', prawnbox: 'Bidding system - you choose', traditional: 'Fixed non-negotiable rates' },
                  { feature: 'Emergency Proxy Service', prawnbox: '24/7 backup delivery', traditional: 'Not available' },
                  { feature: 'Receiver Unavailable?', prawnbox: 'Proxy holds package safely', traditional: 'Return to sender (extra fee)' },
                  { feature: 'Package Insurance', prawnbox: 'Built-in coverage', traditional: 'Extra premium charge' },
                  { feature: 'Multi-Party Communication', prawnbox: 'Sender-Pal-Receiver-Proxy chat', traditional: 'None' },
                  { feature: 'Delivery Proof', prawnbox: 'Photo + QR verification', traditional: 'Signature only' }
                ].map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 font-medium text-[#2f2f2f]">{row.feature}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center text-[#f44708] font-semibold">
                        <Check size={20} className="mr-2" />
                        {row.prawnbox}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center text-gray-600">
                      {row.traditional}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* No Hidden Fees Guarantee */}
      <section className="py-20 bg-[#2f2f2f] text-white">
        <motion.div
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div variants={scaleIn}>
            <Shield className="w-20 h-20 text-[#f44708] mx-auto mb-6" />
          </motion.div>
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-6"
            variants={fadeInUp}
          >
            No Hidden Fees. Ever.
          </motion.h2>
          <motion.p
            className="text-xl text-gray-300 mb-8"
            variants={fadeInUp}
          >
            What you see is what you pay. We believe in complete transparency. All fees are shown upfront before you commit to any delivery in Nigeria.
          </motion.p>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-4 gap-6"
            variants={staggerContainer}
          >
            {[
              { icon: Check, text: 'No platform fees for senders' },
              { icon: Check, text: 'No surprise charges' },
              { icon: Check, text: 'No cancellation fees' },
              { icon: Check, text: 'No membership costs' }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex items-center justify-center space-x-2"
                variants={scaleIn}
              >
                <item.icon className="text-[#f44708]" size={24} />
                <span className="font-medium">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* CTA Section with Background */}
      <section className="py-20 bg-gradient-to-br from-[#f44708] to-[#ff5722] text-white relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1727414551085-68fe18fb6f38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwZGVsaXZlcnklMjBkcml2ZXJ8ZW58MXx8fHwxNzYwMTEyNDE2fDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="African delivery driver"
            className="w-full h-full object-cover"
          />
        </div>

        <motion.div
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.h2
            className="text-3xl md:text-5xl font-bold mb-6"
            variants={fadeInUp}
          >
            Save more when you send with Prawnbox
          </motion.h2>
          <motion.p
            className="text-xl mb-8"
            variants={fadeInUp}
          >
            Join thousands of Nigerians who have already saved money with Prawnbox&apos;s transparent pricing
          </motion.p>
          <motion.button
            onClick={() => onNavigate?.('auth')}
            className="px-8 py-4 bg-white text-[#f44708] text-lg font-semibold rounded-xl hover:bg-gray-100 shadow-2xl"
            variants={scaleIn}
            whileHover={{ scale: 1.1, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started Free
            <ArrowRight className="inline ml-2" size={20} />
          </motion.button>

          <motion.div
            className="mt-8 flex items-center justify-center space-x-8"
            variants={staggerContainer}
          >
            <motion.div
              className="text-center"
              variants={scaleIn}
            >
              <div className="text-3xl font-bold">₦0</div>
              <div className="text-sm opacity-90">Platform Fee for Senders</div>
            </motion.div>
            <motion.div
              className="text-center"
              variants={scaleIn}
            >
              <div className="text-3xl font-bold">80%</div>
              <div className="text-sm opacity-90">Pals Keep from Bid</div>
            </motion.div>
            <motion.div
              className="text-center"
              variants={scaleIn}
            >
              <div className="text-3xl font-bold">100%</div>
              <div className="text-sm opacity-90">Proxies Keep Emergency Fee</div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
