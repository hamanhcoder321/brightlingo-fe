import { Metadata } from "next";
import { RegisterPageView } from "@/components/features/auth";

export const metadata: Metadata = {
  title: "Đăng ký tư vấn lộ trình học",
  description:
    "Đăng ký nhận tư vấn lộ trình học tiếng Anh phù hợp hoàn toàn miễn phí từ đội ngũ chuyên môn BrightLingo.",
};

export default function RegisterPage() {
  return <RegisterPageView />;
}
