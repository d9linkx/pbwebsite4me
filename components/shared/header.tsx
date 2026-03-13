"use client";

import React, { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import Logo from "./logo";
import Link from "next/link";
import { cn } from "../ui/utils";

interface NavItem {
  label: string;
  path: string;
}

const MENU_ITEMS: NavItem[] = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "How It Works", path: "/how-it-works" },
  { label: "Pricing", path: "/pricing" },
  { label: "Safety", path: "/safety" },
  { label: "FAQs", path: "/faqs" },
  { label: "Contact", path: "/contact" },
];

const JOIN_ITEMS: NavItem[] = [
  { label: "Become a Pal", path: "/become-pal" },
  { label: "Become a Proxy", path: "/become-proxy" },
  { label: "Send Items", path: "/send-items" },
];

export function WebsiteHeader() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isJoinOpen, setIsJoinOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const handleNavigate = (path: string) => {
    router.push(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
    closeMenus();
  };

  const closeMenus = () => {
    setIsMobileMenuOpen(false);
    setIsJoinOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsJoinOpen(false);
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

          <DesktopNav
            items={MENU_ITEMS}
            onNavigate={handleNavigate}
            pathname={pathname}
          />

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Secondary CTA: Sign In */}
            <button
              onClick={() => {
                window.location.href = "https://app.prawnbox.com/login";
              }}
              className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors duration-200"
            >
              Sign In
            </button>

            {/* Primary CTA: split-button — label registers directly, chevron reveals role paths */}
            <JoinDropdown
              items={JOIN_ITEMS}
              isOpen={isJoinOpen}
              onToggle={() => setIsJoinOpen(!isJoinOpen)}
              dropdownRef={dropdownRef}
              pathname={pathname}
            />
          </div>

          {/* Mobile menu toggle */}
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
          joinItems={JOIN_ITEMS}
          onNavigate={handleNavigate}
          pathname={pathname}
        />
      )}
    </header>
  );
}

function DesktopNav({
  items,
  onNavigate,
  pathname,
}: {
  items: NavItem[];
  onNavigate: (path: string) => void;
  pathname: string;
}) {
  return (
    <nav className="hidden lg:flex items-center space-x-6">
      {items.map((item) => (
        <Link
          key={item.label}
          href={item.path}
          className={cn(
            "hover:text-primary",
            pathname === item.path && "text-primary",
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

function JoinDropdown({
  items,
  isOpen,
  onToggle,
  dropdownRef,
  pathname,
}: {
  items: NavItem[];
  isOpen: boolean;
  onToggle: () => void;
  dropdownRef: React.RefObject<HTMLDivElement | null>;
  pathname: string;
}) {
  return (
    <div className="relative flex" ref={dropdownRef}>
      {/* Primary action */}
      <button
        onClick={() => {
          window.location.href = "https://app.prawnbox.com/register";
        }}
        className="px-5 py-2.5 bg-primary text-white font-semibold rounded-l-lg hover:bg-primary-hover transition-all duration-200 text-sm"
      >
        Get Started
      </button>

      {/* Role-picker toggle */}
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-label="Choose how to get started"
        className="px-2.5 py-2.5 bg-primary text-white rounded-r-lg hover:bg-primary-hover transition-all duration-200 border-l border-white/20"
      >
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-52 bg-darker border border-gray-800 rounded-lg shadow-xl overflow-hidden z-50">
          <p className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            I want to…
          </p>
          {items.map((item) => (
            <Link
              href={item.path}
              className={cn(
                "block px-4 py-3 hover:bg-primary border-t border-gray-800",
                pathname === item.path && "bg-primary",
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function MobileMenu({
  menuItems,
  joinItems,
  onNavigate,
  pathname,
}: {
  menuItems: NavItem[];
  joinItems: NavItem[];
  onNavigate: (path: string) => void;
  pathname: string;
}) {
  return (
    <div className="lg:hidden bg-darker border-t border-gray-800 w-full overflow-scroll max-h-screen pb-16">
      <nav className="px-4 py-6 space-y-2 max-w-7xl mx-auto">
        {menuItems.map((item) => (
          <Link
            href={item.path}
            className={cn(
              "block px-4 py-3 hover:text-primary",
              pathname === item.path && "text-primary",
            )}
          >
            {item.label}
          </Link>
        ))}

        <div className="pt-4 border-t border-gray-800 mt-4 space-y-3">
          <button
            onClick={() => {
              window.location.href = "https://app.prawnbox.com/register";
            }}
            className="block w-full px-4 py-3 text-center text-white bg-primary font-semibold rounded-lg hover:bg-primary-hover transition-all duration-200"
          >
            Get Started
          </button>

          <div className="space-y-1">
            <p className="px-4 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              I want to…
            </p>
            {joinItems.map((item) => (
              <Link
                href={item.path}
                className={cn(
                  "block px-4 py-2.5 text-gray-400 hover:text-white hover:bg-primary-light rounded-lg transition-all duration-200 text-sm",
                  pathname === item.path && "text-primary",
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <button
            onClick={() => {
              window.location.href = "https://app.prawnbox.com/login";
            }}
            className="block w-full px-4 py-3 text-center text-gray-300 border border-gray-700 rounded-lg hover:text-white hover:bg-white/10 transition-all duration-200"
          >
            Sign In
          </button>
        </div>
      </nav>
    </div>
  );
}
