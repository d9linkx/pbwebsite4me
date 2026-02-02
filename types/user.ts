export interface MediaAsset {
  url?: string;
  public_id?: string;
}

export interface Coordinates {
  longitude?: number;
  latitude?: number;
}

export interface Address {
  street?: string;
  city?: string;
  state?: string;
  country?: string;
  zipCode?: string;
  coordinates?: Coordinates;
}

export interface UserRating {
  userId: string;
  rating: number; // 1 - 5
  review?: string;
  packageId?: string;
  createdAt?: string | Date;
}

export type TokenType = "access" | "refresh";

export interface AuthToken {
  token: string;
  type: TokenType;
  createdAt?: string | Date;
  expiresAt?: string | Date;
  device?: string;
  ip?: string;
}

export interface UserPreferences {
  language?: string; // default: "en"
  currency?: string; // default: "NGN"
  timezone?: string; // default: "Africa/Lagos"
}

export interface UserNotifications {
  deliveryUpdate?: boolean;
  email?: boolean;
  sms?: boolean;
  push?: boolean;
}

export interface NIN {
  number?: string;
  verified?: boolean;
}

export interface OtherDocument {
  docType?: string;
  docUrl?: string;
}

export interface UserLocation {
  longitude?: number;
  latitude?: number;
  lastUpdated?: string | Date;
}

export type UserRole = "user" | "admin" | "super-admin";
export type UserStatus = "active" | "inactive" | "suspended" | "deactivated";
export type UserMode = "receiver" | "sender" | "pal" | "proxy";

export type UserPermission =
  | "manage_users"
  | "manage_packages"
  | "view_analytics"
  | "manage_payments"
  | "manage_settings";

export interface User {
  _id: string;

  email: string;
  userName: string;
  firstName: string;
  lastName: string;
  profileImage?: string;

  /** Optional on OAuth users */
  password?: string;

  phoneNumber: string;

  photo?: MediaAsset;
  documentUrl?: MediaAsset;

  nin?: NIN;
  otherDocument?: OtherDocument;

  address?: {
    home?: Address;
    office?: Address;
  };

  location?: UserLocation;

  preferences?: UserPreferences;
  notifications?: UserNotifications;

  twoFactorAuth?: boolean;
  oauth?: boolean;

  tier?: 1 | 2 | 3 | 4 | 5;
  role?: UserRole;
  permissions?: UserPermission[];

  status?: UserStatus;

  balance?: number;

  rating?: UserRating[];
  averageRating?: number;
  totalRatings?: number;

  completedDeliveries?: number;
  cancelledDeliveries?: number;

  isVerified?: boolean;
  emailVerified?: boolean;
  phoneVerified?: boolean;

  tokens?: AuthToken[];

  verificationCode?: string;
  verificationCodeExpires?: string | Date;

  passwordChangedAt?: string | Date;
  passwordResetToken?: string;
  passwordResetExpires?: string | Date;

  lastLoginDate?: string | Date;
  lastActiveDate?: string | Date;

  loginAttempts?: number;
  lockUntil?: string | Date;

  deactivatedAt?: string | Date;
  deactivationReason?: string;

  createdAt?: string | Date;
  updatedAt?: string | Date;
}
