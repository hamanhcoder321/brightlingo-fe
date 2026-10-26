import * as React from "react";
import Link from "next/link";
import { BadgeCheck, CheckCircle2, ChevronDown } from "lucide-react";
import { Container } from "@/components/common";
import { MethodComparisonCard } from "../components/MethodComparisonCard";
import { BENEFITS_HERO_DATA, type BenefitsHeroData } from "../data";

interface BenefitsHeroSectionProps {
  data?: BenefitsHeroData;
  className?: string;
}

export function BenefitsHeroSection({
  data = BENEFITS_HERO_DATA,
  className,
}: BenefitsHeroSectionProps) {
  return (
    <section className={`w-full bg-white ${className || ""}`}>
      <Container className="py-10 sm:py-14 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Cột trái (7/12 cột): Badge, Tiêu đề, Mô tả, 3 Điểm nổi bật & Nút CTA */}
          <div className="lg:col-span-7 flex flex-col">
            {/* Badge trên cùng */}
            <div className="inline-flex items-center gap-1.5 self-start rounded-full bg-blue-50/90 border border-blue-200/60 px-3.5 py-1 text-xs sm:text-[13px] font-semibold text-primary mb-4 sm:mb-5">
              <BadgeCheck className="size-4 fill-primary text-white" />
              <span>{data.badgeText}</span>
            </div>

            {/* Tiêu đề chính h1 */}
            <h1 className="text-3xl sm:text-4xl lg:text-[45px] font-extrabold tracking-tight text-slate-900 leading-[1.2] mb-4 sm:mb-5">
              {data.titlePrefix}{" "}
              <span className="text-primary block sm:inline">
                {data.titleHighlight}
              </span>
            </h1>

            {/* Mô tả giải pháp */}
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl mb-6 sm:mb-7">
              {data.description}
            </p>

            {/* 3 Cam kết / Lợi ích nổi bật có tick icon */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2.5 text-xs sm:text-[13px] font-semibold text-slate-800 mb-8 sm:mb-9">
              {data.highlights.map((item) => (
                <div key={item.id} className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="size-4 text-primary fill-primary/10 shrink-0" />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>

            {/* 2 Nút CTA */}
            <div className="flex flex-wrap items-center gap-3.5 sm:gap-4">
              <Link
                href="#chi-tiet-loi-ich"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary hover:bg-primary/95 text-white px-6 sm:px-7 py-3 sm:py-3.5 text-sm sm:text-[15px] font-bold shadow-md shadow-blue-500/20 active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>{data.primaryCtaText}</span>
                <ChevronDown className="size-4 stroke-[2.5]" />
              </Link>

              <Link
                href="#so-sanh-phuong-phap"
                className="inline-flex items-center justify-center rounded-full bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 px-6 sm:px-7 py-3 sm:py-3.5 text-sm sm:text-[15px] font-semibold transition-all active:scale-[0.98] cursor-pointer"
              >
                <span>{data.secondaryCtaText}</span>
              </Link>
            </div>
          </div>

          {/* Cột phải (5/12 cột): Thẻ Phương pháp EngNest & So sánh */}
          <div className="lg:col-span-5 w-full">
            <MethodComparisonCard cardData={data.comparisonCard} />
          </div>
        </div>
      </Container>
    </section>
  );
}
