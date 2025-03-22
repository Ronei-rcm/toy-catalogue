'use client';

import { useState, useCallback } from 'react';

export interface Toast {
  id: string;
  title?: string;
  description?: string;
  variant?: 'default' | 'success' | 'error' | 'info';
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev: Toast[]) => [...prev, { ...toast, id }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev: Toast[]) => prev.filter((toast: Toast) => toast.id !== id));
  }, []);

  const success = useCallback(
    (title?: string, description?: string) => {
      addToast({ title, description, variant: 'success' });
    },
    [addToast]
  );

  const error = useCallback(
    (title?: string, description?: string) => {
      addToast({ title, description, variant: 'error' });
    },
    [addToast]
  );

  const info = useCallback(
    (title?: string, description?: string) => {
      addToast({ title, description, variant: 'info' });
    },
    [addToast]
  );

  return {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    info,
  };
}
