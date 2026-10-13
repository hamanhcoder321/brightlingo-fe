"use client";

import * as React from "react";
import { CheckCircle2 } from "lucide-react";
import type { CourseBenefit } from "../types";

interface CourseBenefitsSectionProps {
  benefits: CourseBenefit[];
}

export function CourseBenefitsSection({ benefits }: CourseBenefitsSectionProps) {
  return (
    <section className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-xs">
      {/* Tiêu đề section */}
      <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-slate-100">
        <div className="flex size-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
          <CheckCircle2 className="size-5" />
        </div>
        <h2 className="text-lg sm:text-xl font-bold text-slate-900">
          3 Lợi ích cốt lõi bạn nhận được
        </h2>
      </div>

      {/* Danh sách 3 lợi ích */}
      <div className="flex flex-col gap-3.5 sm:gap-4">
        {benefits.map((benefit, index) => (
          <div
            key={benefit.id || index}
            className="flex items-start gap-3.5 rounded-xl bg-slate-50/70 p-3.5 sm:p-4 border border-slate-100/90 hover:border-emerald-200 hover:bg-emerald-50/20 transition-all"
          >
            <div className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white">
              <CheckCircle2 className="size-4" />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-sm sm:text-[15px] font-bold text-slate-900 leading-snug">
                {benefit.title}
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-slate-600 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
