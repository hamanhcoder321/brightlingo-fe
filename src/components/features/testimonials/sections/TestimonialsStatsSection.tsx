import * as React from "react";
import { Container } from "@/components/common";
import {
  TESTIMONIALS_STATS,
  type StatItem,
} from "../data";

interface TestimonialsStatsSectionProps {
  stats?: StatItem[];
  className?: string;
}

export function TestimonialsStatsSection({
  stats = TESTIMONIALS_STATS,
  className,
}: TestimonialsStatsSectionProps) {
  return (
    <section className={`w-full bg-white py-14 sm:py-20 border-t border-slate-100 ${className || ""}`}>
      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 text-center">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <span className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-primary tracking-tight leading-none mb-2.5">
                {stat.value}
              </span>
              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed max-w-[200px]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
