"use client";

import * as React from "react";
import Link from "next/link";
import { useForm, useWatch } from "react-hook-form";
import { useGoogleLogin } from "@react-oauth/google";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Loader2,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { authFormSchema, type AuthFormData } from "@/lib/schemas/auth.schema";
import { authApi, type AuthResponse } from "@/lib/api/auth";
import { cn } from "@/lib/utils";

export interface AuthFormProps {
  initialMode?: "register" | "login";
  mode?: "register" | "login";
  onModeChange?: (mode: "register" | "login") => void;
  onSuccess?: (response: AuthResponse) => void;
  isInModal?: boolean;
  className?: string;
}

// Google SVG Icon chuẩn đa sắc
function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" {...props}>
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.15z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.27v3.15C3.25 21.31 7.31 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.27C.46 8.2 0 10.05 0 12s.46 3.8 1.27 5.42l4.01-3.15z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.69 1.27 6.58l4.01 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
      />
    </svg>
  );
}

// Brand Logo Component
function BrandLogo() {
  return (
    <div className="flex flex-col items-center gap-1 text-center">
      <div className="relative flex size-10 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-700 via-primary to-blue-500 text-white shadow-sm shadow-blue-500/20">
        <span className="text-xl font-black tracking-tight">B</span>
        <Sparkles className="absolute -top-1 -right-1 size-3.5 text-amber-300 fill-amber-300 drop-shadow" />
      </div>
      <div>
        <h2 className="text-lg font-extrabold tracking-tight text-slate-900 leading-tight">
          Bright<span className="text-primary">Lingo</span>
        </h2>
        <p className="text-[10.5px] font-medium text-slate-500">
          Học dễ hơn, tiến bộ nhanh hơn
        </p>
      </div>
    </div>
  );
}

