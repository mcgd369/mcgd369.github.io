'use client';

import { useI18n } from '@/lib/i18n-context';
import { Button } from '@/components/ui/button';
import { openContactDialog } from '@/components/contact-dialog';

export function CTASection() {
  const { t } = useI18n();

  return (
    <section className="py-16 sm:py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10" />
      <div className="absolute inset-0 bg-card/80" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
          {t.cta.title}
        </h2>
        <p className="text-muted-foreground mb-8 text-lg">
          {t.cta.subtitle}
        </p>
        <Button
          size="lg"
          className="bg-primary text-primary-foreground hover:bg-primary/90 px-10 py-6 text-base font-semibold rounded-lg"
          onClick={() => openContactDialog()}
        >
          {t.cta.button}
        </Button>
      </div>
    </section>
  );
}