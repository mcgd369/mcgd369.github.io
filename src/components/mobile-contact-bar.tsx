'use client';

import { useI18n } from '@/lib/i18n-context';
import { MessageCircle } from 'lucide-react';
import { openContactDialog } from '@/components/contact-dialog';

export function MobileContactBar() {
  const { t } = useI18n();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-card/95 backdrop-blur-md border-t border-border shadow-lg">
      <div className="flex items-center p-3">
        <button
          onClick={() => openContactDialog()}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm"
        >
          <MessageCircle className="h-4 w-4" />
          {t.hero.cta}
        </button>
      </div>
    </div>
  );
}