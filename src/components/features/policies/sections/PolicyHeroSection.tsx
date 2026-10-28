"use client";

import * as React from "react";
import { Container } from "@/components/common";
import { Printer } from "lucide-react";

interface PolicyHeroSectionProps {
  title?: string;
  description?: string;
  className?: string;
}

/**
 * Hero header cho trang Chính sách & Điều khoản.
 * Bao gồm: gradient background, tiêu đề, mô tả, nút in.
 */
export function PolicyHeroSection({
  title = "Chính Sách & Điều Khoản Dịch Vụ",
  description = "Tổng hợp các điều khoản sử dụng, chính sách bảo vệ dữ liệu và cam kết pháp lý của BrightLingo đối với học viên và đối tác.",
  className,
}: PolicyHeroSectionProps) {
  return (
    <section
      className={`w-full bg-gradient-to-b from-blue-50/70 via-slate-50/50 to-transparent border-b border-slate-100/60 ${className || ""}`}
      data-purpose="hero-section"
    >
      <Container className="pt-8 sm:pt-10 pb-10 sm:pb-12">
        {/* Title Area */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-3xl">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
              {title}
            </h1>
            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
              {description}
            </p>
          </div>

          {/* Quick Print CTA — desktop only */}
          <div className="hidden lg:flex items-center gap-3">
            <PrintButton />
          </div>
        </div>
      </Container>
    </section>
  );
}

/** Nút in cần "use client" riêng — tách thành component nhỏ */
function PrintButton() {
  return (
    <button suppressHydrationWarning
      type="button"
      className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-sm cursor-pointer"
      onClick={() => {
        if (typeof window !== "undefined") window.print();
      }}
    >
      <Printer className="size-4 text-slate-500" />
      In văn bản pháp lý
    </button>
  );
}
