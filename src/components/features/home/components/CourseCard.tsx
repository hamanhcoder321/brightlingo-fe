import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Course, formatCurrencyVND } from "../data/courses.data";

export interface CourseCardProps {
  course: Course;
  categoryName?: string;
  /** "featured" = thẻ lớn 2 cột trên trang chủ, "default" = thẻ dọc */
  variant?: "default" | "featured";
  className?: string;
}

export function CourseCard({ course, categoryName, variant = "default", className }: CourseCardProps) {
  const href = `/khoa-hoc/${course.slug}`;

  if (variant === "featured") {
    return (
      <article
        className={cn(
          "grid grid-cols-1 overflow-hidden rounded-3xl border border-border bg-[#FBF8F3] lg:grid-cols-2",
          className
        )}
      >
        <Link href={href} className="relative aspect-[4/3] w-full bg-mint lg:aspect-auto lg:min-h-[380px]">
          <Image
            src={course.image}
            alt={course.title}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
          <span className="absolute left-4 top-4 rounded-full bg-price px-3 py-1 text-sm font-semibold text-white">
            Khóa học nổi bật
          </span>
        </Link>

        <div className="flex flex-col p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-2 text-sm">
            {categoryName && (
              <span className="rounded-full bg-mint px-3 py-1 font-semibold text-primary">{categoryName}</span>
            )}
            {course.meta && <span className="text-muted-foreground">{course.meta}</span>}
          </div>
          <h3 className="mt-3 font-heading text-[28px] font-bold leading-tight text-ink">
            <Link href={href} className="hover:text-primary">
              {course.title}
            </Link>
          </h3>
          <p className="mt-3 text-[17px] leading-relaxed text-muted-foreground">{course.description}</p>

          {course.highlights && course.highlights.length > 0 && (
            <ul className="mt-4 space-y-2">
              {course.highlights.map((item) => (
                <li key={item} className="flex items-start gap-2 text-[15px] text-ink">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-6 flex items-baseline gap-3">
            <span className="text-[32px] font-bold leading-none text-price">{formatCurrencyVND(course.price)}</span>
            {course.originalPrice && (
              <span className="text-base text-muted-foreground line-through">
                {formatCurrencyVND(course.originalPrice)}
              </span>
            )}
          </div>

          <Link
            href={href}
            className="mt-5 inline-flex h-14 items-center justify-center gap-2 self-start rounded-lg bg-primary px-7 text-lg font-semibold text-white transition-colors hover:bg-primary/90 max-sm:w-full"
          >
            Xem chi tiết & mua
            <ArrowRight className="size-5" />
          </Link>
        </div>
      </article>
    );
  }

  return (
    <article
      className={cn(
        "group flex flex-col overflow-hidden rounded-2xl border border-border bg-white transition-shadow hover:shadow-lg",
        className
      )}
    >
      <Link href={href} className="relative aspect-[16/10] w-full overflow-hidden bg-mint">
        <Image
          src={course.image}
          alt={course.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {course.meta && (
          <span className="absolute left-3 top-3 rounded-md bg-white/90 px-2 py-0.5 text-xs font-semibold text-ink">
            {course.meta}
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-5">
        {categoryName && <p className="text-sm font-semibold text-primary">{categoryName}</p>}
        <h3 className="mt-1 line-clamp-2 text-xl font-semibold leading-snug text-ink">
          <Link href={href} className="hover:text-primary">
            {course.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-3 text-[15px] leading-relaxed text-muted-foreground">{course.description}</p>

        <div className="mt-auto pt-5">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-price">{formatCurrencyVND(course.price)}</span>
            {course.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {formatCurrencyVND(course.originalPrice)}
              </span>
            )}
          </div>
          <Link
            href={href}
            aria-label={`Xem chi tiết khóa học ${course.title}`}
            className="mt-4 flex h-12 items-center justify-center rounded-lg border-[1.5px] border-primary text-base font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
          >
            Xem chi tiết
          </Link>
        </div>
      </div>
    </article>
  );
}
