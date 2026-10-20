import type { MetadataRoute } from "next";
import { siteSettingsApi } from "@/lib/api/site-settings";

export default async function robots(): Promise<MetadataRoute.Robots> {
  "use cache";
  const settings = await siteSettingsApi.getPublicSettings({ cached: true });
  const baseUrl = (settings.primary_domain || "https://engnest.vn").replace(
    /\/+$/,
    "",
  );

  if (settings.noindex) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
      sitemap: `${baseUrl}/sitemap.xml`,
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/thanh-toan"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
