"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, ExternalLink, Info, Loader2, Mail, QrCode, X } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { orderApi } from "@/lib/api/order";
import { directCheckoutSchema, type DirectCheckoutFormData } from "@/lib/schemas/checkout.schema";
import { formatCurrencyVND } from "@/components/features/home/data/courses.data";
import { CouponInput } from "./CouponInput";
import { BankTransferCard } from "./BankTransferCard";
import type { CourseDetail, CouponApplyResult, OrderCreationResult } from "../types";

type CheckoutStep = "INFO" | "PAYMENT" | "DONE";

const STEPS: readonly { id: CheckoutStep; label: string }[] = [
  { id: "INFO", label: "Thông tin" },
  { id: "PAYMENT", label: "Thanh toán" },
  { id: "DONE", label: "Hoàn tất" },
] as const;

interface CheckoutDialogProps {
  course: CourseDetail;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 * Modal thanh toán 3 bước (Direct Checkout):
 * Thông tin → Tạo Order PENDING + VietQR → Hoàn tất (sau khi Backend xác nhận PAID).
 * Giá cuối cùng luôn lấy từ Backend (coupon API / order API).
 */
export function CheckoutDialog({ course, open, onOpenChange }: CheckoutDialogProps) {
  const [step, setStep] = React.useState<CheckoutStep>("INFO");
  const [appliedCouponCode, setAppliedCouponCode] = React.useState("");
  const [finalPrice, setFinalPrice] = React.useState(course.price);
  const [orderResult, setOrderResult] = React.useState<OrderCreationResult | null>(null);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<DirectCheckoutFormData>({
    resolver: zodResolver(directCheckoutSchema),
    defaultValues: { fullName: "", email: "" },
  });

  const handleCouponApplied = (result: CouponApplyResult) => {
    setAppliedCouponCode(result.isApplied ? result.code : "");
    setFinalPrice(result.isApplied ? result.finalPrice : course.price);
  };

  const onSubmit = async (data: DirectCheckoutFormData) => {
    try {
      const res = await orderApi.createOrder({
        courseId: course.id,
        courseSlug: course.slug,
        customerName: data.fullName.trim(),
        customerEmail: data.email.trim(),
        amount: finalPrice,
        couponCode: appliedCouponCode || undefined,
      });
      setOrderResult(res);
      setStep("PAYMENT");
    } catch {
      toast.error("Không thể tạo đơn hàng, vui lòng thử lại sau.");
    }
  };

  const handlePaymentSuccess = React.useCallback(() => {
    setStep("DONE");
  }, []);

  const activeIndex = STEPS.findIndex((s) => s.id === step);
  const courseShortTitle = course.title.split("–")[0]?.trim() || course.title;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="flex max-h-[calc(100dvh-1rem)] w-full max-w-[calc(100%-1rem)] flex-col gap-0 overflow-hidden rounded-3xl bg-white p-0 sm:max-w-[840px]"
      >
        {/* Thanh bước */}
        <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-4 sm:px-7">
          <ol className="flex flex-1 items-center gap-2 sm:gap-3">
            {STEPS.map((s, index) => (
              <li key={s.id} className="flex items-center gap-2 sm:gap-3">
                <span
                  className={cn(
                    "flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold",
                    index <= activeIndex ? "bg-primary text-white" : "bg-[#EEE9DF] text-muted-foreground"
                  )}
                >
                  {index + 1}
                </span>
                <span
                  className={cn(
                    "text-[15px] font-semibold",
                    index === activeIndex ? "text-ink" : "hidden text-muted-foreground sm:inline"
                  )}
                >
                  {s.label}
                </span>
                {index < STEPS.length - 1 && <span className="hidden h-px w-10 bg-border sm:block" />}
              </li>
            ))}
          </ol>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            aria-label="Đóng"
            className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-border text-ink hover:bg-cream cursor-pointer"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="grid flex-1 grid-cols-1 overflow-y-auto md:grid-cols-[300px_1fr]">
          {/* Tóm tắt khóa học */}
          <aside className="border-b border-border bg-cream p-5 md:border-b-0 md:border-r md:p-7">
            <div className="flex gap-4 md:block">
              <div className="relative aspect-[4/3] w-24 shrink-0 overflow-hidden rounded-xl bg-mint md:w-full">
                <Image src={course.image} alt={course.title} fill sizes="(min-width: 768px) 240px, 96px" className="object-cover" />
              </div>
              <div className="md:mt-4">
                <p className="text-base font-semibold leading-snug text-ink md:text-lg">{courseShortTitle}</p>
                <p className="mt-1 text-sm text-muted-foreground">{course.typeBadge}</p>
              </div>
            </div>
            <div className="mt-4 space-y-2 border-t border-dashed border-border pt-4 text-[15px]">
              {course.originalPrice > course.price && (
                <div className="flex justify-between text-muted-foreground">
                  <span>Giá gốc</span>
                  <span className="line-through">{formatCurrencyVND(course.originalPrice)}</span>
                </div>
              )}
              <div className="flex items-baseline justify-between">
                <span className="font-semibold text-ink">Thanh toán</span>
                <span className="text-2xl font-bold text-price">
                  {formatCurrencyVND(orderResult?.amount ?? finalPrice)}
                </span>
              </div>
            </div>
          </aside>

          {/* Nội dung từng bước */}
          <div className="p-5 sm:p-7">
            {step === "INFO" && (
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
                <DialogTitle className="font-heading text-2xl font-bold text-ink">Thông tin nhận khóa học</DialogTitle>

                <div>
                  <label htmlFor="checkout-fullName" className="mb-1.5 block text-[15px] font-medium text-ink">
                    Họ và tên *
                  </label>
                  <input
                    id="checkout-fullName"
                    type="text"
                    autoComplete="name"
                    placeholder="Nguyễn Văn A"
                    className={cn(
                      "h-12 w-full rounded-lg border bg-white px-4 text-base text-ink placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20",
                      errors.fullName ? "border-destructive" : "border-input focus:border-primary"
                    )}
                    {...register("fullName")}
                  />
                  {errors.fullName && <p className="mt-1 text-sm text-destructive">{errors.fullName.message}</p>}
                </div>

                <div>
                  <label htmlFor="checkout-email" className="mb-1.5 block text-[15px] font-medium text-ink">
                    Email nhận khóa học *
                  </label>
                  <input
                    id="checkout-email"
                    type="email"
                    autoComplete="email"
                    placeholder="email@example.com"
                    className={cn(
                      "h-12 w-full rounded-lg border bg-white px-4 text-base text-ink placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20",
                      errors.email ? "border-destructive" : "border-input focus:border-primary"
                    )}
                    {...register("email")}
                  />
                  {errors.email ? (
                    <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>
                  ) : (
                    <p className="mt-1.5 flex items-start gap-1.5 text-sm text-primary">
                      <Info className="mt-0.5 size-4 shrink-0" />
                      Link khóa học sẽ gửi tới email này – vui lòng kiểm tra đúng chính tả.
                    </p>
                  )}
                </div>

                <div>
                  <p className="mb-1.5 text-[15px] font-medium text-ink">Mã giảm giá</p>
                  <CouponInput courseId={course.id} originalPrice={course.price} onCouponApplied={handleCouponApplied} />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-1 flex h-14 w-full items-center justify-center gap-2 rounded-lg bg-primary text-lg font-semibold text-white transition-colors hover:bg-primary/90 disabled:opacity-70 cursor-pointer"
                >
                  {isSubmitting ? <Loader2 className="size-5 animate-spin" /> : <QrCode className="size-5" />}
                  {isSubmitting ? "Đang tạo đơn hàng..." : "Tạo mã QR thanh toán"}
                </button>
                <p className="text-center text-sm text-muted-foreground">
                  Bấm nút là bạn đồng ý với{" "}
                  <Link href="/dieu-khoan-su-dung" className="text-primary underline">
                    Điều khoản
                  </Link>{" "}
                  và{" "}
                  <Link href="/chinh-sach-thanh-toan" className="text-primary underline">
                    Chính sách thanh toán
                  </Link>
                  .
                </p>
              </form>
            )}

            {step === "PAYMENT" && orderResult && (
              <div className="flex flex-col gap-4">
                <DialogTitle className="font-heading text-2xl font-bold text-ink">Quét QR thanh toán</DialogTitle>
                <BankTransferCard
                  orderCode={orderResult.orderCode}
                  amount={orderResult.amount}
                  bankInfo={{
                    bankName: orderResult.bankName || course.bankInfo?.bankName || "MBBANK",
                    accountName: orderResult.accountName || course.bankInfo?.accountName || "HA VAN MANH",
                    accountNumber: orderResult.accountNumber || course.bankInfo?.accountNumber || "0399046519",
                    orderCodePrefix: course.bankInfo?.orderCodePrefix || "BL",
                  }}
                  orderId={orderResult.orderId}
                  qrCodeUrl={orderResult.qrCodeUrl}
                  checkoutUrl={orderResult.checkoutUrl}
                  onPaymentSuccess={handlePaymentSuccess}
                  onChangeInfo={() => setStep("INFO")}
                />
              </div>
            )}

            {step === "DONE" && (
              <div className="flex flex-col items-center gap-5 py-4 text-center sm:py-6">
                <div className="relative flex size-20 items-center justify-center rounded-full bg-mint">
                  <CheckCircle2 className="size-12 text-primary" />
                </div>

                <div>
                  <DialogTitle className="font-heading text-2xl font-bold text-ink sm:text-3xl">
                    Thanh toán thành công!
                  </DialogTitle>
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    Đơn hàng{" "}
                    <span className="font-mono font-bold text-primary">
                      #{orderResult?.orderCode || "BL"}
                    </span>{" "}
                    đã được kích hoạt tự động qua VietQR BankNoti.
                  </p>
                </div>

                <div className="w-full rounded-2xl border border-border bg-cream p-4 text-left sm:p-5">
                  <div className="flex items-start gap-3">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-mint text-primary">
                      <Mail className="size-5" />
                    </div>
                    <div className="space-y-1 text-sm">
                      <p className="font-semibold text-ink">
                        Tài liệu học tập đã được gửi tới:
                      </p>
                      <p className="font-mono font-bold text-primary">
                        {getValues("email")}
                      </p>
                      <p className="text-xs text-muted-foreground leading-relaxed pt-1">
                        Hệ thống đã tự động gửi email kèm đường link truy cập tài liệu và khóa học trọn đời. Vui lòng kiểm tra hộp thư đến (Inbox) hoặc mục Quảng cáo / Thư rác (Spam).
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex w-full flex-col gap-3 sm:flex-row">
                  <a
                    href="https://mail.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-13 flex-1 items-center justify-center gap-2 rounded-lg bg-primary text-base font-semibold text-white transition-colors hover:bg-primary/90 cursor-pointer"
                  >
                    <ExternalLink className="size-4" />
                    Mở hòm thư Gmail
                  </a>
                  <button
                    type="button"
                    onClick={() => onOpenChange(false)}
                    className="flex h-13 flex-1 items-center justify-center rounded-lg border border-border bg-white text-base font-semibold text-ink transition-colors hover:bg-cream cursor-pointer"
                  >
                    Đóng
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
