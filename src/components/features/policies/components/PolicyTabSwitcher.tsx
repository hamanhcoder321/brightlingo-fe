"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { FileText, ShieldCheck } from "lucide-react";

export type PolicyTab = "terms" | "privacy";

interface PolicyTabSwitcherProps {
  activeTab: PolicyTab;
  onTabChange: (tab: PolicyTab) => void;
  className?: string;
}

/**
 * Segmented Control / Tab Switcher cho 2 phần:
 * 1. Điều khoản sử dụng (Terms of Use)
 * 2. Chính sách bảo mật (Privacy Policy)
 */
export function PolicyTabSwitcher({
  activeTab,
  onTabChange,
  className,
}: PolicyTabSwitcherProps) {
  const tabs = [
    {
      key: "terms" as PolicyTab,
      label: "Điều khoản sử dụng",
      sublabel: "Terms of Use",
      icon: FileText,
      count: 8,
    },
    {
      key: "privacy" as PolicyTab,
      label: "Chính sách bảo mật",
      sublabel: "Privacy Policy",
      icon: ShieldCheck,
      count: 7,
    },
  ] as const;

  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row items-stretch gap-2 bg-white p-1.5 rounded-2xl border border-slate-200/80 max-w-2xl shadow-sm",
        className
      )}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;
        const Icon = tab.icon;
        return (
          <button suppressHydrationWarning
            key={tab.key}
            type="button"
            onClick={() => onTabChange(tab.key)}
            className={cn(
              "flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer",
              isActive
                ? "bg-primary text-white shadow-sm"
                : "text-slate-600 hover:text-primary hover:bg-slate-50"
            )}
          >
            <Icon className="size-4 shrink-0" />
            <span className="whitespace-nowrap">{tab.label}</span>
            <span
              className={cn(
                "text-[11px] font-bold px-2 py-0.5 rounded-full",
                isActive
                  ? "bg-white/20 text-white"
                  : "bg-slate-100 text-slate-600"
              )}
            >
              {tab.count} mục
            </span>
          </button>
        );
      })}
    </div>
  );
}
