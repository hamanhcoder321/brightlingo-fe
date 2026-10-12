"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  consultationSchema,
  type ConsultationFormData,
} from "@/lib/schemas/consultation.schema";
import {
  consultationApi,
  type ConsultationResponse,
} from "@/lib/api/consultation";

export interface ConsultationFormProps {
  onSuccess?: (res: ConsultationResponse) => void;
  className?: string;
}

const DEFAULT_COURSE_OPTIONS = [
  "English for Real Life",
  "IELTS Writing Master & Kit",
  "Business English for Global Work",
  "Ngữ pháp & 1000 Mẫu câu số",
  "Tư vấn lộ trình học phù hợp (Chưa rõ mục tiêu)",
] as const;

export const ConsultationForm: React.FC<ConsultationFormProps> = ({
  onSuccess,
  className,
}) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ConsultationFormData>({
    resolver: zodResolver(consultationSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      courseInterest: "English for Real Life",
    },
  });

  const onSubmit = async (data: ConsultationFormData) => {
    setIsSubmitting(true);
    try {
      const res = await consultationApi.submit(data);
      toast.success("Gửi yêu cầu thành công!", {
        description:
          "Chuyên viên BrightLingo sẽ liên hệ tư vấn qua số " +
          data.phone +
          " trong 30 phút tới.",
      });
      reset();
      if (onSuccess) onSuccess(res);
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Đã xảy ra lỗi khi gửi yêu cầu, vui lòng thử lại sau!";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("space-y-4", className)}
      noValidate
    >
      {/* Row 1: Họ tên + Số điện thoại */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label
            htmlFor="consultation-fullName"
            className="text-[13px] font-medium text-slate-800"
          >
            Họ và tên <span className="text-rose-500">*</span>
          </Label>
          <Input
            id="consultation-fullName"
            type="text"
            placeholder="Nguyễn Văn A"
            disabled={isSubmitting}
            className={cn(
              "h-11 rounded-xl bg-slate-50/60 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:bg-white",
              errors.fullName && "border-rose-400 focus-visible:ring-rose-200"
            )}
            {...register("fullName")}
          />
          {errors.fullName && (
            <p className="text-[11.5px] font-medium text-rose-500">
              {errors.fullName.message}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label
            htmlFor="consultation-phone"
            className="text-[13px] font-medium text-slate-800"
          >
            Số điện thoại <span className="text-rose-500">*</span>
          </Label>
          <Input
            id="consultation-phone"
            type="tel"
            placeholder="0912 345 678"
            disabled={isSubmitting}
            className={cn(
              "h-11 rounded-xl bg-slate-50/60 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:bg-white",
              errors.phone && "border-rose-400 focus-visible:ring-rose-200"
            )}
            {...register("phone")}
          />
          {errors.phone && (
            <p className="text-[11.5px] font-medium text-rose-500">
              {errors.phone.message}
            </p>
          )}
        </div>
      </div>

      {/* Row 2: Email */}
      <div className="space-y-1.5">
        <Label
          htmlFor="consultation-email"
          className="text-[13px] font-medium text-slate-800"
        >
          Email <span className="text-rose-500">*</span>
        </Label>
        <Input
          id="consultation-email"
          type="email"
          placeholder="email@example.com"
          disabled={isSubmitting}
          className={cn(
            "h-11 rounded-xl bg-slate-50/60 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:bg-white",
            errors.email && "border-rose-400 focus-visible:ring-rose-200"
          )}
          {...register("email")}
        />
        {errors.email && (
          <p className="text-[11.5px] font-medium text-rose-500">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Row 3: Khóa học quan tâm */}
      <div className="space-y-1.5">
        <Label
          htmlFor="consultation-course"
          className="text-[13px] font-medium text-slate-800"
        >
          Khóa học quan tâm
        </Label>
        <div className="relative">
          <select
            id="consultation-course"
            disabled={isSubmitting}
            className={cn(
              "flex h-11 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/60 px-3.5 pr-10 text-sm text-slate-900 transition-colors focus:bg-white focus:border-primary focus:outline-none focus:ring-3 focus:ring-primary/15 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer",
              errors.courseInterest &&
                "border-rose-400 focus:ring-rose-200"
            )}
            {...register("courseInterest")}
          >
            {DEFAULT_COURSE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-500" />
        </div>
        {errors.courseInterest && (
          <p className="text-[11.5px] font-medium text-rose-500">
            {errors.courseInterest.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-6 text-[15px] font-semibold text-white shadow-md shadow-blue-500/25 transition-all hover:bg-primary/90 hover:shadow-lg active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="size-4.5 animate-spin" />
              <span>Đang gửi thông tin...</span>
            </>
          ) : (
            <span>Gửi đăng ký tư vấn</span>
          )}
        </button>
      </div>
    </form>
  );
};

ConsultationForm.displayName = "ConsultationForm";
