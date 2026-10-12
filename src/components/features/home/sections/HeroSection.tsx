import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star } from "lucide-react";
import { Container } from "@/components/common/Container";
import { IMAGES } from "@/lib/constants/images";

const HERO_RATING = {
  score: "4.9/5.0",
  students: "8.500+ học viên",
  caption: "Đồng hành học tiếng Anh thực chiến cùng người Việt",
} as const;

export function HeroSection() {
  return (
    <section className="w-full bg-slate-50">
      <Container className="grid grid-cols-1 gap-10 py-12 sm:py-16 lg:grid-cols-[1.7fr_1fr] lg:gap-x-12 lg:gap-y-0 lg:py-20">
        {/* 1. Tiêu đề + mô tả (desktop: cột trái, hàng 1) */}
        <div className="lg:col-start-1 lg:row-start-1 lg:self-end">
          <h1 className="text-4xl font-extrabold leading-[1.15] tracking-tight text-slate-900 sm:text-5xl lg:text-[52px]">
            <span className="block">Tiếng Anh mở ra</span>
            <span className="block">
              <span className="text-primary">phiên bản tốt hơn</span> của bạn
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-slate-500">
            Các khóa học online chất lượng cao, thiết thực cho người Việt. Học
            mọi lúc, mọi nơi với phương pháp tinh gọn lý thuyết, tập trung phản
            xạ thực tế.
          </p>
        </div>

        {/* 2. Ảnh + thẻ đánh giá: mobile nằm giữa, desktop cột phải chiếm 2 hàng (co giãn theo cột, không fix cứng kích thước) */}
        <div className="relative mx-auto h-full w-full max-w-md overflow-hidden rounded-[28px] shadow-[0_20px_50px_rgba(15,23,42,0.15)] lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:max-w-none">
          <Image
            src={IMAGES.HERO_BANNER}
            alt="Học viên BrightLingo học tiếng Anh trực tuyến cùng giảng viên"
            loading="eager"
            fetchPriority="high"
            sizes="(min-width: 1024px) 37vw, 100vw"
            className="block h-full w-full object-cover object-center"
          />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/35 to-transparent" />

          <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-white/90 px-5 py-4 shadow-lg backdrop-blur-md">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Star className="size-4 fill-amber-400 text-amber-400" />
                <span className="text-sm font-bold text-slate-900">
                  {HERO_RATING.score}
                </span>
              </div>
              <span className="text-sm font-bold text-primary">
                {HERO_RATING.students}
              </span>
            </div>
            <p className="mt-1.5 text-xs text-slate-500">
              {HERO_RATING.caption}
            </p>
          </div>
        </div>

        {/* 3. Nút CTA: mobile nằm dưới cùng, desktop nằm dưới phần mô tả ở cột trái */}
        <div className="flex flex-wrap items-center gap-4 lg:col-start-1 lg:row-start-2 lg:mt-8 lg:self-start">
          <Link
            href="/khoa-hoc"
            className="inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-primary px-7 text-[15px] font-semibold text-white shadow-md shadow-blue-500/25 transition-all hover:bg-primary/90 hover:shadow-lg active:scale-[0.99]"
          >
            Khám phá khóa học
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href="#tu-van"
            className="inline-flex h-12 items-center justify-center whitespace-nowrap rounded-full border border-slate-200 bg-white px-7 text-[15px] font-semibold text-slate-700 transition-all hover:bg-slate-50 active:scale-[0.99]"
          >
            Đăng ký tư vấn
          </Link>
        </div>
      </Container>
    </section>
  );
}
