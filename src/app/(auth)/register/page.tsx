import { Metadata } from "next";
import { RegisterPageView } from "@/components/features/auth";

export const metadata: Metadata = {
  title: "Đăng ký tài khoản",
  description: "Bắt đầu hành trình làm chủ tiếng Anh cùng hơn 12.000+ học viên tại BrightLingo.",
};

export default function RegisterPage() {
  return <RegisterPageView />;
}
