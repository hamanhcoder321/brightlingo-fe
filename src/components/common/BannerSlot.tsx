import * as React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Container } from "./Container";
import type { BannerItemConfig } from "@/lib/api/site-settings";

interface BannerSlotProps {
  banner?: BannerItemConfig | null;
  className?: string;
  compact?: boolean;
}

export function AnnouncementBarBanner({ banner }: BannerSlotProps) {
  if (!banner || banner.status === "inactive" || !banner.title) {
    return null;
  }

  const linkProps = banner.openInNewTab
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <div className="w-full bg-[#1D2A2E] text-white text-xs sm:text-sm py-2.5 px-4">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center">
        <span className="inline-flex items-center gap-1.5 font-medium text-white/95">
          <Sparkles className="size-3.5 text-[#F6B76B] shrink-0" />
          <span>{banner.title}</span>
        </span>
        {banner.ctaText && banner.ctaLink && (
          <Link
            href={banner.ctaLink}
            {...linkProps}
            className="inline-flex items-center gap-1 font-semibold text-[#8CE0D4] underline-offset-4 hover:underline whitespace-nowrap"
          >
            {banner.ctaText}
            <ArrowRight className="size-3.5" />
          </Link>
        )}
      </div>
    </div>
  );
}

export function HorizontalPromoBanner({
  banner,
  className = "",
  compact = false,
}: BannerSlotProps) {
  if (!banner || banner.status === "inactive") {
    return null;
  }

  const linkProps = banner.openInNewTab
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  const content = (
    <div
      className={`relative overflow-hidden rounded-2xl border border-[#C5DFDC] bg-gradient-to-r from-[#E3F1EF] via-[#F2F9F7] to-[#FCE9D8]/60 p-5 sm:p-7 ${className}`}
    >
      {banner.desktopImage ? (
        <div className="grid grid-cols-1 md:grid-cols-[1.35fr_1fr] items-center gap-5">
          <div>
            <span className="inline-flex rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-primary">
              {banner.badgeText || "Gợi ý đặc biệt"}
            </span>
            <h3 className="mt-2.5 text-xl sm:text-2xl font-bold text-ink leading-snug">
              {banner.title}
            </h3>
            {banner.subtitle && (
              <p className="mt-1.5 text-sm sm:text-base text-muted-foreground">
                {banner.subtitle}
              </p>
            )}
            {banner.ctaText && banner.ctaLink && (
              <Link
                href={banner.ctaLink}
                {...linkProps}
                className="mt-4 inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
              >
                {banner.ctaText}
                <ArrowRight className="size-4" />
              </Link>
            )}
          </div>
          <div className="relative h-40 sm:h-48 w-full overflow-hidden rounded-xl bg-white/60">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={banner.desktopImage}
              alt={banner.altText || banner.title}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="max-w-2xl">
            <span className="inline-flex rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-primary">
              {banner.badgeText || "Khóa học gợi ý"}
            </span>
            <h3 className="mt-2 text-lg sm:text-2xl font-bold text-ink leading-snug">
              {banner.title}
            </h3>
            {banner.subtitle && (
              <p className="mt-1 text-sm sm:text-base text-muted-foreground">
                {banner.subtitle}
              </p>
            )}
          </div>
          {banner.ctaText && banner.ctaLink && (
            <Link
              href={banner.ctaLink}
              {...linkProps}
              className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm sm:text-base font-semibold text-white transition-colors hover:bg-primary/90"
            >
              {banner.ctaText}
              <ArrowRight className="size-4" />
            </Link>
          )}
        </div>
      )}
    </div>
  );

  if (compact) {
    return content;
  }

  return (
    <section className="w-full py-4 sm:py-6">
      <Container>{content}</Container>
    </section>
  );
}
