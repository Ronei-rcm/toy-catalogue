
// Cart-related type definitions
import { Product } from './product';

export type CartItem = {
  product: Product;
  quantity: number;
};

export type Cart = {
  items: CartItem[];
  total: number;
  couponCode?: string;
  discount?: number;
};
