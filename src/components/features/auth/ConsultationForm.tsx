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
  source?: string; // Nguồn trang điền: "Trang chủ", "Trang đăng ký", etc.
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
  source,
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
      note: "",
    },
  });

  const onSubmit = async (data: ConsultationFormData) => {
    setIsSubmitting(true);
    try {
      const res = await consultationApi.submit(data, source);
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
            className="text-[15px] font-medium text-ink"
          >
            Họ và tên <span className="text-rose-500">*</span>
          </Label>
          <Input
            id="consultation-fullName"
            type="text"
            placeholder="Nguyễn Văn A"
            disabled={isSubmitting}
            className={cn(
              "h-12 rounded-lg border-input bg-white text-base text-ink placeholder:text-muted-foreground",
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
            className="text-[15px] font-medium text-ink"
          >
            Số điện thoại <span className="text-rose-500">*</span>
          </Label>
          <Input
            id="consultation-phone"
            type="tel"
            placeholder="0912 345 678"
            disabled={isSubmitting}
            className={cn(
              "h-12 rounded-lg border-input bg-white text-base text-ink placeholder:text-muted-foreground",
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
          className="text-[15px] font-medium text-ink"
        >
          Email <span className="text-rose-500">*</span>
        </Label>
        <Input
          id="consultation-email"
          type="email"
          placeholder="email@example.com"
          disabled={isSubmitting}
          className={cn(
            "h-12 rounded-lg border-input bg-white text-base text-ink placeholder:text-muted-foreground",
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
          className="text-[15px] font-medium text-ink"
        >
          Khóa học quan tâm
        </Label>
        <div className="relative">
          <select
            id="consultation-course"
            disabled={isSubmitting}
            className={cn(
              "flex h-12 w-full appearance-none rounded-lg border border-input bg-white px-3.5 pr-10 text-base text-ink transition-colors focus:border-primary focus:outline-none focus:ring-3 focus:ring-primary/15 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer",
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

      {/* Row 4: Ghi chú thêm (Tùy chọn) */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <Label
            htmlFor="consultation-note"
            className="text-[15px] font-medium text-ink"
          >
            Ghi chú thêm
          </Label>
          <span className="text-xs text-muted-foreground font-normal">Không bắt buộc</span>
        </div>
        <Input
          id="consultation-note"
          type="text"
          placeholder="Mục tiêu học, khung giờ tiện nhận cuộc gọi..."
          disabled={isSubmitting}
          className="h-12 rounded-lg border-input bg-white text-base text-ink placeholder:text-muted-foreground"
          {...register("note")}
        />
        {errors.note && (
          <p className="text-[11.5px] font-medium text-rose-500">
            {errors.note.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex h-14 w-full items-center justify-center gap-2 rounded-lg bg-accent px-6 text-lg font-semibold text-white transition-all hover:bg-accent/90 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="size-4.5 animate-spin" />
              <span>Đang gửi thông tin...</span>
            </>
          ) : (
            <span>Gửi yêu cầu tư vấn</span>
          )}
        </button>
      </div>
    </form>
  );
};

ConsultationForm.displayName = "ConsultationForm";
