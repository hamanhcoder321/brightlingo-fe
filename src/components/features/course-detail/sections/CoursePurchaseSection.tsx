"use client";

import * as React from "react";
import { ArrowRight, Check, Phone, QrCode } from "lucide-react";
import { formatCurrencyVND } from "@/components/features/home/data/courses.data";
import { SUPPORT_INFO } from "@/lib/constants/site-config";
import type { CourseDetail } from "../types";

const PURCHASE_PERKS = [
  "Mua một lần, học trọn đời",
  "Không cần tạo tài khoản",
  "Nhận link qua email sau 1–5 phút",
  "Xem trên điện thoại, máy tính",
] as const;

interface CoursePurchaseSectionProps {
  course: CourseDetail;
  onBuy: () => void;
}

/**
 * Thẻ giá & nút "Mua khóa học": sidebar sticky trên desktop, thanh cố định dưới đáy trên mobile.
 */
export function CoursePurchaseSection({ course, onBuy }: CoursePurchaseSectionProps) {
  const savings = course.originalPrice - course.price;

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden flex-col gap-4 lg:sticky lg:top-24 lg:flex">
        <div className="rounded-2xl border border-border bg-white p-6 shadow-lg">
          <p className="text-[38px] font-bold leading-none text-price">{formatCurrencyVND(course.price)}</p>
          {savings > 0 && (
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className="text-base text-muted-foreground line-through">
                {formatCurrencyVND(course.originalPrice)}
              </span>
              <span className="rounded-md bg-[#FCE9D8] px-2 py-0.5 text-sm font-semibold text-price">
                Tiết kiệm {formatCurrencyVND(savings)}
              </span>
            </div>
          )}

          <ul className="mt-5 space-y-2.5">
            {PURCHASE_PERKS.map((perk) => (
              <li key={perk} className="flex items-start gap-2 text-[15px] text-ink">
                <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                {perk}
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={onBuy}
            className="mt-6 flex h-14 w-full items-center justify-center gap-2 rounded-lg bg-primary text-lg font-semibold text-white transition-colors hover:bg-primary/90 cursor-pointer"
          >
            Mua khóa học
            <ArrowRight className="size-5" />
          </button>
          <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
            <QrCode className="size-4 shrink-0" />
            Chuyển khoản qua mã QR ngân hàng
          </p>
        </div>

        <a
          href={`tel:${SUPPORT_INFO.hotline.replace(/\s/g, "")}`}
          className="flex items-center gap-3 rounded-2xl bg-mint p-5 text-ink hover:bg-mint/80"
        >
          <Phone className="size-5 shrink-0 text-primary" />
          <span className="text-[15px]">
            Cần tư vấn trước khi mua?
            <br />
            <strong>{SUPPORT_INFO.hotline}</strong> (Zalo)
          </span>
        </a>
      </aside>

      {/* Mobile sticky bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-white px-4 py-3 shadow-[0_-4px_16px_rgba(29,42,46,0.08)] lg:hidden">
        <div className="mx-auto flex max-w-xl items-center justify-between gap-4">
          <div>
            <p className="text-2xl font-bold leading-none text-price">{formatCurrencyVND(course.price)}</p>
            {savings > 0 && (
              <p className="mt-1 text-sm text-muted-foreground line-through">
                {formatCurrencyVND(course.originalPrice)}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onBuy}
            className="flex h-14 flex-1 items-center justify-center rounded-lg bg-primary px-5 text-lg font-semibold text-white cursor-pointer"
          >
            Mua khóa học
          </button>
        </div>
      </div>
    </>
  );
}
