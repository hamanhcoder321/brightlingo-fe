# BrightLingo Frontend | Bán Khóa Học & Tài Liệu Online

Dự án Frontend xây dựng hệ thống website bán khóa học & tài liệu trực tuyến (MVP 1.0). Thiết kế tập trung vào tối ưu chuyển đổi, tốc độ tải trang, chuẩn SEO và Mobile-first.

## 🛠 Công Nghệ Sử Dụng

- **Framework:** Next.js 16 (App Router) + React 19
- **Ngôn ngữ:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI Components:** Shadcn/UI (Lucide-react, Radix UI)
- **Form & Validation:** React Hook Form + Zod
- **Quản lý Fetch API:** TanStack React Query (dự kiến dùng cho polling checkout)
- **Font chữ:** Be Vietnam Pro (tích hợp qua `next/font/google`)

## 📂 Cấu Trúc Dự Án

```text
src/
├─ app/                 # Chứa các route chính của Next.js
│  ├─ (course)/         # Group route trang khóa học
│  ├─ (marketing)/      # Group route trang tĩnh (chính sách, trang chủ)
│  ├─ checkout/         # Module thanh toán đơn hàng & chờ webhook
│  └─ layout.tsx        # ROOT LAYOUT: Khung xương chuẩn (1920px -> 1440px + Header + Footer)
├─ components/
│  ├─ common/           # Component dùng chung toàn trang (Header, Footer, Toast...)
│  ├─ features/         # Component chuyên biệt tách theo luồng nghiệp vụ
│  └─ ui/               # Bộ component nguyên bản sinh ra bởi Shadcn/UI
├─ lib/
│  ├─ api/              # Chứa http-client.ts (wrapper gọi API) và các module API
│  ├─ constants/        # Lưu trữ cấu hình (site-config.ts, images.ts)
│  └─ schemas/          # Zod schema dùng validate Form
├─ hooks/               # Chứa custom hooks React
├─ types/               # Chứa Typescript interfaces/types
└─ middleware.ts        # Bắt tham số ?ref= / utm_ để ghi vào cookie tracking tự động
```

## 🚀 Hướng Dẫn Chạy Dự Án

1. **Cài đặt thư viện:**
   ```bash
   npm install
   ```
2. **Khởi chạy môi trường Dev:**
   ```bash
   npm run dev
   ```
   Sau đó truy cập `http://localhost:3000`.

*(Lưu ý: Mọi dependency cốt lõi như Shadcn, Zod, React Hook Form đã được cài đặt sẵn trong `package.json`)*

## 🔄 Luồng Nghiệp Vụ Chính (Critical Path)

1. **Khách hàng** truy cập trang Landing/Khóa học từ quảng cáo/SEO. Middleware sẽ tự động bắt mã tracking (nếu có) và lưu vào cookie.
2. Khách bấm mua -> Chuyển hướng tới `/checkout`. 
3. Khách nhập Email, Họ Tên, mã giảm giá -> Bấm thanh toán.
4. Chuyển sang trang **chờ thanh toán**, hiển thị **Mã QR VietQR** (BankNoti). Frontend sẽ gọi API polling ngầm để kiểm tra.
5. Khi khách chuyển khoản thành công, Backend xác nhận và đổi trạng thái -> Frontend tự động chuyển sang UI báo thành công. Email tài liệu sẽ được Backend tự động gửi đi.
