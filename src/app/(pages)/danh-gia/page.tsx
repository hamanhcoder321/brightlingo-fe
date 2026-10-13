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
  TestimonialsHeroSection,
  TestimonialsListSection,
  TestimonialsStatsSection,
  TestimonialsCtaSection,
} from "@/components/features/testimonials";

export const metadata: Metadata = {
  title: "Đánh giá từ hơn 12.000+ Học viên thực tế | BrightLingo",
  description:
    "Khám phá phản hồi thực tế từ hơn 12.000+ học viên đã tự tin làm chủ tiếng Anh cùng BrightLingo: phương pháp tinh gọn, tiết kiệm chi phí, sở hữu trọn đời.",
};

export default function TestimonialsPage() {
  return (
    <div className="w-full bg-white">
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
                <BreadcrumbPage>Đánh giá</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Container>
      </div>

      {/* 1. Hero Section & Rating Overview */}
      <TestimonialsHeroSection />

      {/* 2. Filter Tabs & Review Cards Grid */}
      <TestimonialsListSection />

      {/* 3. 4 Chỉ số thống kê ấn tượng */}
      <TestimonialsStatsSection />

      {/* 4. Banner CTA Blue Gradient */}
      <TestimonialsCtaSection />
    </div>
  );
}
