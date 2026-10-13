"use client";

import * as React from "react";
import { ChevronDown, Folder, PlayCircle, FileText, Headphones } from "lucide-react";
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
            className="rounded-xl border border-slate-200 overflow-hidden bg-white transition-all"
          >
            {/* Accordion Trigger */}
            <button
              type="button"
              onClick={() => toggleSection(section.id)}
              className={cn(
                "w-full flex items-center justify-between px-4 sm:px-5 py-3.5 text-left transition-colors font-medium text-slate-800",
                isOpen ? "bg-slate-50/80" : "hover:bg-slate-50"
              )}
            >
              <div className="flex items-center gap-3 pr-2">
                <Folder className="size-5 shrink-0 text-primary fill-primary/10" />
                <span className="text-sm sm:text-[15px] font-semibold text-slate-900 leading-snug">
                  {section.title}
                </span>
              </div>
              <ChevronDown
                className={cn(
                  "size-4 shrink-0 text-slate-500 transition-transform duration-200",
                  isOpen && "rotate-180"
                )}
              />
            </button>

            {/* Accordion Content (Lessons list) */}
            {isOpen && (
              <div className="divide-y divide-slate-100 border-t border-slate-100 bg-white">
                {section.lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between px-4 sm:px-6 py-3 hover:bg-slate-50/50 transition-colors gap-2"
                  >
                    <div className="flex items-center gap-3">
                      {lesson.badgeText?.includes("Audio") ? (
                        <Headphones className="size-4 shrink-0 text-primary" />
                      ) : lesson.badgeText?.includes("PDF") ? (
                        <FileText className="size-4 shrink-0 text-primary" />
                      ) : (
                        <PlayCircle className="size-4 shrink-0 text-primary" />
                      )}
                      <span className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
                        {lesson.title}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-500 pl-7 sm:pl-0 shrink-0">
                      {lesson.duration && <span>{lesson.duration}</span>}
                      {lesson.duration && lesson.badgeText && <span>•</span>}
                      {lesson.badgeText && (
                        <span className="text-slate-600 font-medium">
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
