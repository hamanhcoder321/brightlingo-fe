"use client";

import * as React from "react";
import { Container } from "@/components/common";
import { CourseBreadcrumb } from "./components/CourseBreadcrumb";
import { VideoDemoModal } from "./components/VideoDemoModal";
import { CourseHeroSection } from "./sections/CourseHeroSection";
import { CourseBenefitsSection } from "./sections/CourseBenefitsSection";
import { CourseCurriculumSection } from "./sections/CourseCurriculumSection";
import { CourseFaqSection } from "./sections/CourseFaqSection";
import { CourseCheckoutSection } from "./sections/CourseCheckoutSection";
import type { CourseDetail } from "./types";

interface CourseDetailViewProps {
  course: CourseDetail;
}

export function CourseDetailView({ course }: CourseDetailViewProps) {
  const [isVideoModalOpen, setIsVideoModalOpen] = React.useState(false);

  return (
    <div className="w-full bg-[#F8FAFC] pb-16 sm:pb-24">
      <Container>
        {/* Breadcrumb compound component */}
        <CourseBreadcrumb
          categoryName={course.categoryName}
          courseTitle={course.title.split("–")[0]?.trim() || course.title}
        />

        {/* Layout 2 cột: Bên trái là Chi tiết & Nội dung, Bên phải là Form thanh toán VietQR */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-2">
          {/* Cột trái (7/12 cột): Hero info, 3 Lợi ích, Nội dung chi tiết */}
          <div className="lg:col-span-7 flex flex-col gap-6 sm:gap-8">
            <CourseHeroSection
              course={course}
              onOpenVideoDemo={() => setIsVideoModalOpen(true)}
            />

            <CourseBenefitsSection benefits={course.benefits} />

            <CourseCurriculumSection curriculum={course.curriculum} />

            <CourseFaqSection />
          </div>

          {/* Cột phải (5/12 cột): Thanh toán an toàn, Mã coupon, Quét VietQR BankNoti */}
          <div className="lg:col-span-5">
            <CourseCheckoutSection course={course} />
          </div>
        </div>
      </Container>

      {/* Modal xem demo video bài giảng (placeholder để trống sẵn sàng đổ data) */}
      <VideoDemoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        title={course.videoDemoTitle}
        subtitle={course.videoDemoSubtitle}
        videoUrl={course.videoUrl}
      />
    </div>
  );
}
