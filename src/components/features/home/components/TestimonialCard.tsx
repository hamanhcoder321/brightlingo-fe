import Image from "next/image";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Testimonial } from "../data/testimonials.data";

export interface TestimonialCardProps {
  testimonial: Testimonial;
  className?: string;
}

export function TestimonialCard({
  testimonial,
  className,
}: TestimonialCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs transition-all duration-300 hover:border-slate-300 hover:shadow-md sm:p-7",
        className
      )}
    >
      <div>
        {/* Đánh giá số sao (Render động linh hoạt từ API) */}
        <div
          className="flex items-center gap-1"
          aria-label={`Đánh giá ${testimonial.rating} trên 5 sao`}
        >
          {Array.from({ length: 5 }).map((_, index) => {
            const isFilled = index < Math.round(testimonial.rating);
            return (
              <Star
                key={index}
                className={cn(
                  "size-4.5",
                  isFilled
                    ? "fill-amber-400 text-amber-400"
                    : "fill-slate-100 text-slate-300"
                )}
                aria-hidden="true"
              />
            );
          })}
        </div>

        {/* Nội dung nhận xét */}
        <p className="mt-4 text-[13.5px] leading-relaxed text-slate-600 sm:text-[14px]">
          {testimonial.content}
        </p>
      </div>

      {/* Thông tin học viên */}
      <div className="mt-6 flex items-center gap-3.5 border-t border-slate-100 pt-5">
        {testimonial.avatar ? (
          <Image
            src={testimonial.avatar}
            alt={testimonial.name}
            width={40}
            height={40}
            className="size-10 rounded-full object-cover"
          />
        ) : (
          <div
            className={cn(
              "flex size-10 shrink-0 items-center justify-center rounded-full text-xs font-bold tracking-wider",
              testimonial.avatarBgColor || "bg-blue-100 text-blue-700"
            )}
          >
            {testimonial.initials}
          </div>
        )}

        <div className="min-w-0">
          <h4 className="truncate text-[14px] font-bold text-slate-900 leading-tight">
            {testimonial.name}
          </h4>
          <p className="mt-0.5 truncate text-[12px] text-slate-500">
            {testimonial.role}
          </p>
        </div>
      </div>
    </div>
  );
}
