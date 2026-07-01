'use client';

import { useI18n } from '@/lib/i18n-context';
import { getAllVenues } from '@/lib/cms';
import { VenueCard } from '@/components/venue-card';
import { Navigation } from '@/components/navigation';
import { ContactFooter } from '@/components/contact-footer';
import { MobileContactBar } from '@/components/mobile-contact-bar';

export default function VenuesPage() {
  const { t } = useI18n();

  const venues = getAllVenues();

  return (
    <>
      <Navigation />
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-2">
            {t.nav.venues}
          </h1>
          <p className="text-muted-foreground mb-10">
            {t.hero.subtitle}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {venues.map((venue) => (
              <VenueCard key={venue.slug} venue={venue} />
            ))}
          </div>
        </div>
      </main>
      <ContactFooter />
      <MobileContactBar />
    </>
  );
}