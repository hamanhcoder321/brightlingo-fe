import type { ConsultationFormData } from "@/lib/schemas/consultation.schema";

export interface ConsultationResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    createdAt: string;
  };
}

/**
 * Service API gửi thông tin đăng ký tư vấn về hệ thống CMS / CRM.
 * Sẵn sàng thay bằng endpoint backend thực tế (VD: POST /api/consultations / webhook).
 */
export const consultationApi = {
  submit: async (data: ConsultationFormData): Promise<ConsultationResponse> => {
    // Giả lập network delay ngắn cho trải nghiệm người dùng
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (process.env.NODE_ENV !== "production") {
      console.log("[CMS Consultation Request Received]:", data);
    }

    return {
      success: true,
      message:
        "Đăng ký tư vấn thành công! Đội ngũ BrightLingo sẽ liên hệ với bạn trong vòng 30 phút.",
      data: {
        id: "consultation-" + Date.now(),
        createdAt: new Date().toISOString(),
      },
    };
  },
};
