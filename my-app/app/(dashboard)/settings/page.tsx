"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { SettingsScreen } from "@/components/SettingsScreen";
import { useAppStore } from "@/stores/appStore";
import type { Screen } from "@/types/index";

export default function SettingsPage() {
  const router = useRouter();

  const { user, reset } = useAppStore();

  const handleNavigate = (screen: Screen) => {
    const routeMap: Partial<Record<Screen, string>> = {
      "profile-information": "/settings/profile",
      verification: "/settings/verification",
      "payment-methods": "/settings/payment-methods",
      "help-center": "/help",
      "contact-support": "/help/contact",
      ratings: "/ratings",
      referral: "/referrals",
      dashboard: "/dashboard",
    };

    const route = routeMap[screen] || "/";
    router.push(route);
  };

  const handleBack = () => {
    router.push("/");
  };

  const handleLogout = () => {
    // Clear all app state
    reset();
    // Clear localStorage
    localStorage.removeItem("auth_token");
    localStorage.removeItem("prawnbox_user");
    // Redirect to auth
    router.push("/auth");
  };

  return (
    <div className="container mx-auto">
      <SettingsScreen
        user={user}
        onNavigate={handleNavigate}
        onBack={handleBack}
        onLogout={handleLogout}
      />
    </div>
  );
}
