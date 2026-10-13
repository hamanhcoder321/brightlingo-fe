import * as React from "react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/common";

interface CourseBreadcrumbProps {
  categoryName?: string;
  courseTitle?: string;
}

/**
 * Breadcrumb cho trang chi tiết khóa học, sử dụng Compound Component của Breadcrumb đúng theo chuẩn dự án.
 */
export function CourseBreadcrumb({
  categoryName = "Khóa học",
  courseTitle = "English for Real Life",
}: CourseBreadcrumbProps) {
  return (
    <Breadcrumb className="py-3 sm:py-4">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Trang chủ</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/khoa-hoc">{categoryName}</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="max-w-[260px] sm:max-w-none truncate">{courseTitle}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
