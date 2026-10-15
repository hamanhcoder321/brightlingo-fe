import { Suspense } from "react";
import { MaterialSymbolsFont } from "@/components/common/MaterialIcon";
import SuccessContent from "./components/SuccessContent";

// Màn "Thanh toán thành công".
export default function PaymentSuccessPageView() {
  return (
    <div className="bg-surface font-body-md text-body-md text-on-surface antialiased selection:bg-primary-fixed selection:text-on-primary-fixed">
      <MaterialSymbolsFont />
      <Suspense
        fallback={
          <div className="w-full min-h-[60vh] flex items-center justify-center text-slate-500 text-sm">
            Đang tải thông tin đơn hàng...
          </div>
        }
      >
        <SuccessContent />
      </Suspense>
    </div>
  );
}
