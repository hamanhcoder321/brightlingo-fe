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
  title: "Chính Sách & Điều Khoản Dịch Vụ",
  description:
    "Tổng hợp các điều khoản sử dụng, chính sách bảo vệ dữ liệu và cam kết pháp lý của BrightLingo đối với học viên và đối tác. Tuân thủ Nghị định 13/2023/NĐ-CP.",
};

export default function PoliciesPage() {
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
                <BreadcrumbPage>Chính sách & Điều khoản</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Container>
      </div>

      {/* Hero Section */}
      <PolicyHeroSection />

      {/* Tab Switcher + Main Content (Sidebar + Articles) */}
      <PolicyContentSection />
    </div>
  );
}
