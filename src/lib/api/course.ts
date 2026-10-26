import { httpClient, HttpError } from "./http-client";
import type { Course, CourseCategory } from "@/components/features/home/data/courses.data";
import type { CourseDetail } from "@/components/features/course-detail/types";

/**
 * Service API lấy dữ liệu khóa học và danh mục từ Backend API (NestJS).
 * Không dùng mock: lỗi API/timeout được throw để UI hiển thị trạng thái lỗi.
 */

const API_TIMEOUT_MS = 15000;

function requireBackendUrl(fn: string): string {
  const backendUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!backendUrl) throw new Error(`[courseApi.${fn}] Thiếu NEXT_PUBLIC_API_URL`);
  return backendUrl;
}

function isPublished(status?: string): boolean {
  return !status || status.toUpperCase() === "PUBLISHED";
}

function sanitizeImageUrl<T extends string | any>(url?: T): T {
  if (typeof url === "string") {
    if (url.startsWith("http://") && !url.includes("localhost") && !url.includes("127.0.0.1")) {
      return url.replace("http://", "https://") as T;
    }
  }
  return url as T;
}

export const courseApi = {
  /**
   * Lấy chi tiết một khóa học theo slug (VD: english-for-real-life)
   */
  getBySlug: async (
    slug: string,
    options?: { cached?: boolean },
  ): Promise<CourseDetail | null> => {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!backendUrl) {
      throw new Error("[courseApi.getBySlug] Thiếu NEXT_PUBLIC_API_URL");
    }

    let res: CourseDetail | null;
    try {
      res = await httpClient<CourseDetail | null>(
        `${backendUrl}/api/courses/${encodeURIComponent(slug)}`,
        {
          ...(options?.cached ? {} : { cache: "no-store" as const }),
          signal: AbortSignal.timeout(15000),
        },
      );
    } catch (error) {
      // 404: khóa học không tồn tại hoặc chưa công khai (API chỉ trả PUBLISHED cho khách).
      if (error instanceof HttpError && error.status === 404) return null;
      // Lỗi hệ thống/timeout/mạng: không dùng dữ liệu giả, để Next.js trả trang lỗi.
      throw error;
    }

    if (!res || typeof res !== "object" || !res.slug) return null;
    if (res.status && res.status.toUpperCase() !== "PUBLISHED") return null;

    if (res.image) res.image = sanitizeImageUrl(res.image);
    return res;
  },

  /**
   * Lấy danh sách tất cả các khóa học (Hỗ trợ lọc theo categoryId)
   */
  getAll: async (
    categoryId?: string,
    options?: { cached?: boolean },
  ): Promise<Course[]> => {
    const backendUrl = requireBackendUrl("getAll");
    const query = categoryId && categoryId !== "all" ? `?categoryId=${encodeURIComponent(categoryId)}` : "";
    const data = await httpClient<Course[]>(`${backendUrl}/api/courses${query}`, {
      ...(options?.cached ? {} : { cache: "no-store" as const }),
      signal: AbortSignal.timeout(API_TIMEOUT_MS),
    });
    if (!Array.isArray(data)) {
      throw new Error("[courseApi.getAll] API trả dữ liệu không phải danh sách");
    }
    return data
      .filter((item) => item && typeof item.slug === "string" && item.slug && isPublished(item.status))
      .map((item) => ({ ...item, image: sanitizeImageUrl(item.image) }));
  },

  /**
   * Lấy danh sách tất cả danh mục (Categories), luôn kèm mục "Tất cả" ở đầu.
   */
  getCategories: async (): Promise<CourseCategory[]> => {
    const backendUrl = requireBackendUrl("getCategories");
    const data = await httpClient<CourseCategory[]>(`${backendUrl}/api/categories`, {
      cache: "no-store",
      signal: AbortSignal.timeout(API_TIMEOUT_MS),
    });
    if (!Array.isArray(data)) {
      throw new Error("[courseApi.getCategories] API trả dữ liệu không phải danh sách");
    }
    return [{ id: "all", name: "Tất cả" }, ...data.filter((c) => c && c.id && c.name)];
  },

  /**
   * Gửi thống kê lượt xem trang thực tế
   */
  trackView: async (slug: string): Promise<void> => {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
    try {
      await fetch(`${backendUrl}/api/courses/${slug}/view`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
    } catch {
      // Ignore background analytics errors silently
    }
  },
};
