import * as React from "react";
import { Container } from "@/components/common";
import { CoreBenefitCard } from "../components/CoreBenefitCard";
import {
  CORE_BENEFITS_DATA,
  type CoreBenefitsSectionData,
} from "../data";

interface CoreBenefitsSectionProps {
  data?: CoreBenefitsSectionData;
  className?: string;
  id?: string;
}

export function CoreBenefitsSection({
  data = CORE_BENEFITS_DATA,
  className,
  id = "chi-tiet-loi-ich",
}: CoreBenefitsSectionProps) {
  return (
    <section id={id} className={`w-full bg-[#FAFBFD] py-14 sm:py-20 ${className || ""}`}>
      <Container>
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="text-xs sm:text-[13px] font-bold uppercase tracking-wider text-primary mb-2.5">
            {data.tagText}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-slate-900 tracking-tight leading-[1.25] mb-3 sm:mb-4">
            {data.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {data.description}
          </p>
        </div>

        {/* 6 Thẻ Lợi Ích Cốt Lõi */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {data.items.map((benefit) => (
            <CoreBenefitCard key={benefit.id} benefit={benefit} />
          ))}
        </div>
      </Container>
    </section>
  );
}
