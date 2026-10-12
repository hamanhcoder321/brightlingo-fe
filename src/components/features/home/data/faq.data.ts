export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

/**
 * Từng biến câu hỏi & câu trả lời riêng biệt theo yêu cầu,
 * thuận tiện quản lý, chỉnh sửa nội dung trực tiếp không cần phụ thuộc API.
 */
export const FAQ_ITEM_PAYMENT: FaqItem = {
  id: "faq-payment",
  question: "Sau khi thanh toán tôi nhận khóa học như thế nào?",
  answer:
    "Ngay khi bạn chuyển khoản thành công qua hệ thống VietQR, hệ thống BankNoti tự động ghi nhận và gửi email chứa đường link truy cập trọn đời (Google Drive chất lượng cao + nền tảng học web) cùng tài liệu PDF đính kèm trong vòng 1 đến 5 phút.",
};

export const FAQ_ITEM_SUBSCRIPTION: FaqItem = {
  id: "faq-subscription",
  question: "Tôi có phải đóng phí duy trì hàng tháng không?",
  answer:
    "Hoàn toàn không. Bạn chỉ cần thanh toán một lần duy nhất để sở hữu toàn bộ video bài giảng, tài liệu PDF và kho cập nhật kiến thức trọn đời mà không phát sinh bất kỳ khoản phí duy trì nào.",
};

export const FAQ_ITEM_SUPPORT: FaqItem = {
  id: "faq-support",
  question: "Nếu gặp lỗi hoặc không nhận được email thì liên hệ ai?",
  answer:
    "Nếu sau 5 phút bạn chưa nhận được email kích hoạt (vui lòng kiểm tra cả hòm thư Rác/Spam), bạn có thể liên hệ ngay qua Hotline/Zalo CSKH hoặc nhắn tin trực tiếp trên Fanpage BrightLingo để được chuyên viên hỗ trợ kiểm tra và cấp lại quyền truy cập ngay lập tức.",
};

export const FAQ_ITEM_DOWNLOAD: FaqItem = {
  id: "faq-download",
  question: "Tôi có thể tải video và tài liệu về máy tính/điện thoại không?",
  answer:
    "Có. Toàn bộ file tài liệu định dạng PDF, audio nghe và video bài giảng đều cho phép tải trực tiếp về máy tính hoặc điện thoại để bạn chủ động ôn tập offline mọi lúc mọi nơi mà không cần kết nối mạng internet.",
};

/**
 * Danh sách toàn bộ câu hỏi thường gặp được gộp từ các biến phía trên
 */
export const FAQ_ITEMS: FaqItem[] = [
  FAQ_ITEM_PAYMENT,
  FAQ_ITEM_SUBSCRIPTION,
  FAQ_ITEM_SUPPORT,
  FAQ_ITEM_DOWNLOAD,
];
