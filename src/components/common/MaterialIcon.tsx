// Icon Material Symbols (icon của thiết kế) + thẻ nạp font.
// Dùng:  <MaterialIcon name="lock" fill className="text-base" />
// Font được nạp bằng <MaterialSymbolsFont /> (đặt 1 lần trong mỗi trang dùng icon này).

const FONTS_URL =
  "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap";

// React 19 tự đưa thẻ <link precedence> lên <head>, không phải sửa layout.tsx.
export function MaterialSymbolsFont() {
  return <link rel="stylesheet" href={FONTS_URL} precedence="default" />;
}

interface MaterialIconProps {
  name: string; // tên icon, vd "lock", "check_circle"
  fill?: boolean; // icon đặc
  className?: string;
}

export default function MaterialIcon({ name, fill = false, className = "" }: MaterialIconProps) {
  return (
    <span
      aria-hidden="true"
      className={`material-symbols-outlined ${fill ? "fill-icon" : ""} ${className}`}
    >
      {name}
    </span>
  );
}
