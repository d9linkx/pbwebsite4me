"use client"
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';
// Using a placeholder for the logo - you can replace this with your actual logo
// import prawnboxLogo from '../public/prawnbox-logo.png';

interface WebsiteHeaderProps {
  onNavigate?: (screen: string) => void;
}

export function WebsiteHeader({ onNavigate }: WebsiteHeaderProps) {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isGetStartedOpen, setIsGetStartedOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const menuItems = [
    { label: 'Home', screen: 'website-home', route: '/' },
    { label: 'About', screen: 'website-about', route: '/about' },
    { label: 'How It Works', screen: 'website-how-it-works', route: '/how-it-works' },
    { label: 'Pricing', screen: 'website-pricing', route: '/pricing' },
    { label: 'Safety', screen: 'website-safety', route: '/safety' },
    { label: 'FAQs', screen: 'website-faqs', route: '/faqs' },
    { label: 'Contact', screen: 'website-contact', route: '/contact' },
  ];

  const getStartedItems = [
    { label: 'Become a Pal', screen: 'website-become-pal', route: '/become-pal' },
    { label: 'Become a Proxy', screen: 'website-become-proxy', route: '/become-proxy' },
    { label: 'Send Items', screen: 'website-send-items', route: '/send-items' },
  ];

  // Helper function to navigate and scroll to top
  const handleNavigate = (route: string, screen: string) => {
    router.push(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
    setIsGetStartedOpen(false);

    // Call the optional onNavigate callback if provided
    if (onNavigate) {
      onNavigate(screen);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsGetStartedOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#2f2f2f] border-b border-gray-800">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => handleNavigate('/', 'website-home')}
            className="flex items-center space-x-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#f44708] to-[#ff5722] flex items-center justify-center transform group-hover:scale-110 transition-transform duration-200 p-2">
              {/* Placeholder for logo - replace with actual logo image */}
              <div className="w-full h-full bg-white rounded-lg flex items-center justify-center text-[#f44708] font-bold text-lg">
                P
              </div>
              {/* Uncomment and add your logo file when available */}
              {/* <img src={prawnboxLogo} alt="Prawnbox" className="w-full h-full object-contain" /> */}
            </div>
            <span className="text-2xl font-bold text-white">Prawnbox</span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {menuItems.map((item) => (
              <button
                key={item.screen}
                onClick={() => handleNavigate(item.route, item.screen)}
                className="px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* CTA Buttons - Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            <button
              onClick={() => handleNavigate('/auth', 'auth')}
              className="px-6 py-2.5 text-white hover:text-[#f44708] transition-colors duration-200"
            >
              Sign In
            </button>

            {/* Get Started Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsGetStartedOpen(!isGetStartedOpen)}
                className="px-6 py-2.5 text-[#f44708] hover:text-[#ff5722] transition-all duration-200 flex items-center space-x-1 font-semibold"
              >
                <span>Get Started</span>
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${isGetStartedOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {/* Dropdown Menu */}
              {isGetStartedOpen && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-[#1a1a1a] border border-gray-800 rounded-lg shadow-xl overflow-hidden z-50">
                  {getStartedItems.map((item) => (
                    <button
                      key={item.screen}
                      onClick={() => handleNavigate(item.route, item.screen)}
                      className="block w-full text-left px-4 py-3 text-gray-300 hover:text-white hover:bg-[#f44708]/20 transition-all duration-200 border-b border-gray-800 last:border-b-0"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#1a1a1a] border-t border-gray-800 w-full">
          <nav className="px-4 py-6 space-y-2 max-w-7xl mx-auto">
            {menuItems.map((item) => (
              <button
                key={item.screen}
                onClick={() => handleNavigate(item.route, item.screen)}
                className="block w-full text-left px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
              >
                {item.label}
              </button>
            ))}

            {/* Get Started Section */}
            <div className="pt-4 border-t border-gray-800 mt-4">
              <p className="px-4 py-2 text-sm font-semibold text-gray-400">Get Started</p>
              {getStartedItems.map((item) => (
                <button
                  key={item.screen}
                  onClick={() => handleNavigate(item.route, item.screen)}
                  className="block w-full text-left px-4 py-3 text-gray-300 hover:text-white hover:bg-[#f44708]/20 rounded-lg transition-all duration-200"
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="pt-4 space-y-2">
              <button
                onClick={() => handleNavigate('/auth', 'auth')}
                className="block w-full px-4 py-3 text-center text-white border border-gray-700 rounded-lg hover:bg-white/10 transition-all duration-200"
              >
                Sign In
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
