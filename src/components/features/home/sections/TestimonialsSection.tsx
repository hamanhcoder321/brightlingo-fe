import { MessageSquareQuote } from "lucide-react";
import { Container } from "@/components/common/Container";
import { cn } from "@/lib/utils";
import { TestimonialCard } from "../components/TestimonialCard";
import {
  MOCK_TESTIMONIALS,
  type Testimonial,
} from "../data/testimonials.data";

export interface TestimonialsSectionProps {
  /**
   * Hỗ trợ truyền dữ liệu từ Server Component hoặc API khi tích hợp sau này.
   * Mặc định dùng mock data chuẩn theo thiết kế.
   */
  initialTestimonials?: Testimonial[];
  className?: string;
}

export function TestimonialsSection({
  initialTestimonials = MOCK_TESTIMONIALS as Testimonial[],
  className,
}: TestimonialsSectionProps) {
  return (
    <section
      id="danh-gia"
      className={cn(
        "w-full scroll-mt-20 bg-slate-50/70 py-12 sm:py-16 lg:py-20",
        className
      )}
    >
      <Container>
        {/* Header: Badge, Heading, Subtitle căn giữa */}
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50/80 px-3.5 py-1 text-xs font-semibold text-amber-700">
            <MessageSquareQuote className="size-3.5 text-amber-600" />
            <span>Phản hồi từ người học</span>
          </div>

          <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-[34px] lg:leading-tight">
            Hơn 8.500+ học viên đã tự tin nói tiếng Anh
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-500 sm:text-base">
            Cảm nhận chân thực từ những người đi làm bận rộn và học sinh, sinh
            viên sau khi trải nghiệm các tài liệu và khóa học số tại BrightLingo.
          </p>
        </div>

        {/* Lưới 3 Cards đánh giá */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {initialTestimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </Container>
    </section>
  );
}
