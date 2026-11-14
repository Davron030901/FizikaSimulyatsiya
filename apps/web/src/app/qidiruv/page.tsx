import { redirect } from 'next/navigation';
export default function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  redirect(`/laboratoriya/index.html?q=${encodeURIComponent(searchParams.q ?? '')}`);
}
