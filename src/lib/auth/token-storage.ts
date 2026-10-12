import Cookies from "js-cookie";

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";
const USER_KEY = "authUser";

export const AUTH_CHANGE_EVENT = "lingo-auth-change";

export interface AuthUser {
  id?: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface TokenPayload {
  accessToken: string;
  refreshToken?: string;
  user?: AuthUser;
}

// Bộ nhớ cache tạm thời để đảm bảo useSyncExternalStore luôn nhận cùng object reference khi dữ liệu không đổi
let cachedUserRaw: string | null = null;
let cachedUserObj: AuthUser | null = null;

function notifyAuthChange() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
  }
}

export const tokenStorage = {
  getAccessToken(): string | null {
    if (typeof window === "undefined") return null;
    return Cookies.get(ACCESS_TOKEN_KEY) || localStorage.getItem(ACCESS_TOKEN_KEY) || null;
  },

  getRefreshToken(): string | null {
    if (typeof window === "undefined") return null;
    return Cookies.get(REFRESH_TOKEN_KEY) || localStorage.getItem(REFRESH_TOKEN_KEY) || null;
  },

  getUser(): AuthUser | null {
    if (typeof window === "undefined") return null;
    try {
      const raw = localStorage.getItem(USER_KEY);
      if (raw !== cachedUserRaw) {
        cachedUserRaw = raw;
        cachedUserObj = raw ? (JSON.parse(raw) as AuthUser) : null;
      }
      return cachedUserObj;
    } catch {
      return null;
    }
  },

  setAuthTokens(payload: TokenPayload, rememberMe: boolean = true) {
    if (typeof window === "undefined") return;

    const cookieOptions: Cookies.CookieAttributes = {
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      ...(rememberMe ? { expires: 30 } : {}), // 30 ngày nếu ghi nhớ, ngược lại là session cookie
    };

    // Lưu accessToken vào Cookie và LocalStorage (đồng bộ cả SSR/Middleware và Client)
    Cookies.set(ACCESS_TOKEN_KEY, payload.accessToken, cookieOptions);
    localStorage.setItem(ACCESS_TOKEN_KEY, payload.accessToken);

    if (payload.refreshToken) {
      Cookies.set(REFRESH_TOKEN_KEY, payload.refreshToken, cookieOptions);
      localStorage.setItem(REFRESH_TOKEN_KEY, payload.refreshToken);
    }

    if (payload.user) {
      const raw = JSON.stringify(payload.user);
      localStorage.setItem(USER_KEY, raw);
      cachedUserRaw = raw;
      cachedUserObj = payload.user;
    }

    notifyAuthChange();
  },

  clearAuthTokens() {
    if (typeof window === "undefined") return;
    Cookies.remove(ACCESS_TOKEN_KEY, { path: "/" });
    Cookies.remove(REFRESH_TOKEN_KEY, { path: "/" });
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    cachedUserRaw = null;
    cachedUserObj = null;

    notifyAuthChange();
  },

  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  },
};
