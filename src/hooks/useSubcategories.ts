import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';
import { Subcategory } from '@/types';

interface UseSubcategoriesOptions {
  categoryId?: string | number;
}

interface UseSubcategoriesReturn {
  subcategories: Subcategory[];
  isLoading: boolean;
  error: any;
  mutate: () => void;
}

export function useSubcategories(categoryId: number): UseSubcategoriesReturn {
  const { data, error, isLoading, mutate } = useSWR<Subcategory[]>(
    categoryId ? `/api/categories/${categoryId}/subcategories` : null,
    fetcher
  );

  return {
    subcategories: data || [],
    isLoading,
    error,
    mutate
  };
}

// Hook para gerenciar uma única subcategoria
interface UseSubcategoryOptions {
  subcategoryId: string | number;
}

interface UseSubcategoryReturn {
  subcategory: Subcategory | null;
  isLoading: boolean;
  error: any;
  mutate: () => void;
}

export function useSubcategory({ subcategoryId }: UseSubcategoryOptions): UseSubcategoryReturn {
  const { data, error, isLoading, mutate } = useSWR<Subcategory>(
    `/api/subcategories/${subcategoryId}`,
    fetcher
  );

  return {
    subcategory: data || null,
    isLoading,
    error,
    mutate
  };
} 