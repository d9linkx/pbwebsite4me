"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DashboardScreen } from "@/components/dashboard/DashboardScreen";
import { useAppStore } from "@/stores/appStore";
import { ROUTES } from "@/lib/routes";
import type { DeliveryJob, ItemSize, DeliveryStatus } from "@/types/index";
import { getUserPackages } from "@/utils/packageFilters";
import { apiService } from "@/utils/apiService";
import { toast } from "sonner";

interface BackendPackage {
  _id?: string;
  id?: string;
  orderNumber?: string;
  title: string;
  description?: string;
  status?: string;
  pickupDate?: string;
  pickupTime?: string;
  pickupLocation?: string;
  dropoffLocation?: string;
  notes?: string;
  price?: number;
  value?: number;
  category?: string;
  weight?: string;
  createdAt?: string;
  sender?: {
    senderId?: string | { _id: string };
    name?: string;
    phone?: string;
    formattedAddress?: string;
    address?: string;
  };
  receiver?: {
    receiverId?: string;
    name?: string;
    phone?: string;
    formattedAddress?: string;
    address?: string;
  };
  items?: Array<{
    size?: string;
    category?: string;
    weight?: string | number;
    images?: Array<{ url: string }>;
  }>;
  pal?: {
    palId?: string;
    name?: string;
    phone?: string;
  };
  proxy?: {
    proxyId?: string;
    name?: string;
    phone?: string;
  };
  bids?: Array<{
    _id?: string;
    id?: string;
    palId?: string;
    palName?: string;
    palRating?: number;
    amount?: number;
    vehicleType?: string;
    estimatedTime?: string;
    message?: string;
    canEdit?: boolean;
    isAccepted?: boolean;
    placedAt?: string;
    createdAt?: string;
    [key: string]: unknown;
  }>;
}

