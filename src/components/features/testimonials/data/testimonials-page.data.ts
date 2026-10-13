export interface TestimonialItem {
  id: string;
  initials: string;
  avatarBgColor?: string;
  name: string;
  role: string;
  isVerifiedBuyer: boolean;
  rating: number;
  courseTag: string;
  quote: string;
  studyDuration: string;
  relativeTime: string;
  category: "all" | "giao-tiep" | "cong-so" | "ban-ron" | "moi-bat-dau";
}

export interface CategoryFilterItem {
  id: "all" | "giao-tiep" | "cong-so" | "ban-ron" | "moi-bat-dau";
  label: string;
}

export interface TestimonialsHeroData {
  badgeText: string;
  titlePrefix: string;
  titleHighlight: string;
  titleSuffix: string;
  description: string;
  ratingScore: string;
  ratingMax: number;
  ratingVerifiedCountText: string;
  improvementPercentage: string;
  improvementText: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface TestimonialsCtaData {
  subTitle: string;
  title: string;
  description: string;
  primaryCtaText: string;
  primaryCtaHref: string;
  secondaryCtaText: string;
  secondaryCtaHref: string;
}

export const TESTIMONIALS_HERO_DATA: TestimonialsHeroData = {
  badgeText: "Xác thực từ hơn 12.000+ học viên Việt Nam",
  titlePrefix: "Hơn ",
  titleHighlight: "12.000+ học viên",
  titleSuffix: " đã tự tin làm chủ tiếng Anh",
  description:
    "Học dễ hiểu, thực tế và ứng dụng trực tiếp cho công việc, giao tiếp hàng ngày. Nhận tài liệu tức thì qua email và sở hữu trọn đời.",
  ratingScore: "4.9",
  ratingMax: 5,
  ratingVerifiedCountText: "Từ 1.250+ học viên xác nhận",
  improvementPercentage: "98.6%",
  improvementText: "Tiến bộ rõ rệt sau 30 ngày",
};

export const TESTIMONIAL_CATEGORIES: CategoryFilterItem[] = [
  { id: "all", label: "Tất cả (1.2k+)" },
  { id: "giao-tiep", label: "Tiếng Anh giao tiếp" },
  { id: "cong-so", label: "Tiếng Anh công sở" },
  { id: "ban-ron", label: "Người đi làm bận rộn" },
  { id: "moi-bat-dau", label: "Người mới bắt đầu" },
];

export const TESTIMONIALS_LIST: TestimonialItem[] = [
  {
    id: "review-1",
    initials: "TH",
    avatarBgColor: "bg-blue-100 text-primary",
    name: "Trần Minh Hoàng",
    role: "Product Manager • Techcombank",
    isVerifiedBuyer: true,
    rating: 5,
    courseTag: "English for Real Life",
    quote:
      "Sau 3 tuần học theo giáo trình, tôi đã có thể tự tin dẫn dắt buổi họp với các đối tác Singapore mà không còn lúng túng tìm từ vựng. Cực kỳ thích tính năng thanh toán VietQR nhận link tải tài liệu và video ngay trong 2 phút!",
    studyDuration: "Học được: 1 tháng",
    relativeTime: "2 ngày trước",
    category: "cong-so",
  },
  {
    id: "review-2",
    initials: "LA",
    avatarBgColor: "bg-purple-100 text-purple-700",
    name: "Nguyễn Lan Anh",
    role: "Chuyên viên HR • FPT Software",
    isVerifiedBuyer: true,
    rating: 5,
    courseTag: "Business English Toolkit",
    quote:
      "Phương pháp chia nhỏ bài học cực kỳ hợp với người đi làm bận rộn như mình. Mỗi ngày chỉ cần 15 phút là nhớ từ rất sâu. Không rườm rà lý thuyết, học xong là dùng được liền khi viết email cho sếp ngoại quốc.",
    studyDuration: "Học được: 45 ngày",
    relativeTime: "4 ngày trước",
    category: "ban-ron",
  },
  {
    id: "review-3",
    initials: "ĐK",
    avatarBgColor: "bg-amber-100 text-amber-800",
    name: "Lê Đăng Khoa",
    role: "Kỹ sư Cầu nối • KMS Technology",
    isVerifiedBuyer: true,
    rating: 5,
    courseTag: "Tự tin giao tiếp phản xạ",
    quote:
      "Mua trọn đời một lần không phát sinh chi phí phụ. File audio phát âm chuẩn bản xứ, có thể nghe lúc lái xe hoặc nấu ăn. Đội ngũ hỗ trợ qua email rất nhiệt tình khi mình cần giải thích thêm cấu trúc ngữ pháp khó.",
    studyDuration: "Học được: 2 tháng",
    relativeTime: "1 tuần trước",
    category: "giao-tiep",
  },
  {
    id: "review-4",
    initials: "MT",
    avatarBgColor: "bg-indigo-100 text-indigo-700",
    name: "Võ Minh Trí",
    role: "Sinh viên năm cuối • ĐH Ngoại Thương",
    isVerifiedBuyer: true,
    rating: 5,
    courseTag: "IELTS Writing Master",
    quote:
      "Các template bài luận được phân tích rất kỹ lưỡng và thực tế. Nhờ vậy mình cải thiện band điểm Writing từ 5.5 lên 7.0 chỉ sau hơn 1 tháng ôn tập chuyên sâu. Mức giá quá hời cho giá trị nhận được.",
    studyDuration: "Học được: 3 tuần",
    relativeTime: "1 tuần trước",
    category: "moi-bat-dau",
  },
  {
    id: "review-5",
    initials: "PL",
    avatarBgColor: "bg-emerald-100 text-emerald-800",
    name: "Phạm Phương Linh",
    role: "Marketing Lead • Tiki",
    isVerifiedBuyer: true,
    rating: 5,
    courseTag: "Ngữ pháp nền tảng ứng dụng",
    quote:
      "Trước đây mình rất ghét ngữ pháp vì khô khan. Nhưng BrightLingo giải thích bằng logic tự nhiên, không bắt học vẹt công thức. Giao diện trang web và tài liệu PDF trình bày vô cùng sạch đẹp, hiện đại.",
    studyDuration: "Học được: 2 tháng",
    relativeTime: "2 tuần trước",
    category: "ban-ron",
  },
  {
    id: "review-6",
    initials: "HN",
    avatarBgColor: "bg-cyan-100 text-cyan-800",
    name: "Hoàng Hải Nam",
    role: "Kiến trúc sư tự do",
    isVerifiedBuyer: true,
    rating: 5,
    courseTag: "English for Real Life",
    quote:
      "Thao tác mua tài liệu diễn ra trong chưa đầy 1 phút. Quét mã QR là xong ngay, không bắt tạo tài khoản rườm rà. Nội dung bài giảng rất trực quan, giúp mình tự tin thuyết trình ý tưởng với khách hàng nước ngoài.",
    studyDuration: "Học được: 1 tháng",
    relativeTime: "3 tuần trước",
    category: "giao-tiep",
  },
  {
    id: "review-7",
    initials: "ĐM",
    avatarBgColor: "bg-rose-100 text-rose-700",
    name: "Đặng Mai Phương",
    role: "Kế toán trưởng • Vingroup",
    isVerifiedBuyer: true,
    rating: 5,
    courseTag: "Business English Toolkit",
    quote:
      "Tài liệu trình bày bằng Notion cực kỳ thông minh và tiện tra cứu số liệu. Mình áp dụng ngay bộ câu đàm phán tài chính cho kỳ kiểm toán vừa rồi rất suôn sẻ.",
    studyDuration: "Học được: 3 tháng",
    relativeTime: "1 tháng trước",
    category: "cong-so",
  },
  {
    id: "review-8",
    initials: "VT",
    avatarBgColor: "bg-orange-100 text-orange-800",
    name: "Vũ Tuấn Anh",
    role: "Senior Developer • Shopee",
    isVerifiedBuyer: true,
    rating: 5,
    courseTag: "English for Real Life",
    quote:
      "Các thuật ngữ và ngữ cảnh giao tiếp kỹ thuật rất sát với môi trường làm việc tech đa quốc gia. Video ngắn gọn, không lan man, tiết kiệm thời gian tối đa.",
    studyDuration: "Học được: 5 tuần",
    relativeTime: "1 tháng trước",
    category: "ban-ron",
  },
];

export const TESTIMONIALS_STATS: StatItem[] = [
  {
    value: "12.000+",
    label: "Học viên tin dùng trên toàn quốc",
  },
  {
    value: "98%",
    label: "Hài lòng về chất lượng tài liệu",
  },
  {
    value: "1 – 5 phút",
    label: "Nhận tài liệu tự động qua email",
  },
  {
    value: "24/7",
    label: "Hỗ trợ giải đáp & học tập tận tâm",
  },
];

export const TESTIMONIALS_CTA_DATA: TestimonialsCtaData = {
  subTitle: "GOOD ENGLISH • A BRIGHTER TOMORROW",
  title: "Bắt đầu hành trình tiến bộ tiếng Anh ngay hôm nay",
  description:
    "Đầu tư cho kỹ năng hôm nay là chìa khóa mở ra sự tự do và cơ hội nghề nghiệp ngày mai.",
  primaryCtaText: "Xem danh sách khóa học",
  primaryCtaHref: "/khoa-hoc",
  secondaryCtaText: "Đăng ký tư vấn miễn phí",
  secondaryCtaHref: "/#tu-van",
};
