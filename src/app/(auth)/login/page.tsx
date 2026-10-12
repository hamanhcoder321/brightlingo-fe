import { Metadata } from "next";
import { LoginPageView } from "@/components/features/auth";

export const metadata: Metadata = {
  title: "Đăng nhập",
  description: "Đăng nhập tài khoản học viên để tiếp tục hành trình học tiếng Anh cùng BrightLingo.",
};

export default function LoginPage() {
  return <LoginPageView />;
}
