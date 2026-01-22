"use client";

import { ROUTES } from "@/lib/routes";
import { FileText, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export function TermsPage() {
  const router = useRouter();

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-dark to-darker text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <FileText className="w-16 h-16 text-primary mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Terms of Service
            </h1>
            <p className="text-xl text-gray-300">
              Last Updated: October 10, 2025
            </p>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <div className="bg-gray-50 p-6 rounded-xl mb-8">
              <p className="text-gray-700">
                Welcome to Prawnbox! These Terms of Service govern your use of
                our peer-to-peer delivery platform. By accessing or using
                Prawnbox, you agree to be bound by these terms.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-dark mt-8 mb-4">
              1. Acceptance of Terms
            </h2>
            <p className="text-gray-600 mb-6">
              By creating an account, accessing, or using Prawnbox services, you
              acknowledge that you have read, understood, and agree to be bound
              by these Terms of Service. If you do not agree to these terms, you
              may not use our services.
            </p>

            <h2 className="text-2xl font-bold text-dark mt-8 mb-4">
              2. User Accounts
            </h2>
            <p className="text-gray-600 mb-4">To use Prawnbox, you must:</p>
            <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
              <li>Be at least 18 years old</li>
              <li>Provide accurate and complete registration information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Notify us immediately of any unauthorized access</li>
              <li>Not share your account with others</li>
            </ul>

            <h2 className="text-2xl font-bold text-dark mt-8 mb-4">
              3. User Responsibilities
            </h2>

            <h3 className="text-xl font-semibold text-dark mt-6 mb-3">
              For Senders:
            </h3>
            <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
              <li>Provide accurate item descriptions and photos</li>
              <li>Declare the correct package value for insurance purposes</li>
              <li>Ensure items comply with prohibited items policy</li>
              <li>Pay all fees associated with deliveries</li>
              <li>Be available for pickup coordination</li>
            </ul>

            <h3 className="text-xl font-semibold text-dark mt-6 mb-3">
              For Pals:
            </h3>
            <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
              <li>
                Complete verification process including ID and vehicle documents
              </li>
              <li>Handle packages with care and professionalism</li>
              <li>Deliver items within agreed timeframes</li>
              <li>Maintain valid vehicle insurance and roadworthiness</li>
              <li>Report any issues or damages immediately</li>
            </ul>

            <h2 className="text-2xl font-bold text-dark mt-8 mb-4">
              4. Payment Terms
            </h2>
            <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
              <li>
                Senders pay a 5% platform fee (minimum ₦500) on package value
              </li>
              <li>Pals keep 95% of their bid amount after platform fees</li>
              <li>All payments are processed through secure escrow</li>
              <li>Refunds are processed within 5-7 business days</li>
              <li>Disputed funds remain in escrow during resolution</li>
            </ul>

            <h2 className="text-2xl font-bold text-dark mt-8 mb-4">
              5. Prohibited Items
            </h2>
            <p className="text-gray-600 mb-4">
              The following items are strictly prohibited on Prawnbox:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
              <li>Weapons, ammunition, and explosives</li>
              <li>Illegal drugs and controlled substances</li>
              <li>Live animals</li>
              <li>Hazardous materials and chemicals</li>
              <li>Stolen or counterfeit goods</li>
              <li>Cash exceeding ₦50,000</li>
              <li>Perishable items without proper packaging</li>
            </ul>

            <h2 className="text-2xl font-bold text-dark mt-8 mb-4">
              6. Liability and Insurance
            </h2>
            <p className="text-gray-600 mb-6">
              All deliveries are insured up to the declared package value.
              Prawnbox is not liable for damages resulting from inaccurate item
              descriptions, improper packaging, or items exceeding declared
              value. Insurance claims must be filed within 24 hours of delivery
              with photographic evidence.
            </p>

            <h2 className="text-2xl font-bold text-dark mt-8 mb-4">
              7. Dispute Resolution
            </h2>
            <p className="text-gray-600 mb-6">
              In case of disputes, parties agree to first attempt resolution
              through Prawnbox mediation. Our support team will investigate and
              make a fair determination within 48 hours. Decisions are final and
              binding. For legal disputes, Nigerian law governs these terms.
            </p>

            <h2 className="text-2xl font-bold text-dark mt-8 mb-4">
              8. Termination
            </h2>
            <p className="text-gray-600 mb-6">
              Prawnbox reserves the right to suspend or terminate accounts for
              violations of these terms, fraudulent activity, or behavior that
              harms the community. Users may close their accounts at any time,
              subject to completing pending deliveries and settling outstanding
              payments.
            </p>

            <h2 className="text-2xl font-bold text-dark mt-8 mb-4">
              9. Changes to Terms
            </h2>
            <p className="text-gray-600 mb-6">
              We may update these Terms of Service periodically. Continued use
              of Prawnbox after changes constitutes acceptance of new terms.
              Material changes will be communicated via email or app
              notification.
            </p>

            <h2 className="text-2xl font-bold text-dark mt-8 mb-4">
              10. Contact Us
            </h2>
            <p className="text-gray-600 mb-6">
              For questions about these Terms of Service, contact us at
              legal@prawnbox.ng or visit our{" "}
              <button
                onClick={() => router.push(ROUTES.CONTACT)}
                className="text-primary underline"
              >
                Contact Page
              </button>
              .
            </p>

            <div className="bg-primary text-white p-6 rounded-xl mt-12">
              <p className="font-semibold mb-2">
                By using Prawnbox, you agree to these Terms of Service.
              </p>
              <p>If you have any questions, please contact our support team.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-dark mb-6">
            Ready to Join Prawnbox?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Create your account and start delivering or sending today
          </p>
          <button
            onClick={() => router.push(ROUTES.AUTH)}
            className="px-8 py-4 bg-primary text-white text-lg font-semibold rounded-xl hover:bg-primary-hover transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            Get Started
            <ArrowRight className="inline ml-2" size={20} />
          </button>
        </div>
      </section>
    </div>
  );
}
