import * as React from "react";
import { cn } from "@/lib/utils";
import type { CategoryFilterItem } from "../data";

interface CategoryFilterPillsProps {
  categories: CategoryFilterItem[];
  selectedCategory: string;
  onSelectCategory: (id: CategoryFilterItem["id"]) => void;
  className?: string;
}

export function CategoryFilterPills({
  categories,
  selectedCategory,
  onSelectCategory,
  className,
}: CategoryFilterPillsProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none",
        className
      )}
    >
      {categories.map((cat) => {
        const isActive = selectedCategory === cat.id;

        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => onSelectCategory(cat.id)}
            className={cn(
              "shrink-0 rounded-full px-4 sm:px-5 py-2 text-xs sm:text-[13.5px] font-semibold transition-all duration-200 cursor-pointer",
              isActive
                ? "bg-primary text-white shadow-sm shadow-blue-500/25 active:scale-95"
                : "bg-white text-slate-700 border border-slate-200/90 hover:bg-slate-50 hover:border-slate-300 active:scale-95"
            )}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}
