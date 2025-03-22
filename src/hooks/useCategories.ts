import { useState, useEffect } from 'react';
import type { Category } from '@/types';

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        setIsLoading(true);
        const response = await fetch('/api/categories');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred'));
      } finally {
        setIsLoading(false);
      }
    }

    fetchCategories();
  }, []);

  const findCategoryBySlug = (slug: string): Category | undefined => {
    return categories.find((category) => category.slug === slug);
  };

  const getFeaturedCategories = (count: number = 3): Category[] => {
    return categories.slice(0, count);
  };

  return {
    categories,
    isLoading,
    error,
    findCategoryBySlug,
    getFeaturedCategories,
  };
}