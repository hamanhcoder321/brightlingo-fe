import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Infinity as InfinityIcon, Mail, QrCode, UserX } from "lucide-react";
import { Container } from "@/components/common/Container";
import { IMAGES } from "@/lib/constants/images";

const HERO_FEATURES = [
  {
    icon: UserX,
    title: "Không cần tài khoản",
    description: "Chỉ cần họ tên và email là mua được.",
  },
  {
    icon: QrCode,
    title: "Quét QR, tự động xác nhận",
    description: "Chuyển khoản xong, hệ thống tự nhận diện.",
  },
  {
    icon: InfinityIcon,
    title: "Học trọn đời",
    description: "Video & PDF trên Google Drive, xem trên mọi thiết bị.",
  },
] as const;

export function HeroSection() {
  return (
    <section className="w-full bg-cream">
      <Container className="py-10 sm:py-14 lg:py-16">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Nội dung */}
          <div>
            <span className="inline-flex rounded-full bg-[#FCE9D8] px-3 py-1 text-sm font-semibold text-price">
              Tiếng Anh thực chiến cho người Việt
            </span>
            <h1 className="mt-4 text-[34px] font-bold leading-[1.2] text-ink lg:text-[52px] lg:leading-[1.15]">
              Học tiếng Anh tại nhà{" "}
              <span className="text-primary">– nhanh gọn, dùng được ngay</span>
            </h1>
            <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-muted-foreground lg:text-lg">
              Khóa học video & tài liệu PDF ngắn gọn, dùng được ngay. Mua một lần, nhận
              link học qua email trong vài phút, học trọn đời – không cần tạo tài khoản.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/#khoa-hoc-noi-bat"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-lg bg-primary px-7 text-lg font-semibold text-white transition-colors hover:bg-primary/90"
              >
                Xem các khóa học
                <ArrowRight className="size-5" />
              </Link>
              <Link
                href="/#cach-mua"
                className="inline-flex h-14 items-center justify-center rounded-lg border-[1.5px] border-primary bg-white px-7 text-lg font-semibold text-primary transition-colors hover:bg-mint"
              >
                Mua hàng thế nào?
              </Link>
            </div>
          </div>

          {/* Ảnh hero + thẻ nổi */}
          <div className="relative">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-mint">
              <Image
                src={IMAGES.HERO_BANNER}
                alt="Học viên BrightLingo học tiếng Anh tại nhà"
                fill
                loading="eager"
                fetchPriority="high"
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-5 left-4 flex items-center gap-3 rounded-xl border border-border bg-white px-4 py-3 shadow-lg sm:left-6">
              <span className="flex size-9 items-center justify-center rounded-lg bg-mint text-primary">
                <Mail className="size-5" />
              </span>
              <div>
                <p className="text-sm font-semibold text-ink">Link học đã gửi tới email</p>
                <p className="text-xs text-muted-foreground">Ngay sau khi chuyển khoản</p>
              </div>
            </div>
          </div>
        </div>

        {/* 3 điểm nổi bật */}
        <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
          {HERO_FEATURES.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex items-start gap-3 rounded-2xl border border-border bg-white p-4">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-mint text-primary">
                <Icon className="size-5" />
              </span>
              <div>
                <p className="text-base font-semibold text-ink">{title}</p>
                <p className="mt-0.5 text-[15px] text-muted-foreground">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
