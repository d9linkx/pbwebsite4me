"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  Facebook,
  X,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import Logo from "./logo";

interface NavItem {
  label: string;
  path: string;
}

const quickLinks: NavItem[] = [
  { label: "About", path: "/about" },
  { label: "How It Works", path: "/how-it-works" },
  { label: "Pricing", path: "/pricing" },
  { label: "Safety", path: "/safety" },
];

const getStarted: NavItem[] = [
  { label: "Become a Pal", path: "/become-pal" },
  { label: "Become a Proxy", path: "/become-proxy" },
  { label: "Send Items", path: "/send-items" },
];

const support: NavItem[] = [
  { label: "FAQs", path: "/faqs" },
  { label: "Contact US", path: "/contact" },
  { label: "Terms of Service", path: "/terms" },
  { label: "Privacy Policy", path: "/privacy" },
];

export function WebsiteFooter() {
  const router = useRouter();
  const currentYear = new Date().getFullYear();

  const handleNavigate = (path: string) => {
    router.push(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-darker text-gray-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div>
            <Logo onNavigate={handleNavigate} />
            <p className="text-sm text-gray-400 mb-4">
              Nigeria&apos;s trusted peer-to-peer delivery platform. Fast,
              secure, and reliable delivery services at your fingertips.
            </p>
            {/* Social Links */}
            <div className="flex space-x-3">
              <a
                href="https://www.facebook.com/share/1CUU8AAMpu/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/10 hover:bg-primary flex items-center justify-center transition-colors duration-200"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://x.com/prawnbox/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/10 hover:bg-primary flex items-center justify-center transition-colors duration-200"
              >
                <X size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-white/10 hover:bg-primary flex items-center justify-center transition-colors duration-200"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://linkedin.com/company/prawnbox"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/10 hover:bg-primary flex items-center justify-center transition-colors duration-200"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <button
                    onClick={() => handleNavigate(link.path)}
                    className="text-sm hover:text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Started */}
          <div>
            <h3 className="text-white font-semibold mb-4">Get Started</h3>
            <ul className="space-y-2">
              {getStarted.map((link) => (
                <li key={link.path}>
                  <button
                    onClick={() => handleNavigate(link.path)}
                    className="text-sm hover:text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              {support.map((link) => (
                <li key={link.path}>
                  <button
                    onClick={() => handleNavigate(link.path)}
                    className="text-sm hover:text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Mail size={18} className="text-primary mt-1 shrink-0" />
                <div className="flex flex-col">
                  <span className="text-sm">info@prawnbox.com</span>
                  <span className="text-sm">partners@prawnbox.com</span>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Phone size={18} className="text-primary mt-1 shrink-0" />
                <div className="flex flex-col">
                  <span className="text-sm">+234 906 870 9992</span>
                  <span className="text-sm">+234 707 098 9034</span>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-primary mt-1 shrink-0" />
                <span className="text-sm">Lagos, Nigeria</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              © {currentYear} Prawnbox. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-sm">
              <button
                onClick={() => handleNavigate("website-terms")}
                className="text-gray-400 hover:text-primary transition-colors duration-200"
              >
                Terms
              </button>
              <button
                onClick={() => handleNavigate("website-privacy")}
                className="text-gray-400 hover:text-primary transition-colors duration-200"
              >
                Privacy
              </button>
              <span className="text-gray-400">Made in Nigeria 🇳🇬</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
