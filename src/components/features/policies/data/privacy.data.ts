/**
 * Dữ liệu tĩnh cho Phần II: Chính Sách Bảo Mật Thông Tin
 * (7 điều khoản — Tuân thủ Nghị định 13/2023/NĐ-CP)
 */

export interface PrivacyArticleData {
  /** ID anchor dùng cho scroll-to và sidebar navigation */
  id: string;
  /** Số thứ tự hiển thị (01, 02, ...) */
  number: string;
  /** Tiêu đề mục */
  title: string;
  /** Nội dung chính */
  paragraphs: string[];
  /** Danh sách bullet nếu có */
  bullets?: string[];
  /** Đánh dấu nổi bật (border đậm + badge) */
  isHighlighted?: boolean;
  /** Thông tin bổ sung dạng card grid (dùng cho mục Zero-Account) */
  infoCards?: { label: string; description: string }[];
  /** Thông tin liên hệ DPO (dùng cho mục cuối) */
  contactInfo?: { label: string; value: string }[];
}

export const PRIVACY_ARTICLES: PrivacyArticleData[] = [
  {
    id: "bm-1",
    number: "01",
    title: "Mục Đích Thu Thập Dữ Liệu Cá Nhân",
    paragraphs: [
      "Chúng tôi chỉ thu thập và xử lý dữ liệu cá nhân phục vụ các mục đích rõ ràng, minh bạch:",
    ],
    bullets: [
      "Xác thực thanh toán đơn hàng chuyển khoản qua hệ thống VietQR / Napas 24/7.",
      "Tự động kích hoạt và gửi email chứa đường dẫn truy cập khóa học, Ebook và tài nguyên Notion qua Resend Serverless.",
      "Hỗ trợ giải đáp kỹ thuật, đối soát lỗi đơn hàng hoặc gửi bản cập nhật giáo trình mới.",
      "Thực hiện các nghĩa vụ báo cáo tài chính và hóa đơn điện tử theo quy định pháp luật Việt Nam.",
    ],
  },
  {
    id: "bm-2",
    number: "02",
    title: "Phạm Vi Thông Tin Thu Thập (Zero-Account)",
    isHighlighted: true,
    paragraphs: [
      "Nhằm bảo vệ tối đa tính riêng tư, EngNest không bắt buộc tạo tài khoản mật khẩu, không yêu cầu CCCD hay thông tin nhạy cảm. Hệ thống chỉ lưu trữ 3 trường thông tin cơ bản:",
    ],
    infoCards: [
      {
        label: "1. Họ và tên",
        description:
          "Để cá nhân hóa email bàn giao và cấp chứng nhận học liệu cá nhân.",
      },
      {
        label: "2. Email nhận tài liệu",
        description:
          "Đầu mối tiếp nhận link Drive, tài nguyên số và các bản cập nhật giáo trình.",
      },
      {
        label: "3. Số điện thoại",
        description:
          "Đối soát khẩn cấp khi hệ thống email gặp sự cố chặn spam hoặc lỗi nhập sai hòm thư.",
      },
    ],
  },
  {
    id: "bm-3",
    number: "03",
    title: "Thời Gian Lưu Trữ Dữ Liệu",
    paragraphs: [
      "Thông tin cá nhân của học viên được lưu trữ trong suốt thời gian học viên sử dụng quyền truy cập tài liệu trọn đời trên hệ thống EngNest để phục vụ việc cấp lại link tải khi cần thiết. Học viên có thể yêu cầu xóa dữ liệu hoàn toàn bất cứ lúc nào thông qua gửi yêu cầu tới DPO.",
    ],
  },
  {
    id: "bm-4",
    number: "04",
    title: "Đối Tác Hạ Tầng Lưu Trữ & Chuyển Giao Dữ Liệu",
    paragraphs: [
      "EngNest chỉ chia sẻ dữ liệu mã hóa với các đối tác hạ tầng công nghệ đạt chuẩn bảo mật quốc tế:",
    ],
    bullets: [
      "**Resend Serverless:** Hạ tầng gửi email giao nhận tài liệu tự động đạt tiêu chuẩn SOC-2 và mã hóa TLS 1.3.",
      "**Cloudflare Inc:** Bảo vệ tường lửa mạng (WAF), chống tấn công DDoS và mã hóa đường truyền SSL 256-bit toàn trình.",
      "**Google Workspace & Drive:** Lưu trữ kho học liệu số độc quyền được bảo mật phân quyền theo từng email mua hàng.",
    ],
  },
  {
    id: "bm-5",
    number: "05",
    title: "An Toàn Thanh Toán VietQR & Napas",
    paragraphs: [
      "EngNest không bao giờ thu thập hay lưu trữ số thẻ ngân hàng, mã PIN hoặc mật khẩu OTP của người học. Mọi giao dịch được thực hiện trực tiếp giữa ứng dụng ngân hàng của học viên và cổng thanh toán quốc gia Napas qua mã chuẩn VietQR có gắn mã đơn hàng độc nhất.",
    ],
  },
  {
    id: "bm-6",
    number: "06",
    title: "Quyền Học Viên Theo Nghị Định 13/2023/NĐ-CP",
    paragraphs: [
      "Học viên là chủ thể dữ liệu và được hưởng đầy đủ các quyền lợi pháp lý sau:",
    ],
    bullets: [
      "Quyền được biết mục đích và phạm vi xử lý dữ liệu cá nhân của mình.",
      "Quyền yêu cầu chỉnh sửa thông tin email hoặc số điện thoại khi có thay đổi.",
      "Quyền yêu cầu xóa thông tin lưu trữ trong hệ thống sau khi đã nhận đầy đủ tài nguyên số.",
      "Quyền khiếu nại nếu phát hiện dữ liệu bị sử dụng sai mục đích cam kết.",
    ],
  },
  {
    id: "bm-7",
    number: "07",
    title: "Cam Kết Bảo Mật & Bộ Phận Phụ Trách (DPO)",
    paragraphs: [
      "EngNest cam kết không bán, chia sẻ hoặc thương mại hóa thông tin học viên cho bất kỳ bên tiếp thị quảng cáo nào. Nếu quý học viên có thắc mắc hoặc muốn thực hiện quyền chủ thể dữ liệu, vui lòng liên hệ trực tiếp Bộ phận bảo vệ dữ liệu:",
    ],
    contactInfo: [
      {
        label: "Cán bộ bảo vệ dữ liệu (Data Protection Officer - DPO)",
        value: "Ban Pháp Chế EngNest EdTech",
      },
      {
        label: "Email chuyên trách DPO",
        value: "dpo@engnest.vn",
      },
      {
        label: "Hotline",
        value: "1900 8989",
      },
      {
        label: "Địa chỉ",
        value: "Trụ sở EngNest EdTech, TP. Hà Nội, Việt Nam.",
      },
    ],
  },
];

/** Mục lục sidebar cho Phần B */
export const PRIVACY_TOC = PRIVACY_ARTICLES.map((a) => ({
  id: a.id,
  number: parseInt(a.number, 10),
  label: a.title.replace("&", "&"),
}));
