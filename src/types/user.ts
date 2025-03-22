
// User-related type definitions
import { ShippingAddress } from './order';

export type UserRole = "admin" | "customer" | "manager";

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  status: "active" | "inactive";
  phone?: string;
  address?: string;
  createdAt?: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  birthDate: string;
  addresses: ShippingAddress[];
  preferences: string[];
  createdAt: string;
  updatedAt: string;
  status: "active" | "inactive";
  loyaltyPoints?: number;
  subscriptionType?: "basic" | "premium" | "none";
  communicationPreferences?: {
    email: boolean;
    sms: boolean;
    newsletter: boolean;
  };
};

export type WishlistItem = {
  customerId: string;
  productId: string;
  addedAt: string;
};
