import type { Metadata } from "next";
import { CheckoutPageView } from "@/components/features/checkout";

export const metadata: Metadata = {
  title: "Thanh toán an toàn - BrightLingo",
};

export default function CheckoutPage() {
  return <CheckoutPageView />;
}
