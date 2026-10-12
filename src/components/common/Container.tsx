import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Container giới hạn nội dung 1440px và căn giữa (cùng quy cách với Header/Footer).
 * Cho phép từng section tự quyết định nền full-width bên ngoài, nội dung bên trong luôn thẳng hàng.
 */
export function Container({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8", className)}
      {...props}
    />
  );
}
