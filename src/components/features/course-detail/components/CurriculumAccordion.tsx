"use client";

import * as React from "react";
import { ChevronDown, PlayCircle, FileText, Headphones } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CourseSection } from "../types";

interface CurriculumAccordionProps {
  sections: CourseSection[];
}

export function CurriculumAccordion({ sections }: CurriculumAccordionProps) {
  // Mặc định mở phần 1 như trong ảnh thiết kế
  const [openSections, setOpenSections] = React.useState<Record<string, boolean>>({
    [sections[0]?.id || "section-1"]: true,
  });

  const toggleSection = (id: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="flex flex-col gap-3">
      {sections.map((section, idx) => {
        const isOpen = !!openSections[section.id];

        return (
          <div
            key={section.id || idx}
            className="overflow-hidden rounded-xl border border-border bg-white"
          >
            {/* Accordion Trigger */}
            <button
              type="button"
              onClick={() => toggleSection(section.id)}
              className={cn(
                "flex min-h-14 w-full items-center justify-between px-4 py-3.5 text-left transition-colors sm:px-5 cursor-pointer",
                isOpen ? "bg-cream" : "bg-[#FBF8F3] hover:bg-cream"
              )}
            >
              <div className="flex items-center gap-3 pr-2">
                                <span className="text-base font-semibold leading-snug text-ink">
                  {section.title}
                </span>
              </div>
              <ChevronDown
                className={cn(
                  "size-5 shrink-0 text-ink transition-transform duration-200",
                  isOpen && "rotate-180"
                )}
              />
            </button>

            {/* Accordion Content (Lessons list) */}
            {isOpen && (
              <div className="divide-y divide-border border-t border-border bg-white">
                {section.lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between px-4 sm:px-6 py-3 gap-2"
                  >
                    <div className="flex items-center gap-3">
                      {lesson.badgeText?.includes("Audio") ? (
                        <Headphones className="size-4 shrink-0 text-primary" />
                      ) : lesson.badgeText?.includes("PDF") ? (
                        <FileText className="size-4 shrink-0 text-primary" />
                      ) : (
                        <PlayCircle className="size-4 shrink-0 text-primary" />
                      )}
                      <span className="text-[15px] leading-relaxed text-ink">
                        {lesson.title}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground pl-7 sm:pl-0 shrink-0">
                      {lesson.duration && <span>{lesson.duration}</span>}
                      {lesson.duration && lesson.badgeText && <span>•</span>}
                      {lesson.badgeText && (
                        <span className="font-medium">
                          {lesson.badgeText}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
