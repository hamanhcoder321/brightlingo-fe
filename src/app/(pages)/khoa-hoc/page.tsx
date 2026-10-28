import * as React from "react";
import type { Metadata } from "next";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Container,
} from "@/components/common";
import { CoursesSection } from "@/components/features/home/sections/CoursesSection";
import { courseApi } from "@/lib/api/course";

export const metadata: Metadata = {
  title: "Khóa học & Tài liệu tiếng Anh thực chiến",
  description:
    "Tổng hợp các khóa học tiếng Anh thực chiến, video bài giảng và ebook số trọn đời tại EngNest.",
};

async function CoursesListContent() {
  const [courses, categories] = await Promise.all([
    courseApi.getAll(),
    courseApi.getCategories(),
  ]);

  return (
    <CoursesSection
      initialCourses={courses}
      categories={categories}
      className="bg-transparent py-4 sm:py-6"
    />
  );
}

export default function CoursesPage() {
  return (
    <div className="w-full bg-[#F8FAFC] pb-16">
      {/* Breadcrumb Header */}
      <div className="border-b border-slate-200/60 bg-white py-3.5">
        <Container>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Trang chủ</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Khóa học</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Container>
      </div>

      <Container className="pt-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          Tất cả Khóa học & Tài liệu số
        </h1>
        <p className="mt-2 text-base text-muted-foreground sm:text-lg">
          Lộ trình tinh gọn, tài liệu thực chiến, tự học mọi lúc mọi nơi cùng EngNest.
        </p>
      </Container>

      {/* Danh sách khóa học bọc trong Suspense chuẩn Next.js 16 cacheComponents */}
      <React.Suspense
        fallback={<CoursesSection className="bg-transparent py-4 sm:py-6" />}
      >
        <CoursesListContent />
      </React.Suspense>
    </div>
  );
}
