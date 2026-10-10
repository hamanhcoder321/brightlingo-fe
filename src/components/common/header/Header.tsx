import Link from "next/link";
import Image from "next/image";
import { Headphones, ShoppingBag } from "lucide-react";
import { IMAGES } from "@/lib/constants/images";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-[0px_2px_10px_rgba(0,0,0,0.05)]">
      <div className="mx-auto flex h-20 w-full max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Left: Logo */}
        <div className="flex-shrink-0">
          <Link href="/">
            <Image 
              src={IMAGES.LOGO} 
              alt="BrightLingo Logo" 
              className="h-10 w-auto object-contain"
              priority
            />
          </Link>
        </div>
        
        {/* Center: Navigation */}
        <nav className="hidden lg:flex items-center gap-8 text-[15px] font-medium text-foreground">
          <Link 
            href="/khoa-hoc" 
            className="relative text-primary font-bold after:absolute after:-bottom-7 after:left-0 after:h-[3px] after:w-full after:bg-primary after:content-['']"
          >
            Khóa học
          </Link>
          <Link href="#loi-ich" className="hover:text-primary transition-colors">
            Lợi ích
          </Link>
          <Link href="#danh-gia" className="hover:text-primary transition-colors">
            Đánh giá
          </Link>
          <Link href="/chinh-sach" className="hover:text-primary transition-colors">
            Chính sách
          </Link>
          <Link 
            href="#hoc-thu" 
            className="rounded-full bg-[#FFEBD6] px-3 py-1 text-xs font-semibold text-[#F59E0B] hover:bg-[#FFDDAA] transition-colors"
          >
            Học thử 0đ
          </Link>
        </nav>
        
        {/* Right: Actions */}
        <div className="flex items-center gap-5">
          <button className="text-muted-foreground hover:text-primary transition-colors">
            <Headphones className="h-6 w-6 stroke-[1.5]" />
          </button>
          
          <button className="relative text-muted-foreground hover:text-primary transition-colors mr-2">
            <ShoppingBag className="h-6 w-6 stroke-[1.5]" />
            <span className="absolute -right-2 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-white">
              1
            </span>
          </button>
          
          <Link 
            href="/dang-ky-tu-van"
            className="hidden sm:flex h-11 items-center justify-center rounded-full bg-primary px-7 text-[15px] font-semibold text-white shadow-sm transition-all hover:bg-primary/90 hover:shadow-md"
          >
            Đăng ký tư vấn
          </Link>
        </div>
      </div>
    </header>
  );
}
