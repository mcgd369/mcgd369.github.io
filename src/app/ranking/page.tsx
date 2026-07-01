'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/i18n-context';
import { getRankedVenues, type Venue } from '@/lib/cms';
import { Navigation } from '@/components/navigation';
import { ContactFooter } from '@/components/contact-footer';
import { MobileContactBar } from '@/components/mobile-contact-bar';
import { Button } from '@/components/ui/button';
import { openContactDialog } from '@/components/contact-dialog';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, Trophy, ArrowRight } from 'lucide-react';

const rankIcons = ['🥇', '🥈', '🥉'];

export default function RankingPage() {
  const { t, locale } = useI18n();
  const ranked = getRankedVenues();

  return (
    <>
      <Navigation />
      <main className="pt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Page Header */}
          <div className="mb-10">
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-2">
              2025年度场馆排行
            </h1>
            <p className="text-muted-foreground">
              {locale === 'en'
                ? 'Based on overall experience quality, value, and consistency'
                : '基于整体体验质量、性价比和稳定性综合评定'}
            </p>
          </div>

          {/* Editorial Note */}
          <Card className="border-primary/20 bg-primary/5 mb-10">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {locale === 'en'
                  ? 'Our editorial team visits venues monthly to provide you with the most up-to-date and honest reviews. Rankings are based on overall experience quality, value, and consistency.'
                  : '我们的编辑团队每月实地体验各场馆,为您提供最新、最真实的评价。排名基于整体体验质量、性价比和稳定性综合评定。'}
              </p>
            </CardContent>
          </Card>

          {/* Ranking Grid - 3 per row on desktop, 2 on tablet, 1 on mobile */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 lg:gap-6">
            {ranked.map((venue, index) => (
              <RankingCard key={venue.slug} venue={venue} rank={index + 1} />
            ))}
          </div>

          {/* Comparison Table */}
          <section className="mt-12">
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-6">
              {locale === 'en' ? 'Venue Comparison' : '场馆对比'}
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">
                      {locale === 'en' ? 'Venue' : '场馆'}
                    </th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">
                      {locale === 'en' ? 'Area' : '区域'}
                    </th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">
                      {locale === 'en' ? 'Price' : '价格'}
                    </th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">
                      {locale === 'en' ? 'Rating' : '评分'}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ranked.map((venue) => (
                    <tr key={venue.slug} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="py-3 px-4">
                        <Link
                          href={`/venues/${venue.slug}`}
                          className="text-foreground hover:text-primary transition-colors font-medium"
                        >
                          {locale === 'en' ? venue.nameEn : venue.name}
                        </Link>
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">
                        {locale === 'en' ? venue.areaEn : venue.area}
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">
                        {venue.price} {venue.currency}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          <span className="text-primary font-medium">{venue.rating}</span>
                          <span className="text-muted-foreground">/5</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* CTA */}
          <div className="mt-12 p-6 rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 text-center">
            <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
              {t.cta.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {t.cta.subtitle}
            </p>
            <Button
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8"
              onClick={() => openContactDialog()}
            >
              {t.cta.button}
            </Button>
          </div>
        </div>
      </main>
      <ContactFooter />
      <MobileContactBar />
    </>
  );
}

function RankingCard({ venue, rank }: { venue: Venue; rank: number }) {
  const { t, locale } = useI18n();

  const name = locale === 'en' ? venue.nameEn : venue.name;
  const tagline = locale === 'en' ? venue.taglineEn : venue.tagline;
  const pros = locale === 'en' ? venue.prosEn : venue.pros;

  return (
    <Card className="border-border overflow-hidden hover:shadow-lg transition-shadow group">
      {/* Rank header */}
      <div className="bg-gradient-to-r from-primary/10 to-transparent p-2 sm:p-3 flex items-center gap-2">
        <span className="text-lg sm:text-2xl flex-shrink-0">{rankIcons[rank - 1] || <Trophy className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />}</span>
        <div className="min-w-0 flex-1">
          <Link
            href={`/venues/${venue.slug}`}
            className="font-serif text-sm sm:text-base font-bold text-foreground hover:text-primary transition-colors group-hover:text-primary line-clamp-1"
          >
            {name}
          </Link>
          <p className="text-[10px] sm:text-xs text-muted-foreground line-clamp-1">{tagline}</p>
        </div>
      </div>

      <CardContent className="p-2 sm:p-3">
        {/* Pros - compact */}
        <div className="mb-2">
          <ul className="space-y-0.5">
            {pros.slice(0, 2).map((p) => (
              <li key={p} className="text-[10px] sm:text-xs text-muted-foreground flex items-start gap-1">
                <CheckCircle2 className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="line-clamp-1">{p}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* View Detail */}
        <Button asChild variant="link" className="text-primary p-0 h-auto text-[10px] sm:text-xs">
          <Link href={`/venues/${venue.slug}`}>
            {locale === 'en' ? 'View Details' : '查看详情'}
            <ArrowRight className="h-3 w-3 ml-0.5" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}