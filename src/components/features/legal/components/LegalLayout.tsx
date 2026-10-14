import * as React from "react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Container,
} from "@/components/common";
import { LegalSupportBox } from "./LegalSupportBox";

interface LegalLayoutProps {
  title: string;
  badge?: string;
  lastUpdated?: string;
  children: React.ReactNode;
}

export function LegalLayout({
  title,
  badge = "CHÍNH SÁCH & QUY ĐỊNH PHÁP LÝ",
  lastUpdated = "08/10/2026",
  children,
}: LegalLayoutProps) {
  return (
    <div className="w-full bg-white pb-20">
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
                <BreadcrumbPage>{title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Container>
      </div>

      {/* Main Content Area */}
      <Container>
        <div className="mx-auto max-w-4xl pt-10 sm:pt-14">
          {/* Header */}
          <div className="border-b border-slate-200 pb-8 mb-8 sm:mb-10">
            <span className="inline-block text-xs font-bold tracking-wider uppercase text-primary mb-3">
              {badge}
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-3">
              {title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Phiên bản: <strong className="font-semibold text-slate-700">MVP 1.0</strong> • Cập nhật lần cuối:{" "}
              <strong className="font-semibold text-slate-700">{lastUpdated}</strong>
            </p>
          </div>

          {/* Body Content */}
          <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-sm sm:text-[15px] space-y-8">
            {children}
          </div>

          {/* Support Box */}
          <LegalSupportBox />
        </div>
      </Container>
    </div>
  );
}
