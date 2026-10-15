"use client";

import * as React from "react";
import { Copy, Check, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { QRCodeSVG } from "qrcode.react";
import { orderApi } from "@/lib/api/order";
import { formatCurrencyVND } from "@/components/features/home/data/courses.data";
import type { CourseBankInfo } from "../types";
import type { OrderStatusResponse } from "@/lib/api/order";

interface BankTransferCardProps {
  orderCode: string;
  amount: number;
  bankInfo: CourseBankInfo;
  orderId?: string;
  qrCodeUrl?: string;
  checkoutUrl?: string;
  onPaymentSuccess?: (res: OrderStatusResponse) => void;
  onChangeInfo?: () => void;
}

export function BankTransferCard({
  orderCode,
  amount,
  bankInfo,
  orderId = "mock-order-id",
  qrCodeUrl,
  checkoutUrl,
  onPaymentSuccess,
  onChangeInfo,
}: BankTransferCardProps) {
  const [copied, setCopied] = React.useState(false);
  const [timeLeft, setTimeLeft] = React.useState(599); // 09:59 đếm ngược
  const [isManualChecking, setIsManualChecking] = React.useState(false);
  const [isPaid, setIsPaid] = React.useState(false);

  // 1. Đếm ngược thời gian thanh toán VietQR (10 phút)
  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 2. Cơ chế tự động lắng nghe (Auto-Polling mỗi 3 giây kiểm tra đối soát BankNoti)
  React.useEffect(() => {
    if (isPaid) return;

    const pollInterval = setInterval(async () => {
      try {
        const res = await orderApi.checkPaymentStatus(orderId);
        if (res.status === "PAID") {
          setIsPaid(true);
          clearInterval(pollInterval);
          toast.success(
            "Thanh toán thành công! Hệ thống đang chuyển đến trang nhận tài liệu..."
          );
          onPaymentSuccess?.(res);
        }
      } catch {
        // Polling background im lặng để không làm phiền người dùng
      }
    }, 3000);

    return () => clearInterval(pollInterval);
  }, [orderId, isPaid, onPaymentSuccess]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success(`Đã sao chép ${label}: ${text}`);
    setTimeout(() => setCopied(false), 2000);
  };

  // Kiểm tra thủ công phụ (phòng trường hợp mạng chậm)
  const handleManualCheck = async () => {
    setIsManualChecking(true);
    try {
      const res = await orderApi.checkPaymentStatus(orderId);
      if (res.status === "PAID") {
        setIsPaid(true);
        toast.success(
          "Thanh toán thành công! Hệ thống đang chuyển đến trang nhận tài liệu..."
        );
        onPaymentSuccess?.(res);
      } else {
        toast.info(
          "Hệ thống đang chờ tín hiệu chuyển khoản từ ngân hàng của bạn. Vui lòng hoàn tất trên App và đợi 1-3 giây!"
        );
      }
    } catch {
      toast.error("Không thể kết nối đến máy chủ. Vui lòng thử lại sau.");
    } finally {
      setIsManualChecking(false);
    }
  };

  // Chuỗi QR chuẩn VietQR (dự phòng)
  const qrString = `00020101021238540010A000000727012400069704360110${bankInfo.accountNumber}0208QRIBFTTA5303704540${amount}5802VN62${orderCode.length + 4}080${orderCode.length}${orderCode}6304`;

  return (
    <div className="flex flex-col gap-4">
      {/* Trạng thái chờ thanh toán */}
      <div className="flex items-center gap-3 rounded-xl bg-mint px-4 py-3 text-[15px] font-medium text-primary">
        <Loader2 className="size-5 shrink-0 animate-spin" />
        <span>Đang chờ thanh toán · tự động xác nhận</span>
      </div>

      {/* Mã VietQR + đếm ngược */}
      <div className="mx-auto flex flex-col items-center gap-2 rounded-2xl border border-border bg-white p-4 w-full">
        <div className="bg-white p-2 rounded-lg flex items-center justify-center min-w-[180px] min-h-[180px]">
          {qrCodeUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={qrCodeUrl}
              alt="Mã QR Chuyển khoản PayOS"
              className="w-48 h-auto rounded-md object-contain"
            />
          ) : (
            <QRCodeSVG value={qrString} size={180} level="M" includeMargin={false} fgColor="#1D2A2E" />
          )}
        </div>
        <p className="text-[15px] text-muted-foreground">
          Hết hạn sau{" "}
          <span className="font-mono font-bold text-price">{formatTimer(timeLeft)}</span>
        </p>
        {checkoutUrl && (
          <a
            href={checkoutUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-primary hover:underline mt-1"
          >
            Mở cổng thanh toán PayOS ↗
          </a>
        )}
      </div>

      {/* Thông tin chuyển khoản */}
      <dl className="overflow-hidden rounded-xl border border-border text-[15px]">
        <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
          <dt className="text-muted-foreground">Số tiền</dt>
          <dd className="text-lg font-bold text-price">{formatCurrencyVND(amount)}</dd>
        </div>
        <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
          <dt className="text-muted-foreground">Ngân hàng</dt>
          <dd className="font-semibold text-ink">{bankInfo.bankName}</dd>
        </div>
        <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
          <dt className="text-muted-foreground">Chủ TK</dt>
          <dd className="text-right font-semibold uppercase text-ink">{bankInfo.accountName}</dd>
        </div>
        <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
          <dt className="text-muted-foreground">Số TK</dt>
          <dd className="flex items-center gap-2">
            <span className="font-mono font-bold text-ink">{bankInfo.accountNumber}</span>
            <button
              type="button"
              onClick={() => copyToClipboard(bankInfo.accountNumber, "số tài khoản")}
              aria-label="Sao chép số tài khoản"
              className="flex size-9 items-center justify-center rounded-md text-muted-foreground hover:bg-mint hover:text-primary cursor-pointer"
            >
              <Copy className="size-4" />
            </button>
          </dd>
        </div>
        <div className="flex items-center justify-between gap-3 bg-[#FCEFE3] px-4 py-3">
          <dt className="text-muted-foreground">Nội dung</dt>
          <dd className="flex items-center gap-2">
            <span className="font-mono text-base font-bold text-ink">{orderCode}</span>
            <button
              type="button"
              onClick={() => copyToClipboard(orderCode, "nội dung chuyển khoản")}
              className="inline-flex h-10 items-center gap-1 rounded-lg border border-accent/50 bg-white px-3 text-sm font-semibold text-price cursor-pointer"
            >
              {copied ? <Check className="size-4" /> : null}
              Chép
            </button>
          </dd>
        </div>
      </dl>

      {/* Kiểm tra thủ công (phòng trường hợp mạng chậm) */}
      <button
        type="button"
        onClick={handleManualCheck}
        disabled={isManualChecking}
        className="flex h-14 w-full items-center justify-center gap-2 rounded-lg border-2 border-primary text-lg font-semibold text-primary transition-colors hover:bg-mint disabled:opacity-60 cursor-pointer"
      >
        {isManualChecking && <Loader2 className="size-5 animate-spin" />}
        Tôi đã chuyển khoản
      </button>

      {onChangeInfo && (
        <button
          type="button"
          onClick={onChangeInfo}
          className="min-h-11 text-[15px] font-medium text-muted-foreground hover:text-primary cursor-pointer"
        >
          Đổi thông tin nhận khóa học
        </button>
      )}
    </div>
  );
}
