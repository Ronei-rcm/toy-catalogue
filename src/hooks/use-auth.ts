import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function useAuth() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const requireAuth = () => {
    if (status === 'unauthenticated') {
      router.push('/login');
      return false;
    }
    return true;
  };

  const requireAdmin = () => {
    if (!requireAuth()) return false;
    if (session?.user?.role !== 'ADMIN') {
      router.push('/dashboard');
      return false;
    }
    return true;
  };

  const isAuthenticated = status === 'authenticated';
  const isAdmin = session?.user?.role === 'ADMIN';

  return {
    session,
    status,
    isAuthenticated,
    isAdmin,
    requireAuth,
    requireAdmin,
  };
} 