export const SITE_SETTINGS = {
  site_url: process.env.NEXT_PUBLIC_CLIENT_URL || "https://engnest.vn",
  site_name: "EngNest",
  meta_title: "EngNest – Nền tảng học tiếng Anh online thực chiến",
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
  email: "hotro@engnest.vn",
  workingHours: "08:00 - 22:00 mỗi ngày",
  zaloUrl: "https://zalo.me/",
  fanpageUrl: "https://facebook.com/",
  communityGroupUrl: "https://facebook.com/groups/",
  communityGroupName: "Cộng đồng Tự học tiếng Anh EngNest",
  communityMembers: "",
} as const;
