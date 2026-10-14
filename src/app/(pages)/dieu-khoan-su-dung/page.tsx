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
import {
  PolicyHeroSection,
  PolicyContentSection,
} from "@/components/features/policies";

export const metadata: Metadata = {
  title: "Điều khoản sử dụng dịch vụ | BrightLingo",
  description:
    "Quy định quyền sở hữu tài liệu học tập trọn đời, bảo vệ bản quyền tác giả và trách nhiệm của học viên khi tham gia học tập tại BrightLingo.",
};

export default function TermsOfServicePage() {
  return (
    <div className="w-full bg-background">
      {/* Breadcrumb Header */}
      <div className="border-b border-slate-200/60 bg-[#F8FAFC] py-3.5">
        <Container>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Trang chủ</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Điều khoản sử dụng</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Container>
      </div>

      {/* Hero Section */}
      <PolicyHeroSection
        title="Điều Khoản Sử Dụng Dịch Vụ"
        description="Quy định quyền truy cập trọn đời tài liệu học tập, bảo vệ bản quyền tác giả và trách nhiệm của học viên khi tham gia học tập tại BrightLingo."
      />

      {/* Main Content với Sidebar TOC chuyên biệt */}
      <React.Suspense fallback={<div className="min-h-[40vh]" />}>
        <PolicyContentSection forcedTab="terms" />
      </React.Suspense>
    </div>
  );
}
