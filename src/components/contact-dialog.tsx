'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { useI18n } from '@/lib/i18n-context';
import { X, Copy, Check } from 'lucide-react';

const CONTACT_IDS = ['MAGU3336', 'MAGU3337', 'MAGU3338'];

// Global callback registry for opening the dialog
let openDialogCallback: (() => void) | null = null;

/** Call this from anywhere to open the contact dialog */
export function openContactDialog() {
  openDialogCallback?.();
}

function ContactDialogModal({ onClose }: { onClose: () => void }) {
  const [copied, setCopied] = useState<string | null>(null);
  const { locale } = useI18n();

  const handleCopy = useCallback(async (id: string) => {
    try {
      await navigator.clipboard.writeText(id);
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = id;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);
    }
  }, []);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        className="relative bg-card border border-border rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 pt-6 pb-2">
          <h3 className="font-serif text-xl font-bold text-foreground">
            {locale === 'en' ? 'Contact Us' : '联系我们'}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-muted transition-colors text-muted-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <p className="px-6 text-sm text-muted-foreground mb-4">
          {locale === 'en'
            ? 'Add any of the following WeChat IDs to get started'
            : '添加以下任意微信号即可咨询预约'}
        </p>
        <div className="px-6 space-y-3 pb-6">
          {CONTACT_IDS.map((id) => (
            <div
              key={id}
              className="flex items-center justify-between bg-muted/50 rounded-xl px-4 py-3 border border-border"
            >
              <span className="font-mono text-lg font-semibold text-foreground tracking-wider">
                {id}
              </span>
              <button
                onClick={() => handleCopy(id)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                {copied === id ? (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    {locale === 'en' ? 'Copied' : '已复制'}
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    {locale === 'en' ? 'Copy' : '复制'}
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
        <div className="bg-primary/5 border-t border-border px-6 py-3">
          <p className="text-xs text-muted-foreground text-center">
            {locale === 'en'
              ? 'WeChat supported · Quick response within 5 mins'
              : '支持微信添加 · 5分钟内快速响应'}
          </p>
        </div>
      </div>
    </div>
  );
}

export function ContactDialogProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const callbackRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    callbackRef.current = () => setOpen(true);
    openDialogCallback = callbackRef.current;
    return () => {
      if (openDialogCallback === callbackRef.current) {
        openDialogCallback = null;
      }
    };
  }, []);

  return (
    <>
      {children}
      {open && <ContactDialogModal onClose={() => setOpen(false)} />}
    </>
  );
}