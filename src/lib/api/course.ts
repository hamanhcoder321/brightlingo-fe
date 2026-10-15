import { httpClient } from "./http-client";
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
 * Đã cấu hình fallback mock data khi chưa kết nối BE thật.
 */
export const courseApi = {
  /**
   * Lấy chi tiết một khóa học theo slug (VD: english-for-real-life)
   */
  getBySlug: async (slug: string): Promise<CourseDetail> => {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL;
    const isBuild = typeof window === "undefined" && process.env.npm_lifecycle_event === "build";

    if (backendUrl && !isBuild) {
      try {
        return await httpClient<CourseDetail>(`${backendUrl}/api/courses/${slug}`, {
          cache: "no-store",
        });
      } catch (error) {
        console.warn(`[courseApi.getBySlug] Backend not reachable, using fallback mock data:`, error);
      }
    }

    // Tìm trong MOCK_COURSES nếu có
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
        image: foundMock.image,
      };
    }

    // Fallback Mock data theo đúng giao diện
    return {
      ...COURSE_DETAIL_MOCK,
      slug,
    };
  },

  /**
   * Lấy danh sách tất cả các khóa học (Hỗ trợ lọc theo categoryId)
   */
  getAll: async (categoryId?: string): Promise<Course[]> => {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL;
    const isBuild = typeof window === "undefined" && process.env.npm_lifecycle_event === "build";

    if (backendUrl && !isBuild) {
      try {
        const query = categoryId && categoryId !== "all" ? `?categoryId=${encodeURIComponent(categoryId)}` : "";
        const data = await httpClient<Course[]>(`${backendUrl}/api/courses${query}`, {
          cache: "no-store",
        });
        if (data && data.length > 0) {
          return data;
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
};
