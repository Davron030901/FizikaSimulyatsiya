import { Button } from '@/components/ui/Button';
import { API_URL } from '@/lib/api';
import { ServerCrash } from 'lucide-react';
import Link from 'next/link';

/**
 * Shown when a server component could not reach the API. Kept friendly rather than
 * technical: the most common cause is Render's free tier waking up.
 */
export function ApiErrorState({ message }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card px-6 py-14 text-center">
      <ServerCrash size={30} className="mb-3 text-danger" aria-hidden="true" />
      <h2 className="text-base font-semibold">Ma&apos;lumotlarni yuklab bo&apos;lmadi</h2>
      <p className="mt-1.5 max-w-md text-sm text-muted-foreground">
        {message ??
          "Server javob bermayapti. Agar u bepul tarifda joylashgan bo'lsa, uyg'onishi uchun 30 soniyagacha vaqt ketishi mumkin."}
      </p>
      <p className="mt-3 font-mono text-xs text-muted-foreground">{API_URL}</p>
      <Link href="/" className="mt-5">
        <Button variant="secondary">Bosh sahifaga qaytish</Button>
      </Link>
    </div>
  );
}
