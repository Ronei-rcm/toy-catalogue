// Product-related type definitions
export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  imageUrl: string; // Adicionando imageUrl como alternativa
};

export type Subcategory = {
  id: string;
  name: string;
  slug: string;
  description: string;
  categoryId: string;
  image?: string;
  imageUrl?: string;
};

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice: number | null;
  imageUrl: string | null;
  images: string[];
  rating: number | null;
  brand: {
    id: string;
    name: string;
    slug: string;
    logoUrl: string | null;
  } | null;
  createdAt: Date;
  updatedAt: Date;
}

export type Review = {
  id: string;
  productId: string;
  customerId: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt?: string;
  status: "pending" | "approved" | "rejected";
  adminResponse?: string;
};

export type Supplier = {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: import('./order').ShippingAddress;
  status: "active" | "inactive";
  products: string[]; // IDs dos produtos
};
