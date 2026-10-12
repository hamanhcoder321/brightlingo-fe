import { z } from "zod";

export const consultationSchema = z.object({
  fullName: z
    .string()
    .min(2, "Vui lòng nhập họ và tên (tối thiểu 2 ký tự)")
    .max(100, "Họ và tên không được quá 100 ký tự"),
  phone: z
    .string()
    .min(10, "Số điện thoại không hợp lệ (tối thiểu 10 chữ số)")
    .max(15, "Số điện thoại không hợp lệ")
    .regex(/^[0-9+.\s()-]+$/, "Số điện thoại chỉ được chứa chữ số và dấu hợp lệ"),
  email: z
    .string()
    .min(1, "Vui lòng nhập địa chỉ email")
    .email("Email không hợp lệ (ví dụ: email@example.com)"),
  courseInterest: z
    .string()
    .min(1, "Vui lòng chọn khóa học bạn quan tâm"),
});

export type ConsultationFormData = z.infer<typeof consultationSchema>;
