const DEV_SITE_URL = "http://localhost:3000";

function normalizeOrigin(raw?: string | null): string | null {
  if (!raw) return null;
  const value = raw.trim();
  if (!value) return null;
  try {
    const url = new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    return `${url.protocol}//${url.host}${url.pathname}`.replace(/\/+$/, "");
  } catch {
    return null;
  }
}

function isLocalOrigin(origin: string): boolean {
  const { hostname } = new URL(origin);
  return hostname === "localhost" || hostname === "127.0.0.1" || hostname === "0.0.0.0";
}

/**
 * Nguồn URL website duy nhất cho canonical, sitemap, robots, JSON-LD.
 * Thứ tự: NEXT_PUBLIC_SITE_URL → NEXT_PUBLIC_CLIENT_URL (tương thích cũ)
 * → primary_domain cấu hình trong CMS → domain production Vercel → localhost (chỉ khi dev).
 * Ở production, URL localhost bị bỏ qua để không lọt vào SEO.
 */
export function getSiteUrl(cmsPrimaryDomain?: string | null): string {
  const isProd = process.env.NODE_ENV === "production";
  const candidates = [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.NEXT_PUBLIC_CLIENT_URL,
    cmsPrimaryDomain,
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
  ];

  for (const candidate of candidates) {
    const origin = normalizeOrigin(candidate);
    if (origin && !(isProd && isLocalOrigin(origin))) return origin;
  }

  if (isProd) {
    console.error(
      "[site-config] Thiếu NEXT_PUBLIC_SITE_URL hợp lệ; URL SEO đang dùng localhost.",
    );
  }
  return DEV_SITE_URL;
}

/** Ghép URL tuyệt đối, tránh trùng/thiếu dấu "/". */
export function absoluteUrl(path = "/", cmsPrimaryDomain?: string | null): string {
  const base = getSiteUrl(cmsPrimaryDomain);
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return cleanPath === "/" ? `${base}/` : `${base}${cleanPath}`;
}

export const SITE_SETTINGS = {
  site_url: getSiteUrl(),
  site_name: "EngNest",
  meta_title: "EngNest - Học Tiếng Anh Online Thực Chiến Cho Người Việt",
  meta_description:
    "Nền tảng cung cấp khóa học và tài liệu số tiếng Anh chất lượng cao, thiết thực cho người Việt. Tinh gọn lý thuyết, tập trung phản xạ thực tế, học trọn đời không phí duy trì.",
  google_analytics_tracking_id: process.env.NEXT_PUBLIC_GA_ID || "",
};

/**
 * Thông tin liên hệ & mạng xã hội dùng chung cho Header, Footer, khối Cộng đồng và Form tư vấn.
 * Sau này lấy từ CMS (Giao diện & Banner › Liên kết, mạng xã hội & cộng đồng).
 */
export const SUPPORT_INFO = {
  hotline: "1900 8989",
  email: "support@engnest.vn",
  workingHours: "08:00 - 22:00 mỗi ngày",
  zaloUrl: "https://zalo.me/",
  fanpageUrl: "https://facebook.com/",
  communityGroupUrl: "https://facebook.com/groups/",
  communityGroupName: "Học tiếng Anh cùng EngNest",
  communityMembers: "",
} as const;
