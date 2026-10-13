import { IMAGES } from "@/lib/constants/images";
import type { CourseDetail } from "../types";

export const COURSE_DETAIL_MOCK: CourseDetail = {
  id: "course-1",
  slug: "english-for-real-life",
  categoryName: "Khóa học giao tiếp",
  tagBadge: "English for Real Life - Giao tiếp tự tin trong mọi tình huống",
  typeBadge: "Trọn đời",
  title: "English for Real Life – Khóa học video thực tế & Ebook số trọn đời",
  rating: 4.9,
  reviewsCount: "1.2k đánh giá",
  studentsCount: "8.500+ học viên đã học",
  lastUpdated: "Cập nhật mới nhất 2024",
  price: 399000,
  originalPrice: 699000,
  discountPercent: 43,
  image: IMAGES.COURSES.COURSE_1,
  videoDemoTitle: "Xem video demo bài giảng (2 phút)",
  videoDemoDuration: "2:15",
  videoDemoSubtitle: "Phương pháp phản xạ tình huống độc quyền",
  videoUrl: "", // Để trống sẵn sàng gắn URL video bài giảng từ Cloudflare/YouTube sau này
  benefits: [
    {
      id: "benefit-1",
      title: "Tự tin phản xạ tự nhiên trong 30 ngày",
      description:
        "Xóa bỏ hoàn toàn rào cản sợ sai, hình thành tư duy nói không cần dịch từ trong đầu.",
    },
    {
      id: "benefit-2",
      title: "1.000+ mẫu câu và tình huống đàm thoại thực tế",
      description:
        "Tuyển tập câu giao tiếp thông dụng chuẩn văn phong bản xứ phục vụ đi làm và du lịch.",
    },
    {
      id: "benefit-3",
      title: "Sở hữu trọn đời kèm trọn bộ Ebook & Audio độc quyền",
      description:
        "Tải về máy học mọi lúc mọi nơi trên điện thoại, máy tính không giới hạn thời gian.",
    },
  ],
  curriculum: {
    summary: "8 phần học • 42 bài giảng video HD • Ebook PDF & Audio files tải về máy",
    totalDuration: "Tổng thời lượng: 18 giờ",
    sections: [
      {
        id: "section-1",
        title: "Phần 1: Khởi động - Phản xạ giao tiếp chào hỏi & Kết nối bạn ban đầu (5 bài)",
        lessonsCount: 5,
        lessons: [
          {
            id: "s1-l1",
            title: "Bài 01: Vượt qua tâm lý ngại nói tiếng Anh",
            duration: "14:20",
            badgeText: "Có video & Script",
          },
          {
            id: "s1-l2",
            title: "Bài 02: 10 mẫu câu mở đầu cuộc trò chuyện tự nhiên",
            duration: "18:45",
            badgeText: "Có video & Script",
          },
          {
            id: "s1-l3",
            title: "Bài 03: Phản xạ Small Talk trong thang máy & quán cafe",
            duration: "22:10",
            badgeText: "Có video & Script",
          },
          {
            id: "s1-l4",
            title: "Bài 04: Cách duy trì hội thoại khi vốn từ hạn chế",
            duration: "16:30",
            badgeText: "Có video & Script",
          },
          {
            id: "s1-l5",
            title: "Bài 05: Thực hành tình huống 01 (Audio kèm bài tập)",
            duration: "25:00",
            badgeText: "Audio & PDF",
          },
        ],
      },
      {
        id: "section-2",
        title: "Phần 2: Giao tiếp công sở & Làm việc nhóm (6 bài)",
        lessonsCount: 6,
        lessons: [
          {
            id: "s2-l1",
            title: "Bài 06: Chào hỏi đồng nghiệp & Tham gia cuộc họp sáng",
            duration: "19:15",
            badgeText: "Có video & Script",
          },
          {
            id: "s2-l2",
            title: "Bài 07: Thuyết trình ý tưởng ngắn gọn, súc tích",
            duration: "24:30",
            badgeText: "Có video & Script",
          },
          {
            id: "s2-l3",
            title: "Bài 08: Đưa ra góp ý & Phản biện lịch sự bằng tiếng Anh",
            duration: "20:45",
            badgeText: "Có video & Script",
          },
        ],
      },
      {
        id: "section-3",
        title: "Phần 3: Đàm thoại nhà hàng, mua sắm & du lịch thực chiến (6 bài)",
        lessonsCount: 6,
        lessons: [
          {
            id: "s3-l1",
            title: "Bài 09: Đặt bàn, gọi món và yêu cầu đặc biệt tại nhà hàng",
            duration: "15:50",
            badgeText: "Có video & Script",
          },
          {
            id: "s3-l2",
            title: "Bài 10: Xử lý tình huống tại sân bay & khách sạn",
            duration: "21:10",
            badgeText: "Có video & Script",
          },
        ],
      },
      {
        id: "section-4",
        title: "Phần 4: Phát âm chuẩn IPA & Ngữ điệu bản xứ (5 bài)",
        lessonsCount: 5,
        lessons: [
          {
            id: "s4-l1",
            title: "Bài 11: Nối âm, nuốt âm và trọng âm câu tự nhiên",
            duration: "28:15",
            badgeText: "Có video & Script",
          },
        ],
      },
      {
        id: "section-5",
        title: "Phần 5: Ebook tổng hợp 1000 mẫu câu & File Audio nghe thụ động (Tải trọn bộ)",
        lessonsCount: 2,
        lessons: [
          {
            id: "s5-l1",
            title: "Tài liệu số: Ebook PDF Full Color 1.000 mẫu câu giao tiếp",
            duration: "PDF 120 trang",
            badgeText: "Ebook số tải về",
          },
          {
            id: "s5-l2",
            title: "Audio Files: 50 bài nghe thụ động giọng chuẩn Mỹ",
            duration: "MP3 320kbps",
            badgeText: "Audio bản quyền",
          },
        ],
      },
    ],
  },
  bankInfo: {
    bankName: "VIETCOMBANK",
    accountName: "NGUYEN THI ANH",
    accountNumber: "1028475829",
    orderCodePrefix: "EL",
  },
};

