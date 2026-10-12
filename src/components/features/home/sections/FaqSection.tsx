"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { Container } from "@/components/common/Container";
import { cn } from "@/lib/utils";
import { FAQ_ITEMS, type FaqItem } from "../data/faq.data";

export interface FaqSectionProps {
  id?: string;
  title?: string;
  subtitle?: string;
  items?: FaqItem[];
  defaultOpenId?: string | null;
  className?: string;
}

export function FaqSection({
  id = "chinh-sach",
  title = "Chính sách & Câu hỏi thường gặp",
  subtitle = "Mọi điều bạn cần biết trước khi mua khóa học tại BrightLingo",
  items = FAQ_ITEMS,
  defaultOpenId = "faq-payment",
  className,
}: FaqSectionProps) {
  // Quản lý trạng thái mở/đóng item, mặc định mở item đầu tiên giống ảnh mẫu
  const [openId, setOpenId] = React.useState<string | null>(defaultOpenId);

  const toggleItem = (itemId: string) => {
    setOpenId((prev) => (prev === itemId ? null : itemId));
  };

  return (
    <section
      id={id}
      className={cn(
        "w-full scroll-mt-20 bg-white py-12 sm:py-16 lg:py-20",
        className
      )}
    >
      <Container>
        {/* Header căn giữa */}
        <div className="flex flex-col items-center text-center">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-[34px]">
            {title}
          </h2>
          <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-slate-500 sm:text-base">
            {subtitle}
          </p>
        </div>

        {/* Danh sách Accordion */}
        <div className="mx-auto mt-10 max-w-3xl space-y-4">
          {items.map((item) => {
            const isOpen = openId === item.id;

            return (
              <div
                key={item.id}
                className={cn(
                  "overflow-hidden rounded-2xl border transition-all duration-200",
                  isOpen
                    ? "border-slate-200/90 bg-slate-50/80 shadow-xs"
                    : "border-slate-200/70 bg-slate-50/50 hover:border-slate-300 hover:bg-slate-50/80"
                )}
              >
                {/* Nút bấm tiêu đề mở / đóng */}
                <button
                  type="button"
                  id={`faq-trigger-${item.id}`}
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${item.id}`}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left transition-colors sm:p-6 cursor-pointer"
                >
                  <span className="text-[15px] font-semibold text-slate-900 sm:text-base">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={cn(
                      "size-5 shrink-0 text-slate-700 transition-transform duration-300",
                      isOpen && "rotate-180 text-slate-900"
                    )}
                  />
                </button>

                {/* Nội dung câu trả lời bung ra / thu lại mượt mà */}
                <div
                  id={`faq-answer-${item.id}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${item.id}`}
                  className={cn(
                    "grid transition-all duration-300 ease-in-out",
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 pt-0 text-sm leading-relaxed text-slate-600 sm:px-6 sm:pb-6 sm:text-[14.5px]">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
