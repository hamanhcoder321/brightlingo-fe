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
    { slug: "ielts-writing-master-kit" },
    { slug: "business-english-for-global-work" },
    { slug: "ngu-phap-1000-mau-cau-so" },
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
