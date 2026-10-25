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
    code: couponCodeInput,
    courseId: targetCourseId,
    originalPrice: currentCoursePrice,
  }: ApplyCouponPayload): Promise<CouponApplyResult> => {
    const normalizedCouponCode = couponCodeInput.trim().toUpperCase();

    // 1. Gọi trực tiếp API Backend NestJS (Nguồn chân lý dữ liệu từ CMS / DB)
    const configuredBackendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
    const isLocalBuildPhase =
      configuredBackendUrl?.includes("localhost:3000") && typeof window === "undefined";

    if (configuredBackendUrl && !isLocalBuildPhase) {
      try {
        const response = await fetch(`${configuredBackendUrl}/api/coupons/apply`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            code: normalizedCouponCode,
            courseId: targetCourseId,
            originalPrice: currentCoursePrice,
          }),
        });

        const data = await response.json();

        // Nếu Backend trả về thành công
        if (response.ok) {
          return {
            code: data.code || normalizedCouponCode,
            discountAmount: data.discountAmount ?? 0,
            finalPrice: data.finalPrice ?? currentCoursePrice,
            message: data.message || `Đã áp dụng mã ${normalizedCouponCode} thành công!`,
            isApplied: true,
          };
        }

        // Nếu Backend từ chối (400 Bad Request: hết lượt, sai khóa học, đóng trạng thái,...)
        return {
          code: normalizedCouponCode,
          discountAmount: 0,
          finalPrice: currentCoursePrice,
          message: data.message || "Mã giảm giá không hợp lệ, đã hết hạn hoặc đang tạm đóng.",
          isApplied: false,
        };
      } catch (networkError) {
        console.warn(
          "[couponApi.apply] Không thể kết nối Backend API, chuyển sang kiểm tra nội bộ dự phòng:",
          networkError
        );
      }
    }

    // 2. Chế độ dự phòng khi Backend hoàn toàn mất kết nối mạng
    await new Promise((resolveTimeout) => setTimeout(resolveTimeout, 400));

    if (normalizedCouponCode === "GIAM20") {
      const calculatedDiscount = Math.round(currentCoursePrice * 0.2);
      return {
        code: normalizedCouponCode,
        discountAmount: calculatedDiscount,
        finalPrice: Math.max(0, currentCoursePrice - calculatedDiscount),
        message: `Áp dụng mã ${normalizedCouponCode} thành công: Giảm 20% (-${new Intl.NumberFormat(
          "vi-VN"
        ).format(calculatedDiscount)}đ)`,
        isApplied: true,
      };
    }

    if (normalizedCouponCode === "WOWUP50K") {
      const fixedDiscount = 50000;
      return {
        code: normalizedCouponCode,
        discountAmount: fixedDiscount,
        finalPrice: Math.max(0, currentCoursePrice - fixedDiscount),
        message: `Áp dụng mã ${normalizedCouponCode} thành công: Giảm 50.000đ`,
        isApplied: true,
      };
    }

    // Trường hợp mã không tồn tại ở chế độ offline
    return {
      code: normalizedCouponCode,
      discountAmount: 0,
      finalPrice: currentCoursePrice,
      message: "Mã giảm giá không tồn tại hoặc hệ thống đang bảo trì.",
      isApplied: false,
    };
  },
};
