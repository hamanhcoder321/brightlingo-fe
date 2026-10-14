"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState } from "react";
import Icon from "@/components/common/MaterialIcon";

// =====================================================================
// TRANG THANH TOÁN THÀNH CÔNG - làm y hệt thiết kế.
// Tìm "[BIẾN]" để thấy chỗ nào sau này thay bằng dữ liệu thật.
// Tìm "[LƯU Ý BA]" để thấy chỗ thiết kế khác tài liệu BA (cần cả nhóm chốt).
// =====================================================================
export default function SuccessContent() {
  // Nút "Gửi lại email tài liệu": giả lập của Stitch (1,2s -> thành công, 8s sau trả về ban đầu)
  const [resendState, setResendState] = useState<"idle" | "sending" | "sent">("idle");
  const [showResendAlert, setShowResendAlert] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const list = timers.current;
    return () => list.forEach(clearTimeout);
  }, []);

  // [LƯU Ý BA] Theo BA (mục 9.1, BR-05/06) chỉ ADMIN được "Gửi lại tài liệu" (có confirm + audit).
  // Nút này dành cho khách -> cần chốt có giữ không. Nếu giữ: gọi API resend theo order + email, có giới hạn số lần.
  function handleResendEmail() {
    setResendState("sending");
    timers.current.push(
      setTimeout(() => {
        setResendState("sent");
        setShowResendAlert(true);
        timers.current.push(setTimeout(() => setResendState("idle"), 8000));
      }, 1200),
    );
  }

  return (
    <main className="flex-grow w-full max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-label-md font-label-md text-brand-secondary mb-6">
        <a className="hover:text-brand-primary transition-colors" href="#">Trang chủ</a>
        <Icon name="chevron_right" className="text-[14px]" />
        <a className="hover:text-brand-primary transition-colors" href="#">Thanh toán an toàn</a>
        <Icon name="chevron_right" className="text-[14px]" />
        <span className="text-brand-primary font-bold">Xác nhận đơn hàng</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ============ CỘT TRÁI (8) ============ */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* ----- Thẻ chúc mừng ----- */}
          <div className="bg-surface-container-lowest rounded-xl p-6 md:p-8 border border-slate-100 shadow-[0_1px_3px_0_rgba(15,23,42,0.05),0_1px_2px_-1px_rgba(15,23,42,0.05)] relative overflow-hidden">
            <div className="absolute -right-16 -top-16 w-56 h-56 bg-secondary-fixed/40 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -left-12 -bottom-12 w-48 h-48 bg-emerald-50 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6 pb-6 border-b border-surface-container">
              <div className="relative flex-shrink-0">
                <div className="absolute inset-0 rounded-full bg-emerald-100 pulse-glow" />
                <div className="relative w-16 h-16 rounded-full bg-emerald-500 text-on-primary flex items-center justify-center shadow-lg shadow-emerald-500/20">
                  <Icon name="check" fill className="text-[36px]" />
                </div>
              </div>
              <div className="flex-grow">
                <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
                  {/* [BIẾN] order.status === "paid" */}
                  <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-label-sm font-label-sm px-3 py-1 rounded-full border border-emerald-200">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    Đã thanh toán (Paid)
                  </span>
                  <span className="text-brand-secondary text-body-sm font-body-sm">
                    Đối soát tự động qua VietQR BankNoti
                  </span>
                </div>
                <h1 className="text-headline-lg font-headline-lg text-on-surface mb-2">
                  Thanh toán thành công &amp; Đơn hàng đã được kích hoạt!
                </h1>
                <p className="text-brand-secondary text-body-md font-body-md">
                  Cảm ơn bạn đã lựa chọn BrightLingo. Tài nguyên học tập và quyền truy cập khóa học trọn đời đã sẵn sàng cho bạn.
                </p>
              </div>
            </div>

            {/* Dải thông tin giao dịch.
                (Mình thêm "relative z-10" để chữ không bị vòng tròn mờ phía sau che mất - trong ảnh Stitch dòng "Mã đơn hàng" bị mờ vì lỗi này.) */}
            <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
              <div>
                <div className="text-brand-secondary text-label-sm font-label-sm mb-1">Mã đơn hàng</div>
                {/* [BIẾN] order.code */}
                <div className="text-on-surface font-headline-sm text-headline-sm font-bold text-brand-primary">#BL-8921</div>
              </div>
              <div>
                <div className="text-brand-secondary text-label-sm font-label-sm mb-1">Thời gian giao dịch</div>
                {/* [BIẾN] order.paidAt  (định dạng ngày giờ, hoặc "Vừa xong") */}
                <div className="text-on-surface text-body-md font-body-md font-medium">Vừa xong (Real-time)</div>
              </div>
              <div>
                <div className="text-brand-secondary text-label-sm font-label-sm mb-1">Phương thức</div>
                {/* [BIẾN] payment.method */}
                <div className="text-on-surface text-body-md font-body-md font-medium flex items-center gap-1">
                  <Icon name="qr_code_2" className="text-brand-primary text-[18px]" />
                  VietQR Chuyển khoản
                </div>
              </div>
              <div>
                <div className="text-brand-secondary text-label-sm font-label-sm mb-1">Tổng tiền thanh toán</div>
                {/* [BIẾN] order.total */}
                <div className="text-error text-price-sm font-price-sm font-bold">399.000đ</div>
              </div>
            </div>
          </div>

          {/* ----- Giao tài liệu số ----- */}
          <div className="bg-surface-container-lowest rounded-xl p-6 md:p-8 border border-blue-100 shadow-[0_1px_3px_0_rgba(15,23,42,0.05),0_1px_2px_-1px_rgba(15,23,42,0.05)]">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full bg-blue-50 text-primary-container flex items-center justify-center">
                <Icon name="mark_email_read" fill className="text-[24px]" />
              </div>
              <div>
                <h2 className="text-headline-md font-headline-md text-on-surface">Giao tài liệu số &amp; Kích hoạt khóa học</h2>
                <p className="text-brand-secondary text-body-sm font-body-sm">Hệ thống cấp phép tự động kích hoạt tài khoản ngay tức thì</p>
              </div>
            </div>

            <div className="bg-blue-50/70 border border-blue-200/80 rounded-xl p-5 mb-6">
              <div className="flex items-start gap-3.5">
                <Icon name="forward_to_inbox" className="text-primary-container text-[24px] mt-0.5 flex-shrink-0" />
                <div className="space-y-1.5 flex-grow">
                  <div className="text-body-md font-body-md text-on-surface font-semibold">
                    Tài liệu khóa học đã được gửi tự động tới email:
                  </div>
                  {/* [BIẾN] customer.email */}
                  <div className="inline-block bg-surface-container-lowest px-3 py-1.5 rounded-lg border border-blue-200 text-brand-primary font-headline-sm text-headline-sm tracking-wide">
                    nguyenvan.learner@gmail.com
                  </div>
                  <p className="text-brand-secondary text-body-sm font-body-sm pt-1 leading-relaxed">
                    <strong className="text-on-surface">Lưu ý quan trọng:</strong> Vui lòng kiểm tra hộp thư đến (Inbox) hoặc mục <em>Quảng cáo / Spam (Thư rác)</em>. Nếu chưa thấy sau 3-5 phút, vui lòng sử dụng nút gửi lại hoặc liên hệ hỗ trợ.
                  </p>
                </div>
              </div>
            </div>

            {/* Cụm nút */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              {/* [BIẾN] order.resourceLink  (link tài liệu chính thức)
                  [LƯU Ý BA] BA (BR-02) không cho lộ link tài liệu ra API public. Link chỉ gửi qua email.
                  Nếu giữ nút này: backend chỉ trả link khi đơn đã Paid và có mã truy cập đơn hợp lệ. */}
              <a
                className="inline-flex items-center justify-center gap-2 bg-primary-container hover:bg-brand-primary text-on-primary text-label-lg font-label-lg rounded-full px-6 py-3.5 transition-colors duration-150 active:scale-[0.98] shadow-md shadow-blue-500/20 text-center font-bold"
                href="https://drive.google.com"
                target="_blank"
                rel="noreferrer"
              >
                <span>Truy cập tài liệu &amp; Khóa học ngay</span>
                <Icon name="open_in_new" className="text-[20px]" />
              </a>
              <button
                className={`inline-flex items-center justify-center gap-2 border-[1.5px] border-slate-300 hover:bg-surface-container-low text-on-surface text-label-lg font-label-lg rounded-full px-5 py-3 transition-colors duration-150 active:scale-[0.98] ${resendState !== "idle" ? "opacity-70 cursor-not-allowed" : ""}`}
                disabled={resendState !== "idle"}
                id="resendBtn"
                onClick={handleResendEmail}
                type="button"
              >
                <Icon name="sync" className="text-[20px]" />
                <span id="resendText">
                  {resendState === "idle" && "Gửi lại email tài liệu"}
                  {resendState === "sending" && "Đang xử lý gửi lại..."}
                  {resendState === "sent" && "Đã gửi thành công!"}
                </span>
              </button>
              {/* [LƯU Ý BA] "Tải biên lai (PDF)" không có trong BA MVP. Hiện dùng window.print() như Stitch. */}
              <button
                className="inline-flex items-center justify-center gap-2 border-[1.5px] border-slate-300 hover:bg-surface-container-low text-brand-secondary hover:text-on-surface text-label-lg font-label-lg rounded-full px-5 py-3 transition-colors duration-150 active:scale-[0.98]"
                onClick={() => window.print()}
                type="button"
              >
                <Icon name="download" className="text-[20px]" />
                <span>Tải biên lai (PDF)</span>
              </button>
            </div>

            {/* Thông báo sau khi gửi lại */}
            {showResendAlert && (
              <div
                className="mt-4 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-body-sm font-body-sm flex items-center gap-2"
                id="resendAlert"
              >
                <Icon name="check_circle" fill className="text-[18px] text-emerald-600" />
                <span>Hệ thống đã kích hoạt lệnh gửi lại email kèm mã dự phòng. Vui lòng kiểm tra hòm thư của bạn!</span>
              </div>
            )}
          </div>

          {/* ----- Chi tiết sản phẩm đã bàn giao ----- */}
          <div className="bg-surface-container-lowest rounded-xl p-6 md:p-8 border border-slate-100 shadow-[0_1px_3px_0_rgba(15,23,42,0.05),0_1px_2px_-1px_rgba(15,23,42,0.05)]">
            <h2 className="text-headline-md font-headline-md text-on-surface mb-6 flex items-center justify-between">
              <span>Chi tiết sản phẩm đã bàn giao</span>
              <span className="text-label-sm font-label-sm text-brand-secondary bg-surface-container px-3 py-1 rounded-full">1 gói khóa học toàn diện</span>
            </h2>

            <div className="flex flex-col md:flex-row gap-5 p-5 bg-surface-container-low rounded-xl border border-slate-200/60 mb-6">
              {/* [BIẾN] course.thumbnailUrl  |  alt = course.name */}
              <img
                alt="English for Real Life"
                className="w-full md:w-36 h-28 object-cover rounded-lg border border-slate-200 flex-shrink-0"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmTOTXquejup59FDsNXQlzrjf3QmznU5xfAECKuZNzST1-gVAGQIqEK-ycf4Ssg7HaHc05zI7Ggss8csfMGA9_3ixYgO5BQyovGAEkaBoBCpEKMMPVP_a5VwuCq-zCD-ELiqv5YrgH9H7h_aIFRitCQVh592OBpDI81jGENV_xwxC3lGbxs4m8Pmtc3nHKuE1fmA-f6AQp8F21GQcy7QxLXhrytfLwN6jWXlNNdgbXY-GCDXOTM4zIrg"
              />
              <div className="flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {/* [BIẾN] course.type  |  course.updatedYear */}
                    <span className="bg-blue-100 text-primary-container text-label-sm font-label-sm px-2.5 py-0.5 rounded-full font-bold">Khóa học Video &amp; Ebook</span>
                    <span className="text-brand-secondary text-body-sm font-body-sm">Cập nhật 2024</span>
                  </div>
                  {/* [BIẾN] course.name */}
                  <h3 className="text-headline-sm font-headline-sm text-on-surface font-bold">English for Real Life</h3>
                  {/* [BIẾN] course.shortDescription */}
                  <p className="text-brand-secondary text-body-sm font-body-sm mt-1">Giao tiếp tự tin trong mọi tình huống đời sống &amp; công sở. Trọn bộ 8 phân hệ, 42 bài giảng kèm hệ thống bài tập thực tế.</p>
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-200/80">
                  <div className="flex items-center gap-2 text-label-md font-label-md text-brand-secondary">
                    <Icon name="star" fill className="text-[18px] text-amber-500" />
                    {/* [BIẾN] course.rating  |  course.reviewCount */}
                    <span className="font-bold text-on-surface">4.9</span>
                    <span>(1.2k học viên đã hoàn thành)</span>
                  </div>
                  <div className="text-right">
                    {/* [BIẾN] order.total hoặc course.price  |  course.originalPrice */}
                    <span className="text-price-sm font-price-sm text-error font-bold">399.000đ</span>
                    <span className="text-body-sm font-body-sm line-through text-outline ml-1.5">699.000đ</span>
                  </div>
                </div>
              </div>
            </div>

            {/* [LƯU Ý BA] "Mã bản quyền" và "Kho lưu trữ Notion & Drive" không có trong BA MVP
                (BA: không có tài khoản/license, tài liệu gửi qua email). Cần chốt giữ hay bỏ. */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-slate-200 bg-surface-container-lowest">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-label-md font-label-md text-brand-secondary flex items-center gap-1.5">
                    <Icon name="vpn_key" className="text-[18px] text-brand-primary" />
                    Mã bản quyền học tập
                  </span>
                  <span className="text-emerald-600 text-label-sm font-label-sm font-bold bg-emerald-50 px-2 py-0.5 rounded">Hợp lệ trọn đời</span>
                </div>
                <div className="flex items-center justify-between bg-surface-container-low px-3 py-2 rounded-lg font-mono font-bold text-on-surface">
                  {/* [BIẾN] order.licenseCode */}
                  <span>BL-VIP-8921-X99</span>
                  <button
                    className="text-brand-primary hover:text-primary-container text-label-sm font-label-sm flex items-center gap-1"
                    onClick={() => {
                      navigator.clipboard.writeText("BL-VIP-8921-X99");
                      alert("Đã sao chép mã bản quyền!");
                    }}
                    type="button"
                  >
                    <Icon name="content_copy" className="text-[16px]" />
                    Sao chép
                  </button>
                </div>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 bg-surface-container-lowest">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-label-md font-label-md text-brand-secondary flex items-center gap-1.5">
                    <Icon name="folder_shared" className="text-[18px] text-brand-primary" />
                    Kho lưu trữ Notion &amp; Drive
                  </span>
                  <span className="text-brand-primary text-label-sm font-label-sm font-bold">Cloud VIP</span>
                </div>
                {/* [BIẾN] order.resourceLink  (xem [LƯU Ý BA] ở nút "Truy cập tài liệu") */}
                <a className="flex items-center justify-between bg-surface-container-low px-3 py-2 rounded-lg text-brand-primary hover:bg-blue-50 transition-colors text-label-md font-label-md font-semibold" href="#">
                  <span className="truncate">drive.brightlingo.vn/real-life-8921</span>
                  <Icon name="link" className="text-[18px]" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ============ CỘT PHẢI (4) ============ */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* ----- Hỗ trợ học viên ----- */}
          <div className="bg-surface-container-lowest rounded-xl p-6 border border-slate-100 shadow-[0_1px_3px_0_rgba(15,23,42,0.05),0_1px_2px_-1px_rgba(15,23,42,0.05)]">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Icon name="verified_user" fill className="text-[22px]" />
              </div>
              <div>
                <h3 className="text-headline-sm font-headline-sm text-on-surface">Bảo đảm &amp; Hỗ trợ học viên</h3>
                <p className="text-brand-secondary text-body-sm font-body-sm">Đồng hành 1-1 cùng ban giáo vụ</p>
              </div>
            </div>
            <div className="space-y-3.5 mb-5 text-body-sm font-body-sm">
              <div className="flex items-start gap-3">
                <Icon name="check_circle" className="text-emerald-600 text-[20px]" />
                <span><strong>Không cần tạo tài khoản:</strong> Dùng trực tiếp qua email đăng ký mua hàng.</span>
              </div>
              <div className="flex items-start gap-3">
                <Icon name="check_circle" className="text-emerald-600 text-[20px]" />
                <span><strong>Học một lần, sở hữu mãi mãi:</strong> Tải trọn bộ video và tài liệu về máy.</span>
              </div>
              <div className="flex items-start gap-3">
                <Icon name="check_circle" className="text-emerald-600 text-[20px]" />
                <span><strong>Cam kết hỗ trợ giải đáp 24/7</strong> khi gặp thắc mắc về nội dung bài học.</span>
              </div>
            </div>
            <div className="border-t border-slate-100 pt-4 space-y-2.5">
              {/* [BIẾN] settings.supportPhone */}
              <a className="flex items-center justify-between p-2.5 rounded-lg hover:bg-surface-container-low transition-colors" href="tel:19008989">
                <span className="flex items-center gap-2 text-brand-secondary text-label-md font-label-md">
                  <Icon name="call" className="text-brand-primary text-[18px]" />
                  Hotline tư vấn
                </span>
                <span className="font-bold text-on-surface">1900 8989</span>
              </a>
              {/* [BIẾN] settings.supportEmail */}
              <a className="flex items-center justify-between p-2.5 rounded-lg hover:bg-surface-container-low transition-colors" href="mailto:support@brightlingo.vn">
                <span className="flex items-center gap-2 text-brand-secondary text-label-md font-label-md">
                  <Icon name="mail" className="text-brand-primary text-[18px]" />
                  Email hỗ trợ
                </span>
                <span className="font-semibold text-brand-primary">support@brightlingo.vn</span>
              </a>
            </div>
          </div>

          {/* ----- Khóa học đề xuất ----- */}
          {/* [BIẾN] relatedCourses[] (mỗi khóa: thumbnailUrl, name, subtitle, price, slug)  |  badge giảm giá "-40%" = promo.discountLabel
              [LƯU Ý BA] Gợi ý/cross-sell thuộc Phase 2 trong BA ("upsell/cross-sell"). Cần chốt có làm ở MVP không. */}
          <div className="bg-surface-container-lowest rounded-xl p-6 border border-slate-100 shadow-[0_1px_3px_0_rgba(15,23,42,0.05),0_1px_2px_-1px_rgba(15,23,42,0.05)]">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-label-sm font-label-sm text-brand-primary font-bold uppercase tracking-wider">Ưu đãi học viên mới</span>
                <h3 className="text-headline-sm font-headline-sm text-on-surface">Khóa học bổ trợ đề xuất</h3>
              </div>
              <span className="bg-red-50 text-error text-label-sm font-label-sm px-2.5 py-1 rounded-full font-bold">-40%</span>
            </div>
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl border border-slate-200 hover:border-brand-primary/50 transition-all duration-150 hover:shadow-sm group">
                <div className="flex gap-3">
                  <img
                    alt="IELTS Writing Master"
                    className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAEWTEF-ZhXOjhsm-sRYBnwsFmFwc3R5NUkEg6J-L3YDxg1kJYup-i6UcAO-xw0lCHkI0vppvcPuZ_p4OLUzx17HQFUfHxoG5AYO8-UyffADtuYzfxhNhjqdQyypLHNXleLPi-rbw_e3PxDgwQ58ujG__LQMGuAF2QaUU-MeGciG2ymoH-05YhUKho6KxEQB2PLHBzz4ryRHjSfgxF6PZAVVb8UIamDPzU79iJGaJkS9T_ShsYTfAqlKw"
                  />
                  <div className="flex-grow flex flex-col justify-between">
                    <div>
                      <h4 className="text-label-lg font-label-lg text-on-surface group-hover:text-brand-primary transition-colors font-bold line-clamp-1">IELTS Writing Master</h4>
                      <p className="text-brand-secondary text-body-sm font-body-sm line-clamp-1 mt-0.5">Công thức viết Task 1 &amp; 2 chuẩn 7.5+</p>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-price-sm font-price-sm text-error font-bold">499.000đ</span>
                      <button className="text-brand-primary hover:text-on-primary hover:bg-primary-container px-3 py-1 rounded-full border border-brand-primary/30 text-label-sm font-label-sm transition-colors" type="button">Khám phá</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-3.5 rounded-xl border border-slate-200 hover:border-brand-primary/50 transition-all duration-150 hover:shadow-sm group">
                <div className="flex gap-3">
                  <img
                    alt="Ngữ pháp nền tảng"
                    className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDw5IWuftDmI1tprGY60666ZobRYQo1-YqZMMmt5OkX0k6S8H0pMoQYJhxlbbAKNBoqUpLZu84RKjmfHDZYUmGaP8vy25L4A4QhQ24wfjyqe-a1j7ikyYyaBhHZjjjVyflUbmnxRbTuckiS6wZaZ4nsVsoo4i8E4B3RWMaD4uUU5fibpVs1f0L2i3X1aycLu4cmnvEXKwhGWGLlAQk1GrEhl236HeFTFIl1tnEdgH5shbwyQfcF2HRpWg"
                  />
                  <div className="flex-grow flex flex-col justify-between">
                    <div>
                      <h4 className="text-label-lg font-label-lg text-on-surface group-hover:text-brand-primary transition-colors font-bold line-clamp-1">Ngữ pháp &amp; 1000 Mẫu câu</h4>
                      <p className="text-brand-secondary text-body-sm font-body-sm line-clamp-1 mt-0.5">Phản xạ giao tiếp tự động không dịch nhẩm</p>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-price-sm font-price-sm text-error font-bold">299.000đ</span>
                      <button className="text-brand-primary hover:text-on-primary hover:bg-primary-container px-3 py-1 rounded-full border border-brand-primary/30 text-label-sm font-label-sm transition-colors" type="button">Khám phá</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100 text-center">
              <a className="text-brand-primary hover:underline text-label-md font-label-md font-semibold inline-flex items-center gap-1" href="#">
                <span>Xem toàn bộ danh mục tài liệu số</span>
                <Icon name="arrow_forward" className="text-[16px]" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ----- Dải tin cậy ----- */}
      <div className="mt-14 pt-8 border-t border-slate-200/80 grid grid-cols-2 md:grid-cols-5 gap-6 text-center md:text-left">
        <TrustItem icon="school" title="Khóa học chất lượng" sub="Thiết thực, dễ áp dụng" />
        <TrustItem icon="description" title="Mua một lần" sub="Học trọn đời" />
        <TrustItem icon="favorite" title="Không cần tài khoản" sub="Nhanh gọn, tiện lợi" />
        <TrustItem icon="verified" title="Thanh toán an toàn" sub="VietQR chuẩn xác" />
        <TrustItem icon="support_agent" title="Hỗ trợ tận tâm" sub="Đồng hành cùng bạn" className="col-span-2 md:col-span-1" />
      </div>
    </main>
  );
}

function TrustItem({
  icon,
  title,
  sub,
  className = "",
}: {
  icon: string;
  title: string;
  sub: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-col sm:flex-row items-center sm:items-start gap-3 ${className}`}>
      <div className="w-10 h-10 rounded-full bg-blue-50 text-brand-primary flex items-center justify-center flex-shrink-0">
        <Icon name={icon} className="text-[20px]" />
      </div>
      <div>
        <h4 className="text-label-md font-label-md text-on-surface font-bold">{title}</h4>
        <p className="text-brand-secondary text-body-sm font-body-sm">{sub}</p>
      </div>
    </div>
  );
}
