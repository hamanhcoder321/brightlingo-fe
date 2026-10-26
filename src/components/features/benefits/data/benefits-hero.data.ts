export interface BenefitHighlightItem {
  id: string;
  text: string;
}

export interface BenefitComparisonRow {
  label: string;
  value: string;
  highlight?: boolean;
}

export interface BenefitsHeroData {
  badgeText: string;
  titlePrefix: string;
  titleHighlight: string;
  description: string;
  highlights: BenefitHighlightItem[];
  primaryCtaText: string;
  secondaryCtaText: string;
  comparisonCard: {
    title: string;
    subtitle: string;
    rating: string;
    rows: BenefitComparisonRow[];
    quote: string;
  };
}

export const BENEFITS_HERO_DATA: BenefitsHeroData = {
  badgeText: "Giá trị bền vững cho người học trực tuyến",
  titlePrefix: "Học dễ hơn, tiến bộ nhanh hơn cùng",
  titleHighlight: "EngNest",
  description:
    "Chúng tôi loại bỏ hoàn toàn các rào cản học tập truyền thống: không phí duy trì rườm rà, không lịch học gò bó. Nền tảng số hiện đại giúp người đi làm và người mất gốc làm chủ tiếng Anh thực chiến nhanh gấp 3 lần.",
  highlights: [
    {
      id: "hl-1",
      text: "1 lần mua - Học trọn đời",
    },
    {
      id: "hl-2",
      text: "Kích hoạt tự động VietQR",
    },
    {
      id: "hl-3",
      text: "Hỗ trợ học viên 24/7",
    },
  ],
  primaryCtaText: "Xem chi tiết 6 lợi ích",
  secondaryCtaText: "So sánh phương pháp học",
  comparisonCard: {
    title: "Phương pháp EngNest",
    subtitle: "Tối ưu cho tư duy phản xạ",
    rating: "4.9/5.0",
    rows: [
      {
        label: "Thời gian tiếp cận bài học",
        value: "1 - 5 phút (Tức thì)",
      },
      {
        label: "Chi phí duy trì hàng tháng",
        value: "0đ (Không phụ phí)",
        highlight: true,
      },
      {
        label: "Định dạng tài nguyên số",
        value: "Notion + Video + PDF",
      },
    ],
    quote:
      "“Đầu tư cho kỹ năng hôm nay là tự do cho ngày mai. Học tập thông minh, tinh gọn và rõ ràng.”",
  },
};
