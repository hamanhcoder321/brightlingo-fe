import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CoreBenefitItem } from "../data";

interface CoreBenefitCardProps {
  benefit: CoreBenefitItem;
  className?: string;
}

export function CoreBenefitCard({
  benefit,
  className,
}: CoreBenefitCardProps) {
  const IconComponent = benefit.icon;

  return (
    <div
      className={cn(
        "group flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:border-blue-300/80 hover:shadow-[0_10px_30px_rgba(37,99,235,0.08)] transition-all duration-300",
        className
      )}
    >
      <div>
        {/* Khung Icon màu xanh nhạt */}
        <div className="flex size-12 items-center justify-center rounded-xl bg-blue-50/90 text-primary mb-5 group-hover:scale-105 transition-transform duration-200">
          <IconComponent className="size-6 stroke-[2]" />
        </div>

        {/* Nhãn tag phân loại */}
        <div className="inline-flex items-center rounded-full bg-slate-100/90 px-3 py-1 text-xs font-semibold text-slate-600 mb-3.5">
          {benefit.badge}
        </div>

        {/* Tiêu đề lợi ích */}
        <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug mb-2.5">
          {benefit.title}
        </h3>

        {/* Đoạn mô tả chi tiết */}
        <p className="text-xs sm:text-[13.5px] text-slate-600 leading-relaxed mb-6">
          {benefit.description}
        </p>
      </div>

      {/* Dòng ghi chú cam kết dưới cùng có icon checkmark */}
      <div className="mt-auto pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs sm:text-[13px] font-semibold text-primary">
        <span>{benefit.footerNote}</span>
        <Check className="size-3.5 stroke-[2.5]" />
      </div>
    </div>
  );
}
