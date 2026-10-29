"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Info } from "lucide-react";
import { TERMS_ARTICLES, type TermsArticleData } from "../data/terms.data";

/**
 * Render nội dung markdown-like đơn giản (bold ** và italic *)
 */
function renderMarkdown(text: string): React.ReactNode {
  // Xử lý **bold** và *italic*
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

function TermsCard({ article }: { article: TermsArticleData }) {
  return (
    <section
      id={article.id}
      className={cn(
        "bg-white rounded-2xl p-5 sm:p-7 lg:p-8 scroll-mt-28 shadow-[0_4px_20px_-2px_rgba(37,99,235,0.06),0_2px_6px_-1px_rgba(0,0,0,0.03)]",
        article.isHighlighted
          ? "border-2 border-blue-200 relative"
          : "border border-slate-100"
      )}
    >
      {/* Badge nổi bật */}
      {article.isHighlighted && article.highlightBadge && (
        <div className="absolute -top-3 right-4 sm:right-6 bg-primary text-white text-[11px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider">
          {article.highlightBadge}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <span
          className={cn(
            "w-8 h-8 rounded-lg font-bold text-sm flex items-center justify-center shrink-0",
            article.isHighlighted
              ? "bg-primary text-white"
              : "bg-blue-50 text-primary"
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

        {article.bullets && (
          <ul className="list-disc pl-5 space-y-2 text-slate-700">
            {article.bullets.map((b, idx) => (
              <li key={idx}>{renderMarkdown(b)}</li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

/**
 * Phần I: Điều Khoản Sử Dụng Dịch Vụ — 8 điều khoản
 */
export function TermsArticle() {
  return (
    <div className="space-y-6 sm:space-y-8" id="phan-1-dieu-khoan">
      {/* Section Title Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b-2 border-primary pt-2">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-primary text-white text-xs font-bold rounded-lg uppercase tracking-wider whitespace-nowrap">
            Phần I
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Điều Khoản Sử Dụng Dịch Vụ
          </h2>
        </div>
        <span className="text-xs text-primary font-semibold bg-blue-50 px-3 py-1 rounded-full whitespace-nowrap self-start sm:self-auto">
          8 điều khoản quy định
        </span>
      </div>

      {/* Summary Callout */}
      <div className="p-4 sm:p-5 rounded-2xl bg-blue-50/70 border border-blue-100 flex items-start gap-3 sm:gap-4">
        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shrink-0 mt-0.5">
          <Info className="size-4" />
        </div>
        <div className="text-sm text-slate-700 leading-relaxed">
          <strong className="text-slate-900 font-semibold">
            Lời ngỏ từ EngNest:
          </strong>{" "}
          Bằng cách thực hiện giao dịch thanh toán hoặc truy cập các học liệu
          trên hệ thống EngNest, bạn đồng ý tuân thủ toàn bộ các điều khoản
          được nêu dưới đây. Vui lòng đọc kỹ trước khi mua hàng.
        </div>
      </div>

      {/* Article Cards */}
      {TERMS_ARTICLES.map((article) => (
        <TermsCard key={article.id} article={article} />
      ))}
    </div>
  );
}
