import type { MetadataRoute } from "next";
import { siteSettingsApi } from "@/lib/api/site-settings";
import { courseApi } from "@/lib/api/course";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  "use cache";
  const [settings, courses] = await Promise.all([
    siteSettingsApi.getPublicSettings({ cached: true }),
    courseApi.getAll(undefined, { cached: true }),
  ]);

  const baseUrl = (settings.primary_domain || "https://engnest.vn").replace(
    /\/+$/,
    "",
  );

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date().toISOString(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/khoa-hoc`,
      lastModified: new Date().toISOString(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/chinh-sach-thanh-toan`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/giao-tai-lieu-so`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/chinh-sach-bao-mat`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/dieu-khoan-su-dung`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  const courseRoutes: MetadataRoute.Sitemap = (courses || [])
    .filter((course) => !course.status || course.status.toUpperCase() === "PUBLISHED")
    .map((course) => ({
      url: `${baseUrl}/khoa-hoc/${course.slug}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    }));

  return [...staticRoutes, ...courseRoutes];
}
