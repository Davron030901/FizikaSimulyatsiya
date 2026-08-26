import { Skeleton } from '@/components/ui/Skeleton';

export default function Loading() {
  return (
    <div className="container-page py-8">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="mt-6 h-11 w-full max-w-md rounded-xl" />
      <div className="mt-6 space-y-2">
        {Array.from({ length: 10 }).map((_, index) => (
          <Skeleton key={index} className="h-14 rounded-xl" />
        ))}
      </div>
    </div>
  );
}
