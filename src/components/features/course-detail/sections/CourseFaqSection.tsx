"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  COURSE_DETAIL_FAQS,
  type CourseFaqItem,
} from "../data/course-detail.data";

interface CourseFaqSectionProps {
  faqs?: readonly CourseFaqItem[];
  className?: string;
}

export function CourseFaqSection({
  faqs = COURSE_DETAIL_FAQS,
  className,
}: CourseFaqSectionProps) {
  // Trạng thái mở/đóng từng câu hỏi, mặc định đóng toàn bộ giống ảnh mẫu
  const [openId, setOpenId] = React.useState<string | null>(null);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      className={cn(
        "rounded-2xl border border-border bg-white p-5 sm:p-7",
        className
      )}
    >
      {/* Tiêu đề section */}
      <h2 className="mb-5 text-[28px] font-bold leading-tight text-ink">Câu hỏi về khóa này</h2>

      {/* Danh sách accordion câu hỏi */}
      <div className="flex flex-col gap-3">
        {faqs.map((item) => {
          const isOpen = openId === item.id;

          return (
            <div
              key={item.id}
              className={cn(
                "overflow-hidden rounded-xl border border-border transition-colors",
                isOpen ? "bg-cream" : "bg-[#FBF8F3] hover:border-primary/40"
              )}
            >
              <button suppressHydrationWarning
                type="button"
                onClick={() => toggleItem(item.id)}
                className="flex min-h-14 w-full items-center justify-between gap-3 px-4 py-3.5 text-left text-base font-semibold text-ink sm:px-5 cursor-pointer select-none transition-colors"
                aria-expanded={isOpen}
              >
                <span className="leading-snug">{item.question}</span>
                <ChevronDown
                  className={cn(
                    "size-5 shrink-0 text-ink transition-transform duration-200",
                    isOpen && "rotate-180"
                  )}
                />
              </button>

              {isOpen && (
                <div className="px-4 pb-4 text-[15px] leading-relaxed text-muted-foreground sm:px-5">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
