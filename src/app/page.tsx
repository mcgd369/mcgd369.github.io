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
              {t.brand?.title || '我们不只是订位，我们真心希望你玩得尽兴'}
            </h2>
            <p className="text-muted-foreground leading-relaxed text-base sm:text-lg mb-4">
              {t.brand?.body1 || '从台湾飞澳门时间有限，行程不容浪费。我们希望你带回去的不是「还可以」，而是真正想再回头的那种记忆。'}
            </p>
            <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
              {t.brand?.body2 || '会做到接送、配对、VIP入场、回程接机这些，是因为我们知道玩家踏进澳门那一刻起，每一个细节都会影响整段旅程。'}
            </p>
          </div>
        </section>


      </main>
      <ContactFooter />
      <MobileContactBar />
    </>
  );
}