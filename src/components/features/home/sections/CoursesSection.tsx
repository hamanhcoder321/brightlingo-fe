"use client";

import * as React from "react";
import { Compass } from "lucide-react";
import { Container } from "@/components/common/Container";
import { cn } from "@/lib/utils";
import { CourseCard } from "../components/CourseCard";
import {
  COURSE_CATEGORIES,
  MOCK_COURSES,
  type Course,
  type CourseCategory,
} from "../data/courses.data";

export interface CoursesSectionProps {
  /**
   * Cho phép truyền data từ Server Component hoặc API khi tích hợp sau này.
   * Nếu không truyền, mặc định sẽ dùng mock data chuẩn theo thiết kế.
   */
  initialCourses?: Course[];
  categories?: CourseCategory[];
  className?: string;
}

export function CoursesSection({
  initialCourses = MOCK_COURSES as Course[],
  categories = COURSE_CATEGORIES as CourseCategory[],
  className,
}: CoursesSectionProps) {
  const [activeCategory, setActiveCategory] = React.useState<string>("all");

  // Logic lọc theo danh mục (Sẵn sàng mở rộng gọi API filter params)
  const filteredCourses = React.useMemo(() => {
    if (activeCategory === "all") {
      return initialCourses;
    }
    return initialCourses.filter(
      (course) => course.categoryId === activeCategory
    );
  }, [activeCategory, initialCourses]);

  return (
    <section
      id="khoa-hoc-noi-bat"
      className={cn("w-full bg-slate-50/60 py-12 sm:py-16 lg:py-20", className)}
    >
      <Container>
        {/* Header Section: Badge, Title, Subtitle & Categories Filter */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/80 px-3.5 py-1 text-xs font-semibold text-primary">
              <Compass className="size-3.5" />
              <span>Khóa học nổi bật & Tài liệu số</span>
            </div>

            {/* Heading */}
            <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-[32px] lg:leading-tight">
              Lựa chọn khóa học phù hợp với mục tiêu của bạn
            </h2>

            {/* Subtitle */}
            <p className="mt-3 text-sm leading-relaxed text-slate-500 sm:text-base">
              Nội dung cô đọng được biên soạn bởi giảng viên giàu kinh nghiệm, kèm
              video trực quan và bộ template ứng dụng thực tế ngay tức thì.
            </p>
          </div>

          {/* Filter Tabs (Categories pills) */}
          <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              const countLabel =
                cat.id === "all" ? ` (${initialCourses.length})` : "";

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    "inline-flex items-center justify-center whitespace-nowrap rounded-full px-4 py-2 text-xs sm:text-[13px] font-medium transition-all cursor-pointer active:scale-95",
                    isActive
                      ? "bg-primary font-semibold text-white shadow-xs shadow-blue-500/20"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900"
                  )}
                >
                  {cat.name}
                  {countLabel}
                </button>
              );
            })}
          </div>
        </div>

        {/* Course Grid: 4 Cards */}
        {filteredCourses.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="mt-12 flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white py-14 text-center">
            <p className="text-sm font-medium text-slate-500">
              Chưa có khóa học nào trong danh mục này.
            </p>
            <button
              type="button"
              onClick={() => setActiveCategory("all")}
              className="mt-3 text-xs font-semibold text-primary hover:underline cursor-pointer"
            >
              Xem tất cả khóa học
            </button>
          </div>
        )}
      </Container>
    </section>
  );
}
