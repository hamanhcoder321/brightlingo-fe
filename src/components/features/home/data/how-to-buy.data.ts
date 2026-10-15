export interface PurchaseStep {
  id: string;
  title: string;
  description: string;
}

/**
 * 3 bước mua khóa học (nội dung cố định theo template, khớp luồng Direct Checkout + VietQR).
 */
export const PURCHASE_STEPS: readonly PurchaseStep[] = [
  {
    id: "step-1",
    title: "Chọn khóa & điền email",
    description: "Bấm “Mua khóa học”, nhập họ tên và email bạn hay dùng.",
  },
  {
    id: "step-2",
    title: "Quét mã QR để chuyển khoản",
    description:
      "Mở app ngân hàng, quét mã – số tiền và nội dung đã điền sẵn. Mã QR có hiệu lực 10 phút.",
  },
  {
    id: "step-3",
    title: "Nhận link học qua email",
    description: "Hệ thống tự xác nhận và gửi link khóa học tới email của bạn trong 1–5 phút.",
  },
] as const;

export const COMMUNITY_PERKS: readonly string[] = [
  "Mẹo học, trò chơi và tài liệu miễn phí",
  "Bạn hỏi – cộng đồng và giảng viên cùng trả lời",
  "Xem video học viên luyện nói mỗi ngày",
] as const;
