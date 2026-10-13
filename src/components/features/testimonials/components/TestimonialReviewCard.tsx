import * as React from "react";
import { Check, Clock, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TestimonialItem } from "../data";

interface TestimonialReviewCardProps {
  testimonial: TestimonialItem;
  className?: string;
}

export function TestimonialReviewCard({
  testimonial,
  className,
}: TestimonialReviewCardProps) {
  return (
    <div
      className={cn(
        "group flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:border-blue-200/90 hover:shadow-[0_10px_30px_rgba(37,99,235,0.06)] transition-all duration-300",
        className
      )}
    >
      <div>
        {/* Header: Avatar, Tên, Vị trí & Huy hiệu Đã mua */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "flex size-11 shrink-0 items-center justify-center rounded-full font-bold text-sm select-none",
                testimonial.avatarBgColor || "bg-blue-100 text-primary"
              )}
            >
              {testimonial.initials}
            </div>

            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
                {testimonial.name}
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                {testimonial.role}
              </p>
            </div>
          </div>

          {testimonial.isVerifiedBuyer && (
            <span className="inline-flex items-center gap-1 shrink-0 rounded-full bg-emerald-50 border border-emerald-200/70 px-2.5 py-0.5 text-xs font-semibold text-emerald-600">
              <Check className="size-3 stroke-[2.5]" />
              <span>Đã mua</span>
            </span>
          )}
        </div>

        {/* Dòng Đánh giá 5 sao + Tag Khóa học */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: testimonial.rating }).map((_, i) => (
              <Star
                key={i}
                className="size-3.5 fill-amber-400 text-amber-400"
              />
            ))}
          </div>

          <span className="inline-flex items-center rounded-full bg-blue-50/90 px-2.5 py-0.5 text-xs font-semibold text-primary">
            {testimonial.courseTag}
          </span>
        </div>

        {/* Nội dung đánh giá */}
        <p className="text-xs sm:text-[13.5px] text-slate-700 leading-relaxed font-normal mb-6">
          “{testimonial.quote}”
        </p>
      </div>

      {/* Footer: Thời gian học & Ngày đăng */}
      <div className="mt-auto pt-4 border-t border-slate-100/90 flex items-center justify-between text-xs text-slate-500 font-medium">
        <span>{testimonial.studyDuration}</span>
        <span className="inline-flex items-center gap-1 text-slate-400">
          <Clock className="size-3.5" />
          <span>{testimonial.relativeTime}</span>
        </span>
      </div>
    </div>
  );
}
