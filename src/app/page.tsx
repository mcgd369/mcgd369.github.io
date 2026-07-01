'use client';

import { useI18n } from '@/lib/i18n-context';
import { HeroSection } from '@/components/hero-section';
import { TrustBar } from '@/components/trust-bar';

import { GuideFlowSection } from '@/components/guide-flow-section';
import { CTASection } from '@/components/cta-section';
import { Navigation } from '@/components/navigation';
import { ContactFooter } from '@/components/contact-footer';
import { MobileContactBar } from '@/components/mobile-contact-bar';

export default function HomePage() {
  const { t } = useI18n();

  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <GuideFlowSection />
        <TrustBar />
        <CTASection />

        {/* Brand Story */}
        <section className="py-16 sm:py-20 bg-primary/3 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
          </div>
          <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-6">
              {t.brand.title}
            </h2>
            <p className="text-muted-foreground leading-relaxed text-base sm:text-lg mb-4">
              {t.brand.description}
            </p>
          </div>
        </section>


      </main>
      <ContactFooter />
      <MobileContactBar />
    </>
  );
}