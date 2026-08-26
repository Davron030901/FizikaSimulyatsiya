import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="font-mono text-5xl font-bold text-muted-foreground">404</p>
      <h1 className="mt-4 text-2xl font-semibold">Sahifa topilmadi</h1>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        Siz qidirgan sahifa mavjud emas yoki ko&apos;chirilgan.
      </p>
      <div className="mt-6 flex gap-3">
        <Link href="/">
          <Button>Bosh sahifa</Button>
        </Link>
        <Link href="/bolimlar">
          <Button variant="secondary">Bo&apos;limlar</Button>
        </Link>
      </div>
    </div>
  );
}
