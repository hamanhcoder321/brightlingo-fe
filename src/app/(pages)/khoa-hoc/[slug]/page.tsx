import * as React from "react";
import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { courseApi } from "@/lib/api/course";
import { siteSettingsApi } from "@/lib/api/site-settings";
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

async function getCachedCourse(slug: string) {
  "use cache";
  return courseApi.getBySlug(slug, { cached: true });
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCachedCourse(slug);

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
  const [course, settings] = await Promise.all([
    courseApi.getBySlug(slug),
    siteSettingsApi.getPublicSettings(),
  ]);

  if (!course) {
    notFound();
  }

  // Handle 301 Redirects configured in CMS or auto-created when slug changes
  const matchedRedirect = (settings.redirects_301 || []).find(
    (r) =>
      r.from === `/khoa-hoc/${slug}` ||
      r.from === `khoa-hoc/${slug}` ||
      r.from === `/${slug}`,
  );
  if (matchedRedirect?.to && matchedRedirect.to !== `/khoa-hoc/${slug}`) {
    permanentRedirect(matchedRedirect.to);
  }
  const redirectToSlug = (course as any)?.redirectToSlug;
  if (redirectToSlug && redirectToSlug !== slug) {
    permanentRedirect(`/khoa-hoc/${redirectToSlug}`);
  }

  const courseJsonLd = settings.schema_course
    ? {
        "@context": "https://schema.org",
        "@type": "Course",
        name: course.title,
        description: course.tagBadge,
        provider: {
          "@type": "Organization",
          name: settings.site_name || "EngNest",
          sameAs: settings.primary_domain || "https://engnest.vn",
        },
        offers: {
          "@type": "Offer",
          price: course.price,
          priceCurrency: "VND",
          availability: "https://schema.org/InStock",
        },
      }
    : null;

  return (
    <>
      {courseJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
        />
      )}
      <CourseDetailView
        course={course}
        bottomBanner={settings.active_banners?.course_detail_bottom}
      />
    </>
  );
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
