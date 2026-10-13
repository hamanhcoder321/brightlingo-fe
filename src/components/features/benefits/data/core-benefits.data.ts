import {
  Infinity as InfinityIcon,
  Zap,
  Briefcase,
  MonitorSmartphone,
  Headphones,
  Lock,
  type LucideIcon,
} from "lucide-react";

export interface CoreBenefitItem {
  id: string;
  icon: LucideIcon;
  badge: string;
  title: string;
  description: string;
  footerNote: string;
}

export interface CoreBenefitsSectionData {
  tagText: string;
  title: string;
  description: string;
  items: CoreBenefitItem[];
}

export const CORE_BENEFITS_DATA: CoreBenefitsSectionData = {
  tagText: "GIÁ TRỊ THỰC TẾ",
  title: "6 Lợi ích cốt lõi đồng hành cùng hành trình của bạn",
  description:
    "Thiết kế tối giản, loại bỏ phiền toái để bạn tập trung hoàn toàn vào việc hấp thụ kiến thức và áp dụng ngay vào công việc.",
  items: [
    {
      id: "lifetime-access",
      icon: InfinityIcon,
      badge: "Tiết kiệm 100%",
      title: "Học trọn đời chỉ thanh toán 1 lần",
      description:
        "Không phí duy trì định kỳ, không ép mua gói gia hạn hàng tháng. Mua một lần duy nhất, tài khoản và toàn bộ bài học thuộc quyền sở hữu vĩnh viễn của bạn.",
      footerNote: "Không phát sinh chi phí ẩn",
    },
    {
      id: "instant-delivery",
      icon: Zap,
      badge: "Hệ thống tự động",
      title: "Giao tài liệu số tức thì",
      description:
        "Tự động gửi link Google Drive tốc độ cao hoặc template Notion trong vòng 1-5 phút qua email ngay sau khi hệ thống ghi nhận giao dịch thành công.",
      footerNote: "Kích hoạt tự động 24/7",
    },
    {
      id: "practical-application",
      icon: Briefcase,
      badge: "Thực chiến 100%",
      title: "Tính ứng dụng cao cho người đi làm",
      description:
        "Thiết kế dành riêng cho người mất gốc hoặc người bận rộn. Bộ template email, văn bản hợp hành, hội thoại thực chiến kèm sơ đồ tư duy tóm tắt trực quan.",
      footerNote: "Áp dụng ngay sau 15 phút học",
    },
    {
      id: "multi-platform",
      icon: MonitorSmartphone,
      badge: "Đa nền tảng",
      title: "Tự do học mọi lúc mọi nơi",
      description:
        "Tương thích hoàn hảo với máy tính để bàn, laptop, iPad và điện thoại thông minh. Hỗ trợ tải bài học offline để bạn học ngay cả khi di chuyển trên máy bay.",
      footerNote: "Đồng bộ tiến độ học tập",
    },
    {
      id: "dedicated-support",
      icon: Headphones,
      badge: "Tương tác trực tiếp",
      title: "Giáo viên hỗ trợ tận tâm 24/7",
      description:
        "Bạn không hề đơn độc trong quá trình tự học. Đội ngũ giáo viên chuyên môn trực tiếp hỗ trợ, giải đáp thắc mắc bài tập qua Zalo cá nhân và kênh email học viên.",
      footerNote: "Phản hồi dưới 30 phút",
    },
    {
      id: "secure-vietqr",
      icon: Lock,
      badge: "Minh bạch VietQR",
      title: "Bảo mật & minh bạch 100%",
      description:
        "Xác nhận thanh toán tự động qua cổng VietQR ngân hàng chính chủ, tự xuất biên lai điện tử. Không lưu trữ thông tin thẻ, đảm bảo an toàn tuyệt đối.",
      footerNote: "Bảo vệ quyền lợi học viên",
    },
  ],
};
