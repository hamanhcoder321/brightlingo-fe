export interface ComparisonTableRow {
  criteria: string;
  brightLingo: string;
  competitors: string;
}

export interface ComparisonTableSectionData {
  tagText: string;
  title: string;
  description: string;
  tableHeaders: {
    criteria: string;
    brightLingo: string;
    competitors: string;
  };
  rows: ComparisonTableRow[];
}

export const COMPARISON_TABLE_DATA: ComparisonTableSectionData = {
  tagText: "TÍNH ƯU VIỆT VƯỢT TRỘI",
  title: "EngNest vs Các phương pháp học truyền thống",
  description:
    "So sánh trực quan giúp bạn thấy rõ sự tiện lợi, hiệu quả tài chính và tính ứng dụng thực tế.",
  tableHeaders: {
    criteria: "Tiêu chí so sánh",
    brightLingo: "EngNest",
    competitors: "Trung tâm & app khác",
  },
  rows: [
    {
      criteria: "Mô hình chi phí & thanh toán",
      brightLingo: "1 lần duy nhất, sở hữu trọn đời",
      competitors: "Gia hạn theo tháng hoặc theo khóa đắt đỏ",
    },
    {
      criteria: "Thời gian & tính linh hoạt",
      brightLingo: "Tự do 100%, học bất kỳ lúc nào rảnh",
      competitors: "Cố định giờ học, dễ mất buổi khi bận việc",
    },
    {
      criteria: "Tài liệu & công cụ thực chiến",
      brightLingo: "Template Notion, Mindmap, áp dụng ngay",
      competitors: "Giáo trình lý thuyết dày, nặng ngữ pháp",
    },
    {
      criteria: "Tốc độ nhận tài liệu học tập",
      brightLingo: "Nhận tức thì sau 1 - 5 phút (Tự động)",
      competitors: "Chờ ship sách giấy 3 - 5 ngày hoặc thủ công",
    },
    {
      criteria: "Khả năng truy cập offline",
      brightLingo: "Hỗ trợ tải toàn bộ file về máy",
      competitors: "Phụ thuộc mạng Internet hoặc app đóng kín",
    },
    {
      criteria: "Hỗ trợ người học",
      brightLingo: "Giáo viên giải đáp Zalo/Email 24/7",
      competitors: "Chỉ hỏi được trong giờ học hoặc chatbot",
    },
  ],
};
