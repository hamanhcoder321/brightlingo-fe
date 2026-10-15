import * as React from 'react';
import type { Metadata } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google';
import Header from '@/components/common/header/Header';
import Footer from '@/components/common/footer/Footer';
import ToasterProvider from '@/components/common/ToasterProvider';
import { SITE_SETTINGS } from '@/lib/constants/site-config';
import './globals.css';
import { Be_Vietnam_Pro, Lora } from 'next/font/google';
import { cn } from "@/lib/utils";

const beVietnamPro = Be_Vietnam_Pro({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['vietnamese', 'latin'],
  variable: '--font-be-vietnam',
  display: 'swap',
});

const lora = Lora({
  weight: ['500', '600', '700'],
  subsets: ['vietnamese', 'latin'],
  variable: '--font-lora',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_SETTINGS.site_url),
  title: { default: SITE_SETTINGS.meta_title, template: `%s | ${SITE_SETTINGS.site_name}` },
  description: SITE_SETTINGS.meta_description,
  icons: {
    icon: [
      { url: "/logo-tab.png", type: "image/png" },
      { url: "/icon.png", type: "image/png" },
    ],
    shortcut: "/logo-tab.png",
    apple: "/apple-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: SITE_SETTINGS.site_name,
    title: SITE_SETTINGS.meta_title,
    description: SITE_SETTINGS.meta_description,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_SETTINGS.meta_title,
    description: SITE_SETTINGS.meta_description,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={cn("scroll-smooth", beVietnamPro.variable, lora.variable)}>
      <body className="font-sans antialiased bg-background text-foreground min-h-screen flex flex-col">
        <React.Suspense fallback={<div className="h-20 w-full bg-white shadow-xs" />}>
          <Header />
        </React.Suspense>
        
        {/* Main full-width: mỗi page/section tự bọc <Container> (1440px) cho nội dung */}
        <main className="w-full flex-1">
          {children}
        </main>
        
        <Footer />
        
        <ToasterProvider />
        {SITE_SETTINGS.google_analytics_tracking_id && (
          <GoogleAnalytics gaId={SITE_SETTINGS.google_analytics_tracking_id} />
        )}
      </body>
    </html>
  );
}
