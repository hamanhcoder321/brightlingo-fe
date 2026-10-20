import * as React from "react";
import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import Header from "@/components/common/header/Header";
import Footer from "@/components/common/footer/Footer";
import ToasterProvider from "@/components/common/ToasterProvider";
import { SITE_SETTINGS } from "@/lib/constants/site-config";
import { IMAGES } from "@/lib/constants/images";
import { siteSettingsApi } from "@/lib/api/site-settings";
import "./globals.css";
import { Be_Vietnam_Pro, Lora } from "next/font/google";
import { cn } from "@/lib/utils";

const beVietnamPro = Be_Vietnam_Pro({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["vietnamese", "latin"],
  variable: "--font-be-vietnam",
  display: "swap",
});

const lora = Lora({
  weight: ["500", "600", "700"],
  subsets: ["vietnamese", "latin"],
  variable: "--font-lora",
  display: "swap",
});

function extractVerificationCode(raw: string): string | undefined {
  if (!raw) return undefined;
  const trimmed = raw.trim();
  const match = trimmed.match(/content=["']([^"']+)["']/i);
  if (match?.[1]) return match[1];
  return trimmed;
}

async function getCachedSettings() {
  "use cache";
  return siteSettingsApi.getPublicSettings({ cached: true });
}

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getCachedSettings();
  const siteName = settings.site_name || SITE_SETTINGS.site_name;
  const metaTitle = settings.meta_title || SITE_SETTINGS.meta_title;
  const metaDescription =
    settings.meta_description || SITE_SETTINGS.meta_description;
  const faviconUrl = settings.favicon || IMAGES.FAVICON;
  const verificationCode = extractVerificationCode(
    settings.google_site_verification,
  );

  let metadataBaseUrl = SITE_SETTINGS.site_url;
  try {
    if (settings.primary_domain) {
      new URL(settings.primary_domain);
      metadataBaseUrl = settings.primary_domain;
    }
  } catch {
    metadataBaseUrl = SITE_SETTINGS.site_url;
  }

  return {
    metadataBase: new URL(metadataBaseUrl),
    title: {
      default: metaTitle,
      template: `%s | ${siteName}`,
    },
    description: metaDescription,
    robots: settings.noindex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    verification: verificationCode
      ? { google: verificationCode }
      : undefined,
    icons: {
      icon: [
        { url: faviconUrl, type: "image/png" },
        { url: "/icon.png", type: "image/png" },
      ],
      shortcut: faviconUrl,
      apple: "/apple-icon.png",
    },
    openGraph: {
      type: "website",
      locale: "vi_VN",
      siteName,
      title: metaTitle,
      description: metaDescription,
      images: settings.og_image ? [{ url: settings.og_image }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: settings.og_image ? [settings.og_image] : undefined,
    },
  };
}

async function DynamicHeader() {
  const settings = await siteSettingsApi.getPublicSettings();
  return <Header settings={settings} />;
}

async function DynamicFooterAndScripts() {
  const settings = await siteSettingsApi.getPublicSettings();
  const gaId =
    settings.google_analytics_id || SITE_SETTINGS.google_analytics_tracking_id;

  const orgSchema = settings.schema_organization
    ? {
        "@context": "https://schema.org",
        "@type": "EducationalOrganization",
        name: settings.site_name || SITE_SETTINGS.site_name,
        url: settings.primary_domain || SITE_SETTINGS.site_url,
        telephone: settings.hotline,
        email: settings.support_email,
        sameAs: [
          settings.fanpage_url,
          settings.community_group_url,
          settings.zalo_url,
          settings.youtube_tiktok_url,
        ].filter(Boolean),
      }
    : null;

  return (
    <>
      {orgSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      )}
      <Footer settings={settings} />
      {gaId && <GoogleAnalytics gaId={gaId} />}
    </>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="vi"
      className={cn("scroll-smooth", beVietnamPro.variable, lora.variable)}
    >
      <body className="font-sans antialiased bg-background text-foreground min-h-screen flex flex-col">
        <React.Suspense
          fallback={<div className="h-20 w-full bg-white shadow-xs" />}
        >
          <DynamicHeader />
        </React.Suspense>

        {/* Main full-width: mỗi page/section tự bọc <Container> (1440px) cho nội dung */}
        <main className="w-full flex-1">{children}</main>

        <React.Suspense fallback={<Footer />}>
          <DynamicFooterAndScripts />
        </React.Suspense>

        <ToasterProvider />
      </body>
    </html>
  );
}
