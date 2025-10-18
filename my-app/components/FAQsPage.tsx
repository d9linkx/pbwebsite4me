import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search, MessageCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface FAQsPageProps {
  onNavigate?: (screen: string) => void;
}

export function FAQsPage({ onNavigate }: FAQsPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('general');
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const categories = [
    { id: 'general', label: 'General' },
    { id: 'senders', label: 'For Senders' },
    { id: 'pals', label: 'For Pals' },
    { id: 'receivers', label: 'For Receivers' },
    { id: 'payment', label: 'Payment & Security' }
  ];

  const faqs = {
    general: [
      {
        id: 'g1',
        question: 'What is Prawnbox?',
        answer: 'Prawnbox is Nigeria\'s peer-to-peer delivery platform that connects people who need to send packages with verified Pals (delivery partners) who can deliver them. Think of it as Uber, but for package delivery.'
      },
      {
        id: 'g2',
        question: 'How does Prawnbox work?',
        answer: 'Senders post delivery requests with pickup and dropoff locations. Verified Pals bid on these deliveries. Senders choose their preferred Pal based on price, ratings, and delivery time. Payment is held in escrow until successful delivery is confirmed.'
      },
      {
        id: 'g3',
        question: 'Is Prawnbox available in my city?',
        answer: 'We currently operate in Lagos and Ibadan, and we\'ll expand to the others soon. Check our app to see if we serve your area.'
      },
      {
        id: 'g4',
        question: 'What items can I send through Prawnbox?',
        answer: 'You can send most items including documents, electronics, clothing, gifts, food (properly packaged), and household items. Prohibited items include weapons, illegal drugs, explosives, live animals, and cash above ₦50,000.'
      },
      {
        id: 'g5',
        question: 'How much does Prawnbox cost?',
        answer: 'Pals bid competitively on deliveries, so prices vary based on distance, package size, and urgency. Typical deliveries range from ₦1,000 to ₦5,000. Senders pay NO platform fee - you only pay the accepted bid amount. Receivers pay nothing. Pals keep 80% of their bid (20% platform fee). If receiver is unavailable and a Proxy is used, there may be an emergency proxy fee of ₦500-₦2,000 which the Proxy keeps 100%.'
      }
    ],
    senders: [
      {
        id: 's1',
        question: 'How do I post a delivery?',
        answer: 'Create an account, click "Post Delivery", enter pickup and dropoff locations, describe your item, add photos, specify size and value, and set your preferred delivery time. Pals will start bidding within minutes.'
      },
      {
        id: 's2',
        question: 'How do I choose the best Pal?',
        answer: 'Review each Pal\'s rating, number of completed deliveries, vehicle type, and estimated delivery time. Read reviews from previous customers. Choose based on your priorities - price, speed, or reputation.'
      },
      {
        id: 's3',
        question: 'What if my item gets damaged?',
        answer: 'All deliveries are insured up to the declared package value. If your item arrives damaged, report it immediately in the app with photos. Our support team will investigate and process compensation within 24-48 hours.'
      },
      {
        id: 's4',
        question: 'Can I track my delivery?',
        answer: 'Yes! You get real-time GPS tracking from pickup to delivery. You can chat directly with your Pal, call them if needed, and receive notifications at every stage of the delivery process.'
      },
      {
        id: 's5',
        question: 'What if I need to cancel?',
        answer: 'You can cancel before the Pal picks up your item at no cost. If the Pal has already picked up, cancellation fees may apply to compensate the Pal fairly. Full refunds are provided if you cancel within 5 minutes of posting.'
      },
      {
        id: 's6',
        question: 'Do I pay platform fees as a Sender?',
        answer: 'No! Senders pay ZERO platform fees. You only pay the exact bid amount you accepted from your chosen Pal. If the receiver is unavailable and you need emergency Proxy service, there may be an additional emergency fee (₦500-₦2,000) which is refunded if the receiver picks up from Pal instead of Proxy.'
      }
    ],
    pals: [
      {
        id: 'p1',
        question: 'How do I become a Pal?',
        answer: 'Sign up, upload your government-issued ID, complete a selfie verification, and pass our background check. Our team verifies your documents within 24 hours. Once approved, you can start bidding on deliveries immediately. Vehicle ownership is optional - you can deliver with or without a vehicle!'
      },
      {
        id: 'p2',
        question: 'Do I need a vehicle to be a Pal?',
        answer: 'No! You can deliver with or without a vehicle. Walk or use public transport for small packages, or use your motorcycle, car, or van for larger deliveries. You choose which deliveries to bid on based on what you can handle. Many successful Pals operate on foot in busy city centers.'
      },
      {
        id: 'p3',
        question: 'How do I get paid?',
        answer: 'Payment is released to your Prawnbox wallet immediately after the receiver confirms delivery. You keep 80% of your bid amount - Prawnbox takes 20% as a platform fee. Withdraw to your bank account anytime with no minimum balance requirement. Earnings are instant and transparent!'
      },
      {
        id: 'p4',
        question: 'What are the requirements to become a Pal?',
        answer: 'You must be 18+, have a valid government ID (NIN, voter\'s card, driver\'s license, or international passport), have a smartphone with internet, and pass our background check. If you have a vehicle, upload vehicle documents for higher-value deliveries. No vehicle? No problem - start with smaller packages!'
      },
      {
        id: 'p5',
        question: 'How much can I earn as a Pal?',
        answer: 'Your earnings depend on delivery volume and your rates. You keep 80% of every delivery fee (20% platform fee). Active Pals earn ₦30,000-₦150,000 monthly. Higher ratings unlock premium deliveries with better pay. Set your own hours and control your income!'
      },
      {
        id: 'p6',
        question: 'What if I cannot complete a delivery?',
        answer: 'Life happens! If you cannot complete a delivery after accepting, contact the sender and support immediately. You may incur a penalty fee (10-25% of bid) depending on timing. Multiple cancellations affect your rating, so only accept deliveries you can complete.'
      },
      {
        id: 'p7',
        question: 'How do I improve my rating?',
        answer: 'Communicate clearly with senders and receivers, handle packages carefully, deliver on time, be professional and courteous, take clear photos at pickup and delivery, and respond quickly to messages. Excellent service earns 5-star ratings and unlocks premium deliveries!'
      }
    ],
    receivers: [
      {
        id: 'r1',
        question: 'What do I need to do as a receiver?',
        answer: 'The sender will add your phone number when posting the delivery. You will receive SMS notifications with tracking updates. When the Pal arrives, verify their identity in the app, inspect the package, and confirm delivery using the QR code or OTP.'
      },
      {
        id: 'r2',
        question: 'How do I know when to expect delivery?',
        answer: 'You will receive real-time notifications via SMS and app (if installed). The Pal will also call you 5-10 minutes before arrival to coordinate the handover. You can track the delivery live on the app.'
      },
      {
        id: 'r3',
        question: 'What if I am not home?',
        answer: 'You can update your delivery location anytime through the sender. Alternatively, packages can be delivered to a proxy location (verified business or store) near you for later pickup. Proxies charge ₦500-₦2,000 for storage.'
      },
      {
        id: 'r4',
        question: 'Can I reschedule delivery?',
        answer: 'Yes! Contact the sender, and they can coordinate with the Pal to reschedule. There are no fees for rescheduling as long as it is done before the Pal starts traveling to your location.'
      },
      {
        id: 'r5',
        question: 'Is receiving packages free?',
        answer: 'Yes, completely free! Receivers never pay any fees. The sender covers all delivery costs. You just need to be available to receive the package and confirm delivery.'
      }
    ],
    payment: [
      {
        id: 'pay1',
        question: 'How does escrow work?',
        answer: 'When a sender accepts a bid, they pay the delivery fee into escrow. The funds are held securely by Prawnbox. Only when the receiver confirms successful delivery is the money released to the Pal (who receives 80% of the bid). If delivery fails, the sender gets a full refund. This protects both parties!'
      },
      {
        id: 'pay2',
        question: 'What payment methods do you accept?',
        answer: 'We accept bank transfers, debit/credit cards (Visa, Mastercard, Verve), USSD, and wallet payments. All payments are processed securely through our payment partners (Paystack and Flutterwave).'
      },
      {
        id: 'pay3',
        question: 'When do Pals get paid?',
        answer: 'Immediately after the receiver confirms delivery, 80% of the bid amount is released from escrow to the Pal\'s wallet (Prawnbox takes 20% platform fee). Pals can withdraw to their bank account anytime. Withdrawals are processed within 1-2 business days.'
      },
      {
        id: 'pay6',
        question: 'What are the Proxy fees?',
        answer: 'If a receiver is unavailable, an emergency Proxy fee (typically ₦500-₦2,000) applies. This fee is paid upfront by the sender. If the receiver doesn\'t show up, the Proxy keeps 100% of the emergency fee (no platform cut). If the receiver picks up directly from the Pal instead, the emergency fee is refunded to the sender\'s wallet.'
      },
      {
        id: 'pay4',
        question: 'Is my payment information secure?',
        answer: 'Absolutely! We use bank-level encryption (256-bit SSL) for all transactions. We never store your card details. All payments are processed through PCI-DSS compliant partners. Your financial data is completely secure.'
      },
      {
        id: 'pay5',
        question: 'What if there is a payment dispute?',
        answer: 'Contact our support team immediately with details and evidence (photos, screenshots). We will investigate within 24 hours. Funds remain in escrow during disputes. Our resolution team ensures fair outcomes for all parties.'
      }
    ]
  };

  const filteredFaqs = faqs[activeCategory as keyof typeof faqs].filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#2f2f2f] to-[#1a1a1a] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Find answers to common questions about Prawnbox
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search for answers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-[#f44708]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="bg-white border-b border-gray-200 sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-4 border-b-2 transition-all duration-200 whitespace-nowrap ${
                  activeCategory === category.id
                    ? 'border-[#f44708] text-[#f44708]'
                    : 'border-transparent text-gray-600 hover:text-[#2f2f2f]'
                }`}
              >
                <span className="font-medium">{category.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs List */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No questions found matching your search.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFaqs.map((faq) => (
                <div
                  key={faq.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                    className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-semibold text-left text-[#2f2f2f]">
                      {faq.question}
                    </span>
                    {expandedFaq === faq.id ? (
                      <ChevronUp className="text-[#f44708] flex-shrink-0" size={24} />
                    ) : (
                      <ChevronDown className="text-gray-400 flex-shrink-0" size={24} />
                    )}
                  </button>
                  {expandedFaq === faq.id && (
                    <div className="px-6 pb-5 text-gray-600">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <MessageCircle className="w-16 h-16 text-[#f44708] mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-[#2f2f2f] mb-6">
            <span className="h2-animated-underline relative inline-block">
              Still Have Questions?
              <motion.span
                className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-[#f44708] to-[#f4470899] rounded-full"
                initial={{ width: "0%", opacity: 0 }}
                whileInView={{ width: "100%", opacity: 1 }}
                viewport={{ once: false, margin: "-50px" }}
                transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
              />
            </span>
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Our support team is here to help you 24/7
          </p>
          <button
            onClick={() => onNavigate?.('website-contact')}
            className="px-8 py-4 bg-[#f44708] text-white text-lg font-semibold rounded-xl hover:bg-[#ff5722] transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            Contact Support
            <ArrowRight className="inline ml-2" size={20} />
          </button>
        </div>
      </section>
    </div>
  );
}
