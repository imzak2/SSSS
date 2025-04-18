import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import '../lib/i18n';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'KaliumLabs - Cybersecurity Learning Platform',
  description: 'Interactive cybersecurity learning platform with gamified challenges',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preload" href="/locales/en/common.json" as="fetch" crossOrigin="anonymous" />
        <link rel="preload" href="/locales/es/common.json" as="fetch" crossOrigin="anonymous" />
        <link rel="preload" href="/locales/ja/common.json" as="fetch" crossOrigin="anonymous" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}