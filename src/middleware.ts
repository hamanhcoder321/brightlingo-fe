import { NextResponse, type NextRequest } from 'next/server';
import { getApiBaseUrl } from '@/lib/api/config';

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  // Verify course slug existence & PUBLISHED status so non-existent/DRAFT courses return true HTTP 404
  const courseMatch = url.pathname.match(/^\/(?:khoa-hoc|courses)\/([^/]+)\/?$/);
  if (courseMatch && courseMatch[1]) {
    const slug = decodeURIComponent(courseMatch[1]);
    try {
      const apiBase = getApiBaseUrl();
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 4000);
      const res = await fetch(`${apiBase}/api/courses/${encodeURIComponent(slug)}`, {
        method: 'GET',
        headers: { Accept: 'application/json' },
        signal: controller.signal,
        cache: 'no-store',
      });
      clearTimeout(timer);

      if (res.status === 404) {
        return NextResponse.rewrite(new URL('/_not-found', req.url), { status: 404 });
      }
    } catch {
      // Fall through to normal SSR on network timeout
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
