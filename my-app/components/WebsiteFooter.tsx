import React from 'react';
import { useRouter } from 'next/navigation';
import { Facebook, X, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
// Using a placeholder for the logo - you can replace this with your actual logo
// import prawnboxLogo from '../public/prawnbox-logo.png';

interface WebsiteFooterProps {
  onNavigate?: (screen: string) => void;
}

export function WebsiteFooter({ onNavigate }: WebsiteFooterProps) {
  const router = useRouter();
  const currentYear = new Date().getFullYear();

  // Helper function to navigate and scroll to top
  const handleNavigate = (screen: string) => {
    // Map screen names to routes
    const routeMap: { [key: string]: string } = {
      'website-about': '/about',
      'website-how-it-works': '/how-it-works',
      'website-pricing': '/pricing',
      'website-safety': '/safety',
      'website-faqs': '/faqs',
      'website-contact': '/contact',
      'website-become-pal': '/become-pal',
      'website-become-proxy': '/become-proxy',
      'website-send-items': '/send-items',
      'website-terms': '/terms',
      'website-privacy': '/privacy',
    };

    const route = routeMap[screen] || '/';
    router.push(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Call the optional onNavigate callback if provided
    if (onNavigate) {
      onNavigate(screen);
    }
  };

  return (
    <footer className="bg-[#1a1a1a] text-gray-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#f44708] to-[#ff5722] flex items-center justify-center p-2">
                {/* Placeholder for logo - replace with actual logo image */}
                <div className="w-full h-full bg-white rounded-lg flex items-center justify-center text-[#f44708] font-bold text-lg">
                  P
                </div>
                {/* Uncomment and add your logo file when available */}
                {/* <img src={prawnboxLogo} alt="Prawnbox" className="w-full h-full object-contain" /> */}
              </div>
              <span className="text-xl font-bold text-white">Prawnbox</span>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Nigeria&apos;s trusted peer-to-peer delivery platform. Fast, secure, and reliable delivery services at your fingertips.
            </p>
            {/* Social Links */}
            <div className="flex space-x-3">
              <a href="https://www.facebook.com/share/1CUU8AAMpu/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-white/10 hover:bg-[#f44708] flex items-center justify-center transition-colors duration-200">
                <Facebook size={18} />
              </a>
              <a href="https://x.com/prawnbox/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-white/10 hover:bg-[#f44708] flex items-center justify-center transition-colors duration-200">
                <X size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-white/10 hover:bg-[#f44708] flex items-center justify-center transition-colors duration-200">
                <Instagram size={18} />
              </a>
              <a href="https://linkedin.com/company/prawnbox" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-white/10 hover:bg-[#f44708] flex items-center justify-center transition-colors duration-200">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { label: 'About Us', screen: 'website-about' },
                { label: 'How It Works', screen: 'website-how-it-works' },
                { label: 'Pricing', screen: 'website-pricing' },
                { label: 'Safety & Security', screen: 'website-safety' },
              ].map((link) => (
                <li key={link.screen}>
                  <button
                    onClick={() => handleNavigate(link.screen)}
                    className="text-sm hover:text-[#f44708] transition-colors duration-200"
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
              {[
                { label: 'Become a Pal', screen: 'website-become-pal' },
                { label: 'Become a Proxy', screen: 'website-become-proxy' },
                { label: 'Send Items', screen: 'website-send-items' },
              ].map((link) => (
                <li key={link.screen}>
                  <button
                    onClick={() => handleNavigate(link.screen)}
                    className="text-sm hover:text-[#f44708] transition-colors duration-200"
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
              {[
                { label: 'FAQs', screen: 'website-faqs' },
                { label: 'Contact Us', screen: 'website-contact' },
                { label: 'Terms of Service', screen: 'website-terms' },
                { label: 'Privacy Policy', screen: 'website-privacy' },
              ].map((link) => (
                <li key={link.screen}>
                  <button
                    onClick={() => handleNavigate(link.screen)}
                    className="text-sm hover:text-[#f44708] transition-colors duration-200"
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
                <Mail size={18} className="text-[#f44708] mt-1 flex-shrink-0" />
                <div className="flex flex-col">
                  <span className="text-sm">info@prawnbox.com</span>
                  <span className="text-sm">partners@prawnbox.com</span>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Phone size={18} className="text-[#f44708] mt-1 flex-shrink-0" />
                <div className="flex flex-col">
                  <span className="text-sm">+234 906 870 9992</span>
                  <span className="text-sm">+234 707 098 9034</span>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-[#f44708] mt-1 flex-shrink-0" />
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
                onClick={() => handleNavigate('website-terms')}
                className="text-gray-400 hover:text-[#f44708] transition-colors duration-200"
              >
                Terms
              </button>
              <button
                onClick={() => handleNavigate('website-privacy')}
                className="text-gray-400 hover:text-[#f44708] transition-colors duration-200"
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
