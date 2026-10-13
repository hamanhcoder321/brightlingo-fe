import { z } from "zod";

export const directCheckoutSchema = z.object({
  fullName: z
    .string()
    .min(2, "Vui lòng nhập họ và tên học viên (tối thiểu 2 ký tự)")
    .max(100, "Họ và tên không được quá 100 ký tự"),
  email: z
    .string()
    .min(1, "Vui lòng nhập email nhận link khóa học")
    .email("Email không hợp lệ (ví dụ: nguyenvan@gmail.com)"),
  couponCode: z.string().optional(),
});

export type DirectCheckoutFormData = z.infer<typeof directCheckoutSchema>;
