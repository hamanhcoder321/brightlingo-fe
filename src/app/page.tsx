import * as React from "react";
import {
  HeroSection,
  CoursesSection,
  HowToBuySection,
  CommunitySection,
  FaqSection,
  ConsultationSection,
} from "@/components/features/home";
import {
  AnnouncementBarBanner,
  HorizontalPromoBanner,
} from "@/components/common/BannerSlot";
import { siteSettingsApi } from "@/lib/api/site-settings";
import { courseApi } from "@/lib/api/course";

async function HomePageContent() {
  const [settings, courses, categories] = await Promise.all([
    siteSettingsApi.getPublicSettings(),
    courseApi.getAll(),
    courseApi.getCategories(),
  ]);
  const activeBanners = settings.active_banners || {};

  const orderedSections = [...(settings.homepage_sections || [])]
    .filter((section) => section.enabled && !section.phase2)
    .sort((a, b) => a.order - b.order);

  return (
    <>
      {orderedSections.map((section) => {
        switch (section.id) {
          case "announcement":
            return (
              <AnnouncementBarBanner
                key={section.id}
                banner={activeBanners.announcement_bar}
              />
            );
          case "hero":
            return (
              <HeroSection
                key={section.id}
                banner={activeBanners.home_hero}
              />
            );
          case "courses":
            return (
              <React.Fragment key={section.id}>
                <CoursesSection initialCourses={courses} categories={categories} />
                {activeBanners.home_after_courses && (
                  <HorizontalPromoBanner
                    banner={activeBanners.home_after_courses}
                  />
                )}
              </React.Fragment>
            );
          case "how_to_buy":
            return <HowToBuySection key={section.id} />;
          case "community":
            return (
              <CommunitySection
                key={section.id}
                settings={settings}
                banner={activeBanners.home_community}
              />
            );
          case "faq":
            return <FaqSection key={section.id} />;
          case "consultation":
            return (
              <ConsultationSection
                key={section.id}
                settings={settings}
              />
            );
          default:
            return null;
        }
      })}
    </>
  );
}

export default function HomePage() {
  return (
    <React.Suspense
      fallback={
        <>
          <HeroSection />
          <CoursesSection />
          <HowToBuySection />
          <CommunitySection />
          <FaqSection />
          <ConsultationSection />
        </>
      }
    >
      <HomePageContent />
    </React.Suspense>
  );
}