export const AuthForm: React.FC<AuthFormProps> = ({
  initialMode = "register",
  mode: controlledMode,
  onModeChange,
  onSuccess,
  isInModal = false,
  className,
}) => {
  const [internalMode, setInternalMode] = React.useState<"register" | "login">(initialMode);
  const activeMode = controlledMode ?? internalMode;

  const [showPassword, setShowPassword] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<AuthFormData>({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      mode: activeMode,
      name: "",
      email: "",
      password: "",
      rememberMe: true,
      acceptTerms: false,
    },
  });

  // Đồng bộ mode vào form state khi controlledMode thay đổi từ bên ngoài
  React.useEffect(() => {
    if (controlledMode) {
      clearErrors();
      setValue("mode", controlledMode);
    }
  }, [controlledMode, setValue, clearErrors]);

  const passwordValue = useWatch({ control, name: "password" }) || "";
  const acceptTermsValue = useWatch({ control, name: "acceptTerms" });
  const rememberMeValue = useWatch({ control, name: "rememberMe" });

  // Tính độ mạnh mật khẩu (3 thang điểm: Yếu - Trung bình - Mạnh)
  const passwordStrength = React.useMemo(() => {
    if (!passwordValue) return 0;
    let score = 0;
    if (passwordValue.length >= 8) score += 1;
    if (/[0-9]/.test(passwordValue) && /[a-zA-Z]/.test(passwordValue)) score += 1;
    if (/[^A-Za-z0-9]/.test(passwordValue) || passwordValue.length >= 12) score += 1;
    return score;
  }, [passwordValue]);

  const strengthLabel = React.useMemo(() => {
    if (passwordStrength === 0) return "Độ mạnh mật khẩu";
    if (passwordStrength === 1) return "Yếu";
    if (passwordStrength === 2) return "Trung bình";
    return "Mạnh";
  }, [passwordStrength]);

  const switchMode = (newMode: "register" | "login") => {
    clearErrors();
    if (onModeChange) {
      onModeChange(newMode);
    } else {
      setInternalMode(newMode);
    }
    setValue("mode", newMode);
  };

  const onSubmit = async (data: AuthFormData) => {
    setIsSubmitting(true);
    try {
      let res: AuthResponse;
      if (activeMode === "register") {
        res = await authApi.register({
          name: data.name || "",
          email: data.email,
          password: data.password,
          acceptTerms: data.acceptTerms,
        });
        toast.success("Tạo tài khoản thành công!", {
          description: `Chào mừng ${res.user.name} đến với BrightLingo!`,
        });
      } else {
        res = await authApi.login({
          email: data.email,
          password: data.password,
          rememberMe: data.rememberMe,
        });
        toast.success("Đăng nhập thành công!", {
          description: `Chào mừng bạn quay trở lại, ${res.user.name}!`,
        });
      }

      if (onSuccess) {
        onSuccess(res);
      }
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Đã xảy ra lỗi, vui lòng thử lại sau!";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setIsGoogleLoading(true);
      try {
        console.log("Google OAuth Token Response:", tokenResponse);
        // Gọi API Google UserInfo để lấy profile thật của người dùng
        const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Không thể kết nối lấy hồ sơ Google");
        }

        const profile = await res.json();
        console.log("Google User Profile thật:", profile);

        toast.success("Xác thực Google thành công (Test Mode)!", {
          description: `Tài khoản: ${profile.name} (${profile.email})`,
        });

        // Theo mục tiêu test: Chưa lưu vào Storage
        if (onSuccess) {
          onSuccess({
            success: true,
            message: "Đăng nhập Google thành công!",
            accessToken: tokenResponse.access_token,
            user: {
              id: profile.sub,
              name: profile.name || profile.given_name || "Google User",
              email: profile.email,
              avatar: profile.picture,
            },
          });
        }
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Đăng nhập Google thất bại!";
        toast.error(message);
      } finally {
        setIsGoogleLoading(false);
      }
    },
    onError: (errorResponse) => {
      console.warn("Google Login Canceled / Error:", errorResponse);
      setIsGoogleLoading(false);
      toast.error("Đăng nhập Google không thành công hoặc đã bị hủy");
    },
  });

  const onGoogleButtonClick = () => {
    setIsGoogleLoading(true);
    handleGoogleLogin();
  };

  return (
    <div
      className={cn(
        "w-full max-w-[440px] rounded-[24px] bg-white p-5 sm:px-7 sm:py-6 transition-all",
        !isInModal && "border border-slate-100 shadow-[0_20px_50px_rgba(15,23,42,0.08)]",
        className
      )}
    >
      {/* Brand Header */}
      <BrandLogo />

      {/* Title & Subtitle */}
      <div className="mt-3.5 text-center">
        <h1 className="text-[19px] sm:text-[21px] font-bold tracking-tight text-slate-900 leading-snug">
          {activeMode === "register"
            ? "Tạo tài khoản BrightLingo"
            : "Đăng nhập BrightLingo"}
        </h1>
        <p className="mt-1 text-[12px] sm:text-[12.5px] text-slate-500">
          {activeMode === "register"
            ? "Bắt đầu hành trình làm chủ tiếng Anh cùng hơn 12.000+ học viên"
            : "Chào mừng bạn quay trở lại, tiếp tục hành trình học tập"}
        </p>
      </div>

      {/* Social Google Button */}
      <div className="mt-3.5">
        <button
          type="button"
          onClick={onGoogleButtonClick}
          disabled={isGoogleLoading || isSubmitting}
          className="flex h-10 sm:h-10.5 w-full items-center justify-center gap-2.5 rounded-full border border-slate-200 bg-white px-4 text-[13.5px] font-medium text-slate-700 shadow-2xs transition-all hover:border-slate-300 hover:bg-slate-50/80 active:scale-[0.99] disabled:opacity-60 cursor-pointer"
        >
          {isGoogleLoading ? (
            <Loader2 className="size-4.5 animate-spin text-slate-500" />
          ) : (
            <GoogleIcon />
          )}
          <span>
            {activeMode === "register"
              ? "Đăng ký nhanh với Google"
              : "Đăng nhập nhanh với Google"}
          </span>
        </button>
      </div>

      {/* Divider */}
      <div className="relative my-3.5 flex items-center justify-center">
        <div className="w-full border-t border-slate-200" />
        <span className="absolute bg-white px-2.5 text-[11.5px] font-medium text-slate-400">
          {activeMode === "register"
            ? "Hoặc đăng ký bằng Email"
            : "Hoặc đăng nhập bằng Email"}
        </span>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2.5">
        {/* Full Name field - Only on register */}
        <AnimatePresence initial={false}>
          {activeMode === "register" && (
            <motion.div
              key="name-field"
              initial={{ opacity: 0, height: 0, overflow: "hidden" }}
              animate={{ opacity: 1, height: "auto", overflow: "visible" }}
              exit={{ opacity: 0, height: 0, overflow: "hidden" }}
              transition={{ duration: 0.18 }}
            >
              <div className="space-y-1">
                <Label htmlFor="auth-name" className="text-[12.5px] font-medium text-slate-700">
                  Họ và tên
                </Label>
                <Input
                  id="auth-name"
                  type="text"
                  placeholder="Nguyễn Văn A"
                  autoComplete="name"
                  startIcon={<User className="size-4.5" />}
                  {...register("name")}
                  className={cn(errors.name && "border-red-400 focus-visible:border-red-500 focus-visible:ring-red-100")}
                />
                {errors.name && (
                  <p className="text-[11px] font-medium text-red-500">{errors.name.message}</p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Email field */}
        <div className="space-y-1">
          <Label htmlFor="auth-email" className="text-[12.5px] font-medium text-slate-700">
            {activeMode === "register" ? "Email nhận tài liệu học" : "Email đăng nhập"}
          </Label>
          <Input
            id="auth-email"
            type="email"
            placeholder="name@example.com"
            autoComplete="email"
            startIcon={<Mail className="size-4.5" />}
            {...register("email")}
            className={cn(errors.email && "border-red-400 focus-visible:border-red-500 focus-visible:ring-red-100")}
          />
          {errors.email && (
            <p className="text-[11px] font-medium text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Password field */}
        <div className="space-y-1">
          <Label htmlFor="auth-password" className="text-[12.5px] font-medium text-slate-700">
            Mật khẩu
          </Label>
          <Input
            id="auth-password"
            type={showPassword ? "text" : "password"}
            placeholder={activeMode === "register" ? "Tối thiểu 8 ký tự" : "Nhập mật khẩu"}
            autoComplete={activeMode === "register" ? "new-password" : "current-password"}
            startIcon={<Lock className="size-4.5" />}
            endIcon={
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="cursor-pointer text-slate-400 hover:text-slate-600 focus:outline-none"
                tabIndex={-1}
                aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
              >
                {showPassword ? <EyeOff className="size-4.5" /> : <Eye className="size-4.5" />}
              </button>
            }
            {...register("password")}
            className={cn(errors.password && "border-red-400 focus-visible:border-red-500 focus-visible:ring-red-100")}
          />
          {errors.password && (
            <p className="text-[11px] font-medium text-red-500">{errors.password.message}</p>
          )}
        </div>

        {/* Password Strength Meter - Only in register */}
        <AnimatePresence initial={false}>
          {activeMode === "register" && (
            <motion.div
              key="strength-meter"
              initial={{ opacity: 0, height: 0, overflow: "hidden" }}
              animate={{ opacity: 1, height: "auto", overflow: "visible" }}
              exit={{ opacity: 0, height: 0, overflow: "hidden" }}
              transition={{ duration: 0.18 }}
              className="space-y-1 pt-0.5"
            >
              {/* 3 Progress Bars */}
              <div className="grid grid-cols-3 gap-1.5">
                <div
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    passwordStrength >= 1
                      ? passwordStrength === 1
                        ? "bg-rose-500"
                        : passwordStrength === 2
                        ? "bg-amber-400"
                        : "bg-emerald-500"
                      : "bg-slate-200"
                  )}
                />
                <div
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    passwordStrength >= 2
                      ? passwordStrength === 2
                        ? "bg-amber-400"
                        : "bg-emerald-500"
                      : "bg-slate-200"
                  )}
                />
                <div
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    passwordStrength >= 3 ? "bg-emerald-500" : "bg-slate-200"
                  )}
                />
              </div>

              {/* Status and Encryption guarantee */}
              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  Độ mạnh mật khẩu:{" "}
                  <span
                    className={cn(
                      "font-semibold",
                      passwordStrength === 1 && "text-rose-500",
                      passwordStrength === 2 && "text-amber-500",
                      passwordStrength >= 3 && "text-emerald-600"
                    )}
                  >
                    {strengthLabel}
                  </span>
                </span>
                <span className="flex items-center gap-1 font-medium text-slate-500">
                  <ShieldCheck className="size-3.5 text-slate-400" />
                  Mã hóa bảo vệ
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Checkbox (Terms in register, Remember & Forgot Password in login) */}
        <div className="pt-0.5">
          {activeMode === "register" ? (
            <div className="flex items-start gap-2">
              <Checkbox
                id="accept-terms"
                checked={!!acceptTermsValue}
                onCheckedChange={(checked) =>
                  setValue("acceptTerms", !!checked, { shouldValidate: true })
                }
                className="mt-0.5 size-4 shrink-0 rounded-[4px] border-slate-300 data-checked:border-primary data-checked:bg-primary cursor-pointer"
              />
              <label
                htmlFor="accept-terms"
                className="text-[12px] leading-relaxed text-slate-600 select-none cursor-pointer"
              >
                Tôi đồng ý với{" "}
                <Link
                  href="/dieu-khoan-su-dung"
                  className="text-primary hover:underline font-normal"
                  onClick={(e) => e.stopPropagation()}
                >
                  Điều khoản dịch vụ
                </Link>{" "}
                và{" "}
                <Link
                  href="/chinh-sach-bao-mat"
                  className="text-primary hover:underline font-normal"
                  onClick={(e) => e.stopPropagation()}
                >
                  Chính sách bảo mật
                </Link>{" "}
                của BrightLingo.
              </label>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="remember-me"
                  checked={!!rememberMeValue}
                  onCheckedChange={(checked) =>
                    setValue("rememberMe", !!checked)
                  }
                  className="size-4 shrink-0 rounded-[4px] border-slate-300 data-checked:border-primary data-checked:bg-primary cursor-pointer"
                />
                <label
                  htmlFor="remember-me"
                  className="text-[12px] text-slate-600 select-none cursor-pointer"
                >
                  Ghi nhớ đăng nhập
                </label>
              </div>
              <Link
                href="/quen-mat-khau"
                className="text-[12px] font-medium text-primary hover:underline transition-colors"
              >
                Quên mật khẩu?
              </Link>
            </div>
          )}
          {errors.acceptTerms && activeMode === "register" && (
            <p className="mt-0.5 text-[11px] font-medium text-red-500">
              {errors.acceptTerms.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-1">
          <button
            type="submit"
            disabled={isSubmitting || isGoogleLoading}
            className="flex h-10.5 sm:h-11 w-full items-center justify-center gap-2 rounded-full bg-primary px-6 text-[14.5px] font-semibold text-white shadow-sm shadow-blue-500/20 transition-all hover:bg-primary/90 hover:shadow-md active:scale-[0.99] disabled:opacity-60 cursor-pointer"
          >
            {isSubmitting ? (
              <Loader2 className="size-4.5 animate-spin" />
            ) : (
              <>
                <span>
                  {activeMode === "register" ? "Tạo tài khoản miễn phí" : "Đăng nhập ngay"}
                </span>
                <ArrowRight className="size-4 stroke-[2.25]" />
              </>
            )}
          </button>
        </div>
      </form>

      {/* Mode Switcher */}
      <div className="mt-3.5 text-center text-[12.5px] text-slate-600">
        {activeMode === "register" ? (
          <>
            Đã có tài khoản?{" "}
            <button
              type="button"
              onClick={() => switchMode("login")}
              className="font-semibold text-primary hover:underline cursor-pointer"
            >
              Đăng nhập ngay
            </button>
          </>
        ) : (
          <>
            Chưa có tài khoản?{" "}
            <button
              type="button"
              onClick={() => switchMode("register")}
              className="font-semibold text-primary hover:underline cursor-pointer"
            >
              Đăng ký ngay
            </button>
          </>
        )}
      </div>
    </div>
  );
};

AuthForm.displayName = "AuthForm";

export default AuthForm;

