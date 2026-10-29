import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Không tìm thấy trang (404)",
  description: "Trang bạn đang tìm kiếm không tồn tại hoặc đã được chuyển đi.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-16 text-center">
      <span className="text-6xl font-extrabold text-primary mb-2">404</span>
      <h1 className="text-2xl font-bold text-slate-800 mb-3">Không tìm thấy trang</h1>
      <p className="text-slate-600 max-w-md mb-6 text-base">
        Đường dẫn bạn truy cập không tồn tại, đã bị xóa hoặc đổi sang địa chỉ khác.
      </p>
      <Link
        href="/"
        className="rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 transition-colors"
      >
        Về trang chủ
      </Link>
    </div>
  );
}
