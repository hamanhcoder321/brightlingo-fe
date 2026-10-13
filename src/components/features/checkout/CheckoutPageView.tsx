import { MaterialSymbolsFont } from "@/components/common/MaterialIcon";
import CheckoutAside from "./components/CheckoutAside";
import CourseInfo from "./components/CourseInfo";

// Màn "Chi tiết khóa học & Thanh toán".
// Header/Footer: thêm giống cách trang chủ (src/app/page.tsx hoặc layout.tsx) đang dùng.
export default function CheckoutPageView() {
  return (
    <div className="bg-surface font-body-md text-on-surface antialiased selection:bg-primary-fixed selection:text-on-primary-fixed">
      <MaterialSymbolsFont />
      <main className="max-w-7xl mx-auto w-full px-4 md:px-8 py-6 md:py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-label-md font-label-md text-brand-secondary mb-6 overflow-x-auto whitespace-nowrap">
          <a className="hover:text-brand-primary transition-colors" href="#">Trang chủ</a>
          <span className="text-outline-variant">/</span>
          <a className="hover:text-brand-primary transition-colors" href="#">Khóa học giao tiếp</a>
          <span className="text-outline-variant">/</span>
          {/* [BIẾN] course.name */}
          <span className="text-on-surface font-semibold">English for Real Life</span>
        </nav>

        {/* Lưới 2 cột (7/5) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <CourseInfo />
          <CheckoutAside />
        </div>
      </main>
    </div>
  );
}
