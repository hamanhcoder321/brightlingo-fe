import { Container } from "@/components/common/Container";
import { cn } from "@/lib/utils";
import { BENEFITS } from "../data/benefits.data";

export function BenefitsSection() {
  return (
    <section
      id="loi-ich"
      className="w-full scroll-mt-24 border-y border-slate-200/70 bg-white"
    >
      <Container className="py-10 sm:py-12">
        <ul className="grid gap-5 md:grid-cols-3 md:gap-6">
          {BENEFITS.map(({ id, title, description, icon: Icon, iconClassName }) => (
            <li
              key={id}
              className="flex flex-col items-center rounded-2xl bg-muted px-6 py-7 text-center"
            >
              <div
                className={cn(
                  "flex size-12 items-center justify-center rounded-xl",
                  iconClassName
                )}
              >
                <Icon className="size-5" aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-slate-900">
                {title}
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
                {description}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
