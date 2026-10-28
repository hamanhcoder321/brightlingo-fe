import type { Metadata } from "next";
import { RefundPolicyView } from "@/components/features/legal";

export const metadata: Metadata = {
  title: "Chính sách đổi trả & Hoàn tiền (Refund Policy)",
  description:
    "Quy định hoàn tiền 100%, bảo vệ quyền lợi tài chính học viên và quy trình tiếp nhận xử lý khiếu nại tại EngNest.",
};

export default function RefundPolicyPage() {
  return <RefundPolicyView />;
}
