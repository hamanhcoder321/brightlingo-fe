"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, Phone, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { IMAGES } from "@/lib/constants/images";
import { SUPPORT_INFO } from "@/lib/constants/site-config";
import type { PublicSiteSettings } from "@/lib/api/site-settings";

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: readonly NavItem[] = [
  { label: "Khóa học", href: "/khoa-hoc" },
  { label: "Cách mua", href: "/#cach-mua" },
  { label: "Hỏi đáp & Chính sách", href: "/#chinh-sach" },
  { label: "Cộng đồng", href: "/#cong-dong" },
  { label: "Liên hệ", href: "/#tu-van" },
] as const;

interface HeaderProps {
  settings?: PublicSiteSettings;
}

export default function Header({ settings }: HeaderProps = {}) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const hotline = settings?.hotline || SUPPORT_INFO.hotline;

  React.useEffect(() => {
    if (pathname === "/" && settings?.meta_title) {
      document.title = settings.meta_title;
      const descMeta = document.querySelector('meta[name="description"]');
      if (descMeta && settings.meta_description) {
        descMeta.setAttribute("content", settings.meta_description);
      }
    }
  }, [pathname, settings?.meta_title, settings?.meta_description]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-6 lg:h-[72px] lg:px-8">
        {/* Logo Lingo */}
        <Link href="/" className="shrink-0" aria-label="Về trang chủ">
          <Image
            src={IMAGES.LOGO}
            alt="EngNest Logo"
            className="h-9 w-auto object-contain lg:h-10"
            priority
          />
        </Link>

        {/* Điều hướng desktop */}
        <nav className="hidden items-center gap-7 text-[15px] font-medium text-ink lg:flex">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === "/khoa-hoc" && pathname?.startsWith("/khoa-hoc");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "transition-colors hover:text-primary",
                  isActive && "font-semibold text-primary",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-2">
          <Link
            href="/#tu-van"
            className="hidden h-11 items-center justify-center gap-2 rounded-lg border-[1.5px] border-primary px-5 text-[15px] font-semibold text-primary transition-colors hover:bg-primary hover:text-white sm:inline-flex"
          >
            Nhận tư vấn
          </Link>

          {/* Mobile: gọi hotline + mở menu */}
          <a
            href={`tel:${hotline.replace(/\s/g, "")}`}
            aria-label="Gọi hotline"
            className="flex size-11 items-center justify-center rounded-lg bg-mint text-primary lg:hidden"
          >
            <Phone className="size-5" />
          </a>
          <button suppressHydrationWarning
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label={isMenuOpen ? "Đóng menu" : "Mở menu"}
            aria-expanded={isMenuOpen}
            className="flex size-11 items-center justify-center rounded-lg border border-border text-ink lg:hidden cursor-pointer"
          >
            {isMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {isMenuOpen && (
        <nav className="border-t border-border bg-white px-4 pb-4 pt-2 lg:hidden">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className="flex min-h-11 items-center border-b border-border/60 text-base font-medium text-ink"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/#tu-van"
            onClick={() => setIsMenuOpen(false)}
            className="mt-4 flex h-12 items-center justify-center rounded-lg bg-primary text-base font-semibold text-white"
          >
            Nhận tư vấn
          </Link>
        </nav>
      )}
    </header>
  );
}
