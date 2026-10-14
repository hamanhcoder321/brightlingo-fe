import { MaterialSymbolsFont } from "@/components/common/MaterialIcon";
import SuccessContent from "./components/SuccessContent";

// Màn "Thanh toán thành công".
// Header/Footer: thêm giống cách trang chủ (src/app/page.tsx hoặc layout.tsx) đang dùng.
// [BIẾN] Sau này nhận mã đơn từ URL (vd /checkout/success?order=BL8921) rồi gọi API lấy thông tin đơn.
export default function PaymentSuccessPageView() {
  return (
    <div className="bg-surface font-body-md text-body-md text-on-surface antialiased selection:bg-primary-fixed selection:text-on-primary-fixed">
      <MaterialSymbolsFont />
      <SuccessContent />
    </div>
  );
}
