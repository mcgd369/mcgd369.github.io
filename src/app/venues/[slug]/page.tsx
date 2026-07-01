import { getAllVenues } from '@/lib/cms';
import VenueDetailClient from './VenueDetailClient';

// 生成所有场馆的静态路径
export async function generateStaticParams() {
  const venues = getAllVenues();
  return venues.map((venue) => ({
    slug: venue.slug,
  }));
}

// 服务器端组件包装器
export default function VenueDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  return <VenueDetailClient slug={params.slug} />;
}