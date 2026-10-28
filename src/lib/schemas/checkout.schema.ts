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
  phone: z
    .string()
    .regex(/^(0|\+84)[3|5|7|8|9][0-9]{8}$/, "Số điện thoại không hợp lệ (10 chữ số, VD: 0912345678)")
    .optional()
    .or(z.literal("")),
  couponCode: z.string().optional(),
});

export type DirectCheckoutFormData = z.infer<typeof directCheckoutSchema>;
