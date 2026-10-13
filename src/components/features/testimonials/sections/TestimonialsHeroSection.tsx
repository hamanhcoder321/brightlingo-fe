import * as React from "react";
import { Container } from "@/components/common";
import { RatingOverviewBox } from "../components/RatingOverviewBox";
import {
  TESTIMONIALS_HERO_DATA,
  type TestimonialsHeroData,
} from "../data";

interface TestimonialsHeroSectionProps {
  data?: TestimonialsHeroData;
  className?: string;
}

export function TestimonialsHeroSection({
  data = TESTIMONIALS_HERO_DATA,
  className,
}: TestimonialsHeroSectionProps) {
  return (
    <section className={`w-full bg-white pt-10 sm:pt-14 pb-8 sm:pb-12 ${className || ""}`}>
      <Container>
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          {/* Badge nhỏ trên cùng */}
          <div className="inline-flex items-center rounded-full bg-blue-50 border border-blue-200/70 px-4 py-1 text-xs sm:text-[13px] font-semibold text-primary mb-4 sm:mb-5">
            <span>{data.badgeText}</span>
          </div>

          {/* Tiêu đề chính h1 */}
          <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold tracking-tight text-slate-900 leading-[1.2] mb-3.5 sm:mb-4">
            {data.titlePrefix}
            <span className="text-primary">{data.titleHighlight}</span>
            {data.titleSuffix}
          </h1>

          {/* Mô tả phụ */}
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto mb-8 sm:mb-10">
            {data.description}
          </p>

          {/* Khung Rating Overview (4.9 sao / 98.6% tiến bộ) */}
          <RatingOverviewBox
            score={data.ratingScore}
            maxScore={data.ratingMax}
            verifiedCountText={data.ratingVerifiedCountText}
            improvementPercentage={data.improvementPercentage}
            improvementText={data.improvementText}
          />
        </div>
      </Container>
    </section>
  );
}
