import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Vui lòng nhập email")
    .email("Định dạng email không hợp lệ"),
  password: z
    .string()
    .min(6, "Mật khẩu tối thiểu 6 ký tự"),
  rememberMe: z.boolean().default(true),
});

export const registerSchema = z.object({
  name: z
    .string()
    .min(2, "Họ và tên tối thiểu 2 ký tự"),
  email: z
    .string()
    .min(1, "Vui lòng nhập email")
    .email("Định dạng email không hợp lệ"),
  password: z
    .string()
    .min(8, "Mật khẩu tối thiểu 8 ký tự"),
  acceptTerms: z
    .boolean()
    .refine((val) => val === true, {
      message: "Vui lòng đồng ý với Điều khoản dịch vụ & Chính sách bảo mật",
    }),
});

export const authFormSchema = z.object({
  mode: z.enum(["login", "register"]),
  name: z.string().optional(),
  email: z
    .string()
    .min(1, "Vui lòng nhập email")
    .email("Định dạng email không hợp lệ"),
  password: z.string().min(1, "Vui lòng nhập mật khẩu"),
  rememberMe: z.boolean().optional(),
  acceptTerms: z.boolean().optional(),
}).superRefine((data, ctx) => {
  if (data.mode === "register") {
    if (!data.name || data.name.trim().length < 2) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["name"],
        message: "Vui lòng nhập họ và tên (tối thiểu 2 ký tự)",
      });
    }
    if (data.password.length < 8) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["password"],
        message: "Mật khẩu tối thiểu 8 ký tự",
      });
    }
    if (!data.acceptTerms) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["acceptTerms"],
        message: "Vui lòng đồng ý với Điều khoản và Chính sách bảo mật",
      });
    }
  } else {
    // Mode login
    if (data.password.length < 6) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["password"],
        message: "Mật khẩu tối thiểu 6 ký tự",
      });
    }
  }
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type AuthFormData = z.infer<typeof authFormSchema>;
