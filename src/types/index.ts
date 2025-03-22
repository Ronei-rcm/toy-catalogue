// Re-export all types from domain-specific files
export * from './product';
export * from './order';
export * from './user';
export * from './cart';
export * from './promotion';
export * from './database';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN';
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Subcategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
  categoryId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Order {
  id: string;
  userId: string;
  status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  total: number;
  items: OrderItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
  product: Product;
}

export interface Address {
  id: number;
  userId: number;
  user?: User;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  createdAt: string;
  updatedAt: string;
}

export interface SiteSettings {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  socialMedia: {
    facebook?: string;
    instagram?: string;
    whatsapp?: string;
  };
  shipping: {
    freeShipping: boolean;
    minFreeShipping: number;
  };
  payment: {
    creditCard: boolean;
    pix: boolean;
    bankTransfer: boolean;
  };
}
