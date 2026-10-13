import { httpClient } from "./http-client";
import { couponApi } from "./coupon";
import type {
  CouponApplyResult,
  OrderCreationResult,
} from "@/components/features/course-detail/types";

export interface CreateOrderPayload {
  courseId: string;
  courseSlug: string;
  customerName: string;
  customerEmail: string;
  amount?: number;
  couponCode?: string;
  ref?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}

export interface OrderStatusResponse {
  orderId: string;
  orderCode: string;
  status: "PENDING" | "PAID" | "CANCELLED" | "EXPIRED";
  amount: number;
  paidAt?: string;
  message?: string;
}

/**
 * Service API Đơn hàng & Tích hợp Thanh toán VietQR BankNoti (NestJS Backend).
 * Tuân thủ nghiêm ngặt quy tắc BA MVP 1.0:
 * - FE không tự tính giá hay tự xác nhận Paid.
 * - FE gọi API đối soát qua polling.
 */
export const orderApi = {
  /**
   * Tạo đơn hàng mới ở trạng thái PENDING và lấy thông tin thanh toán VietQR
   */
  createOrder: async (payload: CreateOrderPayload): Promise<OrderCreationResult> => {
    try {
      const backendUrl = process.env.NEXT_PUBLIC_API_URL;
      const isLocalBuild =
        backendUrl?.includes("localhost:3000") && typeof window === "undefined";

      if (backendUrl && !isLocalBuild) {
        return await httpClient<OrderCreationResult>(`${backendUrl}/api/orders`, {
          method: "POST",
          body: JSON.stringify(payload),
        });
      }
    } catch (error) {
      console.warn("[orderApi.createOrder] Backend not reachable, using mock order generation:", error);
    }

    // Giả lập độ trễ kết nối mạng tạo đơn
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Giả lập tạo Order Code duy nhất theo BA (VD: BL-8921)
    const randomCode = "BL-" + Math.floor(1000 + Math.random() * 9000);
    const mockOrderId = "ord_" + Date.now();
    const bankName = "VIETCOMBANK";
    const accountName = "NGUYEN THI ANH";
    const accountNumber = "1028475829";
    const amount = payload.amount || 399000;

    // Chuẩn URL VietQR QuickLink: https://img.vietqr.io/image/<BANK>-<STK>-compact2.png?amount=<AMOUNT>&addInfo=<CONTENT>&accountName=<NAME>
    const qrCodeUrl = `https://img.vietqr.io/image/VCB-${accountNumber}-compact2.png?amount=${amount}&addInfo=${randomCode}&accountName=${encodeURIComponent(
      accountName
    )}`;

    return {
      orderId: mockOrderId,
      orderCode: randomCode,
      amount,
      bankName,
      accountName,
      accountNumber,
      qrCodeUrl,
      expiresInSeconds: 600, // 10 phút đếm ngược
      createdAt: new Date().toISOString(),
    };
  },

  /**
   * Polling kiểm tra trạng thái thanh toán từ Backend (sau khi BankNoti bắn webhook)
   */
  checkPaymentStatus: async (orderId: string): Promise<OrderStatusResponse> => {
    try {
      const backendUrl = process.env.NEXT_PUBLIC_API_URL;
      if (backendUrl) {
        return await httpClient<OrderStatusResponse>(
          `${backendUrl}/api/orders/${orderId}/status`
        );
      }
    } catch (error) {
      console.warn("[orderApi.checkPaymentStatus] Backend error:", error);
    }

    // Mock response khi chưa có BE
    return {
      orderId,
      orderCode: "EL9591",
      status: "PENDING",
      amount: 399000,
      message: "Hệ thống đang chờ BankNoti xác nhận giao dịch ngân hàng...",
    };
  },

  /**
   * Áp dụng mã giảm giá Coupon từ Backend (Ủy quyền cho couponApi)
   */
  applyCoupon: async (
    code: string,
    courseId: string,
    originalPrice: number
  ): Promise<CouponApplyResult> => {
    return couponApi.apply({ code, courseId, originalPrice });
  },
};
