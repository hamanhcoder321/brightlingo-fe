import * as React from "react";
import Link from "next/link";
import { ArrowRight, Flame } from "lucide-react";
import { Container } from "@/components/common";
import {
  BENEFITS_CTA_DATA,
  type BenefitsCtaData,
} from "../data";

interface BenefitsCtaSectionProps {
  data?: BenefitsCtaData;
  className?: string;
}

export function BenefitsCtaSection({
  data = BENEFITS_CTA_DATA,
  className,
}: BenefitsCtaSectionProps) {
  return (
    <section className={`w-full bg-[#FAFBFD] py-14 sm:py-20 ${className || ""}`}>
      <Container>
        <div className="mx-auto max-w-4xl rounded-[28px] border border-slate-200/90 bg-white p-7 sm:p-12 lg:p-14 text-center shadow-[0_4px_30px_rgba(0,0,0,0.03)]">
          {/* Badge Ưu đãi có hạn */}
          <div className="inline-flex items-center gap-1.5 self-center rounded-full bg-rose-50 border border-rose-200/70 px-3.5 py-1 text-xs font-semibold text-rose-600 mb-5 sm:mb-6">
            <Flame className="size-3.5 fill-rose-500 text-rose-500" />
            <span>{data.badgeText}</span>
          </div>

          {/* Tiêu đề CTA */}
          <h2 className="mx-auto max-w-2xl text-2xl sm:text-3xl lg:text-[34px] font-extrabold tracking-tight text-slate-900 leading-[1.25] mb-4">
            {data.title}
          </h2>

          {/* Mô tả phụ */}
          <p className="mx-auto max-w-xl text-sm sm:text-base text-slate-600 leading-relaxed mb-8 sm:mb-9">
            {data.description}
          </p>

          {/* 2 Nút CTA */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-4">
            <Link
              href={data.primaryCta.href}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary hover:bg-primary/95 text-white px-7 sm:px-8 py-3.5 text-sm sm:text-[15px] font-bold shadow-md shadow-blue-500/20 active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>{data.primaryCta.text}</span>
              <ArrowRight className="size-4 stroke-[2.5]" />
            </Link>

            <Link
              href={data.secondaryCta.href}
              className="inline-flex items-center justify-center rounded-full bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 px-7 sm:px-8 py-3.5 text-sm sm:text-[15px] font-semibold transition-all active:scale-[0.98] cursor-pointer"
            >
              <span>{data.secondaryCta.text}</span>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
