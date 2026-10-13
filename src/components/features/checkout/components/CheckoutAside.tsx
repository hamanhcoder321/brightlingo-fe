"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState } from "react";
import Icon from "@/components/common/MaterialIcon";

// =====================================================================
// KHUNG THANH TOÁN (cột phải) - làm y hệt thiết kế.
// Tìm "[BIẾN]" để thấy chỗ nào sau này thay bằng dữ liệu thật.
// Các giá trị điền sẵn (Nguyễn Văn Anh, BRIGHT50, ...) chỉ là demo của Stitch.
// =====================================================================
export default function CheckoutAside() {
  // [BIẾN] form.fullName  - họ tên khách nhập (demo: điền sẵn)
  const [fullName, setFullName] = useState("Nguyễn Văn Anh");
  // [BIẾN] form.email     - email nhận tài liệu (demo: điền sẵn)
  const [email, setEmail] = useState("nguyenvan@gmail.com");
  // [BIẾN] coupon.code    - mã giảm giá khách nhập (demo: điền sẵn)
  const [coupon, setCoupon] = useState("BRIGHT50");

  // Đếm ngược phiên QR. [BIẾN] payment.expiresAt (tính số giây còn lại từ giờ hết hạn backend trả về)
  const [timeLeft, setTimeLeft] = useState(14 * 60 + 59);
  const [checking, setChecking] = useState(false);
  const [paid, setPaid] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const successRef = useRef<HTMLDivElement>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const id = setInterval(() => setTimeLeft((t) => (t <= 0 ? 0 : t - 1)), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(
    () => () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    },
    [],
  );

  const mins = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const secs = String(timeLeft % 60).padStart(2, "0");

  function copyText(text: string, message: string) {
    navigator.clipboard.writeText(text).then(() => {
      setToast(message);
      if (toastTimer.current) clearTimeout(toastTimer.current);
      toastTimer.current = setTimeout(() => setToast(null), 1800);
    });
  }

  // GIẢ LẬP của Stitch. Khi có API: gọi GET trạng thái đơn, chỉ hiện thành công khi backend trả "paid".
  // [BIẾN] order.status  ("pending" | "paid" | "cancelled")  <- backend trả về
  function simulatePaymentVerification() {
    setChecking(true);
    setTimeout(() => {
      setChecking(false);
      setPaid(true);
      setTimeout(
        () => successRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }),
        50,
      );
    }, 1200);
  }

  return (
    <>
      <aside className="lg:col-span-5 sticky top-20 flex flex-col gap-4" id="checkout-section">
        <div className="bg-surface-container-lowest rounded-xl p-6 border border-slate-200/90 shadow-[0_10px_15px_-3px_rgba(15,23,42,0.06),0_4px_6px_-4px_rgba(15,23,42,0.04)] flex flex-col gap-6">
          {/* ===== Tiêu đề hộp ===== */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Icon name="lock" fill className="text-base" />
              </span>
              <div>
                <h2 className="text-headline-sm font-headline-sm text-on-surface">Thanh toán an toàn</h2>
                <p className="text-label-sm font-label-sm text-brand-secondary">Mua một lần, học trọn đời</p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full text-label-sm font-label-sm bg-emerald-50 text-emerald-700 font-medium border border-emerald-100 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Bảo mật SSL
            </span>
          </div>

          {/* ===== Bước 1: Thông tin khách ===== */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <label className="text-label-lg font-label-lg text-on-surface flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-primary-container text-white text-xs flex items-center justify-center font-bold">1</span>
                Thông tin nhận khóa học
              </label>
              <span className="text-body-sm font-body-sm text-emerald-600 font-medium">Chỉ cần Họ tên &amp; Email nhận link</span>
            </div>
            <div className="flex flex-col gap-2.5">
              <div>
                <label className="block text-body-sm font-body-sm text-brand-secondary mb-1">Họ và tên học viên</label>
                {/* [BIẾN] form.fullName */}
                <input
                  className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-body-md font-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-body-sm font-body-sm text-brand-secondary mb-1">
                  Email của bạn <span className="text-error">*</span>
                </label>
                {/* [BIẾN] form.email */}
                <input
                  className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-body-md font-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
                  id="customer-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <p className="text-body-sm font-body-sm text-brand-secondary mt-1 flex items-start gap-1">
                  <Icon name="info" className="text-sm text-primary-container mt-0.5" />
                  Chúng tôi sẽ gửi khóa học và hướng dẫn vào email này ngay sau khi thanh toán thành công.
                </p>
              </div>
            </div>
          </div>

          {/* ===== Bước 2: Mã giảm giá ===== */}
          <div className="flex flex-col gap-2 pt-2 border-t border-slate-100">
            <label className="text-label-lg font-label-lg text-on-surface flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-primary-container text-white text-xs flex items-center justify-center font-bold">2</span>
              Mã giảm giá
            </label>
            <div className="flex gap-2">
              {/* [BIẾN] coupon.code */}
              <input
                className="flex-grow h-11 px-3.5 rounded-xl border border-slate-300 text-body-md font-body-md uppercase text-on-surface focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                placeholder="Nhập mã giảm giá"
                type="text"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
              />
              {/* Bấm "Áp dụng" -> gọi API xem trước mã giảm giá (backend tính số tiền giảm) */}
              <button className="px-5 h-11 rounded-xl bg-surface-container-high hover:bg-slate-300 text-on-surface font-semibold text-label-md font-label-md transition-colors" type="button">
                Áp dụng
              </button>
            </div>
            {/* [BIẾN] coupon.message (thành công/lỗi) và coupon.discount (số tiền giảm) - backend trả về */}
            <div className="flex items-center gap-1.5 text-label-sm font-label-sm text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100">
              <Icon name="check_circle" fill className="text-sm" />
              Áp dụng mã BRIGHT50 thành công - giảm 0đ (Khóa học đã áp dụng giá ưu đãi tốt nhất)
            </div>
          </div>

          {/* ===== Bước 3: Tóm tắt đơn hàng ===== */}
          <div className="flex flex-col gap-2.5 pt-2 border-t border-slate-100">
            <label className="text-label-lg font-label-lg text-on-surface flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-primary-container text-white text-xs flex items-center justify-center font-bold">3</span>
              Tóm tắt đơn hàng
            </label>
            <div className="p-3.5 rounded-xl bg-surface-container-low flex flex-col gap-2 border border-slate-200/60">
              <div className="flex items-center justify-between text-body-md font-body-md">
                {/* [BIẾN] course.name  |  course.price */}
                <span className="text-on-surface font-medium">English for Real Life (Video + Tài liệu)</span>
                <span className="font-semibold text-on-surface">399.000đ</span>
              </div>
              <div className="flex items-center justify-between text-body-sm font-body-sm text-brand-secondary">
                <span>Tạm tính</span>
                {/* [BIẾN] order.subtotal */}
                <span>399.000đ</span>
              </div>
              <div className="flex items-center justify-between text-body-sm font-body-sm text-brand-secondary">
                <span>Giảm giá</span>
                {/* [BIẾN] order.discount */}
                <span className="text-emerald-600 font-medium">0đ</span>
              </div>
              <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between">
                <span className="text-label-lg font-label-lg text-on-surface font-bold">Tổng thanh toán:</span>
                {/* [BIẾN] order.total  (backend tính, FE chỉ hiển thị) */}
                <span className="text-price-lg font-price-lg text-error font-extrabold">399.000đ</span>
              </div>
            </div>
          </div>

          {/* ===== Bước 4: QR BankNoti ===== */}
          <div className="flex flex-col gap-3 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <label className="text-label-lg font-label-lg text-on-surface flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-primary-container text-white text-xs flex items-center justify-center font-bold">4</span>
                Chuyển khoản ngân hàng tự động (Quét QR BankNoti)
              </label>
            </div>

            <div className="rounded-xl border border-blue-200 bg-blue-50/40 p-4 flex flex-col gap-4">
              {/* Trạng thái + đếm ngược */}
              <div className="flex items-center justify-between bg-white px-3.5 py-2 rounded-lg border border-blue-100 shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 border-2 border-primary-container border-t-transparent rounded-full animate-spin" />
                  {/* [BIẾN] order.status === "pending" -> "Đang chờ thanh toán..." */}
                  <span className="text-label-md font-label-md text-primary-container">Đang chờ thanh toán...</span>
                </div>
                <div className="flex items-center gap-1 text-label-sm font-label-sm text-brand-secondary bg-surface-container-low px-2 py-0.5 rounded">
                  <Icon name="timer" className="text-xs" />
                  {/* [BIẾN] payment.expiresAt */}
                  <span className="font-mono font-bold text-on-surface" id="countdown-timer">
                    {mins}:{secs}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                {/* QR */}
                <div className="sm:col-span-5 flex flex-col items-center justify-center">
                  <div className="p-2.5 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col items-center">
                    {/* [BIẾN] payment.qrImageUrl  (ảnh VietQR backend/BankNoti trả về) */}
                    <img
                      className="w-36 h-36 object-contain rounded-lg"
                      alt="Mã QR chuyển khoản VietQR"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAC8qkwVIFJoqpxZ3jGb62eebmfXI9M59Uih-Q9oEcokNMOLfO1ROcBrRq_N_BLIf3UqQJK-7Z-0MbqwtBe9DjZ8PIpgzz6b-hmPLYIS_0QCrxjmx9zN_-gueN0GG0nCPh3OXdSFeq8SEU1JUHzd6Ff9ZVnk_nuhlx83Cn-uncYhSDkzZup7945QovohVs_7P7n8Na2YZPHEHY0zHbRPgk41hGJktLMKioeFgzbJVYAW6k3Qq2VUG1SCA"
                    />
                    <span className="text-label-sm font-label-sm text-brand-secondary mt-1">Quét bằng App Ngân hàng</span>
                  </div>
                </div>

                {/* Thông tin tài khoản */}
                <div className="sm:col-span-7 flex flex-col gap-2.5 text-body-sm font-body-sm">
                  <div className="flex items-center justify-between py-1 border-b border-blue-100">
                    <span className="text-brand-secondary">Ngân hàng</span>
                    <span className="font-bold text-on-surface flex items-center gap-1">
                      {/* [BIẾN] payment.bankName */}
                      <span className="text-emerald-600 font-extrabold">VIETCOMBANK</span>
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-blue-100">
                    <span className="text-brand-secondary">Chủ tài khoản</span>
                    {/* [BIẾN] payment.accountName */}
                    <span className="font-semibold text-on-surface">NGUYEN THI ANH</span>
                  </div>
                  {/* (Stitch để trống dòng Số tài khoản) */}
                  <div className="flex items-center justify-between py-1">
                    <span className="text-brand-secondary">Nội dung CK</span>
                    <div className="flex items-center gap-1.5">
                      {/* [BIẾN] payment.orderCode  (mã đơn = nội dung chuyển khoản) */}
                      <span className="font-mono font-bold text-error bg-red-50 px-2 py-0.5 rounded border border-red-200" id="memo-code">
                        BL8901
                      </span>
                      <button
                        className="px-2 py-0.5 rounded-full bg-blue-100 hover:bg-blue-200 text-primary-container text-label-sm font-label-sm transition-colors flex items-center gap-0.5"
                        onClick={() => copyText("BL8901", "Đã chép nội dung!")}
                        title="Sao chép nội dung chuyển khoản"
                        type="button"
                      >
                        <Icon name="content_copy" className="text-xs" />
                        Sao chép
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ghi chú BankNoti */}
              <p className="text-body-sm font-body-sm text-brand-secondary bg-white/80 p-2.5 rounded-lg border border-blue-100 flex items-start gap-1.5">
                <Icon name="bolt" className="text-base text-primary-container flex-shrink-0 mt-0.5" />
                <span>
                  Sau khi chuyển khoản, hệ thống <strong>BankNoti</strong> tự động xác nhận và gửi link khóa học vào email của bạn trong vòng 1-3 phút.
                </span>
              </p>

              {/* Nút kiểm tra */}
              <button
                className="w-full py-3.5 px-4 rounded-full bg-primary-container hover:bg-brand-primary text-white text-label-lg font-label-lg font-bold shadow-md hover:shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                disabled={checking}
                id="confirm-payment-btn"
                onClick={simulatePaymentVerification}
                type="button"
              >
                {checking ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Đang kiểm tra BankNoti...
                  </>
                ) : (
                  <>
                    <Icon name="sync" />
                    Tôi đã chuyển khoản - Kiểm tra trạng thái
                  </>
                )}
              </button>

              {/* Thẻ thành công (chỉ hiện khi đã Paid) */}
              {paid && (
                <div
                  ref={successRef}
                  className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex flex-col gap-2 transition-all"
                  id="payment-success-card"
                >
                  <div className="flex items-center gap-2 text-emerald-800 font-bold text-label-lg font-label-lg">
                    <Icon name="check_circle" fill className="text-emerald-600 text-2xl" />
                    Xác nhận thành công!
                  </div>
                  <p className="text-body-sm font-body-sm text-emerald-800">
                    {/* [BIẾN] form.email */}
                    Đã gửi link học và mã kích hoạt trọn đời về email <strong>{email}</strong>. Vui lòng kiểm tra hộp thư đến &amp; Spam.
                  </p>
                  <div className="pt-2 flex gap-2">
                    <a className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-label-sm font-label-sm text-center flex-grow transition-colors" href="#">
                      Vào học ngay trên Web
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ===== Huy hiệu tin cậy ===== */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-brand-secondary text-label-sm font-label-sm">
            <div className="flex items-center gap-1.5">
              <Icon name="verified_user" className="text-base text-emerald-600" />
              <span>Bảo mật 100% qua Napas</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Icon name="schedule_send" className="text-base text-primary-container" />
              <span>Giao giáo trình tức thì</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Toast "Đã sao chép" */}
      <div
        className={`fixed bottom-6 right-6 px-4 py-2 bg-on-surface text-white text-label-sm font-label-sm rounded-lg shadow-lg pointer-events-none transition-opacity duration-200 z-50 ${toast ? "opacity-100" : "opacity-0"}`}
        id="copy-toast"
      >
        {toast ?? "Đã sao chép!"}
      </div>
    </>
  );
}
