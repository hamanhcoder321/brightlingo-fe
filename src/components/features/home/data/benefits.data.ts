import {
  GraduationCap,
  Infinity as InfinityIcon,
  Headset,
  type LucideIcon,
} from "lucide-react";

export interface BenefitItem {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  /** Tailwind classes cho khung icon (nền + màu icon) */
  iconClassName: string;
}

export const BENEFITS: readonly BenefitItem[] = [
  {
    id: "practical-courses",
    title: "Khóa học thực chiến",
    description:
      "Bài giảng cô đọng, dễ áp dụng ngay vào công việc và đời sống",
    icon: GraduationCap,
    iconClassName: "bg-blue-100 text-blue-600",
  },
  {
    id: "lifetime-access",
    title: "Sở hữu trọn đời",
    description:
      "Thanh toán 1 lần duy nhất, học mọi lúc mọi nơi không giới hạn",
    icon: InfinityIcon,
    iconClassName: "bg-indigo-100 text-indigo-600",
  },
  {
    id: "dedicated-support",
    title: "Hỗ trợ tận tình",
    description: "Đội ngũ chuyên môn luôn sẵn sàng giải đáp thắc mắc 24/7",
    icon: Headset,
    iconClassName: "bg-orange-100 text-orange-500",
  },
];
