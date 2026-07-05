'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { useI18n } from '@/lib/i18n-context';
import type { Locale } from '@/lib/i18n';
import { Button } from '@/components/ui/button';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { t, locale, setLocale } = useI18n();

  const localeLabels: Record<Locale, string> = {
    zh: '简',
    'zh-TW': '繁',
    en: 'EN',
  };

  const nextLocale: Locale = locale === 'zh' ? 'zh-TW' : locale === 'zh-TW' ? 'en' : 'zh';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-primary font-serif text-xl font-bold tracking-wide">
              澳门指导
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/ranking"
              className="text-muted-foreground hover:text-foreground transition-colors text-sm"
            >
              {t.nav.ranking}
            </Link>
            <Link
              href="/guide"
              className="text-muted-foreground hover:text-foreground transition-colors text-sm"
            >
              {t.nav.guide}
            </Link>
            <Link
              href="/#guide"
              className="text-muted-foreground hover:text-foreground transition-colors text-sm"
            >
              {t.nav.venues}
            </Link>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLocale(nextLocale)}
              className="text-muted-foreground hover:text-foreground gap-1"
            >
              <Globe className="h-4 w-4" />
              {localeLabels[locale]}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLocale(nextLocale)}
              className="text-muted-foreground hover:text-foreground"
            >
              <Globe className="h-4 w-4" />
              {localeLabels[locale]}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-border mt-2 pt-4">
            <div className="flex flex-col gap-3">
              <Link
                href="/ranking"
                className="text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                {t.nav.ranking}
              </Link>
              <Link
                href="/guide"
                className="text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                {t.nav.guide}
              </Link>
              <Link
                href="/#guide"
                className="text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                {t.nav.venues}
              </Link>
              <Link
                href="/#hotel"
                className="text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                {t.nav.hotel}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}