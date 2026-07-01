import type { Metadata } from 'next';
import './globals.css';
import { ClientProviders } from '@/components/client-providers';

export const metadata: Metadata = {
  metadataBase: new URL('https://mcgd369.github.io'),
  title: {
    default: '澳门指导 | 澳门水疗场馆专业推荐',
    template: '%s | 澳门指导',
  },
  description:
    '澳门指导为您提供澳门水疗场馆的真实评价、独家折扣、免费接送和专业推荐。省心省钱的品质之选。',
  keywords: [
    '澳门水疗',
    '澳门桑拿',
    '澳门攻略',
    '水疗推荐',
    '独家折扣',
    '免费接送',
    '澳门指导',
  ],
  openGraph: {
    title: '澳门指导 | 澳门水疗场馆专业推荐',
    description: '独家折扣·免费接送·专业推荐，您的品质之选',
    locale: 'zh_CN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <body className={`antialiased`}>
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}