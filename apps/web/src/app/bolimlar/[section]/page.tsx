import { redirect, notFound } from 'next/navigation';
import topics from '@/lib/lab-index.json';
export default function SectionPage({ params }: { params: { section: string } }) {
  if (!topics.some(item => item.section === params.section)) notFound();
  redirect(`/laboratoriya/index.html?bolim=${encodeURIComponent(params.section)}`);
}
