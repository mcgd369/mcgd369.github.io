'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/i18n-context';
import { MessageCircle } from 'lucide-react';
import { openContactDialog } from '@/components/contact-dialog';

export function ContactFooter() {
  const { t, locale } = useI18n();

  return (
    <footer className="bg-card border-t border-border pb-20 md:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand & Contact */}
          <div>
            <h3 className="font-serif text-xl font-bold text-primary mb-4">
              澳门指导
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              {t.contact.copyright}
            </p>
            <div className="space-y-3">
              <button
                onClick={() => openContactDialog()}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                WeChat
              </button>
              <div className="flex flex-wrap gap-2">
                {['MAGU3336', 'MAGU3337', 'MAGU3338'].map((id) => (
                  <span key={id} className="font-mono text-xs bg-muted/50 px-2 py-1 rounded text-foreground">
                    {id}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">{t.contact.quickLinks}</h4>
            <div className="space-y-2">
              <Link href="/ranking" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                {t.nav.ranking}
              </Link>
              <Link href="/guide" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                {t.nav.guide}
              </Link>
              <Link href="/venues" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                {t.nav.venues}
              </Link>
            </div>
          </div>

          {/* About */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">{t.nav.about}</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {locale === 'en'
                ? 'Your trusted guide for premium wellness experiences. Exclusive deals, free transport, and expert recommendations.'
                : '您可信赖的品质之选。独家折扣、免费接送、专业推荐，让您的每次体验都省心省力。'}
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 pt-6 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">
            &copy; 2025 澳门指导 Macau Guide. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}