export default function DashboardPage() {
  const router = useRouter();

  const {
    user,
    activeRole,
    deliveryJobs,
    proxyItems,
    notifications,
    setSelectedJob,
    setActiveRole,
    setDeliveryJobs,
  } = useAppStore();

  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);

  // Fetch packages from backend
  useEffect(() => {
    const fetchPackages = async () => {
      if (!user) {
        router.push(ROUTES.AUTH);
        return;
      }

      try {
        const response = await apiService.getAllPackages();

        if (response.success && response.data) {
          const mappedJobs: DeliveryJob[] = response.data.map(
            (pkg: BackendPackage) => {
              const senderId = pkg.sender?.senderId
                ? typeof pkg.sender.senderId === "object"
                  ? pkg.sender.senderId._id
                  : pkg.sender.senderId
                : user?.id || "";

              return {
                id: pkg._id || pkg.id || "",
                orderNumber:
                  pkg.orderNumber ||
                  `ORD-${(pkg._id || "").slice(0, 8).toUpperCase()}`,
                senderId,
                senderName: pkg.sender?.name || user?.name || "",
                senderPhone: pkg.sender?.phone || user?.phone || "",
                title: pkg.title,
                description: pkg.description || "",
                pickupLocation:
                  pkg.sender?.formattedAddress ||
                  pkg.sender?.address ||
                  pkg.pickupLocation ||
                  "Pickup address not specified",
                dropoffLocation:
                  pkg.receiver?.formattedAddress ||
                  pkg.receiver?.address ||
                  pkg.dropoffLocation ||
                  "Delivery address not specified",
                itemSize: (pkg.items?.[0]?.size as ItemSize) || "Medium",
                category: pkg.items?.[0]?.category || pkg.category || "",
                weight: pkg.items?.[0]?.weight?.toString() || pkg.weight || "",
                value: pkg.price || pkg.value || 0,
                receiverId: pkg.receiver?.receiverId,
                receiverName: pkg.receiver?.name || "",
                receiverPhone: pkg.receiver?.phone || "",
                selectedPalId: pkg.pal?.palId,
                selectedPalName: pkg.pal?.name,
                selectedPalPhone: pkg.pal?.phone,
                proxyId: pkg.proxy?.proxyId,
                proxyName: pkg.proxy?.name,
                status: (pkg.status as DeliveryStatus) || "pending",
                pickupDate: pkg.pickupDate || new Date().toISOString(),
                pickupTime: pkg.pickupTime || "12:00",
                notes: pkg.notes || "",
                images: pkg.items?.[0]?.images?.map((img) => img.url) || [],
                bids:
                  pkg.bids?.map((bid) => ({
                    id: bid._id || bid.id || "",
                    palId: bid.palId || "",
                    palName: bid.palName || "",
                    palRating: bid.palRating || 0,
                    vehicleType:
                      (bid.vehicleType as "car" | "bike" | "van" | "truck") ||
                      "car",
                    estimatedTime: bid.estimatedTime || "",
                    amount: bid.amount || 0,
                    message: bid.message || "",
                    placedAt: bid.placedAt || new Date().toISOString(),
                    canEdit: bid.canEdit || false,
                    isAccepted: bid.isAccepted || false,
                    createdAt: bid.createdAt || new Date().toISOString(),
                  })) || [],
                isLive: true,
                createdAt: pkg.createdAt || new Date().toISOString(),
                distance: 0,
              } as DeliveryJob;
            },
          );

          setDeliveryJobs(mappedJobs);
        }
      } catch (error) {
        console.error("❌ Error fetching packages:", error);
        toast.error("Failed to load packages");
      }
    };

    fetchPackages();
  }, [user, router, setDeliveryJobs]);

  const handleJobSelect = (job: DeliveryJob) => {
    setSelectedJob(job);
    router.push(`${ROUTES.AVAILABLE_JOBS}/${job.id}`);
  };

  const handleCall = (phone: string) => {
    const cleanPhone = phone.replace(/\D/g, "");
    if (typeof window !== "undefined") {
      const whatsappUrl = `https://wa.me/${cleanPhone}`;
      window.open(whatsappUrl, "_blank");
    }
  };

  const handleActionClick = (action: string) => {
    const actionRoutes: Record<string, string> = {
      "post-delivery": `${ROUTES.AVAILABLE_JOBS}/post`,
      "available-jobs": ROUTES.AVAILABLE_JOBS,
      "accepted-bids": ROUTES.ACCEPTED_BIDS,
      "accepted-bids-completed": `${ROUTES.MY_DELIVERIES}?filter=completed`,
      "my-deliveries": ROUTES.MY_DELIVERIES,
      wallet: ROUTES.WALLET,
      "wallet-add-funds": `${ROUTES.WALLET}/add-funds`,
      settings: ROUTES.SETTINGS,
      referral: ROUTES.REFERRAL,
      "tape-distributor": ROUTES.TAPE_DISTRIBUTOR,
      "proxy-dashboard": ROUTES.PROXY_DASHBOARD,
    };

    const route = actionRoutes[action];
    if (route) {
      router.push(route);
    } else {
      console.warn("No route mapping for action:", action);
    }
  };

  const userJobs = useMemo(() => {
    return getUserPackages(deliveryJobs, user, activeRole);
  }, [deliveryJobs, user, activeRole]);

  return (
    <div className="container mx-auto overflow-x-hidden">
      <DashboardScreen
        user={user}
        activeRole={activeRole}
        onJobSelect={handleJobSelect}
        onRoleChange={setActiveRole}
        onNavigate={(route: string) => router.push(route)}
        userJobs={userJobs}
        allJobs={deliveryJobs}
        proxyItems={proxyItems}
        selectedRoute={selectedRoute}
        onRouteSelect={setSelectedRoute}
        onBack={() => router.back()}
        handleCall={handleCall}
        notifications={notifications}
        onActionClick={handleActionClick}
      />
    </div>
  );
}
