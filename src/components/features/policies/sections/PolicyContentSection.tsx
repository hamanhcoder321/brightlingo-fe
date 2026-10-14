"use client";

import * as React from "react";
import { Container } from "@/components/common";
import {
  PolicyTabSwitcher,
  PolicySidebar,
  TermsArticle,
  PrivacyArticle,
  type PolicyTab,
} from "../components";

/**
 * Main content section cho trang Chính sách & Điều khoản.
 * Chứa: Tab switcher + Layout 2 cột (Sidebar TOC + Article content).
 * Tab chuyển đổi giữa Điều khoản sử dụng ↔ Chính sách bảo mật.
 */
export function PolicyContentSection() {
  const [activeTab, setActiveTab] = React.useState<PolicyTab>("terms");
  const [activeSectionId, setActiveSectionId] = React.useState("");

  /**
   * Intersection Observer: highlight mục đang visible trên viewport
   * trong sidebar TOC.
   */
  React.useEffect(() => {
    const prefixes = activeTab === "terms" ? "dieu-" : "bm-";
    const sections = document.querySelectorAll<HTMLElement>(
      `[id^="${prefixes}"]`
    );

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSectionId(entry.target.id);
            break;
          }
        }
      },
      {
        rootMargin: "-120px 0px -60% 0px",
        threshold: 0,
      }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [activeTab]);

  return (
    <>
      {/* Tab Switcher — nằm trong Hero bottom */}
      <div className="w-full bg-gradient-to-b from-transparent to-transparent -mt-2">
        <Container>
          <PolicyTabSwitcher
            activeTab={activeTab}
            onTabChange={(tab) => {
              setActiveTab(tab);
              setActiveSectionId("");
            }}
            className="mb-8"
          />
        </Container>
      </div>

      {/* Main Content */}
      <section className="flex-grow w-full py-8 sm:py-10">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Sidebar TOC — sticky trên desktop, ẩn trên mobile */}
            <div className="hidden lg:block lg:col-span-4">
              <PolicySidebar
                activeTab={activeTab}
                activeSectionId={activeSectionId}
              />
            </div>

            {/* Article Content */}
            <article
              className="lg:col-span-8 min-w-0"
              data-purpose="terms-articles"
            >
              {activeTab === "terms" ? <TermsArticle /> : <PrivacyArticle />}
            </article>
          </div>
        </Container>
      </section>
    </>
  );
}
