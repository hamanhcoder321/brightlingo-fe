"use client";

import * as React from "react";
import { Copy, Check, Clock, Zap, Loader2, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { QRCodeSVG } from "qrcode.react";
import { orderApi } from "@/lib/api/order";
import type { CourseBankInfo } from "../types";
import type { OrderStatusResponse } from "@/lib/api/order";

interface BankTransferCardProps {
  orderCode: string;
  amount: number;
  bankInfo: CourseBankInfo;
  orderId?: string;
  onPaymentSuccess?: (res: OrderStatusResponse) => void;
  onChangeInfo?: () => void;
}

export function BankTransferCard({
  orderCode,
  amount,
  bankInfo,
  orderId = "mock-order-id",
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
    return `${mins < 10 ? "0" : ""}${mins} : ${secs < 10 ? "0" : ""}${secs}`;
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

  // Chuỗi QR chuẩn VietQR
  const qrString = `00020101021238540010A000000727012400069704360110${bankInfo.accountNumber}0208QRIBFTTA5303704540${amount}5802VN62${orderCode.length + 4}080${orderCode.length}${orderCode}6304`;

  return (
    <div className="flex flex-col gap-4">
      {/* Thanh trạng thái đếm ngược */}
      <div className="flex items-center justify-between rounded-xl bg-blue-50/80 px-4 py-2.5 border border-blue-100/80 text-xs sm:text-sm">
        <div className="flex items-center gap-2 font-medium text-blue-700">
          <span className="size-2 rounded-full bg-blue-500 animate-ping" />
          <span>Đang chờ chuyển khoản...</span>
        </div>
        <div className="flex items-center gap-1.5 font-bold font-mono text-slate-700 bg-white px-2.5 py-1 rounded-md shadow-xs border border-slate-200">
          <Clock className="size-3.5 text-amber-500" />
          <span>{formatTimer(timeLeft)}</span>
        </div>
      </div>

      {/* Box hiển thị mã VietQR & Thông tin tài khoản */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row items-center gap-5">
          {/* Cột QR */}
          <div className="flex flex-col items-center gap-1.5 shrink-0 bg-slate-50 p-3 rounded-xl border border-slate-200/80">
            <div className="bg-white p-2 rounded-lg shadow-xs">
              <QRCodeSVG
                value={qrString}
                size={140}
                level="M"
                includeMargin={false}
              />
            </div>
            <span className="text-[11px] font-semibold text-slate-500">
              Quét bằng App Ngân hàng
            </span>
          </div>

          {/* Cột chi tiết thông tin chuyển khoản */}
          <div className="flex-1 w-full flex flex-col gap-2.5 text-xs sm:text-sm">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-slate-500">Ngân hàng</span>
              <span className="font-bold text-emerald-700">{bankInfo.bankName}</span>
            </div>

            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-slate-500">Chủ tài khoản</span>
              <span className="font-bold text-slate-900 uppercase">
                {bankInfo.accountName}
              </span>
            </div>

            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-slate-500">Số tài khoản</span>
              <button
                type="button"
                onClick={() => copyToClipboard(bankInfo.accountNumber, "số tài khoản")}
                className="flex items-center gap-1 font-mono font-bold text-slate-900 hover:text-primary transition-colors cursor-pointer group"
                title="Bấm để sao chép STK"
              >
                <span>{bankInfo.accountNumber}</span>
                <Copy className="size-3.5 text-slate-400 group-hover:text-primary transition-colors" />
              </button>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-slate-500">Nội dung CK</span>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-md border border-orange-200">
                  {orderCode}
                </span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(orderCode, "nội dung chuyển khoản")}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary/80 transition-colors cursor-pointer"
                >
                  {copied ? (
                    <Check className="size-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="size-3.5" />
                  )}
                  <span>Sao chép</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chú thích tự động xác nhận BankNoti */}
      <div className="flex items-start gap-2.5 rounded-xl bg-blue-50/60 p-3 text-xs text-blue-900 border border-blue-100/60 leading-relaxed">
        <Zap className="size-4 shrink-0 text-amber-500 fill-amber-500 mt-0.5" />
        <span>
          Sau khi chuyển khoản thành công, hệ thống <strong>BankNoti</strong> tự động ghi nhận và chuyển hướng bạn sang trang nhận tài liệu sau <strong>3–5 giây</strong>.
        </span>
      </div>

      {/* KHUNG TRẠNG THÁI TỰ ĐỘNG LẮNG NGHE (Thay thế nút bấm thủ công to) */}
      <div className="flex flex-col items-center justify-center rounded-2xl bg-slate-50/90 border border-slate-200 p-4 text-center gap-2">
        <div className="flex items-center gap-2 text-primary font-semibold text-xs sm:text-[13px]">
          <span className="relative flex size-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full size-2.5 bg-primary"></span>
          </span>
          <span>Đang tự động đối soát giao dịch từ ngân hàng...</span>
        </div>
        <p className="text-[11px] text-slate-500 max-w-sm leading-normal">
          Bạn chỉ cần thực hiện chuyển khoản trên App ngân hàng. Trang web sẽ <strong>tự động chuyển trang</strong> ngay khi tiền vào tài khoản.
        </p>

        {/* Nút kiểm tra thủ công nhỏ phụ (phòng trường hợp khẩn cấp) */}
        <div className="flex items-center gap-3 pt-1 text-[11px]">
          <button
            type="button"
            onClick={handleManualCheck}
            disabled={isManualChecking}
            className="inline-flex items-center gap-1 text-slate-500 hover:text-primary transition-colors cursor-pointer"
          >
            {isManualChecking ? (
              <Loader2 className="size-3 animate-spin" />
            ) : (
              <RefreshCw className="size-3" />
            )}
            <span>Kiểm tra lại thủ công</span>
          </button>

          {onChangeInfo && (
            <>
              <span className="text-slate-300">•</span>
              <button
                type="button"
                onClick={onChangeInfo}
                className="text-slate-500 hover:text-primary transition-colors cursor-pointer"
              >
                Đổi thông tin nhận link
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
