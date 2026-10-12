import * as React from "react";
import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/common/Container";
import { cn } from "@/lib/utils";
import {
  ConsultationForm,
  type ConsultationFormProps,
} from "@/components/features/auth";

export interface ConsultationSectionProps {
  id?: string;
  className?: string;
  title?: string;
  description?: string;
  benefitText?: string;
  formProps?: ConsultationFormProps;
}

export function ConsultationSection({
  id = "tu-van",
  className,
  title = "Nhận tư vấn lộ trình học phù hợp",
  description = "Đội ngũ chuyên môn sẽ liên hệ hỗ trợ bạn chọn tài liệu hoặc khóa học tối ưu nhất cho mục tiêu cá nhân trong 30 phút.",
  benefitText = "Tư vấn hoàn toàn miễn phí & tận tình",
  formProps,
}: ConsultationSectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "w-full scroll-mt-20 bg-transparent py-10 sm:py-14 lg:py-16",
        className
      )}
    >
      <Container>
        <div className="relative overflow-hidden rounded-[28px] bg-primary p-7 sm:rounded-[36px] sm:p-11 lg:p-14 text-white shadow-2xl shadow-blue-600/20">
          {/* Subtle background glow */}
          <div className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 size-72 rounded-full bg-blue-700/40 blur-2xl" />

          <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
            {/* Cột trái: Tiêu đề + mô tả + cam kết */}
            <div className="flex flex-col">
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-[42px] lg:leading-[1.18]">
                {title}
              </h2>

              <p className="mt-5 max-w-lg text-sm leading-relaxed text-blue-100/90 sm:text-base">
                {description}
              </p>

              <div className="mt-8 flex items-center gap-2.5 text-xs font-medium text-white/95 sm:text-sm">
                <CheckCircle2 className="size-5 shrink-0 text-white" />
                <span>{benefitText}</span>
              </div>
            </div>

            {/* Cột phải: Khối form đăng ký tư vấn */}
            <div className="w-full rounded-2xl bg-white p-6 text-slate-800 shadow-xl shadow-black/10 sm:rounded-3xl sm:p-8 md:p-9">
              <ConsultationForm {...formProps} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
