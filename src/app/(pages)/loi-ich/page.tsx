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
  BenefitsHeroSection,
  CoreBenefitsSection,
  ComparisonTableSection,
  BenefitsCtaSection,
} from "@/components/features/benefits";

export const metadata: Metadata = {
  title: "Giá trị & Lợi ích bền vững cho người học | BrightLingo",
  description:
    "Học dễ hơn, tiến bộ nhanh hơn cùng BrightLingo. Loại bỏ hoàn toàn các rào cản học tập truyền thống: không phí duy trì rườm rà, không lịch học gò bó, sở hữu trọn đời.",
};

export default function BenefitsPage() {
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
                <BreadcrumbPage>Lợi ích</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Container>
      </div>

      {/* 1. Hero Section */}
      <BenefitsHeroSection />

      {/* 2. 6 Lợi ích cốt lõi */}
      <CoreBenefitsSection />

      {/* 3. Bảng so sánh BrightLingo vs Phương pháp truyền thống */}
      <ComparisonTableSection />

      {/* 4. Banner CTA Khám phá khóa học */}
      <BenefitsCtaSection />
    </div>
  );
}
