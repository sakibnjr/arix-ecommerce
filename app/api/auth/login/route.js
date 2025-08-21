import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const apiBase = process.env.NEXT_PUBLIC_API_BASE;
    const resp = await fetch(`${apiBase}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await resp.json().catch(() => ({}));
    if (!resp.ok) {
      return NextResponse.json({ error: data.error || 'Invalid credentials' }, { status: resp.status });
    }
    const token = data.token;
    const res = NextResponse.json({ success: true });
    res.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 4,
    });
    return res;
  } catch (err) {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  }
}


