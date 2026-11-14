import { redirect, notFound } from 'next/navigation';
import topics from '@/lib/lab-index.json';
export function generateMetadata({ params }: { params: { topic: string } }) {
  const topic = topics.find(item => item.slug === params.topic);
  return { title: topic?.title ?? 'Mavzu topilmadi' };
}
export default function TopicPage({ params }: { params: { topic: string } }) {
  if (!topics.some(item => item.slug === params.topic)) notFound();
  redirect(`/laboratoriya/${encodeURIComponent(params.topic)}.html`);
}
