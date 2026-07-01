'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { dictionaries, Locale } from './i18n'

type Dictionary = (typeof dictionaries)[Locale]

interface I18nContextType {
  t: Dictionary
  locale: Locale
  setLocale: (locale: Locale) => void
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

const STORAGE_KEY = 'locale'

interface I18nProviderProps {
  children: ReactNode
  defaultLocale?: Locale
}

export function I18nProvider({ children, defaultLocale = 'zh' }: I18nProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedLocale = localStorage.getItem(STORAGE_KEY) as Locale | null
    if (savedLocale && savedLocale in dictionaries) {
      setLocaleState(savedLocale)
    }
  }, [])

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, newLocale)
    }
  }

  const value: I18nContextType = {
    t: dictionaries[locale],
    locale,
    setLocale,
  }

  if (!mounted) {
    return (
      <I18nContext.Provider value={value}>
        {children}
      </I18nContext.Provider>
    )
  }

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n(): I18nContextType {
  const context = useContext(I18nContext)
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  return context
}