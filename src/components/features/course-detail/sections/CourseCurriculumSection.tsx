"use client";

import * as React from "react";
import { Clock } from "lucide-react";
import { CurriculumAccordion } from "../components/CurriculumAccordion";
import type { CourseCurriculum } from "../types";

interface CourseCurriculumSectionProps {
  curriculum: CourseCurriculum;
}

export function CourseCurriculumSection({
  curriculum,
}: CourseCurriculumSectionProps) {
  if (!curriculum || !curriculum.sections || curriculum.sections.length === 0) {
    return null;
  }

  return (
    <section className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-xs">
      {/* Header Curriculum */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">
            Nội dung và tài liệu chi tiết
          </h2>
          {curriculum.summary && (
            <p className="mt-1 text-xs sm:text-sm text-slate-500">
              {curriculum.summary}
            </p>
          )}
        </div>

        {curriculum.totalDuration && (
          <div className="inline-flex items-center gap-1.5 self-start sm:self-auto rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700">
            <Clock className="size-3.5 text-slate-500" />
            <span>{curriculum.totalDuration}</span>
          </div>
        )}
      </div>

      {/* Accordion chi tiết từng phần bài học */}
      <CurriculumAccordion sections={curriculum.sections} />
    </section>
  );
}
