"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { Container } from "@/components/common";
import { CategoryFilterPills } from "../components/CategoryFilterPills";
import { TestimonialReviewCard } from "../components/TestimonialReviewCard";
import {
  TESTIMONIALS_LIST,
  TESTIMONIAL_CATEGORIES,
  type TestimonialItem,
  type CategoryFilterItem,
} from "../data";

interface TestimonialsListSectionProps {
  initialReviews?: TestimonialItem[];
  categories?: CategoryFilterItem[];
  className?: string;
}

export function TestimonialsListSection({
  initialReviews = TESTIMONIALS_LIST,
  categories = TESTIMONIAL_CATEGORIES,
  className,
}: TestimonialsListSectionProps) {
  const [selectedCategory, setSelectedCategory] =
    React.useState<CategoryFilterItem["id"]>("all");
  const [visibleCount, setVisibleCount] = React.useState<number>(6);

  // Lọc đánh giá theo danh mục được chọn
  const filteredReviews = React.useMemo(() => {
    if (selectedCategory === "all") {
      return initialReviews;
    }
    return initialReviews.filter((item) => item.category === selectedCategory);
  }, [initialReviews, selectedCategory]);

  const displayedReviews = filteredReviews.slice(0, visibleCount);
  const hasMore = visibleCount < filteredReviews.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  return (
    <section className={`w-full bg-[#FAFBFD] py-10 sm:py-14 ${className || ""}`}>
      <Container>
        {/* Hàng nút lọc theo danh mục (Filter Pills) */}
        <div className="flex justify-start sm:justify-center mb-8 sm:mb-10">
          <CategoryFilterPills
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={(id) => {
              setSelectedCategory(id);
              setVisibleCount(6); // reset lại số lượng hiển thị khi đổi tab
            }}
          />
        </div>

        {/* Lưới các thẻ đánh giá học viên */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 mb-10 sm:mb-12">
          {displayedReviews.map((testimonial) => (
            <TestimonialReviewCard
              key={testimonial.id}
              testimonial={testimonial}
            />
          ))}
        </div>

        {/* Nút Xem thêm đánh giá khác */}
        <div className="flex justify-center">
          <button suppressHydrationWarning
            type="button"
            onClick={handleLoadMore}
            disabled={!hasMore}
            className={`inline-flex items-center gap-2 rounded-full border border-slate-200/90 bg-white px-7 py-3 text-xs sm:text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 active:scale-95 ${
              hasMore
                ? "hover:bg-slate-50 hover:border-slate-300 cursor-pointer"
                : "opacity-75 cursor-default"
            }`}
          >
            <span>
              {hasMore
                ? "Xem thêm 240+ đánh giá khác"
                : "Đã hiển thị tất cả đánh giá phù hợp"}
            </span>
            {hasMore && <ChevronDown className="size-4 stroke-[2.2]" />}
          </button>
        </div>
      </Container>
    </section>
  );
}
