"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { LifeBuoy, Mail, Phone, MapPin } from "lucide-react";
import type { PolicyTab } from "./PolicyTabSwitcher";
import { TERMS_TOC } from "../data/terms.data";
import { PRIVACY_TOC } from "../data/privacy.data";

interface PolicySidebarProps {
  activeTab: PolicyTab;
  activeSectionId: string;
  className?: string;
}

/**
 * Sidebar sticky chứa:
 * - Mục lục A (Điều khoản) hoặc B (Bảo mật) tùy theo tab đang active
 * - Card liên hệ DPO / hỗ trợ pháp lý
 */
export function PolicySidebar({
  activeTab,
  activeSectionId,
  className,
}: PolicySidebarProps) {
  const isTerms = activeTab === "terms";
  const tocItems = isTerms ? TERMS_TOC : PRIVACY_TOC;

  return (
    <aside
      className={cn("sticky top-28 space-y-6", className)}
      data-purpose="sidebar-toc"
    >
      {/* Dual Navigation Card */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-100 shadow-[0_10px_30px_-5px_rgba(15,23,42,0.04)] max-h-[calc(100vh-8.5rem)] overflow-y-auto custom-scrollbar space-y-5">
        {/* Section Header */}
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
            <span
              className={cn(
                "text-xs font-bold uppercase tracking-wider flex items-center gap-1.5",
                isTerms ? "text-primary" : "text-emerald-600"
              )}
            >
              <span
                className={cn(
                  "w-2 h-2 rounded-full inline-block",
                  isTerms ? "bg-primary" : "bg-emerald-600"
                )}
              />
              {isTerms ? "A. Điều khoản sử dụng" : "B. Chính sách bảo mật"}
            </span>
            <span
              className={cn(
                "text-[11px] font-bold px-2 py-0.5 rounded-full",
                isTerms
                  ? "bg-blue-50 text-primary"
                  : "bg-emerald-50 text-emerald-700"
              )}
            >
              {tocItems.length} mục
            </span>
          </div>

          {/* TOC Navigation */}
          <nav
            aria-label={
              isTerms ? "Mục lục Điều khoản" : "Mục lục Bảo mật"
            }
            className="space-y-1 text-xs"
          >
            {tocItems.map((item) => {
              const isActive = activeSectionId === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={cn(
                    "flex items-center gap-2.5 p-2 rounded-lg transition-all font-medium",
                    isActive
                      ? cn(
                          "font-semibold",
                          isTerms
                            ? "text-primary bg-blue-50"
                            : "text-emerald-700 bg-emerald-50"
                        )
                      : "text-slate-600 hover:text-primary hover:bg-blue-50/50"
                  )}
                >
                  <span
                    className={cn(
                      "w-5 h-5 rounded-md flex items-center justify-center text-[11px] font-bold shrink-0",
                      isActive
                        ? isTerms
                          ? "bg-primary text-white"
                          : "bg-emerald-600 text-white"
                        : "bg-slate-100 text-slate-600"
                    )}
                  >
                    {item.number}
                  </span>
                  <span className="line-clamp-2">{item.label}</span>
                </a>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Legal & DPO Support Card */}
      <div className="bg-gradient-to-br from-primary to-blue-700 rounded-2xl p-5 sm:p-6 text-white shadow-lg shadow-blue-500/20">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center">
            <LifeBuoy className="size-5 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-bold leading-tight">
              Hỗ trợ pháp lý & DPO
            </h3>
            <p className="text-xs text-blue-100">
              Đội ngũ pháp chế & bảo vệ dữ liệu 24/7
            </p>
          </div>
        </div>
        <p className="text-xs text-blue-100/90 leading-relaxed mb-4">
          Mọi câu hỏi về điều khoản giao kết, bản quyền hoặc quyền riêng tư dữ
          liệu cá nhân xin liên hệ:
        </p>
        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2 bg-black/10 px-3 py-2 rounded-lg backdrop-blur-sm">
            <Phone className="size-3.5 text-blue-200 shrink-0" />
            <span className="text-blue-200">Hotline:</span>
            <strong className="font-bold tracking-wide">1900 8989</strong>
          </div>
          <div className="flex items-center gap-2 bg-black/10 px-3 py-2 rounded-lg backdrop-blur-sm">
            <Mail className="size-3.5 text-blue-200 shrink-0" />
            <span className="text-blue-200">CSKH:</span>
            <span className="font-medium">hotro@engnest.vn</span>
          </div>
          <div className="flex items-center gap-2 bg-black/10 px-3 py-2 rounded-lg backdrop-blur-sm">
            <MapPin className="size-3.5 text-blue-200 shrink-0" />
            <span className="text-blue-200">DPO:</span>
            <span className="font-medium">dpo@engnest.vn</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
