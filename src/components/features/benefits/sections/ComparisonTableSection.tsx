import * as React from "react";
import { Container } from "@/components/common";
import { ComparisonTable } from "../components/ComparisonTable";
import {
  COMPARISON_TABLE_DATA,
  type ComparisonTableSectionData,
} from "../data";

interface ComparisonTableSectionProps {
  data?: ComparisonTableSectionData;
  className?: string;
  id?: string;
}

export function ComparisonTableSection({
  data = COMPARISON_TABLE_DATA,
  className,
  id = "so-sanh-phuong-phap",
}: ComparisonTableSectionProps) {
  return (
    <section id={id} className={`w-full bg-white py-14 sm:py-20 ${className || ""}`}>
      <Container>
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-10 sm:mb-12">
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

        {/* Bảng So Sánh Chi Tiết */}
        <div className="max-w-5xl mx-auto">
          <ComparisonTable data={data} />
        </div>
      </Container>
    </section>
  );
}
