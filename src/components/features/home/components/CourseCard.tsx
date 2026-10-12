import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Course, formatCurrencyVND } from "../data/courses.data";

export interface CourseCardProps {
  course: Course;
  className?: string;
}

export function CourseCard({ course, className }: CourseCardProps) {
  return (
    <div
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl",
        className
      )}
    >
      {/* Thumbnail + Badge */}
      <Link
        href={`/khoa-hoc/${course.slug}`}
        className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100"
      >
        <Image
          src={course.image}
          alt={course.title}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Badge nếu có (Bán chạy / Tài liệu hot) */}
        {course.badge && (
          <span
            className={cn(
              "absolute left-3 top-3 z-10 rounded-full px-2.5 py-0.5 text-[11px] font-bold tracking-wide text-white shadow-sm",
              course.badge.variant === "danger" && "bg-rose-500",
              course.badge.variant === "primary" && "bg-blue-600",
              course.badge.variant === "warning" && "bg-amber-500"
            )}
          >
            {course.badge.text}
          </span>
        )}
      </Link>

      {/* Thông tin khóa học */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <h3 className="line-clamp-2 text-[17px] font-bold leading-snug text-slate-900 transition-colors group-hover:text-primary">
            <Link href={`/khoa-hoc/${course.slug}`}>{course.title}</Link>
          </h3>
          <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-slate-500">
            {course.description}
          </p>
        </div>

        {/* Bottom: Giá tiền + Nút Xem chi tiết */}
        <div className="mt-5 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
          <div className="flex flex-col">
            <span className="text-[20px] font-extrabold tracking-tight text-primary leading-tight">
              {formatCurrencyVND(course.price)}
            </span>
            {course.originalPrice && (
              <span className="mt-0.5 text-xs text-slate-400 line-through">
                {formatCurrencyVND(course.originalPrice)}
              </span>
            )}
          </div>

          <Link
            href={`/khoa-hoc/${course.slug}`}
            className="group/btn inline-flex h-9 shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-primary px-3.5 text-xs font-semibold text-white shadow-xs shadow-blue-500/20 transition-all hover:bg-primary/90 hover:shadow-md active:scale-95"
            aria-label={`Xem chi tiết khóa học ${course.title}`}
          >
            <span>Xem chi tiết</span>
            <ArrowRight className="size-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
