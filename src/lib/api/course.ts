import { httpClient, HttpError } from "./http-client";
import {
  MOCK_COURSES,
  COURSE_CATEGORIES,
  type Course,
  type CourseCategory,
} from "@/components/features/home/data/courses.data";
import type { CourseDetail } from "@/components/features/course-detail/types";

/**
 * Service API lấy dữ liệu khóa học và danh mục từ Backend API (NestJS).
 * Đã cấu hình fallback mock data khi chưa kết nối BE thật.
 */

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
    const backendUrl = process.env.NEXT_PUBLIC_API_URL;
    const isBuild = typeof window === "undefined" && process.env.npm_lifecycle_event === "build";

    if (backendUrl && !isBuild) {
      try {
        const query = categoryId && categoryId !== "all" ? `?categoryId=${encodeURIComponent(categoryId)}` : "";
        const data = await httpClient<Course[]>(
          `${backendUrl}/api/courses${query}`,
          options?.cached ? {} : { cache: "no-store" },
        );
        if (data && data.length > 0) {
          return data.map((item) => ({ ...item, image: sanitizeImageUrl(item.image) }));
        }
      } catch (error) {
        console.warn(`[courseApi.getAll] Backend not reachable, using fallback:`, error);
      }
    }

    if (categoryId && categoryId !== "all") {
      return MOCK_COURSES.filter((c) => c.categoryId === categoryId);
    }
    return MOCK_COURSES as Course[];
  },

  /**
   * Lấy danh sách tất cả danh mục (Categories)
   */
  getCategories: async (): Promise<CourseCategory[]> => {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL;
    const isBuild = typeof window === "undefined" && process.env.npm_lifecycle_event === "build";

    if (backendUrl && !isBuild) {
      try {
        const data = await httpClient<CourseCategory[]>(`${backendUrl}/api/categories`, {
          cache: "no-store",
        });
        if (data && data.length > 0) {
          return [{ id: "all", name: "Tất cả" }, ...data];
        }
      } catch (error) {
        console.warn(`[courseApi.getCategories] Backend not reachable, using fallback:`, error);
      }
    }

    return COURSE_CATEGORIES as CourseCategory[];
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
