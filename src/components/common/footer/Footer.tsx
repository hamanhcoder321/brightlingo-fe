import Link from "next/link";
import Image from "next/image";
import { MessageCircle, ThumbsUp, Users, Video } from "lucide-react";
import { IMAGES } from "@/lib/constants/images";
import { SUPPORT_INFO } from "@/lib/constants/site-config";
import type { PublicSiteSettings } from "@/lib/api/site-settings";

const POLICY_LINKS = [
  { label: "Thanh toán", href: "/chinh-sach-thanh-toan" },
  { label: "Giao tài liệu số", href: "/giao-tai-lieu-so" },
  { label: "Bảo mật", href: "/chinh-sach-bao-mat" },
  { label: "Điều khoản", href: "/dieu-khoan-su-dung" },
] as const;

interface FooterProps {
  settings?: PublicSiteSettings;
}

export default function Footer({ settings }: FooterProps = {}) {
  const hotline = settings?.hotline || SUPPORT_INFO.hotline;
  const email = settings?.support_email || SUPPORT_INFO.email;
  const workingHours = settings?.working_hours || SUPPORT_INFO.workingHours;
  const zaloUrl = settings?.zalo_url || SUPPORT_INFO.zaloUrl;
  const fanpageUrl = settings?.fanpage_url || SUPPORT_INFO.fanpageUrl;
  const communityGroupUrl =
    settings?.community_group_url || SUPPORT_INFO.communityGroupUrl;
  const youtubeTiktokUrl = settings?.youtube_tiktok_url || "";
  const siteName = settings?.site_name || "BrightLingo";

  const socialLinks = [
    { label: "Zalo", href: zaloUrl, icon: MessageCircle },
    { label: "Fanpage", href: fanpageUrl, icon: ThumbsUp },
    { label: "Nhóm cộng đồng", href: communityGroupUrl, icon: Users },
    ...(youtubeTiktokUrl
      ? [{ label: "Video", href: youtubeTiktokUrl, icon: Video }]
      : []),
  ];

  return (
    <footer className="w-full bg-ink text-white/80">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          {/* Thương hiệu + liên hệ */}
          <div className="max-w-sm">
            <Link
              href="/"
              className="inline-flex rounded-lg bg-white px-3 py-2"
            >
              <Image
                src={IMAGES.LOGO}
                alt={`${siteName} Logo`}
                className="h-8 w-auto object-contain"
              />
            </Link>
            <ul className="mt-5 space-y-1.5 text-[15px]">
              <li>
                Hotline / Zalo: <strong className="text-white">{hotline}</strong>
              </li>
              <li>{email}</li>
              <li>{workingHours}</li>
            </ul>
            {(settings?.company_name ||
              settings?.tax_id ||
              settings?.company_address) && (
              <div className="mt-4 space-y-1 text-xs text-white/60">
                {settings.company_name && <div>{settings.company_name}</div>}
                {settings.tax_id && <div>MST: {settings.tax_id}</div>}
                {settings.company_address && (
                  <div>Địa chỉ: {settings.company_address}</div>
                )}
              </div>
            )}
          </div>

          {/* Chính sách */}
          <nav
            aria-label="Chính sách"
            className="flex flex-wrap gap-x-5 gap-y-2 text-[15px]"
          >
            {POLICY_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="underline-offset-4 hover:text-white hover:underline"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mạng xã hội */}
          <div>
            <p className="text-[15px] font-semibold text-white">
              Kết nối với {siteName}
            </p>
            <div
              className={`mt-3 grid gap-2 ${
                socialLinks.length === 4 ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-3"
              }`}
            >
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-11 flex-col items-center justify-center gap-1 rounded-lg bg-white/10 px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-white/20"
                >
                  <Icon className="size-4" />
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-sm text-white/60">
          © 2026 {siteName}
        </div>
      </div>
    </footer>
  );
}
