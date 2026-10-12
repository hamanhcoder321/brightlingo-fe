"use client";

import * as React from "react";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { AuthForm } from "./AuthForm";
import type { AuthResponse } from "@/lib/api/auth";

export interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialMode?: "register" | "login";
  onSuccess?: (response: AuthResponse) => void;
}

export function AuthModal({
  open,
  onOpenChange,
  initialMode = "register",
  onSuccess,
}: AuthModalProps): React.JSX.Element {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="border-0 border-none bg-transparent p-0 shadow-none ring-0 ring-transparent outline-none sm:max-w-[440px] w-full max-h-[calc(100dvh-2rem)] overflow-y-auto custom-scrollbar"
        overlayClassName="bg-slate-950/60 backdrop-blur-md"
      >
        <DialogTitle className="sr-only">
          {initialMode === "register" ? "Đăng ký tài khoản" : "Đăng nhập"}
        </DialogTitle>
        <DialogDescription className="sr-only">
          Đăng ký hoặc đăng nhập tài khoản học viên BrightLingo
        </DialogDescription>

        <div className="relative w-full">
          <DialogClose
            render={
              <button
                type="button"
                className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-20 flex size-8 items-center justify-center rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="Đóng"
              >
                <X className="size-4" />
              </button>
            }
          />

          <AuthForm
            key={`${open ? "open" : "closed"}-${initialMode}`}
            initialMode={initialMode}
            isInModal={true}
            onSuccess={(res) => {
              onOpenChange(false);
              if (onSuccess) onSuccess(res);
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
