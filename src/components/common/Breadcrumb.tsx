import * as React from "react";
import Link from "next/link";
import { ChevronRight, Home, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Định nghĩa một cấp trong thanh Breadcrumb.
 * Hỗ trợ phân cấp không giới hạn: Cha -> Con -> Con -> Cháu -> Chắt...
 */
export interface BreadcrumbItemData {
  /**
   * Tiêu đề hiển thị (vd: "Trang chủ", "Khóa học", "IELTS", "Writing Master", ...)
   */
  label: React.ReactNode;
  /**
   * Đường dẫn điều hướng. Nếu là trang hiện tại thì có thể bỏ trống.
   */
  href?: string;
  /**
   * Icon tùy chọn phía trước nhãn (vd: <Home />)
   */
  icon?: React.ReactNode;
  /**
   * Đánh dấu là trang hiện tại. Nếu không truyền, phần tử cuối cùng trong mảng mặc định là trang hiện tại.
   */
  isCurrent?: boolean;
}

export interface BreadcrumbProps
  extends React.ComponentPropsWithoutRef<"nav"> {
  /**
   * Mảng danh sách các cấp phân tầng (Cha -> Con -> Con -> Cháu -> Chắt...)
   */
  items?: BreadcrumbItemData[];
  /**
   * Ký tự / Icon ngăn cách giữa các cấp (mặc định ChevronRight)
   */
  separator?: React.ReactNode;
  /**
   * Tự động thêm icon Home vào phần tử đầu tiên (Trang chủ) nếu chưa có icon
   */
  showHomeIcon?: boolean;
  /**
   * Biến thể giao diện phù hợp với nền của từng Hero section:
   * - "default": Nền sáng (slate-50, trắng, v.v.)
   * - "dark": Nền màu đậm / banner xanh (chữ trắng sáng)
   */
  variant?: "default" | "dark";
  /**
   * Cho phép cuộn ngang trên điện thoại nếu danh sách quá dài nhiều cấp
   */
  scrollableOnMobile?: boolean;
}

/**
 * Breadcrumb Component dùng chung cho toàn bộ dự án, đặc biệt ở Hero Section các trang con.
 * Hỗ trợ 2 cách dùng:
 * 1. Truyền mảng `items`: <Breadcrumb items={[{ label: "Trang chủ", href: "/" }, { label: "Khóa học", href: "/khoa-hoc" }, { label: "Chi tiết" }]} />
 * 2. Dùng dạng Compound Component: <Breadcrumb><BreadcrumbList><BreadcrumbItem>...</BreadcrumbItem></BreadcrumbList></Breadcrumb>
 */
export const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  (
    {
      items,
      separator,
      showHomeIcon = false,
      variant = "default",
      scrollableOnMobile = true,
      className,
      children,
      ...props
    },
    ref
  ) => {
    // Nếu dùng dạng Compound (truyền children)
    if (children) {
      return (
        <nav
          ref={ref}
          aria-label="Breadcrumb"
          className={cn(
            "w-full text-xs sm:text-[13px]",
            scrollableOnMobile && "overflow-x-auto no-scrollbar",
            className
          )}
          {...props}
        >
          {children}
        </nav>
      );
    }

    // Nếu dùng dạng mảng `items` (khuyến nghị - nhanh, gọn, sạch)
    if (!items || items.length === 0) {
      return null;
    }

    const defaultSeparator = (
      <ChevronRight
        className={cn(
          "size-3.5 shrink-0 stroke-[2]",
          variant === "dark" ? "text-white/45" : "text-slate-400"
        )}
      />
    );

    const actualSeparator = separator ?? defaultSeparator;

    return (
      <nav
        ref={ref}
        aria-label="Breadcrumb"
        className={cn(
          "w-full text-xs sm:text-[13px]",
          scrollableOnMobile && "overflow-x-auto no-scrollbar py-0.5",
          className
        )}
        {...props}
      >
        <ol className="flex items-center gap-1.5 sm:gap-2 whitespace-nowrap">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            const isCurrentPage = item.isCurrent ?? isLast;
            const isFirst = index === 0;

            const iconNode =
              item.icon ??
              (isFirst && showHomeIcon ? (
                <Home className="size-3.5 shrink-0" />
              ) : null);

            return (
              <React.Fragment key={index}>
                {/* Separator giữa các cấp */}
                {!isFirst && (
                  <li
                    aria-hidden="true"
                    className="flex select-none items-center"
                  >
                    {actualSeparator}
                  </li>
                )}

                {/* Phần tử cấp hiện tại */}
                <li className="inline-flex items-center">
                  {isCurrentPage || !item.href ? (
                    <span
                      aria-current={isCurrentPage ? "page" : undefined}
                      className={cn(
                        "inline-flex items-center gap-1.5 font-semibold max-w-[200px] sm:max-w-[360px] truncate",
                        variant === "dark" ? "text-white" : "text-slate-900"
                      )}
                    >
                      {iconNode}
                      <span className="truncate">{item.label}</span>
                    </span>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        "inline-flex items-center gap-1.5 transition-colors",
                        variant === "dark"
                          ? "text-white/75 hover:text-white"
                          : "text-slate-500 hover:text-primary"
                      )}
                    >
                      {iconNode}
                      <span>{item.label}</span>
                    </Link>
                  )}
                </li>
              </React.Fragment>
            );
          })}
        </ol>
      </nav>
    );
  }
);

Breadcrumb.displayName = "Breadcrumb";

/* =========================================================================
 * Compound Components phụ trợ (khi cần tùy biến sâu cấu trúc DOM)
 * ========================================================================= */

export const BreadcrumbList = React.forwardRef<
  HTMLOListElement,
  React.ComponentPropsWithoutRef<"ol">
>(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn(
      "flex items-center gap-1.5 whitespace-nowrap sm:gap-2",
      className
    )}
    {...props}
  />
));
BreadcrumbList.displayName = "BreadcrumbList";

export const BreadcrumbItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentPropsWithoutRef<"li">
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn("inline-flex items-center gap-1.5", className)}
    {...props}
  />
));
BreadcrumbItem.displayName = "BreadcrumbItem";

export interface BreadcrumbLinkProps
  extends React.ComponentPropsWithoutRef<typeof Link> {
  asChild?: boolean;
}

export const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  BreadcrumbLinkProps
>(({ className, ...props }, ref) => (
  <Link
    ref={ref}
    className={cn(
      "inline-flex items-center gap-1.5 text-slate-500 transition-colors hover:text-primary",
      className
    )}
    {...props}
  />
));
BreadcrumbLink.displayName = "BreadcrumbLink";

export const BreadcrumbPage = React.forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<"span">
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    role="link"
    aria-disabled="true"
    aria-current="page"
    className={cn("font-semibold text-slate-900 truncate", className)}
    {...props}
  />
));
BreadcrumbPage.displayName = "BreadcrumbPage";

export const BreadcrumbSeparator = ({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"li">) => (
  <li
    role="presentation"
    aria-hidden="true"
    className={cn("flex select-none items-center text-slate-400", className)}
    {...props}
  >
    {children ?? <ChevronRight className="size-3.5 stroke-[2]" />}
  </li>
);
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

export const BreadcrumbEllipsis = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"span">) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn("flex size-5 items-center justify-center text-slate-400", className)}
    {...props}
  >
    <MoreHorizontal className="size-4" />
    <span className="sr-only">Thêm</span>
  </span>
);
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis";
