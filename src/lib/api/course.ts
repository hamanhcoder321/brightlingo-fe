import { httpClient } from "./http-client";
import { getApiBaseUrl } from "./config";
import { COURSE_DETAIL_MOCK } from "@/components/features/course-detail/data/course-detail.data";
import {
  MOCK_COURSES,
  COURSE_CATEGORIES,
  type Course,
  type CourseCategory,
} from "@/components/features/home/data/courses.data";
import type { CourseDetail } from "@/components/features/course-detail/types";

/**
 * Service API lấy dữ liệu khóa học và danh mục từ Backend API (NestJS).
 */

function sanitizeImageUrl<T>(url?: T): T {
  if (typeof url === "string") {
    if (url.startsWith("http://") && !url.includes("localhost") && !url.includes("127.0.0.1")) {
      return url.replace("http://", "https://") as unknown as T;
    }
  }
  return url as T;
}

export const courseApi = {
  /**
   * Lấy chi tiết một khóa học theo slug (VD: english-for-real-life).
   * Trả về null nếu không tìm thấy hoặc khóa học ở trạng thái DRAFT (nháp).
   */
  getBySlug: async (
    slug: string,
    options?: { cached?: boolean },
  ): Promise<CourseDetail | null> => {
    const backendUrl = getApiBaseUrl();
    const isBuild = typeof window === "undefined" && process.env.npm_lifecycle_event === "build";

    if (backendUrl && !isBuild) {
      try {
        const res = await httpClient<CourseDetail>(
          `${backendUrl}/api/courses/${slug}`,
          options?.cached ? {} : { cache: "no-store" },
        );
        if (res && res.slug) {
          // Task C3: Nếu khóa học ở trạng thái Nháp (DRAFT), chặn không hiển thị ra FE public
          if (res.status && res.status.toUpperCase() !== "PUBLISHED") {
            return null;
          }
          if (res.image) res.image = sanitizeImageUrl(res.image);
          return res;
        }
        return null;
      } catch (error) {
        console.warn(`[courseApi.getBySlug] Không tìm thấy hoặc lỗi kết nối khóa học ${slug}:`, error);
        return null;
      }
    }

    // Fallback Mock data trong môi trường local offline nếu không có kết nối backend
    const foundMock = MOCK_COURSES.find((c) => c.slug === slug);
    if (foundMock) {
      return {
        ...COURSE_DETAIL_MOCK,
        id: foundMock.id,
        slug: foundMock.slug,
        title: foundMock.title,
        tagBadge: foundMock.description,
        price: foundMock.price,
        originalPrice: foundMock.originalPrice || 699000,
        image: sanitizeImageUrl(foundMock.image),
      };
    }

    // Không tồn tại -> trả về null để Next.js gọi notFound() 404 thực sự (Task C3)
    return null;
  },

  /**
   * Lấy danh sách tất cả các khóa học (Hỗ trợ lọc theo categoryId)
   */
  getAll: async (
    categoryId?: string,
    options?: { cached?: boolean },
  ): Promise<Course[]> => {
    const backendUrl = getApiBaseUrl();
    const isBuild = typeof window === "undefined" && process.env.npm_lifecycle_event === "build";

    if (backendUrl && !isBuild) {
      try {
        const query = categoryId && categoryId !== "all" ? `?categoryId=${encodeURIComponent(categoryId)}` : "";
        const data = await httpClient<Course[]>(
          `${backendUrl}/api/courses${query}`,
          options?.cached ? {} : { cache: "no-store" },
        );
        if (data && Array.isArray(data) && data.length > 0) {
          return data
            .filter((item) => !item.status || item.status.toUpperCase() === "PUBLISHED")
            .map((item) => ({ ...item, image: sanitizeImageUrl(item.image) }));
        }
      } catch (error) {
        console.warn(`[courseApi.getAll] Không kết nối được backend, dùng dữ liệu dự phòng:`, error);
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
    const backendUrl = getApiBaseUrl();
    const isBuild = typeof window === "undefined" && process.env.npm_lifecycle_event === "build";

    if (backendUrl && !isBuild) {
      try {
        const data = await httpClient<CourseCategory[]>(`${backendUrl}/api/categories`, {
          cache: "no-store",
        });
        if (data && Array.isArray(data) && data.length > 0) {
          return [{ id: "all", name: "Tất cả" }, ...data];
        }
      } catch (error) {
        console.warn(`[courseApi.getCategories] Không kết nối được backend, dùng danh mục dự phòng:`, error);
      }
    }

    return COURSE_CATEGORIES as CourseCategory[];
  },

  /**
   * Gửi thống kê lượt xem trang thực tế
   */
  trackView: async (slug: string): Promise<void> => {
    const backendUrl = getApiBaseUrl();
    if (!backendUrl) return;
    try {
      await fetch(`${backendUrl}/api/courses/${slug}/view`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
    } catch {
      // Bỏ qua lỗi nền thống kê
    }
  },
};
