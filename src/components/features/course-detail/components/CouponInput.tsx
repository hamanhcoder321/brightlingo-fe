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
  const [code, setCode] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState<CouponApplyResult | null>(null);

  // Khi bấm "Áp dụng": Gọi API CMS Backend để kiểm tra và tính toán giảm giá
  const handleApply = async (e?: React.SyntheticEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const trimmedCode = code.trim();
    if (!trimmedCode) return;

    setLoading(true);
    try {
      const res = await couponApi.apply({
        code: trimmedCode,
        courseId,
        originalPrice,
      });
      setResult(res);
      onCouponApplied(res);
    } catch {
      const errorResult: CouponApplyResult = {
        code: trimmedCode,
        discountAmount: 0,
        finalPrice: originalPrice,
        message: "Không thể kết nối đến máy chủ xác thực mã. Vui lòng thử lại sau.",
        isApplied: false,
      };
      setResult(errorResult);
      onCouponApplied(errorResult);
    } finally {
      setLoading(false);
    }
  };

  // Khi bấm "Hủy áp dụng": Reset mã về giá gốc
  const handleRemoveCoupon = () => {
    setCode("");
    setResult(null);
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
      {!result?.isApplied ? (
        <div className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={code}
              onChange={(e) => {
                setCode(e.target.value.toUpperCase());
                if (result && !result.isApplied) {
                  setResult(null); // Xóa thông báo lỗi cũ khi bắt đầu gõ mã mới
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  e.stopPropagation();
                  handleApply();
                }
              }}
              placeholder="Nhập mã ưu đãi (VD: BRIGHT50, GIAM20)"
              className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm uppercase font-semibold text-slate-800 placeholder:normal-case placeholder:font-normal placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary tracking-wide"
            />
          </div>

          <button
            type="button"
            onClick={() => handleApply()}
            disabled={loading || !code.trim()}
            className="rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 px-4 py-2.5 text-sm font-semibold transition-colors disabled:opacity-50 shrink-0 flex items-center justify-center min-w-[84px] cursor-pointer"
          >
            {loading ? (
              <Loader2 className="size-4 animate-spin text-slate-600" />
            ) : (
              "Áp dụng"
            )}
          </button>
        </div>
      ) : (
        /* Thẻ hiển thị mã đã áp dụng thành công kèm nút Hủy */
        <div className="flex items-center justify-between rounded-xl bg-emerald-50/90 border border-emerald-200 px-3.5 py-2.5 text-emerald-900">
          <div className="flex items-center gap-2">
            <Tag className="size-4 text-emerald-600 shrink-0" />
            <div className="flex flex-col">
              <span className="text-xs font-bold tracking-wide">
                MÃ: {result.code}
              </span>
              <span className="text-[11px] text-emerald-700">
                {result.discountAmount > 0
                  ? `Đã giảm -${new Intl.NumberFormat("vi-VN").format(result.discountAmount)}đ`
                  : "Đã áp dụng mức giá ưu đãi trọn gói tốt nhất"}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleRemoveCoupon}
            className="text-xs font-medium text-slate-500 hover:text-red-600 flex items-center gap-1 transition-colors px-2 py-1 rounded hover:bg-white/60 cursor-pointer"
            title="Hủy mã này"
          >
            <X className="size-3.5" />
            <span>Hủy</span>
          </button>
        </div>
      )}

      {/* Thông báo kết quả phản hồi từ API CMS */}
      {result && (
        <div
          className={`flex items-start gap-2 rounded-xl p-2.5 text-xs font-medium leading-relaxed ${
            result.isApplied
              ? "bg-emerald-50/60 text-emerald-800 border border-emerald-100"
              : "bg-red-50 text-red-700 border border-red-200/80"
          }`}
        >
          {result.isApplied ? (
            <CheckCircle2 className="size-4 shrink-0 text-emerald-600 mt-0.5" />
          ) : (
            <AlertCircle className="size-4 shrink-0 text-red-600 mt-0.5" />
          )}
          <span>{result.message}</span>
        </div>
      )}
    </div>
  );
}
