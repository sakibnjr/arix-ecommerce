import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Protect /admin routes except login
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const hasAuth = request.cookies.get('admin_auth');
    if (!hasAuth) {
      const url = new URL('/admin/login', request.url);
      url.searchParams.set('next', pathname);
      return NextResponse.redirect(url);
    }
  }

  // Redirect away from login when already authenticated
  if (pathname === '/admin/login') {
    const hasAuth = request.cookies.get('admin_auth');
    if (hasAuth) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};


