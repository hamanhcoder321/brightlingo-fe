import type { Metadata } from "next";
import { PaymentPolicyView } from "@/components/features/legal";

export const metadata: Metadata = {
  title: "Chính sách thanh toán & Đối soát tự động | BrightLingo",
  description:
    "Quy định thanh toán một lần sở hữu trọn đời, chuyển khoản tự động qua VietQR và chính sách bảo vệ quyền lợi tài chính học viên tại BrightLingo.",
};

export default function PaymentPolicyPage() {
  return <PaymentPolicyView />;
}
