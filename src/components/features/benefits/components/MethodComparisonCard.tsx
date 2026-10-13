import * as React from "react";
import { GraduationCap, Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BenefitsHeroData } from "../data";

interface MethodComparisonCardProps {
  cardData: BenefitsHeroData["comparisonCard"];
  className?: string;
}

export function MethodComparisonCard({
  cardData,
  className,
}: MethodComparisonCardProps) {
  return (
    <div
      className={cn(
        "rounded-[24px] border border-slate-200/90 bg-white p-6 sm:p-7 shadow-[0_10px_35px_rgba(0,0,0,0.05)] transition-all",
        className
      )}
    >
      {/* Header Thẻ: Icon Mũ Tốt Nghiệp + Tên Phương Pháp + Rating */}
      <div className="flex items-center justify-between gap-3 pb-5 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-blue-50 text-primary">
            <GraduationCap className="size-6" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
              {cardData.title}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {cardData.subtitle}
            </p>
          </div>
        </div>

        <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700 shrink-0">
          {cardData.rating}
        </span>
      </div>

      {/* 3 Khối so sánh phương pháp */}
      <div className="flex flex-col gap-2.5 my-5">
        {cardData.rows.map((row, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-xl bg-slate-50/80 px-4 py-3 sm:py-3.5 border border-slate-100/90 text-xs sm:text-[13px]"
          >
            <span className="text-slate-600 font-medium">{row.label}</span>
            <span
              className={cn(
                "font-bold text-slate-900",
                row.highlight && "text-primary"
              )}
            >
              {row.value}
            </span>
          </div>
        ))}
      </div>

      {/* Hộp Trích dẫn (Quote box) */}
      <div className="flex items-start gap-3 rounded-2xl bg-[#F0F6FF]/90 border border-blue-100/70 p-4 text-xs sm:text-[13px]">
        <Quote className="size-4 shrink-0 text-primary fill-primary/10 mt-0.5 rotate-180" />
        <p className="text-slate-700 italic font-medium leading-relaxed">
          {cardData.quote}
        </p>
      </div>
    </div>
  );
}
