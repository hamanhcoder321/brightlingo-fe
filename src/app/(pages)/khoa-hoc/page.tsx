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

export const metadata: Metadata = {
  title: "Danh sách Khóa học & Tài liệu số",
  description:
    "Tổng hợp các khóa học tiếng Anh thực chiến, video bài giảng và ebook số trọn đời tại EngNest.",
  alternates: {
    canonical: "/khoa-hoc",
  },
};

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

      {/* Danh sách khóa học */}
      <CoursesSection className="bg-transparent py-8 sm:py-12" />
    </div>
  );
}

