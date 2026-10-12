"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Headphones, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { IMAGES } from "@/lib/constants/images";
import { AuthModal } from "@/components/features/auth";
import { tokenStorage, AUTH_CHANGE_EVENT, type AuthUser } from "@/lib/auth/token-storage";

function useCurrentUser(): AuthUser | null {
  return React.useSyncExternalStore(
    (callback) => {
      window.addEventListener("storage", callback);
      window.addEventListener(AUTH_CHANGE_EVENT, callback);
      return () => {
        window.removeEventListener("storage", callback);
        window.removeEventListener(AUTH_CHANGE_EVENT, callback);
      };
    },
    () => tokenStorage.getUser(),
    () => null
  );
}

export default function Header() {
  const pathname = usePathname();
  const [authModalOpen, setAuthModalOpen] = React.useState(false);
  const [authModalMode, setAuthModalMode] = React.useState<"register" | "login">("register");
  const storedUser = useCurrentUser();
  const [localUser, setLocalUser] = React.useState<AuthUser | null>(null);
  const currentUser = localUser ?? storedUser;

  const isCoursesActive = pathname?.startsWith("/khoa-hoc");

  const handleOpenAuth = (mode: "register" | "login") => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  const handleAuthSuccess = (res: { user: AuthUser }) => {
    setLocalUser(res.user);
  };

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
            className={cn(
              "transition-colors",
              isCoursesActive
                ? "relative text-primary font-bold after:absolute after:-bottom-7 after:left-0 after:h-[3px] after:w-full after:bg-primary after:content-['']"
                : "hover:text-primary"
            )}
          >
            Khóa học
          </Link>
          <Link href="/#loi-ich" className="hover:text-primary transition-colors">
            Lợi ích
          </Link>
          <Link href="/#danh-gia" className="hover:text-primary transition-colors">
            Đánh giá
          </Link>
          <Link href="/#chinh-sach" className="hover:text-primary transition-colors">
            Chính sách
          </Link>
          <Link 
            href="/#hoc-thu" 
            className="rounded-full bg-[#FFEBD6] px-3 py-1 text-xs font-semibold text-[#F59E0B] hover:bg-[#FFDDAA] transition-colors"
          >
            Học thử 0đ
          </Link>
        </nav>
        
        {/* Right: Actions */}
        <div className="flex items-center gap-3 sm:gap-5">
          <button 
            type="button" 
            aria-label="Hỗ trợ"
            className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"
          >
            <Headphones className="h-6 w-6 stroke-[1.5]" />
          </button>
          
          <button 
            type="button" 
            aria-label="Giỏ hàng"
            className="relative text-muted-foreground hover:text-primary transition-colors mr-1 cursor-pointer"
          >
            <ShoppingBag className="h-6 w-6 stroke-[1.5]" />
            <span className="absolute -right-2 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-white">
              1
            </span>
          </button>
          
          {currentUser ? (
            <div className="flex items-center gap-2 pl-2">
              <div className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm">
                {currentUser.name.charAt(0).toUpperCase()}
              </div>
              <span className="hidden md:inline-block text-sm font-medium text-slate-800">
                {currentUser.name}
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => handleOpenAuth("login")}
                className="hidden sm:inline-flex text-[14px] font-semibold text-slate-700 hover:text-primary transition-colors cursor-pointer px-2 py-1.5"
              >
                Đăng nhập
              </button>

              <button 
                type="button"
                onClick={() => handleOpenAuth("register")}
                className="flex h-10 sm:h-11 items-center justify-center rounded-full bg-primary px-5 sm:px-7 text-[14px] sm:text-[15px] font-semibold text-white shadow-sm transition-all hover:bg-primary/90 hover:shadow-md cursor-pointer active:scale-[0.98]"
              >
                Đăng ký
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Auth Modal with Backdrop Blur Opacity */}
      <AuthModal
        open={authModalOpen}
        onOpenChange={setAuthModalOpen}
        initialMode={authModalMode}
        onSuccess={handleAuthSuccess}
      />
    </header>
  );
}
