import React from "react";
import { User, DeliveryJob, UserRole, ProxyItem, Notification } from "@/types";
import { filterNotificationsByRole } from "@/utils/helpers";
import { RoleSpecificContent } from "@/components/dashboard/RoleSpecificContent";
import { ROUTES } from "@/lib/routes";
import { calculateDashboardStats } from "@/utils/dashboard";

interface DashboardScreenProps {
  user: User | null;
  activeRole: UserRole;
  onJobSelect: (job: DeliveryJob) => void;
  onRoleChange: (role: UserRole) => void;
  onNavigate: (route: string) => void;
  userJobs: DeliveryJob[];
  allJobs: DeliveryJob[];
  proxyItems: ProxyItem[];
  selectedRoute: string | null;
  onRouteSelect: (route: string) => void;
  onBack: () => void;
  handleCall: (phone: string) => void;
  notifications?: Notification[];
  onActionClick?: (action: string) => void;
}

export function DashboardScreen({
  user,
  activeRole,
  onJobSelect,
  onRoleChange,
  onNavigate,
  userJobs,
  allJobs,
  proxyItems,
  selectedRoute,
  onRouteSelect,
  onBack,
  handleCall,
  notifications = [],
  onActionClick,
}: DashboardScreenProps) {
  const stats = calculateDashboardStats(activeRole, allJobs, proxyItems, user);
  const roleBasedNotifications = filterNotificationsByRole(
    notifications,
    activeRole,
  );

  const handleEnhancedActionClick = (action: string) => {
    if (onActionClick) {
      onActionClick(action);
      return;
    }

    // Fallback navigation mapping
    const navigationMap: Record<string, string> = {
      "post-delivery": `${ROUTES.AVAILABLE_JOBS}/post`,
      "available-jobs": ROUTES.AVAILABLE_JOBS,
      "accepted-bids": ROUTES.ACCEPTED_BIDS,
      "accepted-bids-completed": `${ROUTES.MY_DELIVERIES}?filter=completed`,
      "my-deliveries": ROUTES.MY_DELIVERIES,
      wallet: ROUTES.WALLET,
      settings: ROUTES.SETTINGS,
      "wallet-add-funds": `${ROUTES.WALLET}/add-funds`,
      referral: ROUTES.REFERRAL,
      "tape-distributor": ROUTES.TAPE_DISTRIBUTOR,
    };

    const route = navigationMap[action];
    if (route) {
      onNavigate(route);
    } else {
      console.warn("Unknown action:", action);
    }
  };

  const handleEnhancedSpecialActionClick = (action: string) => {
    if (action === "accepted-bids") {
      onNavigate(ROUTES.ACCEPTED_BIDS);
    } else if (action === "proxy-dashboard") {
      onNavigate(ROUTES.PROXY_DASHBOARD);
    } else {
      console.warn("Unknown special action:", action);
    }
  };

  const handleNavigateToSponsorship = () => {
    onNavigate(ROUTES.SPONSORSHIP);
  };

  return (
    <RoleSpecificContent
      activeRole={activeRole}
      stats={stats}
      user={user}
      allJobs={allJobs}
      onActionClick={onActionClick || handleEnhancedActionClick}
      onSpecialActionClick={handleEnhancedSpecialActionClick}
      onNavigateToSponsorship={handleNavigateToSponsorship}
      onJobSelect={onJobSelect}
    />
  );
}