export interface CourseFaqItem {
  id: string;
  question: string;
  answer: string;
}

/**
 * Danh sách câu hỏi thường gặp mặc định (FAQ) cho tất cả các trang chi tiết khóa học.
 * Cố định tĩnh, không phụ thuộc API.
 */
export const COURSE_DETAIL_FAQS: readonly CourseFaqItem[] = [
  {
    id: "faq-learning-format",
    question: "Hình thức học thế nào? Có cần chờ mở lớp không?",
    answer:
      "Toàn bộ video bài giảng và tài liệu số đã được biên soạn và đóng gói sẵn sàng. Sau khi hoàn tất thanh toán, bạn có thể truy cập học ngay lập tức trên máy tính hoặc điện thoại mà không cần phải chờ mở lớp.",
  },
  {
    id: "faq-delivery-time",
    question: "Sau bao lâu thì nhận được khóa học và tài liệu?",
    answer:
      "Ngay sau khi hệ thống BankNoti xác nhận chuyển khoản thành công (thường chỉ mất từ 1 đến 3 phút), đường link truy cập tài liệu và khóa học sẽ tự động được gửi thẳng về địa chỉ email bạn đã nhập.",
  },
  {
    id: "faq-lifetime-access",
    question: "Tôi được xem lại bài học bao nhiêu lần?",
    answer:
      "Khóa học và trọn bộ tài liệu số được sở hữu trọn đời. Bạn có thể xem lại bài giảng và tải tài liệu về máy không giới hạn số lần, hoàn toàn không phát sinh thêm bất kỳ chi phí duy trì hàng tháng nào.",
  },
  {
    id: "faq-academic-support",
    question: "Tôi có được hỗ trợ chuyên môn nếu không hiểu bài?",
    answer:
      "Có. Đội ngũ giáo viên và chuyên viên hỗ trợ của BrightLingo luôn sẵn sàng đồng hành qua nhóm học tập riêng và kênh hỗ trợ 24/7 để giải đáp mọi thắc mắc học tập của bạn.",
  },
] as const;
