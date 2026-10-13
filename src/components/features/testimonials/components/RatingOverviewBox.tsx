import * as React from "react";
import { Star, ThumbsUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingOverviewBoxProps {
  score: string;
  maxScore?: number;
  verifiedCountText: string;
  improvementPercentage: string;
  improvementText: string;
  className?: string;
}

export function RatingOverviewBox({
  score,
  maxScore = 5,
  verifiedCountText,
  improvementPercentage,
  improvementText,
  className,
}: RatingOverviewBoxProps) {
  return (
    <div
      className={cn(
        "inline-flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 rounded-2xl border border-slate-200/80 bg-white p-5 sm:px-10 sm:py-5 shadow-[0_4px_25px_rgba(0,0,0,0.03)]",
        className
      )}
    >
      {/* Khối Điểm đánh giá sao */}
      <div className="flex items-center gap-4">
        <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {score}
        </span>
        <div className="flex flex-col items-start gap-1">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: maxScore }).map((_, i) => (
              <Star
                key={i}
                className="size-4 fill-amber-400 text-amber-400"
              />
            ))}
          </div>
          <span className="text-xs text-slate-500 font-medium">
            {verifiedCountText}
          </span>
        </div>
      </div>

      {/* Đường phân cách dọc trên desktop */}
      <div className="hidden sm:block h-10 w-px bg-slate-200/90" />
      {/* Đường phân cách ngang trên mobile */}
      <div className="sm:hidden w-full h-px bg-slate-100" />

      {/* Khối Tỷ lệ tiến bộ */}
      <div className="flex items-center gap-4">
        <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 shrink-0">
          <ThumbsUp className="size-5 stroke-[2]" />
        </div>
        <div className="flex flex-col items-start">
          <span className="text-2xl sm:text-[26px] font-extrabold text-slate-900 leading-tight">
            {improvementPercentage}
          </span>
          <span className="text-xs text-slate-500 font-medium">
            {improvementText}
          </span>
        </div>
      </div>
    </div>
  );
}
