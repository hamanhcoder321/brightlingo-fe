export const SITE_SETTINGS = {
  site_url: process.env.NEXT_PUBLIC_CLIENT_URL || "http://localhost:3000",
  site_name: "BrightLingo",
  meta_title: "BrightLingo - Học Tiếng Anh Online Thực Chiến Cho Người Việt",
  meta_description:
    "Nền tảng cung cấp khóa học và tài liệu số tiếng Anh chất lượng cao, thiết thực cho người Việt. Tinh gọn lý thuyết, tập trung phản xạ thực tế, học trọn đời không phí duy trì.",
  google_analytics_tracking_id: process.env.NEXT_PUBLIC_GA_ID || "",
};
