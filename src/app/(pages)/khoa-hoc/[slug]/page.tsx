import * as React from "react";
import type { Metadata } from "next";
import { cacheLife } from "next/cache";
import { notFound, permanentRedirect } from "next/navigation";
import { courseApi } from "@/lib/api/course";
import { siteSettingsApi } from "@/lib/api/site-settings";
import { CourseDetailView } from "@/components/features/course-detail";
import { absoluteUrl, getSiteUrl } from "@/lib/constants/site-config";

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
  cacheLife("minutes");
  return courseApi.getBySlug(slug, { cached: true });
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const [course, settings] = await Promise.all([
    getCachedCourse(slug),
    siteSettingsApi.getPublicSettings({ cached: true }),
  ]);

  if (!course) {
    notFound();
  }

  const seoTitle = (course as any).seoTitle || course.title;
  const seoDesc =
    (course as any).seoDescription ||
    course.description ||
    `${course.tagBadge}. ${course.benefits?.[0]?.description || ""}`;
  const rawImg = (course as any).ogImage || course.image;
  const ogImg = typeof rawImg === "string" ? rawImg : rawImg?.src;

  return {
    title: seoTitle,
    description: seoDesc,
    alternates: {
      canonical: absoluteUrl(`/khoa-hoc/${course.slug}`, settings.primary_domain),
    },
    openGraph: {
      title: seoTitle,
      description: seoDesc,
      images: ogImg ? [{ url: ogImg }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDesc,
      images: ogImg ? [ogImg] : undefined,
    },
  };
}

async function CourseDetailContent({ params }: PageProps) {
  const { slug } = await params;
  const [course, settings] = await Promise.all([
    courseApi.getBySlug(slug),
    siteSettingsApi.getPublicSettings(),
  ]);

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

  if (!course) {
    notFound();
  }

  const redirectToSlug = (course as any)?.redirectToSlug;
  if (redirectToSlug && redirectToSlug !== slug) {
    permanentRedirect(`/khoa-hoc/${redirectToSlug}`);
  }
  if (course.slug && course.slug !== slug) {
    permanentRedirect(`/khoa-hoc/${course.slug}`);
  }

  const baseUrl = getSiteUrl(settings.primary_domain);

  const courseJsonLd = settings.schema_course
    ? {
        "@context": "https://schema.org",
        "@type": "Course",
        name: course.title,
        description:
          (course as any).seoDescription || course.description || course.tagBadge,
        provider: {
          "@type": "Organization",
          name: settings.site_name || "EngNest",
          sameAs: baseUrl,
        },
        offers: {
          "@type": "Offer",
          price: course.price,
          priceCurrency: "VND",
          availability: "https://schema.org/InStock",
        },
      }
    : null;

  const faqItems = Array.isArray(course.faqs) ? course.faqs : [];
  const faqJsonLd =
    settings.schema_faq && faqItems.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqItems.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: f.answer,
            },
          })),
        }
      : null;

  const breadcrumbJsonLd = settings.schema_breadcrumb
    ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Trang chủ",
            item: `${baseUrl}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Khóa học",
            item: `${baseUrl}/khoa-hoc`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: course.title,
            item: `${baseUrl}/khoa-hoc/${course.slug}`,
          },
        ],
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
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      {breadcrumbJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      )}
      <CourseDetailView
        course={course}
        bottomBanner={settings.active_banners?.course_detail_bottom}
      />
    </>
  );
}

export default async function CourseDetailPage(props: PageProps) {
  // Kiểm tra trước Suspense để notFound() trả HTTP 404 thật (trong Suspense chỉ còn 200 + noindex).
  const { slug } = await props.params;
  const course = await getCachedCourse(slug);
  if (!course) {
    notFound();
  }

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
