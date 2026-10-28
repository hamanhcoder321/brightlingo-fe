"use client";

import * as React from "react";
import { CheckCircle2, AlertCircle, Loader2, X, Tag } from "lucide-react";
import { couponApi } from "@/lib/api/coupon";
import type { CouponApplyResult } from "../types";

interface CouponInputProps {
  courseId: string;
  originalPrice: number;
  onCouponApplied: (result: CouponApplyResult) => void;
}

export function CouponInput({
  courseId,
  originalPrice,
  onCouponApplied,
}: CouponInputProps) {
  const [couponCodeInput, setCouponCodeInput] = React.useState("");
  const [isSubmittingCoupon, setIsSubmittingCoupon] = React.useState(false);
  const [couponApplicationResult, setCouponApplicationResult] =
    React.useState<CouponApplyResult | null>(null);

  // Khi bấm "Áp dụng": Gọi API Backend để kiểm tra và tính toán giảm giá
  const handleApplyCoupon = async (event?: React.SyntheticEvent) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    const trimmedCouponCode = couponCodeInput.trim();
    if (!trimmedCouponCode) return;

    setIsSubmittingCoupon(true);
    try {
      const couponApiResponse = await couponApi.apply({
        code: trimmedCouponCode,
        courseId,
        originalPrice,
      });
      setCouponApplicationResult(couponApiResponse);
      onCouponApplied(couponApiResponse);
    } catch {
      const fallbackErrorResult: CouponApplyResult = {
        code: trimmedCouponCode,
        discountAmount: 0,
        finalPrice: originalPrice,
        message: "Không thể kết nối đến máy chủ xác thực mã. Vui lòng thử lại sau.",
        isApplied: false,
      };
      setCouponApplicationResult(fallbackErrorResult);
      onCouponApplied(fallbackErrorResult);
    } finally {
      setIsSubmittingCoupon(false);
    }
  };

  // Khi bấm "Hủy áp dụng": Reset mã về giá gốc
  const handleRemoveCoupon = () => {
    setCouponCodeInput("");
    setCouponApplicationResult(null);
    onCouponApplied({
      code: "",
      discountAmount: 0,
      finalPrice: originalPrice,
      message: "",
      isApplied: false,
    });
  };

  return (
    <div className="flex flex-col gap-2.5">
      {/* Khung nhập mã (chỉ hiển thị khi chưa áp dụng thành công) */}
      {!couponApplicationResult?.isApplied ? (
        <div className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={couponCodeInput}
              onChange={(changeEvent) => {
                setCouponCodeInput(changeEvent.target.value.toUpperCase());
                if (couponApplicationResult && !couponApplicationResult.isApplied) {
                  setCouponApplicationResult(null); // Xóa thông báo lỗi cũ khi bắt đầu gõ mã mới
                }
              }}
              onKeyDown={(keyboardEvent) => {
                if (keyboardEvent.key === "Enter") {
                  keyboardEvent.preventDefault();
                  keyboardEvent.stopPropagation();
                  handleApplyCoupon();
                }
              }}
              placeholder="Nhập mã ưu đãi (VD: BRIGHT50, GIAM20)"
              className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm uppercase font-semibold text-slate-800 placeholder:normal-case placeholder:font-normal placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary tracking-wide"
            />
          </div>

          <button
            type="button"
            onClick={() => handleApplyCoupon()}
            disabled={isSubmittingCoupon || !couponCodeInput.trim()}
            className="rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 px-4 py-2.5 text-sm font-semibold transition-colors disabled:opacity-50 shrink-0 flex items-center justify-center min-w-[84px] cursor-pointer"
          >
            {isSubmittingCoupon ? (
              <Loader2 className="w-4 h-4 animate-spin text-slate-600" />
            ) : (
              "Áp dụng"
            )}
          </button>
        </div>
      ) : (
        /* Badge hiển thị mã đã áp dụng thành công */
        <div className="flex items-center justify-between rounded-xl bg-emerald-50/80 border border-emerald-200/80 px-3.5 py-2.5 transition-all">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
              <Tag className="w-3.5 h-3.5" />
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-xs font-bold text-emerald-800 uppercase tracking-wide">
                {couponApplicationResult.code}
              </span>
              <span className="text-[11px] text-emerald-600 font-medium">
                {couponApplicationResult.discountAmount > 0
                  ? `Đã giảm ${new Intl.NumberFormat("vi-VN").format(
                      couponApplicationResult.discountAmount
                    )}đ`
                  : "Mã ưu đãi đã kích hoạt"}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleRemoveCoupon}
            className="flex h-6 w-6 items-center justify-center rounded-md text-emerald-600 hover:bg-emerald-100/80 transition-colors"
            title="Hủy mã ưu đãi"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Thông báo kết quả kiểm tra mã */}
      {couponApplicationResult && (
        <div
          className={`flex items-start gap-1.5 text-xs font-medium ${
            couponApplicationResult.isApplied ? "text-emerald-600" : "text-rose-500"
          }`}
        >
          {couponApplicationResult.isApplied ? (
            <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0" />
          ) : (
            <AlertCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
          )}
          <span>{couponApplicationResult.message}</span>
        </div>
      )}
    </div>
  );
}
