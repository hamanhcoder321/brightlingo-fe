"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Info,
  QrCode,
  Loader2,
  User,
  Mail,
  CheckCircle2,
  Lock,
} from "lucide-react";
import { formatCurrencyVND } from "@/components/features/home/data/courses.data";
import { CouponInput } from "../components/CouponInput";
import { BankTransferCard } from "../components/BankTransferCard";
import { orderApi } from "@/lib/api/order";
import type {
  CourseDetail,
  CouponApplyResult,
  OrderCreationResult,
} from "../types";

interface CourseCheckoutSectionProps {
  course: CourseDetail;
}

export function CourseCheckoutSection({ course }: CourseCheckoutSectionProps) {
  const router = useRouter();

  // Trạng thái Form & Bước thanh toán:
  // "FORM" = Khách đang xem & điền thông tin (Mã QR chưa xuất hiện)
  // "PAYMENT" = Đơn PENDING đã tạo thành công, bung mã QR VietQR & Đếm ngược 10 phút
  const [orderStep, setOrderStep] = React.useState<"FORM" | "PAYMENT">("FORM");

  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [appliedCouponCode, setAppliedCouponCode] = React.useState("");
  const [discountAmount, setDiscountAmount] = React.useState(0);
  const [finalPrice, setFinalPrice] = React.useState(course.price);

  const [errors, setErrors] = React.useState<{
    fullName?: string;
    email?: string;
  }>({});
  const [isCreatingOrder, setIsCreatingOrder] = React.useState(false);
  const [orderResult, setOrderResult] =
    React.useState<OrderCreationResult | null>(null);

  // Xử lý mã giảm giá từ API CMS
  const handleCouponApplied = (result: CouponApplyResult) => {
    if (result.isApplied) {
      setAppliedCouponCode(result.code);
      setDiscountAmount(result.discountAmount);
      setFinalPrice(result.finalPrice);
    } else {
      setAppliedCouponCode("");
      setDiscountAmount(0);
      setFinalPrice(course.price);
    }
  };

  // Validate form trước khi tạo đơn hàng
  const validateForm = () => {
    const errs: { fullName?: string; email?: string } = {};
    if (!fullName.trim() || fullName.trim().length < 2) {
      errs.fullName = "Vui lòng nhập họ và tên học viên (tối thiểu 2 ký tự)";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      errs.email = "Vui lòng nhập địa chỉ email nhận khóa học";
    } else if (!emailRegex.test(email.trim())) {
      errs.email = "Email không đúng định dạng (VD: nguyenvan@gmail.com)";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Kích hoạt tạo Order PENDING trên Backend -> Bung mã VietQR
  const handleProceedToPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsCreatingOrder(true);
    try {
      const res = await orderApi.createOrder({
        courseId: course.id,
        courseSlug: course.slug,
        customerName: fullName.trim(),
        customerEmail: email.trim(),
        amount: finalPrice,
        couponCode: appliedCouponCode || undefined,
      });

      setOrderResult(res);
      setOrderStep("PAYMENT");
    } catch (err) {
      console.error("Lỗi khi tạo đơn hàng:", err);
    } finally {
      setIsCreatingOrder(false);
    }
  };

  return (
    <aside className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-lg lg:sticky lg:top-24">
      {/* Header Thẻ Thanh toán an toàn */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="flex size-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <ShieldCheck className="size-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
              Thanh toán an toàn
            </h2>
            <p className="text-xs text-slate-500">Mua một lần, học trọn đời</p>
          </div>
        </div>

        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
          <span className="size-1.5 rounded-full bg-emerald-500" />
          Bảo mật SSL
        </span>
      </div>

      {/* =========================================================================
          TRẠNG THÁI 1: KHÁCH ĐIỀN THÔNG TIN & ÁP MÃ (MÃ QR ẨN HOÀN TOÀN)
          ========================================================================= */}
      {orderStep === "FORM" ? (
        <form onSubmit={handleProceedToPayment} className="flex flex-col gap-6">
          {/* Bước 1: Thông tin nhận khóa học */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex size-5 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-white">
                  1
                </span>
                <h3 className="text-sm font-bold text-slate-900">
                  Thông tin nhận khóa học
                </h3>
              </div>
              <span className="text-[11px] text-slate-500 font-medium">
                Chỉ cần Họ tên & Email nhận link
              </span>
            </div>

            <div className="flex flex-col gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Họ và tên học viên <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (errors.fullName)
                        setErrors((prev) => ({ ...prev, fullName: undefined }));
                    }}
                    placeholder="Ví dụ: Nguyễn Văn Anh"
                    className={`w-full rounded-xl border bg-white pl-9 pr-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 ${
                      errors.fullName
                        ? "border-red-400 focus:border-red-500 focus:ring-red-400"
                        : "border-slate-200 focus:border-primary focus:ring-primary"
                    }`}
                  />
                  <User className="size-4 text-slate-400 absolute left-3 top-3" />
                </div>
                {errors.fullName && (
                  <p className="text-[11px] text-red-600 font-medium mt-1">
                    {errors.fullName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email nhận link khóa học & tài liệu <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email)
                        setErrors((prev) => ({ ...prev, email: undefined }));
                    }}
                    placeholder="Ví dụ: nguyenvan@gmail.com"
                    className={`w-full rounded-xl border bg-white pl-9 pr-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 ${
                      errors.email
                        ? "border-red-400 focus:border-red-500 focus:ring-red-400"
                        : "border-slate-200 focus:border-primary focus:ring-primary"
                    }`}
                  />
                  <Mail className="size-4 text-slate-400 absolute left-3 top-3" />
                </div>
                {errors.email && (
                  <p className="text-[11px] text-red-600 font-medium mt-1">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="flex items-start gap-1.5 text-[11px] text-slate-500 leading-normal">
                <Info className="size-3.5 shrink-0 text-slate-400 mt-0.5" />
                <span>
                  Đường link truy cập và tài liệu số sẽ được gửi tự động vào email này ngay sau khi xác nhận chuyển khoản.
                </span>
              </div>
            </div>
          </div>

          {/* Bước 2: Mã giảm giá */}
          <div className="flex flex-col gap-3 pt-3 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <span className="flex size-5 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-white">
                2
              </span>
              <h3 className="text-sm font-bold text-slate-900">Mã giảm giá</h3>
            </div>

            <CouponInput
              courseId={course.id}
              originalPrice={course.price}
              onCouponApplied={handleCouponApplied}
            />
          </div>

          {/* Bước 3: Tóm tắt đơn hàng */}
          <div className="flex flex-col gap-3 pt-3 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <span className="flex size-5 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-white">
                3
              </span>
              <h3 className="text-sm font-bold text-slate-900">Tóm tắt đơn hàng</h3>
            </div>

            <div className="rounded-xl bg-slate-50/70 p-3.5 border border-slate-100 flex flex-col gap-2 text-xs sm:text-sm">
              <div className="flex items-center justify-between text-slate-800">
                <span className="font-medium truncate max-w-[200px]">
                  {course.title.split("–")[0]?.trim() || course.title} (Video + Tài liệu)
                </span>
                <span className="font-semibold">{formatCurrencyVND(course.price)}</span>
              </div>

              <div className="flex items-center justify-between text-slate-500 pt-1 border-t border-slate-200/60">
                <span>Tạm tính</span>
                <span>{formatCurrencyVND(course.price)}</span>
              </div>

              <div className="flex items-center justify-between text-slate-500">
                <span className="flex items-center gap-1.5">
                  <span>Giảm giá</span>
                  {appliedCouponCode && (
                    <span className="text-[10px] font-bold font-mono bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">
                      {appliedCouponCode}
                    </span>
                  )}
                </span>
                <span className={discountAmount > 0 ? "text-emerald-600 font-semibold" : ""}>
                  {discountAmount > 0 ? `-${formatCurrencyVND(discountAmount)}` : "0đ"}
                </span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-200 font-bold text-sm sm:text-base">
                <span className="text-slate-900">Tổng thanh toán:</span>
                <span className="text-xl font-extrabold text-red-600">
                  {formatCurrencyVND(finalPrice)}
                </span>
              </div>
            </div>
          </div>

          {/* NÚT HÀNH ĐỘNG CHÍNH: LẤY MÃ VIETQR */}
          <div className="pt-2 flex flex-col gap-2.5">
            <button
              type="submit"
              disabled={isCreatingOrder}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary hover:bg-primary/95 active:scale-[0.99] text-white py-3.5 px-4 font-bold text-sm sm:text-base shadow-md shadow-blue-500/25 transition-all cursor-pointer disabled:opacity-75"
            >
              {isCreatingOrder ? (
                <Loader2 className="size-5 animate-spin" />
              ) : (
                <QrCode className="size-5" />
              )}
              <span>
                {isCreatingOrder
                  ? "Đang khởi tạo đơn hàng..."
                  : "Xác nhận & Thanh toán"}
              </span>
            </button>
            <p className="text-[11px] text-center text-slate-400">
              Nhấn để tạo mã QR ngân hàng chính xác gắn liền với email của bạn.
            </p>
          </div>

          {/* Cam kết chân trang card */}
          <div className="flex items-center justify-center gap-4 text-[11px] font-medium text-slate-500 pt-3 border-t border-slate-100">
            <span className="flex items-center gap-1">
              <Lock className="size-3 text-emerald-600" />
              Bảo mật 100% qua Napas
            </span>
            <span>•</span>
            <span>⚡ Giao giáo trình tức thì</span>
          </div>
        </form>
      ) : (
        /* =========================================================================
            TRẠNG THÁI 2: ĐÃ TẠO ĐƠN PENDING -> BUNG MÃ VIETQR & ĐẾM NGƯỢC
            ========================================================================= */
        <div className="flex flex-col gap-5 animate-in fade-in duration-300">
          {/* Card thông tin người nhận đã khóa */}
          <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-200/80 flex items-center justify-between text-xs">
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-1.5 font-bold text-slate-900">
                <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                <span>{fullName}</span>
              </div>
              <p className="text-slate-500 pl-5.5">{email}</p>
            </div>

            <button
              type="button"
              onClick={() => setOrderStep("FORM")}
              className="text-xs font-semibold text-primary hover:underline cursor-pointer shrink-0 ml-2"
            >
              Đổi thông tin
            </button>
          </div>

          {/* Tóm tắt thanh toán */}
          <div className="flex items-center justify-between px-1 text-xs sm:text-sm font-semibold text-slate-700">
            <span>Tổng tiền cần thanh toán:</span>
            <span className="text-lg font-extrabold text-red-600">
              {formatCurrencyVND(orderResult?.amount || finalPrice)}
            </span>
          </div>

          {/* Bước 4: Chuyển khoản ngân hàng tự động (Quét QR BankNoti) */}
          <div className="flex flex-col gap-3 pt-3 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <span className="flex size-5 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-white">
                4
              </span>
              <h3 className="text-sm font-bold text-slate-900 leading-snug">
                Chuyển khoản ngân hàng tự động (Quét QR BankNoti)
              </h3>
            </div>

            <BankTransferCard
              orderCode={orderResult?.orderCode || "BL-8921"}
              amount={orderResult?.amount || finalPrice}
              bankInfo={course.bankInfo}
              orderId={orderResult?.orderId}
              qrCodeUrl={orderResult?.qrCodeUrl}
              checkoutUrl={orderResult?.checkoutUrl}
              onPaymentSuccess={(status) => {
                const targetCode = status.orderCode || orderResult?.orderCode || "";
                const targetId = status.orderId || orderResult?.orderId || "";
                router.push(`/checkout/success?orderCode=${targetCode}&orderId=${targetId}`);
              }}
              onChangeInfo={() => setOrderStep("FORM")}
            />
          </div>

          {/* Cam kết chân trang card */}
          <div className="flex items-center justify-center gap-4 text-[11px] font-medium text-slate-500 pt-3 border-t border-slate-100">
            <span className="flex items-center gap-1">
              <Lock className="size-3 text-emerald-600" />
              Bảo mật 100% qua Napas
            </span>
            <span>•</span>
            <span>⚡ Giao giáo trình tức thì</span>
          </div>
        </div>
      )}
    </aside>
  );
}
