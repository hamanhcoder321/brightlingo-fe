import * as React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { courseApi } from "@/lib/api/course";
import { CourseDetailView } from "@/components/features/course-detail";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return [
    { slug: "english-for-real-life" },
    { slug: "phan-xa-giao-tiep-30-ngay" },
    { slug: "phat-am-chuan-my-shadowing" },
    { slug: "dam-thoai-du-lich-san-bay" },
    { slug: "tieng-anh-nha-hang-cafe-smalltalk" },
    { slug: "business-english-for-global-work" },
    { slug: "viet-email-thuong-mai-chuyen-nghiep" },
    { slug: "thuyet-trinh-dam-phan-tieng-anh" },
    { slug: "phong-van-xin-viec-tap-doan-da-quoc-gia" },
    { slug: "tieng-anh-hop-meeting-va-brainstorming" },
    { slug: "ielts-writing-master-kit" },
    { slug: "ielts-speaking-band-8-formula" },
    { slug: "toeic-900-cap-toc-nghe-doc" },
    { slug: "ielts-reading-skimming-scanning" },
    { slug: "bo-de-du-doan-ielts-quy-moi-nhat" },
    { slug: "ngu-phap-1000-mau-cau-so" },
    { slug: "lay-goc-tieng-anh-tu-so-0" },
    { slug: "hack-3000-tu-vung-theo-chu-de" },
    { slug: "he-thong-12-thi-ung-dung-thuc-te" },
    { slug: "cau-truc-cau-va-phan-xa-dat-cau-nhanh" },
  ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = await courseApi.getBySlug(slug);

  if (!course) {
    return {
      title: "Khóa học không tồn tại | BrightLingo",
    };
  }

  return {
    title: course.title,
    description: `${course.tagBadge}. ${course.benefits?.[0]?.description || ""}`,
    openGraph: {
      title: `${course.title} | BrightLingo`,
      description: course.tagBadge,
    },
  };
}

async function CourseDetailContent({ params }: PageProps) {
  const { slug } = await params;
  const course = await courseApi.getBySlug(slug);

  if (!course) {
    notFound();
  }

  return <CourseDetailView course={course} />;
}

export default function CourseDetailPage(props: PageProps) {
  return (
    <React.Suspense
      fallback={
        <div className="w-full min-h-[80vh] bg-[#F8FAFC] flex items-center justify-center">
          <div className="size-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        </div>
      }
    >
      <CourseDetailContent {...props} />
    </React.Suspense>
  );
}
