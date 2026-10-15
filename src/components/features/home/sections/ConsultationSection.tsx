import * as React from "react";
import { Clock, Mail, Phone } from "lucide-react";
import { Container } from "@/components/common/Container";
import { cn } from "@/lib/utils";
import { SUPPORT_INFO } from "@/lib/constants/site-config";
import {
  ConsultationForm,
  type ConsultationFormProps,
} from "@/components/features/auth";

export interface ConsultationSectionProps {
  id?: string;
  className?: string;
  title?: string;
  description?: string;
  formProps?: ConsultationFormProps;
}

export function ConsultationSection({
  id = "tu-van",
  className,
  title = "Chưa biết chọn khóa nào?",
  description = "Để lại số điện thoại, chuyên viên sẽ gọi lại tư vấn miễn phí trong 30 phút – khóa nào hợp với mục tiêu của bạn.",
  formProps,
}: ConsultationSectionProps) {
  return (
    <section id={id} className={cn("w-full scroll-mt-20 bg-white pb-12 sm:pb-16 lg:pb-20", className)}>
      <Container>
        <div className="grid grid-cols-1 items-center gap-8 rounded-3xl bg-primary p-6 text-white sm:p-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14 lg:p-14">
          <div>
            <h2 className="text-[28px] font-bold leading-tight lg:text-[38px]">{title}</h2>
            <p className="mt-4 max-w-lg text-[17px] leading-relaxed text-white/85 lg:text-lg">{description}</p>
            <ul className="mt-6 space-y-3 text-base">
              <li className="flex items-center gap-3">
                <Phone className="size-5 shrink-0" />
                <span>
                  Hotline / Zalo: <strong>{SUPPORT_INFO.hotline}</strong>
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="size-5 shrink-0" />
                {SUPPORT_INFO.email}
              </li>
              <li className="flex items-center gap-3">
                <Clock className="size-5 shrink-0" />
                {SUPPORT_INFO.workingHours}
              </li>
            </ul>
          </div>

          <div className="w-full rounded-2xl bg-white p-5 text-ink shadow-xl sm:p-7">
            <ConsultationForm {...formProps} />
          </div>
        </div>
      </Container>
    </section>
  );
}
