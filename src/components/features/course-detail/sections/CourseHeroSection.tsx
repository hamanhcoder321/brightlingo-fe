"use client";

import * as React from "react";
import Image from "next/image";
import { Star, Users, RefreshCw, Zap, Play } from "lucide-react";
import { formatCurrencyVND } from "@/components/features/home/data/courses.data";
import type { CourseDetail } from "../types";

interface CourseHeroSectionProps {
  course: CourseDetail;
  onOpenVideoDemo: () => void;
}

export function CourseHeroSection({
  course,
  onOpenVideoDemo,
}: CourseHeroSectionProps) {
  return (
    <section className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-xs">
      {/* Badges trên cùng */}
      <div className="flex flex-wrap items-center gap-2 mb-3 sm:mb-4">
        {course.tagBadge && (
          <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-primary">
            <span className="size-1.5 rounded-full bg-primary mr-1.5" />
            {course.tagBadge}
          </span>
        )}
        {course.typeBadge && (
          <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
            {course.typeBadge}
          </span>
        )}
      </div>

      {/* Tiêu đề chính của khóa học */}
      <h1 className="text-xl sm:text-2xl lg:text-[26px] font-bold text-slate-900 leading-snug tracking-tight">
        {course.title}
      </h1>

      {/* Social Proof & Đánh giá */}
      <div className="flex flex-wrap items-center gap-y-2 gap-x-4 sm:gap-x-5 text-xs sm:text-sm text-slate-500 mt-3 pt-3 border-t border-slate-100">
        <div className="flex items-center gap-1 text-slate-700 font-semibold">
          <Star className="size-4 fill-amber-400 text-amber-400" />
          <span>{course.rating}</span>
          <span className="font-normal text-slate-400">({course.reviewsCount})</span>
        </div>

        <div className="flex items-center gap-1.5">
          <Users className="size-4 text-primary" />
          <span>{course.studentsCount}</span>
        </div>

        <div className="flex items-center gap-1.5">
          <RefreshCw className="size-3.5 text-slate-400" />
          <span>{course.lastUpdated}</span>
        </div>
      </div>

      {/* Giá bán và Ưu đãi */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-slate-50/70 p-3.5 sm:p-4 border border-slate-100">
        <div className="flex items-baseline gap-2.5 sm:gap-3">
          <span className="text-2xl sm:text-3xl font-extrabold text-red-600">
            {formatCurrencyVND(course.price)}
          </span>
          {course.originalPrice && (
            <span className="text-sm sm:text-base text-slate-400 line-through">
              {formatCurrencyVND(course.originalPrice)}
            </span>
          )}
          {course.discountPercent && (
            <span className="rounded bg-red-100/80 px-2 py-0.5 text-xs font-bold text-red-600">
              Giảm {course.discountPercent}%
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 text-xs sm:text-sm font-semibold text-emerald-700">
          <Zap className="size-4 fill-emerald-500 text-emerald-500" />
          <span>Mua một lần, sở hữu vĩnh viễn</span>
        </div>
      </div>

      {/* Banner Ảnh & Nút Xem Demo Video bài giảng */}
      <div className="relative mt-6 aspect-[16/9] sm:aspect-[16/8.5] w-full overflow-hidden rounded-2xl bg-slate-900 border border-slate-200 group">
        <Image
          src={course.image}
          alt={course.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 680px"
          className="object-cover transition-transform duration-500 group-hover:scale-102"
        />

        {/* Lớp phủ gradient nhẹ */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

        {/* Bottom Banner Bar: Nút bấm Xem video demo */}
        <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
          <button
            type="button"
            onClick={onOpenVideoDemo}
            className="w-full flex items-center gap-3 sm:gap-4 rounded-xl bg-black/60 hover:bg-black/80 backdrop-blur-md p-2.5 sm:p-3 text-left transition-all border border-white/20 group/btn cursor-pointer"
          >
            <div className="flex size-10 sm:size-11 shrink-0 items-center justify-center rounded-full bg-white text-primary shadow-md group-hover/btn:scale-105 transition-transform">
              <Play className="size-5 fill-current ml-0.5" />
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-bold text-white leading-snug">
                {course.videoDemoTitle}
              </p>
              <p className="text-[11px] sm:text-xs text-slate-300 truncate">
                {course.videoDemoSubtitle}
              </p>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
