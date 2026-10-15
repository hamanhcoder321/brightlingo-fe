import {
  HeroSection,
  CoursesSection,
  HowToBuySection,
  CommunitySection,
  FaqSection,
  ConsultationSection,
} from "@/components/features/home";

// Thứ tự khối theo template: Hero → Khóa học → Mua 3 bước → Cộng đồng → (Góc chia sẻ – GĐ2) → Hỏi đáp & Chính sách → Form tư vấn
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CoursesSection />
      <HowToBuySection />
      <CommunitySection />
      <FaqSection />
      <ConsultationSection />
    </>
  );
}
