import * as React from "react";
import { Phone, Mail, Clock, Headphones } from "lucide-react";

export function LegalSupportBox() {
  return (
    <div className="mt-12 rounded-2xl border border-blue-100 bg-blue-50/60 p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-white">
          <Headphones className="size-5" />
        </div>
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
            Cần hỗ trợ về chính sách & quyền lợi học viên?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Đội ngũ chuyên viên EngNest luôn sẵn sàng giải đáp và xử lý trong 1 - 5 phút.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-blue-200/60 text-xs sm:text-sm">
        <div className="flex items-center gap-2.5 text-slate-700">
          <Phone className="size-4 text-primary shrink-0" />
          <span>Hotline: <strong className="text-slate-900 font-bold">1900 8989</strong></span>
        </div>
        <div className="flex items-center gap-2.5 text-slate-700">
          <Mail className="size-4 text-primary shrink-0" />
          <span>Email: <strong className="text-slate-900 font-bold">hotro@engnest.vn</strong></span>
        </div>
        <div className="flex items-center gap-2.5 text-slate-700">
          <Clock className="size-4 text-primary shrink-0" />
          <span>Xử lý tự động: <strong className="text-slate-900 font-bold">24/7</strong></span>
        </div>
      </div>
    </div>
  );
}
