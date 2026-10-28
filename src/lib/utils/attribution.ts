import Cookies from "js-cookie";

export interface AttributionData {
  ref?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  landingUrl?: string;
  referrerUrl?: string;
}

const STORAGE_KEY = "lingo_attribution";
const COOKIE_EXPIRES_DAYS = 30;

// Danh sách các domain hạ tầng/staging/preview không được tính là kênh marketing ngoại sàn
const IGNORED_REFERRER_HOSTS = [
  "vercel.com",
  "vercel.app",
  "onrender.com",
  "render.com",
  "localhost",
  "127.0.0.1",
  "github.com",
];

export function isIgnoredReferrerHost(host?: string | null): boolean {
  if (!host) return false;
  const h = host.toLowerCase().trim();
  return IGNORED_REFERRER_HOSTS.some((item) => h.includes(item));
}

export function detectExternalReferrer(): string | undefined {
  if (typeof document === "undefined" || !document.referrer) return undefined;
  try {
    const refHost = new URL(document.referrer).hostname.toLowerCase();
    const curHost = window.location.hostname.toLowerCase();
    if (refHost.includes(curHost) || curHost.includes(refHost)) return undefined; // Internal link chuyển trang
    if (isIgnoredReferrerHost(refHost)) return undefined; // Ignore Vercel, localhost, Render, etc.

    if (refHost.includes("facebook.com") || refHost.includes("fb.me")) return "Facebook";
    if (refHost.includes("google.com")) return "Google Search";
    if (refHost.includes("tiktok.com")) return "TikTok";
    if (refHost.includes("youtube.com") || refHost.includes("youtu.be")) return "YouTube";
    if (refHost.includes("zalo.me")) return "Zalo";
    return refHost;
  } catch {
    return undefined;
  }
}

/**
 * Bắt các tham số Marketing ngay từ lần đầu truy cập (First-Touch Attribution theo BR-09).
 * Lưu đồng thời vào localStorage và Cookie với thời hạn 30 ngày.
 */
export function captureFirstTouchAttribution(): AttributionData {
  if (typeof window === "undefined") return {};

  try {
    // 1. Kiểm tra xem đã có first-touch lưu trước đó chưa
    const existingRaw = localStorage.getItem(STORAGE_KEY);
    if (existingRaw) {
      const existing = JSON.parse(existingRaw);
      // Nếu dữ liệu cũ lưu utmSource là vercel.com hoặc host preview, xóa bỏ để lấy chuẩn
      if (existing && isIgnoredReferrerHost(existing.utmSource)) {
        localStorage.removeItem(STORAGE_KEY);
        Cookies.remove("utm_source");
        Cookies.remove("utm_medium");
      } else if (existing && (existing.utmSource || existing.ref || existing.landingUrl)) {
        return existing;
      }
    }
  } catch {
    // Ignore JSON parse error and continue
  }

  const params = new URLSearchParams(window.location.search);
  const utmParamSource = params.get("utm_source");
  const utmParamMedium = params.get("utm_medium");
  const utmParamCampaign = params.get("utm_campaign");
  const utmParamContent = params.get("utm_content");
  const utmParamTerm = params.get("utm_term");
  const refParam = params.get("ref");

  const extReferrer = detectExternalReferrer();
  const landingUrl = window.location.href;
  const referrerUrl = document.referrer || undefined;

  let utmSource = utmParamSource || Cookies.get("utm_source") || extReferrer || undefined;
  if (isIgnoredReferrerHost(utmSource)) {
    utmSource = undefined;
    Cookies.remove("utm_source");
  }

  const ref = refParam || Cookies.get("ref") || undefined;
  let utmMedium = utmParamMedium || Cookies.get("utm_medium") || (utmSource ? "campaign" : undefined);
  if (isIgnoredReferrerHost(utmMedium)) {
    utmMedium = undefined;
    Cookies.remove("utm_medium");
  }

  const utmCampaign = utmParamCampaign || Cookies.get("utm_campaign") || undefined;
  const utmContent = utmParamContent || Cookies.get("utm_content") || undefined;
  const utmTerm = utmParamTerm || Cookies.get("utm_term") || undefined;

  const attribution: AttributionData = {
    ref,
    utmSource,
    utmMedium,
    utmCampaign,
    utmContent,
    utmTerm,
    landingUrl,
    referrerUrl,
  };

  // Lưu vào localStorage
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(attribution));
  } catch {
    // LocalStorage might be full or disabled
  }

  // Lưu vào Cookie (30 ngày)
  const cookieOpts = { expires: COOKIE_EXPIRES_DAYS, path: "/" };
  if (ref) Cookies.set("ref", ref, cookieOpts);
  if (utmSource) Cookies.set("utm_source", utmSource, cookieOpts);
  if (utmMedium) Cookies.set("utm_medium", utmMedium, cookieOpts);
  if (utmCampaign) Cookies.set("utm_campaign", utmCampaign, cookieOpts);
  if (utmContent) Cookies.set("utm_content", utmContent, cookieOpts);
  if (utmTerm) Cookies.set("utm_term", utmTerm, cookieOpts);
  if (landingUrl) Cookies.set("landing_url", landingUrl, cookieOpts);

  return attribution;
}

/**
 * Lấy dữ liệu Attribution hiện tại để gắn vào payload gửi đơn hàng hoặc form tư vấn
 */
export function getAttributionData(): AttributionData {
  if (typeof window === "undefined") return {};

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed) {
        if (isIgnoredReferrerHost(parsed.utmSource)) {
          parsed.utmSource = undefined;
          parsed.utmMedium = undefined;
        }
        return parsed;
      }
    }
  } catch {
    // Ignore error
  }

  // Fallback đọc từ Cookie
  let rawUtmSource = Cookies.get("utm_source");
  let rawUtmMedium = Cookies.get("utm_medium");
  if (isIgnoredReferrerHost(rawUtmSource)) {
    rawUtmSource = undefined;
    rawUtmMedium = undefined;
  }

  return {
    ref: Cookies.get("ref"),
    utmSource: rawUtmSource,
    utmMedium: rawUtmMedium,
    utmCampaign: Cookies.get("utm_campaign"),
    utmContent: Cookies.get("utm_content"),
    utmTerm: Cookies.get("utm_term"),
    landingUrl: Cookies.get("landing_url") || (typeof window !== "undefined" ? window.location.href : undefined),
    referrerUrl: typeof document !== "undefined" ? document.referrer : undefined,
  };
}
