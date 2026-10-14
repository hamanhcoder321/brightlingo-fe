import type { Metadata } from "next";
import { DeliveryPolicyView } from "@/components/features/legal";

export const metadata: Metadata = {
  title: "Chính sách giao nhận & Kích hoạt tài liệu số | BrightLingo",
  description:
    "Hình thức bàn giao tự động trong 1-5 phút qua email, định dạng Google Drive, Notion và hỗ trợ học viên 24/7 tại BrightLingo.",
};

export default function DeliveryPolicyPage() {
  return <DeliveryPolicyView />;
}
