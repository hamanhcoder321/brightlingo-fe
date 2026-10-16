"use client";

import * as React from "react";
import type { StaticImageData } from "next/image";
import { X, Video, VideoOff, BookOpen } from "lucide-react";

interface VideoDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  videoUrl?: string;
  coverImage?: string | StaticImageData;
}

/**
 * Hàm phân tích và chuyển đổi URL YouTube sang link Embed chuẩn
 * Hỗ trợ các định dạng:
 * - https://www.youtube.com/watch?v=ID
 * - https://youtu.be/ID
 * - https://www.youtube.com/embed/ID
 * - https://www.youtube.com/shorts/ID
 * - https://m.youtube.com/watch?v=ID
 */
function getYouTubeEmbedUrl(url?: string): string | null {
  if (!url) return null;
  const trimmed = url.trim();

  // Đã là link embed sẵn
  if (trimmed.includes("youtube.com/embed/")) {
    const hasQuery = trimmed.includes("?");
    return `${trimmed}${hasQuery ? "&" : "?"}autoplay=1&rel=0&modestbranding=1&playsinline=1`;
  }

  // Regex trích xuất 11 ký tự Video ID từ các định dạng YouTube phổ biến
  const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = trimmed.match(regExp);

  if (match && match[1]) {
    return `https://www.youtube-nocookie.com/embed/${match[1]}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;
  }

  return null;
}

export function VideoDemoModal({
  isOpen,
  onClose,
  title,
  subtitle,
  videoUrl,
  coverImage,
}: VideoDemoModalProps) {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Chỉ lấy videoUrl khi bên CMS có cấu hình (không dùng video mặc định sẵn)
  const trimmedVideoUrl = videoUrl?.trim() || "";
  const hasVideo = Boolean(trimmedVideoUrl);
  const youtubeEmbedUrl = hasVideo ? getYouTubeEmbedUrl(trimmedVideoUrl) : null;

  // Chuẩn hóa tiêu đề sạch: xóa "10 phút", "2 phút"
  const rawTitle = title || "Xem video demo bài giảng";
  const displayTitle = rawTitle.replace(/\s*\(\s*\d+\s*phút\s*\)/gi, "").trim();

  const handleScrollToCurriculum = () => {
    onClose();
    // Chờ modal đóng rồi cuộn mượt xuống phần giáo trình
    setTimeout(() => {
      const curriculumEl = document.getElementById("curriculum-section") || document.querySelector("section:has(#curriculum)");
      if (curriculumEl) {
        curriculumEl.scrollIntoView({ behavior: "smooth" });
      }
    }, 200);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800 bg-slate-900/90">
          <div className="min-w-0 pr-3">
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2 truncate">
              <Video className="size-5 text-primary shrink-0" />
              <span className="truncate">{displayTitle}</span>
            </h3>
            {subtitle && (
              <p className="text-xs text-slate-400 mt-0.5 truncate">{subtitle}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center size-9 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors shrink-0 cursor-pointer"
            aria-label="Đóng modal"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Video Player Box hoặc Khung thông báo chưa có video */}
        <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
          {hasVideo ? (
            youtubeEmbedUrl ? (
              /* Khi CMS cấu hình link YouTube: Nhúng Iframe chuẩn */
              <iframe
                src={youtubeEmbedUrl}
                title={displayTitle}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              /* Khi CMS cấu hình link video file trực tiếp: MP4/WebM */
              <video
                src={trimmedVideoUrl}
                controls
                autoPlay
                playsInline
                className="w-full h-full object-contain"
              >
                Trình duyệt của bạn không hỗ trợ thẻ video.
              </video>
            )
          ) : (
            /* Khi CMS CHƯA THÊM VIDEO: Hiển thị hình ảnh khóa học + Thông báo chưa có video */
            <div className="relative w-full h-full flex flex-col items-center justify-center text-center p-6 bg-slate-950 select-none">
              {coverImage && (
                <img
                  src={typeof coverImage === "string" ? coverImage : coverImage.src}
                  alt={displayTitle}
                  className="absolute inset-0 w-full h-full object-cover opacity-20 filter blur-[2px]"
                />
              )}
              <div className="relative z-10 flex flex-col items-center max-w-md gap-3.5 p-6 sm:p-8 rounded-2xl bg-slate-900/85 border border-slate-700/60 backdrop-blur-md shadow-2xl">
                <div className="size-14 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/25 flex items-center justify-center shadow-inner">
                  <VideoOff className="size-7" />
                </div>

                <div className="space-y-1.5">
                  <h4 className="text-base sm:text-lg font-bold text-white">
                    Chưa có video demo bài giảng
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Khóa học này hiện chưa được cập nhật video demo từ hệ thống quản trị CMS. Bạn có thể xem lộ trình giáo trình chi tiết và tài liệu học tập ngay bên dưới!
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
                  <button
                    type="button"
                    onClick={handleScrollToCurriculum}
                    className="px-4 py-2 rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold text-xs sm:text-sm transition-colors flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <BookOpen className="size-4" />
                    <span>Xem nội dung giáo trình</span>
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-300 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                  >
                    Đóng
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
