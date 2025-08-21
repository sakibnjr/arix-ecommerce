import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Protect /admin routes except login
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const token = request.cookies.get('admin_token')?.value;
    if (!token) {
      const url = new URL('/admin/login', request.url);
      url.searchParams.set('next', pathname);
      return NextResponse.redirect(url);
    }
    // Verify JWT
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      await jwtVerify(token, secret, { algorithms: ['HS256'] });
    } catch {
      const url = new URL('/admin/login', request.url);
      url.searchParams.set('next', pathname);
      return NextResponse.redirect(url);
    }
  }

  // Redirect away from login when already authenticated
  if (pathname === '/admin/login') {
    const token = request.cookies.get('admin_token')?.value;
    if (token) {
      try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        await jwtVerify(token, secret, { algorithms: ['HS256'] });
        return NextResponse.redirect(new URL('/admin', request.url));
      } catch {}
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};


