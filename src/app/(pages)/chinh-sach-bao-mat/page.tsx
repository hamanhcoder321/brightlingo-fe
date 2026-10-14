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
  title: "Chính sách bảo mật thông tin cá nhân | BrightLingo",
  description:
    "Cam kết bảo vệ dữ liệu cá nhân học viên, tuân thủ Nghị định 13/2023/NĐ-CP, tuyệt đối không lưu trữ thông tin thẻ ngân hàng tại BrightLingo.",
};

export default function PrivacyPolicyPage() {
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
                <BreadcrumbPage>Chính sách bảo mật</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Container>
      </div>

      {/* Hero Section */}
      <PolicyHeroSection
        title="Chính Sách Bảo Mật Thông Tin Cá Nhân"
        description="Cam kết bảo vệ dữ liệu cá nhân học viên theo Nghị định 13/2023/NĐ-CP, tuyệt đối không lưu trữ thẻ ngân hàng và không chia sẻ cho bên thứ ba."
      />

      {/* Main Content với Sidebar TOC chuyên biệt */}
      <React.Suspense fallback={<div className="min-h-[40vh]" />}>
        <PolicyContentSection forcedTab="privacy" />
      </React.Suspense>
    </div>
  );
}
