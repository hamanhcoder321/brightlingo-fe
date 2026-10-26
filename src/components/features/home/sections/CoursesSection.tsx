"use client";

import * as React from "react";
import { Container } from "@/components/common/Container";
import { cn } from "@/lib/utils";
import { courseApi } from "@/lib/api/course";
import { CourseCard } from "../components/CourseCard";
import type { Course, CourseCategory } from "../data/courses.data";

const ALL_CATEGORY: CourseCategory = { id: "all", name: "Tất cả" };

export interface CoursesSectionProps {
  /**
   * Cho phép truyền data từ Server Component hoặc API.
   * Nếu không truyền, component tự tải từ API Backend (không dùng mock).
   */
  initialCourses?: Course[];
  categories?: CourseCategory[];
  className?: string;
}

export function CoursesSection({
  initialCourses,
  categories,
  className,
}: CoursesSectionProps) {
  const [coursesList, setCoursesList] = React.useState<Course[]>(initialCourses ?? []);
  const [catList, setCatList] = React.useState<CourseCategory[]>(categories ?? [ALL_CATEGORY]);
  const [status, setStatus] = React.useState<"loading" | "error" | "ready">(
    initialCourses ? "ready" : "loading"
  );
  const [activeCategory, setActiveCategory] = React.useState<string>("all");

  // Chỉ setState trong callback của promise (không gọi đồng bộ trong effect).
  const fetchCourses = React.useCallback(() => {
    courseApi
      .getAll()
      .then((data) => {
        setCoursesList(data);
        setStatus("ready");
      })
      .catch((error) => {
        console.error("[CoursesSection] Không tải được danh sách khóa học:", error);
        setStatus("error");
      });
  }, []);

  const retryCourses = () => {
    setStatus("loading");
    fetchCourses();
  };

  // Tải dữ liệu thật từ Backend API khi component mount
  React.useEffect(() => {
    if (!initialCourses) fetchCourses();
    if (!categories) {
      courseApi
        .getCategories()
        .then(setCatList)
        .catch((error) => {
          // Lỗi danh mục không chặn danh sách khóa học: chỉ giữ mục "Tất cả".
          console.error("[CoursesSection] Không tải được danh mục:", error);
        });
    }
  }, [initialCourses, categories, fetchCourses]);

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

  return (
    <section id="khoa-hoc-noi-bat" className={cn("w-full scroll-mt-20 bg-white py-12 sm:py-16 lg:py-20", className)}>
      <Container>
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-[28px] font-bold leading-tight text-ink lg:text-[38px]">
              Chọn khóa học phù hợp với bạn
            </h2>
            <p className="mt-2 text-[17px] text-muted-foreground lg:text-lg">
              Mỗi khóa là một bộ video + tài liệu hoàn chỉnh, học theo tốc độ của bạn.
            </p>
          </div>

          {/* Bộ lọc danh mục: cuộn ngang trên mobile */}
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
            {catList.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
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

        {status === "loading" ? (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true" aria-label="Đang tải khóa học">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-80 animate-pulse rounded-2xl bg-cream" />
            ))}
          </div>
        ) : status === "error" ? (
          <div role="alert" className="mt-10 flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-cream py-14 text-center">
            <p className="text-base text-muted-foreground">Không tải được danh sách khóa học. Vui lòng thử lại sau.</p>
            <button
              type="button"
              onClick={retryCourses}
              className="mt-3 min-h-11 text-base font-semibold text-primary hover:underline cursor-pointer"
            >
              Thử lại
            </button>
          </div>
        ) : filteredCourses.length > 0 ? (
          <div className="mt-8 flex flex-col gap-6">
            {featuredCourse && (
              <CourseCard
                course={featuredCourse}
                categoryName={categoryNameById.get(featuredCourse.categoryId)}
                variant="featured"
              />
            )}
            {otherCourses.length > 0 && (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {otherCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    categoryName={categoryNameById.get(course.categoryId)}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="mt-10 flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-cream py-14 text-center">
            <p className="text-base text-muted-foreground">
              {activeCategory === "all" ? "Chưa có khóa học nào." : "Chưa có khóa học nào trong danh mục này."}
            </p>
            {activeCategory !== "all" && (
              <button
                type="button"
                onClick={() => setActiveCategory("all")}
                className="mt-3 min-h-11 text-base font-semibold text-primary hover:underline cursor-pointer"
              >
                Xem tất cả khóa học
              </button>
            )}
          </div>
        )}
      </Container>
    </section>
  );
}
