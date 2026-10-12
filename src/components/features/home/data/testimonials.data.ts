export interface Testimonial {
  id: string;
  name: string;
  role: string;
  /** Avatar hình ảnh (URL từ API nếu có) */
  avatar?: string;
  /** Chữ cái viết tắt hiển thị khi chưa có ảnh avatar */
  initials: string;
  /** Màu nền avatar viết tắt */
  avatarBgColor?: string;
  /** Điểm đánh giá (1 - 5 sao), hỗ trợ số thập phân hoặc nguyên từ API */
  rating: number;
  /** Nội dung nhận xét / cảm nhận */
  content: string;
}

/**
 * Mock data 3 đánh giá mẫu từ học viên bám sát thiết kế mockup.
 * Cấu trúc chuẩn sẵn sàng thay thế trực tiếp bằng API GET /testimonials sau này.
 */
export const MOCK_TESTIMONIALS: readonly Testimonial[] = [
  {
    id: "review-1",
    name: "Trần Minh Quân",
    role: "Backend Developer tại FPT Software",
    initials: "TM",
    avatarBgColor: "bg-blue-100 text-blue-700",
    rating: 5,
    content:
      "“Mình là dân IT, giao tiếp với sếp nước ngoài lúc trước rất run và ấp úng. Khóa English for Real Life đúng kiểu thực chiến, không bắt học mẹo ngữ pháp cao siêu mà đi thẳng vào phản xạ câu ngắn và tự nhiên. Quá hời cho mức giá này!”",
  },
  {
    id: "review-2",
    name: "Phương Thảo",
    role: "Sinh viên Đại học Ngoại Thương",
    initials: "PT",
    avatarBgColor: "bg-slate-100 text-slate-700",
    rating: 5,
    content:
      "“Thích nhất là khâu thanh toán quét VietQR xong nhận ngay file drive và email hỗ trợ liền không cần đợi nhân viên duyệt tay. Bộ template IELTS Writing phân loại rõ ràng, nhờ nó mà mình kịp tăng từ 6.0 lên 7.0 Writing chỉ sau 4 tuần ôn!”",
  },
  {
    id: "review-3",
    name: "Lê Hoàng Yến",
    role: "Chuyên viên Nhân sự (HR)",
    initials: "LH",
    avatarBgColor: "bg-amber-100 text-amber-700",
    rating: 5,
    content:
      "“Nội dung cô đọng, bài giảng video ngắn 10-15 phút rất hợp với mẹ bỉm sữa vừa chăm con vừa tranh thủ nghe qua điện thoại. Mua 1 lần sở hữu trọn đời nên không bị áp lực hết hạn tài khoản như các nền tảng khác.”",
  },
] as const;
