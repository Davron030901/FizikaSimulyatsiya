'use client';

import { adminApi, clearToken, getToken, type AdminUser } from '@/lib/adminApi';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, type ReactNode } from 'react';

/**
 * Client-side gate for admin pages. The real protection is the API's bearer check;
 * this only avoids rendering an empty shell to a signed-out visitor.
 */
export function AdminGuard({ children }: { children: (user: AdminUser) => ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<AdminUser | null>(null);

  useEffect(() => {
    if (!getToken()) {
      router.replace('/admin/login');
      return;
    }

    adminApi
      .me()
      .then(setUser)
      .catch(() => {
        clearToken();
        router.replace('/admin/login');
      });
  }, [router]);

  if (!user) {
    return (
      <div className="container-page flex min-h-[50vh] items-center justify-center">
        <Loader2 size={22} className="animate-spin text-muted-foreground" aria-hidden="true" />
      </div>
    );
  }

  return <>{children(user)}</>;
}
