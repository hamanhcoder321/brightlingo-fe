import Image from "next/image";
import { Check, Users } from "lucide-react";
import { Container } from "@/components/common/Container";
import { IMAGES } from "@/lib/constants/images";
import { SUPPORT_INFO } from "@/lib/constants/site-config";
import { COMMUNITY_PERKS } from "../data/how-to-buy.data";
import type {
  BannerItemConfig,
  PublicSiteSettings,
} from "@/lib/api/site-settings";

const COMMUNITY_IMAGES = [
  { src: IMAGES.HERO_BANNER, alt: "Học viên luyện tiếng Anh tại nhà" },
  { src: IMAGES.COURSES.COURSE_2, alt: "Bài đăng hay trong nhóm cộng đồng" },
  { src: IMAGES.COURSES.COURSE_3, alt: "Buổi livestream của giảng viên" },
] as const;

export interface CommunitySectionProps {
  settings?: PublicSiteSettings;
  banner?: BannerItemConfig | null;
}

export function CommunitySection({
  settings,
  banner,
}: CommunitySectionProps = {}) {
  const [mainImage, ...sideImages] = COMMUNITY_IMAGES;

  const groupName =
    settings?.community_group_name || SUPPORT_INFO.communityGroupName;
  const groupUrl =
    settings?.community_group_url ||
    banner?.ctaLink ||
    SUPPORT_INFO.communityGroupUrl;
  const membersCount =
    settings?.community_members ?? SUPPORT_INFO.communityMembers;
  const ctaText = banner?.ctaText || "Tham gia nhóm Facebook";
  const customMainImage = banner?.desktopImage || "";
  const customMainAlt = banner?.altText || mainImage.alt;

  return (
    <section
      id="cong-dong"
      className="w-full scroll-mt-20 bg-[#FCEFE3] py-12 sm:py-16 lg:py-20"
    >
      <Container className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
        <div>
          <span className="inline-flex rounded-full bg-white px-3 py-1 text-sm font-semibold text-price">
            Cộng đồng miễn phí trên Facebook
          </span>
          <h2 className="mt-4 text-[28px] font-bold leading-tight text-ink lg:text-[38px]">
            {banner?.title || `Tham gia nhóm “${groupName}”`}
          </h2>
          <p className="mt-4 text-[17px] leading-relaxed text-muted-foreground lg:text-lg">
            Nơi mọi người cùng chia sẻ cách học tiếng Anh tự nhiên mỗi ngày –
            không áp lực, không học vẹt.
          </p>
          <ul className="mt-5 space-y-2.5">
            {COMMUNITY_PERKS.map((perk) => (
              <li
                key={perk}
                className="flex items-start gap-2 text-base text-ink"
              >
                <Check className="mt-1 size-4 shrink-0 text-primary" />
                {perk}
              </li>
            ))}
          </ul>
          <a
            href={groupUrl}
            target={banner?.openInNewTab === false ? "_self" : "_blank"}
            rel="noopener noreferrer"
            className="mt-7 inline-flex h-14 items-center justify-center gap-2 rounded-lg bg-primary px-7 text-lg font-semibold text-white transition-colors hover:bg-primary/90 max-sm:w-full"
          >
            <Users className="size-5" />
            {ctaText}
          </a>
          {membersCount && (
            <p className="mt-3 text-[15px] text-muted-foreground">
              <strong className="text-ink">{membersCount}</strong> thành viên
              đang tham gia
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <div className="relative row-span-2 aspect-[3/4] overflow-hidden rounded-2xl bg-white">
            {customMainImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={customMainImage}
                alt={customMainAlt}
                className="h-full w-full object-cover"
              />
            ) : (
              <Image
                src={mainImage.src}
                alt={mainImage.alt}
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover"
              />
            )}
          </div>
          {sideImages.map((image) => (
            <div
              key={image.alt}
              className="relative overflow-hidden rounded-2xl bg-white"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
