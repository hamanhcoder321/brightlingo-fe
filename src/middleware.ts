import { NextResponse, type NextRequest } from 'next/server';

const COURSE_PATH = /^\/(?:khoa-hoc|courses)\/([^/]+)\/?$/;
// Path không khớp route nào → Next.js render trang not-found với HTTP 404 thật.
const NOT_FOUND_PATH = '/__khoa-hoc-khong-ton-tai';
const COURSE_CHECK_TIMEOUT_MS = 10000;

type CourseCheck = 'published' | 'not-found' | { error: number };

// Không cache kết quả: Proxy không nên dựa vào biến toàn cục (serverless), và cache
// "đang bán" sẽ để khóa vừa chuyển Nháp lọt qua với HTTP 200.
async function checkCourse(slug: string): Promise<CourseCheck> {
  const backendUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!backendUrl) {
    console.error('[middleware] Thiếu NEXT_PUBLIC_API_URL, không kiểm tra được khóa học');
    return { error: 500 };
  }

  let res: Response;
  try {
    res = await fetch(`${backendUrl}/api/courses/${encodeURIComponent(slug)}`, {
      cache: 'no-store',
      signal: AbortSignal.timeout(COURSE_CHECK_TIMEOUT_MS),
    });
  } catch (error) {
    const isTimeout = error instanceof Error && error.name === 'TimeoutError';
    console.error(`[middleware] Lỗi gọi API khóa học "${slug}":`, error);
    return { error: isTimeout ? 504 : 503 };
  }

  if (res.status === 404) return 'not-found';
  if (!res.ok) {
    console.error(`[middleware] API khóa học "${slug}" trả HTTP ${res.status}`);
    return { error: 502 };
  }

  let course: { slug?: unknown; status?: unknown } | null;
  try {
    course = await res.json();
  } catch {
    console.error(`[middleware] API khóa học "${slug}" trả dữ liệu không phải JSON`);
    return { error: 502 };
  }

  if (!course || typeof course !== 'object' || typeof course.slug !== 'string' || !course.slug) {
    return 'not-found';
  }
  if (typeof course.status === 'string' && course.status.toUpperCase() !== 'PUBLISHED') {
    return 'not-found';
  }

  return 'published';
}

function isPrefetch(req: NextRequest): boolean {
  return (
    req.headers.has('next-router-prefetch') ||
    req.headers.has('next-router-segment-prefetch') ||
    req.headers.get('purpose') === 'prefetch'
  );
}

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  // Xác định 404/5xx trước khi trang chi tiết khóa học stream shell (luôn là 200).
  const courseMatch = url.pathname.match(COURSE_PATH);
  if (courseMatch && !isPrefetch(req)) {
    let slug = courseMatch[1];
    try {
      slug = decodeURIComponent(slug);
    } catch {
      return NextResponse.rewrite(new URL(NOT_FOUND_PATH, req.url));
    }
    const result = await checkCourse(slug);
    if (result === 'not-found') {
      return NextResponse.rewrite(new URL(NOT_FOUND_PATH, req.url));
    }
    if (result !== 'published') {
      return new NextResponse(
        '<!doctype html><html lang="vi"><head><meta charset="utf-8"><meta name="robots" content="noindex"><title>Tạm thời gián đoạn</title></head><body style="font-family:sans-serif;text-align:center;padding:64px 16px"><h1>Hệ thống đang tạm thời gián đoạn</h1><p>Vui lòng tải lại trang sau ít phút.</p></body></html>',
        {
          status: result.error,
          headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store', 'Retry-After': '30' },
        },
      );
    }
  }

  const response = NextResponse.next();

  // Capture ref or utm from URL and save to cookies if present
  const ref = url.searchParams.get('ref');
  const utm_source = url.searchParams.get('utm_source');
  const utm_medium = url.searchParams.get('utm_medium');
  const utm_campaign = url.searchParams.get('utm_campaign');

  const ONE_MONTH = 60 * 60 * 24 * 30;

  if (ref && !req.cookies.has('ref')) {
    response.cookies.set('ref', ref, { maxAge: ONE_MONTH, path: '/' });
  }

  if (utm_source && !req.cookies.has('utm_source')) {
    response.cookies.set('utm_source', utm_source, { maxAge: ONE_MONTH, path: '/' });
  }

  if (utm_medium && !req.cookies.has('utm_medium')) {
    response.cookies.set('utm_medium', utm_medium, { maxAge: ONE_MONTH, path: '/' });
  }

  if (utm_campaign && !req.cookies.has('utm_campaign')) {
    response.cookies.set('utm_campaign', utm_campaign, { maxAge: ONE_MONTH, path: '/' });
  }
  
  return response;
}

export const config = {
  matcher: ['/((?!_next|api|.*\\..*).*)'],
};
