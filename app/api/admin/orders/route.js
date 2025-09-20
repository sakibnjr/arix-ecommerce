import { NextResponse } from 'next/server';

const apiBase = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000';

export async function GET(request) {
  try {
    const token = request.cookies.get('admin_token')?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const url = new URL(request.url);
    const search = url.search || '';
    const resp = await fetch(`${apiBase}/api/orders${search}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await resp.json().catch(() => ({}));
    return NextResponse.json(data, { status: resp.status });
  } catch (err) {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  }
}


