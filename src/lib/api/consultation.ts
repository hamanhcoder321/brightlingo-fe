import type { ConsultationFormData } from "@/lib/schemas/consultation.schema";
import { getAttributionData, isIgnoredReferrerHost } from "@/lib/utils/attribution";
import { getApiBaseUrl } from "./config";

export interface ConsultationResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    source?: string;
    createdAt: string;
  };
}

function getQueryParam(name: string): string | undefined {
  if (typeof window === "undefined") return undefined;
  const params = new URLSearchParams(window.location.search);
  return params.get(name) || undefined;
}

export function detectPageSource(): string {
  if (typeof window === "undefined") return "Trang chủ";
  const path = window.location.pathname.toLowerCase();
  if (path === "/" || path === "") return "Trang chủ";
  if (path.includes("/register") || path.includes("/dang-ky")) return "Trang đăng ký";
  if (path.startsWith("/khoa-hoc/") && path.length > 10) return "Chi tiết khóa học";
  if (path.includes("/khoa-hoc")) return "Trang khóa học";
  if (path.includes("/danh-gia")) return "Trang đánh giá";
  if (path.includes("/loi-ich")) return "Trang lợi ích";
  if (path.includes("/lien-he")) return "Trang liên hệ";
  return `Trang ${path.replace(/^\//, '')}`;
}

function detectExternalReferrer(): string | undefined {
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
 * Service API gửi thông tin đăng ký tư vấn về hệ thống CMS / CRM qua NestJS Backend (POST /api/leads).
 * Xác định chính xác nguồn đầu vào:
 * - Nếu người dùng điền từ Trang chủ -> Ghi nhận "Trang chủ"
 * - Nếu người dùng điền từ Trang đăng ký -> Ghi nhận "Trang đăng ký"
 * - Nếu đến từ chiến dịch Marketing (Facebook, Google Ads, TikTok, Zalo, UTM...) -> Ghi nhận đúng kênh & chiến dịch.
 */
export const consultationApi = {
  submit: async (data: ConsultationFormData, formSource?: string): Promise<ConsultationResponse> => {
    const landingUrl = typeof window !== "undefined" ? window.location.href : "";
    const referrerUrl = typeof document !== "undefined" ? document.referrer : "";

    // 1. Xác định vị trí trang điền form
    const pageSource = formSource || detectPageSource();

    // 2. Xác định nguồn Marketing hoặc nguồn trang nội bộ
    const utmParam = getQueryParam("utm_source");
    const attribution = getAttributionData();
    const extReferrer = detectExternalReferrer();
    const ref = getQueryParam("ref") || attribution.ref;

    let finalSource = pageSource;
    if (utmParam && !isIgnoredReferrerHost(utmParam)) {
      finalSource = utmParam;
    } else if (attribution.utmSource && !isIgnoredReferrerHost(attribution.utmSource)) {
      finalSource = attribution.utmSource;
    } else if (extReferrer && !isIgnoredReferrerHost(extReferrer)) {
      finalSource = extReferrer;
    } else if (ref) {
      finalSource = `Ref: ${ref}`;
    }

    const utmMedium =
      getQueryParam("utm_medium") ||
      (!isIgnoredReferrerHost(attribution.utmSource) ? attribution.utmMedium : undefined) ||
      (finalSource !== pageSource ? "campaign" : "website_form");

    const utmCampaign =
      getQueryParam("utm_campaign") ||
      attribution.utmCampaign ||
      undefined;

    const backendUrl = getApiBaseUrl();

    const payload = {
      fullName: data.fullName.trim(),
      phone: data.phone.trim(),
      email: data.email.trim(),
      courseName: data.courseInterest,
      courseInterest: data.courseInterest,
      courseTitle: data.courseInterest,
      message: data.note && data.note.trim() ? data.note.trim() : null,
      note: data.note && data.note.trim() ? data.note.trim() : null,
      source: pageSource,
      landingUrl: landingUrl || attribution.landingUrl,
      referrerUrl: referrerUrl || attribution.referrerUrl,
      ref,
      utmSource: finalSource,
      utmMedium,
      utmCampaign,
    };

    const response = await fetch(`${backendUrl}/api/leads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      let errorMessage = "Không thể gửi yêu cầu tư vấn. Vui lòng thử lại sau!";
      try {
        const errorData = await response.json();
        if (errorData?.message) {
          errorMessage = Array.isArray(errorData.message)
            ? errorData.message.join(", ")
            : errorData.message;
        }
      } catch {
        // Fallback default message
      }
      throw new Error(errorMessage);
    }

    const result = await response.json();
    return {
      success: true,
      message:
        result.message ||
        "Đăng ký tư vấn thành công! Chuyên viên sẽ liên hệ với bạn trong 30 phút.",
      data: {
        id: String(result.leadId || result.data?.id || Date.now()),
        source: result.data?.source || finalSource,
        createdAt: result.data?.createdAt || new Date().toISOString(),
      },
    };
  },
};
