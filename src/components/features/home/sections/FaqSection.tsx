"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { Container } from "@/components/common/Container";
import { cn } from "@/lib/utils";
import { FAQ_ITEMS, type FaqItem } from "../data/faq.data";

const POLICY_LINKS = [
  { label: "Chính sách thanh toán", href: "/chinh-sach-thanh-toan" },
  { label: "Chính sách giao tài liệu số", href: "/giao-tai-lieu-so" },
  { label: "Chính sách bảo mật thông tin", href: "/chinh-sach-bao-mat" },
  { label: "Điều khoản sử dụng", href: "/dieu-khoan-su-dung" },
] as const;

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
  title = "Câu hỏi thường gặp & Chính sách",
  subtitle = "Đọc trước khi mua để yên tâm. Còn thắc mắc? Gửi yêu cầu bên dưới, chúng tôi gọi lại cho bạn.",
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
      className={cn("w-full scroll-mt-20 bg-white py-12 sm:py-16 lg:py-20", className)}
    >
      <Container className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-14">
        {/* Cột trái: tiêu đề + link chính sách */}
        <div>
          <h2 className="text-[28px] font-bold leading-tight text-ink lg:text-[38px]">{title}</h2>
          <p className="mt-3 text-[17px] leading-relaxed text-muted-foreground lg:text-lg">{subtitle}</p>
          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-1 lg:flex-col">
            {POLICY_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex min-h-11 items-center text-base font-medium text-primary underline underline-offset-4 hover:text-primary/80"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Cột phải: accordion */}
        <div className="space-y-3">
          {items.map((item) => {
            const isOpen = openId === item.id;

            return (
              <div
                key={item.id}
                className={cn(
                  "overflow-hidden rounded-xl border border-border transition-colors",
                  isOpen ? "bg-cream" : "bg-[#FBF8F3] hover:border-primary/40"
                )}
              >
                <button
                  type="button"
                  suppressHydrationWarning
                  id={`faq-trigger-${item.id}`}
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${item.id}`}
                  className="flex min-h-14 w-full items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer"
                >
                  <span className="text-base font-semibold text-ink lg:text-[17px]">{item.question}</span>
                  <ChevronDown
                    className={cn(
                      "size-5 shrink-0 text-ink transition-transform duration-300",
                      isOpen && "rotate-180"
                    )}
                  />
                </button>

                <div
                  id={`faq-answer-${item.id}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${item.id}`}
                  className={cn(
                    "grid transition-all duration-300 ease-in-out",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-[15px] leading-relaxed text-muted-foreground lg:text-base">
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
