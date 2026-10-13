import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
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
