import { httpClient } from "./http-client";
import { COURSE_DETAIL_MOCK } from "@/components/features/course-detail/data/course-detail.data";
import type { CourseDetail } from "@/components/features/course-detail/types";

/**
 * Service API lấy dữ liệu khóa học từ Backend API (NestJS).
 * Đã cấu hình fallback mock data khi chưa kết nối BE thật.
 */
export const courseApi = {
  /**
   * Lấy chi tiết một khóa học theo slug (VD: english-for-real-life)
   */
  getBySlug: async (slug: string): Promise<CourseDetail> => {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL;
    const isLocalBuild = backendUrl?.includes("localhost:3000") && typeof window === "undefined";

    if (backendUrl && !isLocalBuild) {
      try {
        return await httpClient<CourseDetail>(`${backendUrl}/api/courses/${slug}`, {
          cache: "no-store",
        });
      } catch (error) {
        console.warn(`[courseApi.getBySlug] Backend not reachable, using fallback mock data:`, error);
      }
    }

    // Fallback Mock data theo đúng giao diện
    if (slug === COURSE_DETAIL_MOCK.slug || slug === "english-for-real-life") {
      return COURSE_DETAIL_MOCK;
    }

    // Trả về mock mặc định nếu slug khác
    return {
      ...COURSE_DETAIL_MOCK,
      slug,
    };
  },

  /**
   * Lấy danh sách tất cả các khóa học
   */
  getAll: async (): Promise<CourseDetail[]> => {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL;
    const isLocalBuild = backendUrl?.includes("localhost:3000") && typeof window === "undefined";

    if (backendUrl && !isLocalBuild) {
      try {
        return await httpClient<CourseDetail[]>(`${backendUrl}/api/courses`, {
          cache: "no-store",
        });
      } catch (error) {
        console.warn(`[courseApi.getAll] Backend not reachable, using fallback:`, error);
      }
    }

    return [COURSE_DETAIL_MOCK];
  },
};
