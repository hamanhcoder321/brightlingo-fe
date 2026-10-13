"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Headphones } from "lucide-react";
import { cn } from "@/lib/utils";
import { IMAGES } from "@/lib/constants/images";

export default function Header() {
  const pathname = usePathname();
  const isCoursesActive = pathname?.startsWith("/khoa-hoc");
  const isBenefitsActive = pathname?.startsWith("/loi-ich");

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-[0px_2px_10px_rgba(0,0,0,0.05)]">
      <div className="mx-auto flex h-20 w-full max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Logo */}
        <div className="flex-shrink-0">
          <Link href="/">
            <Image
              src={IMAGES.LOGO}
              alt="BrightLingo Logo"
              className="h-10 w-auto object-contain"
              priority
            />
          </Link>
        </div>

        {/* Center: Navigation */}
        <nav className="hidden lg:flex items-center gap-8 text-[15px] font-medium text-foreground">
          <Link
            href="/khoa-hoc"
            className={cn(
              "transition-colors",
              isCoursesActive
                ? "relative text-primary font-bold after:absolute after:-bottom-7 after:left-0 after:h-[3px] after:w-full after:bg-primary after:content-['']"
                : "hover:text-primary"
            )}
          >
            Khóa học
          </Link>
          <Link
            href="/loi-ich"
            className={cn(
              "transition-colors",
              isBenefitsActive
                ? "relative text-primary font-bold after:absolute after:-bottom-7 after:left-0 after:h-[3px] after:w-full after:bg-primary after:content-['']"
                : "hover:text-primary"
            )}
          >
            Lợi ích
          </Link>
          <Link
            href="/#danh-gia"
            className="hover:text-primary transition-colors"
          >
            Đánh giá
          </Link>
          <Link
            href="/#chinh-sach"
            className="hover:text-primary transition-colors"
          >
            Chính sách
          </Link>
          <Link
            href="/#hoc-thu"
            className="rounded-full bg-[#FFEBD6] px-3 py-1 text-xs font-semibold text-[#F59E0B] hover:bg-[#FFDDAA] transition-colors"
          >
            Học thử 0đ
          </Link>
        </nav>

        {/* Right: Actions (Theo chuẩn BA: Hotline Hỗ trợ + Nút Đăng ký tư vấn) */}
        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            href="/#tu-van"
            aria-label="Hỗ trợ & Tư vấn"
            className="flex items-center justify-center size-10 rounded-full text-muted-foreground hover:bg-slate-100 hover:text-primary transition-colors cursor-pointer"
            title="Hỗ trợ & Tư vấn 24/7"
          >
            <Headphones className="size-5 stroke-[1.7]" />
          </Link>

          <Link
            href="/#tu-van"
            className="flex h-10 sm:h-11 items-center justify-center rounded-full bg-primary px-5 sm:px-6 text-[14px] sm:text-[15px] font-semibold text-white shadow-sm shadow-blue-500/20 transition-all hover:bg-primary/90 hover:shadow-md active:scale-[0.98]"
          >
            Đăng ký tư vấn
          </Link>
        </div>
      </div>
    </header>
  );
}
