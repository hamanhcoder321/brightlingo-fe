"use client";

import * as React from "react";
import { CheckCircle2 } from "lucide-react";
import type { CourseBenefit } from "../types";

interface CourseBenefitsSectionProps {
  benefits: CourseBenefit[];
}

export function CourseBenefitsSection({ benefits }: CourseBenefitsSectionProps) {
  return (
    <section className="rounded-2xl border border-border bg-white p-5 sm:p-7">
      {/* Tiêu đề section */}
      <h2 className="mb-5 text-[28px] font-bold leading-tight text-ink">Sau khóa học, bạn sẽ</h2>

      {/* Danh sách 3 lợi ích */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {benefits.map((benefit, index) => (
          <div
            key={benefit.id || index}
            className="flex items-start gap-3 rounded-xl bg-cream p-4"
          >
            <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />

            <div className="flex-1 min-w-0">
              <h3 className="text-base font-semibold leading-snug text-ink">
                {benefit.title}
              </h3>
              <p className="mt-1 text-[15px] leading-relaxed text-muted-foreground">
                {benefit.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
