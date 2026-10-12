/**
 * Khai báo tập trung toàn bộ đường dẫn ảnh tĩnh của dự án.
 * Giúp dễ dàng quản lý, thay đổi và import vào các component khác.
 */

// Đổi đường dẫn static import ở đây
import logoBrightLingo from "@/assets/images/screen.png";
import heroStudent from "@/assets/images/hero-student.jpg";
import courseImg1 from "@/assets/images/khoa-hoc-images-1.jpg";
import courseImg2 from "@/assets/images/khoa-hoc-images-2.jpg";
import courseImg3 from "@/assets/images/khoa-hoc-images-3.png";
import courseImg4 from "@/assets/images/khoa-hoc-images-4.jpg";

export const IMAGES = {
  // --- BRANDING ---
  LOGO: logoBrightLingo,
  FAVICON: "/images/brand/favicon.ico",

  // --- HERO & BANNERS ---
  HERO_BANNER: heroStudent,

  // --- COURSES ---
  COURSES: {
    COURSE_1: courseImg1,
    COURSE_2: courseImg2,
    COURSE_3: courseImg3,
    COURSE_4: courseImg4,
  },

  // --- ICONS (Nếu dùng ảnh thay vì svg/lucide) ---
  
  
  // --- MOCKUP USERS / TESTIMONIALS ---
  
};
