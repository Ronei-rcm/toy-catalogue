
// Order-related type definitions
import { Product } from './product';

export type OrderItem = {
  productId: string;
  quantity: number;
  price: number;
};

export type ShippingAddress = {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
};

export type OrderStatus = "processing" | "shipped" | "delivered" | "canceled" | "returned" | "refunded";

export type Order = {
  id: string;
  customerId: string;
  products: OrderItem[];
  status: OrderStatus;
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  couponCode?: string;
  discount?: number;
  trackingNumber?: string;
  deliveryEstimate?: string;
  notes?: string;
};

export type PaymentMethod = {
  id: string;
  name: string;
  type: "credit_card" | "debit_card" | "pix" | "bank_slip" | "cash_on_delivery";
  active: boolean;
};
