'use client';

import { Button } from '@/components/ui/Button';
import { AlertTriangle } from 'lucide-react';
import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center text-center">
      <AlertTriangle size={30} className="text-danger" aria-hidden="true" />
      <h1 className="mt-4 text-xl font-semibold">Nimadir noto&apos;g&apos;ri ketdi</h1>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        Sahifani yuklashda xatolik yuz berdi. Qaytadan urinib ko&apos;ring.
      </p>
      <Button onClick={reset} className="mt-6">
        Qayta urinish
      </Button>
    </div>
  );
}
