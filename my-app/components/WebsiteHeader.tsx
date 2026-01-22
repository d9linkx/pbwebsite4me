"use client";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { ROUTES } from "@/lib/routes";
import Image from "next/image";

interface NavItem {
  label: string;
  path: string;
}

const MENU_ITEMS: NavItem[] = [
  { label: "Home", path: ROUTES.HOME },
  { label: "About", path: ROUTES.ABOUT },
  { label: "How It Works", path: ROUTES.HOW_IT_WORKS },
  { label: "Pricing", path: ROUTES.PRICING },
  { label: "Safety", path: ROUTES.SAFETY },
  { label: "FAQs", path: ROUTES.FAQS },
  { label: "Contact", path: ROUTES.CONTACT },
];

const GET_STARTED_ITEMS: NavItem[] = [
  { label: "Become a Pal", path: ROUTES.BECOME_PAL },
  { label: "Become a Proxy", path: ROUTES.BECOME_PROXY },
  { label: "Send Items", path: ROUTES.SEND_ITEMS },
];

export function WebsiteHeader() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isGetStartedOpen, setIsGetStartedOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleNavigate = (path: string) => {
    router.push(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
    closeMenus();
  };

  const closeMenus = () => {
    setIsMobileMenuOpen(false);
    setIsGetStartedOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsGetStartedOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-dark border-b border-gray-800">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Logo onNavigate={handleNavigate} />
          <DesktopNav items={MENU_ITEMS} onNavigate={handleNavigate} />

          <div className="hidden lg:flex items-center space-x-4">
            <button
              onClick={() => handleNavigate(ROUTES.AUTH)}
              className="px-6 py-2.5 text-white hover:text-primary transition-colors duration-200"
            >
              Sign In
            </button>
            <GetStartedDropdown
              items={GET_STARTED_ITEMS}
              isOpen={isGetStartedOpen}
              onToggle={() => setIsGetStartedOpen(!isGetStartedOpen)}
              onNavigate={handleNavigate}
              dropdownRef={dropdownRef}
            />
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <MobileMenu
          menuItems={MENU_ITEMS}
          getStartedItems={GET_STARTED_ITEMS}
          onNavigate={handleNavigate}
        />
      )}
    </header>
  );
}

function Logo({ onNavigate }: { onNavigate: (path: string) => void }) {
  return (
    <button
      onClick={() => onNavigate(ROUTES.HOME)}
      className="flex items-center space-x-3 group"
      aria-label="Go to home"
    >
      <Image
        src="/P-logo.png"
        alt="Prawnbox Logo"
        width={100}
        height={100}
        className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-200"
      />
      <span className="text-2xl font-bold text-white">Prawnbox</span>
    </button>
  );
}

function DesktopNav({
  items,
  onNavigate,
}: {
  items: NavItem[];
  onNavigate: (path: string) => void;
}) {
  return (
    <nav className="hidden lg:flex items-center space-x-1">
      {items.map((item) => (
        <button
          key={item.path}
          onClick={() => onNavigate(item.path)}
          className="px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
}

function GetStartedDropdown({
  items,
  isOpen,
  onToggle,
  onNavigate,
  dropdownRef,
}: {
  items: NavItem[];
  isOpen: boolean;
  onToggle: () => void;
  onNavigate: (path: string) => void;
  dropdownRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={onToggle}
        className="px-6 py-2.5 text-primary hover:text-primary-hover transition-all duration-200 flex items-center space-x-1 font-semibold"
        aria-expanded={isOpen}
      >
        <span>Get Started</span>
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-56 bg-darker border border-gray-800 rounded-lg shadow-xl overflow-hidden z-50">
          {items.map((item) => (
            <button
              key={item.path}
              onClick={() => onNavigate(item.path)}
              className="block w-full text-left px-4 py-3 text-gray-300 hover:text-white hover:bg-primary-light transition-all duration-200 border-b border-gray-800 last:border-b-0"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function MobileMenu({
  menuItems,
  getStartedItems,
  onNavigate,
}: {
  menuItems: NavItem[];
  getStartedItems: NavItem[];
  onNavigate: (path: string) => void;
}) {
  return (
    <div className="lg:hidden bg-darker border-t border-gray-800 w-full">
      <nav className="px-4 py-6 space-y-2 max-w-7xl mx-auto">
        {menuItems.map((item) => (
          <button
            key={item.path}
            onClick={() => onNavigate(item.path)}
            className="block w-full text-left px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
          >
            {item.label}
          </button>
        ))}
        <div className="pt-4 border-t border-gray-800 mt-4">
          <p className="px-4 py-2 text-sm font-semibold text-gray-400">
            Get Started
          </p>
          {getStartedItems.map((item) => (
            <button
              key={item.path}
              onClick={() => onNavigate(item.path)}
              className="block w-full text-left px-4 py-3 text-gray-300 hover:text-white hover:bg-primary-light rounded-lg transition-all duration-200"
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="pt-4 space-y-2">
          <button
            onClick={() => onNavigate(ROUTES.AUTH)}
            className="block w-full px-4 py-3 text-center text-white border border-gray-700 rounded-lg hover:bg-white/10 transition-all duration-200"
          >
            Sign In
          </button>
        </div>
      </nav>
    </div>
  );
}
