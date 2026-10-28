import { getApiBaseUrl } from "./config";
import type { CouponApplyResult } from "@/components/features/course-detail/types";

export interface ApplyCouponPayload {
  code: string;
  courseId: string;
  originalPrice: number;
}

/**
 * Service API Quản lý & Xác thực mã giảm giá (Coupon) từ CMS / Backend (NestJS).
 * Tuân thủ quy tắc BA MVP 1.0 (Mục 10 & 4.4):
 * - Backend là Nguồn chân lý (Source of Truth) cho tính toán giá.
 * - Kiểm tra thời hạn, số lượt dùng và phạm vi áp dụng của mã.
 */
export const couponApi = {
  apply: async ({
    code,
    courseId,
    originalPrice,
  }: ApplyCouponPayload): Promise<CouponApplyResult> => {
    const formattedCode = code.trim().toUpperCase();

    // 1. Gọi API Backend/CMS thực tế nếu có cấu hình
    const backendUrl = getApiBaseUrl();
    const isLocalBuild =
      backendUrl?.includes("localhost:3000") && typeof window === "undefined";

    if (backendUrl && !isLocalBuild) {
      try {
        const response = await fetch(`${backendUrl}/api/coupons/apply`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            code: formattedCode,
            courseId,
            originalPrice: Number(originalPrice) || 0,
          }),
        });

        const result = await response.json();

        if (!response.ok) {
          const errorMessage = Array.isArray(result?.message)
            ? result.message.join(", ")
            : result?.message ||
              "Mã giảm giá không hợp lệ hoặc không áp dụng được cho khóa học này.";
          return {
            code: formattedCode,
            discountAmount: 0,
            finalPrice: originalPrice,
            message: errorMessage,
            isApplied: false,
          };
        }

        return {
          code: result.code || formattedCode,
          discountAmount: Number(result.discountAmount) || 0,
          finalPrice:
            result.finalPrice !== undefined
              ? Number(result.finalPrice)
              : Math.max(0, originalPrice - (Number(result.discountAmount) || 0)),
          message:
            result.message || `Áp dụng mã ${formattedCode} thành công!`,
          isApplied: true,
        };
      } catch (error) {
        console.warn(
          "[couponApi.apply] Không thể kết nối API Backend, kiểm tra fallback:",
          error
        );
      }
    }

    // 2. Giả lập đối soát theo logic CMS khi backend chưa chạy
    await new Promise((resolve) => setTimeout(resolve, 600)); // Network delay trải nghiệm thực tế

    if (formattedCode === "GIAM20") {
      const discount = Math.round(originalPrice * 0.2);
      return {
        code: formattedCode,
        discountAmount: discount,
        finalPrice: Math.max(0, originalPrice - discount),
        message: `Áp dụng mã ${formattedCode} thành công: Giảm 20% (-${new Intl.NumberFormat(
          "vi-VN"
        ).format(discount)}đ)`,
        isApplied: true,
      };
    }

    if (formattedCode === "WOWUP50K") {
      const discount = 50000;
      return {
        code: formattedCode,
        discountAmount: discount,
        finalPrice: Math.max(0, originalPrice - discount),
        message: `Áp dụng mã ${formattedCode} thành công: Giảm 50.000đ`,
        isApplied: true,
      };
    }

    if (formattedCode === "BRIGHT50") {
      return {
        code: formattedCode,
        discountAmount: 0,
        finalPrice: originalPrice,
        message:
          "Áp dụng mã BRIGHT50 thành công - Khóa học hiện đã áp dụng giá ưu đãi trọn gói tốt nhất!",
        isApplied: true,
      };
    }

    // Trường hợp mã không hợp lệ hoặc hết hạn từ CMS
    return {
      code: formattedCode,
      discountAmount: 0,
      finalPrice: originalPrice,
      message: "Mã giảm giá không tồn tại, đã hết hạn hoặc hết lượt sử dụng.",
      isApplied: false,
    };
  },
};
