import { User, UserMode } from "@/types/user";
import { UserRole, DeliveryJob, Notification } from "../types";

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatPhoneNumber = (phoneNumber: string): string => {
  return phoneNumber.startsWith("+234")
    ? phoneNumber
    : `+234${phoneNumber.substring(1)}`;
};

export const isValidPassword = (
  password: string,
  minLength: number = 8,
): boolean => {
  if (password.trim().length < minLength) return false;

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).+$/;

  return passwordRegex.test(password.trim());
};

/**
 * Validates a username.
 * Rules:
 * - Only letters (a-z, A-Z) and numbers (0-9)
 * - Length between 3 and 30 characters
 */
export const isValidUsername = (username: string): boolean => {
  const usernameRegex = /^[a-zA-Z0-9]{3,30}$/;
  return usernameRegex.test(username);
};

export const getUserJobs = (
  userId: string,
  userMode: UserMode,
  deliveryJobs: DeliveryJob[],
): DeliveryJob[] => {
  switch (userMode) {
    case "sender":
      return deliveryJobs.filter((job) => job.senderId === userId);
    case "pal":
      return deliveryJobs.filter((job) => job.selectedPalId === userId);
    case "receiver":
      return deliveryJobs.filter((job) => job.receiverId === userId);
    case "proxy":
      return deliveryJobs.filter((job) => job.proxyId === userId);
    default:
      return [];
  }
};

export const enhanceUserWithDefaults = (userData: User): User => {
  return {
    ...userData,
    balance: userData.balance ?? 25000,
    completedDeliveries: userData.completedDeliveries ?? 12,
    averageRating: userData.averageRating ?? 4.8,
    isVerified: userData.isVerified ?? true,
    // preferences: userData.preferences || {
    //   notifications: {
    //     push: true,
    //     email: true,
    //     sms: false,
    //   },
    //   privacy: {
    //     shareLocation: false,
    //     shareProfile: false,
    //   },
    //   delivery: {
    //     autoAcceptRadius: 5,
    //     preferredVehicles: ["car"],
    //   },
    //   emailUpdate: true,
    //   smsUpdate: false,
    // },
  };
};

// 🔥 NOTIFICATION TYPE TO ROLE MAPPING
const notificationTypeToRoles: Record<Notification["type"], UserMode[]> = {
  // Sender-specific notifications
  "package-created": ["sender"],
  "package-update": ["sender"],
  "item-edit-request": ["sender"],
  "bid-placed": ["sender"],
  bid_accepted: ["sender"], // Add bid_accepted for sender (matches server schema)
  "bid-rejected": ["sender"],
  "dispute-flagged": ["sender"],

  // Pal-specific notifications
  "delivery-assigned": ["pal"],
  "rating-received": ["pal"],
  "item-verified": ["pal"],

  // Receiver-specific notifications
  "delivery-update": ["receiver", "pal"],
  "delivery-picked-up": ["receiver", "sender"],

  // Shared notifications
  "delivery-completed": ["sender", "receiver", "pal"],
  "payment-received": ["sender", "pal", "receiver", "proxy"],
  "wallet-topup": ["sender", "pal", "receiver", "proxy"],

  // Additional notification types
  "delivery-posted": ["sender", "pal", "receiver"], // When a new delivery is posted
  "payment-processed": ["sender", "pal", "receiver", "proxy"], // When payment is processed
  "tip-payment": ["pal"], // When a tip is received

  // Universal notifications
  "system-message": ["sender", "pal", "receiver", "proxy"],
  "promo-offer": ["sender", "pal", "receiver", "proxy"],
};

// Helper function to filter notifications by active role
export const filterNotificationsByRole = (
  notifications: Notification[],
  activeMode: UserMode,
): Notification[] => {
  return notifications.filter((notification) => {
    const allowedRoles = notificationTypeToRoles[notification.type];
    return allowedRoles?.includes(activeMode) || false;
  });
};

// Helper function to get unread notification count for a specific role
export const getUnreadNotificationCountForRole = (
  notifications: Notification[],
  activeMode: UserMode,
): number => {
  const roleNotifications = filterNotificationsByRole(
    notifications,
    activeMode,
  );
  return roleNotifications.filter((n) => !n.read).length;
};

export const getRoleInstructions = (activeMode: string) => {
  switch (activeMode) {
    case "sender":
      return {
        title: "Send an item",
        description:
          "Start by posting your delivery request. Choose your pickup and drop-off locations, describe what you're sending, and let our trusted Pals bid on your delivery.",
      };
    case "pal":
      return {
        title: "Start delivery",
        description:
          "Check your active deliveries, browse available jobs in your area, and pick up items ready for delivery. The more deliveries you complete, the more you earn.",
      };
    case "receiver":
      return {
        title: "Receive item",
        description:
          "Track your incoming packages, see when they'll arrive, and communicate directly with your Pal. Stay updated on all items being delivered to you.",
      };
    case "proxy":
      return {
        title: "Store items",
        description:
          "Keep track of items in your storage, handle pickups and drop-offs, and earn fees for providing secure storage services to your community.",
      };
    default:
      return {
        title: "Quick Actions",
        description: "Choose an action below to get started",
      };
  }
};

export const canSwitchToMode = (user: User, mode: UserMode) => {
  switch (user.tier) {
    case 1:
      return mode === "receiver";
    case 2:
      return ["receiver", "sender", "pal"].includes(mode);
    case 3:
      return ["receiver", "sender", "pal", "proxy"].includes(mode);
    default:
      return false;
  }
};
