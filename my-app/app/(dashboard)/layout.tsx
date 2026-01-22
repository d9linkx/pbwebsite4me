"use client";

import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Breadcrumbs } from "@/components/dashboard/Breadcrumbs";
import { MobileMenu } from "@/components/dashboard/MobileMenu";
import { DesktopSidebar } from "@/components/dashboard/DesktopSidebar";
import { ProcessingMinimizedBar } from "@/components/dashboard/ProcessingMinimizedBar";
import { useAppStore } from "@/stores/appStore";
import { useAuth } from "@/utils/apiHooks";
import { socketService } from "@/utils/socket";
import { useConnectionStatus, useSocketEvent } from "@/utils/useSocket";
import { useOfflineBanner } from "@/utils/useOffline";
import { ROUTES } from "@/lib/routes";
import type {
  Notification as NotificationType,
  Bid,
  DeliveryStatus,
} from "@/types/index";
import { toast } from "sonner";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  // Auth state
  const { user: authUser, loading: authLoading } = useAuth();

  // Global state
  const {
    user,
    activeRole,
    setUser,
    setActiveRole,
    notifications,
    setNotifications,
    initializeNotifications,
    cleanupNotifications,
    deliveryJobs,
    updateDeliveryJob,
    isMobileMenuOpen,
    setMobileMenuOpen,
    processingJob,
    isProcessingMinimized,
    processingBidCount,
    setProcessingBidCount,
    clearProcessingJob,
  } = useAppStore();

  // Connection status
  const { showStatus, statusMessage, statusColor } = useConnectionStatus();

  // Offline detection
  const { showBanner: showOfflineBanner, isOffline } = useOfflineBanner();

  // Sync auth user with global state
  useEffect(() => {
    if (authUser) {
      setUser(authUser);
    }
  }, [authUser, setUser]);

  // Initialize WebSocket connection and notifications
  useEffect(() => {
    if (authUser) {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("auth_token")
          : null;

      socketService
        .connect(token || undefined)
        .then(() => {
          toast.success("Connected to server", { duration: 2000 });
          initializeNotifications(authUser);
        })
        .catch((error) => {
          console.error("❌ Failed to connect WebSocket:", error);
          toast.error("Failed to connect to server");
        });

      return () => {
        socketService.disconnect();
        cleanupNotifications();
      };
    }
  }, [authUser, initializeNotifications, cleanupNotifications]);

  // Listen for real-time notifications
  useSocketEvent("notification:new", (notification: NotificationType) => {
    setNotifications([notification, ...notifications]);
    toast.info(notification.message, {
      duration: 5000,
      action: notification.actionUrl
        ? {
            label: "View",
            onClick: () => router.push(notification.actionUrl!),
          }
        : undefined,
    });
  });

  // Listen for job status updates
  useSocketEvent(
    "job:status-update",
    (data: { jobId: string; status: string; updatedAt: string }) => {
      updateDeliveryJob(data.jobId, {
        status: data.status as DeliveryStatus,
        updatedAt: data.updatedAt,
      });

      const job = deliveryJobs.find((j) => j.id === data.jobId);
      if (job) {
        toast.info(`Job "${job.title}" status updated to ${data.status}`, {
          duration: 4000,
          action: {
            label: "View",
            onClick: () =>
              router.push(`${ROUTES.AVAILABLE_JOBS}/${data.jobId}`),
          },
        });
      }
    },
  );

  // Listen for new bids
  useSocketEvent("job:new-bid", (data: { jobId: string; bid: Bid }) => {
    if (processingJob && processingJob.id === data.jobId) {
      setProcessingBidCount(processingBidCount + 1);
    }

    const job = deliveryJobs.find((j) => j.id === data.jobId);
    if (job && job.senderId === user?.id) {
      toast.success("New bid received on your delivery", {
        duration: 4000,
        action: {
          label: "View Bids",
          onClick: () =>
            router.push(`${ROUTES.AVAILABLE_JOBS}/${data.jobId}/bids`),
        },
      });
    }
  });

  // Listen for bid acceptance
  useSocketEvent(
    "job:bid-accepted",
    (data: { jobId: string; bidId: string }) => {
      if (processingJob && processingJob.id === data.jobId) {
        clearProcessingJob();
      }

      toast.success("Your bid was accepted!", {
        duration: 5000,
        action: {
          label: "View Job",
          onClick: () => router.push(`${ROUTES.AVAILABLE_JOBS}/${data.jobId}`),
        },
      });
    },
  );

  // Auth guard
  useEffect(() => {
    if (!authLoading && !authUser && pathname !== ROUTES.AUTH) {
      router.push(ROUTES.AUTH);
    }
  }, [authLoading, authUser, pathname, router]);

  // Loading state
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!authUser) {
    return null;
  }

  // Determine if header should be hidden for full-screen pages
  const shouldHideHeader = () => {
    const hideHeaderRoutes = [ROUTES.NOTIFICATIONS, ROUTES.PROFILE_INFORMATION];
    return hideHeaderRoutes.some((route) => pathname.startsWith(route));
  };

  // Calculate processing bar visibility and height
  const isProcessingBarVisible = !!(
    processingJob &&
    isProcessingMinimized &&
    !isMobileMenuOpen &&
    !shouldHideHeader()
  );
  const processingBarHeight = isProcessingBarVisible ? 60 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-darker to-[#0f0f0f] flex flex-col">
      {/* Processing Minimized Bar */}
      {!shouldHideHeader() && !isMobileMenuOpen && <ProcessingMinimizedBar />}

      {/* Header */}
      {!shouldHideHeader() && (
        <div
          className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
          style={{ top: `${processingBarHeight}px` }}
        >
          <DashboardHeader
            activeRole={activeRole}
            onRoleChange={setActiveRole}
            onNotificationsClick={() => router.push(ROUTES.NOTIFICATIONS)}
            onMenuToggle={() => setMobileMenuOpen(!isMobileMenuOpen)}
            onProfileClick={() => router.push(ROUTES.PROFILE_INFORMATION)}
            onNavigate={(route: string) => router.push(route)}
            isMenuOpen={isMobileMenuOpen}
            notifications={notifications}
            user={user || undefined}
            currentPath={pathname}
            onAlertsClick={() =>
              router.push(`${ROUTES.NOTIFICATIONS}?tab=alerts`)
            }
          />
        </div>
      )}

      {/* Connection Status */}
      {showStatus && (
        <div
          className={`sticky top-0 left-0 right-0 z-30 ${statusColor} text-white py-2 px-4 text-center text-sm font-medium transition-all duration-300 shadow-md`}
        >
          <div className="flex items-center justify-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${statusColor === "bg-yellow-500" || statusColor === "bg-red-500" ? "animate-pulse" : ""} bg-white`}
            ></div>
            {statusMessage}
          </div>
        </div>
      )}

      {/* Offline Banner */}
      {showOfflineBanner && (
        <div
          className={`sticky top-0 left-0 right-0 z-30 ${isOffline ? "bg-gray-800" : "bg-green-600"} text-white py-2 px-4 text-center text-sm font-medium transition-all duration-300 shadow-md`}
        >
          <div className="flex items-center justify-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${isOffline ? "bg-gray-400" : "bg-white"}`}
            ></div>
            {isOffline
              ? "You are offline. Some features may be unavailable."
              : "Back online!"}
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden lg:mt-24">
        {/* Desktop Sidebar */}
        <div className="hidden xl:block flex-shrink-0 fixed h-full">
          <DesktopSidebar currentPath={pathname} />
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-hidden flex flex-col overflow-x-hidden">
          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="fixed inset-0 z-50 xl:hidden">
              <MobileMenu
                isOpen={isMobileMenuOpen}
                onClose={() => setMobileMenuOpen(false)}
                user={user}
                activeRole={activeRole}
                currentPath={pathname}
              />
            </div>
          )}

          {/* Breadcrumbs */}
          {!shouldHideHeader() && (
            <div className="xl:max-w-[896px] xl:mx-auto">
              <Breadcrumbs />
            </div>
          )}

          {/* Page Content */}
          <main
            className={`flex-1 overflow-y-auto overflow-x-hidden ${shouldHideHeader() ? "pb-6" : "pb-24 xl:pb-6"}`}
            style={{
              paddingTop: shouldHideHeader()
                ? "0px"
                : `${processingBarHeight + 20}px`,
            }}
          >
            <div className="xl:max-w-[70vw] xl:mx-auto rounded-2xl bg-dark">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
