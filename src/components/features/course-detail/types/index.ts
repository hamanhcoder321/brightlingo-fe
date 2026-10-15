import type { StaticImageData } from "next/image";

export interface CourseBenefit {
  id: string;
  title: string;
  description: string;
}

export interface CourseLesson {
  id: string;
  title: string;
  duration?: string;
  badgeText?: string;
  videoUrl?: string; // Để trống sẵn sàng đổ link video backend sau này
}

export interface CourseSection {
  id: string;
  title: string;
  lessonsCount?: number;
  lessons: CourseLesson[];
}

export interface CourseCurriculum {
  summary: string;
  totalDuration: string;
  sections: CourseSection[];
}

export interface CourseBankInfo {
  bankName: string;
  accountName: string;
  accountNumber: string;
  orderCodePrefix: string;
}

export interface CourseDetail {
  id: string;
  slug: string;
  title: string;
  categoryName: string;
  tagBadge: string;
  typeBadge: string;
  rating: number;
  reviewsCount: string;
  studentsCount: string;
  lastUpdated: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  image: StaticImageData | string;
  videoDemoTitle: string;
  videoDemoDuration: string;
  videoDemoSubtitle: string;
  videoUrl?: string; // Dành cho video demo bài giảng sau này đổ data
  benefits: CourseBenefit[];
  curriculum: CourseCurriculum;
  bankInfo: CourseBankInfo;
}

export interface CouponApplyResult {
  code: string;
  discountAmount: number;
  finalPrice: number;
  message: string;
  isApplied: boolean;
}

export interface OrderCreationResult {
  orderId: string;
  orderCode: string;
  amount: number;
  bankName: string;
  accountName: string;
  accountNumber: string;
  qrCodeUrl: string;
  checkoutUrl?: string;
  expiresInSeconds: number;
  createdAt: string;
}
