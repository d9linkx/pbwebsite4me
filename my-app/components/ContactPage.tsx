"use client"
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, ArrowRight, Facebook, X, Instagram, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';

interface ContactPageProps {
  onNavigate?: (screen: string) => void;
}

export function ContactPage({ onNavigate }: ContactPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });

      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#2f2f2f] to-[#1a1a1a] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We would love to hear from you. Our team is always ready to help.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-[#2f2f2f] mb-6">
                <span className="h2-animated-underline relative inline-block">
                  Send Us a Message
                  <motion.span
                    className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-[#f44708] to-[#f4470899] rounded-full"
                    initial={{ width: "0%", opacity: 0 }}
                    whileInView={{ width: "100%", opacity: 1 }}
                    viewport={{ once: false, margin: "-50px" }}
                    transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
                  />
                </span>
              </h2>
              <p className="text-gray-600 mb-8">
                Fill out the form below and we will get back to you within 24 hours.
              </p>

              {isSubmitted && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-800">
                  ✓ Thank you! Your message has been sent successfully.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-[#2f2f2f] mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#f44708] focus:ring-2 focus:ring-[#f44708]/20 outline-none"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2f2f2f] mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#f44708] focus:ring-2 focus:ring-[#f44708]/20 outline-none"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2f2f2f] mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#f44708] focus:ring-2 focus:ring-[#f44708]/20 outline-none"
                    placeholder="+234 800 0000 000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2f2f2f] mb-2">
                    Subject *
                  </label>
                  <select
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#f44708] focus:ring-2 focus:ring-[#f44708]/20 outline-none"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="partnership">Business Partnership</option>
                    <option value="press">Press & Media</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2f2f2f] mb-2">
                    Message *
                  </label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#f44708] focus:ring-2 focus:ring-[#f44708]/20 outline-none resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-4 bg-[#f44708] text-white font-semibold rounded-xl hover:bg-[#ff5722] transform hover:scale-105 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      Send Message
                      <Send className="inline ml-2" size={20} />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-[#2f2f2f] mb-6">
                <span className="h2-animated-underline relative inline-block">
                  Contact Information
                  <motion.span
                    className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-[#f44708] to-[#f4470899] rounded-full"
                    initial={{ width: "0%", opacity: 0 }}
                    whileInView={{ width: "100%", opacity: 1 }}
                    viewport={{ once: false, margin: "-50px" }}
                    transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
                  />
                </span>
              </h2>

              <div className="space-y-6 mb-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-[#f44708] flex items-center justify-center flex-shrink-0">
                    <Mail className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#2f2f2f] mb-1">Email Us</h3>
                    <p className="text-gray-600">info@prawnbox.com</p>
                    <p className="text-gray-600">partners@prawnbox.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-[#f44708] flex items-center justify-center flex-shrink-0">
                    <Phone className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#2f2f2f] mb-1">Call Us</h3>
                    <p className="text-gray-600">+234 906 870 9992</p>
                    <p className="text-gray-600">+234 707 098 9034</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-[#f44708] flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#2f2f2f] mb-1">WhatsApp</h3>
                    <p className="text-gray-600">+234 906 870 9992</p>
                    <p className="text-sm text-gray-500">24/7 instant support</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-[#f44708] flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#2f2f2f] mb-1">Visit Us</h3>
                    <p className="text-gray-600">123 Admiralty Way</p>
                    <p className="text-gray-600">Lekki Phase 1, Lagos</p>
                    <p className="text-gray-600">Nigeria</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-[#f44708] flex items-center justify-center flex-shrink-0">
                    <Clock className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#2f2f2f] mb-1">Business Hours</h3>
                    <p className="text-gray-600">Monday - Friday: 8am - 8pm</p>
                    <p className="text-gray-600">Saturday: 9am - 6pm</p>
                    <p className="text-gray-600">Sunday: 10am - 4pm</p>
                    <p className="text-sm text-[#f44708] mt-2">24/7 Emergency Support Available</p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-gray-50 p-6 rounded-2xl">
                <h3 className="font-semibold text-[#2f2f2f] mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a
                    href="https://www.facebook.com/share/1CUU8AAMpu/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-lg bg-white hover:bg-[#f44708] flex items-center justify-center transition-all duration-200 shadow-sm group"
                  >
                    <Facebook size={20} className="text-[#2f2f2f] group-hover:text-white transition-colors duration-200" />
                  </a>
                  <a
                    href="https://x.com/prawnbox/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-lg bg-white hover:bg-[#f44708] flex items-center justify-center transition-all duration-200 shadow-sm group"
                  >
                    <X size={20} className="text-[#2f2f2f] group-hover:text-white transition-colors duration-200" />
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 rounded-lg bg-white hover:bg-[#f44708] flex items-center justify-center transition-all duration-200 shadow-sm group"
                  >
                    <Instagram size={20} className="text-[#2f2f2f] group-hover:text-white transition-colors duration-200" />
                  </a>
                  <a
                    href="https://linkedin.com/company/prawnbox"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-lg bg-white hover:bg-[#f44708] flex items-center justify-center transition-all duration-200 shadow-sm group"
                  >
                    <Linkedin size={20} className="text-[#2f2f2f] group-hover:text-white transition-colors duration-200" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#2f2f2f] to-[#000000] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8">
            Join Prawnbox today and experience the future of delivery in Nigeria
          </p>
          <button
            onClick={() => onNavigate?.('auth')}
            className="px-8 py-4 bg-[#f44708] text-white text-lg font-semibold rounded-xl hover:bg-[#ff5722] transform hover:scale-105 transition-all duration-200 shadow-2xl"
          >
            Create Account
            <ArrowRight className="inline ml-2" size={20} />
          </button>
        </div>
      </section>
    </div>
  );
}
