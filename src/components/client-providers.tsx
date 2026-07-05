'use client'

import React, { ReactNode } from 'react'
import { ThemeProvider } from 'next-themes'
import { I18nProvider } from '@/lib/i18n-context'
import { ContactDialogProvider } from '@/components/contact-dialog'
import { WeChatBrowserGuard } from '@/components/wechat-browser-guard'

interface ClientProvidersProps {
  children: ReactNode
}

export function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      <I18nProvider>
        <ContactDialogProvider>
          <WeChatBrowserGuard />
          {children}
        </ContactDialogProvider>
      </I18nProvider>
    </ThemeProvider>
  )
}