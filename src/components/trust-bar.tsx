'use client';

import { useI18n } from '@/lib/i18n-context';
import { BadgeDollarSign, Car, HandMetal, Target } from 'lucide-react';

const iconMap = [BadgeDollarSign, Car, HandMetal, Target];

export function TrustBar() {
  const { t, locale } = useI18n();

  const trustItems = [
    { title: t.trust.discount, desc: t.trust.discountDesc },
    { title: t.trust.transfer, desc: t.trust.transferDesc },
    { title: t.trust.massage, desc: t.trust.massageDesc },
    { title: t.trust.recommend, desc: t.trust.recommendDesc },
  ];

  return (
    <section className="py-16 sm:py-20 bg-card/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground text-center mb-12">
          {locale === 'en' ? 'Why Choose Us' : '为什么选择我们'}
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {trustItems.map((item, i) => {
            const Icon = iconMap[i];
            return (
              <div
                key={i}
                className="flex flex-col items-center text-center p-6 rounded-lg bg-card border border-border hover:border-primary/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2 text-sm sm:text-base">{item.title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}