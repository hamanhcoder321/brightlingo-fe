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
    <section className="rounded-2xl border border-border bg-white p-5 sm:p-7">
      {/* Header Curriculum */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <h2 className="text-[28px] font-bold leading-tight text-ink">
            Nội dung khóa học
          </h2>
          {curriculum.summary && (
            <p className="mt-1 text-[15px] text-muted-foreground">
              {curriculum.summary}
            </p>
          )}
        </div>

        {curriculum.totalDuration && (
          <div className="inline-flex items-center gap-1.5 self-start sm:self-auto rounded-lg bg-mint px-3 py-1.5 text-sm font-semibold text-primary">
            <Clock className="size-4" />
            <span>{curriculum.totalDuration}</span>
          </div>
        )}
      </div>

      {/* Accordion chi tiết từng phần bài học */}
      <CurriculumAccordion sections={curriculum.sections} />
    </section>
  );
}
