/**
 * API Configuration Helper
 * Đảm bảo URL kết nối Backend luôn chính xác trên cả Local và Production (Vercel).
 */
export const getApiBaseUrl = (): string => {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL.replace(/\/+$/, "");
  }
  // Khi chạy trên browser tại môi trường production (Vercel / domain thật)
  if (
    typeof window !== "undefined" &&
    window.location.hostname !== "localhost" &&
    window.location.hostname !== "127.0.0.1"
  ) {
    return "https://brightlingo-be.onrender.com";
  }
  // Khi chạy trên server SSR môi trường production
  if (process.env.NODE_ENV === "production") {
    return "https://brightlingo-be.onrender.com";
  }
  return "http://localhost:4000";
};
