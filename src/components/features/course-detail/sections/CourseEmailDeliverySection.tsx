import * as React from "react";
import { Mail, Video, BookOpen, Sparkles, MessageCircleCheck } from "lucide-react";

export function CourseEmailDeliverySection() {
  const items = [
    {
      icon: Video,
      title: "Link truy cập video bài giảng trọn đời",
      desc: "Xem ngay lập tức trên máy tính, điện thoại, máy tính bảng mà không bị giới hạn thời gian hay số lần truy cập.",
    },
    {
      icon: BookOpen,
      title: "Trọn bộ Ebook & Tài liệu PDF chất lượng cao",
      desc: "Tài liệu học tập được thiết kế khoa học, có thể tải về lưu trữ cá nhân hoặc in ra giấy để tiện ôn luyện.",
    },
    {
      icon: Sparkles,
      title: "File thực hành, Template & Bộ câu hỏi mẫu",
      desc: "Bài tập đi kèm đáp án phân tích chi tiết giúp người học chủ động luyện tập và theo dõi tiến độ.",
    },
    {
      icon: MessageCircleCheck,
      title: "Link tham gia cộng đồng học viên độc quyền",
      desc: "Tham gia nhóm trao đổi, giải đáp thắc mắc và nhận cập nhật tài liệu bổ sung hoàn toàn miễn phí trọn đời.",
    },
  ];

  return (
    <section className="rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50/60 to-white p-6 sm:p-8">
      <div className="flex items-center gap-3">
        <div className="flex size-11 items-center justify-center rounded-2xl bg-primary text-white shadow-md">
          <Mail className="size-5" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-ink sm:text-2xl">
            Bạn nhận được gì qua email ngay sau khi mua?
          </h3>
          <p className="text-sm text-muted-foreground">
            Hệ thống tự động kích hoạt và gửi thông tin qua email trong vòng 1–3 phút sau thanh toán.
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {items.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="flex items-start gap-3.5 rounded-2xl border border-slate-100 bg-white p-4 shadow-xs"
            >
              <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-xl bg-mint text-primary">
                <Icon className="size-4" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-ink">{item.title}</h4>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
