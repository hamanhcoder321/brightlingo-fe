import { Container } from "@/components/common/Container";
import { cn } from "@/lib/utils";
import { PURCHASE_STEPS } from "../data/how-to-buy.data";

export function HowToBuySection() {
  return (
    <section id="cach-mua" className="w-full scroll-mt-20 bg-cream py-12 sm:py-16 lg:py-20">
      <Container>
        <div className="text-center">
          <h2 className="text-[28px] font-bold leading-tight text-ink lg:text-[38px]">Mua khóa học chỉ 3 bước</h2>
          <p className="mt-2 text-[17px] text-muted-foreground lg:text-lg">
            Không đăng ký, không mật khẩu. Khoảng 3 phút là có bài học trong email.
          </p>
        </div>

        <ol className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
          {PURCHASE_STEPS.map((step, index) => (
            <li key={step.id} className="rounded-2xl border border-border bg-white p-6">
              <span
                className={cn(
                  "flex size-11 items-center justify-center rounded-full text-lg font-bold text-white",
                  index === PURCHASE_STEPS.length - 1 ? "bg-accent" : "bg-primary"
                )}
              >
                {index + 1}
              </span>
              <h3 className="mt-4 text-xl font-semibold text-ink">{step.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground lg:text-base">{step.description}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
