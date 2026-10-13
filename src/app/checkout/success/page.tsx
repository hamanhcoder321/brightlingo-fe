import type { Metadata } from "next";
import { PaymentSuccessPageView } from "@/components/features/payment-success";

export const metadata: Metadata = {
  title: "Thanh toán thành công - BrightLingo",
};

export default function PaymentSuccessPage() {
  return <PaymentSuccessPageView />;
}
