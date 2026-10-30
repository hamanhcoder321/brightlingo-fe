"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { XCircle, ArrowLeft, BookOpen, ShieldAlert } from "lucide-react";
import { Container } from "@/components/common";
import { orderApi } from "@/lib/api/order";

function CheckoutCancelContent() {
  const searchParams = useSearchParams();
  const rawCode =
    searchParams.get("orderCode") ||
    searchParams.get("orderId") ||
    searchParams.get("id") ||
    "";
  const [orderCode, setOrderCode] = useState(rawCode);
  const [hasNotified, setHasNotified] = useState(false);

  useEffect(() => {
    if (rawCode && !hasNotified) {
      setHasNotified(true);
      setOrderCode(rawCode);
      // Đồng bộ thông báo huỷ đơn hàng về Backend & CMS
      orderApi
        .cancelOrder(rawCode, "Khách bấm hủy trên cổng thanh toán PayOS")
        .catch((err) => {
          console.warn("[CheckoutCancel] Error cancelling order:", err);
        });
    }
  }, [rawCode, hasNotified]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16 px-4">
      <div className="w-full max-w-lg bg-white rounded-3xl border border-slate-200/80 shadow-xl p-8 sm:p-10 text-center">
        {/* Icon Huỷ */}
        <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full bg-rose-50 border border-rose-100">
          <XCircle className="size-12 text-rose-500" />
        </div>

        {/* Tiêu đề & Trạng thái */}
        <span className="inline-block px-3.5 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-700 uppercase tracking-wider mb-3">
          Giao dịch đã hủy
        </span>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
          Thanh toán đã được hủy
        </h1>

        {orderCode ? (
          <p className="text-sm sm:text-base text-slate-600 mb-6">
            Giao dịch đơn hàng{" "}
            <span className="font-mono font-bold text-slate-900">
              #{orderCode.startsWith("EN-") ? orderCode : `EN-${orderCode}`}
            </span>{" "}
            đã được hủy theo yêu cầu. Tài khoản của bạn{" "}
            <strong className="text-slate-800">chưa bị trừ tiền</strong>.
          </p>
        ) : (
          <p className="text-sm sm:text-base text-slate-600 mb-6">
            Giao dịch thanh toán đã được hủy thành công. Bạn chưa bị trừ tiền trong tài khoản.
          </p>
        )}

        {/* Gợi ý hỗ trợ */}
        <div className="bg-amber-50/80 border border-amber-200/60 rounded-2xl p-4 mb-8 text-left flex items-start gap-3">
          <ShieldAlert className="size-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-amber-900 leading-relaxed">
            Nếu bạn gặp khó khăn trong quá trình chuyển khoản hoặc cần tư vấn thêm về khóa học, hãy liên hệ Hotline/Zalo hỗ trợ của EngNest để được trợ giúp 24/7.
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/khoa-hoc"
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition shadow-sm"
          >
            <BookOpen className="size-4" />
            Xem các khóa học
          </Link>
          <Link
            href="/"
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-slate-100 text-slate-700 font-semibold text-sm hover:bg-slate-200 transition"
          >
            <ArrowLeft className="size-4" />
            Về trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutCancelPage() {
  return (
    <div className="w-full bg-[#F8FAFC]">
      <Container>
        <Suspense
          fallback={
            <div className="min-h-[60vh] flex items-center justify-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
            </div>
          }
        >
          <CheckoutCancelContent />
        </Suspense>
      </Container>
    </div>
  );
}
