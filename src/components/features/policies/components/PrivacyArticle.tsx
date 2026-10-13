"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ShieldCheck } from "lucide-react";
import {
  PRIVACY_ARTICLES,
  type PrivacyArticleData,
} from "../data/privacy.data";

/**
 * Render nội dung markdown-like đơn giản (bold ** và italic *)
 */
function renderMarkdown(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="text-slate-900 font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
}

function PrivacyCard({ article }: { article: PrivacyArticleData }) {
  return (
    <section
      id={article.id}
      className={cn(
        "bg-white rounded-2xl p-5 sm:p-7 lg:p-8 scroll-mt-28 shadow-[0_4px_20px_-2px_rgba(37,99,235,0.06),0_2px_6px_-1px_rgba(0,0,0,0.03)]",
        article.isHighlighted
          ? "border-2 border-emerald-200"
          : "border border-slate-100"
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <span
          className={cn(
            "w-8 h-8 rounded-lg font-bold text-sm flex items-center justify-center shrink-0",
            article.isHighlighted
              ? "bg-emerald-600 text-white"
              : "bg-emerald-50 text-emerald-700"
          )}
        >
          {article.number}
        </span>
        <h3 className="text-lg sm:text-xl font-bold text-slate-900">
          {article.title}
        </h3>
      </div>

      {/* Body */}
      <div className="space-y-3.5 text-sm leading-relaxed text-slate-600 pl-11">
        {article.paragraphs.map((p, idx) => (
          <p key={idx}>{renderMarkdown(p)}</p>
        ))}

        {/* Info Cards (Zero-Account 3-field grid) */}
        {article.infoCards && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
            {article.infoCards.map((card, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-100"
              >
                <span className="text-xs font-bold text-slate-900 block mb-1">
                  {card.label}
                </span>
                <p className="text-xs text-slate-500">{card.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Bullet List */}
        {article.bullets && (
          <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
            {article.bullets.map((b, idx) => (
              <li key={idx}>{renderMarkdown(b)}</li>
            ))}
          </ul>
        )}

        {/* Contact Info (DPO section) */}
        {article.contactInfo && (
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 text-xs text-slate-700 space-y-1">
            {article.contactInfo.map((info, idx) => (
              <p key={idx}>
                <strong>{info.label}:</strong> {info.value}
              </p>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/**
 * Phần II: Chính Sách Bảo Mật Thông Tin — 7 mục
 * Tuân thủ Nghị định 13/2023/NĐ-CP
 */
export function PrivacyArticle() {
  return (
    <div className="space-y-6 sm:space-y-8" id="phan-2-bao-mat">
      {/* Section Title Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b-2 border-emerald-600">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-emerald-600 text-white text-xs font-bold rounded-lg uppercase tracking-wider whitespace-nowrap">
            Phần II
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Chính Sách Bảo Mật Thông Tin
          </h2>
        </div>
        <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-3 py-1 rounded-full whitespace-nowrap self-start sm:self-auto">
          Tuân thủ NĐ 13/2023/NĐ-CP
        </span>
      </div>

      {/* Privacy Callout */}
      <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 flex items-start gap-3 sm:gap-4">
        <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5">
          <ShieldCheck className="size-4" />
        </div>
        <div className="text-sm text-slate-700 leading-relaxed">
          <strong className="text-slate-900 font-semibold">
            Cam kết bảo vệ dữ liệu cá nhân:
          </strong>{" "}
          BrightLingo cam kết tuyệt đối tôn trọng quyền riêng tư của người học,
          tuân thủ chặt chẽ Nghị định 13/2023/NĐ-CP về bảo vệ dữ liệu cá nhân.
          Mô hình Zero-Account đảm bảo bạn chỉ cung cấp thông tin tối thiểu cần
          thiết để nhận học liệu.
        </div>
      </div>

      {/* Article Cards */}
      {PRIVACY_ARTICLES.map((article) => (
        <PrivacyCard key={article.id} article={article} />
      ))}
    </div>
  );
}
