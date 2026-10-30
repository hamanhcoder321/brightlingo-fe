"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, Download, Mail, ArrowRight, Home, Sparkles } from "lucide-react";
import { Container } from "@/components/common";
import { orderApi, type OrderStatusResponse } from "@/lib/api/order";

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const rawCode =
    searchParams.get("orderCode") ||
    searchParams.get("orderId") ||
    searchParams.get("id") ||
    "";
  const [orderCode, setOrderCode] = useState(rawCode);
  const [orderData, setOrderData] = useState<OrderStatusResponse | null>(null);
  const [isLoading, setIsLoading] = useState(Boolean(rawCode));

  useEffect(() => {
    if (rawCode) {
      setOrderCode(rawCode);
      setIsLoading(true);
      orderApi
        .checkPaymentStatus(rawCode)
        .then((res) => {
          setOrderData(res);
        })
        .catch((err) => {
          console.warn("[CheckoutSuccess] Error checking order status:", err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [rawCode]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16 px-4">
      <div className="w-full max-w-lg bg-white rounded-3xl border border-slate-200/80 shadow-xl p-8 sm:p-10 text-center">
        {/* Success Icon */}
        <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full bg-emerald-50 border border-emerald-100">
          <CheckCircle2 className="size-12 text-emerald-600" />
        </div>

        {/* Status Badge */}
        <span className="inline-block px-3.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 uppercase tracking-wider mb-3">
          Thanh toán thành công
        </span>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
          Cảm ơn bạn đã đăng ký!
        </h1>

        <p className="text-sm sm:text-base text-slate-600 mb-6">
          {orderCode ? (
            <>
              Đơn hàng{" "}
              <span className="font-mono font-bold text-slate-900">
                #{orderCode.startsWith("EN-") ? orderCode : `EN-${orderCode}`}
              </span>{" "}
              đã được thanh toán thành công và kích hoạt tự động.
            </>
          ) : (
            "Khóa học của bạn đã được kích hoạt thành công trên hệ thống EngNest."
          )}
        </p>

        {/* Email Instruction Box */}
        <div className="bg-slate-50 border border-slate-200/70 rounded-2xl p-5 mb-6 text-left flex items-start gap-3.5">
          <div className="size-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
            <Mail className="size-5" />
          </div>
          <div className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            <strong className="text-slate-900 block mb-1">
              Thông tin kích hoạt khóa học đã gửi qua Email
            </strong>
            {orderData?.customerEmail && (
              <p className="font-mono font-semibold text-primary mb-1">
                Gửi tới: {orderData.customerEmail}
              </p>
            )}
            Vui lòng kiểm tra hộp thư đến (Inbox) hoặc mục Thư rác / Spam để nhận quyền truy cập vào tài liệu và bài giảng.
          </div>
        </div>

        {/* Direct Download Resource Link if available */}
        {orderData?.resourceLink && (
          <div className="mb-6">
            <a
              href={orderData.resourceLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base transition shadow-md hover:shadow-lg"
            >
              <Download className="size-5" />
              Bấm để tải tài liệu (Google Drive) ngay
            </a>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/"
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition shadow-sm"
          >
            <Home className="size-4" />
            Về trang chủ
          </Link>
          <Link
            href="/khoa-hoc"
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-slate-100 text-slate-700 font-semibold text-sm hover:bg-slate-200 transition"
          >
            <Sparkles className="size-4" />
            Khám phá thêm khóa học
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
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
          <CheckoutSuccessContent />
        </Suspense>
      </Container>
    </div>
  );
}
