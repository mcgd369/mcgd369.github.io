'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/i18n-context';
import { type Venue } from '@/lib/cms';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';

interface VenueCardProps {
  venue: Venue;
}

const tagVariantMap: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  hot: 'destructive',
  new: 'default',
  value: 'secondary',
  premium: 'outline',
  KTV: 'default',
};

const tagLabels: Record<string, Record<string, string>> = {
  hot: { zh: '热门', 'zh-TW': '熱門', en: 'Hot' },
  new: { zh: '新开业', 'zh-TW': '新開業', en: 'New' },
  value: { zh: '性价比', 'zh-TW': '性價比', en: 'Value' },
  premium: { zh: '高端', 'zh-TW': '高端', en: 'Premium' },
  KTV: { zh: 'KTV', 'zh-TW': 'KTV', en: 'KTV' },
};

export function VenueCard({ venue }: VenueCardProps) {
  const { t, locale } = useI18n();

  const name = locale === 'en' ? venue.nameEn : venue.name;
  const tagline = locale === 'en' ? venue.taglineEn : venue.tagline;
  const area = locale === 'en' ? venue.areaEn : venue.area;
  const tagLabel = tagLabels[venue.tag]?.[locale] || tagLabels[venue.tag]?.zh || venue.tag;
  const badge = venue.coverBadgeEn && locale === 'en' ? venue.coverBadgeEn : venue.coverBadge;

  return (
    <Card className="group overflow-hidden bg-card border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative">
      {/* Image placeholder */}
      <div className="relative aspect-[4/3] bg-gradient-to-br from-muted to-muted/50 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-serif text-3xl text-primary/30">{name.charAt(0)}</span>
        </div>
        {/* Featured badge — prominent like reference site */}
        {badge && !venue.suspended && (
          <div className="absolute top-2.5 left-2.5 right-2.5">
            <span className="inline-block px-2.5 py-1 text-[11px] sm:text-xs font-bold rounded-md bg-primary text-primary-foreground shadow-sm">
              {badge}
            </span>
          </div>
        )}
        {/* Tag badge */}
        {!badge && (
          <div className="absolute top-2.5 left-2.5">
            <Badge variant={tagVariantMap[venue.tag]} className="text-xs">
              {tagLabel}
            </Badge>
          </div>
        )}
        {/* Suspended overlay */}
        {venue.suspended && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center saturate-[0.3]">
            <span className="px-4 py-2 bg-foreground/90 text-background text-sm font-bold rounded-lg">
              {locale === 'en' ? 'Temporarily Closed' : '暂停营业'}
            </span>
          </div>
        )}
      </div>

      <CardContent className="p-4">
        {/* Name */}
        <div className="mb-1">
          <h3 className="font-serif text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
            {name}
          </h3>
        </div>

        {/* Tagline */}
        <p className="text-sm text-muted-foreground mb-3 line-clamp-1">{tagline}</p>

        {/* Area & Price */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            {area}
          </div>
          <div className="text-sm">
            <span className="text-primary font-bold">¥{venue.price}</span>
            <span className="text-muted-foreground text-xs">/{locale === 'en' ? 'from' : '起'}</span>
          </div>
        </div>

        {/* CTA */}
        <Button
          asChild
          className="w-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all text-sm"
          variant="ghost"
        >
          <Link href={`/venues/${venue.slug}`}>
            {locale === 'en' ? 'View Details' : '查看详情'}
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}