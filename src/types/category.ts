export interface Category {
  id: string;
  name: string;
  slug: string;
  imageUrl: string | null;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
} 