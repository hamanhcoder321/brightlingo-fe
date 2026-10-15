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
 * Danh sách danh mục khóa học (Khớp 100% với PostgreSQL Backend)
 */
export const COURSE_CATEGORIES: readonly CourseCategory[] = [
  { id: "all", name: "Tất cả" },
  { id: "communication", name: "Giao tiếp thực tế" },
  { id: "business", name: "Tiếng Anh công sở" },
  { id: "exam-prep", name: "Luyện thi IELTS & TOEIC" },
  { id: "grammar-foundation", name: "Ngữ pháp & Nền tảng" },
] as const;

/**
 * Danh sách khóa học theo từng category (mỗi category 5 khóa, giá 10k - 20k)
 */
export const MOCK_COURSES: readonly Course[] = [
  // 1. Giao tiếp thực tế
  {
    id: "course-1",
    slug: "english-for-real-life",
    title: "English for Real Life",
    description: "Giao tiếp tự tin trong mọi tình huống thực tế, phản xạ nhanh không cần dịch nhẩm.",
    image: IMAGES.COURSES.COURSE_1,
    price: 10000,
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
    id: "course-com-2",
    slug: "phan-xa-giao-tiep-30-ngay",
    title: "Phản xạ giao tiếp 30 ngày",
    description: "Nói tự nhiên, phản xạ tức thì với 50 tình huống hội thoại thường ngày.",
    image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=800&q=80",
    price: 12000,
    originalPrice: 499000,
    meta: "30 video · Audio",
    categoryId: "communication",
    badge: {
      text: "Hot",
      variant: "warning",
    },
  },
  {
    id: "course-com-3",
    slug: "phat-am-chuan-my-shadowing",
    title: "Luyện phát âm chuẩn Mỹ & Shadowing",
    description: "Làm chủ 44 âm IPA, nối âm, nuốt âm và ngữ điệu tự nhiên như người bản xứ.",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
    price: 15000,
    originalPrice: 599000,
    meta: "36 bài · 50 Audio",
    categoryId: "communication",
  },
  {
    id: "course-com-4",
    slug: "dam-thoai-du-lich-san-bay",
    title: "Tiếng Anh du lịch & Sân bay",
    description: "Tự tin làm thủ tục hải quan, đặt phòng khách sạn, hỏi đường và mua sắm không lo lạc.",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80",
    price: 10000,
    originalPrice: 399000,
    meta: "20 video · Ebook",
    categoryId: "communication",
  },
  {
    id: "course-com-5",
    slug: "tieng-anh-nha-hang-cafe-smalltalk",
    title: "Small Talk tại Nhà hàng & Cafe",
    description: "100 mẫu câu bắt chuyện tự nhiên, phá băng mọi cuộc trò chuyện xã giao.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
    price: 14000,
    originalPrice: 450000,
    meta: "25 video · Audio",
    categoryId: "communication",
  },

  // 2. Tiếng Anh công sở
  {
    id: "course-bus-1",
    slug: "business-english-for-global-work",
    title: "Business English for Global Work",
    description: "Tiếng Anh văn phòng, viết email thương mại, thuyết trình và đàm phán hợp đồng.",
    image: IMAGES.COURSES.COURSE_3,
    price: 15000,
    originalPrice: 799000,
    meta: "40 video · 4 PDF",
    categoryId: "business",
    badge: {
      text: "Đề xuất",
      variant: "primary",
    },
  },
  {
    id: "course-bus-2",
    slug: "viet-email-thuong-mai-chuyen-nghiep",
    title: "Viết Email & Báo cáo chuyên nghiệp",
    description: "100+ template Email chuyên nghiệp gửi sếp, đối tác và khách hàng quốc tế.",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
    price: 12000,
    originalPrice: 550000,
    meta: "100 Template · Ebook",
    categoryId: "business",
  },
  {
    id: "course-bus-3",
    slug: "thuyet-trinh-dam-phan-tieng-anh",
    title: "Thuyết trình & Đàm phán hợp đồng",
    description: "Công thức thuyết trình cuốn hút, xử lý câu hỏi hóc búa từ đối tác nước ngoài.",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
    price: 18000,
    originalPrice: 850000,
    meta: "32 video · Slides",
    categoryId: "business",
  },
  {
    id: "course-bus-4",
    slug: "phong-van-xin-viec-tap-doan-da-quoc-gia",
    title: "Phỏng vấn Tập đoàn Đa quốc gia",
    description: "Trả lời mượt mà 50 câu hỏi tuyển dụng phổ biến theo phương pháp STAR.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    price: 16000,
    originalPrice: 690000,
    meta: "50 Video Mock · PDF",
    categoryId: "business",
  },
  {
    id: "course-bus-5",
    slug: "tieng-anh-hop-meeting-va-brainstorming",
    title: "Tiếng Anh điều hành cuộc họp (Meetings)",
    description: "Mẫu câu dẫn dắt cuộc họp, bày tỏ quan điểm và phản biện lịch sự.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    price: 14000,
    originalPrice: 500000,
    meta: "24 bài học · Audio",
    categoryId: "business",
  },

  // 3. Luyện thi IELTS & TOEIC
  {
    id: "course-exam-1",
    slug: "ielts-writing-master-kit",
    title: "IELTS Writing Master & Kit",
    description: "50+ cấu trúc ăn điểm Band 7.5+ Task 1 & 2, kèm bộ template phân tích chi tiết.",
    image: IMAGES.COURSES.COURSE_2,
    price: 20000,
    originalPrice: 890000,
    meta: "Ebook PDF + Template",
    categoryId: "exam-prep",
    badge: {
      text: "Tài liệu hot",
      variant: "primary",
    },
  },
  {
    id: "course-exam-2",
    slug: "ielts-speaking-band-8-formula",
    title: "Công thức Band 8.0 IELTS Speaking",
    description: "Bộ ý tưởng giải đề độc quyền Part 1, 2, 3 kèm Audio bài mẫu phát âm chuẩn.",
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80",
    price: 18000,
    originalPrice: 800000,
    meta: "Part 1-2-3 · 80 Audio",
    categoryId: "exam-prep",
  },
  {
    id: "course-exam-3",
    slug: "toeic-900-cap-toc-nghe-doc",
    title: "Bí kíp 900+ TOEIC cấp tốc",
    description: "Mẹo bẫy đề thi mới nhất ETS, phương pháp nghe bắt từ khóa không cần dịch.",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80",
    price: 15000,
    originalPrice: 650000,
    meta: "10 Đề Full · Giải chi tiết",
    categoryId: "exam-prep",
  },
  {
    id: "course-exam-4",
    slug: "ielts-reading-skimming-scanning",
    title: "IELTS Reading Skimming & Scanning",
    description: "Chiến thuật xử lý True/False/Not Given và Headings Matching trong 60 phút.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
    price: 16000,
    originalPrice: 700000,
    meta: "20 Dạng bài · Chiến thuật",
    categoryId: "exam-prep",
  },
  {
    id: "course-exam-5",
    slug: "bo-de-du-doan-ielts-quy-moi-nhat",
    title: "Trọn bộ Đề dự đoán IELTS mới nhất",
    description: "Cập nhật đề thi thật mới nhất từ IDP & BC kèm phân tích từ vựng cao cấp.",
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
    price: 12000,
    originalPrice: 590000,
    meta: "PDF 150 trang · Update",
    categoryId: "exam-prep",
  },

  // 4. Ngữ pháp & Nền tảng
  {
    id: "course-gram-1",
    slug: "ngu-phap-1000-mau-cau-so",
    title: "Ngữ pháp & 1000 Mẫu câu số",
    description: "Lấy lại nền tảng nhanh chóng, xóa bỏ nỗi sợ nói sai với giọng đọc chuẩn bản xứ.",
    image: IMAGES.COURSES.COURSE_4,
    price: 10000,
    originalPrice: 499000,
    meta: "24 video · Audio",
    categoryId: "grammar-foundation",
    badge: {
      text: "Căn bản",
      variant: "danger",
    },
  },
  {
    id: "course-gram-2",
    slug: "lay-goc-tieng-anh-tu-so-0",
    title: "Lấy gốc tiếng Anh từ con số 0",
    description: "Lộ trình từng bước từ phát âm, từ vựng đến phản xạ câu đơn giản trong 6 tuần.",
    image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=800&q=80",
    price: 10000,
    originalPrice: 450000,
    meta: "36 bài · Lộ trình 6 tuần",
    categoryId: "grammar-foundation",
  },
  {
    id: "course-gram-3",
    slug: "hack-3000-tu-vung-theo-chu-de",
    title: "Hack 3.000 từ vựng theo chủ đề",
    description: "Nhớ sâu không quên 3.000 từ vựng thông dụng qua phương pháp Spaced Repetition.",
    image: "https://images.unsplash.com/photo-1471970471555-bf5d1b32822b?auto=format&fit=crop&w=800&q=80",
    price: 15000,
    originalPrice: 600000,
    meta: "Flashcards · Audio",
    categoryId: "grammar-foundation",
  },
  {
    id: "course-gram-4",
    slug: "he-thong-12-thi-ung-dung-thuc-te",
    title: "Làm chủ 12 thì tiếng Anh thực chiến",
    description: "Sơ đồ tư duy trực quan phân biệt các thì dễ gây nhầm lẫn nhất khi nói và viết.",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80",
    price: 12000,
    originalPrice: 400000,
    meta: "12 Video · Mindmap PDF",
    categoryId: "grammar-foundation",
  },
  {
    id: "course-gram-5",
    slug: "cau-truc-cau-va-phan-xa-dat-cau-nhanh",
    title: "Quy tắc ghép câu & Đặt câu thần tốc",
    description: "Hiểu rõ cấu trúc câu ghép, câu phức để diễn đạt ý tưởng gãy gọn và tự nhiên.",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
    price: 14000,
    originalPrice: 520000,
    meta: "20 video · Bài tập",
    categoryId: "grammar-foundation",
  },
] as const;

/**
 * Format giá tiền sang đơn vị VNĐ (VD: 10.000đ)
 */
export function formatCurrencyVND(amount: number): string {
  return new Intl.NumberFormat("vi-VN").format(amount) + "đ";
}
