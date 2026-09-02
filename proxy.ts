import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_SESSION_COOKIE, getSessionCookieValue } from '@/lib/adminAuth';

export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === '/admin/login') {
    return NextResponse.next();
  }

  const sessionCookie = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  if (!sessionCookie || sessionCookie !== getSessionCookieValue()) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
