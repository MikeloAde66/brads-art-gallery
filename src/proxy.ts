import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_SESSION_COOKIE, SESSION_COOKIE_OPTIONS, getSessionCookieValue, verifyPassword } from '@/lib/adminAuth';

export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === '/admin/login') {
    return NextResponse.next();
  }

  const expected = getSessionCookieValue();

  // Magic-link entry: a valid ?key= grants access and sets the session
  // cookie, then redirects to the same path with the key stripped from
  // the URL — so it doesn't linger in browser history/autocomplete or
  // leak via a Referer header if the admin page ever links elsewhere.
  const keyParam = request.nextUrl.searchParams.get('key');
  if (expected && keyParam && verifyPassword(keyParam)) {
    const cleanUrl = new URL(request.nextUrl.pathname, request.url);
    const response = NextResponse.redirect(cleanUrl);
    response.cookies.set(ADMIN_SESSION_COOKIE, expected, SESSION_COOKIE_OPTIONS);
    return response;
  }

  const sessionCookie = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  if (!expected || !sessionCookie || sessionCookie !== expected) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
