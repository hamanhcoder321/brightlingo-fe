"use client";

import * as React from "react";
import { Container } from "@/components/common";
import { HorizontalPromoBanner } from "@/components/common/BannerSlot";
import { CourseBreadcrumb } from "./components/CourseBreadcrumb";
import { VideoDemoModal } from "./components/VideoDemoModal";
import { CheckoutDialog } from "./components/CheckoutDialog";
import { CourseHeroSection } from "./sections/CourseHeroSection";
import { CourseBenefitsSection } from "./sections/CourseBenefitsSection";
import { CourseCurriculumSection } from "./sections/CourseCurriculumSection";
import { CourseFaqSection } from "./sections/CourseFaqSection";
import { CoursePurchaseSection } from "./sections/CoursePurchaseSection";
import { courseApi } from "@/lib/api/course";
import type { BannerItemConfig } from "@/lib/api/site-settings";
import type { CourseDetail } from "./types";

interface CourseDetailViewProps {
  course: CourseDetail;
  bottomBanner?: BannerItemConfig | null;
}

export function CourseDetailView({
  course,
  bottomBanner,
}: CourseDetailViewProps) {
  const [isVideoModalOpen, setIsVideoModalOpen] = React.useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = React.useState(false);

  React.useEffect(() => {
    if (course?.slug) {
      courseApi.trackView(course.slug);
    }
  }, [course?.slug]);

  return (
    // pb lớn trên mobile để chừa chỗ cho thanh "Mua khóa học" cố định
    <div className="w-full bg-cream pb-32 lg:pb-24">
      <Container>
        <CourseBreadcrumb
          categoryName={course.categoryName}
          courseTitle={course.title.split("–")[0]?.trim() || course.title}
        />

        {/* Layout 2 cột: trái là nội dung, phải là thẻ giá sticky */}
        <div className="mt-2 grid grid-cols-1 items-start gap-6 lg:grid-cols-[1fr_340px] lg:gap-8">
          <div className="flex min-w-0 flex-col gap-6">
            <CourseHeroSection
              course={course}
              onOpenVideoDemo={() => setIsVideoModalOpen(true)}
            />
            <CourseBenefitsSection benefits={course.benefits} />
            <CourseCurriculumSection curriculum={course.curriculum} />
            <CourseFaqSection />
            {bottomBanner && (
              <HorizontalPromoBanner banner={bottomBanner} compact />
            )}
          </div>

          <CoursePurchaseSection
            course={course}
            onBuy={() => setIsCheckoutOpen(true)}
          />
        </div>
      </Container>

      <CheckoutDialog
        course={course}
        open={isCheckoutOpen}
        onOpenChange={setIsCheckoutOpen}
      />

      <VideoDemoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        title={course.videoDemoTitle}
        subtitle={course.videoDemoSubtitle}
        videoUrl={course.videoUrl}
        coverImage={course.image}
      />
    </div>
  );
}
