import { tokenStorage, AuthUser } from "@/lib/auth/token-storage";

export interface LoginDto {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterDto {
  name: string;
  email: string;
  password: string;
  acceptTerms?: boolean;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  accessToken: string;
  refreshToken?: string;
  user: AuthUser;
}

/**
 * Service xử lý xác thực (Auth Service)
 * Hiện tại cấu hình sẵn để lưu JWT Token qua tokenStorage.
 * Khi nối API backend thật, chỉ cần đổi hàm fetch bên dưới.
 */
export const authApi = {
  async login(data: LoginDto): Promise<AuthResponse> {
    // TODO: Khi có backend thật, mở comment dòng dưới:
    // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/auth/login`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(data),
    // });
    // if (!res.ok) throw new Error("Đăng nhập thất bại");
    // const result = await res.json();

    // Giả lập xử lý đăng nhập & cấp JWT Token
    await new Promise((resolve) => setTimeout(resolve, 800));

    const mockResponse: AuthResponse = {
      success: true,
      message: "Đăng nhập thành công!",
      accessToken: `mock-jwt-access-token-${Date.now()}`,
      refreshToken: `mock-jwt-refresh-token-${Date.now()}`,
      user: {
        id: "usr_1",
        name: data.email.split("@")[0],
        email: data.email,
      },
    };

    // Tự động lưu JWT Token vào Cookies & LocalStorage
    tokenStorage.setAuthTokens(mockResponse, !!data.rememberMe);

    return mockResponse;
  },

  async register(data: RegisterDto): Promise<AuthResponse> {
    // TODO: Khi có backend thật, mở comment:
    // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/auth/register`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(data),
    // });
    // if (!res.ok) throw new Error("Đăng ký thất bại");
    // const result = await res.json();

    // Giả lập xử lý tạo tài khoản & cấp JWT Token
    await new Promise((resolve) => setTimeout(resolve, 800));

    const mockResponse: AuthResponse = {
      success: true,
      message: "Tạo tài khoản thành công!",
      accessToken: `mock-jwt-access-token-${Date.now()}`,
      refreshToken: `mock-jwt-refresh-token-${Date.now()}`,
      user: {
        id: "usr_new",
        name: data.name,
        email: data.email,
      },
    };

    // Tự động lưu JWT Token vào Cookies & LocalStorage
    tokenStorage.setAuthTokens(mockResponse, true);

    return mockResponse;
  },

  async loginWithGoogle(): Promise<AuthResponse> {
    // TODO: Khi tích hợp Google OAuth thật (Google Cloud OAuth Client ID / NextAuth / Supabase)
    await new Promise((resolve) => setTimeout(resolve, 600));

    const mockResponse: AuthResponse = {
      success: true,
      message: "Đăng nhập Google thành công!",
      accessToken: `mock-google-jwt-token-${Date.now()}`,
      user: {
        id: "usr_google",
        name: "Học viên Google",
        email: "google.user@brightlingo.vn",
      },
    };

    tokenStorage.setAuthTokens(mockResponse, true);
    return mockResponse;
  },

  logout() {
    tokenStorage.clearAuthTokens();
  },
};
