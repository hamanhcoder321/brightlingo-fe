import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, Clock, ShieldCheck } from "lucide-react";
import { IMAGES } from "@/lib/constants/images";

export default function Footer() {
  return (
    <footer className="w-full bg-white pt-16 pb-8 border-t">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 lg:gap-8">
          
          {/* Cột 1: Thông tin thương hiệu */}
          <div className="flex flex-col items-start gap-4 pr-0 md:pr-12">
            <Link href="/" className="mb-2">
              <Image 
                src={IMAGES.LOGO} 
                alt="BrightLingo Logo" 
                className="h-10 w-auto object-contain"
              />
            </Link>
            <p className="text-[15px] leading-relaxed text-muted-foreground">
              Nền tảng học tiếng Anh trực tuyến và phân phối tài liệu số thực tế chất lượng cao. Học dễ hơn, tiến bộ nhanh hơn cùng phương pháp hiện đại dành cho người Việt.
            </p>
            <div className="mt-2 flex items-center gap-2 rounded-full border border-success/30 bg-success/5 px-3 py-1.5 text-sm font-medium text-success">
              <ShieldCheck className="h-4 w-4" />
              <span>VietQR Secured by BankNoti</span>
            </div>
          </div>

          {/* Cột 2: Chính sách & Hướng dẫn */}
          <div>
            <h3 className="mb-6 text-[17px] font-semibold text-foreground">Chính sách & Hướng dẫn</h3>
            <ul className="flex flex-col gap-3 text-[15px] text-muted-foreground">
              <li>
                <Link href="/chinh-sach-thanh-toan" className="hover:text-primary transition-colors">
                  Chính sách thanh toán
                </Link>
              </li>
              <li>
                <Link href="/giao-tai-lieu-so" className="hover:text-primary transition-colors">
                  Giao tài liệu số
                </Link>
              </li>
              <li>
                <Link href="/chinh-sach-bao-mat" className="hover:text-primary transition-colors">
                  Chính sách bảo mật
                </Link>
              </li>
              <li>
                <Link href="/dieu-khoan-su-dung" className="hover:text-primary transition-colors">
                  Điều khoản sử dụng
                </Link>
              </li>
            </ul>
          </div>

          {/* Cột 3: Hỗ trợ khách hàng */}
          <div>
            <h3 className="mb-6 text-[17px] font-semibold text-foreground">Hỗ trợ khách hàng 24/7</h3>
            <ul className="flex flex-col gap-4 text-[15px] text-muted-foreground">
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary" />
                <span>
                  Hotline tư vấn: <strong className="text-foreground">1900 8989</strong>
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <span>Email hỗ trợ: support@brightlingo.vn</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-primary" />
                <span>Thời gian làm việc: 08:00 - 22:00 mỗi ngày</span>
              </li>
            </ul>
          </div>
          
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row text-sm text-muted-foreground">
          <p>© 2024 BrightLingo - Học dễ hơn, tiến bộ nhanh hơn. Nền tảng học trực tuyến chất lượng cao.</p>
          <p className="font-semibold text-primary">Good English, A Brighter Tomorrow ✨</p>
        </div>
      </div>
    </footer>
  );
}
