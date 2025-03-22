
// Promotion-related type definitions
export type Promotion = {
  id: string;
  name: string;
  description: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  code?: string;
  startDate: string;
  endDate: string;
  applicableProducts: "all" | string[]; // "all" ou array de IDs de produtos
  applicableCategories: "all" | string[]; // "all" ou array de IDs de categorias
  minimumPurchase?: number;
  maxUses?: number;
  usesCount: number;
  exclusive: boolean; // Se é exclusivo para assinantes
  status: "active" | "inactive";
};
