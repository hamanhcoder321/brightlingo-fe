import { SITE_SETTINGS, SUPPORT_INFO } from "@/lib/constants/site-config";
import { getApiBaseUrl } from "./config";

export interface HomepageSectionConfig {
  id: string;
  order: number;
  name: string;
  description: string;
  enabled: boolean;
  phase2?: boolean;
}

export type BannerPosition =
  | "home_hero"
  | "announcement_bar"
  | "home_after_courses"
  | "home_community"
  | "course_detail_bottom";

export type BannerStatus = "active" | "scheduled" | "inactive";

export interface BannerItemConfig {
  id: string;
  name: string;
  dimensions: string;
  position: BannerPosition;
  positionLabel: string;
  priority: number;
  startDate: string;
  endDate: string;
  status: BannerStatus;
  desktopImage: string;
  mobileImage: string;
  altText: string;
  title: string;
  subtitle?: string;
  badgeText?: string;
  ctaText: string;
  ctaLink: string;
  openInNewTab: boolean;
}

export interface Redirect301Item {
  id: string;
  from: string;
  to: string;
  note: string;
}

export interface PublicSiteSettings {
  site_name: string;
  hotline: string;
  support_email: string;
  working_hours: string;
  vietqr_bank_code: string;
  vietqr_account_number: string;
  vietqr_account_name: string;
  zalo_url: string;
  fanpage_url: string;
  community_group_url: string;
  community_group_name: string;
  community_members: string;
  youtube_tiktok_url: string;
  company_name: string;
  tax_id: string;
  company_address: string;
  homepage_sections: HomepageSectionConfig[];
  banners: BannerItemConfig[];
  active_banners: Record<string, BannerItemConfig | null>;
  meta_title: string;
  meta_description: string;
  og_image: string;
  favicon: string;
  google_site_verification: string;
  google_analytics_id: string;
  gtm_id: string;
  facebook_pixel_id: string;
  send_purchase_event: boolean;
  robots_txt: string;
  noindex: boolean;
  primary_domain: string;
  www_redirect: "non-www" | "www";
  redirects_301: Redirect301Item[];
  schema_organization: boolean;
  schema_course: boolean;
  schema_faq: boolean;
  schema_breadcrumb: boolean;
  schema_article: boolean;
}

export const DEFAULT_HOMEPAGE_SECTIONS: HomepageSectionConfig[] = [
  {
    id: "announcement",
    order: 1,
    name: "Thanh thông báo",
    description: "Dải chữ trên cùng – khuyến mãi, tin mới",
    enabled: true,
  },
  {
    id: "hero",
    order: 2,
    name: "Banner chính (Hero)",
    description: "Ảnh + tiêu đề + nút",
    enabled: true,
  },
  {
    id: "courses",
    order: 3,
    name: "Khóa nổi bật & danh sách",
    description: "Lấy từ menu Khóa học",
    enabled: true,
  },
  {
    id: "how_to_buy",
    order: 4,
    name: "Mua hàng 3 bước",
    description: "Nội dung cố định",
    enabled: true,
  },
  {
    id: "community",
    order: 5,
    name: "Cộng đồng Facebook",
    description: "Ảnh, link nhóm, số thành viên",
    enabled: true,
  },
  {
    id: "blog",
    order: 6,
    name: "Góc chia sẻ (Bài viết)",
    description: "Mở ở giai đoạn 2",
    enabled: false,
    phase2: true,
  },
  {
    id: "faq",
    order: 7,
    name: "Hỏi đáp & Chính sách",
    description: "Lấy từ menu Chính sách & Hỏi đáp",
    enabled: true,
  },
  {
    id: "consultation",
    order: 8,
    name: "Form tư vấn",
    description: "Gửi về menu Yêu cầu tư vấn",
    enabled: true,
  },
];

export const DEFAULT_PUBLIC_SETTINGS: PublicSiteSettings = {
  site_name: SITE_SETTINGS.site_name,
  hotline: SUPPORT_INFO.hotline,
  support_email: SUPPORT_INFO.email,
  working_hours: SUPPORT_INFO.workingHours,
  vietqr_bank_code: "MBBANK",
  vietqr_account_number: "0399046519",
  vietqr_account_name: "HA VAN MANH",
  zalo_url: SUPPORT_INFO.zaloUrl,
  fanpage_url: SUPPORT_INFO.fanpageUrl,
  community_group_url: SUPPORT_INFO.communityGroupUrl,
  community_group_name: SUPPORT_INFO.communityGroupName,
  community_members: SUPPORT_INFO.communityMembers || "12.000+",
  youtube_tiktok_url: "",
  company_name: "",
  tax_id: "",
  company_address: "",
  homepage_sections: DEFAULT_HOMEPAGE_SECTIONS,
  banners: [],
  active_banners: {
    home_hero: null,
    announcement_bar: null,
    home_after_courses: null,
    home_community: null,
    course_detail_bottom: null,
  },
  meta_title: SITE_SETTINGS.meta_title,
  meta_description: SITE_SETTINGS.meta_description,
  og_image: "",
  favicon: "/logo-tab-1.png",
  google_site_verification: "",
  google_analytics_id: SITE_SETTINGS.google_analytics_tracking_id,
  gtm_id: "",
  facebook_pixel_id: "",
  send_purchase_event: true,
  robots_txt: "User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /thanh-toan",
  noindex: false,
  primary_domain: SITE_SETTINGS.site_url,
  www_redirect: "non-www",
  redirects_301: [],
  schema_organization: true,
  schema_course: true,
  schema_faq: true,
  schema_breadcrumb: true,
  schema_article: false,
};

export const siteSettingsApi = {
  getPublicSettings: async (options?: {
    cached?: boolean;
  }): Promise<PublicSiteSettings> => {
    const backendUrl = getApiBaseUrl();
    const isBuild =
      typeof window === "undefined" &&
      process.env.npm_lifecycle_event === "build";

    if (!isBuild) {
      try {
        const res = await fetch(
          `${backendUrl}/api/settings/public`,
          options?.cached ? undefined : { cache: "no-store" },
        );
        if (res.ok) {
          const json = await res.json();
          const data = json?.data || json || {};
          return {
            ...DEFAULT_PUBLIC_SETTINGS,
            ...data,
            homepage_sections:
              Array.isArray(data.homepage_sections) &&
              data.homepage_sections.length > 0
                ? data.homepage_sections
                : DEFAULT_HOMEPAGE_SECTIONS,
            active_banners: {
              ...DEFAULT_PUBLIC_SETTINGS.active_banners,
              ...(data.active_banners || {}),
            },
          };
        }
      } catch {
        // Fallback silently when API is offline
      }
    }

    return DEFAULT_PUBLIC_SETTINGS;
  },
};
