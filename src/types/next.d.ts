/// <reference types="next" />
/// <reference types="next/image-types/global" />
/// <reference types="next/navigation-types/navigation" />

declare module 'next/server' {
  export { NextResponse } from 'next/server';
}

declare module 'next/navigation' {
  export { notFound } from 'next/navigation';
}

declare module 'next-auth' {
  export { getServerSession } from 'next-auth';
}

declare module '@/lib/prisma' {
  import { PrismaClient } from '@prisma/client';
  export const prisma: PrismaClient;
}

declare module '@/lib/auth' {
  export const authOptions: any;
}

declare module '@/lib/fetcher' {
  export const fetcher: (url: string) => Promise<any>;
}

declare module '@/utils/format' {
  export function formatPrice(price: number): string;
} 