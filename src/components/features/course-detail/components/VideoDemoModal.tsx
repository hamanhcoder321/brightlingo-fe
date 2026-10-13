"use client";

import * as React from "react";
import { X, Play, Video } from "lucide-react";

interface VideoDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  videoUrl?: string; // Để trống sẵn sàng sau này đổ link video vào
}

export function VideoDemoModal({
  isOpen,
  onClose,
  title,
  subtitle,
  videoUrl,
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <Video className="size-5 text-primary" />
              {title}
            </h3>
            {subtitle && (
              <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center size-9 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
            aria-label="Đóng modal"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Video Player Box */}
        <div className="relative aspect-video w-full bg-black flex items-center justify-center">
          {videoUrl ? (
            <video
              src={videoUrl}
              controls
              autoPlay
              className="w-full h-full object-contain"
            />
          ) : (
            // Khung player placeholder để trống sau đổ dữ liệu sau theo yêu cầu
            <div className="flex flex-col items-center justify-center text-center p-6 text-slate-400">
              <div className="size-16 rounded-full bg-primary/20 text-primary flex items-center justify-center mb-4 ring-8 ring-primary/10">
                <Play className="size-8 fill-current ml-1" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-1">
                Video Demo Bài Giảng (2 phút)
              </h4>
              <p className="text-sm max-w-md text-slate-400">
                Khung hiển thị video bài giảng phương pháp phản xạ độc quyền. Link video demo chính thức sẽ được cập nhật từ hệ thống CMS / CDN Cloudflare R2.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
