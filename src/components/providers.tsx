'use client';

import { SessionProvider } from "next-auth/react";
import { CartProvider } from "@/contexts/cart-context";
import { Toaster } from "@/components/ui/toaster";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <CartProvider>
        {children}
        <Toaster />
      </CartProvider>
    </SessionProvider>
  );
} 