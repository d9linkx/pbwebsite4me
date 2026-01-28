"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { ROUTES } from "@/lib/routes";

interface BreadcrumbItem {
  label: string;
  path?: string;
}

export function Breadcrumbs() {
  const router = useRouter();
  const pathname = usePathname();

  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const breadcrumbs: BreadcrumbItem[] = [
      { label: "Dashboard", path: ROUTES.DASHBOARD },
    ];

    // Don't show breadcrumbs on dashboard home
    if (pathname === ROUTES.DASHBOARD || pathname === "/") {
      return [];
    }

    // Path to label mapping using ROUTES
    const pathLabels: Record<string, string> = {
      [ROUTES.AVAILABLE_JOBS]: "Available Jobs",
      [`${ROUTES.AVAILABLE_JOBS}/post`]: "Post Delivery",
      [ROUTES.MY_DELIVERIES]: "My Deliveries",
      [ROUTES.SENT_DELIVERIES_HISTORY]: "Sent Deliveries",
      [ROUTES.RECEIVED_DELIVERIES]: "Received Deliveries",
      [ROUTES.ACCEPTED_BIDS]: "Accepted Bids",
      [ROUTES.WALLET]: "Wallet",
      [`${ROUTES.WALLET}/add-funds`]: "Add Funds",
      [`${ROUTES.WALLET}/withdraw`]: "Withdraw Funds",
      [ROUTES.SETTINGS]: "Settings",
      [ROUTES.PROFILE_INFORMATION]: "Profile Information",
      [ROUTES.VERIFICATION]: "Verification",
      [ROUTES.PAYMENT_METHODS]: "Payment Methods",
      [ROUTES.CHAT]: "Chat",
      [ROUTES.NOTIFICATIONS]: "Notifications",
      [ROUTES.PROXY_DASHBOARD]: "Proxy Dashboard",
      [ROUTES.HELP_CENTER]: "Help Center",
      [`${ROUTES.HELP_CENTER}/contact`]: "Contact Support",
      [ROUTES.SPONSORSHIP]: "Sponsorship",
      [ROUTES.REFERRAL]: "Referrals",
      [ROUTES.RATINGS]: "Ratings & Reviews",
    };

    // Handle dynamic routes
    if (
      pathname.startsWith(ROUTES.AVAILABLE_JOBS + "/") &&
      !pathname.includes("/post") &&
      !pathname.includes("/my-deliveries")
    ) {
      if (pathname.includes("/bids")) {
        breadcrumbs.push({ label: "Job Details" });
        breadcrumbs.push({ label: "Bids" });
      } else if (pathname.includes("/tracking")) {
        breadcrumbs.push({ label: "Job Details" });
        breadcrumbs.push({ label: "Tracking" });
      } else {
        breadcrumbs.push({ label: "Job Details" });
      }
    } else if (pathname.startsWith(ROUTES.CHAT + "/")) {
      breadcrumbs.push({ label: "Chat", path: ROUTES.CHAT });
      breadcrumbs.push({ label: "Conversation" });
    } else {
      const label = pathLabels[pathname] || formatPathname(pathname);
      breadcrumbs.push({ label });
    }

    return breadcrumbs;
  };

  const formatPathname = (path: string): string => {
    return path
      .split("/")
      .filter(Boolean)
      .map((segment) => segment.replace(/-/g, " "))
      .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
      .join(" - ");
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs.length === 0) {
    return null;
  }

  return (
    <div className="hidden xl:block mt-4 mx-4 pointer-events-none">
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-2.5 shadow-sm border border-gray-100 max-w-fit pointer-events-auto">
        <nav className="flex items-center space-x-2 text-sm">
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={index}>
              {index > 0 && <span className="text-gray-400">→</span>}
              {crumb.path ? (
                <button
                  onClick={() => router.push(crumb.path!)}
                  className="text-primary hover:text-[#d63d07] transition-colors hover:underline font-medium"
                >
                  {crumb.label}
                </button>
              ) : (
                <span className="text-gray-900 font-medium">{crumb.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>
      </div>
    </div>
  );
}
