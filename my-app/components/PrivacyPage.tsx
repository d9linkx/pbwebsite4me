"use client";
import React from "react";
import { Shield, Lock, Eye, FileText, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/routes";

export function PrivacyPage() {
  const router = useRouter();

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-dark to-darker text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Lock className="w-16 h-16 text-primary mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-300">
              Last Updated: October 10, 2025
            </p>
          </div>
        </div>
      </section>

      {/* Privacy Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <div className="bg-gray-50 p-6 rounded-xl mb-8">
              <p className="text-gray-700">
                At Prawnbox, we take your privacy seriously. This Privacy Policy
                explains how we collect, use, protect, and share your personal
                information when you use our platform.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-dark mt-8 mb-4 flex items-center">
              <FileText className="mr-3 text-primary" size={28} />
              1. Information We Collect
            </h2>

            <h3 className="text-xl font-semibold text-dark mt-6 mb-3">
              Personal Information:
            </h3>
            <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
              <li>Name, email address, and phone number</li>
              <li>Government-issued ID for verification (Pals only)</li>
              <li>Profile photo</li>
              <li>Banking and payment information</li>
              <li>Delivery addresses and locations</li>
            </ul>

            <h3 className="text-xl font-semibold text-dark mt-6 mb-3">
              Automatically Collected Information:
            </h3>
            <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
              <li>
                Device information (IP address, browser type, operating system)
              </li>
              <li>GPS location data (for real-time tracking)</li>
              <li>Usage data (pages visited, features used, time spent)</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>

            <h2 className="text-2xl font-bold text-dark mt-8 mb-4 flex items-center">
              <Eye className="mr-3 text-primary" size={28} />
              2. How We Use Your Information
            </h2>
            <p className="text-gray-600 mb-4">We use your information to:</p>
            <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
              <li>Provide and improve our delivery services</li>
              <li>Process payments and transactions</li>
              <li>Verify user identity and prevent fraud</li>
              <li>Enable real-time GPS tracking for deliveries</li>
              <li>Send notifications about delivery status</li>
              <li>Provide customer support</li>
              <li>Analyze usage patterns to improve user experience</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2 className="text-2xl font-bold text-dark mt-8 mb-4 flex items-center">
              <Shield className="mr-3 text-primary" size={28} />
              3. Information Sharing
            </h2>
            <p className="text-gray-600 mb-4">
              We share your information only in these circumstances:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
              <li>
                <strong>With other users:</strong> Senders, Pals, and receivers
                see limited information necessary for delivery coordination
                (name, phone, location, ratings)
              </li>
              <li>
                <strong>With service providers:</strong> Payment processors
                (Paystack, Flutterwave), SMS providers, mapping services
              </li>
              <li>
                <strong>For legal compliance:</strong> When required by law,
                court order, or government request
              </li>
              <li>
                <strong>Business transfers:</strong> If Prawnbox is acquired or
                merged, your data may transfer to the new owner
              </li>
            </ul>
            <p className="text-gray-600 mb-6">
              We <strong>never sell</strong> your personal information to third
              parties for marketing purposes.
            </p>

            <h2 className="text-2xl font-bold text-dark mt-8 mb-4 flex items-center">
              <Lock className="mr-3 text-primary" size={28} />
              4. Data Security
            </h2>
            <p className="text-gray-600 mb-4">
              We implement industry-standard security measures to protect your
              data:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
              <li>256-bit SSL encryption for all data transmissions</li>
              <li>
                Secure payment processing through PCI-DSS compliant partners
              </li>
              <li>Regular security audits and vulnerability assessments</li>
              <li>Encrypted storage for sensitive information</li>
              <li>Access controls and authentication requirements</li>
              <li>Employee training on data protection</li>
            </ul>

            <h2 className="text-2xl font-bold text-dark mt-8 mb-4">
              5. Your Rights
            </h2>
            <p className="text-gray-600 mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
              <li>
                <strong>Access:</strong> Request a copy of your personal data
              </li>
              <li>
                <strong>Correction:</strong> Update inaccurate or incomplete
                information
              </li>
              <li>
                <strong>Deletion:</strong> Request deletion of your account and
                data (subject to legal requirements)
              </li>
              <li>
                <strong>Opt-out:</strong> Unsubscribe from marketing
                communications
              </li>
              <li>
                <strong>Data portability:</strong> Receive your data in a
                machine-readable format
              </li>
            </ul>
            <p className="text-gray-600 mb-6">
              To exercise these rights, contact us at privacy@prawnbox.ng
            </p>

            <h2 className="text-2xl font-bold text-dark mt-8 mb-4">
              6. Cookies and Tracking
            </h2>
            <p className="text-gray-600 mb-6">
              We use cookies and similar technologies to enhance your
              experience, analyze usage patterns, and personalize content. You
              can control cookies through your browser settings, though
              disabling them may limit some features.
            </p>

            <h2 className="text-2xl font-bold text-dark mt-8 mb-4">
              7. Third-Party Services
            </h2>
            <p className="text-gray-600 mb-6">
              Our platform integrates with third-party services (Google Maps,
              payment processors, SMS providers). These services have their own
              privacy policies. We encourage you to review them.
            </p>

            <h2 className="text-2xl font-bold text-dark mt-8 mb-4">
              8. Data Retention
            </h2>
            <p className="text-gray-600 mb-6">
              We retain your data for as long as your account is active or as
              needed to provide services. After account deletion, we may retain
              certain information for legal compliance, dispute resolution, and
              fraud prevention for up to 7 years.
            </p>

            <h2 className="text-2xl font-bold text-dark mt-8 mb-4">
              9. Children&apos;s Privacy
            </h2>
            <p className="text-gray-600 mb-6">
              Prawnbox is not intended for users under 18. We do not knowingly
              collect information from children. If we discover we have
              collected data from a child, we will delete it immediately.
            </p>

            <h2 className="text-2xl font-bold text-dark mt-8 mb-4">
              10. NDPR Compliance
            </h2>
            <p className="text-gray-600 mb-6">
              Prawnbox complies with the Nigeria Data Protection Regulation
              (NDPR). We are committed to protecting the privacy rights of
              Nigerian citizens and ensure all data processing activities meet
              NDPR standards.
            </p>

            <h2 className="text-2xl font-bold text-dark mt-8 mb-4">
              11. Changes to This Policy
            </h2>
            <p className="text-gray-600 mb-6">
              We may update this Privacy Policy periodically. Material changes
              will be communicated via email or app notification. Your continued
              use after changes constitutes acceptance.
            </p>

            <h2 className="text-2xl font-bold text-dark mt-8 mb-4">
              12. Contact Us
            </h2>
            <p className="text-gray-600 mb-6">
              For privacy-related questions or to exercise your rights, contact
              us at:
            </p>
            <div className="bg-gray-50 p-6 rounded-xl">
              <p className="text-gray-700">
                <strong>Email:</strong> privacy@prawnbox.ng
              </p>
              <p className="text-gray-700">
                <strong>Phone:</strong> +234 800 PRAWNBOX
              </p>
              <p className="text-gray-700">
                <strong>Address:</strong> 123 Admiralty Way, Lekki Phase 1,
                Lagos, Nigeria
              </p>
            </div>

            <div className="bg-primary text-white p-6 rounded-xl mt-12">
              <p className="font-semibold mb-2">Your privacy matters to us.</p>
              <p>
                We are committed to protecting your personal information and
                giving you control over your data.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-dark mb-6">
            Start Using Prawnbox Safely
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Your data is protected with industry-leading security
          </p>
          <button
            onClick={() => router.push(ROUTES.PRE_REGISTER)}
            className="px-8 py-4 bg-primary text-white text-lg font-semibold rounded-xl hover:bg-primary-hover transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            Create Secure Account
            <ArrowRight className="inline ml-2" size={20} />
          </button>
        </div>
      </section>
    </div>
  );
}
