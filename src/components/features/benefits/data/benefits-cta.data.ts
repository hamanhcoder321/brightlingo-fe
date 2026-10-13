export interface BenefitsCtaData {
  badgeText: string;
  title: string;
  description: string;
  primaryCta: {
    text: string;
    href: string;
  };
  secondaryCta: {
    text: string;
    href: string;
  };
}

export const BENEFITS_CTA_DATA: BenefitsCtaData = {
  badgeText: "Ưu đãi có hạn cho tháng này",
  title: "Khám phá các khóa học ngay hôm nay để nhận ưu đãi lên đến 43%",
  description:
    "Bắt đầu hành trình làm chủ tiếng Anh với chi phí tiết kiệm nhất. Thanh toán an toàn qua VietQR, nhận quyền truy cập trọn đời ngay lập tức.",
  primaryCta: {
    text: "Xem danh sách khóa học",
    href: "/khoa-hoc",
  },
  secondaryCta: {
    text: "Liên hệ tư vấn viên",
    href: "/#tu-van",
  },
};
