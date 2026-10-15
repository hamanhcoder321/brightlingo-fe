import type { StaticImageData } from "next/image";
import { IMAGES } from "@/lib/constants/images";

export type BadgeVariant = "danger" | "primary" | "warning";

export interface CourseBadge {
  text: string;
  variant: BadgeVariant;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: StaticImageData | string;
  price: number;
  originalPrice?: number;
  categoryId: string; // Khóa ngoại dùng để filter và map API sau này
  badge?: CourseBadge;
  /** Nhãn định dạng hiển thị trên ảnh bìa, VD: "42 video · PDF · Audio" */
  meta?: string;
  /** Các điểm nổi bật (chỉ hiển thị ở thẻ khóa học nổi bật) */
  highlights?: string[];
  /** Khóa nổi bật hiển thị lớn trên trang chủ (chọn trong CMS) */
  isFeatured?: boolean;
}

export interface CourseCategory {
  id: string;
  name: string;
}

/**
 * Danh sách danh mục khóa học (Dễ dàng thay thế bằng API GET /categories sau này)
 */
export const COURSE_CATEGORIES: readonly CourseCategory[] = [
  { id: "all", name: "Tất cả" },
  { id: "communication", name: "Giao tiếp thực tế" },
  { id: "business", name: "Tiếng Anh công sở" },
  { id: "exam-prep", name: "Luyện thi & Tài liệu số" },
] as const;

/**
 * Mock data 4 khóa học hiển thị trang chủ (Dễ dàng thay thế bằng API GET /courses sau này)
 */
export const MOCK_COURSES: readonly Course[] = [
  {
    id: "course-1",
    slug: "english-for-real-life",
    title: "English for Real Life",
    description:
      "Giao tiếp tự tin trong mọi tình huống thực tế, phản xạ nhanh không cần dịch nhẩm.",
    image: IMAGES.COURSES.COURSE_1,
    price: 399000,
    originalPrice: 699000,
    meta: "42 video · PDF · Audio",
    isFeatured: true,
    highlights: [
      "1.000+ mẫu câu theo tình huống thực tế",
      "Audio giọng chuẩn để luyện nghe – nói",
      "Ebook PDF tải về, học offline mọi lúc",
    ],
    categoryId: "communication",
    badge: {
      text: "Bán chạy",
      variant: "danger",
    },
  },
  {
    id: "course-2",
    slug: "ielts-writing-master-kit",
    title: "IELTS Writing Master & Kit",
    description:
      "50+ cấu trúc ăn điểm Band 7.5+ Task 1 & 2, kèm bộ template phân tích chi tiết.",
    image: IMAGES.COURSES.COURSE_2,
    price: 499000,
    originalPrice: 890000,
    meta: "Ebook PDF + Template",
    categoryId: "exam-prep",
    badge: {
      text: "Tài liệu hot",
      variant: "primary",
    },
  },
  {
    id: "course-3",
    slug: "business-english-for-global-work",
    title: "Business English for Global Work",
    description:
      "Tiếng Anh văn phòng, viết email thương mại, thuyết trình và đàm phán hợp đồng.",
    image: IMAGES.COURSES.COURSE_3,
    price: 399000,
    originalPrice: 699000,
    meta: "40 video · 4 PDF",
    categoryId: "business",
  },
  {
    id: "course-4",
    slug: "ngu-phap-1000-mau-cau-so",
    title: "Ngữ pháp & 1000 Mẫu câu số",
    description:
      "Lấy lại nền tảng nhanh chóng, xóa bỏ nỗi sợ nói sai với giọng đọc chuẩn bản xứ.",
    image: IMAGES.COURSES.COURSE_4,
    price: 299000,
    originalPrice: 499000,
    meta: "24 video · Audio",
    categoryId: "communication",
  },
] as const;

/**
 * Format giá tiền sang đơn vị VNĐ (VD: 399.000đ)
 */
export function formatCurrencyVND(amount: number): string {
  return new Intl.NumberFormat("vi-VN").format(amount) + "đ";
}
