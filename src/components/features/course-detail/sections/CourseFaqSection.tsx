"use client";

import * as React from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
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
        "rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-xs",
        className
      )}
    >
      {/* Tiêu đề section */}
      <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-slate-100">
        <div className="flex size-7 items-center justify-center rounded-full bg-amber-100 text-amber-600">
          <HelpCircle className="size-4 stroke-[2.5]" />
        </div>
        <h2 className="text-lg sm:text-xl font-bold text-slate-900">
          Câu hỏi thường gặp (FAQ)
        </h2>
      </div>

      {/* Danh sách accordion câu hỏi */}
      <div className="flex flex-col gap-3">
        {faqs.map((item) => {
          const isOpen = openId === item.id;

          return (
            <div
              key={item.id}
              className={cn(
                "rounded-2xl border border-slate-200/80 bg-white overflow-hidden transition-all duration-200",
                isOpen ? "border-amber-200/90 shadow-xs" : "hover:border-slate-300"
              )}
            >
              <button
                type="button"
                onClick={() => toggleItem(item.id)}
                className="w-full flex items-center justify-between gap-3 px-4 sm:px-5 py-3.5 sm:py-4 text-left font-semibold text-slate-900 text-sm sm:text-[15px] cursor-pointer select-none transition-colors"
                aria-expanded={isOpen}
              >
                <span className="leading-snug">{item.question}</span>
                <ChevronDown
                  className={cn(
                    "size-4 shrink-0 text-slate-400 transition-transform duration-200",
                    isOpen && "rotate-180 text-amber-600"
                  )}
                />
              </button>

              {isOpen && (
                <div className="px-4 sm:px-5 pb-4 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
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
