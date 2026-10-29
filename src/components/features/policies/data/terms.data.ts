/**
 * Dữ liệu tĩnh cho Phần I: Điều Khoản Sử Dụng Dịch Vụ
 * (8 điều khoản)
 */

export interface TermsArticleData {
  /** ID anchor dùng cho scroll-to và sidebar navigation */
  id: string;
  /** Số thứ tự hiển thị (01, 02, ...) */
  number: string;
  /** Tiêu đề Điều khoản */
  title: string;
  /** Nội dung HTML-safe (dùng React nodes trong component) */
  paragraphs: string[];
  /** Danh sách bullet nếu có */
  bullets?: string[];
  /** Đánh dấu nổi bật (border đậm + badge) */
  isHighlighted?: boolean;
  /** Nhãn badge nổi bật */
  highlightBadge?: string;
}

export const TERMS_ARTICLES: TermsArticleData[] = [
  {
    id: "dieu-1",
    number: "01",
    title: "Giới Thiệu & Định Nghĩa",
    paragraphs: [
      "**1.1. EngNest** là nền tảng thương mại điện tử chuyên cung cấp tài liệu số và các gói bài giảng tiếng Anh thực chiến (bao gồm Video, Ebook PDF, Template ghi chép Notion, bảng từ vựng tương tác).",
      "**1.2. Khách hàng/Học viên:** Là bất kỳ cá nhân hoặc tổ chức nào truy cập trang web, tiến hành đặt hàng và sử dụng tài nguyên học tập trên nền tảng của chúng tôi.",
      "**1.3. Khóa học số:** Là các nội dung số hóa gồm link Google Drive độc quyền, tài liệu đi kèm hoặc thư viện lưu trữ trực tuyến được cấp quyền thông qua email sau khi hoàn tất mua hàng.",
    ],
  },
  {
    id: "dieu-2",
    number: "02",
    title: "Mô Hình Mua Hàng Không Cần Đăng Ký",
    isHighlighted: true,
    highlightBadge: "Đặc quyền người dùng",
    paragraphs: [
      "EngNest áp dụng mô hình **Zero-Account** tinh gọn nhằm tối ưu hóa trải nghiệm học viên, loại bỏ hoàn toàn phiền toái ghi nhớ mật khẩu và đăng ký tài khoản rườm rà:",
    ],
    bullets: [
      "**Thu thập thông tin tối thiểu:** Khách hàng chỉ cần nhập chính xác *Họ tên*, *Địa chỉ Email* và *Số điện thoại liên lạc* tại form thanh toán.",
      "**Cơ chế kích hoạt qua Email:** Ngay sau khi hệ thống ghi nhận thanh toán thành công, toàn bộ tài nguyên học tập (link truy cập, mã giải nén nếu có, quyền truy cập Drive) sẽ được phân phối tự động vào Email đã cung cấp qua máy chủ Resend.",
      "**Trách nhiệm bảo mật email:** Khách hàng có trách nhiệm cung cấp chính xác địa chỉ Email và bảo mật hộp thư cá nhân của mình. EngNest không chịu trách nhiệm trong trường hợp khách hàng nhập sai Email hoặc hòm thư bị bên thứ ba chiếm đoạt.",
    ],
  },
  {
    id: "dieu-3",
    number: "03",
    title: "Quyền Sở Hữu Trí Tuệ & Bản Quyền Học Liệu",
    paragraphs: [
      "Toàn bộ bài giảng, tài liệu slide, bài tập trắc nghiệm, audio luyện nghe và cấu trúc Notion là tài sản sở hữu trí tuệ độc quyền của EngNest EdTech, được bảo hộ theo Luật Sở hữu Trí tuệ Việt Nam.",
    ],
  },
  {
    id: "dieu-4",
    number: "04",
    title: "Quy Định Sử Dụng Tài Liệu Học Tập",
    paragraphs: [
      "**4.1. Quyền sử dụng cá nhân trọn đời:** Học viên có quyền truy cập, đọc, in ấn các ấn phẩm số phục vụ nhu cầu trau dồi và học tập cá nhân mà không bị giới hạn thời gian (Lifetime access).",
      "**4.2. Không độc quyền & Không chuyển nhượng:** Mỗi đơn hàng chỉ cấp quyền học cho 01 cá nhân tương ứng với thông tin đã đăng ký. Quyền này không được chuyển giao hay bán lại cho người khác.",
    ],
  },
  {
    id: "dieu-5",
    number: "05",
    title: "Thanh Toán, Đối Soát & Hoàn Tiền",
    paragraphs: [
      "**5.1. Khớp lệnh tự động VietQR:** EngNest tích hợp cổng Napas / VietQR 24/7 với công nghệ đối soát tự động BankNoti. Giao dịch được xác nhận trong vòng 10 - 30 giây kể từ khi chuyển khoản chính xác nội dung đơn hàng.",
      "**5.2. Chính sách hoàn tiền 7 ngày:** Chúng tôi cam kết hoàn tiền 100% trong vòng 7 ngày làm việc nếu:",
    ],
    bullets: [
      "Tài liệu số không thể truy cập do lỗi kỹ thuật từ hệ thống mà đội ngũ kỹ thuật không thể khắc phục sau 24h.",
      "Nội dung tài liệu bị sai lệch nghiêm trọng so với đề cương mô tả trên website.",
    ],
  },
  {
    id: "dieu-6",
    number: "06",
    title: "Quyền & Trách Nhiệm Của EngNest",
    paragraphs: [
      "**6.1. Đảm bảo tính sẵn sàng:** Duy trì chất lượng lưu trữ, đường link tải tốc độ cao, hỗ trợ học viên giải quyết sự cố phát sinh trong quá trình nhận tài liệu số.",
      "**6.2. Cập nhật học liệu:** Định kỳ nâng cấp phiên bản giáo trình, bổ sung bài tập mà không tính thêm phụ phí cho các học viên đã đăng ký khóa học tương ứng.",
    ],
  },
  {
    id: "dieu-7",
    number: "07",
    title: "Giới Hạn Trách Nhiệm Pháp Lý",
    paragraphs: [
      "EngNest không chịu trách nhiệm gián tiếp cho các gián đoạn dịch vụ ngoài tầm kiểm soát, bao gồm nhưng không giới hạn ở: sự cố cáp quang biển quốc tế, chính sách ngừng cung cấp dịch vụ từ phía bên thứ ba (Google Drive, Notion Inc, Cloudflare) hoặc thảm họa thiên nhiên.",
    ],
  },
  {
    id: "dieu-8",
    number: "08",
    title: "Hiệu Lực & Giải Quyết Tranh Chấp",
    paragraphs: [
      "Bản điều khoản này có hiệu lực kể từ ngày công bố chính thức trên website EngNest. Bất kỳ tranh chấp nào phát sinh sẽ được ưu tiên thương lượng giải quyết trên tinh thần thiện chí và bảo vệ quyền lợi chính đáng của học viên. Trường hợp không thể thống nhất, vụ việc sẽ được đưa ra Tòa án có thẩm quyền tại TP. Hà Nội theo quy định pháp luật.",
    ],
  },
];

/** Mục lục sidebar cho Phần A */
export const TERMS_TOC = TERMS_ARTICLES.map((a) => ({
  id: a.id,
  number: parseInt(a.number, 10),
  label: a.title.replace("&", "&"),
}));
