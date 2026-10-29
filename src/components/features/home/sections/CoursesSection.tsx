"use client";

import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/common/Container";
import { cn } from "@/lib/utils";
import { courseApi } from "@/lib/api/course";
import { CourseCard } from "../components/CourseCard";
import {
  COURSE_CATEGORIES,
  MOCK_COURSES,
  type Course,
  type CourseCategory,
} from "../data/courses.data";

export interface CoursesSectionProps {
  /**
   * Cho phép truyền data từ Server Component hoặc API.
   * Nếu không truyền, mặc định sẽ dùng mock data chuẩn và tự động revalidate từ API Backend.
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
  const [coursesList, setCoursesList] = React.useState<Course[]>(initialCourses);
  const [catList, setCatList] = React.useState<CourseCategory[]>(categories);
  const [activeCategory, setActiveCategory] = React.useState<string>("all");

  // Tự động đồng bộ với Backend API khi component mount nếu chưa có data từ SSR
  React.useEffect(() => {
    // Luôn fetch dữ liệu mới nhất trực tiếp từ Backend API (SWR)
    // để cập nhật tức thì khóa học nổi bật ngay khi đổi trên CMS
    courseApi.getAll(undefined, { cached: false }).then((data) => {
      if (data && data.length > 0) {
        setCoursesList(data);
      }
    });
    courseApi.getCategories({ cached: false }).then((cats) => {
      if (cats && cats.length > 0) {
        setCatList(cats);
      }
    });
  }, []);

  const categoryNameById = React.useMemo(
    () => new Map(catList.map((cat) => [cat.id, cat.name])),
    [catList]
  );

  // Logic lọc theo danh mục
  const filteredCourses = React.useMemo(() => {
    if (activeCategory === "all") {
      return coursesList;
    }
    return coursesList.filter((course) => course.categoryId === activeCategory);
  }, [activeCategory, coursesList]);

  // Khóa nổi bật chỉ hiển thị lớn khi xem "Tất cả"
  const featuredCourse =
    activeCategory === "all" ? filteredCourses.find((course) => course.isFeatured) : undefined;
  const otherCourses = featuredCourse
    ? filteredCourses.filter((course) => course.id !== featuredCourse.id)
    : filteredCourses;
  // Giới hạn trang chủ hiển thị tối đa 6 khóa học tiêu biểu theo tiêu chuẩn M10
  const displayOtherCourses = otherCourses.slice(0, 6);
  const hasMoreCourses = otherCourses.length > 6 || coursesList.length > 6;

  return (
    <section id="khoa-hoc-noi-bat" className={cn("w-full scroll-mt-20 bg-white py-12 sm:py-16 lg:py-20", className)}>
      <Container>
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-[28px] font-bold leading-tight text-ink lg:text-[38px]">
              Chọn khóa học phù hợp với bạn
            </h2>
            <p className="mt-2 text-[17px] text-muted-foreground lg:text-lg">
              Khóa học dạng video, tài liệu hoàn chỉnh, học theo tốc độ của bạn.
            </p>
          </div>

          {/* Bộ lọc danh mục: cuộn ngang trên mobile */}
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
            {catList.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button suppressHydrationWarning
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  aria-pressed={isActive}
                  className={cn(
                    "inline-flex h-11 shrink-0 items-center whitespace-nowrap rounded-full border px-4 text-[15px] font-medium transition-colors cursor-pointer",
                    isActive
                      ? "border-primary bg-primary text-white"
                      : "border-border bg-white text-ink hover:border-primary hover:text-primary"
                  )}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>

        {filteredCourses.length > 0 ? (
          <div className="mt-8 flex flex-col gap-6">
            {featuredCourse && (
              <CourseCard
                course={featuredCourse}
                categoryName={categoryNameById.get(featuredCourse.categoryId)}
                variant="featured"
              />
            )}
            {displayOtherCourses.length > 0 && (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {displayOtherCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    categoryName={categoryNameById.get(course.categoryId)}
                  />
                ))}
              </div>
            )}
            {hasMoreCourses && (
              <div className="mt-4 flex justify-center">
                <Link
                  href="/khoa-hoc"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-8 text-[15px] font-semibold text-white shadow-sm transition-colors hover:bg-primary/90 cursor-pointer"
                >
                  Xem tất cả {coursesList.length} khóa học →
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className="mt-10 flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-cream py-14 text-center">
            <p className="text-base text-muted-foreground">Chưa có khóa học nào trong danh mục này.</p>
            <button suppressHydrationWarning
              type="button"
              onClick={() => setActiveCategory("all")}
              className="mt-3 min-h-11 text-base font-semibold text-primary hover:underline cursor-pointer"
            >
              Xem tất cả khóa học
            </button>
          </div>
        )}
      </Container>
    </section>
  );
}
