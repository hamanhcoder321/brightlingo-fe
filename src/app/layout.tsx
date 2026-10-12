import type { Metadata } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google';
import Header from '@/components/common/header/Header';
import Footer from '@/components/common/footer/Footer';
import ToasterProvider from '@/components/common/ToasterProvider';
import { SITE_SETTINGS } from '@/lib/constants/site-config';
import './globals.css';
import { Be_Vietnam_Pro } from 'next/font/google';
import { cn } from "@/lib/utils";

const beVietnamPro = Be_Vietnam_Pro({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['vietnamese', 'latin'],
  variable: '--font-be-vietnam',
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
    <html lang="vi" className={cn("scroll-smooth", beVietnamPro.variable)}>
      <body className="font-sans antialiased bg-[#F3F4F6] text-[#0F172A] min-h-screen flex flex-col">
        {/* Vùng bao quát màn hình to 1920px */}
        <div className="w-full max-w-[1920px] flex-1 flex flex-col mx-auto relative bg-white shadow-sm">
          <Header />
          
          {/* Main full-width: mỗi page/section tự bọc <Container> (1440px) cho nội dung */}
          <main className="w-full flex-1">
            {children}
          </main>
          
          <Footer />
        </div>
        
        <ToasterProvider />
        {SITE_SETTINGS.google_analytics_tracking_id && (
          <GoogleAnalytics gaId={SITE_SETTINGS.google_analytics_tracking_id} />
        )}
      </body>
    </html>
  );
}
