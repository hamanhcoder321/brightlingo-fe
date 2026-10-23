"use client";

import * as React from "react";
import Image from "next/image";
import { Clock, PlayCircle, Play, Users } from "lucide-react";
import type { CourseDetail } from "../types";

interface CourseHeroSectionProps {
  course: CourseDetail;
  onOpenVideoDemo: () => void;
}

export function CourseHeroSection({ course, onOpenVideoDemo }: CourseHeroSectionProps) {
  const [mainTitle, subtitle] = course.title.split("–").map((part) => part.trim());
  const [imgSrc, setImgSrc] = React.useState(course.image);

  React.useEffect(() => {
    setImgSrc(course.image);
  }, [course.image]);

  return (
    <section>
      {/* Nhãn */}
      <div className="flex flex-wrap items-center gap-2">
        {course.categoryName && (
          <span className="rounded-full bg-mint px-3 py-1 text-sm font-semibold text-primary">
            {course.categoryName}
          </span>
        )}
        {course.typeBadge && (
          <span className="rounded-full bg-[#FCE9D8] px-3 py-1 text-sm font-semibold text-price">
            Học {course.typeBadge.toLowerCase()}
          </span>
        )}
      </div>

      <h1 className="mt-3 text-[34px] font-bold leading-[1.2] text-ink lg:text-[44px] lg:leading-[1.15]">
        {mainTitle}
      </h1>
      {(course.description || subtitle || course.tagBadge) && (
        <p className="mt-3 text-[17px] leading-relaxed text-muted-foreground lg:text-lg">
          {course.description || subtitle || course.tagBadge}
        </p>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[15px] text-muted-foreground">
        {course.curriculum.summary && (
          <span className="flex items-center gap-1.5">
            <PlayCircle className="size-4 text-primary" />
            {course.curriculum.summary.split("•")[1]?.trim() || course.curriculum.summary}
          </span>
        )}
        {course.curriculum.totalDuration && (
          <span className="flex items-center gap-1.5">
            <Clock className="size-4 text-primary" />
            {course.curriculum.totalDuration}
          </span>
        )}
        {course.studentsCount && (
          <span className="flex items-center gap-1.5">
            <Users className="size-4 text-primary" />
            {course.studentsCount}
          </span>
        )}
      </div>

      {/* Ảnh bìa + nút xem video giới thiệu */}
      {(() => {
        const displayVideoTitle = (course.videoDemoTitle || "Xem video demo bài giảng")
          .replace(/\s*\(\s*\d+\s*phút\s*\)/gi, "")
          .trim();
        return (
          <button
            type="button"
            onClick={onOpenVideoDemo}
            className="group relative mt-6 block aspect-video w-full overflow-hidden rounded-3xl bg-mint text-left cursor-pointer"
            aria-label={displayVideoTitle}
          >
            <Image
              src={imgSrc || course.image}
              alt={course.title}
              fill
              unoptimized={
                typeof imgSrc === "string" &&
                (imgSrc.includes("localhost") ||
                  imgSrc.includes("127.0.0.1") ||
                  imgSrc.startsWith("/uploads"))
              }
              onError={() => {
                setImgSrc(
                  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80"
                );
              }}
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
            <span className="absolute inset-0 bg-ink/30" />
            <span className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white">
              <span className="flex size-16 items-center justify-center rounded-full bg-primary shadow-lg transition-transform group-hover:scale-105">
                <Play className="ml-1 size-7 fill-current" />
              </span>
              <span className="text-base font-semibold">{displayVideoTitle}</span>
            </span>
          </button>
        );
      })()}
    </section>
  );
}
