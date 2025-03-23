'use client';

import { SessionProvider } from 'next-auth/react';
import { AuthProvider } from '@/contexts/auth-context';
import { Providers } from '@/components/providers';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AuthProvider>
        <Providers>
          {children}
        </Providers>
      </AuthProvider>
    </SessionProvider>
  );
} 