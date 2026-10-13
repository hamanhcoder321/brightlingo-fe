import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/common";
import {
  TESTIMONIALS_CTA_DATA,
  type TestimonialsCtaData,
} from "../data";

interface TestimonialsCtaSectionProps {
  data?: TestimonialsCtaData;
  className?: string;
}

export function TestimonialsCtaSection({
  data = TESTIMONIALS_CTA_DATA,
  className,
}: TestimonialsCtaSectionProps) {
  return (
    <section className={`w-full bg-[#FAFBFD] py-14 sm:py-20 ${className || ""}`}>
      <Container>
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[28px] bg-gradient-to-r from-[#1B57DE] via-[#2563EB] to-[#3B82F6] p-8 sm:p-14 lg:p-16 text-center text-white shadow-xl shadow-blue-500/15">
          {/* Tagline phụ viết hoa */}
          <span className="inline-block text-xs sm:text-[13px] font-bold tracking-[0.18em] text-blue-100 uppercase mb-3">
            {data.subTitle}
          </span>

          {/* Tiêu đề chính h2 */}
          <h2 className="mx-auto max-w-2xl text-2xl sm:text-3xl lg:text-[40px] font-extrabold tracking-tight text-white leading-[1.25] mb-4">
            {data.title}
          </h2>

          {/* Mô tả phụ */}
          <p className="mx-auto max-w-xl text-sm sm:text-base text-blue-100/95 leading-relaxed mb-8 sm:mb-10 font-normal">
            {data.description}
          </p>

          {/* 2 Nút CTA */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-4">
            <Link
              href={data.primaryCtaHref}
              className="inline-flex items-center justify-center rounded-full bg-white hover:bg-slate-100 text-primary px-7 sm:px-8 py-3.5 text-sm sm:text-[15px] font-bold shadow-md shadow-blue-900/20 active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>{data.primaryCtaText}</span>
            </Link>

            <Link
              href={data.secondaryCtaHref}
              className="inline-flex items-center justify-center rounded-full border border-white/50 hover:bg-white/10 text-white px-7 sm:px-8 py-3.5 text-sm sm:text-[15px] font-semibold active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>{data.secondaryCtaText}</span>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
