"use client";

import * as React from "react";
import { CheckCircle2, Headphones, Sparkles } from "lucide-react";
import { Container, Breadcrumb } from "@/components/common";
import { ConsultationForm } from "./ConsultationForm";

export function RegisterPageView(): React.JSX.Element {
  return (
    <div className="w-full bg-slate-50/60 py-8 sm:py-12">
      <Container>
        {/* Breadcrumb phân cấp */}
        <div className="mb-6">
          <Breadcrumb
            showHomeIcon
            items={[
              { label: "Trang chủ", href: "/" },
              { label: "Đăng ký tư vấn" },
            ]}
          />
        </div>

        <div className="mx-auto max-w-4xl overflow-hidden rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-10 lg:p-12">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_1.3fr] lg:gap-12">
            {/* Cột trái: Thông tin & Lợi ích */}
            <div className="flex flex-col justify-between space-y-6">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-primary">
                  <Sparkles className="size-3.5" />
                  <span>Tư vấn lộ trình 1:1</span>
                </div>

                <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                  Nhận tư vấn lộ trình học phù hợp
                </h1>

                <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-[15px]">
                  Để lại thông tin để chuyên viên BrightLingo liên hệ hỗ trợ bạn chọn tài liệu hoặc khóa học tối ưu nhất cho mục tiêu cá nhân trong 30 phút.
                </p>

                <div className="mt-6 space-y-3">
                  <div className="flex items-start gap-2.5 text-xs text-slate-700 sm:text-sm">
                    <CheckCircle2 className="mt-0.5 size-4.5 shrink-0 text-emerald-600" />
                    <span>Tư vấn hoàn toàn miễn phí & tận tình theo nhu cầu</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-slate-700 sm:text-sm">
                    <CheckCircle2 className="mt-0.5 size-4.5 shrink-0 text-emerald-600" />
                    <span>Không bắt buộc mua sau khi nhận tư vấn</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs font-medium text-emerald-700 sm:text-sm">
                    <CheckCircle2 className="mt-0.5 size-4.5 shrink-0 text-emerald-600" />
                    <span>Cam kết bảo mật thông tin cá nhân 100%</span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Headphones className="size-5" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500">Cần hỗ trợ gấp qua Hotline?</p>
                    <p className="text-sm font-bold text-slate-900">0912 345 678 (8:00 - 22:00)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Cột phải: Form đăng ký tư vấn */}
            <div className="rounded-2xl border border-slate-200/70 bg-slate-50/70 p-5 sm:p-7">
              <ConsultationForm />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default RegisterPageView;
